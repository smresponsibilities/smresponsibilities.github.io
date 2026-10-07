# Ticket 108: Project index and evidence-backed blog pages

Type: task
Status: resolved
Blocked by: none

## Goal

Add missing project index, requested `/blog/shivam-mahajan-software-developer/`, two related articles, and fix homepage text defects without inventing SEO claims.

## Answer

Added `/projects/` and three articles: software developer profile, day 1236 of 2002 Days of Code, and the public roster workflow. The supplied LinkedIn embed identifies `#day1236` and LeetCode 1111; Sep 30, 2026 comes from the user's “yesterday” statement on Oct 1. Updated blog index, homepage links, and sitemap. The current source and live homepage already spelled “Pokémon” correctly; no `PokAcmon` or replacement characters found. Corrected `Intialized`, `reminders.For`, and removed unsupported `+significant%` instead.

Build, homepage SEO gate, new-route HTTP checks, sitemap route checks, and SlopMonster copy checks completed. Remaining three-item-list flags are meaningful lists, not AI filler.

## Handoff

**Built:** Project index, three article routes, blog navigation, sitemap entries, homepage copy fixes.
**Deviated:** Did not replace correctly encoded “Pokémon” because no broken letters were present in current source or rendered HTML.
**Watch out:** New pages remain local until deployment. Day 1236 post topic is verified from public embed; post date is user-provided. Search ranking uplift cannot be promised or measured without Search Console data.
