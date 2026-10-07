import {chromium} from 'playwright-core';
import {writeFile,readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'no-preference'});
const errors=[],report={};page.on('pageerror',e=>errors.push(e.message));
const base='http://127.0.0.1:4173/.scratch/sm-dex/prototypes/ticket-45-all-generations/';
await page.goto(base+'?gen=sun-moon&open=0&v=57.1');await page.evaluate(()=>document.fonts.ready);
await page.locator('#stage').screenshot({path:'.scratch/sm-dex/research/ticket-57-rotom-closed.png'});
// Sample the actual animation, including the front/rear handoff.
await page.evaluate(()=>{window.motionSamples=[];const started=performance.now();function sample(){const rig=document.querySelector('#rig'),p=Number(document.querySelector('#stage').dataset.progress);motionSamples.push({elapsed:performance.now()-started,p,shift:parseFloat(rig.style.getPropertyValue('--rotom-left-arm-shift')),frontAvailable:!document.querySelector('.glass').inert});if(performance.now()-started<1600)requestAnimationFrame(sample);}requestAnimationFrame(sample);});
await page.locator('#toggle').click();
await page.waitForFunction(()=>Number(document.querySelector('#stage').dataset.progress)>.2);
await page.locator('#stage').screenshot({path:'.scratch/sm-dex/research/ticket-57-rotom-opening.png'});
await page.waitForFunction(()=>document.querySelector('#stage').dataset.progress==='1');
report.samples=await page.evaluate(()=>motionSamples);
assert(report.samples.some(s=>s.p>.1&&s.p<.5));
assert(report.samples.filter(s=>s.p<1).every(s=>!s.frontAvailable));
assert(report.samples.filter(s=>s.p>=.5).every(s=>s.shift===0));
await page.locator('#stage').screenshot({path:'.scratch/sm-dex/research/ticket-57-rotom-awake.png'});
for(const [id,emotion] of [['rotom-react','happy'],['rotom-curious','curious'],['rotom-surprised','surprised']]){
  await page.locator('#'+id).click();assert.equal(await page.locator('#rig').getAttribute('data-emotion'),emotion);
  await page.waitForTimeout(250);
  await page.locator('#stage').screenshot({path:`.scratch/sm-dex/research/ticket-57-rotom-${emotion}.png`});
}
await page.locator('#pause-motion').click();
assert.equal(await page.locator('#rig').getAttribute('data-emotion'),null);
assert(await page.locator('#rotom-react').isDisabled());
const paused=await page.locator('#rig').evaluate(el=>el.getAnimations({subtree:true}).filter(a=>a.playState==='running').length);
assert.equal(paused,0);report.pauseStopsAnimations=true;
await page.locator('#pause-motion').click();
await page.locator('#device-effect').click();await page.waitForTimeout(550);
assert(await page.locator('.glass').evaluate(n=>n.inert));
await page.locator('#device-effect').click();await page.waitForTimeout(550);
assert.equal(await page.locator('.glass').evaluate(n=>n.inert),false);
await page.locator('#rotom-react').click();
await page.locator('#device-effect').click();
assert.equal(await page.locator('#rig').getAttribute('data-emotion'),null);
await page.waitForTimeout(550);
await page.locator('#device-effect').click();await page.waitForTimeout(550);
await page.locator('#toggle').click();
await page.waitForFunction(()=>document.querySelector('#stage').dataset.progress==='0');
assert(await page.locator('.glass').evaluate(n=>n.inert));
report.normalCloseLocksScreen=true;
await page.locator('#toggle').click();
await page.waitForFunction(()=>document.querySelector('#stage').dataset.progress==='1');
await page.emulateMedia({reducedMotion:'reduce'});
await page.locator('#toggle').click();await page.locator('#toggle').click();
assert.equal(await page.locator('#stage').getAttribute('data-progress'),'1');
assert.equal(await page.locator('#rig').evaluate(el=>el.getAnimations({subtree:true}).filter(a=>a.playState==='running').length),0);report.reducedMotionStatic=true;
for(const gen of ['red','ruby']){
  await page.goto(base+`?gen=${gen}&open=1&v=57.1`);await page.evaluate(()=>document.fonts.ready);
  const bytes=await page.locator('#stage').screenshot({path:`.scratch/sm-dex/research/ticket-57-${gen}.png`});
  const old=await readFile(`.scratch/sm-dex/research/ticket-56-${gen}-before.png`);
  assert.equal(createHash('sha256').update(bytes).digest('hex'),createHash('sha256').update(old).digest('hex'));report[gen+'Unchanged']=true;
}
await page.goto(base+'?gen=black&open=0&v=57.1');await page.locator('#stage').screenshot({path:'.scratch/sm-dex/research/ticket-57-black-closed.png'});
for(const width of [390,320]){
  await page.setViewportSize({width,height:900});await page.goto(base+'?gen=sun-moon&open=1&v=57.1');
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await page.screenshot({path:`.scratch/sm-dex/research/ticket-57-rotom-${width}.png`,fullPage:true});
}
assert.deepEqual(errors,[]);report.errors=errors;
await writeFile('.scratch/sm-dex/research/ticket-57-motion.json',JSON.stringify(report,null,2));
console.log({...report,samples:report.samples.length});await browser.close();
