import fs from 'node:fs';

const TYPES = new Set([
  'normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground',
  'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy',
]);
const USERNAME = /^[a-zA-Z\d](?:[a-zA-Z\d]|-(?=[a-zA-Z\d])){0,38}$/;
const write = process.argv.includes('--write');

function fail(message) {
  fs.writeFileSync('submission-error.txt', message);
  console.error(message);
  process.exit(1);
}

function clean(value, max) {
  const stripped = String(value ?? '')
    .replace(/[\u0000-\u001F\u007F]/g, '')
    .trim()
    .replace(/^[=+\-@]+/, '')
    .trim();
  return stripped.slice(0, max);
}

function field(payload, ...names) {
  for (const name of names) {
    const value = payload[name];
    if (value !== undefined && value !== null && String(value).trim() !== '') return value;
  }
  return '';
}

function parseMarkdownIssueBody(body) {
  const fields = {};
  const text = String(body || '').replace(/\s+/g, ' ').trim();
  const headings = [
    'GitHub username',
    'Species',
    'Primary type',
    'Secondary type',
    'Status',
    'Company',
    'Current employer',
    'Dex entry',
    'Fact / tip',
    'Fact / tip (optional)',
  ];
  const markers = headings
    .map((heading) => ({ heading, index: text.indexOf(`### ${heading}`) }))
    .filter((marker) => marker.index >= 0)
    .sort((a, b) => a.index - b.index);
  for (let i = 0; i < markers.length; i += 1) {
    const start = markers[i].index + `### ${markers[i].heading}`.length;
    const end = markers[i + 1]?.index ?? text.length;
    fields[markers[i].heading] = text.slice(start, end).trim();
  }
  return fields;
}

let payload;
try {
  payload = JSON.parse(process.env.PAYLOAD || '{}');
} catch {
  fail('Issue form payload was not valid JSON.');
}
if (!payload || Object.keys(payload).length === 0) {
  payload = parseMarkdownIssueBody(process.env.ISSUE_BODY);
}

const github = clean(field(payload, 'github', 'GitHub username'), 39).replace(/^@/, '');
const species = clean(field(payload, 'species', 'Species'), 24);
const primaryType = clean(field(payload, 'primaryType', 'Primary type'), 20).toLowerCase();
const secondaryType = clean(field(payload, 'secondaryType', 'Secondary type'), 20).toLowerCase();
const statusRaw = clean(field(payload, 'status', 'Status'), 20).toLowerCase();
const company = clean(field(payload, 'company', 'Current employer', 'Company'), 80);
const entry = clean(field(payload, 'entry', 'Dex entry'), 150);
const fact = clean(field(payload, 'fact', 'Fact / tip', 'Fact / tip (optional)'), 100);
const issue = Number(process.env.ISSUE || 0);

if (!USERNAME.test(github)) fail('GitHub username is malformed.');
if (!species) fail('Species is required.');
if (!TYPES.has(primaryType)) fail('Primary type is invalid.');
if (secondaryType && secondaryType !== 'none' && !TYPES.has(secondaryType)) fail('Secondary type is invalid.');
if (!['caught', 'released', 'uncaught'].includes(statusRaw)) fail('Status is invalid.');
if (statusRaw === 'caught' && !company) fail('Current employer is required when status is Caught.');
if (!entry) fail('Dex entry is required.');
if (entry.length > 150) fail('Dex entry must be 150 characters or fewer.');
if (!Number.isInteger(issue) || issue <= 0) fail('Issue number is missing.');

const userResponse = await fetch(`https://api.github.com/users/${encodeURIComponent(github)}`, {
  headers: {
    'User-Agent': 'sm-dex-roster-validator',
    ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
  },
});
if (!userResponse.ok) fail(`GitHub user "${github}" was not found.`);

const rosterPath = 'src/data/roster.json';
const roster = fs.existsSync(rosterPath) ? JSON.parse(fs.readFileSync(rosterPath, 'utf8')) : [];
const id = github.toLowerCase();
if (roster.some((entry) => String(entry.github).toLowerCase() === id)) {
  fail(`GitHub user "${github}" is already in the roster.`);
}

if (write) {
  const types = [primaryType];
  if (secondaryType && secondaryType !== 'none' && secondaryType !== primaryType) types.push(secondaryType);
  roster.push({
    dexNo: roster.length + 1,
    github,
    name: github,
    species,
    types,
    status: statusRaw.toUpperCase(),
    company: statusRaw === 'caught' ? company : null,
    entry,
    fact: fact || null,
    shiny: (roster.length + 1) % 10 === 0,
    issue,
  });
  fs.writeFileSync(rosterPath, `${JSON.stringify(roster, null, 2)}\n`);
}
