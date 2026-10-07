import {chromium} from 'playwright-core';
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:1280,height:1000},deviceScaleFactor:1});
await page.goto('http://127.0.0.1:4321/?gen=red',{waitUntil:'load'});await page.waitForSelector('#page-loader',{state:'hidden'});await page.screenshot({path:'.scratch/sm-dex/research/ticket-70-gen1.png',fullPage:false});
await page.goto('http://127.0.0.1:4321/?gen=x',{waitUntil:'load'});await page.waitForTimeout(300);await page.locator('.glass .screen-row').filter({hasText:'DEX'}).first().click();await page.screenshot({path:'.scratch/sm-dex/research/ticket-70-gen6.png',fullPage:false});
await browser.close();
