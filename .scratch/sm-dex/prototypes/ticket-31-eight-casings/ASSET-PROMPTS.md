# Casing asset prompts

Mode: built-in image generation, not the CLI/API fallback.
Input: `assets/kanto-coherent-master-v2.png`, an earlier generated Kanto reference candidate.
Runtime output: `assets/kanto-clean-casing-v3.png`.

## Final casing removal prompt

Use case: precise-object-edit. Image 1 is the edit target, a registered Kanto Pokédex casing atlas
for a real interactive web portfolio. Change ONLY the pressable controls to clean uninterrupted
underlying casing material. On open left body remove the tiny red button in the white screen bezel
(fill matching white); remove lower black round, red and blue pills, small grey pill, green rectangle
and black D-pad (fill all these with continuous matching red plastic). On open right leaf remove ALL
ten blue keypad buttons, both black pills, both white buttons, yellow round and both dark green
rectangles. Fill every removed region with the existing red shell material. On closed device remove
yellow triangular button and lower red slot/button, fill matching red. No button outlines, ghosts,
sockets or holes remain. Preserve exactly the two device placements, proportions, all shell outlines,
hinge, red shading, lens and three header lights, white/black screen bezels, speaker slits and two
bezel indicator dots. Keep canvas and object registration unchanged. Both rectangular screen
interiors must be fully empty genuine alpha transparency with crisp edges, not ragged white debris.
Background must also be actual alpha transparency, not black fill or a baked checkerboard. This is a
clean casing-only atlas; native DOM buttons will be added separately afterward with measured gaps
and their own sockets. Do not add buttons, text, decorations or extra images. Do not change camera
angle or rescale.

## Failed alpha-only follow-up

Use case: background-extraction. Precise edit target Image 1. Remove EVERY white/grey checkerboard
pixel: background outside both red devices and inside both blank display apertures. Output actual
transparent alpha PNG with empty pixels in these areas. Do not DRAW a checkerboard, white or black
background. Preserve every red shell, lens, hinge, light, bevel and outline exactly. Keep devices
positioned and sized exactly as Image 1; no rescaling, no recropping. Do not restore any buttons.
This is a production transparent casing sprite atlas.

## Validation outcome

The first output is 1810 × 869 RGB, not RGBA. The alpha-only attempt also retained the checkerboard
and is not shipped. Runtime therefore uses CSS background registration and SVG silhouette masks.
The display interiors are covered by live opaque DOM screens. This limitation is visible in the
README rather than being represented as successful transparent-asset generation.

The tool changed the original registration slightly. The measured output crops, not the requested
invariants, determine the CSS registration. No literal pixel-perfect source match is claimed.
