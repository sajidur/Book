// Markdown → HTML for the book: front matter, callouts, numbered figures,
// pre-rendered Mermaid diagrams, highlighted code and stable heading ids.
import { Marked, Renderer } from 'marked';
import hljs from 'highlight.js';
import crypto from 'node:crypto';

export const DIAGRAM_STYLE_VERSION = 'v5';

export function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function parseFrontMatter(src) {
  const m = src.match(/^﻿?---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { meta: {}, body: src };
  const meta = {};
  for (const line of m[1].split(/\r?\n/)) {
    const mm = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
    if (!mm) continue;
    let v = mm[2].trim();
    if (/^".*"$/.test(v)) v = v.slice(1, -1);
    meta[mm[1]] = /^\d+$/.test(v) ? Number(v) : v;
  }
  return { meta, body: src.slice(m[0].length) };
}

const ICONS = {
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2"/>',
  story: '<path d="M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
  spark: '<path d="M12 3l1.8 4.7 4.7 1.8-4.7 1.8L12 16l-1.8-4.7-4.7-1.8 4.7-1.8z"/><path d="M19 15l.8 2.2 2.2.8-2.2.8L19 21l-.8-2.2-2.2-.8 2.2-.8z"/>',
  alert: '<path d="M12 3l10 18H2z"/><path d="M12 10v5"/><path d="M12 18h.01"/>',
  bulb: '<path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z"/>',
  file: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1"/><path d="M9 10h6M9 14h6M9 18h4"/>',
  pencil: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M14 6l4 4"/>',
  chat: '<path d="M4 5h16v11H9l-5 4z"/><path d="M8 9h8M8 12h5"/>',
  quote: '<path d="M7 7h4v4c0 3-1.5 5-4 6"/><path d="M15 7h4v4c0 3-1.5 5-4 6"/>',
};

export const CALLOUTS = {
  GOALS: { label: 'এই অধ্যায়ে যা শিখবেন', icon: 'target' },
  STORY: { label: 'গল্প', icon: 'story' },
  ARCHITECT: { label: 'আর্কিটেক্টের নোট', icon: 'compass' },
  AI: { label: 'AI কোণ', icon: 'spark' },
  WARNING: { label: 'সতর্কতা', icon: 'alert' },
  TIP: { label: 'টিপস', icon: 'bulb' },
  CASE: { label: 'বাস্তব কেস', icon: 'file' },
  EXERCISE: { label: 'নিজে করে দেখুন', icon: 'pencil' },
  INTERVIEW: { label: 'ইন্টারভিউ কর্নার', icon: 'chat' },
  QUOTE: { label: 'মনে রাখুন', icon: 'quote' },
};

export function icon(name, cls = 'icon') {
  return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ''}</svg>`;
}

/** `> [!TYPE] Title` blockquotes → styled <aside> blocks whose body is still Markdown. */
export function transformCallouts(md) {
  const lines = md.split(/\r?\n/);
  const out = [];
  let inFence = false;
  for (let i = 0; i < lines.length; ) {
    const line = lines[i];
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      out.push(line);
      i++;
      continue;
    }
    const m = !inFence && line.match(/^>\s*\[!([A-Z]+)\]\s*(.*)$/);
    if (m && CALLOUTS[m[1]]) {
      const type = m[1];
      const c = CALLOUTS[type];
      const title = m[2].trim();
      const body = [];
      i++;
      while (i < lines.length && /^>/.test(lines[i])) body.push(lines[i].replace(/^>\s?/, '')), i++;
      const head =
        `<aside class="callout callout-${type.toLowerCase()}"><div class="callout-head">${icon(c.icon, 'callout-icon')}` +
        `<span class="callout-label">${c.label}</span>${title ? `<span class="callout-title">${escapeHtml(title)}</span>` : ''}</div><div class="callout-body">`;
      out.push(head, '', ...body, '', '</div></aside>', '');
      continue;
    }
    out.push(line);
    i++;
  }
  return out.join('\n');
}

/** Split a mermaid block into caption + code. */
export function splitDiagram(code) {
  const lines = code.replace(/\r/g, '').split('\n');
  let caption = '';
  const rest = [];
  for (const l of lines) {
    const m = l.match(/^\s*%%\s*caption:\s*(.*)$/i);
    if (m && !caption) caption = m[1].trim();
    else rest.push(l);
  }
  const src = rest.join('\n').trim();
  return { caption, code: src, hash: crypto.createHash('sha1').update(DIAGRAM_STYLE_VERSION + '\n' + src).digest('hex').slice(0, 16) };
}

/** All mermaid blocks in a markdown string. */
export function collectDiagrams(md) {
  const found = [];
  const re = /^```mermaid[^\n]*\n([\s\S]*?)^```/gm;
  let m;
  while ((m = re.exec(md))) found.push(splitDiagram(m[1]));
  return found;
}

function slugify(text, used, prefix) {
  const plain = text.replace(/<[^>]+>/g, '').replace(/&[a-z]+;/g, ' ').trim();
  const num = plain.match(/^([0-9A-Z]+(?:\.\d+)+)\s/);
  let base = num
    ? 's-' + num[1].replace(/\./g, '-')
    : plain.toLowerCase().replace(/[^\p{L}\p{M}\p{N}]+/gu, '-').replace(/^-+|-+$/g, '').slice(0, 48) || 'section';
  base = `${prefix}-${base}`;
  let id = base;
  for (let n = 2; used.has(id); n++) id = `${base}-${n}`;
  used.add(id);
  return id;
}

/**
 * Render one document.
 * ctx: { prefix (id prefix), label (figure label prefix e.g. "7" | "A" | ""), diagrams: Map(hash→svg), assets: Set }
 */
export function renderDocument(md, ctx) {
  const used = new Set();
  const headings = [];
  let fig = 0;
  const figLabel = () => (ctx.label ? `${ctx.label}.${++fig}` : `${++fig}`);
  const renderer = new Renderer();
  const base = new Renderer();

  renderer.heading = function ({ tokens, depth, text }) {
    const inner = this.parser.parseInline(tokens);
    const id = slugify(text, used, ctx.prefix);
    const plain = inner.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&');
    if (depth <= 3) headings.push({ depth, id, text: plain });
    return `<h${depth} id="${id}"><a class="anchor" href="#${id}" aria-hidden="true">#</a>${inner}</h${depth}>\n`;
  };

  renderer.code = function ({ text, lang }) {
    const language = (lang || '').trim().split(/\s+/)[0].toLowerCase();
    if (language === 'mermaid') {
      const d = splitDiagram(text);
      const svg = ctx.diagrams.get(d.hash);
      const n = figLabel();
      const body = svg
        ? svg
        : `<pre class="diagram-error">Diagram failed to render:\n${escapeHtml(d.code)}</pre>`;
      return (
        `<figure class="figure figure-diagram" id="${ctx.prefix}-fig-${n.replace(/\./g, '-')}">` +
        `<div class="diagram">${body}</div>` +
        `<figcaption><span class="fig-label">চিত্র ${n}</span>${d.caption ? ' ' + inlineMd(d.caption) : ''}</figcaption></figure>\n`
      );
    }
    let html;
    if (language && language !== 'text' && hljs.getLanguage(language)) {
      html = hljs.highlight(text, { language, ignoreIllegals: true }).value;
    } else html = escapeHtml(text);
    const label = language && language !== 'text' ? `<span class="code-lang">${escapeHtml(language)}</span>` : '';
    const cls = language === 'text' || !language ? ' code-plain' : '';
    return `<div class="code-block${cls}">${label}<pre><code class="hljs">${html}</code></pre></div>\n`;
  };

  renderer.paragraph = function (token) {
    const t = token.tokens || [];
    const only = t.filter((x) => !(x.type === 'text' && !x.text.trim()));
    if (only.length === 1 && only[0].type === 'image') return figureFor(only[0]);
    return base.paragraph.call(this, token);
  };

  renderer.table = function (token) {
    return `<div class="table-wrap">${base.table.call(this, token)}</div>\n`;
  };

  renderer.link = function (token) {
    const html = base.link.call(this, token);
    return /^https?:/.test(token.href) ? html.replace('<a ', '<a target="_blank" rel="noopener" ') : html;
  };

  function figureFor(img) {
    const n = figLabel();
    let href = img.href;
    if (!/^(https?:|data:)/.test(href)) {
      href = decodeURI(href).replace(/^\.?\//, '');
      ctx.assets.add(href);
      href = encodeURI(ctx.assetBase + href.replace(/^assets\//, ''));
    }
    return (
      `<figure class="figure figure-image" id="${ctx.prefix}-fig-${n.replace(/\./g, '-')}">` +
      `<img src="${href}" alt="${escapeHtml(img.text)}" loading="lazy">` +
      `<figcaption><span class="fig-label">চিত্র ${n}</span> ${inlineMd(img.text)}</figcaption></figure>\n`
    );
  }

  const marked = new Marked({ gfm: true, breaks: false, renderer });
  const inlineMarked = new Marked({ gfm: true });
  function inlineMd(s) {
    return inlineMarked.parseInline(s);
  }
  const html = marked.parse(transformCallouts(md));
  return { html, headings, figures: fig };
}

/** Plain-text sections for the client-side search index. */
export function searchSections(html, headings) {
  const clean = html.replace(/<svg[\s\S]*?<\/svg>/g, ' ').replace(/<figure[\s\S]*?<\/figure>/g, ' ');
  const parts = clean.split(/(?=<h[23] id=")/);
  const out = [];
  for (const p of parts) {
    const idm = p.match(/^<h[23] id="([^"]+)"/);
    const h = idm ? headings.find((x) => x.id === idm[1]) : null;
    const text = p
      .replace(/<a class="anchor"[^>]*>#<\/a>/g, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;|&amp;|&lt;|&gt;|&quot;|&#39;/g, (e) => ({ '&nbsp;': ' ', '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'" })[e])
      .replace(/\s+/g, ' ')
      .trim();
    if (!text) continue;
    out.push({ id: h ? h.id : '', heading: h ? h.text : '', text: text.slice(0, 1200) });
  }
  return out;
}
