# Ticket 71 — Slider bounds and push guide

Status: resolved

## Request

- Keep the Generation I Poké Ball slider fully inside its track.
- Identify production files needed for GitHub Pages.
- Give safe Git commit and push steps.

## Acceptance

- Slider ball stays inside both track edges when open and closed.
- Git instructions omit scratch screenshots and temporary research files.

## Handoff

**Built:** Slider travel now accounts for the Poké Ball inset, keeping the handle inside both track edges. Prepared an explicit production-only Git staging path.
**Deviated:** Nothing.
**Watch out:** Current branch is `codex/ticket37-hybrid-angle-clarity`; Pages deploys only from `main` through `.github/workflows/deploy.yml`.
