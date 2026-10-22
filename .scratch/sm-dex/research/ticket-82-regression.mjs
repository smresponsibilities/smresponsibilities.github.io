import { chromium } from 'playwright-core';

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const results = {};
for (const viewport of [{ width: 320, height: 568 }, { width: 390, height: 844 }, { width: 667, height: 375 }]) {
  const page = await browser.newPage({ viewport });
  await page.goto('http://localhost:4322/', { waitUntil: 'domcontentloaded' });
  if (viewport.width === 320) await page.screenshot({ path: '.scratch/sm-dex/research/ticket-82-loader-320.png' });
  results[`${viewport.width}x${viewport.height}`] = await page.evaluate(() => {
    const loader = document.querySelector('#page-loader');
    const facts = JSON.parse(loader.dataset.facts || '[]');
    const shownOwner = document.querySelector('#loader-fact-owner');
    const shownFact = document.querySelector('#loader-extra-fact');
    const factRecord = facts.find(record => shownOwner.textContent === `@${record.github}` && shownFact.textContent.includes(record.fact));
    const profile = document.querySelector('.profile-links').getBoundingClientRect();
    const links = [...document.querySelectorAll('.profile-links a')].map(link => {
      const rect = link.getBoundingClientRect();
      return { label: link.textContent.trim(), left: rect.left, right: rect.right, width: rect.width };
    });
    const factBlock = document.querySelector('.loader-fact').getBoundingClientRect();
    return {
      sourceCount: facts.length,
      sourceMatchesRoster: facts.every(record => record.source === 'roster'),
      shownFactMatchesRecord: Boolean(factRecord),
      factContained: factBlock.left >= 0 && factBlock.right <= innerWidth,
      linksContained: links.every(link => link.left >= profile.left && link.right <= profile.right),
      links,
    };
  });
  if (viewport.width === 320) {
    await page.waitForTimeout(1400);
    await page.locator('.profile-links').scrollIntoViewIfNeeded();
    await page.locator('.about-section').screenshot({ path: '.scratch/sm-dex/research/ticket-82-profile-320.png' });
  }
  await page.close();
}

const checks = {
  rosterOnly: Object.values(results).every(result => result.sourceCount > 0 && result.sourceMatchesRoster),
  ownerMatchesFact: Object.values(results).every(result => result.shownFactMatchesRecord),
  responsiveFacts: Object.values(results).every(result => result.factContained),
  profileLinksContained: Object.values(results).every(result => result.linksContained),
};
console.log(JSON.stringify({ results, checks }, null, 2));
await browser.close();
if (Object.values(checks).some(value => !value)) process.exit(1);
