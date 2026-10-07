# Ticket 77 — Mobile scale, tooltip toggle, and render audit

Status: resolved

## Request

- Increase undersized mobile UI and device controls.
- Add a styled top-level toggle for tooltips.
- Audit rendering, repeated rendering, listener lifecycle, and related UI issues.

## Acceptance

- Mobile typography and primary controls are comfortably readable and tappable without horizontal overflow.
- Header exposes a styled, accessible Tooltip on/off switch.
- Tooltip preference applies to every diagram tooltip and persists locally.
- Tooltip state does not remove accessible names or essential information.
- Repeated initialization does not duplicate listeners, timers, SVG connectors, or render work.
- Build and focused browser checks pass at desktop and phone widths, including reduced motion.

## Answer

Mobile now uses the existing five-step type scale at larger values, 48px generation controls,
larger device actions, and an 18px readable view. The header has an accessible persisted Tooltip
switch. Turning it off suppresses both callout labels and leader lines without removing button
names or visible information.

The render audit found generation selection painted content and status three times and the
ResizeObserver repeated layout work even when width had not changed. Generation selection now
performs one content write, while resize work is animation-frame batched and skipped at unchanged
widths. The duplicate Gen I overflow rule was removed.

`npm run build` passes. The focused Playwright gate passes at 390×844 and 1440×1000 with zero
horizontal overflow, console errors, or page errors. It also verifies toggle persistence, tooltip
suppression, mobile sizes, and one content mutation per generation change. The phone capture is
`research/ticket-77-mobile.png`.

## Handoff

**Built:** Larger mobile type and controls, persistent top-level Tooltip switch, and a batched single-render generation/resize path.
**Deviated:** Nothing.
**Watch out:** Device screen text remains physically scaled with each casing; mobile readable view is the deliberate legible equivalent.
