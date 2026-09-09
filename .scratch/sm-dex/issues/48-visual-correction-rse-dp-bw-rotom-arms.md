# 48: Correct RSE, DP, BW stripe, and Rotom rear arms

Status: resolved
Type: task
Priority: highest

## Request

Correct four visual failures shown after revision 47.1. The Generation III crescent and body
still do not match the source proportions. The Generation IV closed top is misaligned and uses
the wrong exterior design. The Generation V diagonal stripe is visually broken where it crosses
the centre control. Rotom's two zigzag rear arm assemblies must themselves leave their rear
recesses; separate side flaps are not an acceptable substitute.

## Evidence

- User screenshot `codex-clipboard-f9153326-6e55-40ea-9567-ca65dfdd4c25.png` shows the invented,
  shifted Generation IV closed lid.
- User screenshot `codex-clipboard-77be47ac-edd3-4805-9b0e-0d95c2959b5b.png` shows the Generation V
  band cutting awkwardly through the centre-control well.
- User screenshot `codex-clipboard-7c5e8d91-6dc5-44f8-b758-2ed0a50d3d26.png` shows static zigzag rear
  arms while unrelated side flaps extend.
- `research/restart/references/g3-01.png` establishes the RSE body's landscape silhouette, rear
  hinge, right-offset crescent, and left disc.
- `research/ticket-47-gen-ii-v-reference-pass.md` identifies the source-backed DP closed exterior
  and RSE hinge evidence.

## Acceptance

- Generation III uses a right-offset, narrower crescent behind the landscape body and retains the
  horizontal rear hinge.
- Generation IV closed exterior aligns to the body and uses the documented anime closed landmarks:
  left circular plate, silver field, dark stripe, three green indicators, and exposed right hinge.
- Generation V splits or masks the diagonal stripe cleanly around the centre-control well.
- Rotom's two visible zigzag rear arm assemblies move out of their recesses during the rear half of
  the turn. No unrelated rear side flaps appear.
- Reduced motion still snaps to valid rear and front endpoints.
- Exported SVGs parse, browser checks pass, and handoff files are updated.

## Answer

Revision 48.0 replaces the four rejected treatments. RSE keeps its documented horizontal rear
hinge but now uses a narrower crescent offset 105 units to the right of the body centre, matching
the release artwork's composition. Diamond/Pearl's invented closed lid is gone; the replacement
uses the five landmarks from the documented anime closed view and aligns its centre shell to the
body and hinge. Black/White now draws two band segments with a clear gap around the centre-control
well. Rotom removes both substitute rear flaps. The complete large zigzag panels now translate and
rotate out of dark rear slots before the front arms take over.

The dedicated regression script failed all four assertions before these changes and passes all
four afterward. It also passes explicit reduced-motion endpoints and reports no browser errors.
All 53 generated SVG files parse as XML.

## Handoff

**Built:** Revision 48.0 corrects RSE lid placement, replaces the DP closed exterior, cleans the
BW band around its control, and moves Rotom's actual rear zigzag panels out of their slots.
**Deviated:** Diamond/Pearl's closed face deliberately uses a labelled anime-continuity design
because no closed game-art endpoint was found. No other spec deviation was introduced.
**Watch out:** The RSE closed overlap remains inferred. The user should review the revision 48.0
captures before any production migration. Further visual changes belong in a new ticket.
