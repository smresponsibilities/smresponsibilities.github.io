# Ticket 31 — Kanto interaction approval build

This scratch prototype isolates the first approval gate for the eight-casing interaction proof.
It is not production code and it does not modify tickets 20 or 21.

## Run

From the repository root:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Open:

`http://127.0.0.1:4173/.scratch/sm-dex/prototypes/ticket-31-eight-casings/`

## What this gate proves

- The Kanto casing is a straight-on, source-informed device rather than a frozen reference image.
- The stationary body owns the central hinge. The right leaf owns separate inner and outer faces.
- Every visible physical control is an independent native button with a fixed base and moving face.
- Only the face moves four pixels while held. Pointer, touch, Space, and Enter use the same button.
- Every control explains its portfolio function on hover or keyboard focus.
- Both screen apertures contain live accessible DOM. No portfolio content is baked into casing art.
- Closed screens and inner controls leave the accessibility tree.

The vector shell is an approval reconstruction of the device identity in the accepted ticket-30
Kanto reference: red book topology, vertical hinge, lens and three lamps, two displays, ten-key pad,
white pair, dark green pair, yellow confirm button, and left D-pad controls. It deliberately makes
both UI apertures axis-aligned so portfolio text remains readable. It is not claimed as a
pixel-reassembly of the oblique printed reference; that source-lock gate remains open until this
straight-on casing direction is approved.

## Control map

| Control | UI result |
|---|---|
| Outer OPEN | Unfolds the right leaf, boots, then shows Main Menu |
| D-pad Up / Down | Moves Main Menu selection |
| D-pad Left / Right | Changes content page |
| Yellow A | Opens the highlighted section |
| Black B | Returns one UI level; closes from Main Menu |
| START / green MENU | Opens Main Menu |
| SELECT | Switches Red or Blue version entry |
| Keypad 1–6 | Opens Profile, Moves, Encounters, Ribbons, Evolution, or Dex |
| Keypad 7 | Shows the sample plain-text profile page |
| Keypad 8 | Shows the sample public-roster entry point |
| Keypad 9 | Switches Red or Blue version entry |
| Keypad 10 | Returns to Main Menu |
| White pair | Previous / next content page |
| Dark green pair | Previous / next version |
| Inner CLOSE | Folds the right leaf over the central hinge |
| `+ ADD POKÉMON` | Demonstrates the future `/become` destination without navigating in scratch |

All mappings are portfolio-site decisions. The source artwork does not document hardware semantics.

## Browser verification

Verified in the Codex in-app browser on 2026-09-02:

| Check | Result |
|---|---|
| Pointer | 26/26 physical controls activated individually; every activation recorded its control ID and visible UI/device result |
| Keyboard | 26/26 controls activated with Space or Enter; global Arrow, Enter, and Escape mappings also passed |
| Direct sections | Keys 1–6 showed identifying Profile, Moves, Encounters, Ribbons, Evolution, and Dex content |
| Utility keys | Key 7 showed the sample plain-text resume; key 8 showed `/become`; key 9 changed version; key 10 returned to Main Menu |
| State path | `CLOSED → BOOT → MAIN MENU → DETAIL`; B reversed and CLOSE folded the same leaf |
| Closed accessibility | Both screen trees reported `aria-hidden=true`; only the outer OPEN control remained visible |
| Reduced motion | Hinge transition resolved to `0.00001s`; open state reached Main Menu within the 30 ms assertion window |
| Responsive overflow | 375, 768, and 1280 px all reported zero horizontal overflow |
| Console | No warnings or errors |

Approval captures are in `screenshots/kanto-open-desktop.png`,
`screenshots/kanto-closed-desktop.png`, and `screenshots/kanto-mobile-375.png`.
