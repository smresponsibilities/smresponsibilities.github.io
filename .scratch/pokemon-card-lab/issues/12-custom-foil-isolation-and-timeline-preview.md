# Custom foil isolation and timeline preview

Status: resolved

Keep Pokemon-specific masks and etched foils off custom cards. Add a separate front-only timeline card with centered chapter text and full-surface recipe comparison to the existing lab. No site changes requested until user chooses.

## Handoff

**Built:** Per-Pokemon etched foil and mask URLs are assigned only to the original reference. Both custom previews use a generic geometric foil and no masks. Added a separate front-only timeline preview with centered chapter text, diagonal blooms and whole-card source recipe passes. Its recipe select is synchronized with the inspector; gallery flower selection and auto-showcase also apply.
**Deviated:** Custom cards intentionally substitute generic foil for character-specific etched assets. Recipe gradients and shared abstract textures are retained. The original reference remains faithful to its inputs.
**Watch out:** `.scratch/tmp/verify-lab-timeline.cjs` checks all 23 recipes for custom foil isolation and absence of masks on base/before/after passes, retained reference assets, centered front-only layout, mobile overflow and runtime errors. Existing lab frame verification also passes. Desktop/mobile screenshots inspected. No site source was changed this session; recipe choice is pending user review.
