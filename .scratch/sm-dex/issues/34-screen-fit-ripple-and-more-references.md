# 34: Screen fit, button ripple, and twenty more Kanto references

Status: resolved
Type: prototype
Priority: highest

## User request

The user selected Kanto references `g1-01`, `g1-05`, and `g1-06` for casing direction. They asked
whether game-style UI can fit inside the screens, whether a click ripple can acknowledge button
activation, to test that interaction, and to find twenty additional references.

This ticket answers those questions before the complete casing build in ticket 33. The twenty
additional items are interpreted as twenty total, focused on Kanto, not twenty per generation.

## Acceptance

- Record the selected three references without asserting that their differing artwork is one
  pixel-identical geometry. Use them separately for the fit study.
- Demonstrate game-reference and live sample-portfolio screen content in the original visible
  apertures. Preserve content proportions, mask overflow, and disclose small-screen readability.
- Demonstrate individually pressable coded caps with fixed wells, inert gaps, a contained ripple
  only on accepted activation, and a non-moving reduced-motion alternative.
- Verify pointer, keyboard, off-target cancellation, repeat activation, feedback containment,
  neighbouring bounds, and visible screen outcomes. Distinguish synthetic from real UI checks.
- Research and catalogue twenty additional distinct references with provenance and limitations.
- Keep this as a labelled scratch test, not approved replacement art or a finished closing model.

## Skill scope

The logic-prototype branch applies to the press/acknowledgement state model. The user's explicit
request for ripple animation and testing overrides that skill's default of no animations or tests.
Source images remain separate local dependencies for this visual study, rather than duplicating
large base64 images into a supposedly shareable one-file asset. The prototype stays scratch-only.

## Answer

Both proposed behaviours are feasible. The labelled study fits a proportionate live 160 × 144
portfolio layout, or original game captures, into references 1, 5 and 6. It includes letterboxing
and an enlarged accessible reader because the source-scale screen in reference 5 is too small
for long content. Thirteen independent bench controls demonstrate fixed targets, 4px cap travel,
accepted-release ripples clipped inside the cap, inert gaps, cancellation and power resume.
Reduced motion uses a static acknowledgement instead of travel and expansion.

The [study README](../prototypes/ticket-34-screen-fit-ripple/README.md) records the construction,
control-to-content table, limitations and browser evidence. All thirteen controls were checked
with native browser mouse input; Space/Enter, four keypad gaps, a round-button corner and a
cancelled drag were also checked. All eight page titles and native text extents were rechecked
with native keyboard input after correcting a 2px padding overflow. The 65 scripted assertions
pass at each of 375, 768 and 1280px. Synthetic touch and the reduced-motion preview are explicitly
not physical touchscreen or OS-preference tests.

Twenty additional original-series animation frames are in
[KANTO-20-MORE.md](../research/restart/KANTO-20-MORE.md), with metadata, dimensions and archive hashes.
The combined board has 110 images; all load at their recorded dimensions and all 110 downloaded
file hashes are distinct and unchanged. The additions are mainly screen states, not twenty
independent hardware views. New evidence shows a closed cover and a finger contacting the yellow
button, but not a verified continuous closing sequence or a proven function for every key.

The source review found a control/bezel discrepancy between the selected references. One permanent
layout remains to be chosen for ticket 33. The closed source includes a triangle; the user's earlier
no-triangle request is retained as an explicit adaptation, not described as identical source art.
The build prompt and mechanical checklist record these findings and the new feedback requirement.

Primary prototype capture: commit `5ba293b` on `codex/ticket34-screen-fit-ripple`. It contains the
study, its evidence and five unchanged source-image dependencies only. The broader reference-board
and handoff changes, including previous-session cleanup, remain outside that scoped capture.

## Handoff

**Built:** A runnable scratch screen-fit/ripple study with visible input state, sample portfolio
pages, source/game comparisons and recorded browser checks. The reference board now has 110 items,
including twenty new, visually reviewed Kanto frames.

**Deviated:** No production or framework change. The user's request for animation and tests
overrode the prototype skill's defaults. Source dependencies remain separate files. Bench controls,
manual screen planes and instantaneous hold displacement are study assumptions, not final geometry
or an override of the final Codédex interaction timing.

**Watch out:** Ticket 33 still owns the final casing and closing mechanism. Selection 1/5/6 does
not settle their incompatible bezel/control inventory. The optional baseline question is unanswered.
Do not claim source-exact controls, physical-touch proof or verified closure from this study.
Tickets 20 and 21 and the user's untracked `.agents/` remain untouched.
