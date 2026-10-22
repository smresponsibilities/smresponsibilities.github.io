import {chromium} from 'playwright-core';
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:1280,height:900}});
await page.goto('http://127.0.0.1:4321/',{waitUntil:'load'});await page.waitForTimeout(1400);
const states=[];
for(const id of ['red','gold','ruby','diamond','sun-moon']){await page.locator(`#generations [data-gen="${id}"]`).evaluate(el=>el.click());await page.waitForTimeout(100);states.push(await page.evaluate(id=>({id,open:document.querySelector('#slide-handle')?.getAttribute('aria-expanded'),text:[...document.querySelectorAll('#rig .glass')].some(el=>el.textContent.trim().length>20),transparent:[...document.querySelectorAll('#rig .glass')].some(el=>getComputedStyle(el).backgroundColor==='rgba(0, 0, 0, 0)')}),id));}
await page.locator('#open-submission').click();
const form=await page.evaluate(()=>{const status=document.querySelector('[name=status]'),company=document.querySelector('[name=company]');return {statusOverflow:status.scrollWidth-status.clientWidth,companyWidth:company.getBoundingClientRect().width,formWidth:document.querySelector('#submission-form').getBoundingClientRect().width};});
const favicon=await page.locator('link[rel=icon]').getAttribute('href');
const dex=await page.request.get('http://127.0.0.1:4321/dex');
const entry=await page.request.get('http://127.0.0.1:4321/dex/smresponsibilities');
const checks={'all start open':states.every(s=>s.open==='true'),'all screens populated':states.every(s=>s.text&&!s.transparent),'fresh favicon':favicon?.includes('favicon-sm-complete.svg'),'status fits':form.statusOverflow<=1&&form.companyWidth>=form.formWidth*.45,'dex route':dex.ok()&&(await dex.text()).includes('REGISTERED'),'entry route':entry.ok()&&(await entry.text()).includes('smresponsibilities')};
console.log(JSON.stringify({states,form,favicon,checks},null,2));await browser.close();if(Object.values(checks).some(v=>!v))process.exit(1);
