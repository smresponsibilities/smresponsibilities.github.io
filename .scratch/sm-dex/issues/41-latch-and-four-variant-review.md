# 41: Exterior latch and four-variant review

Status: resolved
Type: prototype
Priority: highest

## Question

Can all four renderers carry the missing yellow exterior latch without turning it into another
button, and which renderer should become the base for the next nitpick pass?

## Scope

- Add the yellow triangular latch to the same physical cover in all four variants.
- Keep it hidden behind the open leaf and visible on the closed exterior.
- Audit all four variants against one closure, control-depth, target, keyboard, motion and layout
  checklist.
- Fix shared comparison and accessibility faults found during the audit.
- Record one recommended base and the useful parts worth carrying from the other variants.
- Preserve current screen sampling, power-linked blue lamp and independent control targets.

## Source

User-supplied Kanto reference image:
`C:/Users/sm/AppData/Local/Temp/codex-clipboard-01c15f01-7bf6-4f36-81a7-133b1963caf0.png`.
The triangle appears on the closed cover's outer free edge, not among the open face controls.

## Answer

All four variants now carry the yellow triangle on the exterior face of the moving cover. Flat and
hybrid share one SVG latch; full Three.js and 3D / quiet caps share one extruded latch and recess.
The open face conceals it, the closed face exposes it, and it has no native input target. User
review caught the first placement sitting too close to the free edge. The final placement moves it
20 model units inward, leaving a 34-unit inset that matches the supplied reference proportion.

Full Three.js should be the base for the next pass. It is the only version where casing, hinge,
latch, lid, controls, press depth and projected hit targets all remain in one coordinate system.
Flat stays useful as the line-art reference. The two hybrids should remain control-treatment
comparisons, not production candidates.

The shared comparison now has clearer variant names and verdict text, target hover feedback,
toolbar hover/active states, a skip link, a matching theme colour and phone-shortened switcher
labels. At the default desktop viewport and 375 × 774, flat passes 59/59 checks, full Three.js
66/66, hybrid 61/61 and 3D / quiet caps 66/66. No browser warnings or errors were recorded.
Prototype capture: `73867fe` on `codex/ticket37-hybrid-angle-clarity`.

## Handoff

**Built:** Added and aligned the exterior latch in all four variants, tightened shared interaction
feedback and comparison labels, and recorded full Three.js as the recommended base.
**Deviated:** The first latch position was 20 model units too close to the free edge. User review
corrected it before capture. No remaining deviation.
**Watch out:** Old `v=40` tabs cannot show this work. Use `v=44`. Passing checks prove interaction
and layout, not visual approval; keep flat as the contour reference during the next 3D nitpick pass.
