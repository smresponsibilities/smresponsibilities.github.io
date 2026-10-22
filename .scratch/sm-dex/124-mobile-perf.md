# Ticket 124

**Title:** Mobile Performance Enhancements
**Status:** resolved

## Description
Lighthouse mobile score optimizations.
- Fix forced reflows in device renderer `app.js` (DOM batching, caching `slideTravel`, ResizeObserver instead of `clientWidth`).
- Flatten script cascade via `modulepreload` links for JS assets.
- Ensure all third-party analytics (Cloudflare) are deferred to `window.load` + 2s timeout.
- Fix `div.opening` CLS using media query `aspect-ratio` on the mobile default (Scarlet/Violet dimensions).

## Acceptance Criteria
- [x] No layout thrashing on init
- [x] Cloudflare analytics deferred
- [x] Mobile frame layout shift zeroed

## Handoff

**Built:** Fixed mobile perf bottlenecks. `modulepreload` added, reflows removed, analytics deferred, CLS patched for `<700px`.
**Deviated:** Nothing.
**Watch out:** `slideTravel` is now cached; if track dimensions change without `resize()`, thumb travel could look wrong (handled via ResizeObserver).
