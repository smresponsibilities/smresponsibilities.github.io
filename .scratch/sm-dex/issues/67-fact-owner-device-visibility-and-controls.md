# Ticket 67: fact owner, device visibility, and controls

Status: resolved

## Request

Identify loader facts with a linked GitHub username, correct the incomplete favicon, brighten the
device status line, add breathing room around opener controls, keep open screens opaque and populated
for Generations II, III, IV, and VII, and remove the tooltip arrowhead.

## Acceptance

- [x] Loader dex fact begins with a clickable `@smresponsibilities` GitHub link.
- [x] Favicon reads as a complete pixel `SM` at favicon size.
- [x] Device status line and opener controls use high-contrast text.
- [x] Opener and effect buttons have at least 10 px spacing and clear outer margins.
- [x] Open Gen II, III, IV, and VII screens are opaque, visible, and contain portfolio text.
- [x] Tooltip keeps its leader line but has no arrowhead.
- [x] Build and focused browser gate pass.

## Handoff

**Built:** Linked loader facts to `@smresponsibilities`, rebuilt the pixel SM favicon, brightened
device status and opener text, increased control spacing, hardened open screen paint for the reported
generations, and removed tooltip arrowheads while keeping leader lines.
**Deviated:** Nothing.
**Watch out:** Rear-first Rotom starts closed by design. Visual tests must open it and wait for the
turn before asserting front-screen content.
