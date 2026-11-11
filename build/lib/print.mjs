// Print edition: one paginated HTML document → PDF through headless Chrome.
// Two passes: the first finds which page every chapter starts on (via hidden
// markers read back with pdf.js), the second fills those numbers into the TOC.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { escapeHtml } from './markdown.mjs';
import { coverHtml, titlePageHtml, coverArt } from './cover.mjs';
import { fontFaceCss, fontFiles } from './fonts.mjs';
import { launchBrowser } from './diagrams.mjs';
import { bn, docHero } from './shared.mjs';

export const PAPERS = {
  b5: { label: 'Book · B5', w: 176, h: 250, m: { top: 17, bottom: 19, inner: 18, outer: 18 }, fs: '9.6pt', partPad: '18mm' },
  a4: { label: 'A4', w: 210, h: 297, m: { top: 20, bottom: 21, inner: 23, outer: 23 }, fs: '10.6pt', partPad: '24mm' },
};

function pageCss(p, config) {
  const contentH = p.h - p.m.top - p.m.bottom;
  const foot = `font-family:'Hind Siliguri','Nirmala UI',sans-serif;font-size:7.5pt;color:#7a8394;`;
  const num = `font-family:'Hind Siliguri','Nirmala UI',sans-serif;font-size:8.5pt;font-weight:700;color:#0e1b33;`;
  const run = `${config.title} ${config.titleSuffix}`.replace(/"/g, '');
  const none = '@top-left{content:none}@top-right{content:none}@bottom-left{content:none}@bottom-right{content:none}@bottom-center{content:none}';
  // Horizontal page margins stay 0: Chrome lays the whole document out at the
  // default page's content width and shrinks everything if a full-bleed page
  // (cover, part opener) is wider. Side margins are section padding instead.
  const x = `${p.m.inner}mm`;
  return `
:root{--page-w:${p.w}mm;--page-h:${p.h}mm;--content-h:${contentH - 1}mm;--fig-max-h:${Math.round(contentH * 0.56)}mm;--fs-body:${p.fs};--part-pad:${p.partPad};--pad-x:${x};}
@page{size:${p.w}mm ${p.h}mm;margin:${p.m.top}mm 0 ${p.m.bottom}mm 0;}
@page :left{@bottom-left{content:counter(page);padding-left:${x};${num}}@bottom-right{content:"${run}";padding-right:${x};${foot}}}
@page :right{@bottom-right{content:counter(page);padding-right:${x};${num}}@bottom-left{content:"${config.author.replace(/"/g, '')}";padding-left:${x};${foot}}}
@page cover{margin:0;${none}}
@page cover:left{margin:0;${none}}
@page cover:right{margin:0;${none}}
@page partpage{margin:0;${none}}
@page partpage:left{margin:0;${none}}
@page partpage:right{margin:0;${none}}
@page plain{${none}}
@page plain:left{${none}}
@page plain:right{${none}}
`;
}

const marker = (slug) => `<span class="pdf-marker">@@P:${slug}@@</span>`;

function tocHtml(config, docs, parts, pages) {
  const pg = (slug) => `<span class="pg">${pages[slug] ? pages[slug] : '000'}</span>`;
  const row = (d, n, cls = '') =>
    `<div class="toc-row ${cls}"><span class="n">${n}</span><span class="t">${escapeHtml(d.title)}</span><span class="dots"></span>${pg(d.slug)}</div>`;
  const front = docs.filter((d) => d.kind === 'front' && !['copyright', 'dedication'].includes(d.slug));
  const appx = docs.filter((d) => d.kind === 'appendix');
  return `<section class="book-section toc-doc" id="toc">${marker('toc')}
  <h1>সূচিপত্র</h1><div class="toc-sub">${escapeHtml(config.title)} ${escapeHtml(config.titleSuffix)}</div>
  <div class="toc-part">শুরুর কথা</div>
  ${front.map((d) => row(d, '', 'minor')).join('\n  ')}
  ${parts
    .map(
      (p) =>
        `<div class="toc-part"><span>পর্ব ${bn(p.number)}</span>${escapeHtml(p.bn)}</div>\n  ` +
        p.docs.map((d) => row(d, String(d.number).padStart(2, '0'))).join('\n  ')
    )
    .join('\n  ')}
  <div class="toc-part">পরিশিষ্ট</div>
  ${appx.map((d) => row(d, d.letter)).join('\n  ')}
</section>`;
}

function partPage(p) {
  return `<section class="part-page" id="part-${p.number}">${marker('part-' + p.number)}
  <div class="pp-label">পর্ব</div>
  <div class="pp-no">${bn(p.number)}</div>
  <h1>${escapeHtml(p.bn)}</h1>
  <div class="pp-en">${escapeHtml(p.title)}</div>
  <p class="pp-blurb">${escapeHtml(p.blurb)}</p>
  <ol>${p.docs.map((d) => `<li><b>${String(d.number).padStart(2, '0')}</b><span>${escapeHtml(d.title)}</span></li>`).join('')}</ol>
  <div class="pp-art">${coverArt({ id: 'pp' + p.number })}</div>
</section>`;
}

function docSection(d) {
  const html = d.html.replace(/@@ASSET@@/g, 'img/');
  if (d.slug === 'copyright') return `<section class="book-section front-copyright" id="${d.slug}">${marker(d.slug)}<div class="prose">${html}</div></section>`;
  if (d.slug === 'dedication') return `<section class="book-section front-dedication" id="${d.slug}">${marker(d.slug)}<div class="prose">${html}</div></section>`;
  return `<section class="book-section ${d.kind}" id="${d.slug}">${marker(d.slug)}${docHero(d, 'print')}<div class="prose">${html}</div></section>`;
}

function printDocument({ config, docs, parts, styles, paper, pages, root }) {
  const front = docs.filter((d) => d.kind === 'front');
  const appx = docs.filter((d) => d.kind === 'appendix');
  const appxPart = { number: '', bn: 'পরিশিষ্ট', title: 'Appendices', blurb: 'Interview প্রশ্নোত্তর, architect-এর টুলকিট, পরিভাষা এবং তথ্যসূত্র: বই শেষ করার পরেও যেগুলো বারবার কাজে লাগবে।', docs: [] };
  const css = [fontFaceCss(root, (f) => `fonts/${f.name}`), styles.content, styles.cover, styles.print, pageCss(paper, config)].join('\n');
  const body = [
    `<section class="cover-page">${coverHtml(config)}</section>`,
    `<section class="book-section title-sheet">${titlePageHtml(config)}</section>`,
    ...front.filter((d) => ['copyright', 'dedication'].includes(d.slug)).map(docSection),
    tocHtml(config, docs, parts, pages),
    ...front.filter((d) => !['copyright', 'dedication'].includes(d.slug)).map(docSection),
    ...parts.flatMap((p) => [partPage(p), ...p.docs.map(docSection)]),
    `<section class="part-page" id="part-appendix">${marker('part-appendix')}<div class="pp-label">${escapeHtml(appxPart.title)}</div><h1 style="margin-top:.4em">${appxPart.bn}</h1><p class="pp-blurb">${escapeHtml(appxPart.blurb)}</p><ol>${appx
      .map((d) => `<li><b>${d.letter}</b><span>${escapeHtml(d.title)}</span></li>`)
      .join('')}</ol><div class="pp-art">${coverArt({ id: 'ppa' })}</div></section>`,
    ...appx.map(docSection),
    `<section class="cover-page back">${coverHtml(config, { kind: 'back' })}</section>`,
  ];
  return `<!doctype html><html lang="bn"><head><meta charset="utf-8"><title>${escapeHtml(config.title)} ${escapeHtml(config.titleSuffix)}</title>
<meta name="author" content="${escapeHtml(config.author)}"><style>${css}</style></head><body>
${body.join('\n')}
</body></html>`;
}

async function renderPdf(browser, htmlPath, pdfPath) {
  const page = await browser.newPage();
  await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'load', timeout: 0 });
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
  await page.pdf({ path: pdfPath, preferCSSPageSize: true, printBackground: true, outline: true, tagged: true, timeout: 0 });
  await page.close();
}

async function readMarkers(pdfPath) {
  const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjs.getDocument({ data, verbosity: 0, isEvalSupported: false }).promise;
  const map = {};
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const tc = await page.getTextContent();
    // pdf.js may insert spaces inside the tiny marker text, so compare without whitespace.
    const s = tc.items.map((it) => it.str).join('').replace(/\s+/g, '');
    for (const m of s.matchAll(/@@P:([\w-]+)@@/g)) if (!map[m[1]]) map[m[1]] = i;
    page.cleanup();
  }
  const pages = doc.numPages;
  await (doc.cleanup ? doc.cleanup() : null);
  return { map, pages };
}

export async function buildPrint({ root, outDir, config, docs, parts, styles, papers, log = console.log }) {
  fs.mkdirSync(path.join(outDir, 'fonts'), { recursive: true });
  for (const f of fontFiles(root)) fs.copyFileSync(f.src, path.join(outDir, 'fonts', f.name));
  const assetsDir = path.join(root, 'assets');
  if (fs.existsSync(assetsDir)) fs.cpSync(assetsDir, path.join(outDir, 'img'), { recursive: true });

  const browser = await launchBrowser();
  const results = [];
  try {
    for (const key of papers) {
      const paper = PAPERS[key];
      const base = `${config.title} ${config.titleSuffix}`.replace(/\s+/g, '-');
      const htmlPath = path.join(outDir, `book-${key}.html`);
      const pdfPath = path.join(outDir, `${base}-${key.toUpperCase()}.pdf`);
      let pages = {};
      for (let pass = 1; pass <= 3; pass++) {
        fs.writeFileSync(htmlPath, printDocument({ config, docs, parts, styles, paper, pages, root }));
        const t = Date.now();
        await renderPdf(browser, htmlPath, pdfPath);
        const found = await readMarkers(pdfPath);
        const missing = docs.filter((d) => !found.map[d.slug]).map((d) => d.slug);
        const stable = docs.every((d) => pages[d.slug] === found.map[d.slug]);
        log(`  ${paper.label}: pass ${pass} → ${found.pages} pages (${((Date.now() - t) / 1000).toFixed(1)}s)${missing.length ? `, markers missing: ${missing.join(', ')}` : ''}`);
        if (stable) break;
        if (!Object.keys(found.map).length) {
          log('  ! no page markers found in the PDF; TOC page numbers cannot be filled');
          break;
        }
        pages = found.map;
      }
      results.push({ key, label: paper.label, path: pdfPath, file: path.basename(pdfPath), html: htmlPath });
    }
  } finally {
    await browser.close();
  }
  return results;
}
