# Pokédex hardware by generation — re-researched from scratch

Date: 2026-08-23. Trigger: user rejected both the ticket-24 AI masters **and** the four-family
generation clubbing itself ("no the generation clubbing is wrong too"). This doc restarts the
question with no inheritance from tickets 24/25: for each of the eight selector skins, what
Pokédex *object* actually exists in that game, and which skins genuinely share hardware?

## Sources

| Source | Used for |
|---|---|
| Bulbapedia, [Pokédex](https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9dex) (rev 4604532) — Models section, Trivia "resembles" list, Artwork gallery | Primary. Model names (HANDY505/808/909/910is), per-game behaviour, official artwork file names |
| Bulbapedia trivia lines (same page) | Console-analogue claims, quoted verbatim below |
| [Fandom — Johto Pokédex](https://pokemon.fandom.com/wiki/Johto_Pok%C3%A9dex), [Fandom — Unova Pokédex](https://pokemon.fandom.com/wiki/Unova_Pok%C3%A9dex) | Physical descriptions: covers, lens, slider, button layout |
| [Giant Bomb — Pokédex (Object)](https://wiki-origin.giantbomb.com/wiki/Objects/Pokedex) | Corroboration for Gen I–V models incl. Unova colourways |

Official artwork filenames (Bulbapedia archives) are listed per row so the next master-
regeneration session can pull exact references without re-searching.

## The eight skins, mapped to their real devices

The selector exposes: Red/Blue · Gold/Silver · Ruby/Sapphire · Diamond/Pearl ·
HeartGold/SoulSilver · Black/White · Sun/Moon · Scarlet/Violet.

| Skin | Device shown in that game | Bulbapedia console analogue | Physical form |
|---|---|---|---|
| Red/Blue | Kanto Pokédex, HANDY505 | "The Generation I Kanto Pokédex resembles a Game Boy" | Portrait single-screen red handheld; screen top, D-pad + buttons below. Artwork: `File:Gen_I_Pokédex.png`, `File:RG_Pokédex.png` |
| Gold/Silver | Johto Pokédex, HANDY808 | "The Generation II Johto Pokédex resembles a Game Boy Color"; closed it resembles a cell phone | Folding covers top **and** right; light-blue lens visible open or closed; opens via black button inside a Poké Ball logo; GBC-style interior. Artwork: `File:Pokédex_GSC.png` |
| Ruby/Sapphire | Hoenn Pokédex | "Both versions of the Hoenn Pokédex resemble a Game Boy Advance" | Landscape single-body handheld (GBA orientation) — **not hinged**. Artwork: `File:RSE_Pokédex.png`. Note: FRLG's redesigned *Kanto* dex is the GBA-SP-like clamshell (`File:Pokédex_FRLG.png`) |
| Diamond/Pearl | Sinnoh Pokédex, HANDY910is | "The Sinnoh Pokédex resembles a Nintendo DS Lite" | Clamshell, two screens, stylus. Artwork: `File:DP_Pokédex.png` |
| HeartGold/SoulSilver | Johto redesign | "the Generation IV Johto Pokédex is in similar appearance to a Nintendo DSi" | Clamshell, green LED, blue open-button, two side styluses; red (m) / pink (f). Artwork: `File:Pokédex_HGSS_m.png`, `File:Pokédex_HGSS_f.png` |
| Black/White | Unova Pokédex | "The Unova Pokédex resembles an iPod Nano" | Two screens, top one slides/extends (early-2010s slider-phone move); single Poké Ball power button (red m / pink f); lower screen is touch; small green LED. Artwork: `File:Pokédex_BW_art.png` |
| Sun/Moon | Rotom Pokédex | "The Alola Rotom Pokédex resembles a tablet computer" | Dedicated orange-red device inhabited by Rotom — antenna, flap arms, feet, its own personality. Artwork: `File:0479Rotom-Pokédex.png` |
| Scarlet/Violet | Paldea dex — an app on the Rotom Phone | "The Galar, Paldea and Lumiose Rotom Phones resemble a smartphone" | Consumer smartphone + swappable case; dex is software, entries render as books on a shelf. Artwork: `File:0479Rotom-Phone_SV.png` |

(X/Y's Kalos dex — a card that separates around a holographic centre — has no skin in the
selector today. If it is ever added it is a genuinely unique seventh/eighth object.)

## Follow-up verification (same day): "every one separate"

User hypothesis: every skin should get its own casing. **Verified true.** Each of the eight
selected versions ships a physically distinct model:

- Model numbers are per-game-pair (HANDY505 RB/Y · HANDY808 GS/C · HANDY909 FRLG ·
  HANDY910is DP/Pt) — no model number at all for Hoenn and Unova.
- Identical devices only repeat across versions we did not both pick (DP=Pt, BW=B2W2
  physically identical, RB=Y). Within our eight, every device is unique.
- Closest kinships, still distinct objects: D/P ↔ HGSS (same DS clamshell *category*, different
  designs) and S/M ↔ S/V (same Rotom era, dedicated device vs phone app).

Ticket-23 device re-verified: it is a correct illustrated **Kanto** Pokédex (hinged, keypad —
the iconic anime-style Kanto object). The drawing is right; its current Gen III slot is what
contradicts canon. Under the all-separate model it moves to the Red/Blue skin (recorded as the
anime-Kanto rendering vs the games' solid GB-like artwork), and Ruby/Sapphire regenerates as
the Hoenn landscape body.

**Adopted direction: eight casings, one per skin** — supersedes Options A/B/C below.

## Verdict on the current four-family clubbing

Current model (BUILD.md §"Casing families", DECISIONS.md §X): Game Boy = I–II,
Classic red = III, Dual-screen = IV–V, Modern Rotom = VI–IX.

1. **Game Boy family (Red/Blue, Gold/Silver) — wrong object.** No game shows a grey DMG.
   The Gen I dex is a *red* handheld whose silhouette merely resembles a Game Boy; the Gen II
   dex is a folding-cover device with a GBC-style interior and a phone-like closed form.
   The ticket-24 landscape dual-screen DMG adaptation is an invented object twice over.
2. **Classic red on Gen III — right object, wrong generation.** The approved ticket-23 device
   is the hinged, keypad-equipped *Kanto* dex language. Canon puts that lineage on Kanto games;
   Ruby/Sapphire's Hoenn dex is a solid landscape GBA-shaped body with no hinge and no keypad.
3. **Dual-screen family (IV–V) — half right.** D/P (DS-Lite-like) and HGSS (DSi-like) belong
   together legitimately. Black/White does not: the Unova dex is a vertical sliding media-device
   (iPod-Nano-like), a different silhouette with different controls (one Poké Ball button,
   touch-driven lower screen).
4. **Modern Rotom family (VI–IX) — two different objects.** Sun/Moon is a dedicated
   Rotom-inhabited dex (tablet-like, arms/antenna/feet). Scarlet/Violet is a smartphone app on a
   Rotom Phone with a changeable case. Sharing one frame erases both designs.

Also worth recording: HGSS sits in the dual-screen family correctly *because* it is a Gen IV
remake of Gen II — remake hardware follows the release console, not the setting's generation.

## Corrected groupings

### Option A — strict canon (six families)

| Family | Skins | Basis |
|---|---|---|
| Kanto/Johto handhelds | Red/Blue · Gold/Silver | GB-like red dex; folding Johto dex — one lineage, palette/detail variant per skin |
| Hoenn landscape | Ruby/Sapphire | GBA-shaped solid body |
| Sinnoh clamshell | Diamond/Pearl · HeartGold/SoulSilver | DS-Lite / DSi language |
| Unova slider | Black/White | iPod-Nano-like vertical slider |
| Alola Rotom Dex | Sun/Moon | Dedicated Rotom tablet-device |
| Paldea Rotom Phone | Scarlet/Violet | Smartphone + case |

Most faithful; doubles the number of objects to draw versus today's four.

### Option B — five families (merge the Rotom era)

Same as A, but Sun/Moon and Scarlet/Violet share one modern family rendered as two explicit
variants (Rotom Dex device vs Rotom Phone+case) instead of two separate builds.

### Option C — keep four shells, fix their contents

Keep the count at four but re-point what each shell imitates:
I–II becomes the red GB/GB C-lineage *Pokédex* (not a DMG); III keeps the approved hinged
device as a recorded deliberate deviation; IV/V stays clamshell but drops B/W-specific control
language; modern splits internally into Dex vs Phone faces. Cheapest, but keeps two known
canon deviations (III placement, V silhouette) on the books.

## Constraints that survive any option

- Shared accessible DOM behind transparent screen openings (BUILD.md §0, §X2) applies whether
  a casing exposes one opening widened, two openings, or a slider gap.
- The desktop two-screen layout is a site convention, not game canon — single-screen devices
  were already being adapted. Re-clubbing changes *what the shell imitates*, not that contract.
- DECISIONS.md §X says a fifth casing family needs an explicit decision — this research is that
  trigger; the spec rewrite must land in BUILD.md, CANON.md §"Device identity", DECISIONS.md §X
  once the user picks an option.
