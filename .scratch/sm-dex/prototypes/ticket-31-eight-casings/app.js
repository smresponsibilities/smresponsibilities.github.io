const device = document.querySelector("#device");
const frame = document.querySelector("#device-frame");
const primaryScreen = document.querySelector("#primary-screen");
const secondaryScreen = document.querySelector("#secondary-screen");
const bodyControls = document.querySelector("#body-controls");
const innerControls = document.querySelector("#inner-controls");
const outerControls = document.querySelector("#outer-controls");
const innerFace = document.querySelector("#inner-face");
const outerFace = document.querySelector("#outer-face");

if (new URLSearchParams(window.location.search).has("reduce-motion")) {
  document.documentElement.classList.add("reduce-motion");
}

const MENU = ["PROFILE", "MOVES", "ENCOUNTERS", "RIBBONS", "EVOLUTION", "DEX"];
const VERSIONS = [
  {
    name: "RED",
    entry:
      "Consumes coffee to regulate operating temperature. Has not skipped a day of code in over 1,150 days.",
  },
  {
    name: "BLUE",
    entry: "Capable of processing five million events in a single migration cycle. Refuses to drop a single row.",
  },
];

const SECTIONS = {
  PROFILE: [
    {
      title: "SHIVAM MAHAJAN",
      meta: "#001 · HUMANOID POKÉMON",
      body: "Software Developer. Dragon/Steel. Released and ready for the next evolution.",
      badges: ["DRAGON", "STEEL", "RELEASED"],
      facts: [["Lv.", "12"], ["HT", "6'00\""], ["WT", "169.8 lbs"], ["OT", "MORGAN STANLEY"]],
    },
    {
      title: "ZERO TOLERANCE",
      meta: "ABILITY",
      body: "This Pokémon's pipelines do not drop rows.",
      badges: ["ABILITY"],
      facts: [["HIDDEN", "STREAK"], ["ITEM", "VIM"]],
    },
    {
      title: "EVOLUTION",
      meta: "STUDENT → APPRENTICE → DEVELOPER",
      body: "Next evolution exists. Its condition remains unknown.",
      badges: ["Lv. ??"],
      facts: [["STUDENT", "2022"], ["APPRENTICE", "Lv. 1"], ["DEVELOPER", "Lv. 12"]],
    },
  ],
  MOVES: [
    {
      title: "PRODUCTIVITY CALLER",
      meta: "ELECTRIC · PHYSICAL · Lv. 10",
      body: "Calls you instead of notifying you.",
      badges: ["ELECTRIC", "KOTLIN"],
      facts: [["PWR", "95"], ["ACC", "100%"], ["PP", "30/30"], ["TARGET", "ALL ADJACENT"]],
    },
    {
      title: "TM01 · CIAM WAREHOUSE",
      meta: "WATER · SPECIAL · Lv. 1",
      body: "Moves five million events, drops none.",
      badges: ["WATER", "PYSPARK"],
      facts: [["PWR", "100"], ["ACC", "100%"], ["PP", "30/30"], ["USERS", "500K+"]],
    },
    {
      title: "CHAINCODE",
      meta: "DRAGON · SPECIAL · BEFORE CAPTURE",
      body: "Turns committed code into an NFT.",
      badges: ["DRAGON", "SOLIDITY"],
      facts: [["PWR", "85"], ["ACC", "95%"], ["PP", "0/15"], ["PRIO", "+1"]],
    },
    {
      title: "QUIZDECK",
      meta: "ELECTRIC · SPECIAL · BEFORE CAPTURE",
      body: "Real-time quiz for 500 at once.",
      badges: ["ELECTRIC", "REACT"],
      facts: [["PWR", "70"], ["ACC", "75%"], ["PP", "0/10"], ["LATENCY", "31 ms"]],
    },
  ],
  ENCOUNTERS: [
    {
      title: "MORGAN STANLEY",
      meta: "TECHNOLOGY APPRENTICE",
      body: "Caught on campus with a Nest Ball. Met at Lv. 1.",
      badges: ["NEST BALL", "RELEASED"],
      facts: [["FROM", "AUG 2025"], ["TO", "AUG 2026"], ["MET", "Lv. 1"]],
    },
    {
      title: "CHITKARA UNIVERSITY",
      meta: "ORIGIN · PRE-EVOLUTION",
      body: "Computer Science and Engineering. Dean's List, 2022–2026.",
      badges: ["STUDENT"],
      facts: [["CGPA", "9.35/10"], ["FROM", "2022"], ["TO", "2026"]],
    },
  ],
  RIBBONS: [
    { title: "ENDURANCE", meta: "2,002 DAYS OF CODE", body: "Maintained a 1,150+ day active streak.", badges: ["RIBBON"] },
    { title: "CORE CONTRIBUTOR", meta: "MEDIAWIKI CORE", body: "Selected from 260+ applicants; change merged into core.", badges: ["RIBBON"] },
    { title: "PROBLEM SOLVER", meta: "2,600+ PROBLEMS", body: "LeetCode 1,900+ and Codeforces 700+.", badges: ["RIBBON"] },
    { title: "TOURNAMENT", meta: "3RD OF 200+ TEAMS", body: "Placed third at HackIndia Regionals.", badges: ["RIBBON"] },
    { title: "DEAN'S LIST", meta: "CGPA 9.35 / 10", body: "Chitkara University, 2022–2026.", badges: ["RIBBON"] },
  ],
  EVOLUTION: [
    {
      title: "STUDENT → DEVELOPER",
      meta: "CAREER EVOLUTION",
      body: "Student, technology apprentice, then software developer. Next evolution remains unknown.",
      badges: ["EVOLUTION"],
      facts: [["START", "2022"], ["CURRENT", "Lv. 12"]],
    },
  ],
  DEX: [
    {
      title: "#001 SHIVAM",
      meta: "DRAGON / STEEL",
      body: "Humanoid Pokémon. Registered and released.",
      badges: ["REGISTERED"],
      facts: [["SEEN", "001"], ["CAUGHT", "001"]],
    },
    {
      title: "REGISTERED 1/151",
      meta: "COMMUNITY ROSTER",
      body: "One species registered. Empty slots invite the next trainer.",
      badges: ["DEX"],
      facts: [["SLOTS", "151"], ["OPEN", "150"]],
    },
    {
      title: "UNIDENTIFIED SPECIES",
      meta: "AVATAR FALLBACK",
      body: "GitHub identicons remain valid entries when no custom avatar exists.",
      badges: ["NO DATA"],
    },
  ],
};

const state = {
  open: false,
  mode: "closed",
  menuIndex: 0,
  itemIndex: 0,
  page: 0,
  version: 0,
  lastControl: null,
};

let bootTimer = 0;

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function addLayer(container, src, className, x, y, width, height) {
  const image = document.createElement("img");
  image.className = `control-layer ${className}`;
  image.src = src;
  image.alt = "";
  Object.assign(image.style, {
    left: `${x}px`,
    top: `${y}px`,
    width: `${width}px`,
    height: `${height}px`,
  });
  container.append(image);
  return image;
}

function addControl(container, spec) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `control ${spec.className || ""}`.trim();
  button.dataset.action = spec.action;
  button.dataset.controlId = spec.id;
  button.setAttribute("aria-label", spec.label);
  button.title = spec.label;
  button.setAttribute("aria-describedby", "control-help");
  Object.assign(button.style, {
    left: `${spec.x}px`,
    top: `${spec.y}px`,
    width: `${spec.width}px`,
    height: `${spec.height}px`,
  });

  const label = document.createElement("span");
  label.className = "sr-only";
  label.textContent = spec.label;
  button.append(label);

  if (spec.base) {
    const base = document.createElement("img");
    base.className = "base";
    base.src = spec.base;
    base.alt = "";
    button.append(base);
  }

  if (spec.face) {
    const face = document.createElement("img");
    face.className = "face";
    face.src = spec.face;
    face.alt = "";
    button.append(face);
  }
  button.addEventListener("click", () => handleAction(spec.action, spec.id));
  container.append(button);
  return button;
}

function buildControls() {
  const asset = (name) => `assets/${name}.png`;

  addControl(outerControls, {
    id: "outer-latch",
    action: "open",
    label: "Open lid",
    x: 26,
    y: 396,
    width: 58,
    height: 74,
    base: asset("outer-latch-face"),
    face: asset("outer-latch-face"),
    className: "self-base",
  });
  addControl(bodyControls, {
    id: "body-b",
    action: "b",
    label: "B: back",
    x: 85,
    y: 458,
    width: 31,
    height: 31,
    base: asset("stationary-round-base"),
    face: asset("bezel-round-face"),
  });
  addControl(bodyControls, {
    id: "body-power",
    action: "close",
    label: "Close lid",
    x: 38,
    y: 546,
    width: 58,
    height: 58,
    base: asset("stationary-round-base"),
    face: asset("stationary-round-face"),
  });
  addControl(bodyControls, {
    id: "body-start",
    action: "start",
    label: "START: main menu",
    x: 111,
    y: 545,
    width: 80,
    height: 29,
    base: asset("stationary-red-pill-base"),
    face: asset("stationary-red-pill-face"),
  });
  addControl(bodyControls, {
    id: "body-select",
    action: "select",
    label: "SELECT: change version",
    x: 214,
    y: 545,
    width: 90,
    height: 28,
    base: asset("stationary-blue-pill-base"),
    face: asset("stationary-blue-pill-face"),
  });
  addControl(bodyControls, {
    id: "body-grey-select",
    action: "select",
    label: "Alternate SELECT: change version",
    x: 325,
    y: 542,
    width: 38,
    height: 29,
    base: asset("stationary-red-pill-base"),
    face: asset("stationary-grey-pill-face"),
  });
  addControl(bodyControls, {
    id: "body-menu",
    action: "start",
    label: "Open main menu",
    x: 111,
    y: 605,
    width: 139,
    height: 85,
    base: asset("stationary-green-base"),
    face: asset("stationary-green-face"),
  });

  addLayer(bodyControls, asset("stationary-dpad-base"), "dpad-base", 282, 577, 124, 124);
  addLayer(bodyControls, asset("stationary-dpad-face"), "dpad-rocker", 282, 577, 124, 124);
  [
    ["up", "D-pad Up: move selection up", 324, 577, 40, 41],
    ["left", "D-pad Left: previous page", 282, 618, 42, 42],
    ["right", "D-pad Right: next page", 364, 618, 42, 42],
    ["down", "D-pad Down: move selection down", 324, 660, 40, 41],
  ].forEach(([action, label, x, y, width, height]) =>
    addControl(bodyControls, {
      id: `dpad-${action}`,
      action,
      label,
      x,
      y,
      width,
      height,
      className: "dpad-hit",
    }),
  );

  addLayer(innerControls, asset("inner-keypad-base"), "keypad-base", 55, 355, 304, 136);
  for (let index = 0; index < 10; index += 1) {
    const column = index % 5;
    const row = Math.floor(index / 5);
    const number = index + 1;
    addControl(innerControls, {
      id: `keypad-${number}`,
      action: `keypad-${number}`,
      label: number <= 6 ? `Open ${MENU[number - 1]}` : `Portfolio shortcut ${number}`,
      x: [55, 116, 177, 238, 298][column],
      y: 355 + row * 68,
      width: [61, 61, 61, 60, 61][column],
      height: 68,
      face: asset(`inner-keypad-${String(number).padStart(2, "0")}-face`),
    });
  }

  addLayer(innerControls, asset("inner-white-base"), "white-base", 51, 536, 124, 77);
  addControl(innerControls, {
    id: "inner-page-left",
    action: "left",
    label: "Previous page or tab",
    x: 51,
    y: 536,
    width: 62,
    height: 77,
    face: asset("inner-white-01-face"),
  });
  addControl(innerControls, {
    id: "inner-page-right",
    action: "right",
    label: "Next page or tab",
    x: 113,
    y: 536,
    width: 62,
    height: 77,
    face: asset("inner-white-02-face"),
  });
  addControl(innerControls, {
    id: "inner-back",
    action: "b",
    label: "Back: return one screen",
    x: 244,
    y: 516,
    width: 50,
    height: 30,
    base: asset("inner-pill-base"),
    face: asset("inner-pill-face"),
  });
  addControl(innerControls, {
    id: "inner-close",
    action: "close",
    label: "Close: fold the lid and retain this page",
    x: 309,
    y: 516,
    width: 50,
    height: 30,
    base: asset("inner-pill-base"),
    face: asset("inner-pill-face"),
  });
  addControl(innerControls, {
    id: "inner-version-prev",
    action: "version-prev",
    label: "Previous version",
    x: 52,
    y: 663,
    width: 137,
    height: 76,
    base: asset("inner-green-base"),
    face: asset("inner-green-left-face"),
  });
  addControl(innerControls, {
    id: "inner-version-next",
    action: "version-next",
    label: "Next version",
    x: 218,
    y: 663,
    width: 141,
    height: 76,
    base: asset("inner-green-base"),
    face: asset("inner-green-right-face"),
  });
  addControl(innerControls, {
    id: "inner-a",
    action: "a",
    label: "A: confirm or open",
    x: 310,
    y: 573,
    width: 50,
    height: 59,
    base: asset("stationary-round-base"),
    face: asset("inner-confirm-face"),
  });
}

function currentItems() {
  return SECTIONS[MENU[state.menuIndex]];
}

function currentItem() {
  const items = currentItems();
  state.itemIndex = Math.max(0, Math.min(items.length - 1, state.itemIndex));
  return items[state.itemIndex];
}

function menuMarkup() {
  return `
    <div class="screen-shell">
      <div class="screen-header"><span>MAIN MENU</span><span>PAGE ${state.page + 1}/2</span></div>
      <div class="menu-list" role="listbox" aria-label="Main menu">
        ${MENU.map(
          (item, index) => `
            <div class="screen-row ${index === state.menuIndex ? "selected" : ""}" role="option" aria-selected="${index === state.menuIndex}">
              <span class="cursor">${index === state.menuIndex ? "SEL" : "·"}</span><span>${item}</span><span>${String(index + 1).padStart(2, "0")}</span>
            </div>`,
        ).join("")}
      </div>
      <div class="screen-status">A CONFIRM · B CLOSE</div>
    </div>`;
}

function identityMarkup() {
  const version = VERSIONS[state.version];
  return `
    <div class="screen-shell compact">
      <div class="screen-header"><span>SM'S DEX</span><span>${version.name}</span></div>
      <div class="identity-mini">
        <img src="https://avatars.githubusercontent.com/smresponsibilities?s=108" alt="smresponsibilities's sprite" />
        <div><div class="dex-number">#001</div><div class="detail-title">SHIVAM</div><div class="micro">HUMANOID POKÉMON</div></div>
      </div>
      <div class="badges"><span class="badge">DRAGON</span><span class="badge steel">STEEL</span></div>
    </div>`;
}

function listMarkup() {
  const section = MENU[state.menuIndex];
  return `
    <div class="screen-shell">
      <div class="screen-header"><span>${section}</span><span>${state.itemIndex + 1}/${currentItems().length}</span></div>
      <div class="data-list" role="listbox" aria-label="${section} list">
        ${currentItems()
          .map(
            (item, index) => `
              <div class="screen-row ${index === state.itemIndex ? "selected" : ""}" role="option" aria-selected="${index === state.itemIndex}">
                <span class="cursor">${index === state.itemIndex ? "SEL" : "·"}</span><span>${escapeHtml(item.title)}</span>
              </div>`,
          )
          .join("")}
      </div>
      <div class="screen-status">A OPEN · B MENU</div>
    </div>`;
}

function previewMarkup() {
  const item = currentItem();
  return `
    <div class="screen-shell compact">
      <div class="screen-header"><span>${MENU[state.menuIndex]}</span><span>PG ${state.page + 1}</span></div>
      <div class="detail-title">${escapeHtml(item.title)}</div>
      <div class="micro">${escapeHtml(item.meta)}</div>
      <p class="screen-copy">${escapeHtml(state.page === 0 ? item.body : VERSIONS[state.version].entry)}</p>
    </div>`;
}

function factsMarkup(item) {
  if (!item.facts?.length) return "";
  return `<div class="micro-grid">${item.facts
    .slice(0, 4)
    .map(([key, value]) => `<div class="micro-cell"><span class="micro">${escapeHtml(key)}</span><span>${escapeHtml(value)}</span></div>`)
    .join("")}</div>`;
}

function detailMarkup() {
  const item = currentItem();
  const badges = (item.badges || [])
    .map((badge) => `<span class="badge ${badge === "STEEL" ? "steel" : badge === "ELECTRIC" ? "electric" : badge === "WATER" ? "water" : ""}">${escapeHtml(badge)}</span>`)
    .join("");
  return `
    <div class="screen-shell">
      <div class="screen-header"><span>${MENU[state.menuIndex]} · DETAIL</span><span>${state.itemIndex + 1}/${currentItems().length}</span></div>
      <div class="detail-title">${escapeHtml(item.title)}</div>
      <div class="micro">${escapeHtml(item.meta)}</div>
      <div class="badges">${badges}</div>
      <p class="screen-copy">${escapeHtml(item.body)}</p>
      ${factsMarkup(item)}
      ${MENU[state.menuIndex] === "PROFILE" ? '<div class="stat-bar"><span style="width:85%"></span></div><div class="micro">DEFENSE · 425 OF 500</div>' : ""}
    </div>`;
}

function detailContextMarkup() {
  const item = currentItem();
  return `
    <div class="screen-shell compact">
      <div class="screen-header"><span>ENTRY · ${VERSIONS[state.version].name}</span><span>PAGE ${state.page + 1}</span></div>
      <div class="detail-title">${escapeHtml(item.title)}</div>
      <p class="screen-copy">${escapeHtml(state.page === 0 ? VERSIONS[state.version].entry : item.body)}</p>
      <div class="screen-status">←/→ PAGE · B BACK</div>
    </div>`;
}

function bootMarkup(compact = false) {
  return `
    <div class="screen-shell boot ${compact ? "compact" : ""}">
      <div class="wordmark">SM'S DEX</div>
      <div class="screen-status">CLASSIC RED · BOOT</div>
      <div class="screen-status">SYSTEM CHECK 151/151</div>
    </div>`;
}

function render() {
  device.dataset.open = String(state.open);
  device.dataset.mode = state.mode;
  device.dataset.menuIndex = String(state.menuIndex);
  device.dataset.itemIndex = String(state.itemIndex);
  device.dataset.page = String(state.page);
  device.dataset.version = VERSIONS[state.version].name.toLowerCase();
  device.dataset.lastControl = state.lastControl || "";

  if (!state.open) {
    primaryScreen.replaceChildren();
    secondaryScreen.replaceChildren();
    return;
  }

  if (state.mode === "boot") {
    primaryScreen.innerHTML = bootMarkup();
    secondaryScreen.innerHTML = bootMarkup(true);
  } else if (state.mode === "menu") {
    primaryScreen.innerHTML = menuMarkup();
    secondaryScreen.innerHTML = identityMarkup();
  } else if (state.mode === "list") {
    primaryScreen.innerHTML = listMarkup();
    secondaryScreen.innerHTML = previewMarkup();
  } else {
    primaryScreen.innerHTML = detailMarkup();
    secondaryScreen.innerHTML = detailContextMarkup();
  }
}

function applySemantics() {
  const closed = !state.open;
  primaryScreen.hidden = closed;
  secondaryScreen.hidden = closed;
  primaryScreen.setAttribute("aria-hidden", String(closed));
  secondaryScreen.setAttribute("aria-hidden", String(closed));
  bodyControls.hidden = closed;
  innerControls.hidden = closed;
  outerControls.hidden = !closed;
  bodyControls.inert = closed;
  innerFace.inert = closed;
  outerFace.inert = !closed;
}

function openDevice() {
  if (state.open) return;
  window.clearTimeout(bootTimer);
  state.open = true;
  state.mode = "boot";
  state.itemIndex = 0;
  state.page = 0;
  applySemantics();
  render();
  bootTimer = window.setTimeout(() => {
    state.mode = "menu";
    render();
    document.querySelector('[data-control-id="dpad-down"]')?.focus({ preventScroll: true });
  }, 650);
}

function closeDevice() {
  if (!state.open) return;
  window.clearTimeout(bootTimer);
  state.open = false;
  state.mode = "closed";
  state.menuIndex = 0;
  state.itemIndex = 0;
  state.page = 0;
  applySemantics();
  render();
  window.setTimeout(() => document.querySelector('[data-control-id="outer-latch"]')?.focus({ preventScroll: true }), 0);
}

function moveSelection(delta) {
  if (state.mode === "menu") {
    state.menuIndex = (state.menuIndex + delta + MENU.length) % MENU.length;
    state.itemIndex = 0;
  } else if (state.mode === "list" || state.mode === "detail") {
    const length = currentItems().length;
    state.itemIndex = (state.itemIndex + delta + length) % length;
  }
  render();
}

function changePage(delta) {
  state.page = (state.page + delta + 2) % 2;
  render();
}

function confirm() {
  if (state.mode === "menu") {
    state.mode = "list";
    state.itemIndex = 0;
  } else if (state.mode === "list") {
    state.mode = "detail";
  }
  render();
}

function back() {
  if (state.mode === "detail") state.mode = "list";
  else if (state.mode === "list") state.mode = "menu";
  else if (state.mode === "menu") return closeDevice();
  render();
}

function start() {
  if (!state.open || state.mode === "boot") return;
  state.mode = "menu";
  state.itemIndex = 0;
  state.page = 0;
  render();
}

function setVersion(delta) {
  state.version = (state.version + delta + VERSIONS.length) % VERSIONS.length;
  render();
}

function keypad(number) {
  if (number <= 6) {
    state.menuIndex = number - 1;
    state.itemIndex = 0;
    state.mode = "list";
  } else if (number <= 9) {
    const items = currentItems();
    state.itemIndex = Math.min(number - 7, items.length - 1);
    state.mode = "detail";
  } else {
    return start();
  }
  render();
}

function handleAction(action, controlId = action) {
  state.lastControl = controlId;
  device.dataset.lastControl = controlId;
  if (action === "open") return openDevice();
  if (action === "close") return closeDevice();
  if (!state.open || state.mode === "boot") return;
  if (action === "up") return moveSelection(-1);
  if (action === "down") return moveSelection(1);
  if (action === "left") return changePage(-1);
  if (action === "right") return changePage(1);
  if (action === "a") return confirm();
  if (action === "b") return back();
  if (action === "start") return start();
  if (action === "select") return setVersion(1);
  if (action === "version-prev") return setVersion(-1);
  if (action === "version-next") return setVersion(1);
  if (action.startsWith("keypad-")) return keypad(Number(action.split("-")[1]));
}

function flashControl(action) {
  const button = [...document.querySelectorAll(`.control[data-action="${action}"]`)].find((candidate) => !candidate.closest("[inert]"));
  if (!button) return;
  button.classList.add("is-pressed");
  window.setTimeout(() => button.classList.remove("is-pressed"), 100);
}

function keyboardAction(event) {
  if (event.repeat) return;
  if (event.target.closest("button") && (event.key === "Enter" || event.key === " ")) return;
  const map = {
    ArrowUp: "up",
    ArrowDown: "down",
    ArrowLeft: "left",
    ArrowRight: "right",
    Enter: "a",
    Escape: "b",
  };
  const action = map[event.key];
  if (!action || !state.open) return;
  event.preventDefault();
  flashControl(action);
  handleAction(action, `keyboard-${action}`);
}

function resizeDevice() {
  const width = Math.min(871, Math.max(1, window.innerWidth - (window.innerWidth <= 480 ? 16 : 24)));
  const scale = width / 871;
  document.documentElement.style.setProperty("--device-scale", String(scale));
  frame.style.width = `${width}px`;
  frame.style.height = `${816 * scale}px`;
}

buildControls();
resizeDevice();
applySemantics();
render();
window.addEventListener("resize", resizeDevice);
window.addEventListener("keydown", keyboardAction);

document.querySelector("#add-pokemon").addEventListener("click", () => {
  if (!state.open) return openDevice();
  state.mode = "menu";
  render();
});

window.__dexPrototype = {
  getState: () => ({ ...state, section: MENU[state.menuIndex], item: currentItem()?.title }),
  controls: () => [...document.querySelectorAll(".control")].map((button) => ({
    id: button.dataset.controlId,
    action: button.dataset.action,
    label: button.getAttribute("aria-label"),
  })),
  open: openDevice,
  close: closeDevice,
  action: handleAction,
};
