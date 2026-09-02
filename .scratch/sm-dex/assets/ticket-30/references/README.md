# Ticket 30 reference lock

Checked 2 September 2026. These files are research and fidelity inputs for eight independent
casing packages. The eight root-level `*-source-master.png` files are byte-for-byte copies of
the corresponding primary references; no resampling, colour conversion, cleanup, or generation
was applied.

## Device artwork

| Local file | Source page | Use |
|---|---|---|
| `kanto-gen1.png` | [Generation I open/closed artwork](https://archives.bulbagarden.net/wiki/File:Gen_I_Pok%C3%A9dex.png) | Red/Blue primary source master |
| `kanto-rg-open.png` | [Red/Green open artwork](https://archives.bulbagarden.net/wiki/File:RG_Pok%C3%A9dex.png) | Higher-resolution Kanto control geometry |
| `johto-gsc.png` | [Gold/Silver artwork](https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_GSC.png) | Gold/Silver source master |
| `hoenn-rse.png` | [Ruby/Sapphire/Emerald artwork](https://archives.bulbagarden.net/wiki/File:RSE_Pok%C3%A9dex.png) | Ruby/Sapphire source master |
| `sinnoh-dp.png` | [Diamond/Pearl artwork](https://archives.bulbagarden.net/wiki/File:DP_Pok%C3%A9dex.png) | Diamond/Pearl source master |
| `johto-hgss-m.png` | [HeartGold/SoulSilver artwork](https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_HGSS_m.png) | HeartGold/SoulSilver source master |
| `unova-bw.png` | [Black/White artwork](https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_BW_art.png) | Black/White source master |
| `alola-rotom-dex.png` | [Sun/Moon Rotom Pokédex artwork](https://archives.bulbagarden.net/wiki/File:0479Rotom-Pok%C3%A9dex.png) | Sun/Moon source master |
| `paldea-rotom-phone.png` | [Scarlet/Violet Rotom Phone artwork](https://archives.bulbagarden.net/wiki/File:0479Rotom-Phone_SV.png) | Scarlet/Violet rear source master |
| `paldea-phone-official-01.jpg`–`02.jpg`, `paldea-phone-official-map.jpg` | [Official Scarlet/Violet Rotom Phone feature](https://www.pokemon.co.jp/ex/sv/ja/features/220803_02/) | First-party role, scale, and app references |
| `paldea-pokedex-bookshelf.jpg`, `paldea-pokedex-entry.jpg` | [Official Scarlet/Violet Pokédex feature](https://www.pokemon.co.jp/ex/sv/ja/features/220803_01/) | First-party list and detail references |

The archive is a secondary host. Its file pages identify the art and expose native image
revisions. The Pokémon Scarlet/Violet feature images are first-party files from pokemon.co.jp.
Hashes and native dimensions for primary masters are frozen in `../asset-manifest.json`.

## Software captures

Files under `ui/` were downloaded at native resolution through the Bulbagarden Archives
MediaWiki API. They cover:

- Red/Blue: list and entry;
- Gold/Silver: numerical list, A–Z mode, Old mode, Unown mode, and entry;
- Ruby/Sapphire: list and entry;
- Diamond/Pearl: list, entry, and cry;
- HeartGold/SoulSilver: list, entry, and location list;
- Black/White: list and entry;
- Sun/Moon: list;
- Scarlet/Violet: Pokédex shelf.

These captures document software layout only. They must never be baked into casing layers. The
source-backed field and control inventory is in
[`docs/research/pokedex-controls-and-screens.md`](../../../../../docs/research/pokedex-controls-and-screens.md).

## Generation audit

Two built-in ImageGen attempts were made for Kanto hidden D-pad support art. Both were rejected:

1. the first changed black source faces to red and gave face/base pairs different silhouettes;
2. the correction returned an RGB file with a baked checkerboard instead of RGBA transparency.

Neither candidate was copied into this workspace. Generated support art remains `none-accepted`
in the manifest. This is intentional: a failed alpha or silhouette gate is not waived to make a
package appear complete.
