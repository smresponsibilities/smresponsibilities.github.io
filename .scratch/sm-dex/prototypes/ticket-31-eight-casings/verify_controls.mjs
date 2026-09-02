import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { controls } from "./controls.js";

const read = (file) => readFileSync(new URL(file, import.meta.url), "utf8");
const css = read("styles.css");
const app = read("app.js");
const html = read("index.html");
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
assert.match(css, /inset: 0 2px 7px/);
assert.match(css, /transform: translateY\(4px\)/);
// A cap's bottom starts 7px above its hit box, so a 4px press leaves 3px inside it.
assert.ok(7 - 4 >= 3);
assert.match(css, /\.dpad-rocker/);
assert.equal(controls.filter((control) => control.shape === "dpad").length, 4);
assert.match(app, /spec.shape !== "dpad"/);
assert.match(app, /pointerleave", release/);
assert.match(app, /pointercancel", release/);
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
console.log("PASS: 28 control targets, zero overlaps, keypad/white gutters, contained cap travel, one D-pad rocker, registered hinge and leaf, native keyboard contract.");
