const { chromium } = require('playwright-core');
const path = 'C:/Users/sm/Desktop/portfolio/.scratch/sm-dex/ticket-26-control-prototype.html';
const fileUrl = 'file:///' + path;
const results = [];
const log = (name, pass, detail) => { results.push({ name, pass, detail }); console.log(`${pass ? 'PASS' : 'FAIL'} | ${name} | ${detail}`); };

(async () => {
  const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const consoleErrors = [];
  page.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') consoleErrors.push(m.text()); });
  page.on('pageerror', e => consoleErrors.push('PAGEERROR: ' + e.message));
  await page.goto(fileUrl);
  await page.waitForTimeout(300);

  const state = () => page.evaluate(() => window.__dexPrototype.getState());
  const count = async () => (await state()).actionCount;

  // --- 1. closed initial
  let s = await state();
  log('initial-closed', s.state === 'closed' && s.closed === true, JSON.stringify(s));
  await page.screenshot({ path: 'shot-1-closed.png' });

  // --- 2. keyboard open without focus: Enter/A should NOT open
  await page.keyboard.press('Enter');
  await page.waitForTimeout(200);
  s = await state();
  log('enter-no-focus-does-not-open', s.state === 'closed', `state=${s.state} (no dedicated OPEN key exists; must Tab to button)`);

  // --- 3. Tab reaches open control? count tab stops when closed
  const closedTabStops = await page.evaluate(() => {
    const stops = [];
    const root = document.body;
    for (const el of root.querySelectorAll('*')) {
      if (el.disabled) continue;
      const ti = el.tabIndex;
      if ((ti === 0 || ti > 0) && (el.offsetParent !== null || el === document.activeElement)) stops.push(el.className || el.tagName);
    }
    return stops;
  });
  log('closed-tab-stops', closedTabStops.length === 1, JSON.stringify(closedTabStops));

  // --- 4. open via click
  await page.click('#open-control');
  await page.waitForTimeout(120); // mid-boot
  s = await state();
  log('open-goes-boot', s.state === 'boot', `state=${s.state}`);
  await page.screenshot({ path: 'shot-2-boot.png' });

  // --- 5. A during boot skips to main menu
  await page.keyboard.press('a');
  s = await state();
  log('boot-A-skips-to-menu', s.state === 'main-menu', `state=${s.state}`);
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'shot-3-menu.png' });

  // --- 6. MODIFIER HIJACK test: Ctrl+S / Ctrl+A / Ctrl+V
  const before = await count();
  await page.keyboard.press('Control+s');
  await page.keyboard.press('Control+a');
  await page.keyboard.press('Control+v');
  const afterCtrl = await count();
  const pdTest = await page.evaluate(() => {
    let captured = null;
    const h = (e) => { captured = { defaultPrevented: e.defaultPrevented, key: e.key }; };
    document.addEventListener('keydown', h, true);
    const mk = (key, mods) => new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true, ...mods });
    const r = {};
    for (const [k, m] of [['s', { ctrlKey: true }], ['a', { ctrlKey: true }], ['v', { ctrlKey: true }]]) {
      const ev = mk(k, m);
      document.dispatchEvent(ev);
      r['ctrl+' + k] = ev.defaultPrevented;
    }
    document.removeEventListener('keydown', h, true);
    return r;
  });
  log('modifier-keys-hijacked', afterCtrl !== before || Object.values(pdTest).some(v => v),
    `actionCount ${before}->${afterCtrl}; preventDefault on synthetic: ${JSON.stringify(pdTest)} (Ctrl+S/A/V trigger game actions + block browser shortcuts)`);

  // --- 7. navigation: DOWN x2 -> MOVES, A -> list, DOWN, A -> detail
  await page.keyboard.press('ArrowDown'); await page.waitForTimeout(50);
  await page.keyboard.press('ArrowDown'); await page.waitForTimeout(50);
  await page.keyboard.press('Enter'); await page.waitForTimeout(50);
  s = await state();
  log('menu-down-a-list', s.state === 'list' && s.menuIndex === 2, JSON.stringify(s));
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter'); await page.waitForTimeout(50);
  s = await state();
  log('list-down-a-detail', s.state === 'detail', JSON.stringify(s));
  await page.screenshot({ path: 'shot-4-detail.png' });

  // --- 8. B reversal chain
  await page.keyboard.press('Escape'); await page.waitForTimeout(30);
  s = await state(); const d2l = s.state === 'list';
  await page.keyboard.press('Escape'); await page.waitForTimeout(30);
  s = await state(); const l2m = s.state === 'main-menu';
  await page.keyboard.press('Escape'); await page.waitForTimeout(30);
  s = await state(); const m2b = s.state === 'boot';
  await page.keyboard.press('Escape'); await page.waitForTimeout(800);
  s = await state(); const b2c = s.state === 'closed';
  log('B-reverses-chain', d2l && l2m && m2b && b2c, `detail->list=${d2l} list->menu=${l2m} menu->boot=${m2b} boot->closed=${b2c}`);

  // --- 9. focus after close (wait past 570ms already done)
  const focusAfterClose = await page.evaluate(() => document.activeElement.id || document.activeElement.className);
  log('focus-on-open-after-close', String(focusAfterClose).includes('open-control'), `activeElement=${focusAfterClose}`);

  // --- 10. reopen restores MAIN MENU not stale detail
  await page.click('#open-control');
  await page.waitForTimeout(1400);
  s = await state();
  log('reopen-main-menu-not-detail', s.state === 'main-menu' && s.menuIndex === 0, `state=${s.state} menuIndex=${s.menuIndex}`);

  // --- 11. Enter on focused button double activation?
  await page.evaluate(() => { document.querySelector('[data-action="A"]').focus(); });
  const c0 = await count();
  await page.keyboard.press('Enter');
  await page.waitForTimeout(100);
  const c1 = await count();
  log('enter-single-activation', c1 - c0 === 1, `delta=${c1 - c0}`);

  // --- 12. Space on focused button: source mislabelled + works?
  const srcBefore = await page.evaluate(() => document.querySelector('#device').dataset.lastSource);
  await page.evaluate(() => { document.querySelector('[data-action="A"]').focus(); });
  const c2 = await count();
  await page.keyboard.press(' ');
  await page.waitForTimeout(100);
  const c3 = await count();
  const srcAfter = await page.evaluate(() => document.querySelector('#device').dataset.lastSource);
  log('space-fires-click-labelled-pointer', c3 - c2 === 1, `delta=${c3 - c2}, lastSource=${srcBefore}->${srcAfter} (keyboard space logged as pointer)`);

  // --- 13. version selector flow
  await page.keyboard.press('v'); await page.waitForTimeout(50);
  s = await state();
  log('select-opens-version', s.versionMode === true, JSON.stringify(s));
  await page.screenshot({ path: 'shot-5-version.png' });
  await page.keyboard.press('ArrowLeft'); await page.waitForTimeout(50);
  await page.keyboard.press('ArrowUp'); await page.waitForTimeout(50); // should be ignored in version mode
  await page.keyboard.press('Enter'); await page.waitForTimeout(80);
  s = await state();
  const appliedVersion = s.version;
  log('version-apply-left', s.versionMode === false && appliedVersion === 'diamond', `versionMode=${s.versionMode} version=${appliedVersion}`);
  const palette = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--shell').trim());
  log('palette-changed-with-version', palette.length > 0, `--shell=${palette}`);

  // --- 14. a11y: listbox options focusable? roving tabindex? aria-selected without focus
  const a11y = await page.evaluate(() => {
    const lb = document.querySelector('[role="listbox"]');
    const opts = [...document.querySelectorAll('[role="option"]')];
    return {
      listboxTabbable: lb ? lb.tabIndex >= 0 : null,
      optsWithTabIndex: opts.filter(o => o.tabIndex >= 0).length,
      opts: opts.length,
      ariaActivedescendant: lb?.hasAttribute('aria-activedescendant'),
      selectedWithoutFocus: opts.some(o => o.getAttribute('aria-selected') === 'true' && !o.closest('.screen').contains(document.activeElement)),
      screensFocusable: [...document.querySelectorAll('.screen')].filter(sc => sc.tabIndex >= 0).length,
    };
  });
  log('listbox-not-operable', !(a11y.listboxTabbable || a11y.optsWithTabIndex > 0 || a11y.ariaActivedescendant),
    `listbox tabIndex>=0:${a11y.listboxTabbable} options tabbable:${a11y.optsWithTabIndex}/${a11y.opts} activedescendant:${a11y.ariaActivedescendant} -> SR users cannot operate this "listbox"; screens as extra tab stops: ${a11y.screensFocusable}`);

  // --- 15. overflow probe at widths (rect-based, body overflow-x hidden masks scrollWidth)
  for (const w of [375, 768, 1280]) {
    await page.setViewportSize({ width: w, height: 800 });
    await page.waitForTimeout(250);
    const m = await page.evaluate(() => {
      const doc = document.documentElement;
      const stage = document.querySelector('.device-stage').getBoundingClientRect();
      const overflows = [];
      for (const el of document.querySelectorAll('body *')) {
        const r = el.getBoundingClientRect();
        if (r.width > 0 && (r.right > doc.clientWidth + 1 || r.left < -1)) overflows.push(el.className.toString().slice(0, 40) || el.tagName);
      }
      return { scrollW: doc.scrollWidth, clientW: doc.clientWidth, stageRight: Math.round(stage.right), stageW: Math.round(stage.width), vw: window.innerWidth, overflows: [...new Set(overflows)].slice(0, 8) };
    });
    log(`overflow-${w}`, m.overflows.length === 0, `scrollW=${m.scrollW} clientW=${m.clientW} stage=${m.stageW}px elements-outside-viewport=[${m.overflows.join('; ')}]`);
    if (w === 375) await page.screenshot({ path: 'shot-6-mobile.png' });
  }

  // --- 16. rapid announce collision
  const annTest = await page.evaluate(() => new Promise(res => {
    const ann = document.getElementById('announcer');
    const beforeText = ann.textContent;
    res(beforeText);
  }));
  // --- 17. console cleanliness
  log('console-clean', consoleErrors.length === 0, consoleErrors.join(' | ') || 'no errors/warnings');

  // --- 18. reduced motion flag
  const rm = await page.evaluate(() => ({ htmlFlag: document.documentElement.dataset.reducedMotion, devFlag: document.querySelector('#device').dataset.reducedMotion }));
  log('reduced-motion-flag-set', rm.htmlFlag === 'false' && rm.devFlag === 'false', JSON.stringify(rm));

  await browser.close();
  const fails = results.filter(r => !r.pass).length;
  console.log(`\n== ${results.length - fails}/${results.length} checks passed, ${fails} findings ==`);
})().catch(e => { console.error('HARNESS ERROR', e); process.exit(1); });
