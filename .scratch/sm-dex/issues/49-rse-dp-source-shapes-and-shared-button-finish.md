# 49: Rebuild RSE and DP shapes and share the Gen I button finish

Status: resolved
Type: task
Priority: highest

## Request

Replace the still-rejected Generation III and IV device treatments. Apply the visual finish of
Generation I's physical buttons to every physical control in the all-generation study.

## Interpretation

The user identified the accepted intermediate Generation III treatment precisely: revision 47's
landscape body with a right-side crescent that closes sideways. Restore that implementation from
the saved `research/ticket-47-after-ruby.png` state. This is a deliberate user-selected deviation
from the later rear-hinge research conclusion and must be labelled as such.

The Generation IV closed anime hybrid introduced in ticket 48 is also rejected. Remove it. Keep
one coherent game-art-based device. Align the lid and lower centre shell on one axis and derive the
closed exterior from the same lid shell rather than switching to another continuity.

The Generation I button benchmark consists of a dark mounting well, raised face, top highlight,
lower shadow, clear outline, and four-unit press travel. Apply that shared treatment to every
non-directional hardware target. Directional rockers keep their source shape but receive the same
highlight and depth cues.

## Acceptance

- Generation III restores revision 47's right-side crescent and horizontal body, with `hinge-y`
  sideways closure and the same screen and control placement shown in the accepted capture.
- Generation IV open lid and lower shell share a centre axis. Its closed exterior comes from the
  same game-art shell; ticket 48's anime closed hybrid is removed.
- Every non-directional hardware target uses one shared Gen I-style well, cap gradient, highlight,
  lower shadow, and press travel.
- Generation II, III and IV directional rockers use consistent Gen I-style depth cues.
- Existing actions, hit areas, keyboard behavior, reduced motion, and export structure remain valid.
- Dedicated browser assertions, SVG parsing, visual captures, and required handoffs pass.

## Answer

Revision 49.0 restores the exact intermediate RSE treatment identified by the user: the wide
landscape body, left disc, and right crescent that closes sideways. The later rear-hinge crown is
removed. The side hinge remains explicitly labelled as a user-selected visual deviation because
the reference pass supports different physical construction.

Diamond/Pearl no longer switches to ticket 48's anime closed face. The open upper and lower
centre structures differ by only 0.5 coordinate units, and the closed exterior reflects that same
game-art upper shell. All 31 non-directional controls now use one shared Generation I finish with
a dark well, raised gradient face, glint, lower shadow, outline, and press depth. The four devices
with directional rockers share Generation I's depth cues while keeping their source shapes.

The dedicated browser regression passes the RSE side-lid marker, DP centre alignment, all 31 cap
styles, one accepted action per test press, press depth on five representative generations, and
directional-rocker finish. The browser reported no errors. All 53 exported SVGs parse as XML.

## Handoff

**Built:** Revision 49.0 restores the accepted sideways-closing RSE, aligns DP around one shell,
and applies the Generation I button finish to every physical cap and directional rocker.
**Deviated:** RSE's sideways hinge is a deliberate user preference that conflicts with the
rear-hinge evidence. The prototype labels it as visual interpretation rather than canon.
**Watch out:** Final visual approval still belongs to the user. Use the ticket 49 captures and
revisioned URL to avoid cached ticket 48 art. Further changes belong in a new ticket.
