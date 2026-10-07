import {chromium} from 'playwright-core';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
const base='http://127.0.0.1:4173/.scratch/sm-dex/prototypes/ticket-45-all-generations/';
for(const [gen,open] of [['sun-moon',1],['ruby',1],['ruby',0],['black',0],['scarlet-violet',0],['red',1]]){
 await page.goto(base+`?gen=${gen}&open=${open}&v=58.0`);await page.evaluate(()=>document.fonts.ready);
 if(gen==='sun-moon')assert.equal(await page.locator('[data-part="rotom-mouth"]').count(),0);
 const shot=await page.locator('#stage').screenshot({path:`.scratch/sm-dex/research/ticket-58-${gen}-${open}.png`});
 if(gen==='red')assert(shot.equals(await readFile('.scratch/sm-dex/research/ticket-57-red.png')));
}
await page.goto(base+'?gen=ruby&open=1&v=58.0');
const button=page.locator('[data-control="centre-green"]');
const bounds=await button.boundingBox(),screen=await page.locator('.glass').boundingBox();
assert(bounds.x+bounds.width<screen.x);
await button.click();
assert((await page.locator('.glass.main').innerText()).includes('SHIVAM'));
await page.setViewportSize({width:320,height:900});
await page.goto(base+'?gen=black&open=1&v=58.0');
assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
await page.locator('[data-control="centre-round"]').click();
assert((await page.locator('.glass.main').innerText()).includes('SHIVAM'));
assert.deepEqual(errors,[]);console.log('Visual captures ready; Gen I unchanged; no browser errors.');await browser.close();
