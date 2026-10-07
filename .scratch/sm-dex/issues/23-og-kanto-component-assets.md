# 23: OG Kanto component asset refinement

**What to build:** Replace the rejected glossy component sheets with approval-only raster masters
that reproduce the supplied illustrated Kanto Pokédex. The masters are design references for the
component assembly; they are not production casing assets and do not modify tickets 20 or 21.

**Status:** resolved

- [x] The illustrated reference wins over the physical-reference photo: red hinge, no screw caps.
- [x] The outer cover is narrow, orthographic, flat/cel-shaded, and uses the reference's smooth top seam.
- [x] The inner moving lid contains the correct screen, connected 5×2 keypad, rocker, lower keys,
      small pill controls, and confirm button.
- [x] The stationary body uses the irregular white screen bezel and plain black D-pad from the reference.
- [x] Every interactive control has a matching fixed base and moving face with identical silhouettes.
- [x] Screens are transparent openings suitable for accessible DOM content.
- [x] Every isolated component has clean alpha with no glow, cast shadow, text, or watermark.
- [x] Final masters are saved under `.scratch/sm-dex/assets/ticket-23/` for user approval.

## Boundaries

Ticket 20 and ticket 21 are claimed by other sessions. This ticket must not edit production site
code, change the stack, or import raster masters into the shipped casing.

## Handoff

**Built:** Three corrected, transparent OG Kanto component masters under
`.scratch/sm-dex/assets/ticket-23/`, with an assembly contract in the adjacent README.
**Deviated:** Nothing. The masters remain approval-only and are not imported into production.
**Watch out:** The user must approve these masters before slicing components or replacing the
existing temporary prototype assets. Tickets 20 and 21 remain claimed and untouched.
