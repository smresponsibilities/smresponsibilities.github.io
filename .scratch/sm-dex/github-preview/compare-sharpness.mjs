import {chromium} from 'playwright-core';
import {readFile} from 'node:fs/promises';
const b=await chromium.launch({headless:true});
try{const p=await b.newPage({viewport:{width:1000,height:580},deviceScaleFactor:1});
const paths=['.scratch/sm-dex/github-profile-publish/dex-preview.png','docs/github-profile/dex-preview.png'];
const imgs=await Promise.all(paths.map(async f=>(await readFile(f)).toString('base64')));
await p.setContent(`<style>body{margin:0;display:flex;background:#0d1117;color:white;font:20px sans-serif}section{width:500px;overflow:hidden}div{position:relative;height:540px;overflow:hidden}img{position:absolute;width:1920px;left:-360px;top:-530px}</style>${imgs.map((src,i)=>`<section>${i?'3× capture':'Previous 1× capture'}<div><img src="data:image/png;base64,${src}"></div></section>`).join('')}`);
await p.locator('img').evaluateAll(imgs=>Promise.all(imgs.map(i=>i.decode())));
await p.screenshot({path:'.scratch/sm-dex/github-preview/sharpness-comparison.png'});
}finally{await b.close()}
