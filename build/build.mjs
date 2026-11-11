#!/usr/bin/env node
// Builds the book from ./manuscript into ./dist
//   node build/build.mjs              → web + PDF (B5 book + A4)
//   node build/build.mjs --web        → web edition only
//   node build/build.mjs --pdf        → PDF only
//   node build/build.mjs --paper=a4   → choose paper(s): b5, a4 (comma separated)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import config from '../book.config.mjs';
import { parseFrontMatter, collectDiagrams, renderDocument, searchSections } from './lib/markdown.mjs';
import { renderDiagrams } from './lib/diagrams.mjs';
import { buildWeb } from './lib/web.mjs';
import { buildPrint, PAPERS } from './lib/print.mjs';
import { bn } from './lib/shared.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MANUSCRIPT = path.join(ROOT, 'manuscript');
const DIST = path.join(ROOT, 'dist');
const argv = process.argv.slice(2);
const flag = (f) => argv.includes(f);
const opt = (k, d) => (argv.find((a) => a.startsWith(`--${k}=`)) || '').split('=')[1] || d;
const wantWeb = flag('--web') || !flag('--pdf');
const wantPdf = flag('--pdf') || !flag('--web');
const papers = opt('paper', 'b5,a4').split(',').map((s) => s.trim().toLowerCase()).filter((p) => PAPERS[p]);
const t0 = Date.now();
const log = (...a) => console.log(...a);

function loadDocs() {
  const docs = [];
  const missing = [];
  const read = (rel) => {
    const file = path.join(MANUSCRIPT, rel);
    if (!fs.existsSync(file)) return missing.push(rel), null;
    return { rel, ...parseFrontMatter(fs.readFileSync(file, 'utf8')) };
  };
  for (const rel of config.front) {
    const r = read(rel);
    if (!r) continue;
    const slug = r.meta.slug || path.basename(rel, '.md').replace(/^\d+-/, '');
    docs.push({ ...r, kind: 'front', slug, title: r.meta.title, en: r.meta.en, subtitle: r.meta.subtitle, label: '', navNo: '·', navTitle: r.meta.title, navLabel: 'শুরুর কথা' });
  }
  const parts = config.parts.map((p) => ({ ...p, docs: [] }));
  for (const part of parts) {
    for (const rel of part.chapters) {
      const r = read(rel);
      if (!r) continue;
      const n = Number(r.meta.chapter);
      const d = {
        ...r, kind: 'chapter', part, number: n, slug: `ch${String(n).padStart(2, '0')}`,
        title: r.meta.bn || r.meta.title, en: r.meta.title, subtitle: r.meta.subtitle, label: String(n),
        navNo: String(n).padStart(2, '0'), navTitle: r.meta.bn || r.meta.title, navLabel: `অধ্যায় ${bn(n)}`,
      };
      part.docs.push(d);
      docs.push(d);
    }
  }
  for (const rel of config.back) {
    const r = read(rel);
    if (!r) continue;
    const L = String(r.meta.letter).toUpperCase();
    docs.push({
      ...r, kind: 'appendix', letter: L, slug: `appendix-${L.toLowerCase()}`, title: r.meta.bn || r.meta.title, en: r.meta.title,
      subtitle: r.meta.subtitle, label: L, navNo: L, navTitle: r.meta.bn || r.meta.title, navLabel: `পরিশিষ্ট ${L}`,
    });
  }
  return { docs, parts: parts.filter((p) => p.docs.length), missing };
}

async function main() {
  log(`\n📘 ${config.title} ${config.titleSuffix}`);
  const { docs, parts, missing } = loadDocs();
  if (missing.length) log(`  ! missing manuscript files (skipped):\n    ${missing.join('\n    ')}`);
  log(`  ${docs.length} documents (${docs.filter((d) => d.kind === 'chapter').length} chapters)`);

  // 1. Diagrams
  const all = [];
  const owner = new Map();
  for (const d of docs) for (const g of collectDiagrams(d.body)) all.push(g), owner.set(g.hash, d.rel);
  const { map, failures } = await renderDiagrams(all, { root: ROOT, cacheDir: path.join(ROOT, 'build', '.cache', 'diagrams'), log });
  for (const f of failures) log(`  ✗ diagram in ${owner.get(f.hash)}: ${f.error}\n    ${f.code.split('\n').slice(0, 3).join(' | ')}`);

  // 2. Markdown → HTML
  for (const d of docs) {
    const assets = new Set();
    const r = renderDocument(d.body, { prefix: d.slug, label: d.label, diagrams: map, assets, assetBase: '@@ASSET@@' });
    Object.assign(d, r, { assets });
    d.search = searchSections(r.html, r.headings);
  }
  const figs = docs.reduce((n, d) => n + d.figures, 0);
  log(`  ${figs} figures, ${all.length} diagrams`);

  const styles = Object.fromEntries(
    ['content', 'cover', 'web', 'print'].map((k) => [k, fs.readFileSync(path.join(ROOT, 'build', 'styles', `${k}.css`), 'utf8')])
  );

  // 3. Print (first, so the web edition can link the PDFs)
  let pdfs = [];
  if (wantPdf) {
    log(`  building PDF: ${papers.join(', ')}`);
    pdfs = await buildPrint({ root: ROOT, outDir: path.join(DIST, 'print'), config, docs, parts, styles, papers, log });
  } else {
    const dir = path.join(DIST, 'print');
    if (fs.existsSync(dir))
      pdfs = fs.readdirSync(dir).filter((f) => f.endsWith('.pdf')).map((f) => ({ file: f, path: path.join(dir, f), label: /-A4\.pdf$/.test(f) ? 'A4' : 'Book · B5' }));
  }
  pdfs.sort((a, b) => (a.file < b.file ? -1 : 1));

  // 4. Web
  if (wantWeb) {
    const r = buildWeb({ root: ROOT, outDir: path.join(DIST, 'web'), config, docs, parts, pdfs, styles });
    log(`  web: ${r.pages} pages, ${r.searchEntries} search entries → dist/web/index.html`);
  }
  for (const p of pdfs) log(`  pdf: ${path.relative(ROOT, p.path)}`);
  log(`  done in ${((Date.now() - t0) / 1000).toFixed(1)}s${failures.length ? ` with ${failures.length} diagram error(s)` : ''}\n`);
  if (failures.length && flag('--strict')) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
