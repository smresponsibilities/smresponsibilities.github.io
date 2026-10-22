# Token Airdrop dApp on Kalp Blockchain

[![Live dApp](https://img.shields.io/badge/Live_App-Vercel-3b82f6?style=for-the-badge&logo=vercel&logoColor=white)](https://kalp-task3.vercel.app)
[![Portfolio Architecture](https://img.shields.io/badge/Architecture-shivammahajan.com-ff5d01?style=for-the-badge)](https://shivammahajan.com/projects/)
[![Kalp Blockchain](https://img.shields.io/badge/Blockchain-Kalp_Network-6C5CE7?style=for-the-badge)](https://kalp.studio/)
[![Go](https://img.shields.io/badge/Smart_Contract-Go%20%28Golang%29-00ADD8?style=for-the-badge&logo=go)](https://golang.org/)
[![React](https://img.shields.io/badge/Frontend-React%2018-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

A decentralized token airdrop and vending machine application built on the Kalp blockchain. Combines a Go-based fungible smart contract (KRC-20 standard) for batch token distribution with a responsive React/TypeScript dApp interface.

* **Live dApp:** **[https://kalp-task3.vercel.app](https://kalp-task3.vercel.app)**
* **Engineering Portfolio:** **[https://shivammahajan.com/projects/](https://shivammahajan.com/projects/)**

---

## Table of Contents
- [Overview](#overview)
- [Target Audience](#target-audience)
- [Features](#features)
- [How It Works](#how-it-works)
  - [High-Level Architecture](#high-level-architecture)
  - [Airdrop Claiming Flow](#airdrop-claiming-flow)
- [File Structure](#file-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Smart Contract Setup (Go)](#smart-contract-setup-go)
  - [Frontend Setup (React)](#frontend-setup-react)
- [Usage](#usage)
  - [Deploying Smart Contracts via Kalp Studio](#deploying-smart-contracts-via-kalp-studio)
  - [Claiming Airdrop Tokens](#claiming-airdrop-tokens)
- [Performance & Security Metrics](#performance--security-metrics)
- [Future Scope and Improvements](#future-scope-and-improvements)
- [Author & Connect](#author--connect)

---

## Overview

Token airdrops are essential growth mechanisms for Web3 communities, yet many standard EVM implementations suffer from exorbitant gas fees during mass distribution. **Kalp Blockchain** provides an enterprise-ready, regulatory-compliant environment using Go smart contracts.

This project implements a decentralized airdrop vending machine:
1. A **Go smart contract** (`krc.go`) managing token minting, claim cooldowns, and balance state on Kalp.
2. A **React dApp** providing web-based wallet authentication, claim triggers, and live transaction feedback.

### Target Audience
- **Web3 & Blockchain Developers**: Study Go-based smart contract authoring outside traditional Solidity/EVM paradigms.
- **DeFi & Token Project Creators**: Deploy self-service airdrop claim portals for community bootstrapping.
- **Frontend Engineers**: Integrate REST/RPC blockchain SDK hooks (`useKalpApi`) into modern React UI applications.

---

## Features

- **Go Smart Contract Architecture**: High-efficiency KRC-20 token standard implementation written in pure Go.
- **Automated Claim Cooldowns**: Enforces claim limits and wallet verification to mitigate sybil draining attacks.
- **Kalp Studio Integration**: Direct compilation and deployment pipeline into the Kalp testnet/mainnet.
- **Real-Time Balance Updates**: Custom React hook (`useKalpApi.ts`) querying on-chain balances and transaction statuses.
- **Responsive Dark Mode UI**: Clean, mobile-friendly interface deployed on Vercel edge networks.

---

## How It Works

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                 React + TypeScript dApp                     │
│    (Wallet Connect, Claim Interface, Balance Display)       │
└──────────────────────────────┬──────────────────────────────┘
                               │ Kalp API Gateway / useKalpApi
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                     Kalp Blockchain Node                    │
│  - Regulatory & Compliance Validation Layer                 │
│  - Consensus & Transaction Pool                             │
└──────────────────────────────┬──────────────────────────────┘
                               │ Execute Smart Contract
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                  Go Smart Contract (`krc.go`)               │
│  - Token State (Total Supply, Ledger, Allowances)           │
│  - Claim Verification Logic & Balance Mutation              │
└─────────────────────────────────────────────────────────────┘
```

---

## File Structure

```
kalp-task3/
└── junior/
    ├── Smart-Contract/
    │   ├── go.mod          # Go module definitions
    │   ├── go.sum          # Dependency cryptographic checksums
    │   ├── main.go         # Contract entry point & routing
    │   └── krc.go          # KRC token implementation & airdrop logic
    ├── frontend/
    │   ├── src/
    │   │   ├── hooks/
    │   │   │   └── useKalpApi.ts # Custom API integration hook
    │   │   ├── pages/      # Home, Dashboard, and Claim views
    │   │   └── App.tsx     # Main application layout
    │   ├── package.json
    │   └── tsconfig.json
    └── README.md
```

---

## Getting Started

### Prerequisites

- **Go**: v1.19.x (`go version`)
- **Node.js**: v16.0+ and **npm** v7.0+
- **Kalp Studio Account**: Registered on [Kalp Studio](https://kalp.studio/)

### Smart Contract Setup (Go)

```bash
cd junior/Smart-Contract
go mod tidy
go test ./...
```

### Frontend Setup (React)

1. Navigate to the frontend directory:
   ```bash
   cd junior/frontend
   npm install
   ```
2. Configure `.env.local`:
   ```env
   REACT_APP_KALP_API_ENDPOINT=https://api.kalp.studio
   REACT_APP_CONTRACT_ADDRESS=your_deployed_contract_address
   REACT_APP_API_KEY=your_kalp_api_key
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

---

## Usage

### Claiming Airdrop Tokens
1. Open the application at `https://kalp-task3.vercel.app`.
2. Connect your Kalp-compatible wallet address.
3. Click **Claim Airdrop** to submit a transaction.
4. Once verified on the Kalp blockchain, tokens are credited to your address immediately.

---

## Performance & Security Metrics

- **Transaction Finality**: Under **2.5 seconds** block confirmation time on the Kalp network.
- **Contract Execution Footprint**: Minimal CPU and memory consumption running native compiled Go bytecode.
- **Double-Claim Protection**: On-chain ledger mapping address to timestamp prevents replay and duplicate claims.

---

## Future Scope and Improvements

- **Merkle Tree Proofs**: Whitelist verification for pre-qualified wallet addresses via Merkle trees.
- **Multi-Token Distribution**: Support distributing multiple distinct token standards within a single claim batch.
- **Social Verification Gating**: Gating airdrops behind GitHub or X account linking.

---

## Author & Connect

Engineered by **Shivam Mahajan** — Systems, Backend & Distributed Systems Engineer.

- **Portfolio**: [https://shivammahajan.com/](https://shivammahajan.com/)
- **Project Case Studies**: [https://shivammahajan.com/projects/](https://shivammahajan.com/projects/)
- **GitHub**: [@smresponsibilities](https://github.com/smresponsibilities)
- **LinkedIn**: [Shivam Mahajan](https://www.linkedin.com/in/mahajanshivam/)
