import { chromium } from 'playwright-core';

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const results = [];

for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }]) {
  const page = await browser.newPage({ viewport, reducedMotion: 'reduce' });
  const errors = [];
  const failures = [];
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => { if (response.status() >= 400) failures.push(`${response.status()} ${response.url()}`); });
  await page.goto('http://localhost:4322/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(900);

  const result = await page.evaluate(() => {
    const visibleDeviceButtons = [...document.querySelectorAll('.device-native button')].filter(button => button.offsetParent !== null);
    return {
      iframeCount: document.querySelectorAll('iframe').length,
      defaultDevice: document.querySelector('#rig')?.dataset.device,
      generationLabels: [...document.querySelectorAll('#generations button')].map(button => button.textContent),
      missingDeviceTooltips: visibleDeviceButtons.filter(button => !button.dataset.tooltip).map(button => button.id || button.textContent?.trim()),
      loaderPresent: Boolean(document.querySelector('#page-loader')),
      loaderTipInSource: document.documentElement.innerHTML.includes('SM likes paneer and is unemployed right now.'),
      experiencePresent: Boolean(document.querySelector('#experience-heading')),
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    };
  });

  await page.locator('#generations button').first().focus();
  await page.waitForTimeout(50);
  const keyboardTooltipVisible = await page.locator('#button-tooltip').isVisible();

  const generationButtons = page.locator('#generations button');
  for (const button of await generationButtons.all()) await button.click();
  const hardware = page.locator('#slide-handle');
  await hardware.hover();
  await page.waitForTimeout(50);
  const tooltipVisible = await page.locator('#button-tooltip').isVisible();
  await page.locator('#open-submission').click();
  const formVisible = await page.locator('#submission-dialog').isVisible();
  await page.locator('#cancel-submission').click();
  await page.screenshot({ path: `.scratch/sm-dex/research/ticket-60-${viewport.width}.png`, fullPage: true });
  results.push({ viewport, ...result, keyboardTooltipVisible, tooltipVisible, formVisible, errors, failures });
  await page.close();
}

console.log(JSON.stringify(results, null, 2));
await browser.close();
