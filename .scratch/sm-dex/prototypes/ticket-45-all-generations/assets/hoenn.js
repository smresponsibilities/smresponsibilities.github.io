// User-selected revision 47 RSE treatment. The right crescent closes sideways.
// This is a deliberate visual preference, not a claim about canonical hinge construction.
const edge='#603020',orange='#ff781b',shade='#cb4714',light='#ffc575';
const main={layer:'body',x:192,y:276,w:246,h:190,role:'main'};
const finish=`<defs><linearGradient id="ruby-shell" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#ff9e45"/><stop offset=".5" stop-color="#ff781b"/><stop offset="1" stop-color="#cf4710"/></linearGradient></defs>`;
const path=(d,fill,stroke=edge,sw=3)=>`<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" stroke-linejoin="round"/>`;
const line=(d,stroke=edge,sw=3)=>`<path d="${d}" fill="none" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round"/>`;
const circle=(x,y,r,fill,stroke=edge,sw=3)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
const rect=(x,y,w,h,fill,r=6)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${edge}" stroke-width="2"/>`;
const discX=100,discY=380,discR=78,hingeX=480;
const controls=[
  {id:'ruby-disc-up',label:'Previous item',action:'up',x:75,y:308,w:50,h:47},
  {id:'ruby-disc-right',label:'Next page',action:'right',x:125,y:355,w:47,h:50},
  {id:'ruby-disc-down',label:'Next item',action:'down',x:75,y:405,w:50,h:47},
  {id:'ruby-disc-left',label:'Previous page',action:'left',x:28,y:355,w:47,h:50},
].map(c=>({...c,layer:'body',shape:'direction',rocker:'ruby-disc',fill:'#f5f7ee'}));
controls.push(
  {id:'centre-green',label:'Open entry',action:'confirm',layer:'body',x:128,y:462,w:46,h:46,shape:'round',fill:'#43d053'},
  {id:'white-pill-left',label:'Back',action:'back',layer:'body',x:267,y:498,w:56,h:20,shape:'rect',fill:'#f6f8ee'},
  {id:'white-pill-right',label:'Main menu',action:'menu',layer:'body',x:345,y:498,w:56,h:20,shape:'rect',fill:'#f6f8ee'},
);
// Closed face keeps the accepted crescent cutout but seats exactly against the body edges.
const closedOutline='M494 219H878Q898 219 903 237L911 317A85 85 0 1 0 911 453L903 522Q900 540 878 540H494Z';
const closedLid=path(closedOutline,'url(#ruby-shell)').replace('<path ','<path data-part="ruby-closed-fit-lid" ')+
  line('M506 230H878Q889 230 892 243L903 308',light)+
  line('M506 528H878Q889 528 892 515L903 462',shade);
const lid=closedLid.replace('ruby-closed-fit-lid','ruby-side-lid');
const disc=circle(discX,discY+5,discR+5,'#515957','#293431')+
  `<g data-rocker="ruby-disc" data-button-finish="gen1">${circle(discX,discY,discR,'#f5f7ee','#283632')}
    ${line('M23 380H64M136 380H177','#283632',7)}
    ${circle(discX,discY,36,'#243d40','#283632')}
    ${circle(discX,discY,29,'#5fd4ed','#2d6470',2)}
    ${line('M83 365Q92 353 109 356','#d8ffff',4)}
    ${line('M50 426Q100 455 150 426','#c2d0c8',3)}
  </g>`;
const body=path('M82 219H466V540H82Q45 540 42 501L30 396Q26 368 33 340L44 254Q48 219 82 219Z',shade).replace('<path ','<path data-part="ruby-body" ')+
  path('M82 216H465V532H82Q51 532 49 498L37 395Q33 369 40 342L51 254Q54 216 82 216Z','url(#ruby-shell)')+
  path('M74 250H442V489H196L185 513H117L94 476H64Z','#303b37','#26312e')+
  rect(179,263,274,216,'#cfded7',8)+rect(189,273,254,196,'#203638',3)+
  line('M187 471V271H435','#f1fff4',3)+
  line('M63 256Q65 228 88 228H177M205 228H450M206 522H448',light)+
  rect(177,201,46,17,shade,3)+line('M183 205H216',light,2)+
  disc+circle(161,286,8,'#ff5266','#382f29',2)+circle(159,284,2,'#fff5e5','none',0)+
  controls.filter(c=>c.shape!=='direction').map(c=>rect(c.x-2,c.y-2,c.w+4,c.h+2,'#293c32',c.shape==='round'?c.w/2:5)).join('');

export const hoenn={
  id:'ruby',generation:'III',region:'Hoenn',games:'Ruby / Sapphire',accent:orange,width:940,height:760,
  reference:'https://archives.bulbagarden.net/wiki/File:RSE_Pok%C3%A9dex.png',
  note:'User-selected revision 47 landscape RSE treatment. The right crescent closes sideways around the exposed disc. This motion is a deliberate visual preference and is not presented as canonical hinge construction. Release art supplies the component inventory; exact depth and unpictured exterior remain inferred. Controls retain portfolio actions, with an inert blue disc centre, red lamp and green lid lens.',
  gesture:'Slide right to swing the crescent cover open',
  layers:[
    {id:'body',motion:null,svg:`<defs><linearGradient id="ruby-shell" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#ff9e45"/><stop offset=".5" stop-color="#ff781b"/><stop offset="1" stop-color="#cf4710"/></linearGradient><mask id="ruby-display" maskUnits="userSpaceOnUse" x="0" y="0" width="940" height="760"><rect width="940" height="760" fill="white"/><rect x="${main.x}" y="${main.y}" width="${main.w}" height="${main.h}" fill="black"/></mask></defs><g mask="url(#ruby-display)">${body}</g>`},
    {id:'lid',motion:{type:'hinge-y',origin:[hingeX,380],clearance:2},svg:finish+lid+
      circle(569,380,36,'#304337')+circle(569,380,28,'#37ca45','#20552c',2)+
      line('M551 369Q559 357 573 359','#c9ffbb',4)+line('M520 250H847M520 510H847','#d95a15',2),
      outer:`${finish}<g transform="translate(${hingeX*2} 0) scale(-1 1)">${closedLid}</g>`},
    {id:'hinge',motion:null,svg:rect(465,219,30,321,shade,12)+rect(470,228,20,303,orange,7)+
      rect(463,219,34,19,'#dce5df',6)+rect(463,521,34,19,'#dce5df',6)+
      line('M473 237V522',light,3)+line('M465 294H495M465 466H495',edge,2)}
  ],screens:[main],controls,
};
