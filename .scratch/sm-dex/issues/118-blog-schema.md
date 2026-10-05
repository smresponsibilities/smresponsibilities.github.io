# Ticket 118: Implement Schema.org JSON-LD across Blog Routes

Type: task
Status: resolved
Blocked by: none

## Goal
Execute `claude-seo` audit insights on `shivammahajan.com` and fix the missing structured data (JSON-LD) for the blog section.

## Answer
- Updated `src/components/EditorialShell.astro` to accept a `structuredData` prop and pass it down to `Base.astro`.
- Updated `src/pages/blog/index.astro` to inject `Blog` schema.
- Updated `src/pages/blog/archive/[group]/[...page].astro` to inject `CollectionPage` schema.
- Updated `src/pages/blog/[day].astro` to inject `BlogPosting` schema.

## Handoff

**Built:** Structured data (Schema.org) injection for all blog pages, improving AI Search Readiness.
**Deviated:** Nothing.
**Watch out:** Other project pages still lack `SoftwareApplication` or `Project` schema.
