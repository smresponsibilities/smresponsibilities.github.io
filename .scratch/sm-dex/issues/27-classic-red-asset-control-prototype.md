# 27: Classic Red asset-layer control prototype

**Type:** prototype

**What to build:** Create one isolated Classic Red interaction prototype from the approved ticket
23 PNG masters. This prototype explicitly overrides their reference-only designation: reuse their
actual pixels, extract controllable casing and control layers, and integrate the existing screen UI
from `DexScreen.dc.html` and `SM'S DEX - Mockups.dc.html` as real HTML/CSS/JavaScript.

**Status:** resolved

## Boundaries

- Do not edit claimed tickets 20 or 21 or production source files.
- Do not redraw casing art, generate images, call ImageGen, cross-fade masters, or iframe/screenshot
  the supplied screen UI.
- Keep all implementation files under `.scratch/sm-dex/prototypes/ticket-26-og-controls/`.
- Stop after one Classic Red prototype; do not build other casing families.

## Acceptance criteria

- [x] Approved stationary body, stationary hinge, moving inner lid, and moving outer cover pixels are
      extracted non-destructively and documented in a machine-readable manifest.
- [x] Screen bezel, lens, lamps, D-pad housing and four directions, round buttons, pill buttons,
      keypad buttons, and paired fixed bases/moving faces are inventoried as controllable layers.
- [x] Resting open and closed compositions visually match the approved masters.
- [x] One right leaf owns inner and outer faces, rotates 180 degrees at the left-centre hinge edge,
      while body and hinge stay fixed; no image swap or fade simulates the motion.
- [x] Every visible control is an independent native button. Only its extracted moving face travels
      four pixels while pressed; empty casing and gaps do nothing.
- [x] State flow is `CLOSED -> BOOT -> MAIN MENU -> LIST -> DETAIL`, with PROFILE, MOVES,
      ENCOUNTERS, RIBBONS, and DEX representative content.
- [x] D-pad, A, B, START, SELECT, arrow keys, Enter, and Escape follow the requested mapping.
- [x] Supplied screen layouts, typography, colours, content, list/detail states, and reusable flat
      components are integrated as real DOM inside transparent screen openings.
- [x] Closing removes screen content from focus order and accessibility tree; focus stays visible;
      reduced motion makes lid state changes instant; audio never autoplays.
- [x] Pointer, keyboard, every button, empty casing, open/close, front/back coherence, reduced
      motion, transparency, and 375/768/1280 px overflow are verified in the in-app browser.
- [x] Open and closed screenshots, local URL, extraction inventory, control mapping, verification
      results, and required handoffs are delivered.

## Answer

The isolated prototype is `.scratch/sm-dex/prototypes/ticket-26-og-controls/`, served at
`http://127.0.0.1:4173/.scratch/sm-dex/prototypes/ticket-26-og-controls/`. The directory name stays
`ticket-26-og-controls` because the user fixed that delivery path; this issue is ticket 27 because
ticket 26 was already resolved.

`extract_assets.py` crops the three approved masters into 34 direct RGBA components and 17
pixel-preserving D-pad/keypad slices. `assets/extraction-manifest.json` records every source file,
crop, source-alpha mask, owner, target position, target size, and output. The runtime composes the
exact assembled body and two lid-face crops, extracted fixed bases, and extracted moving faces; one
CSS leaf rotates around the stationary hinge with no image swap, fade, or casing-wide handler.

The screen apertures contain live DOM adapted from both supplied Claude files and representative
`SPEC.md` content. `README.md` records every fit-only change, the complete control map, the component
inventory, and exact browser results. The in-app browser exercised all 27 native controls, all six
requested keyboard mappings, three empty/gap probes, four-pixel face-only travel, both close paths,
fixed hinge/body geometry, closed-tree removal, the instant reduced-motion path, clean console and
asset decoding, and zero horizontal overflow at 375, 768, and 1280 px. Screenshots are
`screenshots/open.png` and `screenshots/closed.png`.

## Handoff

**Built:** One isolated Classic Red prototype using approved ticket 23 pixels as layered runtime
assets, with coherent front/back lid motion, 27 independent physical controls, live supplied-style
screen DOM, extraction manifest, screenshots, and browser verification.
**Deviated:** The user's explicit override permits master pixels in this prototype despite
`BUILD.md`/`DECISIONS.md` marking them reference-only. Screen content was condensed only where the
249×191 and 263×116 transparent apertures require it; every change is listed in the prototype
README. Nothing else.
**Watch out:** Tickets 20 and 21 remain claimed and unchanged. Do not port this into production or
build another casing family until the user approves this Classic Red result.
