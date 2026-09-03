# Flat and Three.js Kanto comparison

Ticket 35. Local-only, self-authored functional device UI. Neither version is approved final art.

## Open

Use the existing server, `python -m http.server 4173 --bind 127.0.0.1` from the repository root.

- [Flat version](http://127.0.0.1:4173/.scratch/sm-dex/prototypes/ticket-35-flat-threejs/?variant=flat)
- [Three.js version](http://127.0.0.1:4173/.scratch/sm-dex/prototypes/ticket-35-flat-threejs/?variant=three)

The bottom switcher changes `?variant=` without resetting the current portfolio entry, power or
lid state. The flat version is the default. Nothing is submitted or persisted across reloads.

## What was carried forward from 26

The dark pixel-font screen, selected menu row, list/detail navigation, entry heading and secondary
information panel come from the interaction direction of `ticket-26-og-controls`. Its source code
was inspected, but its rejected image assets were not restored, imported or copied. All new casing,
bezel, hinge, wells and caps are defined in code. The existing Departure Mono font is reused.

`model.js` owns the 940 × 704 front elevation, named controls and portfolio reducer. `flat.js`
draws the functional SVG/DOM device. `three-view.js` extrudes geometry from the same coordinates,
using a stationary body and a rotating right leaf. `screens.js` draws the shared live screen
content. Accessible DOM text and larger native controls accompany the canvas displays.

Twenty-three native controls are registered over the device in each mode. In 3D their polygons
are projected from the stationary control coordinates, not from the moving cap positions. Three.js
actually renders extruded parts and button depth; it is not a flat screenshot with a CSS tilt.

## Controls and outcomes

All names appear on hover/focus. A physical gap is not a control.

| Control | Portfolio action |
|---|---|
| Left dark round | Back from detail to list, or list to main menu |
| Red narrow bar | Main menu |
| Blue narrow bar | Open selected section or entry |
| Small red bezel button | Change section, or detail page while viewing an entry |
| Connected D-pad, up/down | Previous/next selected menu item or entry |
| Connected D-pad, left/right | Previous/next section, or switch detail page |
| Cyan keys 1–5 | Profile, Moves, Encounters, Ribbons, Dex |
| Cyan keys 6–10 | Menu, previous item, next item, open, back |
| White pair | Previous/next section or detail page |
| Black narrow pair | Previous/next item |
| Yellow round | Power on/off |
| Toolbar close/open | Move the matched lid; retain portfolio selection |

Arrows, A and Escape/B work while a device control has focus. A focused native button uses Space
or Enter for its own action. Arrow keys in the bottom switcher change rendering version instead.
Keyboard shortcuts leave inputs and non-device toolbar buttons alone.

Pointer input holds only the initiating cap and accepts once on release inside its stationary
target. Moving off cancels, even if the pointer later returns. Pointer cancellation and blur clear
the press. Ripples last 360ms and are clipped to the individual target. They do not confirm a
cancelled press. Reduced motion removes cap travel and expansion and uses a 220ms static highlight.

Flat cap travel is four design-coordinate units downward, scaled with the complete device. The
press metrics report the actual resulting CSS distance. Three.js moves a cap four model units
into its own well and reports that depth separately; it is not described as four CSS pixels.
The D-pad remains one connected rocker. Its centre is inert. No divided moving bitmap arms exist.

During closing, closed state and half-open inspection, internal native controls are disabled and
screen text leaves the accessibility tree. Reopening retains the entry. Power is independent:
closing does not secretly power off, and power-off does not fake a closed lid. The always-visible
toolbar permits reopening. In the notes, the half-open inspection button freezes the physical
leaf at 90 degrees; use Open device to resume. A normal close/open sweep lasts 650ms. Reduced
motion changes endpoints without the sweep.

At phone widths the source-scale controls are small. The readable view therefore opens by default
on a fresh mobile load, providing all twenty-three equivalent native controls at least 44px high.
This does not claim the tiny controls drawn on the scaled device are themselves touch-sized.

## Source interpretation

The user selected references 1, 5 and 6 and then requested a self-authored flat version plus 3D.
[RG artwork, g1-01](https://archives.bulbagarden.net/wiki/File:RG_Pok%C3%A9dex.png) supplies the full
control inventory. [The open anime frame, g1-05](https://archives.bulbagarden.net/wiki/File:Ash_Original_Pok%C3%A9dex.png)
and [scan close-up, g1-06](https://archives.bulbagarden.net/wiki/File:Ash_Original_Pok%C3%A9dex_scan.png)
guide the white bezel and lower-right speaker treatment. Their drawings disagree. Combining those
choices into one front elevation is a disclosed design interpretation, not a pixel-perfect match.

The leaf's outer silhouette is the mirror of its inner silhouette. The closed anime reference
in `research/restart/KANTO-20-MORE.md` supports an exposed lens/header and lower cover slots.
The triangle is deliberately omitted following the user's earlier instruction. Depth, material
response, unseen surfaces and hinge clearance are reconstructed. The 3D axis is at x=466 with a
26-unit front offset, keeping the returning inner controls above the stationary body. This is
model geometry, not a measurement of an original prop or an inspected canonical hinge sequence.

The runtime is locally pinned Three.js 0.182.0, loaded only when the 3D view is selected. Its two
unmodified module files and MIT licence are in `vendor/`. Root dependencies and production files
are unchanged. The 3D view renders on demand, caps device pixel ratio at two, shares resources
where possible, and disposes GPU resources on page exit. The measured scene uses 87 draw calls.
See the [Three.js installation guide](https://threejs.org/manual/en/installation.html) for module
loading and [Three.js documentation](https://threejs.org/docs/) for the geometry and texture APIs.

## Verification

- Native browser mouse clicks on all 23 controls in both modes. Each accepts exactly once and
  produces the recorded portfolio state. Measured target/neighbour drift is zero.
- Focused keyboard arrow navigation, A, Escape and Enter exercised through actual browser input.
- All 13 keypad gaps and the D-pad centre were clicked in 3D. Accepted count remained 50.
- A real 3D drag into a gap left accepted count at 50, incremented cancellation, and left no held
  button or ripple. A native reduced-motion click measured zero cap travel and no expanding ripple.
- 56 scripted assertions pass in both modes at each of 375, 768 and 1280px. They include all
  controls, cancellation, synthetic touch, repeat suppression, feedback, power and closed access.
- No document horizontal overflow at those widths. The phone's larger controls measure at least
  44px high. Native selection is retained when switching renderers and when closing/reopening.
- Open and closed modes, the half-open 3D leaf, and phone readable mode inspected visually.
  A 3D screen-depth overlap was found during review and corrected before the final captures.

Evidence is in `evidence/`. Synthetic touch is not a physical touchscreen test. OS-level reduced
motion, other browser engines, a real screen reader and source-aligned pixel-difference comparison
remain untested. The capped press study does not establish exact canonical functions for these
portfolio mappings, nor does this comparison approve the final casing geometry.
