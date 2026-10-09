import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'src/data/linkedin-posts.json');
const anchorDay = 1238;
const anchorDate = Date.UTC(2026, 9, 1);
const today = new Date();
const currentDay = anchorDay + Math.floor((Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()) - anchorDate) / 86400000);
const numberArg = (name, fallback) => {
  const at = process.argv.indexOf(name);
  if (at < 0) return fallback;
  const value = Number(process.argv[at + 1]);
  if (!Number.isSafeInteger(value) || value < 1) throw new Error(`${name} needs a positive integer`);
  return value;
};
const from = numberArg('--from-day', Math.max(1, currentDay - 60));
const to = numberArg('--to-day', currentDay - 30);
if (from > to) throw new Error('--from-day must be <= --to-day');
if (to - from > 60) throw new Error('Limit one run to 61 days');

const decode = (s) => s.replace(/&(?:amp|quot|#39|lt|gt);/g, (x) => ({ '&amp;': '&', '&quot;': '"', '&#39;': "'", '&lt;': '<', '&gt;': '>' })[x]);
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function html(url) {
  const response = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0 (compatible; SMDEX research/1.0)' }, signal: AbortSignal.timeout(15000) });
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  return response.text();
}
function bingLinks(markup) {
  const links = [];
  for (const match of markup.matchAll(/\bu=a1([A-Za-z0-9_-]+)/g)) {
    try {
      const raw = Buffer.from(match[1].replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8');
      const url = new URL(raw);
      if (url.hostname === 'www.linkedin.com' && url.pathname.startsWith('/posts/mahajanshivam_')) links.push(url.origin + url.pathname);
    } catch { /* unrelated Bing redirect */ }
  }
  for (const match of markup.matchAll(/href="(https:\/\/www\.linkedin\.com\/posts\/mahajanshivam_[^" ]+)"/g)) {
    try { const url = new URL(decode(match[1])); links.push(url.origin + url.pathname); } catch { /* malformed result */ }
  }
  return [...new Set(links)];
}
function post(markup, url, day) {
  const description = markup.match(/<meta\s+property="og:description"\s+content="([\s\S]*?)"\s*\/?\s*>/i)?.[1];
  if (!description) return null;
  const text = decode(description).trim();
  if (!new RegExp(`(?:^|\\s)#day${day}\\b`, 'i').test(text) || !/#2002daysofcode\b/i.test(text) || !/Shivam Mahajan/i.test(text)) return null;
  const id = url.match(/-activity-(\d+)/)?.[1];
  if (!id) return null;
  const title = text.match(/Leetcode:\s*([^\r\n]+)/i)?.[1]?.trim() || `Day ${day} of 2002 Days of Code`;
  return { day, title, url, activityId: id, text };
}

async function main() {
  const existing = JSON.parse(await readFile(output, 'utf8').catch((e) => e.code === 'ENOENT' ? '[]' : Promise.reject(e)));
  if (!Array.isArray(existing)) throw new Error('Existing post data must be an array');
  const byId = new Map(existing.map((item) => [item.activityId ?? 'day-' + item.day, item]));
  let added = 0;
  let noResult = 0;
  for (let day = from; day <= to; day++) {
    if ([...byId.values()].some((item) => item.day === day)) continue;
    try {
      const query = `${day} 2002 days of code site:linkedin.com/posts/`;
      const candidates = bingLinks(await html(`https://www.bing.com/search?q=${encodeURIComponent(query)}`));
      let foundDay = false;
      for (const url of candidates) {
        if (!new RegExp(`day${day}(?!\\d)`).test(url)) continue;
        try {
          const found = post(await html(url), url, day);
          if (found && !byId.has(found.activityId)) {
            byId.set(found.activityId, found);
            added++;
            foundDay = true;
            console.log(`FOUND day ${day}: ${url}`);
            break;
          }
        } catch (error) { console.warn(`Post failed, day ${day}: ${error.message}`); }
      }
      if (!foundDay) { noResult++; console.log(`UNVERIFIED day ${day}`); }
    } catch (error) { noResult++; console.warn(`Search failed, day ${day}: ${error.message}`); }
    await pause(1200);
  }
  const records = [...byId.values()].sort((a, b) => b.day - a.day);
  if (added) {
    await mkdir(path.dirname(output), { recursive: true });
    await writeFile(output, JSON.stringify(records, null, 2) + '\n');
  }
  console.log(`Added ${added}; unverified ${noResult}; total ${records.length}. Empty search results are not proof a post is missing.`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await main();

export { bingLinks, post };
