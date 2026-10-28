import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');

if (!fs.existsSync(distDir)) {
  console.error('Error: dist directory does not exist. Run "npm run build" first.');
  process.exit(1);
}

function getAllFiles(dir, ext = '.html') {
  let results = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of list) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(getAllFiles(fullPath, ext));
    } else if (entry.name.endsWith(ext)) {
      results.push(fullPath);
    }
  }
  return results;
}

const htmlFiles = getAllFiles(distDir, '.html');
console.log(`\n🔍 Auditing SEO for ${htmlFiles.length} generated HTML files...\n`);

function extractDescription(html) {
  const m = html.match(/<meta\s+name=["']description["']\s+content="([^"]+)"/i) ||
            html.match(/<meta\s+name=["']description["']\s+content='([^']+)'/i) ||
            html.match(/<meta\s+content="([^"]+)"\s+name=["']description["']/i) ||
            html.match(/<meta\s+content='([^']+)'\s+name=["']description["']/i);
  return m ? m[1] : null;
}

const linkRegex = /href=["'](\/[^"'#? ]*)["']/g;

const pagesByRoute = new Map();
const inlinks = new Map();

for (const file of htmlFiles) {
  const rel = path.relative(distDir, file).replace(/\\/g, '/');
  let route = '/' + rel.replace(/(?:^|\/)index\.html$/, '/').replace(/\.html$/, '');
  if (route === '//') route = '/';
  if (!route.endsWith('/') && !path.extname(route)) route += '/';

  const html = fs.readFileSync(file, 'utf8');
  pagesByRoute.set(route, { file, html, rel });
  if (!inlinks.has(route)) inlinks.set(route, new Set());
}

// 1. Audit Meta Descriptions
const shortDesc = [];
const longDesc = [];
const missingDesc = [];

for (const [route, { file, html }] of pagesByRoute.entries()) {
  // Ignore raw prototype files and redirect stubs
  if (html.includes('noindex') || route.includes('/casing-proto') || route.includes('/generation-device') || route.includes('/productivity-caller-simulator') || route.includes('/ticket-35-flat-threejs')) {
    continue;
  }

  const desc = extractDescription(html);
  if (!desc) {
    missingDesc.push({ route, file });
  } else {
    const len = desc.length;
    if (len < 110) {
      shortDesc.push({ route, len, desc });
    } else if (len > 160) {
      longDesc.push({ route, len, desc });
    }
  }
}

// 2. Audit Internal Inlinks (Orphan Detection)
// Build directed graph of internal links
for (const [route, { html }] of pagesByRoute.entries()) {
  let match;
  linkRegex.lastIndex = 0;
  while ((match = linkRegex.exec(html)) !== null) {
    let target = match[1];
    if (target.endsWith('.pdf') || target.endsWith('.png') || target.endsWith('.svg') || target.endsWith('.xml') || target.endsWith('.ico')) {
      continue;
    }
    if (!target.endsWith('/') && !path.extname(target)) target += '/';
    if (inlinks.has(target)) {
      inlinks.get(target).add(route);
    }
  }
}

// Crawl reachable pages from root '/'
const visited = new Set(['/']);
const queue = ['/'];

while (queue.length > 0) {
  const curr = queue.shift();
  const pageObj = pagesByRoute.get(curr);
  if (!pageObj) continue;

  let match;
  linkRegex.lastIndex = 0;
  while ((match = linkRegex.exec(pageObj.html)) !== null) {
    let target = match[1];
    if (target.endsWith('.pdf') || target.endsWith('.png') || target.endsWith('.svg') || target.endsWith('.xml') || target.endsWith('.ico')) {
      continue;
    }
    if (!target.endsWith('/') && !path.extname(target)) target += '/';
    if (pagesByRoute.has(target) && !visited.has(target)) {
      visited.add(target);
      queue.push(target);
    }
  }
}

// 3. Audit Sitemap URLs
const sitemapPath = path.join(distDir, 'sitemap-0.xml');
const sitemapOrphans = [];
const sitemapPaginated = [];

if (fs.existsSync(sitemapPath)) {
  const sitemapXml = fs.readFileSync(sitemapPath, 'utf8');
  const locRegex = /<loc>(https?:\/\/[^<]+)<\/loc>/g;
  let locMatch;
  while ((locMatch = locRegex.exec(sitemapXml)) !== null) {
    const url = new URL(locMatch[1]);
    let pathname = url.pathname;
    if (!pathname.endsWith('/') && !path.extname(pathname)) pathname += '/';

    // Must be reachable from home
    if (!visited.has(pathname)) {
      sitemapOrphans.push(pathname);
    }

    // Must not be a paginated archive subpage (/2/, /3/ etc.)
    if (/\/blog\/archive\/[^\/]+\/\d+\/?$/.test(pathname)) {
      sitemapPaginated.push(pathname);
    }
  }
}

// Report Results
let hasErrors = false;

console.log('--- 1. Meta Description Audit ---');
if (missingDesc.length > 0) {
  hasErrors = true;
  console.error(`❌ Found ${missingDesc.length} pages missing meta descriptions:`);
  missingDesc.slice(0, 10).forEach(m => console.error(`   - ${m.route}`));
}
if (shortDesc.length > 0) {
  hasErrors = true;
  console.error(`❌ Found ${shortDesc.length} pages with meta description < 110 characters:`);
  shortDesc.slice(0, 10).forEach(s => console.error(`   - [${s.len} chars] ${s.route}: "${s.desc}"`));
}
if (longDesc.length > 0) {
  hasErrors = true;
  console.error(`❌ Found ${longDesc.length} pages with meta description > 160 characters:`);
  longDesc.slice(0, 10).forEach(l => console.error(`   - [${l.len} chars] ${l.route}: "${l.desc}"`));
}
if (!missingDesc.length && !shortDesc.length && !longDesc.length) {
  console.log(`✅ All ${pagesByRoute.size} pages have compliant meta descriptions (110–160 chars).`);
}

console.log('\n--- 2. Internal Link / Orphan Audit ---');
const publicOrphans = [];
for (const [route, { html }] of pagesByRoute.entries()) {
  if (html.includes('noindex') || route.includes('/casing-proto') || route.includes('/generation-device') || route.includes('/timelines') || route.includes('/productivity-caller-simulator') || route.includes('/404')) {
    continue;
  }
  if (!visited.has(route)) {
    publicOrphans.push(route);
  }
}
if (publicOrphans.length > 0) {
  hasErrors = true;
  console.error(`❌ Found ${publicOrphans.length} orphan pages unreachable from homepage:`);
  publicOrphans.slice(0, 15).forEach(o => console.error(`   - ${o}`));
} else {
  console.log(`✅ All public pages are reachable from homepage (0 orphan pages).`);
}

console.log('\n--- 3. Sitemap Audit ---');
const sitemapIndex = path.join(distDir, 'sitemap-index.xml');
const sitemapFallback = path.join(distDir, 'sitemap.xml');
if (fs.existsSync(sitemapIndex)) {
  fs.copyFileSync(sitemapIndex, sitemapFallback);
  console.log('✅ Synchronized sitemap.xml with sitemap-index.xml.');
}
if (sitemapOrphans.length > 0) {
  hasErrors = true;
  console.error(`❌ Found ${sitemapOrphans.length} unreachable URLs in sitemap-0.xml:`);
  sitemapOrphans.forEach(o => console.error(`   - ${o}`));
}
if (sitemapPaginated.length > 0) {
  hasErrors = true;
  console.error(`❌ Found ${sitemapPaginated.length} paginated subpages in sitemap-0.xml:`);
  sitemapPaginated.forEach(p => console.error(`   - ${p}`));
}
if (!sitemapOrphans.length && !sitemapPaginated.length) {
  console.log(`✅ Sitemap contains only valid, reachable canonical URLs (0 errors).`);
}

if (hasErrors) {
  console.error('\n🚨 SEO audit failed! Fix errors above.\n');
  process.exit(1);
} else {
  console.log('\n🎉 SEO audit passed successfully!\n');
}
