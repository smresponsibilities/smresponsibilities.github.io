import {chromium} from 'playwright-core';
import {writeFile} from 'node:fs/promises';
const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
const page=await browser.newPage({viewport:{width:1400,height:1000}});
const errors=[];page.on('pageerror',error=>errors.push(error.message));
await page.goto('http://127.0.0.1:4173/.scratch/sm-dex/research/ticket-55-refs/');
await page.waitForFunction(expected=>document.querySelectorAll('article').length===expected,Number(process.argv[2]??60));
await page.locator('img').evaluateAll(async imgs=>{for(const i of imgs){i.loading='eager';await i.decode().catch(()=>{});}});
const report=await page.locator('img').evaluateAll(imgs=>({count:imgs.length,broken:imgs.filter(i=>!i.naturalWidth).map(i=>i.src)}));
report.layouts=[];
for(const width of [1400,768,390,320]){
  await page.setViewportSize({width,height:1000});
  report.layouts.push(await page.evaluate(()=>({width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth})));
}
report.errors=errors;
await writeFile(new URL('gallery-verification.json',import.meta.url),JSON.stringify(report,null,2));
console.log(report);
if(report.broken.length||errors.length||report.layouts.some(x=>x.overflow))process.exitCode=1;
await page.setViewportSize({width:1400,height:1000});
// Compact inspection-only layout, preserving the actual source media pixels.
await page.addStyleTag({content:'.copy{display:none}.grid{grid-template-columns:repeat(4,minmax(0,1fr))}.image{height:190px}h2{margin:10px 0}'});
for(const gen of ['gen2','gen4','gen5'])if(await page.locator('#'+gen).count())await page.locator('#'+gen).screenshot({path:`.scratch/sm-dex/research/ticket-55-refs/${gen}-overview.png`});
await browser.close();
