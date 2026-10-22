# 14: Onboarding and polish

**What to build:** First-time visitors get a short card explaining how to read the dex. Optional sound, off by
default. Shiny hover. A silhouette reveal on first load. Photo avatars get dithered rather than
naively pixelated, which keeps faces legible at sprite size.

**Blocked by:** 08

**Status:** ready-for-agent

- [ ] Onboarding card shows once, is dismissible, and is reopenable from a control in the chrome
- [ ] Sound toggle defaults to off and never autoplays
- [ ] Shiny hover shifts the sprite palette
- [ ] Silhouette reveal runs once per session and is skipped under reduced motion
- [ ] Dithering visibly beats plain pixelation on a photo avatar
- [ ] Every animation added here respects reduced motion
