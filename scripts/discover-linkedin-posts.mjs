import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { execSync } from 'node:child_process';
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
const to = numberArg('--to-day', currentDay);
if (from > to) throw new Error('--from-day must be <= --to-day');
if (to - from > 60) throw new Error('Limit one run to 61 days');

const decode = (s) => s.replace(/&(?:amp|quot|apos|#39|lt|gt|#[0-9]+|#x[0-9a-f]+);/gi, (x) => {
  const named = { '&amp;': '&', '&quot;': '"', '&apos;': "'", '&#39;': "'", '&lt;': '<', '&gt;': '>' };
  if (named[x.toLowerCase()]) return named[x.toLowerCase()];
  const n = x.slice(2, -1);
  const codepoint = n[0]?.toLowerCase() === 'x' ? Number.parseInt(n.slice(1), 16) : Number.parseInt(n, 10);
  return Number.isFinite(codepoint) && codepoint > 0 && codepoint <= 0x10ffff
    ? String.fromCodePoint(codepoint) : x;
});
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
  let parsed;
  try { parsed = new URL(url); } catch { return null; }
  // The author's canonical LinkedIn slug is the identity check; public metadata
  // does not always repeat the author's name inside og:description.
  if (parsed.protocol !== 'https:' || parsed.hostname !== 'www.linkedin.com' ||
      !parsed.pathname.startsWith('/posts/mahajanshivam_')) return null;
  const tag = (markup.match(/<meta\b[^>]*>/gi) || [])
    .find((value) => /\bproperty\s*=\s*(["'])og:description\1/i.test(value));
  const description = tag?.match(/\bcontent\s*=\s*(["'])([\s\S]*?)\1/i)?.[2];
  if (!description) return null;
  const text = decode(description).trim();
  if (!new RegExp('(?:^|\\s)#day' + day + '\\b', 'i').test(text) ||
      !/#(?:2002daysofcode|1001daysofcode)\b/i.test(text)) return null;
  const id = parsed.pathname.match(/-activity-(\d+)/)?.[1];
  if (!id) return null;
  const title = text.match(/Leetcode:\s*([^\r\n]+)/i)?.[1]?.trim() || 'Day ' + day + ' of 2002 Days of Code';
  const date = new Date(anchorDate + (day - anchorDay) * 86400000).toISOString().slice(0, 10);
  return { day, date, title, url: parsed.origin + parsed.pathname, activityId: id, text, content: text };
}

function mergePosts(existing, incoming) {
  // Day numbers are not identities: the archive contains distinct posts for
  // the same day. Preserve every original object and its relative ordering.
  const merged = [...existing];
  const ids = new Set(existing.map((item) => item.activityId).filter(Boolean));
  const urls = new Set(existing.map((item) => item.url).filter(Boolean));
  for (const item of incoming) {
    if ((item.activityId && ids.has(item.activityId)) || (item.url && urls.has(item.url))) continue;
    merged.push(item);
    if (item.activityId) ids.add(item.activityId);
    if (item.url) urls.add(item.url);
  }
  return merged.sort((a, b) => a.day - b.day);
}

async function main() {
  const existing = JSON.parse(await readFile(output, 'utf8').catch((e) => e.code === 'ENOENT' ? '[]' : Promise.reject(e)));
  if (!Array.isArray(existing)) throw new Error('Existing post data must be an array');
  const knownDays = new Set(existing.map((item) => item.day));
  const knownActivityIds = new Set(existing.map((item) => item.activityId).filter(Boolean));
  const knownUrls = new Set(existing.map((item) => item.url).filter(Boolean));
  const discovered = [];
  let added = 0;
  let noResult = 0;
  for (let day = from; day <= to; day++) {
    if (knownDays.has(day)) continue;
    try {
      const query = `${day} 2002 days of code site:linkedin.com/posts/`;
      const candidates = bingLinks(await html(`https://www.bing.com/search?q=${encodeURIComponent(query)}`));
      console.log(`SEARCH day ${day}: ${candidates.length} author-matched LinkedIn candidates`);
      let foundDay = false;
      for (const url of candidates) {
        try {
          const found = post(await html(url), url, day);
          if (found && !knownActivityIds.has(found.activityId) && !knownUrls.has(found.url)) {
            discovered.push(found);
            knownDays.add(day);
            knownActivityIds.add(found.activityId);
            knownUrls.add(found.url);
            added++;
            foundDay = true;
            console.log(`FOUND day ${day}: ${url}`);
            try {
              const num = execSync(`gh issue list --state open --label daily-post --search '"Day ${day}" in:title' --json number,title -q '.[] | select(.title == "Day ${day}") | .number'`, { encoding: 'utf8' }).trim();
              if (num) {
                execSync(`gh issue close ${num} --comment 'Auto-closed: Day ${day} discovered on LinkedIn and ingested.'`);
                console.log(`Auto-closed issue #${num} for day ${day}`);
              }
            } catch (error) { console.warn(`Could not close issue for day ${day}: ${error.message}`); }
            break;
          } else if (!found) {
            console.log(`REJECTED day ${day}: missing verified day tag, challenge hashtag, or usable og:description at ${url}`);
          }
        } catch (error) { console.warn(`Post failed, day ${day}: ${error.message}`); }
      }
      if (!foundDay) { noResult++; console.log(`UNVERIFIED day ${day}`); }
    } catch (error) { noResult++; console.warn(`Search failed, day ${day}: ${error.message}`); }
    await pause(1200);
  }
  const records = mergePosts(existing, discovered);
  if (added) {
    await mkdir(path.dirname(output), { recursive: true });
    await writeFile(output, JSON.stringify(records, null, 2) + '\n');
  }
  console.log(`Added ${added}; unverified ${noResult}; total ${records.length}. Empty search results are not proof a post is missing.`);
  if (noResult && added === 0) console.warn('::warning::No new LinkedIn posts verified; inspect SEARCH/REJECTED logs, or use a daily issue for manual ingestion.');
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await main();

export { bingLinks, post, mergePosts };
