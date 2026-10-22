import {chromium} from 'playwright-core';
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:1280,height:900}});
await page.goto('http://127.0.0.1:4321/',{waitUntil:'domcontentloaded'});await page.screenshot({path:'.scratch/sm-dex/research/ticket-67-loader.png'});await page.waitForTimeout(1400);
for(const id of ['gold','ruby','diamond','sun-moon']){await page.locator(`#generations [data-gen="${id}"]`).evaluate(el=>el.click());if(await page.locator('#slide-handle').getAttribute('aria-expanded')==='false'){await page.locator('#toggle').click();await page.waitForTimeout(id==='sun-moon'?1150:400);}await page.locator('#stage').screenshot({path:`.scratch/sm-dex/research/ticket-67-${id}.png`});}
await browser.close();
