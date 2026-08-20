# 21: Move the stack to Next.js and three.js

**What to build:** Replace Astro with Next.js, and make three.js the medium for the device
casing. Directed by the user on 2026-08-20, immediately after the CSS casing built for ticket
20 was rejected for not looking like the real device.

Both halves of this were already permitted rather than forbidden, so no rule is being broken:

- `DECISIONS.md` §U2 lifted the React/Next prohibition. Astro was downgraded from locked to
  current-choice, and `BUILD.md` §1.1 spells out that a full move to Next is a real decision
  rather than a reflex — 477 source lines, 14 of them Astro-specific, with the CSS, data and
  schemas carrying over untouched.
- `BUILD.md` §0.0.1 lists "canvas 2D over WebGL" as a **strong default**, overridable with a
  stated reason rather than by reflex. The stated reason is ticket 20: a flat drawing of the
  device did not read as the device, and a modelled object with real depth, bevels and
  material is the honest way to get there.

**Blocked by:** None

**Blocks:** 20

**Status:** claimed

## What must not change

The migration is a change of medium, not of design. Everything the specs already fix stays
fixed, and the ones most at risk in a rewrite are:

- **The bezel contract.** Inside the two screens: shared flat 2D UI, flat fills, 2px borders,
  no gradients, no shadows, identical across every skin. It must remain **real, accessible
  DOM** — working links, native Popover tooltips, selectable text, screen-reader content.
  Rendering the UI to a texture would destroy all of that and is not acceptable.
- **Screens side by side** at desktop with a vertical seam. Not stacked.
- **Fluid sizing.** No hardcoded per-breakpoint dimensions.
- **Chrome degrades, structure does not.** Under 768px, without WebGL, or under reduced
  motion, the two screens render as ordinary DOM and the 3D bundle is not downloaded.
- Every hard rule in `BUILD.md` §0 — no stored images for people, reduced motion respected,
  audio never autoplaying, five type sizes, three text colours.

- [ ] Astro is gone: no `astro` dependency, no `.astro` files, no `astro.config.mjs`
- [ ] Next.js builds a fully static export deployable to GitHub Pages
- [ ] Every existing route renders with the same content as before the migration
- [ ] The CSS tokens, JSON data and `lib/` TypeScript carry over unchanged
- [ ] `Term.astro`'s tooltip behaviour survives: native Popover, hover **and** keyboard focus
      both open it, Escape closes it
- [ ] Scoped component styles are preserved as scoped, not flattened into globals
- [ ] three.js renders only where it is wanted, and is absent from the mobile and
      reduced-motion bundles
- [ ] The deploy workflow builds and publishes the static export
- [ ] `BUILD.md` §1 and `DECISIONS.md` are updated to describe the stack that now exists

## Notes

A research pass on 2026-08-20 covered the Next static-export config, current
three/@react-three/fiber/@react-three/drei versions, procedural shell modelling, keeping DOM
accessible inside a 3D scene, and a file-by-file audit of the migration surface. Its synthesised
build spec is the starting point for this ticket.

The measured proportions the casing must hit are in `docs/research/gen4-casing-geometry.md`.
