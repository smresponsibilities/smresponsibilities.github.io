import { chromium } from 'playwright-core';

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const results = {};

for (const [name, viewport] of Object.entries({ mobile: { width: 390, height: 844 }, desktop: { width: 1440, height: 1000 } })) {
  const page = await browser.newPage({ viewport });
  await page.route(/\.(?:png|ico|woff2)(?:\?|$)/, route => route.abort());
  const errors = [];
  page.on('console', message => { if (message.type() === 'error' && !message.text().includes('net::ERR_FAILED')) errors.push(message.text()); });
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://localhost:8000/?gen=gold', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('#rig[data-device="gold"]');
  if (await page.locator('#reader').isHidden()) await page.click('#reader-toggle');
  await page.keyboard.press('Tab');
  await page.locator('#reader-content .screen-row').last().focus();

  results[name] = await page.evaluate(() => {
    const reader = document.querySelector('#reader');
    const readerRows = document.querySelector('#reader-content .screen-rows');
    const row = document.activeElement;
    const controls = document.querySelector('#reader-controls');
    const control = controls.querySelector('button');
    const tips = document.querySelector('#tooltip-switch');
    const tipsStyle = getComputedStyle(tips);
    return {
      params: location.search,
      device: document.querySelector('#rig').dataset.device,
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      readerGap: getComputedStyle(reader).gap,
      rowGap: getComputedStyle(readerRows).gap,
      rowHeight: row.getBoundingClientRect().height,
      rowOutlineOffset: getComputedStyle(row).outlineOffset,
      controlGap: getComputedStyle(controls).gap,
      controlHeight: control.getBoundingClientRect().height,
      tipsBorder: tipsStyle.borderTopWidth,
      tipsBackground: tipsStyle.backgroundColor,
      redundantState: Boolean(tips.querySelector('.tooltip-switch-state')),
    };
  });
  results[name].errors = errors;

  await page.close();
}

const checks = {
  queryMigrates: Object.values(results).every(result => result.params.includes('pokedexgen=gold') && !result.params.includes('?gen=') && result.device === 'gold'),
  noOverflow: Object.values(results).every(result => result.overflow <= 0),
  roomyReader: Object.values(results).every(result => parseFloat(result.readerGap) >= 24 && parseFloat(result.rowGap) >= 10 && result.rowHeight >= 56 && parseFloat(result.controlGap) >= 12 && result.controlHeight >= 56),
  insetFocusRing: Object.values(results).every(result => result.rowOutlineOffset === '-3px'),
  plainTips: Object.values(results).every(result => result.tipsBorder === '0px' && result.tipsBackground === 'rgba(0, 0, 0, 0)' && !result.redundantState),
  noErrors: Object.values(results).every(result => result.errors.length === 0),
};

console.log(JSON.stringify({ results, checks }, null, 2));
await browser.close();
if (Object.values(checks).some(value => !value)) process.exit(1);
