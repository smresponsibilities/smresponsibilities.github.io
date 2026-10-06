import { chromium } from 'playwright-core';
import { readFile, mkdir } from 'node:fs/promises';
import assert from 'node:assert/strict';

const svg = await readFile('docs/github-profile/dex-preview.svg', 'utf8');
// PNG headers expose the actual pixels, independently of the SVG display size.
const captures = [...svg.matchAll(/data:image\/png;base64,([A-Za-z0-9+/=]+)/g)].map(m => Buffer.from(m[1], 'base64'));
assert.equal(captures.length, 9);
for (const capture of captures) {
  assert(capture.readUInt32BE(16) >= 1920, 'Capture must supply at least 2× pixels for a 960px display');
  assert(capture.readUInt32BE(20) >= 1470, 'Capture height must support high-density displays');
}
const image = `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
const png = `data:image/png;base64,${(await readFile('docs/github-profile/dex-preview.png')).toString('base64')}`;
const embed = `<style>body{margin:0}</style><picture><source media="(prefers-reduced-motion: reduce)" srcset="${png}"><img src="${image}" width="960" height="735"></picture>`;
const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 960, height: 735 } });
  await page.setContent(embed);
  await page.locator('img').evaluate(img => img.decode());
  const first = await page.screenshot();
  await page.waitForTimeout(3100);
  assert(!(await page.screenshot()).equals(first), 'Animation must advance in an image element');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.locator('img').evaluate(img => img.decode());
  await page.waitForTimeout(100);
  const still = await page.screenshot();
  assert.equal(await page.locator('img').evaluate(img => img.currentSrc), png);
  await page.waitForTimeout(3100);
  assert((await page.screenshot()).equals(still), 'Reduced motion must remain still');
  await page.setContent(svg);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await mkdir('.scratch/sm-dex/github-preview', { recursive: true });
  for (let i = 0; i < 9; i++) {
    const active = await page.evaluate(i => {
      document.getAnimations().forEach(a => { a.pause(); a.currentTime = i * 3000 + 100; });
      return [...document.querySelectorAll('image')].map(e => Number(getComputedStyle(e).opacity));
    }, i);
    assert.equal(active.filter(v => v === 1).length, 1);
    assert.equal(active[i], 1);
  }
  // A contact sheet makes every generation's framing reviewable at once.
  const sources = await page.locator('image').evaluateAll(images => images.map(i => i.getAttribute('xlink:href')));
  await page.setViewportSize({ width: 960, height: 735 });
  await page.setContent(`<style>body{margin:0;display:grid;grid-template-columns:repeat(3,320px)}img{width:320px;height:245px}</style>${sources.map(src => `<img src="${src}">`).join('')}`);
  await page.locator('img').evaluateAll(images => Promise.all(images.map(i => i.decode())));
  await page.screenshot({ path: '.scratch/sm-dex/github-preview/contact-sheet.png' });
  console.log('PASS: animated image advances; reduced motion stays still; all nine frames occupy their own interval.');
} finally { await browser.close(); }
