# Ticket 90 — Microsoft Clarity

Type: task
Status: resolved
Blocked by: none

## Goal

Install Microsoft Clarity project `yhlv223s2p` on every site page while keeping the existing
Yandex Metrika and Cloudflare Web Analytics integrations.

## Acceptance criteria

- The shared layout loads the supplied Microsoft Clarity script in the document head.
- The supplied Clarity project ID is rendered exactly once.
- Existing Yandex Metrika and Cloudflare Web Analytics integrations remain present.
- Production build and focused rendered-output validation pass.

## Answer

The shared layout now loads Microsoft Clarity globally from the document head. The focused
rendered-output validation checks Clarity alongside Yandex Metrika and Cloudflare Web Analytics.

## Evidence

- `npm run build`: passed.
- `npx astro check`: 0 errors; one pre-existing unused-parameter hint in `classic.js`.
- `node .scratch/sm-dex/research/ticket-84-seo-gate.mjs`: all SEO and analytics checks passed, including Microsoft Clarity.

## Handoff

**Built:** Installed Microsoft Clarity project `yhlv223s2p` globally and added rendered-output coverage.
**Deviated:** Nothing.
**Watch out:** Clarity dashboard data may lag until Microsoft receives real page visits.
