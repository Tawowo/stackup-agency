/**
 * Morcellement typographique maison — léger et sans dépendance runtime
 * lourde. Découpe le texte en <span class="char"> tout en préservant
 * les espaces (insécables) pour garder la mise en page.
 */
export function splitChars(el: HTMLElement): HTMLElement[] {
  const text = el.textContent ?? '';
  el.textContent = '';
  const chars: HTMLElement[] = [];
  for (const ch of text) {
    const span = document.createElement('span');
    span.className = 'char';
    span.textContent = ch === ' ' ? ' ' : ch;
    if (ch === ' ') span.style.width = '0.28em';
    el.appendChild(span);
    chars.push(span);
  }
  return chars;
}

/** Duplique un contenu inline pour un marquee sans couture. */
export function makeMarquee(row: HTMLElement, content: string, repeats: number) {
  row.innerHTML = '';
  for (let i = 0; i < repeats; i++) {
    const span = document.createElement('span');
    span.textContent = content;
    row.appendChild(span);
  }
}
