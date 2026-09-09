import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(root, 'gen5');
const titles = [
  'Archivo:EP736 Durant en la pokédex.png',
  'Archivo:EP714 Bouffalant en la Pokédex.png',
  'Archivo:EP682 Lampent en la pokédex.png',
  'Archivo:EP726 Sigilyph en la Pokédex.png',
  'Archivo:EP726 Cofagrigus en la Pokédex.png',
  'Archivo:EP701 Stoutland en la Pokédex.png',
  'Archivo:EP701 Zebstrika en la pokédex.png',
  'Archivo:EP706 Purrloin en la pokédex.png',
  'Archivo:EP771 Nonomi usando su Pokédex.png',
  'Archivo:EP664 Tepig en el Pokédex.jpg',
  'Archivo:EP681 Gothitelle en la pokédex.png',
  'Archivo:EP691 Joltik en la pokédex.png',
  'Archivo:EP691 Blitzle en la pokédex.png',
  'Archivo:EP694 Timburr en la pokédex.png',
  'Archivo:EP716 Swoobat en la Pokédex.png',
  'Archivo:EP751 Dragonite en la Pokédex.png',
  'Archivo:EP672 Trubbish en la Pokédex.png',
  'Archivo:EP708 Mienfoo en la Pokédex.png',
  'Archivo:EP745 Koffing en la Pokédex.png',
  'Archivo:EP778 Charizard en la Pokédex.jpg',
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
  const localName = `g5-extra-${String(i + 1).padStart(2, '0')}${ext}`;
  const imageResponse = await fetch(info.url, { signal: AbortSignal.timeout(30000) });
  if (!imageResponse.ok) throw new Error(`Image ${imageResponse.status} for ${page.title}`);
  await writeFile(path.join(outDir, localName), Buffer.from(await imageResponse.arrayBuffer()));
  rows.push({ title: page.title, info, localName });
}
await writeFile(path.join(root, 'gen5-fetch-results.json'), JSON.stringify(rows, null, 2) + '\n');
console.log(`Downloaded ${rows.length} originals`);
