import { chromium } from 'playwright-core';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto('http://127.0.0.1:4321/', { waitUntil: 'load' });
await page.waitForTimeout(1400);
await page.locator('#rig .screen-row').first().evaluate(el=>el.dispatchEvent(new PointerEvent('pointerover',{bubbles:true})));
const callout = await page.evaluate(() => {
  const target = document.querySelector('#rig .screen-row')?.getBoundingClientRect();
  const tip = document.querySelector('#button-tooltip')?.getBoundingClientRect();
  const distance = target && tip ? Math.max(target.left-tip.right,tip.left-target.right,target.top-tip.bottom,tip.top-target.bottom) : -1;
  return {distance,text:document.querySelector('#button-tooltip')?.textContent ?? '',arrow:!!document.querySelector('.callout-line .callout-arrow')};
});
const initial = await page.evaluate(() => ({
  time: document.documentElement.dataset.time,
  dim: getComputedStyle(document.documentElement).getPropertyValue('--dim').trim(),
  scrollbar: getComputedStyle(document.documentElement).scrollbarColor,
  height: !!document.querySelector('[name="height"]'),
  weight: !!document.querySelector('[name="weight"]'),
  company: !!document.querySelector('[name="company"]'),
  hints: document.querySelectorAll('#submission-form .field-hint').length,
  labels: document.querySelectorAll('#submission-form label').length
}));
const conditional = await page.evaluate(() => {
  const status=document.querySelector('[name="status"]'),company=document.querySelector('[name="company"]');
  if(!(status instanceof HTMLSelectElement)&&!(company instanceof HTMLInputElement))return {released:{},caught:{}};
  status.value='Released';status.dispatchEvent(new Event('change',{bubbles:true}));
  const released={hidden:company?.closest('[data-company-field]')?.hidden,required:company?.required};
  status.value='Caught';status.dispatchEvent(new Event('change',{bubbles:true}));
  const caught={hidden:company?.closest('[data-company-field]')?.hidden,required:company?.required};
  return {released,caught};
});
const {released,caught}=conditional;
const checks={
  'tooltip clears target':callout.distance>=24,
  'specific tooltip copy':callout.text.length>=38&&!/^Open [^ ]+$/.test(callout.text),
  'callout arrowhead':callout.arrow,
  'time on root':!!initial.time,
  'near-white secondary text':['#e8eddf','#f5f1dc','#ffffff'].includes(initial.dim.toLowerCase()),
  'site scrollbar themed':initial.scrollbar!=='auto',
  'size fields removed':!initial.height&&!initial.weight,
  'all fields explained':initial.hints>=initial.labels,
  'company exists':initial.company,
  'company conditional':released.hidden&& !released.required&&!caught.hidden&&caught.required
};
console.log(JSON.stringify({callout,initial,released,caught,checks},null,2));
await browser.close();
if(Object.values(checks).some(v=>!v))process.exit(1);
