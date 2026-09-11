# Ticket 47: Generation II-V reference pass

Date: 2026-09-08.

## Result

The extra pass found fourteen useful visual artifacts beyond `g2-01..10`, `g3-01..10`,
`g4-01..10`, and `g5-01..10`, plus a first-party source for the existing BW artwork.
One correction is much stronger than the rest:
the current Ruby/Sapphire crescent is using the wrong hinge axis. Both an animation
artwork and an episode frame place the crescent on the rear edge of a landscape body,
opening upward like a clamshell. The current `assets/hoenn.js` instead rotates it around
a vertical right-side axis and spreads the open device across almost the full 940-unit
stage. Restoring a rear/top hinge will also fix the user's stage-fit complaint without
shrinking the device into a different silhouette.

The new Johto, Sinnoh, HGSS, and Unova material mostly adds straight-on, closed, rear,
or oblique views. It gives good polish targets, but it does not reveal a complete hinge
sequence. In particular, no new source proves a closed RSE exterior or a same-colour BW
compact-to-expanded transition.

## Source-strength key

- **A:** first-party Pokémon or Nintendo page and first-party-hosted media.
- **B:** identifiable official game, animation, TCG, or manga artifact on a secondary
  archive. The artifact is primary visual evidence for its own continuity; the host's
  description is secondary provenance.
- **C:** official-looking or licensed material whose original publication is not named,
  or a physical product that may change fictional construction.

## Generation II, Gold/Silver/Crystal

| New reference | Strength | Exact useful evidence | Limit | Concrete correction to current study? |
| --- | --- | --- | --- | --- |
| [Johto dex anime 1 source page](https://archives.bulbagarden.net/wiki/File:Johto_dex_anime_1.png) · [direct image](https://archives.bulbagarden.net/media/upload/8/85/Johto_dex_anime_1.png) | B. Artwork reproduced from *The Official Pokémon Handbook 3*. | Clean three-quarter open pose. It separates the upper leaf, long body, and notched right leaf. The body has an inset screen, D-pad, one oblong key, three round keys, and a large lower-right blue lens. The upper leaf has a large dark panel, two dark corner slots, and a dark dome projecting above the shell. | Animation-continuity artwork, not GSC game-model geometry. No motion sequence or hidden leaf faces. | **Yes, finish-level.** Darken the currently bright cyan open top dome toward the smoky black-blue seen here and in `g2-01`. Keep the closed central lens blue. Preserve distinct body, top-leaf, and right-leaf depth instead of flattening their seams. |
| [Johto dex anime 2 source page](https://archives.bulbagarden.net/wiki/File:Johto_dex_anime_2.png) · [direct image](https://archives.bulbagarden.net/media/upload/5/56/Johto_dex_anime_2.png) | B. Second Handbook 3 animation artwork. | Nearly straight-on closed face. Tall narrow rectangle, short black antenna at upper left, horizontal closure seam through a large central ring/lens, and a smaller blue lens at lower right. | Same continuity and handbook as the open artwork. It is an endpoint, not a closure diagram. | **Yes, proportion check.** Closed GSC should read tall and narrow before its surface detail is read. It also supports keeping the lower blue lens visible at the settled endpoint. Do not infer leaf order from it. |
| [New Pokédex, Pokémon Web 16 source page](https://archives.bulbagarden.net/wiki/File:NewPok%C3%A9dexPok%C3%A9monWeb16.jpg) · [direct card scan](https://archives.bulbagarden.net/media/upload/2/27/NewPok%C3%A9dexPok%C3%A9monWeb16.jpg) | B. Official Pokémon TCG card scan. | Oblique open illustration confirms the long body, dark upper display, projecting top dome, lower blue lens, D-pad and three round keys. The right leaf reads as a separate plate with a notched free end. | Stylised TCG art. It repeats the same illustration used by *Neo Genesis* 95, so the two printings are one visual reference, not two independent views. | **Yes, polish only.** Use the visible shell thickness, bevel highlights, and layered control wells as the Gen I finish benchmark. It does not justify changing the current two-stage leaf motion. |

### Generation II recommendation

Keep the existing sequential top-then-right opening because no source contradicts it, but
do not call that order canonical. The best safe visual changes are a darker open dome,
stronger shell-edge thickness, cleaner recessed control wells, and a closed silhouette that
stays visibly taller than it is wide. The two Handbook views and the TCG art agree on those
landmarks even though they are not game screenshots.

## Generation III, Ruby/Sapphire/Emerald

| New reference | Strength | Exact useful evidence | Limit | Concrete correction to current study? |
| --- | --- | --- | --- | --- |
| [Hoenn animation artwork source page](https://www.pokepedia.fr/Fichier:Pok%C3%A9dex_Hoenn-Anim%C3%A9.png) · [direct image](https://www.pokepedia.fr/images/d/db/Pok%C3%A9dex_Hoenn-Anim%C3%A9.png) | C. The file is catalogued as Hoenn Pokédex artwork, but the page does not name its original publication. | Clean three-quarter open view. The device is a landscape slab with the white-and-blue disc projecting from its left front. A cylindrical hinge runs along the rear edge. The crescent stands upright from that hinge. The screen, green button, red lamp, two white pills, and right hinge cap are all readable. | Secondary archive with incomplete original provenance. Animation design differs from the Ken Sugimori game artwork in some casing details. No closed view. | **Yes, high-value correction when combined with `g3-01`.** Replace the current `hinge-y` side-door motion with a rear-edge `hinge-x` clamshell. This also keeps the open width compact enough for the shared stage. |
| [AG183 error source page](https://archives.bulbagarden.net/wiki/File:AG183_error.png) · [direct frame](https://archives.bulbagarden.net/media/upload/9/9e/AG183_error.png) | B. Episode frame from *Aipom and Circumstance!* | Full device in Ash's hands. The lower body remains landscape, the lid is upright behind it, the hinge is horizontal across the rear, and the circular control projects from the left. It also gives hand scale and a clean open endpoint. | Animation continuity. The lid face has a Poké Ball motif rather than the green oval in the game art. The frame does not show closing. | **Yes.** Independently rejects the current side-swinging lid. Use only its orientation and endpoint, not its lid-face decoration, for the RSE game-art study. |
| [Emerald's Pokédex source page](https://archives.bulbagarden.net/wiki/File:Emerald_Pok%C3%A9dex_Adventures.png) · [direct manga panel](https://archives.bulbagarden.net/media/upload/5/56/Emerald_Pok%C3%A9dex_Adventures.png) | B for Pokémon Adventures continuity, low for game reconstruction. | Small oblique view of an open landscape body, left circular control, central screen, right hinge cylinder, and raised crescent. The view is useful because the open width stays close to the body width rather than doubling sideways. | Small monochrome crop from a separate continuity. It cannot settle colour, exact dimensions, or the unseen exterior. | **Corroboration only.** Supports the compact clamshell reading. Do not copy manga-only simplifications. |

### Generation III recommendation

Rebuild the current lid around a horizontal rear-edge pivot. Keep the lower landscape body,
left disc, screen, lamp, green key, and two white pills from `g3-01`. At the open endpoint,
the crescent should rise behind the body, so the complete silhouette occupies roughly the
body's width rather than the current `x=30..912` side-spread. At the closed endpoint, the
crescent cut-out may clear the disc, but the sources do not show the exact overlap. Treat
that clearance as reconstruction and do not rotate the lid sideways merely to make it easy.

The clean animation artwork is also a useful polish guide: rounded side rails, visible hinge
cap, dark recessed screen surround, layered disc rings, and narrow white pill wells. Those
features will bring RSE closer to Gen I's finish without inventing more controls.

## Generation IV, Diamond/Pearl

| New reference | Strength | Exact useful evidence | Limit | Concrete correction to current study? |
| --- | --- | --- | --- | --- |
| [Ash's closed Sinnoh Pokédex source page](https://archives.bulbagarden.net/wiki/File:Ash_Sinnoh_Pok%C3%A9dex_closed.png) · [direct frame](https://archives.bulbagarden.net/media/upload/4/4f/Ash_Sinnoh_Pok%C3%A9dex_closed.png) | B. Episode frame from *Home Is Where the Start Is!*. | Clear closed three-quarter exterior. A large red circular plate occupies the left half, a dark longitudinal strip crosses the silver panel, and three green indicators sit in that strip. The long hinge remains exposed along the right edge. | Anime exterior, not a released-game hardware view. It cannot be silently combined with `g4-01` and called game-canonical. | **Conditional.** The current closed exterior uses an invented central ring and left vents. This frame offers a documented replacement only if the study explicitly becomes a game/anime hybrid. Otherwise keep it as a separate variant. |
| [Paul's Pokédex source page](https://archives.bulbagarden.net/wiki/File:Paul_Pok%C3%A9dex.png) · [direct frame](https://archives.bulbagarden.net/media/upload/a/a8/Paul_Pok%C3%A9dex.png) | B. Episode frame from *When Pokémon Worlds Collide!*. | Straight-on open view of a dark-blue Sinnoh variant. It shows the upper screen between side pads, the lower screen centred between a round left D-pad pod and a small right control plate, two pale buttons on the right, hinge segmentation, and a green lamp on the left pod. | Anime colour and right-control treatment differ from the pink-red game artwork. | **Polish only for current game variant.** Use the clean screen rims, pod depth, and hinge segmentation. Do not replace the game-art green right pod with the anime controls. |
| [Pokédex HANDY910is DP 111 source page](https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dexHANDY910isDiamondPearl111.jpg) · [direct card scan](https://archives.bulbagarden.net/media/upload/1/1e/Pok%C3%A9dexHANDY910isDiamondPearl111.jpg) | B. Official Diamond & Pearl-era TCG card scan. | Oblique red open device. It preserves the left D-pad lobe, right green circular pod, dual screens, and projecting side islands. This is the closest new image to the game-art configuration. | Small stylised illustration. It adds no closed face or motion evidence. | **Yes, finish-level.** Keep the asymmetrical left and right pods visibly proud of the centre body, add rim thickness around both screens, and avoid flattening the green control into the body plane. |

### Diamond/Pearl recommendation

The open geometry in `assets/classic.js` already follows the game-art control inventory. The
safe pass is depth and finish: stronger screen rims, more distinct side-pod layers, a segmented
hinge, and consistent highlights. The only new closed-face evidence is anime-specific. Either
label and use that exterior, or keep the current exterior explicitly reconstructed. Do not mix
it in without saying so.

## Generation IV remake, HeartGold/SoulSilver

| New reference | Strength | Exact useful evidence | Limit | Concrete correction to current study? |
| --- | --- | --- | --- | --- |
| [HGSS Pokédex anime source page](https://archives.bulbagarden.net/wiki/File:HGSS_Pok%C3%A9dex_anime.png) · [direct frame](https://archives.bulbagarden.net/media/upload/b/bc/HGSS_Pok%C3%A9dex_anime.png) | B. Episode frame from *A Rivalry to Gible On!*. | Male orange open upper half. The round top loop rises behind a dark centre strip; orange side rails frame a broad white screen; two green lamps sit in the dark lower strip; the hinge barrels are visible. | Cropped scan pose. It does not show the lower half or explain how the round open loop becomes the trapezoidal closed handle in `g4-03`. | **Yes, polish confirmation.** The current top projection, centre strip, two lamps, and hinge segmentation are correct features to retain. Increase separation between the dark strip and orange rails if they merge at stage scale. |
| [Lyra's Pokédex scan source page](https://archives.bulbagarden.net/wiki/File:Lyra_Pok%C3%A9dex_scan.png) · [direct frame](https://archives.bulbagarden.net/media/upload/c/cc/Lyra_Pok%C3%A9dex_scan.png) | B. Episode frame from *An Egg Scramble!*. | Close front view of the female pink/white open variant. It shows a nearly full-width upper screen, white side rails, pink centre strip, two green lamps, and the broad hinge below. | Female anime colourway. The top and lower body are cropped. It cannot determine the male casing colour or handle motion. | **Polish only.** Useful for screen-to-rail spacing and lamp placement. Do not recolour the selected orange male model. |

### HGSS recommendation

No new geometry correction is justified. The two frames confirm the surface hierarchy already
present in `assets/middle.js`: coloured side rails, dark centre strip, pale screen rim, two lamps,
and a top projection. Improve their contrast and edge treatment. Keep the open round loop versus
closed trapezoidal handle relationship labelled unresolved.

## Generation V, Black/White

| New reference | Strength | Exact useful evidence | Limit | Concrete correction to current study? |
| --- | --- | --- | --- | --- |
| [Official Japanese Black/White page](https://www.pokemon.co.jp/series/bw/) · [direct official device image](https://www.pokemon.co.jp/series/bw/story/story02.items/resources/01_image2.gif) | A. First-party page and media. | One panel shows the red male unit expanded and the pink female unit compact. The page text explicitly says red is for the boy and pink for the girl. Both have the diagonal band, large white circular control, bottom slot/dot row, and green side key. | This is a provenance upgrade for the same art family as `g5-01`, not a new angle. Because colour and pose change together, it still does not prove a red compact endpoint or the slider path. | **No new geometry correction.** Keep the current inference warning. It does support describing the selected unit as red-orange rather than claiming that orange and pink are one transformable device. |
| [Pokédex, Black & White 98 source page](https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dexBlackWhite98.jpg) · [direct card scan](https://archives.bulbagarden.net/media/upload/4/41/Pok%C3%A9dexBlackWhite98.jpg) | B. Official Black & White-era TCG card scan. | Oblique expanded red-orange device. It clearly separates the two display sections, silver rails, orange lower semicircle, white circular control, dark diagonal band, bottom slot, and dot row. | Stylised card illustration. It provides no compact state, rear, or slider construction. | **Yes, finish-level.** Retain the isolated three-dot row and make the lower semicircle, diagonal band, white control, and silver rails read as separate stacked materials. It does not validate the 220-unit straight slide. |
| [Bianca's Pokédex source page](https://archives.bulbagarden.net/wiki/File:Bianca_Pok%C3%A9dex.png) · [direct frame](https://archives.bulbagarden.net/media/upload/6/6e/Bianca_Pok%C3%A9dex.png) | B. Episode frame from *Minccino, Neat and Tidy!*. | Rear of the compact pink unit in hand. It has two dark rectangular apertures near the top edge, a dark blue circular element near the upper left, and a large recessed rectangular panel below. The view also shows a thin stacked edge. | Animation rear of the pink variant. It says nothing about the red-orange rear or the compact front-to-expanded motion. | **Optional rear correction only.** If a rear face is added later, use these documented landmarks. It does not require a change to the current front-only slider. |
| [Dawn's Unova Pokédex source page](https://archives.bulbagarden.net/wiki/File:Dawn_Unova_Pok%C3%A9dex.png) · [direct frame](https://archives.bulbagarden.net/media/upload/9/9c/Dawn_Unova_Pok%C3%A9dex.png) | B. Episode frame from *Piplup, Pansage, and a Meeting of the Times!*. | Front open pale-pink unit held vertically. The straight-on pose shows a narrow portrait silhouette, thin side rails, a tall upper screen section, and a smaller lower body section. | Animation colourway and hand occlusion. It does not expose the lower controls or rail mechanism. | **Proportion check.** Keep the expanded unit slender and centred. It supports reducing any excess horizontal padding, but not changing the current two-screen inventory. |

### Generation V recommendation

Keep the current two-screen stack and separated dot row. The best polish pass is material
separation: pale silver rails, darker inset display frames, a red-orange lower shell, crisp dark
band, and a bright white control with its own well. Do not present the straight 220-unit slide as
canonical. No source in this pass shows one same-colour unit at both endpoints.

## Highest-confidence implementation order

1. Rework RSE around a rear/top hinge. This is the only clear geometry correction and directly
   fixes Gen III's shared-stage fit.
2. Polish GSC's open dome and layer depth. Recheck the closed tall/narrow read at the actual stage
   size.
3. Polish DP's side pods, screen rims, and hinge. Decide separately whether its closed face remains
   reconstructed or becomes an explicitly labelled anime hybrid.
4. Strengthen HGSS strip, rail, lamp, and screen-rim contrast without changing its unresolved
   handle mechanism.
5. Polish BW's rails, band, lower semicircle, control well, and dots. Preserve the inference label
   on its compact motion.

## Sources inspected but not promoted

- [New Pokédex, Neo Genesis 95](https://archives.bulbagarden.net/wiki/File:NewPok%C3%A9dexNeoGenesis95.jpg)
  uses the same artwork as Pokémon Web 16 at lower resolution. It is not an independent Johto view.
- [DP Toy Pokédex Inside](https://archives.bulbagarden.net/wiki/File:DP_Toy_Pok%C3%A9dex_Inside.jpg)
  and the [Unova Electronic Pokédex](https://archives.bulbagarden.net/wiki/File:Unova_Electronic_Pok%C3%A9dex.jpg)
  were inspected but excluded from corrections. Both are physical toys with altered controls and
  construction.
- [Pokédex BWGP](https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_BWGP.png) shows two software
  screens in manga, but almost no reliable casing geometry.
- Ruby and Sapphire Adventures crops were too small or hand-obscured to add more than the clearer
  Emerald panel.

No remote media were saved into the repository. Visuals were inspected from their direct URLs.
This file is research only; it changes no ticket, catalogue, asset, prototype, or handoff.
