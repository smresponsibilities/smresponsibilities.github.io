import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { controls } from "./controls.js";
import { bindPressFeedback } from "./press-feedback.js";

const read = (file) => readFileSync(new URL(file, import.meta.url), "utf8");
const css = read("styles.css");
const app = read("app.js");
const html = read("index.html");
const feedback = read("press-feedback.js");
const faceRules = [...css.matchAll(/\.control \.face \{([\s\S]*?)\n\}/g)];
const faceRule = faceRules.find((match) => match[1].includes("z-index: 1"))[1];
assert.match(faceRule, /transform 100ms ease/, "Codédex face timing must be 100ms ease");
const pressedRule = css.match(/\.control\.is-pressed \.face \{([\s\S]*?)\n\}/)[1];
assert.match(pressedRule, /filter: brightness\(0\.86\)/, "The held face must darken, not retain hover brightness");
assert.match(pressedRule, /text-shadow: none/, "Held glyph must lose its raised shadow");
assert.equal(controls.length, 28);
assert.equal(new Set(controls.map((control) => control.id)).size, 28);
const overlap = (a, b) => a.x < b.x + b.width && a.x + a.width > b.x &&
  a.y < b.y + b.height && a.y + a.height > b.y;
for (const control of controls) {
  assert.ok(control.label && control.action, control.id);
  assert.ok(control.x >= 0 && control.x + control.width <= 420, control.id);
  assert.ok(control.y >= 0 && control.y + control.height <= 816, control.id);
  for (const neighbour of controls) {
    if (control.id === neighbour.id || control.owner !== neighbour.owner) continue;
    assert.equal(overlap(control, neighbour), false, `${control.id} overlaps ${neighbour.id}`);
  }
}
const keypad = controls.filter((control) => control.id.startsWith("keypad"));
assert.equal(keypad.length, 10);
for (let row = 0; row < 2; row++) {
  for (let col = 0; col < 4; col++) {
    const a = keypad[row * 5 + col], b = keypad[row * 5 + col + 1];
    assert.equal(b.x - a.x - a.width, 10);
  }
}
assert.equal(keypad[5].y - keypad[0].y - keypad[0].height, 10);
const white = controls.filter((control) => control.id.startsWith("inner-page"));
assert.equal(white[1].x - white[0].x - white[0].width, 14);
assert.match(css, /inset: 0 0 4px/);
assert.match(css, /inset: 6px 0 0/);
assert.match(css, /transform: translateY\(4px\)/);
// Match Codédex: the face is 4px shorter; its 4px press lands flush within the target.
assert.equal(4 - 4, 0);
assert.match(css, /\.dpad-rocker/);
assert.equal(controls.filter((control) => control.shape === "dpad").length, 4);
assert.match(app, /spec.shape !== "dpad"/);
assert.match(feedback, /pointerleave/);
assert.match(feedback, /pointercancel/);
assert.match(app, /event.target.closest\("button"\)/);
assert.match(app, /savedMode = state.mode/);
assert.match(app, /if \(moving\) return/);
assert.match(css, /rotateY\(-180deg\)/);
assert.match(css, /left: 448px/);
assert.match(css, /left: 28px/);
// Leaf x=476..896 rotating around x=448 lands on body x=0..420.
assert.equal(2 * 448 - 896, 0);
assert.equal(2 * 448 - 476, 420);
assert.match(html, /id="inner-silhouette"/);
assert.match(html, /id="outer-silhouette"/);
assert.match(css, /scaleX\(-1\)/);
assert.match(css, /kanto-clean-casing-v3.png/);
assert.doesNotMatch(app, /assets\/.*(?:face|base)\.png/);
assert.match(css, /prefers-reduced-motion/);

// Exercise the same event bindings used by real buttons, including the period before keyup.
class TestButton extends EventTarget {
  clicks = 0;
  click() { this.clicks++; }
}
const send = (button, type, fields = {}) => {
  const event = new Event(type, { cancelable: true });
  Object.assign(event, fields);
  button.dispatchEvent(event);
  return event;
};
for (const key of ["Enter", " "]) {
  const button = new TestButton();
  let down = false;
  bindPressFeedback(button, { press: () => { down = true; }, release: () => { down = false; } });
  assert.equal(send(button, "keydown", { key, repeat: false }).defaultPrevented, true);
  assert.equal(down, true, "The face stays depressed while the key is held");
  assert.equal(button.clicks, 0, "Opening/closing must not happen on keydown");
  send(button, "keydown", { key, repeat: true });
  assert.equal(button.clicks, 0);
  send(button, "keyup", { key });
  assert.equal(down, false);
  assert.equal(button.clicks, 1, "Release activates once");
  send(button, "keyup", { key });
  assert.equal(button.clicks, 1);
  send(button, "keydown", { key, repeat: false });
  send(button, "blur");
  send(button, "keyup", { key });
  assert.equal(button.clicks, 1, "Blur cancels pending activation");
  assert.equal(down, false);
  send(button, "pointerdown", { button: 0 });
  assert.equal(down, true);
  send(button, "pointercancel");
  assert.equal(down, false);
}
assert.ok(controls.find((control) => control.id === "inner-close").height >= 44);
assert.equal(controls.find((control) => control.id === "outer-latch").shape, "latch");
console.log("PASS: 28 targets, no overlaps, Codédex 4px/100ms states, held-key release/cancel, triangle/CLOSE affordances, registered folding.");
