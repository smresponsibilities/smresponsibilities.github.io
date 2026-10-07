import { chromium } from 'playwright-core';
import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';

const browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
const errors = [], results = [];
page.on('pageerror', e => errors.push(e.message));
const base = 'http://127.0.0.1:4173/.scratch/sm-dex/prototypes/ticket-45-all-generations/';
const ids = ['red','gold','ruby','diamond','heartgold','black','x','sun-moon','sword-shield','scarlet-violet'];
const open = async gen => {
  await page.goto(`${base}?gen=${gen}&open=1&v=56.0`);
  await page.evaluate(() => document.fonts.ready);
  await page.locator('.glass.main .screen-row').first().waitFor();
};
const fit = async () => page.evaluate(() => {
  const escape = (child, parent) => child.left < parent.left-.5 || child.right > parent.right+.5 || child.top < parent.top-.5 || child.bottom > parent.bottom+.5;
  const screens=[...document.querySelectorAll('.glass')];
  return {
    horizontal: document.documentElement.scrollWidth > innerWidth,
    clipped: screens.some(s=>s.scrollWidth>s.clientWidth || s.scrollHeight>s.clientHeight),
    contentWide: screens.some(s=>{const c=s.querySelector('.screen-content');return c.scrollWidth>c.clientWidth;}),
    menuOverflow: screens.filter(s=>s.classList.contains('main')).some(s=>{const c=s.querySelector('.screen-content');return !!c.querySelector('.screen-rows') && c.scrollHeight>c.clientHeight;}),
    footerEscape: screens.some(s=>{const f=s.querySelector('.screen-nav');return f && escape(f.getBoundingClientRect(),s.getBoundingClientRect());}),
  };
});

// Compare actual original flat CSS, including cap height, instead of trusting the old approval assertion.
const original = await browser.newPage({viewport:{width:1440,height:1000}});
await original.goto('http://127.0.0.1:4173/.scratch/sm-dex/prototypes/ticket-35-flat-threejs/?variant=flat');
const caps=await original.locator('.cap-art').evaluateAll(nodes=>nodes.map(n=>{
  const s=getComputedStyle(n);return {left:n.style.left,top:n.style.top,width:s.width,height:s.height,background:s.backgroundColor,shadow:s.boxShadow,radius:s.borderRadius};
}));
await open('red');
const restored=await page.locator('.hardware:not(.direction)').evaluateAll(nodes=>nodes.map(n=>{
  const s=getComputedStyle(n.querySelector('.cap'));return {left:n.style.left,top:n.style.top,width:s.width,height:s.height,background:s.backgroundColor,shadow:s.boxShadow,radius:s.borderRadius};
}));
assert.deepEqual(restored,caps,'Gen I cap appearance and geometry differ from ticket 35');
await original.close();

for(const gen of ids){
  await open(gen);
  let checks=await fit();
  assert(!Object.values(checks).some(Boolean),`${gen} desktop menu: ${JSON.stringify(checks)}`);
  // Every hardware target activates exactly once, with no neighboring action.
  const controls=await page.locator('.hardware').evaluateAll(nodes=>nodes.map(n=>({id:n.dataset.control,action:n.dataset.action})));
  for(const c of controls){
    if(await page.locator('#power').textContent()==='Power on')await page.locator('#power').click();
    const count=Number(await page.locator('#stage').getAttribute('data-actions'));
    await page.locator(`[data-control="${c.id}"]`).click();
    assert.equal(Number(await page.locator('#stage').getAttribute('data-actions')),count+1,`${gen}/${c.id} activation`);
    assert.equal(await page.locator('#stage').getAttribute('data-last-action'),c.id);
  }
  if(await page.locator('#power').textContent()==='Power on')await page.locator('#power').click();
  // A press dragged out of its own target cancels.
  if(controls.length){
    const target=page.locator(`[data-control="${controls[0].id}"]`);
    await target.scrollIntoViewIfNeeded();
    const r=await target.boundingBox(),count=Number(await page.locator('#stage').getAttribute('data-actions'));
    await page.mouse.move(r.x+r.width/2,r.y+r.height/2);await page.mouse.down();
    await page.mouse.move(r.x+r.width+30,r.y+r.height+30);await page.mouse.up();
    assert.equal(Number(await page.locator('#stage').getAttribute('data-actions')),count,`${gen} drag cancellation`);
  }
  await open(gen);
  await page.locator('.glass.main [data-row="1"]').click();
  await page.locator('.glass.main [data-row="0"]').click();
  checks=await fit();
  assert(!checks.horizontal&&!checks.clipped&&!checks.contentWide&&!checks.footerEscape,`${gen} detail: ${JSON.stringify(checks)}`);
  if(['red','gold','ruby','diamond'].includes(gen))await page.locator('#stage').screenshot({path:`.scratch/sm-dex/research/ticket-56-${gen}-detail.png`});
  const detail=await page.locator('.glass.main h2').textContent();
  await page.locator('#toggle').click();
  assert.equal(await page.locator('.hardware:enabled').count(),0,`${gen} closed controls`);
  assert.equal(await page.locator('.glass:not([inert])').count(),0,`${gen} closed screens`);
  if(['gold','diamond'].includes(gen))await page.locator('#stage').screenshot({path:`.scratch/sm-dex/research/ticket-56-${gen}-closed.png`});
  await page.locator('#toggle').click();
  assert.equal(await page.locator('.glass.main h2').textContent(),detail,`${gen} resume entry`);
  for(const width of [768,390,320]){
    await page.setViewportSize({width,height:900});
    await open(gen);
    checks=await fit();
    assert(!Object.values(checks).some(Boolean),`${gen} ${width}px menu: ${JSON.stringify(checks)}`);
    if(width<700){
      assert(await page.locator('#reader').isVisible(),`${gen} mobile readable view`);
      assert(await page.locator('#reader-controls button').evaluateAll(nodes=>nodes.every(n=>n.getBoundingClientRect().height>=44)),`${gen} mobile targets`);
      if(width===390&&['gold','diamond'].includes(gen))await page.screenshot({path:`.scratch/sm-dex/research/ticket-56-${gen}-mobile.png`,fullPage:true});
    }
  }
  await page.setViewportSize({width:1440,height:1000});
  results.push({gen,controls:controls.length,viewports:[1440,768,390,320],passed:true});
}
assert.deepEqual(errors,[]);
await writeFile('.scratch/sm-dex/research/ticket-56-interactions.json',JSON.stringify({originalCapsMatch:true,results,errors},null,2));
console.log(JSON.stringify({originalCapsMatch:true,results,errors},null,2));
await browser.close();

