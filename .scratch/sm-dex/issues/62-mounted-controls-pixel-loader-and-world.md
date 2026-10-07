# Ticket 62: mounted controls, pixel loader, and coherent world

Status: resolved

## Request

Correct the portfolio visual review after ticket 61. Every device control must read as part of its
casing, diagram callouts must point from each control to a readable label, the loader must use a
block-built Python mark matching the supplied references, and the background must become one
coherent 8-bit world informed by Codédex and moizm.dev rather than loose logos over a gradient.

## Acceptance

- [x] A deterministic browser gate fails when any non-directional hardware control lacks a visible
      mounting well.
- [x] Every generation is captured open at desktop size and the mounted controls stay inside its
      device composition.
- [x] Hover and keyboard focus show a labelled diagram connector for every interactive control.
- [x] Loader uses a raster pixel Python logo with nearest-neighbour rendering.
- [x] Background has distinct pixel-art depth layers and uses locally stored, licensed 8-bit tech
      logos as parts of the scene.
- [x] Mobile defaults to the last generation and remains free of horizontal page overflow.
- [x] Reduced-motion mode removes loader, callout, and background motion.

## Handoff

**Built:** Added casing-owned wells beneath every non-directional device control, replaced the
loader with a true 16×16 pixel Python mark, and rebuilt the backdrop as one layered night-world
with licensed pixel technology sprites. Browser proof covers all nine generations, callouts, and
mobile overflow.
**Deviated:** The background uses CSS-authored scenery plus MIT pixel sprites rather than a single
large bitmap. This preserves sharp scaling and reduced-motion support.
**Watch out:** The pixel icons come from `Azganoth/vscode-pixel-icons`; the copied MIT license lives
at `public/logos/PIXEL-ICONS-LICENSE.md`.
