> Current production behavior, preserved generators and replication instructions: [docs/card-art.md](../../docs/card-art.md). The notes below record earlier lab decisions; the guide supersedes stale proposed/not-integrated statements.

# Independent print identity

The custom card no longer borrows Pokemon's gold border, game stats, blue reverse or mirrored wordmark. The original reference card remains in the inspector for effect comparisons.

## Sources and techniques

- [Pentagram, Just Type](https://www.pentagram.com/work/just-type-playing-cards-2/story): identity can come from typography and geometric form rather than accumulating decorative symbols. Applied through a strong project title and a single restrained type hierarchy.
- [Ye Olde Studio, High Victorian](https://yeoldestudio.co.uk/HighVictorian.html): detailed artwork uses a shared symbolic language, and fine lines must survive small reproduction. Applied through a repeated geometric SM motif derived from the favicon rather than unrelated scrollwork.
- [Theory11, National](https://store.theory11.com/collections/playingcards/products/national-playing-cards): foil and embossing are distinct material treatments. Applied as static copper linework and bevel highlights on the reverse. These are screen simulations, not physically accurate print previews.

## Implementation

Palette: graphite #252529, warm ivory #eee8dc, copper #d6b299. Reverse asset: `sm-identity-pattern.svg`, original vector geometry. Existing favicon stays recognizable, slightly desaturated in the lab. The framed seal uses inset highlights and shadows to suggest debossing. Motion and holographic code are unchanged.

## Validation

Both browser scripts passed. Desktop, reverse and mobile screenshots were inspected. Full production integration and physical mobile testing remain outside this lab task.
