# Screen fit and button feedback study

Ticket 34, 2026-09-03. Throwaway branch: `codex/ticket34-screen-fit-ripple`.

## Answer

Live game-style UI fits the visible screens in references 1, 5 and 6. A small 160 × 144 layout
can remain proportionate inside each local screen plane, with spare space letterboxed. The whole
plane then follows the source perspective. This is a manual inset fit, not a source-exact tracing
or proof that the three casings share identical geometry. Reference 5 is too small to read long
portfolio copy at device scale, especially on a phone. The study includes an enlarged accessible
reading view; the final portfolio needs an equivalent readable mode and shorter device pages.

A short ripple can acknowledge a successful button release. It is clipped inside the individual
cap and does not move the casing, targets, wells, or neighbouring controls. A cancelled press
does not receive a success ripple. The normal expanding feedback lasts 360ms; reduced motion
removes both expansion and cap travel, using a 220ms static highlight instead. These are proposed
portfolio interactions, not verified canonical hardware effects.

## Run and try

From the repository root, run `python -m http.server 4173 --bind 127.0.0.1`, then open
[the study](http://127.0.0.1:4173/.scratch/sm-dex/prototypes/ticket-34-screen-fit-ripple/).
No framework build, installation, data submission, audio, or persistence is involved.

1. Choose reference 1, 5 or 6. Switch between live sample content, original game capture, and the
   unchanged source. The comparison image itself has not been edited.
2. Press a cyan key. Its face moves 4 CSS pixels inside its fixed well. Release over the same key
   to change the page once. Hover or focus it for the action description.
3. Drag off a key into a gap before releasing. The press cancels, without a screen action or ripple.
4. Focus a key and use Space or Enter. Repeated keydown events must not duplicate the action.
5. Turn on “Freeze ripple for inspection” to pause the expanding circle at 60ms. “Show held cap”
   is a labelled visual preview, not a simulated claim of real pointer input.
6. Try the reduced-motion preview and yellow power button. Power-off blanks and disables live
   content; power-on resumes the previous page. It does not close a lid.
7. Run the scripted input checks. Their synthetic mouse/touch/keyboard events are labelled;
   ordinary mouse and keyboard use is recorded separately as browser input.

## Control and content contract

These are thirteen separate **bench controls**, not thirteen completed casing controls. Their
colours and families help test the proposed interaction; their geometry is not a final tracing.
No D-pad, latch, lens action, or missing control is implied by this study.

| Control | Accepted action | Visible sample content |
|---|---|---|
| Cyan 01 | Show Profile | Shivam Mahajan, developer label, short introductory text |
| Cyan 02 | Show Moves | Sample project and impact placeholder |
| Cyan 03 | Show Encounters | Career-history placeholder |
| Cyan 04 | Show Ribbons | Achievement placeholder |
| Cyan 05 | Show Evolution | Career progression placeholder |
| Cyan 06 | Show Dex | Roster preview, first entry |
| Cyan 07 | Show Join | Form preview; nothing is submitted |
| Cyan 08 | Show Resume | Plain-text portfolio placeholder; no download yet |
| Cyan 09 / white left | Previous page, wrapping | Previous page's title, number and sample copy |
| Cyan 10 / white right | Next page, wrapping | Next page's title, number and sample copy |
| Yellow round | Toggle power | Blank inactive screens or the previous page restored |

Every accepted action updates the visible action count, input label, page and feedback label.
While powered off, all bench controls except yellow are disabled. The reference-only comparison
intentionally remains unchanged even when the live display's power is off. The original-game mode
shows an entry capture for Profile and a list capture for the other pages; it is not an emulated game.

## Sources and screen registration

The five source files are unchanged, downloaded archival references. They are separate local
dependencies under `../../research/restart/references/`, not new generated casing assets.

| ID | Original artifact | Native pixels | Study use |
|---|---|---|---|
| g1-01 | [RG open artwork](https://archives.bulbagarden.net/wiki/File:RG_Pok%C3%A9dex.png) | 1150 × 945 | Main and right display fit |
| g1-05 | [Original-series open frame](https://archives.bulbagarden.net/wiki/File:Ash_Original_Pok%C3%A9dex.png) | 640 × 480 | Main and right display fit |
| g1-06 | [Original-series scan close-up](https://archives.bulbagarden.net/wiki/File:Ash_Original_Pok%C3%A9dex_scan.png) | 640 × 480 | Visible main display only |
| g1-03 | [RBY list screen](https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_RBY.png) | 160 × 144 | Original game comparison |
| g1-04 | [RBY entry screen](https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_entry_RBY.png) | 160 × 144 | Original game comparison |

The local main planes are 192 × 176 for reference 1, 224 × 160 for 5, and 256 × 224 for 6.
The 160 × 144 UI uses one uniform scale within each plane. Eight linear equations produce the
CSS projective transform from the plane corners to the four inset image points in `references`.
These manually chosen planes and corner coordinates are study assumptions, not measured physical
screen dimensions. Final casing construction must replace them with source-registered geometry.

The enlarged reader holds the accessible content; projected duplicates are hidden from assistive
technology. The native text layout is 160 × 144 with 6px padding. A measured 2px overflow in an
earlier 7px-padding version was corrected and all eight pages rechecked using native keyboard input.

## Verification

Recorded in [browser-checks.json](evidence/browser-checks.json), with viewport screenshots in
`evidence/`. This proves the study's behaviour, not the future final casing's behaviour.

| Check | Observed result |
|---|---|
| Browser mouse, all 13 controls | Each accepts exactly once; expected page or power result |
| Hold measurements during those native clicks | 4px cap travel, 0px target/neighbour/source-stage/keypad drift |
| Native Space across all eight pages | Correct reader and projected titles; both layouts remain 160 × 144 without overflow |
| Native Space and Enter | One activation per press/release |
| Four top-row gaps, native coordinate clicks | Accepted count stays 17 before and after |
| Native drag from key 02 into a gap | Accepted count stays 17; cancellation increments; no held cap or ripple remains |
| Yellow control's clipped top-left corner | Accepted count stays 28 before and after |
| Frozen ripple after native key 02 click | One circle inside key 02; clipped, pointer-inert; neighbours unchanged |
| Power off/on | Live main display hidden, side text transparent, reader inert, previous page restored |
| Source-only mode | Main overlay removed; side overlay hidden |
| 65 scripted assertions at each of 375, 768, 1280px | 65 pass / 0 fail at each width |
| Responsive horizontal extent | scrollWidth equals clientWidth: 360, 753, 1265px respectively; remaining width is browser scrollbar |
| 375px bench | Cyan targets approximately 49.4 × 48px, inert 8px gaps; enlarged reader fits |
| Expanded reference board | 110/110 images load, dimensions match catalogue; 20/20 on the extra-Kanto tab |
| Download integrity | 110 distinct local SHA1 values; no changes from the saved download-verification records |

The scripted cases include touch pointer cancellation and acceptance, keyboard-repeat suppression,
gap hit testing, ripple clipping, reduced-motion preview and power resume. They are **not physical
touchscreen tests**. The OS-level reduced-motion media preference, a screen reader, and other
browser engines have not been tested. Only the checked gaps and corners are reported; this is
not an exhaustive hit-mask proof for an eventual casing.

`ripple-native-frozen-1280.png` follows a native click but freezes its animation for inspection.
`held-preview-1280.png` and `resting-controls-1280.png` are matched preview states; the hold image
is explicitly not a capture of a physical mouse being held down. The numeric measurements in
the native input records are taken during real browser press events.

## Decision for the next build

Retain image-based shell/lid surfaces and live screens, with fixed button wells and independent
coded caps. Carry forward contained success feedback and an enlarged reading mode. Do not copy
the study's approximate cap art, guessed screen planes, instant cap transition or numbered bench
labels into a claim of pixel-exact final artwork. Final timing remains subject to the measured
Codédex interaction contract; the study's instantaneous 4px hold makes displacement measurable.

The selected sources disagree about bezel and control inventory. The new closed-cover frame has
a triangle; omitting it follows the user's earlier request but is an explicit adaptation. One
permanent control/bezel baseline and an inspected continuous closing sequence are still needed.
See [the twenty-reference findings](../../research/restart/KANTO-20-MORE.md) and ticket 33.

Implementation references: [Pointer Events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events),
[reduced-motion media query](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion),
and [CSS matrix3d](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/transform-function/matrix3d).
