# CANON — what the real Pokédex actually does

**Purpose.** Every field on this site reinterprets something from the games. This file records
what the source material actually does, measured rather than remembered, so that two different
things stay distinguishable:

- a place where we **got it wrong** and should match canon, and
- a place where we **changed it on purpose**, which should not be "fixed" by a later session.

All numbers below were measured, not recalled. The method is at the bottom — rerun it if a
figure looks wrong.

---

## 1. Flavour text

Measured across **229 unique English entries**, 16 species, every generation.

```
characters     min 68 | median 103 | mean 116 | max 214
words          min 12 | median  20 | max 36
sentences      median 2 | max 3
<= 150 chars   84%
<= 120 chars   69%
first person   0%   (zero of 229)
```

**Rules that follow:**

- Aim for **~100 characters and two sentences.** Three is the ceiling.
- **Never first person.** Not one real entry uses it. Third person, present tense, faintly
  clinical: *"It is said that…"*, *"Researchers have observed…"*, *"This Pokémon…"*.
- Schema caps at **150**, which is already the 84th percentile. Do not raise it.

Real examples at each length:

```
[ 68]  It sends a soothing aura from its ribbonlike feelers to calm fights.
[ 95]  On the night of a full moon, if shadows move on their own and laugh,
       it must be GENGAR's doing.
[103]  Its body can't be harmed by any sort of attack, so it is very eager to
       make challenges against enemies.
```

## 2. Species line (canon term: *genus*)

```
median 15 characters | max 20
```

Always `<One or two words> Pokémon`:

```
Mouse Pokémon · Genetic Pokémon · Seed Pokémon · Shadow Pokémon
Sleeping Pokémon · Sky High Pokémon · Scratch Cat Pokémon (19, the longest found)
```

Schema caps at **24**. Ours is `Humanoid Pokémon` — 16 characters, comfortably in range.

## 3. Height and weight

English releases use imperial, with **inches zero-padded to two digits**:

```
HT 1'04"    WT  13.2 lbs
HT 6'00"    WT 169.8 lbs      ← ours, correctly formatted
```

Weight always carries one decimal place, even at `.0`.

## 4. Move fields

Measured across twelve representative moves.

```
name             type      class       pwr   acc   pp  prio
close-combat     fighting  physical    120   100    5    0
hyper-beam       normal    special     150    90    5    0
earthquake       ground    physical    100   100   10    0
thunderbolt      electric  special      90   100   15    0
tackle           normal    physical     40   100   35    0
protect          normal    status        -     -   10    4
swords-dance     normal    status        -     -   20    0
```

```
power       min 40 | median 90 | max 150
PP          only 5, 10, 15, 20, 35 seen — always a multiple of 5
accuracy    round values; 90 and 100 dominate
priority    0 for almost everything; Protect is +4
```

**Three conventions worth knowing:**

1. **Status moves have `power: null`, not zero.** They deal no damage by definition.
2. **PP is inversely related to power.** Tackle is 40 power / 35 PP. Hyper Beam is 150 power /
   5 PP. Strong moves are rationed.
3. **Move descriptions are extremely short** — median **34 characters**. *"Tough but useless
   vs. flying foes."* is a complete, canonical move description. The longest measured was 102.

## 5. Where we deliberately deviate — do not "fix" these

Each of these is a reinterpretation chosen on purpose. They are recorded here so a later
session recognises them as decisions rather than errors.

| Field | Canon meaning | Ours | Why |
|---|---|---|---|
| **Power** | Raw damage dealt | Real-world impact of a project | Needs to mean one consistent thing; impact is what a reader cares about |
| **Accuracy** | Chance the move hits | Reliability — test coverage, did it hold up | The honest field. A hackathon demo is 75%; 425 test suites is 100% |
| **PP** | Uses before rest — *inversely tracks power* | Maintenance status. `30/30` active, `0/15` archived | **Direct inversion of canon.** Deliberate: it makes the entry admit which repos are dead |
| **Level** | 1–100, earned by battling | One level per month of professional experience | Honest, automatic, and caps at a sane career length |
| **Stats** | Base stats, 0–255 | Counted real numbers with declared benchmarks | Invented numbers teach a recruiter nothing |
| **Ball** | What you were caught in | *How* the job was obtained | Canon-faithful in spirit — the ball has always encoded the circumstance of capture |
| **Species** | Biological classification | Job classification | Direct analogue |
| **Evolution** | Species transformation | Career progression, final stage unrevealed | Direct analogue |

The PP inversion is the one most likely to be "corrected" by someone who knows the games. It is
intentional.

## 6. Defects this file found

Both real, both filed:

1. **`TM01 · CIAM WAREHOUSE` is marked `Status` with `Power 100`.** Canon status moves have no
   power at all. It is also his largest piece of work, so it should be **Special** — the
   category for something designed and architected rather than hand-built. Fixed in `SPEC.md`.
2. **Move `effect` text was capped at 150 characters.** Real move descriptions run a median of
   **34**. A 150-character cap invites four times the canonical length, which breaks the
   one-line promise of the Level-2 disclosure in `BUILD.md` §7.4. Tightened to **100**.

## 7. Method — rerun this rather than trusting the numbers

Everything above came from PokéAPI, which carries the real game text. No key needed.

```bash
# flavour text and species line
curl -s https://pokeapi.co/api/v2/pokemon-species/25 | jq -r '
  .flavor_text_entries[] | select(.language.name=="en") | .flavor_text'
curl -s https://pokeapi.co/api/v2/pokemon-species/25 | jq -r '
  .genera[] | select(.language.name=="en") | .genus'

# move fields
curl -s https://pokeapi.co/api/v2/move/thunderbolt | jq '{
  power, accuracy, pp, priority,
  class: .damage_class.name,
  text: [.flavor_text_entries[] | select(.language.name=="en") | .flavor_text][0]}'
```

**Before inventing a convention, check whether the games already have one.** They usually do,
it is usually terser than expected, and matching it is free authenticity.
