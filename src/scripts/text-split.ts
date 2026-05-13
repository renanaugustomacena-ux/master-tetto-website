export function splitText(el: HTMLElement): { chars: HTMLElement[]; words: HTMLElement[]; lines: HTMLElement[] } {
  const text = el.textContent || '';
  el.innerHTML = '';
  el.setAttribute('aria-label', text);

  const chars: HTMLElement[] = [];
  const words: HTMLElement[] = [];

  const rawWords = text.split(/(\s+)/);

  for (const raw of rawWords) {
    if (/^\s+$/.test(raw)) {
      el.appendChild(document.createTextNode(' '));
      continue;
    }

    const wordSpan = document.createElement('span');
    wordSpan.classList.add('word');
    wordSpan.setAttribute('aria-hidden', 'true');

    for (const char of raw) {
      const charSpan = document.createElement('span');
      charSpan.classList.add('char');
      charSpan.textContent = char;
      wordSpan.appendChild(charSpan);
      chars.push(charSpan);
    }

    el.appendChild(wordSpan);
    words.push(wordSpan);
  }

  return { chars, words, lines: [] };
}

export function splitAll(selector = '[data-split]'): Map<HTMLElement, ReturnType<typeof splitText>> {
  const results = new Map<HTMLElement, ReturnType<typeof splitText>>();
  document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
    results.set(el, splitText(el));
  });
  return results;
}
