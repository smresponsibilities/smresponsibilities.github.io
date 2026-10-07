import { chromium } from 'playwright-core';
const browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const errors = [];
page.on('pageerror', error => errors.push(error.message));
for (const id of ['gold', 'ruby', 'diamond']) {
  await page.goto(`http://127.0.0.1:4173/.scratch/sm-dex/prototypes/ticket-45-all-generations/?gen=${id}&open=0&v=51.0`);
  await page.waitForTimeout(500);
  await page.locator('#stage').screenshot({ path: `.scratch/sm-dex/research/ticket-51-${id}-closed.png` });
  if (id === 'diamond') {
    await page.locator('[data-layer="lid"]').evaluate(el => { el.style.transform = 'rotateX(-120deg)'; });
    await page.locator('#stage').screenshot({ path: '.scratch/sm-dex/research/ticket-51-diamond-moving.png' });
  }
}
console.log(JSON.stringify({ browserErrors: errors }));
await browser.close();
if (errors.length) process.exitCode = 1;
