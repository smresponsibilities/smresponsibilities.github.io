# Classic Red asset-layer control prototype

This throwaway prototype answers one question: can the approved Classic Red PNG pixels behave as a
coherent, accessible Pokédex instead of being redrawn? The answer is yes. It does not modify or
represent production code.

## Run

From the repository root:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Open:

`http://127.0.0.1:4173/.scratch/sm-dex/prototypes/ticket-26-og-controls/`

The optional `?reduce-motion=1` flag exercises the same instant transition used by the
`prefers-reduced-motion: reduce` media query. It adds no visible debug UI.

## Asset extraction

`extract_assets.py` crops RGBA pixels from the three approved ticket 23 masters. It never redraws,
traces, recolours, or generates pixels. The output is 34 direct components and 17 component slices:

- stationary body and its separately cropped stationary hinge;
- one moving inner lid face and one moving outer cover face, with their source hinges excluded;
- stationary and inner screen bezels, lens, three lamps, outer latch, and outer slot;
- D-pad fixed base, moving face, four independently pressable direction faces, and a fixed centre;
- stationary round, red pill, blue pill, grey pill, green, and bezel-round controls;
- inner 5×2 keypad fixed base and ten moving key faces;
- inner two-key control fixed base and two moving faces;
- inner pill, two green buttons, and round confirm control.

Every direct component's source file, crop rectangle, alpha-mask rule, owner, target position, and
target size is recorded in `assets/extraction-manifest.json`. Grid and D-pad slices record their
pixel-preserving crop method and output files there as well.

The resting casing uses exact assembled master crops. Extracted fixed bases and moving faces sit on
top at the source control positions. At rest, the moving face covers its base. On press, only that
face travels four pixels and reveals the extracted base.

## Control mapping

| Physical control | Action |
|---|---|
| D-pad Up / Down | Change highlighted menu or list item |
| D-pad Left / Right | Change page or tab |
| Yellow round inner button | A: confirm/open |
| Red round bezel button | B: back; closes from Main Menu |
| Red stationary pill | START: Main Menu |
| Blue and grey stationary pills | SELECT: Red/Blue version entry |
| Black stationary round button | Close lid |
| Large green stationary button | Main Menu |
| Outer yellow triangle | Open lid |
| Inner black pill | Close lid |
| Inner white pair | Previous/next page |
| Inner green pair | Previous/next version |
| Keypad 1–5 | Open PROFILE, MOVES, ENCOUNTERS, RIBBONS, or DEX |
| Keypad 6–10 | Open the corresponding list shortcut, clamped to available content |
| Keyboard arrows / Enter / Escape | D-pad / A / B |

## Reused inside-screen material

The prototype integrates the actual design language and content from `DexScreen.dc.html` and
`SM'S DEX - Mockups.dc.html`: Departure Mono, the `#0D1117`/`#161B22`/`#30363D` flat-panel palette,
two-pixel rules, rectangular type badges, tabular numbers, selected rows with a purple left edge,
Shivam's identity card, counted stats, move list/detail content, encounter, ribbons, evolution,
roster language, and the Red/Blue entry states. It does not import any casing from those files.

Changes strictly required by the two transparent apertures are:

1. The 104–120 px avatar is 54 px in the 263×116 inner display.
2. The 72 px dex number is 24 px in that same display.
3. The eight-field identity grid becomes a context-sensitive four-field grid in detail views.
4. The full six-stat panel becomes the relevant selected stat inside the 249×191 primary display.
5. Move rows show titles in the primary list; effect, category, power, accuracy, PP, and stack move
   into the selected detail view.
6. Long panels are state pages instead of scroll regions, so physical Left/Right paging remains the
   only way to reveal alternate material.
7. The supplied files contain no main menu. The required five-item menu reuses their existing
   selected-row component without introducing a new visual vocabulary.

No casing art, explanatory casing label, debug control, iframe, screenshot, image cross-fade, or
audio was added.

## Browser verification

Verified in the Codex in-app browser on 2026-08-21:

| Check | Result |
|---|---|
| All controls | 27/27 native buttons exercised individually with pointer input |
| D-pad | Four directions changed the correct selection/page; centre click changed nothing |
| Empty casing and gaps | Three pointer probes left state byte-for-byte unchanged |
| Press depth | Moving face reached 4 px; button and fixed base remained at 0 px |
| State flow | CLOSED → BOOT → MAIN MENU → LIST → DETAIL; B reversed; START reset to menu |
| Keyboard | Arrow Up/Down/Left/Right, Enter, and Escape matched D-pad/A/B |
| Lid | One leaf rotated; body and hinge bounding boxes stayed identical open/closed |
| Front/back | Inner and outer faces remained opacity 1; `backface-visibility` selected the face; no fade |
| Closed accessibility | Only outer Open button remained; both screen DOM trees were hidden |
| Reduced motion | Leaf transition was `0.00001s`; open and closed transforms settled within 20 ms |
| Real screens | Both transparent openings exposed live listbox, option, image, heading, and text DOM |
| 375 px | `scrollWidth 375`, `clientWidth 375`, overflow 0 |
| 768 px | `scrollWidth 768`, `clientWidth 768`, overflow 0 |
| 1280 px | `scrollWidth 1280`, `clientWidth 1280`, overflow 0 |
| Console/assets | No browser errors or warnings; all rendered images decoded successfully |

Screenshots are in `screenshots/open.png` and `screenshots/closed.png`.
