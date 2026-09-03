# Flat, Three.js and hybrid Kanto comparison

Tickets 35–37. Local-only, self-authored functional device UI. No version is approved final art.

## Open

Use the existing server, `python -m http.server 4173 --bind 127.0.0.1` from the repository root.

- [Flat version](http://127.0.0.1:4173/.scratch/sm-dex/prototypes/ticket-35-flat-threejs/?variant=flat)
- [Three.js version](http://127.0.0.1:4173/.scratch/sm-dex/prototypes/ticket-35-flat-threejs/?variant=three)
- [Hybrid version](http://127.0.0.1:4173/.scratch/sm-dex/prototypes/ticket-35-flat-threejs/?variant=hybrid)
- [Angled hybrid](http://127.0.0.1:4173/.scratch/sm-dex/prototypes/ticket-35-flat-threejs/?variant=hybrid&view=angle)

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
response, unseen surfaces and hinge clearance are reconstructed. The 3D axis is at x=466 and z=18.
Open inner faces are coplanar; closed inner faces are 36 units apart for the taller caps. This is
model geometry, not a measurement of an original prop or an inspected canonical hinge sequence.

The runtime is locally pinned Three.js 0.182.0, loaded only when a WebGL view is selected. Its two
unmodified module files and MIT licence are in `vendor/`. Root dependencies and production files
are unchanged. The 3D view renders on demand, caps device pixel ratio at two, shares resources
where possible, and disposes GPU resources on page exit. The current full scene uses 100 draw calls;
the hybrid overlay uses 49.
See the [Three.js installation guide](https://threejs.org/manual/en/installation.html) for module
loading and [Three.js documentation](https://threejs.org/docs/) for the geometry and texture APIs.

## Ticket 35 verification

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

## Ticket 36 changes and verification

The hybrid retains the flat SVG shell, native screens and fixed control coordinates. It hides the
flat cap artwork and puts the same Three.js control geometry above it in a transparent canvas.
The front camera is orthographic and aligned to the flat coordinate origin. A depth-only leaf
mask hides controls covered by the closing flat shell. Hybrid closure uses the flat projection,
not the separate full-3D mechanical reconstruction.

Round caps now use nine-unit lathed profiles with bevelled shoulders, dark collars and recessed
wells. The connected D-pad has an eleven-unit extrusion, a three-unit bevel, its own well and
four raised direction marks. Each cap depresses four model units and darkens while held, so the
front-only hybrid view still shows the hold. Hit targets do not move or resize. The D-pad centre
remains inert. Reduced motion disables travel and uses the existing static acknowledgement.

The faint lid outlines were partly a depth bug: strokes lay beneath the bevelled front face.
The corrected paths sit above the face and use dark tube geometry rather than driver-dependent
thin WebGL lines. A key light, cool rim light and hemisphere fill define the bevels. The full-3D
hinge now opens both inner faces in one plane and leaves 36 units between them when closed.
These dimensions are design reconstruction, not a source measurement or collision-simulation claim.

- All three variants pass 56/56 input assertions at 375, 768 and 1280px. Full 3D was rerun at all
  three sizes after the hinge change.
- Native browser clicks exercised all 23 controls in hybrid and full 3D. Each accepted once,
  travelled four model units, and recorded zero target/neighbour drift. Full 3D was rerun after
  the hinge change.
- All thirteen keypad gaps and the inert D-pad centre were clicked in both WebGL modes without
  increasing the accepted-action count.
- No horizontal overflow at the measured widths. A fresh 375px hybrid load shows the readable
  view and equivalent controls at least 44px high.
- Open/closed hybrid and full-3D states were inspected. The hybrid closed view has no caps showing
  through the exterior. Evidence files prefixed `ticket36-` contain this revision's captures.

See `evidence/ticket36-checks.json`. Physical touchscreen, alternate engines, canonical source
pixel matching and final visual approval remain outside this local comparison's evidence.

## Ticket 37 view and clarity changes

Hybrid now has Front and Angled view buttons. `view=angle` is shareable and survives reload.
The transform belongs to a single wrapper containing the SVG shell, WebGL control canvas and
native targets. It tilts the composite together, rather than orbiting an independently modelled
hybrid shell. Full Three.js remains the genuine mesh-view comparison. View selection changes
instantly without adding a motion animation, including under reduced motion.

Flat cap highlights and lower shadows are thinner. The exposed dark well height is five design
units smaller, and the shell gradient is less contrasty. Casing contours remain defined. These
SVG-shell adjustments also appear in hybrid; its button caps still come from Three.js.

Screen textures now use nearest-neighbour filtering for both minification and magnification,
with no mipmaps. Full-3D Front view removes the extra 0.97 model scale and centres the model on
the flat coordinate origin. This removes linear texture softening, but it cannot make tiny text
pixel-identical at every viewport, fractional scale or viewing angle. Font rasterisation and
browser compositing still matter. Use Front view or the readable view for fine text. No claim
that all blur has been eliminated is supported by this check.

Flat front, hybrid front/angle, and Three.js front/angle each pass 56/56 existing assertions at
375 and 1280px with no horizontal overflow. All 23 native hybrid-angle controls accept once,
travel four model units and show zero target/neighbour drift. Fourteen gap/centre points remain
inert. A native drag-off in an isolated check tab cancels without a held cap or ripple. Native
reduced-motion input has zero travel; the scripted check verifies static acknowledgement.
Hybrid angle was visually checked open and closed with controls disabled when closed.

`evidence/ticket37-*` contains before/after captures and the check summary. Browser interaction
was interrupted during this ticket; the local Python server was restarted and final checks ran
in a separate tab to avoid concurrent view changes. Production and root dependencies are untouched.
