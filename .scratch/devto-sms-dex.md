---
title: Building a Pokédex Developer Portfolio in Astro with 0KB Audio Assets
published: true
description: Why I replaced the typical PokeAPI clone with an Astro static site, zero-dependency Web Audio chiptune synthesis, and automated GitHub Actions community roster.
tags: webdev, astro, javascript, opensource
canonical_url: https://shivammahajan.com/projects/sm-dex/
---

Developer portfolios have become predictable. Most follow one of two patterns:
1. A minimal template with generic bento grids and animated gradients.
2. A PokeAPI tutorial clone fetching Pokémon sprites via a client-side React SPA that stutters on mobile and loads 2MB of bloated MP3 assets for basic button clicks.

When designing **[SM'S DEX](https://shivammahajan.com/projects/sm-dex/)**, my personal developer portfolio, I wanted to prove that you can build an authentic, nostalgic handheld gaming interface without compromising modern web performance or shipping synthetic bloat.

Here is how I built it using **Astro**, **native Web Audio API chiptunes (0KB external audio)**, and an **automated GitHub Actions CI community roster**.

---

## 1. Zero-JS Baseline: Why Astro Won Over React

Most interactive portfolio concepts default to client-side frameworks like Next.js or Vite SPAs. For a Pokédex layout, this usually means rendering a spinner while an API call resolves.

Instead, SM'S DEX is built on **Astro SSG**:
- **Zero Client Overhead:** The base casing, menus, tables, and typography render to 100% static semantic HTML and CSS during the build step.
- **Instant Paint:** Zero layout shift (CLS: 0.0) and instant Largest Contentful Paint (LCP) even on budget mobile browsers.
- **Selective Hydration:** Only interactive controls (sound toggle, generational device casing switches, search filters) load lightweight client islands.

---

## 2. Zero-Asset Sound Effects via Web Audio API

Audio gives classic handhelds their charm, but bundling MP3 or WAV audio clips introduces unwanted network waterfalls and mobile audio playback lag.

To solve this, SM'S DEX uses **pure mathematical Web Audio synthesis (0KB assets)**. Every button click, dex entry chime, and error tone is generated in real-time by manipulating oscillator nodes:

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
- **Latency:** Instantaneous hardware trigger with zero network fetch.
- **Accessibility:** Sound is disabled by default and strictly honors `prefers-reduced-motion` and user audio preferences.

---

## 3. The Open-Roster Engine: Turning GitHub Issues into Pull Requests

Instead of keeping the portfolio as a closed static billboard, SM'S DEX features an **open community roster** where anyone can become a registered Pokémon character.

Rather than running a traditional backend database (which invites spam and SQL injections), the roster is entirely powered by **GitHub Actions CI**:

```mermaid
flowchart LR
    A["User submits form on site"] --> B["Opens structured GitHub Issue"]
    B --> C["GitHub Actions CI intercepts issue"]
    C --> D["Validates parameters against JSON Schema"]
    D --> E["Generates roster entry & opens PR"]
    E --> F["Maintainer review & one-click merge"]
    F --> G["Astro static rebuild & auto-deploy"]
```

1. **Submission Form:** The form on [shivammahajan.com](https://shivammahajan.com/) opens a prefilled GitHub Issue with required fields (GitHub handle, species, types, height, weight, custom dex entry).
2. **Automated Validation:** A GitHub Actions workflow runs a strict JSON Schema validator preventing stat overflows, malformed types, or malicious markup.
3. **Automated PR Generation:** Valid submissions are written directly to `src/data/roster.json` in an automated pull request branch.
4. **Transparent Audit Trail:** The entire community roster lives committed directly in Git, providing a tamper-proof history.

---

## 4. Multi-Generational Design Tokens

A key visual goal was supporting themes inspired by different handheld eras (Game Boy monochromatic green, Game Boy Color red/blue, Game Boy Advance dark indigo, and modern DS screens).

We structured this through scoped CSS custom properties:
- Fluid font sizes clamped without external CSS frameworks.
- Authentic LCD grid overlays achieved via pure CSS repeating linear gradients.
- Pixel-perfect borders using `box-shadow` techniques that scale crisply on high-DPI retina screens.

---

## Exploring the Architecture

* **Live Pokédex Device:** [shivammahajan.com](https://shivammahajan.com/)
* **Full Architecture Case Study:** [shivammahajan.com/projects/sm-dex/](https://shivammahajan.com/projects/sm-dex/)
* **Community Roster Deep Dive:** [How the SM'S DEX Roster Works](https://shivammahajan.com/blog/how-the-sm-dex-roster-works/)
* **Open Source Repository:** [github.com/smresponsibilities/smresponsibilities.github.io](https://github.com/smresponsibilities/smresponsibilities.github.io)

---

*Author: [Shivam Mahajan](https://shivammahajan.com/) — Software Engineer & Creator of SM'S DEX.*
