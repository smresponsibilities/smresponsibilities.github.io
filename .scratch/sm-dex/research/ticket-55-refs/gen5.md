# Gen V visual reference pass

Date: 2026-09-09. Scope: 20 additional original Unova / Best Wishes anime episode captures. Each image is an unchanged WikiDex original downloaded through the WikiDex MediaWiki imageinfo API. Files live in `gen5/`; metadata, source page, original URL, and SHA-1 live in `gen5.json`.

## Provenance

WikiDex file pages are the source authority for the episode frame titles and original media URLs. The local candidate index was filtered to episode numbers EP660–EP800 and Pokédex filenames. The API request used `action=query`, `prop=imageinfo`, and `iiprop=url|size|sha1` with all 20 file titles in one batch. The stored `hash` values are the API SHA-1 values and are intended to be checked against downloaded bytes.

The set covers distinct frames for Tepig, Charizard, Trubbish, Gothitelle, Lampent, Blitzle, Joltik, Timburr, Zebstrika, Stoutland, Purrloin, Mienfoo, Bouffalant, Swoobat, Sigilyph, Cofagrigus, Durant, Dragonite, Nonomi using a Pokédex, and Koffing. The two same-episode pairs remain separate because each is a different captured entry frame.

## Use and limits

These are anime continuity references. They show screen framing, scan composition, gray rails, dark inset frames and colorful lower readouts. Most crops hide the lower casing, so they do not establish an all-gray device. The study's red-orange lower shell uses the original Black/White artwork documented in `../ticket-55-ui-review.md`. These frames do not establish exact game UI dimensions, hidden faces or slider construction.

`g5-extra-19` shows Nonomi with a Pokédex. Keep it as contextual evidence for scale and interaction, not as a character portrait.

Previously collected archive frames were excluded. Visual review rejected the initial Snivy selection and the proposed EP662 replacement because they repeat `g5-09` and `g5-06` at other resolutions. The final EP778 Charizard view is distinct. Verification compares SHA-1 and decoded original URLs as well as the visual review.
