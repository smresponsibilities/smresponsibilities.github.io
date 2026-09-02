# 31: Eight-casing interaction and portfolio-content proof

Status: claimed
Priority: highest
Blocked by: none

## What to prove

Use the eight accepted ticket-30 casing masters in one scratch-only interaction harness. Prove
that every control can be pressed independently, that each press causes the intended UI state
change, and that the live screens contain Shivam's portfolio rather than baked Pokémon UI.

## Boundaries

- Do not touch claimed tickets 20 or 21, or any production file they own.
- Keep the proof under `.scratch/sm-dex/prototypes/ticket-31-eight-casings/`.
- Use ticket-30 pixels as separable layers. Do not redraw, trace, recolour, or cross-fade them.
- Treat the Classic Red ticket-26 prototype as interaction-architecture evidence only. Its shell
  is not an accepted visual reference.
- Keep screen content as accessible DOM behind transparent apertures. Do not bake screen text,
  Pokémon entries, labels, or portfolio content into casing images.
- Stop after the scratch proof, its automated checks, screenshots, and handoff.

## Acceptance criteria

- [ ] All eight casings load from accepted ticket-30 masters and preserve their reference-matched
      open, closed, compact, or front/back forms.
- [ ] Each casing has an extraction manifest. Reassembling its resting layers reproduces the
      accepted source pixels exactly outside declared transparent screen and occlusion masks.
- [ ] Every visible physical control is its own native `<button>` with a matching fixed base and
      moving face where the source device has a physical control.
- [ ] Pointer press, touch press, Space, and Enter move only the control face down 4px while the
      input is held. The face returns on release. The fixed base, native hit target, neighbouring
      controls, hinge, and casing keep the same bounding rectangles throughout.
- [ ] D-pad or equivalent Up/Down changes the highlighted menu or list item. Left/Right changes
      page or tab. D-pad centre stays inert. A or a real centre-confirm control opens the selection.
      B returns one state. START opens Main Menu. SELECT opens the version selector. Touch-led
      casings expose equivalent labelled DOM controls inside the transparent screen instead of
      inventing hardware buttons.
- [ ] Every control is exercised once with pointer input and once with its keyboard equivalent.
      Each check samples the held visual state before release, then asserts the application state
      after click activation.
- [ ] Kanto, Gold/Silver, and HGSS follow `CLOSED -> BOOT -> MAIN MENU -> LIST -> DETAIL`.
      Diamond/Pearl may start from an explicitly labelled reconstructed closed face. Hoenn starts
      `OPEN/OFF -> BOOT` until a real closed reference is locked; it never fabricates a canonical
      closed view. Unova follows `COMPACT -> EXTENDED -> BOOT -> MAIN MENU -> LIST -> DETAIL`.
      Rotom casings start `OFF -> BOOT`. Back reverses one application level. Hinged and sliding
      casings hide unavailable screen content from focus order and accessibility tree.
- [ ] Main Menu exposes PROFILE, MOVES, ENCOUNTERS, RIBBONS, EVOLUTION, and DEX. The screens show
      Shivam's identity, counted stats, projects as moves, work experience, achievements, career
      stages, version-specific flavour text, and public roster. No generic Pokémon specimen data
      replaces portfolio content.
- [ ] The labelled DOM control `+ ADD POKÉMON` remains visible in the top-right chrome and opens
      `/become`. Its text and hit target are not baked into any casing image.
- [ ] Selecting every Main Menu item reaches representative real content from `SPEC.md`; automated
      checks assert one identifying content value per destination, not only a route or heading.
- [ ] Empty casing, lamps, lenses, speaker holes, bezels, control gaps, and decorative Rotom body
      parts do nothing unless the interaction contract explicitly names them.
- [ ] Focus remains visible. Reduced motion makes state changes instant but keeps the 4px pressed
      state while held. Audio never autoplays.
- [ ] Pointer, keyboard, touch emulation, all controls, UI results, portfolio content, open/closed
      accessibility, reduced motion, and 375/768/1280px overflow pass automated browser checks.
- [ ] README records the control-to-action-to-visible-content map for all eight casings.
      It implements `assets/ticket-30/BUTTON-UI-PORTFOLIO-MAP.md` and distinguishes site mappings
      from undocumented Pokémon hardware functions.

## Progress: Kanto approval gate, revision 3

The user rejected the first vector proof and subsequently selected ticket 26's illustrated direction.
They asked for regenerated coherent assets, more visible button separation, clean casing plates,
and an explicit way to close the device. These later instructions supersede the earlier boundary
that treated ticket 26 as architecture evidence only.

Revision 3 lives in `prototypes/ticket-31-eight-casings/`. It combines a generated clean casing atlas,
live DOM screens, and 28 native CSS controls. Keypad gutters are 10px; white-pair gutters are 14px.
The D-pad is one rocking cross with four non-overlapping hit regions. The outside triangle opens;
the right black CLOSE pill folds the same cover around the fixed hinge, retaining the current page.
The cover faces share a mirrored outline and do not duplicate the stationary lens header.

The ticket remains claimed and the eight-casing acceptance boxes remain unchecked. Kanto approval,
real held-input visual capture, touch emulation, and the remaining seven devices are not complete.
The README distinguishes measured checks from outstanding checks and records the RGB atlas limitation.

## Revision 4: annotated preview and Codédex feedback

The user's annotation referred to the button-free generated atlas, which had been linked as though
it were the assembled result. That preview omitted the separately rendered triangle and controls.
Show assembled browser captures from now on.

The triangle and its OPEN caption are larger and higher contrast. The interior ◀ CLOSE control is
larger, remains clear of its neighbours, and is named explicitly in the state-specific guide.
Live Codédex inspection confirmed the 4px/100ms mechanism. The revision now uses its fixed-depth,
darkened-held-face behavior. Enter/Space hold feedback until release, then activate once.
All 28 controls passed pointer, Space, and Enter activation checks after the change.

## Original-reference comparison, 2026-09-03

The user rejected revision 4, explicitly selected ticket 26's visual treatment again, then asked
to compare the original too and whether React or Next.js would improve the result. No new visual
revision or framework migration was made during this comparison.

Compared the saved ticket-26 and revision-4 assembled screenshots against both frozen Kanto
references in `assets/ticket-30/references/`. The Red/Green illustration has two black inner
buttons, different speaker placement, and different panel proportions. Ticket 26 is therefore
a selected style reference, not an exact reconstruction of the original device. The Gen I
open/closed reference and Red/Green illustration also differ in details; do not silently mix them.

The ticket-26 extraction manifest shows independent nonuniform scaling: its 417 by 673 inner
image becomes 420 by 816, while its 425 by 825 outer image becomes 420 by 816. Its separate control
crops also do not register exactly over the baked controls. Revision 4 replaced these with new
generated plates and CSS caps, changing the accepted visual treatment instead of just fixing it.

Both scratch versions use standalone HTML, CSS, and JavaScript. Astro is not responsible for
these image and layer mismatches. React could organize the eventual interactive device without
a Next.js migration; Astro officially supports React hydration. No framework choice is approved.

Before changing the selected ticket-26 baseline, clarify whether original device geometry and
control count should take priority wherever they differ from ticket 26. Preserve the chosen
illustrated treatment, but do not describe it as original-pixel-perfect.

## Revision 5: OG geometry and coherent controls

The user confirmed that original geometry and control count override ticket 26 wherever they
conflict, then accepted the OG geometry direction and requested coherent Codédex-style controls.
Revision 5 keeps the illustrated pixels but stops stretching the 417 by 673 inner lid to 420 by
816. It restores the lower, shorter inner panel, second black inner button, and speaker holes.

The 28 native hit targets have no overlaps. Keypad boundaries are integer-aligned. The D-pad is
one raster rocker with four non-overlapping directional regions. Pressed faces move 4px over 100ms.
Browser checks covered open, close, reopen, pointer content changes, Space navigation, Enter version
change, six menu destinations, zero target overlaps, and browser errors. Full touch emulation and
every-control replay remain outstanding until the visual gate is approved.

## Handoff

**Built:** Kanto revision 5 with accepted OG geometry direction, native-proportion illustrated
layers, two black inner controls, speaker detail, coherent button clusters, 28 native targets,
and 4px/100ms press feedback. README records mappings and measured browser checks.

**Deviated:** Illustrated ticket-23/26 pixels remain the finish; original reference geometry and
control count now override ticket 26. Speaker holes are CSS decoration. D-pad moves as one physical
raster part instead of independent sliced arms.

**Watch out:** OG geometry direction is accepted; revision 5 controls still await the user's visual
approval. Do not build the remaining seven before that. Full touch and every-control replay remain.
Tickets 20 and 21 remain untouched.
