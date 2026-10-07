import { chromium } from 'playwright-core';

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const viewports = {
  tiny: { width: 320, height: 568 },
  phone: { width: 390, height: 844 },
  phoneLandscape: { width: 667, height: 375 },
  tablet: { width: 768, height: 1024 },
  laptopShort: { width: 1024, height: 600 },
  desktop: { width: 1440, height: 900 },
};
const generations = ['red', 'gold', 'ruby', 'diamond', 'black', 'x', 'sun-moon', 'sword-shield', 'scarlet-violet'];
const results = {};

for (const [name, viewport] of Object.entries(viewports)) {
  const page = await browser.newPage({ viewport });
  const errors = [];
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://localhost:4322/', { waitUntil: 'domcontentloaded' });

  const loader = await page.evaluate(() => {
    const shell = document.querySelector('#page-loader');
    const facts = [...document.querySelectorAll('.loader-fact, .loader-extra-fact')];
    const content = [...shell.children].map(element => element.getBoundingClientRect());
    return {
      overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      fitsY: content.every(rect => rect.top >= 0 && rect.bottom <= innerHeight),
      facts: facts.map(element => element.textContent.trim()),
    };
  });
  if (['tiny', 'phoneLandscape', 'desktop'].includes(name)) {
    await page.screenshot({ path: `.scratch/sm-dex/research/ticket-81-${name}-loader.png` });
  }

  await page.waitForSelector('#rig[data-device]');
  const devices = {};
  for (const id of generations) {
    await page.click(`[data-gen="${id}"]`);
    devices[id] = await page.evaluate(() => ({
      overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      stageWidth: document.querySelector('#stage').getBoundingClientRect().width,
      viewportWidth: innerWidth,
    }));
  }

  await page.click('#open-submission');
  const dialog = await page.evaluate(() => {
    const element = document.querySelector('#submission-dialog');
    const rect = element.getBoundingClientRect();
    return {
      overflowX: element.scrollWidth - element.clientWidth,
      withinViewport: rect.left >= 0 && rect.right <= innerWidth && rect.top >= 0 && rect.bottom <= innerHeight,
    };
  });
  await page.click('#close-submission');

  const layout = await page.evaluate(() => {
    const tooSmall = [...document.querySelectorAll('button, a')]
      .filter(element => element.offsetParent !== null && !element.closest('.glass'))
      .map(element => ({ label: element.getAttribute('aria-label') || element.textContent.trim(), rect: element.getBoundingClientRect() }))
      .filter(({ rect }) => rect.width < 44 || rect.height < 44)
      .map(({ label, rect }) => ({ label, width: Math.round(rect.width), height: Math.round(rect.height) }));
    return {
      overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      tooSmall,
    };
  });

  results[name] = { loader, devices, dialog, layout, errors };
  if (['tiny', 'phoneLandscape', 'desktop'].includes(name)) {
    await page.screenshot({ path: `.scratch/sm-dex/research/ticket-81-${name}.png`, fullPage: true });
  }
  await page.close();
}

const reducedPage = await browser.newPage({ viewport: viewports.phone });
await reducedPage.emulateMedia({ reducedMotion: 'reduce' });
await reducedPage.goto('http://localhost:4322/', { waitUntil: 'domcontentloaded' });
const reducedMotion = await reducedPage.evaluate(() => ({
  loaderImage: getComputedStyle(document.querySelector('.snake-loader img')).animationName,
  loaderOrbit: getComputedStyle(document.querySelector('.loader-orbit')).animationName,
  worldTech: getComputedStyle(document.querySelector('.world-tech')).animationName,
}));
await reducedPage.close();

const checks = {
  ownedFacts: Object.values(results).every(({ loader }) => loader.facts.every(fact => /^@[\w-]+\s+·\s+DEX FACT:/.test(fact))),
  loaderFits: Object.values(results).every(({ loader }) => loader.overflowX <= 0 && loader.fitsY),
  noPageOverflow: Object.values(results).every(({ layout, devices }) => layout.overflowX <= 0 && Object.values(devices).every(device => device.overflowX <= 0 && device.stageWidth <= device.viewportWidth)),
  dialogFits: Object.values(results).every(({ dialog }) => dialog.overflowX <= 0 && dialog.withinViewport),
  touchTargets: Object.values(results).every(({ layout }) => layout.tooSmall.length === 0),
  reducedMotion: Object.values(reducedMotion).every(value => value === 'none'),
  noRuntimeErrors: Object.values(results).every(({ errors }) => errors.length === 0),
};

console.log(JSON.stringify({ results, reducedMotion, checks }, null, 2));
await browser.close();
if (Object.values(checks).some(value => !value)) process.exit(1);
