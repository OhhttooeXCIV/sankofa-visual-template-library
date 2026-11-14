import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const source = path.join(root, 'docs', 'public');
const output = path.join(root, 'public', 'docs');
fs.mkdirSync(output, { recursive: true });
const escape = (value) => value.replace(/[&<>"']/g, (char) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[char]));
const markdownToHtml = (markdown) => markdown.split(/\r?\n/).map((line) => {
  if (line.startsWith('# ')) return `<h1>${escape(line.slice(2))}</h1>`;
  if (line.startsWith('## ')) return `<h2>${escape(line.slice(3))}</h2>`;
  if (line.startsWith('### ')) return `<h3>${escape(line.slice(4))}</h3>`;
  if (line.startsWith('- ')) return `<li>${escape(line.slice(2))}</li>`;
  if (!line.trim()) return '';
  return `<p>${escape(line).replace(/`([^`]+)`/g, '<code>$1</code>')}</p>`;
}).join('\n');

for (const file of fs.readdirSync(source).filter((name) => name.endsWith('.md'))) {
  const title = path.basename(file, '.md').replaceAll('-', ' ');
  const body = markdownToHtml(fs.readFileSync(path.join(source, file), 'utf8'));
  fs.writeFileSync(path.join(output, file.replace('.md', '.html')), `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Sankofa — ${escape(title)}</title><style>body{font:16px/1.6 system-ui,sans-serif;max-width:760px;margin:0 auto;padding:2rem;color:#20180f;background:#fffaf2}h1,h2{color:#7a470d}code{background:#f0e3ce;padding:.15rem .3rem;border-radius:.25rem}</style></head><body>${body}</body></html>`);
}
console.log(`Built ${fs.readdirSync(source).filter((name) => name.endsWith('.md')).length} public documentation pages.`);
