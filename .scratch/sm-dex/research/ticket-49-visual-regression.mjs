import { chromium } from 'playwright-core';

const browser = await chromium.launch({
  executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  headless: true,
});
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const base = 'http://127.0.0.1:4173/.scratch/sm-dex/prototypes/ticket-45-all-generations/';
const results = [];
const errors = [];
page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
page.on('pageerror', error => errors.push(error.message));
const check = (name, pass, detail) => results.push({ name, pass, detail });

await page.goto(`${base}?gen=ruby&open=1`, { waitUntil: 'networkidle' });
const rse = await page.evaluate(() => {
  return {
    sideLid: Boolean(document.querySelector('[data-part="ruby-side-lid"]')),
    topLid: Boolean(document.querySelector('[data-part="ruby-top-lid"]')),
  };
});
check('RSE restores accepted sideways lid', rse.sideLid && !rse.topLid, rse);

await page.goto(`${base}?gen=diamond&open=1`, { waitUntil: 'networkidle' });
const dp = await page.evaluate(() => {
  const lid = document.querySelector('[data-part="diamond-centre-lid"]');
  const body = document.querySelector('[data-part="diamond-centre-body"]');
  const l = lid?.getBBox(), b = body?.getBBox();
  return {
    coherentClosedFace: !document.querySelector('[data-part="dp-closed-silver-field"]'),
    lidCenter: l ? l.x + l.width / 2 : null,
    bodyCenter: b ? b.x + b.width / 2 : null,
  };
});
check('DP uses one aligned game-art shell', dp.coherentClosedFace && dp.lidCenter !== null && Math.abs(dp.lidCenter - dp.bodyCenter) <= 5, dp);

const buttonDevices = ['red', 'gold', 'ruby', 'diamond', 'black'];
const buttonFinish = [];
for (const id of buttonDevices) {
  await page.goto(`${base}?gen=${id}&open=1`, { waitUntil: 'networkidle' });
  buttonFinish.push(...await page.locator('.hardware:not(.direction)').evaluateAll((buttons, device) => buttons.map(button => {
    const cap = button.querySelector('.cap');
    const capStyle = getComputedStyle(cap);
    const wellStyle = getComputedStyle(button, '::before');
    return {
      device,
      control: button.dataset.control,
      gradient: capStyle.backgroundImage !== 'none',
      capShadow: capStyle.boxShadow !== 'none',
      well: wellStyle.content !== 'none' && wellStyle.boxShadow !== 'none',
      finish: button.dataset.finish,
    };
  }), id));
}
check('Every physical cap uses shared Gen I finish', buttonFinish.length > 0 && buttonFinish.every(item => item.gradient && item.capShadow && item.well && item.finish === 'gen1'), buttonFinish.filter(item => !(item.gradient && item.capShadow && item.well && item.finish === 'gen1')));

const pressChecks = [];
for (const id of buttonDevices) {
  await page.goto(`${base}?gen=${id}&open=1`, { waitUntil: 'networkidle' });
  const button = page.locator('.hardware:not(.direction)').first();
  const box = await button.boundingBox();
  const before = Number(await page.locator('#stage').getAttribute('data-actions'));
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.waitForTimeout(90);
  const heldDepth = await button.locator('.cap').evaluate(cap => new DOMMatrix(getComputedStyle(cap).transform).m42);
  await page.mouse.up();
  const after = Number(await page.locator('#stage').getAttribute('data-actions'));
  pressChecks.push({ id, heldDepth, accepted: after - before });
}
check('Shared caps retain press depth and one action', pressChecks.every(item => item.heldDepth >= 3 && item.accepted === 1), pressChecks);

const rockerFinish = [];
for (const id of ['red', 'gold', 'ruby', 'diamond']) {
  await page.goto(`${base}?gen=${id}&open=1`, { waitUntil: 'networkidle' });
  rockerFinish.push({ id, markers: await page.locator('[data-rocker][data-button-finish="gen1"]').count() });
}
check('Directional rockers use Gen I depth cues', rockerFinish.every(item => item.markers > 0), rockerFinish);
check('Browser run has no errors', errors.length === 0, errors);

console.log(JSON.stringify(results, null, 2));
await browser.close();
if (results.some(result => !result.pass)) process.exitCode = 1;
