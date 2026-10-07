import {chromium} from 'playwright-core';
import assert from 'node:assert/strict';
const browser=await chromium.launch({headless:true});
try {
 const page=await browser.newPage({viewport:{width:1280,height:1000},reducedMotion:'reduce'});
 await page.goto('https://github.com/smresponsibilities',{waitUntil:'domcontentloaded',timeout:60000});
 const article=page.locator('article').filter({has:page.getByRole('heading',{name:'Tech stack',exact:true})});
 await article.waitFor();
 for(const alt of ['Profile views','Python, Java, Kotlin, JavaScript, React, Node.js, Spring, Kafka, Azure, GCP, Git, Linux']) {
  const img=article.getByAltText(alt,{exact:true});
  await img.evaluate(i=>i.decode());
  assert(await img.evaluate(i=>i.naturalWidth>0));
 }
 assert.equal(await article.locator('a[href*="pokedexgen="]').count(),9);
 assert.equal(await article.locator('source[media="(prefers-reduced-motion: reduce)"]').count(),1);
 await article.scrollIntoViewIfNeeded();
 await page.screenshot({path:'.scratch/sm-dex/github-preview/concise-profile-desktop.png'});
 await page.setViewportSize({width:390,height:844});
 await page.getByRole('heading',{name:'Tech stack',exact:true}).scrollIntoViewIfNeeded();
 await page.screenshot({path:'.scratch/sm-dex/github-preview/concise-profile-mobile.png'});
 const bounds = await article.boundingBox(); assert(bounds.x >= 0 && bounds.x + bounds.width <= 390); assert(await article.evaluate(el => el.scrollWidth <= el.clientWidth));
 console.log('PASS: views counter and tech icons load; generation links and reduced-motion fallback retained; profile content fits mobile width.');
} finally {await browser.close();}

