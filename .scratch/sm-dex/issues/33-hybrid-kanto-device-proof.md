# 33: Fresh hybrid Kanto device proof

Status: open
Type: prototype
Priority: highest
Blocked by: 32

## Purpose

Build the first source-checked hybrid device before expanding the approach across the other
generations. This is a new build, not a repair or restoration of ticket 26 or 31.

## Starting point

Read `../research/restart/REBUILD-PROMPT.md`, `MECHANICAL-CHECKLIST.md`, and `REFERENCES.md` in that
directory. The source board has ten Kanto references, but only `g1-01` is original RG device art.
It shows the open interior. The anime frames depict a different design. Confirm the intended
Kanto baseline and address the missing outer-face reference before claiming an exact closed shell.

## Acceptance

- Record the exact variant, source IDs, coordinate system, moving-part ownership, and unresolved
  surfaces. Do not silently treat reconstructed or unattributed art as original-game evidence.
- Build casing and matched lid imagery separately from coded caps and live sample portfolio UI.
- Retain the eight-component sheet limit where raster sheets are used.
- Complete every applicable check in the mechanical checklist. Provide actual held-control,
  gap/corner, release/cancel, keyboard, touch, closing, and visible-content evidence.
- Map every control to its action and visible result; hover/focus explains that action.
- Compare the finished shell and controls against the chosen source. Report failures and missing
  evidence. Passing hit-target tests alone does not establish visual fidelity.
- Keep work in a new scratch route and leave claimed tickets 20 and 21 untouched.

No implementation has begun in this ticket.

## Context from ticket 34

The user selected Kanto references `g1-01`, `g1-05` and `g1-06` and requested screen-fit and ripple
tests plus twenty more references. [Ticket 34](34-screen-fit-ripple-and-more-references.md) answers
that bounded study. Its primary prototype is captured in commit `5ba293b` on throwaway branch
`codex/ticket34-screen-fit-ripple`; see the study README for measured input checks and limitations.
The independent bench caps are not final device controls and no casing work was started here.

The board now includes twenty additional Kanto animation frames. `KANTO-20-MORE.md` documents a
closed-cover still, finger contact with the yellow button, and incompatible control/bezel details
across the selected references. The closed anime endpoint is no longer entirely missing, but its
hinge sequence and any RG closed-face equivalence remain unverified. Settle one permanent baseline
before drawing; an optional question proposing reference 1's control inventory is still unanswered.

## Self-authored comparison from ticket 35

The next user request preferred 26's flat UI and asked for a second version using Three.js.
[Ticket 35](35-flat-and-threejs-kanto.md) built that local comparison at
`prototypes/ticket-35-flat-threejs/`, captured in `a0f7b35` on `codex/ticket35-flat-threejs`.
It deliberately interprets the shared Kanto front elevation in SVG/DOM and extruded meshes.
Neither version is approved final art or a source-exact production casing. Consult its README
and evidence before proceeding; do not confuse the new coded assets with the retired imagery.

## Third comparison from ticket 36

[Ticket 36](36-hybrid-flat-casing-three-buttons.md) adds flat casing with genuine Three.js
controls at `?variant=hybrid`. It also fixes round-cap/D-pad depth, hidden casing outlines and
closing clearance in full 3D. Capture: `b874a52` on `codex/ticket36-hybrid-depth`. All three modes
retain the shared state and input checks. Visual approval and source fidelity remain unresolved.

## Angle and clarity from ticket 37

[Ticket 37](37-hybrid-angle-and-clarity.md) adds a hybrid composite angle, lighter flat shadows and
nearest-sampled Three.js screens. Capture: `7d0c77c` on `codex/ticket37-hybrid-angle-clarity`.
See its handoff for the remaining tiny-text resampling limit. No final casing approval is implied.
