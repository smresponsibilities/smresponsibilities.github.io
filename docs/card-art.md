# Replicating the floral card system

This guide records the shipped card system and the accepted card back from the lab. Use the committed sources below; the scratch lab is an experiment history, not the production implementation.

## Source map

| Part | Source of truth |
| --- | --- |
| Original chrysanthemum geometry | [`build-chrysanthemum.mjs`](../scripts/card-art/build-chrysanthemum.mjs) |
| Other 20 flowers and their parameters | [`build-flower-collection.mjs`](../scripts/card-art/build-flower-collection.mjs) |
| Generated, browser-ready SVG flowers | [`public/floral/`](../public/floral/) |
| Accepted back repeat pattern | [`sm-identity-pattern.svg`](assets/card-art/sm-identity-pattern.svg) |
| Lab's corrected pixel monogram | [`sm-mark.svg`](assets/card-art/sm-mark.svg) |
| Original site favicon | [`favicon-sm-complete.svg`](../public/favicon-sm-complete.svg) |
| Reference-matched project front, art/paper panels and mobile layout | [`ProjectCard.astro`](../src/components/ProjectCard.astro) |
| Card discovery, treatment, flower identity, pointer input, inspection | [`CardFinishes.astro`](../src/components/CardFinishes.astro) |
| Adapted upstream foil recipes | [`card-recipes.css`](../src/styles/card-recipes.css) |
| Theme, frame, flowers, readability and motion limits | [`card-finishes.css`](../src/styles/card-finishes.css) |
| Chapter markup and carousel navigation | [`PokemonCarouselTimeline.astro`](../src/components/PokemonCarouselTimeline.astro) |
| Shared installation | [`Base.astro`](../src/layouts/Base.astro) |

## Regenerate the flowers

From the repository root, with Node installed:

```sh
node scripts/card-art/build-chrysanthemum.mjs
node scripts/card-art/build-flower-collection.mjs
git diff -- public/floral/
```

These scripts use only Node's standard library. They overwrite the 21 named flower SVGs in `public/floral/`. They do not generate `sm-card.svg`, the earlier blue back study. Unmodified generators reproduce the committed flower files byte for byte. No runtime generation, raster images, image model or external flower library is involved.

Every flower uses `viewBox="0 18 500 440"`. Petals are closed cubic Bézier paths, placed in concentric rotated groups. Fine interior curves simulate engraved hatching; each petal clips its interior lines to its own Bézier outline so veins and fold lines cannot spill into neighboring petals. This local SVG clip is unrelated to a card foil mask. Short strokes in the center suggest stamens. There are no leaves or stems. The hibiscus's projecting stamen is part of the bloom.

The chrysanthemum has seven rings, `18 + ring * 2` petals per ring: 168 petals, seven interior lines each, and 145 central marks. Radius starts at 177 and decreases by 21 per ring. Small deterministic sine/cosine changes vary angle, length, width and curl. Its center uses the golden angle, approximately `2.399963` radians, with radius `sqrt(i / count) * 27`.

The collection generator defines each species using `rings`, `count`, `step`, `length`, `shrink`, `width`, `kind` and `heart`. For ring `r`, petal count is `count + r * step`; length shrinks by `r * shrink`. Each petal has nine engraved interior curves. Stable phase offsets keep it from looking like a perfectly repeated icon. These are stylized botanical studies, not scientific illustrations.

| Flower | Construction |
| --- | --- |
| Rose | Six whorls of cupped petals, extra fold line, small heart |
| Peony | Five layers of broad ruffled petals |
| Lotus | Three sparse layers of pointed petals |
| Dahlia | Seven dense pointed layers |
| Poppy | Two layers of four broad ruffled petals |
| Iris | Three broad falls alternating with three narrower upright petals |
| Lily | Two alternating whorls of three broad tapered petals and six long stamens |
| Camellia | Five rounded overlapping layers |
| Cosmos | Eight notched petals |
| Sunflower | Two rings of narrow rays and a 280-mark central disk |
| Anemone | Seven rounded petals around a large heart |
| Magnolia | Two layers of broad cupped petals |
| Gerbera | Three dense layers of narrow rounded petals |
| Zinnia | Six rounded layers |
| Cornflower | Three layers with fringed tips |
| Carnation | Five layers with curved scalloped fringes, avoiding saw-tooth edges |
| Hibiscus | Five ruffled petals and an extended stamen |
| Clematis | Six pointed petals and 28 radial stamens |
| Passionflower | Two five-petal whorls and 72 corona filaments |
| Plumeria | Five asymmetric twisted petals |

To add a species, add its parameter object to the collection generator, update its expected unique-species count, run it, then append the ID to the `flowers` list in `CardFinishes.astro`. Update the chapter component's independent flower list if it should appear on chapters. Keep the silhouette distinct at 105–135px, not only when viewed at full SVG size. Appending to either list changes modulo-based assignments; fixed assignments require an explicit content-to-flower mapping.

## Flower identity and diagonal placement

Ordinary content cards choose their flower deterministically. The identity is the first internal project link's pathname, otherwise the first heading/link pathname, otherwise heading/text content. A 32-bit hash accumulates `hash = (Math.imul(hash, 31) + charCode) >>> 0`; the flower index is `hash % flowers.length`. This stays stable across reloads for unchanged identity and list order. Anchor cards without descendant links fall back to their text. Chapter cards already contain their own flower artwork; the enhancer reuses it.

For ordinary cards, the upper bloom is 125px wide, positioned `top:-36px; right:-30px`, rotated `-30deg`. The lower bloom uses `bottom:-36px; left:-30px`, rotated `150deg`. At mobile widths blooms shrink to 105px. Gray conversion, brightness 1.5, opacity .35 and luminosity blending make the antique-gold source read as silver engraving. Chapter blooms have separate sizing in the chapter stylesheet.

Use `position:absolute`, a clipped ornament wrapper, `pointer-events:none`, empty image alt text and an `aria-hidden` wrapper. Flowers decorate borders; they must not replace content or sit as a large central illustration.

## Reconstruct the accepted card back

The accepted back is a **monogram repeat pattern with fine keyline borders and a simulated debossed seal**. The earlier blue looping-line back was **guilloché**, a different design. Do not replace the accepted monogram with that older study.

The accepted back now appears during production inspection. Opening performs a 1600ms full turn through the monogram reverse and returns to the readable front. The public background copy is `public/card-finishes/sm-identity-pattern.svg`; keep it identical to the preserved SVG in this guide.

The committed `sm-identity-pattern.svg` is already the complete code-built background. Its construction is:

1. A 1000×600 graphite field, `#29252a`.
2. A 76×76 SVG pattern tile rotated 45 degrees, containing the S/M path outlines derived from the favicon. Copper stroke `#c09c7e`, width `.5`, opacity `.23`, no fill.
3. A radial graphite veil, almost opaque at the center and transparent toward the edge, that clears visual space behind the seal.
4. Two inset copper rules on the card, then a centered rounded-square seal with inset highlight/shadow, the actual monogram, and restrained type above/below.

Copy the two back SVG assets beside the following HTML in a standalone example, then apply the CSS below. The lab mark preserves the favicon identity with a corrected M; it does not overwrite the site's original favicon.

```html
<div class="card-back" aria-label="SM's Dex card back">
  <div class="back-label">SM'S DEX</div>
  <div class="back-seal"><img src="sm-mark.svg" alt="SM" width="112" height="112"></div>
  <div class="back-title">Built with intention.</div>
</div>
```

```css
.card-back {
  position: relative; isolation: isolate; overflow: hidden;
  box-sizing: border-box; width: min(100%, 740px); min-height: 460px;
  display: flex; flex-direction: column; align-items: center;
  justify-content: space-between; gap: 20px; padding: 32px;
  border: 1px solid #636168; border-radius: 14px;
  background: #29252a url("sm-identity-pattern.svg") center / cover;
  color: #e3c4a7; box-shadow: 0 22px 45px #0007;
}
.card-back::before, .card-back::after {
  content: ""; position: absolute; inset: 12px; z-index: -1;
  border: 1px solid #d2b49360; border-radius: 5px; pointer-events: none;
}
.card-back::after { inset: 17px; border-color: #d2b49320; border-radius: 2px; }
.back-label { font: 500 11px Arial, sans-serif; letter-spacing: .18em; }
.back-seal {
  position: relative; display: grid; place-items: center; flex-shrink: 0;
  width: 186px; height: 186px; border: 1px solid #d6b29980;
  border-radius: 16px; background: #242329;
  box-shadow: inset 1px 1px 1px #e7d2b348,
    inset -2px -2px 4px #0009, 0 14px 28px #0c0c0f80;
}
.back-seal::before, .back-seal::after {
  content: ""; position: absolute; inset: -9px;
  border: 1px solid #d6b29930; border-radius: 20px; pointer-events: none;
}
.back-seal::after { inset: 10px; border-color: #d6b29935; border-radius: 9px; }
.back-seal img { filter: saturate(.55) contrast(.95); }
.back-title { font: 39px/1 Georgia, serif; letter-spacing: -.035em; text-align: center; }
```

This recreates the material construction; wording and font fallbacks are illustrative. Fine-line engraving is SVG geometry. Debossing and foil are CSS simulations, not a physical print preview. In another brand, replace both monogram paths and center mark together, preserving the quiet center and stroke density.

## The four shipped treatments

| Treatment | Actual behavior | Current assignment |
| --- | --- | --- |
| Engraved | Flowers and frame; no foil, glare or tilt | Every enhanced card on `/resume/`, non-showcase archive cards, `.experience-card` and `.daily-log-card` |
| Interactive engraved | Flowers, subtle pointer tilt and neutral white glare; no rainbow | Search results, featured/pinned posts, related content and supporting editorial cards |
| Floral holo | Flowers, random approved foil, glare, tilt and front-only click inspection | Printed project cards on homepage and `/projects/`, `.project-feature-card` and non-static `.chapter-card`; first project and first chapter are always showcase holo |
| Plain utility | Existing ordinary UI, no shared flower/foil enhancement | Navigation, filters, forms, ordinary timeline rows and elements outside the selector |

Enhancement currently targets `.chapter-card`, `.project-card`, `.experience-card`, `.editorial .card`, `.search-card`, `.pinned-index-card`, `.daily-log-card`, `.related-card`, `.pinned-card` and `.project-feature-card`. Treatment comes from route/class and showcase position, not from visible copy. First project card in the document and first chapter in each chapter track receive `data-showcase="true"`, including the first chapter on an archive page. They use the rainbow recipe deterministically, with stronger resting foil; remaining holo cards randomize as before. A generic `.editorial .card` on a case-study page stays interactive engraved; use the existing main-project class only for a card that should receive holo treatment. There is no new public configuration API.

## Reference project fronts and mobile previews

`ProjectCard.astro` renders the accepted lab structure on both homepage projects and all 15 project-directory entries: graphite double frame, favicon/title/collector header, art panel, cream copy panel, diagonal blooms and signature footer. Existing descriptions and destination links remain authored by their pages through summary/default slots. Productivity Caller uses a CSS phone illustration, the supplied Reminders headline and two factual feature rows; other projects use a code-window illustration carrying their name and stack. No raster or Pokémon creature artwork is introduced.

Mobile keeps art and copy side by side. Listing previews clamp the summary, omit feature rows and retain the first two directory links so the card stays compact. Inspection restores full summary, feature rows and all links while retaining the horizontal panel layout. Readability wins over forcing a fixed aspect ratio on long content. All supplementary links remain available in inspection and desktop views.

The project's opaque art/paper surfaces paint below its foil, while HTML text and controls paint above. Do not put the entire `printed-body` in a stacking context above the foil; that would make its effect invisible. First project and first chapter use visibly stronger rainbow; other cards keep the bounded ordinary intensity.

## Reuse the effects

To reproduce elsewhere, copy `ProjectCard.astro`, `CardFinishes.astro`, both card stylesheets, `public/floral/` and `public/card-finishes/`. Install the component once in the shared layout, as `Base.astro` does. Preserve CSS variables for the site's theme: `--time-panel`, `--time-deep`, `--time-accent`, `--ink`, `--border`, plus `--panel`, `--bg`, `--accent` fallbacks. Change the discovery selector/treatment rule to match that site's content classes. In a non-Astro project, port the script's initialization/cleanup and the native dialog markup; retain its DOM ownership and accessibility behavior.

The source recipes come from [simeydotme/pokemon-cards-css](https://github.com/simeydotme/pokemon-cards-css), revision `acb1197`. Attribution is in `card-recipes.css`; the upstream GPL license is preserved at `public/card-finishes/LICENSE`. Keep that attribution/license when reusing the adapted code and assets.

| Production key | Upstream file | Rarity / subtype attributes |
| --- | --- | --- |
| `beam` | `regular-holo.css` | `rare holo` / `basic` |
| `cosmos` | `cosmos-holo.css` | `rare holo cosmos` / `basic` |
| `secret` | `secret-rare.css` | `rare secret` / `basic` |
| `vregular` | `v-regular.css` | `rare holo v` / `basic v` |
| `vstar` | `v-star.css` | `rare holo vstar` / `vstar` |
| `rainbow` | `rainbow-holo.css` | `rare rainbow` / `vmax` |

One random recipe is chosen independently for each ordinary holo card when enhanced. Showcase cards always use `rainbow`. It remains unchanged during hover, filtering and reordering. A reload can choose another. Basic/Common and Radiant are excluded. Static and interactive engraved cards do not receive rarity/recipe attributes.

The adaptation renames `.card`, `.card__shine`, `.card__glare` to the scoped site selectors and `.site-card-foil` / `.site-card-glare`. Each recipe is gated by `data-finish`; keep its source declaration order, layered background order, blend modes and pseudo-elements. Remove portrait-window clipping and creature-specific mask inputs. Local textures are abstract grain, glitter, cosmos and geometric foil; do not import creature etchings or Pokémon artwork as a custom card mask.

The lab retains more recipes for comparison. Its Radiant correction removes the unmasked `trainerbg.png`/`difference` fallback and substitutes generic glitter while keeping the normal blend path. Simply clearing `mask-image` does not remove that trainer art; the fallback branch must be removed too. This correction is historical lab guidance, not a reason to add Radiant to the production pool.

## Readability, motion and inspection

The production surface is a theme-derived gradient and double inset frame. Flowers sit at layer 0, foil at 1, glare at 2, content at 3 and links at 4. Decorative layers ignore pointer input. Never lower text beneath a bright foil texture to make the effect stronger.

| Control | Production value |
| --- | --- |
| Resting ordinary holo foil opacity | `.19` |
| First project / chapter showcase foil | `.52` resting, `.68` hover/focus |
| Holo hover/focus foil opacity | `.35` |
| Resting glare | `.048` |
| Holo hover/focus glare | `.0875` |
| Interactive engraved hover/focus white glare | `.15` |
| Maximum pointer tilt | X ±1.5°, Y ±2° |
| Idle holo motion | 18-second background-position cycle, ±6 percentage points |
| Idle update budget | At most about 14 updates/second; visible holo cards only |

Idle movement changes the foil position, never the card's physical tilt. Pointer input clamps coordinates to the card and adjusts glare/background position. Reduced motion stops idle drift and tilt; touch/hoverless layouts have no tilt. Hidden tabs and offscreen cards stop idle updates. Static cards have no animated finish. Print removes foil/glare/ordinary flower wrappers and uses a plain white surface; chapter flowers are managed by the chapter component's own styles.

Inspection uses a native `<dialog>` with an enlarged front. The explicit Inspect button supports keyboard activation; clicking non-control card space also opens it. Existing links navigate normally. The clone keeps its selected flower/recipe, removes duplicate IDs and its Inspect button, and allows pointer movement. A preserve-3D wrapper rotates from 0 to 180 to 360 degrees over 1600ms, revealing an inert, aria-hidden monogram back halfway through. The front and back use `backface-visibility:hidden`. Reduced motion disables the turn. The cloned Wordle action becomes a working simulator link instead of a button whose listener belongs to the original card. Escape, Close or backdrop dismisses it; native dialog behavior restores focus. Links remain accessible without opening inspection. The turn is a user-triggered presentation effect, never an autoplay entrance.

The lab's separate opening experiment uses a 1600ms eased full turn with earlier zoom, and skips animation for reduced motion. Production now uses a separate full-turn keyframe on its dialog wrapper, with the accepted reverse, rather than porting the lab spring/viewport positioning system. A future lab-style two-face card must keep the hidden face inert and hidden from assistive technology.

## Verification and recovery

For artwork-only edits, regenerate and inspect the SVG diff. Both generators assert valid finite geometry; chrysanthemum also asserts its petal count and the collection asserts 20 unique IDs and one engraving clip per petal. Cup-petal width scales with petal length to avoid tangled inner rose/magnolia folds; plumeria uses asymmetric curved lobes rather than a generic tip. At minimum inspect a sparse bloom, a dense bloom and both diagonal corners at 390px.

For behavior/style changes, build first, then run tests against the completed output. Do not run build-output audits while a build is replacing `dist`.

```sh
node node_modules/astro/bin/astro.mjs build
node --test tests/ahrefs-audit.test.mjs
```

Start a static preview in another terminal, then run the browser contract check. Chrome must be installed.

```sh
node node_modules/astro/bin/astro.mjs preview --port 8767
node scripts/check-card-treatments.cjs
```

`PREVIEW_URL` overrides the default `http://127.0.0.1:8767`. The check covers treatment assignment, absence of foil on engraved cards, neutral glare, stable inspection recipe, keyboard dismissal/focus return, mobile dialog overflow and reduced motion. Also visually review `/`, `/projects/`, `/blog/`, `/blog/timeline/`, `/blog/archive/801-900/` and `/resume/`. Verify search, sorting and day jump after archive changes.

Common regressions:

- Faint/flat holo: check the selected recipe attributes, texture requests, CSS order and pseudo-elements before raising opacity.
- Washed-out text: restore layer order and the opacity limits above.
- Creature silhouettes: remove per-card mask/foil inputs and any recipe-specific unmasked fallback.
- Flowers change on hover: keep flower identity separate from random finish and initialize each node only once.
- Archive gets rainbow beyond its first chapter: only the first chapter is a deliberate showcase exception; daily cards and remaining archive summaries stay static.
- Duplicate inspection/listeners: preserve the initializer's ready guard and cleanup on `astro:before-swap`.
- Missing decoration without JavaScript: enhancement is client-side; content and navigation remain server-rendered. Do not promise server-rendered ornament without changing that architecture.

## Design references

- [Bryce, Generative Flower Series](https://portfolio.bryce.town/generative-flower-series/): Bézier petals and stippled drawing.
- [Presque, A Flower a Day](https://presque.cool/projects/a-flower-a-day/): procedural botanical construction. Leaves/stems from that research were intentionally removed here.
- [Pentagram, Just Type](https://www.pentagram.com/work/just-type-playing-cards-2/story): typographic identity and geometric restraint.
- [Ye Olde Studio, High Victorian](https://yeoldestudio.co.uk/HighVictorian.html): detailed linework and coherent ornament.
- [Theory11, National](https://store.theory11.com/collections/playingcards/products/national-playing-cards): reference for distinct foil and embossed material treatments.

## Current project-card interaction

The front is always the resting face. Clicking or tapping a non-interactive part of a project card performs one full turn, pauses briefly on the logo back, then returns to the front. Enter or Space does the same when the card itself has focus. Links retain their normal actions. A card-and-turn-arrow cursor identifies the interaction on desktop. No Inspect, Expand or Close controls are added. Reduced motion keeps the front still.

On phones the artwork sits above the description inside the same trading-card frame. Existing foil recipes remain in use. The experimental ASCII flower stays local under `.scratch/timeline-refresh/flower-lab.html`; production flowers are unchanged.

### Homepage focus and idle motion

On `/`, activating a project card brings the original card into a native modal preview, dims the page and plays the existing full turn. Clicking the preview card again, Close, the backdrop or Escape restores its original position and focus. All descriptions and links remain available. A plain pointer cursor replaces the custom cursor artwork and zoom icon.

Visible homepage holo cards gently tilt at rest, on a 6.5-second cycle, with 6-degree amplitude on coarse pointers and 2 degrees on desktop. Idle motion runs without hover, pauses during active pointer interaction and card preview, and stops when offscreen, hidden or reduced motion is requested. The existing single animation loop owns both foil drift and tilt. Reduced motion still opens the preview without movement.

The project card has separate front and back planes with native 3D backface culling, following the structure in [the original Pokémon Cards CSS component](https://github.com/simeydotme/pokemon-cards-css/blob/main/src/lib/components/Card.svelte). A 1.6-second turn settles at the front while the preview moves to the center. Timed visibility swapping has been removed. Front content and decorative layers share one clipped face; the rotating card itself preserves 3D.
