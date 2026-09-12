import { chromium } from 'playwright-core';

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const results = {};

for (const [name, options] of Object.entries({
  mobile: { viewport: { width: 390, height: 844 } },
  mobileReduced: { viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' },
  desktop: { viewport: { width: 1440, height: 1000 } },
})) {
  const page = await browser.newPage(options);
  const errors = [];
  page.on('console', message => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://localhost:4322/?gen=red', { waitUntil: 'load' });
  await page.waitForSelector('#page-loader', { state: 'hidden' });

  const initial = await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    bodySize: getComputedStyle(document.body).fontSize,
    generationSize: getComputedStyle(document.querySelector('#generations button')).fontSize,
    generationHeight: document.querySelector('#generations button').getBoundingClientRect().height,
    actionSize: getComputedStyle(document.querySelector('.opening-tools button')).fontSize,
    actionHeight: document.querySelector('.opening-tools button').getBoundingClientRect().height,
    switchRole: document.querySelector('#tooltip-switch').getAttribute('role'),
    switchState: document.querySelector('#tooltip-switch').getAttribute('aria-checked'),
  }));

  await page.hover('#open-submission');
  const tipShown = await page.locator('#button-tooltip').isVisible();
  await page.click('#tooltip-switch');
  await page.hover('#device-heading');
  await page.hover('#open-submission');
  const tipHidden = !(await page.locator('#button-tooltip').isVisible());
  const stored = await page.evaluate(() => localStorage.getItem('sm-dex-tooltips'));
  await page.reload({ waitUntil: 'load' });
  await page.waitForSelector('#page-loader', { state: 'hidden' });
  const persisted = await page.locator('#tooltip-switch').getAttribute('aria-checked');

  const mutations = await page.evaluate(async () => {
    const reader = document.querySelector('#reader-content');
    let contentWrites = 0;
    const observer = new MutationObserver(records => { contentWrites += records.length; });
    observer.observe(reader, { childList: true });
    document.querySelector('#generations [data-gen="gold"]').click();
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    observer.disconnect();
    return contentWrites;
  });

  if (name === 'mobile') await page.screenshot({ path: '.scratch/sm-dex/research/ticket-77-mobile.png', fullPage: true });

  results[name] = { ...initial, tipShown, tipHidden, stored, persisted, contentWrites: mutations, errors };
  await page.close();
}

const checks = {
  noOverflow: Object.values(results).every(result => result.overflow <= 0),
  mobileScale: results.mobile.bodySize === '18px' && results.mobile.generationSize === '14px' && results.mobile.generationHeight >= 48 && results.mobile.actionSize === '14px' && results.mobile.actionHeight >= 48,
  switchAccessible: Object.values(results).every(result => result.switchRole === 'switch' && result.switchState === 'true'),
  toggleWorks: Object.values(results).every(result => result.tipShown && result.tipHidden && result.stored === 'off' && result.persisted === 'false'),
  singleContentRender: Object.values(results).every(result => result.contentWrites === 1),
  noErrors: Object.values(results).every(result => result.errors.length === 0),
};

console.log(JSON.stringify({ results, checks }, null, 2));
await browser.close();
if (Object.values(checks).some(value => !value)) process.exit(1);
