# 12: Submission pipeline

**What to build:** Someone submits an entry, the system checks it automatically and tells them what was wrong if
it fails. The owner approves with a single label from their phone, and the entry lands in the
data file. No pull request, no hand-editing.

Every field is hostile input: typed by strangers and rendered into HTML on a public site.

**Blocked by:** 11

**Status:** ready-for-agent

- [ ] Issue form fields match exactly what the builder pre-fills
- [ ] Validation rejects: malformed username, nonexistent GitHub account, invalid type, over-length entry, stats over budget, duplicate username
- [ ] Entry text is capped at 150 characters and species at 24, matching real dex conventions (`PLAN.md` §13)
- [ ] The form shows a worked example in dex voice, so submissions arrive in third person rather than as "I love coding!!"
- [ ] A rejection posts a comment naming the rule that failed
- [ ] Adding the approval label commits the entry to the data file
- [ ] All strings are sanitised - control characters and leading =, +, -, @ stripped
- [ ] Every tenth approved entry is marked shiny
- [ ] Malformed roster data fails the build rather than shipping a broken page
