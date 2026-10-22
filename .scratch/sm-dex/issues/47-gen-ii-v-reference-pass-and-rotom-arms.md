# 47: Gen II-V reference pass and Rotom arm reveal

Status: resolved
Type: task
Priority: highest

## Request

Review the current handoff and generations II through V, obtain more visual references for
those devices, and use them to correct the local all-generation study where the evidence is
strong enough. For generation VII, the arms must begin behind the rear-facing device and
extend only as the device turns to the front.

The follow-up asks for generation III to fit the shared study better and for generations II
through V to reach the visual finish of generation I. Rotom's arms must visibly move out from
the rear recesses instead of appearing from generic side positions.

## Scope

Continue the ticket-45 local prototype without migrating production. Prefer official game,
guide, anime, model-sheet or concept-art views that reveal silhouettes, controls or endpoint
poses not already covered. Record source strength and uncertainty. Do not claim unseen hinge
construction as canonical. Preserve portfolio content and all hard rules in `BUILD.md`.

## Acceptance

- Generations II, III, IV, HGSS and V receive an expanded reference pass.
- New references and their useful evidence are recorded with source links.
- Strong source-backed prototype corrections are applied and documented. Generations II-V
  receive a coherent polish pass using generation I as the finish benchmark.
- Generation III fits the shared stage without losing its landscape silhouette.
- Generation VII starts rear-facing with both arms behind the body, then extends them during
  the rear-to-front reveal from the two visible rear recess paths.
- Reduced motion produces a clear endpoint without arm interpolation.
- Relevant exports and interaction checks pass.
- Ticket and repository handoff are written before resolution.

## Answer

Revision 47.1 expands the Generation II-V reference pass with fourteen additional visual
artifacts and one first-party Black/White provenance source. It corrects the RSE device from
an unsupported side door to a compact rear/top clamshell, aligns the GSC right-leaf baseline,
compresses and recolours the Diamond/Pearl body, widens the Black/White unit, and adds
source-visible finish details across the five designs. Rotom's rear arms now scale and fade
directly from the endpoints of the two visible zigzag recesses before the front face takes over.

The browser check exercised both keyboard endpoints for Generations II-V, the two Rotom motion
phases, explicit reduced-motion endpoints, and a 390 by 844 RSE viewport. No horizontal overflow,
console errors, or page errors were found. All 53 exported SVGs parse as XML. The RSE closed face
remains an explicitly labelled reconstruction because no source in the pass shows it.

## Handoff

**Built:** Revision 47.1 applies the expanded reference pass, refits RSE around its documented
rear hinge, polishes Generations II-V, and makes Rotom's arms emerge from the rear recess paths.
**Deviated:** RSE's earlier side-hinge implementation was replaced because the added artwork and
episode evidence consistently show a horizontal rear hinge. The exact closed overlap remains
authored because no closed source was found.
**Watch out:** Visual approval remains subjective. Review the compact RSE crescent, Diamond/Pearl
body proportions, widened Black/White silhouette, and the Rotom rear emergence capture before
any production migration. Use a new ticket for further visual changes.
