# 59: Move generation devices onto the portfolio homepage

Status: resolved
Type: task

## Request

Turn the production homepage into Shivam Mahajan's portfolio. Put a short introduction and an
Add Pokémon button at the top. The button opens an accessible form containing the roster entry
attributes and hands the submission to a GitHub issue, which the existing approval pipeline can
turn into a pull request.

Show the generation selector next, defaulting to Generation I, followed by the large flat device.
Keep Generations I through IX but remove the separate HGSS option because it is a game variant,
not a generation. Size the device to fill the available screen without overflowing.

Add themed About Me and Projects sections below the device. Finish with a single-line Nintendo
attribution. Review text size, color contrast, keyboard access, focus, motion, and responsive fit.

## Acceptance

- Homepage top line identifies the page as Shivam Mahajan's portfolio.
- Add Pokémon appears at the top right and opens a labelled, keyboard-accessible form.
- Submitting opens a prefilled issue in this repository and explains that approval creates the PR.
- Generation I is the default. Generations I through IX are selectable. No separate HGSS option.
- Flat device is centered, larger where space allows, and fits phone and desktop viewports.
- About Me and Projects follow in the same visual language.
- Footer contains one line of Nintendo attribution.
- Text stays at least 12 px, reading copy stays at least 16 px, focus is visible, colors meet WCAG AA,
  motion respects reduced-motion preferences, and the page has no horizontal overflow.

## Changes

The production homepage now frames the accepted generation device study as Shivam's portfolio.
It adds the requested introduction, top-right roster action, Generation I default, Generations
I through IX selector, themed About Me and Projects sections, and one-line attribution. The
separate HGSS catalog entry is removed. The roster dialog collects nine entry attributes and
opens a prefilled issue in the site's repository for the existing review-to-PR flow.

The validated prototype assets are copied under `public/generation-device/` so the production
page can embed them without changing the accepted device geometry or interactions.

## Validation

`npm run build` passes. `research/ticket-59-verify.mjs` exercises all nine generation choices,
the Generation I default, the nine-field dialog, and the generated GitHub issue URL at 1440 ×
1000 and 390 × 844 with reduced motion enabled. Both sizes have no horizontal overflow, browser
errors, or failed resources. Screenshots are `research/ticket-59-1440.png` and
`research/ticket-59-390.png`.

## Handoff

**Built:** Production portfolio homepage with all nine generation devices, roster issue form,
themed About Me and Projects sections, and attribution.
**Deviated:** The proven device prototype is served as a same-origin embedded document instead
of being rewritten as Astro components. This preserves the accepted asset and interaction code.
**Watch out:** `public/generation-device/` is a production copy of the ticket-45 prototype. Future
device corrections must update both the prototype source and this copy until they are consolidated.
