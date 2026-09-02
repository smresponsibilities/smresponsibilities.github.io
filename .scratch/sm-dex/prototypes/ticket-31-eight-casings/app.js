const MENU = ["PROFILE", "MOVES", "ENCOUNTERS", "RIBBONS", "EVOLUTION", "DEX"];
const CONTENT = {
  PROFILE: {
    title: "SHIVAM MAHAJAN",
    meta: "#001 · HUMANOID POKÉMON",
    body: "Software developer from Punjab. Builds reliable systems, measured by shipped work rather than self-ratings.",
    facts: ["1,150 DAY STREAK", "425 TEST SUITES", "2,600 DSA", "9.35 CGPA"],
  },
  MOVES: {
    title: "PRODUCTIVITY CALLER",
    meta: "ELECTRIC / STEEL · POWER 95",
    body: "25,000+ lines of Kotlin. Native phone-call reminders, 80+ NLP patterns, and 35% higher task completion.",
    facts: ["KOTLIN", "JETPACK COMPOSE", "MVVM", "PP 30/30"],
  },
  ENCOUNTERS: {
    title: "MORGAN STANLEY",
    meta: "TECHNOLOGY APPRENTICE · RELEASED",
    body: "Architected 5M+ Kafka events through PySpark workflows into Snowflake with zero row-count tolerance.",
    facts: ["5M+ EVENTS", "1M LOAD TEST", "500K+ USERS", "NEST BALL"],
  },
  RIBBONS: {
    title: "ENDURANCE RIBBON",
    meta: "1,150+ ACTIVE DAYS",
    body: "Co-founded 1001 Days of Code, scaled it to 2,002 days, and kept an active coding streak beyond 1,150 days.",
    facts: ["CORE CONTRIBUTOR", "PROBLEM SOLVER", "TOURNAMENT", "DEAN'S LIST"],
  },
  EVOLUTION: {
    title: "SOFTWARE DEVELOPER → ???",
    meta: "EVOLUTION CONDITION UNKNOWN",
    body: "Student evolved into apprentice, then software developer. Next form remains undiscovered.",
    facts: ["STUDENT", "APPRENTICE", "DEVELOPER", "???"],
  },
  DEX: {
    title: "RED VERSION ENTRY",
    meta: "DRAGON / STEEL · PUNJAB",
    body: "Consumes coffee to regulate operating temperature. Has not skipped a day of code in over 1,150 days.",
    facts: ["ABILITY: ZERO TOLERANCE", "HIDDEN: STREAK", "HELD: VIM"],
  },
};

const SPECIAL = {
  resume: {
    title: "PLAIN-TEXT RESUME",
    meta: "ACCESSIBLE VIEW · SAMPLE",
    body: "Shivam Mahajan — software developer. Experience, projects, education, and achievements without device chrome.",
    facts: ["MORGAN STANLEY", "5M+ EVENTS", "425 TEST SUITES", "9.35 CGPA"],
  },
  become: {
    title: "+ ADD POKÉMON",
    meta: "PUBLIC ROSTER · /BECOME",
    body: "Future action opens the public GitHub-backed roster form. Scratch mode demonstrates the destination without navigation.",
    facts: ["GITHUB ID", "PUBLIC ENTRY", "AUTO-ROLLED STATS", "ISSUE SUBMISSION"],
  },
};

const state = {
  open: false,
  mode: "closed",
  menuIndex: 0,
  page: 0,
  version: 0,
  lastInput: "NONE",
};

const versions = ["RED", "BLUE"];
const device = document.querySelector("#device");
const frame = document.querySelector("#device-frame");
const stage = document.querySelector("#device-stage");
const bodyScreen = document.querySelector("#body-screen");
const leafScreen = document.querySelector("#leaf-screen");
const bodyControls = document.querySelector("#body-controls");
const leafControls = document.querySelector("#leaf-controls");
const outerControls = document.querySelector("#outer-controls");
const innerFace = document.querySelector("#inner-face");
const outerFace = document.querySelector("#outer-face");
const tooltip = document.querySelector("#tooltip");
let bootTimer;

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;",
  })[character]);
}

function buttonMarkup({ id, action, label, x, y, width, height, tone = "black", shape = "rect", text = "" }) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `control ${tone} ${shape}`;
  button.dataset.controlId = id;
  button.dataset.action = action;
  button.dataset.tip = label;
  button.setAttribute("aria-label", label);
  Object.assign(button.style, { left: `${x}px`, top: `${y}px`, width: `${width}px`, height: `${height}px` });
  button.innerHTML = `<span class="control-base"></span><span class="control-face">${escapeHtml(text)}</span>`;
  bindControl(button);
  return button;
}

function addButton(parent, config) { parent.append(buttonMarkup(config)); }

function buildControls() {
  const dpad = document.createElement("div");
  dpad.className = "dpad";
  [
    ["dpad-up", "up", "Up — move selection up", "dpad-up"],
    ["dpad-down", "down", "Down — move selection down", "dpad-down"],
    ["dpad-left", "left", "Left — previous page or tab", "dpad-left"],
    ["dpad-right", "right", "Right — next page or tab", "dpad-right"],
  ].forEach(([id, action, label, className]) => {
    const button = buttonMarkup({ id, action, label, x: 0, y: 0, width: 1, height: 1 });
    button.className = `control ${className}`;
    button.removeAttribute("style");
    dpad.append(button);
  });
  const centre = document.createElement("span");
  centre.className = "dpad-centre";
  centre.setAttribute("aria-hidden", "true");
  dpad.append(centre);
  bodyControls.append(dpad);

  [
    { id: "body-bezel-b", action: "back", label: "B — return one UI level", x: 70, y: 437, width: 26, height: 26, tone: "red", shape: "round", text: "" },
    { id: "body-b", action: "back", label: "B — return one UI level", x: 48, y: 511, width: 62, height: 62, tone: "black", shape: "round", text: "B" },
    { id: "body-start", action: "menu", label: "START — open Main Menu", x: 128, y: 515, width: 94, height: 31, tone: "red", shape: "pill", text: "START" },
    { id: "body-select", action: "version", label: "SELECT — switch Red or Blue entry", x: 238, y: 515, width: 101, height: 31, tone: "cyan", shape: "pill", text: "SELECT" },
    { id: "body-main", action: "menu", label: "Main Menu — show all portfolio sections", x: 128, y: 568, width: 145, height: 75, tone: "green", shape: "rect", text: "MENU" },
  ].forEach((config) => addButton(bodyControls, config));

  const keypad = document.createElement("div");
  keypad.className = "keypad";
  const labels = [
    "PROFILE — identity and counted stats", "MOVES — selected projects", "ENCOUNTERS — work experience",
    "RIBBONS — achievements", "EVOLUTION — career stages", "DEX — version flavour entry",
    "RESUME — sample plain-text mode", "ADD — sample public roster action", "VERSION — switch Red or Blue", "MENU — return to Main Menu",
  ];
  labels.forEach((label, index) => keypad.append(buttonMarkup({
    id: `key-${index + 1}`, action: `key-${index + 1}`, label: `${index + 1}: ${label}`,
    x: 0, y: 0, width: 1, height: 1, tone: "cyan", shape: "rect", text: String(index + 1),
  })));
  leafControls.append(keypad);

  [
    { id: "leaf-prev", action: "left", label: "Previous — previous content page", x: 57, y: 432, width: 63, height: 69, tone: "white", shape: "rect", text: "◀" },
    { id: "leaf-next", action: "right", label: "Next — next content page", x: 120, y: 432, width: 63, height: 69, tone: "white", shape: "rect", text: "▶" },
    { id: "leaf-close", action: "close", label: "Close — fold right leaf over central hinge", x: 297, y: 433, width: 113, height: 31, tone: "black", shape: "pill", text: "CLOSE" },
    { id: "leaf-a", action: "confirm", label: "A — confirm or open highlighted section", x: 418, y: 437, width: 57, height: 57, tone: "yellow", shape: "round", text: "A" },
    { id: "leaf-version-prev", action: "version-prev", label: "Previous version — show Red or Blue entry", x: 56, y: 535, width: 170, height: 73, tone: "darkgreen", shape: "rect", text: "RED" },
    { id: "leaf-version-next", action: "version-next", label: "Next version — show Red or Blue entry", x: 260, y: 535, width: 170, height: 73, tone: "darkgreen", shape: "rect", text: "BLUE" },
  ].forEach((config) => addButton(leafControls, config));

  addButton(outerControls, {
    id: "outer-open", action: "open", label: "Open Pokédex — unfold right leaf and boot portfolio UI",
    x: 16, y: 331, width: 70, height: 84, tone: "yellow", shape: "triangle", text: "",
  });
}

function bindControl(button) {
  const release = () => button.classList.remove("is-held");
  button.addEventListener("pointerdown", () => button.classList.add("is-held"));
  button.addEventListener("pointerup", release);
  button.addEventListener("pointercancel", release);
  button.addEventListener("pointerleave", release);
  button.addEventListener("keydown", (event) => {
    if (event.key === " " || event.key === "Enter") button.classList.add("is-held");
  });
  button.addEventListener("keyup", release);
  button.addEventListener("blur", release);
  button.addEventListener("click", () => act(button.dataset.action, button.dataset.controlId));
  button.addEventListener("mouseenter", () => showTooltip(button));
  button.addEventListener("focus", () => showTooltip(button));
  button.addEventListener("mouseleave", hideTooltip);
  button.addEventListener("blur", hideTooltip);
}

function menuMarkup() {
  return `<div class="screen-ui">
    <div class="screen-head"><span>MAIN MENU</span><span>${versions[state.version]} · PAGE ${state.page + 1}/2</span></div>
    <div class="rows" role="listbox" aria-label="Portfolio sections">${MENU.map((item, index) => `
      <div class="row ${index === state.menuIndex ? "selected" : ""}" role="option" aria-selected="${index === state.menuIndex}">
        <span>${index === state.menuIndex ? "▶" : "·"} ${item}</span><span class="num">0${index + 1}</span>
      </div>`).join("")}</div>
    <div class="screen-foot"><span>↑↓ SELECT</span><span>A OPEN</span></div>
  </div>`;
}

function identityMarkup() {
  return `<div class="screen-ui compact">
    <div class="screen-head"><span>SM'S DEX</span><span>#001</span></div>
    <div class="identity"><span class="avatar" aria-hidden="true">SM</span><div><div class="screen-title">SHIVAM</div><div class="micro">SOFTWARE DEVELOPER</div><div class="tags"><span class="tag">DRAGON</span><span class="tag">STEEL</span></div></div></div>
  </div>`;
}

function detailMarkup(section, specialMode = "") {
  const source = specialMode ? SPECIAL[specialMode] : CONTENT[section];
  const item = section === "DEX" && state.version === 1
    ? { ...source, title: "BLUE VERSION ENTRY", body: "Processes five million events in one migration cycle. Refuses to drop a single row." }
    : source;
  const copy = state.page === 0 ? item.body : `${item.facts.join(" · ")}.`;
  return `<div class="screen-ui">
    <div class="screen-head"><span>${escapeHtml(section)} · ${state.page + 1}/2</span><span>${versions[state.version]}</span></div>
    <div class="screen-title">${escapeHtml(item.title)}</div>
    <div class="micro">${escapeHtml(item.meta)}</div>
    <p class="screen-copy">${escapeHtml(copy)}</p>
    <div class="facts">${item.facts.slice(0, 4).map((fact) => `<span class="fact">${escapeHtml(fact)}</span>`).join("")}</div>
    <div class="screen-foot"><span>←→ PAGE</span><span>B BACK</span></div>
  </div>`;
}

function detailContextMarkup(section, specialMode = "") {
  const source = specialMode ? SPECIAL[specialMode] : CONTENT[section];
  const item = section === "DEX" && state.version === 1 ? { ...source, title: "BLUE VERSION ENTRY" } : source;
  return `<div class="screen-ui compact">
    <div class="screen-head"><span>${escapeHtml(section)}</span><span>LIVE DOM</span></div>
    <div class="screen-title">${escapeHtml(item.title)}</div>
    <div class="micro">${escapeHtml(item.facts[state.page % item.facts.length])}</div>
  </div>`;
}

function bootMarkup(compact = false) {
  return `<div class="screen-ui boot ${compact ? "compact" : ""}"><div class="boot-mark">SM'S DEX</div><div class="micro">KANTO LINK · READY</div></div>`;
}

function render() {
  device.dataset.open = String(state.open);
  device.dataset.mode = state.mode;
  device.dataset.menuIndex = String(state.menuIndex);
  device.dataset.page = String(state.page);
  device.dataset.version = versions[state.version].toLowerCase();
  device.dataset.lastInput = state.lastInput;

  document.querySelector("#state-output").value = state.open ? state.mode.toUpperCase() : "CLOSED";
  document.querySelector("#input-output").value = state.lastInput.toUpperCase();
  document.querySelector("#version-output").value = versions[state.version];

  if (!state.open) {
    bodyScreen.replaceChildren();
    leafScreen.replaceChildren();
    return;
  }
  if (state.mode === "boot") {
    bodyScreen.innerHTML = bootMarkup();
    leafScreen.innerHTML = bootMarkup(true);
  } else if (state.mode === "menu") {
    bodyScreen.innerHTML = menuMarkup();
    leafScreen.innerHTML = identityMarkup();
  } else {
    const section = MENU[state.menuIndex];
    const specialMode = state.mode === "resume" || state.mode === "become" ? state.mode : "";
    bodyScreen.innerHTML = detailMarkup(specialMode ? specialMode.toUpperCase() : section, specialMode);
    leafScreen.innerHTML = detailContextMarkup(specialMode ? specialMode.toUpperCase() : section, specialMode);
  }
}

function applySemantics() {
  const closed = !state.open;
  bodyScreen.hidden = closed;
  leafScreen.hidden = closed;
  bodyScreen.setAttribute("aria-hidden", String(closed));
  leafScreen.setAttribute("aria-hidden", String(closed));
  bodyControls.hidden = closed;
  leafControls.hidden = closed;
  outerControls.hidden = !closed;
  innerFace.inert = closed;
  outerFace.inert = !closed;
}

function openDevice() {
  if (state.open) return;
  clearTimeout(bootTimer);
  state.open = true;
  state.mode = "boot";
  state.page = 0;
  applySemantics();
  render();
  bootTimer = setTimeout(() => {
    state.mode = "menu";
    render();
    document.querySelector('[data-control-id="dpad-down"]')?.focus({ preventScroll: true });
  }, document.documentElement.classList.contains("reduce-motion") ? 0 : 520);
}

function closeDevice() {
  if (!state.open) return;
  clearTimeout(bootTimer);
  state.open = false;
  state.mode = "closed";
  state.page = 0;
  applySemantics();
  render();
  setTimeout(() => document.querySelector('[data-control-id="outer-open"]')?.focus({ preventScroll: true }), 0);
}

function move(delta) {
  if (state.mode !== "menu") state.mode = "menu";
  state.menuIndex = (state.menuIndex + delta + MENU.length) % MENU.length;
  state.page = 0;
  render();
}

function showSection(index) {
  state.menuIndex = Math.max(0, Math.min(MENU.length - 1, index));
  state.mode = "detail";
  state.page = 0;
  render();
}

function act(action, source = action) {
  state.lastInput = source;
  if (action === "open") return openDevice();
  if (action === "close") return closeDevice();
  if (!state.open || state.mode === "boot") return render();
  if (action === "up") return move(-1);
  if (action === "down") return move(1);
  if (action === "left" || action === "right") {
    state.page = action === "left" ? (state.page + 1) % 2 : (state.page + 1) % 2;
    return render();
  }
  if (action === "confirm") return showSection(state.menuIndex);
  if (action === "back") {
    if (["detail", "resume", "become"].includes(state.mode)) state.mode = "menu";
    else return closeDevice();
    return render();
  }
  if (action === "menu") { state.mode = "menu"; state.page = 0; return render(); }
  if (["version", "version-prev", "version-next"].includes(action)) {
    state.version = (state.version + 1) % versions.length;
    return render();
  }
  if (action.startsWith("key-")) {
    const key = Number(action.split("-")[1]);
    if (key <= 6) return showSection(key - 1);
    if (key === 7) { state.mode = "resume"; state.page = 0; return render(); }
    if (key === 8) { state.mode = "become"; state.page = 0; return render(); }
    if (key === 9) { state.version = (state.version + 1) % versions.length; return render(); }
    if (key === 10) { state.mode = "menu"; state.page = 0; return render(); }
  }
}

function showTooltip(button) {
  tooltip.textContent = button.dataset.tip;
  tooltip.hidden = false;
  const box = button.getBoundingClientRect();
  const tipBox = tooltip.getBoundingClientRect();
  const left = Math.min(window.innerWidth - tipBox.width - 8, Math.max(8, box.left + box.width / 2 - tipBox.width / 2));
  const top = box.top > tipBox.height + 12 ? box.top - tipBox.height - 9 : box.bottom + 9;
  Object.assign(tooltip.style, { left: `${left}px`, top: `${top}px` });
}

function hideTooltip() { tooltip.hidden = true; }

function flash(action) {
  const button = [...document.querySelectorAll(`.control[data-action="${action}"]`)].find((item) => !item.closest("[inert]") && !item.closest("[hidden]"));
  if (!button) return;
  button.classList.add("is-held");
  setTimeout(() => button.classList.remove("is-held"), 110);
}

function resizeDevice() {
  const available = Math.max(1, stage.clientWidth - 16);
  const scale = Math.min(1, available / 1038);
  document.documentElement.style.setProperty("--scale", String(scale));
  frame.style.width = `${1038 * scale}px`;
  frame.style.height = `${680 * scale}px`;
}

buildControls();
applySemantics();
render();
resizeDevice();
window.addEventListener("resize", resizeDevice);

document.addEventListener("keydown", (event) => {
  if (event.repeat || event.target.closest("button")) return;
  const map = { ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right", Enter: "confirm", Escape: "back" };
  const action = map[event.key];
  if (!action || !state.open) return;
  event.preventDefault();
  flash(action);
  act(action, `keyboard-${action}`);
});

document.querySelector("#motion-toggle").addEventListener("click", (event) => {
  const reduced = document.documentElement.classList.toggle("reduce-motion");
  event.currentTarget.setAttribute("aria-pressed", String(reduced));
  event.currentTarget.textContent = reduced ? "MOTION: REDUCED" : "MOTION: ON";
});

document.querySelector('[data-site-action="become"]').addEventListener("click", () => {
  state.lastInput = "add-pokemon";
  if (state.open && state.mode !== "boot") state.mode = "become";
  render();
});

window.__kantoProof = {
  getState: () => ({ ...state, section: MENU[state.menuIndex], version: versions[state.version] }),
  controls: () => [...document.querySelectorAll(".control")].map((button) => ({
    id: button.dataset.controlId,
    action: button.dataset.action,
    label: button.getAttribute("aria-label"),
  })),
  action: act,
  open: openDevice,
  close: closeDevice,
};
