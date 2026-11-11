const fs = require('fs');
const path = require('path');

const mdDir = path.join(__dirname, 'Markdown_Version');
const outputFileHtml = path.join(__dirname, 'Practical_System_Design_Book.html');

const files = fs.readdirSync(mdDir).filter(f => f.endsWith('.md'));

// Sort them properly
files.sort((a, b) => {
    const matchA = a.match(/(\d+)/);
    const matchB = b.match(/(\d+)/);
    const numA = matchA ? parseInt(matchA[1], 10) : 999;
    const numB = matchB ? parseInt(matchB[1], 10) : 999;
    return numA - numB;
});

let combinedMd = '';
let navigationHtml = '';

for (const file of files) {
    const filePath = path.join(mdDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    const titleMatch = content.match(/^# (.*)/m);
    const title = titleMatch ? titleMatch[1].replace(/# /g, '').trim() : file;
    const id = file.replace('.md', '');
    
    navigationHtml += `<a href="#${id}" class="nav-link">${title}</a>\n`;
    
    // Instead of display: none, we render everything continuously
    combinedMd += `<div id="${id}" class="chapter-section">\n\n${content}\n\n</div>\n\n<hr class="chapter-divider"/>\n\n`;
}

const htmlTemplate = `<!DOCTYPE html>
<html lang="bn">
<head>
    <meta charset="UTF-8">
    <title>Practical System Design in Bangla</title>
    <!-- Use reliable CDN for marked and mermaid -->
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
    
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif, 'Kalpurush', 'Siyam Rupali';
            margin: 0;
            padding: 0;
            background-color: #f8f9fa;
            display: flex;
            height: 100vh;
            overflow: hidden;
            color: #333;
        }
        /* Sidebar Navigation */
        #sidebar {
            width: 320px;
            background-color: #f1f3f5;
            border-right: 1px solid #dee2e6;
            overflow-y: auto;
            padding-top: 20px;
            padding-bottom: 50px;
        }
        #sidebar h2 {
            text-align: center;
            font-size: 1.3em;
            margin-bottom: 20px;
            padding: 0 15px;
            color: #2c3e50;
            border-bottom: 2px solid #3498db;
            padding-bottom: 10px;
            margin-left: 20px;
            margin-right: 20px;
        }
        #sidebar a {
            display: block;
            color: #495057;
            padding: 10px 20px;
            text-decoration: none;
            font-size: 0.95em;
            line-height: 1.4;
            transition: all 0.2s;
            border-left: 4px solid transparent;
        }
        #sidebar a:hover {
            background-color: #e9ecef;
            color: #212529;
        }
        #sidebar a.active {
            background-color: #e3f2fd;
            color: #1976d2;
            border-left: 4px solid #1976d2;
            font-weight: 600;
        }
        
        /* Main Content */
        #main-content {
            flex-grow: 1;
            overflow-y: auto;
            padding: 0;
            scroll-behavior: smooth;
        }
        .book-container {
            background-color: #ffffff;
            max-width: 900px;
            margin: 0 auto;
            padding: 60px 80px;
            box-shadow: 0 0 20px rgba(0,0,0,0.03);
            min-height: 100vh;
        }
        
        .chapter-section {
            margin-bottom: 60px;
        }
        .chapter-divider {
            border: 0;
            height: 1px;
            background: #e9ecef;
            margin: 60px 0;
        }
        
        /* Typography */
        h1, h2, h3, h4 { color: #2c3e50; font-weight: 600; }
        h1 { 
            font-size: 2.5em; 
            margin-top: 0; 
            margin-bottom: 40px;
            line-height: 1.3;
        }
        h2 { 
            font-size: 1.8em; 
            margin-top: 50px; 
            margin-bottom: 20px;
            color: #1976d2;
        }
        h3 { font-size: 1.4em; margin-top: 30px; }
        
        p, li { 
            line-height: 1.8; 
            font-size: 1.15em; 
            color: #34495e; 
        }
        li { margin-bottom: 10px; }
        
        /* Mermaid */
        .mermaid { 
            text-align: center; 
            margin: 40px 0; 
            padding: 20px; 
            background: #fafbfc; 
            border: 1px solid #e1e4e8; 
            border-radius: 8px; 
        }
        
        /* Elements */
        pre { background: #f8f9fa; padding: 20px; border-radius: 6px; overflow-x: auto; border: 1px solid #e9ecef; }
        code { font-family: 'Courier New', Courier, monospace; background: #f8f9fa; padding: 2px 6px; border-radius: 4px; color: #c0392b; font-size: 0.9em; }
        blockquote { 
            border-left: 5px solid #1976d2; 
            margin: 30px 0; 
            padding: 15px 25px; 
            background: #f1f8ff; 
            color: #24292e; 
            border-radius: 0 8px 8px 0;
            font-style: italic;
        }
        table { border-collapse: collapse; width: 100%; margin: 30px 0; font-size: 1.05em; }
        table, th, td { border: 1px solid #dee2e6; }
        th, td { padding: 15px; text-align: left; }
        th { background-color: #f8f9fa; color: #495057; }
        
        /* Print styles */
        @media print {
            #sidebar { display: none; }
            #main-content { overflow: visible; }
            .book-container { padding: 0; box-shadow: none; max-width: 100%; }
            .chapter-section { page-break-after: always; }
            .chapter-divider { display: none; }
        }
    </style>
</head>
<body>

    <div id="sidebar">
        <h2>System Design</h2>
        ${navigationHtml}
    </div>

    <div id="main-content">
        <div class="book-container" id="rendered-content">
            <!-- Content will be rendered here -->
            <div style="text-align:center; padding:100px; color:#7f8c8d;">
                <h2>Rendering book...</h2>
                <p>Please wait while the chapters and diagrams are being processed.</p>
            </div>
        </div>
    </div>

    <script id="markdown-content" type="text/markdown">
${combinedMd.replace(/`/g, '\\`')}
    </script>

    <script>
        // Initialize mermaid
        mermaid.initialize({ startOnLoad: false, theme: 'default', securityLevel: 'loose' });

        const renderer = new marked.Renderer();
        const originalCode = renderer.code.bind(renderer);
        renderer.code = function(code, language, isEscaped) {
            if (language === 'mermaid') {
                return \`<div class="mermaid">\${code}</div>\`;
            }
            return originalCode(code, language, isEscaped);
        };

        // Render everything continuously
        const markdownContent = document.getElementById('markdown-content').textContent;
        const targetDiv = document.getElementById('rendered-content');
        
        targetDiv.innerHTML = marked.parse(markdownContent, { renderer });

        // Run mermaid after injecting HTML
        mermaid.run({
            querySelector: '.mermaid'
        }).catch(err => console.error(err));

        // Intersection Observer to highlight active sidebar link during scrolling
        const sections = document.querySelectorAll('.chapter-section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        const observerOptions = {
            root: document.getElementById('main-content'),
            rootMargin: '-50px 0px -70% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    // Remove active from all
                    navLinks.forEach(link => link.classList.remove('active'));
                    // Add active to current
                    const activeLink = document.querySelector(\`.nav-link[href="#\${id}"]\`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                        // Optional: scroll sidebar to keep active link in view
                        activeLink.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });
        
        // Handle click on sidebar to smooth scroll
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    </script>
</body>
</html>`;

const safeHtml = htmlTemplate.replace('${combinedMd.replace(/`/g, \'\\\\`\')}', () => combinedMd).replace('${navigationHtml}', () => navigationHtml);

fs.writeFileSync(outputFileHtml, safeHtml, 'utf8');
console.log('Continuous Book generated at: ' + outputFileHtml);
