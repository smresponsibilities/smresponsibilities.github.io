# Ticket 29 — Regenerate ticket-24 master assets from researched prompts

Status: open
Priority: high
Blocks: 20 (Gen 4/5 production casing), 25 (family docs), any production use of the casings
Blocked by: nothing — prompts and validator are ready

## Problem

The ticket-24 masters came back off-model. Measured evidence in
`prototypes/gen-families/_probe/`:

- Game Boy A/B exploded circles differ from their baked counterparts by 40–86 mean RGB —
  the sheet contradicts itself.
- Ambiguous duplicate parts: three magenta circles where two were asked for, spare
  bezel/control plates.
- Rotom frame is a coral/cyan generic phone; the real Rotom Dex is red with antenna,
  feet, flap arms.
- Every master peaks at alpha 254 — never fully opaque.
- Exploded layouts do not map onto real device anatomy (research shows what they should).

## Done this session (do not redo)

- `.scratch/sm-dex/CHATGPT-MASTER-PROMPTS.md` — research table on all four device families,
  shared asset-sheet contract, three copy-paste ChatGPT prompts (GB landscape dual-screen,
  HGSS clamshell open+closed, Rotom Dex).
- `.scratch/sm-dex/assets/validate_masters.py` — automated gate. All four current masters
  pass its structural checks today; regenerated sheets must pass it too.

## Acceptance criteria

- [ ] User runs the three prompts in ChatGPT with `references/` images attached as style refs.
- [ ] Each returned PNG saved under `.scratch/sm-dex/assets/ticket-24-v2/` using the same
      four filenames as ticket-24.
- [ ] `python .scratch/sm-dex/assets/validate_masters.py <each new png>` passes with no WARN
      about alpha extrema (must reach 255) and reports ≥2 parts + screen-sized holes per sheet.
- [ ] Human eyeball pass against `references/`: GB reads as DMG-01 adaptation, G45 reads as
      HGSS clamshell (open flat + closed cover), Rotom reads as red Rotom Dex with antenna
      and feet.
- [ ] `_probe/audit.py` re-run against new masters produces no face/base silhouette mismatch
      worse than mean-RGB diff 12 (current worst is 86).
- [ ] Only after all above: point `extract_assets.py` at v2 and rebuild family prototypes.

## Non-goals

- Gen III stays on approved ticket-23 masters.
- No production casing work until masters accepted (ticket 20 remains claimed anyway).

## Superseded in part by ticket 30 (2026-08-23)

Generation clubbing was removed; casings are now per-skin (see ticket 30). This ticket's file
list and "three prompts" are out of date: `CHATGPT-MASTER-PROMPTS.md` now holds seven per-skin
prompts, outputs go to `.scratch/sm-dex/assets/ticket-30/`, and Red/Blue needs no new art
(ticket-23 masters re-slot). The validator + audit gate below still applies verbatim.
