# Postie — Browser-Based API Testing Client

[![Live Interactive App](https://img.shields.io/badge/Live_App-shivammahajan.com%2FPostie-3b82f6?style=flat&logo=googlechrome&logoColor=white)](https://shivammahajan.com/Postie/)
[![Portfolio Architecture](https://img.shields.io/badge/Architecture-shivammahajan.com%2Fprojects-ff5d01?style=flat)](https://shivammahajan.com/projects/)
[![Author](https://img.shields.io/badge/Author-Shivam_Mahajan-success?style=flat)](https://shivammahajan.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A zero-install, lightweight browser-based API testing client and Postman alternative. Allows developers to dispatch HTTP requests (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`), manage query parameters and custom headers, inspect formatted responses, and persist request history locally in browser storage.

* **Launch Live App:** **[https://shivammahajan.com/Postie/](https://shivammahajan.com/Postie/)**
* **Engineering Portfolio:** **[https://shivammahajan.com/projects/](https://shivammahajan.com/projects/)**

---

## Table of Contents
- [Demo](#demo)
- [Overview](#overview)
- [Target Audience](#target-audience)
- [Features](#features)
- [Screenshots](#screenshots)
- [How It Works](#how-it-works)
  - [Architecture & Request Execution Pipeline](#architecture--request-execution-pipeline)
  - [Client-Side History & Storage Model](#client-side-history--storage-model)
- [File Structure](#file-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Running Locally](#running-locally)
- [Usage](#usage)
  - [Sending HTTP Requests](#sending-http-requests)
  - [Managing Headers and Query Parameters](#managing-headers-and-query-parameters)
  - [Viewing and Replaying History](#viewing-and-replaying-history)
- [Performance & Footprint Benchmarks](#performance--footprint-benchmarks)
- [Future Scope and Improvements](#future-scope-and-improvements)
- [Author & Connect](#author--connect)

---

## Demo

![Postie Interactive Demo](assets/readme/demo.gif)

---

## Overview

Desktop API tools like Postman and Insomnia have grown increasingly resource-heavy, often consuming gigabytes of system memory, requiring mandatory account logins, and cluttering workflows with enterprise collaboration features.

**Postie** is a client-side alternative built using standard browser APIs (`fetch`, `localStorage`). It runs entirely inside the browser with zero installation, zero account requirements, and zero background telemetry.

### Target Audience
- **Frontend & Fullstack Developers**: Rapidly test REST endpoints and CORS configurations without leaving browser tabs.
- **Students & Web Learners**: Understand how HTTP request methods, headers, query parameters, and payloads function under the hood.
- **Lightweight System Enthusiasts**: Developers working on constrained laptops, Chromebooks, or mobile environments who need an instant API tester.

---

## Features

- **Multi-Method Support**: Full support for `GET`, `POST`, `PUT`, `PATCH`, and `DELETE` requests.
- **Dynamic Headers & Query Parameters**: Key-value pair editors for appending authorization tokens, content types, and query arguments.
- **Payload Editor**: Structured JSON and plain text request body editor with line numbers and syntax validation.
- **Response Inspection**: Dual-panel viewer displaying formatted JSON response bodies, HTTP status codes (`200 OK`, `404 Not Found`), response latency, and headers.
- **Persistent Local History**: Stores recent requests in browser `localStorage`, with search, filter, and one-click replay capabilities.
- **Responsive Dark Theme**: Modern dark aesthetic designed for long coding sessions.

---

## How It Works

### Architecture & Request Execution Pipeline

```
┌─────────────────────────────────────────────────────────────┐
│                       Postie Web UI                         │
│   (Method Selector, URL Bar, Header/Param Grid, JSON Body)  │
└──────────────────────────────┬──────────────────────────────┘
                               │ Click "Send"
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                    Request Orchestrator                     │
│  - URL & Query Parameter Serialization                      │
│  - Header Normalization (Bearer Auth, Content-Type)         │
│  - Performance Timer (Performance.now() Delta)              │
└──────────────────────────────┬──────────────────────────────┘
                               │ Fetch API
                               ▼
┌──────────────────────────────┐ ┌────────────────────────────┐
│      Target Remote API       │ │    Browser LocalStorage    │
│  (e.g., REST / GraphQL API)  │ │   (Timestamp, URL, Status) │
└──────────────────────────────┘ └────────────────────────────┘
```

### Client-Side History & Storage Model

Requests are stored in `localStorage` under the key `api_request_history` as an array of JSON objects:

```json
{
  "id": "req_1729012345",
  "method": "POST",
  "url": "https://api.example.com/endpoint",
  "headers": { "Content-Type": "application/json" },
  "body": "{ \"query\": \"test\" }",
  "timestamp": "2026-10-15T02:00:00Z",
  "status": 200,
  "elapsedMs": 42
}
```

---

## File Structure

```
Postie/
├── assets/
│   └── readme/         # Demo screenshots
├── scripts/
│   ├── script.js       # Main request builder, Fetch API caller, and response formatter
│   └── history.js      # LocalStorage retrieval, search filtering, and replay
├── styles/
│   ├── styles.css      # Dark theme UI styles, grid layouts, and buttons
│   └── history.css     # Request history card and modal styles
├── history.html        # Historical requests view
├── index.html          # Main application interface
└── README.md
```

---

## Getting Started

### Prerequisites

- Any modern web browser (Chrome, Firefox, Safari, Edge, Brave).
- No Node.js or build system required!

### Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/smresponsibilities/Postie.git
   cd Postie
   ```
2. Open `index.html` directly in your browser:
   - On Windows: Double-click `index.html` or run `start index.html`
   - On macOS: Run `open index.html`
   - On Linux: Run `xdg-open index.html`

Or serve via Python's built-in HTTP server:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000`.

---

## Usage

### Sending HTTP Requests
1. Enter the target endpoint URL in the address bar.
2. Select your HTTP verb (`GET`, `POST`, `PUT`, `DELETE`).
3. For `POST` or `PUT`, click the **Body** tab and input your JSON payload.
4. Click **Send** to dispatch the network request.
5. Inspect the returned status code, response time (ms), and JSON output.

### Managing Headers and Query Parameters
1. Click the **Params** or **Headers** tab.
2. Add key-value pairs (e.g., `Authorization: Bearer <token>` or `limit: 20`).
3. Query parameters automatically synchronize with the URL bar.

### Viewing and Replaying History
1. Click the **History** button in the header.
2. Search through past endpoints or filter by method (`POST`, `GET`).
3. Click any historic record to immediately repopulate the main editor for re-submission.

---

## Screenshots

![Postie Main Interface](assets/readme/image.png)
*Figure 1: Main request editor with HTTP verb dropdown and endpoint bar.*

![Query Parameter and Header Management](assets/readme/image-1.png)
*Figure 2: Key-value editor for request headers and URL parameters.*

![Structured Request Payload Editor](assets/readme/image-2.png)
*Figure 3: JSON payload editor with line numbering.*

![Response Inspector and Network Latency](assets/readme/image-3.png)
*Figure 4: Formatted response inspector with status code and round-trip timing.*

![Persistent Local Storage History](assets/readme/image-4.png)
*Figure 5: LocalStorage request history drawer with search and replay.*

---

## Performance & Footprint Benchmarks

- **Zero Runtime Dependencies**: 0 npm packages, 0 external runtime libraries.
- **Bundle Footprint**: Entire client application size is under **35 KB** uncompressed.
- **Cold Boot Time**: Renders in under **8 milliseconds** in modern browser engines.
- **Memory Footprint**: Average browser tab heap footprint < **12 MB**.

---

## Future Scope and Improvements

- **CORS Proxy Fallback**: Optional CORS unblocking proxy toggle for testing APIs that omit permissive cross-origin headers.
- **cURL Importer / Exporter**: Paste raw cURL commands to auto-generate request fields, or export any configured request as cURL.
- **Environment Variables**: Define reusable workspace variables (e.g., `{{baseUrl}}`, `{{apiKey}}`).
- **GraphQL Query Support**: Dedicated query and variables editor with syntax validation.

---

## Author & Connect

Engineered by **[Shivam Mahajan](https://shivammahajan.com/)** — Systems, Backend & Distributed Systems Engineer.

- **Live Tool:** [https://shivammahajan.com/Postie/](https://shivammahajan.com/Postie/)
- **Engineering Portfolio:** [https://shivammahajan.com/](https://shivammahajan.com/)
- **Software Catalog:** [https://shivammahajan.com/projects/](https://shivammahajan.com/projects/)
- **GitHub:** [@smresponsibilities](https://github.com/smresponsibilities)
- **LinkedIn:** [Shivam Mahajan](https://www.linkedin.com/in/mahajanshivam/)
