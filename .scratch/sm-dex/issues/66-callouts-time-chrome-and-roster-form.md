# Ticket 66: callouts, time-aware chrome, and roster form

Status: resolved

## Request

Move diagram tooltips away from controls and give their leader lines arrowheads, clarify vague
screen-entry labels, theme site chrome and scrollbars by time of day, raise secondary text contrast,
and revise the Add Pokémon form with explained fields and conditional employer details.

## Acceptance

- [x] Diagram label clears its target and uses a bent leader with a visible arrowhead.
- [x] Entry callouts describe what opens, not only “Open profile”.
- [x] Header, footer, dialog, Add Pokémon controls, and document scrollbar follow time-of-day tokens.
- [x] Secondary text uses high-contrast near-white instead of low-contrast grey.
- [x] Height and weight are absent from the form and generated issue.
- [x] Every form field has concise guidance.
- [x] Company appears and becomes required only for Caught status.
- [x] Build and focused browser gate pass.

## Handoff

**Built:** Moved labels away from controls, added arrow-ended diagram leaders and descriptive second
lines, applied time-specific chrome and scrollbars, raised secondary text contrast, and revised the
public roster form with explained fields and conditional employer input.
**Deviated:** Nothing.
**Watch out:** Company is cleared whenever status changes away from Caught, preventing hidden stale
employer data from entering the generated issue.
