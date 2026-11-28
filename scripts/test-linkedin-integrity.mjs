import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { bingLinks, post, mergePosts } from './discover-linkedin-posts.mjs';
import { linkedInEmbedUrl } from '../src/utils/linkedin.mjs';

const permalink = 'https://www.linkedin.com/posts/mahajanshivam_day1132-2002daysofcode-activity-7473393453848096-O3w8';
const contentText = '#day1132 of #2002daysofcode\nLeetcode: 223. Rectangle Area';

test('parses valid post despite reordered meta attributes and no author in description', () => {
  const markup = '<meta content="' + contentText + '" name="description" property="og:description">';
  const result = post(markup, permalink, 1132);
  assert.equal(result?.title, '223. Rectangle Area');
  assert.equal(result?.activityId, '7473393453848096');
  assert.equal(result?.content, contentText);
});

test('verifies author URL, day hashtag and metadata before accepting a post', () => {
  const markup = '<meta property="og:description" content="' + contentText + '">';
  assert.equal(post(markup, permalink.replace('mahajanshivam_', 'another-person_'), 1132), null);
  assert.equal(post(markup, permalink, 1133), null);
  assert.equal(post('<meta property="og:description" content="#day1132 of somebody else">', permalink, 1132), null);
  assert.equal(post('<html><body>Public post unavailable</body></html>', permalink, 1132), null);
});

test('preserves distinct legacy posts sharing a day when merging newly discovered records', () => {
  const historic = [
    { day: 344, date: '2024-04-20', url: 'https://www.linkedin.com/feed/update/A', content: 'Original A' },
    { day: 344, date: '2024-04-21', url: 'https://www.linkedin.com/feed/update/B', content: 'Original B' },
    { day: 1255, date: '2026-10-18', content: 'Glitch' },
  ];
  const latest = { day: 1256, date: '2026-10-19', url: permalink, activityId: '7473393453848096', content: contentText };
  const merged = mergePosts(historic, [latest, latest]);
  assert.equal(merged.length, 4);
  assert.deepEqual(merged.filter((item) => item.day === 344), historic.slice(0, 2));
  assert.deepEqual(merged.map((item) => item.day), [344, 344, 1255, 1256]);
  assert.deepEqual(historic.map((item) => item.content), ['Original A', 'Original B', 'Glitch']);
});

test('recognizes historically captured Bing results for the correct author', () => {
  const markup = readFileSync(new URL('../bing.html', import.meta.url), 'utf8');
  const results = bingLinks(markup);
  assert.ok(results.some((link) => link.includes('/posts/mahajanshivam_day1081-')));
  assert.ok(results.every((link) => link.startsWith('https://www.linkedin.com/posts/mahajanshivam_')));
});

test('constructs supported LinkedIn embeds and refuses short or unrelated links', () => {
  assert.equal(
    linkedInEmbedUrl('https://www.linkedin.com/feed/update/urn%3Ali%3Ashare%3A7063212560392609792'),
    'https://www.linkedin.com/embed/feed/update/urn:li:share:7063212560392609792',
  );
  assert.equal(
    linkedInEmbedUrl(permalink),
    'https://www.linkedin.com/embed/feed/update/urn:li:activity:7473393453848096',
  );
  assert.equal(linkedInEmbedUrl('https://lnkd.in/p/example'), null);
  assert.equal(linkedInEmbedUrl('javascript:alert(1)'), null);
  assert.equal(linkedInEmbedUrl('https://evil-linkedin.com/feed/update/urn:li:share:123'), null);
  assert.equal(linkedInEmbedUrl(undefined), null);
});

test('source archive retains every historical same-day record', () => {
  const records = JSON.parse(readFileSync(new URL('../src/data/linkedin-posts.json', import.meta.url), 'utf8'));
  assert.ok(records.length >= 1258);
  assert.equal(records.filter((item) => item.day === 344).length, 2);
  assert.equal(records.filter((item) => item.day === 497).length, 2);
  assert.ok(records.every((item) => Number.isSafeInteger(item.day) && item.day > 0 && typeof item.content === 'string'));
});
