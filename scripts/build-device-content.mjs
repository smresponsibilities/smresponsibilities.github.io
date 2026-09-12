import fs from 'node:fs';

const contentPath = 'public/generation-device/content.js';
const rosterPath = 'src/data/roster.json';

const roster = fs.existsSync(rosterPath) ? JSON.parse(fs.readFileSync(rosterPath, 'utf8')) : [];
const content = fs.readFileSync(contentPath, 'utf8');

function title(value) {
  return String(value || '')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function dexNo(index) {
  return String(index + 2).padStart(3, '0');
}

const dexItems = [
  {
    name: '001 · SHIVAM',
    tag: 'OWNER ENTRY',
    copy: 'Shivam Mahajan is the first registered developer in SM’s Dex.',
    facts: ['@SMRESPONSIBILITIES', 'DRAGON / STEEL', 'SOFTWARE DEVELOPER'],
  },
  ...roster.map((entry, index) => ({
    name: `${dexNo(index)} · ${String(entry.github).toUpperCase()}`,
    tag: Array.isArray(entry.types) ? entry.types.map((type) => String(type).toUpperCase()).join(' / ') : 'REGISTERED',
    copy: String(entry.entry || ''),
    facts: [
      `@${String(entry.github).toUpperCase()}`,
      String(entry.species || 'Registered Pokemon').toUpperCase(),
      `STATUS · ${String(entry.status || 'WILD').toUpperCase()}`,
      ...(entry.fact ? [title(entry.fact)] : []),
    ].slice(0, 4),
  })),
  {
    name: 'PUBLIC ROSTER',
    tag: `${roster.length + 1} REGISTERED ${roster.length === 0 ? 'DEVELOPER' : 'DEVELOPERS'}`,
    copy: 'Approved developer entries live here inside every Pokédex. Add Pokémon submits the next entry for review.',
    facts: ['001 · SHIVAM MAHAJAN', ...roster.map((entry, index) => `${dexNo(index)} · ${String(entry.github).toUpperCase()}`), 'GITHUB-REVIEWED SUBMISSIONS'].slice(0, 4),
  },
];

const rendered = `  {name:'DEX',items:${JSON.stringify(dexItems)}}`;
const start = content.indexOf("  {name:'DEX',items:");
const end = start >= 0 ? content.indexOf('\n];', start) : -1;

if (start < 0 || end < 0) {
  throw new Error('Could not find DEX section in public/generation-device/content.js');
}

const updated = `${content.slice(0, start)}${rendered}${content.slice(end)}`;
fs.writeFileSync(contentPath, updated);
