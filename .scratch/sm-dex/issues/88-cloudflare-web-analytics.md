# Ticket 88 — Cloudflare Web Analytics

Type: task
Status: resolved
Blocked by: none

## Goal

Install the supplied Cloudflare Web Analytics beacon on every page, then merge and deploy it.

## Acceptance criteria

- The shared layout loads Cloudflare's module beacon once.
- The supplied site token is rendered exactly once.
- The existing Yandex Metrika integration remains unchanged.
- Production build and rendered-output validation pass.
- Changes are committed, pushed, and merged into `main`.

## Answer

The shared layout now loads the supplied Cloudflare Web Analytics module beacon on every page.
Rendered-output validation guards both the beacon URL and site token against omission or
duplication while retaining the existing Yandex Metrika check.

## Evidence

- `npm run build`: passed.
- `npx astro check`: 0 errors; one pre-existing unused-parameter hint in `classic.js`.
- `node .scratch/sm-dex/research/ticket-84-seo-gate.mjs`: all checks passed, including Yandex
  Metrika and Cloudflare Web Analytics.

## Handoff

**Built:** Installed the supplied Cloudflare Web Analytics beacon globally and added rendered-output coverage.
**Deviated:** Nothing.
**Watch out:** Cloudflare may take several minutes and a real page visit before its dashboard reports data.
