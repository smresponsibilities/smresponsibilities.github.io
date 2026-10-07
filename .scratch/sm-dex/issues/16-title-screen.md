# 16: Title screen

**What to build:** A first-time visitor lands on a full-screen title card - the site wordmark, the currently
selected version, and a blinking "PRESS START" - and taps or presses a key to enter. It is the
one moment the site gets to announce what it is before showing anything.

It shows **once**. A returning visitor goes straight to the dex, and anyone arriving on a deep
link (a shared roster entry, the resume) is never gated at all. The reference implementation
this idea came from re-gates on every single visit and writes nothing to storage, which turns a
charming flourish into a toll booth.

**Blocked by:** 08

**Status:** ready-for-agent

- [ ] Full-screen title card shows the wordmark and the selected version
- [ ] Enter, Space, click and tap all dismiss it
- [ ] Shows once - a return visit within the same browser goes straight through
- [ ] Never shown when arriving on a deep link; only on the site root
- [ ] Page content is present in the DOM behind it, not swapped in afterwards, so crawlers and
      no-JS visitors get the site with no gate at all
- [ ] Blinking respects reduced motion; the card itself still appears
- [ ] Dismissing it moves focus into the page, not back to the top of the document
- [ ] It does not measurably delay first contentful paint
