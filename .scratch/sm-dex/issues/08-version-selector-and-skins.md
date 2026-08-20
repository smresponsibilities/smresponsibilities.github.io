# 08: Version selector and four skins

**What to build:** One control changes the entire look and also changes which flavour text is showing - the two
jobs are the same control because that is what the games do. The choice survives a reload with
no flash of the wrong theme on load.

The selection also names the site. Every Pokemon game is "X Version", so the wordmark reads
"SHIVAM RED VERSION" or "SHIVAM CRYSTAL VERSION" and changes with the selector. One control now
drives three things: the skin, the flavour text, and the site's own name.

**Blocked by:** 03, 07

**Status:** ready-for-agent

- [ ] Four skins, each redefining tokens only, with no HTML changes
- [ ] The selector changes skin and flavour text together
- [ ] Choice persists across reloads
- [ ] No flash of the default skin before the saved one applies
- [ ] Every skin passes WCAG AA contrast for body text - the green LCD skin is the known risk
- [ ] Wordmark reads "SHIVAM <VERSION> VERSION" and updates with the selector
- [ ] Adding a fifth skin needs no component changes
