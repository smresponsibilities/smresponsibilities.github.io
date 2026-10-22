import { chromium } from 'playwright-core';
import { existsSync } from 'node:fs';

const browser = await chromium.launch({ channel: 'chrome', headless: true });
let failed = false;
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
await page.goto('http://localhost:4322/', { waitUntil: 'domcontentloaded' });
const loader = await page.locator('.snake-loader img').evaluate(img => ({
  src: img.getAttribute('src'),
  rendering: getComputedStyle(img).imageRendering,
}));
await page.waitForTimeout(1500);

for (const selector of await page.locator('#generations [data-gen]').evaluateAll(nodes => nodes.map(node => `[data-gen="${node.dataset.gen}"]`))) {
  await page.locator(`#generations ${selector}`).evaluate(button => button.click());
  const result = await page.locator('#rig').evaluate(rig => {
    const controls = [...rig.querySelectorAll('.hardware:not(.direction)')];
    const missingMount = controls.filter(control => !control.querySelector('.hardware-mount')).map(control => control.dataset.control);
    const detached = controls.filter(control => {
      const cap = control.querySelector('.cap')?.getBoundingClientRect();
      const mount = control.querySelector('.hardware-mount')?.getBoundingClientRect();
      return cap && mount && !(mount.left < cap.left && mount.top < cap.top && mount.right > cap.right && mount.bottom > cap.bottom);
    }).map(control => control.dataset.control);
    return { device: rig.dataset.device, controls: controls.length, missingMount, detached };
  });
  console.log(JSON.stringify(result));
  failed ||= result.controls > 0 && (result.missingMount.length > 0 || result.detached.length > 0);
}

const sceneLayers = await page.locator('.pixel-world [data-scene-layer]').count();
const callouts = await page.evaluate(() => {
  const buttons = [...document.querySelectorAll('button')].filter(button => button.offsetParent !== null && !button.disabled);
  const broken = [];
  for (const button of buttons) {
    button.dispatchEvent(new PointerEvent('pointerover', { bubbles: true }));
    const label = document.querySelector('#button-tooltip');
    const line = document.querySelector('.callout-line polyline');
    if (!button.dataset.tooltip || label?.hidden || !label?.textContent?.trim() || !line?.getAttribute('points')) broken.push(button.id || button.dataset.control || button.textContent?.trim());
    button.dispatchEvent(new PointerEvent('pointerout', { bubbles: true }));
  }
  return { checked: buttons.length, broken };
});
console.log(JSON.stringify({ loader, sceneLayers, callouts }));
failed ||= !loader.src?.endsWith('.png') || loader.rendering !== 'pixelated' || sceneLayers < 3 || callouts.broken.length > 0;

await page.setViewportSize({ width: 390, height: 844 });
await page.reload({ waitUntil: 'domcontentloaded' });
await page.waitForTimeout(1500);
const mobile = await page.evaluate(() => ({
  generation: document.body.dataset.generation,
  overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
}));
console.log(JSON.stringify({ mobile }));
failed ||= mobile.generation !== 'scarlet-violet' || mobile.overflow > 1;

console.log(JSON.stringify({ pixelAssets: ['python','react','html','css','git','docker'].every(name => existsSync(`public/logos/pixel-${name}.png`)) }));
await browser.close();
if (failed) process.exit(1);
