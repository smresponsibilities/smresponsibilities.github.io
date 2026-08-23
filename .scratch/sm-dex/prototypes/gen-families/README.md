# Gen family casing prototypes — asset layer

> **Superseded 2026-08-23 (ticket 30).** Generation clubbing was removed; casings are per-skin
> now, and the ticket-24 masters these pages crop are being regenerated. Kept as history of the
> extraction approach — `extract_assets.py` gets re-pointed at the ticket-30 masters once they
> pass validation.

All four casing families are now composed from the approved ticket-23/24 master PNGs. No casing
is drawn in CSS any more: every visible shell pixel on these pages is a crop of an approved
master. `extract_assets.py` performs the cropping and writes `assets/extraction-manifest.json`
(source master, crop rectangle, owner layer, target rectangle, and whether the target was
measured from the assembled device or assigned because the part has no baked rest position).

## Run

From the repository root:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Open `http://127.0.0.1:4173/.scratch/sm-dex/prototypes/gen-families/` and pick a family:

| Page | Family | Masters used |
|---|---|---|
| `../ticket-26-og-controls/` | Gen III classic red | ticket-23 masters |
| `gen45.html` | Gen IV/V dual screen | `gen-4-5-open-master.png`, `gen-4-5-closed-master.png` |
| `gameboy.html` | Gen I/II Game Boy | `gen-1-2-game-boy-master.png` |
| `rotom.html` | Gen VI–IX Rotom | `gen-6-9-modern-master.png` |

## How the pages compose the assets

1. The stationary body/shell island is cropped whole; its screen apertures stay transparent so
   real DOM screens sit behind the pixels.
2. Pressable controls are the exploded face/base twins cropped out of the same masters and laid
   back over their rest positions. On press only the moving face travels 4 px and reveals the
   fixed base or the body's own baked control beneath it.
3. Crosses and rings are additionally sliced into direction arms (crops of the face crop) so each
   direction presses independently. Arm rectangles slightly overlap so there are no dead zones;
   overlapping identical pixels are invisible.
4. Version switching recolours only the DOM screens inside the apertures. Casing pixels never
   change.

## Control mapping (all families)

| Control | Action |
|---|---|
| D-pad / cross / ring directions | Move selection; left/right change version |
| A (magenta circle / orange pill) | Confirm, open |
| B (second circle / orange pill / HOME pill) | Back to menu |
| START (grey pill / round button) | Main menu |
| SELECT / version pills / cyan pills | Cycle version |
| Keyboard arrows / Enter / Escape | D-pad / A / B |

## Known deviations

- **Ghost buttons for Game Boy A/B.** Template-matching showed the exploded magenta circles do
  not reproduce the circles baked into the body (mean diff 40–86), so overlaying them produced
  double edges. A and B are now invisible buttons over the baked circles; feedback is a focus
  ring and a press highlight. The exploded face/base crops remain in `assets/` but are unused
  by the page.
- **D-pad alignment corrected.** The D-pad face/base pair sits where template matching found
  the baked cross: face at (143, 604), base at (144, 604) in master coordinates.
- **Gen IV/V deck assembled flush.** The cross/ring deck is raised from the master's exploded
  spacing to a uniform top edge 4 px below the shell bottom (y=666), so the device reads as one
  object instead of two floating slabs.
- **Assigned positions.** Gen I/II START/SELECT pills, Gen IV/V chin controls (round START,
  HOME pill, two pills) and Gen VI–IX chin buttons have no baked rest position on any master,
  so their positions were assigned on the shell and recorded as `"positionOrigin": "assigned"`
  in the manifest.
- **Bases omitted where none exists.** Where the masters provide no base twin (pills, chin
  buttons), only the moving face is layered; it presses against the shell.
- **Rotom wings swapped.** The left column piece of the master's exploded area sweeps
  down-right, so it is used as the right wing; the mirrored piece is the left wing.
- **Gen IV/V lid.** The closed cover, inner face, hinge and lens are extracted
  (`g45-lid-outer`, `g45-lid-inner`, `g45-hinge`, `g45-lens`) but not yet composed into a
  closing animation — the closed form's geometry around the left-center edge belongs to
  ticket 20. The open form is complete.
- **Spare plates unused.** The Game Boy bezel/control plates and the Rotom bezel plate in the
  masters' exploded areas duplicate art already baked into the bodies and are not layered.

## Verification

`.scratch/sm-dex/t26-verify/families.cjs` drives all three pages headlessly:
image decode counts, initial state, keyboard flow, control clicks, 375 px overflow, console
cleanliness — 21/21 pass. Screenshots are in `screenshots/`.
