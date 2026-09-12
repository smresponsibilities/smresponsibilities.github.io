import fs from 'node:fs';
import { chromium } from 'playwright-core';

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const results = {};
for (const viewport of [{ width: 320, height: 568 }, { width: 390, height: 844 }, { width: 667, height: 375 }]) {
  const page = await browser.newPage({ viewport });
  await page.addInitScript(() => { Math.random = () => 0.999; });
  await page.goto('http://localhost:4322/', { waitUntil: 'domcontentloaded' });
  results[`${viewport.width}x${viewport.height}`] = await page.evaluate(() => {
    const loader = document.querySelector('#page-loader');
    const facts = JSON.parse(loader.dataset.facts || '[]');
    const owner = document.querySelector('#loader-fact-owner');
    const copy = document.querySelector('#loader-extra-fact');
    const profile = document.querySelector('.profile-links').getBoundingClientRect();
    const links = [...document.querySelectorAll('.profile-links a')].map(link => link.getBoundingClientRect());
    const loaderChildren = [...loader.children].map(child => child.getBoundingClientRect());
    return {
      staticFact: document.querySelector('.loader-static-fact')?.textContent.trim(),
      factCount: facts.length,
      fallbackCount: facts.filter(fact => fact.source === 'fallback').length,
      hasRiya: facts.some(fact => fact.source === 'roster' && fact.github === 'riyasainii448' && fact.fact.includes('cheese')),
      selectedOwner: owner.textContent,
      ownerMatchesFact: facts.some(fact => owner.textContent === `@${fact.github}` && copy.textContent.includes(fact.fact)),
      loaderContained: loaderChildren.every(rect => rect.left >= 0 && rect.right <= innerWidth && rect.top >= 0 && rect.bottom <= innerHeight),
      linksContained: links.every(rect => rect.left >= profile.left && rect.right <= profile.right),
    };
  });
  await page.close();
}

const deviceContent = fs.readFileSync('public/generation-device/content.js', 'utf8');
const workflow = fs.readFileSync('.github/workflows/roster.yml', 'utf8');
const pageSource = fs.readFileSync('src/pages/index.astro', 'utf8');
const flow = {
  riyaInDeviceDex: deviceContent.includes('002 · RIYASAINII448') && deviceContent.includes('@RIYASAINII448'),
  buildGeneratesDex: JSON.parse(fs.readFileSync('package.json', 'utf8')).scripts.prebuild === 'node scripts/build-device-content.mjs',
  formCreatesMarkdownIssue: pageSource.includes("const body=fields.map") && pageSource.includes("title:`[DEX] ${github}`,body"),
  workflowAcceptsFormIssue: workflow.includes("startsWith(github.event.issue.title, '[DEX]')"),
  workflowOpensPr: workflow.includes('peter-evans/create-pull-request@v7') && workflow.includes('roster/issue-${{ github.event.issue.number }}'),
};
const checks = {
  staticFactAlwaysPresent: Object.values(results).every(result => result.staticFact === 'FACT: SM likes paneer and is unemployed right now.'),
  desiredRandomPool: Object.values(results).every(result => result.factCount === 5 && result.fallbackCount === 4 && result.hasRiya),
  ownerMatchesFact: Object.values(results).every(result => result.ownerMatchesFact && result.selectedOwner === '@riyasainii448'),
  responsive: Object.values(results).every(result => result.loaderContained && result.linksContained),
  flowComplete: Object.values(flow).every(Boolean),
};
console.log(JSON.stringify({ results, flow, checks }, null, 2));
await browser.close();
if (Object.values(checks).some(value => !value)) process.exit(1);
