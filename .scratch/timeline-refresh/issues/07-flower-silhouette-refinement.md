# Flower silhouette refinement

Status: resolved

Improve weak flowers without changing card behavior or adding leaves/stems.

## Handoff

**Built:** Clipped engraving inside all 20 collection blooms; proportional rose/magnolia cups, curved carnation/cornflower fringes, fuller alternating lily/iris petals and smoother plumeria lobes. Existing chrysanthemum preserved. Lab artwork synchronized to generated site assets.
**Deviated:** Nothing. Existing code-built SVG pipeline retained.
**Watch out:** Canonical generator: `scripts/card-art/build-flower-collection.mjs`. All 21 SVGs parse; rerunning generator produces identical bytes. Gallery reviewed at ornament scale. No card interaction code changed.
