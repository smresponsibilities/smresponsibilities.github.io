# Upstream click activation

Status: resolved

Use upstream source CSS, restore the project card click turn, centering and zoom, and verify the reverse during rotation.

## Handoff

**Built:** Project click now spins 360 degrees while centering and scaling. Rotation uses upstream stiffness 0.033 and damping 0.45. Foil styles derive directly from sourceCss instead of the lab projectCss recipes.
**Deviated:** Standalone JavaScript integration replaces Svelte spring runtime. Spin repeats on each click activation, per user request. Landscape masks/clips still require adaptation.
**Watch out:** Verified via `.scratch/tmp/verify-card-click.cjs` and `.scratch/tmp/verify-card-frame.cjs`. No production integration.
