# Ticket 46 reference audit

Historical baseline audit. User-approved implementation followed. F7/F8's composite phone
faces were replaced, RSE was rebuilt, and VI/VII were revisited against the requested art.
See [current follow-up](ticket-46-implementation.md) before treating these findings as
descriptions of revision 46.5. Remaining source-fidelity questions are listed there.

Date: 2026-09-07.

## Result and scope

All ten ticket-45 devices were compared with existing local reference artwork. The audit records eight visible differences across seven devices. Four are correction candidates involving a missing or obscured detail. Four are departures associated with the stated mixture of references, changed pose, or reconstructed phone fronts. Ruby/Sapphire, Diamond/Pearl and X/Y have no additional confirmed hardware-detail mismatch in this pass. That does not certify their dimensions or unseen construction.

This is an artwork audit. The main session owns the closing-direction diagnosis, its probe and any implementation decision. This sidecar changed only this file. It did not operate a browser, download media, edit assets, edit a ticket or write a handoff.

## Evidence and method

I read `AGENTS.md`, the current handoff, tickets 45 and 46, the relevant project rules in `BUILD.md`, `CANON.md` and `DECISIONS.md`, and the research, caveman and unslop skills. The request to work without subagents overrides the research skill's delegation default. The explicit single-file scope overrides the general session-handoff workflow.

The implementation evidence is `assets/kanto.js`, `assets/classic.js`, `assets/middle.js`, `assets/rotom.js` and `assets/exported/manifest.json` under `.scratch/sm-dex/prototypes/ticket-45-all-generations/`. I inspected all ten `*-open.svg` exports by rasterizing existing local SVGs in memory. No rendered files were saved. Small details in the GSC reference and Unova export were enlarged in memory for inspection. These are static export comparisons, not browser screenshots or a test of the moving renderer.

The black or empty regions in those renders are screen apertures. Their lack of Pokémon imagery is not a defect. The asset contract deliberately gives screen content to the portfolio. Widened apertures, flat shading and mapped button actions are also declared choices. Perspective in an illustration is not a reliable ruler for an orthographic redraw.

The repository's `docs/research/pokedex-hardware-by-generation.md` incorrectly labels a Bulbapedia article as primary evidence. Its prose, Fandom descriptions and console-analogue claims are secondary summaries. They were used to locate references, not to prove geometry. The original game artwork reproduced by Bulbagarden Archives is visual primary material; the archive is its third-party host. Archive attribution remains an additional provenance step, not first-party hosting. For example, the [Galar concept-sheet record](https://archives.bulbagarden.net/wiki/File:Rotom_Phone_SwSh_concept_art.jpg) identifies the original publication as *Pokémon Sword & Pokémon Shield The Official Galar Region Strategy Guide, Collector's Edition* and separately identifies the scan source.

## Reference coverage by device

Paths in this table are relative to the repository root. The `references` files are the inspected artwork, not ticket-24 generated masters or a secondary written interpretation.

| Device | Reference and local image inspected | What the image establishes | Remaining coverage limit |
| --- | --- | --- | --- |
| I, `red`, Kanto | [Red/Green artwork](https://archives.bulbagarden.net/wiki/File:RG_Pok%C3%A9dex.png), `.scratch/sm-dex/assets/ticket-30/references/kanto-rg-open.png` | Open book layout, blue lens and three lamps, left bezel, ten cyan keys and lower controls. | This particular image is open only. The descriptor explicitly combines game and anime references. It cannot establish a pure Red/Blue reconstruction or unseen cover geometry. |
| II, `gold`, Johto | [GSC artwork](https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_GSC.png), `.scratch/sm-dex/assets/ticket-30/references/johto-gsc.png` | Closed and open poses, top leaf, separate side leaf, upper dome and lower blue orb. | Low-resolution artwork. Exact hinge clearance and the order in which leaves move are not shown. |
| III, `ruby`, Hoenn | [RSE artwork](https://archives.bulbagarden.net/wiki/File:RSE_Pok%C3%A9dex.png), `.scratch/sm-dex/assets/ticket-30/references/hoenn-rse.png` | Open crescent lid, green lid element, cylindrical hinge, lower screen, disc, lamp, green control and two pills. | No closed exterior is present. The authored outer circle and seam marks have no verification from this image. |
| IV, `diamond`, Sinnoh | [DP artwork](https://archives.bulbagarden.net/wiki/File:DP_Pok%C3%A9dex.png), `.scratch/sm-dex/assets/ticket-30/references/sinnoh-dp.png` | Open dual-screen body, left speaker lobe, left D-pad pod, right green control pod and two small silver controls. | No closed exterior or closing sequence is present. |
| IV remake, `heartgold`, Johto | [HGSS male-model artwork](https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_HGSS_m.png), `.scratch/sm-dex/assets/ticket-30/references/johto-hgss-m.png` | Orange closed and open poses, top projections, dark centre strip, paired indicators, blue exterior element and gold side rails. | The two visible poses do not explain the hidden mounting or motion of the projections. |
| V, `black`, Unova | [BW artwork](https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_BW_art.png), `.scratch/sm-dex/assets/ticket-30/references/unova-bw.png` | Orange extended unit and pink compact unit, one versus two exposed displays, diagonal band, circular control and lower dot row. | It is a pair of different colour variants in static poses. Orange compact geometry, tray travel and rail construction remain inferred. |
| VI, `x`, Kalos | [Official X/Y page](https://www.pokemon.co.jp/ex/xy/about/04.html), [archived artwork](https://archives.bulbagarden.net/wiki/File:XY_Pok%C3%A9dex.png), `.scratch/sm-dex/research/restart/references/g6-01.png` | Local artwork shows compact and extended red halves, dark semicircular rims, pale edging, corner arcs and translucent centre. | The official page was readable, but its linked device image failed retrieval. Geometry was inspected in the existing archive copy. No physical mechanism is exposed. |
| VII, `sun-moon`, Alola | [Sun/Moon Rotom artwork](https://archives.bulbagarden.net/wiki/File:0479Rotom-Pok%C3%A9dex.png), `.scratch/sm-dex/assets/ticket-30/references/alola-rotom-dex.png` | Horn, eye shapes, cheek dots, bent arms with ovals, feet and facial display in the illustrated pose. | One expressive pose does not establish a rigid mounting system or a closed state. |
| VIII, `sword-shield`, Galar | [Official Rotom Phone page](https://swordshield.pokemon.com/en-us/gameplay/about-pokedex-rotom-phone/), [official-guide concept sheet hosted by Bulbagarden](https://archives.bulbagarden.net/wiki/File:Rotom_Phone_SwSh_concept_art.jpg), `.scratch/sm-dex/research/restart/references/g8-02.jpg` | The locally inspected guide sheet explicitly draws separate screen and face sides, a single rear camera, narrow screen bezel and a small notch at the spike root. | A published concept sheet is stronger than a guessed front, but it is not by itself proof that every detail shipped unchanged. |
| IX, `scarlet-violet`, Paldea | [Official SV device page](https://www.pokemon.co.jp/ex/sv/ja/features/220803_02/), [archived artwork](https://archives.bulbagarden.net/wiki/File:0479Rotom-Phone_SV.png), `.scratch/sm-dex/research/restart/references/g9-01.png`; also ticket-30 `references/paldea-phone-official-01.jpg` and `paldea-phone-official-02.jpg` | Rear/face-side artwork has paired camera lenses in a joined housing and a cyan-rimmed circular face. The official capture shows that side facing away from the trainer. | No directly inspectable, sufficiently detailed released-game screen-side elevation was obtained. The exact front remains unresolved. |

## Four correction candidates

### F1. Johto's open upper orb scarcely changes the silhouette

The GSC image has a dark rounded dome projecting above the top leaf. The export instead reads as a small, rimmed blue disk contained almost entirely in a broad top bezel. In `classic.js`, the top edge is at `y=72`; the orb centre is `y=104`, with a total drawn radius of 35 before stroke. Its outline therefore clears the edge by only about three design units. This is a visible silhouette change, independent of the flat shading choice. Restore a meaningful projection above the leaf if matching the source silhouette is intended. Confidence is high for the difference, moderate for an exact replacement profile because the [source is small and oblique](https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_GSC.png).

### F2. Johto loses its lower blue orb when closed

The closed GSC illustration visibly retains the small blue orb at the bottom right. The main session reports that the rendered closed side leaf covers the prototype's body orb at `y=674`. This sidecar independently inspected the reference and confirms the orb is visible there; the closed-browser observation is credited to the main session. The descriptor places the orb on `body`, while the reflected right leaf occupies that lower area. A correction should preserve the visible orb in the settled closed pose without assuming an unseen mechanism. Confidence is high. The main also notes the broader proportion change: the authored body is 420 by 342 units, while the [source closed device is tall and narrow](https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_GSC.png). The widening is declared; losing the orb is a separate consequence.

### F3. HGSS is missing the projection above its open top edge

The open HGSS illustration has a round-topped projection above the upper display leaf. The authored open export ends in a flat edge. `middle.js` draws a trapezoidal loop near `y=339..378` on the body, which lies behind the open lid near the hinge; it draws no projection above the lid at `y=78`. That is enough to explain the visible omission in the static export. Preserve the source-visible top projection in the open pose. Do not infer that it must be the same physical piece as the trapezoidal loop in the closed illustration: the [art supplies both poses but no transition](https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_HGSS_m.png). Confidence is high for the missing feature; mounting and movement remain unverified.

### F4. Unova's three bottom dots collide with the circular control and stripe

The BW illustration shows three separate dark dots below the round control, with clear space between the control and dot row. In the export, the middle dot touches the bottom of the dark circular well, and the right dot runs into the diagonal stripe. The in-memory enlarged export makes both collisions visible. The geometry agrees: `middle.js` puts the well at `cy=610`, `r=43`, and the dots at `cy=653`. The centre dot sits on the well's bottom boundary. Move the dot row or reduce the control/stripe encroachment to preserve three isolated dots. Their function need not change. Confidence is high for this [visible arrangement difference](https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_BW_art.png).

## Four departures associated with the authored direction

### F5. Kanto's bezel detail follows the mixed reference direction

The RG art has two groups of short vent lines across the top of the white bezel, flanking two small red dots. The asset retains the dots but puts one vent group at the lower right. Its red bezel control is also at the lower left rather than the source's upper-left side. These are specific differences from the linked [RG artwork](https://archives.bulbagarden.net/wiki/File:RG_Pok%C3%A9dex.png), not merely differences in shading. Confidence is high. The descriptor already says it combines RG and anime references, so this is not evidence that the selected hybrid direction was implemented incorrectly. A pure game-art version would restore the source positions; a hybrid version should continue to be labelled as such.

### F6. Alola changes the illustrated foot overlap

In the reference pose, the viewer-right foot overlaps the lower-right screen edge. The authored export puts both feet below the shell and draws them behind it. `rotom.js` emits the feet before the shell and bezel, so the changed overlap is part of the drawing rather than a camera-angle effect. Confidence is high against the [selected artwork pose](https://archives.bulbagarden.net/wiki/File:0479Rotom-Pok%C3%A9dex.png). This fits the stated enlargement of the portfolio screen and changed front elevation. It needs an explicit pose choice if fidelity to that illustration is required; it does not prove the device can never adopt the authored pose. Removing Rotom's displayed expression is separately disclosed and was not counted as another defect.

### F7. Galar merges opposite phone sides

The official-guide concept sheet shows the large rectangular screen on one side and the camera plus large circular face on the other. The screen side has a narrow border and a small intrusion at the root of the top spike. Ticket 45 places the single camera, two eyes, face ring and mouth above its large rectangular screen on the same side. Its shell is 376 by 528 units, with a 328 by 366 aperture. That makes the screen nearly square and leaves a deep decorative forehead, visibly unlike the guide's tall screen-side drawing.

Confidence is high for the front/rear combination relative to the [guide sheet](https://archives.bulbagarden.net/wiki/File:Rotom_Phone_SwSh_concept_art.jpg). Exact agreement with the released model still needs a released-game view. The [official game website](https://swordshield.pokemon.com/en-us/gameplay/about-pokedex-rotom-phone/) establishes the Pokédex as a phone function, not the authored arrangement. The descriptor admits the relocation, so it should remain an adaptation or be replaced by separate front and rear drawings. A faithful front must not simply reuse the rear motifs as bezel decoration.

### F8. Paldea repeats the same composite construction

The local copy of the official SV illustration places the two joined camera circles near the top left of the face side, and a much larger cyan-rimmed face near its middle. The authored export shrinks and moves that face into a top bezel above a rectangular screen. The joined camera housing and cyan rim correctly distinguish it from the Galar variant, but their placement does not make it a verified front. Confidence is high for the rearrangement against the [official rear/face-side art](https://www.pokemon.co.jp/ex/sv/ja/features/220803_02/) and [archive copy](https://archives.bulbagarden.net/wiki/File:0479Rotom-Phone_SV.png).

Do not turn this into an unsupported assertion about every detail of the real SV front. That front was not verified here, and the Galar concept sheet cannot establish Paldea's exact notch, border, camera or dimensions. The next faithful drawing should use a direct SV screen-side view. Until then, the descriptor's current admission of a reconstructed interface adaptation is necessary.

## Devices without an additional confirmed detail mismatch

Ruby/Sapphire retains the crescent silhouette, green lid element, broad hinge, single lower display, left circular control, red lamp, green control and two white pills. The widened 400 by 200 aperture is declared. The [open RSE image](https://archives.bulbagarden.net/wiki/File:RSE_Pok%C3%A9dex.png) cannot validate the authored outer lid emblem, exterior grooves or closed fit.

Diamond/Pearl retains the four holes in the left lid lobe, small dark mark beside the upper screen, left D-pad and indicator, right concentric green control, adjacent dark inset and two small silver controls. Widening alters proportions, but no additional missing source-visible control was confirmed. The circle and slots on the authored lid exterior remain reconstructions because the [DP reference is open only](https://archives.bulbagarden.net/wiki/File:DP_Pok%C3%A9dex.png).

Kalos retains the main visible hardware motifs in the inspected [local X/Y artwork](https://archives.bulbagarden.net/wiki/File:XY_Pok%C3%A9dex.png). An initial concern about its small central dots did not survive comparison with the rendered SVG: the dots remain immediately outside the semicircular rims. It is not a finding. The compact and extended source poses support those two appearances, but not the precise 126-unit travel per half, the hidden display construction, a holographic projection mechanism or any physical key semantics. The authored rectangular content aperture is an interface choice; no inference was made from its blank export to a missing physical display.

## Additional primary-source search and its limits

The search prioritised official Pokémon and Nintendo publications over another general Pokédex article. These results distinguish genuinely additional material from a repeated link already present in ticket 45.

| Resource followed | What was obtained | Value for this audit |
| --- | --- | --- |
| [Pokémon X/Y official page](https://www.pokemon.co.jp/ex/xy/about/04.html) and its [linked device image](https://www.pokemon.co.jp/ex/xy/about/images/img_about_04_half_01.jpg) | The page was readable. The image returned `Cache miss`. The page was already linked by ticket 45. | First-party context and an exact image URL, but no new view or motion evidence. The existing archive copy remains the visually inspected source. |
| [Nintendo Pokémon X page](https://www.nintendo.com/en-gb/Games/Nintendo-3DS-games/Pokemon-X-766699.html) and its [official electronic manual](https://www.nintendo.com/eu/media/downloads/games_8/emanuals/nintendo_3ds_2/pok_mon_x/ElectronicManual_Nintendo3DS_PokemonX_en.pdf) | Additional publisher page and linked manual found. The PDF text extraction was garbled. | A new primary resource, but no verified hardware diagram or mechanism claim was extracted. It must not be counted as new Kalos visual coverage. |
| [Japanese Sword/Shield phone page](https://www.pokemon.co.jp/ex/sword_shield/story/190605_03.html) | Readable first-party counterpart to the English page. | Confirms the phone's game role. It does not independently supply a verified front elevation. |
| [Galar official-guide scan provenance](https://archives.bulbagarden.net/wiki/File:Rotom_Phone_SwSh_concept_art.jpg) | Archive record identifies the printed official guide; existing local scan inspected directly. | The most useful front/back evidence in this pass. Publication authorship and scan hosting are separate. It is existing artwork, with newly checked provenance. |
| [Official SV phone page](https://www.pokemon.co.jp/ex/sv/ja/features/220803_02/) | Readable page, image URLs and existing local copies inspected. The [device illustration](https://www.pokemon.co.jp/ex/sv/assets/img/features/ja/220803_02/features_img_01.jpg) and [in-world capture](https://www.pokemon.co.jp/ex/sv/assets/img/features/ja/220803_02/features_img_02.jpg) are face-side views. | Stronger provenance than a secondary article for Paldea's rear arrangement. Neither resolves the screen-side geometry. The page labels its game capture as work in progress. |
| [Official Kitakami activities page](https://www.pokemon.co.jp/ex/sv_dlc/ja/features/230808_03/) | New first-party page with a Roto-Stick section. Its linked [image 05](https://www.pokemon.co.jp/ex/sv_dlc/assets/img/ja/features/230808_03/img05.jpg) and [image 06](https://www.pokemon.co.jp/ex/sv_dlc/assets/img/ja/features/230808_03/img06.jpg) both returned `Cache miss`. | Useful follow-up candidates, not inspected front images. No casing claim relies on them. |
| [Official camera-app article](https://www.pokemon.com/uk/pokemon-news/using-the-camera-app-in-the-hidden-treasure-of-area-zero-part-1-the-teal-mask) and [SV phone-case page](https://scarletviolet.pokemon.com/en-us/news/rotom_phone_case/) | Search found the camera article; opening these pages exposed only an iframe in the available web reader. | No additional front geometry established. Phone-case marketing cannot substitute for an inspected default front. |

Search also returned licensed toy products, fan phone builds, software screenshots and image captions calling the circular face a front screen. These were not used to infer the game hardware. A toy can change construction, and an automatically supplied image description does not establish which side of the phone is shown. No remote media were downloaded to bypass retrieval or display limits.

The additional search did not produce a new, directly inspectable Kalos hardware view or a detailed SV screen-side view. That is the remaining evidence gap, not evidence that those views do not exist.

## Motion boundary and next action

The main session reports that positive `rotateX` at `renderer.js:62` sends all four upper lids, `gold`, `ruby`, `diamond` and `heartgold`, toward negative z. Its sign-only diagnostic fixes the direction, while `z-index: 999` does not. This sidecar did not rerun or remeasure that result. See the main session's [closing-depth report](ticket-46-closing-depth.md) and [motion probe](ticket-46-motion-probe.html). These implementation observations are separate from what the artwork proves.

No source consulted here verifies an entire opening or closing trajectory. In particular, an open static image cannot establish the unseen exterior of Hoenn or Sinnoh. GSC, HGSS, BW and X/Y provide useful endpoint evidence, but not their complete hidden construction or transition. The Johto orb mismatch is an endpoint-fidelity finding and remains relevant even after a hinge-direction correction.

For an implementation follow-up, address F1 through F4 against their visible landmarks, then decide whether to retain or revise the four declared departures in F5 through F8. Obtain a direct Paldea screen-side reference before describing any replacement as a canonical front. Keep the artwork decisions separate from the main session's renderer correction.
