# Gen 4/5 casing — measured reference geometry

Measured on 2026-08-20 from the deployed reference implementation at `moizm.dev`, by reading
computed element rectangles out of the live DOM at a 1600px viewport.

**This is visual reference, not code reuse.** `docs/research/moizm-casing-source.md` establishes
that the reference site's component tree is unlicensed and must not be copied. Proportions
measured off a rendered page are observations of an object's appearance, which is exactly the
"use the live implementation only as visual reference" path that document sanctions. None of the
reference's markup, class strings or CSS is reproduced here — only dimensions.

## Why this file exists

`DECISIONS.md` §W concluded that faithful reproduction, not asset acquisition, is the way to
build the casing, because no official Nintendo hardware asset exists to license. Faithful
reproduction needs real numbers. A first attempt at this casing was rejected for being "just
geometrical symbols" — a gradient box with four dots — precisely because it was built by
eye rather than from measurement.

## Raw measurements

All values in CSS pixels at a 1600px viewport, origin at the top-left of the page.

| Part | x | y | w | h | Notes |
|---|---|---|---|---|---|
| Upper body half | 664 | 135 | 425 | 340 | Red gradient, radius `6px 25px 6px 6px` |
| Lower body half | 664 | 496 | 425 | 340 | Radius `0 0 25px` |
| Hinge strip | 664 | 475 | 425 | 20 | Between the halves |
| Upper screen bezel | 727 | 157 | 297 | 297 | Black frame |
| Upper active screen | 731 | 181 | 290 | 269 | |
| Lower screen bezel | 727 | 517 | 297 | 297 | |
| Lower active screen | 731 | 520 | 290 | 290 | |
| Lens housing | 519 | 157 | 144 | 297 | Half-round, protrudes left of the body |
| Lens dots (×4) | 555, 625 | 256, 341 | 13 | 13 | 2×2 grid, black |
| D-pad outer housing | 494 | 496 | 170 | 340 | Black gradient, half-round left |
| D-pad inner housing | 528 | 528 | 212 | 276 | |
| D-pad circular well | 562 | 598 | 136 | 136 | Full circle |
| D-pad cross, horizontal bar | 600 | 659 | 61 | 13 | Radius 4px |
| D-pad cross, vertical bar | 623 | 635 | 13 | 61 | Radius 4px |
| Side rail, upper left | 693 | 167 | 34 | 276 | |
| Side rail, upper right | 1025 | 167 | 34 | 276 | |
| Side rail, lower right | 1025 | 528 | 51 | 276 | |
| Edge dots (×2) | 1042 | 711, 752 | 17 | 17 | Light grey, right edge |

## Ratios — use these, not the pixels

The casing must be fluid, never sized per breakpoint (`BUILD.md`, ticket 20). Every dimension
below is expressed as a multiple of the body half's width, `W = 425px`.

| Quantity | Ratio of W |
|---|---|
| Body half height | 0.800 |
| Hinge strip thickness | 0.047 |
| Whole device, long axis | 1.647 |
| Screen bezel | 0.699 |
| Active screen | 0.682 |
| Bezel inset from body edge (short axis) | 0.148 |
| Bezel inset from half's outer edge | 0.052 |
| Lens housing | 0.339 × 0.699 |
| Lens protrusion beyond body edge | 0.341 |
| Lens dot diameter | 0.031 |
| Lens dot spacing | 0.165 × 0.200 |
| D-pad housing protrusion | 0.400 |
| D-pad circular well diameter | 0.320 |
| D-pad cross bar | 0.144 × 0.031 |
| Side rail width | 0.080 |
| Edge dot diameter | 0.040 |

## Colours

Sampled from the reference. **These are the reference's palette, not ours** — the casing takes
its colour from this project's own tokens (`DECISIONS.md` §S3). They are recorded because the
*relationships* are worth keeping: a three-stop vertical gradient light-to-dark on the shell, a
near-black housing for the control wells, and a light grey with its own gradient for the pressed
plastic of the cross.

| Surface | Stops |
|---|---|
| Shell | `#ef4444` → `#b91c1c` → `#991b1b` (top, 50%, bottom) |
| Control housing | `#262626` → `#171717` → `#000000` |
| D-pad cross | `#e0e0e0` → `#bbbbbd` → `#888888` |

## The adaptation this project must make

The reference stacks its two screens with a **horizontal** hinge, because it is imitating a DS.
This project puts its screens **side by side** with a **vertical** seam, and `DECISIONS.md` §S3
forbids restacking to match the reference — the side-by-side arrangement is what lets the site
work on a phone without an apology.

So the measurements above are taken from a portrait device and applied to a landscape one:

- The two body halves become **left and right**, not upper and lower.
- The hinge strip runs **vertically**, down the middle.
- The lens housing keeps its position at the **outer edge of one half** — on the left half's
  left edge, protruding outward, which is where it reads as a lens rather than as a bump.
- The D-pad housing sits on the **opposite outer edge**, protruding right, so the two
  protrusions balance the object rather than crowding one end.
- Ratios are preserved against the same `W`, so the device stays recognisably the same object
  at a different orientation.
