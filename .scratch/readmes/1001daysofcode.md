# 1001 (to 2002) Days of Code — Algorithmic Mastery Journal

[![Streak](https://img.shields.io/badge/Daily_Streak-1%2C240%2B_Consecutive_Days-orange?style=for-the-badge&logo=fire)](https://shivammahajan.com/blog/)
[![Problems Solved](https://img.shields.io/badge/Problems_Solved-2%2C600%2B-blue?style=for-the-badge)](https://shivammahajan.com/blog/)
[![Languages](https://img.shields.io/badge/Languages-Python%20%7C%20Java%20%7C%20C%2B%2B%20%7C%20Kotlin-brightgreen?style=for-the-badge)](https://shivammahajan.com/)
[![Platforms](https://img.shields.io/badge/Platforms-LeetCode%20%7C%20Codeforces%20%7C%20GeeksforGeeks-red?style=for-the-badge)](https://shivammahajan.com/projects/)

An ongoing multi-year commitment to mastering Data Structures, Algorithms, and Software Engineering problem solving. Spanning **1,240+ consecutive days**, **2,600+ solved algorithmic challenges**, and **425+ unit test suites**.

Live Engineering Journal: [Daily Journal on Shivam Mahajan Portfolio](https://shivammahajan.com/blog/)

---

## Table of Contents
- [Overview](#overview)
- [Target Audience](#target-audience)
- [Features](#features)
- [How It Works](#how-it-works)
  - [Daily Consistency & Problem Ingestion](#daily-consistency--problem-ingestion)
  - [Complexity Analysis Standard](#complexity-analysis-standard)
- [File Structure](#file-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Running Solutions](#running-solutions)
- [Topic Breakdown](#topic-breakdown)
- [Performance & Milestone Statistics](#performance--milestone-statistics)
- [Future Scope and Roadmap](#future-scope-and-roadmap)
- [Author & Connect](#author--connect)

---

## Overview

Software engineering interviews and production systems design both demand deep algorithmic intuition — understanding when to reach for a monotonic stack over a priority queue, how to optimize cache spatial locality, or when dynamic programming transitions can be state-compressed.

**1001 Days of Code** began as a 1,000-day consistency commitment and has expanded toward a **2,002-day milestone**. Every day without exception, at least one algorithmic problem from LeetCode, Codeforces, or GeeksforGeeks is solved, analyzed for asymptotic time/space complexity ($O(N)$), and committed with documented edge cases.

### Target Audience
- **Competitive Programmers & DSA Students**: Browse practical implementations of complex data structures (Fenwick Trees, Disjoint Set Union, Segment Trees, Trie).
- **Interview Candidates**: Review real problem patterns with detailed time/space trade-offs and Python/Java/C++ idioms.
- **Engineers Building Consistency**: Draw inspiration for daily deliberate practice and continuous technical growth.

---

## Features

- **Unbroken Daily Streak**: Over 1,240+ consecutive days of commits without skipped calendar dates.
- **2,600+ Solved Problems**: Across all difficulty tiers (Easy, Medium, Hard) and platform contest problems.
- **Multi-Language Implementations**: Solutions authored across Python, Java, C++, and Kotlin.
- **Explicit Complexity Annotations**: Every solution file notes exact Worst-Case Time Complexity and Auxiliary Space Complexity.
- **Edge-Case Test Suites**: Unit test coverage covering null inputs, negative integers, overflow constraints, and cycle detection.

---

## How It Works

### Daily Consistency & Problem Ingestion

```
┌─────────────────────────────────────────────────────────────┐
│                       Daily Challenge                       │
│       LeetCode Daily / Codeforces Round / GfG POTD          │
└──────────────────────────────┬──────────────────────────────┘
                               │ Solve & Optimize
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 Algorithmic Architecture                    │
│  - Brute Force Baseline Analysis                            │
│  - Optimal Substructure / Invariant Identification          │
│  - Edge Case Boundary Verification (Min/Max Constraints)    │
└──────────────────────────────┬──────────────────────────────┘
                               │ Document & Commit
                               ▼
┌─────────────────────────────────────────────────────────────┐
│           Committed Daily Repository Artifacts              │
│  `day{N}/solution.py`: Code + Big-O Analysis + Explanations │
│  Synched to Shivam Mahajan Portfolio Engineering Journal    │
└─────────────────────────────────────────────────────────────┘
```

### Complexity Analysis Standard

Each daily file adheres to a standardized structural header:

```python
"""
Problem: 42. Trapping Rain Water (Hard)
Pattern: Two Pointers / Monotonic Decreasing Stack
Time Complexity: O(N) — single pass with two pointers
Space Complexity: O(1) — constant auxiliary pointers
Edge Cases: Empty array, strictly monotonic arrays (no trapped water)
"""
```

---

## File Structure

```
1001daysofcode/
├── day1/               # Day 1: Array manipulation & Two Pointers
├── day2/               # Day 2: Sliding Window patterns
├── ...                 # Sequential daily directories
├── day500/             # Day 500: Dynamic Programming & Knapsack variants
├── ...
├── day1000/            # Day 1000: Graph theory & Dijkstra / Floyd-Warshall
├── ...
├── day1240+/           # Current frontier
└── README.md
```

---

## Getting Started

### Prerequisites

- **Python 3.10+** (or Java 17+ / GCC for C++ solutions)
- `pytest` (optional, for running test suites)

### Running Solutions

Navigate to any daily directory and execute the solution script:

```bash
# Clone the repository
git clone https://github.com/smresponsibilities/1001daysofcode.git
cd 1001daysofcode

# Run a specific day's solution
python day42/solution.py
```

---

## Topic Breakdown

| Algorithmic Domain | Key Patterns & Data Structures Covered |
|---|---|
| **Arrays & Hashing** | Two Pointers, Sliding Window, Prefix Sums, Dutch National Flag |
| **Trees & Graphs** | BFS/DFS, Dijkstra, Bellman-Ford, Tarjan's SCC, Topological Sort |
| **Dynamic Programming** | 0/1 Knapsack, Longest Common Subsequence, Bitmask DP, Digit DP |
| **Advanced Structures** | Segment Trees, Fenwick Trees (BIT), Monotonic Queue, Disjoint Set Union |
| **String Algorithms** | KMP String Matching, Z-Algorithm, Rolling Hash (Rabin-Karp), Manacher's |

---

## Performance & Milestone Statistics

- **Consecutive Days Active**: **1,240+ days**.
- **Total Problems Catalogued**: **2,600+ problems**.
- **LeetCode Rating**: Top 5% globally across contest participants.
- **Target Horizon**: Continuous progression toward **2,002 consecutive days of code**.

---

## Future Scope and Roadmap

- **Interactive Search Index**: Web-based searchable frontend indexing all 2,600+ problems by data structure tag and difficulty on [shivammahajan.com](https://shivammahajan.com/).
- **Automated Complexity Linter**: GitHub Actions linter verifying that every commit contains valid Big-O annotations and tests.
- **Anki Flashcard Deck**: Spaced repetition flashcards generated from the most illuminating solution patterns.

---

## Author & Connect

Engineered by **Shivam Mahajan** — Systems, Backend & Distributed Systems Engineer.

- **Portfolio**: [https://shivammahajan.com/](https://shivammahajan.com/)
- **Engineering Journal (2,002 Days)**: [https://shivammahajan.com/blog/](https://shivammahajan.com/blog/)
- **GitHub**: [@smresponsibilities](https://github.com/smresponsibilities)
- **LinkedIn**: [Shivam Mahajan](https://www.linkedin.com/in/mahajanshivam/)
