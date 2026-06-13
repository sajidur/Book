import fs from 'fs';
import path from 'path';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const files = ['Systemanalysisanddesign.pdf', 'SystemDesignInterview.pdf'];
for (const file of files) {
  const filePath = path.resolve(file);
  const rawData = fs.readFileSync(filePath);
  const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(rawData) });
  const pdfDocument = await loadingTask.promise;
  let text = '';
  for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
    const page = await pdfDocument.getPage(pageNum);
    const content = await page.getTextContent();
    const pageText = content.items.map(item => item.str).join(' ');
    text += pageText + '\n\n';
  }
  fs.writeFileSync(file.replace(/\.pdf$/i, '.txt'), text, 'utf8');
  console.log('Extracted', file, 'with', pdfDocument.numPages, 'pages');
}
