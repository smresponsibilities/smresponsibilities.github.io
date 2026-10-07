# 42: Reference-measured latch alignment

Status: resolved
Type: prototype
Priority: highest

## Question

Where does the yellow triangular mark sit on the closed Kanto cover when measured from the cover's
local seam and bounds, and how should that measurement map into all four prototype renderers?

## Scope

- Measure the supplied image and collected closed-cover primary references.
- Separate image perspective from cover-local placement.
- Correct position, size and orientation once, then mirror that geometry into both render paths.
- Verify flat, full Three.js, flat/3D and 3D/quiet closed views at desktop and phone widths.
- Preserve the triangle as non-interactive exterior detail.

## Answer

The attached clean artwork is the strongest alignment source and matches the archived Generation I
artwork. The `k1-01` anime frame confirms that the yellow mark exists, but the hand occludes too
much of the cover for exact placement. The sources do not establish that the mark is a button or a
mechanical latch, so it remains non-interactive.

Perspective-correct measurement uses the moving cover seam, not the whole closed-device box. The
attached yellow centroid maps to `u=0.0740` across from the free edge and `v=0.4286` down from the
upper seam. In prototype coordinates that is `(88.74, 389.86)`. The final face is
`80,372 105,388 82,409`. Its base follows the cover's free-edge vector; its tip follows the local
across-sweep vector and points right, slightly upward.

`model.js` now owns that geometry once. Flat and flat/3D read it directly. Both full-Three variants
mirror it around the x=466 hinge, so all four land on the same closed coordinates. Flat passes
59/59 checks, full Three.js 66/66, hybrid 61/61 and 3D / quiet caps 66/66. Syntax and whitespace
checks pass; the final browser run has no warnings or errors. Measurements and limitations are in
`research/restart/KANTO-LATCH-ALIGNMENT.md`. Prototype capture: `8aba4e5` on
`codex/ticket37-hybrid-angle-clarity`.

## Handoff

**Built:** Replaced eyeballed screen placement with one cover-local, perspective-mapped triangle;
aligned its base and tip to the cover sweep across all four renderers.
**Deviated:** An intermediate pass enlarged the mark. Final implementation restores the measured
size and uses the mapped orientation. No remaining deviation.
**Watch out:** Old `v=40` and `v=44` tabs are stale. Review `v=48`. The reference proves an exterior
mark, not a latch function; do not add an input target without new evidence.
