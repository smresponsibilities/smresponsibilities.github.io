# Ticket 56 corrections

## Baselines and diagnosis

Gen I was the visual baseline and was not changed. Its stage screenshot SHA-256 remains
`50c30844e4e85e3843ec14429cc4e99e36f25fd793d37f3395c731a81eeee10a` before and after.
The original six Gen I SVG exports also remained unchanged during regeneration.

The first probe found directional seats offset from their faces by 4 units in Gen II/IV
and 5 units in Gen III. Gen I uses a concentric outline with a thin edge and one highlight.
Gen II/IV now use that construction. The user subsequently protected Gen III, so its
original seat, disc, cap finish and closing behavior were restored. Its stage screenshot
matches the pre-ticket capture exactly. The intentional old seat offset remains there.

Gen IV's central closure already shared its horizontal bounds, but the cover was tall
and its left lobe was displaced relative to the directional pod. The central body and
lid were shortened together by 28 units. The lobe and pad now share closed center
`202, 538.5`; sampled central lid/body silhouettes have zero mismatches. The supplied
follow-up image prompted a narrower, darker outer pod rim with approximately 12 units
of clearance around the closed lobe. The semicircle remains owned by the lid.

## Supplied-reference corrections

- Gen II has two stacked pill-shaped oval keys and two round keys, retaining the four
  existing actions. Matching dark strips flank the lower display at its vertical center.
  All three blue bead drawings use the exterior bead's same three gradient stops.
- Gen V's lower shell, control and markings scale vertically by 1.3 around the existing
  shoulder. The chassis extends with them and the screen/tray positions stay fixed.
  Redder fills follow the supplied compact anime view. This remains an authored front
  elevation, not a calibrated reconstruction of its perspective.
- Gen VI has a decorative luminous Poké Ball centered in the compact cyan opening.
  It fades during the first quarter of opening and is hidden in the open state.

The supplied reference subjects are also available in the existing catalogue as
`g2-09`, `g4-01`, `g5-08`, and the X/Y artwork. The user's cropped screenshots identify
the old Gen IV rim and Gen V lower-panel proportions.

## Verification

`ticket-56-review.mjs after` checks preserved Gen I/III screenshots, Gen II's exact
key inventory and matching bead colors, concentric Gen II/IV seats, Gen IV closure fit,
and Gen VI's closed emblem. Its open/closed captures were visually inspected.
`ticket-56-interactions.mjs` checks all 47 hardware targets, cancellation, closure,
resume, and ten generations at 1440, 768, 390 and 320 pixels. `ticket-56-layout.mjs`
checks 150 entry pages and real animated open/close endpoints. `ticket-56-pressed.mjs`
checks rocker travel and release. SVG exports are parsed after regeneration.

No production deployment or commit is part of this local study correction.
