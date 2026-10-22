# ERC-20 Votes Governance Token Smart Contract

[![Solidity](https://img.shields.io/badge/Solidity-0.8.20-363636?style=for-the-badge&logo=solidity)](https://soliditylang.org/)
[![Ethereum](https://img.shields.io/badge/Standard-ERC--20%20Votes-3C3C3D?style=for-the-badge&logo=ethereum)](https://ethereum.org/)
[![OpenZeppelin](https://img.shields.io/badge/Contracts-OpenZeppelin%20v4.9-4E5EE4?style=for-the-badge&logo=openzeppelin)](https://openzeppelin.com/)
[![DAO](https://img.shields.io/badge/Ecosystem-DAO%20Governance-blueviolet?style=for-the-badge)](https://shivammahajan.com/projects/)

A production-ready ERC-20 governance token smart contract (`MyGovernanceToken.sol`) engineered for Decentralized Autonomous Organizations (DAOs). Implements OpenZeppelin's `ERC20Votes` standard for snapshot checkpointing, delegation, and flash-loan resistant on-chain voting power calculations.

Project Reference: [Shivam Mahajan Portfolio](https://shivammahajan.com/) · [Projects](https://shivammahajan.com/projects/)

---

## Table of Contents
- [Overview](#overview)
- [Target Audience](#target-audience)
- [Features](#features)
- [How It Works](#how-it-works)
  - [Voting Power & Snapshot Checkpoints](#voting-power--snapshot-checkpoints)
  - [Delegation State Transitions](#delegation-state-transitions)
- [File Structure](#file-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Compiling (`compile.js`)](#compiling-compilejs)
  - [Deploying (`deploy.js`)](#deploying-deployjs)
  - [Delegating Votes (`contractWrite.js`)](#delegating-votes-contractwritejs)
  - [Reading Checkpoints (`contractRead.js`)](#reading-checkpoints-contractreadjs)
- [Performance & Security Metrics](#performance--security-metrics)
- [Future Scope and Improvements](#future-scope-and-improvements)
- [Author & Connect](#author--connect)

---

## Overview

In decentralized governance, naive token balance lookups (`balanceOf`) during active voting proposals create severe security vulnerabilities — malicious actors can borrow millions in flash loans, vote on proposals, and immediately return the borrowed tokens within the same block transaction.

**ERC-20 Governance Token** solves this vulnerability using historical binary-searchable checkpoint structures (`ERC20Votes` / `ERC20Permit`). Voting power is determined by a voter's balance at the exact block proposal snapshot rather than the current block, neutralizing flash-loan governance attacks.

### Target Audience
- **DAO Engineers & Protocol Architects**: Deploy resilient governance tokens compatible with Compound Governor, OpenZeppelin Governor, and Tally.
- **Smart Contract Developers**: Study binary search checkpoint arrays and EIP-712 gasless delegation signatures.
- **Web3 Backend Developers**: Automate governance token deployments and on-chain vote tally queries.

---

## Features

- **Historical Voting Checkpoints**: Records past vote weights at every block boundary using binary-searchable checkpoint structs.
- **Gasless Vote Delegation**: Users can delegate voting weight to community representatives without transferring underlying tokens.
- **Flash-Loan Attack Immunity**: All voting queries reference historical past blocks (`getPastVotes`), preventing intra-block voting manipulation.
- **EIP-2612 Permit Support**: Approve token allowances via gasless cryptographic signatures rather than on-chain approval transactions.

---

## How It Works

### Voting Power & Snapshot Checkpoints

```
Block 100               Block 105               Block 110
[Mint: 10,000 GT] ────► [Delegate: Alice] ─────► [Proposal Created]
Checkpoint: 10k         Checkpoint: Alice 10k   Proposal Snapshot: Block 110
                                                Voting Weight locked at 10k!
```

1. **Token Minting / Transfer**: Whenever tokens move, `_afterTokenTransfer` updates the historical checkpoint for both sender and receiver.
2. **Delegation**: Token holders call `delegate(representative)`. The contract reassigns voting weight checkpoints without modifying token ownership.
3. **Proposal Snapshots**: When a proposal is submitted, the governor queries `getPastVotes(account, proposalSnapshotBlock)` to calculate immutable voting power.

---

## File Structure

```
governancetoken/
├── MyGovernanceToken.sol   # ERC-20 Votes Solidity smart contract (OpenZeppelin)
├── MyToken.sol             # Base token contract
├── compile.js              # Solc compiler script generating ABI and Bytecode
├── deploy.js               # Network deployment script using Web3.js
├── account.js              # Cryptographic keypair & wallet manager
├── contractRead.js         # Query checkpoints and past votes
├── contractWrite.js        # Execute delegations and transfers
├── package.json            # Dependencies (@openzeppelin/contracts, web3, solc)
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
git clone https://github.com/smresponsibilities/governancetoken.git
cd governancetoken
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

### Delegating Votes (`contractWrite.js`)
```bash
node contractWrite.js
```

### Reading Checkpoints (`contractRead.js`)
```bash
node contractRead.js
```

---

## Performance & Security Metrics

- **Checkpoint Lookup Complexity**: $O(\log N)$ binary search across historic checkpoints.
- **Gas Overhead**: Incremental ~18,000 gas units per transfer to update historical checkpoint arrays.
- **Audited Security**: Built upon thoroughly audited OpenZeppelin v4.9 governance contracts.

---

## Future Scope and Improvements

- **Quadratic Voting**: Integration with Gitcoin-style quadratic voting algorithms to curb whale dominance.
- **Time-Locked Staking (veToken Model)**: Vote-escrowed locking mechanism where longer staking periods confer higher vote multipliers (similar to Curve `veCRV`).

---

## Author & Connect

Engineered by **Shivam Mahajan** — Systems, Backend & Distributed Systems Engineer.

- **Portfolio**: [https://shivammahajan.com/](https://shivammahajan.com/)
- **Project Case Studies**: [https://shivammahajan.com/projects/](https://shivammahajan.com/projects/)
- **GitHub**: [@smresponsibilities](https://github.com/smresponsibilities)
- **LinkedIn**: [Shivam Mahajan](https://www.linkedin.com/in/mahajanshivam/)
