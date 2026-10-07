const { chromium } = require('playwright-core');
(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 3840, height: 2160 }, deviceScaleFactor: 1,
    recordVideo: { dir: '.scratch/sm-dex/linkedin-4k-probe', size: { width: 3840, height: 2160 } },
  });
  const page = await context.newPage();
  await page.goto('https://shivammahajan.com', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => { document.documentElement.style.zoom = '2'; scrollTo(0,600); });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: '.scratch/sm-dex/linkedin-4k-probe/screenshot.png' });
  const video = page.video();
  await context.close();
  console.log(await video.path());
  await browser.close();
})();
