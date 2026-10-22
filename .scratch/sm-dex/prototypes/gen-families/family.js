/* Shared runtime for the gen-families asset-layer casing prototypes. */
(function () {
  "use strict";

  var config = window.FAMILY_CONFIG;
  var stageOrigin = config.stage;

  function rel(r) {
    return { x: r.x - stageOrigin.x, y: r.y - stageOrigin.y, w: r.w, h: r.h };
  }

  var stage = document.querySelector(".stage");
  stage.style.width = stageOrigin.w + "px";
  stage.style.height = stageOrigin.h + "px";

  function addLayer(rect) {
    var r = rel(rect);
    var img = document.createElement("img");
    img.className = "layer";
    img.src = "assets/" + rect.img;
    img.alt = "";
    img.draggable = false;
    img.style.left = r.x + "px";
    img.style.top = r.y + "px";
    img.style.width = r.w + "px";
    img.style.height = r.h + "px";
    stage.appendChild(img);
  }

  config.layers.forEach(addLayer);

  /* ---------------- dex state ---------------- */

  var state = { view: "menu", sel: 0, versionIndex: 0, actionCount: 0 };

  var MENU = [
    { key: "roster", label: "ROSTER" },
    { key: "version", label: "VERSION" },
    { key: "about", label: "ABOUT" }
  ];

  function version() {
    return config.versions[state.versionIndex];
  }

  function applyVersion() {
    var p = version().palette;
    [
      ["--screen-bg", p.bg],
      ["--screen-ink", p.ink],
      ["--screen-dim", p.dim],
      ["--screen-accent", p.accent],
      ["--screen-accent-ink", p.accentInk]
    ].forEach(function (pair) {
      stage.style.setProperty(pair[0], pair[1]);
    });
  }

  function cycleVersion(step) {
    var n = config.versions.length;
    state.versionIndex = (state.versionIndex + step + n) % n;
    applyVersion();
    render();
  }

  /* ---------------- rendering ---------------- */

  var screens = [];

  function buildScreens() {
    config.apertures.forEach(function (rect, i) {
      var r = rel(rect);
      var el = document.createElement("section");
      el.className = "screen";
      el.style.left = r.x + "px";
      el.style.top = r.y + "px";
      el.style.width = r.w + "px";
      el.style.height = r.h + "px";
      el.setAttribute("aria-label", i === 0 ? "Navigation screen" : "Detail screen");
      if (i === 1) el.setAttribute("aria-live", "polite");
      var pad = document.createElement("div");
      pad.className = "pad";
      el.appendChild(pad);
      stage.appendChild(el);
      screens.push(pad);
    });
  }

  function row(label, selected) {
    var li = document.createElement("li");
    li.textContent = label;
    li.setAttribute("aria-selected", selected ? "true" : "false");
    return li;
  }

  function heading(text) {
    var h = document.createElement("h2");
    h.textContent = text;
    return h;
  }

  function renderLeft(left) {
    left.innerHTML = "";
    if (state.view === "list") {
      left.appendChild(heading("ROSTER - " + version().label));
      var ul = document.createElement("ul");
      config.roster.forEach(function (mon, i) {
        ul.appendChild(row(mon.no + " " + mon.name, i === state.sel));
      });
      left.appendChild(ul);
    } else {
      left.appendChild(heading(state.view === "about" ? "MAIN MENU" : "MAIN MENU"));
      var mul = document.createElement("ul");
      MENU.forEach(function (item, i) {
        mul.appendChild(row(item.label, i === state.sel));
      });
      left.appendChild(mul);
    }
  }

  function detailDl(mon) {
    var dl = document.createElement("dl");
    dl.className = "detail";
    [["HP", mon.hp], ["ATTACK", mon.atk], ["DEFENSE", mon.def], ["SPEED", mon.spe]]
      .forEach(function (pair) {
        var dt = document.createElement("dt");
        dt.textContent = pair[0];
        var dd = document.createElement("dd");
        dd.textContent = pair[1];
        dl.appendChild(dt);
        dl.appendChild(dd);
      });
    return dl;
  }

  function typesP(mon) {
    var p = document.createElement("p");
    p.className = "types";
    mon.types.forEach(function (t) {
      var s = document.createElement("span");
      s.textContent = t;
      p.appendChild(s);
    });
    return p;
  }

  function renderRight(right) {
    right.innerHTML = "";
    if (state.view === "list") {
      var mon = config.roster[state.sel];
      right.appendChild(heading(mon.no + " " + mon.name));
      right.appendChild(typesP(mon));
      right.appendChild(detailDl(mon));
    } else if (state.view === "about") {
      right.appendChild(heading(config.title));
      var p = document.createElement("p");
      p.className = "detail";
      p.textContent = config.about;
      right.appendChild(p);
    } else {
      var badge = document.createElement("p");
      badge.className = "dexno";
      badge.textContent = version().label;
      right.appendChild(badge);
      var tip = document.createElement("p");
      tip.className = "detail";
      tip.textContent = "UP/DOWN choose - A open - LEFT/RIGHT version - START menu";
      right.appendChild(tip);
    }
  }

  function render() {
    renderLeft(screens[0]);
    renderRight(screens[1]);
  }

  /* ---------------- actions ---------------- */

  function currentRows() {
    return state.view === "list" ? config.roster.length : MENU.length;
  }

  function act(action) {
    state.actionCount += 1;
    switch (action) {
      case "up":
        state.sel = Math.max(0, state.sel - 1);
        break;
      case "down":
        state.sel = Math.min(currentRows() - 1, state.sel + 1);
        break;
      case "left":
        cycleVersion(-1);
        return;
      case "right":
        cycleVersion(1);
        return;
      case "a":
        if (state.view === "menu") {
          var key = MENU[state.sel].key;
          if (key === "version") {
            cycleVersion(1);
            return;
          }
          state.view = key === "roster" ? "list" : "about";
          state.sel = 0;
        } else if (state.view !== "list") {
          state.view = "menu";
        }
        break;
      case "b":
        state.view = "menu";
        state.sel = Math.min(state.sel, MENU.length - 1);
        break;
      case "start":
        state.view = "menu";
        state.sel = 0;
        break;
      case "select":
        cycleVersion(1);
        return;
    }
    render();
  }

  /* ---------------- controls ---------------- */

  function addButton(spec) {
    var r = rel(spec);
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "control";
    btn.style.left = r.x + "px";
    btn.style.top = r.y + "px";
    btn.style.width = r.w + "px";
    btn.style.height = r.h + "px";
    btn.setAttribute("aria-label", spec.label);
    if (!spec.ghost) {
      var img = document.createElement("img");
      img.className = "face";
      img.src = "assets/" + spec.img;
      img.alt = "";
      img.draggable = false;
      btn.appendChild(img);
    } else {
      btn.className += " ghost";
    }

    function press(on) {
      btn.setAttribute("data-pressed", on ? "true" : "false");
    }
    btn.addEventListener("pointerdown", function () { press(true); });
    ["pointerup", "pointerleave", "pointercancel"].forEach(function (ev) {
      btn.addEventListener(ev, function () { press(false); });
    });
    btn.addEventListener("click", function () {
      press(true);
      act(spec.action);
      setTimeout(function () { press(false); }, 90);
    });
    stage.appendChild(btn);
  }

  config.buttons.forEach(addButton);

  /* ---------------- keyboard ---------------- */

  var KEYMAP = {
    ArrowUp: "up",
    ArrowDown: "down",
    ArrowLeft: "left",
    ArrowRight: "right",
    Enter: "a",
    Escape: "b"
  };

  document.addEventListener("keydown", function (ev) {
    if (ev.ctrlKey || ev.metaKey || ev.altKey) return;
    var action = KEYMAP[ev.key];
    if (!action) return;
    ev.preventDefault();
    act(action);
  });

  /* ---------------- scaling ---------------- */

  function fit() {
    var viewport = document.querySelector(".viewport");
    var availW = viewport.clientWidth - 24;
    var availH = viewport.clientHeight - 24;
    var scale = Math.min(availW / stageOrigin.w, availH / stageOrigin.h, 1.6);
    stage.style.transform = "scale(" + scale + ")";
  }

  window.addEventListener("resize", fit);

  /* ---------------- boot ---------------- */

  buildScreens();
  applyVersion();
  render();
  fit();

  window.__dexPrototype = {
    getState: function () {
      return {
        view: state.view,
        sel: state.sel,
        version: version().id,
        actionCount: state.actionCount
      };
    },
    act: act
  };
})();
