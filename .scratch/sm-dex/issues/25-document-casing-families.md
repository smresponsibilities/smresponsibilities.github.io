# 25: Document clubbed casing families

**What to build:** Update the project documentation after approval of tickets 23 and 24. Preserve
eight selectable game-version skins, but document that physical casing chrome is shared across
four generation families. Record the component and motion contracts without importing approval
rasters into production.

**Status:** resolved

- [x] `BUILD.md` defines the four casing families, ownership boundaries, interaction model, and
      approval-master status.
- [x] `CANON.md` records generation clubbing and the shared side-by-side screen layout as deliberate
      deviations from the games.
- [x] `DECISIONS.md` resolves the previous eight-casings/four-casings ambiguity.
- [x] `PLAN.md` distinguishes eight selector skins from four casing families.
- [x] `SPEC.md` is updated only if its content contract needs the family mapping.
- [x] No claimed ticket or production source file changes.

## Boundaries

Tickets 20 and 21 remain claimed. This ticket changes documentation only.

## Handoff

**Built:** The canonical docs now distinguish eight selectable version skins from four physical
casing families and define shared component, button-press, lid-motion, transparency, accessibility,
and approval-master contracts.
**Deviated:** `SPEC.md` was intentionally unchanged because casing-family selection is an
implementation and design-decision concern, not portfolio content or schema data.
**Watch out:** Ticket 20 must reconstruct the approved masters as controllable CSS/SVG/DOM; it must
not import or cross-fade the approval PNGs. Ticket 21 remains separately claimed.
