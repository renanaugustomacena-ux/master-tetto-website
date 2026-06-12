import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // Aruba's proxy 301-redirects the apex to www, so www is the canonical host
  // (canonical links, sitemap and robots all derive from this value).
  site: 'https://www.mastertetto.it',
  base: '/',
  output: 'static',
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/privacy/') && !page.includes('/cookie/') && !page.includes('/404'),
    }),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      cssMinify: 'lightningcss',
      // Production CSP is script-src 'self' (see public/.htaccess): inline
      // <script> tags are blocked by the browser. Keep every script as an
      // external file so menu/cookie-banner/form handlers actually execute.
      assetsInlineLimit: 0,
    },
    assetsInclude: ['**/*.glsl'],
  },
});
