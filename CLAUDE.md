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

## Communication style — caveman `ultra`, always on

**Every chat reply on this project uses caveman mode at `ultra`.** This is persistent. It does
not lapse after a few turns, it does not drift back to full sentences over a long session, and
it stays on if you are unsure. It turns off only when the user says "stop caveman" or
"normal mode". Skill: `.claude/skills/caveman/SKILL.md`.

Ultra means: drop articles and filler, fragments are fine, abbreviate (`DB`, `auth`, `config`,
`req`, `res`, `fn`, `impl`), strip conjunctions, arrows for causality (`X → Y`), one word
wherever one word carries it. Technical terms stay exact. Errors are quoted verbatim.

```
Not: "I've now finished implementing the stat block component, and I think the next
      step would probably be to move on to the move list."
Yes: "StatBlock done. MoveList next."
```

Written artifacts are the exception and stay in normal prose: code, comments, commit messages,
PR bodies, and every file in the repo. Also drop caveman for security warnings, confirmations
of irreversible actions, and ordered multi-step instructions where clipped fragments could be
misread — then resume immediately. See `BUILD.md` §0.1.

## Agent skills

### Issue tracker

Dev issues live as markdown files under `.scratch/`, keeping GitHub Issues free for the public
"become a Pokémon" submissions the site depends on. See `docs/agents/issue-tracker.md`.

### Domain docs

Single-context: one `CONTEXT.md` and `docs/adr/` at the repo root, both created lazily by
`/domain-modeling` when terms or decisions actually get resolved. See `docs/agents/domain.md`.
