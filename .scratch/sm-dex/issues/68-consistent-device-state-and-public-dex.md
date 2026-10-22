# Ticket 68: consistent device state and public dex

Status: resolved

## Request

Correct inconsistent blank device screens and the favicon, prevent the Caught employer option from
truncating, and ship the missing public Dex roster with individual entry pages.

## Acceptance

- [x] Every generation starts open on desktop and shows populated, opaque screens.
- [x] Mobile still starts on the latest generation with its readable view.
- [x] Favicon uses a fresh URL and renders a complete SM glyph without stale-cache reuse.
- [x] Caught status and employer input do not truncate at supported widths.
- [x] `/dex` lists approved entries, shows registered total, and handles empty data.
- [x] Every entry has a static `/dex/<username>` URL with previous and next navigation.
- [x] Device DEX content links to the public roster and owner entry.
- [x] Build and focused browser gate pass.

## Handoff

**Built:** Unified desktop generation state as open and opaque, preserved latest-generation readable
mobile behavior, cache-busted a rebuilt SM favicon, widened employer input, and shipped public Dex
grid and static entry routes with navigation from both the header and device.
**Deviated:** The approval automation remains ticket 12. This ticket reads approved entries from
`src/data/roster.json` so the visible Dex no longer waits on that backend workflow.
**Watch out:** Add future approved people to `src/data/roster.json`; the static build creates their
entry URLs.
