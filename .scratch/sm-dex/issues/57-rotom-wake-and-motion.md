# 57: Improve Rotom opening and animation

Status: resolved
Type: task

## Request

Commit all existing work first, then improve Rotom's opening and animation using the
two supplied concept sheets. Adjust the slightly long Gen V against the supplied art.
Gen I and Gen III remain protected.

## Checkpoint

All prior tracked and untracked changes were committed as `5a7c400` before this ticket.
The working tree was clean immediately afterward. No push was requested.

## Acceptance

- Stage Rotom's rear-arm extension and turn without squashing or popping the front arms.
- Add character motion inspired by the sheets, with pause and reduced motion respected.
- Retain screen and rear-view interaction isolation throughout opening and flipping.
- Trim Gen V slightly, keeping its lower controls and artwork aligned.
- Verify endpoints, reactions, pause, reduced motion and protected generations.
- Record a handoff.

## Result

Revision 57.1 stages Rotom's arm extension before its turn, adds antenna and foot motion,
and provides Wave, Curious and Surprise reactions. Pause and reduced motion stop motion.
The user's follow-up rejects the cramped smile: the revised grin sits on a cyan face
patch above the display rim. Gen V's lower extension is reduced from 1.30 to 1.18 with
control bounds sharing the same geometry. Gen I and III remain screenshot-identical.

## Validation

`research/ticket-57-motion.mjs` checks opening samples, screen locking, reactions,
front/rear isolation, pause, reduced motion, and 320/390px layouts. No browser errors.
JavaScript syntax checks pass; all 53 regenerated SVGs parse.

## Handoff

**Built:** Rotom opening and expression motion, revised smile, and shorter Gen V lower shell.
**Deviated:** Nothing. This remains the existing authored flat interpretation.
**Watch out:** All previous work is committed at `5a7c400`; ticket 57 changes remain
uncommitted for review. Keep Gen I and Gen III protected. Preview uses `v=57.1`.