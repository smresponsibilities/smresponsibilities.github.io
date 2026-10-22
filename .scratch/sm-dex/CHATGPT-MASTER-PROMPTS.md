# Eight source-locked casing packages — prompts and validation

> Retired by ticket 32 on 2026-09-03. Do not execute these historical prompts. They incorrectly
> prescribe split moving D-pad arms, matching cap/base masks without travel clearance, and a
> Kanto closed-face source whose original-art provenance is unverified. They also predate the
> user's choice of coded pressable caps. Use `research/restart/REBUILD-PROMPT.md` and its source
> catalogue instead. The eight-slot packaging limit remains; the eight-device selection does not
> cover the new generation-I-through-IX study.

These instructions supersede the seven prompts previously stored at this path. The prior file
omitted Kanto, assumed an approval that never happened, and contradicted every attached device
reference in at least one material way.

## Required outcome

There are eight independent packages, one per selector skin. A package may contain multiple
state images and multiple component sheets. Every component sheet groups no more than eight
parts in a fixed 4 × 2 grid; it never groups eight different devices.

Pixel fidelity and text-to-image redrawing are incompatible. Source-visible resting pixels must
come from the locked source file unchanged. Image generation is restricted to hidden wells,
bases, cavities, backs, and transition surfaces that the source does not show. Generated support
art must never replace the visible source silhouette, casing paint, bezel, control face, or
highlight.

## Locked references

All local files are under `.scratch/sm-dex/assets/ticket-30/references/`.

| Package | Local file | Native size | Source |
|---|---|---:|---|
| Red/Blue | `kanto-rg-open.png`; `kanto-gen1.png` | 1150 × 945; 1224 × 650 | [open art](https://archives.bulbagarden.net/wiki/File:RG_Pok%C3%A9dex.png); [open/closed art](https://archives.bulbagarden.net/wiki/File:Gen_I_Pok%C3%A9dex.png) |
| Gold/Silver | `johto-gsc.png` | 440 × 261 | [game artwork](https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_GSC.png) |
| Ruby/Sapphire | `hoenn-rse.png` | 668 × 768 | [game artwork](https://archives.bulbagarden.net/wiki/File:RSE_Pok%C3%A9dex.png) |
| Diamond/Pearl | `sinnoh-dp.png` | 1049 × 866 | [game artwork](https://archives.bulbagarden.net/wiki/File:DP_Pok%C3%A9dex.png) |
| HeartGold/SoulSilver | `johto-hgss-m.png` | 1167 × 1024 | [game artwork](https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_HGSS_m.png) |
| Black/White | `unova-bw.png` | 776 × 526 | [game artwork](https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_BW_art.png) |
| Sun/Moon | `alola-rotom-dex.png` | 516 × 516 | [game artwork](https://archives.bulbagarden.net/wiki/File:0479Rotom-Pok%C3%A9dex.png) |
| Scarlet/Violet | `paldea-rotom-phone.png`; `paldea-phone-official-01.jpg` | 1816 × 1816; 1024 × 576 | [art mirror](https://archives.bulbagarden.net/wiki/File:0479Rotom-Phone_SV.png); [official feature page](https://www.pokemon.co.jp/ex/sv/ja/features/220803_02/) |

The archive pages are source-provenance records. The exact file hashes are frozen in
`asset-manifest.json`; do not silently replace a revision.

## Shared production contract

Paste this block before one package prompt. Attach only that package's reference files.

```text
SOURCE-LOCKED COMPONENT CONTRACT

1. The attached source image is the geometry, colour, line, lighting, texture, perspective,
   and scale authority. Do not redesign, orthogonalise, recolour, clean up, modernise, or
   substitute a similar device.
2. Do not redraw any source-visible resting pixel. Extract visible faces from the source at
   native resolution. Generate only an explicitly requested hidden surface.
3. A component sheet is exactly 1536 × 1024 RGBA. It has a true alpha-zero background and a
   fixed 4-column × 2-row grid of 384 × 512 slots. No visible grid, floor, background, shadow,
   checkerboard, label, text, number, arrow, watermark, or duplicated filler.
4. Slot order is left-to-right, then top-to-bottom, exactly as listed in the package manifest.
   Unused slots remain fully transparent.
5. A moving control face and its fixed base are adjacent. Their alpha masks, dimensions,
   orientation, scale, and anchor are identical. Only material treatment differs. The face is
   the exact source crop; the hidden base is a shallow recessed well.
6. D-pad directions are four isolated moving arms and four matching bases. The centre is absent
   and inert unless the reference has a separate centre control.
7. Screen openings in extracted casing layers are alpha zero. Never bake game UI, portfolio
   content, Pokémon entries, Rotom expressions, counters, or control labels into casing art.
8. Do not invent buttons. Lamps, lenses, cameras, speakers, bezels, gaps, arm pads, horns, feet,
   rails, and decorative Rotom anatomy remain non-interactive unless the manifest says otherwise.
9. Painted support pixels are fully opaque. A generated PNG that is RGB, contains a baked
   checkerboard, uses alpha 1–254, or changes source-visible geometry is rejected.
10. State masters assemble from one component set. Never generate open and closed states as
    unrelated pictures. If the reference does not reveal a surface, label it reconstructed.
```

## Prompt 1 — Red/Blue Kanto package

Attach `kanto-rg-open.png` and `kanto-gen1.png`.

```text
[paste the shared contract first]

Build the Red/Blue package from the attached red book-like Kanto device. Preserve the central
vertical cylindrical hinge, left blue lens, red/yellow/green lamps, pale angular left bezel,
black round lower control, red and cyan oblong controls, green rectangular region, black cross
D-pad, right dark display, ten cyan keypad keys in two rows of five, two white keys, two black
oblong keys, one yellow round key, and two long dark-green keys.

The right leaf owns one source-exact inner face and the source-exact closed outer face. The left
body and hinge stay fixed. Do not borrow the rejected ticket-23 master.

Interactive extraction IDs: dpad-up/right/down/left; keypad-01 through keypad-10; white-left,
white-right; black-pill-left, black-pill-right; yellow-round; dark-green-left,
dark-green-right; lower-black-round; lower-red-pill; and lower-cyan-pill. Keep lens, lamps,
screens, and green display-like region non-interactive.
Create as many eight-slot sheets as required; never merge the ten keypad keys.
```

## Prompt 2 — Gold/Silver Johto package

Attach `johto-gsc.png`.

```text
[paste the shared contract first]

Build the Gold/Silver package from the coral/red-orange Johto artwork. Preserve the compact
closed portrait form with short black antenna, large dark-blue circular element across the main
seam, and smaller blue circle near the lower-right. The open form has three zones: stationary
lower base, raised top screen leaf, and separate right-side leaf. Preserve the yellow-green base
screen, dark D-pad, small visible controls, and both blue circular elements.

Do not turn the shell gold or cream. Do not delete the right-side leaf. Do not invent a Poké Ball
emblem, A/B pair, START/SELECT pair, or black open button. Split the visible D-pad into four
neutral direction controls. Extract the visible small oval and three round controls with neutral
position-based IDs. Keep both blue circles non-interactive because the art does not document
their function.
```

## Prompt 3 — Ruby/Sapphire Hoenn package

Attach `hoenn-rse.png`.

```text
[paste the shared contract first]

Build the Ruby/Sapphire package from the orange portrait clamshell. Preserve the tall upper lid,
crescent top notch, green oval glass, broad cylindrical horizontal hinge, silver right hinge
drum, lower black screen bezel, large silver/black/blue circular left control, red lamp, large
green oval control, and two white pill controls.

Do not produce a landscape GBA slab. The upper lid rotates; the lower body and hinge stay fixed.
Only an open source view is approved. Do not fabricate a closed master. Interactive IDs are
centre-green, white-pill-left, and white-pill-right. If the left disc later navigates, its four
direction hit regions must stay separate while preserving one source-exact housing. The red dot
remains a lamp.
```

## Prompt 4 — Diamond/Pearl Sinnoh package

Attach `sinnoh-dp.png`.

```text
[paste the shared contract first]

Build the Diamond/Pearl package from the rose vertical dual-screen clamshell at the attached
viewpoint. Preserve the top screen lid, four-hole rounded lobe on its left, single black dot on
its right, central horizontal hinge, lower touch screen, large black semicircular side pods,
silver cross D-pad in the left concentric well, green round control in the right silver/black
ring, two tiny silver controls beside the lower screen, and small green indicator at far left.

Do not lay the screens side by side. Do not add a stylus, Poké Ball emblem, A/B pair, or
START/SELECT pills. Extract four D-pad directions, the green round control, and the two silver
controls as neutral moving faces with matching hidden bases. Keep the green indicator inert.
Any closed outer face is reconstructed, not source-exact.
```

## Prompt 5 — HeartGold/SoulSilver Johto package

Attach `johto-hgss-m.png`.

```text
[paste the shared contract first]

Build the HeartGold/SoulSilver package from the tall orange-red clamshell shown both closed and
open. Preserve the top carry loop, thin vertical green closed indicator, large blue circular
closed element, vertically stacked open displays, two green bridge indicators, orange hinge,
and gold side rails/stylus-like pieces.

Do not import Black/White controls. The reference shows no hardware D-pad, A/B pair,
START/SELECT pair, or black navigation buttons. Generate no navigation face/base pairs. Future
navigation is accessible DOM inside the transparent lower screen. Keep green indicators, blue
circle, loop, and gold rails non-interactive unless later documentation proves a function.
```

## Prompt 6 — Black/White Unova package

Attach `unova-bw.png`.

```text
[paste the shared contract first]

Build the Black/White package from the tall grey/black slider. Preserve the upper screen, the
second screen revealed in the extended state, orange lower Poké Ball-divided plate, black
diagonal band, large white/silver centre control, small green side element, two dark bottom
slots, and three tiny bottom dots. The compact source still shows the upper screen.

Do not make the body black with a red cap. Do not hide both screens. Do not add D-pad or A/B
controls. The tray translates along the long axis. Extract centre-round and green-side as
neutral controls only. State and colour are confounded in the source (orange extended, pink
compact); a same-colour pair must be labelled reconstructed.
```

## Prompt 7 — Sun/Moon Rotom Dex package

Attach `alola-rotom-dex.png`.

```text
[paste the shared contract first]

Build the Sun/Moon stationary shell from the wide creature-like Rotom Dex. Preserve its red horn,
red paddle arms with raised oval pads, red feet, blue oval eye housings, squat body, and exact
central display boundary. Keep Rotom's silhouette and eye housings; remove only the baked screen
expression from the extracted casing layer so a live accessible DOM expression or portfolio UI
can occupy the aperture.

Do not turn it into a portrait rounded rectangle. Do not add a yellow horn tip, cream limbs,
power pill, A/B pair, or any other hardware control. The arm pads are not documented buttons.
All navigation lives in labelled DOM controls inside the transparent screen.
```

## Prompt 8 — Scarlet/Violet Rotom Phone package

Attach `paldea-rotom-phone.png` and `paldea-phone-official-01.jpg`.

```text
[paste the shared contract first]

Build the Scarlet/Violet stationary package from the orange-red Rotom Phone rear artwork.
Preserve the jagged top spike, pointed lower tail, rounded phone body, dual camera, white/cyan oval
fins, and glowing cyan rear motif. Do not remove Rotom anatomy or turn the device into a generic
charcoal smartphone.

The source locks the rear only. Do not invent a front bezel or side buttons and call them
canonical. Store the rear as source-exact. A future front screen shell must wait for an in-game
front reference or be labelled reconstructed. Navigation belongs to labelled touchscreen DOM,
not invented physical volume or power controls.
```

## UI and content references

The casing prompts must not copy software pixels. Actual list and entry captures are stored in
`references/ui/` for later DOM work: RBY list/entry; GSC numerical, A–Z, old, Unown, and entry;
RS list/entry; DP list/entry/cry; HGSS list/entry/location; BW list/entry; SM list; and SV shelf.
Their behavior and fields are documented in
`docs/research/pokedex-controls-and-screens.md`.

The portfolio translation is deliberately separate: PROFILE, MOVES, ENCOUNTERS, RIBBONS,
EVOLUTION, DEX, `+ ADD POKÉMON`, and all Shivam-specific content are live DOM sourced from
`SPEC.md`. None belongs in a raster casing asset.

## Acceptance gate

Reject a package if any of these is true:

- the visible resting assembly differs from its locked source outside declared screen or
  occlusion masks;
- an ImageGen output is RGB, contains a baked checkerboard, or lacks true alpha zero;
- a face/base pair has different masks, dimensions, scale, orientation, or anchors;
- a parts sheet has more than eight occupied slots, changes slot order, or duplicates filler;
- an unreferenced control, lid, screen, Rotom feature, label, or state appears;
- open/closed or compact/extended states were generated independently rather than assembled;
- visible UI, text, digits, arrows, button functions, Pokémon content, or portfolio content is
  baked into the casing.

The first built-in ImageGen Kanto support attempt on 2 September 2026 was rejected: it changed
the black D-pad faces to red and mismatched face/base silhouettes. The corrective attempt was
also rejected because it returned RGB with a baked checkerboard instead of RGBA transparency.
Those candidates remain outside the workspace. This failure is why visible geometry stays
source-locked and generated support must pass file-level validation before use.
