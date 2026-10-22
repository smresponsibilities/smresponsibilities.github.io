import {chromium} from 'playwright-core';
import fs from 'node:fs';
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:1280,height:900}});
await page.goto('http://127.0.0.1:4321/',{waitUntil:'domcontentloaded'});
const loader=await page.evaluate(()=>({
  factLink:document.querySelector('.loader-extra-fact a')?.getAttribute('href')??'',
  factText:document.querySelector('.loader-extra-fact')?.textContent??'',
}));
await page.waitForLoadState('load');await page.waitForTimeout(1400);
const shell=await page.evaluate(()=>({
  favicon:document.querySelector('link[rel=icon]')?.getAttribute('href')??'',
  statusColor:getComputedStyle(document.querySelector('#status')).color,
  openerGap:parseFloat(getComputedStyle(document.querySelector('.opening-tools')).gap),
  arrow:!!document.querySelector('.callout-arrow')
}));
const screens=[];
for(const id of ['gold','ruby','diamond','sun-moon']){
  await page.locator(`#generations [data-gen="${id}"]`).evaluate(el=>el.click());await page.waitForTimeout(80);
  if(await page.locator('#slide-handle').getAttribute('aria-expanded')==='false'){await page.locator('#toggle').click();await page.waitForTimeout(id==='sun-moon'?1150:400);}
  screens.push(await page.locator('#rig').evaluate((rig,id)=>{
    const visible=[...rig.querySelectorAll('.glass')].filter(el=>{const s=getComputedStyle(el),r=el.getBoundingClientRect();return s.visibility!=='hidden'&&s.display!=='none'&&r.width>0&&r.height>0});
    return {id,count:visible.length,text:visible.map(el=>el.innerText.trim()).filter(Boolean).length,opaque:visible.every(el=>getComputedStyle(el).backgroundColor!=='rgba(0, 0, 0, 0)')};
  },id));
}
const favicon=fs.readFileSync('public/favicon-sm.svg','utf8');
const checks={
  'linked fact owner':loader.factLink==='https://github.com/smresponsibilities'&&loader.factText.includes('@smresponsibilities'),
  'complete favicon':shell.favicon.includes('favicon-sm.svg')&&favicon.includes('aria-label="SM"')&&favicon.length>350,
  'white status':shell.statusColor==='rgb(255, 255, 255)',
  'opener spacing':shell.openerGap>=10,
  'screens populated':screens.every(s=>s.count>0&&s.text===s.count),
  'screens opaque':screens.every(s=>s.opaque),
  'arrow removed':!shell.arrow
};
console.log(JSON.stringify({loader,shell,screens,checks},null,2));await browser.close();if(Object.values(checks).some(v=>!v))process.exit(1);
