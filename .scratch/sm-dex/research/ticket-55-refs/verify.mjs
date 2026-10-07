import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {resolve,sep} from 'node:path';
const root=fileURLToPath(new URL('.',import.meta.url));
const existing=JSON.parse(await readFile(new URL('../restart/catalogue.json',import.meta.url),'utf8'));
const knownHashes=new Set(existing.items.map(x=>x.sha1).filter(Boolean));
const knownImages=new Set(existing.items.map(x=>decodeURIComponent(x.image)));
const hashes=new Set(),results=[],failures=[];
for(const gen of ['gen2','gen4','gen5']){
  const data=JSON.parse(await readFile(new URL(`${gen}.json`,import.meta.url),'utf8'));
  const items=Array.isArray(data)?data:data.items;
  for(const item of items){
    const path=resolve(root,item.local);
    if(!path.startsWith(resolve(root,gen)+sep)){failures.push(`${item.id}: local path escapes generation folder`);continue;}
    const bytes=await readFile(path),sha1=createHash('sha1').update(bytes).digest('hex');
    const sha256=createHash('sha256').update(bytes).digest('hex');
    if(item.hash!==sha1&&item.hash!==sha256)failures.push(`${item.id}: saved hash mismatch`);
    if(knownHashes.has(sha1)||knownImages.has(decodeURIComponent(item.image)))failures.push(`${item.id}: already in original catalogue`);
    if(hashes.has(sha1))failures.push(`${item.id}: duplicate new image`);
    hashes.add(sha1);
    if(!item.title||!item.source||!item.kind||!item.use||!item.limit)failures.push(`${item.id}: incomplete provenance`);
  }
  results.push({generation:gen,count:items.length});
}
const report={checkedAt:new Date().toISOString(),results,uniqueImages:hashes.size,failures};
await writeFile(new URL('verification.json',import.meta.url),JSON.stringify(report,null,2));
console.log(JSON.stringify(report,null,2));
if(failures.length||results.some(x=>x.count!==20))process.exitCode=1;
