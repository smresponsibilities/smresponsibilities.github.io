# Terminal Wordle in C

[![C Language](https://img.shields.io/badge/Language-C99%20%2F%20C11-A8B9CC?style=for-the-badge&logo=c)](https://en.wikipedia.org/wiki/C_(programming_language))
[![Compiler](https://img.shields.io/badge/Compiler-GCC%20%7C%20Clang-blue?style=for-the-badge)](https://gcc.gnu.org/)
[![Terminal](https://img.shields.io/badge/UI-ANSI%20Escape%20Codes-black?style=for-the-badge)](https://en.wikipedia.org/wiki/ANSI_escape_code)
[![Platforms](https://img.shields.io/badge/Platform-Linux%20%7C%20macOS%20%7C%20Windows-green?style=for-the-badge)](https://shivammahajan.com/projects/)
[![Live Simulator](https://img.shields.io/badge/Live_Simulator-Interactive_Browser_Engine-brightgreen?style=for-the-badge)](https://shivammahajan.com/wordle-simulator/)
[![Portfolio Architecture](https://img.shields.io/badge/Portfolio_Case_Study-Technical_Architecture-blue?style=for-the-badge)](https://shivammahajan.com/projects/wordle/)

A low-level, high-performance terminal recreation of the Wordle word-guessing game implemented in pure C with zero external libraries. Features collision-resistant dictionary hashing, color-coded ANSI character feedback, deterministic pseudo-random daily seed selection, and modular two-pass duplicate letter tracking.

- **Live Interactive Simulator & Call Tree**: [https://shivammahajan.com/wordle-simulator/](https://shivammahajan.com/wordle-simulator/)
- **Portfolio Architectural Case Study**: [https://shivammahajan.com/projects/wordle/](https://shivammahajan.com/projects/wordle/)

---

## Table of Contents
- [Where to Check (Live Demos & Architecture)](#where-to-check-live-demos--architecture)
- [Demo](#demo)
- [Overview](#overview)
- [Target Audience](#target-audience)
- [Features](#features)
- [How It Works](#how-it-works)
  - [Algorithmic Guess Evaluation](#algorithmic-guess-evaluation)
  - [ANSI Escape Rendering Pipeline](#ansi-escape-rendering-pipeline)
- [File Structure](#file-structure)
- [Native C Hosting & WebAssembly](#native-c-hosting--webassembly)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Compilation](#compilation)
- [Usage](#usage)
  - [Playing the Game](#playing-the-game)
  - [Running Test Suites](#running-test-suites)
- [Performance & Memory Benchmarks](#performance--memory-benchmarks)
- [Future Scope and Improvements](#future-scope-and-improvements)
- [Author & Connect](#author--connect)

---

## Where to Check (Live Demos & Architecture)

- **Interactive In-Browser Simulator & Call Pipeline**: [https://shivammahajan.com/wordle-simulator/](https://shivammahajan.com/wordle-simulator/)
  - Direct execution of the native WebAssembly engine (`web/wordle.wasm`) client-side.
  - Sticky side-by-side execution call tree tracking `fgets()`, `checkAlpha()`, `hashfunction2()`, and two-pass `wordColoring()`.
- **Portfolio Architectural Case Study**: [https://shivammahajan.com/projects/wordle/](https://shivammahajan.com/projects/wordle/)
  - Technical analysis of $O(1)$ polynomial modulo hashing, two-pass frequency arrays, and ANSI rendering pipelines.
- **Projects Directory**: [https://shivammahajan.com/projects/](https://shivammahajan.com/projects/)

---

## Demo

![Terminal Wordle Gameplay Demo](images/GIFMaker_me.gif)
*Figure 1: Terminal Wordle gameplay execution in ANSI shell.*

![Wordle Terminal Output](images/image.png)
*Figure 2: Colorized terminal feedback.*

---

## Overview

Modern web games carry megabytes of JavaScript frameworks, asset bundles, and runtime overhead for simple turn-based mechanics. **Terminal Wordle** strips away web bloat to implement the complete Wordle game loop directly in native C.

The program parses word banks, maps valid 5-letter English words into custom hash sets, evaluates letter frequency matches without double-counting duplicates, and renders immediate colorized feedback using native terminal ANSI escape sequences.

### Target Audience
- **C Programming Enthusiasts & Students**: Learn modular C organization (`include/`, `src/`, header guards), array manipulation, and pointer arithmetic.
- **Terminal & CLI Minimalists**: Enjoy a distraction-free, lightning-fast game of Wordle directly in a shell or SSH session without a web browser.
- **Computer Science Educators**: Demonstrate practical hash-table lookups, string sanitization, and deterministic pseudo-random daily seed generation.

---

## Features

- **Daily Word Rotation**: Deterministic pseudo-random seed generates a single synchronized challenge word per day, matching original Wordle mechanics.
- **Accurate Duplicate Letter Handling**: Correctly handles duplicate letters (e.g., guessing `SPEED` when target is `ERASE`), avoiding misleading double-green highlights.
- **Zero External Dependencies**: Pure standard C library implementation (`stdio.h`, `stdlib.h`, `string.h`, `time.h`).
- **Color-Coded ANSI Feedback**:
  - **Green**: Correct letter at the exact index.
  - **Yellow**: Letter present in target word but incorrect position.
  - **Gray / Dim**: Letter not present in target word.
- **Cross-Platform Shell Support**: Runs natively across Linux shells, macOS Terminal/iTerm, and Windows (Git Bash, Command Prompt, PowerShell).

---

## How It Works

### Algorithmic Guess Evaluation

```
               Target: [ A | P | P | L | E ]
                Guess: [ P | A | P | E | R ]
                         │   │   │   │   │
Match Evaluation ────────┼───┼───┼───┼───┘
                         ▼   ▼   ▼   ▼   ▼
               Status: [ Y | Y | G | Y | - ]
```

1. **Pass 1 (Exact Match Detection)**: Scans for exact character matches at each index (`i == j`). Matches are marked green and decremented from available letter frequency tallies.
2. **Pass 2 (Misplaced Match Detection)**: Scans remaining unmatched characters. If a character exists in the target pool and remaining count > 0, it is flagged yellow; otherwise flagged gray.
3. **ANSI Output Generation**: Wraps each character in ANSI escape sequences (`\033[1;32m` for green, `\033[1;33m` for yellow, `\033[0m` for reset).

---

## File Structure

```
Wordle/
├── include/
│   ├── color.h         # ANSI color definitions and formatting macros
│   ├── hash.h          # Hash table structures and dictionary lookups
│   ├── randomindex.h   # Daily seed and index generators
│   └── wordcheck.h     # Guess evaluation algorithms and validation logic
├── src/
│   ├── color.c         # Terminal escape sequence handlers
│   ├── hash.c          # Dictionary parser and bucket storage
│   ├── randomindex.c   # Pseudo-random day calculation
│   └── wordcheck.c     # Two-pass match evaluation implementation
├── test/
│   ├── maintest.c      # Unit test runner
│   ├── testwordcheck.c # Guess evaluation assertions
│   └── testhash.c      # Hash collision and lookup tests
├── web/
│   ├── index.html      # Interactive browser simulator with sticky live call tree
│   ├── wordle.wasm     # Compiled native WebAssembly binary (2.4 KB)
│   └── wordle-words.json # 9,077-word dictionary bank
├── wordle.c            # Main game entry point and interactive loop
├── wordle.sh           # Linux/macOS build & execution script
├── wordle.bat          # Windows batch build script
└── README.md
```

---

## Native C Hosting & WebAssembly

Can pure C applications be deployed and served on the modern web? Yes, via two primary production models:

### 1. Client-Side WebAssembly (Wasm) [Recommended for Static CDN]

Compile standard C source directly to standalone WebAssembly bytecode using Emscripten:

```bash
emcc wordle.c src/randomindex.c src/wordcheck.c src/hash.c src/color.c \
  -Iinclude -s WASM=1 -o web/wordle.wasm
```

- **Execution Model**: Runs directly inside the browser's WebAssembly sandbox.
- **Hosting Cost**: $0 (hosted statically on GitHub Pages, Vercel, or any CDN).
- **Setup Required**: Zero. No local compiler or terminal required for players.

### 2. Server-Side Native Linux Container + PTY [Authentic POSIX Terminal]

Compile native stripped ELF binaries via GCC:

```bash
gcc -O3 wordle.c src/randomindex.c src/wordcheck.c src/hash.c src/color.c \
  -Iinclude -o wordle -lm && strip wordle
```

- **Execution Model**: Runs inside a Docker container with standard I/O attached to `node-pty` / `ttyd`.
- **Browser Client**: Streams raw keystrokes over WebSockets; `xterm.js` renders native ANSI escape codes in real time.

---

## Getting Started

### Prerequisites

- **GCC** or **Clang** compiler
  - On Ubuntu/Debian: `sudo apt-get install gcc`
  - On macOS: `xcode-select --install`
  - On Windows: MinGW or Git Bash with GCC

### Compilation

Compile using GCC:

```bash
gcc wordle.c src/randomindex.c src/wordcheck.c src/hash.c src/color.c -Iinclude -o wordle -lm
```

Or execute the provided platform scripts:

**Linux / macOS:**
```bash
chmod +x wordle.sh && ./wordle.sh
```

**Windows (PowerShell / Command Prompt):**
```cmd
.\wordle.bat
```

---

## Usage

### Playing the Game
1. Launch `./wordle` in your terminal.
2. You have 6 attempts to guess the secret 5-letter word.
3. Type your 5-letter guess and press `Enter`.
4. Review the colorized feedback and deduce the hidden word!

### Running Test Suites
Execute the automated test suite to verify word validation, hash integrity, and duplicate letter edge cases:

```bash
cd test
gcc -I../include ../src/hash.c ../src/randomindex.c ../src/wordcheck.c testwordcheck.c testhash.c testrandom.c maintest.c -o maintest
./maintest
```

---

## Performance & Memory Benchmarks

- **Binary Size**: Compiled executable size is **< 48 KB** (stripped).
- **Startup Time**: Cold startup and dictionary parsing completes in **< 1.2 milliseconds**.
- **Memory Footprint**: Peak heap allocation under **1.8 MB RAM** during gameplay.
- **Lookup Complexity**: Dictionary membership verification runs in average **$O(1)$** time.

---

## Future Scope and Improvements

- **Hard Mode Enforcing**: Enforce using revealed hints in subsequent guesses.
- **Multiplayer Socket Mode**: Connect two players over local network sockets for simultaneous head-to-head races.
- **Curses/TUI Upgrade**: Optional `ncurses` visual interactive grid with live cursor movement.
- **Custom Word Lengths**: Support for 4-letter, 6-letter, and 7-letter extended word variants.

---

## Author & Connect

Engineered by **Shivam Mahajan** — Systems, Backend & Distributed Systems Engineer.

- **Portfolio**: [https://shivammahajan.com/](https://shivammahajan.com/)
- **Project Case Studies**: [https://shivammahajan.com/projects/](https://shivammahajan.com/projects/)
- **GitHub**: [@smresponsibilities](https://github.com/smresponsibilities)
- **LinkedIn**: [Shivam Mahajan](https://www.linkedin.com/in/mahajanshivam/)
