# Reference project fronts and visible showcase

Status: resolved

Use the supplied accepted lab front for actual project cards. Keep mobile artwork and copy side by side. Opening inspection must visibly turn through the accepted logo back. First project and timeline chapter must show stronger effects at rest. Verify and push.

## Handoff

**Built:** Shared `ProjectCard.astro` renders the reference front on homepage and all 15 directory projects. Mobile previews retain horizontal artwork/copy panels; inspection restores full content. Opening turns through the accepted monogram/favicon back over 1600ms. First project and first chapter per track use visible rainbow (.52 rest/.68 hover); reduced motion skips the turn. Replication guide updated.
**Deviated:** Mobile previews clamp description and omit feature rows/extra directory links to stay compact; full content and all links remain in inspection. Source of truth for these decisions is `docs/card-art.md`.
**Watch out:** Build: 1,321 pages. Browser checks cover 320/390px panels, mobile overflow, both flip faces, keyboard/focus, reduced motion and missing assets; all 17 SEO tests pass. No physical mobile device or live deployment verification. Existing duplicate-day warnings remain. Mechanical design detector's Arial warning is retained intentionally to match supplied reference.
