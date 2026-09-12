import {chromium} from 'playwright-core';
const browser=await chromium.launch({channel:'chrome',headless:true});
const results=[];
for(const viewport of [{width:933,height:607},{width:390,height:844}]){
  const page=await browser.newPage({viewport});
  await page.goto('http://127.0.0.1:4321/?gen=red',{waitUntil:'load'});
  await page.waitForSelector('#page-loader',{state:'hidden'});
  results.push(await page.evaluate(()=>({overflow:getComputedStyle(document.querySelector('#stage')).overflow,scrollWidth:document.documentElement.scrollWidth,clientWidth:document.documentElement.clientWidth})));
  await page.close();
}
const checks={casingVisible:results.every(v=>!['clip','hidden'].includes(v.overflow)),noHorizontalOverflow:results.every(v=>v.scrollWidth<=v.clientWidth)};
console.log(JSON.stringify({results,checks},null,2));await browser.close();if(Object.values(checks).some(v=>!v))process.exit(1);
