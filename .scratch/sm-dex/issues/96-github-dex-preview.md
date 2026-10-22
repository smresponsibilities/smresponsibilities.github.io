# Ticket 96: GitHub profile Dex preview

Type: task
Status: resolved
Blocked by: none

## Goal

Show the portfolio casing, screen content, and generation selector on the GitHub profile as an animated image linking to the live portfolio.

## Acceptance

- Export all nine generations from the existing UI with consistent framing.
- Respect reduced motion with a static first frame.
- Supply the profile embed and direct generation links.
- Verify the images and links, preserving existing profile content.

## Answer

Created the previously absent public profile repository
https://github.com/smresponsibilities/smresponsibilities and published commit `f16e88f`.
The profile now shows a 960 × 735 device preview cycling nine generations every 27 seconds,
with the portfolio link and nine direct generation links. Existing URL selection needed no changes.

Source, assets, and refresh instructions: `docs/github-profile/README.md`.
Export and validation scripts: `scripts/export-github-preview.mjs` and
`scripts/check-github-preview.mjs`.

Validation passed for all nine animation intervals, changing image frames, and a stable
reduced-motion fallback. A live browser at https://github.com/smresponsibilities confirmed
the SVG loads, animates, links to the portfolio, and switches to the stable PNG when reduced
motion is enabled. All nine frames were visually inspected in the contact sheet.

## Handoff

**Built:** Published an animated Dex preview and direct generation links on the GitHub profile.
**Deviated:** Nothing in the application. Capture-only CSS creates consistent framing; the README uses a PNG fallback because SVG media queries alone were unreliable in Chromium image elements.
**Watch out:** The profile lives in a separate repository. Updating local exports does not update the profile until its files are pushed there. No refresh automation was added.
