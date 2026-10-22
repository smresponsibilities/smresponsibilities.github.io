# 11: Become-a-Pokemon builder page

**What to build:** A page where a visitor builds their own entry - GitHub username, two types, stats they either
allocate or roll, and a one-line dex entry - then one button hands them a GitHub issue with
every field already filled in.

The interesting UI lives here because a GitHub issue form cannot hold sliders or a live
preview. GitHub handles only login, spam resistance and moderation.

**Blocked by:** 02

**Status:** ready-for-agent

- [ ] Live sprite preview updates from the username as it is typed
- [ ] Stat sliders share a budget derived from level; the total cannot exceed it
- [ ] Randomise produces a valid distribution within budget
- [ ] Submit opens a GitHub issue with every field pre-filled
- [ ] A visible notice states the username and avatar become public and that no email is collected
- [ ] Works on a 375 px screen
