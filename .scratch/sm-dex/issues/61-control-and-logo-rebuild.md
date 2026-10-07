# 61: Rebuild broken controls, tooltips, loader, and technology art

Status: resolved
Type: task

## Request

Correct the visually broken native-page controls from ticket 60. Every button on the rendered
page must have a coherent theme and an explanatory hover/focus tooltip. Replace improvised Python
and technology marks with recognizable source assets, starting from the official Python logo.
Rebuild the loader and background composition after inspecting the running page.

## Acceptance

- No visible page button lacks tooltip copy.
- Tooltips appear on hover and keyboard focus, stay within the viewport, and do not stick.
- Control hitboxes do not overlap unrelated controls and preserve 44 px touch targets where visible.
- Loader uses the official, unmodified Python logo device from python.org.
- Technology background uses recognizable SVG assets rather than letter placeholders.
- Device, slider, form, page controls, and typography read as one system at desktop and phone widths.
- Reduced motion, resource loading, console, horizontal overflow, and native rendering still pass.

## Changes

Replaced the CSS Python approximation with the official unmodified two-snake SVG from the Python
Software Foundation. The loader rotates that mark in stepped motion and freezes it under reduced
motion. Replaced every backdrop placeholder with downloaded MIT-licensed pixel icons from
`Azganoth/vscode-pixel-icons`: Python, React, HTML, CSS, Git, and Docker. The source license ships
beside the assets in `public/logos/PIXEL-ICONS-LICENSE.md`.

Rebuilt the backdrop as a brighter pixel landscape with crisp downloaded sprites and simplified
depth. Replaced the tooltip bubble behavior with a diagram callout system: one label and an SVG
elbow connector point from the active control to its explanation. Pointer transition handling now
prevents stuck labels. The full-page Add Pokémon action and every visible native control have copy.
The giant cover drag surface is no longer a fake button; the labelled slider remains its accessible
alternative.

## Diagnosis

The ticket-60 regression gate reproduced four causes: one visible button lacked tooltip metadata,
the tooltip could remain hidden on keyboard focus, six technology marks were text placeholders,
and unrelated prototype selectors produced inconsistent hit sizes. The new gate fails on those
exact conditions.

## Validation

`npm run build` passes. `research/ticket-61-gate.mjs` passes at 1440 × 1000 and 390 × 844 with
reduced motion. Both runs report zero missing tooltip descriptions, zero broken primary hitboxes,
zero placeholder marks, onscreen callout labels, visible connector lines, and the official Python
asset. Visual captures cover the loader, desktop page, and phone page.

## Handoff

**Built:** Official Python loader, downloaded pixel technology art, remade backdrop, and diagram
callouts with connector lines for all visible controls.
**Deviated:** Loader keeps the official Python outline unmodified rather than redrawing it as
8-bit art; stepped rotation and nearest-neighbor rendering supply the game treatment without
violating the logo usage guidance.
**Watch out:** Pixel technology images originate from the MIT-licensed repository named above.
Keep its copied license when moving or replacing those files.
