# Handoff — 2026-08-20, after ticket 18

## State

Resolved: 01, 02, 03, 18
Frontier: 04, 05, 06, 07, 09, 11, 17
In flight: none

## Last session

Built ticket 18, visual identity: the site now has an actual display font. Departure Mono
(SIL OFL, not MIT as the ticket text says — a documentation correction, not a blocker)
downloaded, subset to the standard latin range with `fonttools`, and self-hosted at 6.3 KB.
`tokens.css` gained a five-step type scale that every `font-size` in the codebase now references
(the old 9px `Sprite.astro` caption was below the 12px floor — fixed), plus `--accent`/
`--accent-2`, which `Base.astro` now derives per-entry from `me.types` via an inline style on
`<html>` rather than a fixed hex — proved this by temporarily switching the data to fire/water
and watching the rendered colours change, then reverting. `Screen.astro`'s bottom slot renders a
`STANDBY` resting state (blinking dot, respects `prefers-reduced-motion`) instead of an empty
box when nothing has filled it — this disappears automatically once ticket 04+ renders real
content there. Full detail, including where the chrome/body-copy line was drawn for the display
font, is in
[`.scratch/sm-dex/issues/18-visual-identity.md`](issues/18-visual-identity.md)'s `## Handoff`.

**Build order changed since the last handoff** (recorded in `DECISIONS.md` §Q5 and
`.scratch/sm-dex/spec.md`, both already in the repo): substance before chrome. The roster
(11, 12, 13) now comes before skins/canvas/polish (08, 09, 14), because the roster is the actual
differentiator and was at risk of being cut if energy ran out late. Full order:
`18 → 04 05 06 07 → 11 12 13 → 08 09 14 → 16 17 → 15`.

## Not yet written down

Nothing new from this session.

## Content still owed by the user

Unchanged, still doesn't block the current frontier:

- Nature — 25 options listed in `SPEC.md` §7.5
- Weaknesses / resistances / immunity
- Three project links — Productivity Caller demo, Chaincode live + demo, QuizDeck repo
- Three to five personal facts for the flavour text
- The domain, once purchased

## Next

Per the build order above: tickets 04–07 (stat block, moves, encounters, ribbons/evolution/
flavour) run in parallel once picked up, all filling `Screen`'s `bottom` slot via the same
`<Fragment slot="bottom">` pattern `index.astro` already uses for `top`. Ticket 04 (stat block)
is the natural next pick — remember BUILD.md §6.3's fix: each stat's bar fill is
`value / benchmark` from `me.json`, never a shared `log10` scale, and the tooltip must always
state the benchmark (§9 gotcha #10).
