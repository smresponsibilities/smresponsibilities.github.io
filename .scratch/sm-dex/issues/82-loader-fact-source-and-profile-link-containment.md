# Ticket 82 — Loader fact source and profile-link containment

Type: task
Status: resolved
Blocked by: none

## Goal

Correct ticket 81's incomplete loader ownership model and catch element clipping hidden by the
page's overflow containment.

## Acceptance criteria

- Loader displays roster facts only; every displayed fact and link use the same roster record's
  GitHub username.
- Loader fact block remains contained and readable at narrow and short viewports.
- GitHub, LinkedIn, and Email links remain fully inside their content container at 320px and wider.
- Regression check asserts child containment rather than relying only on page scroll width.
- Production build passes.

## Notes

Ticket 81 is resolved and must not be edited. This follow-up records the clarified requirement.

## Answer

The loader now draws exclusively from roster records that contain a fact. The selected username,
profile link, and fact come from one object, so ownership cannot drift. All SM-only fallback facts
and the duplicate fixed fact row were removed. The current roster contains only
`smresponsibilities`, so that is correctly the only owner shown until another approved member with
a fact is added.

On viewports up to 480 pixels wide, the fact owner and copy stack into separate centered rows. The
profile links retain 44-pixel hit areas and wrap, placing Email on a second row at 320 pixels rather
than clipping it. The regression test checks fact-source identity and each link's bounds against
the profile container at 320×568, 390×844, and 667×375. All checks and `npm run build` pass.

## Handoff

**Built:** Roster-only owner/fact selection, responsive loader fact row, and child-level profile-link containment coverage.
**Deviated:** Nothing.
**Watch out:** With only one fact-bearing roster record, random selection necessarily always shows `@smresponsibilities`.
