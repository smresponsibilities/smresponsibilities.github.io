import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { chromium } from 'playwright-core';

const base = readFileSync(new URL('../src/layouts/Base.astro',import.meta.url),'utf8');
const source = base.match(/<script is:inline data-deferred-analytics>([\s\S]*?)<\/script>/)[1];

test('recorders wait for real interaction and device readiness, then initialize once',async () => {
  const browser = await chromium.launch({channel:'msedge',headless:true});
  try {
    const page = await browser.newPage();
    const requests = [], errors = [];
    page.on('pageerror',error=>errors.push(error.message));
    await page.route(/https:\/\/(www\.clarity\.ms|mc\.yandex\.ru)\//,route=>{
      requests.push(route.request().url());
      return route.fulfill({contentType:'application/javascript',body:''});
    });
    await page.setContent(`<div id="stage"></div><button>Interact</button><script>${source}</script>`);
    await page.waitForTimeout(2200);
    assert.equal(requests.length,0,'no initial recording requests after the previous two-second timer');
    await page.evaluate(()=>window.dispatchEvent(new PointerEvent('pointerdown')));
    await page.waitForTimeout(100);
    assert.equal(requests.length,0,'synthetic input does not activate recording');
    await page.getByRole('button').click();
    await page.waitForTimeout(100);
    assert.equal(requests.length,0,'device readiness gates recording after interaction');
    await page.evaluate(()=>{
      document.documentElement.classList.add('dex-ready');
      window.dispatchEvent(new Event('dex:ready'));
    });
    await page.waitForFunction(()=>document.querySelectorAll('script[src]').length===2);
    await page.waitForFunction(()=>window.ym?.a?.length===1);
    await page.getByRole('button').click();
    await page.keyboard.press('Tab');
    await page.waitForTimeout(100);
    assert.equal(requests.length,2);
    assert.ok(requests.includes('https://www.clarity.ms/tag/yhlv223s2p'));
    assert.ok(requests.includes('https://mc.yandex.ru/metrika/tag.js?id=112521507'));
    assert.equal(await page.evaluate(()=>window.ym.a[0][2].webvisor),true);
    assert.deepEqual(errors,[]);
  } finally {await browser.close();}
});

test('content pages support keyboard activation without requestIdleCallback',async () => {
  const browser = await chromium.launch({channel:'msedge',headless:true});
  try {
    const page = await browser.newPage();
    await page.route(/https:\/\/(www\.clarity\.ms|mc\.yandex\.ru)\//,route=>route.fulfill({contentType:'application/javascript',body:''}));
    await page.setContent(`<button>Interact</button><script>delete window.requestIdleCallback;</script><script>${source}</script>`);
    await page.keyboard.press('Tab');
    await page.waitForFunction(()=>document.querySelectorAll('script[src]').length===2);
    assert.equal(await page.evaluate(()=>window.ym.a.length),1);
  } finally {await browser.close();}
});
