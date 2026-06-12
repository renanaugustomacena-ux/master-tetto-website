#!/usr/bin/env bash
#
# Local deploy for mastertetto.it -> Aruba Linux hosting.
#
# GitHub Actions cannot deploy here: Aruba drops connections from cloud (Azure)
# runner IPs, so the FTP control socket times out. Deploy from a machine Aruba
# accepts (e.g. this one) instead.
#
# Credentials (never commit them):
#   Provide via env vars  FTP_USER / FTP_PASS,  OR
#   create .env.deploy in the repo root (gitignored via .env.*):
#       FTP_USER=19853888@aruba.it
#       FTP_PASS=your-password
#   NOTE: creds are parsed literally (grep+cut, not `source`) because Aruba
#   passwords often contain `$`, which `source` would expand and corrupt.
#
# Usage:  npm run deploy        (or)  bash scripts/deploy-ftp.sh
#
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

FTP_HOST="${FTP_HOST:-ftp.mastertetto.it}"
# Aruba's FTP login dir is NOT the web root; the docroot is this subfolder:
FTP_WEBROOT="${FTP_WEBROOT:-www.mastertetto.it}"
SITE_URL="${SITE_URL:-https://www.mastertetto.it}"
CRED_FILE="${CRED_FILE:-$ROOT/.env.deploy}"
DIST="$ROOT/dist"

# --- credentials -----------------------------------------------------------
if [[ -z "${FTP_USER:-}" || -z "${FTP_PASS:-}" ]]; then
  if [[ -f "$CRED_FILE" ]]; then
    FTP_USER="$(grep -m1 '^FTP_USER=' "$CRED_FILE" | cut -d= -f2-)"
    FTP_PASS="$(grep -m1 '^FTP_PASS=' "$CRED_FILE" | cut -d= -f2-)"
  fi
fi
if [[ -z "${FTP_USER:-}" || -z "${FTP_PASS:-}" ]]; then
  echo "ERROR: missing credentials." >&2
  echo "       Set FTP_USER and FTP_PASS, or create $CRED_FILE with:" >&2
  echo "         FTP_USER=...   FTP_PASS=..." >&2
  exit 1
fi

# --- build -----------------------------------------------------------------
echo "==> Building (npm run build)"
npm run build
[[ -f "$DIST/index.html" && -f "$DIST/.htaccess" ]] \
  || { echo "ERROR: build output incomplete (missing dist/index.html or dist/.htaccess)" >&2; exit 1; }

# --- upload ----------------------------------------------------------------
CFG="$(mktemp)"; chmod 600 "$CFG"
printf 'user = "%s:%s"\n' "$FTP_USER" "$FTP_PASS" > "$CFG"
trap 'rm -f "$CFG"' EXIT

BASE="ftp://${FTP_HOST}/${FTP_WEBROOT}"
echo "==> Uploading dist/ -> ${BASE}/"
cd "$DIST"
n=0; fail=0
while IFS= read -r -d '' f; do
  rel="${f#./}"
  if curl -fsS -K "$CFG" --connect-timeout 25 --max-time 180 --ftp-create-dirs -T "$f" "${BASE}/${rel}"; then
    n=$((n + 1))
  else
    echo "  FAIL: $rel" >&2
    fail=$((fail + 1))
  fi
done < <(find . -type f -print0)
cd "$ROOT"
echo "==> uploaded=$n failed=$fail"
[[ $fail -eq 0 ]] || { echo "ERROR: $fail file(s) failed to upload" >&2; exit 1; }

# --- refresh Aruba proxy cache ----------------------------------------------
# Aruba's webx proxy caches HTML per URL *and* per Accept-Encoding variant
# (vary: Accept-Encoding). A no-cache request forces it to refetch from the
# webspace, so hit every page in every common encoding or visitors keep
# getting the previous deploy until the TTL expires.
echo "==> Refreshing Aruba proxy cache"
pages=("/")
while IFS= read -r -d '' f; do
  rel="${f#"$DIST"}"; rel="${rel%index.html}"
  [[ "$rel" == "/" ]] || pages+=("$rel")
done < <(find "$DIST" -name index.html -print0)
for p in "${pages[@]}"; do
  for enc in "identity" "gzip" "gzip, deflate, br" "gzip, deflate, br, zstd"; do
    curl -sS -o /dev/null --max-time 25 \
      -H "Accept-Encoding: $enc" -H "Cache-Control: no-cache" -H "Pragma: no-cache" \
      "${SITE_URL}${p}" || echo "  WARN: cache refresh failed for $p ($enc)" >&2
  done
  echo "  refreshed $p"
done

# --- verify ----------------------------------------------------------------
echo "==> Verifying ${SITE_URL}/"
tmp="$(mktemp)"; trap 'rm -f "$CFG" "$tmp"' EXIT
code="$(curl -sS -o "$tmp" -w '%{http_code}' --max-time 25 "${SITE_URL}/?cb=$$")"
if [[ "$code" == "200" ]] && grep -qi '<title>' "$tmp" && ! grep -qi 'mediacdn.aruba' "$tmp"; then
  echo "==> OK: live (HTTP $code, real content, no Aruba parking page)"
else
  echo "WARN: unexpected response (HTTP $code). Inspect ${SITE_URL}/ manually." >&2
  exit 1
fi
