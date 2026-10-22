# Readable chapter journey

Status: resolved

Refresh homepage journal and blog timeline using the Mario reference rail/story interaction. User explicitly excludes Pokemon images. Preserve chapter archives, daily feed and search.

## Final scope

The user clarified that each chapter must be an individual floral card, with centered text, full-card effects and no reverse. This supersedes the initial route/story concept. No Pokemon creature images are used.

## Handoff

**Built:** One shared horizontal floral chapter-card component for homepage and `/blog/timeline/`. Thirteen cards use distinct existing coded blooms, diagonal corners, centered text, full-surface foil/glare and restrained tilt. Cards have no backs and no opening spin. Homepage uses a compact variant; full timeline includes sample-day links. Daily feed/search and archive links remain. Removed duplicated carousel/scroll-timeline implementations.
**Deviated:** User explicitly excluded Pokemon images and requested the floral cards instead. The Mario pen informed the horizontal chapter interaction; no Flickity dependency or source artwork was copied.
**Watch out:** Flower assets are copied into `public/floral/`, independent of the scratch lab. Build passed for 1321 pages with existing duplicate day-route warnings. `.scratch/tmp/verify-floral-timeline.cjs` passed for all 13 cards, centered text, no backs, foil/tilt, navigation, live archive links, daily search, mobile overflow and runtime errors. Desktop/mobile screenshots inspected. Changes are local and uncommitted, not deployed.
