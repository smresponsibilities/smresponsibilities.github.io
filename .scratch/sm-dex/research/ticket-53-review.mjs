import { chromium } from 'playwright-core';
const browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const errors = [];
page.on('pageerror', e => errors.push(e.message));
for (const id of ['gold', 'diamond']) {
  await page.goto(`http://127.0.0.1:4173/.scratch/sm-dex/prototypes/ticket-45-all-generations/?gen=${id}&open=1&v=53.0`);
  await page.waitForTimeout(300);
  await page.locator('#stage').screenshot({ path: `.scratch/sm-dex/research/ticket-53-${id}-open.png` });
  const lens = id === 'gold' ? await page.locator('[data-layer="body"] circle[fill="url(#gold-body-blue)"]').boundingBox() : null;
  for (const [pose, angle] of [['moving', -120], ['closed', -180]]) {
    await page.evaluate(({ id, angle }) => {
      const layers = id === 'gold' ? [['top-leaf', 'X'], ['right-leaf', 'Y']] : [['lid', 'X']];
      for (const [layer, axis] of layers) document.querySelector(`[data-layer="${layer}"]`).style.transform = `rotate${axis}(${angle}deg)`;
    }, { id, angle });
    await page.locator('#stage').screenshot({ path: `.scratch/sm-dex/research/ticket-53-${id}-${pose}.png` });
  }
  if (lens) {
    const closedLens = await page.locator('[data-layer="body"] circle[fill="url(#gold-body-blue)"]').boundingBox();
    if (JSON.stringify(lens) !== JSON.stringify(closedLens)) throw new Error('Fixed GSC lens moved');
    console.log('GSC lens remains fixed across opening/closing');
  }
}
console.log({ errors });
await browser.close();
if (errors.length) process.exitCode = 1;
