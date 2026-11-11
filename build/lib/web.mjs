// Web edition: a static, multi-page site that works from any static host or
// straight from the file system (no server, no CDN, no build-time JS needed).
import fs from 'node:fs';
import path from 'node:path';
import { escapeHtml, icon } from './markdown.mjs';
import { coverHtml } from './cover.mjs';
import { fontFaceCss, fontFiles } from './fonts.mjs';
import { bn, docHero } from './shared.mjs';

const UI = {
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
  theme: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
  pdf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v11m0 0l-4-4m4 4l4-4"/><path d="M5 19h14"/></svg>',
  book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h7a2 2 0 0 1 2 2v12a2 2 0 0 0-2-2H3z"/><path d="M21 6h-7a2 2 0 0 0-2 2v12a2 2 0 0 1 2-2h7z"/></svg>',
  mark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="2.5" width="6" height="4.5" rx="1.2"/><rect x="2.5" y="16.5" width="6" height="4.5" rx="1.2"/><rect x="15.5" y="16.5" width="6" height="4.5" rx="1.2"/><path d="M12 7v4.5M5.5 16.5v-2.5h13v2.5"/></svg>',
};

function copyDir(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, e.name), d = path.join(dst, e.name);
    if (e.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

function sidebar(nav, current) {
  return nav
    .map(
      (g) =>
        `<div class="side-group"><div class="side-title">${g.kicker ? `<b>${escapeHtml(g.kicker)}</b>` : ''}${escapeHtml(g.title)}</div>` +
        g.items
          .map(
            (d) =>
              `<a class="side-link${d === current ? ' active' : ''}" href="${d.slug}.html"${d === current ? ' aria-current="page"' : ''}>` +
              `<span class="no">${escapeHtml(d.navNo || '·')}</span><span>${escapeHtml(d.navTitle)}</span></a>`
          )
          .join('') +
        `</div>`
    )
    .join('\n');
}

function layout({ config, title, body, nav, current, onpage, pdfs, description }) {
  const pdfLink = pdfs.length ? `<a class="icon-btn" href="downloads/${pdfs[0].file}" title="PDF ডাউনলোড" aria-label="PDF ডাউনলোড">${UI.pdf}</a>` : '';
  return `<!doctype html>
<html lang="bn">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(description || config.description)}">
<meta name="author" content="${escapeHtml(config.author)}">
<meta name="theme-color" content="#0b1530">
<link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="assets/css/book.css">
<script>(function(){try{var t=localStorage.getItem('psd-theme');if(t)document.documentElement.setAttribute('data-theme',t)}catch(e){}})();</script>
</head>
<body>
<a class="skip" href="#main">মূল লেখায় যান</a>
<div class="progress" id="progress"></div>
<header class="topbar">
  <button class="icon-btn menu-btn" data-action="nav" aria-label="সূচিপত্র">${UI.menu}</button>
  <a class="brand" href="index.html"><span class="brand-mark">${UI.mark}</span><span class="brand-text">${escapeHtml(config.title)} <span>${escapeHtml(config.titleSuffix)}</span></span></a>
  <div class="top-spacer"></div>
  <div class="search" role="search">${UI.search}<input id="search" type="search" placeholder="খুঁজুন: cache, Kafka, RAG…  ( / )" autocomplete="off" aria-label="বইয়ে খুঁজুন"><div class="search-results" id="search-results"></div></div>
  ${pdfLink}
  <button class="icon-btn" data-action="theme" aria-label="থিম পরিবর্তন" title="Light / Dark">${UI.theme}</button>
</header>
<nav class="sidebar" id="sidebar" aria-label="সূচিপত্র">
${sidebar(nav, current)}
</nav>
<div class="scrim" data-action="nav"></div>
<div class="shell">
${body}
<footer class="site-foot">© ${config.year} ${escapeHtml(config.author)} · ${escapeHtml(config.title)} ${escapeHtml(config.titleSuffix)} · <a href="copyright.html">কপিরাইট</a></footer>
</div>
<script src="assets/js/book.js" defer></script>
</body>
</html>`;
}

function onPageNav(headings) {
  const h2 = headings.filter((h) => h.depth === 2);
  if (h2.length < 2) return '';
  return `<aside class="onpage" aria-label="এই পৃষ্ঠায়"><div class="onpage-title">এই অধ্যায়ে</div>${h2
    .map((h) => `<a href="#${h.id}">${escapeHtml(h.text)}</a>`)
    .join('')}</aside>`;
}

function pager(prev, next) {
  return `<nav class="pager" aria-label="পরবর্তী ও পূর্ববর্তী">${
    prev ? `<a class="prev" href="${prev.slug}.html"><div class="lbl">← আগের অংশ</div><div class="ttl">${escapeHtml(prev.navTitle)}</div></a>` : '<span></span>'
  }${next ? `<a class="next" href="${next.slug}.html"><div class="lbl">পরের অংশ →</div><div class="ttl">${escapeHtml(next.navTitle)}</div></a>` : ''}</nav>`;
}

function landing({ config, parts, docs, pdfs }) {
  const front = docs.filter((d) => d.kind === 'front' && d.slug !== 'copyright');
  const appx = docs.filter((d) => d.kind === 'appendix');
  const chapters = docs.filter((d) => d.kind === 'chapter');
  const figures = docs.reduce((n, d) => n + (d.figures || 0), 0);
  const first = front.find((d) => d.slug === 'preface') || docs[0];
  return `<main class="landing" id="main">
  <section class="land-hero">
    <div class="land-cover">${coverHtml(config)}</div>
    <div class="land-intro">
      <h1>${escapeHtml(config.title)}<span>${escapeHtml(config.titleSuffix)}</span></h1>
      <div class="bn">${escapeHtml(config.titleBn)}</div>
      <p>${escapeHtml(config.description)}</p>
      <div class="cta">
        <a class="btn primary" href="${first.slug}.html">${UI.book} পড়া শুরু করুন</a>
        <a class="btn" href="${chapters[0].slug}.html">অধ্যায় ১-এ যান</a>
        ${pdfs.map((p) => `<a class="btn" href="downloads/${p.file}">${UI.pdf} PDF (${p.label})</a>`).join('\n        ')}
      </div>
      <div class="land-stats">
        <div><b>${bn(parts.length)}</b>পর্ব</div>
        <div><b>${bn(chapters.length)}</b>অধ্যায়</div>
        <div><b>${bn(figures)}+</b>ডায়াগ্রাম</div>
        <div><b>${bn(appx.length)}</b>পরিশিষ্ট</div>
      </div>
    </div>
  </section>
  <section class="land-section">
    <h2>শুরুর কথা</h2>
    <p>বইটি কাদের জন্য, কীভাবে পড়বেন, আর গল্পের চরিত্রদের সাথে পরিচয়।</p>
    <div class="extra-list">${front.map((d) => `<a href="${d.slug}.html"><b>${escapeHtml(d.title)}</b><span>${escapeHtml(d.en || '')}</span></a>`).join('')}</div>
  </section>
  <section class="land-section">
    <h2>সূচিপত্র</h2>
    <p>${bn(parts.length)}টি পর্বে সাজানো ${bn(chapters.length)}টি অধ্যায়: ভিত্তি থেকে শুরু করে AI যুগের architecture আর বাস্তব কেস স্টাডি পর্যন্ত।</p>
    <div class="parts">
      ${parts
        .map(
          (p) => `<div class="part-card"><div class="pk">পর্ব ${bn(p.number)}</div><h3>${escapeHtml(p.bn)}</h3><p class="pb">${escapeHtml(p.blurb)}</p>${p.docs
            .map((d) => `<a href="${d.slug}.html"><span class="no">${String(d.number).padStart(2, '0')}</span><span>${escapeHtml(d.title)}</span></a>`)
            .join('')}</div>`
        )
        .join('\n      ')}
    </div>
  </section>
  <section class="land-section">
    <h2>পরিশিষ্ট</h2>
    <p>Interview প্রশ্নোত্তর, architect-এর টুলকিট, পরিভাষা ও তথ্যসূত্র।</p>
    <div class="extra-list">${appx.map((d) => `<a href="${d.slug}.html"><b>পরিশিষ্ট ${escapeHtml(d.letter)} · ${escapeHtml(d.title)}</b><span>${escapeHtml(d.en || '')}</span></a>`).join('')}</div>
  </section>
</main>`;
}

export function buildWeb({ root, outDir, config, docs, parts, pdfs, styles }) {
  fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(path.join(outDir, 'assets', 'css'), { recursive: true });
  fs.mkdirSync(path.join(outDir, 'assets', 'js'), { recursive: true });
  fs.mkdirSync(path.join(outDir, 'assets', 'fonts'), { recursive: true });
  fs.mkdirSync(path.join(outDir, 'assets', 'img'), { recursive: true });

  for (const f of fontFiles(root)) fs.copyFileSync(f.src, path.join(outDir, 'assets', 'fonts', f.name));
  const css = [fontFaceCss(root, (f) => `../fonts/${f.name}`), styles.content, styles.cover, styles.web].join('\n');
  fs.writeFileSync(path.join(outDir, 'assets', 'css', 'book.css'), css);
  fs.copyFileSync(path.join(root, 'build', 'web', 'book.js'), path.join(outDir, 'assets', 'js', 'book.js'));
  fs.writeFileSync(
    path.join(outDir, 'assets', 'img', 'favicon.svg'),
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#0b1530"/><g fill="none" stroke="#5eead4" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="12.5" y="5" width="7" height="5.5" rx="1.4"/><rect x="5" y="21.5" width="7" height="5.5" rx="1.4"/><rect x="20" y="21.5" width="7" height="5.5" rx="1.4"/><path d="M16 10.5v5M8.5 21.5v-3h15v3"/></g></svg>`
  );
  const assetsDir = path.join(root, 'assets');
  if (fs.existsSync(assetsDir)) copyDir(assetsDir, path.join(outDir, 'assets', 'img'));
  if (pdfs.length) {
    fs.mkdirSync(path.join(outDir, 'downloads'), { recursive: true });
    for (const p of pdfs) fs.copyFileSync(p.path, path.join(outDir, 'downloads', p.file));
  }

  // Navigation groups
  const nav = [
    { title: 'শুরুর কথা', items: docs.filter((d) => d.kind === 'front' && d.slug !== 'copyright') },
    ...parts.map((p) => ({ kicker: `পর্ব ${bn(p.number)} ·`, title: p.bn, items: p.docs })),
    { title: 'পরিশিষ্ট', items: docs.filter((d) => d.kind === 'appendix') },
  ];
  const order = docs.filter((d) => d.slug !== 'copyright');

  const search = [];
  for (const d of docs) {
    const i = order.indexOf(d);
    const prev = i > 0 ? order[i - 1] : null;
    const next = i >= 0 && i < order.length - 1 ? order[i + 1] : null;
    const html = d.html.replace(/@@ASSET@@/g, 'assets/img/');
    const body = `<div class="page-grid"><main class="page-main" id="main">${docHero(d, 'web')}<article class="prose">${html}</article>${pager(prev, next)}</main>${onPageNav(d.headings)}</div>`;
    fs.writeFileSync(
      path.join(outDir, d.slug + '.html'),
      layout({ config, title: `${d.title} · ${config.title} ${config.titleSuffix}`, body, nav, current: d, pdfs, description: d.subtitle })
    );
    for (const s of d.search) search.push({ d: d.navLabel, u: `${d.slug}.html${s.id ? '#' + s.id : ''}`, h: s.heading || d.title, x: s.text });
  }
  fs.writeFileSync(
    path.join(outDir, 'index.html'),
    layout({ config, title: `${config.title} ${config.titleSuffix} · ${config.titleBn}`, body: landing({ config, parts, docs, pdfs }), nav, current: null, pdfs })
  );
  fs.writeFileSync(path.join(outDir, 'assets', 'js', 'search-index.js'), `window.BOOK_SEARCH=${JSON.stringify(search)};`);
  return { pages: docs.length + 1, searchEntries: search.length };
}
