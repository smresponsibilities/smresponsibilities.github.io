# Ticket 83 — Restore loader mix and merged roster flow

Type: task
Status: resolved
Blocked by: none

## Goal

Restore the intended loader composition and reconcile the current checkout with the already merged
public roster pipeline changes.

## Acceptance criteria

- “FACT: SM likes paneer and is unemployed right now.” appears on every loader run.
- A second DEX FACT is randomly selected from four SM fallback facts plus fact-bearing roster users.
- Each random fact links and labels its actual owner.
- Merged user `riyasainii448` appears in roster data, loader candidates, and generated device DEX.
- Add Pokémon creates an issue payload accepted by the workflow; workflow validates it, opens a PR,
  and merging that PR publishes the roster record.
- Loader facts and profile links remain contained at narrow and short viewports.
- Regression checks and production build pass.

## Evidence

Git history records issue #4 entering through roster PR #8 in merge commit `adf53aa`. Later commits
`09a2481` and `25b9249` generate device content during builds and repair prefilled submission parsing.

## Answer

The loader again shows the paneer/unemployment fact on every run. Its second row randomly chooses
from four Shivam fallback facts and every fact-bearing public roster record. Each candidate carries
its own GitHub username, so selecting Riya's cheese/chocolate/pink fact renders and links
`@riyasainii448`; selecting a fallback renders `@smresponsibilities`.

The current checkout had fallen behind the merged roster path. The merged issue #4 record was
restored from commit `adf53aa`, the build-time device-content generator from `09a2481` was restored,
and the issue prefill/workflow trigger repair from `25b9249` was reconciled. Production builds now
regenerate the in-device DEX, where Shivam is entry 001 and Riya is entry 002.

The forced-selection regression proves Riya's owner/fact pairing at 320×568, 390×844, and 667×375,
along with loader and profile-link containment. It also checks the form → issue → validation → PR
branch → merge/build path statically. All checks and `npm run build` pass.

## Handoff

**Built:** Persistent paneer fact, four owner-tagged fallbacks, Riya's merged roster fact, generated device DEX, and repaired submission trigger/payload flow.
**Deviated:** Nothing.
**Watch out:** `src/data/roster.json` contains public submissions only; Shivam remains the separately generated owner entry.
