const { chromium } = require('playwright-core');
const fs = require('node:fs');
const path = require('node:path');

(async () => {
  const out = path.resolve('.scratch/sm-dex/linkedin-video');
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    recordVideo: { dir: out, size: { width: 1920, height: 1080 } },
  });
  const page = await context.newPage();
  const click = async (name) => {
    await page.getByRole('button', { name, exact: true }).filter({ visible: true }).first().click();
    await page.mouse.move(1800, 1000);
  };
  const scroll = (y) => page.evaluate(y => window.scrollTo({ top: y, behavior: 'smooth' }), y);
  const section = (id) => page.locator(id).evaluate(e => window.scrollTo({
    top: e.getBoundingClientRect().top + window.scrollY - 110, behavior: 'smooth',
  }));
  await page.goto('https://shivammahajan.com', { waitUntil: 'networkidle' });
  await page.getByRole('switch', { name: 'Tips', exact: true }).click();
  await page.mouse.move(1800, 1000);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1000);
  const start = Date.now();
  const at = async (seconds, action) => {
    await page.waitForTimeout(Math.max(0, seconds * 1000 - (Date.now() - start)));
    if (action) await action();
    console.log(`Scene ${seconds}s`);
  };
  await at(3, () => scroll(200));
  await at(5, () => click('Profile'));
  await at(7, () => page.getByRole('button', { name: /SHIVAM MAHAJAN/ }).filter({ visible: true }).first().click());
  await at(10, () => click('Moves'));
  await at(12, () => page.getByRole('button', { name: /PRODUCTIVITY CALLER/ }).filter({ visible: true }).first().click());
  const generations = ['Johto · Gold / Silver', 'Hoenn · Ruby / Sapphire', 'Sinnoh · Diamond / Pearl', 'Unova · Black / White', 'Kalos · X / Y', 'Alola · Sun / Moon', 'Galar · Sword / Shield', 'Paldea · Scarlet / Violet'];
  for (let i = 0; i < generations.length; i++) {
    await at(16 + i * 2.3, async () => { await click(generations[i]); await scroll(200); });
  }
  await at(35, () => section('#about-heading'));
  await at(39, () => section('#experience-heading'));
  await at(43, () => section('#projects-heading'));
  await at(49, () => scroll(0));
  await at(51, () => click('Add Pokémon'));
  await at(55, () => click('Close submission form'));
  await at(56, async () => { await click('Kanto · Red / Blue'); await scroll(200); });
  await at(60);
  const video = page.video();
  await context.close();
  const raw = await video.path();
  fs.writeFileSync(path.join(out, 'capture.json'), JSON.stringify({ raw, recordingSeconds: (Date.now() - start) / 1000 }, null, 2));
  await browser.close();
  console.log(raw);
})().catch(error => { console.error(error); process.exit(1); });
