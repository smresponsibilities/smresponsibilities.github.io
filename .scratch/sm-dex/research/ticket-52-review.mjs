import { chromium } from 'playwright-core';
const browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const errors = [];
page.on('pageerror', error => errors.push(error.message));
for (const id of ['red', 'gold', 'diamond', 'black', 'ruby']) {
  for (const open of [0, 1]) {
    await page.goto(`http://127.0.0.1:4173/.scratch/sm-dex/prototypes/ticket-45-all-generations/?gen=${id}&open=${open}&v=52.0`);
    await page.waitForTimeout(250);
    await page.locator('#stage').screenshot({ path: `.scratch/sm-dex/research/ticket-52-${id}-${open ? 'open' : 'closed'}.png` });
    if (id === 'diamond' && !open) {
      console.log('DP complete outline alignment', await page.evaluate(() => {
        const box = selector => { const r = document.querySelector(selector).getBoundingClientRect(); return [r.x, r.y, r.width, r.height]; };
        const body = box('[data-part="diamond-closed-fit-body"]');
        const lid = box('[data-layer="lid"] .outer [data-part="diamond-open-shell"]');
        return { body, lid, maximumDifference: Math.max(...body.map((value, index) => Math.abs(value - lid[index]))) };
      }));
    }
  }
}
console.log({ errors });
await browser.close();
if (errors.length) process.exitCode = 1;
