# Chaincode — AI-Verified Web3 Proof-of-Skill Platform

[![Live App](https://img.shields.io/badge/Live_App-Vercel-3b82f6?style=for-the-badge&logo=vercel&logoColor=white)](https://chain-code.vercel.app)
[![Portfolio Architecture](https://img.shields.io/badge/Architecture-shivammahajan.com-ff5d01?style=for-the-badge)](https://shivammahajan.com/projects/)
[![HackIndia](https://img.shields.io/badge/HackIndia-3rd%20Place%20Winner-ffd700?style=for-the-badge&logo=trophy)](https://shivammahajan.com/projects/)
[![Solidity](https://img.shields.io/badge/Solidity-0.8.20-363636?style=for-the-badge&logo=solidity)](https://soliditylang.org/)
[![Ethereum](https://img.shields.io/badge/Ethereum-ERC--721-3C3C3D?style=for-the-badge&logo=ethereum)](https://ethereum.org/)
[![Google Gemini](https://img.shields.io/badge/Gemini_AI-Originality_Judge-4285F4?style=for-the-badge&logo=google)](https://deepmind.google/technologies/gemini/)
[![React](https://img.shields.io/badge/Frontend-React%2018-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)

A Web3 competitive coding platform that validates algorithmic uniqueness using Google Gemini AI and mints verified proof-of-completion NFT badges on-chain. Awarded **3rd Place out of 200+ competing engineering teams** at HackIndia Regionals.

* **Live App:** **[https://chain-code.vercel.app](https://chain-code.vercel.app)**
* **Portfolio Showcase:** **[https://shivammahajan.com/projects/](https://shivammahajan.com/projects/)**

---

## Table of Contents
- [Overview](#overview)
- [Target Audience](#target-audience)
- [Features](#features)
- [How It Works](#how-it-works)
  - [High-Level Architecture](#high-level-architecture)
  - [The 3-Phase Mint Journey](#the-3-phase-mint-journey)
- [File Structure](#file-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
  - [Smart Contract Deployment](#smart-contract-deployment)
- [Usage](#usage)
  - [Solving & Submitting Code](#solving--submitting-code)
  - [Verification & Soulbound Minting](#verification--soulbound-minting)
- [Performance & Security Metrics](#performance--security-metrics)
- [Future Scope and Improvements](#future-scope-and-improvements)
- [Author & Connect](#author--connect)

---

## Overview

Traditional coding platforms grant digital points or web badges that live entirely in private corporate databases. They offer no cryptographic proof of authorship, no guarantee against plagiarism, and no portable identity for developer portfolios.

**Chaincode** bridges competitive algorithmic problem solving with decentralized identity. When a developer submits a solution:
1. It executes inside an isolated sandbox against private test suites.
2. An AI originality engine (powered by **Google Gemini AI**) compares the syntax, abstract syntax tree patterns, and logic against known solution clusters to ensure non-triviality and genuine authorship.
3. If verified, the platform triggers an automated, on-chain mint transaction producing a non-transferable (soulbound) ERC-721 token representing cryptographic proof of skill.

### Target Audience
- **Competitive Programmers & Students**: Build an immutable, verifiable proof-of-work portfolio that recruiters can verify on-chain via Etherscan/Polygonscan.
- **Web3 Hackathons & Competitions**: Eliminate copy-pasted boilerplate submissions with automated LLM semantic similarity checking.
- **Tech Recruiters & Engineering Hiring Managers**: Validate candidate problem-solving authenticity without relying solely on resume claims or unverifiable LeetCode links.

---

## Features

- **Server-Side Testcase Isolation**: Hidden test suites never leak to client bundles; execution and validation run strictly server-side.
- **Gemini AI Originality Engine**: Deep semantic code inspection evaluates solution approach, edge-case handling, and algorithmic structure against plagiarism.
- **3-Phase Verifiable Minting**: Real-time frontend lifecycle tracking: `Judging` → `Verifying Originality` → `Minting On-Chain`.
- **Per-Problem & Per-Language Draft Preservation**: Monaco-based code editor saves per-language drafts locally, preventing code loss across browser refreshes.
- **ERC-721 Smart Contracts**: Gas-optimized Solidity contracts minting metadata certificates containing difficulty level, submission timestamp, and transaction hashes.
- **Strict Design System**: Custom SVG hexagon loaders, canvas particle field, Cabinet Grotesk / Geist Mono typography, and dark-mode aesthetic.

---

## How It Works

### High-Level Architecture

```
┌────────────────────────────────────────────────────────┐
│                   React 18 Frontend                    │
│   (Monaco Editor, Web3 Provider, State Orchestrator)   │
└───────────────────────────┬────────────────────────────┘
                            │ REST / JSON
                            ▼
┌────────────────────────────────────────────────────────┐
│                   Express.js Backend                   │
│  - Problem Router & Server-Side Sandboxed Judger       │
│  - Gemini AI Originality Evaluation Pipeline           │
│  - Web3 Transaction Orchestrator                       │
└──────────────┬────────────────────────────┬────────────┘
               │                            │
      Private Evaluation            Cryptographic Verification
               ▼                            ▼
┌─────────────────────────────┐  ┌─────────────────────────────┐
│      Google Gemini AI       │  │   Ethereum / Polygon EVM    │
│  (Semantic Syntax & AST     │  │   ERC-721 Soulbound Mint    │
│   Plagiarism Evaluation)    │  │   (Proof-of-Completion)     │
└─────────────────────────────┘  └─────────────────────────────┘
```

### The 3-Phase Mint Journey

1. **Phase 1: Test Suite Execution (`Judging`)**
   The user's code is compiled and run against hidden edge-case test suites in isolated sandbox runners. If execution passes runtime, memory, and correctness thresholds, the payload proceeds to Phase 2.
2. **Phase 2: Semantic Originality Check (`Verifying`)**
   Google Gemini AI inspects the submission's AST characteristics, variable scoping, and structural logic against canonical problem solutions.
3. **Phase 3: Cryptographic Issuance (`Minting`)**
   The backend signs the verification proof and triggers the smart contract mint method. The user receives a transaction hash, live Etherscan link, and dynamic SVG proof badge.

---

## File Structure

```
Chain-Code/
├── backend/
│   ├── config/             # Database and provider configurations
│   ├── controllers/        # Submission, NFT, Problem, and Auth controllers
│   ├── models/             # MongoDB Mongoose schemas (User, Problem, Submission, NFT)
│   ├── routes/             # Express API endpoints (/problems, /submit, /nft)
│   ├── services/
│   │   ├── execution/      # Sandboxed code execution engine
│   │   └── ai/             # Gemini AI originality analysis pipeline
│   └── server.js           # Main backend entry point
├── frontend/
│   ├── src/
│   │   ├── components/     # UI elements (HeroSection, CodeEditor, Navbar)
│   │   ├── pages/          # ProblemList, ProblemDetail, NFTViewer, Dashboard
│   │   ├── utils/          # Web3 wallet connectors and auth bus
│   │   └── App.tsx         # Main application routing and state
│   ├── package.json
│   └── vite.config.ts
├── deploy/                 # Solidity contracts & deployment scripts
│   ├── contracts/          # ERC-721 Smart Contracts (ChaincodeNFT.sol)
│   └── hardhat.config.js   # Hardhat EVM network configuration
└── README.md
```

---

## Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm** or **pnpm**
- **MongoDB**: Local instance or MongoDB Atlas cluster URL
- **Google Gemini API Key**: From [Google AI Studio](https://aistudio.google.com/)
- **Ethereum Wallet / RPC**: MetaMask and Infura/Alchemy endpoint (e.g., Sepolia or Polygon Amoy)

### Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   npm install
   ```
2. Create `.env` file:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secure_jwt_secret
   GEMINI_API_KEY=your_gemini_api_key
   RPC_URL=https://polygon-amoy.g.alchemy.com/v2/your_key
   PRIVATE_KEY=your_deployer_wallet_private_key
   CONTRACT_ADDRESS=your_deployed_contract_address
   ```
3. Start the backend service:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   npm install
   ```
2. Configure frontend environment in `.env`:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   VITE_CONTRACT_ADDRESS=your_deployed_contract_address
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

### Smart Contract Deployment

```bash
cd deploy
npx hardhat compile
npx hardhat run scripts/deploy.js --network amoy
```

---

## Usage

### Solving & Submitting Code
1. Open the web interface and connect your Web3 wallet (MetaMask / WalletConnect).
2. Browse the problem catalog categorized by difficulty (Easy, Medium, Hard).
3. Write your solution in C++, Python, or JavaScript inside the Monaco editor with syntax highlighting and auto-completion.
4. Click **Run Code** to test against visible sample inputs.

### Verification & Soulbound Minting
1. Once ready, click **Submit & Mint**.
2. Watch the live 3-stage visual tracker:
   - Green pulse: Sandboxed test cases passing.
   - Gold pulse: Gemini AI originality evaluation complete.
   - Purple pulse: On-chain transaction confirmation.
3. Click the generated badge to view the token metadata and transaction on Etherscan/Polygonscan.

---

## Performance & Security Metrics

- **AI Analysis Latency**: ~1.4s average round-trip time for Google Gemini 1.5 Flash AST evaluation.
- **Contract Gas Efficiency**: ~68,000 gas units per soulbound mint transaction on Polygon Amoy.
- **Code Execution Isolation**: Dedicated timeout limits (2.0s CPU time, 128MB RAM) protecting server resources against infinite loops and memory exhaustion.
- **Competitive Recognition**: Placed **3rd of 200+ teams** at HackIndia Regionals for product novelty and technical execution.

---

## Future Scope and Improvements

- **Decentralized Storage (IPFS/Filecoin)**: Store generated SVG code badges and execution logs permanently on IPFS via Pinata.
- **Zero-Knowledge Proofs (zk-SNARKs)**: Allow developers to prove solution correctness and runtime complexity without revealing the underlying proprietary source code on-chain.
- **Multi-Chain Expansion**: Deploy cross-chain soulbound tokens across Arbitrum, Base, and Optimism using LayerZero.
- **Institutional Classroom Dashboards**: Enable university professors and hackathon organizers to spin up private problem sets with automated plagiarism alerts.

---

## Author & Connect

Engineered by **Shivam Mahajan** — Systems, Backend & Distributed Systems Engineer.

- **Portfolio**: [https://shivammahajan.com/](https://shivammahajan.com/)
- **Project Case Studies**: [https://shivammahajan.com/projects/](https://shivammahajan.com/projects/)
- **GitHub**: [@smresponsibilities](https://github.com/smresponsibilities)
- **LinkedIn**: [Shivam Mahajan](https://www.linkedin.com/in/mahajanshivam/)
