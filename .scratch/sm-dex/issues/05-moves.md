# 05: Moves

**What to build:** Projects presented as moves. At rest, four rows showing only name, type and PP. Selecting one
fills the bottom screen with power, accuracy, category and a single line of description. An
expand control reveals the remaining detail: stack, links, and the level it was learned at.

Sparsity is the feature. Fields with no value do not render at all, and only one move is
expanded at a time.

**Blocked by:** 03

**Status:** ready-for-agent

- [ ] Four rows fit at 375 px without scrolling
- [ ] Selecting a move fills the bottom screen while the list stays visible
- [ ] Selected view is capped at one line of effect text - real move descriptions run a median of 34 characters (`CANON.md` §4), so the layout must not assume a long one
- [ ] Status-category moves render with no power value at all, not a zero
- [ ] Expand reveals the remaining fields
- [ ] Fields with no value are omitted entirely, not left blank
- [ ] Only one move is expanded at a time
- [ ] Terms covered: moves, PP, power, accuracy, TM
- [ ] Keyboard navigable - arrows move the selection, Enter opens it
