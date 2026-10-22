import { writeFileSync } from 'node:fs';
import assert from 'node:assert/strict';

// Original geometry. Deterministic variation keeps overlapping petals from becoming a radial icon.
const parts = [`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 18 500 440" fill="none">
<defs><linearGradient id="petal" x1="0" y1="0" x2=".7" y2="1"><stop stop-color="#44504a"/><stop offset=".45" stop-color="#283431"/><stop offset="1" stop-color="#121e20"/></linearGradient></defs>
<g transform="translate(247 237) rotate(-13) scale(1 .91)">`];
let petals = 0;
for (let ring = 0; ring < 7; ring++) {
  const count = 18 + ring * 2;
  const radius = 177 - ring * 21;
  for (let i = 0; i < count; i++) {
    const phase = i * 2.399 + ring * 1.71;
    const angle = i * 360 / count + ring * 12 + Math.sin(phase) * 4;
    const length = radius * (1 + .09 * Math.sin(phase * 1.7));
    const width = (27 - ring * 2.4) * (1 + .14 * Math.cos(phase));
    const curl = Math.sin(phase * .9) * 15;
    parts.push(`<g transform="rotate(${angle.toFixed(3)})"><path d="M-6 22C${-width} ${-length*.22} ${-width*1.18+curl} ${-length*.74} ${curl-8} ${-length}Q${curl+4} ${-length-11} ${curl+13} ${-length+4}C${width*1.15+curl} ${-length*.73} ${width*.8} ${-length*.18} 7 22Z" fill="url(#petal)" stroke="#bca578" stroke-width=".85"/>`);
    for (let line = 0; line < 7; line++) {
      const offset = (line - 3) / 3;
      parts.push(`<path d="M${offset*4} 7C${offset*width*.36} ${-length*.3} ${curl+offset*width*.59} ${-length*.7} ${curl+offset*6} ${-length+12+Math.abs(offset)*9}" stroke="#ceb98c" stroke-width=".38" opacity="${.25+(1-Math.abs(offset))*.23}"/>`);
    }
    parts.push('</g>');
    petals++;
  }
}
parts.push('<ellipse rx="28" ry="25" fill="#1b2927"/>');
for (let i = 0; i < 145; i++) {
  const angle = i * 2.399963;
  const radius = Math.sqrt(i / 145) * 27;
  const x = Math.cos(angle)*radius, y = Math.sin(angle)*radius*.9;
  parts.push(`<path d="M${x.toFixed(2)} ${y.toFixed(2)}l${(Math.cos(angle)*2).toFixed(2)} ${(Math.sin(angle)*2-2).toFixed(2)}" stroke="#d8bc7a" stroke-width="1.1" stroke-linecap="round"/>`);
}
parts.push('</g></svg>');
const svg = parts.join('');
assert.equal(petals, 168);
assert.ok(!/NaN|Infinity/.test(svg));
writeFileSync(new URL('./chrysanthemum.svg', import.meta.url), svg);
writeFileSync(new URL('./chrysanthemum-engraving.svg', import.meta.url), svg);
console.log(`Chrysanthemum: ${petals} petals, 1176 engraved veins, 145 stamens.`);
