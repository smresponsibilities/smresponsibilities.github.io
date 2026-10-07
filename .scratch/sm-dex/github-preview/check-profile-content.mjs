import {chromium} from 'playwright-core';
import assert from 'node:assert/strict';
const browser=await chromium.launch({headless:true});
try {
 const page=await browser.newPage({viewport:{width:1280,height:1000},reducedMotion:'reduce'});
 await page.goto('https://github.com/smresponsibilities',{waitUntil:'domcontentloaded',timeout:60000});
 const article=page.locator('article').filter({has:page.getByRole('heading',{name:'Selected projects',exact:true})});
 await article.waitFor();
 const text=await article.innerText();
 for(const phrase of ['Morgan Stanley','Productivity Caller','Chaincode','QuizDeck','9.35/10','1,150','Wikimedia']) assert(text.includes(phrase),phrase);
 assert.equal(await article.locator('a[href*="github.com/smresponsibilities/Productivity-Caller"]').count(),0);
 assert.equal(await article.locator('a[href*="pokedexgen="]').count(),9);
 assert.equal(await article.locator('source[media="(prefers-reduced-motion: reduce)"]').count(),1);
 await page.getByRole('heading',{name:'Experience',exact:true}).scrollIntoViewIfNeeded();
 await page.screenshot({path:'.scratch/sm-dex/github-preview/expanded-profile-desktop.png'});
 await page.setViewportSize({width:390,height:844});
 await page.getByRole('heading',{name:'Selected projects',exact:true}).scrollIntoViewIfNeeded();
 await page.screenshot({path:'.scratch/sm-dex/github-preview/expanded-profile-mobile.png'});
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'No page overflow on mobile');
 console.log('PASS: published content, public project links, nine generation links, reduced-motion source, mobile width.');
} finally {await browser.close();}
