const { chromium } = require('playwright-core');
const fs = require('node:fs');
const path = require('node:path');
const dry = process.argv.includes('--rehearse');
const speed = dry ? 0.02 : 1;

(async () => {
  const out = path.resolve('.scratch/sm-dex/linkedin-video-v3');
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    ...(dry ? {} : { recordVideo: { dir: out, size: { width: 1920, height: 1080 } } }),
  });
  // Browser video omits the operating-system cursor. This recording-only overlay
  // follows the actual pointer events and stays above the submission dialog.
  await context.addInitScript(() => {
    document.addEventListener('DOMContentLoaded', () => {
      // The opening is a recording-only hold of the site's own loader. Its normal
      // dismissal still runs against the detached original; production is unchanged.
      const originalLoader = document.querySelector('#page-loader');
      if (originalLoader) {
        const facts = JSON.parse(originalLoader.dataset.facts || '[]');
        const requested = facts.find(f => f.github.toLowerCase() === 'riyasainii448');
        if (!requested) throw new Error('Requested loader fact is missing');
        const loader = originalLoader.cloneNode(true);
        const owner = loader.querySelector('#loader-fact-owner');
        owner.textContent = `@${requested.github}`;
        owner.href = `https://github.com/${requested.github}`;
        loader.querySelector('#loader-extra-fact').textContent = `DEX FACT: ${requested.fact}`;
        loader.classList.remove('loader-done');
        originalLoader.replaceWith(loader);
      }
      const cursor = document.createElement('div');
      cursor.setAttribute('popover', 'manual');
      cursor.setAttribute('aria-hidden', 'true');
      cursor.style.cssText = 'position:fixed;inset:auto;margin:0;padding:0;border:0;background:transparent;overflow:visible;pointer-events:none;width:40px;height:48px;left:1650px;top:850px;';
      cursor.innerHTML = '<svg width="40" height="48" viewBox="0 0 40 48"><path d="M6 5 L6 33 L13 26 L19 39 L25 36 L19 24 L30 24 Z" fill="white" stroke="#101820" stroke-width="2.2" stroke-linejoin="round"/></svg>';
      document.body.append(cursor);
      cursor.showPopover();
      document.addEventListener('pointermove', e => {
        cursor.style.left = `${e.clientX - 6}px`;
        cursor.style.top = `${e.clientY - 5}px`;
      }, true);
      document.addEventListener('click', () => setTimeout(() => {
        cursor.hidePopover(); cursor.showPopover();
      }, 0), true);
    }, { once: true });
  });
  const began = Date.now();
  const page = await context.newPage();
  // Allow the recorder's initial surface to settle at 1080p before site navigation.
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.waitForTimeout(2000);
  page.setDefaultTimeout(8000);
  const scenes = [];
  let mouse = { x: 1650, y: 850 };
  let scrollPace = 380;
  const pause = ms => page.waitForTimeout(ms * speed);
  const mark = async label => {
    const seconds = (Date.now() - began) / 1000;
    scenes.push({ label, seconds });
    console.log(`${seconds.toFixed(1)}s ${label}`);
    await page.screenshot({ path: path.join(out, `${dry ? 'rehearsal' : 'scene'}-${String(scenes.length).padStart(2, '0')}.png`) });
  };
  const move = async (x, y) => {
    const from = { ...mouse };
    const duration = Math.max(280, Math.hypot(x - from.x, y - from.y) / 850 * 1000) * speed;
    const start = Date.now();
    do {
      const t = Math.min(1, (Date.now() - start) / duration);
      await page.mouse.move(from.x + (x - from.x) * t, from.y + (y - from.y) * t);
      if (t === 1) break;
      await page.waitForTimeout(16);
    } while (true);
    mouse = { x, y };
  };
  const scroll = async target => {
    await page.evaluate(async ({ target, speed, scrollPace }) => {
      const from = window.scrollY;
      const end = Math.max(0, Math.min(target, document.documentElement.scrollHeight - innerHeight));
      const duration = Math.max(1800, Math.abs(end - from) / scrollPace * 1000) * speed;
      const start = performance.now();
      await new Promise(resolve => {
        const frame = now => {
          const t = Math.min(1, (now - start) / duration);
          const eased = t * t * (3 - 2 * t);
          window.scrollTo({ top: from + (end - from) * eased, behavior: 'instant' });
          if (t < 1) requestAnimationFrame(frame); else resolve();
        };
        requestAnimationFrame(frame);
      });
    }, { target, speed, scrollPace });
  };
  const button = name => page.getByRole('button', { name, exact: true }).filter({ visible: true }).first();
  const hardware = name => page.locator('.hardware').filter({ visible: true }).and(page.getByRole('button', { name, exact: true })).first();
  const act = async (locator, { hover = 1000, hold = 2200 } = {}) => {
    let box = await locator.boundingBox();
    if (!box) throw new Error('Control is not visible');
    if (box.y < 35 || box.y + box.height > 1045) {
      await scroll(await page.evaluate(() => scrollY) + box.y - 700);
      box = await locator.boundingBox();
    }
    await move(box.x + box.width / 2, box.y + box.height / 2);
    await pause(hover);
    const label = await locator.getAttribute('aria-label') || await locator.innerText();
    if (['Profile', 'Johto · Gold / Silver', 'Add Pokémon'].includes(label)) {
      await page.screenshot({ path: path.join(out, `${dry ? 'rehearsal' : 'capture'}-tooltip-${label.split(' ')[0]}.png`) });
    }
    await page.mouse.down(); await pause(120); await page.mouse.up();
    await pause(300);
    await move(1570, 850);
    await pause(hold);
  };
  await page.goto('https://shivammahajan.com', { waitUntil: 'domcontentloaded', timeout: 45000 });
  await page.evaluate(() => document.fonts.ready);
  const loaderFact = await page.locator('#loader-extra-fact').innerText();
  if (!(await page.locator('#loader-fact-owner').innerText()).includes('riyasainii448')) {
    throw new Error('Requested loader owner was not selected');
  }
  console.log(loaderFact);
  await mark('Loader');
  await pause(6500);
  await page.locator('#page-loader').evaluate(el => el.classList.add('loader-done'));
  await page.waitForTimeout(200);
  await page.locator('#page-loader').evaluate(el => el.remove());
  await page.locator('#page-loader').waitFor({ state: 'hidden' });
  await page.evaluate(() => document.fonts.ready);
  await pause(3000);
  await mark('Homepage');
  await scroll(300);
  await act(page.locator('#toggle'), { hold: 2600 });
  await mark('Generation I closed');
  await act(page.locator('#toggle'), { hold: 2600 });
  await mark('Generation I open');
  for (const name of ['Profile', 'Moves', 'Encounters', 'Ribbons', 'Dex']) {
    await act(hardware(name), { hold: 1500 });
    await act(hardware('Open selected entry'), { hold: 2600 });
    await mark(name);
    if (name === 'Profile') {
      await act(hardware('Next page, white key'), { hold: 2200 });
      await mark('Profile facts');
    }
  }
  await act(hardware('Main menu'), { hold: 1600 });
  const generations = ['Johto · Gold / Silver', 'Hoenn · Ruby / Sapphire', 'Sinnoh · Diamond / Pearl', 'Unova · Black / White', 'Kalos · X / Y', 'Alola · Sun / Moon', 'Galar · Sword / Shield', 'Paldea · Scarlet / Violet'];
  for (const name of generations) {
    await act(button(name), { hold: 3200 });
    await mark(name);
  }
  await act(page.locator('#power'), { hold: 3000 });
  await mark('Power off');
  scrollPace = 125;
  await act(page.locator('#reader-toggle'), { hold: 1300 });
  const readerY = await page.locator('#reader').evaluate(e => e.getBoundingClientRect().top + scrollY - 150);
  await scroll(readerY);
  await act(page.locator('#reader-controls [data-action="power"]'), { hold: 1500 });
  await act(page.locator('#reader-content [data-row="0"]'), { hold: 1200 });
  await act(page.locator('#reader-controls [data-action="confirm"]'), { hold: 3000 });
  await mark('Readable profile');
  for (const [id, label, hold] of [['#about-heading', 'About', 5000], ['#experience-heading', 'Experience', 5000], ['#projects-heading', 'Projects', 6000]]) {
    await scroll(await page.locator(id).evaluate(e => e.getBoundingClientRect().top + scrollY - 130));
    await pause(hold);
    await mark(label);
  }
  await scroll(0);
  await act(button('Add Pokémon'), { hover: 1700, hold: 5500 });
  await mark('Add Pokémon form');
  await move(1180, 820);
  await page.getByRole('dialog').evaluate(async (el, speed) => {
    const from = el.scrollTop, end = el.scrollHeight - el.clientHeight;
    const duration = Math.max(2800, (end - from) / 125 * 1000) * speed;
    const start = performance.now();
    await new Promise(resolve => {
      function frame(now) {
        const t = Math.min(1, (now - start) / duration);
        el.scrollTop = from + (end - from) * t * t * (3 - 2 * t);
        if (t < 1) requestAnimationFrame(frame); else resolve();
      }
      requestAnimationFrame(frame);
    });
  }, speed);
  await pause(2500);
  await mark('Submission actions');
  await act(button('Cancel'), { hold: 3200 });
  await mark('Homepage ending');
  const video = page.video();
  await context.close();
  const raw = video ? await video.path() : null;
  fs.writeFileSync(path.join(out, dry ? 'rehearsal.json' : 'capture.json'), JSON.stringify({ raw, scenes, seconds: (Date.now() - began) / 1000 }, null, 2));
  await browser.close();
})().catch(error => { console.error(error); process.exit(1); });
