// Build a static HTML gallery from every .html/.htm file in /pages.
// No dependencies required: Node.js 18+.
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PAGES_DIR = path.join(ROOT, 'pages');
const DIST = path.join(ROOT, 'dist');
const TEMPLATE = path.join(ROOT, 'src', 'index.template.html');
const CONFIG_FILE = path.join(ROOT, 'site.config.json');

let config = {
  siteTitle: 'ABHISHEK TOOLS',
  eyebrow: 'A DIGITAL PLAYGROUND',
  tagline: 'A curated space for useful, beautiful tools.',
  defaultPage: 'first',
  accent: '#9b8cff'
};
try {
  config = { ...config, ...JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8')) };
} catch (_) {}

if (!fs.existsSync(PAGES_DIR)) fs.mkdirSync(PAGES_DIR, { recursive: true });
const files = fs.readdirSync(PAGES_DIR, { withFileTypes: true })
  .filter(entry => entry.isFile() && /\.(html?|HTML?)$/i.test(entry.name) && !entry.name.startsWith('.'))
  .map(entry => entry.name)
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(path.join(DIST, 'pages'), { recursive: true });
for (const file of files) {
  fs.copyFileSync(path.join(PAGES_DIR, file), path.join(DIST, 'pages', file));
}

const encodePath = file => 'pages/' + encodeURIComponent(file);
const pages = files.map((file, index) => ({
  id: `page-${index + 1}`,
  name: file,
  title: file.replace(/\.html?$/i, ''),
  src: encodePath(file),
  extension: file.split('.').pop().toUpperCase()
}));
const safeJson = JSON.stringify({
  title: config.siteTitle,
  eyebrow: config.eyebrow,
  tagline: config.tagline,
  defaultPage: config.defaultPage,
  accent: config.accent,
  pages
}).replace(/</g, '\\u003c');

let html = fs.readFileSync(TEMPLATE, 'utf8');
html = html.replace('/*__SITE_DATA__*/', `window.SITE = ${safeJson};`);
fs.writeFileSync(path.join(DIST, 'index.html'), html, 'utf8');

console.log(`\n✦ ABHISHEK TOOLS HUB — build complete`);
console.log(`  ${pages.length} HTML page(s) discovered in /pages`);
for (const p of pages) console.log(`  • ${p.name}`);
if (!pages.length) console.log('  Add .html or .htm files to /pages and build again.');
console.log(`  Output: ${DIST}\n`);
