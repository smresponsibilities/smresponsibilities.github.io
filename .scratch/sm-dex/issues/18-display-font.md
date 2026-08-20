# 18: Load the display font

**What to build:** The site currently renders every heading in the body sans stack, so it has none of the
pixel-art character the whole design depends on. `--font-display` is defined in `tokens.css`
and referenced by nothing, and no `@font-face` is registered anywhere.

Self-host Press Start 2P, subset to latin, and apply it to the chrome and headings only. It is
a display face: it works at 8px multiples and is unreadable at paragraph length, so body copy
stays in the sans stack.

This is the single highest-value visual change available right now, and it is close to free.

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [ ] Font is self-hosted, not fetched from a third party at runtime
- [ ] Subset to latin; file is small enough not to delay first paint
- [ ] `font-display: swap` so text is never invisible while loading
- [ ] Applied to the wordmark, headings and dex chrome only - never to body copy
- [ ] Sizes are multiples of 8 wherever the display face is used
- [ ] `--font-display` is actually referenced; no dead token
- [ ] A type scale is defined in tokens and replaces the current ad-hoc sizes
- [ ] Nothing renders below 12px
