import { test } from 'node:test';
import assert from 'node:assert/strict';
import { chromium } from 'playwright-core';

test('reference loading shows card backs until front assets decode, without scroll rebuilding', async () => {
  const browser = await chromium.launch({channel:'msedge', headless:true});
  try {
    for (const width of [390, 1440]) {
      const page = await browser.newPage({viewport:{width,height:844}});
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      if (width === 390) {
        const cdp = await page.context().newCDPSession(page);
        await cdp.send('Emulation.setCPUThrottlingRate', {rate:4});
        await cdp.send('Network.enable');
        await cdp.send('Network.emulateNetworkConditions', {offline:false,latency:75,downloadThroughput:350000,uploadThroughput:100000});
      }
      await page.route(/clarity|yandex|cloudflareinsights/, route => route.abort());
      let release;
      const held = new Promise(resolve => { release = resolve; });
      await page.route('**/card-finishes/*', async route => {
        if (!new URL(route.request().url()).pathname.endsWith('.svg')) await held;
        await route.continue();
      });
      const response = await page.goto(process.env.TEST_URL || 'http://127.0.0.1:4321/', {waitUntil:'domcontentloaded'});
      await page.waitForSelector('.dex-ready', {state:'attached'});
      assert.ok((await response.text()).includes("data:image/png;base64,"));
      await page.waitForSelector("#page-loader", {state:"detached"});
      const card = page.locator(".project-card").first();
      await card.evaluate(element => element.scrollIntoView({behavior:"instant",block:"center"}));
      await page.waitForFunction(() => document.querySelector(".project-card")?.getAttribute("data-card-assets") === "loading");
      assert.equal(await card.locator(":scope > .site-card-front").evaluate(element => getComputedStyle(element).opacity), "0");
      assert.equal(await card.locator(":scope > .site-card-back").evaluate(element => getComputedStyle(element).transform), "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1)");
      const before = await card.boundingBox();
      await page.screenshot({path:`.scratch/frontend-performance/back-${width}-06.png`});
      await card.locator('a').first().focus();
      assert.equal(await card.locator(':scope > .site-card-front').evaluate(element => getComputedStyle(element).opacity), '1', 'keyboard users retain access while assets load');
      await card.locator('a').first().evaluate(element => element.blur());
      release();
      await page.waitForFunction(() => document.querySelector(".project-card")?.getAttribute("data-card-assets") === "ready");
      assert.equal(await card.locator(":scope > .site-card-front").evaluate(element => getComputedStyle(element).opacity), "1");
      const after = await card.boundingBox();
      assert.ok(Math.abs(before.height - after.height) < 2, "loading must preserve card height");
      const cards = await page.locator('.project-card').count();
      assert.equal(await page.locator('.project-card[data-card-ready]').count(), cards);
      await page.evaluate(() => {
        window.cardMutations = 0;
        const observer = new MutationObserver(records => { window.cardMutations += records.length; });
        document.querySelectorAll('.project-card').forEach(card => observer.observe(card,{childList:true,subtree:true}));
      });
      await page.mouse.wheel(0, 650);
      await page.waitForFunction(() => window.scrollY > 0);
      for (const selector of ['footer', '.project-card', '#stage', '.chapter-card']) {
        await page.locator(selector).first().evaluate(element => element.scrollIntoView({behavior:'instant',block:'center'}));
        await page.waitForTimeout(100);
      }
      assert.equal(await page.evaluate(() => window.cardMutations), 0);
      assert.equal(await page.locator('.project-card .site-card-foil').count(), cards);
      assert.deepEqual(errors, []);
      await page.screenshot({path:`.scratch/frontend-performance/scroll-${width}-05.png`});
      await page.close();
    }
    const plain = await browser.newPage({javaScriptEnabled:false});
    await plain.goto(process.env.TEST_URL || 'http://127.0.0.1:4321/');
    assert.equal(await plain.locator('#page-loader').isVisible(), false);
    assert.equal(await plain.evaluate(() => getComputedStyle(document.documentElement).overflow), 'auto');
    await plain.close();
  } finally { await browser.close(); }
});
