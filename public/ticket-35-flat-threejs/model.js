// Two requested renderers share this interpreted front elevation and input contract.
export const WIDTH = 940, HEIGHT = 704, HINGE = 466;
export const bodyOutline = [[50,60],[70,40],[446,40],[466,60],[466,664],[70,664],[50,644]];
export const lidOutline = [[466,112],[590,112],[688,170],[862,170],[882,190],[882,644],[862,664],[466,664]];
export const bezelOutline = [[88,204],[412,204],[412,496],[114,496],[88,470]];
export const mainScreen = {x:113,y:236,w:274,h:218};
export const sideScreen = {x:519,y:235,w:313,h:112};
export const dpadOutline = [[348,544],[374,544],[374,573],[403,573],[403,599],[374,599],[374,628],[348,628],[348,599],[319,599],[319,573],[348,573]];
// Rectified from the supplied closed-cover reference, then mapped into this cover's local plane.
export const outerLatchOutline = [[80,372],[105,388],[82,409]];
// Dark mounting well meets the exterior highlight rail. The measured yellow face stays inset.
export const outerLatchRailX = 75;
export const outerLatchWellOutline = [[75,368],[111,387],[76,415]];
const button = (id,label,action,x,y,w,h,kind='dark',part='body',mark='')=>({id,label,action,x,y,w,h,kind,part,mark});
export const controls = [
  button('back','Back one level','back',84,523,49,49,'round'),
  button('menu','Main menu','menu',161,519,62,18,'red'),
  button('entry','Open selected entry','confirm',237,519,62,18,'blue'),
  button('bezel','Change detail page','page',104,461,20,20,'round-red'),
  button('up','Previous item','up',348,544,26,27,'direction'),
  button('left','Previous page','left',319,573,27,26,'direction'),
  button('right','Next page','right',376,573,27,26,'direction'),
  button('down','Next item','down',348,601,26,27,'direction'),
  ...Array.from({length:10},(_,i)=>button('key-'+(i+1),i<5?['Profile','Moves','Encounters','Ribbons','Dex'][i]:['Main menu','Previous item','Next item','Open selected entry','Back one level'][i-5],i<5?'section-'+i:['menu','up','down','confirm','back'][i-5],519+i%5*64,382+Math.floor(i/5)*53,56,45,'cyan','lid')),
  button('white-left','Previous page, white key','left',519,521,54,31,'white','lid'),
  button('white-right','Next page, white key','right',581,521,54,31,'white','lid'),
  button('aux-left','Previous item, black key','up',663,495,45,15,'dark','lid'),
  button('aux-right','Next item, black key','down',718,495,45,15,'dark','lid'),
  button('power','Power on or off','power',785,518,45,45,'round-yellow','lid')
];
export const sections = [
  {name:'PROFILE',items:[{name:'SHIVAM MAHAJAN',tag:'SOFTWARE DEVELOPER',copy:'Builds software and reliable systems. Keeps the details in view.',facts:['ENTRY 001','OWNER PROFILE','SAMPLE LAYOUT']},{name:'APPROACH',tag:'HOW HE WORKS',copy:'Turns a clear problem into working software. Tests the interaction, not only the screenshot.',facts:['DESIGN','BUILD','VERIFY']}]},
  {name:'MOVES',items:[{name:"SM'S DEX",tag:'PORTFOLIO PROJECT',copy:'An interactive device for browsing projects, experience and a public developer roster.',facts:['WEB INTERFACE','IN DEVELOPMENT','KANTO PROTOTYPE']},{name:'SAMPLE PROJECT',tag:'PLACEHOLDER',copy:'Project evidence, decisions and measured results will replace this sample entry.',facts:['DETAILS PENDING','SAMPLE CONTENT']}]},
  {name:'ENCOUNTERS',items:[{name:'CAREER HISTORY',tag:'SAMPLE ENTRY',copy:'Roles, teams and dates belong here. Final content has not been supplied.',facts:['ROLE','TEAM','DATES PENDING']}]},
  {name:'RIBBONS',items:[{name:'ACHIEVEMENTS',tag:'SAMPLE ENTRY',copy:'Verified achievements appear here. No awards are claimed by this prototype.',facts:['EVIDENCE PENDING','SAMPLE CONTENT']}]},
  {name:'DEX',items:[{name:'001 SHIVAM',tag:'OWNER ENTRY',copy:'The first entry belongs to Shivam Mahajan. Public roster integration comes later.',facts:['ENTRY 001','OWNER','ROSTER PREVIEW']},{name:'JOIN THE DEX',tag:'FORM PREVIEW',copy:'A future GitHub issue form adds an entry. This local comparison submits nothing.',facts:['NO SUBMISSION','PREVIEW ONLY']}]}
];
export const initial=()=>({open:true,power:true,mode:'menu',section:0,item:0,page:0,accepted:0,cancelled:0,last:'Ready'});
export function reduce(state,action){
  if(action==='cancel')return {...state,cancelled:state.cancelled+1,last:'Cancelled. No action.'};
  if(action==='lid')return {...state,open:!state.open,last:state.open?'Device closed':'Device opened',accepted:state.accepted+1};
  if(!state.open)return state;
  if(action==='power')return {...state,power:!state.power,last:state.power?'Power off':'Power on',accepted:state.accepted+1};
  if(!state.power)return state;
  const s={...state,accepted:state.accepted+1,last:action};
  if(action.startsWith('section-')){s.section=Number(action.slice(8));s.mode='list';s.item=0;s.page=0;}
  else if(action==='menu'){s.mode='menu';s.page=0;}
  else if(action==='confirm'){s.mode=s.mode==='menu'?'list':'detail';s.page=0;}
  else if(action==='back'){s.mode=s.mode==='detail'?'list':'menu';s.page=0;}
  else if(['up','down'].includes(action)){const delta=action==='up'?-1:1;if(s.mode==='menu'){s.section=(s.section+delta+sections.length)%sections.length;s.item=0;}else{s.item=(s.item+delta+sections[s.section].items.length)%sections[s.section].items.length;}}
  else if(['left','right','page'].includes(action)){if(s.mode==='detail')s.page=1-s.page;else{const delta=action==='left'?-1:1;s.section=(s.section+delta+sections.length)%sections.length;s.item=0;}}
  return s;
}
export function screenData(s){
  const section=sections[s.section],item=section.items[s.item];
  return {section:section.name,item,heading:s.mode==='menu'?'MAIN MENU':section.name+(s.mode==='detail'?' / ENTRY':''),rows:s.mode==='menu'?sections.map(x=>x.name):section.items.map(x=>x.name),selection:s.mode==='menu'?s.section:s.item,footer:s.mode==='detail'?'LEFT/RIGHT PAGE   B BACK':'D-PAD SELECT   A OPEN',active:s.open&&s.power};
}
export const polygon=points=>points.map(p=>p.join(',')).join(' ');
