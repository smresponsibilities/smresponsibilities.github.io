# Ticket 70 — Native dex, modern power, slider space

Status: resolved

## Request

- Remove the header View Dex route.
- Keep DEX browsing inside every generation device.
- Remove the power-off control/state from Generations VI, VIII, and IX.
- Link Resume to `/resume.pdf`.
- Give the Generation I slider enough clearance.
- Raise contrast for unselected Generation VI rows.

## Acceptance

- DEX entries open as native device detail screens without leaving `/`.
- `/dex/` is no longer a portfolio destination.
- Generations VI, VIII, and IX stay powered and expose no power control.
- Header has a working Resume link and no View Dex link.
- Generation I slider is unobstructed.
- Generation VI unselected row text meets WCAG AA contrast.

## Handoff

**Built:** DEX browsing now stays inside all nine generation devices. Removed standalone DEX routes and header link, linked `/resume.pdf`, made VI/VIII/IX always-on, fixed VI row contrast, and added Gen I slider clearance.
**Deviated:** Nothing.
**Watch out:** Add `public/resume.pdf`; the header link is intentionally live now and will 404 until that file exists.
