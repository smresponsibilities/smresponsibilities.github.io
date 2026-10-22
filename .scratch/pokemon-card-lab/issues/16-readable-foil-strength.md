# Readable foil strength

Status: resolved

Reduce washout on custom lab cards, preserve text/product readability, and expose a bounded foil intensity control. Randomization is a proposal pending recipe selection, not implemented in the site.

## Handoff

**Built:** Lab custom cards default to a 35% foil multiplier and quarter-strength glare. Text and the phone mockup sit above decorative effects. A 10–65% strength slider controls both previews; reference stays unchanged.
**Deviated:** Effects cover the card surface behind content rather than washing over text/product UI. Random recipe assignment was discussed but not implemented; user is still choosing recipes.
**Watch out:** `.scratch/tmp/verify-readable-foil.cjs` verifies default opacity bounds, protected stacking and slider updates. All-23-recipe isolation regression passes. Screenshot inspected. Proposal: independent once-per-load selection from an approved pool excluding Basic/Common and initially Radiant, with fixed per-project flowers. No site source changes this session.
