# Ticket 46 implementation follow-up

Final revision is 46.5. This supersedes the runtime-state conclusions of the initial
closing-depth and reference audits, which describe ticket 45 before approved changes.
Production is unchanged. No commit was requested or made.

## User decisions and implementation

- Keep the flat drawing style and Shivam's portfolio content.
- Upper lids now rotate toward the viewer. GSC's top leaf moves during progress 0–0.5,
  then the right leaf during 0.5–1. Closing reverses the sequence. Their clearances are
  2 and 1 design units. The probe verifies forward depth, not solid-body collision physics.
- Palette changes include previously missed closed exteriors and hinges. Kanto geometry
  is unchanged. II gets brighter red/cyan, IV pink-red, V orange and lighter silver rails.
- Keep X/Y only for VI. The ORAS concept sheet was inspected but explicitly excluded.
  Cyan translucent SVG and DOM glass replace the opaque black compact seam. Scan reveal
  and the rescan button remain.
- VII starts with the back from `479Rotom-Pokédex SM concept art.png`. Its camera module,
  zigzag arm recesses and round lower cover are in `assets/rotom-rear.js`. The silhouette
  mirrors the adapted front. Fixed eye housings contain tracking irises and separate
  blinking lids. Arms react; floating has a pause control.
- VII–IX slide from rear to front using the shared 180-to-0-degree turn in `effects.js`.
  Newly selecting any rear-equipped device resets it to locked/rear even if the previous
  generation was open. An explicit initial `open=1` URL remains a testing override.
  Manual Flip allows rear inspection; clicking the rear returns to the screen.
- `assets/phones.js` keeps the camera/face side separate from each phone screen.
  Paldea's exact screen-side geometry remains unverified.
- `assets/hoenn.js` replaces the rejected RSE geometry. The old study combined landscape
  controls with a top-hinged crescent that did not align with the disc. The replacement
  uses a side hinge at x=480. Its crescent centre at x=860 reflects to the disc's x=100
  when closed. The discarded narrower top-hinged trial was removed. No invented central
  emblem remains on the outer face. Dimensions and unseen exterior are still inferred.

## References inspected directly

Local paths below are under `research/restart/references/`. Archive hosting is not authorship.

| Local item | Source | Use and limit |
| --- | --- | --- |
| g3-01.png | [RSE release artwork](https://archives.bulbagarden.net/wiki/File:RSE_Pok%C3%A9dex.png) | Components and crescent. Oblique open view, not measured dimensions or a closed exterior. |
| g3-10.png | [Ash Hoenn close-up](https://archives.bulbagarden.net/wiki/File:Ash_Hoenn_Pok%C3%A9dex.png) | Landscape orientation comparison. Animation is not a game-canonical orthographic drawing. |
| g6-01.png | [X/Y artwork](https://archives.bulbagarden.net/wiki/File:XY_Pok%C3%A9dex.png) | Compact/extended blue glass and red halves. Exact travel remains inferred. |
| g6-03.jpg | [ORAS concept](https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_ORAS_concept_art.jpg) | Inspected, then excluded by the user. Not a Gen III reference. |
| g7-02.png | [Selected SM concept](https://archives.bulbagarden.net/wiki/File:479Rotom-Pok%C3%A9dex_SM_concept_art.png) | Rear components and blink expressions. Rear silhouette remains adapted. |
| g7-03.jpg | [Second SM concept](https://archives.bulbagarden.net/wiki/File:479Rotom-Pok%C3%A9dex_SM_concept_art_2.jpg) | Arm recesses and articulation. No strap or removable-camera interaction requested. |
| g8-02.jpg | [Galar guide concept](https://archives.bulbagarden.net/wiki/File:Rotom_Phone_SwSh_concept_art.jpg) | Separate screen and camera/face sides. |
| g9-01.png | [SV phone artwork](https://archives.bulbagarden.net/wiki/File:0479Rotom-Phone_SV.png) | Dual rear camera and cyan face ring. Screen side remains unverified. |

Additional RSE searches followed the [official game page](https://www.pokemon.com/us/pokemon-video-games/pokemon-ruby-version-and-pokemon-sapphire-version/),
the archive concept category and a [Hasbro manual listing](https://manuall.co.uk/hasbro-pokemon-advanced-pokedex-advanced/).
No additional directly inspectable game-hardware closed view was obtained. The manual image
returned `Cache miss`; its other mirror returned HTTP 502. Toy designs, fan models, ORAS
and search-generated image descriptions were not substituted for original RSE evidence.

## Verification and next-chat limits

See `prototypes/ticket-45-all-generations/checks-46.json`. All 47 physical controls were
clicked on revision 46.4 after the final RSE redraw. All ten devices closed without enabled
hardware or exposed screens and reopened by keyboard. Eighteen intermediate hinge samples
passed. GSC's sampled moving-leaf counts were 1, 0 and 1, never two. The old positive X sign
with z-index 999 still failed at z=-105.71 for the top leaf at progress 0.25.

Rotom short/full native drag, rear/front flip, reactions, pause and explicit reduced motion
were checked. Reduced X/Y scan and both phone flips passed. Open II/IV/V colors and RSE's
closed disc clearance were inspected. Revision 46.5 adds rear-first selection and updates
notes/cache keys; all three selection transitions were checked separately, with no logged
browser errors in that final check. JavaScript syntax and 53 exported SVGs were validated.

A requested 390×844 viewport remained 1280×720 in the hidden tab even after reload.
The override was reset. That run is not a mobile pass; earlier revision 46.2 mobile checks
do not validate the final redraw. Real touch, other engines, screen readers, OS-level motion
preferences, pixel diffs and full collision physics remain untested.

Next chat should review RSE and VII with the user, then validate a real narrow viewport.
Original audit questions remain: GSC's lower orb is hidden closed, HGSS loop ownership needs
checking, and BW dots approach the central well. Resolved implementation does not mean
pixel-perfect artwork or production approval.
