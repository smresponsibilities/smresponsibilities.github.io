# Case Study: Compiling a Pure C99 Wordle Game Engine to a 2.4 KB WebAssembly Binary with Zero Dependencies

**Target Communities:** Dev.to (`#c`, `#webassembly`, `#algorithms`, `#webdev`), Reddit (`r/programming`, `r/C_Programming`, `r/WebAssembly`), Hacker News (Show HN)  
**Author:** Shivam Mahajan ([shivammahajan.com](https://shivammahajan.com/))  
**Target Search Queries:** "Compiling pure C to WebAssembly without Emscripten runtime bloat", "Wordle duplicate letter check algorithm in C", "Fast hash table lookup in C99"

---

## Why Compile C99 to WebAssembly?

Most modern browser games written in high-level frameworks ship megabytes of JavaScript runtimes, garbage collectors, and virtual DOM diffing logic. Even when using Emscripten to compile C/C++, default build configurations frequently output 150 KB to 500 KB of wrapper glue code just to initialize memory and standard I/O.

To demonstrate deterministic systems programming in the browser, I built a complete Wordle game engine in pure ISO C99 and compiled it to a **standalone 2,422-byte (2.4 KB) WebAssembly binary** that runs directly in any modern browser with zero third-party JavaScript dependencies.

- **Live Playable Game:** [shivammahajan.com/Wordle/](https://shivammahajan.com/Wordle/)
- **Interactive Call-Tree Simulator:** [shivammahajan.com/wordle-simulator/](https://shivammahajan.com/wordle-simulator/)
- **GitHub Repository:** [github.com/smresponsibilities/Wordle](https://github.com/smresponsibilities/Wordle)
- **Portfolio Architecture:** [shivammahajan.com/projects/wordle/](https://shivammahajan.com/projects/wordle/)

---

## 1. The Two-Pass Duplicate Letter Problem

The core algorithmic challenge in Wordle is handling duplicate letters accurately between the user's guess and the hidden target word.

Consider a scenario where the target word is `ERASE` (two `E`s) and the user guesses `SPEED` (two `E`s):
- The first `E` in `SPEED` is at index 2 (target index 4).
- The second `E` in `SPEED` is at index 3 (target index 3 -> exact match!).

If you evaluate letters in a naive single left-to-right pass, the first `E` would incorrectly claim a yellow match before the second `E` claims the green match, leading to invalid game states.

### The Two-Pass Resolution in C99

To solve this deterministically:
1. **Pass 1 (Green / Exact Matches):** Identify all exact positional matches. For every match, record the green status and decrement that character's count in a frequency histogram.
2. **Pass 2 (Yellow & Grey):** For all remaining unmatched characters, check the histogram. If the letter exists in the target with remaining count > 0, assign Yellow and decrement the count. Otherwise, assign Grey (Absent).

```c
// Core evaluation logic (from src/wordcheck.c)
void evaluate_guess(const char *target, const char *guess, int *result) {
    int target_freq[26] = {0};
    int matched[5] = {0};

    // Build target frequency map
    for (int i = 0; i < 5; i++) {
        target_freq[target[i] - 'A']++;
    }

    // Pass 1: Mark exact positional matches (Green = 2)
    for (int i = 0; i < 5; i++) {
        if (guess[i] == target[i]) {
            result[i] = 2; // EXACT_MATCH
            target_freq[guess[i] - 'A']--;
            matched[i] = 1;
        }
    }

    // Pass 2: Mark misplaced matches (Yellow = 1) or absent (Grey = 0)
    for (int i = 0; i < 5; i++) {
        if (matched[i]) continue;

        int char_idx = guess[i] - 'A';
        if (target_freq[char_idx] > 0) {
            result[i] = 1; // MISPLACED
            target_freq[char_idx]--;
        } else {
            result[i] = 0; // ABSENT
        }
    }
}
```

This guarantees O(N) evaluation time where N=5, executing in sub-microsecond latency.

---

## 2. O(1) Dictionary Lookup via Polynomial Hashing

Wordle requires validating user input against a dictionary of 12,972 five-letter English words.

Performing a linear scan across 13,000 strings on every keystroke wastes memory bandwidth. In place of heavy hash table libraries, the engine uses a custom polynomial rolling hash:

$$\text{hash}(w) = \left( \sum_{i=0}^{4} w[i] \cdot 31^{4-i} \right) \pmod{P}$$

Where $P = 65,537$ (a Fermat prime).

By precomputing and sorting the hashes into a compact static array, dictionary lookups execute in $O(1)$ expected time with zero dynamic memory allocation (`malloc`), eliminating heap fragmentation risks in the WebAssembly linear memory pool.

---

## 3. Compiling to a 2.4 KB Standalone Wasm Binary

To achieve a 2.4 KB binary without Emscripten's runtime overhead, Clang's native WebAssembly target was used directly:

```bash
clang --target=wasm32 \
      -O3 \
      -nostdlib \
      -Wl,--no-entry \
      -Wl,--export-all \
      -Wl,--strip-all \
      -Wl,--allow-undefined \
      -o wordle.wasm \
      src/wordcheck.c src/hash.c src/color.c
```

### Key compiler flags:
- `-nostdlib`: Strips the standard C library, avoiding bloat from unnecessary syscall stubs.
- `-Wl,--no-entry`: Informs the linker that the binary is a library of exported functions, not a standalone CLI executable with `main()`.
- `-Wl,--strip-all`: Strips all debug symbols and extraneous metadata.

The resulting binary: **2,422 bytes**.

---

## 4. Zero-Copy JavaScript Interop

The frontend communicates with WebAssembly via shared linear memory (`WebAssembly.Memory`). 

Instead of serializing and deserializing JSON objects across the boundary:
1. JavaScript writes the 5-character string directly into the Wasm instance's memory buffer.
2. JavaScript calls `evaluate_guess(target_offset, guess_offset, result_offset)`.
3. JavaScript reads the resulting integer array directly from the memory buffer offset.

This achieves zero-copy execution with zero garbage collection pressure on the browser engine.

---

## Key Takeaway

Compiling low-level C99 code directly to WebAssembly demonstrates that web applications do not require gigabytes of node modules or heavy runtime interpreters for deterministic compute tasks.

- **Play the Game:** [shivammahajan.com/Wordle/](https://shivammahajan.com/Wordle/)
- **Live Simulator:** [shivammahajan.com/wordle-simulator/](https://shivammahajan.com/wordle-simulator/)
- **GitHub Source:** [github.com/smresponsibilities/Wordle](https://github.com/smresponsibilities/Wordle)
- **Author Profile:** [shivammahajan.com](https://shivammahajan.com/)
