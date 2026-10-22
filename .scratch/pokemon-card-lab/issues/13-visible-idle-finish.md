# Visible idle finish

Status: resolved

Make both custom lab cards visibly finished by default with gentle idle foil drift, stronger pointer interaction, static reduced-motion finish and no automatic tilt.

## Handoff

**Built:** Both custom lab previews have a visible default recipe finish and gentle 18-second shader drift without automatic tilt. Pointer leave restores baseline rather than hiding foil. Reduced motion keeps static sheen.
**Deviated:** None.
**Watch out:** `.scratch/tmp/verify-lab-idle.cjs` checks both defaults, drift, no idle tilt and reduced-motion static finish. All-23-recipe mask isolation regression also passes. Default timeline screenshot inspected. Site source unchanged.
