const { chromium } = require('playwright-core');

const PAGES = ['gameboy.html', 'gen45.html', 'rotom.html'];
const BASE = 'file:///C:/Users/sm/Desktop/portfolio/.scratch/sm-dex/prototypes/gen-families/';
const OUT = 'C:/Users/sm/Desktop/portfolio/.scratch/sm-dex/prototypes/gen-families/screenshots/';

(async () => {
  const browser = await chromium.launch({
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    headless: true,
  });
  const results = [];
  const log = (name, pass, detail) => {
    results.push({ name, pass });
    console.log(`${pass ? 'PASS' : 'FAIL'} | ${name} | ${detail}`);
  };

  for (const file of PAGES) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    const errors = [];
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('pageerror', e => errors.push('PAGEERROR: ' + e.message));
    await page.goto(BASE + file);
    await page.waitForTimeout(400);

    // all images decoded
    const badImages = await page.evaluate(() =>
      [...document.images].filter(i => !i.complete || i.naturalWidth === 0).map(i => i.src)
    );
    log(`${file}: images`, badImages.length === 0, badImages.join(',') || `${await page.evaluate(() => document.images.length)} decoded`);

    // menu renders
    let s = await page.evaluate(() => window.__dexPrototype.getState());
    log(`${file}: initial menu`, s.view === 'menu' && s.sel === 0, JSON.stringify(s));

    await page.screenshot({ path: OUT + file.replace('.html', '-menu.png'), fullPage: false });

    // down into roster, open detail
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter'); // A on VERSION? sel=1 -> version cycles
    s = await page.evaluate(() => window.__dexPrototype.getState());
    log(`${file}: A on VERSION cycles`, !!s.version, JSON.stringify(s));

    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('Enter'); // ROSTER -> list
    s = await page.evaluate(() => window.__dexPrototype.getState());
    log(`${file}: roster opens`, s.view === 'list', JSON.stringify(s));
    await page.screenshot({ path: OUT + file.replace('.html', '-list.png') });

    // dpad/button clickable
    const clicked = await page.evaluate(() => {
      const before = window.__dexPrototype.getState().actionCount;
      const btn = [...document.querySelectorAll('button.control')].find(b => /down|confirm/i.test(b.getAttribute('aria-label')));
      if (!btn) return null;
      btn.click();
      const after = window.__dexPrototype.getState();
      return { changed: after.actionCount > before, sel: after.sel };
    });
    log(`${file}: control click registers`, clicked !== null && clicked.changed, JSON.stringify(clicked));

    // overflow check at 375
    await page.setViewportSize({ width: 375, height: 700 });
    await page.waitForTimeout(200);
    const overflow = await page.evaluate(() => ({
      sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth
    }));
    log(`${file}: no overflow @375`, overflow.sw <= 376, JSON.stringify(overflow));
    await page.screenshot({ path: OUT + file.replace('.html', '-mobile.png') });

    log(`${file}: console clean`, errors.length === 0, errors.join(' || ') || 'no errors');
    await page.close();
  }

  await browser.close();
  const failed = results.filter(r => !r.pass).length;
  console.log(`\n${results.length - failed}/${results.length} checks passed`);
  process.exit(failed ? 1 : 0);
})();
