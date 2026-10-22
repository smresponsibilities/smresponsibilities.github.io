# 52: Extend the real flap and align the complete DP lid

Status: resolved
Type: task
Priority: highest

## Request

Extend the Generation II body and moving flap instead of covering the bottom with fixed artwork.
Align Generation IV without removing its semicircle. Preserve the approved Generation III.
Improve hardware finish across devices using Generation I as the benchmark.

## Handoff

**Built:** GSC body and both flap faces extend 36 units to y=746. The lower panel, latch, and lens
belong to the moving flap; the previous fixed foreground panel is removed. DP's body uses the
complete reflected lid outline, including its semicircle, with zero measured screen-bounds
difference. Round hardware wells and shadows are no longer clipped; directional pads have bevels.
**Deviated:** The lower GSC blue lens now moves with the flap, following the user's requested
structural correction. RSE geometry remains unchanged.
**Watch out:** Ten captures cover open/closed review. The prior hardware action checks pass and
all 53 SVG exports parse. Historical ticket 50/51 geometry checks are superseded. Production is
unchanged; no commit was made.
