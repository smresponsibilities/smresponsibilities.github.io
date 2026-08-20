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
