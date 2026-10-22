import { chromium } from 'playwright-core';

const browser = await chromium.launch({
  executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  headless: true,
});
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const base = 'http://127.0.0.1:4173/.scratch/sm-dex/prototypes/ticket-45-all-generations/';
const results = [];
const browserErrors = [];
page.on('console', message => { if (message.type() === 'error') browserErrors.push(message.text()); });
page.on('pageerror', error => browserErrors.push(error.message));
const check = (name, pass, detail) => results.push({ name, pass, detail });

await page.goto(`${base}?gen=ruby&open=1`, { waitUntil: 'networkidle' });
const rse = await page.evaluate(() => {
  const lid = document.querySelector('[data-part="ruby-lid"]');
  const body = document.querySelector('[data-part="ruby-body"]');
  if (!lid || !body) return null;
  const l = lid.getBBox(), b = body.getBBox();
  return { lidCenter: l.x + l.width / 2, bodyCenter: b.x + b.width / 2, lidWidth: l.width, bodyWidth: b.width };
});
check('RSE lid is narrow and right-offset', Boolean(rse && rse.lidCenter - rse.bodyCenter >= 70 && rse.lidWidth / rse.bodyWidth <= 0.64), rse);

await page.goto(`${base}?gen=diamond`, { waitUntil: 'networkidle' });
const dp = await page.evaluate(() => ({
  plate: Boolean(document.querySelector('[data-part="dp-closed-circle"]')),
  field: Boolean(document.querySelector('[data-part="dp-closed-silver-field"]')),
  stripe: Boolean(document.querySelector('[data-part="dp-closed-stripe"]')),
  indicators: document.querySelectorAll('[data-part="dp-closed-indicator"]').length,
  hinge: Boolean(document.querySelector('[data-part="dp-closed-right-hinge"]')),
}));
check('DP closed exterior uses documented landmarks', dp.plate && dp.field && dp.stripe && dp.indicators === 3 && dp.hinge, dp);

await page.goto(`${base}?gen=black&open=1`, { waitUntil: 'networkidle' });
const bw = await page.evaluate(() => ({
  upper: Boolean(document.querySelector('[data-part="bw-stripe-upper"]')),
  lower: Boolean(document.querySelector('[data-part="bw-stripe-lower"]')),
  legacy: Boolean(document.querySelector('[data-part="bw-stripe-crossing"]')),
}));
check('BW stripe stops around centre-control well', bw.upper && bw.lower && !bw.legacy, bw);

await page.goto(`${base}?gen=sun-moon`, { waitUntil: 'networkidle' });
const rearStart = await page.evaluate(() => ({
  leftMoving: Boolean(document.querySelector('[data-part="rear-stowed-left-arm"]')?.closest('[data-motion="rear-stowed-left-arm"]')),
  rightMoving: Boolean(document.querySelector('[data-part="rear-stowed-right-arm"]')?.closest('[data-motion="rear-stowed-right-arm"]')),
  unrelatedFlaps: document.querySelectorAll('[data-motion="rear-left-arm"],[data-motion="rear-right-arm"]').length,
}));
const handle = page.locator('#slide-handle');
const track = await page.locator('#slide-track').boundingBox();
const thumb = await handle.boundingBox();
await page.mouse.move(thumb.x + thumb.width / 2, thumb.y + thumb.height / 2);
await page.mouse.down();
await page.mouse.move(thumb.x + thumb.width / 2 + (track.width - 56) * 0.35, thumb.y + thumb.height / 2, { steps: 8 });
const rearMid = await page.evaluate(() => ({
  leftTransform: getComputedStyle(document.querySelector('[data-motion="rear-stowed-left-arm"]') || document.documentElement).transform,
  rightTransform: getComputedStyle(document.querySelector('[data-motion="rear-stowed-right-arm"]') || document.documentElement).transform,
}));
await page.mouse.up();
check('Rotom rear zigzag assemblies move out', rearStart.leftMoving && rearStart.rightMoving && rearStart.unrelatedFlaps === 0 && rearMid.leftTransform !== 'none' && rearMid.rightTransform !== 'none', { rearStart, rearMid });

await page.locator('#assets-toggle').click();
await page.locator('#reduce-motion').check();
await handle.focus();
await handle.press('End');
const reducedOpen = await page.locator('#stage').evaluate(stage => ({ progress: stage.dataset.progress, facing: stage.dataset.facing }));
await handle.press('Home');
const reducedClosed = await page.locator('#stage').evaluate(stage => ({ progress: stage.dataset.progress, facing: stage.dataset.facing }));
check('Reduced motion snaps Rotom endpoints', reducedOpen.progress === '1' && reducedOpen.facing === 'front' && reducedClosed.progress === '0' && reducedClosed.facing === 'rear', { reducedOpen, reducedClosed });
check('Browser run has no errors', browserErrors.length === 0, browserErrors);

console.log(JSON.stringify(results, null, 2));
await browser.close();
if (results.some(result => !result.pass)) process.exitCode = 1;
