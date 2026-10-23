import { chromium } from 'playwright-core';
import assert from 'node:assert/strict';
const browser = await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
try {
 for (const width of [390,1280]) {
  const page = await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
  await page.goto('http://127.0.0.1:4322/');
  const card=page.locator('.project-card').first();
  const back=card.locator('.site-card-back');
  await back.waitFor();
  assert.equal(await back.getAttribute('aria-expanded'),'false');
  await back.focus(); await page.keyboard.press('Enter');
  assert.equal(await card.getAttribute('data-expanded'),'true');
  assert.equal(await card.locator('.printed-body').evaluate(el=>el.inert),false);
  assert.equal(await card.locator('.printed-summary').evaluate(el=>getComputedStyle(el).webkitLineClamp),'none');
  await card.locator('.site-card-flip-hint').click();
  assert.equal(await back.getAttribute('aria-expanded'),'false');
  await back.click();
  await page.screenshot({path:`.scratch/timeline-refresh/card-${width}.png`,fullPage:false});
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  await page.goto('file:///D:/portfolio/.scratch/timeline-refresh/flower-lab.html');
  const before=await page.locator('#flower').textContent();
  assert.equal(before.split('\n').length,43);
  await page.locator('#detail').fill('7');
  await page.locator('#detail').dispatchEvent('input');
  assert.notEqual(await page.locator('#flower').textContent(),before);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  await page.screenshot({path:`.scratch/timeline-refresh/flower-${width}.png`});
  await page.close();
 }
 console.log('Card keyboard/tap expansion, collapse, full mobile copy, reduced motion, flower controls, desktop/mobile overflow passed.');
} finally {await browser.close();}
