# 13: Roster page and per-entry pages

**What to build:** A page showing everyone approved, as a grid, with a counter of how many are registered. Each
person also gets their own page, so sharing a link unfurls with that person's sprite and name
rather than the site's default card. That share is the mechanism by which the roster grows.

Entries page like a real dex: BACK and NEXT move to the neighbouring entry by dex number, so
someone who lands on a shared link can browse the rest without going back to the grid.

**Blocked by:** 12

**Status:** ready-for-agent

- [ ] Grid shows every approved entry
- [ ] Counter shows the registered total against the target
- [ ] Each entry has its own statically generated URL
- [ ] Sharing an entry link previews that person's sprite and name
- [ ] Shiny entries are visually distinct
- [ ] Grid works at 375 px
- [ ] BACK and NEXT move between adjacent entries by dex number and wrap at the ends
- [ ] Paging works by keyboard as well as by tap
- [ ] An empty roster renders without error
