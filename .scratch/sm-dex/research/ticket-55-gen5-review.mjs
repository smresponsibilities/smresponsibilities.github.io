import {chromium} from 'playwright-core';
const b=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true});
const p=await b.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
await p.goto('http://127.0.0.1:4173/.scratch/sm-dex/prototypes/ticket-45-all-generations/?gen=black&open=1');
await p.evaluate(()=>document.fonts.ready);
await p.locator('#stage').screenshot({path:'.scratch/sm-dex/research/ticket-55-black-after.png'});
await b.close();
