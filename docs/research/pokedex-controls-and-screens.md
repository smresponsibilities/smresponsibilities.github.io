# Pokédex casing, controls, motion, and game-screen reference

**Status:** source-backed research note
**Checked:** 2 September 2026
**Purpose:** correct the asset prompts before any new casing masters are generated.

## Decision summary

The asset set should contain **eight skin packages**, one for each selected game pair. “Clubbed by eight” should mean eight coherent packages, not eight total PNG files. Hinged and sliding devices need more than one state master, and every future pressable control needs a separate moving face and fixed base.

The current Kanto master is not approved. Red/Blue needs a fresh eighth prompt and fresh masters. The highest-value Kanto references are the 1,150 × 945 Red/Green open-device artwork and the 1,224 × 650 open/closed artwork listed below.

Several current prompt statements are contradicted by the source art:

- Gold/Silver is coral-red and opens into a base, a raised top leaf, and a right-side leaf. It is not a gold one-cover device.
- Ruby/Sapphire is an orange vertical clamshell with a cylindrical hinge. It is not a solid landscape GBA-shaped slab.
- Diamond/Pearl is a vertical dual-screen clamshell. It is not a side-by-side screen device.
- HeartGold/SoulSilver artwork does not show a hardware D-pad, A/B pair, or START/SELECT pair.
- Black/White keeps its upper screen visible in the compact artwork and has a large white/silver central round control, not a tiny red cap.
- Sun/Moon has Rotom eye housings, a face, a red spike, red paddle-like arms, and red feet. The source does not show the prompt's yellow spike tip or cream limbs.
- Scarlet/Violet's official rear artwork is an orange-red Rotom Phone with a jagged top spike, pointed tail, white/cyan fins, glowing rear motif, and dual camera. It is not a plain charcoal phone with all Rotom features removed.

These findings conflict with factual geometry in `BUILD.md`, `docs/research/pokedex-hardware-by-generation.md`, and `.scratch/sm-dex/CHATGPT-MASTER-PROMPTS.md`. This note does not change those files. They must be reconciled before generation because `BUILD.md` currently wins conflicts.

## Evidence standard and limits

This note uses the following labels:

- **Documented:** stated by an official site, official manual, or game-derived source code.
- **Visual observation:** directly visible in official art or an unedited gameplay capture.
- **Inference:** a reasonable interpretation of still art, but not documented as a mechanism or function.
- **Unknown:** no reliable source found in this pass.

Bulbagarden Archives is a secondary host. Its file pages identify the images as official game artwork and preserve useful native dimensions and file history; they are not first-party publication pages. Nintendo manuals and Pokémon/Nintendo product pages are the primary sources for game behavior. The `pret` disassemblies/decompilations are game-derived behavioral evidence, not official documentation.

No cited source is a mechanical drawing. Exact depth, hidden rear construction, hinge travel, actuation force, and the functions of most illustrated casing controls remain undocumented. “Pixel-to-pixel” therefore applies to the visible source view and its measured landmarks, not to unseen surfaces.

## Eight asset packages

| Package | Required state masters | Primary geometry reference | Native source size | Confidence |
|---|---|---|---:|---|
| `red-blue` | open, closed | [Red/Green open art](https://archives.bulbagarden.net/wiki/File:RG_Pok%C3%A9dex.png); [Generation I open/closed art](https://archives.bulbagarden.net/wiki/File:Gen_I_Pok%C3%A9dex.png) | 1,150 × 945; 1,224 × 650 | High for visible front and hinge; medium for closed rear |
| `gold-silver` | open compound device, closed | [Gold/Silver game art](https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_GSC.png) | 440 × 261 | High for silhouette and colour; medium for small controls because the only indexed art is low-resolution |
| `ruby-sapphire` | open; closed only after a second reference is secured | [Hoenn Generation III game art](https://archives.bulbagarden.net/wiki/File:RSE_Pok%C3%A9dex.png) | 668 × 768 | High for the open view; low for an unseen closed back |
| `diamond-pearl` | open; closed reconstructed from the same component set | [Diamond/Pearl game art](https://archives.bulbagarden.net/wiki/File:DP_Pok%C3%A9dex.png) | 1,049 × 866 | High for open front; medium for closed outer faces |
| `heartgold-soulsilver` | open, closed | [HGSS male-model game art](https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_HGSS_m.png) | 1,167 × 1,024 current; 2,879 × 2,526 in file history | High; compare the current file with the older high-resolution revision before tracing |
| `black-white` | extended, compact | [Black/White game art](https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_BW_art.png) | 776 × 526 | High for the two pictured forms; medium for motion because state and player-gender colour are confounded |
| `sun-moon` | stationary front shell | [Rotom Pokédex official art mirror](https://archives.bulbagarden.net/wiki/File:0479Rotom-Pok%C3%A9dex.png) | 516 × 516 | High for silhouette; the screen-face omission is a deliberate site adaptation |
| `scarlet-violet` | front shell and rear/case reference; no mechanical state | [official Rotom Phone feature page](https://www.pokemon.co.jp/ex/sv/ja/features/220803_02/); [high-resolution rear art mirror](https://archives.bulbagarden.net/wiki/File:0479Rotom-Phone_SV.png) | official screenshots 1,024 × 576; rear art 1,816 × 1,816 | High for the rear; front hardware remains unresolved |

Each package should contain one component source of truth. State masters must be assemblies of the same parts, not separately generated illustrations. Separate generations will drift in bezel width, hinge diameter, control spacing, colour, and perspective.

## Physical casing findings

### 1. Red/Blue: Kanto

#### Best source set

The [Red/Green artwork](https://archives.bulbagarden.net/wiki/File:RG_Pok%C3%A9dex.png) is the best open-front geometry reference. The archive identifies it as Red/Green game artwork and exposes a 1,150 × 945 PNG. The [Generation I open/closed sheet](https://archives.bulbagarden.net/wiki/File:Gen_I_Pok%C3%A9dex.png) supplies a coherent closed silhouette at 1,224 × 650. The [episode-one screenshot](https://archives.bulbagarden.net/wiki/File:Ash_Original_Pok%C3%A9dex.png) is useful only for hand scale and the in-use angle; it is a perspective animation frame, not an orthographic master.

#### Visible geometry

**Visual observation:** The device is an open red/salmon book-like body with a vertical cylindrical hinge down the centre. The left body remains the main instrument body; the right leaf swings over it when closed. The left upper cap contains a large blue circular lens and three small red, yellow, and green lamps. Beneath it is a pale silver/white angular screen bezel with a dark display. The lower-left control field contains a large black round control, red and cyan oblong controls, a green rectangular display-like region, and a black cross D-pad.

The right leaf has a wide dark upper display; a cyan keypad of **ten separate keys in two rows of five**; two white square keys; two small black oblong keys; one yellow round key; and two long dark-green lower keys. The open art gives the front plane, key count, order, and spacing. It does not provide a labelled functional diagram.

The hinge must be part of the stationary left body. The right leaf's inner control panel and its red outer cover must be two faces of one moving object. In the closed reference, the blue lens and three indicator lamps remain visible in the upper cap, while the right leaf covers the lower instrument face. The yellow triangular side detail and vertical spine/seam belong to the closed silhouette.

#### Detachable controls

Create separate moving-face and fixed-base assets for all controls that the site may expose:

- D-pad up, right, down, and left as four hit targets, even if one shared cross housing is drawn;
- keypad keys `01`–`10`, each with its own face and matching base;
- both white square keys independently;
- both black oblong keys independently;
- the yellow round key;
- both long dark-green keys independently;
- the lower-left black round control and the red/cyan oblong controls if they will be interactive.

Do not merge the ten-key pad into one button asset. Do not bake digits, labels, arrows, or site functions into any face. The green rectangle and wide black region read more strongly as displays than as buttons. The large blue circle and the three coloured circles read as lens/lamps; making them buttons would be a site invention.

#### Motion and uncertainty

**Inference:** the right leaf rotates about the central vertical hinge. The two art states establish topology, not timing, easing, exact angle, latch mechanism, or which control opens it. If the site assigns an existing key to open/close, that mapping must be documented as an interaction adaptation rather than Pokémon canon.

### 2. Gold/Silver: Johto

The [440 × 261 Gold/Silver artwork](https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_GSC.png) is the canonical visual anchor. The archive categorises it as Ken Sugimori game artwork from Gold and Silver.

**Visual observation:** The casing is coral/red-orange, not gold. The closed silhouette is a compact portrait device with a short black antenna at upper left, a large dark-blue circular element crossing the main seam, and a smaller blue circular element near the lower right. The open depiction has three structural zones: a stationary lower base, a raised top leaf containing a dark display, and a right-side leaf/cover. The base carries a yellow-green screen, a dark D-pad, small controls, and the large blue circular element. There are therefore two visible display regions in the open device.

The existing one-cover simplification is not pixel-similar to this source. If it is retained, it must remain an explicit product deviation, not be described as faithful hardware.

**Inference:** the top leaf and right leaf move on different axes. The still art does not establish the opening order, exact hinge axes, or whether the large blue elements are lenses, buttons, or both. Treat the D-pad directions as independent buttons. Keep each small visible key detachable if it will be interactive. Keep the blue circular elements non-interactive until a stronger source documents button use.

### 3. Ruby/Sapphire: Hoenn

The [668 × 768 Generation III Hoenn art](https://archives.bulbagarden.net/wiki/File:RSE_Pok%C3%A9dex.png) directly contradicts the current “solid landscape body” description.

**Visual observation:** The device is an orange portrait clamshell. A tall upper lid opens upward. It has a crescent-like top notch and a centred green oval glass/lamp. A broad cylindrical hinge spans the body, with a prominent silver/right hinge drum. The lower half contains a large silver/black/blue circular disc at left, a small red lamp, a rectangular screen in a black bezel, a large green oval/round control, and two small white pill controls on the right.

Create separate face/base pairs for the large green control and both white pills. If the large left disc is used for navigation, split its directional actions into independent hit targets while preserving the single disc housing. The red dot should remain a lamp unless stronger evidence identifies it as pressable.

**Inference:** the upper orange lid rotates on the broad horizontal hinge. The cited art shows only the open state. It does not justify an invented closed rear, latch, GBA-style shape, or a claim that the body is stationary. Secure a closed screenshot or model reference before approving a closed master.

### 4. Diamond/Pearl: Sinnoh

The [1,049 × 866 Diamond/Pearl artwork](https://archives.bulbagarden.net/wiki/File:DP_Pok%C3%A9dex.png) is the geometry reference. The [official Diamond manual](https://csassets.nintendo.com/noaext/image/private/t_KA_PDF/DS_Pokemon_Diamond) is the behavior reference for the game UI.

**Visual observation:** The casing is a conventional vertical DS-like clamshell opened to roughly a right angle, not two side-by-side screens. The rose/red upper lid holds the top screen. It has a large rounded four-hole lobe on the left and a small black dot on the right. The lower body holds the touch screen. Large black semicircular side pods frame it: a silver cross D-pad sits in a concentric left well; a green circular control sits in a silver/black right ring. Two tiny silver round controls sit immediately to the right of the lower screen, and a small green indicator sits at the far left.

The source art does not show a loose stylus, a Poké Ball emblem, or an extra START/SELECT pill pair. Do not add them to the master. Create four D-pad direction faces/bases, one green round face/base, and two separate silver control face/base pairs. Keep the green indicator non-pressable.

**Inference:** the upper lid rotates around the central horizontal hinge. A closed outer face can be reconstructed from the same lid component, but the cited art does not reveal every rear detail.

### 5. HeartGold/SoulSilver: Johto redesign

The [HGSS male-model artwork](https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_HGSS_m.png) shows open and closed forms. The archive's current file is 1,167 × 1,024 and its history retains a 2,879 × 2,526 revision. Use the older resolution only after overlaying it against the current revision to confirm that the geometry is unchanged.

**Visual observation:** The device is a tall orange-red flip-phone/clamshell with a carry loop at the top. Closed, it shows a thin vertical green indicator and a large blue circular element in a black ring near the lower seam. Open, the top and lower displays stack vertically. Two green indicator lamps sit on the dark bridge. Gold side rails or stylus-like pieces run along the sides.

The artwork does **not** show a hardware D-pad, A/B pair, black round navigation keys, or START/SELECT pair. Those controls in the current prompt are a Black/White hybrid and must be removed. The green elements read as indicators, not buttons. The blue circular element is visually prominent but its function is undocumented. The gold side pieces may be styluses or rails; art alone does not establish that they are pressable.

**Inference:** the top portion rotates about the central horizontal hinge. The official stills establish open and closed forms but not the exact opening button or timing. Later site navigation should primarily use accessible controls rendered inside the lower-screen DOM rather than invented casing buttons.

### 6. Black/White: Unova

The [776 × 526 Black/White art](https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_BW_art.png) shows an orange-accented extended device and a pink-accented compact device.

**Visual observation:** The body is a tall grey/black slider. In the extended view, an upper screen remains at the top and a second screen is revealed below it. The orange lower plate carries a Poké Ball division and a large white/silver round central control. A black diagonal band crosses the lower section. A small green side control is visible. The base has two dark slots and three tiny dots. In the compact pink view, the upper screen is still visible; the device does not hide both screens.

Create a separate face/base for the large central round control. Keep the green side element detachable only if the application will use it. Do not add a D-pad, A/B pair, or tiny red cap.

**Inference:** an upper tray translates along the long axis to reveal the middle/lower screen. The art does not show the travel path frame by frame. It also confounds state with player-gender colour: orange is pictured extended and pink is pictured compact. A single-colour open/compact pair reconstructed from these views is a controlled extrapolation, not two directly sourced same-colour states.

### 7. Sun/Moon: Rotom Pokédex

The [516 × 516 Rotom Pokédex art](https://archives.bulbagarden.net/wiki/File:0479Rotom-Pok%C3%A9dex.png) is identified by the archive as official Sun/Moon art. The [official Nintendo Sun page](https://www.nintendo.com/en-gb/Games/Nintendo-3DS-games/Pokemon-Sun-1092368.html) documents the Rotom Pokédex and QR Scanner.

**Visual observation:** The silhouette is wide and creature-like. It has a red spike/horn at upper left, red paddle-like arms with raised oval pads, red feet, and blue oval eye housings above the display. Rotom's smiling face occupies the screen area. The source does not show a yellow spike tip, cream arms/feet, a conventional power button, or an A/B pair.

The repo rule that screen UI and faces remain live DOM content requires one deliberate visual deviation: preserve the red shell, eye housings, limbs, and exact screen opening, but omit the baked face from the raster/SVG casing. Render the eyes/mouth or alternate screen content as a DOM/UI layer. This is the only defensible way to preserve both the recognisable silhouette and the shared accessible screen.

The raised oval arm pads are visually distinct, but no cited source calls them buttons. Do not create invented hardware controls to satisfy a parts-grid quota. This stationary skin can rely on screen UI controls.

### 8. Scarlet/Violet: Rotom Phone

The [official Japanese feature page](https://www.pokemon.co.jp/ex/sv/ja/features/220803_02/) shows the Rotom Phone in use and states that the Pokédex is an app. Its three first-party 1,024 × 576 references are [phone feature image 1](https://www.pokemon.co.jp/ex/sv/assets/img/features/ja/220803_02/features_img_01.jpg), [image 2](https://www.pokemon.co.jp/ex/sv/assets/img/features/ja/220803_02/features_img_02.jpg), and [map-app image](https://www.pokemon.co.jp/ex/sv/assets/img/features/ja/220803_02/features_img_03.jpg). The [1,816 × 1,816 press-art mirror](https://archives.bulbagarden.net/wiki/File:0479Rotom-Phone_SV.png) supplies the clearest rear geometry. Nintendo likewise states that the Pokédex is loaded on the Rotom Phone as an app and that Jacq developed it ([Nintendo news](https://www.nintendo.com/en-ca/whatsnew/new-details-revealed-for-pokemon-scarlet-and-pokemon-violet-including-tera-raid-battles/)).

**Visual observation:** The high-resolution art is a rear view of an orange-red rounded phone with a jagged Rotom spike at the top, a pointed tail at the bottom, two white/cyan oval fins or eye-like forms, a cyan glowing ring/smile motif, and a dual camera at upper left. Removing the antenna, tail, fins, and rear motif produces a generic phone rather than the Scarlet/Violet Rotom Phone.

The rear artwork does not document the front bezel, front-facing controls, side-button geometry, or exact screen cut-out. Do not invent those details and call them canonical. Use an in-game front capture as the second locked reference before approving a production front. The device has no opening/sliding state; navigation belongs to the touchscreen DOM and normal keyboard-accessible controls.

## Actual game list and entry content

Physical casing art and game UI are separate evidence sets. Manuals describe the console's controls and the software displayed on the console, not the functions of the illustrated in-world casing buttons.

| Skin | List/browse content | Entry/detail content | Strongest behavior source |
|---|---|---|---|
| Red/Blue | Three-digit number and name; unseen names become dashes; an owned marker distinguishes caught Pokémon. | Sprite, number, name, species/category, height, weight, and flavour text; owned state gates full data. | [Original Blue manual scan](https://gbdbstorage.s3.amazonaws.com/manuals/dmg/DMG-APEE-USA_En_0.pdf); game-derived [`pokedex.asm`](https://github.com/pret/pokered/blob/master/engine/menus/pokedex.asm) and [dex-entry data](https://github.com/pret/pokered/blob/master/data/pokemon/dex_entries.asm) |
| Gold/Silver | Number/name list with seen/owned state; Crystal's game-derived code shows a seven-row list and search/options flow. | Sprite, number, category, height, weight, flavour text, plus page/area/cry/print actions in the Generation II family. | Game-derived [Crystal Pokédex code](https://github.com/pret/pokecrystal/blob/master/engine/pokedex/pokedex.asm). Use it as family behavior evidence, not a Gold/Silver pixel reference. |
| Ruby/Sapphire | Number/name list with seen/owned markers and a selected-species sprite. Emerald's implementation uses four visible list rows and numerical/alphabetical/size/weight sorting. | Info page with sprite, category, height, weight, footprint, and flavour text; separate area, cry, and size views. | Game-derived [Emerald Pokédex implementation](https://github.com/pret/pokeemerald/blob/master/src/pokedex.c). Emerald corroborates the RSE family but is not a Ruby/Sapphire pixel-identical UI source. |
| Diamond/Pearl | The top-screen list can be moved with the lower-screen rotating dial; the manual documents alphabetical/numerical search and jump-to-start/end icons. | Data, cry, habitat, and relative-size views, with Back and Next touch controls. | [Official Diamond manual](https://csassets.nintendo.com/noaext/image/private/t_KA_PDF/DS_Pokemon_Diamond) |
| HeartGold/SoulSilver | Seen/caught catalogue with alphabetical/numerical search; gameplay captures show a touch-oriented grid/list. | Number, name, category, type, height, weight, and flavour text; manual-documented data, cry, habitat, and relative-size views. | [Official HeartGold manual](https://csassets.nintendo.com/noaext/image/private/t_KA_PDF/DS_Pokemon_HeartGold); screenshots are useful only as direct visual captures. |
| Black/White | Gameplay capture shows a green-grid list with number, name, small sprite, selection row, `A: INFO`, and START/SELECT prompts. | Number, name, category, type, height, weight, and flavour text; actions include Info, Area, Cry, and Forms. The manual explicitly confirms data, cries, and habitat. | [Official Black manual](https://csassets.nintendo.com/noaext/image/private/t_KA_PDF/DS_Pokemon_Black); [direct-entry capture context](https://www.fandomspot.com/pokemon-bw-best-psychic-types/) for the exact visual fields |
| Sun/Moon | Region/island browsing and species cards with seen/caught progress; use the capture for exact spacing and state treatment. | Animated species view with number/name, type, category, height, weight, flavour text, habitat information, form/gender navigation where applicable, and a QR view. | [Official Nintendo Sun page](https://www.nintendo.com/en-gb/Games/Nintendo-3DS-games/Pokemon-Sun-1092368.html) for capabilities; [complete no-commentary game capture](https://www.youtube.com/watch?v=gXml_rybp4A) for pixel layout |
| Scarlet/Violet | A bookshelf metaphor: catching or receiving a Pokémon fills a book on the app's shelf. | Registered ecology and distribution; game captures show number, name, types, category, height, weight, flavour text, habitat, and motion controls. | [Official Pokédex bookshelf page](https://www.pokemon.co.jp/ex/sv/ja/features/220803_01/), including [bookshelf screenshot](https://www.pokemon.co.jp/ex/sv/assets/img/features/ja/220803_01/features_img_05.jpg) and [entry screenshot](https://www.pokemon.co.jp/ex/sv/assets/img/features/ja/220803_01/features_img_06.jpg) |

The site should preserve these content conventions in its shared screen layer. It should not bake any list, entry text, Rotom face, counters, type labels, button labels, or Pokémon art into a casing master.

## What canon does not document about hardware buttons

No source found in this pass maps the visible buttons on the illustrated Pokédex shells to named software actions. In particular:

- Nintendo's Diamond/Pearl, HeartGold/SoulSilver, and Black/White manuals map **Nintendo DS controls and touch-screen controls** to the game UI. They do not identify the cross, disc, knob, keypad, lens, or lamps drawn on the separate Pokédex item artwork.
- Official art does not say that the Kanto blue lens, Johto blue orb, Hoenn left disc, Sinnoh green round control, HGSS blue circle, Unova white central control, Rotom arm pads, or Rotom Phone spike activates a particular function.
- Official still art does not define press depth, hover state, focus state, easing, transition duration, or reduced-motion behavior.
- Open/closed or extended/compact stills do not establish an opening-control mapping. The site's explicit open/close/slide button is an accessibility and interaction requirement, not a canonical device fact.
- The art does not establish whether visually ambiguous circles are cameras, lenses, lamps, buttons, or combined devices. Avoid assigning semantics from colour or prominence alone.

Future button mappings should therefore live in configuration, separate from geometry. Asset IDs should describe physical position or shape (`keypad-01`, `lower-white-left`, `dpad-up`) rather than unverified functions (`search`, `back`, `power`). A later skin mapping can assign the same accessible actions to different physical controls without regenerating art.

## Parts-grid and press-state contract

The existing site interaction contract remains appropriate even though it is not Pokémon canon:

- every visible interactive control is a native button;
- every D-pad direction has its own hit target;
- every pressable shape has one fixed base and one same-silhouette moving face;
- only the face and its glyph move downward by 4 px while pressed;
- labels and glyphs remain DOM/SVG content so later mappings can change;
- a control cluster never becomes one large click target;
- reduced motion keeps the state change but removes the animated sweep.

The measured Codédex behavior and source URL are recorded in [`docs/research/codedex-button-press.md`](./codedex-button-press.md). This is a site behavior reference, not evidence about Pokédex hardware.

For the 1,536 × 1,024 approval-sheet format, the left assembled view and right parts grid should be generated from the same source components. A package may use multiple sheets when both open/closed or compact/extended states are required. Do not shrink all controls into one overloaded sheet merely to keep one file per skin.

## Prompt correction checklist

Before regenerating assets, update the prompts so they pass all of these checks:

1. There are eight prompts/packages, including a fresh Red/Blue prompt. No prior Kanto master is treated as approved.
2. Every prompt names its locked reference URL and native dimensions.
3. The prompt distinguishes documented geometry, visual observation, and inferred unseen construction.
4. Kanto contains the central vertical hinge and all ten independent cyan keypad keys.
5. Gold/Silver retains the coral-red shell, top leaf, and right-side leaf unless a deliberate simplification is recorded.
6. Ruby/Sapphire is an orange hinged clamshell.
7. Diamond/Pearl is a vertical dual-screen clamshell and has no invented loose stylus or mini-pill pair.
8. HGSS has no invented hardware D-pad/A-B/START/SELECT controls.
9. Black/White compact state keeps the upper screen visible and retains the large white/silver central control.
10. Sun/Moon retains Rotom's silhouette and eye housings; only the screen face becomes a live UI layer.
11. Scarlet/Violet retains the Rotom spike, tail, fins, rear motif, and cameras; front geometry waits for a front capture.
12. Every later-interactive control is emitted as an independent face/base pair with a neutral morphology-based ID.
13. No casing master contains text, numbers, arrows, button functions, Pokémon entries, screen UI, or a baked Rotom face.
14. Screen openings use true alpha-zero holes rather than black or transparent-looking paint.

## Pixel-fidelity procedure

A text-to-image prompt alone cannot guarantee pixel-level similarity. Use generation, if any, for material finish only. Lock geometry by measurement and reconstruction:

1. Freeze the exact source revision and native dimensions. Do not measure a browser preview.
2. Mark silhouette extrema, screen corners, hinge axis/diameter, control centres, control bounding boxes, and spacing at source resolution.
3. Reconstruct one component set per package. Assemble every state from those components.
4. Sample the shell palette from the source instead of naming approximate colours in prose.
5. Overlay the reconstruction and source at the same scale with 50% opacity. Any doubled silhouette, hinge, bezel, or key edge is a failure to resolve before styling.
6. Verify the alpha channel separately: outside canvas and every screen aperture must be exactly transparent; faces and bases must be fully opaque where intended.
7. Compare each detached part against its position in the assembled master. Shape, scale, highlight direction, and perspective must match.
8. Audit at 200% zoom and at final responsive size. Approval at one size does not prove that small controls remain distinct.

Do not claim “pixel-to-pixel” approval until the normalized overlay has no visible double edges on the landmarks above. Perspective art cannot prove unseen surfaces; those surfaces should be labelled reconstructed rather than canonical.
