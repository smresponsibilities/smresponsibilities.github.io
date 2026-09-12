import { chromium } from 'playwright-core';

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
await page.goto('http://localhost:4322/', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(1500);
let failed = false;

for (const id of await page.locator('#generations [data-gen]').evaluateAll(nodes => nodes.map(node => node.dataset.gen))) {
  await page.locator(`#generations [data-gen="${id}"]`).evaluate(button => button.click());
  const overlays = await page.locator('#rig').evaluate(rig => [...rig.querySelectorAll('button')].filter(button => button.classList.contains('phone-back-hit') || button.classList.contains('effect-hit')).map(button => {
    const style = getComputedStyle(button);
    return { id: button.className, border: style.borderWidth, outline: style.outlineWidth, shadow: style.boxShadow, background: style.backgroundColor };
  }).filter(item => item.border !== '0px' || item.outline !== '0px' || item.shadow !== 'none' || !['rgba(0, 0, 0, 0)','transparent'].includes(item.background)));
  console.log(JSON.stringify({ id, overlays }));
  failed ||= overlays.length > 0;
}

await page.locator('#generations [data-gen="red"]').evaluate(button => button.click());
await page.locator('#rig .hardware').first().evaluate(button => button.dispatchEvent(new PointerEvent('pointerover', { bubbles: true })));
await page.evaluate(() => scrollTo(0, 300));
await page.waitForTimeout(50);
const tooltipAfterScroll = await page.evaluate(() => ({ tooltipHidden: document.querySelector('#button-tooltip')?.hidden, lineHidden: document.querySelector('.callout-line')?.hidden }));
await page.locator('#rig .hardware').first().evaluate(button => {
  button.dispatchEvent(new PointerEvent('pointerover', { bubbles: true }));
  button.dispatchEvent(new PointerEvent('pointerout', { bubbles: true, relatedTarget: document.body }));
});
const tooltipAfterExit = await page.evaluate(() => ({ tooltipHidden: document.querySelector('#button-tooltip')?.hidden, lineHidden: document.querySelector('.callout-line')?.hidden }));
const ui = await page.evaluate(() => {
  const slider = getComputedStyle(document.querySelector('#slide-handle'));
  const favicon = document.querySelector('link[rel="icon"]')?.getAttribute('href');
  const glass = getComputedStyle(document.querySelector('.content-section'));
  const clouds = [...document.querySelectorAll('.world-tech')];
  return {
    sliderImage: slider.backgroundImage,
    favicon,
    glassAlpha: glass.backgroundColor,
    glassBlur: glass.backdropFilter,
    cloudImages: clouds.map(cloud => getComputedStyle(cloud, '::before').backgroundImage),
    cloudTops: clouds.map(cloud => cloud.getBoundingClientRect().top / innerHeight),
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
  };
});
console.log(JSON.stringify({ tooltipAfterScroll, tooltipAfterExit, ui }));
failed ||= !tooltipAfterScroll.tooltipHidden || !tooltipAfterScroll.lineHidden || !tooltipAfterExit.tooltipHidden || !tooltipAfterExit.lineHidden || !ui.sliderImage.includes('pokeball-sprites') || !ui.favicon?.includes('pokeball') || ui.glassBlur === 'none' || ui.cloudImages.some(image => !image.includes('pixel-cloud')) || Math.min(...ui.cloudTops) < .18 || ui.overflow > 1;
await browser.close();
if (failed) process.exit(1);
