import { escapeHtml } from './markdown.mjs';

const BN_DIGITS = '০১২৩৪৫৬৭৮৯';
export const bn = (n) => String(n).replace(/[0-9]/g, (d) => BN_DIGITS[d]);

/** Header block shown at the top of every document (web + print). */
export function docHero(d, target) {
  const sub = d.subtitle ? `<p class="hero-sub">${escapeHtml(d.subtitle)}</p>` : '';
  const en = d.en && d.en !== d.title ? `<p class="hero-en">${escapeHtml(d.en)}</p>` : '';
  if (d.kind === 'chapter') {
    return `<header class="doc-hero ${target}">
  <div class="hero-kicker">পর্ব ${bn(d.part.number)} · ${escapeHtml(d.part.bn)}</div>
  <div class="hero-number"><span>অধ্যায়</span><b>${bn(d.number)}</b></div>
  <h1>${escapeHtml(d.title)}</h1>${en}${sub}
  <div class="hero-rule"></div>
</header>`;
  }
  if (d.kind === 'appendix') {
    return `<header class="doc-hero ${target}">
  <div class="hero-kicker">পরিশিষ্ট</div>
  <div class="hero-number"><span>পরিশিষ্ট</span><b>${escapeHtml(d.letter)}</b></div>
  <h1>${escapeHtml(d.title)}</h1>${en}${sub}
  <div class="hero-rule"></div>
</header>`;
  }
  return `<header class="doc-hero ${target}">
  <div class="hero-kicker">শুরুর কথা</div>
  <h1>${escapeHtml(d.title)}</h1>${en}${sub}
  <div class="hero-rule"></div>
</header>`;
}
