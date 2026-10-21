const {chromium}=require('playwright-core');
const assert=require('node:assert/strict');
(async()=>{
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:1280,height:960}});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
for(const path of ['/resume/','/blog/archive/','/blog/archive/801-900/']){
await page.goto((process.env.PREVIEW_URL || 'http://127.0.0.1:8767')+path);assert(await page.locator('.site-card').count()>0);
assert.equal(await page.locator('.site-card:not([data-card-mode=static])').count(),0,path);
assert.equal(await page.locator('.site-card[data-finish]').count(),0);
assert.equal(await page.locator('.site-card-foil').first().evaluate(e=>getComputedStyle(e).display),'none');
}
for(const path of ['/projects/','/blog/','/blog/day-801/']){
await page.goto((process.env.PREVIEW_URL || 'http://127.0.0.1:8767')+path);
const engraved=page.locator('.site-card[data-card-mode=interactive]').first();assert(await engraved.count()>0,path);
assert.equal(await engraved.getAttribute('data-finish'),null);
assert.equal(await engraved.locator('.site-card-foil').evaluate(e=>getComputedStyle(e).display),'none');
await engraved.hover();await page.waitForTimeout(450);assert.equal(await engraved.locator('.site-card-glare').evaluate(e=>getComputedStyle(e).opacity),'0.15');
}
await page.goto((process.env.PREVIEW_URL || 'http://127.0.0.1:8767')+'/');assert.equal(await page.locator('.experience-card').getAttribute('data-card-mode'),'static');
assert.equal(await page.locator('nav.site-card, form.site-card, .timeline-item.site-card').count(),0);
const card=page.locator('.project-card').first();assert.equal(await card.getAttribute('data-card-mode'),'holo');
await card.locator('.site-card-inspect').click();const dialog=page.locator('.card-inspection');assert(await dialog.isVisible());
assert.equal(await dialog.locator('.site-card').count(),1);assert.equal(await dialog.locator('.site-card').getAttribute('data-finish'),await card.getAttribute('data-finish'));
await page.keyboard.press('Escape');assert(!(await dialog.isVisible()));
await card.locator('.site-card-inspect').focus();await page.keyboard.press('Enter');assert(await dialog.isVisible());await dialog.locator('.card-inspection-close').click();
assert.equal(await page.locator(':focus').getAttribute('class'),'site-card-inspect');
await page.setViewportSize({width:390,height:844});await card.locator('.site-card-inspect').click();
assert(await dialog.evaluate(e=>e.scrollWidth<=e.clientWidth));await page.keyboard.press('Escape');
await page.goto((process.env.PREVIEW_URL || 'http://127.0.0.1:8767')+'/blog/timeline/');const chapter=page.locator('.chapter-card').first();await chapter.scrollIntoViewIfNeeded();await page.mouse.move(0,0);
const first=await chapter.evaluate(e=>e.style.getPropertyValue('--background-x'));await page.waitForTimeout(400);assert.notEqual(await chapter.evaluate(e=>e.style.getPropertyValue('--background-x')),first);
await page.emulateMedia({reducedMotion:'reduce'});const stopped=await chapter.evaluate(e=>e.style.getPropertyValue('--background-x'));await page.waitForTimeout(400);assert.equal(await chapter.evaluate(e=>e.style.getPropertyValue('--background-x')),stopped);
assert.equal(await chapter.evaluate(e=>getComputedStyle(e).transform),'none');assert.deepEqual(errors,[]);await browser.close();console.log('Four treatments, inspection, keyboard, mobile, reduced motion pass');
})().catch(e=>{console.error(e);process.exit(1)});
