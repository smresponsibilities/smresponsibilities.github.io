# Ticket 63: prototype controls and sticky time world

Status: resolved

## Request

Restore device button rendering to the ticket 45 prototype exactly. Replace the device-local
background with a fixed full-page pixel landscape that changes with local time. Portfolio content
scrolls over it. Pixel technology logos drift horizontally like clouds.

## Acceptance

- [x] Runtime hardware markup and geometry match ticket 45; no extra mount or offset exists.
- [x] All nine generation devices retain their authored control coordinates.
- [x] A full-viewport background remains fixed while the document scrolls.
- [x] Dawn, day, sunset, and night select different supplied pixel landscapes by local hour.
- [x] Technology sprites cross the viewport from left to right in separate cloud-like lanes.
- [x] Reduced motion stops the technology sprites without hiding them.
- [x] Desktop and mobile have no horizontal document overflow.

## Handoff

**Built:** Restored ticket 45 hardware positioning and dimensions by isolating hardware buttons
from the portfolio's generic button layout rules. Added a fixed local-time pixel landscape and six
technology cloud lanes that move behind the scrolling portfolio.
**Deviated:** Nothing.
**Watch out:** The four background images are the user's supplied references, copied unchanged into
`public/backgrounds/`. The browser gate compares runtime hardware markup with ticket 45 and checks
computed geometry across all nine devices.
