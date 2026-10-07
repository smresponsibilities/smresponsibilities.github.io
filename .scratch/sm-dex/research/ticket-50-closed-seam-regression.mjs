import { chromium } from 'playwright-core';

const browser = await chromium.launch({
  executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  headless: true,
});
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const base = 'http://127.0.0.1:4173/.scratch/sm-dex/prototypes/ticket-45-all-generations/';
const results = [];
const errors = [];
page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
page.on('pageerror', error => errors.push(error.message));

const measure = async (device, selectors) => {
  await page.goto(`${base}?gen=${device}&open=0&v=50.0`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(350);
  return page.evaluate(selectors => {
    const bounds = selector => {
      const element = document.querySelector(selector);
      if (!element) return null;
      const box = element.getBBox();
      const matrix = element.getScreenCTM();
      const points = [
        [box.x, box.y], [box.x + box.width, box.y],
        [box.x, box.y + box.height], [box.x + box.width, box.y + box.height],
      ].map(([x, y]) => new DOMPoint(x, y).matrixTransform(matrix));
      return {
        left: Math.min(...points.map(point => point.x)),
        top: Math.min(...points.map(point => point.y)),
        right: Math.max(...points.map(point => point.x)),
        bottom: Math.max(...points.map(point => point.y)),
      };
    };
    return Object.fromEntries(Object.entries(selectors).map(([name, selector]) => [name, bounds(selector)]));
  }, selectors);
};

const delta = (a, b, edge) => Math.abs(a[edge] - b[edge]);
const exact = (a, b, edges) => a && b && edges.every(edge => delta(a, b, edge) <= 0.1);

const ruby = await measure('ruby', {
  body: '[data-part="ruby-body"]',
  lid: '.device-layer[data-layer="lid"] .outer path:first-of-type',
  hinge: '.device-layer[data-layer="hinge"] rect:first-of-type',
});
await page.locator('#stage').screenshot({ path: '.scratch/sm-dex/research/ticket-50-rse-closed.png' });
results.push({
  name: 'RSE closed lid has zero seam gap or overhang',
  pass: exact(ruby.body, ruby.lid, ['top', 'right', 'bottom']) &&
    exact(ruby.body, ruby.hinge, ['top', 'bottom']),
  detail: ruby,
});

const diamond = await measure('diamond', {
  body: '[data-part="diamond-closed-fit-body"]',
  lid: '.device-layer[data-layer="lid"] .outer [data-part="diamond-closed-fit-lid"]',
});
await page.locator('#stage').screenshot({ path: '.scratch/sm-dex/research/ticket-50-dp-closed.png' });
results.push({
  name: 'DP closed lid exactly matches centre body',
  pass: exact(diamond.body, diamond.lid, ['left', 'top', 'right', 'bottom']),
  detail: diamond,
});

const gold = await measure('gold', {
  body: '.device-layer[data-layer="body"] path[d^="M84 368"]',
  top: '.device-layer[data-layer="top-leaf"] .outer path:first-of-type',
  right: '.device-layer[data-layer="right-leaf"] .outer path:first-of-type',
});
await page.locator('#stage').screenshot({ path: '.scratch/sm-dex/research/ticket-50-gsc-closed.png' });
const goldCovered = gold.body && gold.top && gold.right &&
  gold.top.left <= gold.body.left + 0.1 && gold.top.right >= gold.body.right - 0.1 &&
  gold.top.top <= gold.body.top + 0.1 && gold.top.bottom >= gold.right.top - 0.1 &&
  gold.right.left <= gold.body.left + 0.1 && gold.right.right >= gold.body.right - 0.1 &&
  gold.right.bottom >= gold.body.bottom - 0.1;
results.push({
  name: 'GSC closed leaves cover final body strip',
  pass: Boolean(goldCovered),
  detail: gold,
});

results.push({ name: 'Browser run has no errors', pass: errors.length === 0, detail: errors });
console.log(JSON.stringify(results, null, 2));
await browser.close();
if (results.some(result => !result.pass)) process.exitCode = 1;
