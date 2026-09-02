# Kanto Pokédex device interaction references

**Date:** 2026-09-02  
**Scope:** Generation I Red/Green casing only. This note separates source-visible hardware facts from interaction choices made for the portfolio.

## Decision summary

The Kanto portfolio shell should be a straight-on reconstruction of the Red/Green game-art device, built from movable components. It should not be a single perspective raster and it should not copy the different Pokédex used by Ash in the animated series.

Two source images define the casing:

- [Red/Green open-device artwork](https://archives.bulbagarden.net/wiki/File:RG_Pok%C3%A9dex.png), 1,150 × 945. This is the clearest open-front reference. The archive identifies it as artwork from *Pokémon Red and Green*.
- [Generation I open/closed artwork](https://archives.bulbagarden.net/wiki/File:Gen_I_Pok%C3%A9dex.png), 1,224 × 650. This is the only located source that presents a coherent open and closed pair for the same game-art design.

Bulbagarden Archives is a community mirror, not a first-party publication page. Its file pages identify both images as Pokémon game artwork and expose their native files and revision history. These are the best currently located geometry references, but not primary provenance. Nintendo and The Pokémon Company pages confirm the game and Pokédex behavior, not the illustrated casing geometry: [Nintendo's 1996 Red/Green page](https://www.nintendo.co.jp/n02/dmg/apajapbj/index.html), [Nintendo's Red Virtual Console page](https://www.nintendo.com/jp/titles/50010000038658.html), and the [official Virtual Console manual](https://www.nintendo.co.jp/data/software/manual/manual_CTRNRCLA.pdf).

The repository has frozen the 1,224 × 650 open/closed image at `.scratch/sm-dex/assets/ticket-30/references/kanto-gen1.png`, SHA-256 `54aa8fac64042e469bf4bbf1bbe790ce898116c73fa51c2bb0b166c2be5efd8e`. The 1,150 × 945 open view is frozen at `.scratch/sm-dex/assets/ticket-30/references/kanto-rg-open.png`, SHA-256 `e999f88b966ea4ce2a8bde391bc2a8905744a2ffa5fd2d83bdc5f149a1119e52`.

## What the casing source actually shows

The following are visual observations from the two game-art mirrors, not inferred functions:

- A red, book-like body with a vertical cylindrical hinge through the centre.
- A stationary left instrument body and a right leaf with an inner control face and an outer cover face.
- A large blue circular element and three small red, yellow, and green lamps in the exposed upper-left cap.
- A pale angular bezel around the left dark screen.
- A lower-left field containing a black round control, one red pill, one cyan pill, one green rectangular region, and a black cross-shaped D-pad.
- A right leaf containing one wide dark screen, ten separate cyan keypad keys arranged as two rows of five, two white square keys, two black oblong keys, one yellow round key, and two long dark-green lower keys.
- In the closed view, the upper cap remains exposed while the right leaf covers the lower instrument face. A yellow triangular side detail and the cylindrical spine remain visible.

The source does **not** label the controls. It does not establish whether the blue circle is a camera, lens, button, or combined part. It does not establish that the green rectangle is a button rather than a display. It does not show press depth, switch travel, opening order, latch action, rear depth, or hinge timing.

## Motion evidence and reconstruction boundary

The open/closed pair is sufficient evidence for a right leaf that changes state around the central vertical hinge. It is not a mechanical drawing. The safest implementation is therefore:

1. Keep the left body and central hinge stationary.
2. Make the right inner panel and red outer cover opposite faces of one moving leaf.
3. Set the leaf's transform origin on the hinge axis.
4. Render the opened state straight-on for readable portfolio screens.
5. Derive the closed state from the same leaf component rather than swapping to unrelated artwork.

A literal pixel-for-pixel copy and a straight-on interface are mutually exclusive because both published references are drawn in perspective. Straightening necessarily changes pixels. Fidelity should instead mean:

- exact source control count and topology;
- preserved relative placement, silhouette landmarks, hinge ownership, and palette;
- no invented hardware;
- measured perspective normalization into axis-aligned screen openings;
- a source overlay check before approval.

Depth, unseen rear surfaces, hinge travel, and intermediate animation frames remain reconstruction. They should be documented as such and kept visually quiet.

## Hardware actions: documented versus adapted

Nintendo's official Virtual Console manual documents the original game's input model: the directional control selects or moves, A confirms and advances/interacts, and B cancels. It also documents Pokédex content: seen Pokémon expose limited identity data, while caught Pokémon expose fuller data; the Pokédex can show species data, play cries, and show habitat. See pages 6 and 15 of the [official manual](https://www.nintendo.co.jp/data/software/manual/manual_CTRNRCLA.pdf).

Those instructions describe the Game Boy/3DS controls used to operate the software. They do **not** assign functions to the controls drawn on the in-world Pokédex artwork. No reliable source located in this pass maps the ten cyan keys, white keys, black pills, green lower keys, yellow key, lens, or lamps to named software actions.

Therefore the portfolio mapping must be presented as a deliberate interaction adaptation:

| Physical control | Defensible portfolio action | Evidence status |
|---|---|---|
| D-pad directions | Move selection or change page/tab | Consistent with the official game's directional-control behavior; shell mapping is adapted. |
| Primary round key | Confirm/open selected item | Consistent with official A-button behavior; choosing the yellow shell key is adapted. |
| Secondary key | Back/cancel | Consistent with official B-button behavior; choosing a shell key is adapted. |
| Ten cyan keys | Direct section shortcuts | Portfolio-only adaptation. Keep key labels in DOM/SVG, not baked into the casing asset. |
| Black oblong pair | Previous/next page | Portfolio-only adaptation. |
| Dark-green pair | Main menu and secondary global action | Portfolio-only adaptation. |
| White pair | Device state/version utilities | Portfolio-only adaptation. |
| Blue circle and three lamps | Lens/status indicators | Source-visible, function unknown; keep non-interactive until stronger evidence appears. |

Every adapted control needs a hover/focus label that says what it does before activation. The same label must be available to keyboard and touch users; hover alone is insufficient.

## Do not mix the game-art and animation devices

The official [full first episode on Pokémon TV's verified YouTube channel](https://www.youtube.com/watch?v=z3hMX65Khtg) shows Ash's animated-series Pokédex. The animation screenshot archive identifies that model as Ash's first Pokédex in *Pokémon - I Choose You!*: [episode screenshot](https://archives.bulbagarden.net/wiki/File:Ash_Original_Pok%C3%A9dex.png).

That animation model is useful only for broad handheld-device context. It is a different design and cannot supply missing geometry, control labels, or hinge mechanics for the Red/Green book-like game-art casing. Using it to fill gaps would create a hybrid rather than an exact Kanto game-art device.

## Approval checks for the scratch prototype

The Kanto prototype should not be approved until all of these are true:

1. Open state is straight-on and both screen openings are axis-aligned.
2. Closed state is produced by the same right-leaf component rotating around the central hinge.
3. Ten cyan keys remain ten independent controls in a two-by-five grid.
4. D-pad directions are independent hit targets inside one visual cross housing.
5. Every pressable control has a fixed base and a moving face; only the face moves on press.
6. The lens, lamps, and ambiguous green rectangle are not made interactive without an explicit adaptation note.
7. Every actionable control exposes its function on hover and keyboard focus, and has a touch-readable label path.
8. Every press changes visible UI content or device state; no decorative dead buttons.
9. Keyboard behavior follows the official interaction vocabulary: directional selection, confirm, and cancel/back.
10. The final straightened casing is overlaid against perspective-normalized source landmarks before approval.

## Confidence

- **High:** visible open-state control inventory, two-by-five cyan keypad, central hinge, exposed upper cap, and closed/open topology.
- **Medium:** straightened proportions after perspective normalization and the exact closed leaf sweep.
- **Low or unknown:** control functions, hinge timing, latch action, press depth, rear construction, and whether ambiguous circles/rectangles are buttons.

