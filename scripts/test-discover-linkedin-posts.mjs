import assert from 'node:assert/strict';
import { bingLinks, post } from './discover-linkedin-posts.mjs';

const url = 'https://www.linkedin.com/posts/mahajanshivam_day1132-2002daysofcode-activity-7473393453842948096-O3w8';
const redirect = Buffer.from(url).toString('base64url');
assert.deepEqual(bingLinks(`<a href="https://www.bing.com/ck/a?u=a1${redirect}&amp;ntb=1">post</a>`), [url]);
const markup = '<meta property="og:description" content="#day1132 of #2002daysofcode\nLeetcode: 223. Rectangle Area\nShivam Mahajan">';
assert.equal(post(markup, url, 1132)?.title, '223. Rectangle Area');
assert.equal(post(markup, url, 1133), null);
console.log('LinkedIn discovery parser OK');
