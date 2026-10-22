# YouKn0wWho Dynamic Programming & Competitive Programming Solutions

[![Python](https://img.shields.io/badge/Language-Python%203-3776AB?style=for-the-badge&logo=python)](https://python.org)
[![Focus](https://img.shields.io/badge/Domain-Dynamic%20Programming-orange?style=for-the-badge)](https://shivammahajan.com/blog/)
[![Curriculum](https://img.shields.io/badge/Curriculum-YouKn0wWho%20Academy-purple?style=for-the-badge)](https://youknowwho.academy/)
[![Platforms](https://img.shields.io/badge/Platforms-CSES%20%7C%20AtCoder%20%7C%20Codeforces-red?style=for-the-badge)](https://shivammahajan.com/)

A curated repository of competitive programming solutions and algorithmic implementations focusing on classical and advanced **Dynamic Programming (DP)** problems, following the structured roadmap of the renowned [YouKn0wWho Academy](https://youknowwho.academy/).

Project Reference: [Daily Journal on Shivam Mahajan Portfolio](https://shivammahajan.com/blog/) · [Portfolio](https://shivammahajan.com/)

---

## Table of Contents
- [Overview](#overview)
- [Target Audience](#target-audience)
- [Features](#features)
- [How It Works](#how-it-works)
  - [DP State Invariant & Recurrence Relation Flow](#dp-state-invariant--recurrence-relation-flow)
- [File Structure](#file-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Running Solutions](#running-solutions)
- [Solved Problem Catalog](#solved-problem-catalog)
- [Performance & Asymptotic Complexity Analysis](#performance--asymptotic-complexity-analysis)
- [Future Scope and Improvements](#future-scope-and-improvements)
- [Author & Connect](#author--connect)

---

## Overview

Dynamic Programming is widely regarded as one of the most challenging topics in competitive programming and technical coding interviews. The hurdle lies not in code syntax, but in recognizing optimal substructure, defining minimal state representations, and constructing forward or backward transitions without state explosion.

This repository tracks solved problems from the foundational stages of the **YouKn0wWho Academy DP Roadmap**, including AtCoder Educational DP Contest tasks and CSES Dynamic Programming problem sets.

### Target Audience
- **Competitive Programmers**: Master 1D and 2D dynamic programming, knapsack variants, and combinatorics.
- **Interview Candidates**: Prepare for FAANG/tier-1 algorithmic technical rounds requiring optimal DP transitions.
- **Computer Science Students**: Review clean, idiomatic Python solutions with annotated recurrence relations.

---

## Features

- **Annotated Recurrences**: Code files contain clear comments defining the base case, state parameters (`dp[i][w]`), and transition formulas.
- **Memory Compression Techniques**: Demonstrates transitioning from 2D matrices to rolling 1D arrays ($O(W)$ auxiliary space) for space-constrained environments.
- **Top-Down & Bottom-Up Approaches**: Contrasting memoized recursive formulations with iterative bottom-up tabular loops.

---

## How It Works

### DP State Invariant & Recurrence Relation Flow

```
Problem: 0/1 Knapsack (AtCoder DP Contest - Knapsack 1)

State:
  dp[w] = Maximum value achievable with total weight <= w

Transition:
  For each item (weight, value):
      For w from W down to weight:
          dp[w] = max(dp[w], dp[w - weight] + value)

Space Optimization:
  Iterating backwards over weight enables in-place state compression from O(N * W) to O(W).
```

---

## File Structure

```
YOUKNOWWHO/
├── DYNAMIC PROGRAMMING/
│   └── 1/
│       ├── KNAPSACK_1.py           # 0/1 Knapsack tabular formulation
│       ├── 2_KNAPSACK_1.py         # Space-optimized rolling array variant
│       └── DICE_COMBINATION.py     # CSES Dice Combinations (Coin Change variant)
└── README.md
```

---

## Getting Started

### Prerequisites

- **Python**: v3.8 or higher

### Running Solutions

Clone the repository and run any problem script against stdin:

```bash
git clone https://github.com/smresponsibilities/YOUKNOWWHO.git
cd YOUKNOWWHO/"DYNAMIC PROGRAMMING"/1
python DICE_COMBINATION.py
```

---

## Solved Problem Catalog

| Problem | Platform | Paradigm | Time Complexity | Space Complexity |
|---|---|---|---|---|
| **Knapsack 1** | AtCoder DP Contest | 0/1 Knapsack | $O(N \cdot W)$ | $O(W)$ |
| **Dice Combinations** | CSES DP Section | Unbounded DP / Counting | $O(N)$ | $O(N)$ |

---

## Performance & Asymptotic Complexity Analysis

- **Execution Limits**: All solutions are designed to execute well within standard 1.0–2.0 second platform limits.
- **Memory Optimization**: In-place 1D arrays maintain space consumption under **15 MB** on deep test cases.

---

## Future Scope and Improvements

- **Tree DP & Bitmask DP**: Expand catalog to include bitmask traveling salesman variants and subtree rerooting algorithms.
- **Digit DP Section**: Implement counting solutions constrained by digit bounds ($N \le 10^{18}$).

---

## Author & Connect

Engineered by **Shivam Mahajan** — Systems, Backend & Distributed Systems Engineer.

- **Portfolio**: [https://shivammahajan.com/](https://shivammahajan.com/)
- **Engineering Journal (2,002 Days of Code)**: [https://shivammahajan.com/blog/](https://shivammahajan.com/blog/)
- **GitHub**: [@smresponsibilities](https://github.com/smresponsibilities)
- **LinkedIn**: [Shivam Mahajan](https://www.linkedin.com/in/mahajanshivam/)
