# Acme Financial Invoicing & Analytics Dashboard

[![Live Demo](https://img.shields.io/badge/Live_App-Vercel-3b82f6?style=for-the-badge&logo=vercel&logoColor=white)](https://firstnextappthatisdashboard.vercel.app)
[![Portfolio Architecture](https://img.shields.io/badge/Architecture-shivammahajan.com-ff5d01?style=for-the-badge)](https://shivammahajan.com/projects/)
[![Next.js](https://img.shields.io/badge/Framework-Next.js%2014-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

A fullstack financial management dashboard and invoicing platform built with Next.js App Router. Features server-rendered revenue visualizations, paginated invoice search and filtering, database-backed CRUD mutations, and optimistic UI streaming.

* **Live Demo:** **[https://firstnextappthatisdashboard.vercel.app](https://firstnextappthatisdashboard.vercel.app)**
* **Engineering Portfolio:** **[https://shivammahajan.com/projects/](https://shivammahajan.com/projects/)**

---

## Table of Contents
- [Overview](#overview)
- [Target Audience](#target-audience)
- [Features](#features)
- [How It Works](#how-it-works)
  - [Server Component Streaming & Data Fetching Architecture](#server-component-streaming--data-fetching-architecture)
- [File Structure](#file-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation & Local Run](#installation--local-run)
- [Usage & Core Views](#usage--core-views)
- [Performance & Core Web Vitals](#performance--core-web-vitals)
- [Future Scope and Improvements](#future-scope-and-improvements)
- [Author & Connect](#author--connect)

---

## Overview

Traditional financial web apps often suffer from waterfall request latency, where loading spinners block the entire screen until every chart, invoice row, and summary card resolves. 

**Acme Dashboard** uses Next.js App Router and React Server Components (RSC) to solve this through granular streaming. Critical metrics and navigation shells render instantly on the edge, while heavy chart computations stream asynchronously using React `<Suspense>` boundaries.

### Target Audience
- **Small Business Owners & Freelancers**: Track unpaid customer invoices, collect payments, and visualize monthly revenue trends.
- **Frontend & Fullstack Developers**: Master React Server Components (RSC), URL search state management, and Server Actions for data mutations.
- **Web Engineers**: Study accessibility-compliant form handling, optimistic UI updates, and Tailwind UI integration.

---

## Features

- **Granular Suspense Streaming**: Skeleton placeholders stream independently for revenue charts and invoice tables without blocking page navigation.
- **URL-Driven Search & Pagination**: Debounced search inputs and pagination state stored directly in browser search parameters (`?query=...&page=...`) for shareable bookmarks.
- **Server Actions for Invoices**: Type-safe form mutations with Zod schema validation and automated path revalidation (`revalidatePath`).
- **Revenue Analytics**: Monthly income visualizer mapping collected cash flow versus outstanding balances.

---

## How It Works

### Server Component Streaming & Data Fetching Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                 Client Navigation Request                   │
│                    (`/dashboard/invoices`)                  │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│              Next.js Edge Server (RSC Engine)               │
│  1. Instantly streams root Layout + Sidebar Navigation       │
│  2. Suspends `<RevenueChart />` & `<LatestInvoices />`       │
└──────────────────────────────┬──────────────────────────────┘
                               │ Parallel Async SQL Queries
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                     PostgreSQL Database                     │
│               `revenue`, `invoices`, `customers`            │
└──────────────────────────────┬──────────────────────────────┘
                               │ Streamed HTML Chunks
                               ▼
┌─────────────────────────────────────────────────────────────┐
│              Client Browser UI Re-render                    │
│      (Seamless hydration with zero layout shift)            │
└─────────────────────────────────────────────────────────────┘
```

---

## File Structure

```
nextfirst/
├── app/                    # Next.js App Router (Layouts, Invoices, Customers, Auth)
│   ├── dashboard/          # Protected dashboard views
│   ├── lib/                # Database clients, data definitions, and server actions
│   └── ui/                 # Reusable cards, revenue charts, and skeleton loaders
├── public/                 # Static branding assets and icons
├── scripts/                # Database seeding utilities
├── tailwind.config.ts      # Tailwind design tokens
├── package.json            # Next.js 14, React 18, Tailwind CSS
└── README.md
```

---

## Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm** or **pnpm**
- **PostgreSQL**: Local instance or Vercel Postgres connection string

### Installation & Local Run

1. Clone the repository:
   ```bash
   git clone https://github.com/smresponsibilities/nextfirst.git
   cd nextfirst
   npm install
   ```
2. Configure `.env`:
   ```env
   POSTGRES_URL=your_postgres_connection_string
   ```
3. Seed sample data:
   ```bash
   npm run seed
   ```
4. Start the server:
   ```bash
   npm run dev
   ```
5. Access the application at `http://localhost:3000`.

---

## Usage & Core Views

- **Dashboard**: High-level overview of total paid invoices, pending revenue, and recent customer activity.
- **Invoices**: Create, edit, and delete customer invoices with automated currency formatting and status toggling (`pending` vs `paid`).
- **Customers**: Review customer profiles, total transaction volume, and current outstanding balances.

---

## Performance & Core Web Vitals

- **First Contentful Paint (FCP)**: **< 0.5s** via Edge SSR.
- **Cumulative Layout Shift (CLS)**: **0.00** using exact skeleton bounds.
- **Lighthouse Performance**: **99 / 100** on Vercel Edge.

---

## Future Scope and Improvements

- **Stripe Payment Gateway**: Embed Stripe Checkout sessions to allow customers to pay invoices online.
- **Automated PDF Invoicing**: One-click generation of printable PDF invoice receipts.
- **Multi-Tenant Organizations**: Support switching between multiple business entities under a single login.

---

## Author & Connect

Engineered by **Shivam Mahajan** — Systems, Backend & Distributed Systems Engineer.

- **Portfolio**: [https://shivammahajan.com/](https://shivammahajan.com/)
- **Project Case Studies**: [https://shivammahajan.com/projects/](https://shivammahajan.com/projects/)
- **GitHub**: [@smresponsibilities](https://github.com/smresponsibilities)
- **LinkedIn**: [Shivam Mahajan](https://www.linkedin.com/in/mahajanshivam/)
