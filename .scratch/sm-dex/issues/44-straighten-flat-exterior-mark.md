# 44: Straighten flat exterior mark

Status: resolved
Type: prototype
Priority: highest

## Question

How should the yellow exterior arrow read as level in the flat comparison without changing the
source-measured orientation used by the Three.js variants?

## Scope

- Change the flat renderer only.
- Give the yellow face a vertical base and a horizontally centred tip.
- Straighten the dark mounting well with the face while keeping it seated on the x=75 cover rail.
- Add a regression check for the flat-only geometry.
- Re-run the existing interaction, visibility, mounting, syntax and whitespace checks.
- Capture and inspect the closed flat result.

## Answer

The flat SVG was drawing ticket 42's perspective-mapped points directly. The face base leaned two
units and its tip sat 2.5 units above the base midpoint. The larger dark well reinforced the tilt:
its base leaned one unit and its tip sat 4.5 units high. The closed-cover CSS transforms are uniform
and cancel each other's rotation, so they did not cause the skew.

The flat renderer now uses `80,372 105,390.5 80,409` for the yellow face and
`75,368 111,390.5 75,413` for the dark well. Both bases are vertical and both tips share the
horizontal midpoint at y=390.5. The well remains seated on the x=75 cover rail. The flat / 3D
hybrid shares this SVG casing and receives the same correction. Full Three.js and 3D / quiet keep
the source-measured points from `model.js`.

The browser regression failed before the change and now measures zero base lean and zero vertical
tip offset for both rendered polygons. At 1280 and 375 pixels, flat passes 61/61 checks, full
Three.js 67/67, flat / 3D 63/63 and 3D / quiet 67/67. No viewport has horizontal overflow. The
closed flat before and after captures are in the prototype's `evidence/` directory. JavaScript
syntax and whitespace checks pass.

## Handoff

**Built:** Straightened the yellow exterior face and its dark well in the flat casing while
preserving the rail attachment and the Three.js geometry.
**Deviated:** The flat casing now deliberately overrides ticket 42's source-measured upward angle
because the user requested a level arrow. Full Three.js keeps the measured angle.
**Watch out:** Flat / 3D shares the flat casing, so it also uses the level arrow. Review `v=50`;
older tabs load the tilted `v=49` geometry.
