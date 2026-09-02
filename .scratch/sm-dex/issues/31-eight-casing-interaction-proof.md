# 31: Eight-casing interaction and portfolio-content proof

Status: open
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
