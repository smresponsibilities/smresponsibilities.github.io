import {chromium} from 'playwright-core';
const b=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
const p=await b.newPage({viewport:{width:768,height:900},reducedMotion:'reduce'});
await p.goto('http://127.0.0.1:4173/.scratch/sm-dex/prototypes/ticket-45-all-generations/?gen=gold&open=1');
console.log(await p.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,rig:document.querySelector('#rig').getBoundingClientRect().toJSON(),bad:[...document.querySelectorAll('body *')].filter(n=>n.getBoundingClientRect().right>innerWidth+1).slice(0,15).map(n=>({tag:n.tagName,cls:n.className?.baseVal??n.className,id:n.id,right:n.getBoundingClientRect().right}))})));
await p.screenshot({path:'.scratch/sm-dex/research/ticket-55-tablet-probe.png',fullPage:true});
await b.close();
