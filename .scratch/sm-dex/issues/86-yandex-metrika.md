# Ticket 86 — Yandex Metrika

Type: task
Status: resolved
Blocked by: none

## Goal

Install Yandex Metrika counter 112521507 on every site page using the supplied code-snippet method.

## Acceptance criteria

- The shared layout loads the official Metrika tag asynchronously near the top of the document.
- The counter initializes once with the supplied Webvisor, click-map, bounce, link, SSR, and
  ecommerce options.
- A no-JavaScript tracking pixel appears at the top of the body without affecting layout.
- The rendered production HTML contains the counter ID, script URL, and fallback URL.
- Production build and focused SEO validation pass.

## Handoff

**Built:** Installed counter 112521507 in the shared layout and added rendered-output coverage.
**Deviated:** Moved the `noscript` fallback into the body because a `div` is invalid inside the
document head. Replaced its inline style with a shared CSS rule.
**Watch out:** Webvisor is enabled as supplied and records session behavior. Keep the site's privacy
notice and consent handling aligned with the jurisdictions and users the site serves.
