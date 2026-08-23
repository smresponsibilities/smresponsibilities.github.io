# Ticket 24 — clubbed-generation casing masters

> **Superseded 2026-08-23 (ticket 30).** Generation clubbing was removed: casings are per-skin
> now. The Game Boy master (invented object — no game shows a grey DMG) is retired outright;
> the HGSS-based open/closed masters are being regenerated pure; the modern frame is being
> reworked into a full Rotom Dex. Only `references/` stays live — it now also holds official
> GSC/RSE/DP artwork for the new prompts (`CHATGPT-MASTER-PROMPTS.md`). Replacements go to
> `../ticket-30/`.

These are approval-only raster masters. They extend ticket 23's Gen III direction to the three
remaining casing groups. None is referenced by production code.

## Group map

| Group | Master | Visual language |
|---|---|---|
| Gen I/II | `gen-1-2-game-boy-master.png` | Wide dual-screen adaptation of the original gray Game Boy |
| Gen III | Ticket 23 | Approved red hinged Kanto device |
| Gen IV/V | `gen-4-5-open-master.png`, `gen-4-5-closed-master.png` | HGSS clamshell geometry plus Black/White controls |
| Gen VI–IX | `gen-6-9-modern-master.png` | Thin Rotom Dex/Rotom Phone frame |

All new masters are 1536×1024 32-bit PNGs. Background and screen-opening alpha samples were
verified as zero.

## Assembly contract

- Screen openings stay transparent so accessible DOM remains behind the casing.
- A fixed control base and a moving control face share the same silhouette. Only the face moves
  down four pixels.
- The Gen IV/V hinge is a stationary component. Its right inner shell and closed outer cover are
  the two faces of one moving lid, rotating around the left-center edge.
- Gen I/II and Gen VI–IX do not close; their frames stay stationary.
- The modern frame has no baked face or screen art.

## Reference trace

- Original gray Game Boy front view: <https://retromagaz.com/product/konsol-nintendo-game-boy-silver-bu-khoroshiy>
- HGSS Pokédex artwork: <https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_HGSS_m.png>
- Black/White Pokédex artwork: <https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_BW_art.png>
- Rotom Dex artwork: <https://www.wikidex.net/wiki/Archivo:RotomDex.png>
- Scarlet/Violet Rotom Phone: <https://www.pokemon.co.jp/ex/sv/ja/features/220803_02/>

Local reference copies are under `references/`.

## Prompt set

The built-in image generator was used. Gen I/II requested a landscape dual-screen DMG adaptation
with a plain D-pad and separated A/B and Start/Select press pairs. Gen IV/V requested an
orange/charcoal vertical-hinge hybrid, separate stationary hinge, circular navigation controls,
and a matching closed back face. Gen VI–IX requested a minimal coral Rotom frame with cyan rims,
separate wings and antenna, no creature face, and almost no hardware. Final passes removed the
simulated sheet backgrounds and required genuine alpha transparency.
