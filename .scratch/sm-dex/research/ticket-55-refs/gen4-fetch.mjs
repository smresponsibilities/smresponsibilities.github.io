import fs from 'node:fs/promises';
import path from 'node:path';

const root = path.dirname(new URL(import.meta.url).pathname.replace(/^\//, '').replace(/^([A-Z]):/, '$1:'));
const outDir = path.join(root, 'gen4');
const titles = [
  'Archivo:EP518 Kricketune en la Pokédex.png',
  'Archivo:EP585 Snorunt en la Pokédex.png',
  'Archivo:EP606 Marill en la Pokédex.png',
  'Archivo:EP606 Elekid en la Pokédex.png',
  'Archivo:EP588 Aggron en la Pokédex.png',
  'Archivo:EP594 Cherubi en la pokédex.png',
  'Archivo:EP658 Darkrai en la Pokédex.png',
  'Archivo:EP482 Staravia en la Pokédex.png',
  'Archivo:EP484 Cranidos en la Pokédex.png',
  'Archivo:EP484 Onix en la Pokédex.png',
  'Archivo:EP652 Armaldo en la Pokédex.jpg',
  'Archivo:EP646 Gallade en la pokédex.jpg',
  'Archivo:EP477 Croagunk en la Pokédex.png',
  'Archivo:EP473 Budew en la Pokédex.png',
  'Archivo:EP653 Electivire en la Pokédex.png',
  'Archivo:EP654 Noctowl en la Pokédex.png',
  'Archivo:EP569 Honchkrow en la Pokédex.png',
  'Archivo:EP490 Feebas en la Pokédex.png',
  'Archivo:EP624 Kirlia en la Pokédex.png',
  'Archivo:EP564 Cherrim en la Pokédex.png',
];

const api = 'https://www.wikidex.net/api.php?action=query&prop=imageinfo&iiprop=url|size|sha1&titles=' + encodeURIComponent(titles.join('|')) + '&format=json&origin=*';
const data = await (await fetch(api)).json();
const pages = Object.values(data.query.pages);
await fs.mkdir(outDir, { recursive: true });
for (const [i, title] of titles.entries()) {
  const page = pages.find((item) => item.title === title);
  if (!page?.imageinfo?.[0]) throw new Error(`Missing imageinfo: ${title}`);
  const info = page.imageinfo[0];
  const ext = path.extname(info.url.split('?')[0]).toLowerCase() || '.png';
  const local = `g4-extra-${String(i + 1).padStart(2, '0')}${ext}`;
  const bytes = new Uint8Array(await (await fetch(info.url)).arrayBuffer());
  await fs.writeFile(path.join(outDir, local), bytes);
  console.log(JSON.stringify({ title, local, ...info }));
}
