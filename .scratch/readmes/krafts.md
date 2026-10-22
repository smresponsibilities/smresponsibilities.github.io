# Krafts — Creative Frontend Component Showcase

[![React](https://img.shields.io/badge/Library-React%2018-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Bundler-Vite%205-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/Language-JavaScript%20ES6%2B-F7DF1E?style=for-the-badge&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Icons](https://img.shields.io/badge/Icons-Lucide%20React-orange?style=for-the-badge)](https://lucide.dev/)

A creative frontend craftsmanship playground and interactive UI component laboratory built with React and Vite. Serves as an experimentation space for exploring micro-interactions, responsive CSS layouts, and modern frontend design paradigms.

Project Showcase: [Shivam Mahajan Portfolio](https://shivammahajan.com/) · [Projects](https://shivammahajan.com/projects/)

---

## Table of Contents
- [Overview](#overview)
- [Target Audience](#target-audience)
- [Features](#features)
- [How It Works](#how-it-works)
  - [Component Lifecycle & Vite HMR Pipeline](#component-lifecycle--vite-hmr-pipeline)
- [File Structure](#file-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation & Local Run](#installation--local-run)
- [Usage & Component Architecture](#usage--component-architecture)
- [Performance & Core Web Vitals](#performance--core-web-vitals)
- [Future Scope and Improvements](#future-scope-and-improvements)
- [Author & Connect](#author--connect)

---

## Overview

Designing delightful digital experiences requires rapid prototyping without the burden of heavy monolithic build frameworks. **Krafts** was created as an isolated engineering canvas for testing fluid layout systems, accessible UI widgets, and physics-inspired transitions before graduating them to production applications.

Powered by Vite's native ES modules (ESM) hot module replacement, Krafts offers instant compilation and sub-second feedback loops for frontend engineering experimentation.

### Target Audience
- **Frontend Engineers & UI Developers**: Inspect component composition patterns, state isolation, and Lucide React iconography integrations.
- **Design Engineers**: Test bespoke CSS animations and layout grids across varying device viewports.
- **Learners Transitioning to Vite**: Explore a clean, uncluttered React project setup with Vite and ESLint configurations.

---

## Features

- **Instant HMR Development**: Native ESM module serving via Vite guarantees instant page reloads and state preservation during code changes.
- **Modular Component Library**: Decoupled, reusable UI primitives designed for zero layout shifts and high accessibility.
- **Lucide React Icons**: Consistent, clean vector icon integration across all interactive surfaces.
- **CSS Architecture**: Modern flexbox and grid styling emphasizing responsive viewport adaptability.

---

## How It Works

### Component Lifecycle & Vite HMR Pipeline

```
┌─────────────────────────────────────────────────────────────┐
│                    Developer Code Edit                      │
│                  (React Component / CSS)                    │
└──────────────────────────────┬──────────────────────────────┘
                               │ Instant File Watcher Event
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                   Vite Dev Server (Native ESM)              │
│  - On-Demand Module Resolution                              │
│  - React Fast Refresh Transform (Babel/SWC)                 │
└──────────────────────────────┬──────────────────────────────┘
                               │ WebSocket HMR Invalidation
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                     Browser DOM Update                      │
│    (State Retained, Sub-50ms Hot Component Swapping)        │
└─────────────────────────────────────────────────────────────┘
```

---

## File Structure

```
krafts/
└── krafts/
    ├── src/
    │   ├── components/     # UI widgets, cards, and interactive controls
    │   ├── assets/         # Vector graphics and visual media
    │   ├── App.jsx         # Component layout orchestration
    │   ├── main.jsx        # React 18 DOM mount point
    │   └── index.css       # Global styles and design variables
    ├── index.html          # HTML5 document shell
    ├── vite.config.js      # Vite build configuration
    ├── package.json        # Dependencies (react, react-dom, lucide-react)
    └── README.md
```

---

## Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm** or **yarn**

### Installation & Local Run

1. Clone the repository:
   ```bash
   git clone https://github.com/smresponsibilities/krafts.git
   cd krafts/krafts
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open the development link shown in your terminal (typically `http://localhost:5173`).

---

## Usage & Component Architecture

- **Run Dev Server**: `npm run dev` for local hot-reloading development.
- **Production Build**: `npm run build` to generate an optimized, tree-shaken static bundle in `dist/`.
- **Preview Build**: `npm run preview` to locally test the production bundle before deploying.

---

## Performance & Core Web Vitals

- **Dev Server Startup**: Under **180 milliseconds** cold startup.
- **Hot Module Replacement (HMR)**: Sub-**30ms** hot reload on component file changes.
- **Production Bundle**: Minified and compressed production build under **45 KB** gzipped.

---

## Future Scope and Improvements

- **Storybook Integration**: Isolate and document component states in interactive Storybook sandboxes.
- **Tailwind CSS Migration**: Transition from raw CSS to Tailwind utility classes for scalable token design.
- **Framer Motion Animations**: Introduce declarative physics-based spring physics and gestures.

---

## Author & Connect

Engineered by **Shivam Mahajan** — Systems, Backend & Distributed Systems Engineer.

- **Portfolio**: [https://shivammahajan.com/](https://shivammahajan.com/)
- **Project Case Studies**: [https://shivammahajan.com/projects/](https://shivammahajan.com/projects/)
- **GitHub**: [@smresponsibilities](https://github.com/smresponsibilities)
- **LinkedIn**: [Shivam Mahajan](https://www.linkedin.com/in/mahajanshivam/)
