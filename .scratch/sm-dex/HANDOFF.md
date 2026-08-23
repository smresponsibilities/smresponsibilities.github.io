# Handoff — 2026-08-23, after ticket 30 (specs + prompts landed)

## State

Resolved: 01, 02, 03, 18, 19, 22, 23, 24, 25, 26, 27, 28
Open: 29 (gate unchanged, file list superseded — see note inside), 30 (specs+prompts done;
master regeneration pending)
Frontier: 04, 05, 06, 07, 08, 09, 11, 13, 17
In flight: 20 (device casing, untouched), 21 (stack migration)

## Last session

Executed ticket 30's build order. Specs rewritten to the per-skin model: BUILD.md casing section
is now "Casings — eight shells, one per version skin" with the full skin→device→master table,
stationary/hinged/slider motion contracts, and updated acceptance criteria; CANON.md §5 device-
identity and lid-motion rows rewritten; DECISIONS.md §X amended (per-skin, X3 records why the
clubbing died, X4 records deviations: anime-Kanto on Red/Blue, Johto single cover, HGSS pure)
and §T marked historical. `CHATGPT-MASTER-PROMPTS.md` rewritten then extended: run/linking
instructions, per-prompt Attach + Save-as lines, ordered parts grids (position encodes identity
since sheets carry no text), researched zero-text verdict (game artwork has no legible hardware
text; HANDY names are TCG-only), canon-vs-added controls inventory, and a rule-10 full-opacity
requirement. Downloaded missing official refs into `ticket-24/references/` (gsc/rse/dp PNGs).
Ticket 29 annotated; ticket 30 checkboxes ticked except regeneration.

## Not yet written down

Nothing beyond ticket 30 and the research doc.

## Next

User runs the seven prompts per the doc's "How to run" steps — contract + prompt + that
prompt's attached references in one message — saving PNGs to `.scratch/sm-dex/assets/ticket-30/`
under the given filenames, validating each. Then `_probe/audit.py`, then ticket 30's final
checkbox (superseded notes in `assets/ticket-24/README.md`). Extraction stays blocked until
masters pass.
