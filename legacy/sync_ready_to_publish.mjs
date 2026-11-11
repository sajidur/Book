import fs from 'fs';
import path from 'path';
const mdDir = path.join(process.cwd(), 'Markdown_Version');
const htmlPath = path.join(process.cwd(), 'Practical_System_Design_Ready_to_Publish.html');
const files = fs.readdirSync(mdDir).filter(f => f.endsWith('.md'));
files.sort((a, b) => {
  const matchA = a.match(/(\d+)/);
  const matchB = b.match(/(\d+)/);
  const numA = matchA ? parseInt(matchA[1], 10) : 999;
  const numB = matchB ? parseInt(matchB[1], 10) : 999;
  return numA - numB;
});
let combinedMd = '';
for (const file of files) {
  const content = fs.readFileSync(path.join(mdDir, file), 'utf8');
  const id = file.replace('.md', '');
  combinedMd += `<div id="${id}" class="chapter-section">\n\n${content}\n\n</div>\n\n<hr class="chapter-divider"/>\n\n`;
}
const html = fs.readFileSync(htmlPath, 'utf8');
const start = html.indexOf('<script id="markdown-content" type="text/markdown">');
if (start === -1) throw new Error('Markdown script start not found');
const end = html.indexOf('</script>', start);
if (end === -1) throw new Error('Markdown script end not found');
const prefix = html.slice(0, start + '<script id="markdown-content" type="text/markdown">'.length);
const suffix = html.slice(end);
fs.writeFileSync(htmlPath, prefix + '\n' + combinedMd + suffix, 'utf8');
console.log('Synced Practical_System_Design_Ready_to_Publish.html with Markdown source');
