import {chromium} from 'playwright-core';
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:1280,height:900}});
await page.goto('http://127.0.0.1:4321/dex/',{waitUntil:'load'});await page.screenshot({path:'.scratch/sm-dex/research/ticket-68-dex.png',fullPage:true});
await page.goto('http://127.0.0.1:4321/dex/smresponsibilities/',{waitUntil:'load'});await page.screenshot({path:'.scratch/sm-dex/research/ticket-68-entry.png',fullPage:true});
const mobile=await browser.newPage({viewport:{width:390,height:844}});await mobile.goto('http://127.0.0.1:4321/',{waitUntil:'load'});await mobile.waitForTimeout(1400);const state=await mobile.evaluate(()=>({generation:document.body.dataset.generation,reader:!document.querySelector('#reader').hidden,overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth}));console.log(JSON.stringify(state));if(state.generation!=='scarlet-violet'||!state.reader||state.overflow>1)process.exitCode=1;await mobile.screenshot({path:'.scratch/sm-dex/research/ticket-68-mobile.png',fullPage:true});await browser.close();
