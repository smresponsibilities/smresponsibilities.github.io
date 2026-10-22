# Four-way Kanto device comparison

Tickets 35–44. Local-only, self-authored functional device UI. No version is approved final art.

## Open

Use the existing server, `python -m http.server 4173 --bind 127.0.0.1` from the repository root.

- [Flat version](http://127.0.0.1:4173/.scratch/sm-dex/prototypes/ticket-35-flat-threejs/?variant=flat)
- [Three.js version](http://127.0.0.1:4173/.scratch/sm-dex/prototypes/ticket-35-flat-threejs/?variant=three)
- [Hybrid version](http://127.0.0.1:4173/.scratch/sm-dex/prototypes/ticket-35-flat-threejs/?variant=hybrid)
- [Angled hybrid](http://127.0.0.1:4173/.scratch/sm-dex/prototypes/ticket-35-flat-threejs/?variant=hybrid&view=angle)
- [Three.js shell with quiet caps](http://127.0.0.1:4173/.scratch/sm-dex/prototypes/ticket-35-flat-threejs/?variant=shell-flat)

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
The yellow triangle is an exterior mark. The sources do not prove that it is a latch or a control.
It shares the moving cover, stays behind the open leaf and appears on the closed exterior. Depth,
material response, unseen surfaces and hinge clearance are reconstructed. The 3D axis is at x=466
and z=18.
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

## Ticket 38, sampling correction awaiting visual review

Ticket 37's nearest-filter policy above is superseded. The user reported excessive pixelation.
Matched screenshots show nearest minification dropping fine glyph strokes. All five textures now
use trilinear mipmapped minification, linear magnification and anisotropy capped at eight or the
GPU limit. Geometry antialiasing stays enabled. Resize refreshes the device pixel ratio, and a
resolution-change listener handles density changes without a stage resize. Disposal removes it.
The Three.js textures/fundamentals skills and the
[official Texture documentation](https://threejs.org/docs/pages/Texture.html) guided this change.
Optional best-practices rule files were missing. No geometry, controls, fonts or layout changed.

Runtime checks inspect actual texture and renderer properties. Old settings give 58/60 with two
filtering failures. Corrected full Three.js passes 60/60 in front and angle at 575 × 574 and
1280 × 720. At 575 × 574, hybrid front/angle pass 58/58 and flat passes 56/56. Native rocker and
cyan-key clicks accept once, travel four units and report zero target drift. Native closing
disables all internal controls. Reopening, syntax checks and whitespace checks pass; no console
errors were recorded. A full native-button batch timed out, so it is not claimed as complete.

The matched 1280 × 720, DPR 1.25 captures are `evidence/ticket38-angle-before.jpg` and
`ticket38-angle-filtered.jpg`; `ticket38-narrow-after.jpg` records the reported narrow size.
These checks do not establish subjective approval. Physical monitor-density transitions,
alternate engines and source-pixel fidelity remain untested. Tiny device labels remain tiny.

The user then reported a worse result. Inspection found their actual tab still running
`app.js?v=37`, nearest/nearest filtering and a 711-pixel buffer for a 711.2 CSS-pixel canvas at
DPR 1.25. The new code had only loaded in the isolated test tab. Their actual front-view tab
was subsequently navigated to `?variant=three&view=front&v=38-final`. Await their review before
further rendering changes. Temporary viewport overrides were reset. Changes remain uncommitted.

## Ticket 39, blue indicator and casing-edge antialiasing

The next request identifies two remaining issues: the large blue lens is a light, and the angled
casing border is jagged. The lens now has its own emissive material and a short-range cyan point
light. Both follow the existing power state. Closing does not extinguish it. It stays steady under
reduced motion, has no hit target and cannot be pressed. The external reflection remains visible
when the light is off. The [Three.js material guidance](https://threejs.org/docs/pages/MeshPhongMaterial.html)
distinguishes that reflection from self-emission.

Full Three.js now renders at two backing pixels per CSS pixel, with geometry antialiasing still
enabled. This improves coverage along shallow angled edges on 1x and fractional-density displays.
The buffer stays bounded at 2x, at most about 2.65 million pixels for the current device size.
On the tested DPR 1.25 display this costs 2.56 times as many rendered pixels as native density.
Hybrid keeps its previous capped native density. No silhouette, mesh geometry, control position,
screen filter, font or flat shadow changed. Rendering remains on demand; no bloom or pulse was added.

Full Three.js passes 63/63 checks in front and angle at 375 and 1280px, and angle at 774px.
Native power-off/on and close/open confirm the indicator state; a native click on the lamp does
not increase accepted actions. Flat and hybrid retain their existing checks. The matched 774 × 742,
DPR 1.25 views are `evidence/ticket39-angle-before.jpg` and `ticket39-angle-after.jpg`.
`ticket39-power-off.jpg` records the unlit lens. These are visual comparisons, not a claim that
every shallow diagonal is perfectly smooth at every scale or that the casing is approved final art.
JavaScript syntax/whitespace checks pass. GPU performance on other devices remains unmeasured.

## Ticket 40, leftward angle and inverse hybrid

The full Three.js angle now turns farther left, adds a slight counter-clockwise lean and scales to
95 percent so the silhouette stays inside the stage. Front and hinge views are unchanged. This is
a fixed comparison pose, not an orbit animation or user camera control.

A fourth shareable version, `variant=shell-flat`, reverses the existing hybrid. It keeps the full
Three.js casing, screens, lamp, hinge and projection but uses the flat version's simpler cap colours
and forms. The first attempt made those meshes unlit and one unit deep; user review found that they
looked printed onto the casing. The accepted revision uses seven-unit matte Phong slabs, dark wells,
dark geometry edges and restrained highlights. The standard Three.js rectangular caps also grow
from five to eight units and gain explicit dark edges. Round controls and the connected D-pad have
matching wells and sidewall contrast. Both treatments still depress four model units.

The fourth version remains one 3D scene. Its native HTML hit targets are projected from the same
control coordinates as the visible meshes; there is no DOM artwork over the canvas. Full Three.js
and the inverse hybrid each pass 63/63 input/render assertions at the default desktop viewport and
at 375 × 774. Target and neighbour drift remain zero, reduced-motion feedback remains static, the
power-linked blue indicator still passes, and no console errors were recorded. The temporary phone
viewport was reset. These checks prove interaction and fit, not final visual approval.

## Ticket 41, exterior latch and four-way verdict

The user-supplied closed-cover reference restores the yellow triangular latch. Flat and hybrid use
one SVG polygon on the mirrored exterior face. Full Three.js and 3D / quiet caps use one extruded
yellow mesh and a dark recess on the same rotating leaf as the screen and controls. It is visible
only at the closed endpoint, is absent from the control manifest and never receives a hit target.
Ticket 41's final placement was later rejected. Ticket 42 below supersedes its screen-space inset
with a perspective-correct cover-local measurement.

All four variants now use clearer comparison names and matching decision notes. Device targets gain
a subtle hover outline without changing their bounds. Toolbar and readable-view buttons gain hover
and active feedback. The page adds a skip link, theme colour and phone-specific short switcher labels.
At 375 × 774, the switcher shrank from 433px to 272px and the document has no horizontal overflow.

At the default desktop viewport and 375 × 774, flat passes 59/59 checks, full Three.js 66/66,
hybrid 61/61 and 3D / quiet caps 66/66. The added checks cover closed latch visibility, open
latch concealment and the absence of a latch input target.
Syntax, whitespace and the focused interface-guideline audit pass. Full Three.js is the recommended
base because casing, hinge, triangle, controls, press depth, lid motion and projected hit targets remain
in one coordinate system. Flat remains the line-art reference; both hybrids remain treatment studies.

## Ticket 42, reference-measured triangle alignment

The attached artwork and archived Generation I artwork were measured against the moving cover,
not the whole closed device. The attached yellow centroid is `(86.01, 243.07)`. Bilinear mapping
from the reference cover corners into the prototype cover places it near `(89, 390)`, 7.4 percent
from the free edge and 42.9 percent down from the upper cover seam. `k1-01` confirms that the mark
exists but its hand occlusion makes it unsuitable for exact placement.

The final triangle is `80,372 105,388 82,409`. Its base follows the local free-edge vector and its
tip points right and slightly upward with the cover's across-sweep vector. `model.js` owns these
points once. Flat reads them directly; Three.js mirrors them around the x=466 hinge, so all four
variants land on the same closed coordinates. The mark remains absent from the control manifest.

Flat passes 59/59 checks, full Three.js 66/66, hybrid 61/61 and 3D / quiet caps 66/66 after this
change. Syntax and whitespace checks pass, and the final browser run records no warnings or errors.
Detailed measurements and source limits are in `research/restart/KANTO-LATCH-ALIGNMENT.md`.

## Ticket 43, exterior mark mounting correction

The screenshot crop exposed a separate continuity error after ticket 42's measurement: the yellow
face was correctly placed, but its dark outline started to the right of the cover's vertical rail.
That gap made the mark look detached. The measured yellow face remains exactly
`80,372 105,388 82,409`.

Flat now draws a separate shared dark mounting well behind the yellow face, matching the existing
Three.js construction. The well begins at x=75, the same x coordinate as the exterior highlight
rail, so the two shapes overlap instead of leaving a visible gap. Both render paths read the same
well points from `model.js`. The mark remains exterior-only and non-interactive. A closed-state
check now fails if the mounting well no longer reaches the rail.

Flat passes 60/60 checks, full Three.js 67/67, hybrid 62/62 and 3D / quiet caps 67/67. The
settled flat and angled full-Three closed views were inspected in-browser; no warnings or errors
were recorded.

## Ticket 44, level flat exterior arrow

The flat exterior arrow no longer inherits the slight upward perspective measured for the Three.js
cover. Its yellow face is now `80,372 105,390.5 80,409`; its dark well is
`75,368 111,390.5 75,413`. Both bases are vertical, both tips sit on the same horizontal centreline,
and the well still meets the x=75 cover rail. Full Three.js and 3D / quiet keep ticket 42's
source-measured geometry. Flat / 3D shares the flat casing, so it receives the level arrow too.

The browser regression started red with a two-unit face-base lean, a 2.5-unit face-axis rise, a
one-unit well-base lean and a 4.5-unit well-axis rise. It now reports zero for all four values.
At 1280 and 375 pixels, flat passes 61/61 checks, full Three.js 67/67, flat / 3D 63/63 and
3D / quiet 67/67. Both widths have no horizontal overflow. The closed flat before and after
captures are `evidence/ticket44-flat-before.png` and `evidence/ticket44-flat-after.png`.
