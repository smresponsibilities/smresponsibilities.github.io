# Handoff — 2026-08-20, after ticket 19

## State

Resolved: 01, 02, 03, 18, 19
Frontier: 04, 05, 06, 07, 09, 11, 17
In flight: none

## Last session

Built ticket 19, the craft layer: `BUILD.md` §4.2 shipped almost verbatim. `tokens.css` gained
motion tokens (`--dur-fast`/`--dur-base`/`--dur-slow`/`--ease`) and `--focus` (aliased to
`var(--accent)`, so the focus ring picks up each entry's own type colour for free).
`global.css` gained the full reset: font smoothing, tap-highlight, `:focus-visible` (2px
outline, never removed), `::selection` from the accent, `text-wrap` on headings/paragraphs,
`user-select: none` on chrome, and the `prefers-reduced-motion: reduce` backstop. Did a real
keyboard pass with trusted `Tab` presses (not synthetic events, which don't reliably trigger
`:focus-visible` in this sandbox) — confirmed visible, correctly-ordered focus across all 6 of
the page's focusable elements. Full detail, including why `user-select`'s selector list was
adapted from `BUILD.md`'s generic class names to this codebase's real ones, is in
[`.scratch/sm-dex/issues/19-craft-layer.md`](issues/19-craft-layer.md)'s `## Handoff`.

Two of §4.2's rules exist but have nothing to catch yet: `.stat-value`/`.counter`/`.playtime`
(tabular-nums) are defined, unused until tickets 04 and 17 render those elements. `transition:`
doesn't appear anywhere in the codebase at all yet, so "no `transition: all`" and "every
transition uses a token" are both true by having nothing to violate them — the tokens are ready
for whichever ticket adds the first hover/state transition.

## Not yet written down

Nothing new.

## Follow-up since ticket 19

Ticket 19 left the motion tokens defined but unused — there were no transitions anywhere in the
codebase, so `--dur-fast`, `--dur-base` and `--ease` were dead in exactly the way
`--font-display` was before ticket 18. Its acceptance criterion "every transition uses a
duration token" passed vacuously, because zero transitions satisfy "every".

Wired the first real use: `Term.astro` tooltips now fade in over `--dur-fast` with a 2px rise.
A popover lives in the top layer and toggles `display`, so both `display` and `overlay` need
`transition-behavior: allow-discrete` or the exit transition never runs — the tip would animate
open and then vanish instantly on close. `@starting-style` supplies the pre-open state and
Astro scopes it correctly.

Verified statically: the emitted rule, the transition property and behaviour lists, the
`@starting-style` rule in the CSSOM, and five elements now carrying transitions. **Not verified
visually** — the browser pane used for checking does not composite frames, so transitions do
not advance there and `getAnimations()` reads empty. Someone should eyeball the fade once.

## What exists in the codebase

```
src/components/   Screen · Sprite · Term · TypeBadge
src/layouts/      Base
src/lib/          level.ts · me.ts · types.ts
src/pages/        index.astro
src/styles/       global.css · tokens.css
src/data/         me.json
```

`/` renders the identity block in the top screen. The bottom screen shows a `STANDBY` resting
state, waiting for 04–07 to fill it. One dependency: `astro`. Nothing ships to the browser but
HTML and CSS.

## Reference documents, in order of authority

1. `BUILD.md` — the implementation spec, wins any conflict. §4.1 type discipline · §4.2 the
   craft layer · §5.1 per-screen state inventory · §6.3 stat bars · §7.4 move density.
2. `CANON.md` — what the real games do, measured. Read before inventing a convention.
   **§5 lists deliberate deviations — do not "fix" them.**
3. `DECISIONS.md` — every decision, its alternatives, and why they lost.
4. `SPEC.md` — the content that becomes the JSON.
5. `PLAN.md` — background. §11 typography · §12 craft · §13 the three-way audit.

## Things that will bite on 04–07

- **Stat bars use a per-stat `benchmark`**, not a shared log scale: `fill = min(1, value /
  benchmark)`. The number is the primary content and the tooltip must state the benchmark. An
  earlier draft log-normalised all six and rendered the strongest signal as the weakest bar.
  `BUILD.md` §6.3, and `SPEC.md` §4 was corrected to match.
- **Status-category moves have no power at all**, not zero. `CANON.md` §4.
- **Move descriptions are short** — real ones run a median of 34 characters. The level-2
  disclosure really is one line; do not design for a paragraph.
- **Empty fields must not render.** Sparsity is the entire density fix.
- **A ball icon never appears without its reason text** beside it.
- **Every new term gets a `Term` tooltip.** Legibility is part of each slice being done, not a
  later pass.

## A process lesson worth carrying

**A token nobody references silently does nothing.** Twice now: `--font-display` before ticket
18, `--dur-*` after ticket 19. Reading the stylesheet does not catch it — checking the computed
style of a real rendered element does. If a ticket adds a token, it should add the first use of
that token too.

Related: **an acceptance criterion can pass vacuously.** "Every transition uses a duration
token" was true when there were no transitions. Tick a box only when it is true *and* non-empty.

## Content still owed by the user

Unchanged, blocks nothing on the frontier:

- Nature — 25 options in `SPEC.md` §7.5
- Weaknesses / resistances / immunity
- Three project links
- Three to five personal facts
- The domain, once purchased

## Next

**04, 05, 06, 07, in any order** — parallel, 03 is resolved, and every page they touch now
inherits the craft layer (tokens, focus, selection, tabular-nums, reduced-motion) instead of
needing it retrofitted. One ticket per session. Remember `CANON.md` before inventing any
convention — §5 lists the deliberate deviations (PP inversion, Power-as-impact, etc.) that
should not be "corrected" back toward canon. After those: the roster (11, 12, 13), then chrome
(08, 09, 14), then title screen/trainer card (16, 17), then ship (15) — the order recorded in
`.scratch/sm-dex/spec.md`.
