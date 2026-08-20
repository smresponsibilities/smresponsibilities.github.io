# 03: Identity block and tooltip primitive

**What to build:** The top screen shows a recognisable dex header: pixelated sprite, both type badges in canon
colours, current level, availability status, height, weight, species and dex number.

This ticket also ships the tooltip primitive every later ticket depends on. Any Pokedex term
explains itself in portfolio language on hover, on tap, and on keyboard focus. Legibility is
built in from here rather than bolted on at the end, so every later ticket carries its own
tooltips in its acceptance criteria.

**Blocked by:** 02

**Status:** claimed

- [ ] Sprite renders from the GitHub avatar, pixelated, with no image file in the repo
- [ ] A missing or deleted avatar falls back to the UNIDENTIFIED SPECIES frame
- [ ] Level is computed from a start date, not hard-coded, and advances on its own each month
- [ ] Type badges use the canon colours from tokens
- [ ] Tooltip opens on hover, on tap, and on keyboard focus; Escape and outside-click close it
- [ ] Terms covered: level, species, status, both type badges
- [ ] No information exists only inside a tooltip
