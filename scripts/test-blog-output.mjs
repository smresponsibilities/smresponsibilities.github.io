import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { linkedInEmbedUrl } from '../src/utils/linkedin.mjs';

const posts = JSON.parse(readFileSync('src/data/linkedin-posts.json', 'utf8'));
const uniqueDays = new Set(posts.map((p) => p.day));
const blogDir = path.join('dist', 'blog');
const renderedDays = readdirSync(blogDir)
  .filter((name) => /^day-\d+$/.test(name) && existsSync(path.join(blogDir, name, 'index.html')));
assert.equal(renderedDays.length, uniqueDays.size, 'Exactly one canonical blog page must exist per day');

const byDay = new Map();
for (const entry of posts) {
  if (!byDay.has(entry.day)) byDay.set(entry.day, []);
  byDay.get(entry.day).push(entry);
}
let collisions = 0;
for (const [day, entries] of byDay) {
  if (entries.length < 2) continue;
  collisions++;
  const html = readFileSync(path.join(blogDir, 'day-' + day, 'index.html'), 'utf8').replaceAll('&amp;', '&');
  assert.ok(html.includes('Other posts from Day ' + day), 'Missing same-day archive for Day ' + day);
  for (const entry of entries) {
    if (entry.url) {
      assert.ok(html.includes(entry.url), 'Archived URL missing from Day ' + day + ': ' + entry.url);
    }
  }
}
assert.ok(collisions >= 11, 'Expected all historical same-day posts to survive');

const withoutUrl = posts.find((p) => !p.url);
if (withoutUrl) {
  const html = readFileSync(path.join(blogDir, 'day-' + withoutUrl.day, 'index.html'), 'utf8');
  assert.ok(!html.includes('href="undefined"'), 'URL-less post must not have a broken outbound link');
}

const newest = [...posts].sort((a, b) => b.day - a.day)[0];
const indexHtml = readFileSync(path.join(blogDir, 'index.html'), 'utf8');
const buttons = /<button\b[^>]*data-view="(?:compact|full)"/g;
const visibleEmbedButtons = [...indexHtml.matchAll(buttons)].length;
assert.equal(visibleEmbedButtons, linkedInEmbedUrl(newest.url) ? 2 : 0, 'Embed controls must agree with latest URL');
assert.ok(!indexHtml.includes('href="undefined"'), 'Blog home must not produce undefined links');

console.log('Blog output regression checks passed: ' + renderedDays.length + ' stable day permalinks, ' + collisions + ' same-day archives.');
