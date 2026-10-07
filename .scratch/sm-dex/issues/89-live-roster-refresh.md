# Ticket 89 — Live roster refresh

Type: task
Status: resolved
Blocked by: none

## Goal

Refresh the device roster client-side after a deployment and bypass stale roster-asset caches.

## Acceptance criteria

- Each build publishes a standalone roster payload for the device.
- The browser fetches that payload with a unique cache-busting query and `no-store` semantics.
- Roster changes rerender the current device and readable views without a page refresh.
- Refresh runs at startup, on tab focus/visibility, and on a bounded polling interval.
- Unchanged payloads do not rerender.
- Production build and focused browser regression pass.

## Answer

Each build now publishes the device's generated DEX items as a standalone JSON payload. The
browser requests it at startup, every 60 seconds, when the window regains focus, and when the tab
becomes visible. Every request uses `cache: 'no-store'` plus a timestamp query, preventing a stale
browser or GitHub Pages cache entry from hiding a newly deployed roster.

Changed payloads replace the existing DEX array in place and rerender the device and readable
views while retaining the current section and nearest valid item. Identical payloads stop before
mutation or rendering.

## Evidence

- `npm run build`: passed and emitted `dist/generation-device/roster.json`.
- `node .scratch/sm-dex/research/ticket-89-live-roster.mjs`: two unique cache-busted requests;
  mocked deployed entry appeared without navigation or refresh.
- `npx astro check`: 0 errors; one pre-existing unused-parameter hint in `classic.js`.
- `node .scratch/sm-dex/research/ticket-84-seo-gate.mjs`: all SEO and analytics checks passed.

## Handoff

**Built:** Device roster now refreshes in place after deployments using a cache-busted generated JSON payload.
**Deviated:** Nothing.
**Watch out:** GitHub Pages deployment still gates availability; client refresh cannot expose an entry before its merge build finishes.
