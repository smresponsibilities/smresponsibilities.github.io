# Pokédex reference study

Retrieved and checked on 2026-09-03. Ticket 32 supersedes the rejected ticket 31 build.

## Result and scope

The catalogue contains 90 distinct reference items, ten for each generation I through IX. They include device artwork, concept sheets, game screens, anime comparisons, three small game sprites or thumbnails, and a magazine photograph. There are not ten canonical hardware-angle references for every generation. Do not use the count as evidence that all casing surfaces or button functions are known.

The first 85 items are original game/anime artifacts hosted by Bulbagarden Archives, with provenance recorded on their file pages. The last five are images served by the official Pokémon website. The archive is a secondary host; its upload descriptions are not first-party guarantees. In particular, the SM/USUM concept attribution conflict remains explicit.

All 90 local downloads have unique SHA1 values. All 85 archive downloads match the archive's native image SHA1. The five official-site downloads have locally recorded hashes. The board's thumbnails were visually inspected for source identity and visible content; this is not a pixel-level geometry measurement. The RG artwork, ORAS mechanical concept sheet, SwSh phone concept sheet, and Neo-Kitakami case capture were also inspected individually.

Open [the source board](index.html), [machine-readable catalogue](catalogue.json), or [download verification](download-verification.json). Native media is stored unmodified in `references/`.

## Why the hybrid needs separate layers

The user selected image casing and lid faces with coded, individually pressable controls. The new contract separates fixed casing, fixed wells/separators, moving button caps, live screen UI, and matched lid faces. A control's hit region stays fixed; only its face depresses within its own well. Gaps never activate neighbours. Closing and power-off are separate states.

The retired prompt prescribed four detached D-pad arms and identically shaped cap/base pairs. That conflicted with a coherent rocker and the clearance needed for a held cap. It also treated the clean Kanto redraw as original-art authority without sufficient provenance. Those instructions are withdrawn. The corrected [rebuild prompt](REBUILD-PROMPT.md) and [mechanical checklist](MECHANICAL-CHECKLIST.md) carry the user's current requirements, including eight components per raster sheet.

## Reference index

Each row describes only what is visible in that artifact. Limits and source metadata for each item are in `catalogue.json`. A screenshot's UI prompts refer to the game's input, not necessarily a button painted on the fictional device.

### Generation I

RG artwork supplies an open interior, but not the outer cover. The two anime frames have different details. Do not combine them into a claim of original-game geometry.

| ID | Source and variant | Evidence type | Visible evidence |
|---|---|---|---|
| g1-01 | [RG Pokédex.png](https://archives.bulbagarden.net/wiki/File:RG_Pok%C3%A9dex.png)<br>RG / RBY | Device artwork | Open RG casing, blue lens and three lamps, white bezel, ten-key pad, two white keys, two black ovals, and D-pad. Outer cover is not shown. |
| g1-02 | [Bulbasaur entry Green GBC.png](https://archives.bulbagarden.net/wiki/File:Bulbasaur_entry_Green_GBC.png)<br>Japanese Green on GBC | Game UI | Bulbasaur entry in Japanese Green with GBC palette. Species image, measurements, and description. |
| g1-03 | [Pokédex RBY.png](https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_RBY.png)<br>RG / RBY | Game UI | Numbered contents list, seen/owned counters, cursor, and Data/Cry/Area/Quit menu. |
| g1-04 | [Pokédex entry RBY.png](https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_entry_RBY.png)<br>RG / RBY | Game UI | Pikachu entry with species category, height, weight, and description. |
| g1-05 | [Ash Original Pokédex.png](https://archives.bulbagarden.net/wiki/File:Ash_Original_Pok%C3%A9dex.png)<br>Original series anime | Anime comparison | Anime open Kanto device held in one hand. Different lens/header and interior details from RG art. |
| g1-06 | [Ash Original Pokédex scan.png](https://archives.bulbagarden.net/wiki/File:Ash_Original_Pok%C3%A9dex_scan.png)<br>Original series anime | Anime comparison | Anime scanning display with Mr. Mime; close view of the fixed screen panel. |
| g1-07 | [Kanto Pokédex I OD.png](https://archives.bulbagarden.net/wiki/File:Kanto_Pok%C3%A9dex_I_OD.png)<br>RG / RBY | Game sprite | 16×16 overworld icon. Suitable for icon comparison only. |
| g1-08 | [Stadium Pokédex list.png](https://archives.bulbagarden.net/wiki/File:Stadium_Pok%C3%A9dex_list.png)<br>Pokémon Stadium / Gen I compatibility | Game UI | Stadium list and selected entry preview, including found/owned totals. |
| g1-09 | [Stadium Pokédex seen.png](https://archives.bulbagarden.net/wiki/File:Stadium_Pok%C3%A9dex_seen.png)<br>Pokémon Stadium / Gen I compatibility | Game UI | Stadium seen-but-not-caught Charmander view; lower description panel is empty. |
| g1-10 | [Stadium Pokédex captured.png](https://archives.bulbagarden.net/wiki/File:Stadium_Pok%C3%A9dex_captured.png)<br>Pokémon Stadium / Gen I compatibility | Game UI | Stadium caught Bulbasaur view with description in the lower panel. |

### Generation II

GSC game artwork shows separate top and side leaves. The three anime frames are comparative references. UI order changes are software states, not mechanical states.

| ID | Source and variant | Evidence type | Visible evidence |
|---|---|---|---|
| g2-01 | [Pokédex GSC.png](https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_GSC.png)<br>GSC | Device artwork | Closed GSC shell beside an open top leaf and side leaf. The visible controls and lens positions differ from Kanto. |
| g2-02 | [Pokédex interface GSC.png](https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_interface_GSC.png)<br>GSC | Game UI | GSC list, selected sprite, seen/own totals, Select option and Start search prompts. |
| g2-03 | [Pokédex GSC 2.png](https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_GSC_2.png)<br>GSC | Game UI | Numbered GSC list with Cyndaquil selected, continuing through Typhlosion. |
| g2-04 | [Pokédex entry GSC.png](https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_entry_GSC.png)<br>GSC | Game UI | Pikachu detail with description and Page/Area/Cry/Print tabs. |
| g2-05 | [A to Z Pokédex GSC.png](https://archives.bulbagarden.net/wiki/File:A_to_Z_Pok%C3%A9dex_GSC.png)<br>GSC | Game UI | Alphabetically ordered list beginning with Abra. |
| g2-06 | [Old Pokédex GSC.png](https://archives.bulbagarden.net/wiki/File:Old_Pok%C3%A9dex_GSC.png)<br>GSC | Game UI | Old-order list beginning with Bulbasaur and its evolutions. |
| g2-07 | [Unown Dex.png](https://archives.bulbagarden.net/wiki/File:Unown_Dex.png)<br>GSC | Game UI | Unown glyph collection around a central form and lower text panel. |
| g2-08 | [Ash Johto Pokédex closed.png](https://archives.bulbagarden.net/wiki/File:Ash_Johto_Pok%C3%A9dex_closed.png)<br>Anime continuity | Anime comparison | Anime closed Johto leaf with circular seam motif. |
| g2-09 | [Ash Johto Pokédex.png](https://archives.bulbagarden.net/wiki/File:Ash_Johto_Pok%C3%A9dex.png)<br>Anime continuity | Anime comparison | Anime upper display with Elekid and lower physical control panel. |
| g2-10 | [Ash Johto Pokédex no data.png](https://archives.bulbagarden.net/wiki/File:Ash_Johto_Pok%C3%A9dex_no_data.png)<br>Anime continuity | Anime comparison | Anime open device viewed with Blaziken, showing side leaf and scan/no-data state. |

### Generation III

RSE and FRLG are distinct devices. The catalogue includes both and labels Emerald software separately.

| ID | Source and variant | Evidence type | Visible evidence |
|---|---|---|---|
| g3-01 | [RSE Pokédex.png](https://archives.bulbagarden.net/wiki/File:RSE_Pok%C3%A9dex.png)<br>RSE | Device artwork | Orange RSE hinged shell, circular left control area, green controls, and forked cover outline. |
| g3-02 | [Pokédex FRLG.png](https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_FRLG.png)<br>FireRed / LeafGreen | Device artwork | FRLG hinged shell with lid emblem, central screen, left blue round control and right D-pad extension. |
| g3-03 | [Pokédex RS.png](https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_RS.png)<br>Ruby / Sapphire | Game UI | RS list split between sprite preview and numbered list, with a search prompt. |
| g3-04 | [Pokédex entry RS.png](https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_entry_RS.png)<br>Ruby / Sapphire | Game UI | RS Pikachu detail and Page/Area/Cry/Size/Cancel labels. |
| g3-05 | [Pokédex E.png](https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_E.png)<br>Emerald | Game UI | Emerald list with a green and purple UI treatment. |
| g3-06 | [Pokédex entry E.png](https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_entry_E.png)<br>Emerald | Game UI | Emerald Pikachu detail with separate tab treatment and description. |
| g3-07 | [FRLGdex.png](https://archives.bulbagarden.net/wiki/File:FRLGdex.png)<br>FireRed / LeafGreen | Game UI | FRLG Pidgey entry with description on the left and sprite on the right. |
| g3-08 | [Pokédex FRLG list.png](https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_FRLG_list.png)<br>FireRed / LeafGreen | Game UI | FRLG numbered list with Pidgey selected and sprite preview. |
| g3-09 | [Pokédex entry FRLG.png](https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_entry_FRLG.png)<br>FireRed / LeafGreen | Game UI | FRLG Pikachu detail with stats and lower description block. |
| g3-10 | [Ash Hoenn Pokédex.png](https://archives.bulbagarden.net/wiki/File:Ash_Hoenn_Pok%C3%A9dex.png)<br>Anime continuity | Anime comparison | Anime Hoenn scan display showing Corphish and orange frame. |

### Generation IV

DP, Platinum, and both HGSS colours are distinct variants. The UI references establish vertical screen stacking, but they do not prove hidden outer faces.

| ID | Source and variant | Evidence type | Visible evidence |
|---|---|---|---|
| g4-01 | [DP Pokédex.png](https://archives.bulbagarden.net/wiki/File:DP_Pok%C3%A9dex.png)<br>Diamond / Pearl | Device artwork | DP hinged two-screen hardware with left D-pad and right round extension. |
| g4-02 | [Pt Pokédex.png](https://archives.bulbagarden.net/wiki/File:Pt_Pok%C3%A9dex.png)<br>Platinum | Device artwork | Platinum hardware artwork with altered control-panel and screen colours. Do not silently substitute for DP. |
| g4-03 | [Pokédex HGSS m.png](https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_HGSS_m.png)<br>HeartGold / SoulSilver male device | Device artwork | Male HGSS device shown closed and open, with a top loop and lower folding leaf. |
| g4-04 | [Pokédex HGSS f.png](https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_HGSS_f.png)<br>HeartGold / SoulSilver female device | Device artwork | Female HGSS device shown closed and open with pink/white colouring. |
| g4-05 | [Pokédex DP.png](https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_DP.png)<br>Diamond / Pearl | Game UI | DP list on upper screen, search UI and large circular graphic below. |
| g4-06 | [Pokédex entry DP.png](https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_entry_DP.png)<br>Diamond / Pearl | Game UI | DP Pikachu detail above, Size/Weight controls below. |
| g4-07 | [DP cry screen.png](https://archives.bulbagarden.net/wiki/File:DP_cry_screen.png)<br>Diamond / Pearl | Game UI | DP cry view with waveform and sound-control UI across both screens. |
| g4-08 | [Pokédex HGSS.png](https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_HGSS.png)<br>HeartGold / SoulSilver | Game UI | HGSS entry and lower icon-grid navigator, shown with Pidgey. |
| g4-09 | [Pokédex entry HGSS.png](https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_entry_HGSS.png)<br>HeartGold / SoulSilver | Game UI | HGSS Pikachu detail with the lower grid selection and bottom tabs. |
| g4-10 | [Location list HGSS Pokédex.png](https://archives.bulbagarden.net/wiki/File:Location_list_HGSS_Pok%C3%A9dex.png)<br>HeartGold / SoulSilver | Game UI | HGSS area map, region/map controls, and location listing. |

### Generation V

The BW artwork combines an expanded orange unit with a compact pink unit. A same-colour reconstruction needs further evidence. Five references in this group are anime, not additional game-art views.

| ID | Source and variant | Evidence type | Visible evidence |
|---|---|---|---|
| g5-01 | [Pokédex BW art.png](https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_BW_art.png)<br>BW | Device artwork | BW artwork shows expanded orange and compact pink devices. The two colours do not establish one device changing colour when opened. |
| g5-02 | [Pokédex BW.png](https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_BW.png)<br>BW | Game UI | BW numbered list with green grid, sprite and lower command strip. |
| g5-03 | [Pokédex entry BW.png](https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_entry_BW.png)<br>BW | Game UI | BW Pikachu detail with green grid, measurements and description. |
| g5-04 | [Pokédex B2W2.png](https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_B2W2.png)<br>Black 2 / White 2 | Game UI | B2W2 list with red grid and separate filtering options. |
| g5-05 | [Pokédex entry B2W2.png](https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_entry_B2W2.png)<br>Black 2 / White 2 | Game UI | B2W2 Pikachu detail with red grid and description. |
| g5-06 | [Ash Unova Pokédex.png](https://archives.bulbagarden.net/wiki/File:Ash_Unova_Pok%C3%A9dex.png)<br>Anime continuity | Anime comparison | Anime compact Unova unit held near another handheld object. |
| g5-07 | [Ash Unova Pokédex no data.png](https://archives.bulbagarden.net/wiki/File:Ash_Unova_Pok%C3%A9dex_no_data.png)<br>Anime continuity | Anime comparison | Anime unknown-data question-mark display. |
| g5-08 | [Unova Pokédex anime.png](https://archives.bulbagarden.net/wiki/File:Unova_Pok%C3%A9dex_anime.png)<br>Anime continuity | Anime comparison | Anime compact red unit lying on a surface, showing its thickness. |
| g5-09 | [Scanning Unova Pokédex.png](https://archives.bulbagarden.net/wiki/File:Scanning_Unova_Pok%C3%A9dex.png)<br>Anime continuity | Anime comparison | Anime extended device with Snivy scan display and circular lower UI. |
| g5-10 | [Bianca Pokédex scan.png](https://archives.bulbagarden.net/wiki/File:Bianca_Pok%C3%A9dex_scan.png)<br>Anime continuity | Anime comparison | Anime extended scan display associated with Bianca, showing lower circular UI. |

### Generation VI

XY and ORAS must have separate construction. ORAS concept art provides front, side, rear, and standby/powered examples. Its annotated edge-button power behaviour is concept evidence, not a tested released-game interaction.

| ID | Source and variant | Evidence type | Visible evidence |
|---|---|---|---|
| g6-01 | [XY Pokédex.png](https://archives.bulbagarden.net/wiki/File:XY_Pok%C3%A9dex.png)<br>XY | Device artwork | XY closed and extended red device with translucent central display. |
| g6-02 | [ORAS Pokédex.png](https://archives.bulbagarden.net/wiki/File:ORAS_Pok%C3%A9dex.png)<br>Omega Ruby / Alpha Sapphire | Device artwork | ORAS released artwork, landscape casing, circular left control, two green function keys and speaker. |
| g6-03 | [Pokédex ORAS concept art.jpg](https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_ORAS_concept_art.jpg)<br>Omega Ruby / Alpha Sapphire | Concept sheet | ORAS concept sheet: standby and powered display, edge push arrows, side thickness, rear camera and battery-cover removal. |
| g6-04 | [Pokédex XY.png](https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_XY.png)<br>XY | Game UI | XY Yveltal entry and lower tiled index. |
| g6-05 | [Pokédex entry XY.png](https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_entry_XY.png)<br>XY | Game UI | XY Pikachu entry with dimensions, description and lower tiled index. |
| g6-06 | [Pokédex ORAS.png](https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_ORAS.png)<br>Omega Ruby / Alpha Sapphire | Game UI | ORAS dex overview with collection art above and numbered list below. |
| g6-07 | [Pokédex entry ORAS.png](https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_entry_ORAS.png)<br>Omega Ruby / Alpha Sapphire | Game UI | ORAS Pikachu entry with description, dimensions and lower command strip. |
| g6-08 | [ORAS Prerelease Pokédex.png](https://archives.bulbagarden.net/wiki/File:ORAS_Prerelease_Pok%C3%A9dex.png)<br>Omega Ruby / Alpha Sapphire | Prerelease UI | ORAS prerelease numbered list. Layout is not automatically a released-game reference. |
| g6-09 | [Ash Kalos Pokédex.png](https://archives.bulbagarden.net/wiki/File:Ash_Kalos_Pok%C3%A9dex.png)<br>Anime continuity | Anime comparison | Anime closed Kalos unit being handed over. |
| g6-10 | [Ash Kalos Pokédex scan.png](https://archives.bulbagarden.net/wiki/File:Ash_Kalos_Pok%C3%A9dex_scan.png)<br>Anime continuity | Anime comparison | Anime expanded Kalos display with Raichu. |

### Generation VII

Rotom Dex illustrations and concepts establish anatomy and multiple orientations. SM/USUM attribution conflicts on one concept file. Let's Go screens are a separate software variant. The magazine photograph is promotional evidence, not scale geometry.

| ID | Source and variant | Evidence type | Visible evidence |
|---|---|---|---|
| g7-01 | [0479Rotom-Pokédex.png](https://archives.bulbagarden.net/wiki/File:0479Rotom-Pok%C3%A9dex.png)<br>SM / USUM | Device artwork | Rotom Dex illustration with articulated limbs, top point, feet, eyes, and central display area. |
| g7-02 | [479Rotom-Pokédex SM concept art.png](https://archives.bulbagarden.net/wiki/File:479Rotom-Pok%C3%A9dex_SM_concept_art.png)<br>SM / USUM | Concept sheet | Rotom Dex multi-view and expression concept sheet. Archive title/category says SM while its description says USUM. |
| g7-03 | [479Rotom-Pokédex SM concept art 2.jpg](https://archives.bulbagarden.net/wiki/File:479Rotom-Pok%C3%A9dex_SM_concept_art_2.jpg)<br>SM / USUM | Concept sheet | Rotom Dex concept sheet with front/rear, top views, separated parts and shoulder-strap arrangement. |
| g7-04 | [Pokédex SM.png](https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_SM.png)<br>SM / USUM | Game UI | SM dex collection interface and regional list. |
| g7-05 | [Pokédex entry SM.png](https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_entry_SM.png)<br>SM / USUM | Game UI | SM Pikachu entry with blue field and red description panel. |
| g7-06 | [Rotom Pokédex SMUSUM.png](https://archives.bulbagarden.net/wiki/File:Rotom_Pok%C3%A9dex_SMUSUM.png)<br>SM / USUM | Game model render | Small frontal Rotom Dex game-model render. This is a flat render, not a downloadable 3D model. |
| g7-07 | [QR Scanner QR Code Scan.png](https://archives.bulbagarden.net/wiki/File:QR_Scanner_QR_Code_Scan.png)<br>SM / USUM | Game UI | QR Scanner camera placeholder and lower Scan UI. |
| g7-08 | [Pokédex PE.png](https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_PE.png)<br>Let's Go Pikachu / Eevee | Game UI | Let's Go dex grid with completion counters. |
| g7-09 | [Pokédex entry PE.png](https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_entry_PE.png)<br>Let's Go Pikachu / Eevee | Game UI | Let's Go Pikachu detail, sprite, dimensions and description. |
| g7-10 | [CoroCoro November 2017 Rotom Pokédex.jpg](https://archives.bulbagarden.net/wiki/File:CoroCoro_November_2017_Rotom_Pok%C3%A9dex.jpg)<br>SM / USUM | Magazine scan | CoroCoro promotional magazine photograph showing Rotom Dex illustrations and screenshots. |

### Generation VIII

SwSh uses a Rotom Phone; Legends: Arceus uses a paper Pokédex. The SwSh concept sheet explicitly distinguishes the face side from the screen side, plus side profiles. BDSP UI is another separate variant.

| ID | Source and variant | Evidence type | Visible evidence |
|---|---|---|---|
| g8-01 | [0479Rotom-Phone.png](https://archives.bulbagarden.net/wiki/File:0479Rotom-Phone.png)<br>SwSh | Device artwork | SwSh Rotom Phone illustration showing the face side, camera and protruding tips. |
| g8-02 | [Rotom Phone SwSh concept art.jpg](https://archives.bulbagarden.net/wiki/File:Rotom_Phone_SwSh_concept_art.jpg)<br>SwSh | Concept sheet | SwSh concept sheet with screen side, face side, side profile, horizontal rotation, camera and external port labels. |
| g8-03 | [Rotom Phone SwSh concept sketch.jpg](https://archives.bulbagarden.net/wiki/File:Rotom_Phone_SwSh_concept_sketch.jpg)<br>SwSh | Concept sheet | Early Rotom Phone pencil sketches with alternate views and facial placement. |
| g8-04 | [Pokédex SwSh.png](https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_SwSh.png)<br>SwSh | Game UI | SwSh list with selected Sobble and bottom command prompts. |
| g8-05 | [Pokédex entry SS.png](https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_entry_SS.png)<br>SwSh | Game UI | SwSh Pikachu entry with number, type, measurements, description and command prompts. |
| g8-06 | [Pokédex entry BDSP.png](https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_entry_BDSP.png)<br>Brilliant Diamond / Shining Pearl | Game UI | BDSP Pikachu entry laid out as a horizontal notebook-style UI. |
| g8-07 | [Pokédex Cover LA.png](https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_Cover_LA.png)<br>Legends: Arceus | Game UI | Legends: Arceus cover UI with Pokédex label and progress. |
| g8-08 | [LA Pokédex.png](https://archives.bulbagarden.net/wiki/File:LA_Pok%C3%A9dex.png)<br>Legends: Arceus | Device artwork | Physical Hisui Pokédex book artwork with ties, pages and corner protectors. |
| g8-09 | [Pokédex entry LA.png](https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_entry_LA.png)<br>Legends: Arceus | Game UI | Legends: Arceus Pikachu entry with page-like data panel and side list. |
| g8-10 | [Starly Pokédex Research Tasks LA.png](https://archives.bulbagarden.net/wiki/File:Starly_Pok%C3%A9dex_Research_Tasks_LA.png)<br>Legends: Arceus | Game UI | Legends: Arceus Starly research-task grid and progress marks. |

### Generation IX

The default SV phone art is a face-side view. The first-party phone-in-world and custom-case images add usage views. The Lechonk cover and bookshelf images are prerelease app states, not individual-entry details.

| ID | Source and variant | Evidence type | Visible evidence |
|---|---|---|---|
| g9-01 | [0479Rotom-Phone SV.png](https://archives.bulbagarden.net/wiki/File:0479Rotom-Phone_SV.png)<br>SV | Device artwork | SV Rotom Phone illustration. The face side has two camera circles and differs from the SwSh artwork. |
| g9-02 | [Pokédex SV.png](https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_SV.png)<br>SV | Game UI | Released SV wood-textured spine list, regional tab and completion counters. |
| g9-03 | [Pokédex Entry SV.png](https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_Entry_SV.png)<br>SV | Game UI | Released SV Pikachu detail with a blue text field and sprite. |
| g9-04 | [Kitakami Pokédex thumbnail.png](https://archives.bulbagarden.net/wiki/File:Kitakami_Pok%C3%A9dex_thumbnail.png)<br>SV / The Teal Mask | Game sprite | Kitakami regional volume-cover thumbnail. |
| g9-05 | [Blueberry Pokédex thumbnail.png](https://archives.bulbagarden.net/wiki/File:Blueberry_Pok%C3%A9dex_thumbnail.png)<br>SV / The Indigo Disk | Game sprite | Blueberry regional volume-cover thumbnail. |
| g9-06 | [Neo-Kitakami Rotom Phone case](https://www.pokemon.co.jp/ex/sv_dlc/ja/news/240115_01/)<br>Scarlet / Violet, Neo-Kitakami case | Device in use | Official Neo-Kitakami custom case shown floating horizontally beside the player. The face side and two camera circles are visible. |
| g9-07 | [Rotom Phone floating beside the player](https://www.pokemon.co.jp/ex/sv/ja/features/220803_02/)<br>Scarlet / Violet prerelease | Device in use | The phone floats next to the player in the game world. Compare scale and visible side. |
| g9-08 | [Map application](https://www.pokemon.co.jp/ex/sv/ja/features/220803_02/)<br>Scarlet / Violet prerelease | Game UI | Official prerelease map app, surrounding markers and lower command prompts. |
| g9-09 | [Lechonk volume jacket](https://www.pokemon.co.jp/ex/sv/ja/features/220803_01/)<br>Scarlet / Violet prerelease | Game UI | The Pokédex app shows a Lechonk volume cover with a large photograph. |
| g9-10 | [Pokédex bookshelf and completion view](https://www.pokemon.co.jp/ex/sv/ja/features/220803_01/)<br>Scarlet / Violet prerelease | Game UI | The app shows a wood-textured bookshelf with regional progress and book covers. |

## Source corrections made during review

- The clean `Gen_I_Pokédex.png` and `Generation_I_Pokédex.png` files were excluded as original-game geometry authorities because their archive descriptions do not establish that status. `g1-01` is the archived RG artwork.
- `Contents of Trainer's bag art.jpg` was excluded after its file description showed it was modern merchandise imagery, not original Generation I device art.
- An official-site rendering that repeated the same SV phone artwork was removed from the ninety-item selection. `g9-06` now provides an official Neo-Kitakami case capture in a horizontal orientation.
- The official SV feature images were visually relabelled: `g9-09` is a Lechonk volume jacket and `g9-10` is the bookshelf/completion view. Neither is the individual-entry view.
- `g9-07` shows a floating phone beside the character, not a device in the character's hands.

## What this study does not prove

No new casing has been drawn, no interactive replacement has been built, and no button or closing test has passed. No source-aligned measurements, cap travel, touch cancellation, keyboard handling, or visible portfolio-control outcomes have been verified in a replacement build. The twenty-six and thirty-one prototypes are not approved baselines.

A chosen hardware variant still needs an asset-level geometry study. Record its visible silhouettes, screen apertures, control wells, pivot axes, and missing faces before rendering. Any reconstructed face must remain labelled as reconstructed. The requested pixel-perfect closed Kanto exterior cannot be proved from the open RG illustration alone.

## Cleanup evidence

202 generated or derived files, totalling 28,851,528 bytes, were removed from active project folders and this task's generation cache. Recovery copies are outside the project at `C:/Users/sm/AppData/Local/Temp/sm-dex-rejected-assets-20260903-01`. All 202 hashes and absence of the original paths were checked again. The [removal manifest](removed-assets-manifest.json) records each path and hash.

All 42 tracked reference files in the ticket-24 and ticket-30 reference directories match their Git HEAD objects. All eight ticket-30 downloaded source masters match their manifest SHA256 values. These files are preserved sources, not approved replacement artwork. The extra duplicate image downloaded during this study was discarded after its replacement was verified; the same original-site image remains in the preserved ticket-30 references.

Six retired demo HTML entry points now show a removal notice and link here. No production code, user data, ticket-20 files, or ticket-21 files were changed.

