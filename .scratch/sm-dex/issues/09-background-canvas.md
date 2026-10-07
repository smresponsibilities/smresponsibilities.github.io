# 09: Background canvas

**What to build:** A slow animation behind the hero suggesting data moving through a system. Confined to the
hero area, never running behind the full length of the page.

**Blocked by:** 02

**Status:** ready-for-agent

- [ ] Canvas 2D, no library
- [ ] Bounded to the hero with overflow hidden - never the full scroll height
- [ ] Canvas is transparent so the page background shows through
- [ ] Colour comes from tokens and changes with the skin
- [ ] Reduced motion renders one static frame and starts no loop
- [ ] Pauses when the tab is hidden
- [ ] Text contrast is unaffected in every skin
- [ ] Mode is swappable by prop; three modes implemented
