import {chromium} from 'playwright-core';
import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const phase=process.argv[2]||'before';
const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
const rows=[],errors=[];page.on('pageerror',e=>errors.push(e.message));
for(const gen of ['red','gold','ruby','diamond','black','x']){
  await page.goto(`http://127.0.0.1:4173/.scratch/sm-dex/prototypes/ticket-45-all-generations/?gen=${gen}&open=1&v=56`);
  await page.locator('.glass.main .screen-row').first().waitFor();await page.evaluate(()=>document.fonts.ready);
  await page.locator('#stage').screenshot({path:`.scratch/sm-dex/research/ticket-56-${gen}-${phase}.png`});
  rows.push(await page.evaluate(()=>{
    const rocker=document.querySelector('#rig [data-rocker]');
    let offset=null;
    if(rocker){const a=rocker.firstElementChild.getBBox(),b=rocker.previousElementSibling.getBBox();offset={x:a.x+a.width/2-b.x-b.width/2,y:a.y+a.height/2-b.y-b.height/2};}
    const beads=[...document.querySelectorAll('#rig radialGradient[id^="gold-"]')].map(g=>[...g.children].map(s=>s.getAttribute('stop-color')));
    return {gen:document.querySelector('#rig').dataset.device,offset,beads,rounds:document.querySelectorAll('#rig .hardware.round').length,ovals:document.querySelectorAll('#rig .hardware.pill').length};
  }));
  if(gen==='diamond'){
    rows.at(-1).closedFit=await page.evaluate(()=>{
      const lid=document.querySelector('#rig [data-part="diamond-open-shell"]'),body=document.querySelector('#rig [data-part="diamond-centre-shell"]');
      let mismatches=0;
      for(let x=285;x<722;x+=2)for(let y=389;y<690;y+=2)if(lid.isPointInFill(new DOMPoint(x,764-y))!==body.isPointInFill(new DOMPoint(x,y)))mismatches++;
      const d=lid.getAttribute('d'),segment=d.match(/H(\d+)C([\s\S]+?)H284V/);
      const curve=segment?.[2].match(/^(\d+(?:\.\d+)?) (\d+(?:\.\d+)?)[\s\S]* (\d+(?:\.\d+)?) (\d+(?:\.\d+)?)$/);
      const rocker=document.querySelector('#rig [data-rocker="diamond-dpad"]').firstElementChild.getBBox();
      const pad={x:rocker.x+rocker.width/2,y:rocker.y+rocker.height/2};
      const lobe=curve?{x:Number(curve[3]),y:764-(Number(curve[2])+Number(curve[4]))/2}:null;
      return {mismatches,pad,lobe,aligned:lobe&&Math.abs(lobe.x-pad.x)<.1&&Math.abs(lobe.y-pad.y)<.1};
    });
  }
  if(gen!=='red'){
    await page.goto(`http://127.0.0.1:4173/.scratch/sm-dex/prototypes/ticket-45-all-generations/?gen=${gen}&open=0&v=56.1`);
    await page.locator('#stage').screenshot({path:`.scratch/sm-dex/research/ticket-56-${gen}-closed-${phase}.png`});
    if(gen==='x')rows.at(-1).closedPokeball=await page.locator('[data-part=kalos-closed-pokeball]').isVisible();
  }
}
const redBytes=await readFile(`.scratch/sm-dex/research/ticket-56-red-${phase}.png`);
const report={rows,errors,redScreenshotHash:createHash('sha256').update(redBytes).digest('hex')};
if(phase==='after'){
  const before=JSON.parse(await readFile('.scratch/sm-dex/research/ticket-56-before.json','utf8'));
  report.redUnchanged=report.redScreenshotHash===before.redScreenshotHash;
  report.rubyUnchanged=createHash('sha256').update(await readFile('.scratch/sm-dex/research/ticket-56-ruby-before.png')).digest('hex')===createHash('sha256').update(await readFile('.scratch/sm-dex/research/ticket-56-ruby-after.png')).digest('hex');
}
await writeFile(`.scratch/sm-dex/research/ticket-56-${phase}.json`,JSON.stringify(report,null,2));
console.log(report);await browser.close();
const gold=rows.find(x=>x.gen==='gold'),diamond=rows.find(x=>x.gen==='diamond');
if(errors.length||rows.filter(x=>['gold','diamond'].includes(x.gen)).some(x=>Math.abs(x.offset?.y)>0.1)||gold.beads.some(b=>JSON.stringify(b)!==JSON.stringify(gold.beads[0]))||gold.rounds!==2||gold.ovals!==2||report.redUnchanged===false||report.rubyUnchanged===false||diamond.closedFit?.mismatches||diamond.closedFit?.aligned===false||!rows.find(x=>x.gen==='x').closedPokeball)process.exitCode=1;
