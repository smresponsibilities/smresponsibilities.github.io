import { chromium } from 'playwright-core';

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const results = [];
const url = process.env.TEST_URL || 'http://localhost:4322/';

for (const reducedMotion of ['no-preference', 'reduce']) {
  const page = await browser.newPage({
    viewport: { width: 1280, height: 900 },
    reducedMotion,
  });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const startedAt = Date.now();
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await page.locator('#page-loader').waitFor({ state: 'detached', timeout: 2500 });
  const loaderDismissedMs = Date.now() - startedAt;
  const result = await page.evaluate(() => ({
    loaderPresent: Boolean(document.querySelector('#page-loader')),
    headingVisible: Boolean(document.querySelector('#device-heading')?.getClientRects().length),
    rigChildren: document.querySelector('#rig')?.childElementCount ?? 0,
  }));
  results.push({ reducedMotion, loaderDismissedMs, ...result, errors });
  await page.close();
}

await browser.close();
console.log(JSON.stringify(results, null, 2));

if (results.some(result => result.loaderPresent || !result.headingVisible || result.rigChildren === 0 || result.errors.length)
  || results.find(result => result.reducedMotion === 'reduce').loaderDismissedMs >= 500) {
  process.exitCode = 1;
}
