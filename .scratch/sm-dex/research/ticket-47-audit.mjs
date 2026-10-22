import { chromium } from 'playwright-core';

const browser = await chromium.launch({
  executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  headless: true,
});

const errors = [];
const base = 'http://127.0.0.1:4173/.scratch/sm-dex/prototypes/ticket-45-all-generations/';
const desktop = await browser.newPage({ viewport: { width: 1280, height: 900 } });
desktop.on('console', message => {
  if (message.type() === 'error') errors.push(`console: ${message.text()}`);
});
desktop.on('pageerror', error => errors.push(`page: ${error.message}`));

const devices = ['gold', 'ruby', 'diamond', 'heartgold', 'black'];
const interaction = [];
for (const id of devices) {
  await desktop.goto(`${base}?gen=${id}`, { waitUntil: 'networkidle' });
  const handle = desktop.locator('#slide-handle');
  await handle.focus();
  await handle.press('End');
  await desktop.waitForFunction(() => document.querySelector('#stage')?.dataset.progress === '1');
  const opened = await desktop.locator('#stage').evaluate(stage => ({
    progress: stage.dataset.progress,
    bodyOpen: document.body.dataset.open,
    readerToggleDisabled: document.querySelector('#reader-toggle').disabled,
  }));
  await handle.press('Home');
  await desktop.waitForFunction(() => document.querySelector('#stage')?.dataset.progress === '0');
  const closed = await desktop.locator('#stage').evaluate(stage => ({
    progress: stage.dataset.progress,
    bodyOpen: document.body.dataset.open,
    readerToggleDisabled: document.querySelector('#reader-toggle').disabled,
  }));
  interaction.push({ id, opened, closed });
}

await desktop.goto(`${base}?gen=sun-moon`, { waitUntil: 'networkidle' });
const rotomHandle = desktop.locator('#slide-handle');
const track = await desktop.locator('#slide-track').boundingBox();
const thumb = await rotomHandle.boundingBox();
await desktop.mouse.move(thumb.x + thumb.width / 2, thumb.y + thumb.height / 2);
await desktop.mouse.down();
await desktop.mouse.move(thumb.x + thumb.width / 2 + (track.width - 56) * 0.35, thumb.y + thumb.height / 2, { steps: 8 });
const rearEmergence = await desktop.locator('#rig').evaluate(rig => {
  const style = getComputedStyle(rig);
  return {
    progress: document.querySelector('#stage').dataset.progress,
    facing: document.querySelector('#stage').dataset.facing,
    rearArmScale: style.getPropertyValue('--rotom-rear-arm-scale').trim(),
    rearArmOpacity: style.getPropertyValue('--rotom-rear-arm-opacity').trim(),
  };
});
await desktop.screenshot({ path: 'D:/portfolio/.scratch/sm-dex/research/ticket-47-rotom-emerge-35.png', fullPage: true });
await desktop.mouse.move(thumb.x + thumb.width / 2 + (track.width - 56) * 0.7, thumb.y + thumb.height / 2, { steps: 8 });
const midTurn = await desktop.locator('#rig').evaluate(rig => {
  const style = getComputedStyle(rig);
  return {
    progress: document.querySelector('#stage').dataset.progress,
    facing: document.querySelector('#stage').dataset.facing,
    frontLeftShift: style.getPropertyValue('--rotom-left-arm-shift').trim(),
    rearArmScale: style.getPropertyValue('--rotom-rear-arm-scale').trim(),
    rearArmOpacity: style.getPropertyValue('--rotom-rear-arm-opacity').trim(),
  };
});
await desktop.screenshot({ path: 'D:/portfolio/.scratch/sm-dex/research/ticket-47-rotom-emerge-70.png', fullPage: true });
await desktop.mouse.up();
await desktop.waitForFunction(() => document.querySelector('#stage')?.dataset.progress === '1');

await desktop.locator('#assets-toggle').click();
await desktop.locator('#reduce-motion').check();
await rotomHandle.focus();
await rotomHandle.press('Home');
const reducedClosed = await desktop.locator('#stage').evaluate(stage => ({ progress: stage.dataset.progress, facing: stage.dataset.facing }));
await rotomHandle.press('End');
const reducedOpen = await desktop.locator('#stage').evaluate(stage => ({ progress: stage.dataset.progress, facing: stage.dataset.facing }));

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mobile.goto(`${base}?gen=ruby&open=1`, { waitUntil: 'networkidle' });
const mobileFit = await mobile.evaluate(() => ({
  scrollWidth: document.documentElement.scrollWidth,
  clientWidth: document.documentElement.clientWidth,
  stageWidth: document.querySelector('#stage').getBoundingClientRect().width,
  viewportWidth: innerWidth,
}));

console.log(JSON.stringify({ interaction, rearEmergence, midTurn, reduced: { closed: reducedClosed, open: reducedOpen }, mobileFit, errors }, null, 2));
await browser.close();
