# ERC-721 NFT Smart Contract & Web3 Deployment Pipeline

[![Solidity](https://img.shields.io/badge/Solidity-0.8.20-363636?style=for-the-badge&logo=solidity)](https://soliditylang.org/)
[![Ethereum](https://img.shields.io/badge/Ethereum-ERC--721-3C3C3D?style=for-the-badge&logo=ethereum)](https://ethereum.org/)
[![Web3.js](https://img.shields.io/badge/Web3.js-1.x-F16822?style=for-the-badge&logo=javascript)](https://web3js.org/)
[![OpenZeppelin](https://img.shields.io/badge/Contracts-OpenZeppelin-4E5EE4?style=for-the-badge&logo=openzeppelin)](https://openzeppelin.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)

A modular Web3 pipeline for compiling, deploying, and interacting with ERC-721 Non-Fungible Token (NFT) smart contracts on Ethereum and EVM-compatible testnets (Sepolia, Polygon). Provides clean scripts for automated compilation, wallet creation, gas-metered deployment, and on-chain state queries.

Project Reference: [Shivam Mahajan Portfolio](https://shivammahajan.com/) · [Projects](https://shivammahajan.com/projects/)

---

## Table of Contents
- [Overview](#overview)
- [Target Audience](#target-audience)
- [Features](#features)
- [How It Works](#how-it-works)
  - [Compilation & Deployment Lifecycle](#compilation--deployment-lifecycle)
- [File Structure](#file-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation & Environment](#installation--environment)
- [Usage](#usage)
  - [1. Compiling Smart Contracts (`compile.js`)](#1-compiling-smart-contracts-compilejs)
  - [2. Deploying to EVM Network (`deploy.js`)](#2-deploying-to-evm-network-deployjs)
  - [3. Minting NFTs (`contractWrite.js`)](#3-minting-nfts-contractwritejs)
  - [4. Querying On-Chain State (`contractRead.js`)](#4-querying-on-chain-state-contractreadjs)
- [Performance & Gas Optimization](#performance--gas-optimization)
- [Future Scope and Improvements](#future-scope-and-improvements)
- [Author & Connect](#author--connect)

---

## Overview

Deploying smart contracts often relies on heavy frameworks like Hardhat or Foundry with complex configuration trees. For lightweight scripting, automated microservices, and CI/CD pipelines, having direct control over the `solc` compiler and raw Web3.js JSON-RPC dispatch is essential.

**NFTMINT** isolates the core Ethereum developer lifecycle into clean, standalone JavaScript scripts. Developers can compile Solidity contracts directly to bytecode/ABI, manage private keys, estimate gas, and broadcast signed transactions without framework lock-in.

### Target Audience
- **Blockchain Developers & Web3 Learners**: Master low-level smart contract compilation, ABI generation, and transaction signing mechanics.
- **Backend Engineers Building dApp Services**: Integrate headless blockchain minting and transaction monitoring into Node.js backend services.
- **Auditors & Smart Contract Testers**: Quickly deploy test instances to local Hardhat/Anvil nodes for security analysis.

---

## Features

- **OpenZeppelin ERC-721 Integration**: Standard-compliant non-fungible token contract (`MyToken.sol`) with safe minting and token URI management.
- **Direct solc Compiler**: Custom `compile.js` utilizing the official `solc` compiler with dependency resolution.
- **Scripted Web3 Pipeline**: Individual, single-purpose scripts for account generation, deployment, writing state, and reading state.
- **EVM Multi-Network Support**: Compatible with Ethereum Sepolia, Polygon Amoy, Arbitrum Sepolia, and local Ganache/Anvil nodes.

---

## How It Works

### Compilation & Deployment Lifecycle

```
┌─────────────────────────────────────────────────────────────┐
│                 Solidity Contract (`MyToken.sol`)           │
└──────────────────────────────┬──────────────────────────────┘
                               │ `node compile.js` (solc)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                  ABI & Bytecode Generation                  │
└──────────────────────────────┬──────────────────────────────┘
                               │ `node deploy.js` (Web3.js)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 EVM Network (Sepolia / Polygon)             │
│  - Gas Limit Estimation & Nonce Calculation                 │
│  - Transaction Broadcast & Mining Confirmation              │
└──────────────────────────────┬──────────────────────────────┘
                               │ Deployed Contract Address
                               ▼
┌─────────────────────────────────────────────────────────────┐
│               Read / Write State Management                 │
│  - `contractWrite.js`: Mint tokens to recipient addresses   │
│  - `contractRead.js`: Verify token owner & balance query    │
└─────────────────────────────────────────────────────────────┘
```

---

## File Structure

```
NFTMINT/
├── MyToken.sol         # ERC-721 Solidity smart contract (OpenZeppelin)
├── compile.js          # Direct solc compiler script producing ABI and Bytecode
├── deploy.js           # Network deployment script using Web3.js
├── account.js          # Cryptographic keypair & wallet generator
├── contractRead.js     # Query contract state (ownerOf, balanceOf, name, symbol)
├── contractWrite.js    # Send state-mutating transactions (safeMint)
├── package.json        # Dependencies (web3, solc, @openzeppelin/contracts)
└── README.md
```

---

## Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**
- **Testnet RPC URL & Private Key**: (e.g., Alchemy / Infura Sepolia endpoint)

### Installation & Environment

1. Clone the repository:
   ```bash
   git clone https://github.com/smresponsibilities/NFTMINT.git
   cd NFTMINT
   npm install
   ```
2. Configure your environment variables or update `account.js` with your testing credentials.

---

## Usage

### 1. Compiling Smart Contracts (`compile.js`)
```bash
node compile.js
```
*Parses `MyToken.sol` and outputs the JSON ABI interface and deployment bytecode.*

### 2. Deploying to EVM Network (`deploy.js`)
```bash
node deploy.js
```
*Broadcasts the creation transaction and logs the deployed contract address and transaction hash.*

### 3. Minting NFTs (`contractWrite.js`)
```bash
node contractWrite.js
```
*Signs and transmits an ERC-721 mint transaction to assign token ID #1 to the recipient wallet.*

### 4. Querying On-Chain State (`contractRead.js`)
```bash
node contractRead.js
```
*Calls view functions (`name()`, `symbol()`, `ownerOf(1)`) without incurring gas fees.*

---

## Performance & Gas Optimization

- **ERC-721 Gas Efficiency**: Optimized storage slots conforming to OpenZeppelin v4.9+ patterns.
- **Estimated Mint Cost**: ~55,000 to 65,000 gas units per individual token mint.
- **Batch Processing**: Direct Web3 batch requests minimize network roundtrips when polling state.

---

## Future Scope and Improvements

- **ERC-721A Batch Minting**: Implement Azuki's ERC-721A standard for near-constant gas batch minting.
- **IPFS Dynamic Metadata**: Automated pinning of token imagery and JSON schemas to IPFS via Pinata SDK.
- **Etherscan Contract Verification**: Automated source code verification via Etherscan / Polygonscan API.

---

## Author & Connect

Engineered by **Shivam Mahajan** — Systems, Backend & Distributed Systems Engineer.

- **Portfolio**: [https://shivammahajan.com/](https://shivammahajan.com/)
- **Project Case Studies**: [https://shivammahajan.com/projects/](https://shivammahajan.com/projects/)
- **GitHub**: [@smresponsibilities](https://github.com/smresponsibilities)
- **LinkedIn**: [Shivam Mahajan](https://www.linkedin.com/in/mahajanshivam/)
