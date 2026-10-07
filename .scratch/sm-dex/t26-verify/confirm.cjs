const { chromium } = require('playwright-core');
const fileUrl = 'file:///C:/Users/sm/Desktop/portfolio/.scratch/sm-dex/ticket-26-control-prototype.html';
const log = (n, p, d) => console.log(`${p ? 'CONFIRMED-BUG' : 'no-bug '} | ${n} | ${d}`);

(async () => {
  const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(fileUrl);

  const layerState = () => page.evaluate(() => {
    const l = document.getElementById('screen-layer');
    return { hidden: l.hidden, inert: l.inert, ah: l.getAttribute('aria-hidden'), state: window.__dexPrototype.getState().state };
  });

  // A: press A during boot BEFORE 330ms exposure timer
  await page.click('#open-control');
  await page.waitForTimeout(100);
  await page.keyboard.press('a'); // skip boot
  await page.waitForTimeout(800);
  const a = await layerState();
  log('A-during-boot-blanks-screens', a.hidden || a.inert, `state=${a.state} hidden=${a.hidden} inert=${a.inert}`);
  await page.screenshot({ path: 'bug-A-skip-boot.png' });

  // does ANY interaction recover it without closing?
  await page.keyboard.press('Escape'); await page.waitForTimeout(50); // back to BOOT
  await page.waitForTimeout(1200); // would bootTimer re-expose? it was cleared
  const b = await layerState();
  log('no-self-recovery', b.hidden || b.inert, `state=${b.state} hidden=${b.hidden} inert=${b.inert}`);

  // B: clean boot, no early press -> screens exposed
  await page.keyboard.press('Escape'); await page.waitForTimeout(900); // close
  await page.waitForTimeout(600);
  await page.click('#open-control');
  await page.waitForTimeout(1600);
  const c = await layerState();
  log('clean-boot-exposes-screens', !c.hidden && !c.inert, `state=${c.state} hidden=${c.hidden} inert=${c.inert}`);

  // C: also check START-during-boot (same clearTimers path)
  await page.keyboard.press('Escape'); await page.waitForTimeout(900); await page.waitForTimeout(600);
  await page.click('#open-control');
  await page.waitForTimeout(100);
  await page.keyboard.press('s');
  await page.waitForTimeout(800);
  const d = await layerState();
  log('START-during-boot-blanks-screens', d.hidden || d.inert, `state=${d.state} hidden=${d.hidden} inert=${d.inert}`);

  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
