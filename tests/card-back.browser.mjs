import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync,statSync} from 'node:fs';
import path from 'node:path';
import {chromium} from 'playwright-core';
import ts from 'typescript';

const script=readFileSync('src/components/CardFinishes.astro','utf8').split('<script>')[1].split('</script>')[0];
const compiled=ts.transpileModule(script,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022}}).outputText;
const css=readFileSync('src/styles/card-finishes.css','utf8');
const built=path.resolve(process.env.TEST_DIST || 'dist');

test('production backs match independent-print lab identity on desktop and mobile',async()=>{
  const browser=await chromium.launch({channel:'msedge',headless:true});
  try {
    for(const width of [390,1440]){
      const page=await browser.newPage({viewport:{width,height:1000}});
      await page.emulateMedia({reducedMotion:'reduce'});
      await page.route('**/*',async route=>{
        const url=new URL(route.request().url());
        if(url.hostname!=='card.test')return route.abort();
        const name=url.pathname;
        if(name.includes('/_astro/CardFinishes.'))return route.fulfill({contentType:'text/javascript',body:compiled});
        let file=path.join(built,name);
        if(existsSync(file)&&statSync(file).isDirectory())file=path.join(file,'index.html');
        if(name.startsWith('/card-finishes/'))file=path.join(process.cwd(),'public',name);
        if(!existsSync(file))return route.fulfill({status:404,body:''});
        let body=readFileSync(file);
        const ext=path.extname(file);
        if(ext==='.html')body=body.toString().replace('</head>',`<style>${css}</style></head>`);
        const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.json':'application/json','.woff2':'font/woff2'};
        return route.fulfill({contentType:types[ext]||'application/octet-stream',body});
      });
      await page.goto('http://card.test/');
      await page.waitForSelector('#page-loader',{state:'detached'});
      const card=page.locator('.project-card').first();
      await card.evaluate(e=>e.scrollIntoView({block:'center',behavior:'instant'}));
      await page.waitForFunction(()=>document.querySelector('.project-card')?.dataset.cardAssets==='ready');
      await card.evaluate(e=>{e.classList.add('is-loading');e.style.transform='none';});
      const back=card.locator(':scope > .site-card-back');
      assert.equal(await back.locator('.card-back-top').innerText(),'SHIVAM MAHAJAN\nINDEPENDENT DEVELOPER');
      assert.match(await back.innerText(),/Ideas into\nworking things\./);
      assert.equal(await back.locator('img').getAttribute('src'),'/card-finishes/sm-mark.svg');
      assert.ok(await back.locator('img').evaluate(e=>e.complete&&e.naturalWidth>0));
      const fit=await back.evaluate(e=>({height:e.clientHeight,scroll:e.scrollHeight}));
      assert.ok(fit.scroll<=fit.height+2,JSON.stringify({width,...fit}));
      await card.screenshot({path:`.scratch/frontend-performance/lab-back-${width}-07.png`});
      await page.close();
    }
  }finally{await browser.close();}
});
