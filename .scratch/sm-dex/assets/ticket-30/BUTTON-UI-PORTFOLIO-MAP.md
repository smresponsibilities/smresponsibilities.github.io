# Button press, UI result, and portfolio-content map

This map is the handoff from ticket 30's neutral asset IDs to ticket 31's interaction proof.
Physical functions are not documented by the device artwork, so the mappings below are site
adaptations, not claims about Pokémon canon.

## What a press does

Every hardware control is a native `<button>`. Pointer, touch, Space, and Enter use the same
accessible action. The visual and application checks are intentionally separate:

1. while the input is held, only the moving face and its DOM/SVG glyph translate down 4 px;
2. the fixed base, native hit target, shell, hinge, neighbouring controls, and layout remain fixed;
3. release returns the face to its resting position; and
4. the native `click` activation performs the mapped action and changes the live screen DOM.

`prefers-reduced-motion: reduce` removes transition time, not the 4 px held state. Empty casing,
control gaps, lenses, lamps, cameras, speakers, horns, arms, feet, rails, and D-pad centres do
nothing. Focus remains visible. Audio never autoplays.

## Shared application actions

| Action | UI result |
|---|---|
| `navigate-up` / `navigate-down` | Move the highlighted Main Menu or list row by one, wrapping only where the screen specification says so. |
| `page-left` / `page-right` | Change the current list page, entry page, or detail tab. |
| `confirm` | Open the highlighted destination or selected entry. |
| `back` | Return exactly one application level. It never closes multiple levels at once. |
| `main-menu` | Open Main Menu without discarding the selected version. |
| `version-selector` | Open the eight-version picker; choosing a version swaps casing, tokens, and flavour text without replacing portfolio data. |
| `open-close` | Move a source-covered hinged casing between its registered states and update `aria-expanded`. Unavailable screens leave the focus order and accessibility tree. |
| `extend-compact` | Move the Unova tray between compact and extended states and update `aria-expanded`. |
| `open-section:<id>` | Open one portfolio section directly from a dedicated keypad key or screen control. |
| `plain-text` | Open `/resume`, the same portfolio data without device chrome. |
| `add-pokemon` | Open `/become`. The visible label is always `+ ADD POKÉMON`. |

## Per-casing control map

| Package | Physical control | Site action | Immediate visible result |
|---|---|---|---|
| Red/Blue | D-pad up/down/left/right | navigate up/down; page left/right | Highlight or page changes on live DOM screen. D-pad centre remains inert. |
| Red/Blue | Yellow round | confirm | Highlighted section or roster entry opens. |
| Red/Blue | Dark-green left / right | back / main-menu | Previous state or Main Menu appears. |
| Red/Blue | Black pill left / right | page-left / page-right | Previous or next detail tab/page appears. |
| Red/Blue | White left / right | open-close / version-selector | Right leaf changes registered state; version picker opens. |
| Red/Blue | Lower black round | open-close | Right leaf changes registered state. |
| Red/Blue | Lower red / cyan pills | back / confirm | Previous state appears or highlighted destination opens. |
| Red/Blue | Keypad 01–06 | PROFILE, MOVES, ENCOUNTERS, RIBBONS, EVOLUTION, DEX | Named portfolio section opens directly. |
| Red/Blue | Keypad 07 | plain-text | `/resume` opens. |
| Red/Blue | Keypad 08 | add-pokemon | `/become` opens. |
| Red/Blue | Keypad 09 / 10 | version-selector / main-menu | Version picker or Main Menu opens. |
| Gold/Silver | D-pad up/down/left/right | navigate up/down; page left/right | Highlight or page changes. |
| Gold/Silver | Small oval | back | Previous application state appears. |
| Gold/Silver | Round left / middle / right | confirm / main-menu / version-selector | Highlighted destination, Main Menu, or version picker appears. |
| Gold/Silver | Labelled screen control | open-close | Top and right leaves move through registered source states. Both blue circles remain inert. |
| Ruby/Sapphire | Circular disc up/down/left/right regions | navigate up/down; page left/right | Highlight or page changes while one source-exact disc housing remains visible. |
| Ruby/Sapphire | Large green control | confirm | Highlighted destination opens. |
| Ruby/Sapphire | White pill left / right | back / main-menu | Previous state or Main Menu appears. |
| Ruby/Sapphire | Labelled screen control | version-selector | Version picker opens. No closed form is shown until a closed source is locked. |
| Diamond/Pearl | D-pad up/down/left/right | navigate up/down; page left/right | Highlight or page changes. |
| Diamond/Pearl | Green round control | confirm | Highlighted destination opens. |
| Diamond/Pearl | Silver upper / lower | back / main-menu | Previous state or Main Menu appears. |
| Diamond/Pearl | Labelled screen controls | version-selector, open-close | Version picker or explicitly reconstructed lid state appears. |
| HeartGold/SoulSilver | Labelled lower-screen controls only | all shared actions | UI changes without invented D-pad, A/B, or START/SELECT hardware. Green indicators, blue circle, loop, and rails remain inert. |
| Black/White | White/silver centre control | confirm | Highlighted destination opens. |
| Black/White | Green side control | back | Previous application state appears. |
| Black/White | Labelled screen controls | navigation, pages, main-menu, version-selector, extend-compact | UI or tray state changes; compact form keeps its upper screen visible. |
| Sun/Moon | Labelled screen controls only | all shared actions | Portfolio UI changes inside the central display. Horn, arms, pads, feet, and eye housings remain inert. |
| Scarlet/Violet | Labelled touchscreen controls only | all shared actions | Portfolio app UI changes. Spike, tail, fins, rear motif, and cameras remain inert. |

## State flows

- Red/Blue, Gold/Silver, and HeartGold/SoulSilver:
  `CLOSED → BOOT → MAIN MENU → LIST → DETAIL`.
- Diamond/Pearl: `RECONSTRUCTED CLOSED → BOOT → MAIN MENU → LIST → DETAIL`; the first state
  must be visibly labelled reconstructed in the asset/proof metadata.
- Ruby/Sapphire: `OPEN/OFF → BOOT → MAIN MENU → LIST → DETAIL` until a real closed reference is
  locked. The proof must not fabricate a canonical closed casing.
- Black/White: `COMPACT → EXTENDED → BOOT → MAIN MENU → LIST → DETAIL`.
- Sun/Moon and Scarlet/Violet: `OFF → BOOT → MAIN MENU → LIST → DETAIL`.

## Portfolio content assertions

The screen contains Shivam's portfolio, not a sample Pokémon. Ticket 31 must reach every section
and assert at least the following identifying values from `SPEC.md`:

| Destination | Required visible portfolio content |
|---|---|
| PROFILE | `SHIVAM MAHAJAN`, `Software Developer`, `#001`, `DRAGON / STEEL`, `Punjab, India`, GitHub `smresponsibilities`, and `RELEASED`. The counted stats include 1,150-day streak, 25,000+ lines, 425 test suites, 5,000,000 events, 1,000,000 simulated users, and 2,600 problems. |
| MOVES | `PRODUCTIVITY CALLER`, `CHAINCODE`, `QUIZDECK`, and `TM01 · CIAM WAREHOUSE`, including Power, PP, category, stack, and impact text. |
| ENCOUNTERS | `MORGAN STANLEY`, `Technology Apprentice`, `Aug 2025 – Aug 2026`, `NEST BALL · On-campus`, plus `Chitkara University`, BE CSE, and CGPA `9.35/10`. |
| RIBBONS | Core Contributor, Endurance, Problem Solver, Tournament, and Dean's List. |
| EVOLUTION | STUDENT → APPRENTICE → SOFTWARE DEVELOPER → `???`, with `EVOLUTION CONDITION UNKNOWN` on the final silhouette. |
| DEX | Public roster, registered/seen progress, selected entry, version-specific Shivam flavour text, and a shareable entry route. The Red draft begins `Consumes coffee`; Blue references five million events; Gold references 2,600 problems. |
| `+ ADD POKÉMON` | Navigates to `/become`; the control remains labelled, keyboard reachable, and outside raster casing art. |
| `VIEW AS PLAIN TEXT` | Navigates to `/resume` and exposes the same portfolio facts without game chrome. |

Some `SPEC.md` values remain marked as proposals or questions. The proof should consume the data
files produced from the accepted specification rather than duplicating these strings in casing
code. The strings above are regression identifiers, not a second content source.
