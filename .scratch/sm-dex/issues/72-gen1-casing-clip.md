# Ticket 72 — Generation I casing clip

Status: resolved

## Request

- Stop the Generation I right casing leaf being cut at the stage boundary.
- Confirm no Git push occurred and keep docs/research out of production staging.

## Acceptance

- Generation I stage permits transformed casing overflow.
- Page gains no horizontal overflow at desktop or mobile widths.

## Handoff

**Built:** Generation I permits transformed casing outside the stage box without creating horizontal page overflow.
**Deviated:** Nothing.
**Watch out:** Keep `.scratch/` and `docs/` out of the production commit requested by the user.
