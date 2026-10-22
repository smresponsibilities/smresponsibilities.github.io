import { chromium } from 'playwright-core';

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'no-preference' });
await page.goto('http://localhost:4322/', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(1500);
for (const time of ['dawn','day','sunset','night']) {
  await page.locator('.world-backdrop').evaluate((world, value) => world.dataset.time = value, time);
  await page.screenshot({ path: `.scratch/sm-dex/research/ticket-63-${time}.png` });
}
await page.locator('.world-backdrop').evaluate(world => world.dataset.time = 'day');
await page.evaluate(() => window.scrollTo(0, 1400));
await page.screenshot({ path: '.scratch/sm-dex/research/ticket-63-scrolled.png' });
await page.evaluate(() => window.scrollTo(0, 0));
await page.locator('#stage').screenshot({ path: '.scratch/sm-dex/research/ticket-63-controls.png' });
await browser.close();
