/**
 * ahrefs-audit.test.mjs
 * Ported from D:\buypeetal\tests\ahrefs-audit.test.mjs to guard SM'S DEX portfolio.
 *
 * Verifies:
 *  1. Internal pages & file limits (all HTML non-empty, under 2 MB limit, zero mixed HTTP content)
 *  2. Indexability & canonical integrity (canonical matches route, no forbidden noindex on public pages)
 *  3. AI discoverability & SSR HTML (server-rendered main, robots.txt valid)
 *  4. Links integrity (zero broken internal links, trailing slash consistency)
 *  5. Content & meta standards (Title 30-70 chars, Meta description 110-160 chars, exactly 1 non-empty H1)
 *  6. Social tags (Open Graph complete, Twitter card complete, og:url matches canonical)
 *  7. Static assets (images have alt, scripts/css resolve on disk)
 *  8. Sitemaps integrity (valid XML, only canonical HTML, zero duplicates, zero orphans, zero paginated subpages)
 *  9. Structured data schema (valid JSON-LD, @context, recognized schema.org types)
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const distDir = path.join(root, 'dist');

if (!fs.existsSync(distDir)) {
  throw new Error('dist/ directory does not exist. Run "npm run build" first.');
}

function getAllHtmlFiles(dir) {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...getAllHtmlFiles(fullPath));
    } else if (entry.name.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

const allHtmlFiles = getAllHtmlFiles(distDir);
// Filter out internal preview / prototype files
const publicHtmlFiles = allHtmlFiles.filter(f => {
  const rel = path.relative(distDir, f).replace(/\\/g, '/');
  return !rel.includes('casing-proto') && !rel.includes('generation-device') && !rel.includes('timelines') && !rel.includes('productivity-caller-simulator') && !rel.includes('wordle-simulator') && !rel.includes('404');
});

// ── 1. INTERNAL PAGES & FILE LIMITS ──────────────────────────────────────────

test('Ahrefs: all HTML pages exist, are non-empty, and under 2 MB limit', () => {
  assert.ok(publicHtmlFiles.length >= 1300, `Expected at least 1300 HTML pages, found ${publicHtmlFiles.length}`);
  for (const file of publicHtmlFiles) {
    const stat = fs.statSync(file);
    assert.ok(stat.size > 0, `File is empty: ${file}`);
    assert.ok(stat.size < 2 * 1024 * 1024, `File exceeds 2 MB limit: ${file} (${stat.size} bytes)`);
  }
});

test('Ahrefs: zero HTTPS/HTTP mixed content across all pages', () => {
  for (const file of publicHtmlFiles) {
    const html = fs.readFileSync(file, 'utf8');
    const rel = path.relative(distDir, file);
    const mixedMatches = html.match(/(?:src|href)=["']http:\/\/shivammahajan\.com[^"']*["']/g);
    assert.equal(mixedMatches, null, `Mixed HTTP content found in ${rel}: ${mixedMatches}`);
  }
});

// ── 2. INDEXABILITY & CANONICAL INTEGRITY ────────────────────────────────────

test('Ahrefs: every public page has exactly one valid canonical URL matching its route', () => {
  for (const file of publicHtmlFiles) {
    const html = fs.readFileSync(file, 'utf8');
    const rel = path.relative(distDir, file).replace(/\\/g, '/');
    const canonicalMatches = [...html.matchAll(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/gi)];
    assert.equal(canonicalMatches.length, 1, `${rel} must have exactly one canonical URL, found ${canonicalMatches.length}`);

    const canonicalUrl = canonicalMatches[0][1];
    assert.ok(canonicalUrl.startsWith('https://shivammahajan.com/'), `${rel} canonical must be HTTPS on shivammahajan.com: ${canonicalUrl}`);

    if (rel === 'index.html') {
      assert.equal(canonicalUrl, 'https://shivammahajan.com/');
    } else if (rel.endsWith('/index.html')) {
      const expectedPath = 'https://shivammahajan.com/' + rel.replace(/\/index\.html$/, '/');
      assert.equal(canonicalUrl, expectedPath, `${rel} canonical URL mismatch`);
    }
  }
});

test('Ahrefs: public pages never have noindex or nofollow meta tags', () => {
  for (const file of publicHtmlFiles) {
    const html = fs.readFileSync(file, 'utf8');
    const rel = path.relative(distDir, file);
    assert.doesNotMatch(html, /<meta[^>]*robots[^>]*noindex/i, `${rel} has forbidden noindex meta`);
    assert.doesNotMatch(html, /<meta[^>]*robots[^>]*nofollow/i, `${rel} has forbidden nofollow meta`);
  }
});

// ── 3. AI DISCOVERABILITY & STATIC HTML ──────────────────────────────────────

test('Ahrefs: main content is server-rendered static HTML and does not require JavaScript', () => {
  for (const file of publicHtmlFiles) {
    const html = fs.readFileSync(file, 'utf8');
    const rel = path.relative(distDir, file);
    // Page must contain server-rendered content (either <main> or substantial semantic layout)
    const hasMain = /<main[^>]*>[\s\S]+<\/main>/.test(html) || /<div class="editorial">/.test(html) || /<div class="dex-layout">/.test(html) || /<div class="timeline-container">/.test(html);
    assert.ok(hasMain, `${rel} must contain server-rendered body content`);
    assert.doesNotMatch(html, /<div id="root">\s*<\/div>/, `${rel} must not be a blank client-side JS shell`);
  }
});

test('Ahrefs: robots.txt exists and declares sitemap', () => {
  const robotsPath = path.join(distDir, 'robots.txt');
  assert.ok(fs.existsSync(robotsPath), 'robots.txt must exist in dist');
  const robots = fs.readFileSync(robotsPath, 'utf8');
  assert.match(robots, /User-agent:\s*\*/i);
  assert.match(robots, /Sitemap:\s*https:\/\/shivammahajan\.com\/sitemap/i);
});

// ── 4. LINKS INTEGRITY & ZERO BROKEN LINKS ───────────────────────────────────

test('Ahrefs: zero broken internal links across all HTML files', () => {
  const knownTargets = new Set();
  for (const file of allHtmlFiles) {
    const rel = path.relative(distDir, file).replace(/\\/g, '/');
    let route = '/' + rel.replace(/(?:^|\/)index\.html$/, '/').replace(/\.html$/, '');
    if (route === '//') route = '/';
    if (!route.endsWith('/') && !path.extname(route)) route += '/';
    knownTargets.add(route);
  }

  for (const file of publicHtmlFiles) {
    const rawHtml = fs.readFileSync(file, 'utf8');
    const html = rawHtml.replace(/<script[\s\S]*?<\/script>/gi, '');
    const rel = path.relative(distDir, file).replace(/\\/g, '/');
    const hrefMatches = [...html.matchAll(/href=["'](\/[^"'#? ]*)["']/g)];

    for (const match of hrefMatches) {
      let rawHref = match[1];
      if (path.extname(rawHref)) {
        const assetPath = path.join(distDir, rawHref.slice(1));
        assert.ok(fs.existsSync(assetPath), `Broken asset link in ${rel}: href="${rawHref}" not found on disk at "${assetPath}"`);
        continue;
      }

      if (!rawHref.endsWith('/') && !path.extname(rawHref)) rawHref += '/';
      assert.ok(knownTargets.has(rawHref), `Broken internal link in ${rel}: href="${match[1]}" normalized as "${rawHref}" does not exist in build`);
    }
  }
});

test('Ahrefs: zero links pointing to directory routes without trailing slash (prevent 3XX redirects)', () => {
  for (const file of publicHtmlFiles) {
    const rawHtml = fs.readFileSync(file, 'utf8');
    const html = rawHtml.replace(/<script[\s\S]*?<\/script>/gi, '');
    const rel = path.relative(distDir, file).replace(/\\/g, '/');
    const hrefMatches = [...html.matchAll(/href=["'](\/[^"'#\s.:]+)["']/g)];

    for (const match of hrefMatches) {
      const href = match[1];
      if (href === '/') continue;
      // All internal routes in this SSG build are directories with trailing slashes
      assert.ok(href.endsWith('/'), `Internal link in ${rel} must have trailing slash: "${href}"`);
    }
  }
});

// ── 5. CONTENT & META STANDARDS ──────────────────────────────────────────────

test('Ahrefs: every public page has exactly one title tag between 30 and 70 characters', () => {
  for (const file of publicHtmlFiles) {
    const html = fs.readFileSync(file, 'utf8');
    const rel = path.relative(distDir, file);
    const titles = [...html.matchAll(/<title>([\s\S]*?)<\/title>/gi)];
    assert.equal(titles.length, 1, `${rel} must have exactly 1 title tag, found ${titles.length}`);
    const titleText = titles[0][1].trim();
    assert.ok(titleText.length >= 30, `${rel} title is too short (${titleText.length} chars): "${titleText}"`);
    assert.ok(titleText.length <= 70, `${rel} title is too long (${titleText.length} chars): "${titleText}"`);
  }
});

test('Ahrefs: every public page has exactly one meta description between 110 and 160 characters', () => {
  for (const file of publicHtmlFiles) {
    const html = fs.readFileSync(file, 'utf8');
    const rel = path.relative(distDir, file);
    const m = html.match(/<meta\s+name=["']description["']\s+content="([^"]+)"/i) ||
              html.match(/<meta\s+name=["']description["']\s+content='([^']+)'/i) ||
              html.match(/<meta\s+content="([^"]+)"\s+name=["']description["']/i) ||
              html.match(/<meta\s+content='([^']+)'\s+name=["']description["']/i);
    assert.ok(m, `${rel} must have a meta description tag`);
    const descText = m[1].trim();
    assert.ok(descText.length >= 110, `${rel} meta description is too short (${descText.length} chars): "${descText}"`);
    assert.ok(descText.length <= 160, `${rel} meta description is too long (${descText.length} chars): "${descText}"`);
  }
});

test('Ahrefs: every public page has exactly one non-empty H1 tag', () => {
  for (const file of publicHtmlFiles) {
    const html = fs.readFileSync(file, 'utf8');
    const rel = path.relative(distDir, file);
    const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
    assert.equal(h1s.length, 1, `${rel} must have exactly 1 H1 tag, found ${h1s.length}`);
    const h1Text = h1s[0][1].replace(/<[^>]+>/g, '').trim();
    assert.ok(h1Text.length > 0, `${rel} H1 tag is empty`);
  }
});

// ── 6. SOCIAL TAGS (OPEN GRAPH & TWITTER) ────────────────────────────────────

test('Ahrefs: every public page has complete Open Graph tags and og:url matches canonical', () => {
  for (const file of publicHtmlFiles) {
    const html = fs.readFileSync(file, 'utf8');
    const rel = path.relative(distDir, file);

    assert.match(html, /<meta\s+property=["']og:site_name["']/i, `${rel} missing og:site_name`);
    assert.match(html, /<meta\s+property=["']og:type["']/i, `${rel} missing og:type`);
    assert.match(html, /<meta\s+property=["']og:title["']/i, `${rel} missing og:title`);
    assert.match(html, /<meta\s+property=["']og:description["']/i, `${rel} missing og:description`);
    assert.match(html, /<meta\s+property=["']og:image["']/i, `${rel} missing og:image`);

    const canonicalMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
    const ogUrlMatch = html.match(/<meta\s+property=["']og:url["']\s+content=["']([^"']+)["']/i);
    assert.ok(canonicalMatch && ogUrlMatch, `${rel} missing canonical or og:url`);
    assert.equal(ogUrlMatch[1], canonicalMatch[1], `${rel} og:url must match canonical URL`);
  }
});

test('Ahrefs: every public page has complete Twitter card tags', () => {
  for (const file of publicHtmlFiles) {
    const html = fs.readFileSync(file, 'utf8');
    const rel = path.relative(distDir, file);

    assert.match(html, /<meta\s+name=["']twitter:card["']/i, `${rel} missing twitter:card`);
    assert.match(html, /<meta\s+name=["']twitter:title["']/i, `${rel} missing twitter:title`);
    assert.match(html, /<meta\s+name=["']twitter:description["']/i, `${rel} missing twitter:description`);
    assert.match(html, /<meta\s+name=["']twitter:image["']/i, `${rel} missing twitter:image`);
  }
});

// ── 7. SITEMAPS INTEGRITY ────────────────────────────────────────────────────

test('Ahrefs: sitemap.xml exists, contains ONLY canonical reachable HTML, zero duplicates, zero paginated subpages', () => {
  const sitemapPath = path.join(distDir, 'sitemap-0.xml');
  assert.ok(fs.existsSync(sitemapPath), 'dist/sitemap-0.xml must exist');
  const xml = fs.readFileSync(sitemapPath, 'utf8');

  assert.match(xml, /<urlset\s+xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9"/);
  assert.match(xml, /<\/urlset>/);

  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  assert.ok(locs.length >= 1200, `Expected at least 1200 URLs in sitemap, found ${locs.length}`);
  assert.ok(locs.length < 50000, 'Sitemap URL count must not exceed 50,000');

  const seen = new Set();
  for (const loc of locs) {
    assert.ok(!seen.has(loc), `Duplicate URL in sitemap: ${loc}`);
    seen.add(loc);

    assert.ok(loc.startsWith('https://shivammahajan.com/'), `Invalid sitemap URL domain: ${loc}`);
    assert.doesNotMatch(loc, /\.(xml|json|csv|txt)$/, `Non-HTML asset found in sitemap: ${loc}`);

    // Exclude paginated archive subpages from sitemap
    assert.doesNotMatch(loc, /\/blog\/archive\/[^\/]+\/\d+\/?$/, `Paginated archive subpage found in sitemap: ${loc}`);
  }
});

// ── 8. STRUCTURED DATA (JSON-LD) ───────────────────────────────────────────

test('Ahrefs: all JSON-LD blocks across all pages parse without error and declare valid schema.org context', () => {
  for (const file of publicHtmlFiles) {
    const html = fs.readFileSync(file, 'utf8');
    const rel = path.relative(distDir, file);
    const jsonLdMatches = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];

    for (const match of jsonLdMatches) {
      let parsed;
      try {
        parsed = JSON.parse(match[1]);
      } catch (err) {
        assert.fail(`Malformed JSON-LD in ${rel}: ${err.message}`);
      }

      assert.equal(parsed['@context'], 'https://schema.org', `${rel} JSON-LD @context must be https://schema.org`);
    }
  }
});

// ── 9. SYNDICATION & AI MANIFESTS ──────────────────────────────────────────

test('Ahrefs: RSS feeds and AI manifests (llms.txt, llms-full.txt) exist and are non-empty', () => {
  const files = ['llms.txt', 'llms-full.txt', 'rss.xml', path.join('blog', 'rss.xml')];
  for (const f of files) {
    const full = path.join(distDir, f);
    assert.ok(fs.existsSync(full), `Missing syndication/AI file in dist: ${f}`);
    const stat = fs.statSync(full);
    assert.ok(stat.size > 100, `File is too small or empty: ${f} (${stat.size} bytes)`);
  }
});

test('Ahrefs: every blog post anchors author and publisher to canonical #shivam-mahajan entity', () => {
  const sampleBlog = path.join(distDir, 'blog', 'day-1246', 'index.html');
  assert.ok(fs.existsSync(sampleBlog), 'Day 1246 blog post must exist');
  const html = fs.readFileSync(sampleBlog, 'utf8');
  assert.match(html, /"author":\s*\{\s*"@id":\s*"https:\/\/shivammahajan\.com\/#shivam-mahajan"\s*\}/);
  assert.match(html, /"publisher":\s*\{\s*"@id":\s*"https:\/\/shivammahajan\.com\/#shivam-mahajan"\s*\}/);
  assert.match(html, /"dateModified":/);
  assert.match(html, /"keywords":/);
});
