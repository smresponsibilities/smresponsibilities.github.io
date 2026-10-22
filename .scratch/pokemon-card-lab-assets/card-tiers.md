> Current production behavior, preserved generators and replication instructions: [docs/card-art.md](../../docs/card-art.md). The notes below record earlier lab decisions; the guide supersedes stale proposed/not-integrated statements.

# Card treatment recommendations

Status: proposed, not integrated into production.

## Shared identity

Use one consistent flower per project wherever it appears. Keep diagonal engraved corners, typography and the same reverse. Rarity is visual emphasis, not a fabricated project achievement. Don't assign random flowers on reload.

| Treatment | Behavior | Recommended placement |
| --- | --- | --- |
| Engraved | Static diagonal flower, subtle material edges, no tilt or foil | Resume experience/education, blog archive summaries, dense project listings |
| Interactive engraved | Same frame, small pointer tilt, restrained white glare, focus/press feedback; no rainbow foil or automatic spin | Standard project cards on `/projects/`, related articles, featured blog entries |
| Floral holo | Same identity with full foil, tilt, glare and user-triggered enlarged inspection | A small number of homepage featured projects and the main card on individual project pages |
| Plain utility | No flower or foil, normal focus/hover feedback | Navigation, filters, forms, task lists, timeline rows and compact metadata |

## Where the existing site supports these

- `src/pages/index.astro`: featured project articles can use floral holo; experience cards use static engraving.
- `src/pages/projects/index.astro`: ordinary project entries use interactive engraving.
- `src/pages/projects/*.astro`: a single main project card can use floral holo; supporting content remains plain.
- `src/pages/blog/index.astro`: featured post can use interactive engraving; ordinary archive entries remain static or plain.
- `src/pages/blog/archive/` and timeline pages: avoid repeating full decorative cards across every row.
- `src/pages/resume.astro`: static engraving, including printed output. No interaction required to read the content.
- Community roster: interactive engraving on individual entries; reserve holo for selected presentation moments rather than every item in the grid.

## Combinations

Keep finish and interaction independent: engraving alone; engraving plus white glare; engraving plus holo. The optional fourth combination is a quiet plain card. Do not create every Cartesian combination as a public setting. Click-to-inspect belongs to collectible presentations; normal content links should navigate without forcing a flip.

## Motion

The lab opening now uses a 1600ms eased full turn. Zoom advances faster than rotation so the card approaches the center before its reverse passes. Reduced motion skips the animation. The latest opening is intentionally timed rather than using the previous fast spring. This change does not implement the proposed production tiers.
