# Mechanical and button checks for the new assets

No replacement art or implementation has passed this checklist. It defines the next build.

## User-selected hybrid construction

The user selected image layers for the casing and lid faces, with individually coded physical
controls. Each coded cap must match its chosen reference shape, colour, outline, and dimensions.
The casing artwork must not contain a second baked cap beneath it. Fixed wells and separators
remain part of the stationary layer. This is not permission to reuse ticket-26 crops.

Keep the user's eight-part sheet limit. A sheet contains at most eight registered components
from one device, not eight different devices. A larger keypad needs multiple sheets. Coded caps
have a matching coordinate manifest rather than arbitrary crops. The old eight-skin selection
does not limit this study to eight generations.

Portfolio screens remain live accessible UI. Power state and mechanical lid state are separate:
turning off blanks the displays; closing moves the actual matched lid layers. Neither operation
replaces the whole device with an unrelated flat screenshot. Preserve the current content state
when the product contract calls for resume.

## Reference authority

Select one named game and device variant before drawing. Cite the original artifact and identify
which views are absent. Do not combine Red/Green, later redraws, anime, or remakes to invent missing
parts. Screen captures establish software layout, not the unseen rear casing or hidden hinge.

## One device in all states

- Define the fixed body, moving part, hinge or slider axis, and front/back ownership once.
- The two sides of a physical leaf share a mirrored silhouette and dimensions. They must not be
  independently stretched illustrations that happen to overlap when closed.
- Register all parts in one coordinate system. Fit perspective references with a documented
  transform; do not resize each crop independently to guessed target rectangles.
- Test closed, partially open, fully open, and partially closed positions. The hinge must not
  jump, the cover must not pass through the body, and no second lens/header may appear by accident.
- For devices without a documented lid or moving shell, do not invent an open/close mechanism.
- Compare every available state with its own source. Missing rear or edge views remain unresolved.

## A button is not its whole tile

- Each control has a fixed housing/well, a moving cap, and a stationary native input target.
- A connected keypad's outer frame and separators belong to the housing. They never translate
  with a sliced bitmap cell. The cap contains no pixels from neighbouring controls or shell.
- Hit masks match actual controls. Gaps, separators, speaker holes, lamps, and D-pad centre are
  inert. Do not enlarge neighbouring rectangular hit targets into the gaps.
- The cap travels inside its own well. Reserve travel clearance; clip it before it can cover the
  neighbouring cap or cross a separator. Pressing must not change the native button's bounds.
- Use a single physical D-pad rocker with directional hit regions, not four severed bitmap arms.
- Match the measured Codédex interaction treatment where appropriate: 100ms face travel, a fixed
  depth layer, visible held state, and approximately 4 CSS pixels at the agreed desktop scale.
  A numeric CSS declaration alone is not proof of coherent motion.
- Pointer and touch activate on release over the initiating control. Dragging into a gap or off
  the control cancels. Pointer cancellation and window blur leave no stuck press or pending action.
- Focused Space and Enter hold, release, and activate exactly once. Global navigation shortcuts
  must not also fire for a focused button.
- Hover and keyboard focus name the action. Visible focus is required; audio never autoplays.
- A successful release produces a ripple confined to that cap. The ripple is pointer-inert and
  cannot change target bounds, activate another control, cross a separator, or confirm a cancelled
  drag. Reduced motion uses a static acknowledgement without expansion or cap travel.
- Fit live screen content proportionately, with an explicit local screen plane and mask. Test all
  displayed pages for overflow, not only the first page. Offer an enlarged readable view when the
  source aperture is too small; do not claim tiny device-scale text is usable portfolio content.

## Evidence required before claiming success

1. Capture the same resting asset, held control, and released control at the same viewport.
2. Compare target, housing, hinge, and neighbour bounds during the hold. They must remain fixed.
3. Probe cap centres, corners, every gap, each separator, D-pad centre, and shell decoration.
4. Check pointer, touch, Space, Enter, cancellation, and repeated open/close while retaining state.
5. Assert the visible UI/content result for every control, not only a changed internal action ID.
6. Compare closed/open silhouettes and control geometry against the selected source artifacts.
7. Test reduced motion and 375, 768, and 1280px viewports. Small controls need an intentional usable
   interaction mode, not a claim that scaling an entire device makes it touch-friendly.

Report measured checks and missing evidence separately. No claim of pixel-perfect similarity
without an actual source-aligned comparison. No claim of all controls passing from two examples.

## Ticket-34 study boundary

`../../prototypes/ticket-34-screen-fit-ripple/README.md` records thirteen separate test controls,
65 scripted checks at three widths, native mouse/keyboard checks, and screen fits in references
1, 5 and 6. These results apply to that bench only, not to final casing geometry or every physical
Pokédex control. Its instant cap displacement is for the study; the final Codédex timing contract
above is not replaced. Physical touch, source-aligned button masks and continuous lid motion
remain unverified. The extra closed-cover still is evidence for an endpoint, not a motion model.
