import { chromium } from 'playwright-core';
const browser = await chromium.launch({headless:true});
try {
 const page = await browser.newPage({viewport:{width:1280,height:1100}});
 await page.goto('https://github.com/smresponsibilities',{waitUntil:'domcontentloaded'});
 const preview=page.locator('img[alt^="SM\'S DEX:"]');
 await preview.waitFor();
 await preview.evaluate(i=>i.decode());
 console.log(await preview.evaluate(i=>({src:i.currentSrc,width:i.naturalWidth,height:i.naturalHeight,href:i.closest('a').href})));
 const first=await preview.screenshot();
 await page.waitForTimeout(3200);
 console.log('GitHub animation advances:',!first.equals(await preview.screenshot()));
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.waitForTimeout(1000);
 await preview.evaluate(i=>i.decode());
 console.log('Reduced-motion source:',await preview.evaluate(i=>i.currentSrc));
 const still=await preview.screenshot();
 await page.waitForTimeout(3200);
 console.log('GitHub reduced motion stable:',still.equals(await preview.screenshot()));
 await page.screenshot({path:'.scratch/sm-dex/github-preview/live-profile.png'});
} finally {await browser.close();}
