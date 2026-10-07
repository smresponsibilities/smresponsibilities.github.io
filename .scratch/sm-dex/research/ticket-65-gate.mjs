import { chromium } from 'playwright-core';
import fs from 'node:fs';

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto('http://127.0.0.1:4321/', { waitUntil: 'domcontentloaded' });

const loader = await page.evaluate(() => {
  const shell = document.querySelector('.snake-loader');
  const logo = shell?.querySelector('img');
  const s = shell?.getBoundingClientRect();
  const i = logo?.getBoundingClientRect();
  return {
    size: s?.width ?? 0,
    centered: !!s && !!i && Math.abs((s.left + s.width / 2) - (i.left + i.width / 2)) < 2 && Math.abs((s.top + s.height / 2) - (i.top + i.height / 2)) < 2,
    animation: logo ? getComputedStyle(logo).animationName : '',
    primary: document.querySelector('.loader-fact')?.textContent ?? '',
    extra: document.querySelector('.loader-extra-fact')?.textContent ?? ''
  };
});

await page.waitForLoadState('load');
await page.waitForTimeout(1500);
const ui = await page.evaluate(() => {
  const section = document.querySelector('.content-section');
  const screen = document.querySelector('.screen-content');
  const alpha = (value) => Number(value.match(/[\d.]+\)$/)?.[0]?.slice(0, -1) ?? 1);
  return {
    sectionAlpha: section ? alpha(getComputedStyle(section).backgroundColor) : 1,
    scrollbarColor: screen ? getComputedStyle(screen).scrollbarColor : 'auto',
    generationPresent: !!document.querySelector('[name="generation"]'),
    factPresent: !!document.querySelector('[name="fact"]'),
    factRequired: document.querySelector('[name="fact"]')?.required ?? true,
    noSectionBlur: section ? getComputedStyle(section).backdropFilter === 'none' : false,
    headerFullWidth: Math.abs((document.querySelector('.portfolio-header')?.getBoundingClientRect().width ?? 0) - innerWidth) < 1,
    favicon: document.querySelector('link[rel="icon"]')?.getAttribute('href') ?? '',
    rotomClass: document.querySelector('.effect-controls')?.className ?? ''
  };
});

await page.locator('#slide-handle').evaluate((el) => {
  const track = el.parentElement;
  el.style.transform = `translateX(${Math.max(0, track.clientWidth - 56)}px) rotate(720deg)`;
});
const sliderTransform = await page.locator('#slide-handle').getAttribute('style');

const docs = fs.existsSync('docs/content-guide.md') ? fs.readFileSync('docs/content-guide.md', 'utf8') : '';
const checks = {
  'glass alpha <= .34': ui.sectionAlpha <= .34,
  'section blur removed': ui.noSectionBlur,
  'header full width': ui.headerFullWidth,
  'SM favicon': ui.favicon.includes('favicon-sm.svg'),
  'pixel scrollbar color': ui.scrollbarColor !== 'auto',
  'ball transform rotates': /rotate\(/.test(sliderTransform ?? ''),
  'loader orbit >= 210px': loader.size >= 210,
  'python centered': loader.centered,
  'python rotates': loader.animation.includes('python-roll'),
  'loader FACT label': loader.primary.includes('FACT:'),
  'loader second fact': loader.extra.trim().length > 0,
  'generation removed': !ui.generationPresent,
  'optional fact field': ui.factPresent && !ui.factRequired,
  'content guide': /## Projects/.test(docs) && /## Experience/.test(docs)
};
console.log(JSON.stringify({ loader, ui, sliderTransform, checks }, null, 2));
await browser.close();
if (Object.values(checks).some((value) => !value)) process.exit(1);
