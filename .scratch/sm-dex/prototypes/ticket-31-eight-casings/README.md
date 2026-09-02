# Ticket 31: Kanto casing and controls, revision 3

This is the Kanto approval gate only. The user rejected the vector revision and asked to keep
ticket 26's illustrated look, separate the controls, and make the device close coherently.
The remaining seven casings are waiting for Kanto approval. Production files and tickets 20/21
are untouched.

## Run

From the repository root:

```powershell
python -m http.server 4173 --bind 127.0.0.1
node .scratch/sm-dex/prototypes/ticket-31-eight-casings/verify_controls.mjs
```

Open `http://127.0.0.1:4173/.scratch/sm-dex/prototypes/ticket-31-eight-casings/?v=3.2`.
Add `&reduce-motion` for the instant-transition verification path.

## How the parts work

The casing is a generated raster plate. Buttons and screen content are not baked into it.
`controls.js` is the single list of button positions, shapes, labels, and actions.

Each ordinary button contains a fixed recessed socket and an inset cap. At rest the cap has a
visible lower edge. Hover brightens only the cap. Pointer down, Space, and Enter lower it 4px.
Release, pointer exit, pointer cancellation, and blur release it. The 7px bottom inset leaves
3px of clearance even while pressed. The target and socket never move.

The ten blue keys have 10px horizontal and vertical gaps. The white pair has a 14px gap.
All 28 target rectangles are non-overlapping within their casing face. These are device-space
measurements, scaled with the casing in the overview.

The D-pad is one cross with four separate non-overlapping native button regions and an inert
centre. The entire cross rocks around its centre. Its arms are not sliced images.
This deliberately replaces the ticket's original four independent 4px D-pad arm movements.

"Inspect parts" lifts the caps for assembly inspection and exposes the fixed sockets.
It is a scratch diagnostic, not the portfolio's final chrome.

## How it closes

The yellow triangle is a triangular outer latch, not a round button carrying an arrow.

1. When closed, pressing the triangle opens the cover.
2. When open, pressing the right-hand black CLOSE pill folds that same cover left.
3. The cover rotates 180 degrees about the stationary hinge. The triangle moves with its outer face.
4. The fixed lens header stays exposed. The cover never carries a second lens strip.
5. Closing retains the current section, entry, page, and version. Reopening resumes them.

B reverses one content level and closes from Main Menu. Escape has the same behavior.
The lower left black round control also closes.

The device is 896 × 816: body 420px, hinge 56px, inner leaf 420px.
The rotation axis is x=448, at the hinge centre. The moving face begins 28px beyond that axis,
at x=476. After rotation, x=476..896 maps to x=420..0 and aligns with the body.
The two cover faces use mirrored versions of one outline. The right display and controls sit
below this outline, so the top rim does not cut into the display.

Closing makes the inner controls inert immediately, while retaining their visible cap artwork
throughout the fold. Both screens leave the accessibility tree when closed. New activation is
locked during the 700ms fold. Reduced motion takes the instant path.

## Input, action, and displayed content

All hardware controls support pointer click, native Space, and native Enter. Hover and focus
show their full function. Global arrows operate the D-pad; global Enter confirms; Escape goes back.
Enter on a focused button activates that button, not a second global confirm.

| Control | UI action | Visible result |
|---|---|---|
| Outer triangle | Open or resume | First-open boot, then menu; later opens restore the page |
| D-pad Up/Down | Move selection | Highlight changes in menu/list; entry changes in detail |
| D-pad Left/Right, white pair | Change page | Identity/flavour page or alternate entry text |
| Yellow A | Confirm | Menu → list → entry detail |
| Red bezel B, black B | Back | Detail → list → menu → closed |
| START, green MENU | Main Menu | Six portfolio sections |
| SELECT, small neutral pill, key 09 | Toggle version | Red/Blue label and version text |
| Key 01 | Profile | SHIVAM MAHAJAN, ZERO TOLERANCE |
| Key 02 | Moves | PRODUCTIVITY CALLER, CIAM WAREHOUSE, CHAINCODE, QUIZDECK |
| Key 03 | Encounters | MORGAN STANLEY, CHITKARA UNIVERSITY |
| Key 04 | Ribbons | ENDURANCE, CORE CONTRIBUTOR, PROBLEM SOLVER |
| Key 05 | Evolution | STUDENT, APPRENTICE, SOFTWARE DEVELOPER |
| Key 06 | Dex | #001 SHIVAM, REGISTERED 1/151 |
| Key 07 | Resume sample | Labelled sample resume destination |
| Key 08, + ADD POKÉMON | Roster sample | Labelled /become preview; no issue is submitted |
| Key 10 | Main Menu | Six portfolio sections |
| Dark green RED / BLUE | Pick version | Selected version entry |
| Right black CLOSE, left black round | Close | Cover folds; current page is retained |

The mappings are portfolio decisions, not claims about undocumented original hardware functions.
Content is provisional as requested. Text remains DOM and the avatar remains a remote GitHub URL.

## Asset provenance and limitations

Built-in image generation produced `assets/kanto-clean-casing-v3.png` from
`assets/kanto-coherent-master-v2.png`. The input is retained for provenance, not runtime use.
The final removal prompt is recorded in `ASSET-PROMPTS.md`.

The generated output is RGB with a baked checkerboard despite the alpha request. A second
background-extraction attempt did not fix that. Runtime uses explicit casing silhouette masks
and opaque DOM display interiors so no checkerboard is visible in the assembled device.
The atlas itself must not be advertised as a transparent PNG or reused without its masks.

The original camera, independent artwork, and deliberately added gutters cannot support a literal
pixel-perfect claim. This is an interactive illustrated revision pending the user's visual approval.
The casing texture is retained while caps are deterministic CSS parts. Small legends, the matched
cover outline, and the right display's vertical adjustment are deliberate interaction adaptations.

## Verification, 2026-09-03

- `node verify_controls.mjs`: 28 unique targets; no overlaps; 10px keypad gaps; 14px white-key gap;
  cap containment; unified D-pad; registered hinge and cover geometry.
- Native browser pointer activation: 28/28 controls recorded their own ID and changed the expected
  device/content state.
- Native browser keyboard activation: 28/28 Space and 28/28 Enter activations.
- Hover labels were checked on all 28 controls, including the triangular outer latch.
- Keys 1–6 exposed identifying portfolio content. Resume and /become are explicitly labelled samples.
- CLOSE → triangle → reopen retained the selected project and detail text.
- Closed cover and stationary body bounding rectangles matched. Mid-fold CSS matrix was sampled;
  transition duration was 0.7s and inner controls were inert.
- 375, 768, and 1280px overview layouts had zero document horizontal overflow.
- Reduced-motion flow exercised the instant open/close path.
- Browser console contained no warnings or errors during the final verification pass.
- Held-state travel is checked from geometry/CSS; an automated real held-input screenshot and touch
  emulation have not been completed. Do not claim the full original eight-casing acceptance gate.
- Small-screen overview scales the complete device. Fine controls are small on a phone; a dedicated
  enlarged interaction view remains a separate usability decision before production.

Approval captures are in `screenshots/`. Source research remains in
`docs/research/kanto-device-interaction-references.md`.
