# Ticket 73 — Gen I clearance and Resume favicon

Status: resolved

## Request

- Move the Gen I slider farther below the casing.
- Make the SM favicon apply through standard SVG and ICO fallbacks, including Resume PDF tabs.
- Identify content editing locations and safe production push commands.

## Acceptance

- Gen I opening controls have at least 48px casing clearance.
- `/favicon.svg`, `/favicon.ico`, and the page favicon use the SM mark.
- `public/resume.pdf` exists.

## Handoff

**Built:** Gen I slider now sits 52px below the casing. Replaced Astro SVG/ICO favicon fallbacks with the SM mark, added favicon declarations, and verified the supplied resume.
**Deviated:** Nothing.
**Watch out:** Browser favicon caches are aggressive; deployed tabs may need a hard refresh once.
