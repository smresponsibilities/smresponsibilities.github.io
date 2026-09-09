import {hoenn} from './hoenn.js?v=56.2';
// Ticket 45 extends the approved ticket-35 flat SVG treatment. These palettes and
// widened apertures belong to the authored study, not the source-locked raster skins.
// The host owns animation, reduced motion, screen DOM, buttons, and moving caps.
const width = 940;
const height = 760;

const path = (d, fill, stroke, sw = 3) =>
  `<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" stroke-linejoin="round"/>`;
const rect = (x, y, w, h, fill, stroke, r = 5, sw = 2) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
const circle = (x, y, r, fill, stroke, sw = 2) =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
const line = (d, stroke, sw = 2) =>
  `<path d="${d}" fill="none" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>`;

// Cut actual holes in the complete layer, including the shell behind the bezel.
// The host can place the screen DOM above or below the SVG without painted glass.
const aperture = (id, screen, art) => `<defs>
  <mask id="${id}" maskUnits="userSpaceOnUse" x="0" y="0" width="${width}" height="${height}" style="mask-type:luminance">
    <rect width="${width}" height="${height}" fill="white"/>
    <rect x="${screen.x}" y="${screen.y}" width="${screen.w}" height="${screen.h}" fill="black"/>
  </mask>
</defs><g mask="url(#${id})">${art}</g>`;

const bezel = (s, edge, surround = '#cbd0c7') =>
  rect(s.x - 14, s.y - 14, s.w + 28, s.h + 28, surround, edge, 10, 3) +
  line(`M${s.x - 8} ${s.y + s.h + 3}V${s.y - 7}H${s.x + s.w + 3}`, '#f0f0df', 3) +
  rect(s.x - 3, s.y - 3, s.w + 6, s.h + 6, '#243332', '#263130', 3, 2);

const lens = (id, x, y, r, color, rim, edge) => `<defs>
  <radialGradient id="${id}" cx=".32" cy=".25" r=".75">
    <stop stop-color="${color[0]}"/><stop offset=".5" stop-color="${color[1]}"/>
    <stop offset="1" stop-color="${color[2]}"/>
  </radialGradient>
</defs>${circle(x, y, r + 6, rim, edge, 3)}${circle(x, y, r, `url(#${id})`, edge)}
<ellipse cx="${x - r * .3}" cy="${y - r * .37}" rx="${r * .2}" ry="${r * .27}" fill="#e6faff" opacity=".78"/>
${circle(x + r * .33, y + r * .36, r * .08, '#daf5e4', 'none')}`;

// Outer markup is stored in CLOSED stage coordinates, as CONTRACT.md requires.
// Reflect the same outline, then draw readable exterior details in closed space.
const reflectX = (origin, art) => `<g transform="translate(0 ${2 * origin}) scale(1 -1)">${art}</g>`;
const reflectY = (origin, art) => `<g transform="translate(${2 * origin} 0) scale(-1 1)">${art}</g>`;

const wells = (controls, edge, stroke='#641b2f') => controls.filter(c => c.shape !== 'direction').map(c =>
  rect(c.x - 2, c.y - 2, c.w + 4, c.h + 2, edge, stroke,
    c.shape === 'round' ? c.w / 2 : c.shape === 'pill' ? c.h / 2 : 5, 2)
).join('');

const directions = (rocker, x, y, arm, reach, fill) => {
  const labels = { up: 'Previous item', down: 'Next item', left: 'Previous page', right: 'Next page' };
  return [
    ['up', x - arm / 2, y - reach, arm, reach - arm / 2],
    ['right', x + arm / 2, y - arm / 2, reach - arm / 2, arm],
    ['down', x - arm / 2, y + arm / 2, arm, reach - arm / 2],
    ['left', x - reach, y - arm / 2, reach - arm / 2, arm],
  ].map(([action, bx, by, w, h]) => ({
    id: `${rocker}-${action}`, label: labels[action], action, layer: 'body',
    x: bx, y: by, w, h, shape: 'direction', rocker, fill,
  }));
};

const cross = (x, y, arm, reach) => {
  const a = arm / 2;
  return `M${x - a} ${y - reach}H${x + a}V${y - a}H${x + reach}V${y + a}H${x + a}V${y + reach}H${x - a}V${y + a}H${x - reach}V${y - a}H${x - a}Z`;
};

const dpad = (id, x, y, arm, reach, fill, edge) => {
  const outline = cross(x, y, arm, reach);
  const pale=fill==='#e5e5d9';
  // Gen I uses one concentric silhouette for the seat and rocker, not an offset cross.
  return path(outline, '#0e151b', '#10151b', 7) +
    `<g data-rocker="${id}" data-button-finish="gen1">${path(outline, fill, pale?'#6f796f':'#36414a', 1)}
      ${line(`M${x - arm / 2} ${y - reach + 2}H${x + arm / 2}`, pale?'#fffef3':'#5c6970', 2)}
      ${circle(x, y, arm * .23, pale?'#a0ada7':'#161d22', 'none')}
    </g>`;
};

const gold = { base: '#b51f38', light: '#e45b6d', dark: '#85142b', edge: '#510e21', panel: '#b9223c' };
const goldDefs = `<defs><linearGradient id="gold-shell" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#ca2c44"/><stop offset=".5" stop-color="#b51f38"/><stop offset="1" stop-color="#8f162f"/></linearGradient></defs>`;
const goldMain = { layer: 'top-leaf', x: 104, y: 115, w: 344, h: 224, role: 'main' };
const goldSide = { layer: 'body', x: 104, y: 410, w: 344, h: 136, role: 'side' };
const goldControls = [
  ...directions('gold-dpad', 167, 619, 28, 47, '#21262c'),
  { id: 'small-oval', label: 'Back', action: 'back', layer: 'body', x: 246, y: 599, w: 48, h: 18, shape: 'pill', fill: '#21262c' },
  { id: 'round-left', label: 'Open entry', action: 'confirm', layer: 'body', x: 317, y: 601, w: 40, h: 40, shape: 'round', fill: '#21262c' },
  { id: 'small-oval-lower', label: 'Main menu', action: 'menu', layer: 'body', x: 246, y: 625, w: 48, h: 18, shape: 'pill', fill: '#21262c' },
  { id: 'round-right', label: 'Open profile', action: 'section-0', layer: 'body', x: 373, y: 601, w: 40, h: 40, shape: 'round', fill: '#21262c' },
];
const goldTopOutline = 'M82 38H466Q486 38 486 58V360H66V58Q66 38 82 38Z';
const goldTopShell = path(goldTopOutline, 'url(#gold-shell)', gold.edge) +
  line('M76 348V58Q76 48 88 48H460', gold.light, 3) +
  line('M476 57V350H78', gold.dark, 4);
// Both flap faces stop at the fixed lower band's seam, as in the open/closed references.
const goldClosedRightOutline = 'M66 542H486V690H66Z';
const goldClosedRightShell = path(goldClosedRightOutline, 'url(#gold-shell)', gold.edge)
  .replace('<path ', '<path data-part="gold-closed-right-fit" ') +
  path('M78 559H474V680H78Z', gold.panel, gold.edge, 2) +
  line('M89 573V674H458', gold.light, 3);
const goldRightShell = reflectY(490, goldClosedRightShell);

const diamond = { base: '#eb4763', light: '#ff9aa6', dark: '#b92749', edge: '#582a34', pod: '#454b4e' };
const diamondDefs = `<defs><linearGradient id="diamond-shell" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fa7187"/><stop offset=".48" stop-color="#eb4763"/><stop offset="1" stop-color="#bd3050"/></linearGradient><linearGradient id="diamond-pod" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#62696c"/><stop offset="1" stop-color="#343a3d"/></linearGradient></defs>`;
const diamondMain = { layer: 'lid', x: 330, y: 108, w: 338, h: 228, role: 'main' };
const diamondSide = { layer: 'body', x: 332, y: 430, w: 290, h: 170, role: 'side' };
const diamondControls = [
  ...directions('diamond-dpad', 202, 538.5, 32, 49, '#e5e5d9'),
  { id: 'green-round', label: 'Open entry', action: 'confirm', layer: 'body', x: 735, y: 534, w: 88, h: 79, shape: 'round', fill: '#65bb55' },
  { id: 'silver-upper', label: 'Back', action: 'back', layer: 'body', x: 650, y: 530, w: 26, h: 23, shape: 'round', fill: '#e2e4df' },
  { id: 'silver-lower', label: 'Main menu', action: 'menu', layer: 'body', x: 650, y: 574, w: 26, h: 23, shape: 'round', fill: '#e2e4df' },
];
const diamondLidOutline = 'M296 74H672Q722 74 722 106V376H284V317.5H202C151 317.5 110 276.5 110 225.5C110 174.5 151 133.5 202 133.5H284V90Q284 74 296 74Z';
const diamondLidShell = path(diamondLidOutline, 'url(#diamond-shell)', diamond.edge)
  .replace('<path ', '<path data-part="diamond-open-shell" ') +
  line('M121 225.5C121 180 157 145 202 145H296V87H669Q707 87 709 106', diamond.light, 3) +
  line('M714 112V365H294M128 264Q151 306 202 306H284', diamond.dark, 4);
// Both faces use the same silhouette, including the left semicircular extension.
const diamondClosedShell = reflectX(382, diamondLidShell);

export const devices = [
  {
    id: 'gold', generation: 'II', region: 'Johto', games: 'Gold / Silver',
    accent: gold.base, width, height,
    reference: 'https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_GSC.png',
    note: 'Authored front elevation with widened screen apertures. The upper dome now projects above the open leaf and the lower blue orb remains visible at the closed endpoint, matching the GSC artwork. Unseen leaf returns, hinge faces and leaf trajectories remain reconstructed. The two blue orbs are inert; button actions are portfolio adaptations.',
    gesture: 'Open the top and right leaves',
    layers: [
      {
        id: 'body', motion: null,
        svg: goldDefs + aperture('gold-body-aperture', goldSide,
          path('M84 368H466Q486 368 486 389V726Q486 746 466 746H84Q66 746 66 726V389Q66 368 84 368Z', 'url(#gold-shell)', gold.edge) +
          path('M66 690H486V726Q486 746 466 746H84Q66 746 66 726Z', gold.dark, gold.edge, 2)
            .replace('<path ', '<path data-part="gold-fixed-bottom-band" ') +
          line('M78 390V679M81 700H412M80 734H405', gold.light, 3) +
          path('M90 391H462V561H330L310 575H248L225 561H90Z', gold.panel, gold.edge, 2) +
          bezel(goldSide, gold.edge, '#47544c') +
          rect(78, 462, 10, 32, '#20262b', gold.edge, 1) +
          rect(466, 462, 10, 32, '#20262b', gold.edge, 1) +
          wells(goldControls, '#71263a') +
          dpad('gold-dpad', 167, 619, 28, 47, '#20262b', '#202e30') +
          rect(239, 721, 71, 15, gold.panel, gold.edge, 3) +
          lens('gold-body-blue', 440, 719, 18, ['#d2faff', '#36baf3', '#164d89'], gold.light, gold.edge)
        ),
      },
      {
        id: 'right-leaf', motion: { type: 'hinge-y', origin: [490, 630], range: [.5, 1], clearance: 1 },
        svg: goldDefs + goldRightShell +
          path('M819 592L861 581V653L819 663Z', gold.dark, gold.edge, 2) +
          line('M534 603V653H779', gold.dark, 3),
        outer: goldDefs + goldClosedRightShell +
          line('M105 592H382M102 681H448', gold.dark, 3) +
          rect(87, 622, 11, 34, gold.dark, gold.edge, 3),
      },
      {
        id: 'top-leaf', motion: { type: 'hinge-x', origin: [276, 364], range: [0, .5], clearance: 2 },
        svg: goldDefs + aperture('gold-top-aperture', goldMain,
          goldTopShell +
          rect(89, 99, 374, 253, '#374441', gold.edge, 5) +
          bezel(goldMain, gold.edge, '#4b5550') +
          rect(78, 121, 9, 29, '#743f3a', gold.edge, 1) +
          rect(466, 120, 9, 29, '#743f3a', gold.edge, 1) +
          lens('gold-top-blue', 276, 48, 29, ['#d2faff', '#36baf3', '#164d89'], gold.light, gold.edge)
        ),
        outer: goldDefs + reflectX(364, goldTopShell) +
          circle(276, 518, 72, gold.base, gold.edge, 4) +
          line('M70 518H482', gold.edge, 3) +
          lens('gold-outer-blue', 276, 518, 27, ['#d2faff', '#36baf3', '#164d89'], gold.base, gold.edge) +
          rect(186, 672, 174, 10, gold.light, gold.edge, 4) +
          line('M83 386V658', gold.light, 3),
      },
      {
        id: 'hinge', motion: null,
        svg: rect(76, 354, 399, 23, gold.dark, gold.edge, 6) +
          line('M84 361H466', gold.light, 3) +
          line('M128 355V375M145 355V375M407 355V375M424 355V375', gold.edge, 2) +
          rect(478, 565, 18, 125, gold.dark, gold.edge, 5) +
          line('M483 574V681', gold.light, 2) +
          line('M479 589H494M479 673H494', gold.edge, 2),
      },
    ],
    screens: [goldMain, goldSide], controls: goldControls,
  },
  hoenn,
  {
    id: 'diamond', generation: 'IV', region: 'Sinnoh', games: 'Diamond / Pearl',
    accent: diamond.base, width, height,
    reference: 'https://archives.bulbagarden.net/wiki/File:DP_Pok%C3%A9dex.png',
    note: 'Authored front elevation using one Diamond/Pearl game-art shell. Both lid faces share the complete outline, including the semicircular left extension. The closed exterior remains reconstructed. Speaker holes, the lid dot, pod indicator, and small dark pod inset are inert.',
    gesture: 'Lift the upper screen',
    layers: [
      {
        id: 'body', motion: null,
        svg: diamondDefs + aperture('diamond-body-aperture', diamondSide,
          // The side pods remain on the body when the upper screen closes.
          path('M321 437H202C144 437 98 482 98 540C98 600 143 646 202 646H321Z', diamond.dark, diamond.edge) +
          path('M321 434.5H202C144 434.5 98 480.5 98 538.5C98 596.5 144 642.5 202 642.5H321Z', '#393d40', '#24292c', 3) +
          path('M294 449H202C152 449 112 489 112 538.5C112 588 152 628 202 628H294Z', '#2e3336', '#202629', 2) +
          line('M108 515Q119 447 202 445M110 570Q129 633 202 633', '#484d50', 2) +
          '<g transform="translate(0 39) scale(1 .9)">' +
          path('M689 486H781C845 486 886 526 886 588V619C886 680 846 714 783 714H682Z', '#747777', '#303537', 3) +
          path('M687 483H781C843 483 886 525 886 587C886 650 844 693 780 693H682Z', '#54595b', '#282e30', 3) +
          circle(779, 592, 89, '#abadad', '#303537', 4) +
          circle(779, 592, 72, '#c7c8c5', '#303537', 3) +
          circle(779, 592, 53, '#303733', '#303733', 3) +
          rect(838, 541, 29, 19, '#282e30', '#1f2627', 10) +
          rect(734, 701, 74, 7, '#4b5152', '#34393b', 2) +
          '</g>' +
          path('M284 388H722V658Q722 690 672 690H296Q284 690 284 674Z', 'url(#diamond-shell)', diamond.edge)
            .replace('<path ', '<path data-part="diamond-centre-shell" ') +
          line('M295 412V675H670Q709 675 710 649', diamond.light, 3) +
          '<g transform="translate(0 39) scale(1 .9)">' +
          path('M312 423H694L684 636Q682 666 655 666H313Z', '#373f40', '#2b3234', 3).replace('<path ','<path data-part="diamond-centre-body" ')+
          circle(202, 555, 77, '#404749', '#202729', 3) +
          rect(104, 519, 6, 14, '#74b579', '#243c2f', 2) +
          line('M106 522H108', '#b6ddb3', 1) +
          '</g>' +
          // Aperture, bezel, wells and targets share stage coordinates. The pod's
          // compressed illustration must not transform these a second time.
          bezel(diamondSide, '#333a3b', '#dce0da') +
          dpad('diamond-dpad', 202, 538.5, 32, 49, '#e5e5d9', '#2d3638') +
          wells(diamondControls, '#293633', '#1b262a')
        ),
      },
      {
        id: 'lid', motion: { type: 'hinge-x', origin: [503, 382] },
        svg: diamondDefs + aperture('diamond-lid-aperture', diamondMain,
          diamondLidShell +
          rect(297, 92, 411, 260, '#3a4141', '#2e3233', 11, 3).replace('<rect ','<rect data-part="diamond-centre-lid" ')+
          bezel(diamondMain, '#333a3b', '#c9cbca') +
          circle(202, 187.5, 8, '#292f30', '#503239') +
          circle(164, 225.5, 8, '#292f30', '#503239') +
          circle(240, 225.5, 8, '#292f30', '#503239') +
          circle(202, 263.5, 8, '#292f30', '#503239') +
          circle(695, 231, 6, '#222a2a', '#182122')
        ),
        outer: diamondDefs + diamondClosedShell +
          circle(503, 551, 42, diamond.dark, diamond.edge, 3) +
          circle(503, 551, 25, diamond.light, diamond.edge, 3),
      },
      {
        id: 'hinge', motion: null,
        svg: rect(280, 365, 446, 39, diamond.dark, diamond.edge, 12, 3) +
          rect(286, 368, 434, 29, diamond.base, diamond.edge, 9, 2) +
          line('M295 375H711', diamond.light, 4) +
          line('M330 367V399M348 367V399M660 367V399M678 367V399', diamond.edge, 2) +
          rect(498, 375, 8, 16, '#343b3b', '#343b3b', 2),
      },
    ],
    screens: [diamondMain, diamondSide], controls: diamondControls,
  },
];
