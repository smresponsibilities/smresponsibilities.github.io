import { test } from 'node:test';
import assert from 'node:assert/strict';
import { chromium } from 'playwright-core';

test('device effects remain available without eager gallery or simulator work', async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const requests = [];
    page.on('request', request => requests.push(request.url()));
    await page.goto(process.env.TEST_URL || 'http://127.0.0.1:4321/');
    await page.waitForSelector('.dex-ready', { state: 'attached' });
    assert.equal(await page.locator('#asset-grid > *').count(), 0);
    assert.equal(requests.some(url => url.includes('/wordle-simulator/')), false);
    assert.equal(new Set(requests.filter(url => url.includes('/generation-device/renderer.js'))).size, 1);
    const generations = await page.locator('#generations [data-gen]').evaluateAll(nodes => nodes.map(node => node.dataset.gen));
    assert.equal(generations.length, 9);
    for (const gen of generations) {
      await page.locator(`#generations [data-gen="${gen}"]`).click();
      assert.equal(await page.locator('#rig').getAttribute('data-device'), gen);
      assert.equal(await page.locator('#rig').count(), 1);
      assert.ok(await page.locator('#rig .glass').count());
    }
    // The homepage intentionally hides this developer tool. Exercise its retained handler.
    await page.locator('#assets-toggle').evaluate(el => el.click());
    assert.equal(await page.locator('#asset-grid > button').count(), 9);
    await page.locator('#assets-toggle').evaluate(el => el.click());
    await page.locator('#generations [data-gen="sun-moon"]').click();
    await page.locator('#stage').scrollIntoViewIfNeeded();
    await page.waitForFunction(() => !document.querySelector('#rig').hasAttribute('data-paused'));
    const queued = await page.evaluate(() => {
      const stage = document.querySelector('#stage');
      const rect = stage.getBoundingClientRect();
      const original = window.requestAnimationFrame;
      let frames = 0;
      window.requestAnimationFrame = callback => { frames++; return original(callback); };
      try {
        for (let i=0;i<100;i++) stage.dispatchEvent(new PointerEvent('pointermove',{clientX:rect.right-1,clientY:rect.top+20}));
        return frames;
      } finally { window.requestAnimationFrame = original; }
    });
    assert.equal(queued, 1, 'pointer bursts schedule one frame');
    const hidden = await page.evaluate(() => {
      Object.defineProperty(document,'hidden',{configurable:true,value:true});
      document.dispatchEvent(new Event('visibilitychange'));
      const paused = document.querySelector('#rig').hasAttribute('data-paused') && document.documentElement.hasAttribute('data-motion-paused');
      delete document.hidden;
      document.dispatchEvent(new Event('visibilitychange'));
      return paused;
    });
    assert.equal(hidden, true);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForFunction(() => document.querySelector('#rig').hasAttribute('data-paused'));
    await page.locator('#stage').scrollIntoViewIfNeeded();
    await page.waitForFunction(() => !document.querySelector('#rig').hasAttribute('data-paused'));
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForFunction(() => document.querySelector('#rig').classList.contains('effects-reduced'));
    await page.locator('#slide-handle').focus();
    await page.keyboard.press('Home');
    assert.equal(await page.locator('#stage').getAttribute('data-progress'), '0');
    const handle = await page.locator('#slide-handle').boundingBox();
    const travel = await page.locator('#slide-track').evaluate(el => Math.max(140,el.clientWidth-56));
    await page.mouse.move(handle.x+24, handle.y+24);
    await page.mouse.down();
    await page.mouse.move(handle.x+24+travel, handle.y+24);
    await page.mouse.up();
    assert.equal(await page.locator('#stage').getAttribute('data-progress'), '1');
    await page.locator('#open-wordle-native-btn').click();
    await page.waitForFunction(() => document.querySelector('#wordle-dialog-frame').getAttribute('src') === '/wordle-simulator/?embed=true');
    await page.locator('#close-wordle-dialog').click();
    await page.locator('#open-submission').click();
    assert.equal(await page.locator('#submission-dialog').evaluate(el => el.open), true);
    await page.keyboard.press('Escape');
    await page.setViewportSize({width:390,height:844});
    await page.goto(process.env.TEST_URL || 'http://127.0.0.1:4321/');
    await page.waitForSelector('.dex-ready', {state:'attached'});
    assert.equal(await page.locator('#rig').getAttribute('data-device'), 'scarlet-violet');
    const stage = await page.locator('#stage').boundingBox();
    assert.ok(stage.width <= 390);
    await page.goto(new URL('/productivity-caller-simulator/',process.env.TEST_URL || 'http://127.0.0.1:4321/').href);
    await page.evaluate(() => {
      window.blinkIntervals = new Set();
      const set = window.setInterval, clear = window.clearInterval;
      window.setInterval = (callback,delay,...args) => {
        const id = set(callback,delay,...args);
        if (delay === 4500) window.blinkIntervals.add(id);
        return id;
      };
      window.clearInterval = id => { window.blinkIntervals.delete(id); clear(id); };
    });
    for (let i=0;i<2;i++) {
      await page.locator('#ctrl').getByRole('button',{name:'Fire reminder',exact:true}).click();
      await page.locator('#ctrl').getByRole('button',{name:'Answer call',exact:true}).click();
      assert.equal(await page.evaluate(() => window.blinkIntervals.size),1);
      await page.locator('#ctrl').getByRole('button',{name:'Reset simulator',exact:true}).click();
      assert.equal(await page.evaluate(() => window.blinkIntervals.size),0);
    }
    assert.deepEqual(errors, []);
  } finally {
    await browser.close();
  }
});
