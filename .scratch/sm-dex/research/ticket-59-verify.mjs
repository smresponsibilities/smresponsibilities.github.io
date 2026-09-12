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
  const frame = page.frames().find(candidate => candidate !== page.mainFrame() && candidate.url().includes('generation-device'));
  if (!frame) throw new Error('Generation device iframe did not load.');
  const generationLabels = await frame.locator('#generations button').allTextContents();
  const defaultDevice = await frame.locator('#rig').getAttribute('data-device');
  const selectedDevices = [];
  for (const button of await frame.locator('#generations button').all()) {
    await button.click();
    selectedDevices.push(await frame.locator('#rig').getAttribute('data-device'));
  }
  await page.locator('#open-submission').click();
  const dialogOpen = await page.locator('#submission-dialog').evaluate(node => node.open);
  const fieldCount = await page.locator('#submission-form :is(input,select,textarea)').count();
  await page.locator('#cancel-submission').click();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  await page.screenshot({ path: `.scratch/sm-dex/research/ticket-59-${viewport.width}.png`, fullPage: true });
  await page.evaluate(() => { window.open = url => { window.__submissionUrl = String(url); return null; }; });
  await page.locator('#open-submission').click();
  await page.locator('[name=github]').fill('test-user');
  await page.locator('[name=species]').fill('Builder Pokémon');
  await page.locator('[name=primaryType]').selectOption({ label: 'Steel' });
  await page.locator('[name=height]').fill(`5'10"`);
  await page.locator('[name=weight]').fill('165 lbs');
  await page.locator('[name=entry]').fill('Builds useful tools. Keeps every system calm under pressure.');
  await page.locator('#submission-form button[type=submit]').click();
  const issueUrl = await page.evaluate(() => window.__submissionUrl);
  results.push({ viewport, generationLabels, defaultDevice, selectedDevices, dialogOpen, fieldCount, issueUrl, overflow, errors, failures, frames:page.frames().map(item=>item.url()) });
  await page.close();
}

console.log(JSON.stringify(results, null, 2));
await browser.close();
