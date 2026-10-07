import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { dirname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

// Download source media without altering its bytes. Never overwrite a different local file.
const root = dirname(fileURLToPath(import.meta.url));
const catalogueName = process.argv[2] || 'catalogue.json';
if (!['catalogue.json', 'kanto-extra-candidates.json'].includes(catalogueName)) throw Error('Unknown catalogue');
const catalogue = JSON.parse(await readFile(resolve(root, catalogueName), 'utf8'));
const pending = [...catalogue.items];
const results = [];
const failures = [];
async function worker() {
  for (let item; (item = pending.shift());) {
    try {
      const target = resolve(root, item.local);
      if (!target.startsWith(resolve(root, 'references') + sep)) throw Error('Unsafe target');
      let bytes;
      try { await access(target); bytes = await readFile(target); }
      catch {
        const response = await fetch(item.image, {signal: AbortSignal.timeout(45000)});
        if (!response.ok) throw Error(`HTTP ${response.status}`);
        if (!response.headers.get('content-type')?.startsWith('image/')) throw Error('Not image media');
        bytes = Buffer.from(await response.arrayBuffer());
        const expected = createHash('sha1').update(bytes).digest('hex');
        if (item.sha1 && expected !== item.sha1) throw Error('Source SHA1 mismatch before write');
        await mkdir(dirname(target), {recursive:true});
        await writeFile(target, bytes, {flag:'wx'});
      }
      const sha1 = createHash('sha1').update(bytes).digest('hex');
      if (item.sha1 && sha1 !== item.sha1) throw Error('Source SHA1 mismatch');
      results.push({id:item.id, local:item.local, bytes:bytes.length, sha1,
        archiveHashMatched:item.sha1 ? true : null});
      console.log(`${item.id}: ${bytes.length} bytes verified`);
    } catch (error) {
      failures.push({id:item.id, error:error.message});
      console.error(`${item.id}: ${error.message}`);
    }
  }
}
await Promise.all(Array.from({length:4}, worker));
results.sort((a,b) => a.id.localeCompare(b.id));
const report = {checkedAt:new Date().toISOString(), count:results.length,
  uniqueHashes:new Set(results.map(item=>item.sha1)).size, failures, items:results};
await writeFile(resolve(root, catalogueName === 'catalogue.json' ? 'download-verification.json' : 'kanto-extra-verification.json'), JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({count:report.count, uniqueHashes:report.uniqueHashes, failures}));
if (failures.length || report.count !== catalogue.count || report.uniqueHashes !== catalogue.count) process.exitCode = 1;
