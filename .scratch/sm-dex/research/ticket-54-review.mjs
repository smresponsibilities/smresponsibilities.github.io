import { chromium } from 'playwright-core';
const browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1120 } });
await page.goto('http://127.0.0.1:4173/.scratch/sm-dex/prototypes/ticket-45-all-generations/?gen=red&open=1&v=54.0');
await page.waitForTimeout(300);
await page.locator('#stage').screenshot({path:'.scratch/sm-dex/research/ticket-54-gen1-approval.png'});
console.log(await page.evaluate(async () => {
  const { controls } = await import('../ticket-35-flat-threejs/model.js');
  return { originalPositions: controls.every(c => {
    const b = document.querySelector(`[data-control="${c.id}"]`);
    return b && parseFloat(b.style.left) === c.x && parseFloat(b.style.top) === c.y && parseFloat(b.style.width) === c.w && parseFloat(b.style.height) === c.h;
  }), glossyCaps: [...document.querySelectorAll('.hardware:not(.direction) .cap')].filter(c => getComputedStyle(c).backgroundImage !== 'none').length };
}));
await browser.close();
