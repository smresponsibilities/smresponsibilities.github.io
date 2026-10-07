# 26: Dual-screen physical control prototype

**Type:** prototype

**What to build:** Create one isolated, self-contained Gen IV/V dual-screen casing prototype
that proves physical-control navigation for SM'S DEX. Reconstruct the approved ticket 24 open and
closed geometry with HTML, CSS, SVG, and accessible DOM; use the PNG masters only as visual
measurement references.

**Status:** resolved

## Boundaries

- Do not edit claimed tickets 20 or 21, or any production source file they may own.
- Do not import, crop, slice, render, transition, or cross-fade approval PNG masters.
- Do not generate images or build the other three casing families.
- Stop after interaction validation; do not wire production routes.

## Acceptance criteria

- [x] State flow is `CLOSED -> BOOT -> MAIN MENU -> LIST -> DETAIL`; B reverses one level.
- [x] Explicit physical open control rotates one coherent right leaf around the fixed left hinge.
- [x] Stationary body, hinge, screens, and their accessible DOM never travel with the lid.
- [x] Closing and reopening restores Main Menu rather than stale detail state.
- [x] D-pad Up/Down moves list selection; Left/Right changes pages or tabs where applicable.
- [x] A confirms or opens; B returns; START opens Main Menu; SELECT opens the version selector or
      switches screen focus.
- [x] Arrow, Enter/A, Escape/B, Start, and Select keyboard equivalents work.
- [x] Every visible control is an independent native button with a fixed base and matching face;
      only the face moves down four pixels while pressed.
- [x] Empty casing and control gaps do nothing; mouse/touch-style clicks work independently.
- [x] Closed screen content leaves the focus order and accessibility tree.
- [x] Visible keyboard focus, reduced motion, and no autoplay audio are preserved.
- [x] PROFILE, MOVES, ENCOUNTERS, RIBBONS, and DEX expose representative SPEC content across top
      list/menu and bottom detail screens.
- [x] 375 px, 768 px, and 1280 px have no horizontal overflow.
- [x] Open, closed, keyboard, pointer, every control, reduced motion, and empty-casing behaviour
      are verified in the in-app browser.

## Answer

The self-contained prototype is `.scratch/sm-dex/ticket-26-control-prototype.html`, served during
validation at `http://127.0.0.1:4173/.scratch/sm-dex/ticket-26-control-prototype.html`. It contains
no image, framework, audio, or production-page dependency. The approved ticket 24 masters informed
the paired tall leaves, stationary vertical hinge, screen placement, restrained orange/charcoal
palette, circular lower controls, and closed cover proportions; no raster is loaded by the file.

Browser validation exercised every native button independently with pointer and keyboard input,
including 44 px minimum touch targets at 375 px. It also verified empty shell and D-pad gap clicks,
the complete backward state path, a clean Main Menu after reopening, the four-pixel face-only press,
closed-tree removal, fixed screen/hinge ownership, reduced-motion state changes without the lid
sweep, no horizontal overflow at 375/768/1280 px, and a clean console.

Original Gen IV/V controls informed the D-pad, A, and B mappings. The official HeartGold/SoulSilver
and Black/White manuals assign the field menu to X, while START and SELECT have contextual game
functions. This prototype intentionally follows the requested portfolio contract instead: START
opens Main Menu, SELECT opens the version selector, and X/Y are omitted.

## Handoff

**Built:** One isolated HTML/CSS/JavaScript dual-screen interaction prototype proving the complete
physical-control state model, coherent right-leaf hinge, accessible stationary screens, responsive
touch targets, keyboard equivalents, and representative portfolio navigation.
**Deviated:** START and SELECT intentionally follow the ticket's portfolio mappings rather than the
original games' X-menu and contextual START/SELECT functions. No other deviation from the ticket.
**Watch out:** Tickets 20 and 21 remain claimed and unchanged. Do not move this prototype into
production or start the other casing families until the user approves its control behaviour.
