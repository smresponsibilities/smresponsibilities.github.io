> Current production behavior, preserved generators and replication instructions: [docs/card-art.md](../../docs/card-art.md). The notes below record earlier lab decisions; the guide supersedes stale proposed/not-integrated statements.

# Floral experiment

The accepted reverse combines a monogram repeat pattern, fine-line keyline borders and a simulated debossed seal. The earlier blue curves were guilloche. These are separate techniques.

This front experiment uses botanical engraving: fine hatching, stippling, dense petal detail and antique gold against charcoal. One chrysanthemum tests the direction before assigning different flowers to other projects. The flower is decorative; project content remains readable HTML.

The user clarified that the flower must be built through code, not image generation. The raster approach was abandoned. `build-chrysanthemum.mjs` generates an original SVG with cubic Bezier petals, engraved vein lines, curved leaves and golden-angle stamens. No third-party flower code or runtime dependencies are used.

Sources:
- https://portfolio.bryce.town/generative-flower-series/ describes Bezier petals and stippled outlines.
- https://presque.cool/projects/a-flower-a-day/ describes curved Bezier stems and varied leaves.

The generator checks petal count and finite coordinates. The lab offers graphite and antique-gold treatments of the same flower, plus the previous product mockup.

## Collection expansion

`build-flower-collection.mjs` generates ten additional SVG studies alongside the original chrysanthemum. Rose uses nested cupped petals; peony uses ruffled layers; lotus and dahlia use pointed petals with distinct density; poppy uses broad ruffled petals; iris uses two whorls of three falls; lily uses recurved petals and long stamens; camellia uses rounded overlapping petals; cosmos uses eight notched petals; sunflower uses a large seeded disk and narrow rays. All are stylized studies.

The lab defaults to diagonal corner ornaments. Gallery selection updates all corners. Size and engraving strength use CSS properties. Holographic finish can be disabled independently without altering activation motion. No automatic per-project flower assignment exists yet.

Verification: generator assertions, `verify-card-frame.cjs`, `verify-card-click.cjs`, `verify-card-flower.cjs`, and `verify-flower-collection.cjs`. Desktop collection and rose-card screenshots inspected, all eleven SVGs decoded, mobile overflow checked at 390px.

Possible next details, not built: small paired buds attached to the existing corners; secondary leaf sprigs; sparse foil pinpoints on stamens. Choose after selecting flowers, rather than adding every decoration.

## Second expansion

The shared generator now emits 20 studies; with chrysanthemum the gallery has 21. New studies: anemone, magnolia, gerbera, zinnia, cornflower, carnation, hibiscus, clematis, passionflower and plumeria. Fringed tips, twisted petals, extended stamens and radial corona filaments add distinct silhouettes. Generator assertions and the updated 21-flower browser verification pass.
