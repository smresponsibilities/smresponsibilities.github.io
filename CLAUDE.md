# SM'S DEX

A Pokédex-themed portfolio for Shivam Mahajan, plus a public roster anyone can join by
submitting a GitHub issue.

Not yet scaffolded. The repo currently holds planning artifacts only.

## Read these in order

| File | What it is |
|---|---|
| **`BUILD.md`** | The implementation spec. **Wins any conflict.** File tree, schemas, tokens, component reference implementations, CI YAML, per-phase acceptance criteria, gotchas. |
| `DECISIONS.md` | Every decision with its alternatives and why they lost. Read §J–§N before proposing a change — it was probably already considered and rejected. |
| `SPEC.md` | The content. Becomes the JSON data files. |
| `PLAN.md` | Research behind the decisions. Background only. |

`BUILD.md` §0 lists hard rules that must not be "improved" — no Tailwind, no UI framework, no
tooltip or animation libraries, zero runtime dependencies, no Nintendo assets, no stored images.
Each was decided deliberately. If one looks wrong, leave a comment and build it as specified.

## Communication style

Chat replies use **caveman mode at `ultra`** (`.claude/skills/caveman/SKILL.md`): drop articles
and filler, fragments are fine, abbreviate, arrows for causality, one word where one word does.
Technical terms stay exact.

Files in the repo — code, comments, commit messages, PR bodies, docs — are written in normal
prose. So are security warnings and ordered multi-step instructions. See `BUILD.md` §0.1.

## Agent skills

### Issue tracker

Dev issues live as markdown files under `.scratch/`, keeping GitHub Issues free for the public
"become a Pokémon" submissions the site depends on. See `docs/agents/issue-tracker.md`.

### Domain docs

Single-context: one `CONTEXT.md` and `docs/adr/` at the repo root, both created lazily by
`/domain-modeling` when terms or decisions actually get resolved. See `docs/agents/domain.md`.
