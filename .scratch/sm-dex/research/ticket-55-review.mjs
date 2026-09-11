import { chromium } from 'playwright-core';
import { writeFile } from 'node:fs/promises';
const browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
const phase = process.argv[2] || 'before';
const report = [];
for (const gen of ['red', 'gold', 'ruby', 'diamond']) {
  await page.goto(`http://127.0.0.1:4173/.scratch/sm-dex/prototypes/ticket-45-all-generations/?gen=${gen}&open=1&v=55`);
  await page.evaluate(() => document.fonts.ready);
  await page.locator('.glass.main .screen-row').first().waitFor();
  await page.locator('#stage').screenshot({ path: `.scratch/sm-dex/research/ticket-55-${gen}-${phase}.png` });
  report.push(await page.evaluate(() => {
    const screens = [...document.querySelectorAll('.glass')];
    const overlap = (a,b) => a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
    return {
      gen: document.querySelector('#rig').dataset.device,
      glossyCaps: [...document.querySelectorAll('.hardware:not(.direction) .cap')].filter(c => getComputedStyle(c).backgroundImage !== 'none').length,
      screens: screens.map(s => ({role:s.dataset.screen, overflowY:s.scrollHeight-s.clientHeight, overflowX:s.scrollWidth-s.clientWidth, font:getComputedStyle(s).fontSize})),
      collisions: [...document.querySelectorAll('.hardware')].filter(b => screens.some(s => overlap(b.getBoundingClientRect(),s.getBoundingClientRect()))).map(b=>b.dataset.control)
    };
  }));
}
console.log(JSON.stringify(report, null, 2));
await writeFile(`.scratch/sm-dex/research/ticket-55-${phase}.json`, JSON.stringify(report,null,2));
await browser.close();
if (report.some(r=>r.glossyCaps || r.collisions.length || r.screens.some(s=>s.overflowX || s.overflowY))) process.exitCode=1;
