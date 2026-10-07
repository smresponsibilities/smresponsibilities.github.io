# Ticket 91 — Agent Markdown and Content Signals

Type: task
Status: resolved
Blocked by: none

## Goal

Give AI agents a clean Markdown version of the portfolio and declare permitted content uses
without requiring a paid Cloudflare feature or changing the GitHub Pages host.

## Acceptance criteria

- The homepage advertises a Markdown alternate with `rel="alternate"` and
  `type="text/markdown"`.
- `/index.html.md` provides an accurate, readable Markdown mirror of the homepage's main content.
- `llms.txt` points agents to the Markdown mirror.
- `robots.txt` allows search and AI retrieval, disallows AI training, and limits reuse to
  reference-level use.
- Production build and focused rendered-output validation pass.

## Sources

- https://joshhornby.com/serving-markdown-for-ai-agents
- https://github.com/dylanfeltus/site-to-md
- https://developers.cloudflare.com/bots/additional-configurations/managed-robots-txt/

## Answer

The homepage now publishes a static Markdown mirror at `/index.html.md` and advertises it in
the document head and `llms.txt`. The existing origin-managed `robots.txt` declares search and
AI-input permission, denies AI training, and limits reuse to references. This keeps the site on
GitHub Pages and adds no runtime service or package dependency.

## Evidence

- `npm run build`: passed.
- `npx astro check`: 0 errors; one pre-existing unused-parameter hint in `classic.js`.
- `node .scratch/sm-dex/research/ticket-91-agent-markdown-gate.mjs`: all seven checks passed.
- `node .scratch/sm-dex/research/ticket-84-seo-gate.mjs`: all existing SEO and analytics checks passed.

## Handoff

**Built:** Published and advertised a clean Markdown homepage mirror; retained the manual Content
Signals policy already deployed in `robots.txt`.
**Deviated:** Used a curated static mirror instead of `site-to-md`; one page does not justify its
runtime dependencies, and curated copy avoids Readability dropping interactive portfolio content.
**Watch out:** Update `public/index.html.md` whenever homepage experience, projects, or headline
metrics change.
