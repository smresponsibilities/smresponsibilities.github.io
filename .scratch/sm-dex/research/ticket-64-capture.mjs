import { chromium } from 'playwright-core';

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'no-preference' });
await page.goto('http://localhost:4322/', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(1500);
await page.locator('.world-backdrop').evaluate(world => world.dataset.time = 'day');
await page.screenshot({ path: '.scratch/sm-dex/research/ticket-64-glass-clouds.png' });
await page.locator('.opening').screenshot({ path: '.scratch/sm-dex/research/ticket-64-pokeball-slider.png' });
await page.locator('#generations [data-gen="sun-moon"]').evaluate(button => button.click());
await page.locator('#stage').screenshot({ path: '.scratch/sm-dex/research/ticket-64-rotom-clean.png' });
await page.evaluate(() => scrollTo(0, 1350));
await page.screenshot({ path: '.scratch/sm-dex/research/ticket-64-glass-scrolled.png' });
await browser.close();
