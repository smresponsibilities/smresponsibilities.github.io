# All-generation flat device study

Ten editable devices cover generations I through IX plus HGSS. This local study extends the
selected Gen I flat drawing. Production routes and the original prototypes are unchanged.
These are authored interpretations, not pixel-for-pixel official reconstructions.

## Run

From the repository root, run `python -m http.server 4173 --bind 127.0.0.1` and open
<http://127.0.0.1:4173/.scratch/sm-dex/prototypes/ticket-45-all-generations/?gen=sun-moon&open=0&v=57.1>.
Add `&open=1` for an explicitly open initial view. Asset library contains source links and
open SVG downloads.

Regenerate the vector package with:

```sh
node .scratch/sm-dex/prototypes/ticket-45-all-generations/export-assets.mjs
```

## Assets

`assets/exported/manifest.json` records dimensions, screen apertures, controls, motion,
source notes and filenames. The package now contains 53 SVGs: ten open devices, 24 inner
layers, six exterior faces, ten control sheets and three rear drawings. There are 47
physical control targets. Devices without physical buttons have empty control sheets.

| Generation | Device ID | Interaction | Controls |
| --- | --- | --- | ---: |
| I | red | Book cover | 23 |
| II | gold | Sequential top and right leaves | 8 |
| III | ruby | Landscape RSE with right-hand crescent cover | 7 |
| IV | diamond | Clamshell | 7 |
| IV remake | heartgold | Tall clamshell | 0 |
| V | black | Sliding upper tray | 2 |
| VI | x | Separating card halves, cyan glass and scan reveal | 0 |
| VII | sun-moon | Rear-first turn, tracking irises, blinking lids, arms and float | 0 |
| VIII | sword-shield | Rear-first phone turn | 0 |
| IX | scarlet-violet | Rear-first phone turn | 0 |

Editable artwork is in `assets/kanto.js`, `classic.js`, `hoenn.js`, `middle.js`,
`rotom.js`, `rotom-rear.js` and `phones.js`. See [asset contract](assets/CONTRACT.md).
Kanto retains its dependency on the selected ticket-35 flat drawing and ticket-44 arrow.

## Interaction

Revision 56.2 leaves Gen I unchanged and restores Gen III to the user's accepted finish
and closing behavior. These two devices are the protected baselines for subsequent
corrections. Gen II uses two stacked oval keys, two round keys, centered screen-side
strips, a dark red shell and matching sky-blue beads. Gen IV has concentric controls,
a shorter matching lid/body center and a narrow dark rim around its closed semicircle.
Gen V's red lower section is 30% taller, including its control and markings. Gen VI
shows a luminous Poké Ball at the center when closed, fading away during opening.

Drag the thumb right to open, left to close. Short drags settle at a 55% threshold.
Escape, pointer cancellation, lost capture and window blur restore the last settled state.
Enter, Space, Home, End and the labelled Open/Close control provide keyboard alternatives.
Hardware activates once on release inside its target; dragging off cancels it. Lamps,
decoration and gaps remain inert.

Gold/Silver opens the top leaf before the right leaf. Closing reverses that sequence, with
separate 1- and 2-unit leaf clearances. Revision 53 follows the supplied open/closed references:
the body extends to y=746, its lower band and blue lens stay fixed below y=690, and both moving
leaves stop at that seam. The top lid is physically extended, with its screen aperture resized.
The side flap shares one outline between both faces. X hinges
rotate toward the viewer rather than behind the body. RSE restores the user-selected revision 47
layout: its right crescent closes sideways around the landscape body. The source pass does not
establish that hinge, so this motion is labelled as a deliberate visual preference.

All 31 non-directional targets use ticket 35's flat cap treatment. The artwork supplies one
shallow mounting well; the DOM supplies the cap with its original four-unit bottom clearance.
There are no added glossy wells or cap gradients. Gen I's cap colors, shadows, dimensions and
positions are compared directly against the original renderer in the browser. Directional
rockers keep their distinct source shapes with shallow flat edge accents.

Revision 55 repairs the Gen II control clearance and Gen IV screen frame alignment. Gen IV's
bezel and controls now share stage coordinates with the DOM, outside the pod illustration's
vertical compression. Screen navigation stays inside each aperture, with scrollable entry
content and a smaller menu layout for short screens. Desktop displays the 940-unit drawing at
1:1 when space permits; mobile retains the full-size readable view.

Gen I also restores the original casing palette and auxiliary readout labels. Gen IV uses a
stronger pink-red shell and lighter directional cap. Gen V uses warm gray rails, charcoal
frames and a red-orange lower shell based on the original BW artwork. These are authored color
choices, not calibrated samples. Its inferred slider motion remains unchanged.

Newly selecting VII, VIII or IX starts on the rear. Slide right turns the device toward
the front and unlocks it. Once open, Flip allows rear inspection; clicking the rear returns
to the screen. Hidden front content and controls are unavailable while turning or rear-facing.
VII retains its separate reaction and pause buttons.

VI keeps blue translucent glass in both poses and scans when revealed, with a rescan button.
VII has no invented lid. Its rear follows the user-selected SM concept sheet, adapted to the
study's front silhouette. The complete left and right zigzag arm panels leave their rear slots
during the first half of the turn; dark empty slots remain visible behind them. No substitute
rear side flaps are drawn. The front illustration takes over after the half-turn. Pointer
tracking moves the irises inside fixed eye housings.
Readable view supplies full-size portfolio text and equivalent 44-pixel controls.

Reduced motion disables casing sweeps, scan animation, iris/arm motion and floating.
A drag then updates the device pose only on release. The library checkbox supplements
`prefers-reduced-motion`. No audio plays.

## Content and reference limits

`content.js` retains Shivam's repository-backed content from `SPEC.md`. No invented
biography, project links or public-roster integration were added.

The user chose to keep X/Y only. The orange ORAS concept sheet is not the VI model.
The selected VII rear reference is `research/restart/references/g7-02.png`, originally
`479Rotom-Pokédex SM concept art.png`.

RSE's original vertical layout and the later rear-hinge crown were rejected. Revision 49 restores
the intermediate side-closing crescent selected by the user. The reference pass supports the
component inventory and a rear hinge, not this side motion, so the implementation records the
side hinge as a deliberate visual deviation. Its dimensions and unpictured exterior remain
inferred. Revision 50 seats the closed crescent's top, bottom, and hinge-side edges exactly against
the body and moves the fixed hinge caps inside that same vertical envelope. Galar and Paldea have
separate front and rear drawings; Paldea's exact screen-side
geometry remains unverified.

Diamond/Pearl now uses one coherent game-art shell in both poses. Its upper and lower centre
structures align within half a coordinate unit. The rejected ticket-48 anime closed hybrid is
removed. Revision 51 restores the complete lid outline on the exterior, including its semicircular
extension. This supersedes revision 50's centre-only exterior and its exact body-bounds assertion.
Both faces now have the same silhouette throughout closing.
Revision 53 restores the reference's dark directional-control pod on the base. Only the lid has
the pink semicircular extension. The centre body's top, right, and bottom bounds align to the
closed lid; neither lid face is trimmed.
Black/White's diagonal band is split around the centre-control well instead of being drawn through
it as one polygon.

See [generation II-V reference pass](../../research/ticket-47-gen-ii-v-reference-pass.md),
[previous implementation follow-up](../../research/ticket-46-implementation.md),
[original reference audit](../../research/ticket-46-reference-audit.md) and
[closing-depth diagnosis](../../research/ticket-46-closing-depth.md).
HGSS loop ownership and BW's inferred same-colour compact motion remain documented fidelity
questions. Passing motion checks does not resolve those source-matching issues.

## Verification

Revision 55 checks are in `research/ticket-55-review.mjs`, `ticket-55-interactions.mjs` and
`ticket-55-layout.mjs`, with JSON reports beside them. The first reproduces the old clipped menus
and glossy caps. The interaction check compares all 19 Gen I cap styles and dimensions directly
against ticket 35, checks all 47 hardware targets for single activation, cancellation, closure
and resume, and checks ten devices at 1440, 768, 390 and 320px. The layout check covers both pages
of all 15 entries in Gen I–V, SVG/DOM bezel alignment in Gen II/IV, and animated open/close with
the Gen II lower lens fixed. All pass with no page errors. All 53 regenerated SVGs parse.

Open, detail, closed and mobile evidence is named `research/ticket-55-*.png`. The additional
reference board is at `research/ticket-55-refs/index.html`. Variant labels distinguish what each
source can establish; the collection is not a claim of extra canonical mechanical views.


Historical revision 53 uses `research/ticket-53-review.mjs` to capture open, moving, and closed states
for GSC and DP. These six captures were inspected. The lower GSC lens has identical browser bounds
before and after closure. Both lid faces stop above its fixed band. No page errors occurred and
all 53 SVGs parsed. Earlier descriptions below record superseded iterations.

Revision 52 was reviewed using ten open and closed captures from `research/ticket-52-review.mjs`.
The full DP lid/body screen bounds match with zero difference. GSC's actual body and flap both
extend 36 units; the fixed foreground strip from revision 51 is removed. Round hardware no longer
clips its mounting wells and shadows, and GSC/DP directional pads have shaded faces and bevels.
The prior hardware action checks pass. All 53 SVG exports parse. RSE geometry is unchanged.

Revision 51 adds a distinct fixed GSC bottom section and a radius-matched RSE cutout shared by
both lid faces. `research/ticket-51-capture.mjs` captures the three closed devices and DP during
closing. These captures were visually inspected; the browser reported no page errors. All 53
SVG exports parsed. Historical ticket 50 coverage and DP bounds checks do not describe the
newly requested separate bottom section and complete semicircular lid.

`checks.json` through `checks-49.json` are historical evidence.
[checks-50.json](checks-50.json) records this pass. Generations II-V reached both keyboard endpoints with correct content
availability. The RSE stage fits a 390 by 844 viewport with no horizontal overflow. Rotom's
actual rear-panel motion and reduced-motion rear/front endpoints passed. Dedicated assertions
also check exact RSE and DP closed seams, complete GSC closed coverage, all shared cap styles,
press depth, single-action behavior, directional-rocker finish, and split BW band. All 53 exported SVGs parse
as XML, and the browser run reported no console or page errors.

Real touch devices, other browser engines, a screen reader and OS motion-setting changes
remain untested. Source-image pixel diffs were not performed. Final visual approval remains
with the user, especially for the authored orthographic RSE closed overlap.

## Revision 57.1

Rotom unfolds its arms before turning and settles into idle motion. Wave, Curious and
Surprise change its pose and expression; pause and reduced motion are respected.
The smile has a cyan face patch and no longer touches the screen rim. Gen V's lower
extension is slightly shorter, with matching control bounds. Gen I and III are unchanged.
See ticket 57 and `../../research/ticket-57-motion.json` for verification.