# 28: Asset-layer rebuild of the gen family prototypes

**What happened:** After ticket 27's approval, the Gen I/II and Gen VI–IX family pages (plus
the Gen IV/V slot in the index) were first built as CSS-drawn casings. The user rejected that
direction outright: the whole point of the ticket-24 masters was to be *the* source pixels —
"make all other using assets not from scratch". This session rebuilt every non-Gen-III family
page as an asset-layer prototype, same architecture as ticket 27.

**Status:** resolved

## Built

- `prototypes/gen-families/extract_assets.py` — crops 32 components + 14 direction slices from
  the four ticket-24 masters; writes `assets/extraction-manifest.json` with crop rectangles,
  owners, targets, and a `measured|assigned` position-origin flag.
- `gameboy.html`, `gen45.html`, `rotom.html` — asset-layer prototypes: stationary body islands
  with transparent apertures over live DOM screens; exploded face/base twins overlaid at rest
  positions; per-direction arm slices for crosses/ring; version switching recolours screens only.
- `family.css` / `family.js` shared runtime (stage scaling, dex state machine, keyboard map,
  press depth, focus-visible).
- `index.html` updated: Gen IV/V now points at the asset page, not the old CSS/SVG prototype.
- Verification: `.scratch/sm-dex/t26-verify/families.cjs` — 21/21 checks pass (image decode,
  state flow, clicks, 375 px overflow, console). Screenshots in `prototypes/gen-families/screenshots/`.

## Acceptance criteria

- [x] No casing drawn in CSS on any family page — every shell pixel is a master crop
- [x] Manifest records every component's source, crop, target, and position origin
- [x] Pressable controls use moving face + fixed base where masters provide both
- [x] Direction arms press independently on Game Boy D-pad and Gen IV/V cross + ring
- [x] Screens stay real accessible DOM inside transparent apertures
- [x] Keyboard arrows/Enter/Escape mirror D-pad/A/B; focus visible
- [x] No overflow at 375 px; no console errors; all images decode

## Handoff

**Built:** See above. Full details and deviations in `prototypes/gen-families/README.md`.

**Deviated:** Assigned positions for unbaked chin controls (GB pills, G45 chin set, Rotom
buttons); bases omitted where masters have no base twin; Gen IV/V lid parts extracted but not
composed into a closing animation (closed-form geometry belongs to ticket 20); deck left at the
master's exploded spacing.

**Watch out:** Ticket 20 is still marked claimed and was **not** touched. The CSS/SVG dual-screen
prototype (`ticket-26-control-prototype.html`) still exists but is no longer linked from the
family index. Chin-control assigned positions were placed without eyeball verification (this
session has no image input) — check `screenshots/*.png` before treating placements as approved.
