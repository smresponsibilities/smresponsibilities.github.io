// Measured in each 420 × 816 casing plate. Gaps belong to the shell, never to a button.
export const controls = [
  { id: "outer-latch", owner: "outer", action: "open", label: "OPEN: unfold the cover and resume the portfolio", text: "▶", tone: "yellow", shape: "latch", x: 28, y: 399, width: 56, height: 64 },
  { id: "body-b", owner: "body", action: "b", label: "B: go back one level; close from Main Menu", text: "", tone: "red", shape: "round", x: 57, y: 501, width: 30, height: 30 },
  { id: "body-power", owner: "body", action: "close", label: "CLOSE: fold the cover; keep the current portfolio page", text: "⏻", tone: "black", shape: "round", x: 28, y: 580, width: 62, height: 62 },
  { id: "body-start", owner: "body", action: "start", label: "START: return to all six portfolio sections", text: "START", tone: "red", shape: "pill", x: 112, y: 583, width: 77, height: 32 },
  { id: "body-select", owner: "body", action: "select", label: "SELECT: switch Red / Blue flavour text", text: "SELECT", tone: "blue", shape: "pill", x: 209, y: 583, width: 83, height: 32 },
  { id: "body-neutral-select", owner: "body", action: "select", label: "VERSION: switch Red / Blue flavour text", text: "", tone: "white", shape: "pill", x: 342, y: 580, width: 32, height: 26 },
  { id: "body-menu", owner: "body", action: "start", label: "MENU: return to all six portfolio sections", text: "MENU", tone: "green", shape: "rect", x: 111, y: 654, width: 141, height: 77 },
  ...[
    ["up", "▲", 332, 628, 42, 34], ["left", "◀", 296, 664, 34, 40],
    ["right", "▶", 376, 664, 34, 40], ["down", "▼", 332, 706, 42, 34],
  ].map(([direction, text, x, y, width, height]) => ({
    id: `dpad-${direction}`, owner: "body", action: direction, text, tone: "black", shape: "dpad",
    label: `D-pad ${direction}: ${direction === "up" || direction === "down" ? "move the highlighted item" : "change content page"}`,
    x, y, width, height,
  })),
  ...["PROFILE: identity and stats", "MOVES: projects", "ENCOUNTERS: work experience", "RIBBONS: achievements", "EVOLUTION: career stages", "DEX: flavour text and public roster", "RESUME: sample resume view", "ADD: sample /become roster form", "VERSION: switch Red / Blue", "MENU: all six sections"].map((label, index) => ({
    id: `keypad-${index + 1}`, owner: "inner", action: `keypad-${index + 1}`, label: `${index + 1}: ${label}`,
    text: String(index + 1).padStart(2, "0"), tone: "blue", shape: "key",
    x: 32 + index % 5 * 72, y: 383 + Math.floor(index / 5) * 72, width: 62, height: 62,
  })),
  { id: "inner-back", owner: "inner", action: "b", label: "B: go back one level; close from Main Menu", text: "B", tone: "black", shape: "pill", x: 182, y: 545, width: 87, height: 34 },
  { id: "inner-close", owner: "inner", action: "close", label: "CLOSE: fold this cover over the hinge; keep your page", text: "CLOSE", tone: "black", shape: "pill", x: 291, y: 545, width: 87, height: 34 },
  { id: "inner-page-left", owner: "inner", action: "left", label: "PREVIOUS: show previous content page", text: "◀", tone: "white", shape: "key", x: 32, y: 562, width: 57, height: 62 },
  { id: "inner-page-right", owner: "inner", action: "right", label: "NEXT: show next content page", text: "▶", tone: "white", shape: "key", x: 103, y: 562, width: 57, height: 62 },
  { id: "inner-a", owner: "inner", action: "a", label: "A: open the highlighted section or entry", text: "A", tone: "yellow", shape: "round", x: 318, y: 604, width: 58, height: 58 },
  { id: "inner-version-prev", owner: "inner", action: "version-prev", label: "RED: show the Red version entry", text: "RED", tone: "dark-green", shape: "rect", x: 32, y: 696, width: 156, height: 72 },
  { id: "inner-version-next", owner: "inner", action: "version-next", label: "BLUE: show the Blue version entry", text: "BLUE", tone: "dark-green", shape: "rect", x: 220, y: 696, width: 156, height: 72 },
];
