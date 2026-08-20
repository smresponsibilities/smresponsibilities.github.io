# Design brief — for Claude Design (UI mockups template)

Self-contained. Claude Design cannot read this repo, so everything it needs is inlined below.
Paste the block from `---` onward. Re-paste with a different "What to mock" list to explore
other screens.

---

Design UI mockups for **SM'S DEX**, a Pokédex-styled personal portfolio for a software
developer. It is a real site, already partly built — these mockups guide the remaining screens,
so **stay inside the design system below.** Do not invent new colours, fonts, or radii.

## The concept

The developer presents himself as a Pokédex entry. Projects are **moves**, jobs are **capture
events**, achievements are **ribbons**, skills are **stats backed by real counted numbers**
rather than invented ratings. Visitors can submit themselves and appear in a shared roster.

The tone is deadpan: a clinical instrument that happens to be describing a person. Not cute,
not a game UI pastiche. Think *scientific device readout*, not *arcade cabinet*.

## Hard constraints

- **No Pokémon artwork, sprites, logos, or the Poké Ball logotype.** None. Creature art is the
  person's GitHub avatar, pixelated. Ball icons are simple drawn SVG — a circle, a horizontal
  band, a centre button.
- **Zero drop shadows anywhere.** Depth comes from 2px borders and flat panel fills.
- **No gradients**, no glassmorphism, no soft blurs.
- Dark by default.

## Design system — use exactly these

```
COLOUR
  bg          #0B0E12     page ground
  panel       #161B22     cards, raised surfaces
  screen      #0D1117     the "LCD" areas
  border      #30363D     every border, 2px
  ink         #E6EDF3     primary text
  dim         #8B949E     secondary text
  accent      #6F35FC     Dragon purple — the primary type
  accent-2    #B7B7CE     Steel silver — the secondary type

  Only three text colours total: ink, dim, accent. No others.

TYPE
  display font   Departure Mono (monospaced pixel face; substitute any mono pixel font)
  body font      system sans (ui-sans-serif / Inter / Helvetica)

  12px   labels — UPPERCASE, letter-spacing 0.08em
  15px   body, line-height 1.5
  24px   section headings
  40px   the entry name
  72px   wordmark / dex number

  FIVE sizes only. Do not add a sixth. Nothing below 12px.
  Two weights maximum. Headings use the display font; body copy never does.

SHAPE
  border      2px solid, one colour
  radius      4px on panels. Pills at 100px+ for badges only.
  gap         4 / 8 / 12 / 16 / 24 / 32 — a 4px scale
  padding     16px inside screens
  max width   900px for the device
```

## Layout — this is fixed, do not redesign it

A **two-screen handheld device**, in the manner of a dual-screen Pokédex.

- **Desktop (1280px):** the two screens sit side by side, device capped at 900px, centred.
- **Mobile (375px):** the screens stack into one column. No horizontal scroll, ever.
- **Top screen:** the creature — sprite, name, types, vitals.
- **Bottom screen:** the list and its detail. When nothing is selected it shows a resting
  state reading `STANDBY`, never an empty box.

## The content to lay out

```
IDENTITY
  #001   SHIVAM MAHAJAN
  Humanoid Pokémon                    ← species line, sits under the name
  DRAGON  STEEL                       ← two type badges, in the type colours
  Lv. 12    STATUS RELEASED
  HT 6'00"   WT 169.8 lbs
  OT MORGAN STANLEY  ·  ID 2025
  Sprite: a square pixelated avatar, 2px border, ~120px

STATS — six bars. The NUMBER is the primary element, the bar is secondary.
  HP        1,150       consecutive-day code streak
  ATTACK    25,000      lines shipped in one codebase
  DEFENSE   425         test suites written
  SP. ATK   5,000,000   events architected through one pipeline
  SP. DEF   1,000,000   simulated users survived in load test
  SPEED     2,600       algorithm problems solved

  Each bar fills against its own benchmark, so bar lengths are NOT comparable
  across rows — the unit label under each number is what carries meaning.

MOVES — four rows. At rest each row shows ONLY name, type and PP.
  PRODUCTIVITY CALLER   ELECTRIC   PP 30/30
  CHAINCODE             DRAGON     PP  0/15
  QUIZDECK              ELECTRIC   PP  0/10
  TM01 CIAM WAREHOUSE   WATER      PP   —

  Selecting one fills the bottom screen with: type, category, POWER 95,
  ACCURACY 100, PP 30/30, and ONE short line of description (~35 characters —
  real move descriptions are very terse). Plus a MORE control.

ENCOUNTER
  CAUGHT BY MORGAN STANLEY
  Technology Apprentice · Aug 2025 – Aug 2026 · met at Lv. 1
  NEST BALL · On-campus     ← the ball icon NEVER appears without this label

RIBBONS — five small badges
  Core Contributor · Endurance · Problem Solver · Tournament · Dean's List

EVOLUTION CHAIN — four stages, left to right
  STUDENT → APPRENTICE → SOFTWARE DEVELOPER → ???
  The fourth stage is a black silhouette with a question mark.
```

## What to mock

1. **`/` at 1280px** — the full entry: identity in the top screen, stats and moves in the
   bottom screen.
2. **`/` at 375px** — the same, stacked. Show that nothing overflows.
3. **Move selected** — the bottom screen showing one move's detail while the list stays visible.
4. **`/dex` roster grid** — a wall of ~12 submitted people. Each card: pixelated avatar, name,
   dex number, one or two type badges, and **the card tinted by that person's primary type**, so
   the grid reads as varied rather than as identical boxes. A header counter reads
   `REGISTERED 12/151`.
5. **Trainer card** — name, ID number, institution, and a live **playtime counter** in
   `hours:minutes:seconds`, in the manner of a Pokémon trainer card.
6. **Empty roster** — `/dex` before anyone has joined. It must read as an invitation, not as a
   bug.

## Where I actually want options

Give **two or three variations** for these, since they are still open:

- **The device frame.** How much physical chrome should surround the two screens — a full
  bezel, a hairline, or none at all with the screens as bare panels?
- **Type badges.** Pills, rectangles, or bracketed monospace labels like `[DRAGON]`?
- **Stat rows.** Number-left with the bar trailing, number-right, or the number overlaid on the
  bar?

Everything else, follow the system as specified.

## Please avoid

- Rounded, friendly, "app-like" styling — this is an instrument
- Centred text anywhere except the wordmark
- Icons carrying meaning alone; every icon needs a text label
- Bars without a stated scale
- More than three text colours or five type sizes
