import {readFile} from 'node:fs/promises';
import {chromium} from 'playwright-core';
const browser=await chromium.launch({channel:'chrome',headless:true});const page=await browser.newPage({viewport:{width:933,height:607}});await page.goto('http://127.0.0.1:4321/?gen=red',{waitUntil:'load'});await page.waitForSelector('#page-loader',{state:'hidden'});
const ui=await page.evaluate(()=>({gap:parseFloat(getComputedStyle(document.querySelector('.opening')).marginTop),icons:[...document.querySelectorAll('link[rel~="icon"]')].map(x=>x.getAttribute('href'))}));
const svg=await readFile('public/favicon.svg','utf8'),ico=await readFile('public/favicon.ico'),resume=await readFile('public/resume.pdf');
const checks={clearance:ui.gap>=48,svgSM:svg.includes('aria-label="SM"'),icoUpdated:ico.length>1000,resume:resume.length>10000,headUsesSM:ui.icons.some(x=>x.includes('favicon-sm-complete.svg'))&&ui.icons.some(x=>x.includes('favicon.ico'))};
console.log(JSON.stringify({ui,sizes:{ico:ico.length,resume:resume.length},checks},null,2));await browser.close();if(Object.values(checks).some(v=>!v))process.exit(1);
