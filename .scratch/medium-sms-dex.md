# Building a Pokédex Developer Portfolio in Astro with Zero Audio Files

*How I replaced typical PokeAPI tutorial clones with Astro SSG, zero-dependency Web Audio chiptune synthesis, and an automated GitHub CI community roster.*

---

**Canonical URL:** `https://shivammahajan.com/projects/sm-dex/`  
*(In Medium: Story settings -> Advanced Settings -> "Customize canonical link" -> Enter URL above)*

---

Developer portfolios have become predictable. Most fall into two camps: minimalist bento grids with animated gradient borders, or PokeAPI tutorial clones that fetch random sprites in a client-heavy React single-page app.

When designing **[SM'S DEX](https://shivammahajan.com/projects/sm-dex/)**, my developer portfolio, I wanted to build an authentic handheld gaming aesthetic without compromising modern web engineering standards or shipping bloated audio assets.

Here is the architectural breakdown of how it was built using **Astro**, **native Web Audio API chiptunes (0KB external files)**, and an **open community roster powered by automated GitHub Actions CI**.

---

## 1. Zero-JS Baseline: Why Astro Beats Client SPAs

Most interactive portfolio concepts default to client-side frameworks like Next.js or Vite SPAs. For a handheld console UI, that usually results in loading spinners while client-side bundles parse.

SM'S DEX uses **Astro SSG**:
- **Pure Semantic HTML:** The physical casing, screens, buttons, menus, and typography render to static HTML and CSS during the build step.
- **Instant Paint:** Zero layout shift (CLS: 0.0) and rapid Largest Contentful Paint (LCP) even on budget mobile devices.
- **Selective Hydration:** Only interactive elements (chiptune audio synthesizer, theme switcher, search filters) load lightweight client islands.

---

## 2. Zero-Asset Sound Effects via Web Audio API

Sound is essential for authentic handheld nostalgia, but bundling MP3 or WAV audio clips introduces network waterfalls and mobile audio playback latency.

SM'S DEX solves this by using **pure mathematical Web Audio synthesis (0KB audio files)**. Every button press, screen chime, and error tone is generated in real-time using native browser oscillator nodes:

```javascript
// Native chiptune tone synthesizer in <15 lines of vanilla JavaScript
function playDexChime(audioCtx) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = 'square'; // Classic 8-bit handheld square wave
  osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
  osc.frequency.setValueAtTime(880.00, audioCtx.currentTime + 0.08); // A5

  gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start();
  osc.stop(audioCtx.currentTime + 0.25);
}
```

- **Audio File Size:** Exactly **0 KB**.
- **Playback Latency:** Instantaneous hardware trigger with zero network overhead.
- **Accessibility:** Strictly respects `prefers-reduced-motion` and user audio preferences (muted by default).

---

## 3. The Open-Roster Engine: Turning GitHub Issues into Pull Requests

Instead of a closed static showcase, SM'S DEX features an **open community roster** where any developer can register as a Pokémon character.

Rather than maintaining a vulnerable external database, the entire roster is driven by **automated GitHub Actions CI**:

1. **Submission Form:** The form on [shivammahajan.com](https://shivammahajan.com/) opens a prefilled GitHub Issue with required fields (GitHub handle, species, types, height, weight, custom dex entry).
2. **Automated Validation:** A GitHub Actions workflow runs a strict JSON Schema validator preventing stat overflows, malformed types, or malicious markup.
3. **Automated PR Generation:** Valid submissions are written directly to `src/data/roster.json` in an automated pull request branch.
4. **Transparent Audit Trail:** The entire community roster lives committed directly in Git, providing a tamper-proof history.

---

## Exploring the Project

* **Live Pokédex Device:** [shivammahajan.com](https://shivammahajan.com/)
* **Full Architecture Case Study:** [shivammahajan.com/projects/sm-dex/](https://shivammahajan.com/projects/sm-dex/)
* **Community Roster Deep Dive:** [How the SM'S DEX Roster Works](https://shivammahajan.com/blog/how-the-sm-dex-roster-works/)
* **Open Source Repository:** [github.com/smresponsibilities/smresponsibilities.github.io](https://github.com/smresponsibilities/smresponsibilities.github.io)

---

*Author: [Shivam Mahajan](https://shivammahajan.com/) — Software Engineer & Creator of SM'S DEX.*
