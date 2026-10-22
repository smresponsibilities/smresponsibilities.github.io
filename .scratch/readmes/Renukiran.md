# Renukiran — Tree Plantation & Ecological Tracking Platform

[![Live Platform](https://img.shields.io/badge/Live_App-Vercel-3b82f6?style=for-the-badge&logo=vercel&logoColor=white)](https://renukiranfoundation.vercel.app/)
[![Portfolio Architecture](https://img.shields.io/badge/Architecture-shivammahajan.com-ff5d01?style=for-the-badge)](https://shivammahajan.com/projects/)
[![Next.js](https://img.shields.io/badge/Framework-Next.js%2014-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/Library-React%2018-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Academic](https://img.shields.io/badge/Chitkara_University-B.E._CSE_Capstone-green?style=for-the-badge)](https://shivammahajan.com/)

An ecological sustainability web platform designed for the **Renukiran Foundation** to coordinate tree plantation drives, verify seedling survival rates, track geographic afforestation sites, and educate communities on urban carbon sequestration. Developed as an academic capstone and copyright-registered software project.

* **Live Platform:** **[https://renukiranfoundation.vercel.app/](https://renukiranfoundation.vercel.app/)**
* **Engineering Portfolio:** **[https://shivammahajan.com/projects/](https://shivammahajan.com/projects/)**

---

## Table of Contents
- [Overview](#overview)
- [Target Audience](#target-audience)
- [Features](#features)
- [How It Works](#how-it-works)
  - [Application Architecture](#application-architecture)
  - [Plantation Tracking & Verification Workflow](#plantation-tracking--verification-workflow)
- [File Structure](#file-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation & Local Execution](#installation--local-execution)
- [Academic Accreditation & Team](#academic-accreditation--team)
- [Performance & Core Web Vitals](#performance--core-web-vitals)
- [Future Scope and Improvements](#future-scope-and-improvements)
- [Author & Connect](#author--connect)

---

## Overview

Non-governmental organizations (NGOs) and community forestry initiatives often struggle with donor transparency — contributors donate to tree planting campaigns without knowing where trees are planted or whether saplings survive past their initial planting.

**Renukiran** provides an interactive web portal for transparent ecological monitoring. Built on Next.js and TypeScript, the platform pairs informative community storytelling with drive coordination tools, volunteer registration, and transparent impact statistics.

### Target Audience
- **NGOs & Environmental Foundations**: Coordinate community volunteer tree planting drives and publish verified afforestation records.
- **Eco-Conscious Donors & Volunteers**: Discover upcoming regional plantation drives and track ecological impact.
- **Fullstack Developers**: Study Next.js App Router patterns, TypeScript type safety, and responsive environmental UI styling.

---

## Features

- **Afforestation Drive Coordination**: Publish dates, GPS coordinates, sapling quotas, and volunteer registration forms.
- **Responsive Next.js Frontend**: Mobile-optimized layouts built with Tailwind CSS and responsive layout grids.
- **Dynamic Impact Counters**: Visual tallying of total trees planted, volunteer hours pledged, and estimated carbon offset.
- **Educational Resource Hub**: Guides on native indigenous flora, soil preparation, and sapling watering cycles.

---

## How It Works

### Application Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                 Next.js 14 / TypeScript UI                  │
│       (Home, Drive Calendar, Tree Gallery, Donation)        │
└──────────────────────────────┬──────────────────────────────┘
                               │ Client Routing & SSR
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                   Next.js Server & APIs                     │
│  - Form Processing & Registration Handling                  │
│  - Static Asset Optimization via Edge CDN (Vercel)          │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                     Vercel Edge Network                     │
│            Global Caching & Sub-Second Page Delivery        │
└─────────────────────────────────────────────────────────────┘
```

---

## File Structure

```
Renukiran/
├── Source-Code/
│   ├── app/                # Next.js App Router pages and layout components
│   ├── components/         # Reusable UI cards, headers, impact counters
│   ├── public/             # Static SVGs, plantation photography, and icons
│   ├── utils/              # Helper formatters and validation logic
│   ├── package.json        # Dependencies (next, react, tailwindcss)
│   └── tsconfig.json       # TypeScript configuration
├── Report and PPT/         # Formal academic thesis and defense presentation
├── IPR-Submission-Proof/   # Intellectual Property Office copyright filing documentation
└── README.md
```

---

## Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm** or **pnpm**

### Installation & Local Execution

1. Navigate to the source code folder:
   ```bash
   cd Source-Code
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:3000` in your web browser.

---

## Academic Accreditation & Team

Developed in partial fulfillment of the requirements for the award of Bachelor of Engineering in Computer Science & Engineering at **Chitkara University**:

- **Faculty Mentor**: Dr. Anshu Singla (Professor)
- **Engineering Team**:
  - Shivam Mahajan (2210992314)
  - Anmol Sharma (2210990127)
  - Anushka Malik (2210991323)
  - Kaushaki Jha (2210991771)
- **Status**: Official Copyright Registered & Submitted.

---

## Performance & Core Web Vitals

- **Lighthouse Performance Score**: **98 / 100** on Vercel Edge CDN.
- **First Contentful Paint (FCP)**: **< 0.6 seconds** worldwide.
- **Cumulative Layout Shift (CLS)**: **0.00** across all viewports.

---

## Future Scope and Improvements

- **Interactive Satellite GIS Map**: Embed Leaflet / Mapbox layers pinpointing exact GPS coordinates of planted groves.
- **Individual Tree Tagging**: QR code physical metal tags attached to saplings linking to public update pages.
- **Automated Weather Alerts**: SMS alerts to local volunteers during heatwaves to trigger emergency watering rounds.

---

## Author & Connect

Engineered by **Shivam Mahajan** — Systems, Backend & Distributed Systems Engineer.

- **Portfolio**: [https://shivammahajan.com/](https://shivammahajan.com/)
- **Project Case Studies**: [https://shivammahajan.com/projects/](https://shivammahajan.com/projects/)
- **GitHub**: [@smresponsibilities](https://github.com/smresponsibilities)
- **LinkedIn**: [Shivam Mahajan](https://www.linkedin.com/in/mahajanshivam/)
