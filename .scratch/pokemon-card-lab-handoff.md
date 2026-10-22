> Current source of truth: [docs/card-art.md](../docs/card-art.md). Production card rollout is implemented. The history below describes successive lab experiments, including superseded states. Runnable flower generators and the accepted back artwork are now preserved outside scratch.

# PokÃƒÂ©mon card lab handoff

Updated: 2026-10-22

## Current state

Standalone prototype: `.scratch/pokemon-card-lab.html`. This lab has not been integrated into production components.

The project card now has a gold trading-card frame, printed cream face, framed art window, ability and attack rows, collector footer, and weakness/resistance strip. It uses the actual site favicon, `public/favicon-sm-complete.svg`, in the header, footer, and large reverse emblem. The explicit Show card back control flips between real front/back faces. Hidden front content becomes inert. Landscape, portrait, and compact formats reuse the same content and structure. On narrow screens, landscape and compact stack vertically.

The project card appears before the upstream inspector. All 23 source recipes and the original reference remain available. Source was inspected in `.scratch/pokemon-cards-css-main/src/lib/components/Card.svelte`. This adaptation does not claim exact upstream spring-physics parity.

## Verification

`.scratch/tmp/verify-card-frame.cjs` passed: loaded favicon reverse, flip state and inert front, all three formats, all recipe switches, 390px overflow, reduced-motion showcase suppression, no page errors. Desktop, mobile, and reverse screenshots were inspected in `.scratch/tmp/card-frame-*.png`. Mechanical detector flagged existing reference effects and tiny text; its low-contrast art-credit finding was corrected. No physical touch-device verification or production build was performed.

## Next

Review this card direction in the lab before migrating the frame and reverse into production project, blog, and roster components. The portrait format is content-driven and taller than a physical TCG card. Sample art remains the existing CSS phone mockup; foil assets and reference artwork still rely on remote sources.

## Click correction, 2026-10-22

Ticket 02 restores the previously missing project activation turn. Click uses upstream spring parameters to turn 360 degrees while translating and scaling to viewport center. Every activation turns; reduced motion skips animation. Project foil CSS now maps the original sourceCss selectors directly instead of using stored projectCss adaptations. `.scratch/tmp/verify-card-click.cjs` verifies turn, viewport center, Escape dismissal, and reduced-motion activation. Existing frame verification also passes. This is a standalone JavaScript port, not the Svelte runtime.

## Printed-face revision, 2026-10-22

Ticket 03 studies the front at https://poke-holo.simey.me/ and the original reverse at https://tcg.pokemon.com/assets/img/global/tcg-card-back-2x.jpg. The front now places its title in the top band, frames the illustration with nested rules, and separates flavour text from ability/attack rows. The reverse uses original vector engraving in `.scratch/pokemon-card-lab-assets/sm-card-engraving.svg`, corner ornaments, mirrored SM'S DEX lettering, and the existing favicon. Motion and foil logic were preserved. Both `.scratch/tmp/verify-card-frame.cjs` and `.scratch/tmp/verify-card-click.cjs` passed after the changes. Screenshots remain at `.scratch/tmp/card-frame-*.png`.

## Printed-face revision, 2026-10-22

Ticket 03 compares the original front and reverse visually. The front now puts its title in the header, frames the illustration with nested rules, and separates flavour text from ability and attack rows. The reverse uses original vector engraving from `.scratch/pokemon-card-lab-assets/sm-card-engraving.svg`, corner ornaments, mirrored lettering and the actual favicon. Motion and foil logic are unchanged. Both browser verification scripts pass.

## Independent identity, 2026-10-22

Ticket 04 supersedes the Pokemon print direction. User rejected replication and requested online research. Current custom faces use graphite/ivory/copper, typography and an original favicon-derived reverse pattern. See `.scratch/pokemon-card-lab-assets/design-notes.md` for primary sources and techniques. Approved effects remain unchanged. Both browser verification scripts pass.

## Front refinement, 2026-10-22

Ticket 05 preserves the accepted back composition and all effect logic. Front uses a stronger editorial headline and quieter supporting rows, with phone artwork recolored to copper. Local `sm-mark.svg` corrects the ambiguous M; production favicon is untouched. Source reference: https://www.pentagram.com/typography . Both browser verification scripts pass.

## Code-built flower experiment, 2026-10-22

Ticket 06 adds a procedural SVG chrysanthemum. User explicitly rejected image generation; artwork is built from code. The Front artwork selector offers graphite, antique-gold and previous product treatments. Source and references are in `.scratch/pokemon-card-lab-assets/floral-experiment.md`. Generator assertions and frame, click, flower browser checks pass. Reverse and effects are preserved.

## Floral placement correction, 2026-10-22

Ticket 07 supersedes the central flower experiment. User wanted border/diagonal ornament. Phone remains the main artwork; flowers decorate opposing corners or all four border corners. Plain comparison remains available. Back unchanged. All focused checks pass.

## Ten additional flower studies, 2026-10-22

Ticket 08 adds ten code-built species and an eleven-flower gallery. Diagonal default preserved. Flower selection, scale, engraving strength and independent holo toggling work. All four browser scripts and generator assertions pass. See `.scratch/pokemon-card-lab-assets/floral-experiment.md` for shapes, generation and deferred ideas.

## Second flower expansion, 2026-10-22

Ticket 09 adds ten more SVG flowers. Gallery/picker contain 21 total. Generator assertions and `.scratch/tmp/verify-flower-collection.cjs` pass; gallery screenshot inspected. No layout, reverse or effect changes.

## Bloom-only revision, 2026-10-22

Ticket 10 removes leaves and stems from all flower assets and their generators. SVG viewboxes now frame blooms. Generator assertions and 21-flower verification pass.

## Opening pace and tier plan, 2026-10-22

Ticket 11 slows opening to 1600ms with eased rotation and earlier zoom. This supersedes the spring timing from ticket 02. Updated click regression passed. Proposed static engraving, interactive engraving, floral-holo and plain utility placements are in `.scratch/pokemon-card-lab-assets/card-tiers.md`; production tiers are not implemented.

## Foil isolation and timeline comparison, 2026-10-22

Ticket 12 prevents per-Pokemon etched foil/mask inputs from reaching custom cards. Reference retains those assets; custom previews use generic geometric foil and no masks. New `#timelineSample` is a front-only, centered-text, full-surface timeline comparison; source recipe selectors and flower controls are shared. All 23 recipes passed isolation checks. See `.scratch/pokemon-card-lab/issues/12-custom-foil-isolation-and-timeline-preview.md`. No further site changes were made pending user selection.

## Visible idle finish, 2026-10-22

Ticket 13 makes project and timeline previews visibly finished at rest, with gentle shader drift and no idle tilt. Pointer leave retains a baseline finish. Reduced motion is static. Idle and 23-recipe isolation checks pass.

## Radiant correction, 2026-10-22

Ticket 15 compares all 24 embedded CSS files to cloned upstream and fixes the custom Radiant unmasked-demo branch. Trainer tiling/difference fallback is removed only from custom mapped CSS; generic glitter uses the normal hard-light/cover path. Original diagonal lattice remains intentional. Radiant is selected at boot for review. Focused correction, all-recipe isolation and idle checks pass.

## Readability guard, 2026-10-22

Ticket 16 limits custom foil/glare intensity, protects text and phone stacking, and adds a shared strength control. Randomization remains a proposal, not implemented. Readability and recipe-isolation checks pass.
