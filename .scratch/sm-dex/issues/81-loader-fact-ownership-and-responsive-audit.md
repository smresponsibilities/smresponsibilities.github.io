# Ticket 81 — Loader fact ownership and responsive audit

Type: task
Status: resolved
Blocked by: none

## Goal

Make loader facts identify their owner consistently, then audit and repair responsiveness across
the shipped homepage, loader, device showcase, content sections, dialogs, and public dex entry.

## Acceptance criteria

- Every loader fact begins with its owning GitHub handle, including Shivam's facts and facts for
  other roster members.
- Loader content fits without clipping or horizontal overflow on narrow and short viewports.
- Homepage/device/content/dialog layouts have no horizontal page overflow at representative phone,
  tablet, laptop, desktop, and short-landscape viewports.
- Interactive controls remain visible, readable, and at least 44 CSS pixels where practical.
- Interactive public dex screen remains usable at the same representative viewports.
- Reduced-motion behavior remains intact.
- Automated responsive checks cover the reported loader/fact behavior and overflow regressions.
- Production build passes.

## Notes

New requirement filed separately because related implementation tickets are already resolved and
tickets 20 and 21 remain claimed.

## Answer

Loader facts now use a consistent `@github · DEX FACT:` prefix. Random facts are built from the
roster data, so a future member's fact links to and names that member rather than inheriting
Shivam's handle. Shivam's portfolio facts retain explicit ownership as well.

The loader now uses safe-area padding, wraps long owner/fact strings, and switches to a compact
layout on short viewports. Header, profile, and project links now expose full 44-pixel interaction
targets; profile links wrap instead of crowding narrow screens.

The automated gate covers 320×568, 390×844, 667×375, 768×1024, 1024×600, and 1440×900. At each
size it exercises all nine generation devices, the loader, main layout, public dex interface, and
submission dialog. It found no horizontal overflow, clipped loader content, undersized outer
controls, runtime errors, or reduced-motion regressions. `npm run build` passes.

## Handoff

**Built:** Owner-aware roster-backed loader facts, short-viewport loader layout, and corrected outer link hit areas.
**Deviated:** No standalone public dex route exists in the current one-page build; the mounted public dex interface was audited instead.
**Watch out:** Keep `fact` optional in roster data; loader fact generation deliberately filters empty values.
