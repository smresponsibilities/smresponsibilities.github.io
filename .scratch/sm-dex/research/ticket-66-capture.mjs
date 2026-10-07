import { chromium } from 'playwright-core';
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:1280,height:900}});
await page.goto('http://127.0.0.1:4321/',{waitUntil:'load'});await page.waitForTimeout(1400);
for(const time of ['day','sunset','night']){
  await page.evaluate(value=>{document.documentElement.dataset.time=value;document.querySelector('.world-backdrop').dataset.time=value;},time);
  await page.screenshot({path:`.scratch/sm-dex/research/ticket-66-${time}.png`});
}
await page.locator('#rig .screen-row').first().evaluate(el=>el.dispatchEvent(new PointerEvent('pointerover',{bubbles:true})));
await page.screenshot({path:'.scratch/sm-dex/research/ticket-66-callout.png'});
await page.locator('#open-submission').click();
await page.locator('[name="status"]').selectOption('Released');
await page.locator('#submission-dialog').screenshot({path:'.scratch/sm-dex/research/ticket-66-form-released.png'});
await page.locator('[name="status"]').selectOption('Caught');
await page.locator('#submission-dialog').screenshot({path:'.scratch/sm-dex/research/ticket-66-form-caught.png'});
await browser.close();
