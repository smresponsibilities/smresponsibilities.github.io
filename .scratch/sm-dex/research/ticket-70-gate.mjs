import {chromium} from 'playwright-core';

const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:1280,height:900}});
await page.goto('http://127.0.0.1:4321/?gen=red',{waitUntil:'load'});
await page.waitForTimeout(900);

const header=await page.evaluate(()=>({
  dex:Boolean(document.querySelector('.dex-button')),
  resumeTag:document.querySelector('[data-resume]')?.tagName,
  resumeHref:document.querySelector('[data-resume]')?.getAttribute('href')
}));
const slider=await page.locator('.opening').evaluate(el=>({marginTop:parseFloat(getComputedStyle(el).marginTop),bottom:el.getBoundingClientRect().bottom,viewport:innerHeight}));

const nativeDex=[];
for(const id of ['red','gold','ruby','diamond','black-white','x','sun-moon','sword-shield','scarlet-violet']){
  await page.goto(`http://127.0.0.1:4321/?gen=${id}`,{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>document.querySelector('.glass .screen-row'));
  await page.evaluate(()=>[...document.querySelectorAll('.glass .screen-row')].find(el=>el.textContent.includes('DEX'))?.click());
  await page.evaluate(()=>document.querySelector('.glass .screen-row')?.click());
  nativeDex.push(await page.evaluate(id=>({id,path:location.pathname,text:[...document.querySelectorAll('.glass')].map(el=>el.innerText).join(' ')}),id));
}

const power={};
for(const id of ['x','sword-shield','scarlet-violet']){
  await page.goto(`http://127.0.0.1:4321/?gen=${id}`,{waitUntil:'load'});
  await page.waitForTimeout(250);
  power[id]=await page.evaluate(()=>({hidden:document.querySelector('#power')?.hidden,powered:!document.querySelector('.glass')?.classList.contains('off'),physical:[...document.querySelectorAll('#rig [data-action="power"]')].every(el=>getComputedStyle(el).display==='none')}));
}

await page.goto('http://127.0.0.1:4321/?gen=x',{waitUntil:'load'});
await page.waitForTimeout(250);
const row=page.locator('.glass .screen-row').nth(1);
const contrast=await row.evaluate(el=>{
  const parse=s=>s.match(/[\d.]+/g).slice(0,3).map(Number);
  const lum=rgb=>{const c=rgb.map(v=>v/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return .2126*c[0]+.7152*c[1]+.0722*c[2]};
  const fg=lum(parse(getComputedStyle(el).color)),bg=lum(parse(getComputedStyle(el).backgroundColor));
  return (Math.max(fg,bg)+.05)/(Math.min(fg,bg)+.05);
});

const dexResponse=await page.goto('http://127.0.0.1:4321/dex/',{waitUntil:'load'});
const checks={
  'header dex removed':!header.dex,
  'resume linked':header.resumeTag==='A'&&header.resumeHref==='/resume.pdf',
  'gen I slider clearance':slider.marginTop>=36,
  'native dex detail':nativeDex.every(v=>v.path==='/'&&/OWNER ENTRY|SHIVAM/i.test(v.text)),
  'modern generations always powered':Object.values(power).every(v=>v.hidden&&v.powered&&v.physical),
  'gen VI unselected contrast':contrast>=4.5,
  'standalone dex removed':dexResponse.status()===404
};
console.log(JSON.stringify({header,slider,nativeDex,power,contrast,dexStatus:dexResponse.status(),checks},null,2));
await browser.close();
if(Object.values(checks).some(v=>!v))process.exit(1);
