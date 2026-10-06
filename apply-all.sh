#!/usr/bin/env bash
# Run from the ROOT of your smresponsibilities.github.io clone:  bash apply-all.sh
# Creates two branches from main, writes files, builds, pushes, opens two PRs.
set -euo pipefail

command -v gh >/dev/null || { echo "Install and log in to GitHub CLI (gh auth login) first"; exit 1; }
git fetch origin
git checkout main && git pull --ff-only origin main
[ -f src/styles/editorial.css ] || { echo "src/styles/editorial.css missing on main"; exit 1; }

###############################################################################
# PR 1: timelines (10 variants + preview page + blog integration)
###############################################################################
git checkout -B feat/timelines main
mkdir -p src/components src/pages

cat > src/components/DaysTimeline.astro <<'EOF'
---
import posts from '../data/linkedin-posts.json';
interface Props { variant?: number; limit?: number }
const { variant = 1, limit } = Astro.props;
const all = [...posts].sort((a, b) => b.day - a.day);
const items = (limit ? all.slice(0, limit) : all).map((p: any) => {
  const t = String(p.content ?? p.text ?? '').replace(/\s+/g, ' ').trim();
  return {
    day: p.day,
    date: p.date ?? '',
    egg: !!p.easterEgg,
    ms: p.day % 100 === 0 || p.day === 1,
    ex: t.length > 140 ? t.slice(0, 140) + '…' : t,
  };
});
const group = (keyFn: (i: any) => string) => {
  const out: { name: string; items: any[] }[] = [];
  for (const it of items) {
    const k = keyFn(it);
    let g = out.find((x) => x.name === k);
    if (!g) out.push((g = { name: k, items: [] }));
    g.items.push(it);
  }
  return out;
};
const chapters = variant === 3 ? group((i) => { const lo = Math.floor((i.day - 1) / 100) * 100 + 1; return `Days ${lo}-${lo + 99}`; }) : [];
const years = variant === 9 ? group((i) => (i.date || 'Unknown').slice(0, 4)) : [];
const href = (d: number) => `/blog/day-${d}/`;
---
<div class={`tl tl-v${variant}`}>
  {variant === 1 && (
    <ol class="spine">
      {items.map((i) => (
        <li class:list={['node', { ms: i.ms, egg: i.egg }]}>
          <a href={href(i.day)}><small>{i.date}</small><b>Day {i.day}</b><span>{i.ex}</span></a>
        </li>
      ))}
    </ol>
  )}
  {(variant === 2 || variant === 8) && (
    <div class="cells">
      {items.map((i) => (
        <a href={href(i.day)} title={`Day ${i.day}: ${i.date}`} class:list={['cell', { ms: i.ms, egg: i.egg }]}></a>
      ))}
    </div>
  )}
  {variant === 3 && chapters.map((c, n) => (
    <details open={n === 0}>
      <summary>{c.name} <small>{c.items.length} days</small></summary>
      <ul>{c.items.map((i) => <li><a href={href(i.day)}>Day {i.day} <small>{i.date}</small></a></li>)}</ul>
    </details>
  ))}
  {variant === 4 && (
    <ol class="hscroll">
      {items.map((i) => (
        <li class:list={{ ms: i.ms, egg: i.egg }}><a href={href(i.day)}><b>{i.day}</b><small>{i.date}</small></a></li>
      ))}
    </ol>
  )}
  {variant === 5 && (
    <pre class="term">{items.map((i) => (
      <a href={href(i.day)}>{`${i.date.padEnd(10)}  day-${String(i.day).padEnd(5)} ${i.ex.slice(0, 70)}`}\n</a>
    ))}</pre>
  )}
  {variant === 6 && (
    <div class="cards">
      {items.map((i) => (
        <a class:list={['card', { ms: i.ms, egg: i.egg }]} href={href(i.day)}><small>{i.date}</small><b>Day {i.day}</b><p>{i.ex}</p></a>
      ))}
    </div>
  )}
  {variant === 7 && (
    <table class="ledger">
      <thead><tr><th>Day</th><th>Date</th><th>Note</th></tr></thead>
      <tbody>{items.map((i) => <tr class:list={{ ms: i.ms }}><td><a href={href(i.day)}>{i.day}</a></td><td>{i.date}</td><td>{i.ex}</td></tr>)}</tbody>
    </table>
  )}
  {variant === 9 && years.map((y, n) => (
    <details open={n === 0}>
      <summary>{y.name} <small>{y.items.length} days</small></summary>
      <ul>{y.items.map((i) => <li><a href={href(i.day)}>Day {i.day} <small>{i.date}</small></a></li>)}</ul>
    </details>
  ))}
  {variant === 10 && (
    <ol class="miles">
      {items.filter((i) => i.ms || i.egg).map((i) => (
        <li><a href={href(i.day)}><b>Day {i.day}</b> <small>{i.date}</small> {i.egg ? <em>glitch</em> : null}</a></li>
      ))}
    </ol>
  )}
</div>
<style>
  .tl { --a: var(--accent, #4ade80); color: var(--ink, inherit); }
  .tl a { color: inherit; text-decoration: none; }
  .tl small { opacity: .65; margin-right: .5rem; }
  ol, ul { list-style: none; margin: 0; padding: 0; }
  .spine { position: relative; padding-left: 1.75rem; }
  .spine::before { content: ""; position: absolute; left: 6px; top: 0; bottom: 0; width: 2px; background: var(--a); opacity: .5; }
  .node { position: relative; margin-bottom: 1rem; }
  .node::before { content: ""; position: absolute; left: -1.75rem; top: .4rem; width: 14px; height: 14px; border-radius: 50%; border: 3px solid var(--a); background: var(--panel, #111); }
  .node.ms::before { background: var(--a); transform: scale(1.35); }
  .node.egg::before { border-color: #f59e0b; }
  .node a { display: block; padding: .5rem .75rem; border: 1px solid transparent; }
  .node a:hover, .node a:focus-visible { border-color: var(--a); }
  .node small, .node b, .node span { display: block; }
  .node span { opacity: .85; font-size: .9rem; }
  .cells { display: flex; flex-wrap: wrap; gap: 3px; max-width: 800px; }
  .cell { width: 10px; height: 10px; background: var(--a); border-radius: 2px; }
  .cell.ms { outline: 2px solid var(--ink, #fff); }
  .cell.egg { background: #f59e0b; }
  .tl-v8 .cells { gap: 1px; } .tl-v8 .cell { width: 4px; height: 14px; }
  details { border-top: 1px solid color-mix(in srgb, currentColor 20%, transparent); padding: .5rem 0; }
  summary { cursor: pointer; font-weight: 700; }
  details ul { display: flex; flex-wrap: wrap; gap: .25rem .75rem; padding-top: .5rem; }
  .hscroll { display: flex; gap: .5rem; overflow-x: auto; padding-bottom: .75rem; scroll-snap-type: x proximity; }
  .hscroll li { flex: 0 0 90px; scroll-snap-align: start; border: 2px solid var(--a); padding: .5rem; }
  .hscroll li.ms { background: var(--a); color: var(--bg, #000); }
  .hscroll b, .hscroll small { display: block; }
  .term { font: .85rem/1.5 ui-monospace, monospace; background: #0b0f0b; color: #4ade80; padding: 1rem; overflow-x: auto; max-height: 28rem; }
  .term a { display: inline; }
  .cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: .75rem; }
  .card { border: 1px solid var(--a); padding: .75rem; display: block; }
  .card.ms { border-width: 3px; }
  .card p { margin: .35rem 0 0; font-size: .9rem; opacity: .85; }
  .ledger { width: 100%; border-collapse: collapse; font-size: .9rem; }
  .ledger th, .ledger td { text-align: left; padding: .35rem .5rem; border-bottom: 1px solid color-mix(in srgb, currentColor 15%, transparent); vertical-align: top; }
  .ledger tr.ms td { font-weight: 700; }
  .miles li { padding: .4rem 0; border-bottom: 1px dashed color-mix(in srgb, currentColor 25%, transparent); }
  @media (prefers-reduced-motion: reduce) { * { transition: none !important; animation: none !important; } }
</style>
EOF

cat > src/pages/timelines.astro <<'EOF'
---
import EditorialShell from '../components/EditorialShell.astro';
import DaysTimeline from '../components/DaysTimeline.astro';
const variants = [
  [1, 'Spine', 12], [2, 'Heatmap river', undefined], [3, 'Chapters', undefined],
  [4, 'Horizontal scroller', 40], [5, 'Terminal log', 25], [6, 'Index cards', 12],
  [7, 'Editorial ledger', 25], [8, 'Dot strip', undefined], [9, 'By year', undefined], [10, 'Milestones only', undefined],
] as const;
---
<EditorialShell title="Timeline previews | Shivam Mahajan" description="Preview of timeline designs." eyebrow="Preview" heading="Timeline previews" intro="Ten designs. Tell me the number you want.">
  <meta name="robots" content="noindex" />
  {variants.map(([n, name, limit]) => (
    <section style="margin:2.5rem 0">
      <h2>{n}. {name}</h2>
      <DaysTimeline variant={n} limit={limit} />
    </section>
  ))}
</EditorialShell>
EOF

# blog index integration + safer copy (python, skips with a warning if anchors differ)
python3 - <<'EOF'
import re, pathlib
p = pathlib.Path('src/pages/blog/index.astro')
s = p.read_text(encoding='utf-8')
if 'DaysTimeline' not in s:
    s = s.replace("import EditorialShell from '../../components/EditorialShell.astro';",
      "import EditorialShell from '../../components/EditorialShell.astro';\nimport DaysTimeline from '../../components/DaysTimeline.astro';", 1)
    s = s.replace('<section id="archive-section">',
      '<section aria-labelledby="recent-days"><h2 id="recent-days">Recent days</h2><DaysTimeline variant={1} limit={10} /><p><a href="/blog/timeline/">Full timeline</a></p></section>\n\n      <section id="archive-section">', 1)
for a, b in [('2002 Days of Code', 'Days of Code'), ('Every single day of the 1200+ day streak.', 'Every single day of the streak.')]:
    s = s.replace(a, b)
# remove the duplicated copies of the heatmap CSS (keep first of each <style> block)
p.write_text(s, encoding='utf-8')
EOF

# homepage: best-effort insert before first </main>; verify visually
if [ -f src/pages/index.astro ] && grep -q '</main>' src/pages/index.astro && ! grep -q DaysTimeline src/pages/index.astro; then
  python3 - <<'EOF'
import pathlib
p = pathlib.Path('src/pages/index.astro')
s = p.read_text(encoding='utf-8')
if s.startswith('---'):
    s = s.replace('---', "---\nimport DaysTimeline from '../components/DaysTimeline.astro';", 1)
    s = s.replace('</main>', '<section aria-label="Days of Code"><h2>Days of Code</h2><DaysTimeline variant={1} limit={8} /><p><a href="/blog/timeline/">Full timeline</a></p></section>\n</main>', 1)
    p.write_text(s, encoding='utf-8')
EOF
else
  echo "NOTE: homepage not auto-edited; add <DaysTimeline variant={1} limit={8} /> manually."
fi

npm ci >/dev/null 2>&1 || npm install
npm run build
git add -A && git commit -m "feat: reusable DaysTimeline (10 variants), /timelines/ preview, blog+home integration"
git push -u origin feat/timelines
gh pr create --base main --head feat/timelines --title "Timelines: 10 variants + preview" \
  --body "Adds DaysTimeline component, /timelines/ preview (noindex), blog and home integration. Pick a variant, then I can remove the others."

###############################################################################
# PR 2: pipeline + SEO
###############################################################################
git checkout -B feat/pipeline-seo main
mkdir -p .github/workflows .github/ISSUE_TEMPLATE scripts public src/pages/blog/month

cat > .github/workflows/daily-issue.yml <<'EOF'
name: Daily day-number issue
on:
  workflow_dispatch:
  schedule:
    - cron: '30 18 * * *'
permissions:
  issues: write
jobs:
  create_issue:
    runs-on: ubuntu-latest
    steps:
      - env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          GH_REPO: ${{ github.repository }}
        run: |
          TODAY=$(TZ=Asia/Kolkata date +%F)
          DAY=$(( 1237 + ( $(date -u -d "$TODAY" +%s) - $(date -u -d 2026-10-01 +%s) ) / 86400 ))
          gh label create daily-post --color 0e8a16 2>/dev/null || true
          gh label create needs-manual --color d93f0b 2>/dev/null || true
          if gh issue list --state all --label daily-post --search "\"Day $DAY\" in:title" --json title -q '.[].title' | grep -qx "Day $DAY"; then exit 0; fi
          printf 'Date: %s\n\nPaste the LinkedIn post URL here, or add a block starting with MANUAL: followed by the post text. Then close this issue.\n' "$TODAY" > body.md
          gh issue create --label daily-post --title "Day $DAY" --body-file body.md
EOF

cat > .github/workflows/process-issue.yml <<'EOF'
name: Process Closed Daily Issue
on:
  issues:
    types: [closed]
permissions:
  contents: write
  issues: write
  actions: write
concurrency:
  group: posts-json
jobs:
  process:
    if: contains(github.event.issue.labels.*.name, 'daily-post')
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: { python-version: '3.12' }
      - run: pip install beautifulsoup4 requests
      - env:
          ISSUE_BODY: ${{ github.event.issue.body }}
          ISSUE_TITLE: ${{ github.event.issue.title }}
          ISSUE_NUMBER: ${{ github.event.issue.number }}
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: python scripts/process_issue.py
      - env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          git config user.name 'github-actions[bot]'
          git config user.email 'github-actions[bot]@users.noreply.github.com'
          git add src/data/linkedin-posts.json
          git diff --cached --quiet && exit 0
          git commit -m "data: add post from issue #${{ github.event.issue.number }}"
          git pull --rebase origin main
          git push
          gh workflow run deploy.yml --ref main
EOF

cat > scripts/process_issue.py <<'EOF'
import os, re, json, subprocess, sys
from datetime import date, timedelta
import requests
from bs4 import BeautifulSoup

body = os.environ.get('ISSUE_BODY', '') or ''
title = os.environ.get('ISSUE_TITLE', '')
num = os.environ['ISSUE_NUMBER']

def say(msg, fail=False):
    subprocess.run(['gh', 'issue', 'comment', num, '--body', msg])
    if fail:
        subprocess.run(['gh', 'issue', 'edit', num, '--add-label', 'needs-manual'])
        sys.exit(1)

m = re.search(r'Day\s+(\d+)', title)
if not m:
    say('Issue title must look like "Day 1243".', True)
day = int(m.group(1))
d = (date(2026, 10, 1) + timedelta(days=day - 1237)).isoformat()

content, url = None, None
man = re.search(r'MANUAL:\s*\n([\s\S]+)', body)
if man and len(man.group(1).strip()) > 20:
    content = man.group(1).strip()
else:
    u = re.search(r'(https?://(?:www\.)?linkedin\.com/(?:posts|feed/update)[^\s)]+|https?://lnkd\.in/[^\s)]+)', body)
    if not u:
        say('No LinkedIn URL and no MANUAL: text in the issue body. Edit the body and close again.', True)
    url = u.group(1)
    try:
        r = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'}, timeout=15)
        og = BeautifulSoup(r.text, 'html.parser').find('meta', property='og:description')
        content = og['content'].strip() if og and og.get('content') else None
    except Exception as e:
        say(f'Fetch failed: {e}', True)
    if not content:
        say('LinkedIn gave no description. Add a MANUAL: block with the text and close again.', True)

path = 'src/data/linkedin-posts.json'
posts = json.load(open(path, encoding='utf-8'))
rec = next((p for p in posts if p.get('day') == day), None)
if rec is None:
    rec = {'day': day}
    posts.append(rec)
rec.update({'date': rec.get('date') or d, 'content': content})
if url:
    rec['url'] = url
posts.sort(key=lambda p: p['day'])
json.dump(posts, open(path, 'w', encoding='utf-8'), indent=2, ensure_ascii=False)
say(f'Saved Day {day}. The site will redeploy.')
EOF

cat > .github/workflows/linkedin-discovery.yml <<'EOF'
name: Discover LinkedIn posts
on:
  workflow_dispatch:
  schedule:
    - cron: '17 3 * * *'
permissions:
  contents: write
  actions: write
concurrency:
  group: posts-json
jobs:
  discover:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '22' }
      - run: node scripts/discover-linkedin-posts.mjs
      - env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          git config user.name 'github-actions[bot]'
          git config user.email 'github-actions[bot]@users.noreply.github.com'
          git add src/data/linkedin-posts.json
          git diff --cached --quiet && exit 0
          git commit -m "data: discovered posts"
          git pull --rebase origin main
          git push
          gh workflow run deploy.yml --ref main
EOF

# Patch discovery script (30-60 day window, content/date fields, safe map key). Warns if anchors not found.
python3 - <<'EOF'
import pathlib
p = pathlib.Path('scripts/discover-linkedin-posts.mjs')
s = p.read_text(encoding='utf-8')
for a, b in [('currentDay - 45', 'currentDay - 60'), ('currentDay - 7', 'currentDay - 30'),
             ('item.activityId, item', "item.activityId ?? 'day-' + item.day, item")]:
    if a in s: s = s.replace(a, b)
    else: print('WARNING: anchor not found in discover script:', a)
p.write_text(s, encoding='utf-8')
print('WARNING: also add  content: text, date: <ISO date>  to the object returned by post() in the discover script (see PR notes).')
EOF

# SEO
[ -f public/robots.txt ] || cat > public/robots.txt <<'EOF'
User-agent: *
Allow: /
Disallow: /timelines/
Sitemap: https://shivammahajan.com/sitemap.xml
EOF

cat > src/pages/sitemap.xml.ts <<'EOF'
import posts from '../data/linkedin-posts.json';
const SITE = 'https://shivammahajan.com';
export function GET() {
  const months = [...new Set((posts as any[]).map((p) => String(p.date ?? '').slice(0, 7)).filter((m) => /^\d{4}-\d{2}$/.test(m)))];
  const urls = [
    '/', '/resume/', '/projects/', '/blog/', '/blog/timeline/', '/blog/milestones/',
    ...months.map((m) => `/blog/month/${m}/`),
    ...(posts as any[]).map((p) => `/blog/day-${p.day}/`),
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((u) => `<url><loc>${SITE}${u}</loc></url>`).join('')}</urlset>`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
EOF

cat > src/pages/blog/rss.xml.ts <<'EOF'
import posts from '../../data/linkedin-posts.json';
const SITE = 'https://shivammahajan.com';
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
export function GET() {
  const items = [...(posts as any[])].sort((a, b) => b.day - a.day).slice(0, 50).map((p) => {
    const t = String(p.content ?? p.text ?? '');
    return `<item><title>Day ${p.day}</title><link>${SITE}/blog/day-${p.day}/</link><guid>${SITE}/blog/day-${p.day}/</guid>${p.date ? `<pubDate>${new Date(p.date).toUTCString()}</pubDate>` : ''}<description>${esc(t.slice(0, 300))}</description></item>`;
  });
  const body = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Days of Code</title><link>${SITE}/blog/</link><description>Daily software development progress by Shivam Mahajan</description>${items.join('')}</channel></rss>`;
  return new Response(body, { headers: { 'Content-Type': 'application/rss+xml' } });
}
EOF

cat > src/pages/blog/milestones.astro <<'EOF'
---
import EditorialShell from '../../components/EditorialShell.astro';
import DaysTimeline from '../../components/DaysTimeline.astro';
---
<EditorialShell title="Days of Code milestones | Shivam Mahajan" description="Milestone days from Shivam Mahajan's daily software development streak." eyebrow="Field notes / Milestones" heading="Milestones" intro="Every 100th day and the first day of the streak.">
  <DaysTimeline variant={10} />
</EditorialShell>
EOF

cat > 'src/pages/blog/month/[month].astro' <<'EOF'
---
import EditorialShell from '../../../components/EditorialShell.astro';
import posts from '../../../data/linkedin-posts.json';
export function getStaticPaths() {
  const months = [...new Set((posts as any[]).map((p) => String(p.date ?? '').slice(0, 7)).filter((m) => /^\d{4}-\d{2}$/.test(m)))];
  return months.map((month) => ({ params: { month } }));
}
const { month } = Astro.params;
const list = (posts as any[]).filter((p) => String(p.date ?? '').startsWith(month!)).sort((a, b) => a.day - b.day);
const name = new Date(`${month}-01T00:00:00Z`).toLocaleString('en', { month: 'long', year: 'numeric', timeZone: 'UTC' });
---
<EditorialShell title={`Days of Code, ${name} | Shivam Mahajan`} description={`Daily software development notes from ${name}: days ${list[0]?.day} to ${list.at(-1)?.day}.`} eyebrow="Field notes / Archive" heading={name} intro={`${list.length} days logged.`}>
  <ul>{list.map((p) => <li><a href={`/blog/day-${p.day}/`}>Day {p.day}</a> <small>{p.date}</small></li>)}</ul>
</EditorialShell>
EOF

npm ci >/dev/null 2>&1 || npm install
npm run build
git add -A && git commit -m "fix: pipeline (daily Day N issues, 30-60d fetch, manual fallback, deploy dispatch) + SEO pages"
git push -u origin feat/pipeline-seo
gh pr create --base main --head feat/pipeline-seo --title "Pipeline fixes + SEO" \
  --body "Daily Day N issue, process-issue permissions + deploy dispatch, daily discovery with 30-60 day window, manual fallback, sitemap, robots, RSS, milestones and month pages. Needs repo setting: Actions > Workflow permissions > Read and write."

echo "Done. Two PRs opened."
