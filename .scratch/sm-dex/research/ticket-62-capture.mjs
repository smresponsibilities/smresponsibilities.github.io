import { chromium } from 'playwright-core';

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
await page.goto('http://localhost:4322/', { waitUntil: 'domcontentloaded' });
await page.screenshot({ path: '.scratch/sm-dex/research/ticket-62-loader.png' });
await page.waitForTimeout(1500);
await page.screenshot({ path: '.scratch/sm-dex/research/ticket-62-page.png', fullPage: true });
for (const id of await page.locator('#generations [data-gen]').evaluateAll(nodes => nodes.map(node => node.dataset.gen))) {
  await page.locator(`#generations [data-gen="${id}"]`).evaluate(button => button.click());
  await page.locator('#stage').screenshot({ path: `.scratch/sm-dex/research/ticket-62-${id}.png` });
}
await page.locator('#generations [data-gen="red"]').evaluate(button => button.click());
await page.locator('#toggle').evaluate(button => button.click());
await page.locator('#rig .hardware:not(.direction)').first().evaluate(button => button.dispatchEvent(new PointerEvent('pointerover', { bubbles: true })));
await page.screenshot({ path: '.scratch/sm-dex/research/ticket-62-callout.png' });
await browser.close();
