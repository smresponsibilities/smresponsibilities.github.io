# Ticket 64: overlay cleanup, Poké Ball slider, and glass

Status: resolved

## Request

Remove unintended rectangular outlines around generation devices, make diagram callouts clear on
pointer exit and scroll, replace the generic lid slider with a supplied Poké Ball sprite, use a
pixel Poké Ball favicon, move technology clouds lower, improve their cloud art, and expose the
fixed landscape through glass panels.

## Acceptance

- [x] Invisible interaction overlays have no visible border, outline, background, or shadow.
- [x] Tooltip label and connector both clear on pointer exit, scroll, generation change, window
      blur, and Escape.
- [x] Slider handle renders from the supplied Poké Ball sprite sheet and controls lid progress.
- [x] Favicon is a pixel Poké Ball.
- [x] Technology logos sit inside detailed transparent pixel-cloud artwork and occupy lower lanes.
- [x] Header, device container, content sections, cards, form, and footer use readable translucent
      glass instead of opaque black panels.
- [x] Reduced motion, all generation geometry, and mobile overflow checks still pass.

## Handoff

**Built:** Removed inherited chrome from Rotom interaction overlays, hardened diagram-callout cleanup,
used the supplied Poké Ball sheet for the lid slider, added a pixel Poké Ball favicon, lowered and
redrew technology clouds, and changed portfolio surfaces to translucent blurred glass.
**Deviated:** Two transparent cloud silhouettes were extracted from the supplied reference with the
built-in image generator because using the blue sprite sheet directly produced rectangular blocks.
**Watch out:** `pixel-cloud.png` and `pixel-cloud-plump.png` are generated project assets. The source
Poké Ball sheet remains intact at `public/logos/pokeball-sprites.png` and is cropped only through CSS.
