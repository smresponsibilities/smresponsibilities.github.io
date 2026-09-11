const hgssDefs = `<defs><linearGradient id="hgss-shell" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f18b63"/><stop offset=".5" stop-color="#db6948"/><stop offset="1" stop-color="#ad4836"/></linearGradient></defs>`;
const unovaDefs = `<defs><linearGradient id="unova-metal" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#c3beb7"/><stop offset=".5" stop-color="#9c9892"/><stop offset="1" stop-color="#686461"/></linearGradient><linearGradient id="unova-orange" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#e5482f"/><stop offset=".52" stop-color="#d43723"/><stop offset="1" stop-color="#a8261d"/></linearGradient></defs>`;

const unovaLowerScale=1.30;
const unovaLowerY=y=>535+(y-535)*unovaLowerScale;
export const devices = [
  {
    id: 'heartgold', generation: 'IV-r', region: 'Johto',
    games: 'HeartGold / SoulSilver', accent: '#dc6848', width: 940, height: 760,
    reference: 'https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_HGSS_m.png',
    note: 'Authored flat interpretation of the orange HGSS model. The source-visible round projection now clears the open top edge. The top leaf folds down across y=380; its exterior uses reflected closed coordinates. The relation between the open round projection and closed trapezoidal handle remains unresolved, so their mounting and hidden transition surfaces are reconstructed. Lamps, the blue lens and gold rails are inert; navigation belongs to labelled screen controls.',
    gesture: 'Fold the upper screen down to close',
    layers: [
      {
        id: 'body', motion: null,
        svg: `${hgssDefs}<g stroke="#533d35" stroke-width="3" stroke-linejoin="round">
          <path d="M429 378 439 345Q441 339 448 339H492Q499 339 501 345L511 378H492L486 355H454L448 378Z" fill="#696965"/>
          <path d="M443 345H494" fill="none" stroke="#a6a49a" stroke-width="2"/>
          <path d="M306 389H634V663Q634 690 608 690H332Q306 690 306 663Z" fill="#a94c38"/>
          <path d="M302 410Q289 421 289 443V648Q289 667 302 675Z" fill="#c0a35e"/>
          <path d="M638 410Q651 421 651 443V648Q651 667 638 675Z" fill="#b89a51"/>
          <path d="M294 442V634M646 442V634" fill="none" stroke="#e3c579" stroke-width="3"/>
          <path d="M290 466H302M290 473H302M290 572H302M290 579H302M638 466H650M638 473H650M638 572H650M638 579H650" fill="none" stroke-width="2"/>
          <path d="M306 391H634V656Q634 682 608 682H332Q306 682 306 656Z" fill="url(#hgss-shell)"/>
          <path d="M316 405V653Q316 672 334 672H605" fill="none" stroke="#f0946d" stroke-width="2"/>
          <path d="M350 394H590V621H350Z" fill="#575653"/>
          <rect x="328" y="418" width="284" height="196" rx="6" fill="#e7dfd5"/>
          <path d="M333 609V424H607" fill="none" stroke="#fff1df" stroke-width="3"/>
          <rect x="339" y="429" width="262" height="174" rx="3" fill="#1e3032" stroke="#303e3e" stroke-width="2"/>
          <path d="M306 621H634M400 622A70 70 0 0 0 540 622M424 622A46 46 0 0 0 516 622" fill="none" stroke-width="2"/>
        </g>`
      },
      {
        id: 'lid', motion: { type: 'hinge-x', origin: [470, 380] },
        svg: `${hgssDefs}<g stroke="#533d35" stroke-width="3" stroke-linejoin="round">
          <path d="M430 79Q432 39 470 33Q508 39 510 79Z" fill="#696965"/>
          <path d="M446 79Q447 56 470 52Q493 56 494 79Z" fill="#e7dfd5"/>
          <path d="M306 366V100Q306 78 328 78H612Q634 78 634 100V366Z" fill="url(#hgss-shell)"/>
          <path d="M317 354V101Q317 89 329 89H611" fill="none" stroke="#f19a75" stroke-width="2"/>
          <path d="M350 79H590V366H350Z" fill="#575653"/>
          <rect x="326" y="103" width="288" height="229" rx="7" fill="#e7dfd5"/>
          <path d="M331 325V110H608" fill="none" stroke="#fff1df" stroke-width="3"/>
          <rect x="338" y="115" width="264" height="205" rx="3" fill="#1e3032" stroke="#303e3e" stroke-width="2"/>
          <circle cx="425" cy="348" r="7" fill="#78a65d" stroke="#293c29" stroke-width="2"/>
          <circle cx="515" cy="348" r="7" fill="#78a65d" stroke="#293c29" stroke-width="2"/>
          <circle cx="423" cy="346" r="2" fill="#d9edb8" stroke="none"/>
          <circle cx="513" cy="346" r="2" fill="#d9edb8" stroke="none"/>
        </g>`,
        outer: `${hgssDefs}<g stroke="#533d35" stroke-width="3" stroke-linejoin="round">
          <path d="M306 394V660Q306 682 328 682H612Q634 682 634 660V394Z" fill="url(#hgss-shell)"/>
          <path d="M317 405V657Q317 672 331 672H609" fill="none" stroke="#f19a75" stroke-width="2"/>
          <path d="M306 590H634" fill="none"/>
          <circle cx="470" cy="590" r="59" fill="#dc6848"/>
          <circle cx="470" cy="590" r="49" fill="#585b5b"/>
          <circle cx="470" cy="590" r="30" fill="#202f34"/>
          <circle cx="470" cy="590" r="23" fill="#588cae" stroke="#a4c7d6" stroke-width="2"/>
          <path d="M453 585A19 19 0 0 1 470 573" fill="none" stroke="#b8dbe8" stroke-width="4" stroke-linecap="round"/>
          <circle cx="478" cy="602" r="4" fill="#e1f5f5" stroke="none"/>
          <rect x="457" y="440" width="26" height="63" rx="13" fill="#575653"/>
          <rect x="464" y="447" width="12" height="49" rx="6" fill="#7ba658" stroke="#a7bf8a" stroke-width="2"/>
          <path d="M468 452V478" fill="none" stroke="#d4e3b9" stroke-width="3" stroke-linecap="round"/>
        </g>`
      },
      {
        id: 'hinge', motion: null,
        svg: `<g stroke="#533d35" stroke-width="3">
          <rect x="298" y="366" width="344" height="28" rx="13" fill="#d76743"/>
          <path d="M311 372H629" stroke="#f5a77b" stroke-width="4" stroke-linecap="round"/>
          <path d="M349 367V393M591 367V393" stroke-width="2"/>
          <path d="M310 389H630" stroke="#b45339" stroke-width="2"/>
        </g>`
      }
    ],
    screens: [
      { layer: 'lid', x: 340, y: 117, w: 260, h: 201, role: 'main' },
      { layer: 'body', x: 341, y: 431, w: 258, h: 170, role: 'side' }
    ],
    controls: []
  },
  {
    id: 'black', generation: 'V', region: 'Unova',
    games: 'Black / White', accent: '#e96639', width: 940, height: 760,
    reference: 'https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_BW_art.png',
    note: 'Authored red-orange Unova slider. Revision 55 restores warm gray rails, charcoal screen surrounds, and a red-orange lower shell from the original BW artwork; color choices are an interpretation of that reference, not calibrated source measurements. Only the upper screen tray translates vertically, moving down 220 units to cover the lower screen. The source shows orange extended and pink compact; the orange compact state and hidden rails are reconstructed. The three lower dots now sit as a separate row left of the centre control, matching the source artwork without colliding with its well or diagonal band. The central white control opens an entry and the green side control toggles power as portfolio mappings. Bottom slots and dots are inert.',
    gesture: 'Slide the upper tray up to open',
    layers: [
      {
        id: 'body', motion: null,
        svg: `${unovaDefs}<g transform="translate(-117.5 0) scale(1.25 1)"><g stroke="#343636" stroke-width="3" stroke-linejoin="round">
          <path d="M308 302H632V${unovaLowerY(675)}Q632 ${unovaLowerY(692)} 615 ${unovaLowerY(692)}H325Q308 ${unovaLowerY(692)} 308 ${unovaLowerY(675)}Z" fill="#525354"/>
          <path d="M309 302H631V${unovaLowerY(666)}Q631 ${unovaLowerY(681)} 616 ${unovaLowerY(681)}H324Q309 ${unovaLowerY(681)} 309 ${unovaLowerY(666)}Z" fill="url(#unova-metal)"/>
          <path d="M318 314V551M622 314V551" fill="none" stroke="#c9c3ba" stroke-width="4"/>
          <path d="M323 316V545M617 316V545" fill="none" stroke="#4a4743" stroke-width="2"/>
          <rect x="327" y="330" width="286" height="192" rx="3" fill="#4b4844"/>
          <rect x="339" y="342" width="262" height="168" rx="2" fill="#1c302d" stroke="#222d2a" stroke-width="2"/>
          <path d="M333 516V336H607" fill="none" stroke="#98938b" stroke-width="2"/>
          <g data-part="bw-lower-panel" transform="translate(0 ${535*(1-unovaLowerScale)}) scale(1 ${unovaLowerScale})">
          <path d="M310 668V615Q310 535 470 535Q630 535 630 615V668Z" fill="url(#unova-orange)"/>
          <path d="M320 660V615Q320 549 455 545" fill="none" stroke="#fa866b" stroke-width="2"/>
          <path data-part="bw-stripe-upper" d="M402 543 430 539 458 570 440 589Z" fill="#353332"/>
          <path data-part="bw-stripe-lower" d="M494 631 511 612 548 667H517Z" fill="#353332"/>
          <path d="M310 593 329 611 321 635H310M630 593 611 611 619 635H630" fill="#df4832" stroke-width="2"/>
          <circle cx="470" cy="610" r="43" fill="#292826"/>
          <circle cx="470" cy="610" r="37" fill="#b6b1a9" stroke="#252421" stroke-width="2"/>
          <path d="M311 669H629" fill="none" stroke="#553b30" stroke-width="2"/>
          <rect x="324" y="646" width="31" height="12" rx="1" fill="#292927" stroke-width="2"/>
          <rect x="585" y="646" width="31" height="12" rx="1" fill="#292927" stroke-width="2"/>
          <g fill="#292927" stroke="none">
            <circle cx="382" cy="663" r="3"/>
            <circle cx="408" cy="663" r="3"/>
            <circle cx="434" cy="663" r="3"/>
          </g>
          <path d="M320 685H619" fill="none" stroke="#8c857e" stroke-width="2"/>
          </g>
          <rect x="629" y="376" width="16" height="38" rx="3" fill="#204431" stroke="#252e27" stroke-width="2"/>
        </g></g>`
      },
      {
        id: 'tray', motion: { type: 'slide', closed: [0, 220] },
        svg: `${unovaDefs}<g transform="translate(-117.5 0) scale(1.25 1)"><g stroke="#343636" stroke-width="3" stroke-linejoin="round">
          <path d="M307 82Q307 69 320 69H620Q633 69 633 82V315H307Z" fill="#615c58"/>
          <path d="M307 80Q307 69 320 69H620Q629 69 629 80V308H307Z" fill="url(#unova-metal)"/>
          <path d="M316 301V82Q316 78 323 78H617" fill="none" stroke="#e7e1d9" stroke-width="3"/>
          <path d="M328 87H612V296H328Z" fill="#454340"/>
          <path d="M335 290V94H605" fill="none" stroke="#807b74" stroke-width="2"/>
          <rect x="340" y="100" width="260" height="184" rx="2" fill="#1c302d" stroke="#222d2a" stroke-width="2"/>
          <path d="M308 309H632" fill="none" stroke="#3d3a37" stroke-width="2"/>
        </g></g>`
      }
    ],
    screens: [
      { layer: 'tray', x: 310, y: 102, w: 320, h: 180, role: 'main' },
      { layer: 'body', x: 309, y: 344, w: 323, h: 164, role: 'side' }
    ],
    controls: [
      { id: 'centre-round', label: 'Open entry', action: 'confirm', layer: 'body', x: 429, y: unovaLowerY(577), w: 83, h: 66*unovaLowerScale, shape: 'round', fill: '#f1f0e7' },
      { id: 'green-side', label: 'Toggle power', action: 'power', layer: 'body', x: 671, y: 378, w: 15, h: 34, shape: 'rect', fill: '#199b59' }
    ]
  },
  {
    id: 'x', generation: 'VI', region: 'Kalos',
    games: 'X / Y', accent: '#d4485b', width: 940, height: 760,
    reference: 'https://www.pokemon.co.jp/ex/xy/about/04.html',
    note: 'Authored interpretation of the official X/Y card artwork, also archived at https://archives.bulbagarden.net/wiki/File:XY_Pok%C3%A9dex.png. The upper and lower red halves separate vertically around one transparent cyan display. Their semicircular rims retain a luminous centre and narrow seam when compact. The 126-unit travel per half and concealed screen construction are inferred from still artwork. No physical key functions are established, so navigation uses labelled screen controls.',
    gesture: 'Slide the two card halves apart vertically',
    layers: [
      {
        id: 'display', motion: null,
        svg: `<g stroke-linejoin="round">
          <rect x="257" y="232" width="426" height="296" rx="2" fill="#9bebff" fill-opacity=".82" stroke="#71e5ff" stroke-width="3"/>
          <path d="M262 236V524M678 236V524" fill="none" stroke="#efffff" stroke-width="3"/>
          <path d="M268 242H286M654 242H672M268 518H286M654 518H672" fill="none" stroke="#a8e9e6" stroke-width="2"/>
        </g>`
      },
      {
        id: 'upper-card', motion: { type: 'slide', closed: [0, 126] },
        svg: `<g stroke="#552633" stroke-width="3" stroke-linejoin="round">
          <path d="M252 234V100Q252 68 284 68H656Q688 68 688 100V234H608A138 138 0 0 0 332 234Z" fill="#ce3a51"/>
          <path d="M262 220V101Q262 79 284 79H654Q676 79 678 101V220" fill="none" stroke="#ea7180" stroke-width="2"/>
          <path d="M252 158Q332 152 344 68M252 106Q283 102 293 68M596 68Q608 152 688 158M647 68Q656 102 688 106" fill="none" stroke="#6c293b" stroke-width="4"/>
          <path d="M332 234A138 138 0 0 1 608 234H550A80 80 0 0 0 390 234Z" fill="#454c50"/>
          <path d="M252 234H332A138 138 0 0 1 608 234H688" fill="none" stroke="#dce7e0" stroke-width="5"/>
          <path d="M342 229A129 129 0 0 1 598 229" fill="none" stroke="#677176" stroke-width="2"/>
          <path d="M390 234A80 80 0 0 1 550 234Z" fill="#9bebff" fill-opacity=".82" stroke="none"/>
          <path d="M390 234A80 80 0 0 1 550 234" fill="none" stroke="#b9faff" stroke-width="2"/>
          <circle cx="470" cy="89" r="7" fill="#353c40" stroke-width="2"/>
          <circle cx="469" cy="88" r="2" fill="#7f9299" stroke="none"/>
        </g>`
      },
      {
        id: 'lower-card', motion: { type: 'slide', closed: [0, -126] },
        svg: `<g stroke="#552633" stroke-width="3" stroke-linejoin="round">
          <path d="M252 526V660Q252 692 284 692H656Q688 692 688 660V526H608A138 138 0 0 1 332 526Z" fill="#c6334b"/>
          <path d="M262 540V659Q262 681 284 681H654Q676 681 678 659V540" fill="none" stroke="#e66678" stroke-width="2"/>
          <path d="M252 602Q332 608 344 692M252 654Q283 658 293 692M596 692Q608 608 688 602M647 692Q656 658 688 654" fill="none" stroke="#6c293b" stroke-width="4"/>
          <path d="M332 526A138 138 0 0 0 608 526H550A80 80 0 0 1 390 526Z" fill="#454c50"/>
          <path d="M252 526H332A138 138 0 0 0 608 526H688" fill="none" stroke="#dce7e0" stroke-width="5"/>
          <path d="M342 531A129 129 0 0 0 598 531" fill="none" stroke="#677176" stroke-width="2"/>
          <path d="M390 526A80 80 0 0 0 550 526Z" fill="#9bebff" fill-opacity=".82" stroke="none"/>
          <path d="M390 526A80 80 0 0 0 550 526" fill="none" stroke="#b9faff" stroke-width="2"/>
          <circle cx="470" cy="671" r="7" fill="#353c40" stroke-width="2"/>
          <circle cx="469" cy="670" r="2" fill="#7f9299" stroke="none"/>
        </g>`
      }
    ],
    screens: [
      { layer: 'display', x: 274, y: 246, w: 392, h: 268, role: 'main' }
    ],
    controls: []
  }
];
