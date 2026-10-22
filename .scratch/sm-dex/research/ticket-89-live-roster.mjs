import fs from 'node:fs';
import { chromium } from 'playwright-core';

const initialItems = JSON.parse(fs.readFileSync('public/generation-device/roster.json', 'utf8'));
const addedItem = {
  name: '999 · DEPLOYED-USER',
  tag: 'ELECTRIC / STEEL',
  copy: 'Appears after deployment without requiring a page refresh.',
  facts: ['@DEPLOYED-USER', 'LIVE TEST POKEMON', 'STATUS · CAUGHT'],
};
let servedItems = initialItems;
const requests = [];

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.route('**/generation-device/roster.json*', async route => {
  requests.push(route.request().url());
  await route.fulfill({ json: servedItems });
});

await page.goto('http://localhost:4321/', { waitUntil: 'domcontentloaded' });
await page.waitForSelector('#page-loader', { state: 'hidden' });
await page.locator('.glass .screen-row').filter({ hasText: 'DEX' }).first().click();
await page.locator('.glass .screen-row').filter({ hasText: 'PUBLIC ROSTER' }).first().waitFor();

servedItems = [...initialItems.slice(0, -1), addedItem, initialItems.at(-1)];
await page.evaluate(() => window.dispatchEvent(new Event('focus')));
await page.locator('.glass .screen-row').filter({ hasText: '999 · DEPLOYED-USER' }).first().waitFor();

const checks = {
  generatedPayloadMatchesBuild: initialItems.some(item => item.name === 'PUBLIC ROSTER'),
  refreshedWithoutNavigation: await page.evaluate(() => performance.getEntriesByType('navigation').length === 1),
  cacheBustedEveryFetch: requests.length >= 2 && requests.every(url => /roster\.json\?v=\d+$/.test(url)) && new Set(requests).size === requests.length,
  addedEntryRendered: await page.locator('.glass .screen-row').filter({ hasText: '999 · DEPLOYED-USER' }).first().isVisible(),
};

console.log(JSON.stringify({ requestCount: requests.length, checks }, null, 2));
await browser.close();
if (Object.values(checks).some(value => !value)) process.exit(1);
