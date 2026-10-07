# Ticket 23 — OG Kanto component masters

> Rejected and removed on 2026-09-03 at the user's request. This is historical documentation,
> not approval. See ticket 32 and `research/restart/removed-assets-manifest.json`.

These are approval-only raster masters generated from the supplied illustrated Kanto Pokédex.
They are not production assets and are not referenced by the site.

## Masters

- `outer-cover-master.png`: assembled closed cover, cover base, red hinge, lens, lamps, latch, and slot.
- `inner-lid-master.png`: assembled moving inner lid, blank shell, red hinge, screen frame, connected
  5×2 keypad, rocker, lower keys, pill control, confirm button, and fixed bases.
- `stationary-body-master.png`: assembled stationary body, blank shell, hinge, irregular display
  bezel, round control, pill controls, green control, plain D-pad, and fixed bases.

All three files are 1536×1024 32-bit PNGs. Alpha samples outside the parts and inside each screen
opening were verified as zero.

## Assembly contract

The stationary left body owns the hinge. The moving right lid contains two faces: its inner control
face and its outer closed cover as the back face. The lid rotates around its left-center edge by
180 degrees; the hinge does not move. Each interactive control has a fixed base and a moving face.
Only the face translates down four pixels for a press. Screen openings remain transparent so real
DOM content can sit behind them.

## Prompt set

The built-in image generator was used. The outer prompt prioritised the illustrated reference's
narrow cover, red hinge, smooth top seam, no screws, and flat cel shading. The inner-lid prompt
required the sculpted lid, transparent screen, connected 5×2 keypad, and identical face/base
silhouettes. The stationary-body prompt required the irregular white bezel, five diagonal grille
strokes, plain D-pad, separated hinge, and matching press pairs. Each final pass removed the
simulated checkerboard and requested genuine alpha transparency while preserving geometry.
