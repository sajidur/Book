// Pre-renders Mermaid diagrams to static SVG with headless Chrome, so the web
// and print editions need no JavaScript or CDN to show diagrams.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import puppeteer from 'puppeteer-core';
import { fontFaceCss } from './fonts.mjs';

const CANDIDATES = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  '/usr/bin/google-chrome',
  '/usr/bin/google-chrome-stable',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
];

export function findChrome() {
  const p = CANDIDATES.find((c) => c && fs.existsSync(c));
  if (!p) throw new Error('Chrome/Edge not found. Set CHROME_PATH to a Chromium-based browser executable.');
  return p;
}

export async function launchBrowser() {
  return puppeteer.launch({
    executablePath: findChrome(),
    headless: true,
    args: ['--allow-file-access-from-files', '--font-render-hinting=none', '--disable-gpu'],
  });
}

// One visual language for every diagram in the book.
const C = {
  ink: '#1E293B',
  line: '#64748B',
  indigo: ['#EEF2FF', '#4F46E5', '#1E1B4B'],
};

const MERMAID_CONFIG = {
  startOnLoad: false,
  theme: 'base',
  securityLevel: 'strict',
  fontFamily: '"Hind Siliguri", "Noto Serif Bengali", sans-serif',
  themeVariables: {
    fontFamily: '"Hind Siliguri", "Noto Serif Bengali", sans-serif',
    fontSize: '15px',
    primaryColor: C.indigo[0],
    primaryBorderColor: C.indigo[1],
    primaryTextColor: C.indigo[2],
    secondaryColor: '#ECFDF5',
    secondaryBorderColor: '#059669',
    secondaryTextColor: '#064E3B',
    tertiaryColor: '#FFF7ED',
    tertiaryBorderColor: '#EA580C',
    tertiaryTextColor: '#7C2D12',
    lineColor: C.line,
    textColor: C.ink,
    mainBkg: C.indigo[0],
    clusterBkg: '#F8FAFC',
    clusterBorder: '#94A3B8',
    titleColor: C.ink,
    edgeLabelBackground: '#FFFFFF',
    nodeBorder: C.indigo[1],
    noteBkgColor: '#FEF9C3',
    noteBorderColor: '#CA8A04',
    noteTextColor: '#422006',
    actorBkg: '#EEF2FF',
    actorBorder: '#4F46E5',
    actorTextColor: '#1E1B4B',
    actorLineColor: '#94A3B8',
    signalColor: '#334155',
    signalTextColor: '#0F172A',
    labelBoxBkgColor: '#F1F5F9',
    labelBoxBorderColor: '#64748B',
    labelTextColor: '#0F172A',
    loopTextColor: '#0F172A',
    activationBkgColor: '#E0E7FF',
    activationBorderColor: '#4F46E5',
    sequenceNumberColor: '#FFFFFF',
    git0: '#4F46E5',
    pie1: '#4F46E5', pie2: '#0D9488', pie3: '#EA580C', pie4: '#7C3AED', pie5: '#DB2777', pie6: '#65A30D', pie7: '#0284C7',
    pieStrokeColor: '#FFFFFF',
    pieTitleTextSize: '18px',
    pieSectionTextColor: '#FFFFFF',
    quadrant1Fill: '#ECFDF5', quadrant2Fill: '#EEF2FF', quadrant3Fill: '#F8FAFC', quadrant4Fill: '#FFF7ED',
    cScale0: '#C7D2FE', cScale1: '#A7F3D0', cScale2: '#FED7AA', cScale3: '#DDD6FE', cScale4: '#FBCFE8', cScale5: '#BAE6FD',
    cScale6: '#FDE68A', cScale7: '#C7D2FE', cScale8: '#A7F3D0', cScale9: '#FED7AA', cScale10: '#DDD6FE', cScale11: '#BAE6FD',
    cScaleLabel0: '#1E1B4B', cScaleLabel1: '#064E3B', cScaleLabel2: '#7C2D12', cScaleLabel3: '#4C1D95', cScaleLabel4: '#831843', cScaleLabel5: '#0C4A6E',
    cScaleLabel6: '#78350F', cScaleLabel7: '#1E1B4B', cScaleLabel8: '#064E3B', cScaleLabel9: '#7C2D12', cScaleLabel10: '#4C1D95', cScaleLabel11: '#0C4A6E',
    xyChart: { plotColorPalette: '#4F46E5, #E11D48, #0D9488, #EA580C', backgroundColor: '#FFFFFF' },
    taskBkgColor: '#E0E7FF', taskBorderColor: '#4F46E5', taskTextColor: '#1E1B4B', taskTextLightColor: '#1E1B4B',
    taskTextDarkColor: '#1E1B4B', taskTextOutsideColor: '#1E293B', critBkgColor: '#FECDD3', critBorderColor: '#E11D48',
    sectionBkgColor: '#F8FAFC', altSectionBkgColor: '#FFFFFF', sectionBkgColor2: '#F1F5F9', gridColor: '#E2E8F0',
    doneTaskBkgColor: '#DCFCE7', doneTaskBorderColor: '#16A34A', activeTaskBkgColor: '#FEF3C7', activeTaskBorderColor: '#D97706',
  },
  flowchart: { htmlLabels: true, curve: 'basis', padding: 14, nodeSpacing: 38, rankSpacing: 48, useMaxWidth: true, wrappingWidth: 210 },
  sequence: { useMaxWidth: true, mirrorActors: false, actorMargin: 60, messageMargin: 34, boxMargin: 8, noteMargin: 10, wrap: true, width: 170 },
  state: { useMaxWidth: true },
  er: { useMaxWidth: true, layoutDirection: 'TB' },
  timeline: { useMaxWidth: true, disableMulticolor: false },
  mindmap: { useMaxWidth: true, padding: 12 },
  gantt: { useMaxWidth: true },
};

// Semantic node classes available in every flowchart: A:::db, B:::ai …
const CLASS_DEFS = `
classDef client fill:#E0F2FE,stroke:#0284C7,color:#0C4A6E,stroke-width:1.5px
classDef svc fill:#EEF2FF,stroke:#4F46E5,color:#1E1B4B,stroke-width:1.5px
classDef db fill:#ECFDF5,stroke:#059669,color:#064E3B,stroke-width:1.5px
classDef cache fill:#FFF7ED,stroke:#EA580C,color:#7C2D12,stroke-width:1.5px
classDef queue fill:#FEF3C7,stroke:#D97706,color:#78350F,stroke-width:1.5px
classDef ai fill:#F5F3FF,stroke:#7C3AED,color:#4C1D95,stroke-width:1.8px
classDef ext fill:#F8FAFC,stroke:#64748B,color:#0F172A,stroke-dasharray:5 3
classDef bad fill:#FFE4E6,stroke:#E11D48,color:#881337,stroke-width:1.8px
classDef good fill:#DCFCE7,stroke:#16A34A,color:#14532D,stroke-width:1.8px
classDef human fill:#FDF2F8,stroke:#DB2777,color:#831843,stroke-width:1.5px
classDef infra fill:#F1F5F9,stroke:#334155,color:#0F172A,stroke-width:1.5px
classDef note fill:#FEFCE8,stroke:#CA8A04,color:#422006`;

function withClassDefs(code) {
  return /^\s*(graph|flowchart)\b/.test(code) ? code + '\n' + CLASS_DEFS : code;
}

/**
 * Render diagrams that are not yet cached. Returns Map(hash → svg) and a list of failures.
 */
export async function renderDiagrams(diagrams, { root, cacheDir, log = console.log }) {
  fs.mkdirSync(cacheDir, { recursive: true });
  const unique = new Map();
  for (const d of diagrams) unique.set(d.hash, d);
  const todo = [...unique.values()].filter((d) => !fs.existsSync(path.join(cacheDir, d.hash + '.svg')));
  const failures = [];

  if (todo.length) {
    log(`  rendering ${todo.length} new diagram(s) (${unique.size - todo.length} cached)…`);
    const fontCss = fontFaceCss(root, (f) => pathToFileURL(f.src).href);
    const harness = path.join(cacheDir, '_render.html');
    fs.writeFileSync(
      harness,
      `<!doctype html><html><head><meta charset="utf-8"><style>${fontCss}
      body{margin:0;font-family:"Hind Siliguri","Noto Serif Bengali",sans-serif;font-size:16px;line-height:1.5}
      #stage{width:860px}</style></head><body><div id="stage"></div></body></html>`
    );
    const browser = await launchBrowser();
    try {
      const page = await browser.newPage();
      await page.goto(pathToFileURL(harness).href);
      await page.addScriptTag({ path: path.join(root, 'node_modules', 'mermaid', 'dist', 'mermaid.min.js') });
      await page.evaluate(async () => {
        const probes = ['400 16px "Hind Siliguri"', '600 16px "Hind Siliguri"', '700 16px "Hind Siliguri"', '400 16px "Noto Serif Bengali"'];
        for (const p of probes) await document.fonts.load(p, 'বাংলা ABC');
        await document.fonts.ready;
      });
      await page.evaluate((cfg) => window.mermaid.initialize(cfg), MERMAID_CONFIG);
      for (const d of todo) {
        try {
          const svg = await page.evaluate(
            async (id, code) => {
              const stage = document.getElementById('stage');
              stage.innerHTML = '';
              const { svg } = await window.mermaid.render(id, code, stage);
              return svg;
            },
            'dg-' + d.hash,
            withClassDefs(d.code)
          );
          fs.writeFileSync(path.join(cacheDir, d.hash + '.svg'), svg);
        } catch (e) {
          failures.push({ hash: d.hash, code: d.code, error: String(e && e.message ? e.message : e).split('\n').slice(0, 4).join(' ') });
        }
      }
    } finally {
      await browser.close();
    }
  } else {
    log(`  all ${unique.size} diagrams cached`);
  }

  const map = new Map();
  for (const d of unique.values()) {
    const f = path.join(cacheDir, d.hash + '.svg');
    if (fs.existsSync(f)) map.set(d.hash, fs.readFileSync(f, 'utf8'));
  }
  return { map, failures };
}
