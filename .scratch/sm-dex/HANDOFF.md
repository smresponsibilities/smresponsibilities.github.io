# Handoff — 2026-09-12, after ticket 12

## State
Resolved: 01, 02, 03, 12, 18, 19, 22, 23, 24, 25, 26, 27, 28, 30, 32, 34, 35, 36, 37, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80
Frontier: roster display ticket 13
In flight: 20 and 21 retain their existing claimed status

## Last session

Ticket 12 changed community approval from label-to-main to issue-to-PR. The public form now
opens the Issue Form template, the roster workflow validates stranger input, writes the roster
JSON, comments with errors when validation fails, and opens or updates a PR that can be merged
to approve the submission.

## Not yet written down

`BUILD.md` and `DECISIONS.md` still describe the older approved-label flow in places. Ticket 12
records the PR-based override, but the long-form docs should be reconciled if this becomes the
lasting design.

## Next

Open a test submission issue on GitHub and confirm the Action creates a PR with the generated
roster entry.
