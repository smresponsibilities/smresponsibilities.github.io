# SM'S DEX — Pokédex Developer Portfolio

[![Live Site](https://img.shields.io/badge/Live_Site-shivammahajan.com-3b82f6?style=flat&logo=googlechrome&logoColor=white)](https://shivammahajan.com/)
[![Astro SSG](https://img.shields.io/badge/Built_With-Astro_5-ff5d01?style=flat&logo=astro&logoColor=white)](https://astro.build/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Web Audio API](https://img.shields.io/badge/Audio-Web_Audio_API_(0KB)-00b4d8?style=flat)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
[![Tests Passing](https://img.shields.io/badge/Ahrefs_SEO_Tests-17%2F17_Passing-success?style=flat)](https://shivammahajan.com/)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

An open-source, nostalgic Pokédex-themed developer portfolio for **[Shivam Mahajan](https://shivammahajan.com/)**. Built with zero default client-side JavaScript overhead, native Web Audio chiptune synthesis, and a community developer roster automated via GitHub Actions CI.

Explore the live portfolio at **[shivammahajan.com](https://shivammahajan.com/)**.

---

## Architecture & Engineering Highlights

* **Zero-JS Static Baseline:** Every casing, generation screen, table, and timeline renders to semantic, accessible static HTML and CSS via Astro SSG. Instant Largest Contentful Paint (LCP) and zero layout shift (CLS: 0.0).
* **0KB Chiptune Sound Synthesizer:** Button clicks, selection chimes, and handheld error tones are synthesized in real-time in under 15 lines of vanilla JavaScript via native browser oscillator nodes (`Web Audio API`). Zero external MP3 or WAV dependencies.
* **Automated Community Roster:** Visitors can submit a developer Pokémon character via an on-site form. A GitHub Actions workflow intercepts qualifying issues, runs strict JSON Schema validation, and opens an automated pull request for maintainer review.
* **1001 / 2002 Days of Code Challenge:** An auto-updating daily engineering journal spanning 1,246+ consecutive days, 2,670+ verified algorithmic solutions (LeetCode & Codeforces), and comprehensive systems write-ups.

---

## Featured Projects & Case Studies

| Project | Stack | Description | Case Study Link |
|---|---|---|---|
| **SM'S DEX** | Astro, TypeScript, Web Audio | Pokédex developer portfolio with 9 handheld generation themes | [Architecture Breakdown ↗](https://shivammahajan.com/projects/sm-dex/) |
| **Productivity Caller** | Kotlin, Jetpack Compose | Native Android reminder app replacing push notifications with automated calls | [Technical Case Study ↗](https://shivammahajan.com/projects/productivity-caller/) · [Alternatives Matrix ↗](https://shivammahajan.com/projects/productivity-caller-vs-alternatives/) · [Web Simulator ↗](https://shivammahajan.com/productivity-caller-simulator/) |
| **Flight Sun Tracker** | TypeScript, Canvas | Solar elevation & passenger window seat shade calculator along great-circle routes | [Solar Math Case Study ↗](https://shivammahajan.com/projects/flight-sun-tracker/) · [GitHub Repo ↗](https://github.com/smresponsibilities/flight-sun-tracker) |
| **ClickHouse Ingestion Tool** | TypeScript, SQL, ClickHouse | High-throughput bidirectional CSV <-> ClickHouse OLAP data pipeline | [Explore Portfolio ↗](https://shivammahajan.com/projects/) |
| **Clickless** | Rust, Win32 / macOS Hooks | Mouseless grid-based pointer controller for full keyboard workstation navigation | [Explore Portfolio ↗](https://shivammahajan.com/projects/) |

---

## Quick Navigation

* **[Live Portfolio Homepage](https://shivammahajan.com/)** — Interactive generational Pokédex device.
* **[Projects Directory](https://shivammahajan.com/projects/)** — Full engineering project catalog.
* **[Engineering Resume](https://shivammahajan.com/resume/)** — Morgan Stanley experience, skills, and dynamic DSA metrics.
* **[Days of Code Journal](https://shivammahajan.com/blog/)** — Multi-year daily engineering log and algorithmic solutions.
* **[Complete Coding Timeline](https://shivammahajan.com/blog/timeline/)** — Interactive scrollable chronological streak timeline.

---

## Running Locally

```bash
# Clone the repository
git clone https://github.com/smresponsibilities/smresponsibilities.github.io.git
cd smresponsibilities.github.io

# Install dependencies
npm install

# Start local Astro development server
npm run dev

# Run full Ahrefs/SEO verification test suite
npm test

# Build production static bundle
npm run build
```

---

## Author

**Shivam Mahajan**  
Software Developer & Systems Builder  
* Website: [shivammahajan.com](https://shivammahajan.com/)
* LinkedIn: [linkedin.com/in/mahajanshivam](https://www.linkedin.com/in/mahajanshivam/)
* Peerlist: [peerlist.io/shivammahajan](https://peerlist.io/shivammahajan)
* Dev.to: [dev.to/shivammahajan](https://dev.to/shivammahajan)

---

## Credits & Attribution

* **[Pokémon Cards CSS](https://github.com/simeydotme/pokemon-cards-css):** Holographic foil finishes, card surface recipes, textures, and 3D tilt interaction patterns adapted from [simeydotme/pokemon-cards-css](https://github.com/simeydotme/pokemon-cards-css) by [Simon Goellner](https://github.com/simeydotme) under the [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0).

---

## License

This project is licensed under the [GNU General Public License v3.0](LICENSE) (GPL-3.0) — see the [LICENSE](LICENSE) file for the full text.

Portions adapted from [pokemon-cards-css](https://github.com/simeydotme/pokemon-cards-css) © 2022 Simon Goellner (GPL-3.0).
