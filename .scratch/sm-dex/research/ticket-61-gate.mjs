import { chromium } from 'playwright-core';
import { existsSync } from 'node:fs';

const browser = await chromium.launch({ channel: 'chrome', headless: true });
let failed = false;
for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }]) {
  const page = await browser.newPage({ viewport, reducedMotion: 'reduce' });
  await page.goto('http://localhost:4322/', { waitUntil: 'networkidle' });
  if (viewport.width === 1440) await page.screenshot({ path: '.scratch/sm-dex/research/ticket-61-loader.png' });
  await page.waitForTimeout(1500);
  const audit = await page.evaluate(() => {
    const visible = element => element instanceof HTMLElement && element.offsetParent !== null;
    const buttons = [...document.querySelectorAll('button')].filter(visible);
    const missing = buttons.filter(button => !button.dataset.tooltip).map(button => button.id || button.textContent?.trim());
    const tooSmall = buttons.filter(button => !button.matches('.hardware,.screen-row,.screen-nav button') && !button.closest('.glass') && (() => {
      const rect = button.getBoundingClientRect();
      return rect.width < 44 || rect.height < 44;
    })()).map(button => button.id || button.textContent?.trim());
    const logoPlaceholders = [...document.querySelectorAll('.tech-logo')].filter(node => !node.querySelector('img,svg')).map(node => node.textContent?.trim());
    return { missing, tooSmall, logoPlaceholders };
  });
  const first = page.locator('button').filter({ visible: true }).first();
  await first.focus();
  await page.waitForTimeout(30);
  const tooltip = page.locator('#button-tooltip');
  const tooltipBox = await tooltip.evaluate(node => { const rect = node.getBoundingClientRect(); return { visible: !node.hidden, left: rect.left, top: rect.top, right: rect.right, bottom: rect.bottom }; });
  const line = await page.locator('.callout-line').evaluate(node => ({ visible: !node.hidden, points: node.querySelector('polyline')?.getAttribute('points') }));
  const onscreen = tooltipBox.visible && tooltipBox.left >= 0 && tooltipBox.top >= 0 && tooltipBox.right <= viewport.width && tooltipBox.bottom <= viewport.height;
  const ok = audit.missing.length === 0 && audit.tooSmall.length === 0 && audit.logoPlaceholders.length === 0 && onscreen && line.visible && Boolean(line.points);
  console.log(JSON.stringify({ viewport, ...audit, tooltipBox, line, onscreen, ok }));
  await page.screenshot({ path: `.scratch/sm-dex/research/ticket-61-${viewport.width}.png`, fullPage: true });
  failed ||= !ok;
  await page.close();
}
const pythonLogo = existsSync('public/logos/python-logo-only.svg');
console.log(JSON.stringify({ pythonLogo, ok: pythonLogo }));
failed ||= !pythonLogo;
await browser.close();
if (failed) process.exit(1);
