import {chromium} from 'playwright-core';
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:1280,height:1000}});
await page.goto('http://127.0.0.1:4321/?gen=red',{waitUntil:'load'});
await page.waitForSelector('#page-loader',{state:'hidden'});
const measure=()=>page.evaluate(()=>{const t=document.querySelector('#slide-track').getBoundingClientRect(),b=document.querySelector('#slide-handle').getBoundingClientRect();return {track:{left:t.left,right:t.right},ball:{left:b.left,right:b.right},inside:b.left>=t.left&&b.right<=t.right};});
const open=await measure();await page.locator('#toggle').click();await page.waitForTimeout(450);const closed=await measure();
console.log(JSON.stringify({open,closed},null,2));await browser.close();if(!open.inside||!closed.inside)process.exit(1);
