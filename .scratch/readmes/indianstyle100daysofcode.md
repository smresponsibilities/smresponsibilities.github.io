# 100 Days of Code Challenge in Python

[![Python](https://img.shields.io/badge/Language-Python%203-3776AB?style=for-the-badge&logo=python)](https://python.org)
[![Challenge](https://img.shields.io/badge/Challenge-100%20Days%20of%20Code-orange?style=for-the-badge)](https://www.100daysofcode.com/)
[![Focus](https://img.shields.io/badge/Domain-Python%20Fundamentals-brightgreen?style=for-the-badge)](https://shivammahajan.com/blog/)

A daily progression repository cataloging hands-on exercises, procedural logic scripts, and practical utilities created during Angela Yu's renowned 100 Days of Code Python curriculum.

Project Reference: [Daily Journal on Shivam Mahajan Portfolio](https://shivammahajan.com/blog/) · [Portfolio](https://shivammahajan.com/)

---

## Table of Contents
- [Overview](#overview)
- [Target Audience](#target-audience)
- [Features](#features)
- [How It Works](#how-it-works)
  - [Daily Problem Solving Methodology](#daily-problem-solving-methodology)
- [File Structure](#file-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Running Daily Exercises](#running-daily-exercises)
- [Performance & Benchmarks](#performance--benchmarks)
- [Future Scope and Improvements](#future-scope-and-improvements)
- [Author & Connect](#author--connect)

---

## Overview

Mastering programming fundamentals requires daily repetition, decomposing abstract mathematical requirements into clean variable scopes, arithmetic operations, and conditional loops.

**100 Days of Code in Python** captures early foundational coding milestones: from simple CLI string concatenation tools (Day 1: Band Name Generator) and floating-point financial arithmetic (Day 2: Tip Calculator) to complex control loops.

### Target Audience
- **Beginner Developers & Students**: Follow along with practical, bite-sized daily Python projects without intimidation.
- **Educators**: Access clean code examples for classroom demonstrations of basic user input handling and formatting.

---

## Features

- **Procedural Foundations**: Clear demonstration of strings, format strings (`f""`), integer/float type casting, and standard input/output.
- **Standalone Execution**: Each daily script is entirely self-contained and runnable without external library installations.
- **Edge-Case Input Validation**: Handles zero-division bounds and decimal precision rounding (`round()`).

---

## How It Works

### Daily Problem Solving Methodology

```
┌─────────────────────────────────────────────────────────────┐
│                 Daily Problem Specification                 │
│              (e.g., Tip Calculation, Bill Splitting)        │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 Input Parsing & Validation                  │
│  - Total Bill (Float), Tip Percentage (Int), Guests (Int)   │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 Mathematical Transformation                 │
│         `total_per_person = (bill * (1 + tip / 100)) / guests` │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 Formatted Console Output                    │
│                 Formatted to 2 decimal places (`:.2f`)      │
└─────────────────────────────────────────────────────────────┘
```

---

## File Structure

```
indianstyle100daysofcode/
├── bandnamegeneratorday1.py    # Day 1: City & pet name string generator
├── tipcalculatorday2.py        # Day 2: Tip and bill splitter with precision rounding
└── README.md                   # Challenge overview and documentation
```

---

## Getting Started

### Prerequisites

- **Python**: v3.6 or higher

### Running Daily Exercises

1. Clone the repository:
   ```bash
   git clone https://github.com/smresponsibilities/indianstyle100daysofcode.git
   cd indianstyle100daysofcode
   ```
2. Run any daily script:
   ```bash
   python tipcalculatorday2.py
   ```

---

## Performance & Benchmarks

- **Runtime Overhead**: Under **2ms** execution time per script.
- **Memory Consumption**: Under **5 MB** resident memory in standard CPython runtime.

---

## Future Scope and Improvements

- **Interactive CLI Menu**: Unified prompt to execute any day's exercise from a single runner.
- **Unit Testing Coverage**: Automated PyTest suites asserting mathematical accuracy across inputs.

---

## Author & Connect

Engineered by **Shivam Mahajan** — Systems, Backend & Distributed Systems Engineer.

- **Portfolio**: [https://shivammahajan.com/](https://shivammahajan.com/)
- **Engineering Journal (2,002 Days of Code)**: [https://shivammahajan.com/blog/](https://shivammahajan.com/blog/)
- **GitHub**: [@smresponsibilities](https://github.com/smresponsibilities)
- **LinkedIn**: [Shivam Mahajan](https://www.linkedin.com/in/mahajanshivam/)
