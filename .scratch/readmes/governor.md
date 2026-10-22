# On-Chain DAO Governor Smart Contract

[![Solidity](https://img.shields.io/badge/Solidity-0.8.20-363636?style=for-the-badge&logo=solidity)](https://soliditylang.org/)
[![Ethereum](https://img.shields.io/badge/Standard-OpenZeppelin%20Governor-3C3C3D?style=for-the-badge&logo=ethereum)](https://ethereum.org/)
[![Security](https://img.shields.io/badge/Architecture-Timelock%20Guarded-brightgreen?style=for-the-badge)](https://openzeppelin.com/)
[![DAO](https://img.shields.io/badge/Ecosystem-Decentralized%20Governance-blueviolet?style=for-the-badge)](https://shivammahajan.com/projects/)

A modular, extensible on-chain DAO Governor smart contract system (`MyGovernance.sol`) built with OpenZeppelin contracts. Governs the proposal lifecycle, voting delays, quorum thresholds, vote tallying (`For`, `Against`, `Abstain`), and cryptographic timelock execution.

Project Reference: [Shivam Mahajan Portfolio](https://shivammahajan.com/) · [Projects](https://shivammahajan.com/projects/)

---

## Table of Contents
- [Overview](#overview)
- [Target Audience](#target-audience)
- [Features](#features)
- [How It Works](#how-it-works)
  - [The Proposal Lifecycle State Machine](#the-proposal-lifecycle-state-machine)
- [File Structure](#file-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Compiling (`compile.js`)](#compiling-compilejs)
  - [Deploying (`deploy.js`)](#deploying-deployjs)
  - [Creating Proposals & Voting (`contractWrite.js`)](#creating-proposals--voting-contractwritejs)
  - [Inspecting Quorum & State (`contractRead.js`)](#inspecting-quorum--state-contractreadjs)
- [Performance & Security Metrics](#performance--security-metrics)
- [Future Scope and Improvements](#future-scope-and-improvements)
- [Author & Connect](#author--connect)

---

## Overview

Decentralized Autonomous Organizations require trustless on-chain governance to manage treasury assets, modify smart contract parameters, and execute protocol upgrades. Relying on off-chain signaling (like Snapshot) without automated on-chain execution leaves protocols vulnerable to centralized multi-sig key compromises.

**On-Chain DAO Governor** implements the complete OpenZeppelin Governor protocol. Once token holders pass a proposal meeting the minimum quorum threshold, the Governor passes calldata to a **Timelock Controller** to automatically execute arbitrary on-chain transactions without human intermediaries.

### Target Audience
- **Web3 Protocol Designers & DAO Founders**: Deploy modular on-chain governance with custom voting periods and quorum parameters.
- **Smart Contract Security Researchers**: Review governor state machine transitions (`Pending` → `Active` → `Succeeded` → `Queued` → `Executed`).
- **Blockchain Engineers**: Study standalone Web3.js contract deployment and interaction scripts without framework bloat.

---

## Features

- **Configurable Voting Settings**: Custom initial voting delays (block buffer), active voting periods, and proposal submission thresholds.
- **Dynamic Quorum Calculation**: Mathematical quorum verification ensuring minimum community turnout before a proposal can succeed.
- **Timelock Controller Integration**: Mandatory execution delay (e.g., 48 hours) giving users time to withdraw funds if they disagree with a passed governance change.
- **Three-Way Ballot Options**: Supports `Against` (0), `For` (1), and `Abstain` (2) voting choices with historical vote weight tallying.

---

## How It Works

### The Proposal Lifecycle State Machine

```
┌─────────────┐     Voting Delay     ┌─────────────┐    Voting Period    ┌─────────────┐
│   Pending   │ ───────────────────► │   Active    │ ──────────────────► │  Succeeded  │
└─────────────┘                      └─────────────┘                     └──────┬──────┘
                                            │ Defeated                          │ Queue
                                            ▼                                   ▼
                                     ┌─────────────┐                     ┌─────────────┐
                                     │  Defeated   │                     │   Queued    │
                                     └─────────────┘                     └──────┬──────┘
                                                                                │ Timelock Delay
                                                                                ▼
                                                                         ┌─────────────┐
                                                                         │  Executed   │
                                                                         └─────────────┘
```

1. **`propose`**: Proposer submits target contract addresses, ETH values, function calldata, and a description hash.
2. **`castVote`**: Token holders vote using weights snapshotted at the proposal's starting block.
3. **`queue` & `execute`**: If the proposal passes and reaches quorum, it is queued in the Timelock and executed once the grace delay elapses.

---

## File Structure

```
governor/
├── MyGovernance.sol    # OpenZeppelin Governor contract with CountingSimple
├── MyToken.sol         # Base token contract
├── compile.js          # Solc compiler script generating ABI and Bytecode
├── deploy.js           # Deployment script connecting Governor to Timelock
├── account.js          # Cryptographic keypair & wallet manager
├── contractRead.js     # Query proposal state, quorum, and voting weight
├── contractWrite.js    # Submit proposals, cast votes, and queue execution
├── abi.js              # Exported ABI definitions
├── package.json        # Dependencies (@openzeppelin/contracts, web3, solc)
└── README.md
```

---

## Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**
- **EVM Testnet RPC & Private Key**: (Sepolia, Polygon Amoy)

### Installation

```bash
git clone https://github.com/smresponsibilities/governor.git
cd governor
npm install
```

---

## Usage

### Compiling (`compile.js`)
```bash
node compile.js
```

### Deploying (`deploy.js`)
```bash
node deploy.js
```

### Creating Proposals & Voting (`contractWrite.js`)
```bash
node contractWrite.js
```

### Inspecting Quorum & State (`contractRead.js`)
```bash
node contractRead.js
```

---

## Performance & Security Metrics

- **Proposal Gas Cost**: ~90,000 to 120,000 gas units to store proposal hashes on-chain.
- **Vote Gas Efficiency**: ~45,000 gas units per vote cast using standard storage slot packing.
- **Timelock Protection**: Prevents malicious flash governance attacks through deterministic time-delayed execution.

---

## Future Scope and Improvements

- **GovernorBravo Compatibility**: Interface parity with Compound's legacy GovernorBravo interfaces.
- **Tally Dashboard Integration**: Subgraph indexing for real-time visualization on Tally.xyz.
- **Optimistic Governance**: Disputable proposals where transactions execute automatically unless challenged by token bondholders.

---

## Author & Connect

Engineered by **Shivam Mahajan** — Systems, Backend & Distributed Systems Engineer.

- **Portfolio**: [https://shivammahajan.com/](https://shivammahajan.com/)
- **Project Case Studies**: [https://shivammahajan.com/projects/](https://shivammahajan.com/projects/)
- **GitHub**: [@smresponsibilities](https://github.com/smresponsibilities)
- **LinkedIn**: [Shivam Mahajan](https://www.linkedin.com/in/mahajanshivam/)
