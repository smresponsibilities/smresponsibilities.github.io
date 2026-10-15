import fs from 'node:fs';
import path from 'node:path';

const HOST = 'shivammahajan.com';
const KEY = '6a84f391c5e94beab5734df9b0c2e391';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';

const sitemapPath = path.resolve('dist/sitemap-0.xml');
let urls = [
  `https://${HOST}/`,
  `https://${HOST}/resume/`,
  `https://${HOST}/projects/`,
  `https://${HOST}/projects/sm-dex/`,
  `https://${HOST}/projects/flight-sun-tracker/`,
  `https://${HOST}/projects/productivity-caller/`,
  `https://${HOST}/projects/productivity-caller-vs-alternatives/`,
  `https://${HOST}/projects/chaincode/`,
  `https://${HOST}/projects/postie/`,
  `https://${HOST}/blog/`,
  `https://${HOST}/blog/timeline/`,
  `https://${HOST}/blog/milestones/`,
];

if (fs.existsSync(sitemapPath)) {
  const xml = fs.readFileSync(sitemapPath, 'utf8');
  const locRegex = /<loc>(https?:\/\/[^<]+)<\/loc>/g;
  let match;
  const sitemapUrls = [];
  while ((match = locRegex.exec(xml)) !== null) {
    sitemapUrls.push(match[1]);
  }
  if (sitemapUrls.length > 0) {
    urls = sitemapUrls.slice(0, 10000); // IndexNow limit per submission
  }
}

const payload = {
  host: HOST,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList: urls,
};

console.log(`Submitting ${urls.length} URLs to IndexNow (${ENDPOINT})...`);

try {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(payload),
  });

  if (res.status === 200 || res.status === 202) {
    console.log(`✅ IndexNow submission successful! Status: ${res.status} (${res.statusText})`);
  } else {
    const text = await res.text();
    console.warn(`⚠️ IndexNow returned HTTP ${res.status}: ${text}`);
  }
} catch (err) {
  console.error(`❌ IndexNow submission failed: ${err.message}`);
}
