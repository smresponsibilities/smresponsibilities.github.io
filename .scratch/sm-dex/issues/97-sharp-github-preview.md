# Ticket 97: Sharpen the GitHub profile preview

Type: task
Status: resolved
Blocked by: none

## Goal

Replace the blurry profile captures with high-density renders while preserving the animation, framing, and reduced-motion fallback.

## Answer

The previous PNG frames had only 960 × 735 pixels. The capture now uses deviceScaleFactor 3,
producing 2880 × 2205 pixels at the same display size. A side-by-side crop confirmed sharper
screen text and casing edges. All nine embedded frames pass the new density check, animation
timing checks, and reduced-motion fallback checks. The SVG is approximately 4 MB. Published to the profile repository in commit `39d9d02`.

## Handoff

**Built:** High-density preview frames and a resolution regression check.
**Deviated:** Nothing. Only the export resolution changed.
**Watch out:** The larger SVG trades download size for clarity. Capture comparison is in `.scratch/sm-dex/github-preview/sharpness-comparison.png`.

