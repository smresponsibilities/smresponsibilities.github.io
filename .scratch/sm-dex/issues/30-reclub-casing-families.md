# 30: Eight source-locked casing packages

Status: resolved
Priority: highest

## What changed

The user rejected the ticket-24 generation families and then explicitly rejected the presumed
ticket-23 Kanto approval. Fresh source comparison also proved that the existing seven prompts
contradict their attached artwork. This ticket therefore replaces every prior casing master,
including Kanto.

“Clubbed by eight” has two binding meanings:

1. the selector owns eight independent casing packages, one per game pair; and
2. detached component sheets contain at most eight known parts in a fixed 4 × 2 grid. A package
   may use multiple sheets. Eight different devices must never share one generative sheet.

## Skin → source → state plan

| Skin | Source-locked device | Required visible states |
|---|---|---|
| Red/Blue | Kanto red book device, central vertical hinge, blue lens, three lamps, ten-key cyan pad | open + closed |
| Gold/Silver | Coral Johto device with stationary base, raised top leaf, right-side leaf, blue orbs | open compound form + closed |
| Ruby/Sapphire | Orange Hoenn clamshell with tall upper lid, broad hinge, circular left control | open; closed remains unresolved until sourced |
| Diamond/Pearl | Rose vertical dual-screen clamshell with left D-pad pod and right green control pod | open; reconstructed outer face labelled as such |
| HeartGold/SoulSilver | Tall orange-red dual-screen clamshell with loop, green indicators, gold side rails | open + closed |
| Black/White | Grey vertical slider, orange lower plate, large white centre control | extended + compact |
| Sun/Moon | Wide creature-like Rotom Dex with red horn, arms, feet, and eye housings | stationary front |
| Scarlet/Violet | Orange-red Rotom Phone with jagged spike, pointed tail, cyan/white fins, dual camera | rear source view; front remains unresolved |

Locked source pixels live under `.scratch/sm-dex/assets/ticket-30/references/`. Source URLs,
native dimensions, hashes, state coverage, and component IDs live in `asset-manifest.json`.
The gameplay captures under `references/ui/` are software references, never casing art.

## Fidelity and component contract

- Source-visible resting pixels come directly from the locked file revision. Text-to-image output
  may not redraw them. This is the only defensible pixel-fidelity route.
- A generated pixel is allowed only for a hidden base, cavity, rear surface, or otherwise unseen
  transition surface. It must be labelled `generated-support`, never `source-exact`.
- Each component sheet is 1536 × 1024 RGBA, four columns by two rows, eight 384 × 512 slots.
  Slot identity comes from the manifest; no label is baked into a PNG.
- Every interactive face and fixed base use identical alpha masks, dimensions, scale, orientation,
  and anchor. At rest, recomposition must match the accepted source pixels exactly outside declared
  screen and occlusion masks.
- D-pad directions are four independent hit targets and four independent moving faces. The centre
  is inert unless the source depicts a separate centre control.
- Screen apertures are alpha zero in extracted runtime layers. Portfolio content, labels, Rotom
  expressions, counters, and game UI remain accessible DOM/SVG, never casing pixels.
- HGSS, Sun/Moon, and Scarlet/Violet receive no invented navigation hardware. Equivalent labelled
  DOM controls live inside their transparent screen areas.
- Visible button semantics are not inferred from artwork. Neutral IDs such as `dpad-up`,
  `keypad-01`, and `centre-round` are mapped to actions later.

## Build order

- [x] Confirm eight independent devices and reject all previous casing approvals.
- [x] Download and hash the eight highest-value device references plus Kanto open art.
- [x] Download list, entry, cry, location, Sun/Moon, and Scarlet/Violet UI captures.
- [x] Research actual list/detail content and documented game controls in
      `docs/research/pokedex-controls-and-screens.md`.
- [x] Reconcile `BUILD.md`, `CANON.md`, `DECISIONS.md`, and the older hardware research note.
- [x] Replace `CHATGPT-MASTER-PROMPTS.md` with eight source-locked package prompts.
- [x] Write `asset-manifest.json`, source provenance, fixed 4 × 2 slot plans, and validation gates.
- [x] Materialize the eight exact source masters without resampling or colour conversion.
- [x] Validate dimensions, hashes, source equality, alpha policy, manifest completeness, and
      reassembly requirements. Do not accept an ImageGen result that bakes a checkerboard or
      changes source-visible geometry.
- [x] Append this ticket's handoff, update the project handoff, resolve, and commit.

## Boundaries

Tickets 20 and 21 are claimed; do not edit them. Tickets 23–28 are resolved history; do not
rewrite their acceptance criteria or handoffs. Ticket 31 owns the later eight-casing interaction
and portfolio-content proof. Front/closed views absent from source must remain explicitly
unresolved rather than being presented as canonical.

## Answer

Eight fresh source masters now exist under `assets/ticket-30/`, including Kanto. Their manifest
freezes exact file hashes and plans every future component sheet in groups of eight. Nineteen
gameplay captures and source-backed screen/control research cover the software reference. The
press, action-result, and portfolio-content checks are recorded for ticket 31.

## Handoff

**Built:** Eight byte-exact source masters, provenance, 4 × 2/eight-slot component plans,
19 game UI captures, corrected prompts, button/UI/portfolio map, source research, preview, and a
passing source-lock validator.
**Deviated:** Visible masters use exact source pixels instead of generative redraws. Two ImageGen
support attempts failed silhouette and alpha gates, so no generated support asset was accepted.
**Watch out:** Ruby/Sapphire has no sourced closed view, Diamond/Pearl's outer lid is reconstructed,
and Scarlet/Violet has no sourced front. Ticket 31 must label or avoid those states and must not
revive ticket-23/24 art. Ticket 29's old regeneration route is superseded by this ticket.
