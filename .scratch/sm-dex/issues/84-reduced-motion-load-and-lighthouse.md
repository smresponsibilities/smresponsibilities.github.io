# Ticket 84: Reduced-motion loading and Lighthouse performance

Status: resolved
Type: task
Blocked by: none

## Request

Fix the portfolio failing to load when Windows reduced animation is enabled. Address the
actionable Lighthouse findings shown by the user: cache lifetimes, image delivery,
render-blocking requests, main-thread work, unused JavaScript, long tasks, and
non-composited animations. Push the result and merge it into `main`.

## Acceptance

- The page becomes usable with `prefers-reduced-motion: reduce` and the loader cannot trap it.
- A browser regression check covers normal and reduced-motion loading.
- Actionable Lighthouse costs are reduced without changing the authored device experience.
- Production build and relevant regression checks pass.
- Changes are committed, pushed, and merged into `main` without losing existing work.

## Answer

The loader now dismisses after DOM readiness instead of waiting for every image. Under reduced
motion it has no artificial delay or fade, so Windows' animation preference reaches usable
content immediately. The normal-motion loader keeps its existing 1.2 second authored beat.

The page now uses lossless WebP world art, selects the correct time-of-day image before body
paint, animates cloud bobbing with transforms, and omits Astro's unused client router from this
single-page site. These changes cut duplicate image loading, layout-driven animation work, and
unused runtime JavaScript without removing the device motion.

GitHub Pages controls production cache headers, so the cache-lifetime warning cannot be fixed
inside this repository. A `_headers` file would have no effect and was not added.

## Evidence

- `npm run build`: passed.
- `npx astro check`: 0 errors; one pre-existing unused-parameter hint in `classic.js`.
- `node .scratch/sm-dex/research/ticket-83-regression.mjs`: passed all responsive and roster-flow checks.
- `node .scratch/sm-dex/research/ticket-84-reduced-motion.mjs`: normal and reduced-motion loading passed; reduced-motion loader detached in 236 ms.
- Production-build Lighthouse, same local environment: performance 71 to 83, LCP 7.4 s to 4.1 s, main-thread work 2.1 s to 1.1 s, transfer size 1,529 KiB to 743 KiB, non-composited animations 12 to 0.

## Handoff

**Built:** Reduced-motion loading reaches content immediately; background delivery and animation work are substantially cheaper.
**Deviated:** Cache lifetime remains host-controlled because GitHub Pages does not honor repository header configuration.
**Watch out:** Lighthouse scores vary by run; compare the saved JSON evidence rather than treating 83 as a permanent score.
