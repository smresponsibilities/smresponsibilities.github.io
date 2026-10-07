# 04: Stat block

**What to build:** Six stats, each a real countable number with its unit. The number is the prominent element
and the bar is secondary. Hovering a bar states both the metric and the benchmark the bar is
measured against, so the scale is declared rather than invented.

Background: an earlier design normalised all six onto one logarithmic scale. That is wrong -
the values are in incompatible units, and it rendered the strongest signal as the weakest bar.
Each stat carries its own benchmark instead.

**Blocked by:** 03

**Status:** ready-for-agent

- [ ] Six stats render from data, each with its value and unit
- [ ] Bar fill is value divided by benchmark, capped at full
- [ ] Every bar's tooltip names its metric and its benchmark
- [ ] No bar renders without a stated benchmark
- [ ] Panel is readable at 375 px
