import {chromium} from 'playwright-core';
import {writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'no-preference'});
const results=[];
for(const gen of ['red','gold','ruby','diamond']){
  await page.goto(`http://127.0.0.1:4173/.scratch/sm-dex/prototypes/ticket-45-all-generations/?gen=${gen}&open=1&v=56`);
  await page.evaluate(()=>document.fonts.ready);
  const target=page.locator('#rig .hardware.direction').first(),rocker=page.locator('#rig [data-rocker]');
  await target.focus();
  const before=await rocker.boundingBox();
  const count=Number(await page.locator('#stage').getAttribute('data-actions'));
  await page.keyboard.down('Space');
  await page.waitForFunction(()=>new DOMMatrix(getComputedStyle(document.querySelector('#rig [data-rocker]')).transform).f>3.9,null,{timeout:5000});
  const held=await rocker.boundingBox();
  assert(Math.abs(held.y-before.y-4)<.1,`${gen}: held rocker travel ${held.y-before.y}px, expected 4px`);
  assert(Math.abs(held.x-before.x)<.1,`${gen}: held rocker drifts sideways`);
  await page.locator('#stage').screenshot({path:`.scratch/sm-dex/research/ticket-56-${gen}-held.png`});
  await page.keyboard.up('Space');
  await page.waitForFunction(()=>Math.abs(new DOMMatrix(getComputedStyle(document.querySelector('#rig [data-rocker]')).transform).f)<.01,null,{timeout:5000});
  const released=await rocker.boundingBox();
  assert(Object.keys(before).every(key=>Math.abs(released[key]-before[key])<.02),`${gen}: released rocker did not return`);
  assert.equal(Number(await page.locator('#stage').getAttribute('data-actions')),count+1);
  results.push({gen,travel:held.y-before.y,restored:true});
}
await writeFile('.scratch/sm-dex/research/ticket-56-pressed.json',JSON.stringify(results,null,2));
console.log(results);await browser.close();
