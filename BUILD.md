# BUILD — implementation spec

**Audience: the agent writing the code.** You have not seen the conversation that produced
this. You do not need to. Everything required is here.

Companion documents, in order of authority:

1. **`BUILD.md`** (this file) — how to build it. Wins on any conflict.
2. `DECISIONS.md` — what was decided and what was rejected. Read §J–§M before proposing changes.
3. `SPEC.md` — the content. Becomes the JSON files.
4. `PLAN.md` — the research behind the decisions. Background reading.

---

## 0. Hard rules — do not "improve" these

These were each decided deliberately after research. Every one of them is something an
implementing agent typically overrides by reflex. **Do not.**

| Rule | Why it exists |
|---|---|
| **No Tailwind.** Plain CSS + custom properties. | The whole site is one bespoke design system with eight skins. Utility classes fight token-driven theming. |
| **No React, Vue, Svelte, or any UI framework.** | Nothing here needs a component runtime. Astro components are enough. |
| **No tooltip library** (Tippy, Floating UI, Popper). | Native Popover API does it with zero JS and better accessibility. |
| **No animation library** (GSAP, Framer, anime.js). | Every animation is under 8 lines of CSS or a 40-line canvas loop. |
| **No charting library.** | The stat bars are `<div>`s with a width. |
| **No WebGL, no three.js, no particle library.** | The reference site (thavlik.dev) uses canvas 2D. So do we. |
| **Zero runtime npm dependencies.** | What ships is HTML, CSS, and ~40 lines of canvas. Build-time deps are fine. |
| **No Pokémon sprites, artwork, music, logos, or the Poké Ball logotype in the repo.** | IP. Balls and type badges are drawn as SVG. Creature art is the user's GitHub avatar. |
| **No image files for people. Ever.** | Zero-storage is a core requirement. Sprites come from `github.com/<user>.png`. |
| **Do not put "Pokédex" in the site title, `<h1>`, or domain.** | Site is called **SM'S DEX**. |
| **Every animation respects `prefers-reduced-motion`.** | Non-negotiable. |
| **Audio never autoplays.** Sound toggle defaults **off**. | A recruiter opening this in an office. |

If you believe one of these is wrong, write the reason in a comment and build it as specified
anyway. Do not silently substitute.

---

## 0.1 How to talk while building

The user runs **caveman mode at `ultra`** on this project. Match it in chat.

Ultra means: drop articles and filler, fragments fine, abbreviate (`DB`, `auth`, `config`,
`req`, `res`, `fn`, `impl`), strip conjunctions, arrows for causality (`X → Y`), one word where
one word carries it. Keep every technical term exact. Quote errors verbatim.

```
Not: "I've now finished implementing the stat block component, and I think the next
      step would probably be to move on to the move list."
Yes: "StatBlock done. MoveList next."
```

**Exceptions — write normally for these:**

- Code, comments, commit messages, PR bodies, and any file in the repo
- Security warnings and confirmations of irreversible actions
- Multi-step sequences where clipped fragments could be misread out of order
- Anything the user explicitly asks to have explained at length

Skill: `.claude/skills/caveman/SKILL.md`.

---

## 1. Stack

Verified current as of 2026-08. The project is on Astro 7.2.4.

| Layer | Choice |
|---|---|
| Framework | **Astro 7** (`npm create astro@latest`) |
| Language | TypeScript |
| Styling | Plain CSS, custom properties, one global stylesheet + scoped component styles |
| Content | Astro content collections, `file()` loader, Zod schemas |
| Hosting | GitHub Pages via `withastro/action` |
| CI | GitHub Actions |
| Submissions | GitHub Issue Forms → Action → commit |
| Fonts | Press Start 2P (self-hosted woff2, subset latin) + system sans |

**Astro content-collections API** (this is the current shape — do not use the pre-v5 form):

```ts
// src/content.config.ts
import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';
```

Query with `getCollection('roster')` and `getEntry('roster', id)`.

---

## 2. File tree

```
sm-dex/
├─ .github/
│  ├─ ISSUE_TEMPLATE/
│  │  └─ become-a-pokemon.yml
│  └─ workflows/
│     ├─ deploy.yml            # build + deploy to Pages
│     └─ roster.yml            # validate submission, commit on `approved` label
├─ public/
│  ├─ fonts/press-start-2p.woff2
│  └─ favicon.svg
├─ scripts/
│  └─ validate-submission.mjs  # used by roster.yml
├─ src/
│  ├─ components/
│  │  ├─ Ball.astro
│  │  ├─ DexEntry.astro
│  │  ├─ EvolutionChain.astro
│  │  ├─ MoveDetail.astro
│  │  ├─ MoveList.astro
│  │  ├─ Onboarding.astro
│  │  ├─ Ribbon.astro
│  │  ├─ Screen.astro          # the device shell: top screen + bottom screen
│  │  ├─ Sprite.astro
│  │  ├─ StatBlock.astro
│  │  ├─ StreamCanvas.astro
│  │  ├─ Term.astro            # the tooltip primitive
│  │  ├─ TypeBadge.astro
│  │  └─ VersionSelector.astro
│  ├─ data/
│  │  ├─ me.json
│  │  ├─ moves.json
│  │  ├─ encounters.json
│  │  ├─ entries.json
│  │  └─ roster.json
│  ├─ layouts/
│  │  └─ Base.astro
│  ├─ lib/
│  │  ├─ level.ts
│  │  ├─ prefill.ts
│  │  └─ types.ts              # the 18 type colours + domain map
│  ├─ pages/
│  │  ├─ index.astro
│  │  ├─ become.astro
│  │  ├─ dex/index.astro
│  │  ├─ dex/[username].astro
│  │  └─ resume.astro
│  ├─ styles/
│  │  ├─ global.css
│  │  ├─ tokens.css            # base tokens
│  │  └─ skins.css             # 8 generation skins
│  └─ content.config.ts
├─ astro.config.mjs
└─ README.md
```

---

## 3. Data schemas — `src/content.config.ts`

Write this **exactly**. The `roster` schema is the important one: it validates data written by
a bot from stranger input, and a bad entry must fail the build rather than ship a broken page.

```ts
import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

const TYPES = [
  'normal','fire','water','electric','grass','ice','fighting','poison','ground',
  'flying','psychic','bug','rock','ghost','dragon','dark','steel','fairy',
] as const;

const BALLS = [
  'poke','great','ultra','master','nest','friend','repeat','sport',
  'quick','timer','heavy','luxury','dive',
] as const;

// GitHub username rules: 1-39 chars, alphanumeric or single hyphens, no leading/trailing hyphen
const USERNAME = z.string().regex(/^[a-zA-Z\d](?:[a-zA-Z\d]|-(?=[a-zA-Z\d])){0,38}$/);

const stat = z.object({
  key:       z.enum(['hp','atk','def','spa','spd','spe']),
  label:     z.string(),
  value:     z.number().nonnegative(),
  unit:      z.string(),          // "test suites"  — rendered next to the number
  benchmark: z.number().positive(),// bar fill = min(1, value / benchmark). See §6.3.
  source:    z.string().optional(),// tooltip provenance, e.g. "LeetCode + Codeforces"
});

const roster = defineCollection({
  loader: file('src/data/roster.json'),
  schema: z.object({
    id:       z.string(),               // === username, lowercased. Used as the URL slug.
    username: USERNAME,
    species:  z.string().max(40),
    types:    z.array(z.enum(TYPES)).min(1).max(2),
    entry:    z.string().max(200),      // the dex flavour line
    stats:    z.object({
      hp: z.number().int().min(0).max(255), atk: z.number().int().min(0).max(255),
      def: z.number().int().min(0).max(255), spa: z.number().int().min(0).max(255),
      spd: z.number().int().min(0).max(255), spe: z.number().int().min(0).max(255),
    }),
    level:    z.number().int().min(0).max(100),
    gender:   z.enum(['male','female','genderless']).default('genderless'),
    relation: z.enum(['caught','traded','wild']).default('wild'),
    shiny:    z.boolean().default(false),
    issue:    z.number().int().positive(),   // source issue number, for audit
    added:    z.coerce.date(),
  }),
});

const moves = defineCollection({
  loader: file('src/data/moves.json'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    types: z.array(z.enum(TYPES)).min(1).max(2),
    category: z.enum(['physical','special','status']),
    power: z.number().int().min(0).max(255),
    accuracy: z.number().int().min(0).max(100),
    pp: z.object({ current: z.number().int(), max: z.number().int() }),
    effect: z.string().max(160),           // ONE line. Level 2 disclosure.
    detail: z.string().optional(),         // Level 3 disclosure.
    stack: z.array(z.string()).default([]),
    priority: z.number().int().default(0),
    contact: z.boolean().default(false),
    target: z.string().optional(),
    tm: z.string().optional(),             // "TM01" — set when taught by an employer
    learnedAtLevel: z.number().int().nullable(), // null renders "Learned before capture"
    links: z.array(z.object({ label: z.string(), url: z.string().url() })).default([]),
    signature: z.boolean().default(false),
  }),
});

const encounters = defineCollection({
  loader: file('src/data/encounters.json'),
  schema: z.object({
    id: z.string(),
    org: z.string(),
    role: z.string(),
    ball: z.enum(BALLS),
    ballReason: z.string(),        // "On-campus placement" — ALWAYS rendered beside the icon
    from: z.coerce.date(),
    to: z.coerce.date().nullable(),// null === present
    metAtLevel: z.number().int(),
    location: z.string(),
    bullets: z.array(z.string()).default([]),
  }),
});

const entries = defineCollection({
  loader: file('src/data/entries.json'),
  schema: z.object({
    id: z.string(),                // "red" | "blue" | "gold" | ...
    version: z.string(),           // "RED"
    text: z.string().max(220),
  }),
});

export const collections = { roster, moves, encounters, entries };
```

`me.json` is a single object, not a collection — import it directly.

---

## 4. Design tokens — `src/styles/tokens.css`

Every colour in the app comes from a token. **No hard-coded hex outside this file and
`skins.css`.** That rule is what makes eight skins cost 30 lines each instead of a rewrite.

```css
:root {
  /* structure — constant across skins */
  --border-w: 2px;
  --radius:   4px;
  --gap:      12px;
  --screen-pad: 16px;

  /* palette — overridden per skin */
  --bg:      #0B0E12;
  --panel:   #161B22;
  --border:  #30363D;
  --ink:     #E6EDF3;
  --dim:     #8B949E;
  --accent:  #F7D02C;
  --screen:  #0D1117;   /* the "LCD" area */
  --stream:  #1F6FEB;   /* background animation colour */
  --line:    #1A1A1A;   /* ball outlines */

  /* typography */
  --font-display: "Press Start 2P", monospace;
  --font-body: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;

  /* the 18 type colours — canon values, do not adjust */
  --t-normal:#A8A77A; --t-fire:#EE8130; --t-water:#6390F0; --t-electric:#F7D02C;
  --t-grass:#7AC74C;  --t-ice:#96D9D6;  --t-fighting:#C22E28; --t-poison:#A33EA1;
  --t-ground:#E2BF65; --t-flying:#A98FF3; --t-psychic:#F95587; --t-bug:#A6B91A;
  --t-rock:#B6A136;   --t-ghost:#735797; --t-dragon:#6F35FC; --t-dark:#705746;
  --t-steel:#B7B7CE;  --t-fairy:#D685AD;
}
```

### Skins — `src/styles/skins.css`

Ship four. The other four are additive later, and each is the same shape.

```css
[data-version="red"]       { --bg:#0F1F0F; --screen:#8BAC0F; --ink:#0F380F; --border:#0F380F;
                             --accent:#306230; --radius:0px; }
[data-version="ruby"]      { --bg:#7B1E1E; --screen:#F0E8D8; --ink:#2A1010; --border:#3A0E0E;
                             --accent:#C4302B; }
[data-version="heartgold"] { /* default — inherits :root */ }
[data-version="rotom"]     { --bg:#FAFAFA; --panel:#FFFFFF; --screen:#FFFFFF; --ink:#18181B;
                             --border:#E11D48; --dim:#71717A; --accent:#E11D48; --radius:12px; }
```

**Skins may only redefine custom properties.** If a skin needs different HTML, stop and flag
it — that breaks the cost model. One exception is allowed: a single empty `<div class="bezel">`
that skins may style or leave invisible.

---

## 5. Routes

| Route | Renders | Notes |
|---|---|---|
| `/` | Shivam's full dex entry | The single page. Sprite, types, stats, moves, encounters, ribbons, evolution, flavour text |
| `/become` | The submission builder | Form → prefilled GitHub issue URL |
| `/dex` | PC Box grid of every approved entry | Counter `REGISTERED n/151` |
| `/dex/[username]` | One person's entry | **Static page per entry.** Own OG card. This is why Astro was chosen — do not make it a modal. |
| `/resume` | Plain-text mode | Same data, no chrome, print-friendly. Linked from a `VIEW AS PLAIN TEXT` button in the header. |

Set in `astro.config.mjs`: `site: 'https://sm-dex.<tld>'`. If deploying before the domain is
bought, use `site: 'https://smresponsibilities.github.io'` and no `base` (root deployment).

---

## 6. Reference implementations

The non-obvious parts. Everything else is ordinary Astro.

### 6.1 `Ball.astro`

A working version already exists at `assets-preview/balls.html` — lift the `<symbol>` from it.

```astro
---
const { ball, reason } = Astro.props;
const TOP: Record<string,string> = {
  poke:'#EE1515', great:'#3B5CA8', ultra:'#2B2B2B', master:'#6E3D9E', nest:'#7BC24A',
  friend:'#57C25A', repeat:'#E8A33D', sport:'#D85C33', quick:'#3E8FD4',
  timer:'#F0F0F0', heavy:'#4A6B8A', luxury:'#1A1A1A', dive:'#4FB6D9',
};
---
<span class="ball-row" style={`--top:${TOP[ball]}`}>
  <svg width="20" height="20" viewBox="0 0 100 100" aria-hidden="true">
    <circle cx="50" cy="50" r="45" fill="#F4F4F4" stroke="var(--line)" stroke-width="5"/>
    <path d="M5,50 A45,45 0 0,1 95,50 Z" fill="var(--top)"/>
    <path d="M5,50 h90" stroke="var(--line)" stroke-width="7"/>
    <circle cx="50" cy="50" r="14" fill="#F4F4F4" stroke="var(--line)" stroke-width="6"/>
    <circle cx="50" cy="50" r="6" fill="#D8D8D8"/>
  </svg>
  <span class="ball-label">{ball.toUpperCase()} BALL · {reason}</span>
</span>
```

**The label is mandatory.** A ball icon must never render alone — nobody looks at a green ball
and infers "on-campus placement". Hover/tap adds the canon reason via `Term.astro`.

### 6.2 `Sprite.astro`

```astro
---
const { username, size = 160, shiny = false } = Astro.props;
const src = `https://avatars.githubusercontent.com/${username}?s=${size * 2}`;
---
<img src={src} width={size} height={size} loading="lazy"
     class:list={['sprite', { shiny }]}
     alt={`${username}'s sprite`} />
<style>
  .sprite { image-rendering: pixelated; border: var(--border-w) solid var(--border); }
  .sprite.shiny { filter: hue-rotate(140deg) saturate(1.4); }
  @media (prefers-reduced-motion: no-preference) {
    .sprite { animation: oscillate 1.6s ease-in-out infinite alternate; }
  }
  @keyframes oscillate { from { transform: translateY(2px); } to { transform: translateY(-2px); } }
</style>
```

Request at `size * 2` and display at `size` so it stays sharp on retina. Requesting the
GitHub avatar at a small `s=` and upscaling produces the pixelation for free — no canvas
needed for the basic treatment. **Ship this first.** The 4-tone dither described in `PLAN.md`
is a phase-5 enhancement, not a phase-3 blocker.

### 6.3 `StatBlock.astro` — read this before implementing

**A flaw in the earlier design was found while writing this spec, and the fix is below.**

The original idea was to `log10`-normalise all six stats onto one scale. That is wrong. The six
values are in incompatible units — 425 test suites and 5,000,000 Kafka events are not points on
a shared axis. Log-normalising them gives Defense a **12% bar** while Sp. Atk gets 94%, which
tells a recruiter the exact opposite of the truth: rigour is the user's strongest signal.

**Correct approach: each stat declares its own benchmark in `me.json`.**

```json
{ "key":"def", "label":"DEFENSE", "value":425, "unit":"test suites",
  "benchmark":500, "source":"Productivity Caller" }
```

```
fill = Math.min(1, value / benchmark)
```

The number is the content and is rendered large. The bar is secondary. The tooltip states the
benchmark explicitly — *"425 test suites. Bar is relative to 500."* — so the scale is declared
rather than invented.

Never render a bar whose scale is not stated. A bar with a hidden denominator is a lie with a
gradient on it.

### 6.4 `Term.astro` — the tooltip primitive

Every Pokédex term on the site goes through this. Native Popover API, no library.

```astro
---
const { label, tip } = Astro.props;
const id = `tip-${Math.random().toString(36).slice(2, 9)}`;
---
<button class="term" popovertarget={id} type="button">{label}</button>
<span popover id={id} role="tooltip" class="tip">{tip}</span>
<style>
  .term { font: inherit; color: inherit; background: none; border: 0; padding: 0;
          cursor: help; text-decoration: underline dotted; text-underline-offset: 3px; }
  .tip  { background: var(--panel); color: var(--ink);
          border: var(--border-w) solid var(--border); border-radius: var(--radius);
          padding: 8px 10px; max-width: 34ch; font-size: 13px; font-family: var(--font-body); }
</style>
```

Native popovers are top-layer, `Escape`-dismissible, light-dismiss on outside click, keyboard
reachable, and correctly announced. You get all of that for free. Do not rebuild it.

**Rule: a tooltip explains, it never stores.** No information may exist only inside a tooltip.

Minimum coverage — every one of these gets a `Term`:
`MOVES` · `PP` · `POWER` · `ACCURACY` · `TM` · `CAUGHT BY` · `RELEASED` · `Lv.` · `RIBBONS` ·
each type badge · each stat bar · `SPECIES` · `NATURE` · `OT` · each ball icon.

### 6.5 `StreamCanvas.astro`

One component, a `mode` prop. Build `stream`, `grass`, and `off` for launch.

```js
const canvas = document.querySelector('#bg');
const ctx = canvas.getContext('2d');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
let raf = null, t = 0;

function resize() {
  const dpr = Math.min(devicePixelRatio, 2);
  canvas.width  = canvas.clientWidth  * dpr;
  canvas.height = canvas.clientHeight * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function draw() {                       // mode: 'stream'
  const { clientWidth: w, clientHeight: h } = canvas;
  ctx.clearRect(0, 0, w, h);            // transparent — page bg shows through
  ctx.fillStyle = getComputedStyle(canvas).getPropertyValue('--stream').trim();
  ctx.globalAlpha = 0.22;
  for (let x = 0; x < w; x += 8) {
    const seed = (x * 0.06) + t * 0.02;
    const bar = 4 + Math.abs(Math.sin(seed) * Math.sin(seed * 0.37)) * (h * 0.5);
    ctx.fillRect(x, h - bar, 3, bar);
  }
  t += 1;
  raf = requestAnimationFrame(draw);
}

function start() { if (!raf && !document.hidden) raf = requestAnimationFrame(draw); }
function stop()  { if (raf) cancelAnimationFrame(raf), raf = null; }

resize();
addEventListener('resize', resize);
document.addEventListener('visibilitychange', () => document.hidden ? stop() : start());
reduce ? draw() && stop() : start();    // reduced motion: one static frame, no loop
```

Non-negotiable for every mode: **hero only** (bounded height, `overflow: hidden` — never the
full scroll height), transparent canvas, colour from `var(--stream)`, static single frame under
reduced motion, paused on `document.hidden`, low enough opacity that text contrast is unaffected
in **all** skins.

### 6.6 `lib/level.ts`

```ts
const START = new Date('2025-08-01');   // Morgan Stanley start
export function level(from: Date = START, to: Date = new Date()): number {
  const months = (to.getFullYear() - from.getFullYear()) * 12
               + (to.getMonth() - from.getMonth());
  return Math.max(0, Math.min(100, months));   // 1 month === 1 level, capped at 100
}
```

Computed at build time. It increments on its own and is never hand-edited.

### 6.7 Version selector

```js
const saved = localStorage.getItem('dex-version') || 'heartgold';
document.documentElement.dataset.version = saved;
select.addEventListener('change', e => {
  document.documentElement.dataset.version = e.target.value;
  localStorage.setItem('dex-version', e.target.value);
});
```

Set `data-version` in an inline `<head>` script **before first paint** to avoid a flash of the
wrong skin. The same value also selects which entry from `entries.json` is displayed.

---

## 7. The submission pipeline

### 7.1 `.github/ISSUE_TEMPLATE/become-a-pokemon.yml`

Field `id`s are the query-parameter names used by the prefill URL. **They must match `prefill.ts`
exactly.**

```yaml
name: Become a Pokémon
description: Add yourself to SM'S DEX
title: "[DEX] New species"
labels: ["submission"]
body:
  - type: markdown
    attributes:
      value: |
        Your GitHub username and avatar will appear publicly on the site and in a public
        repository. No email address, real name, or location is collected.
  - type: input
    id: username
    attributes: { label: GitHub username }
    validations: { required: true }
  - type: input
    id: species
    attributes: { label: Species, description: "e.g. Backend Pokémon" }
    validations: { required: true }
  - type: dropdown
    id: type1
    attributes:
      label: Primary type
      options: [normal, fire, water, electric, grass, ice, fighting, poison, ground,
                flying, psychic, bug, rock, ghost, dragon, dark, steel, fairy]
    validations: { required: true }
  - type: dropdown
    id: type2
    attributes:
      label: Secondary type (optional)
      options: [none, normal, fire, water, electric, grass, ice, fighting, poison, ground,
                flying, psychic, bug, rock, ghost, dragon, dark, steel, fairy]
  - type: textarea
    id: entry
    attributes: { label: Your dex entry, description: "Max 200 characters" }
    validations: { required: true }
  - type: input
    id: stats
    attributes: { label: Stats, description: "Auto-filled by the site. Format hp,atk,def,spa,spd,spe" }
  - type: input
    id: level
    attributes: { label: Level, description: "Months of professional experience" }
  - type: dropdown
    id: gender
    attributes: { label: Gender, options: [genderless, male, female] }
  - type: dropdown
    id: relation
    attributes: { label: How do we know each other?, options: [wild, caught, traded] }
```

### 7.2 `.github/workflows/roster.yml`

Two jobs. Validation runs on every submission; the commit runs only when **you** add the
`approved` label.

```yaml
name: Roster
on:
  issues:
    types: [opened, edited, labeled]

permissions:
  contents: write
  issues: write

jobs:
  validate:
    if: contains(github.event.issue.labels.*.name, 'submission')
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: stefanbuck/github-issue-parser@v3
        id: parse
        with:
          issue-body: ${{ github.event.issue.body }}
          template-path: .github/ISSUE_TEMPLATE/become-a-pokemon.yml
      - run: node scripts/validate-submission.mjs
        env:
          PAYLOAD: ${{ steps.parse.outputs.jsonString }}

  commit:
    if: github.event.action == 'labeled' && github.event.label.name == 'approved'
    needs: validate
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
        with: { persist-credentials: true }
      - uses: stefanbuck/github-issue-parser@v3
        id: parse
        with:
          issue-body: ${{ github.event.issue.body }}
          template-path: .github/ISSUE_TEMPLATE/become-a-pokemon.yml
      - run: node scripts/validate-submission.mjs --write
        env:
          PAYLOAD: ${{ steps.parse.outputs.jsonString }}
          ISSUE: ${{ github.event.issue.number }}
      - uses: stefanzweifel/git-auto-commit-action@v7
        with:
          commit_message: "dex: add ${{ github.event.issue.title }} (#${{ github.event.issue.number }})"
          file_pattern: src/data/roster.json
```

`github-issue-parser` v3+ **requires** `issue-body` to be passed explicitly — this is a
deliberate script-injection mitigation. Do not copy older v2 snippets that omit it.

### 7.3 `scripts/validate-submission.mjs`

Must enforce, and reject with a bot comment on failure:

1. `username` matches the GitHub username regex **and** `https://api.github.com/users/<name>`
   returns 200.
2. `type1` is one of the 18. `type2` is one of the 18 or `none`.
3. `entry` is ≤ 200 characters after trimming.
4. `species` is ≤ 40 characters.
5. `stats` parses to exactly six integers in `0..255`, and their sum is ≤ `120 + level * 6`.
6. `level` is an integer in `0..100`.
7. The username is not already present in `roster.json` — **reject duplicates**.
8. Every string is stripped of control characters and any leading `=`, `+`, `-`, `@`
   (spreadsheet-injection hygiene, since this data gets exported).

With `--write`, append to `src/data/roster.json`, set `shiny: (index + 1) % 10 === 0`, set
`added` to the current ISO date, and set `issue` to the source issue number.

**Treat every field as hostile input.** It is typed by strangers on the internet, and it is
rendered into HTML on the user's site.

### 7.4 `lib/prefill.ts`

```ts
export function prefillUrl(repo: string, d: Record<string, string>) {
  const q = new URLSearchParams({ template: 'become-a-pokemon.yml', ...d });
  return `https://github.com/${repo}/issues/new?${q}`;
}
```

Keys must equal the `id` values in the issue-form YAML. Payload is a few hundred characters —
well inside URL limits.

---

## 8. Phases and acceptance criteria

Ship phases 1–3 and deploy **before** starting phase 4. A live site with one great entry beats
a half-built community feature.

| # | Phase | Done when | Hrs |
|---|---|---|---|
| 1 | Scaffold | Astro builds; tokens + 1 skin; deploys to Pages on push; Lighthouse a11y ≥ 95 on an empty page | 3 |
| 2 | Device shell | Dual-screen layout; responsive at 375 / 768 / 1280 with **no horizontal scroll**; `<ClientRouter />` transitions; version selector persists across reloads with no flash | 5 |
| 3 | Your entry | `/` renders sprite, types, stats, moves L1+L2, encounters, ribbons, evolution, flavour text — all from JSON. No hard-coded content in components. | 4 |
| — | **Deploy** | Live and shareable | — |
| 4 | Community | `/become` builds a working prefill URL; issue → validate → label → commit → `/dex` shows the entry; `/dex/<user>` has its own OG image | 4 |
| 5 | Polish | Move L3; dither; sound toggle (default off); shiny; "Who's that Pokémon" once per session | 4 |
| 5b | **Legibility** | Every term in §6.4 has a tooltip; onboarding card shows once; `/resume` complete; full keyboard pass | 3 |
| 5c | Skins | 4 skins; **each passes WCAG AA contrast for body text**; background mode bound per skin | 3 |
| 6 | Ship | Custom domain, favicon, OG defaults, README documenting the Astro-over-Next decision | 1 |
| | | | **~30** |

---

## 9. Gotchas

Ranked by how much time each will cost if missed.

1. **Gen I skin contrast.** Green-on-green will fail WCAG AA. Darken the foreground token; do
   not ship the skin as-is because it looks authentic.
2. **Version-selector flash.** Set `data-version` in an inline `<head>` script before first
   paint, or every reload flashes the default skin.
3. **`site` must be set** in `astro.config.mjs` or OG image URLs and the sitemap come out
   relative and break every share card.
4. **Press Start 2P is display-only.** 8px multiples, headings and chrome only. Body copy in it
   is unreadable and is an accessibility failure, not a style choice.
5. **`github-issue-parser` v3 needs `issue-body` passed.** v2 snippets silently do the wrong
   thing.
6. **Canvas must be hero-bounded.** Animating behind 5,000px of scroll burns battery for an
   effect nobody below the fold sees.
7. **Duplicate submissions.** Same person submitting twice must be rejected by username, or the
   dex fills with copies.
8. **`getCollection` returns `{ id, data }`.** Fields are on `.data`, not the top level.
9. **Avatar 404s.** A deleted GitHub account leaves a broken image. Give `Sprite.astro` an
   `onerror` fallback to the `UNIDENTIFIED SPECIES` frame.
10. **Never render a stat bar without its stated benchmark** (§6.3).

---

## 10. Content still to be supplied

Build against placeholders. None of these block phases 1–3.

| Item | Goes in |
|---|---|
| Nature (25 options in `SPEC.md` §7.5) | `me.json` |
| Weaknesses / resistances / immunity | `me.json` |
| 3 project links | `moves.json` |
| 3–5 personal facts | `entries.json` |
| Domain | `astro.config.mjs` |

Locked and ready to hard-code now: name **Shivam Mahajan**, species **Humanoid Pokémon**, title
**Software Developer**, types **Dragon/Steel**, status **RELEASED**, gender **genderless**,
HT/WT **6'00" / 169.8 lbs**, OT **Morgan Stanley (2025)**, ball **Nest Ball — on-campus**,
site name **SM'S DEX**, GitHub **smresponsibilities**.
