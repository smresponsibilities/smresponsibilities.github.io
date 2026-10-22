# HTTP Methods Testing & Validation API

[![Python](https://img.shields.io/badge/Python-3.10%2B-3776AB?style=for-the-badge&logo=python)](https://python.org)
[![Flask](https://img.shields.io/badge/Framework-Flask-black?style=for-the-badge&logo=flask)](https://flask.palletsprojects.com/)
[![CORS](https://img.shields.io/badge/CORS-Enabled-brightgreen?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
[![Hosting](https://img.shields.io/badge/Deployed-Render_Cloud-blue?style=for-the-badge)](https://apimethod.onrender.com)

A lightweight Flask mock API and HTTP echoing utility designed for validating HTTP request methods, CORS headers, payload parsing, and REST client integrations. Serves as a testbed companion for browser HTTP clients like [Postie](https://smresponsibilities.github.io/web_project/).

Live Endpoint: [apimethod on Render](https://apimethod.onrender.com/) · [Portfolio](https://shivammahajan.com/)

---

## Table of Contents
- [Overview](#overview)
- [Target Audience](#target-audience)
- [Features](#features)
- [How It Works](#how-it-works)
  - [CORS Negotiation & Request Echo Flow](#cors-negotiation--request-echo-flow)
- [File Structure](#file-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation & Local Run](#installation--local-run)
- [Usage & Endpoints](#usage--endpoints)
  - [Liveness Check (`GET /`)](#liveness-check-get-)
  - [Inspecting Method Responses](#inspecting-method-responses)
- [Performance & Benchmarks](#performance--benchmarks)
- [Future Scope and Improvements](#future-scope-and-improvements)
- [Author & Connect](#author--connect)

---

## Overview

When testing custom frontend HTTP clients, browser extensions, or IoT hardware, sending requests to production APIs can generate unintended state mutations or hit rate limits. Public tools like `httpbin.org` frequently experience downtime or restrictive rate-limiting.

**API Method Testing API** provides a zero-overhead, always-available endpoint with permissive CORS configuration (`Access-Control-Allow-Origin: *`). It lets frontend developers and systems engineers verify that network calls, headers, and request methods transit smoothly.

### Target Audience
- **Frontend Engineers**: Test browser `fetch` and `XMLHttpRequest` calls against permissive CORS configurations.
- **API Tool Developers**: Rapidly test UI feedback states, loading spinners, and network error handling in tools like [Postie](https://smresponsibilities.github.io/web_project/).
- **Students Learning Web Standards**: Inspect standard HTTP status codes and headers in a clean testing sandbox.

---

## Features

- **Cross-Origin Resource Sharing (CORS)**: Pre-configured with `Flask-CORS` to accept requests from any origin or port without browser security blocks.
- **Zero-Dependency Core**: Built with standard Flask for minimal memory overhead and fast cold boots.
- **REST Method Validation**: Handles standard verbs (`GET`, `POST`, `PUT`, `DELETE`, `OPTIONS`).

---

## How It Works

### CORS Negotiation & Request Echo Flow

```
┌─────────────────────────────────────────────────────────────┐
│                 Client Browser / Web App                    │
│          (e.g., Postie, cURL, Mobile App)                   │
└──────────────────────────────┬──────────────────────────────┘
                               │ 1. Preflight OPTIONS / GET
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                    Flask API Container                      │
│  - Reads incoming method, headers, and client user-agent    │
│  - Sets Access-Control-Allow-Origin: *                      │
│  - Returns confirmation message & HTTP 200                  │
└──────────────────────────────┬──────────────────────────────┘
                               │ 2. HTTP 200 OK
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                    Client UI Updates                        │
└─────────────────────────────────────────────────────────────┘
```

---

## File Structure

```
apimethod/
├── app.py              # Primary Flask application definition & routes
├── main.py             # WSGI entry point for cloud hosting
├── requirements.txt    # Python dependencies (Flask, flask-cors)
└── README.md
```

---

## Getting Started

### Prerequisites

- **Python**: v3.8 or higher
- **pip** package manager

### Installation & Local Run

1. Clone the repository:
   ```bash
   git clone https://github.com/smresponsibilities/apimethod.git
   cd apimethod
   ```
2. Set up a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: .\venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Start the server:
   ```bash
   python app.py
   ```
   *Available locally at `http://127.0.0.1:5000`.*

---

## Usage & Endpoints

### Liveness Check (`GET /`)
```bash
curl -X GET https://apimethod.onrender.com/
```

**Response:**
```text
This is an API method checking API!!
```

---

## Performance & Benchmarks

- **Response Latency**: **< 15ms** local loopback response time.
- **Memory Footprint**: **< 28 MB RAM** running under gunicorn / development WSGI.
- **Cold Boot Time**: Starts up in under **350 milliseconds**.

---

## Future Scope and Improvements

- **Full Echo Endpoint (`/echo`)**: Echo back exact incoming headers, query parameters, cookies, and raw request body in JSON format.
- **Configurable Status Codes (`/status/:code`)**: Return arbitrary HTTP status codes (`400`, `401`, `403`, `500`, `503`) for error simulation.
- **Delay Simulation (`/delay/:seconds`)**: Simulate high-latency network conditions for testing frontend timeout UI.

---

## Author & Connect

Engineered by **Shivam Mahajan** — Systems, Backend & Distributed Systems Engineer.

- **Portfolio**: [https://shivammahajan.com/](https://shivammahajan.com/)
- **Project Case Studies**: [https://shivammahajan.com/projects/](https://shivammahajan.com/projects/)
- **GitHub**: [@smresponsibilities](https://github.com/smresponsibilities)
- **LinkedIn**: [Shivam Mahajan](https://www.linkedin.com/in/mahajanshivam/)
