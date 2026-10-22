import { chromium } from 'playwright-core';

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
const errors = [];
page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
page.on('pageerror', error => errors.push(error.message));
await page.goto('http://localhost:4322/?pokedexgen=black', { waitUntil: 'domcontentloaded' });
const loaderNote = await page.locator('.loader-mobile-note').evaluate(element => getComputedStyle(element).display);
await page.waitForSelector('#rig[data-device="black"]');

const generations = ['black', 'x', 'sun-moon', 'sword-shield', 'scarlet-violet'];
const results = {};
for (const id of generations) {
  await page.click(`[data-gen="${id}"]`);
  await page.waitForTimeout(50);
  results[id] = await page.evaluate(() => {
    const stage = document.querySelector('#stage');
    const rig = document.querySelector('#rig');
    const power = document.querySelector('#power');
    const readerPower = document.querySelector('#reader-controls [data-action="power"]');
    return {
      stageHeight: stage.getBoundingClientRect().height,
      transform: getComputedStyle(rig).transform,
      powerVisible: !power.hidden,
      readerPowerVisible: !readerPower.hidden,
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    };
  });
}

for (const id of ['x', 'sword-shield', 'scarlet-violet']) {
  await page.click(`[data-gen="${id}"]`);
  await page.click('#power');
  results[id].off = await page.evaluate(() => {
    const glass = document.querySelector('.glass.off');
    const readerPower = document.querySelector('#reader-controls [data-action="power"]');
    return {
      glassBackground: getComputedStyle(glass).backgroundColor,
      readerPowerEnabled: !readerPower.disabled,
      readerPowerLabel: readerPower.textContent,
      outerPowerLabel: document.querySelector('#power').textContent,
    };
  });
  await page.click('#reader-controls [data-action="power"]');
}

await page.click('[data-gen="scarlet-violet"]');
await page.screenshot({ path: '.scratch/sm-dex/research/ticket-80-mobile.png', fullPage: false });
const checks = {
  mobileLoaderNote: loaderNote === 'block',
  closeModernFraming: Object.values(results).every(result => result.stageHeight >= 290 && result.transform !== 'none'),
  powerParity: ['x', 'sword-shield', 'scarlet-violet'].every(id => results[id].powerVisible && results[id].readerPowerVisible && results[id].off.readerPowerEnabled && results[id].off.readerPowerLabel === 'Power' && results[id].off.outerPowerLabel === 'Power on'),
  nativeOffGlass: results.x.off.glassBackground !== 'rgb(48, 54, 56)' && results['sword-shield'].off.glassBackground !== 'rgb(48, 54, 56)' && results['scarlet-violet'].off.glassBackground !== 'rgb(48, 54, 56)',
  noOverflow: Object.values(results).every(result => result.overflow <= 0),
  noErrors: errors.length === 0,
};

console.log(JSON.stringify({ results, loaderNote, errors, checks }, null, 2));
await browser.close();
if (Object.values(checks).some(value => !value)) process.exit(1);
