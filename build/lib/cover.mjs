// Cover, title page and back cover. The illustration is a stylised layered
// architecture (users → gateway → services → event stream → data, with an AI
// node), drawn as plain SVG so it stays crisp in print and on screen.
import { escapeHtml } from './markdown.mjs';

export function coverArt({ id = 'art' } = {}) {
  const users = [170, 270, 370, 470, 570, 670, 770, 870];
  const services = [
    { x: 120, label: 'AUTH' },
    { x: 310, label: 'ORDER' },
    { x: 500, label: 'PAYMENT' },
    { x: 690, label: 'REPORT' },
  ];
  const stores = [
    { x: 190, label: 'SQL' },
    { x: 390, label: 'CACHE' },
    { x: 590, label: 'SEARCH' },
    { x: 790, label: 'OBJECT' },
  ];
  const svcCx = (s) => s.x + 75;
  let edges = '';
  for (const u of users) edges += `<path d="M${u} 92 C ${u} 150, 500 150, 500 196" class="e e-soft"/>`;
  for (const s of services) edges += `<path d="M500 252 C 500 290, ${svcCx(s)} 290, ${svcCx(s)} 322" class="e"/>`;
  for (const s of services) edges += `<path d="M${svcCx(s)} 380 L ${svcCx(s)} 446" class="e e-flow"/>`;
  for (const d of stores) edges += `<path d="M${d.x + 20} 494 C ${d.x + 20} 530, ${d.x + 20} 530, ${d.x + 20} 560" class="e"/>`;
  edges += `<path d="M845 351 C 880 351, 880 300, 902 292" class="e e-ai"/>`;
  edges += `<path d="M500 224 C 700 224, 850 230, 902 270" class="e e-ai"/>`;

  const userDots = users
    .map((u) => `<g class="user"><circle cx="${u}" cy="62" r="11"/><path d="M${u - 17} 92 a17 15 0 0 1 34 0z"/></g>`)
    .join('');
  const svc = services
    .map(
      (s, i) =>
        `<g class="svc ${i === 2 ? 'svc-hot' : ''}"><rect x="${s.x}" y="322" width="150" height="58" rx="12"/><text x="${svcCx(s)}" y="357">${s.label}</text></g>`
    )
    .join('');
  const db = stores
    .map(
      (d, i) =>
        `<g class="db ${i === 1 ? 'db-cache' : ''}"><path d="M${d.x - 30} 570 v52 a50 13 0 0 0 100 0 v-52"/><ellipse cx="${d.x + 20}" cy="570" rx="50" ry="13"/><text x="${d.x + 20}" y="608">${d.label}</text></g>`
    )
    .join('');
  const dots = [];
  for (let y = 20; y < 700; y += 34) for (let x = 14; x < 1000; x += 34) dots.push(`<circle cx="${x}" cy="${y}" r="1.1"/>`);

  return `<svg class="cover-art" viewBox="0 0 1000 700" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Layered system architecture illustration">
  <defs>
    <radialGradient id="${id}-glow" cx="50%" cy="40%" r="60%"><stop offset="0" stop-color="#2DD4BF" stop-opacity=".22"/><stop offset="1" stop-color="#2DD4BF" stop-opacity="0"/></radialGradient>
    <radialGradient id="${id}-ai" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#A78BFA" stop-opacity=".55"/><stop offset="1" stop-color="#A78BFA" stop-opacity="0"/></radialGradient>
    <linearGradient id="${id}-bus" x1="0" x2="1"><stop offset="0" stop-color="#F59E0B"/><stop offset=".5" stop-color="#FBBF24"/><stop offset="1" stop-color="#F59E0B"/></linearGradient>
  </defs>
  <style>
    .cover-art .grid circle{fill:#94A3B8;opacity:.18}
    .cover-art .e{fill:none;stroke:#5EEAD4;stroke-width:1.6;opacity:.75}
    .cover-art .e-soft{opacity:.35;stroke-width:1.2}
    .cover-art .e-flow{stroke:#FBBF24;stroke-dasharray:3 5;opacity:.9}
    .cover-art .e-ai{stroke:#C4B5FD;stroke-dasharray:6 5;opacity:.9}
    .cover-art .user circle,.cover-art .user path{fill:#CBD5E1;opacity:.85}
    .cover-art text{font-family:"JetBrains Mono",monospace;font-size:15px;letter-spacing:.14em;text-anchor:middle;fill:#E2E8F0;font-weight:700}
    .cover-art .gw rect{fill:#0F766E;stroke:#5EEAD4;stroke-width:2}
    .cover-art .svc rect{fill:#13213F;stroke:#5EEAD4;stroke-width:1.6}
    .cover-art .svc-hot rect{stroke:#FBBF24;stroke-width:2.4}
    .cover-art .bus rect{fill:url(#${id}-bus);opacity:.95}
    .cover-art .bus text{fill:#1C1917}
    .cover-art .db path,.cover-art .db ellipse{fill:#0E2A3B;stroke:#34D399;stroke-width:1.6}
    .cover-art .db-cache path,.cover-art .db-cache ellipse{stroke:#FB923C}
    .cover-art .ai polygon{fill:#3B1F7A;stroke:#C4B5FD;stroke-width:2.2}
    .cover-art .ai text{fill:#EDE9FE;font-size:20px}
  </style>
  <g class="grid">${dots.join('')}</g>
  <ellipse cx="500" cy="300" rx="520" ry="330" fill="url(#${id}-glow)"/>
  ${edges}
  ${userDots}
  <g class="gw"><rect x="380" y="196" width="240" height="56" rx="28"/><text x="500" y="230">API GATEWAY</text></g>
  ${svc}
  <g class="bus"><rect x="110" y="446" width="780" height="48" rx="10"/><text x="500" y="476">EVENT STREAM · QUEUE</text></g>
  ${db}
  <circle cx="925" cy="282" r="78" fill="url(#${id}-ai)"/>
  <g class="ai"><polygon points="925,236 965,259 965,305 925,328 885,305 885,259"/><text x="925" y="289">AI</text></g>
</svg>`;
}

export function coverHtml(config, { kind = 'front' } = {}) {
  if (kind === 'back') {
    return `<section class="cover cover-back">
  <div class="back-inner">
    <div class="back-kicker">${escapeHtml(config.title)} ${escapeHtml(config.titleSuffix)}</div>
    ${config.backCover.map((p, i) => `<p class="${i === 0 ? 'back-hook' : ''}">${escapeHtml(p)}</p>`).join('\n    ')}
    <ul class="back-topics">
      ${['Scalability', 'Database', 'Caching', 'API', 'Security', 'Microservices', 'Kafka', 'Observability', 'Kubernetes', 'CI/CD', 'LLM & RAG', 'AI Agents', 'ERP', 'Fintech', 'Interview'].map((t) => `<li>${t}</li>`).join('')}
    </ul>
  </div>
  <div class="back-art">${coverArt({ id: 'back' })}</div>
  <div class="back-foot"><span>${escapeHtml(config.author)}</span><span>${escapeHtml(config.publishedIn)} · ${config.year}</span></div>
</section>`;
  }
  return `<section class="cover cover-front">
  <div class="cover-top">
    <div class="cover-kicker">${escapeHtml(config.tagline)}</div>
    <h1 class="cover-title">${escapeHtml(config.title)}<span>${escapeHtml(config.titleSuffix)}</span></h1>
    <div class="cover-bn">${escapeHtml(config.titleBn)}</div>
    <p class="cover-sub">${escapeHtml(config.subtitle)}</p>
  </div>
  <div class="cover-art-wrap">${coverArt({ id: 'front' })}</div>
  <div class="cover-bottom">
    <div class="cover-author">${escapeHtml(config.author)}</div>
    <div class="cover-edition">${escapeHtml(config.editionBn)} · ${config.year}</div>
  </div>
</section>`;
}

export function titlePageHtml(config) {
  return `<section class="title-page">
  <div class="tp-mark">${coverArt({ id: 'tp' })}</div>
  <h1 class="tp-title">${escapeHtml(config.title)} <span>${escapeHtml(config.titleSuffix)}</span></h1>
  <div class="tp-bn">${escapeHtml(config.titleBn)}</div>
  <p class="tp-sub">${escapeHtml(config.subtitle)}</p>
  <div class="tp-rule"></div>
  <div class="tp-author">${escapeHtml(config.author)}</div>
  <div class="tp-edition">${escapeHtml(config.edition)} · ${config.year}</div>
</section>`;
}
