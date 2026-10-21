# Site card rollout and century pages

Status: resolved

Apply approved floral/readable finishes across content cards, random approved recipes once per load, stable flowers, static resume/daily cards, and redesign all century archive pages. Preserve content, archive routing, filtering, links and reduced motion.

## Handoff

**Built:** Shared floral finishes across portfolio content cards and timelines. Century archives include searchable daily cards, ordering, chapter switching and day jumps.
**Deviated:** Six abstract upstream recipes exclude Basic/Common and Radiant; content paints above subdued foil. No new dependencies.
**Watch out:** Port 8767 serves dist; rebuild before previewing. Checks: `.scratch/tmp/verify-site-finishes.cjs` and `verify-site-motion.cjs`. Existing duplicate day route warnings remain.
