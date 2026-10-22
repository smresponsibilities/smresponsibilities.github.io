import {chromium} from 'playwright-core';
import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000}}),results=[],errors=[];
page.on('pageerror',e=>errors.push(e.message));
for(const gen of ['red','gold','ruby','diamond','black']){
  await page.goto(`http://127.0.0.1:4173/.scratch/sm-dex/prototypes/ticket-45-all-generations/?gen=${gen}&open=1&v=55.1`);
  await page.evaluate(()=>document.fonts.ready);
  const result=await page.evaluate(async gen=>{
    const {sections}=await import('../ticket-45-all-generations/content.js');
    const main=document.querySelector('.glass.main'),issues=[];
    let entries=0;
    for(let s=0;s<sections.length;s++){
      for(let i=0;i<sections[s].items.length;i++){
        // Dispatch native DOM clicks through the same delegated handler as a tap.
        main.querySelector('[data-action=menu]')?.click();
        main.querySelector(`[data-row="${s}"]`).click();
        main.querySelector(`[data-row="${i}"]`).click();
        for(let p=0;p<2;p++){
          for(const glass of document.querySelectorAll('.glass')){
            const pane=glass.querySelector('.screen-content');
            if(pane.scrollWidth>pane.clientWidth)issues.push(`${s}/${i}/${p} horizontal text overflow`);
            const footer=glass.querySelector('.screen-nav');
            if(footer&&footer.getBoundingClientRect().bottom>glass.getBoundingClientRect().bottom+.5)issues.push(`${s}/${i}/${p} footer outside screen`);
          }
          main.querySelector('[data-action=right]').click();
        }
        entries++;
        main.querySelector('[data-action=back]').click();
        main.querySelector('[data-action=back]').click();
      }
    }
    // Gold and Diamond's SVG frame and DOM glass must share coordinates.
    if(['gold','diamond'].includes(gen)){
      for(const glass of document.querySelectorAll('.glass')){
        const x=parseFloat(glass.style.left),y=parseFloat(glass.style.top),w=parseFloat(glass.style.width);
        const frame=[...glass.parentElement.querySelectorAll('svg rect')].find(r=>Number(r.getAttribute('x'))===x-14&&Number(r.getAttribute('y'))===y-14);
        if(!frame){issues.push('Missing matching bezel');continue;}
        const a=glass.getBoundingClientRect(),b=frame.getBoundingClientRect(),scale=a.width/w;
        for(const gap of [a.left-b.left,a.top-b.top,b.right-a.right,b.bottom-a.bottom])if(Math.abs(gap/scale-14)>.1)issues.push('Screen does not align with bezel');
      }
    }
    return {gen,entries,pages:entries*2,issues};
  },gen);
  assert.deepEqual(result.issues,[]);
  const lens=gen==='gold'?await page.locator('[data-layer=body] circle[fill="url(#gold-body-blue)"]').evaluate(n=>{const r=n.getBoundingClientRect();return {x:r.x+scrollX,y:r.y+scrollY,width:r.width,height:r.height};}):null;
  // Exercise real animated close/open; reduced endpoints are covered separately.
  await page.locator('#toggle').click();
  await page.waitForFunction(()=>document.querySelector('#stage').dataset.progress==='0');
  if(lens)assert.deepEqual(await page.locator('[data-layer=body] circle[fill="url(#gold-body-blue)"]').evaluate(n=>{const r=n.getBoundingClientRect();return {x:r.x+scrollX,y:r.y+scrollY,width:r.width,height:r.height};}),lens);
  await page.locator('#toggle').click();
  await page.waitForFunction(()=>document.querySelector('#stage').dataset.progress==='1');
  assert.equal(await page.locator('.glass[inert]').count(),0);
  results.push(result);
}
assert.deepEqual(errors,[]);
await writeFile('.scratch/sm-dex/research/ticket-55-layout.json',JSON.stringify({results,errors},null,2));
console.log(JSON.stringify({results,errors},null,2));
await browser.close();
