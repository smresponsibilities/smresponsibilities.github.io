# 17: Trainer card

**What to build:** A trainer card panel showing name, ID number, and a **playtime counter** in Pokemon's
`hours:minutes:seconds` format, counting from a start date - alongside where the trainer
studied and what they studied.

The playtime counter is the point. In the games it is the quiet flex at the bottom of the
trainer card, and here it counts something real: the streak, or the first commit, or whenever
the counting should start. A number that has been running for years reads very differently from
a claim that it has.

**Blocked by:** 03

**Status:** ready-for-agent

- [ ] Trainer card renders name, ID number, institution, programme and start date from data
- [ ] Playtime is computed from a start date in data, never hard-coded
- [ ] Counter ticks live while the page is open
- [ ] Counter stops ticking under reduced motion and when the tab is hidden
- [ ] Format matches the games: hours, then minutes, then seconds
- [ ] Card is readable at 375 px
- [ ] Terms covered: playtime, ID number
