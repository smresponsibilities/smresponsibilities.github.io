# DECISIONS — final confirmation pass

Every choice made, the alternatives that were on the table, and why the pick won.
**Nothing here is irreversible.** The "how to change" column is the real point — most of these
are one line in a JSON file.

`🔒` locked · `🟠` open, needs you · `⏭️` deliberately deferred

---

## A. Architecture

| # | Decision | Chosen | Alternatives | Why | How to change |
|---|---|---|---|---|---|
| A1 | Framework | 🔒 **Astro 6** | Next.js, plain HTML/CSS/JS, SvelteKit | 0 KB JS baseline; `output:'export'` would disable everything Next is for; content collections validate bot-written JSON at build | Rewrite. Do it now or never. |
| A2 | Hosting | 🔒 **GitHub Pages, custom domain + `smresponsibilities.github.io`** | Cloudflare Pages, Netlify, Vercel | Free; both URLs work — see note in §J | 10 min to move to Cloudflare |
| A3 | Backend | 🔒 **None — GitHub Issue Forms** | Supabase, Firebase, Formspree, custom API | Free forever, no cold starts, auth + spam + moderation included | Swap the submit target |
| A4 | Data store | 🔒 **5 JSON files** | CMS, database, Markdown | Content is tiny and structured | — |
| A5 | Repo visibility | 🔒 **Public** | Private | Required for free unlimited Actions; repo is itself a portfolio asset | Toggle in settings |
| A6 | Cost | 🔒 **$0/yr + your domain** | Free-only | Every requirement met free; domain is taste | — |
| A7 | Analytics | 🔒 **Cloudflare Web Analytics** | GoatCounter, Plausible, none | Free, cookieless — **no consent banner**, which would wreck the aesthetic | One script tag |

## B. Images & assets

| # | Decision | Chosen | Alternatives | Why | How to change |
|---|---|---|---|---|---|
| B1 | Sprite source | 🔒 **GitHub avatar. Only.** | ~~DiceBear~~ rejected · ~~Kenney trainer gallery~~ rejected · Pokémon sprites · commissioned art | Simplest thing that works, and back to **literally zero bytes stored** | Add a source later |
| B2 | No-avatar fallback | 🔒 **GitHub identicon, framed as `UNIDENTIFIED SPECIES`** | Placeholder image, reject the submission | Identicons already look like sprites. The fallback becomes a feature. | — |
| B3 | Photo handling | 🔒 **Dither if photo, pixelate if art** | Pixelate everything | Faces turn to mush under naive pixelation | ~40 lines |
| B4 | Type icons | 🔒 **Draw own / CSS** | `duiker101/pokemon-type-svg-icons` | That repo has **no license file** | Drop the files in |
| B5 | Nintendo assets | 🔒 **Ship none** | Hotlink PokéAPI sprites | Zero legal exposure, and avatars are more personal anyway | Hotlink via jsDelivr, never commit |
| B6 | Image storage | 🔒 **Zero bytes. Nothing, ever.** | Spritesheet (~30 KB), per-user uploads | Original requirement, fully restored | — |
| B7 | Fonts | 🔒 **Press Start 2P display + readable sans body** | Pixel font throughout | Press Start 2P is unreadable at paragraph length — accessibility floor | Swap the body stack |

## C. Visual design

| # | Decision | Chosen | Alternatives | Why | How to change |
|---|---|---|---|---|---|
| C1 | Shell layout | 🔒 **Gen 4/5 dual-screen, ONE layout** | Gen 1 Game Boy, Gen 3 device, modern, or four real layouts | Two screens *is* a responsive layout; also solves move density (see E3) | Expensive — this is the structure |
| C2 | Generations | 🔒 **All of them, added over time** | Pick one, or ship all 9 at launch | 8 visually distinct dex designs exist; each is ~45 min of CSS vars | Add a skin any time — purely additive |
| C3 | Selector | 🔒 **One control, two jobs** | Two separate controls | Version selector drives skin **and** which flavour text shows — canon behaviour | — |
| C4 | Background | 🔒 **Canvas 2D event stream, hero only** | CSS gradient, WebGL, full-page, none | Matches thavlik.dev's actual technique; hero-only keeps it cheap | CSS fallback documented |
| C5 | Background intensity | 🔒 **Low** | Prominent like thavlik.dev | His site is typographically plain; ours is already loud | Turn opacity up |
| C6 | Effects vocabulary | 🔒 **2px borders, 4px radius, flat panels, no blur shadows** | Soft shadows, gradients | Reverse-engineered from Codédex — it's why it reads pixel-art | CSS vars |
| C7 | Animations | 🔒 **`oscillate`, `blink`, `glowing`, `skyMove`** | More, or none | Each under 8 lines | Add keyframes |
| C8 | Dark mode | 🔒 **Yes** | Device-only look | ~15 lines with tokens | — |
| C9 | Scanlines | 🔒 **Subtle, screen area only** | Full-page, none | Never over body text — contrast | One class |
| C10 | Sound | 🔒 **Built, defaults OFF** | None, or on by default | Autoplay audio on a recruiter's machine is actively damaging | Flip the default |
| C11 | Shiny hover | 🔒 **Yes** | No | `hue-rotate`, ~6 lines | — |
| C12 | "Who's that Pokémon" | 🔒 **Your entry only, once per session** | Every entry, never | Charming once, irritating repeatedly | — |

## D. Your identity

| # | Field | Value | Alternatives considered |
|---|---|---|---|
| D1 | Name | 🔒 SHIVAM MAHAJAN | — |
| D2 | Species | 🔒 **Humanoid Pokémon** | Stack / Bridge / Endpoint / Deploy Pokémon |
| D3 | Title | 🔒 **Software Developer** | Software Engineer, Full-Stack Developer |
| D4 | Types | 🔒 **Dragon / Steel** | Water/Steel (truer to resume), Steel/Fairy (full-stack pivot) |
| D5 | Level | 🔒 **1 month professional = 1 Lv → Lv. 12** | Fixed number, self-assigned, include education |
| D6 | Status | 🔒 **RELEASED** | CAUGHT, UNCAUGHT |
| D7 | Height / Weight | 🔒 **6'00" / 169.8 lbs** | — |
| D8 | Gender | 🔒 **`⚲ GENDERLESS`** (default; say the word to change) | `♂` · `♀` · omit field |
| D9 | OT | 🔒 **MORGAN STANLEY** · ID `2025` | — |
| D10 | Evolution chain | 🔒 **Manually authored in JSON, rendered as a chain UI.** Add stages whenever. Stage 4 = silhouette | Auto-derived from encounters |
| D11 | **Nature** | 🟠 **OPEN** | **All 25 canon natures listed in SPEC §7.5** |
| D12 | Ability | 🔒 **Zero Tolerance** — *pipelines do not drop rows* | — |
| D13 | Hidden Ability | 🔒 **Streak** — *1,150 days, power rises daily* | — |
| D14 | Held Item | 🔒 **Vim** — *cannot be removed* | — |
| D15 | Egg Group | 🔒 Human-Like | — |
| D16 | Habitat | 🔒 Punjab, India | — |
| D17 | Dex No. | 🔒 `#001` | — |
| D18 | Phone number | 🔒 **Excluded from site** | Include it (rejected — permanent scraping) |
| D19 | Contact shown | 🔒 Email (obfuscated) + LinkedIn + GitHub | — |
| D20 | Weak / Resist / Immune | ⏭️ **Deferred by you** | ~10 min whenever. Funniest slot on the site. |

## E. Content

| # | Decision | Chosen | Alternatives | Why |
|---|---|---|---|---|
| E1 | Stats | 🔒 **Counted, not rated** — 6 real numbers | Self-rated 0–100, drop the panel | You objected and were right; invented numbers teach a recruiter nothing |
| E2 | Moves | 🔒 **4** — 3 personal + `TM01` work | More, fewer | Canon constraint; 4 strong beats 9 mediocre |
| E3 | Move rendering | 🔒 **Progressive disclosure L1/L2/L3** | Flat table, accordion, modal | Canon does this; dual-screen makes list + detail visible at once |
| E4 | Empty fields | 🔒 **Don't render** | Show blank | Sparsity is the whole density fix |
| E5 | Power scale | 🔒 **Impact** | Difficulty, size | Must mean one thing or it's noise |
| E6 | Accuracy | 🔒 **Reliability — tests, did it hold up** | Skip the field | Rewards your actual strength |
| E7 | PP | 🔒 **Maintenance status** | Time invested | Tells the truth about your repos before a click does |
| E8 | Ribbons | 🔒 **5 achievements** | Bullet list | Canon slot; 2,002-day streak is the stopper |
| E9 | Flavour text | 🔒 **One per version, dry 3rd person** | First person, single entry | 🟠 needs your real facts |
| E10 | Encounters | 🔒 Morgan Stanley; education separate | Merge education in | Ball type 🟠 open |
| E11 | Lead with | 🔒 **Morgan Stanley work** (default) | Android, full-stack | You declined to pick; reorder a JSON array to change |

## F. Community feature

| # | Decision | Chosen | Alternatives |
|---|---|---|---|
| F1 | Submission | 🔒 **One form on your site → you approve → live** | Everything inside the GitHub issue form |
| F2 | Visitor stats | 🔒 **Six sliders + budget from level + `[RANDOMISE]`** | Auto-roll only, self-rated, none |
| F3 | Stat renderer | 🔒 **One component, two sources** | Two implementations |
| F4 | Visitor types | 🔒 **Self-pick from 18** | Quiz assigns them (⏭️ v2) |
| F5 | Gender on form | 🔒 **Optional dropdown, defaults genderless** | Required, omitted |
| F6 | Where everyone is visible | 🔒 **`/dex` — PC Box grid, every approved entry, each with its own shareable URL** | Route scroll, trainer cards |
| F7 | Counter | 🔒 **`REGISTERED 47/151`** | No counter |
| F8 | Shiny rarity | 🔒 **Every 10th submission** | None, random |
| F9 | Relationships | 🔒 **Caught by / Traded from / Wild** | Flat list |
| F10 | Approval | 🔒 **Add an `approved` label → Action commits directly to `main`. No PR.** | PR review, close-to-approve, `/approve` comment, issues-as-database |
| F11 | Data collected | 🔒 **Username + avatar + their answers. No email, no real name, no location.** | Collect more |
| F12 | Rejections | 🔒 Bot handles mechanical; you ignore the rest | Manual replies |

## G. UX — the priority you raised

| # | Decision | Chosen | Alternatives | Why |
|---|---|---|---|---|
| G1 | Tooltips | 🔒 **Native Popover API** | `title=""`, Tippy.js, Floating UI, custom JS | Zero JS, zero deps, keyboard + screen-reader correct by default |
| G2 | Coverage | 🔒 **Every Pokédex term** | Key terms only | A metaphor nobody decodes is confusion |
| G3 | Touch | 🔒 **Tap to open** | Hover only | Hover doesn't exist on phones |
| G4 | Onboarding | 🔒 **First-visit card + permanent `?`** | None | 4 lines mapping the metaphor |
| G5 | Escape hatch | 🔒 **`VIEW AS PLAIN TEXT` + `/resume`** | Gimmick only | Lets you commit fully to the bit without it costing an interview |
| G6 | Reduced motion | 🔒 **Everything respects it** | Ignore | Non-negotiable |
| G7 | Tooltip content rule | 🔒 **Explain only, never store** | Hide info in tooltips | Info in a tooltip is info that's lost |

## H. Still open — needs you

| # | Item | Blocks | Options |
|---|---|---|---|
| 2 | **Nature** (D11) | Your entry | Adamant · Careful · Timid · Modest · Jolly |
| ~~4~~ | ~~Ball type~~ | — | 🔒 **NEST BALL** — on-campus. Confirmed. |
| 5 | **3 project links** | Move detail | Productivity Caller demo · Chaincode live + demo · QuizDeck repo |
| 6 | **3–5 personal facts** | Flavour text | Non-work, weird. The funniest part — can't be invented for you. |
| 7 | ~~Site name~~ | — | 🔒 **SM'S DEX**, slug `sm-dex` |
| 8 | **Domain string** | Nothing | You're buying it. Tell me when you have it. |
| 9 | Weak/Resist/Immune (D20) | Nothing | Deferred by you |

**None of items 1–9 block scaffolding.** Phases 1–2 build the shell, tokens, layout, skins, and
deploy pipeline without a single one of them.

---

## I. Time

| Phase | Hours |
|---|---|
| 0 Content | 3 — **mostly done**, SPEC.md drafted from your resume |
| 1 Scaffold + deploy | 3 |
| 2 Dex shell + layout | 5 |
| 3 Your entry | 4 |
| 4 Community pipeline | 4 |
| 5 Polish | 4 |
| 5b Legibility (tooltips, onboarding, plain mode) | 3 |
| 5c Four version skins | 3 |
| 6 Ship | 1 |
| **Total** | **~30 h** |

Live v1 (phases 0–3 + deploy ≈ 15 h) in a focused weekend. Full build **8–12 days** of evenings.


---

## J. Changes from the review pass

| Was | Now | Why |
|---|---|---|
| DiceBear avatar **builder** (dropdowns) | **Trainer gallery** — pick one sprite from a grid | You rejected DiceBear; picking a preset trainer is what the games actually do |
| Zero bytes stored | **One ~30 KB spritesheet** | See below |
| 4 version skins | **All 8 distinct dex designs**, added over time | You asked for all gens |
| On-site builder with 6 stat sliders | **One form**, stats auto-rolled + a re-roll button | You asked for *just a form* |
| Repo-name decision | **Moot** — you're buying a domain | Custom domain serves from root |

### Note on "zero storage"

The original rule was: **don't accumulate images.** A fixed set of ~30 trainer sprites in one
spritesheet is about 30 KB, committed once, never growing — regardless of whether 5 people or
5,000 people join the dex.

That is a completely different thing from per-user image uploads, which grow without bound and
need moderation, virus scanning, and a storage bill. The rule is intact. Nothing accumulates.

### The 8 visually distinct Pokédex designs

| Gen | Game | Look |
|---|---|---|
| I | Red/Blue | Green LCD list, each section direct from the listing |
| II | Gold/Silver | Entry opens in its own screen — the modern pattern begins |
| III | Ruby/Sapphire | Red plastic device, D-pad |
| IV | Diamond/Pearl | **First dual-screen dex.** Red, or pink by player gender |
| IV-r | HeartGold/SoulSilver | Dual screen styled as a **flip phone** |
| V | Black/White | Black, styled like a **classic iPod** |
| VII | Sun/Moon | **Rotom Dex** — a living creature, flat and colourful |
| IX | Scarlet/Violet | Flat modern app |

Build order: **Gen IV/V dual-screen first** (it's the structural layout), then add skins one at
a time. Each is independent CSS variables — roughly 45 minutes, zero risk to what already
works. Nine skins is ~7 h if you want them all, but there's no reason to do it before launch.


---

## K. Second review pass

| Was | Now | Why |
|---|---|---|
| Kenney trainer gallery | **GitHub avatar only** | You called the sprites bad. Simplest option wins, and zero-byte storage is fully restored. |
| Stats auto-rolled | **Six sliders back**, plus budget and `[RANDOMISE]` | You asked for them back |
| Approve by merging a PR | **Add an `approved` label** | See below — the PR was a step that bought nothing |
| Site name open | **SM'S DEX** | Your pick |
| Ball type open | **Nest Ball** recommended | See below |

### K1. Both URLs — how that actually works

You get both, but they aren't independent. Setting a custom domain on the repo makes GitHub
serve the custom domain and **301-redirect `smresponsibilities.github.io` to it**. So the
`.github.io` link keeps working forever, it just lands on the real domain. Anyone with the old
link is fine. HTTPS is free and automatic on both.

### K2. Why a PR — and what's better

Fair challenge. The PR was buying one thing: a diff to look at before it lands. Given the
Action already validates the submission, that's a second confirmation of a decision you'd
already made. Here's the full option set:

| Mechanism | Approve by | Cost |
|---|---|---|
| **Label** ⭐ | Add `approved` to the issue → Action commits to `main` | **One click. Works from the GitHub mobile app.** |
| PR review | Action opens a PR → you merge | Two screens, a diff nobody reads |
| Close-to-approve | Close the issue → Action commits | One click, but conflates "reject" and "accept" |
| `/approve` comment | Comment on the issue | Typing, and typos fail silently |
| Issues as the database | Label it; site fetches issues at build, never commits | Fewest moving parts — but data lives only in GitHub, and the build depends on the API |

**Chosen: label → direct commit to `main`.**

- One click, from your phone, in bed
- Rejecting is just… not labelling it. Close it and move on.
- The data still lands in `roster.json` in git, so the site builds without the API and your
  roster survives GitHub
- The Action validates before it commits, so a bad submission fails loudly instead of shipping

Issues-as-database was the close second and is genuinely simpler, but it makes GitHub the only
copy of your data. Committing the JSON costs one extra Action step and buys durability.

### K3. Site name — `SM'S DEX`

Display name: **SM'S DEX**. The apostrophe is fine in the title, `<h1>`, and OG tags.

For the slug it has to go, and there's a readability trap:

| Slug | Problem |
|---|---|
| `smsdex` | Reads as **SMS**-dex |
| `sm-dex` ⭐ | Clean, unambiguous |
| `smsdex.com` | Same SMS problem in a domain |

**Recommend `sm-dex`** for the repo and the domain. Display it as SM'S DEX everywhere a human
reads it.

### K4. Ball type — Nest Ball

You asked what this is. In canon, the ball a Pokémon was caught in is shown on its summary
screen. Here it encodes *how you got the job*, which says more than a job title does.

| Ball | Means |
|---|---|
| **Nest Ball** ⭐ | Works better the **lower the target's level** — canon mechanic |
| Heavy Ball | Long, heavy interview process |
| Quick Ball | Fast offer |
| Friend Ball | Referral |
| Luxury Ball | Great comp or culture |
| Timer Ball | Took forever |
| Repeat Ball | Returned to a company |
| Dive Ball | Career switch |
| Master Ball | Dream job, never in doubt |

**Nest Ball is the right answer and it isn't close.** You were caught at **Lv. 1** — an
apprenticeship, at the very start. The Nest Ball is literally the ball that works best on
low-level Pokémon. The joke is canon-accurate rather than approximate, which is the difference
between a reference and an actual gag.

Override it if the process really was brutal — that's Heavy Ball.


---

## L. Third review pass

| Item | Resolution |
|---|---|
| Slug | 🔒 **`sm-dex`** |
| Ball type | 🔒 Mapped to **on-campus / off-campus / referral / PPO / contest / cold-outreach** — SPEC §7.1. Every ball canon-accurate to its real mechanic. |
| "Get the OG sprites and assets" | **Ball icons drawn in SVG, not hotlinked.** All 13 PokéAPI ball sprites verified reachable (~280 B each) — but a Poké Ball is a circle with a stripe and a button. Draw once, 13 variants from two CSS vars. Crisper, reskins with the version selector, zero bytes, zero IP exposure next to real employer names. PLAN §2.4. |
| Background | 🔒 **Pluggable — 5 modes** (`stream`, `grass`, `stars`, `wave`, `off`), one canvas component, `mode` prop. Defaults bind to the skin. PLAN §8.7. |
| Static content | ⏭️ You'll supply later |

### Consistency audit

Swept `PLAN.md`, `SPEC.md`, `DECISIONS.md` for contradictions left by the reversals. Fixed:

- `PLAN §1.1` was still a full DiceBear avatar-creator spec → rewritten as GitHub-avatar-only,
  with both rejected candidates recorded and why
- `PLAN §3.2` pipeline still ended in "opens a PR → you merge" → now label-triggered commit
- Phase table still said "PR-on-submit" and "4 skins" → corrected
- Open question "auto-merge or approve each one?" → marked resolved
- "four skins" in three places → "four at launch, four additive"
- Sources list now marks DiceBear and Kenney as *researched, rejected* so neither reads as live

`SPEC §7.6` and `PLAN §1.1` now agree. No remaining contradictions found.


---

## M. Fourth review pass

| Item | Resolution |
|---|---|
| Morgan Stanley ball | 🔒 **NEST BALL** — on-campus placement |
| Ball legibility | 🔒 **Never rendered bare.** Always `NEST BALL · On-campus` inline; hover or tap for the canon reason |
| Ball art | 🔒 **Drawn SVG.** Built and rendered — `assets-preview/balls.html`, all 13 beside the originals |
| Site structure | 🔒 `/` · `/become` · `/dex` · `/dex/<username>` · `/resume` |
| Background modes | 🔒 **13 modes**, 3 at launch (`stream`, `grass`, `off`), rest additive |

### M1. The theme, in one paragraph

A **Pokédex device**. Gen IV/V dual-screen layout — top screen holds the sprite and stats,
bottom screen holds the list and detail — which stacks into one column on mobile. Dark by
default, with eight swappable generation skins driven by a single version selector that *also*
changes which Pokédex flavour text about you is showing. Chunky 2px borders, 4px radii, flat
panels, no blur shadows — the Codédex vocabulary, reverse-engineered from the live site.
Press Start 2P for chrome and headings, a normal readable sans for anything longer than a
label. Accent colours come from your Dragon/Steel typing. A low-amplitude canvas animation sits
behind the hero only. Every Pokédex term explains itself on hover, tap, or keyboard focus, and
one button flips the whole thing to plain text for anyone who does not want to play along.

### M2. Tech stack, complete

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Astro 6** | Static output, 0 KB JS baseline |
| Styling | **Plain CSS + custom properties** | No Tailwind — a bespoke design system fights utility classes |
| UI framework | **None** | Islands available if one component ever genuinely needs React |
| Content | **Astro content collections + Zod** | Validates bot-written `roster.json` at build; bad data fails the build |
| Data | **5 JSON files** | `me` · `moves` · `encounters` · `entries` · `roster` |
| Tooltips | **Native Popover API** | Zero JS, zero deps, accessible by default |
| Background | **Canvas 2D** | One component, 13 modes, no WebGL, no library |
| Page transitions | **Astro `<ClientRouter />`** | ~3 KB, browser-native View Transitions |
| Sprites | **GitHub avatar CDN** | Zero bytes stored |
| Ball & type icons | **Inline SVG** | Drawn; recolours with the skins |
| Fonts | **Press Start 2P** (SIL OFL) + system sans | Display vs body |
| Forms | **GitHub Issue Forms** | Auth, spam resistance, moderation — free |
| Automation | **GitHub Actions** | Validate, then commit on the `approved` label |
| Hosting | **GitHub Pages** | Custom domain + `smresponsibilities.github.io` redirect |
| Analytics | **Cloudflare Web Analytics** | Cookieless, no consent banner |
| **Runtime dependencies** | **Zero** | Nothing is fetched from a third party when the page loads |

Total runtime npm dependencies: **none**. Astro compiles away. What ships is HTML, CSS, and
about forty lines of canvas.


---

## N. Handoff

Implementation is being done by a different agent that will not have this conversation. So the
authoritative document is now **`BUILD.md`** — a self-contained build spec containing the exact
file tree, Zod schemas, design tokens, component reference implementations, the full CI YAML,
per-phase acceptance criteria, and a ranked gotcha list.

Reading order for the implementer: `BUILD.md` first and it wins any conflict, then this file
for what was rejected and why, then `SPEC.md` for content, then `PLAN.md` for background.

### N1. One design flaw found while writing the spec

`StatBlock` was specified to `log10`-normalise all six stats onto a shared scale. Writing out
the numbers showed this is wrong: the stats are in incompatible units, and log-normalising gives
**Defense a 12% bar** (425 test suites) against **Sp. Atk at 94%** (5M events) — telling a
recruiter the precise opposite of the truth, since rigour is the strongest signal on the resume.

Fixed in `BUILD.md` §6.3: each stat declares its own `benchmark` in `me.json`, the bar is
`min(1, value / benchmark)`, the number is rendered as the primary content, and the tooltip
states the benchmark explicitly. New rule — **never render a bar whose scale is not stated.**

This is the kind of error that only surfaces when a design is written out precisely enough for
someone else to build, which is the argument for having produced the spec at all.


---

## O. Teardown of moizm.dev

Another Pokedex-style portfolio, inspected live rather than from a description. Two features
adopted as tickets 16 and 17; three of its choices deliberately not copied.

### O1. What it does

| | |
|---|---|
| Stack | React + **Tailwind**, single JS bundle, hash routing (`#info/interests`) |
| Layout | The device is a **background image**; content is positioned on top with per-breakpoint pixel margins (`ml-[90px] sm:max-md:ml-[140px] md:max-lg:ml-[177px]`) |
| Sections | INFO / PROJECTS / RESUME / CONTACT, each a paginated deck with BACK / NEXT and a `Quit` |
| Animation | One keyframe, Tailwind's built-in `pulse`. No canvas, no audio. |
| Assets | Ships Nintendo's actual Pokemon logo, a 700x806 photo, a handprint image, a custom `PokedexFont` used for **body text** |

### O2. Adopted

| Idea | Where |
|---|---|
| **"X VERSION" naming** — the wordmark reads `MOIZ VERSION` | Folded into ticket 08. Our selector already drives skin and flavour text; naming the site is free on top. |
| **BACK / NEXT paging** between entries | Folded into ticket 13. Without it a shared entry link is a dead end. |
| **Title screen** — full-screen card, blinking "tap to begin" | New ticket 16 |
| **Trainer card with a live playtime counter** | New ticket 17. The best idea on their site by a distance. |

The playtime counter deserves its own note: in the games it is the quiet flex at the bottom of
the trainer card. Theirs counts from a birthdate. Ours should count something that means
something — a streak, a first commit — because a counter that has genuinely been running for
years reads very differently from a sentence claiming it has.

### O3. Not copied, deliberately

**The desktop-only gate.** The site opens with *"This Pokedex-style portfolio is best viewed on
a larger screen. [Continue Anyway]"*. That is not a feature, it is an apology: the layout is
pinned to a background bitmap with hardcoded per-breakpoint margins, so it cannot reflow. Our
C1 dual-screen choice exists precisely to avoid this — two screens *is* a responsive layout, and
ticket 02 shipped verified with no horizontal scroll at 375 px. We need no apology.

**Re-gating every visit.** Their `localStorage` and `sessionStorage` are both empty, so the
title screen appears on every single visit forever. Ticket 16 requires it to show once and to
be skipped entirely on deep links.

**Hash routing.** `#info/interests` means no per-entry OpenGraph card — sharing a link previews
the site's default image, not the entry. This is the exact weakness that made static
`/dex/[username]` pages the reason for choosing Astro in A1.

### O4. One thing they arguably do better

Their project badges carry **real technology names** (`NEXT.JS`, `TAILWIND CSS`, `SUPABASE`,
`PYTHON`). Ours map technologies onto Pokemon types, so a recruiter scanning for "Kotlin" sees
`ELECTRIC`. Our tooltips (§7.5) close the gap, and `/resume` closes it completely, but it is a
real cost of the metaphor and worth watching once the site is live. If it bites, the fix is to
show the stack list alongside the type badge in the move detail rather than only on expand.
