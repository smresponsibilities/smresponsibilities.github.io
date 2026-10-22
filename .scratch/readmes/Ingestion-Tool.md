# ClickHouse & Flat File Bidirectional Data Ingestion Tool

[![ClickHouse](https://img.shields.io/badge/ClickHouse-OLAP_Database-yellow?style=for-the-badge&logo=clickhouse)](https://clickhouse.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express)](https://expressjs.com/)
[![Material UI](https://img.shields.io/badge/Material_UI-007FFF?style=for-the-badge&logo=mui)](https://mui.com/)

A web-based data engineering tool facilitating high-throughput, bidirectional data pipelines between ClickHouse columnar OLAP databases and flat CSV files. Features dynamic schema discovery, stream-based batch ingestion, column filtering, and completion audits.

![ClickHouse & Flat File Ingestion Dashboard](assets/image.png)
*Figure 1: ClickHouse and CSV bidirectional pipeline configuration interface.*

* **Portfolio Architecture & Details:** **[https://shivammahajan.com/projects/](https://shivammahajan.com/projects/)**

---

## Table of Contents
- [Overview](#overview)
- [Target Audience](#target-audience)
- [Features](#features)
- [How It Works](#how-it-works)
  - [Bidirectional ETL Architecture](#bidirectional-etl-architecture)
  - [Stream Processing & Chunking Flow](#stream-processing--chunking-flow)
- [File Structure](#file-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Server Setup](#server-setup)
  - [Client Setup](#client-setup)
- [Usage](#usage)
  - [Pipeline 1: ClickHouse → Flat CSV Export](#pipeline-1-clickhouse--flat-csv-export)
  - [Pipeline 2: Flat CSV → ClickHouse Ingestion](#pipeline-2-flat-csv--clickhouse-ingestion)
- [Performance & Benchmark Results](#performance--benchmark-results)
- [Future Scope and Improvements](#future-scope-and-improvements)
- [Author & Connect](#author--connect)

---

## Overview

Loading flat data files into columnar analytical databases like ClickHouse often requires tedious CLI commands, manual type casting, and custom Python ETL scripts. Conversely, exporting massive query results into clean, delimited flat files can overwhelm server memory if not buffered and streamed properly.

**ClickHouse Data Ingestion Tool** bridges this operational gap with an intuitive graphical interface. It handles automated schema discovery, column-level mapping, delimiter formatting, and chunked batch writes — allowing data engineers and analysts to transfer data in both directions with zero command-line boilerplate.

### Target Audience
- **Data Engineers & Analytics Teams**: Rapidly migrate tabular CSV datasets into ClickHouse tables with validated data types and automated column mapping.
- **Data Analysts & Scientists**: Extract analytical slices from large ClickHouse tables into portable CSV format without writing raw SQL `INTO OUTFILE` commands.
- **Backend Developers**: Learn patterns for handling large file uploads, stream-based CSV parsing, and ClickHouse Node.js client integrations.

---

## Features

- **Bidirectional Ingestion**: Seamlessly export from ClickHouse into CSV or ingest flat CSV records into ClickHouse target tables.
- **Real-Time Schema Discovery**: Inspect remote tables, discover column data types (`DateTime`, `UInt32`, `String`, `Float64`), and select exact fields to ingest.
- **Pre-Ingestion Data Preview**: Preview parsed sample records and validation errors before committing large batch transactions.
- **Multi-Table Joins**: Query across related ClickHouse tables using visual joins before exporting data.
- **Stream Processing**: Uses Node.js streams to process multi-gigabyte files without running out of server RAM.
- **Authentication & Security**: Supports password and JWT-token based authentication for ClickHouse Cloud and self-hosted instances.

---

## How It Works

### Bidirectional ETL Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                   React / TypeScript UI                     │
│    (Connection Manager, Schema Mapper, Stream Progress)     │
└──────────────────────────────┬──────────────────────────────┘
                               │ REST / Multi-part Upload
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 Node.js / Express Server                    │
│  - Multer Chunked File Receiver                             │
│  - CSV Stream Transform Pipeline (fast-csv / csv-parser)    │
│  - ClickHouse Official Node.js Client Pool                  │
└──────────────┬───────────────────────────────┬──────────────┘
               │ Batch Insert                  │ Stream Query
               ▼                               ▼
┌──────────────────────────────┐ ┌────────────────────────────┐
│      ClickHouse Database     │ │   Exported Flat CSV Files  │
│   (OLAP Columnar Storage)    │ │   (Custom Delimiters)      │
└──────────────────────────────┘ └────────────────────────────┘
```

### Stream Processing & Chunking Flow

1. **Upload & Parse**: Incoming CSV files are piped through streaming parsers chunk by chunk rather than loaded into memory as a monolithic array.
2. **Type Coercion & Sanitization**: Values are sanitized and formatted to match target ClickHouse column specifications (handling NULLs, dates, and escape quotes).
3. **Batch Insertion**: Records are accumulated in memory buffers (e.g., 5,000–10,000 rows per batch) and dispatched using the official `@clickhouse/client` insertion stream.
4. **Audit Reporting**: Returns a detailed audit log recording elapsed execution time, rows processed, and write throughput.

---

## File Structure

```
Ingestion-Tool/
├── client/                     # Frontend Single Page App
│   ├── src/
│   │   ├── components/         # Data tables, file upload dropzone, navbar
│   │   ├── pages/              # ClickHouseExport, FlatFileImport, Connections
│   │   ├── services/           # Axios API connectors for server
│   │   └── App.tsx             # Application routing
│   ├── package.json
│   └── vite.config.ts
├── server/                     # Backend Processing API
│   ├── src/
│   │   ├── config/             # Environment & ClickHouse client config
│   │   ├── controllers/        # Ingestion, Export, and Connection controllers
│   │   ├── routes/             # REST endpoints (/api/ingest, /api/export)
│   │   └── utils/              # CSV stream transformers and formatters
│   ├── uploads/                # Ephemeral incoming upload staging
│   ├── exports/                # Generated CSV download buffer
│   ├── package.json
│   └── server.js
├── assets/                     # Architecture & UI screenshots
└── README.md
```

---

## Getting Started

### Prerequisites

- **Node.js**: v16.0.0 or higher
- **npm** or **yarn**
- **ClickHouse Instance**: Local Docker container (`clickhouse/clickhouse-server`) or ClickHouse Cloud trial instance

### Server Setup

1. Navigate to the `server` directory:
   ```bash
   cd server
   npm install
   ```
2. Create `uploads/` and `exports/` directories:
   ```bash
   mkdir -p uploads exports
   ```
3. Start the backend service:
   ```bash
   npm start
   ```
   *The server will run on `http://localhost:3001`.*

### Client Setup

1. Open a new terminal and navigate to `client`:
   ```bash
   cd client
   npm install
   ```
2. Configure API endpoint in `.env`:
   ```env
   VITE_API_URL=http://localhost:3001/api
   ```
3. Start the client:
   ```bash
   npm run dev
   ```
   *The interface will run on `http://localhost:5173`.*

---

## Usage

### Pipeline 1: ClickHouse → Flat CSV Export
1. On the dashboard, select **ClickHouse to Flat File**.
2. Enter your ClickHouse host, port (e.g., `8123` or `8443`), database name, username, and password.
3. Choose the source table. The system automatically fetches columns and schemas.
4. Check the desired fields, configure the CSV delimiter (comma, tab, pipe), and click **Start Export**.
5. Download your generated CSV upon completion.

### Pipeline 2: Flat CSV → ClickHouse Ingestion
1. On the dashboard, select **Flat File to ClickHouse**.
2. Upload your source `.csv` file.
3. Review the parsed header preview and map each CSV column to the corresponding ClickHouse table attribute.
4. Click **Start Ingestion** to trigger streaming batch inserts.
5. Monitor real-time row counts and execution metrics.

---

## Performance & Benchmark Results

The pipeline was benchmarked using ClickHouse's canonical public test datasets (`uk_price_paid` and `ontime` flight records):

- **Dataset Size**: 1,000,000+ records tested.
- **Ingestion Throughput**: ~45,000 to 60,000 rows/second on local development hardware.
- **Memory Overhead**: Consistent `<120MB` Node.js process heap memory during active 1M row file processing thanks to streaming backpressure.
- **Export Latency**: Sub-3 second generation for 100,000 rows with gzip/compression support.

---

## Future Scope and Improvements

- **Parquet & Apache Arrow Support**: Expand beyond CSV to support high-efficiency columnar Parquet and Arrow IPC formats.
- **Kafka & Streaming Sinks**: Add Kafka topic ingestion directly into ClickHouse engines.
- **Automated Type Inference**: Automatically deduce optimal ClickHouse column types (`LowCardinality`, `DateTime64`, `Nullable`) from raw CSV values.
- **Scheduled Synchronization Jobs**: Cron-based background recurring imports from remote SFTP or AWS S3 buckets.

---

## Author & Connect

Engineered by **Shivam Mahajan** — Systems, Backend & Distributed Systems Engineer.

- **Portfolio**: [https://shivammahajan.com/](https://shivammahajan.com/)
- **Project Case Studies**: [https://shivammahajan.com/projects/](https://shivammahajan.com/projects/)
- **GitHub**: [@smresponsibilities](https://github.com/smresponsibilities)
- **LinkedIn**: [Shivam Mahajan](https://www.linkedin.com/in/mahajanshivam/)
