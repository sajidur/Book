// Self-hosted fonts (from @fontsource) so web + PDF builds work fully offline.
import path from 'node:path';

const RANGES = {
  bengali:
    'U+0951-0952,U+0964-0965,U+0980-09FE,U+1CD0,U+1CD2,U+1CD5-1CD6,U+1CD8,U+1CE1,U+1CEA,U+1CED,U+1CF2,U+1CF5-1CF7,U+200C-200D,U+20B9,U+25CC,U+A8F1',
  latin:
    'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD',
  'latin-ext':
    'U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF',
};

const FAMILIES = [
  { family: 'Noto Serif Bengali', pkg: 'noto-serif-bengali', weights: [400, 600, 700], subsets: ['bengali', 'latin', 'latin-ext'] },
  { family: 'Hind Siliguri', pkg: 'hind-siliguri', weights: [400, 500, 600, 700], subsets: ['bengali', 'latin', 'latin-ext'] },
  { family: 'JetBrains Mono', pkg: 'jetbrains-mono', weights: [400, 700], subsets: ['latin'] },
];

/** All font files with their source path in node_modules. */
export function fontFiles(root) {
  const files = [];
  for (const f of FAMILIES) {
    for (const w of f.weights) {
      for (const s of f.subsets) {
        const name = `${f.pkg}-${s}-${w}-normal.woff2`;
        files.push({ family: f.family, weight: w, subset: s, name, src: path.join(root, 'node_modules', '@fontsource', f.pkg, 'files', name) });
      }
    }
  }
  return files;
}

/** @font-face rules. `urlFor(file)` returns the URL used in src:. */
export function fontFaceCss(root, urlFor) {
  return fontFiles(root)
    .map(
      (f) => `@font-face{font-family:'${f.family}';font-style:normal;font-display:swap;font-weight:${f.weight};src:url('${urlFor(f)}') format('woff2');unicode-range:${RANGES[f.subset]};}`
    )
    .join('\n');
}
