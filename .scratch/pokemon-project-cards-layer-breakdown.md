# Card layer decomposition — source map and implementation status

Updated: 2026-10-21

## Goal

Compare Simey’s actual Pokémon card rendering stack with an original landscape project-card adaptation. Lab: `.scratch/pokemon-card-lab.html`.

## Upstream resources

- [CodePen: original card effects (V1)](https://codepen.io/simeydotme/pen/PrQKgo)
- [CodePen: V2 card app](https://codepen.io/simeydotme/pen/abYWJdX)
- [Live demo](https://poke-holo.simey.me/)
- [GitHub source](https://github.com/simeydotme/pokemon-cards-css)
- [Card DOM and interaction](https://github.com/simeydotme/pokemon-cards-css/blob/main/src/lib/components/Card.svelte)
- [Rarity/data selection](https://github.com/simeydotme/pokemon-cards-css/blob/main/src/lib/components/CardProxy.svelte)
- [Card data](https://github.com/simeydotme/pokemon-cards-css/blob/main/public/data/cards.json)
- [Rarity CSS](https://github.com/simeydotme/pokemon-cards-css/tree/main/public/css/cards)
- [Shared CSS](https://github.com/simeydotme/pokemon-cards-css/blob/main/public/css/cards.css)
- [Textures](https://github.com/simeydotme/pokemon-cards-css/tree/main/public/img)
- [GPL-3.0 license](https://github.com/simeydotme/pokemon-cards-css/blob/main/LICENSE)

Local upstream mirror and exact license: `.scratch/pokemon-cards-css-main/`. Keep reference code there; do not move GPL source into portfolio production without addressing compatibility.

## Architectural Evolution

### 1. CodePen V1 (`PrQKgo`)
- Single `.card` element.
- 2 pseudo-elements: `::before` (radial gradient glare) and `::after` (repeating diagonal rainbow gradient for holographic beams).
- Blending via `color-dodge` on `:after`.
- Fixed portrait aspect ratio, artwork baked into the background image.

### 2. CodePen V2 (`abYWJdX`) & GitHub Repository
- Multi-element DOM hierarchy: `.card` wrapper, `.card__translater`, `.card__rotator`, `.card__back`, and `.card__front`.
- `.card__front` contains `img` (printed face), `.card__shine`, and `.card__glare`.
- 23 rarity recipes with layered gradient and texture passes (`.card__shine`, `::before`, `::after`).
- Dynamic `--foil` and `--mask` image textures hosted on CDN (`poke-holo.b-cdn.net`).
- Svelte spring physics for inertia on tilt, glare, and background offsets.

### 3. Our Landscape Adaptation (`pokemon-card-lab.html`)
- Grid layout: 43% visual illustration panel (`.art`), 57% semantic copy (`.copy`).
- Holographic shader stack (`.projectShine`, `.projectGlare`) confined exclusively to the art panel.
- Portrait clip paths (`--clip`, `--clip-stage`, `--clip-trainer`) stripped from landscape CSS.
- Dual-coordinate pointer tracking: card-level 3D rotation across the entire card container, localized specular glare and foil reflection within the art panel.
- Semantic typography, tags, and links remain accessible and unaffected by CSS mix-blend-modes and filters.
- Full layer explosion support separating base, illustration elements (`.orb`, `.ring`, `.phone`), foil passes, and glare in 3D perspective.

## Implementation Status: Completed & Verified

- Lab file: `.scratch/pokemon-card-lab.html` (387 KB self-contained lab).
- Embedded bundle: 23 recipes, 24 source CSS files, 91 card records.
- All pointer interaction defects resolved (`pointer-events: auto`, dual-coordinate tracking).
- Layer toggles, explode synchronization, sparkle recipe, cosmos seed generation, and architecture tab verified via headless Chromium test suite.
