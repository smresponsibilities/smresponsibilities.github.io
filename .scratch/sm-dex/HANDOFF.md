# Handoff — 2026-08-20, after ticket 20

## State

Resolved: 01, 02, 03, 18, 19, 20
Frontier: 04, 05, 06, 07, 08, 09, 11, 13, 17
In flight: none

## Last session

Reclaimed ticket 20 from a prior session that had left `Status: claimed` with a handoff already
appended saying no casing was built. Built the Gen 4/5 DS-clamshell casing as
`src/components/casings/Gen4Casing.astro`, a layer that wraps `Screen.astro` without modifying
it — desktop gets a gradient shell, vertical hinge seam over the screen gap, camera dot, speaker
grille and pulsing LED, all derived from existing tokens via `color-mix()`; below 768px it
collapses to a flat bezel and the two screens carry on via `Screen.astro`'s own layout, untouched.
A real `+ ADD POKÉMON` link sits top right at every width. No D-pad was drawn — see the ticket's
Handoff section for why; short version: nothing on the site yet has a selection to page, and
faking one would mean the casing touching bezel content it isn't allowed to touch. Verified in
the dev server at 1280px and 375px (computed styles + focus check), no console errors.

## Not yet written down

Nothing. The D-pad omission and the CSS-only (no inline SVG) deviation are both explained in
ticket 20's `## Handoff` section and don't need a spec change — they're implementation calls
within what the ticket already permitted.

## Next

Ticket 08 (version selector and skins) or ticket 13 (dex roster) — either would give the casing
a real selection to page, at which point a D-pad can be added to `Gen4Casing.astro` without
touching anything inside the bezel.
