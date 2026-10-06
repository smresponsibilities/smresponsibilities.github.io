import { chromium } from 'playwright-core';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

// Capture the real UI, without changing production markup or storing avatars.
const base = process.env.DEX_PREVIEW_URL || 'http://localhost:4321';
const out = path.resolve('docs/github-profile');
await mkdir(out, { recursive: true });
const browser = await chromium.launch({ headless: true });
try {
  // Keep the layout in CSS pixels, but rasterize at 3× for high-density displays.
  const page = await browser.newPage({ viewport: { width: 1100, height: 1100 }, deviceScaleFactor: 3, reducedMotion: 'reduce' });
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.locator('#generations button').first().waitFor();
  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({ content: `
    body { background: #0d1117 !important; }
    .device-native { width: 960px !important; padding: 20px !important; background: #0d1117 !important; }
    #stage { width: 760px !important; height: 615px !important; margin: 0 auto !important; }
    .opening, #status, #effect-controls, #reader { display: none !important; }
    #button-tooltip, .callout-line { display: none !important; }
  ` });
  const generations = await page.locator('#generations button').evaluateAll(buttons => buttons.map(b => ({ id: b.dataset.gen, label: b.textContent })));
  const frames = [];
  for (const gen of generations) {
    await page.locator(`#generations [data-gen="${gen.id}"]`).click();
    await page.mouse.move(0, 0);
    await page.waitForTimeout(150);
    if (await page.locator('.device-native img[src*="github"]').count()) throw new Error('Refusing to capture a personal avatar');
    const png = await page.locator('.device-native').screenshot({ animations: 'disabled' });
    frames.push(png);
    console.log(`Captured generation ${gen.label}: ${gen.id}`);
  }
  const box = await page.locator('.device-native').boundingBox();
  const width = Math.round(box.width), height = Math.round(box.height);
  const duration = generations.length * 3;
  const visible = 100 / generations.length;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title desc">
<title id="title">SM'S DEX — nine generations</title>
<desc id="desc">Shivam Mahajan's portfolio inside nine generation-specific devices. Open the portfolio to use the controls.</desc>
<style>
.frame { opacity: 0; animation: cycle ${duration}s linear infinite; }
@keyframes cycle { 0%, ${visible - 0.001}% { opacity: 1; } ${visible}%, 100% { opacity: 0; } }
@media (prefers-reduced-motion: reduce) { .frame { animation: none; opacity: 0; } .first { opacity: 1; } }
</style>
${frames.map((png, i) => `<image class="frame${i === 0 ? ' first' : ''}" style="animation-delay:-${duration - i * 3}s" width="${width}" height="${height}" xlink:href="data:image/png;base64,${png.toString('base64')}"/>`).join('\n')}
</svg>\n`;
  await writeFile(path.join(out, 'dex-preview.svg'), svg);
  await writeFile(path.join(out, 'dex-preview.png'), frames[0]);
  console.log(`Exported ${width} × ${height}, ${Buffer.byteLength(svg)} bytes, ${duration}s loop.`);
} finally {
  await browser.close();
}
