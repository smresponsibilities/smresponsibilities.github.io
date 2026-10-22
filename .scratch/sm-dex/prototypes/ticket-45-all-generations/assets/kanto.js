import { controls, bodyOutline, lidOutline, bezelOutline, mainScreen, sideScreen, dpadOutline, polygon, HINGE } from '../../ticket-35-flat-threejs/model.js';

// Preserve the selected Gen I front elevation and ticket 44's level exterior mark.
const poly = (points, fill, stroke = '#530b1c', width = 3) => `<polygon points="${polygon(points)}" fill="${fill}" stroke="${stroke}" stroke-width="${width}" stroke-linejoin="round"/>`;
const rect = (x,y,w,h,fill,r=4,stroke='#550c1c') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
const circle = (x,y,r,fill,stroke='#550c1c') => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
const wells = part => controls.filter(c=>c.part===part&&c.kind!=='direction').map(c=>rect(c.x-2,c.y-2,c.w+4,c.h+2,'#71263a',c.kind.includes('round')?c.w/2:5,'#641b2f')).join('');
const colors = {round:'#21262c',dark:'#21262c',red:'#d7424c','round-red':'#d7424c',blue:'#457fbc',cyan:'#5eafcb',white:'#e5e5d9','round-yellow':'#edc936',direction:'#20262b'};

export const kanto = {
  id:'red', generation:'I', region:'Kanto', games:'Red / Blue', accent:'#f02b49', width:940, height:704,
  reference:'https://archives.bulbagarden.net/wiki/File:RG_Pok%C3%A9dex.png',
  note:'The selected ticket-35 front elevation combines RG and anime references. The exterior keeps ticket 44’s level arrow. Hidden surfaces and hinge clearance are reconstructed.',
  gesture:'Slide right to open',
  layers:[
    {id:'body',svg:`<defs><linearGradient id="red-shell" x2="1" y2="1"><stop stop-color="#df3c53"/><stop offset=".47" stop-color="#ce2d45"/><stop offset="1" stop-color="#bd2540"/></linearGradient><radialGradient id="red-lens" cx=".32" cy=".28"><stop stop-color="#8cefff"/><stop offset=".5" stop-color="#30a8ce"/><stop offset="1" stop-color="#176c98"/></radialGradient></defs>${poly(bodyOutline,'url(#red-shell)')}
      <path d="M59 178H244L337 124H458M59 184H246L339 131H458" stroke="#740e28" stroke-width="5"/><path d="M61 63V161M65 199V636Q65 648 80 648H447" stroke="#f7737e" stroke-width="3" opacity=".65"/>
      ${circle(107,101,43,'#c7d0c9')}${circle(107,101,35,'url(#red-lens)','#194b63')}${circle(95,88,11,'#bfeffa','#bfeffa')}
      ${circle(174,74,11,'#b21935')}${circle(208,74,11,'#eac347')}${circle(242,74,11,'#45945b')}
      ${poly(bezelOutline,'#d6dacf','#62675d',3)}<path d="M94 214H402V484" stroke="#f8f9e8" stroke-width="4"/>
      ${rect(107,230,286,231,'#333b3b',7,'#4c5149')}${circle(235,219,3,'#a62937')}${circle(252,219,3,'#a62937')}
      <path d="M325 469H385M325 476H385M325 483H385" stroke="#717b78" stroke-width="3"/>
      ${wells('body')}${rect(158,566,141,60,'#607f46',4)}<text data-readout="entry" x="172" y="589" fill="#163520" font-family="Departure,monospace" font-size="11">ENTRY 001</text><text data-readout="section" x="172" y="608" fill="#163520" font-family="Departure,monospace" font-size="9">PROFILE</text>
      ${poly(dpadOutline,'#0e151b','#10151b',7)}<g data-rocker="red-pad" data-button-finish="gen1">${poly(dpadOutline,'#20262b','#36414a',1)}<path d="M348 546H374" stroke="#5c6970" stroke-width="2"/><circle cx="361" cy="586" r="6" fill="#161d22"/></g>
      <text x="90" y="591" fill="#73152b" font-family="Departure,monospace" font-size="9">B / BACK</text><path d="M332 647H345M352 647H365M372 647H385" stroke="#591027" stroke-width="3"/>`},
    {id:'lid',motion:{type:'hinge-y',origin:[HINGE,0]},svg:`${poly(lidOutline,'#c62943')}<path d="M483 126H585L683 185H868V637Q868 650 855 650H483Z" fill="none" stroke="#711029" stroke-width="3"/><path d="M488 130H583L681 188H866" stroke="#f06775" stroke-width="3"/>
      ${rect(512,228,327,126,'#17252a',6,'#690d27')}${wells('lid')}${rect(519,592,145,45,'#172a2b',4)}${rect(681,592,151,45,'#172a2b',4)}<text data-readout="region" x="533" y="620" fill="#98b39b" font-family="Departure,monospace" font-size="11">KANTO</text><text data-readout="owner" x="695" y="620" fill="#98b39b" font-family="Departure,monospace" font-size="11">SM / 001</text>
      <path d="M678 540H685M693 540H700M708 540H715M723 540H730M678 549H685M693 549H700M708 549H715M723 549H730" stroke="#6a1930" stroke-width="3"/>`,
      outer:`${poly(lidOutline.map(([x,y])=>[2*HINGE-x,y]),'#c62b44')}<path d="M65 192H236L334 134H449V645H82Q65 645 65 628Z" fill="none" stroke="#740c27" stroke-width="3"/><path d="M75 202V625" stroke="#f36879" stroke-width="3"/><polygon points="75,368 111,390.5 75,413" fill="#5b1020"/><polygon points="80,372 105,390.5 80,409" fill="#e7c631"/><path d="M103 588H219M103 601H219M103 614H219" stroke="#6a132c" stroke-width="7" stroke-linecap="round"/>`},
    {id:'hinge',svg:`<defs><linearGradient id="red-hinge"><stop stop-color="#6c0d27"/><stop offset=".35" stop-color="#e84a60"/><stop offset=".65" stop-color="#ce2c48"/><stop offset="1" stop-color="#690c25"/></linearGradient></defs>${rect(451,115,29,548,'url(#red-hinge)',9,'#6c1027')}<path d="M452 143H478M452 152H478M452 619H478M452 628H478" stroke="#740e29" stroke-width="3"/>`}
  ],
  screens:[{layer:'body',...mainScreen,role:'main'},{layer:'lid',...sideScreen,role:'side'}],
  controls:controls.map(c=>({...c,layer:c.part,shape:c.kind.includes('round')?'round':c.kind==='direction'?'direction':'rect',fill:colors[c.kind],rocker:c.kind==='direction'?'red-pad':undefined}))
};
