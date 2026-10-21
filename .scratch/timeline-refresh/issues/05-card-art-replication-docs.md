# Card art replication documentation

Status: resolved

Preserve procedural flower generators and accepted reverse artwork outside scratch. Document geometry, material techniques, source recipes, treatment assignment, motion, readability and repeatable verification.

## Handoff

**Built:** `docs/card-art.md` documents all 21 flower geometries, exact generation commands, accepted reverse pattern/seal reconstruction, six recipe mappings, treatment assignment, readability, motion and verification. Generators moved into `scripts/card-art/`; accepted reverse assets preserved in `docs/assets/card-art/`. Existing content guide links to it; scratch notes point at the current guide.
**Deviated:** No runtime or visual changes. Back remains a documented lab construction; production inspection is front-only.
**Watch out:** Both generators reproduce all 21 committed flower SVGs byte for byte. Local Markdown links pass. Previous build/browser/SEO results remain applicable because production code and asset bytes did not change.
