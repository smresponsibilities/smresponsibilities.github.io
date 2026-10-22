# 43: Seat exterior mark to cover rail

Status: resolved
Type: prototype
Priority: highest

## Question

How should the measured yellow exterior mark meet the closed cover's vertical rail so its dark
mount reads as attached rather than dangling, without moving the source-measured yellow face?

## Scope

- Preserve ticket 42's measured yellow face points and sweep alignment.
- Make the shared dark mount meet the cover rail in flat and Three.js renderers.
- Add a closed-state regression check for the attachment relationship.
- Verify all four variants and the closed/open visibility contract.

## Answer

The dangling appearance came from two geometries being conflated. Ticket 42 correctly measured the
yellow face, but flat rendered its border from that inset face while Three.js used a separate dark
well. The visible border therefore began to the right of the x=75 cover rail.

The yellow face remains `80,372 105,388 82,409`. The shared dark well is now
`75,368 111,387 76,415`, so its base overlaps the cover rail at x=75. Flat now renders that well
explicitly, matching the Three.js construction. All four renderers use the same model geometry and
the mark remains exterior-only and non-interactive.

The regression loop failed with `mountLeftX: 77` before the correction and passes with
`mountLeftX: 75` after it. Flat passes 60/60 checks, full Three.js 67/67, hybrid 62/62 and
3D / quiet caps 67/67. Closed flat and angled full-Three views were inspected in-browser. No
warnings or errors were recorded. Prototype capture: `f8c3516` on
`codex/ticket37-hybrid-angle-clarity`.

## Handoff

**Built:** Seated the shared dark exterior-mark well into the cover rail without moving the
source-measured yellow face; added a regression check across all four variants.
**Deviated:** Nothing.
**Watch out:** Review `v=49`; old `v=48` keeps the detached flat border. The mark is still not an
input target.
