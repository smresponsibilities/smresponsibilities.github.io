# Archive cards and ambient foil

Status: resolved

Reuse floral cards on /blog/archive/. Match site theme colors and display gentle default foil movement, with stronger pointer interaction. Preserve reduced-motion and suspend offscreen/hidden animations.

## Handoff

**Built:** Archive directory reuses the shared floral cards in a responsive grid. Card surfaces, borders, text and controls follow site time-of-day tokens; blooms render as silver engraving. Default foil drifts gently on an 18-second cycle at low opacity, with modestly stronger pointer interaction. Ambient animation pauses offscreen and in hidden documents. Reduced motion keeps a visible static finish.
**Deviated:** Ambient movement affects foil only, not automatic 3D wobble, so text remains stable and the showcase is gentler than the lab. Archive metadata now comes from the same chapter source instead of the prior duplicated grouping/index mapping.
**Watch out:** Astro build passed for 1321 pages with existing duplicate day-route warnings. `.scratch/tmp/verify-archive-foil.cjs` verifies 13 grid cards/links, default animation, hover, reduced motion, offscreen pause, mobile overflow and runtime errors. Existing floral timeline regression passes. Desktop/mobile screenshots inspected. Source changes remain local and uncommitted.
