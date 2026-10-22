# 58: Correct device details after visual review

Status: resolved
Type: task

## Request

Remove the Rotom smile. Make Gen V's lower section slightly longer. Move the Gen III
button away from the display, preserving its accepted closing geometry. Correct Gen IX
cameras against the existing reference artwork.

## Changes

Removed the complete added Rotom mouth and cyan patch. Restored Gen V lower scale to
1.30 from 1.18, with controls using the same geometry. Moved the Gen III green button
14 units left and 3 down. Gen IX now has level blue and dark lenses in a joined casing,
following `research/restart/references/g9-01.png`.

## Validation

Browser captures cover all four changes plus Gen III closed. Gen I matches its prior
screenshot exactly. The moved Gen III button clears the screen and opens a profile;
Gen V's button works at 320px without horizontal overflow. No browser errors.
All 53 exported SVGs parse. See `research/ticket-58-review.mjs`.

## Handoff

**Built:** Removed Rotom mouth, lengthened Gen V bottom, moved Gen III green key,
and corrected Gen IX camera alignment, casing and lens colors.
**Deviated:** The latest user request authorizes this specific Gen III button change.
Its accepted closing geometry is unchanged.
**Watch out:** Revision 58.0 supersedes the smile and Gen V trim from ticket 57.
Changes after checkpoint `5a7c400` remain uncommitted.
