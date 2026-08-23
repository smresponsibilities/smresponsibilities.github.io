# 30: Per-skin casings — one device per version

**What happened:** User rejected the ticket-24 masters *and* the four-generation clubbing.
Fresh research: `docs/research/pokedex-hardware-by-generation.md`. Follow-up verification
confirmed the user's claim — every one of the eight selector versions ships a physically
distinct Pokédex model, so clubbing generations onto shared shells contradicts the games for
all four current families.

**Decision (user, verified):** eight casings, one per skin. No family sharing. The approved
ticket-23 Kanto device is correct and moves to its right slot (Red/Blue); it is the
anime-style Kanto rendering vs the games' solid GB-like artwork — record that as a deliberate
deviation in DECISIONS.md.

## Skin → device → master plan

| Skin | Device | Master |
|---|---|---|
| Red/Blue | Kanto Pokédex (HANDY505 language) | ticket-23 masters, re-slotted |
| Gold/Silver | Johto HANDY808 — folding top+right covers, blue lens, GBC interior | NEW (`File:Pokédex_GSC.png`) |
| Ruby/Sapphire | Hoenn — solid landscape GBA-shaped body | NEW (`File:RSE_Pokédex.png`) |
| Diamond/Pearl | Sinnoh HANDY910is — DS-Lite clamshell | NEW (`File:DP_Pokédex.png`) |
| HeartGold/SoulSilver | DSi-style Johto redesign | regenerate from gen-4-5 masters stripped of B/W controls (`File:Pokédex_HGSS_m.png`) |
| Black/White | Unova slider — extending top screen, one Poké Ball button, touch lower screen | NEW (`File:Pokédex_BW_art.png`) |
| Sun/Moon | Rotom Dex — antenna, flap arms, feet | rework gen-6-9 modern frame into full Rotom object; prompt 3 of CHATGPT-MASTER-PROMPTS.md already drafts this |
| Scarlet/Violet | Rotom Phone + case, dex-as-app | NEW (`File:0479Rotom-Phone_SV.png`) |

**Build order:**

- [x] Rewrite BUILD.md §"Casings" → per-skin casing table (eight rows), motion contract incl.
      slider, acceptance criteria lines updated.
- [x] Update CANON.md §5 device-identity + lid-motion rows.
- [x] Update DECISIONS.md §X (per-skin model) + §T preamble; deviations recorded in §X4
      (anime-Kanto on Red/Blue, Johto single cover, HGSS pure).
- [x] Rewrite `.scratch/sm-dex/CHATGPT-MASTER-PROMPTS.md`: seven per-skin prompts (Johto,
      Hoenn, Sinnoh, HGSS-pure, Unova slider, Rotom Dex kept, Rotom Phone new); shared contract
      gains full-opacity rule; Red/Blue needs no prompt. Ticket 29 annotated — its file list is
      superseded, gate unchanged.
- [x] Extend prompts: run/linking instructions, per-prompt Attach + Save-as lines, ordered parts
      grids (position encodes identity), zero-text verdict researched and enforced, canon-vs-added
      controls inventory per device. Missing refs downloaded to `ticket-24/references/`
      (`pokedex-gsc.png`, `pokedex-rse.png`, `pokedex-dp.png`).
- [ ] Regenerate new/reworked masters → `validate_masters.py` → `_probe/audit.py`
      (ticket 29's gate) before any extraction work.
- [x] Mark superseded files in `assets/ticket-24/README.md`; move ticket-23 entry to Red/Blue
      (banner added; gen-families prototype README banner too).

## Boundaries

Tickets 20 and 21 are claimed — do not touch them. Tickets 24/25/28 are resolved: do not edit
their acceptance criteria or handoffs; this ticket supersedes their clubbing output instead.
Ticket 29 stays blocked until these prompts land.
