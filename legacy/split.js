const fs = require('fs');
const path = require('path');

const content = fs.readFileSync('e:\\Book\\extracted_text_with_newlines.txt', 'utf8');
const lines = content.split('\n');

let currentChapter = '00_Table_of_Contents';
let chapterContent = [];
const outDir = 'e:\\Book\\Markdown_Version';

if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
}

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const match = line.match(/^Chapter (\d+) — (.*)/);
    
    if (match) {
        // Save previous chapter
        if (chapterContent.length > 0) {
            fs.writeFileSync(path.join(outDir, `${currentChapter}.md`), chapterContent.join('\n'));
        }
        
        // Start new chapter
        const chapterNum = match[1].padStart(2, '0');
        const chapterName = match[2].replace(/[^a-zA-Z0-9]/g, '_');
        currentChapter = `Chapter_${chapterNum}_${chapterName}`;
        chapterContent = [`# ${line}`, ''];
    } else if (line.trim() === 'Table of Contents') {
         if (chapterContent.length > 0) {
            fs.writeFileSync(path.join(outDir, `${currentChapter}.md`), chapterContent.join('\n'));
        }
        currentChapter = '00_Table_of_Contents';
        chapterContent = ['# Table of Contents', ''];
    } else {
        chapterContent.push(line);
    }
}

// Save last chapter
if (chapterContent.length > 0) {
    fs.writeFileSync(path.join(outDir, `${currentChapter}.md`), chapterContent.join('\n'));
}

console.log("Splitting done.");
