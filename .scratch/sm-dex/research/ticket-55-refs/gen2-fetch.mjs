import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.dirname(new URL(import.meta.url).pathname.replace(/^\/(?:[A-Za-z]:)/, m => m.slice(1)));
const outDir = path.join(root, 'gen2');
const titles = [
  'Archivo:EP154 Skarmory en la Pokédex.jpg',
  'Archivo:EP160 Miltank en la Pokédex.jpg',
  'Archivo:EP173 Umbreon en la Pokédex.png',
  'Archivo:EP190 Swinub en la Pokédex.png',
  'Archivo:EP216 Mantine en la Pokédex.jpg',
  'Archivo:EP205 Smoochum en la Pokédex.jpg',
  'Archivo:EP218 Kingdra en la Pokédex.png',
  'Archivo:EP232 Phanpy en la Pokédex.png',
  'Archivo:EP236 Xatu en la Pokédex.png',
  'Archivo:EP266 Tyranitar en la Pokédex.png',
  'Archivo:EP261 Forretress en la Pokédex.png',
  'Archivo:EP250 Charizard en la Pokédex.png',
  'Archivo:EP163 Bayleef en la Pokédex.png',
  'Archivo:EP210 Ampharos en la Pokédex.png',
  'Archivo:EP222 Pupitar en la Pokédex.png',
  'Archivo:EP140 Gligar en la Pokédex.png',
  'Archivo:EP249 Politoed en la Pokédex.jpg',
  'Archivo:EP145 Pineco en la Pokédex.jpg',
  'Archivo:EP123 Hoothoot en la Pokédex.png',
  'Archivo:EP127 Stantler en la Pokédex.jpg',
];

const api = new URL('https://www.wikidex.net/api.php');
api.search = new URLSearchParams({ action: 'query', prop: 'imageinfo', iiprop: 'url|size|sha1', titles: titles.join('|'), format: 'json' });
const response = await fetch(api, { signal: AbortSignal.timeout(30000) });
if (!response.ok) throw new Error(`WikiDex API ${response.status}`);
const data = await response.json();
const pages = Object.values(data.query?.pages ?? {});
if (pages.length !== titles.length) throw new Error(`Expected ${titles.length} pages, got ${pages.length}`);
await mkdir(outDir, { recursive: true });
const rows = [];
for (const [i, page] of pages.entries()) {
  const info = page.imageinfo?.[0];
  if (!info?.url || !info.sha1) throw new Error(`Missing imageinfo for ${page.title}`);
  const ext = path.extname(new URL(info.url).pathname).toLowerCase() || '.bin';
  const localName = `g2-extra-${String(i + 1).padStart(2, '0')}${ext}`;
  const body = await (await fetch(info.url, { signal: AbortSignal.timeout(30000) })).arrayBuffer();
  await writeFile(path.join(outDir, localName), Buffer.from(body));
  rows.push({ title: page.title, info, localName });
}
await writeFile(path.join(root, 'gen2-fetch-results.json'), JSON.stringify(rows, null, 2) + '\n');
console.log(`Downloaded ${rows.length} originals`);
