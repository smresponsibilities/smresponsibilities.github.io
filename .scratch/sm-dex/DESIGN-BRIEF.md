# Design brief — for Claude Design **with code access**

An earlier version of this file inlined the whole design system because the tool could not read
the repo. It can now, so the brief's job changed: point at the source of truth, fence off what
is already decided, and spend the words on what is genuinely open.

Paste the block from `---` onward.

---

You have read access to this repository. It is **SM'S DEX**, a Pokédex-styled personal
portfolio, partly built. I want UI mockups for the screens that are not built yet, plus
variations on three open questions.

## Read these first

| File | Why |
|---|---|
| `src/styles/tokens.css` | **The design system.** Every colour, the five-step type scale, spacing. Do not invent values outside it. |
| `src/styles/global.css` | The reset and craft layer — focus, selection, text-wrap, reduced motion |
| `src/pages/index.astro` + `src/components/` | What already exists and how it is composed |
| `BUILD.md` §0 | Hard rules. Non-negotiable. |
| `BUILD.md` §4.1, §4.2 | Type discipline and the craft layer, both measured against real designer portfolios |
| `BUILD.md` §5.1 | The per-screen state inventory — every state that needs designing |
| `CANON.md` | What the real games do, measured. **§5 lists deliberate deviations — do not "correct" them.** |
| `.scratch/sm-dex/issues/` | The remaining tickets, which is what these mockups will guide |

## Do not redesign these

They are built, measured, and settled:

- The **two-screen device layout** — side by side at 1280px, stacked at 375px, 900px max width
- The **token palette** and the five-step type scale
- **Departure Mono for display, system sans for body.** Body copy never uses the display face.
- **Zero drop shadows.** Depth comes from 2px borders and flat fills.
- **No Pokémon artwork, sprites, logos, or the Poké Ball logotype.** Creature art is a
  pixelated GitHub avatar; ball icons are drawn SVG.
- Three text colours, two weights, five type sizes. No more.

## One thing I already know is wrong — fix it in the mockups

The type scale defines `--fs-mega: 72px` and **nothing on the site uses it.** The largest text
anywhere is the 40px name, so everything sits in a flat 12–40px band and the page has **no
typographic climax.**

For comparison, the designer portfolios this system was measured against go 14px → 85px, and
12px → 160px. Big jumps are most of what makes their pages feel authored.

My candidate is the **dex number `#001` at 72px** — it is canon for a dex screen to show the
number prominently, it is four characters so it survives 375px, and it gives the page a focal
point without competing with the name for meaning. Show me that, and show me one alternative if
you think something else deserves the climax more.

## The device casing — the biggest gap, and read this before drawing it

A previous mock came back with the *screens* but no **device**. The screens are the inside of a
Pokédex; I want the outside of one too — a physical object the screens are set into.

For a sense of the effect, look at `moizm.dev`. That is roughly the impression I want: you are
holding a handheld, and the content lives in windows cut into its shell.

**But do not build it the way that site does, and this is the important part.** Its casing is a
single bitmap (`pokedexbackground.webp`, `background-size: contain`) with the content nailed on
top using hardcoded per-breakpoint margins — `ml-14 sm:ml-20 md:ml-30 w-[150px] sm:w-[225px]
md:w-[300px]`. Because the layout is pinned to a fixed-aspect image, it cannot reflow, and the
site consequently opens with *"This Pokédex-style portfolio is best viewed on a larger
screen. [Continue Anyway]"*. That warning is not a feature; it is the bill for the technique.

So the casing must be:

- **Drawn in CSS and inline SVG.** No image of a device. It has to stretch, and the screens
  inside it stay fluid.
- **Chrome, not structure.** The two screens are the layout. The casing wraps them where there
  is room, and thins down or falls away entirely at 375px. **The site must never apologise for
  being on a phone.**
- **Original.** Not traced from a real Pokédex, and no Poké Ball logotype.
- Built from the existing tokens — same border weight, same palette, no new colours.

Casing elements worth considering, from the vocabulary of handheld instruments generally: an
outer shell in a slightly different fill from the screens, a seam or hinge between the two
screens, a large round lens near the top corner, small indicator lights, a directional control,
a speaker grille, a couple of buttons. **Pick a few, not all of them** — a busy casing competes
with the content, and the content is the point.

Give me **three treatments at different intensities**: a full casing, a restrained one that is
mostly a bezel and a seam, and one that is nearly nothing. Show each at 1280px **and** at 375px,
so I can see how the chrome degrades rather than guessing.

## Where I want options — two or three each

1. **Casing intensity** — covered directly above; that is the main one.
2. **Density.** The identity block is currently a loose flex column with generous gaps. Real
   dex screens pack small labelled fields tightly, and dense reads as *instrument* while sparse
   reads as *toy*. Show me a tighter treatment against the current one.
3. **Type badges and stat rows.** Badges as pills, rectangles, or bracketed mono labels like
   `[DRAGON]`? Stat rows with the number leading, trailing, or overlaid on the bar?

## Screens to mock

Content for all of these is in `SPEC.md`; use the real values, not lorem.

1. **`/` at 1280 and at 375** — the full entry. Identity in the top screen, stats and moves in
   the bottom.
2. **Move selected** — bottom screen showing one move's detail while the list stays visible.
   Note that real move descriptions run about 35 characters, so do not design for a paragraph.
3. **`/dex` roster grid** — around twelve submitted people, each card **tinted by that person's
   primary type** so the grid reads varied rather than uniform. Header counter reads
   `REGISTERED 12/151`.
4. **Empty roster** — `/dex` before anyone has joined. Must read as an invitation, not a bug.
5. **Trainer card** — name, ID, institution, and a live playtime counter in `h:mm:ss`.
6. **404** — in the dex's own voice, not a default error page.

## Tone

Deadpan. A clinical instrument that happens to be describing a person. Not cute, not a game-UI
pastiche — **scientific device readout, not arcade cabinet.**

## Please avoid

- Rounded, friendly, app-like styling
- Centred text anywhere except the wordmark
- Icons carrying meaning without a text label
- Bars without a stated scale — every stat bar fills against its **own** benchmark, so lengths
  are not comparable between rows and the unit label under each number carries the meaning
- Any value not already in `tokens.css`
