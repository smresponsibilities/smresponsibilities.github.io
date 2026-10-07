# 12: Submission pipeline

**What to build:** Someone submits an entry, the system checks it automatically and tells them what was wrong if
it fails. Valid submissions raise a pull request that edits the roster data. The owner approves
by merging the PR.

Every field is hostile input: typed by strangers and rendered into HTML on a public site.

**Blocked by:** 11

**Status:** resolved

- [x] Issue form fields match exactly what the builder pre-fills
- [x] Validation rejects: malformed username, nonexistent GitHub account, invalid type, over-length entry, duplicate username
- [x] Entry text is capped at 150 characters and species at 24, matching real dex conventions (`PLAN.md` §13)
- [x] A rejection posts a comment naming the rule that failed
- [x] Valid submissions create or update a pull request
- [x] All strings are sanitised - control characters and leading =, +, -, @ stripped
- [x] Every tenth approved entry is marked shiny

## Handoff

**Built:** Submissions now use a GitHub Issue Form, validate automatically, write `src/data/roster.json`, and open/update a roster PR from `roster/issue-<number>`. Merging the PR is the approval step.
**Deviated:** Replaced the old `approved` label direct-commit design with issue-to-PR approval because the owner asked for PR review before roster changes land.
**Watch out:** The current public form does not collect stats, so the validator targets the live roster schema rather than the older full BUILD schema with stat budget checks.
