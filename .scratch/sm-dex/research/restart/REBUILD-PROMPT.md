# Reference-first hybrid Pokédex build prompt

This replaces the executable instructions in `../../CHATGPT-MASTER-PROMPTS.md`. It records the
user's current direction. No replacement artwork or interaction has passed its acceptance checks.

## Before drawing

Choose one named hardware variant and its catalogue IDs. List the states those images actually
show. Do not combine original game artwork, anime, remakes, or unattributed redraws to fill gaps.
Do not restore any ticket-23, ticket-24, ticket-26 or ticket-31 generated or derived assets.

For Kanto, `g1-01` shows original RG open artwork. It does not show the closed outer face. The
clean `Gen_I_Pokédex.png` archive image used by the old build is not verified as original artwork.
An accurate open image does not establish an accurate closed image.

### Selection and findings after ticket 34

The user selected `g1-01`, `g1-05` and `g1-06` as casing references. The separate screen-fit study
uses all three without merging their geometry. `g1-05` omits the lower-left round control and
D-pad that `g1-01` and several additional anime frames show; their bezel details also disagree.
Choose one permanent control and bezel baseline before producing the matched final states. An
optional question proposing reference 1's control inventory has been sent but is not yet answered.

The twenty additional references are documented in `KANTO-20-MORE.md`. `k1-01` now provides an
anime closed-cover view, with the lens and header exposed. Its small triangle conflicts with the
user's earlier instruction to omit that mark; omission must be labelled a deliberate adaptation.
The still does not verify hinge motion, latch operation, or the original RG device's closed face.

## Construction

Build an interactive portfolio device, with these separate layers:

1. Image casing with transparent screen apertures and no baked copies of moving button caps.
2. Fixed wells, keypad separators, bezel, hinge hardware, and documented non-controls.
3. Individually coded button caps, matched to source shape, line, colour, size and placement.
4. Live accessible screen content, using sample portfolio data until the real copy is supplied.
5. Matched inner and outer lid images attached to the same leaf, where that device has a lid.

Use one coordinate system for imagery, hit masks, cap wells, live screens, and mechanical parts.
Do not stretch pieces independently to make them fit. Keep the source camera or document any
reprojection. Redrawing and reprojection cannot be described as unchanged source pixels.

Each button has a stationary input target and fixed well. Only its cap moves. The cap must stay
inside that well during the entire press; no separator or neighbouring button may move with it.
Each physical gap is inert, including the centre of a D-pad if it has no centre button. A D-pad
uses one connected rocker and separate direction hit regions, not detached moving arms.

Give each button a hover/focus action description. Pointer and touch activation occurs on release
over the initiating control. Moving off it, cancellation, or window blur cancels. Space and Enter
show a held state and activate exactly once. Respect reduced motion and never autoplay audio.

The user additionally requested click ripples. The ticket-34 study demonstrates a 360ms ripple
clipped to the accepted control's cap, with no success ripple on cancellation. Reduced motion
uses a 220ms static acknowledgement without cap travel. Carry this behaviour forward for testing;
these effects are portfolio additions, not canonical hardware functions. Keep the button's
stationary input mask separate from the ripple layer and all casing imagery.

Screen fit is feasible with a uniformly scaled 160 × 144 UI inside a projected local screen plane.
Keep letterboxing where needed and provide an enlarged reading mode. The study's manually chosen
apertures are not final geometry, and its sample copy does not replace the content specification.

Write a table for every control: physical shape and source, input action, press feedback,
resulting screen, displayed portfolio fields, and cancellation behaviour. Mark portfolio actions
as application choices, not canonical Pokémon hardware functions.

## Closing and power

A lid does not close by fading between separately generated pictures. Its inner and outer faces
share a silhouette, axis, scale and anchor. Test intermediate states and occlusion, not just open
and closed endpoints. Determine the real latch or opening gesture from evidence before assigning
it an action. Do not turn a lamp or decorative triangle into an invented button.

Keep mechanical state separate from power. Off displays may use a matched glass image, but the
live UI must become non-interactive while hidden. Preserve content state for resume. Devices
without lids need their own documented behaviour; do not add a Kanto hinge to Rotom phones.

## Delivery and proof

Retain batches of no more than eight components per sheet, using the existing 4×2 slot contract
where raster sheets are useful. Never put eight devices into one extraction sheet. Coded caps
must have matching geometry metadata so their input regions can be tested independently.

Complete `MECHANICAL-CHECKLIST.md`. Show source-aligned comparisons of casing, outer face, controls
and every documented state. Capture a held button and prove the well, target and neighbours stay
fixed. Probe gaps and corners. Verify each control's actual visible UI result, not just a changed
internal action value. Report missing evidence and failing checks. Do not claim pixel-perfect
similarity, complete controls, or approved geometry without those results.

## Cross-check against the retired prompt

| Old instruction | Replacement |
|---|---|
| Split a D-pad into four moving arms | One physical rocker, four direction hit regions, inert centre |
| Cap and base have identical masks | Fixed well includes verified travel clearance; cap remains contained |
| Extract each key from a whole keypad tile | Separate cap art from fixed frame and separators |
| Source-exact closed Kanto face from clean redraw | Original provenance and matching leaf geometry required |
| Eight packages are the complete device scope | Nine-generation source study, with remakes labelled separately |
| Raster control faces are mandatory | User-selected coded caps matched to source geometry |
| Open/closed endpoint images suffice | Same physical part with intermediate-state and occlusion checks |

Generative images are not a deterministic pixel-matching method. If used later for an unseen
surface, label it reconstructed. They cannot establish missing canonical geometry or prove a
button's function.
