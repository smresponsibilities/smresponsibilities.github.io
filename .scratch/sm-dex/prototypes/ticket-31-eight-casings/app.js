import { controls } from "./controls.js?v=4";
import { bindPressFeedback } from "./press-feedback.js?v=4";

const device = document.querySelector("#device");
const frame = document.querySelector("#device-frame");
const primaryScreen = document.querySelector("#primary-screen");
const secondaryScreen = document.querySelector("#secondary-screen");
const bodyControls = document.querySelector("#body-controls");
const innerControls = document.querySelector("#inner-controls");
const outerControls = document.querySelector("#outer-controls");
const innerFace = document.querySelector("#inner-face");
const outerFace = document.querySelector("#outer-face");
const tooltip = document.querySelector("#tooltip");
const addPokemon = document.querySelector("#add-pokemon");

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
      title: "STUDENT",
      meta: "CHITKARA UNIVERSITY · 2022",
      body: "Computer Science and Engineering origin form.",
      badges: ["Lv. 0"],
      facts: [["CGPA", "9.35/10"], ["STATUS", "EVOLVED"]],
    },
    {
      title: "APPRENTICE",
      meta: "MORGAN STANLEY · Lv. 1",
      body: "Learned production data systems before evolving.",
      badges: ["NEST BALL"],
      facts: [["FROM", "AUG 2025"], ["TO", "AUG 2026"]],
    },
    {
      title: "SOFTWARE DEVELOPER → ???",
      meta: "EVOLUTION CONDITION UNKNOWN",
      body: "Next form exists. Its condition remains undiscovered.",
      badges: ["Lv. ??"],
      facts: [["STATUS", "RELEASED"], ["NEXT", "???"]],
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
let motionTimer = 0;
let savedMode = "menu";
let hasBooted = false;
let moving = false;
const instantMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.classList.contains("reduce-motion");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


function showTooltip(target) {
  tooltip.textContent = target.dataset.tip;
  tooltip.hidden = false;
  const targetBox = target.getBoundingClientRect();
  const tipBox = tooltip.getBoundingClientRect();
  const left = Math.min(
    window.innerWidth - tipBox.width - 8,
    Math.max(8, targetBox.left + targetBox.width / 2 - tipBox.width / 2),
  );
  const top = targetBox.top > tipBox.height + 12
    ? targetBox.top - tipBox.height - 8
    : targetBox.bottom + 8;
  Object.assign(tooltip.style, { left: `${left}px`, top: `${top}px` });
}

function hideTooltip() {
  tooltip.hidden = true;
}

function addControl(container, spec) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `control tone-${spec.tone} shape-${spec.shape}`;
  button.dataset.action = spec.action;
  button.dataset.controlId = spec.id;
  button.dataset.tip = spec.label;
  button.setAttribute("aria-label", spec.label);
  button.setAttribute("aria-describedby", "control-help");
  Object.assign(button.style, {
    left: `${spec.x}px`, top: `${spec.y}px`, width: `${spec.width}px`, height: `${spec.height}px`,
  });
  if (spec.shape !== "dpad") {
    const base = document.createElement("span");
    base.className = "base";
    base.setAttribute("aria-hidden", "true");
    const face = document.createElement("span");
    face.className = "face";
    face.textContent = spec.text;
    face.setAttribute("aria-hidden", "true");
    button.append(base, face);
  } else {
    button.dataset.direction = spec.action;
  }
  const press = () => {
    button.classList.add("is-pressed");
    if (spec.shape === "dpad") device.dataset.dpad = spec.action;
  };
  const release = () => {
    button.classList.remove("is-pressed");
    if (spec.shape === "dpad") delete device.dataset.dpad;
  };
  button.addEventListener("click", () => handleAction(spec.action, spec.id));
  const cancel = bindPressFeedback(button, { press, release });
  window.addEventListener("blur", cancel);
  button.addEventListener("mouseenter", () => showTooltip(button));
  button.addEventListener("focus", () => showTooltip(button));
  button.addEventListener("mouseleave", hideTooltip);
  button.addEventListener("blur", () => { cancel(); hideTooltip(); });
  container.append(button);
}

function buildControls() {
  const dpad = document.createElement("div");
  dpad.className = "dpad-assembly";
  dpad.setAttribute("aria-hidden", "true");
  dpad.innerHTML = '<div class="dpad-socket"></div><div class="dpad-rocker"><span class="north">▲</span><span class="west">◀</span><span class="east">▶</span><span class="south">▼</span><i></i></div>';
  bodyControls.append(dpad);
  const owners = { body: bodyControls, inner: innerControls, outer: outerControls };
  controls.forEach((control) => addControl(owners[control.owner], control));
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
  if (state.page === 1) {
    return `<div class="screen-shell compact"><div class="screen-header"><span>ENTRY · ${version.name}</span><span>2/2</span></div><p class="screen-copy">${escapeHtml(version.entry)}</p><div class="screen-status">←/→ IDENTITY</div></div>`;
  }
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
  document.querySelector("#device-hint").textContent = state.open
    ? "To close: press ◀ CLOSE, the right black button below the keypad."
    : "To open: press the yellow triangle on the cover. Your page is kept.";

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
  } else if (state.mode === "resume" || state.mode === "become") {
    const resume = state.mode === "resume";
    primaryScreen.innerHTML = `<div class="screen-shell"><div class="screen-header">${resume ? "RESUME · SAMPLE" : "/become · SAMPLE"}</div><div class="detail-title">${resume ? "SHIVAM MAHAJAN" : "JOIN THE DEX"}</div><p class="screen-copy">${resume ? "Software Developer. Sample resume destination. Final content follows casing approval." : "Public roster preview. The final form creates a GitHub issue for a new entry. Nothing is submitted here."}</p><div class="screen-status">B BACK · START MENU</div></div>`;
    secondaryScreen.innerHTML = identityMarkup();
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
  // Never remove the cap artwork during a fold. Only interaction and accessibility change.
  bodyControls.inert = closed || moving;
  innerFace.inert = closed || moving;
  outerFace.inert = !closed || moving;
  bodyControls.setAttribute("aria-hidden", String(closed));
  innerFace.setAttribute("aria-hidden", String(closed));
  outerFace.setAttribute("aria-hidden", String(!closed));
}

function openDevice(destination) {
  if (state.open) return;
  window.clearTimeout(bootTimer);
  window.clearTimeout(motionTimer);
  hideTooltip();
  moving = true;
  state.open = true;
  state.mode = hasBooted ? (destination || savedMode) : "boot";
  applySemantics();
  render();
  bootTimer = window.setTimeout(() => {
    moving = false;
    hasBooted = true;
    state.mode = destination || savedMode;
    applySemantics();
    render();
    document.querySelector('[data-control-id="dpad-down"]')?.focus({ preventScroll: true });
  }, instantMotion() ? 0 : 720);
}

function closeDevice() {
  if (!state.open) return;
  window.clearTimeout(bootTimer);
  window.clearTimeout(motionTimer);
  hideTooltip();
  savedMode = state.mode === "boot" ? "menu" : state.mode;
  moving = true;
  state.open = false;
  state.mode = "closed";
  document.querySelectorAll(".is-pressed").forEach((button) => button.classList.remove("is-pressed"));
  delete device.dataset.dpad;
  applySemantics();
  render();
  motionTimer = window.setTimeout(() => {
    moving = false;
    applySemantics();
    document.querySelector('[data-control-id="outer-latch"]')?.focus({ preventScroll: true });
  }, instantMotion() ? 0 : 720);
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
  else if (state.mode === "list" || state.mode === "resume" || state.mode === "become") state.mode = "menu";
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
  if (state.mode === "menu") state.page = 1;
  render();
}

function keypad(number) {
  if (number <= 6) {
    state.menuIndex = number - 1;
    state.itemIndex = 0;
    state.mode = "list";
  } else if (number === 7) state.mode = "resume";
  else if (number === 8) state.mode = "become";
  else if (number === 9) return setVersion(1);
  else return start();
  render();
}

function handleAction(action, controlId = action) {
  if (moving) return;
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
  if (action === "version-prev") return setVersion(-state.version);
  if (action === "version-next") return setVersion(1 - state.version);
  if (action.startsWith("keypad-")) return keypad(Number(action.split("-")[1]));
}

function flashControl(action) {
  const button = [...document.querySelectorAll(`.control[data-action="${action}"]`)].find((candidate) => !candidate.closest("[inert]"));
  if (!button) return;
  button.classList.add("is-pressed");
  if (button.dataset.direction) device.dataset.dpad = button.dataset.direction;
  window.setTimeout(() => {
    button.classList.remove("is-pressed");
    delete device.dataset.dpad;
  }, 100);
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
  if (!action || !state.open || moving) return;
  event.preventDefault();
  flashControl(action);
  handleAction(action, `keyboard-${action}`);
}

function resizeDevice() {
  const width = Math.min(896, Math.max(1, window.innerWidth - (window.innerWidth <= 480 ? 16 : 24)));
  const scale = width / 896;
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
window.addEventListener("blur", () => {
  document.querySelectorAll(".is-pressed").forEach((button) => button.classList.remove("is-pressed"));
  delete device.dataset.dpad;
  hideTooltip();
});
addPokemon.addEventListener("click", () => {
  if (moving) return;
  if (!state.open) return openDevice("become");
  state.mode = "become";
  render();
});
addPokemon.addEventListener("mouseenter", () => showTooltip(addPokemon));
addPokemon.addEventListener("focus", () => showTooltip(addPokemon));
addPokemon.addEventListener("mouseleave", hideTooltip);
addPokemon.addEventListener("blur", hideTooltip);
document.querySelector("#parts-toggle").addEventListener("click", (event) => {
  const inspect = device.classList.toggle("inspect-parts");
  event.currentTarget.setAttribute("aria-pressed", String(inspect));
  event.currentTarget.textContent = inspect ? "Show assembled" : "Inspect parts";
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
