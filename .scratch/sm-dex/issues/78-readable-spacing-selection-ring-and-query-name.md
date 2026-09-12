# Ticket 78 — Readable spacing, selection ring, and query name

Status: resolved

## Request

- Add breathing room throughout readable mode.
- Stop the selected-row arrow/focus treatment being clipped in device and readable views.
- Rename the generation query parameter from `gen` to `pokedexgen`.
- Simplify the Tips control to an unbordered label and switch.

## Acceptance

- Readable rows and controls have distinct spacing and larger hit areas.
- Focus/selection treatment remains fully visible at every scroll position in both views.
- Current URLs write `pokedexgen`; old `gen` links migrate without breaking.
- Tips control has no outer border, panel, or redundant On/Off text.
- Desktop, phone, keyboard, overflow, and runtime-error checks pass.

## Answer

Readable mode now has a wider desktop panel, 38px column separation, 10–12px row gaps, 12px
control gaps, and 56–58px row/control hit areas. Mobile uses a single-column layout with 24px
section separation.

The clipped yellow selection treatment came from the shared 4px outward focus offset extending
past the screen scroller. Screen rows now use a higher-specificity 3px inset focus ring, keeping
the full highlight visible in both the physical screen and readable view.

Generation state now reads and writes `pokedexgen`. Existing `gen` links remain accepted once,
then migrate to `pokedexgen` through `history.replaceState`. The Tips control is reduced to its
label and switch track with no outer border, background panel, or redundant state copy.

`npm run build` passes. The focused browser gate passes at 390×844 and 1440×1000 with correct
query migration, zero horizontal overflow, full inset focus treatment, required spacing, plain
Tips styling, and zero runtime errors.

## Handoff

**Built:** Roomier readable view, unclipped inset selection ring, `pokedexgen` URLs, and simplified Tips switch.
**Deviated:** Legacy `gen` remains read-compatible so existing shared URLs do not break; every rewritten URL removes it.
**Watch out:** Nothing.
