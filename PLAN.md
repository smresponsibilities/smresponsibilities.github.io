# Pokédex Portfolio — Research & Build Plan

Status: pre-build research. Nothing implemented yet.
Researched: 2026-08-19. All URLs below were fetched live and returned 200.

---

## 0. Decisions locked so far

| # | Decision | Status |
|---|---|---|
| Audience | **Recruiters + friends, both matter.** Full commitment to the bit, plus a `VIEW AS PLAIN TEXT` button and a `/resume` route as the escape hatch. | ✅ locked |
| Sprite | **GitHub avatar only.** DiceBear and Kenney trainer-gallery both researched and rejected. Zero bytes. | ✅ locked |
| Visual effects | Codédex-style pixel/retro treatment. Recipe reverse-engineered in §8. | ✅ locked |
| Framework | **Astro.** User targets frontend+backend both, fine defending choice in README. Not Next-exclusive. | ✅ locked |
| Generation / shell | **All 8 distinct dex designs**, added over time. One layout, swappable skins. See §9.1. | ✅ locked |
| Legibility | **Hover/tap tooltips on every Pokédex term + first-visit onboarding.** Raised as priority. See §7.5. | ✅ locked |
| Identity | Shivam Mahajan · Software Developer · "Humanoid Pokémon" · `smresponsibilities` | ✅ locked |
| Level system | **1 month professional experience = 1 level.** Computed at build. Currently Lv. 12. | ✅ locked |
| Status system | **CAUGHT** (at a company) / **RELEASED** (was, now free) / **UNCAUGHT** (never). User's own idea. | ✅ locked |
| Typing | **Dragon / Steel.** Visitors pick their own on the form. | ✅ locked |
| Status | **RELEASED** — apprenticeship complete, available. | ✅ locked |
| Stats | **Counted, not rated.** Six real numbers from the resume, no self-assessment. | ✅ locked |
| Background | **Pluggable canvas-2D animation, hero only. 5 modes.** See §8.6–8.7. | ✅ locked |
| Content spec | Character sheet drafted from resume → `SPEC.md` | 🟡 awaiting links + facts |
| Prose style | Chat replies use caveman mode, enforced hard once planning ends. Docs like this one stay normal prose. | ✅ locked |

---

## 1. The one decision that solves everything

**Your GitHub avatar is your sprite.**

You asked for three separate things — free hosting, no image storage, and "make a GitHub
profile compulsory." They collapse into a single design choice:

- Every creature on the site (you, your friends, visitors) is rendered from
  `https://github.com/<username>.png?size=200`.
- Verified: returns `302` → `https://avatars.githubusercontent.com/u/<id>?s=200&v=4`, ~8 KB JPEG.
- `image-rendering: pixelated` + a downscale to ~64px + a 2px border and drop shadow makes
  any avatar read as a Gen-1 sprite. This is ~6 lines of CSS.

What this buys you:

| Problem | Solved by |
|---|---|
| Zero image storage | GitHub's CDN hosts every avatar, forever, free |
| GitHub profile compulsory | It's *load-bearing* — no avatar, no sprite, no entry |
| Spam / fake entries | A GitHub account is the cost of entry |
| Copyright risk | You ship zero Nintendo pixels (see §5) |
| Moderation | You already see the username before you approve |

### 1.1 Sprites — GitHub avatar, and nothing else

Two alternative systems were researched in full and both were rejected:

| Candidate | Verified | Rejected because |
|---|---|---|
| **DiceBear `pixel-art`** | CC0, 16×16 `crispEdges` SVG, 2.4 KB, npm `@dicebear/collection` MIT v9.4.2 | You didn't like the art |
| **Kenney Roguelike Characters** | 450 sprites, CC0, no attribution | You called the sprites bad |

**Final: the GitHub avatar.** This is the right end state, not a fallback:

- **Literally zero bytes stored.** Your original requirement, fully intact — no spritesheet, no
  generated files, no per-user uploads, ever.
- **No picker to build.** The sprite is derived from the username they already typed. One less
  control on the form, one less thing to design, one less thing to maintain.
- **It's actually them.** A chosen preset is a costume. An avatar is a person.
- GitHub stays load-bearing — no account, no sprite, no entry.

Treatment: dither if the avatar is a photo (4-tone, Game Boy style — plain pixelation turns
faces to mush at 64 px), plain `image-rendering: pixelated` if it's illustration or a logo.

People who never set an avatar get GitHub's identicon, which already looks more like a sprite
than most photos do. Framed as **`UNIDENTIFIED SPECIES`** with a distinct border, the fallback
becomes a feature instead of a gap.

Everything else in this plan follows from that.

---

## 2. Asset research

### 2.1 Verified sources

| Asset | URL pattern | Size | License / risk |
|---|---|---|---|
| **Avatars (your sprites)** | `github.com/<user>.png?size=200` | ~8 KB | Yours & your friends' own images. Clean. |
| **Type icons (SVG)** | `cdn.jsdelivr.net/gh/duiker101/pokemon-type-svg-icons@master/icons/fire.svg` | 1.3 KB | ⚠️ **No license file** on the repo. Redraw or use CSS/emoji instead. |
| **Type name list** | `pokeapi.co/api/v2/type` | 1.3 KB | Data only, no images. Fine. |
| **PokéAPI sprites** | `cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites/pokemon/25.png` | 597 B | Nintendo IP. See §5. |
| **Official artwork** | `.../sprites/pokemon/other/official-artwork/25.png` | **118 KB** | Nintendo IP + heavy. Avoid. |
| **Showdown animated** | `play.pokemonshowdown.com/sprites/gen5ani/pikachu.gif` | 27 KB | Nintendo IP + fan artists require credit. Avoid. |
| **Fonts** | Google Fonts: `Press Start 2P`, `Silkscreen`, `VT323` | — | SIL OFL. Free commercial use. Clean. |

Font note: Press Start 2P works only at 8px multiples and is display-only — it is unreadable
for body copy. Use it for headings and the Pokédex chrome, and a normal system font stack for
paragraphs. This is an accessibility floor, not a style preference.

### 2.2 Type colors — hardcode these, don't fetch them

```
normal #A8A77A   fire #EE8130      water #6390F0    electric #F7D02C   grass #7AC74C
ice #96D9D6      fighting #C22E28  poison #A33EA1   ground #E2BF65     flying #A98FF3
psychic #F95587  bug #A6B91A       rock #B6A136     ghost #735797      dragon #6F35FC
dark #705746     steel #B7B7CE     fairy #D685AD
```

18 values. A build-time fetch to PokéAPI for this would be pure ceremony.

### 2.4 Ball assets — "get the OG sprites"

You asked for the original sprites and assets. The concrete need is **ball icons** for the
encounter section, since ball type now encodes how you got each job.

**All 13 ball sprites verified live** on the PokéAPI CDN, ~280 bytes each:

```
cdn.jsdelivr.net/gh/PokeAPI/sprites@master/sprites/items/nest-ball.png
poke · great · ultra · master · nest · friend · repeat · sport
quick · timer · heavy · luxury · dive          — all 200 OK
```

So they're available. But **don't use them**, for a reason that isn't primarily legal:

**A Poké Ball is a circle with a stripe and a button.** It is one of the most trivially
drawable objects in UI design — roughly eight SVG elements. Draw it once, and all thirteen
variants come free by swapping two CSS custom properties:

```css
.ball            { --top:#EE1515; --btm:#F0F0F0; }  /* Poké   */
[data-ball=nest]   { --top:#7BC24A; --btm:#F0F0F0; }
[data-ball=friend] { --top:#57C25A; --btm:#F0F0F0; }
[data-ball=repeat] { --top:#E8A33D; --btm:#F0F0F0; }
[data-ball=sport]  { --top:#D85C33; --btm:#F0F0F0; }
```

What drawing them buys over hotlinking:

- **Crisp at every size.** The PNGs are ~30 px; an SVG scales to the header and to a 16 px inline badge.
- **Reskins with the version selector.** A hotlinked PNG is fixed forever; an SVG inherits your tokens.
- **13 balls for the price of one.** Add Dusk, Premier, Heal later for free.
- **Zero bytes, zero requests, zero third-party dependency.**
- **Zero IP exposure**, which matters more here than elsewhere because ball icons would appear
  next to real employer names.

Same answer for type icons (§2.1) and the dex chrome: the Pokédex *visual language* — stripes,
bezels, stat bars, badges — is geometry, and geometry is cheap. What isn't cheap to redraw is
**creature art**, which is exactly why the sprite is your GitHub avatar (§1.1).

If you want one authentic sprite as an easter egg — a 404 page, a hidden entry — hotlink it
from the jsDelivr URL above rather than committing it. Consumer, not redistributor.

### 2.3 What NOT to use

- **PokéAPI's full `/pokemon/25` endpoint** — 290 KB of JSON for one creature. You need
  none of it. Your data is your own.
- **`raw.githubusercontent.com` as a CDN** — works (verified 200), but it isn't a CDN and
  GitHub throttles it. Use `cdn.jsdelivr.net/gh/...` if you hotlink anything from a repo.

---

## 3. Hosting & the submission form

### 3.1 Hosting — GitHub Pages

| Limit | Value | Your reality |
|---|---|---|
| Repo size | 1 GB recommended | You'll be under 5 MB — no images stored |
| Site size | 1 GB hard | Same |
| Bandwidth | 100 GB/mo soft | A portfolio will not approach this |
| Builds | 10/hr soft — **waived** with a custom Actions workflow | Non-issue |
| Actions minutes | **Free & unlimited on public repos** | Non-issue |
| Cost | **$0** | — |

Caveat: GitHub Pages' terms prohibit commercial operations / e-commerce / SaaS. A personal
portfolio is fine.

Alternative if you ever want unlimited bandwidth or commercial use: **Cloudflare Pages** —
free tier is unlimited bandwidth, 500 builds/mo, commercial use allowed. Vercel's free tier
is hobby-only (no commercial use), so it's the weakest fit here.

Recommendation: **GitHub Pages**. Everything already lives on GitHub; adding a second vendor
buys nothing today. Moving to Cloudflare Pages later is a 10-minute job.

### 3.2 The "become a Pokémon" form — no backend, no database

The instinct is Supabase or a form service. Both are worse here.

Supabase free tier, for the record: 500 MB DB, 5 GB egress, **pauses after 7 days of
inactivity** with a ~30s cold wake. For a form that gets a handful of submissions a month,
you'd be running a permanently-asleep database plus a login flow you have to build.

**Use GitHub Issue Forms instead.** The whole pipeline:

```
Visitor clicks "Become a Pokémon"
  → github.com/<you>/<repo>/issues/new?template=become-a-pokemon.yml
  → GitHub's own UI renders your YAML form (must be logged in ✅)
  → they submit → GitHub Action fires
  → stefanbuck/github-issue-parser@v3 turns the issue body into JSON
  → action validates the username and fields, comments if invalid
  → you add the `approved` label (one click, works in the GitHub mobile app)
  → action appends to src/data/roster.json and commits to main
  → Pages rebuilds → they're in the dex
```

What you did not build: a database, an auth flow, a spam filter, an admin panel, a moderation
queue, a file upload path, an email pipeline. GitHub provides all of it. Cost: $0.

Note: v3+ of the parser requires passing the issue body explicitly as an input — a deliberate
script-injection mitigation. Use v3 syntax; don't copy older v2 snippets.

You can also prefill fields from a URL (`?template=x.yml&field_id=value`) if you want a
"tag a friend" share link.

### 3.3 Visitor stats — allocate or randomise

Visitors get a **stat budget from their level** and either distribute it themselves or roll it.

```
budget = 120 + (level × 6)          level = months of experience, same rule as yours
```

Six sliders, live total, can't exceed budget. Plus a **[ RANDOMISE ]** button that rolls a
valid distribution instantly — which is what most people will actually press, and it means
nobody bounces off a form asking them to rate themselves.

**One renderer, two sources.** The stat panel takes six numbers 0–255 and doesn't care where
they came from:

| Whose | Source | Tooltip says |
|---|---|---|
| Yours | Real counts, `log10`-scaled (§4 of SPEC) | "425 test suites" |
| Visitors' | Self-allocated or randomised | "Self-assigned" |

Same component, same bars. Only the tooltip differs — so the honest asymmetry is visible
without needing two implementations.

### 3.3.1 Where the builder lives — and why GitHub still works

Sliders and a live avatar preview can't exist inside a GitHub Issue Form. So they don't.

**The fun UI lives on your static site. GitHub is only the transport.**

```
Site: /become  →  GitHub username · 2 types · 6 stat sliders + [RANDOMISE] · dex entry
                        ↓  [ SUBMIT TO DEX ]
        prefilled URL:  github.com/…/issues/new?template=become-a-pokemon.yml&stats=…&types=…
                        ↓
        GitHub renders the form already filled in — login required ✅
                        ↓
        Action validates  →  you add the `approved` label  →  Action commits roster.json  →  live
```

Sprite needs no picker — it's their GitHub avatar, derived from the username they already
typed. One less control on the form.

GitHub still provides auth, spam resistance, and moderation. The builder provides everything
GitHub's form UI can't. Payload is a few hundred characters, far inside URL limits.

Verified earlier: issue-form fields prefill from query params matching the field `id`s.

### 3.4 Form fields

| Field | Type | Why |
|---|---|---|
| GitHub username | input, required | Drives the sprite. The whole hook. |
| Species name | input | Their Pokémon name |
| Type 1 / Type 2 | dropdown ×2 | From the 18. Type 2 optional. |
| Pokédex entry | textarea, ~200 char | One-line bio, in Pokédex voice |
| Moves | textarea, up to 4 | Their skills |
| Signature stat | dropdown | HP / ATK / DEF / SP.ATK / SP.DEF / SPEED |
| How we met | dropdown | Powers the "trainer" relationship |

Validate in the Action: username resolves to a real account (`api.github.com/users/<x>`
returns 200), types are in the allowed list of 18, lengths capped. Reject with a bot comment
otherwise. Roughly 40 lines of `github-script`.

---

## 4. Tech stack

**Astro + plain CSS. No UI framework, no Tailwind, no CMS, no database.**

Astro 6 is current (6.3.1, stable since Feb 2026). Why it earns its place:

- Ships static HTML with zero JS by default — a Pokédex is 95% static content
- Content collections read your `projects.json` / `roster.json` with type safety
- Per-entry static pages → **real OpenGraph cards when someone shares their Pokémon.**
  This is the one thing client-side rendering genuinely cannot give you, and it's what makes
  the community angle actually spread.
- `<ClientRouter />` gives browser-native view transitions in ~3 KB — the slide-between-
  entries animation is nearly free

Skipped: React (nothing here needs a component runtime), Tailwind (a Pokédex is one bespoke
design system; utility classes fight you), any CMS (your data is 5 JSON files).

**Even lazier fallback:** plain HTML + CSS + one `fetch('roster.json')`. Zero build, zero
`node_modules`. You lose per-entry URLs and OG cards. Take this only if you want the site
done this weekend and don't care about shareability.

### Data shape — 5 files, that's the whole "backend"

```
src/data/
  me.json          # your stats, height/weight/species flavor, type(s)
  moves.json       # projects → name, type, power, PP, description, links
  encounters.json  # experience → "Caught by <Company>", ball type, date range, location
  entries.json     # facts → the Pokédex flavor text lines
  roster.json      # community submissions (the Action writes here)
```

### The metaphor mapping

| Pokédex | Your portfolio |
|---|---|
| Species / types | You + your two strongest domains |
| Stats (HP/ATK/DEF/SPD…) | Skill bars — keep them honest, recruiters read these |
| **Moves** | **Projects.** Type = tech domain, Power = scope/impact, PP = time invested, description = what it did |
| **Caught by** | **Experience.** Ball type = seniority, location = city, "Met at Lv. 12" = career stage |
| Pokédex entry | Your facts, in that dry third-person Pokédex voice |
| Evolution chain | Career progression — junior → mid → senior |
| Abilities | Soft skills / working style |
| Held item | Current tool of choice |
| Trainer roster | Everyone who filled the form |

The Pokédex voice is the whole joke — commit to it. "It is said that this one has not pushed
to `main` directly since the incident of 2024."

---

## 5. Legal — read this once, then stop worrying

The honest position: **Pokémon sprites, names, and creature designs are Nintendo / Game Freak /
The Pokémon Company IP.** Fan projects are infringing-but-usually-tolerated; Nintendo has
issued 500+ DMCA takedowns in a single sweep before. Disclaimers do not confer legal
protection. Hosting sprites on a portfolio carries the same exposure as hosting them anywhere.

The realistic risk for a personal portfolio using a few sprites is very low — nobody has been
sued over a résumé. But "low" isn't "zero," and there's a version with genuinely zero risk
that is also *better*:

**Ship no Nintendo assets at all.** The Pokédex *interface* — a red device, a scan line, a
stat bar, a type badge, a numbered entry — is a visual language you can build from scratch in
CSS. The creature art is everyone's GitHub avatar. You get 100% of the charm, 0% of the IP,
and you avoid a portfolio whose main visual asset is someone else's art.

Practical rules:

- ✅ Pokédex-style UI, type system, stat bars, move tables, the voice, "Caught by"
- ✅ Avatars as sprites, OFL pixel fonts, your own drawn icons
- ⚠️ Naming the site literally "Pokédex" — call it a *Devdex*, *Codedex*, *Portfolio Index*
- ❌ Shipping Pikachu, official artwork, game music, the Poké Ball logo, the logotype

If you want a real sprite somewhere (an easter egg, a 404 page), hotlink it from
`cdn.jsdelivr.net/gh/PokeAPI/sprites@master/...` rather than committing it — you're then a
consumer of a public fan resource, not a redistributor.

---

## 6. Build plan & time

Estimates are **focused working hours** for one person who knows the web but is learning Astro
along the way. Add ~40% if Astro is brand new to you.

| # | Phase | What | Hours |
|---|---|---|---|
| 0 | **Content** | Write your stats, 6–8 moves, encounters, 10 Pokédex facts. **This is the real bottleneck — do it first, in a text file, before any code.** | 3 |
| 1 | Scaffold | `git init`, Astro, fonts, type-color tokens, the 18 badges, Pages deploy on push | 3 |
| 2 | Dex shell | Grid/list view, detail view, keyboard nav (↑↓ + Enter), view transitions, device chrome | 5 |
| 3 | Your entry | Stat bars, moves table, Caught-by timeline, entry text, evolution chain | 4 |
| 4 | Community | `/become` builder page, issue form YAML, validate Action, label-triggered commit, `/dex` roster, share links | 4 |
| 5 | Polish | Mobile layout, focus rings + reduced-motion + alt text, per-entry OG images, optional select beep | 4 |
| 5b | **Legibility** | Tooltips on every dex term (native Popover API), first-visit onboarding card, `VIEW AS PLAIN TEXT` mode | **3** |
| 5c | Version skins | 4 skins at launch over one layout, merged with the flavour-text version selector. Remaining 4 are additive. | **3** |
| 6 | Ship | Custom domain, favicon, meta, README | 1 |
| | **Total** | | **~30 h** |

Calendar: **one focused weekend** for a live v1 (phases 0–3 + deploy ≈ 15 h), then phases 4–5c
across the following week of evenings. Realistically **8–12 days** from start to shareable.

Phase 0 is now largely done — `SPEC.md` drafts your content from your resume. It needs your
corrections, not authoring from scratch.

### Order matters

Do **0 → 1 → 2 → 3 → deploy** and put it live before touching phase 4. A portfolio with one
great entry beats a half-built community feature, and shipping early means the form launches
onto a site that already looks finished.

### Cut list if time is short

- Evolution chain — nice, not load-bearing
- Sound effects — 20 min of fun, an accessibility liability if autoplayed
- Per-entry OG images — hardcode one good default card instead
- Search / filter — you have ~8 moves; scrolling is fine (add it past ~30 roster entries)

---

## 7. Open questions

1. **Name** — avoid "Pokédex" in the title/domain. What do you want to call it?
2. **Your types** — pick your two. This sets the whole color scheme.
3. **Domain** — `<user>.github.io` free, or buy one (~$10/yr, the only possible cost)?
4. **Roster moderation** — auto-merge valid submissions, or approve each one? (Recommend:
   approve. It's one click and it's your name on the site.)
5. **Zero-build fallback** — plain HTML instead of Astro, to ship faster?

---

## 7.4 Move density — how 12 fields render without a wall of text

Fair catch: a move carries twelve fields, and four moves × twelve fields is a spreadsheet.

**The games already solved this, and the solution is why the Gen 4/5 layout was the right
pick.** In the real games the move list shows almost nothing — name, type, PP — and you press
a button to see the rest. Progressive disclosure is canon behaviour, not a compromise.

### Three levels

**Level 1 — the row.** Four fields. This is all four moves ever show at rest.

```
  ⚡ PRODUCTIVITY CALLER                          PP 30/30
  🐉 CHAINCODE                                    PP  0/15
  ⚡ QUIZDECK                                     PP  0/10
  ⚙ TM01 · CIAM WAREHOUSE                        PP  —
```

**Level 2 — selected.** Renders in the **bottom screen** while the list stays in the top one.
Nothing is hidden, nothing scrolled past. Adds Power, Accuracy, Category, and one line of
effect text.

```
  ┌─ PRODUCTIVITY CALLER ──────────────────────┐
  │ ELECTRIC · PHYSICAL                        │
  │ POWER 95    ACCURACY 100    PP 30/30       │
  │                                            │
  │ Replaces push notifications with native    │
  │ phone calls. +35% task completion.         │
  │                              [ ▾ MORE ]    │
  └────────────────────────────────────────────┘
```

**Level 3 — expanded.** Only on request. Tech stack, level learned, contact, target, links.

### The rules that keep it sparse

- **Empty fields don't render.** A move with no TM number shows no TM row — not a blank one.
  Most moves will fill six or seven of the twelve.
- **Only one move is expanded at a time.** Selecting another collapses the previous.
- **Level 1 must fit without scrolling** on a 375 px viewport. If it doesn't, cut a field from
  the row, not from the data.
- Level 2 is capped at one line of effect text. Everything longer lives in Level 3.

This is also why four moves is the right constraint. Nine projects would break Level 1 on
mobile no matter how it's laid out.

---

## 7.45 Site structure

You described it as a single page. That is right for **your** entry — but sharing needs URLs,
so here is the actual shape:

```
/                    ← YOU. The single page. Full dex entry, everything on one screen.
/become              ← the form. Username · 2 types · 6 stat sliders + RANDOMISE · dex entry
/dex                 ← ALL APPROVED. PC Box grid, every registered species
/dex/<username>      ← one person's entry — shareable link, own OpenGraph card
/resume              ← plain-text mode, print-friendly
```

Five routes, but only two are places a visitor deliberately navigates to. `/` is genuinely the
single page you described.

**Why `/dex/<username>` is a real page and not a modal:** it is the entire reason Astro was
chosen. When someone shares "look, I'm in Shivam's dex," the link has to unfurl with *their*
sprite and *their* name in the preview card. A modal on `/dex` cannot do that — and that share
is the mechanism by which the roster grows.

End to end:

```
visitor → /become → fills form → prefilled GitHub issue → submits (login required)
        → Action validates → you add the `approved` label → Action commits → live at /dex
```

---

## 7.5 Legibility — PRIORITY

**Requirement:** hovering anything explains what it is and how to use it. Raised as a priority,
treated as one.

This is not polish, it's load-bearing. The whole site is a metaphor, and **a metaphor nobody
decodes is just confusion.** A recruiter who doesn't know that MOVES means projects, or that
`PP 0/15` means archived, sees decoration instead of information. Every clever mapping in
SPEC.md is a liability until it explains itself.

### 7.5.1 Term tooltips

Every Pokédex term carries its translation. Hover on desktop, tap on touch, focus on keyboard.

| Term | Tooltip |
|---|---|
| **Ball icon** | **Never shown bare.** Always `NEST BALL · On-campus`; hover or tap gives the full canon reason. |
| MOVES | Projects. Power = impact, PP = how actively maintained. |
| PP 30/30 | Actively maintained. `0/x` means archived. |
| TM | Taught by an employer — work project, not personal. |
| CAUGHT BY | Where I've worked. |
| RELEASED | Not currently at a company. Available. |
| Lv. 12 | One level per month of professional experience. Updates itself. |
| RIBBONS | Achievements and awards. |
| Type badge | Technical domain. Hover any badge for what it maps to. |
| Stat bars | Self-rated skills. Hover for what each stat means. |
| Species | Job classification, in Pokédex format. |

### 7.5.2 Build it with the native Popover API — no library

`popover` + `popovertarget` is baseline in all modern browsers. Zero JS, zero dependency, and
it's accessible by default: keyboard-triggerable, escape-dismissible, correctly announced by
screen readers, and top-layer so it never gets clipped by `overflow: hidden`.

```html
<button popovertarget="tip-moves" class="dex-term">MOVES</button>
<span popover id="tip-moves" role="tooltip">
  Projects. Power = impact. PP = how actively maintained.
</span>
```

Explicitly rejected:
- **`title=""`** — invisible on touch, unreliable for screen readers, un-styleable, 1-second delay.
- **Tippy.js / Floating UI / any tooltip library** — 10 KB+ to reimplement a browser feature.
- **Custom JS tooltips** — you rebuild focus management and dismissal, and get them wrong.

### 7.5.3 First-visit onboarding

One dismissable card on first load: **"HOW TO READ THIS DEX"** — four lines mapping
MOVES → projects, CAUGHT BY → jobs, STATS → skills, RIBBONS → achievements. Stored in
`localStorage`, never shown twice. Plus a permanent `?` button in the chrome that reopens it.

### 7.5.4 The other half of legibility

Tooltips help people who engage. The `VIEW AS PLAIN TEXT` escape hatch (§I2) helps people who
won't. **Both ship, and they are the same requirement approached from two directions.** Neither
substitutes for the other.

### 7.5.5 Non-negotiables

- Tooltips reachable by keyboard `Tab`, dismissed by `Escape`
- Touch = tap to open, tap-outside to close. Never hover-only.
- Never hide information that only exists inside a tooltip — tooltips explain, they don't store
- All interactive terms visibly marked as interactive (dotted underline), not discovered by accident
- Contrast passes WCAG AA in every skin

**Cost: +3 h.** Folded into phase 5. Non-optional.

---

## 8. Codédex effects — reverse-engineered

Inspected `codedex.io` live in a browser and pulled the real computed styles. The verdict:
**the entire aesthetic is plain CSS.** No library, no framework feature, no WebGL. Every
effect below is portable to Astro, Next, or a plain HTML file without change — which means
"I want effects like Codédex" does **not** decide the framework question.

### 8.1 Their actual palette

Tailwind slate for the night sky, gold and blue as accents:

```
--bg-deep    #020617   /* slate-950 — the page ground */
--bg-panel   #1E293B   /* slate-800 — cards, panels */
--border     #475569   /* slate-600 — the 2px chunky border */
--gold       #FACC15   /* yellow-400 — coins, highlights */
--gold-deep  #CA8A04   /* yellow-600 — pressed/shadow state */
--blue       #14ADFF   /* the glow accent */
--blue-deep  #0065AB
```

Note this is a **dark** palette. Worth knowing before you pick a generation in §9 — Gen 1's
green LCD and Gen 3's red plastic both fight this; the Gen 4/5 DS and modern shells sit on it
naturally.

### 8.2 The structural tells

- **`border: 2px solid #475569`** everywhere. Chunky, uniform, never 1px.
- **`border-radius: 4px`** — barely rounded. Enough to feel soft, small enough to stay pixel.
- **Round pills at `100px`/`200px` radius** for buttons and tags, as deliberate contrast.
- Almost **no drop shadows** — one `0 0 5px rgba(0,0,0,.5)`. The depth comes from the borders
  and the flat panel colours, not from blur. Copy this; it's why it reads as pixel art
  instead of "flat design with a retro font."

### 8.3 The animations, in full

Every one of these is under 8 lines. This is the whole effects budget of that site.

```css
/* scrolling starfield — the parallax sky */
@keyframes skyMove   { 0% { background-position: 0 center; }
                     100% { background-position: 1050px center; } }

/* idle sprite bob — exactly the Pokémon idle animation */
@keyframes oscillate { 0% { top: 5px; } 100% { top: -5px; } }

/* pulsing glow on interactive elements */
@keyframes glowing   { 0%,100% { background:#209CEE; box-shadow:0 0 5px  #209CEE; }
                        50%     { background:#057AC7; box-shadow:0 0 5px  #057AC7; } }

@keyframes glowing-white { 0%,100% { background:rgba(255,255,255,.7);
                                     box-shadow:0 0 5px  rgba(255,255,255,.7); }
                            50%    { background:#fff; box-shadow:0 0 20px #fff; } }

/* terminal cursor */
@keyframes blink     { 0% { opacity:1; } 50% { opacity:0; } }

/* animated gradient sweep */
@keyframes rainbow   { 0%,50%,100% { background-position:100% 50%; }
                       25%         { background-position:0%   20%; }
                       75%         { background-position:0%   60%; } }
```

They also use the classic **`box-shadow` pixel-art trick** — one 6px `div` with a long list of
`box-shadow` offsets draws an entire animated sprite in pure CSS, zero images. Worth one
easter egg somewhere.

### 8.4 Their typography — confirms the plan

| Role | Codédex uses | Our equivalent |
|---|---|---|
| Display / headings | **Press Start 2P**, Dogica, custom PixelGrid S/M/XL | Press Start 2P (already chosen, SIL OFL) |
| Body copy | **Mulish** — a normal, readable sans | Any readable sans / system stack |

Independent confirmation of the §2.1 rule: pixel font for chrome and headings, real font for
anything you expect a person to read a paragraph of.

### 8.6 Moving background — thavlik.dev, inspected

Reference: **thavlik.dev** — "Thomas Havlik // Computational Medicine". Inspected live in a
browser. Findings, since several differ from the description:

| | Reality |
|---|---|
| The effect | **An EEG waveform, not a spectrogram.** The classes are literally `eeg-background` and `eeg-container`. |
| Tech | **Canvas 2D.** Not WebGL, not SVG, not CSS. `getContext('2d')` is live, `webgl` is null. |
| Libraries | **None.** No three.js, no d3, no p5, no particle library. Zero external scripts. |
| Canvas backing | **Transparent.** The page's own `#0B0E12` shows through; traces draw on top. |
| Coverage | **Hero only — 750 px tall.** The page is 4,950 px. The animation covers ~15% of it. |
| Container | `position: absolute; z-index: 0`, inside a `position: relative; overflow: hidden` wrapper |
| Typography | **System sans stack.** No custom font anywhere on the site. |
| Reduced motion | **Handled** — 3 `prefers-reduced-motion` media rules present |
| Framework | Svelte |

Four things worth stealing, in order of value:

1. **Hero only, not the whole page.** This is the most important one and the easiest to get
   wrong. A canvas animating behind 5,000 px of scroll costs battery for an effect nobody sees
   below the fold. Bound it, `overflow: hidden`, done.
2. **Canvas 2D with no library.** He gets a signature effect with zero dependencies. So can we.
3. **Transparent canvas over the page background.** The theme shows through, so the effect
   inherits the palette instead of fighting it — which means ours reskins for free across all
   four version skins in §9.1 with no extra work.
4. **Reduced motion is handled.** Non-negotiable, already in our list.

### 8.6.1 The design note that matters

His site is typographically **plain** — a system font stack, no display face, restrained
colour. The EEG carries all of the personality, so it can afford to be prominent.

Ours is the opposite. Pixel display fonts, 18 type colours, badges, stat bars, a device
chrome, multiple skins, a sprite. **The site is already visually loud.** A background of equal
intensity would compete with the content instead of supporting it.

So: same technique, **lower amplitude.** Low opacity, slow, small, behind the device. If you
notice it before you notice the Pokédex, it's turned up too far.

### 8.6.2 Ours: an event stream

Same principle he used — *the background is your subject matter*. His is brain activity. Yours
is **streaming data**: 5M+ Kafka events, 4 PySpark workflows, daily ETL, load-tested to 1M users.

So the backdrop is a **live event stream** — a slow horizontal flow of small blips at varying
heights, reading as throughput. It says what you do before anyone reads a word, and behind a
Pokédex it doubles as "the device is processing something."

Two implementations:

**1. Pure CSS, zero JS** — the Codédex `skyMove` trick. Take this if the canvas ever feels
like too much.

```css
.stream {
  background: repeating-linear-gradient(90deg,
    transparent 0 6px, var(--stream) 6px 8px, transparent 8px 22px);
  animation: skyMove 40s linear infinite;
}
```

**2. Canvas 2D, ~40 lines** — matches thavlik's approach. Needed for varying bar heights, which
is what makes it read as real throughput rather than a repeating pattern. Recommended.

Non-negotiables:

- Hero only, `overflow: hidden`, never the full scroll height
- Transparent canvas; colour from `var(--stream)` so skins drive it
- `prefers-reduced-motion` → render one static frame, no loop
- Pause on `document.hidden`
- Low opacity; **must never reduce text contrast** in any skin

⏭️ Skipped: WebGL, particle libraries, three.js. thavlik.dev doesn't use them either, and it's
the reference.

### 8.7 Background modes — generic, with options

You asked to make it generic or give options. Both: **one canvas component, a `mode` prop.**

```js
<StreamCanvas mode="stream" />   // swap the string, nothing else changes
```

Each mode is a single draw function — same loop, same sizing, same lifecycle, same
reduced-motion and visibility handling. Adding a sixth is ~20 lines.

| Mode | Looks like | Why it might be the one |
|---|---|---|
| **`stream`** ⭐ | Horizontal flow of blips at varying heights | **Your subject matter.** 5M Kafka events. Same logic that makes the EEG work on thavlik.dev. |
| **`pipeline`** ⭐ | Packets travelling along branching pipes | Even more literally your work — ETL, 4 workflows, 20+ jobs |
| **`grass`** | Scrolling tall grass, parallax layers | The most *Pokémon* option. Wild encounters happen in tall grass. |
| **`stars`** | Drifting starfield | The Codédex `skyMove` trick. Cheapest — pure CSS, no canvas at all. |
| **`wave`** | Continuous waveform trace | Closest to the EEG on thavlik.dev. Reads as "a machine is monitoring something". |
| **`network`** | Nodes and edges, pulses along links | Distributed systems. Fits Dragon/Steel. |
| **`terminal`** | Scrolling log lines, blinking cursor | Reads instantly as "engineer". Pairs with the `blink` keyframe. |
| **`matrix`** | Vertical character rain | Obvious, but people love it. |
| **`circuit`** | PCB traces with travelling current | Pairs perfectly with the Steel type. |
| **`rain`** | Weather overlay | Canon — Pokémon has weather. Good for a Water skin. |
| **`snow`** | Drifting flakes | Same idea, Ice-flavoured. Nice seasonal switch. |
| **`sakura`** | Falling petals | The calmest of the lot. |
| **`off`** | Flat token colour | Always available. Some skins look better without. |

Thirteen modes, one component. Each is a single draw function — same loop, same sizing, same
lifecycle. **Build three at launch** (`stream`, `grass`, `off`) and add the rest whenever; each
is roughly 20 lines and carries zero risk to what already works.

**Defaults bind to the skin**, so the background changes with the version selector and needs no
second control:

| Skin | Default mode |
|---|---|
| Gen I green LCD | `off` — the LCD *is* the texture |
| Gen II | `grass` |
| Gen III red device | `grass` |
| Gen IV/V dual screen | `stream` |
| Gen V iPod-style | `terminal` |
| Rotom Dex | `network` |
| Modern flat | `wave` |

Add a small override in settings if you want to pick manually. Shared non-negotiables apply to
every mode: hero only, transparent canvas, colour from `var(--stream)`, static single frame
under `prefers-reduced-motion`, paused on `document.hidden`, never reducing text contrast.

### 8.5 What to take, what to skip

- ✅ 2px borders, 4px radius, flat panels, no blur shadows
- ✅ `oscillate` for the sprite idle — this is the single highest-value animation for us
- ✅ `skyMove` starfield behind the dex device
- ✅ `blink` on the Pokédex text cursor as entries type in
- ✅ `glowing` on the currently-selected list row
- ⚠️ Animated GIF sprites — Codédex ships many; **we can't**, that's stored images. Our
  equivalent is CSS animation over a static SVG sprite. Cheaper and sharper anyway.
- ⏭️ `rainbow` gradient — pretty, but doesn't serve the Pokédex metaphor. Skip for v1.

All of it belongs behind `@media (prefers-reduced-motion: reduce)`.

---

## 9. Generation decision aid

You wanted to research the shell yourself. Here's what actually differs, so it's a short read.

| | Gen 1 (Red/Blue) | Gen 3 (Ruby/Sapph) | **Gen 4/5 (DS)** | Modern / original |
|---|---|---|---|---|
| Look | Green LCD, 2-bit, Game Boy shell | Red plastic device, D-pad, hinged screen | Two stacked screens in a clamshell | Flat, bright, app-like |
| Layout is… | decorative | decorative | **load-bearing** | neutral |
| Desktop | Awkward — a tall Game Boy in a wide viewport | Awkward for the same reason | Natural two-column | Natural |
| Mobile | Fine | Cramped | **Screens stack — free responsive** | Fine |
| Text contrast | ⚠️ Poor. Green-on-green is an a11y problem | OK | Good | Best |
| Recruiter-safe | Low | Medium | High | Highest |
| Nostalgia | Highest | Highest | High | Low |
| Works on the dark §8.1 palette | ✗ fights it | ✗ fights it | ✓ | ✓ |
| Build cost | Medium | **High** (device chrome is a lot of CSS) | Medium | Low |

**The argument for Gen 4/5:** it's the only option where the retro shell and the responsive
layout are the *same decision*. Two screens is already a two-column desktop layout that
stacks on mobile — you get the aesthetic for free out of work you'd have to do regardless.
Every other option means building a device frame *and then* solving responsive separately.

**The argument against:** Gen 3's red Pokédex is the more instantly recognisable object. If
the reaction you want is "that's a Pokédex!" rather than "that's a Pokédex-*like* interface,"
Gen 3 wins on pure recognition and costs you a chunk of extra CSS.

Things to look at while researching: Gen 4 *HeartGold/SoulSilver* dex, Gen 5 *Black/White*
dex, and the Gen 3 *Ruby/Sapphire* dex device. Also worth a look: Rotom Dex (Gen 7) for how
a modern flat treatment can still read as the same object.

### 9.1 Decision: ship all of them as a version selector

Don't pick one. Ship a dropdown and let the visitor choose. **But** the cost of this depends
entirely on one distinction:

- **Layout changes are expensive.** Gen 1 is a Game Boy, Gen 3 is a handheld device with a
  D-pad, Gen 4/5 is a clamshell. Building four different layouts is four times the work, and
  four times the responsive testing.
- **Skin changes are cheap.** Palette, fonts, border weight, corner radius, chrome details,
  bezel treatment — all of that is CSS custom properties.

So: **one layout, many skins.** Four at launch, the other four added whenever.

Build the **Gen 4/5 dual-screen layout** as the single structural foundation — it's the one
whose layout is load-bearing rather than decorative, and it's already responsive. Then the
selector swaps a `data-version` attribute on `<html>`, and each version redefines about
thirty custom properties.

```css
:root                        { --bg:#0F1620; --screen:#8BAC0F; --border:#0F380F; --radius:0px;  --font-display:"Press Start 2P"; }
[data-version="ruby"]        { --bg:#7B1E1E; --screen:#F0E8D8; --border:#3A0E0E; --radius:4px;  }
[data-version="heartgold"]   { --bg:#1E293B; --screen:#DCE8F0; --border:#475569; --radius:4px;  }
[data-version="rotom"]       { --bg:#FAFAFA; --screen:#FFFFFF; --border:#E11D48; --radius:12px; --font-display:"Silkscreen"; }
```

That's the whole mechanism. Persist the choice in `localStorage`, respect it on load.

**The elegant part:** §F1 already planned a version selector for the *Pokédex flavour text* —
each game version showing a different fact about you. That's canon behaviour. So **one
control does both jobs**: pick RED and you get the green Game Boy skin *and* Red's Pokédex
entry about you. The feature you wanted and the joke that was already planned are the same
component.

Cost: **+3 h** on phase 5 for the first four skins (roughly 45 min each after the first). The first
skin is free — it's the site.

Rules to keep it cheap:

- Skins may only change custom properties. The moment a skin needs its own HTML structure,
  it stops being a skin and the budget breaks. If Gen 1 truly needs a Game Boy frame, that's
  one extra wrapper `div` that other skins leave empty — no more.
- Every skin must pass the same contrast check. The Gen 1 green LCD is the risk here; if
  green-on-green fails WCAG AA for body text, darken the foreground rather than shipping it.
- Default to the recruiter-safe skin on first load, not the most retro one.

---

## 10. Genre research — what a "Pokédex portfolio" actually is

Searched the space, then inspected the live sites rather than reading about them. The result
reframes the convergence worry: **most of what the search results return is not a competitor at
all.**

### 10.1 Three categories, and only one is ours

**Category 1 — PokéAPI clones.** The overwhelming majority. They list *real* Pokémon fetched
from the API; there is no person in them. They are a front-end exercise wearing a Pokédex
costume, and they dominate every search for "pokedex portfolio".

Measured on a representative one (`aricharikar.github.io/pokedex`): body font **Times New
Roman**, background `#FF0000` flat, **zero `@font-face`**, **zero keyframes**, zero canvas, no
shadows. Content is `1. Bulbasaur 2. Ivysaur 3. Venusaur`.

These are not competition. They are homework.

**Category 2 — Pokédex-shaped personal portfolios.** The actual competitive set: device chrome,
and *you* are the entry. `moizm.dev` is the strongest example found and is torn down in
`DECISIONS.md` §O. **This category is small.**

**Category 3 — Pokémon-themed but not Pokédex-shaped.** A normal portfolio with Pokémon
content bolted on. Measured on `pokemon-portfolio-jade.vercel.app`: **Poppins** (no pixel font
anywhere), **four canvases running WebGL** for 3D models, jQuery plus SweetAlert2, dark navy
`#151030`, and weather keyframes — `rain`, `lightning`, `flash`, `fall`. No dex chrome, no type
badges, no stats. It is a dark portfolio that happens to render a Rayquaza.

### 10.2 What this changes

The thing that dominates search results is Category 1, which nobody would mistake for a
portfolio. Our real competitive set is a handful of Category 2 sites. **The convergence risk is
narrower than it looked** — but it is still real, because the few Category 2 sites all reach for
the same chrome, and a visitor who has seen one has seen the genre.

### 10.3 What nobody in any category has

Checked against every site inspected:

- Stats that are **counted** rather than invented
- A **joinable** roster — no personal Pokédex portfolio found lets anyone else in
- Honest project metadata (`PP 0/15` admitting a repo is archived)
- Ball type encoding **how the job was obtained**
- Multiple generation skins on one selector
- A plain-text résumé escape hatch

Six differentiators, all information design, none of them chrome. This is the same conclusion
`DECISIONS.md` §Q reached, now confirmed against the wider field.

### 10.4 Two ideas worth taking from the field

**Weather as a background mode.** Category 3 runs `rain` and `lightning` keyframes, and weather
is canon Pokémon. Both are already in our thirteen background modes (§8.7) — worth keeping
rather than trimming, because they read as *Pokémon* in a way an abstract data stream does not.

**Type-tinted entry cards.** Category 1's one good habit: the card recolours to the entry's
primary type. Applied to our roster, every person's card is tinted by their own typing, so
`/dex` becomes a visually varied wall instead of a grid of identical boxes. Cheap — the type
colours are already tokens. Added to ticket 13.

### 10.5 One correction to §Q

§Q argued Press Start 2P is overused. That is true of the **retro web generally** — Codédex and
most pixel-styled sites use it — but within Pokédex portfolios specifically, pixel fonts turn
out to be *rare*: Category 1 uses browser defaults and Category 3 uses Poppins. Only
`moizm.dev` reaches for one.

The conclusion does not change. Departure Mono is still the better pick, and the fact that
almost nobody in this genre commits to a display face at all makes typography an unusually
cheap place to look distinct.

## 11. Codédex, deep — and what designers do differently

Two passes: a full design-system extraction from Codédex, then the same measurement run against
professional *designer* portfolios to find where the visual-quality gap actually sits.

### 11.1 Codédex — the whole system, measured

**Three typefaces, three roles.** This is the part worth copying, and it corrects an error in
`BUILD.md`:

| Face | Sizes actually used | Role |
|---|---|---|
| **Mulish** (readable sans) | 14/21 w500 — 47 uses, plus 12, 16, 18 | Body. The workhorse. |
| **Press Start 2P** | **12px only.** Never larger. 23 uses | Small labels and chrome |
| **PixelGrid S/M** | 18, 20, 24, 32 | Actual headings |

**Press Start 2P is never used above 12px.** A *different* pixel face carries the headings,
because Press Start 2P at 32px is unbearably wide and blocky. `BUILD.md` said to use it for
headings. That was wrong.

Line heights are consistent ratios: **1.5 for the sans** (14/21, 16/24, 12/18), **1.4 for the
pixel headings** (32/44.8, 24/33.6).

**Small text is uppercase with heavy tracking.** 16 elements at `letter-spacing: 1.68px` and 16
more at `0.96px` — roughly 0.12em and 0.08em — combined with `text-transform: uppercase`. This
is a large part of why the site reads as an interface rather than a document, and it costs two
properties.

**Spacing is a clean 4px scale**: gaps of 4, 8, 12, 16, 20, 24, 32, 48, 64, with 8 and 16
dominating. Padding follows the same base.

**Borders: one colour.** `1.6px solid #475569` on everything, plus a single accent blue. Radii
are two-tier: **4px** for panels, **100–200px** for pills. Container maxes at **1210px**.

**Zero box-shadows on the entire page.** Confirmed across every element. Depth comes from
borders and flat panel fills. This is the single most copyable decision on the site.

Layout is flex-dominant — 136 flex containers to 5 grids.

### 11.2 Designer portfolios — the same measurement

Ran the identical extraction against two professional designer sites.

**rauno.me** — Rauno Freiberg, interaction designer at Vercel:

```
font families      1
font sizes         3      →  14px, 85px, 720px
text colours       3
box-shadows        0
border radii       2      →  12px, pill
```

**thibaudallie.com** — Paris art director:

```
font families      2
font sizes         10, 12, 32, 40, ~160     (three clusters, nothing between)
text colours       3
font weights       2      →  100 and 400
box-shadows        0
border radii       0      →  no rounded corners at all
letter-spacing     normal only
CSS keyframes      0
background colours 1      →  #FAF3DD
```

### 11.3 The finding

| | rauno.me | thibaudallie | Codédex | **SM'S DEX today** |
|---|---|---|---|---|
| Font families | 1 | 2 | 3 | 1 (display never loads) |
| Distinct sizes | **3** | 3 clusters | ~8 across 3 families | **6, ad-hoc** |
| Text colours | 3 | 3 | — | 2 |
| Weights | 1 | 2 | 3 | 2 |
| Shadows | 0 | 0 | 0 | 0 ✅ |

**Designers use fewer sizes with bigger jumps. Developers use more sizes with small jumps.**

Rauno goes 14 → 85. A six-times jump, with nothing in between. Thibaud goes 12 → 32 → 160.

Ours is 9, 12, 13, 16, 24, 32. **12 and 13 are indistinguishable** — that is not a scale, it is
six numbers that happened. And 9px is below any accessibility floor.

That single difference — scale discipline — accounts for more of the perceived quality gap than
any amount of animation or colour work.

### 11.4 One more idea worth stealing

Thibaud frames his portfolio as a **publication**: the header reads `Issue N°001 / AUGUST 20,
2026 / Folio—26`. A conceptual frame carried consistently is what makes an otherwise plain
layout feel authored.

We already have that frame — the dex number, the version naming, the species classification.
The lesson is only to carry it *everywhere*, including the places where a normal site would put
generic furniture: pagination, empty states, error pages, the 404.

### 11.5 Actions

1. **A real type scale**, five sizes with real jumps, replacing the current six. Ticket 18.
2. **Nothing below 12px.** Ticket 18.
3. **Uppercase plus ~0.08em tracking on small labels.** Two properties, large effect.
4. **Keep zero shadows.** Already correct, now confirmed three times over.
5. **Cap text colours at three** and weights at two.
6. `BUILD.md` corrected: a blocky display face belongs at small sizes, or you need a second
   face for headings. Departure Mono is monospaced and holds up at both, which is part of why
   it beats Press Start 2P here.

## 12. The craft layer — measured on Linear and rauno.me

§11 covered typography. This covers everything underneath it: the micro-decisions that separate
a site that looks designed from one that looks assembled. Measured, not asserted.

### 12.1 Linear.app

```
transition durations   0.1s ×52 · 0.16s ×69 · 0.4s ×25          three, all fast
easing                 cubic-bezier(.25,.46,.45,.94) ×78        easeOutQuad
                       ease-out ×25                             two total
transition-property    fill · color · background · opacity,transform
                       NEVER "all"
will-change            transform, on 5 elements only

-webkit-font-smoothing antialiased ×631
text-rendering         optimizeLegibility ×578
font-variant-numeric   lining-nums tabular-nums slashed-zero ×21
font-feature-settings  "cv01","ss03" ×356
text-wrap              balance ×8 · pretty ×8

user-select: none      ×1980        chrome is not selectable
tap-highlight          transparent ×3766
::selection            styled
:focus-visible         6 rules
::-webkit-scrollbar    4 rules
prefers-reduced-motion 4 rules
custom properties      124
```

### 12.2 rauno.me

```
transition durations   0.15s ×20 · 0.2s            two
easing                 ease-in-out only            one
:focus-visible         outline: 2px solid var(--colors-focus); outline-offset: 2px
font-smoothing         antialiased, applied globally in the reset
::selection            2 rules
user-select: none      ×89
custom properties      173  — in only 155 total rules
prefers-reduced-motion 0 rules
```

That last line is worth sitting with. A well-regarded interaction designer at Vercel ships
**zero** reduced-motion rules. Our spec requires them everywhere, so this is one axis where the
plan is already ahead of the reference.

### 12.3 What both agree on

1. **Transitions are fast.** 100–200ms, not the 300–500ms developers reach for. Linear's
   most-used value is **160ms**. Anything slower feels like lag rather than polish.
2. **One or two easings, tokenised.** Not a different curve per component.
3. **`-webkit-font-smoothing: antialiased` applied globally** in the reset.
4. **`:focus-visible` uses `outline` plus `outline-offset`** — never `outline: none`.
5. **`::selection` is styled.** A default blue selection on a themed site is a tell.
6. **`user-select: none` on chrome, never on content.** Labels, badges and nav are not
   selectable; body text and contact details are.
7. **Everything is a custom property.** 124 and 173 respectively.

### 12.4 Where Linear is stricter, and it matters

**Linear never writes `transition: all`.** Every transition names its properties. rauno uses
`all` 105 times.

Naming the property is not pedantry: `all` will happily animate layout properties, which forces
reflow on every frame and is the usual cause of janky hover states. Our spec should follow
Linear here.

**Linear uses `font-variant-numeric: tabular-nums slashed-zero`.** This has a direct application
here: ticket 17's playtime counter ticks every second. Without tabular numerals the digits have
different widths and the whole line jitters on every tick. The stat block has the same problem
whenever a number changes. Two words of CSS fix a bug that would otherwise be blamed on the
animation.

### 12.5 The gap this closes

None of the above is visible individually. Collectively it is most of the difference between
"a developer built this" and "a designer built this", and it is perhaps forty lines of CSS.

Written up as hard rules in `BUILD.md` §4.2, with a full per-screen state inventory in §5.1 —
because the other half of the gap is that developer portfolios design the happy path and
nothing else.

## Sources

- PokéAPI Fair Use Policy — https://pokeapi.co/docs/v2 (no rate limits since 2018; cache locally)
- PokeAPI/sprites — https://github.com/PokeAPI/sprites
- GitHub Pages limits — https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits
- GitHub Actions billing — https://docs.github.com/en/billing/managing-billing-for-your-products/about-billing-for-github-actions
- Issue forms syntax — https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/syntax-for-issue-forms
- github-issue-parser — https://github.com/stefanbuck/github-issue-parser
- Astro, June 2026 — https://astro.build/blog/whats-new-june-2026/
- Press Start 2P — https://fonts.google.com/specimen/Press+Start+2P
- pokemon-type-svg-icons — https://github.com/duiker101/pokemon-type-svg-icons
- Fan games & legal risk — https://odinlaw.com/blog-fan-games-legal-risks/
- DiceBear pixel-art (CC0) — https://www.dicebear.com/styles/pixel-art/ *(researched, rejected)*
- Kenney CC0 game assets — https://kenney.nl/assets/roguelike-characters *(researched, rejected)*
- thavlik.dev — https://thavlik.dev *(background reference, inspected live)*
- Cloudflare acquires Astro (Jan 2026) — https://www.cloudflare.com/press/press-releases/2026/cloudflare-acquires-astro-to-accelerate-the-future-of-high-performance-web-development/
- Next.js static exports — https://nextjs.org/docs/app/guides/static-exports
- Next.js unoptimized images ignore basePath — https://github.com/vercel/next.js/issues/68498
- Codédex (design reference, inspected live) — https://www.codedex.io/
