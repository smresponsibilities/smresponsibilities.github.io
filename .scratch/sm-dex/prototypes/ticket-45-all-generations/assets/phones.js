// Front and rear are separate drawings. Portfolio apertures belong only to the front.
// Galar's guide sheet supports that separation; Paldea's exact front remains reconstructed.
const eye=(x,angle)=>`<g transform="rotate(${angle} ${x} 365)"><ellipse cx="${x}" cy="365" rx="29" ry="61" fill="#f5fff5"/><ellipse cx="${x}" cy="365" rx="18" ry="46" fill="#75d1ca"/><path d="M${x-17} 376Q${x} 387 ${x+17} 376V398Q${x} 422 ${x-17} 398Z" fill="#b9e6e0" stroke="none"/></g>`;
function phone(paldea){
  const id=paldea?'scarlet-violet':'sword-shield',color=paldea?'#f47a55':'#f46849';
  const shell=`<g stroke="#63332e" stroke-width="3" stroke-linejoin="round">
    <path d="M436 152 454 85 481 106 529 37 507 123 479 118 473 152Z" fill="${color}"/>
    <path d="M438 660H501L471 737Z" fill="${color}"/>
    <rect x="291" y="152" width="364" height="526" rx="32" fill="#b84a37"/>
    <rect x="285" y="147" width="364" height="526" rx="32" fill="${color}"/>
    <path d="M296 233V181Q296 158 321 158H613M296 600V633Q296 659 322 659" fill="none" stroke="#ffb595"/>
  </g>`;
  const front=`${shell}<rect x="301" y="164" width="332" height="493" rx="23" fill="#17292e" stroke="#813e34" stroke-width="3"/>
    <path d="M448 162V176Q448 194 468 194Q488 194 488 176V162" fill="${color}" stroke="#63332e" stroke-width="2"/>
    <circle cx="461" cy="176" r="2" fill="#63332e"/><circle cx="475" cy="176" r="2" fill="#63332e"/>
    <path d="M461 183Q468 188 475 183" fill="none" stroke="#63332e" stroke-width="2"/>`;
  const camera=paldea?
    `<g data-part="paldea-cameras">
      <path d="M334 173C350 173 356 187 362 187C369 187 371 181 382 181C411 181 411 223 382 223C371 223 369 217 362 217C356 217 350 231 334 231C296 231 296 173 334 173Z" fill="#f58c69"/>
      <circle cx="334" cy="202" r="20" fill="#667c9c"/>
      <circle cx="334" cy="202" r="15" fill="#648ac0" stroke="none"/>
      <path d="M321 201Q328 185 345 194L323 210Z" fill="#a1bce2" stroke="none"/>
      <circle cx="382" cy="202" r="14" fill="#565956"/>
      <circle cx="382" cy="202" r="9" fill="#858986" stroke="none"/>
      <path d="M375 201Q380 192 388 198" fill="none" stroke="#bfc3ba" stroke-width="3"/>
    </g>`:
    `<circle cx="320" cy="194" r="22" fill="#e47b62"/><circle cx="320" cy="194" r="15" fill="#70b5d9"/><circle cx="320" cy="194" r="8" fill="#356c92"/>`;
  const rear=`${shell}<g stroke="#64342f" stroke-width="3" stroke-linejoin="round">
    ${camera}${paldea?'':'<path d="M310 189 319 183" fill="none" stroke="#ddfaff"/>'}
    <circle cx="467" cy="430" r="121" fill="${color}" stroke="${paldea?'#8ee2e3':'#783c34'}" stroke-width="${paldea?6:3}"/>
    ${paldea?'<circle cx="467" cy="430" r="121" fill="none" stroke="#e6ffff" stroke-width="2"/>':''}
    ${eye(383,-13)}${eye(551,13)}
    <path d="M434 426 453 432 451 451Q439 449 434 426ZM459 433H476L479 455H456ZM482 432 501 426Q496 446 485 451Z" fill="#fffce9" stroke="none"/>
  </g>`;
  return {id,generation:paldea?'IX':'VIII',region:paldea?'Paldea':'Galar',games:paldea?'Scarlet / Violet':'Sword / Shield',accent:color,width:940,height:760,
    reference:paldea?'https://archives.bulbagarden.net/wiki/File:0479Rotom-Phone_SV.png':'https://archives.bulbagarden.net/wiki/File:Rotom_Phone_SwSh_concept_art.jpg',
    note:paldea?'Separate authored screen and rear faces. The dual camera and cyan-rimmed rear face follow SV artwork. The screen-side notch, proportions and concealed thickness remain reconstructed; this is not a verified canonical front. Flip is an inspection interaction.':'Separate authored front and rear faces guided by the official Galar guide sheet. Camera and circular Rotom face belong on the rear; the screen has a small spike-root notch. Proportions are adapted for portfolio content. Flip is an inspection interaction, not a hinged casing.',
    gesture:'Slide right to unlock; flip to inspect the rear',layers:[{id:'body',motion:null,svg:front}],rear,
    screens:[{layer:'body',x:313,y:204,w:308,h:433,role:'main'}],controls:[]};
}
export const phones=[phone(false),phone(true)];
