# ChatGPT master-asset regeneration — research + prompts

Per-skin regeneration after ticket 30 removed generation clubbing: each version skin draws
the real Pokédex device its own game shows (`docs/research/pokedex-hardware-by-generation.md`).
The ticket-24 masters came back off-model — measured evidence in `prototypes/gen-families/_probe/`:
mismatched control twins (40–86 mean RGB), duplicate parts nobody asked for, a coral/cyan generic
phone standing in for the red Rotom Dex, exploded layouts matching no anatomy, alpha peaking at 254.

## How to run these prompts

1. Open ChatGPT with image generation available.
2. For each prompt below: first paste the **Shared production contract** block, then paste the
   prompt block into the SAME message, and attach that prompt's reference images (listed in its
   **Attach** line, all under `.scratch/sm-dex/assets/ticket-24/references/`) to the same message.
3. If a result needs a fix, reply with the specific numbered rule it broke rather than re-pasting
   everything — e.g. "rule 5: left bezel opening is painted, not a hole".
4. Save every accepted PNG exactly as named in the prompt's **Save as** line, under
   `.scratch/sm-dex/assets/ticket-30/`.
5. After each save, run the validator:
   `python .scratch/sm-dex/assets/validate_masters.py .scratch\sm-dex\assets\ticket-30\<file>.png`
   Fix and regenerate before moving to the next prompt.

## Reference links

All style refs live in `.scratch/sm-dex/assets/ticket-24/references/`:

| File | Depicts | Used by prompt |
|---|---|---|
| `pokedex-gsc.png` | Johto dex, Gold/Silver artwork | Prompt 1 |
| `pokedex-rse.png` | Hoenn dex, RS/E artwork | Prompt 2 |
| `pokedex-dp.png` | Sinnoh dex, D/P artwork | Prompt 3 |
| `pokedex-hgss-m.png` | HGSS redesigned Johto dex | Prompt 4 (+ 3 for clamshell language) |
| `pokedex-bw-art.png` | Unova dex, B/W artwork (male + female) | Prompt 5 |
| `rotom-dex.png` | Alola Rotom Dex | Prompt 6 |
| `rotom-phone-sv.jpg` | Paldea Rotom Phone | Prompt 7 |
| `game-boy-dmg-ref.png` | DMG-01 photo | Obsolete — the Game Boy family was removed; kept for history only |

Red/Blue needs **no** prompt and **no** reference: the approved ticket-23 Kanto masters
(`inner-lid-master.png`, `outer-cover-master.png`, `stationary-body-master.png`) move from the
Gen III slot to Red/Blue untouched.

## Texts and markings — researched verdict

Checked across game artwork, TCG model cards, anime appearances, and merch:

- **Game artwork carries no legible printed text** on any of these devices — no wordmarks, no
  button letters, no model numbers on the hardware itself.
- The HANDY model names (HANDY505 Kanto, HANDY808 Johto, HANDY909 FRLG, HANDY910is Sinnoh)
  exist only as TCG card flavour, not printed on the drawn devices.
- Anime screens show scrolling text; the *hardware* stays clean. '90s merch (Tiger, Bandai toys)
  prints "POKÉDEX" wordmarks — merch, not canon.

Therefore: **masters bake zero text of any kind** — no letters, numbers, wordmarks, logos made
of words, or UI glyphs. This is also BUILD.md hard rule. Anything the site needs (a "POKÉDEX"
wordmark, button labels like START/SELECT) is rendered by the production DOM/SVG layer per skin,
never baked into casing art. The Poké Ball emblem is allowed: it is a graphic, not text.

## Controls inventory — canon vs added

The shared layout contract requires pressable controls; some real devices have almost none.
Each prompt marks which controls are canon and which are minimal additions so every casing can
satisfy BUILD.md's independent-button rules. Added controls are always plausible for the device
(small pills, unbranded) and never change silhouette identity.

| Skin | Canon controls | Added for the site |
|---|---|---|
| Gold/Silver | D-pad, A/B round pair, black open-button in Poké Ball emblem | START/SELECT mini-pills |
| Ruby/Sapphire | D-pad, two round buttons, LED | START/SELECT mini-pills |
| Diamond/Pearl | D-pad, round buttons beside touch screen, stylus, LED | START/SELECT mini-pills |
| HeartGold/SoulSilver | D-pad, green LED, blue open-button, two styluses, buttons beside touch screen | none needed |
| Black/White | Single Poké Ball button, green LED; rest is touch | none — touch-only is the point |
| Sun/Moon | Flap arms, antenna; body buttons not clearly depicted | power pill + two round buttons |
| Scarlet/Violet | Volume pills, power pill, camera dot | none needed |

## Shared production contract (paste before every prompt)

```text
Asset-sheet rules, apply to every image you make for me:
1. Canvas exactly 1536x1024, RGBA PNG, fully transparent background. No floor, no sheet,
   no background drop shadow, no watermark.
2. NO TEXT anywhere: no letters, numbers, words, wordmarks, or letter-shaped marks baked
   into any part. Graphic symbols (a Poké Ball emblem) are fine; writing is not.
3. Orthographic straight-on front view only. No perspective, no tilt.
4. Left third: ONE assembled device, complete, centred vertically.
5. Right two-thirds: the SAME device's parts laid out in a grid with even gaps, in EXACTLY
   the order my prompt lists them - position encodes identity, since nothing may be labelled.
6. Screen openings must be REAL HOLES: alpha 0, see-through, showing nothing behind them.
7. Every pressable control appears twice in the parts grid: once as a MOVING FACE (raised
   top-surface art) and once as a FIXED BASE (the flat well it sits in, with inner shadow),
   identical silhouettes, adjacent in the listed order.
8. Flat toy-like shading, crisp vector-clean edges, single light source top-left.
9. Colours flat and exact per my palette. No gradients except soft plastic form shading.
10. Fully opaque paint everywhere except the holes and background: no pixel at alpha 254
    or below.
```

## Prompt 1 — Gold/Silver Johto folding dex

Attach: `pokedex-gsc.png`. Save as `gs-johto-master.png`.

```text
[paste the asset-sheet rules first]

Two sheets depicting the Johto Pokédex from Pokémon Gold/Silver, matching the attached
artwork's proportions: a portrait handheld with a folding TOP COVER, warm gold-cream shell
#E8D9A8, dark blue-grey accents #3A4658, red #C4302B Poké Ball emblem.

SHEET A - OPEN, assembled device on the left third:
Cover folded open flat LEFT of the body so both halves lie side by side:
- COVER INSIDE (left half): one 4:3 screen = transparent alpha-0 hole in a dark bezel;
  thin speaker slit above the bezel.
- BODY (right half): the round light-blue LENS #BFE0EA in a silver ring near the hinge -
  decoration, NOT a hole; the red Poké Ball emblem with a BLACK round open-button centred
  in it, just right of the hinge; cross D-pad #3A4658 mid-body left; two round buttons
  #B03636 diagonally (lower-left B, upper-right A) mid-body right; two tiny pill buttons
  bottom-centre.
Parts grid, RIGHT two-thirds, EXACTLY this order left-to-right, top-to-bottom:
row 1: cover-with-lens as ONE part | hinge bar alone
row 2: D-pad MOVING FACE | D-pad FIXED BASE
row 3: A button FACE | A BASE | B FACE | B BASE
row 4: open-button FACE | open-button BASE | pill 1 FACE | pill 1 BASE | pill 2 FACE | pill 2 BASE

SHEET B - CLOSED, single assembled device only, no grid:
Tall rounded slab like a chunky vintage cell phone: lens visible upper area, Poké Ball emblem
with black button mid-body, thin seam where cover meets body, no screen visible.
```

## Prompt 2 — Ruby/Sapphire Hoenn landscape dex

Attach: `pokedex-rse.png`. Save as `rs-hoenn-master.png`.

```text
[paste the asset-sheet rules first]

One sheet depicting the Hoenn Pokédex from Pokémon Ruby/Sapphire, matching the attached
artwork: a solid LANDSCAPE handheld shaped like a Game Boy Advance - one piece, NO hinge,
NO fold, NO keypad.

ASSEMBLED DEVICE (left third):
- Wide rounded rectangle: bright red top shell #D8302A, silver-grey bottom shell #C9CCD2,
  seam line between them around the horizontal midline.
- One large 4:3 screen (transparent alpha-0 hole) centre-right, recessed in a charcoal
  #2E2C2C bezel.
- Cross D-pad #2E2C2C far left, vertically centred to the screen; small green LED #7CBA48
  between D-pad and bezel.
- Two round buttons #2E2C2C with grey tops lower-right, diagonal (lower-left, upper-right).
- Two tiny pill buttons bottom-centre; soft shoulder bulges along the top edge.
PARTS GRID (right two-thirds), EXACTLY this order:
row 1: full screen-bezel frame as ONE part | LED cap
row 2: D-pad FACE | D-pad BASE
row 3: button 1 FACE | button 1 BASE | button 2 FACE | button 2 BASE
row 4: pill 1 FACE | pill 1 BASE | pill 2 FACE | pill 2 BASE
```

## Prompt 3 — Diamond/Pearl Sinnoh clamshell (open + closed)

Attach: `pokedex-dp.png`, `pokedex-hgss-m.png` (second is clamshell-language style only). Save as `dp-sinnoh-open-master.png`, `dp-sinnoh-closed-master.png`.

```text
[paste the asset-sheet rules first]

Two sheets depicting the Sinnoh Pokédex from Pokémon Diamond/Pearl, matching the attached
artwork: a clamshell clearly related to a Nintendo DS Lite. Rose-red outer shell #D8506A,
pale cream-white inner frame #F2EEE6, charcoal #2E2C2C controls.

SHEET A - OPENED FLAT, assembled device + parts grid:
Opened 180 degrees, both halves flat SIDE BY SIDE (upper screen left, touch screen right):
- LEFT HALF, lid inside: one big 4:3 top screen (alpha-0 hole) in a charcoal bezel; speaker
  slit holes and one mic dot beside it.
- HINGE between the halves, pale silver.
- RIGHT HALF, lower body: wide touch screen (alpha-0 hole); charcoal D-pad on the left wing
  with a small round power LED; two round charcoal buttons immediately right of the touch
  screen; slim START/SELECT pill pair below the screen edge-to-edge; stylus clipped along
  the right edge; red Poké Ball emblem near the hinge.
Parts grid, EXACTLY this order:
row 1: hinge bar alone | closed lid from sheet B as ONE part
row 2: D-pad FACE | D-pad BASE | power LED cap
row 3: round button 1 FACE | 1 BASE | round button 2 FACE | 2 BASE
row 4: START pill FACE | START BASE | SELECT pill FACE | SELECT BASE

SHEET B - CLOSED COVER, single assembled device, no grid:
Plain rose-red slab, small round dark-glass lens window upper area (decoration, NOT a hole),
Poké Ball emblem centred, stylus silhouette clipped on the side edge.
```

## Prompt 4 — HeartGold/SoulSilver pure HGSS clamshell (open + closed)

Attach: `pokedex-hgss-m.png`. Save as `hgss-open-master.png`, `hgss-closed-master.png`.

```text
[paste the asset-sheet rules first]

Two sheets depicting the redesigned Johto Pokédex from HeartGold/SoulSilver ONLY, matching the
attached artwork. Official HGSS design is the sole reference - do NOT mix in any Black/White
element: no sliding tray, no circular trackball housing, no orange accents. Glossy red #D8302A
clamshell, charcoal #2E2C2C controls, pale silver inner frame.

SHEET A - OPENED FLAT, assembled device + parts grid:
Opened 180 degrees, both halves flat SIDE BY SIDE:
- LEFT HALF, lid inside: big 4:3 top screen (alpha-0 hole) in a charcoal bezel; speaker slits
  and mic hole beside it.
- HINGE, silver.
- RIGHT HALF, lower body: wide touch screen (alpha-0 hole); charcoal D-pad on the left wing
  with a SMALL GREEN LED #7CBA48 beside it; TWO SMALL BLACK ROUND BUTTONS immediately right
  of the touch screen; slim START/SELECT pill pair BELOW the screen edge-to-edge; TWO STYLUSES
  clipped along the right edge; mic hole bottom corner.
Parts grid, EXACTLY this order:
row 1: hinge bar alone | closed lid from sheet B as ONE part
row 2: D-pad FACE | D-pad BASE | green LED cap
row 3: black button 1 FACE | 1 BASE | black button 2 FACE | 2 BASE
row 4: START pill FACE | START BASE | SELECT pill FACE | SELECT BASE | stylus x2

SHEET B - CLOSED COVER, single assembled device, no grid:
Closed clamshell front view: glossy red, small round dark-glass LENS WINDOW upper area
(decoration, NOT transparent), BLUE open-button #2F6FD0 and GREEN indicator light #7CBA48 near
the edge, two stylus silhouettes clipped on the side.
```

## Prompt 5 — Black/White Unova slider

Attach: `pokedex-bw-art.png` (male colourway only). Save as `bw-unova-master.png`, `bw-unova-compact-master.png`.

```text
[paste the asset-sheet rules first]

Two sheets depicting the Unova Pokédex from Pokémon Black/White, matching the MALE model in the
attached artwork: a vertical slider like an iPod Nano merged with an early-2010s slider phone.
Matte black body #26262A, orange #E8862E accents.

SHEET A - EXTENDED state, assembled device + parts grid:
- LOWER FIXED BODY: rounded rectangle holding a wide 16:9 touch panel (alpha-0 hole) filling
  most of it; ONE round Poké Ball power button centred above the touch panel - red cap #C4302B
  seated in a dark well; small green LED #7CBA48 beside the panel's top corner. Nothing else:
  every other function is touch, do not invent extra buttons.
- UPPER SCREEN TRAY: narrower slab SLID UP from behind the body, holding one 4:3 screen
  (alpha-0 hole); its back plate shows as a stepped orange strip where it emerges.
Parts grid, EXACTLY this order:
row 1: detached upper tray as ONE part | fixed body alone (tray removed) as ONE part
row 2: Poké Ball button FACE | Poké Ball button BASE | green LED cap
row 3: compact-state silhouette: whole device with tray collapsed flush

SHEET B - COMPACT state, single assembled device, no grid:
Same device with tray fully slid down flush into one tall slab; Poké Ball button and LED still
visible; both screens hidden inside.
```

## Prompt 6 — Sun/Moon Rotom Dex

Attach: `rotom-dex.png`. Save as `sm-rotom-master.png`.

```text
[paste the asset-sheet rules first]

Make the Rotom Pokédex sheet from Pokémon Sun/Moon, matching the attached artwork: a RED
handheld with a personality - NOT a generic phone, NOT coral, NOT cyan-bodied.

ASSEMBLED DEVICE (left third):
- Body: bright red #E8492F, slightly chubby rounded rectangle, portrait.
- Faceplate: pale cream #F5EBDD panel surrounding ONE large portrait screen; the screen is an
  alpha-0 hole with a thin cyan #59DCF2 glow rim.
- Top: Rotom's spike antenna, yellow #F2C744 tip.
- Sides: two extendible flap arms, pale cream with red tips, folded outward like small wings;
  separate parts, shown detached in the grid too.
- Bottom: two stubby pale feet.
- Slim power pill and two small round cream-top buttons low on the faceplate (minimal
  additions so the site has physical controls - the artwork depicts none clearly).
- No eyes or face on the hardware - the screen stays empty (the website draws content).

PARTS GRID (right two-thirds), EXACTLY this order:
row 1: left flap arm | right flap arm | antenna spike
row 2: foot x2 | power pill FACE | power pill BASE
row 3: round button 1 FACE | 1 BASE | round button 2 FACE | 2 BASE
```

## Prompt 7 — Scarlet/Violet Rotom Phone

Attach: `rotom-phone-sv.jpg`. Save as `sv-phone-master.png`.

```text
[paste the asset-sheet rules first]

Make the Paldea Rotom Phone sheet from Pokémon Scarlet/Violet, matching the attached image:
a slim modern smartphone in a protective case. The dex is an app on this phone - plain consumer
hardware: NO antenna, NO flap arms, NO feet, NO creature features.

ASSEMBLED DEVICE (left third):
- Slim portrait rounded rectangle: dark charcoal case #2E2C2C with a burnt-orange #E06A2A rim
  running around the case edge.
- One tall screen opening (alpha-0 hole) with a thin even bezel.
- Camera DOT in the upper bezel (dark glass, NOT a hole); tiny earphone slit above it.
- Right edge: two slim volume pills; below them one power pill.

PARTS GRID (right two-thirds), EXACTLY this order:
row 1: detachable case shell as ONE part | camera dot insert
row 2: volume-up pill FACE | volume-up BASE | volume-down pill FACE | volume-down BASE
row 3: power pill FACE | power BASE
```

## Accepting the results

Run the validator before compositing new masters:

```powershell
python .scratch/sm-dex/assets/validate_masters.py path\to\new-master.png
```

It checks canvas size, true-alpha background, real alpha-0 screen openings of usable size, and
part counts. Then eyeball against the attached references. Ticket 29's `_probe/audit.py` gate
applies unchanged (face/base mean-RGB diff ≤ 12). Only after both pass does extraction work
resume.
