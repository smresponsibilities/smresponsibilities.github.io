import { chromium } from 'playwright-core';
import { readFileSync } from 'node:fs';

let failed = false;
const currentRenderer = readFileSync('public/generation-device/renderer.js', 'utf8');
const prototypeRenderer = readFileSync('.scratch/sm-dex/prototypes/ticket-45-all-generations/renderer.js', 'utf8');
const runtimeLine = source => source.split(/\r?\n/).find(line => line.includes("button.innerHTML="))?.trim();
const rendererParity = runtimeLine(currentRenderer) === runtimeLine(prototypeRenderer);
console.log(JSON.stringify({ rendererParity, current: runtimeLine(currentRenderer), expected: runtimeLine(prototypeRenderer) }));
failed ||= !rendererParity;

const browser = await chromium.launch({ channel: 'chrome', headless: true });
for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }]) {
  const page = await browser.newPage({ viewport, reducedMotion: 'reduce' });
  await page.goto('http://localhost:4322/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);
  const result = await page.evaluate(() => {
    const world = document.querySelector('.world-backdrop');
    const worldStyle = world ? getComputedStyle(world) : null;
    const initialTop = world?.getBoundingClientRect().top;
    window.scrollTo(0, Math.min(900, document.documentElement.scrollHeight - innerHeight));
    const afterTop = world?.getBoundingClientRect().top;
    const buttons = [...document.querySelectorAll('#rig .hardware:not(.direction)')];
    return {
      time: world?.getAttribute('data-time'),
      position: worldStyle?.position,
      fixedDuringScroll: initialTop === afterTop,
      techClouds: document.querySelectorAll('.world-tech').length,
      badMounts: buttons.filter(button => button.querySelector('.hardware-mount')).map(button => button.dataset.control),
      badPosition: buttons.filter(button => getComputedStyle(button).position !== 'absolute').map(button => button.dataset.control),
      badGeometry: buttons.filter(button => button.offsetWidth !== parseFloat(button.style.width) || button.offsetHeight !== parseFloat(button.style.height)).map(button => ({ id: button.dataset.control, actual: [button.offsetWidth, button.offsetHeight], expected: [parseFloat(button.style.width), parseFloat(button.style.height)] })),
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    };
  });
  console.log(JSON.stringify({ viewport, ...result }));
  failed ||= result.position !== 'fixed' || !result.fixedDuringScroll || !['dawn','day','sunset','night'].includes(result.time) || result.techClouds < 6 || result.badMounts.length > 0 || result.badPosition.length > 0 || result.badGeometry.length > 0 || result.overflow > 1;
  if (viewport.width === 1440) {
    const generations = await page.locator('#generations [data-gen]').evaluateAll(nodes => nodes.map(node => node.dataset.gen));
    for (const id of generations) {
      await page.locator(`#generations [data-gen="${id}"]`).evaluate(button => button.click());
      const geometry = await page.locator('#rig').evaluate(rig => ({
        device: rig.dataset.device,
        broken: [...rig.querySelectorAll('.hardware')].filter(button => getComputedStyle(button).position !== 'absolute' || Math.abs(button.offsetWidth - parseFloat(button.style.width)) > 1 || Math.abs(button.offsetHeight - parseFloat(button.style.height)) > 1).map(button => button.dataset.control),
      }));
      console.log(JSON.stringify({ geometry }));
      failed ||= geometry.broken.length > 0;
    }
  }
  await page.close();
}
await browser.close();
if (failed) process.exit(1);
