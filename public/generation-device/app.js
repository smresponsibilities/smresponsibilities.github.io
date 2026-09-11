import {kanto} from './assets/kanto.js?v=55.0';
import {devices as classic} from './assets/classic.js?v=58.0';
import {devices as middle} from './assets/middle.js?v=58.0';
import {devices as rotom} from './assets/rotom.js?v=58.0';
import {sections,initial,reduce} from './content.js?v=70.0';
import {createDevice,exportAsset} from './renderer.js?v=64.0';
import {createEffects} from './effects.js?v=58.0';

const $=id=>document.getElementById(id);
const catalog=[kanto,...classic,...middle,...rotom].filter(device=>device.generation!=='IV-r');
const order=['I','II','III','IV','IV-r','V','VI','VII','VIII','IX'];
catalog.sort((a,b)=>order.indexOf(a.generation)-order.indexOf(b.generation));
const params=new URLSearchParams(location.search);
let device=catalog.find(d=>d.id===(params.get('pokedexgen')||params.get('gen')))||(matchMedia('(max-width:700px)').matches?catalog.find(d=>d.id==='scarlet-violet'):kanto);
let state=initial(),progress=params.get('open')==='0'?0:1,settled=progress,renderer,frame=0,drag=null,readerWanted=matchMedia('(max-width:700px)').matches,lastAction='Ready',accepted=0;
let effects=null;
const media=matchMedia('(prefers-reduced-motion:reduce)');
$('reduce-motion').checked=media.matches;
const reduced=()=>$('reduce-motion').checked||media.matches;
const mobileFrames={
  black:{x:220,y:45,w:500,h:700},
  x:{x:210,y:80,w:520,h:600},
  'sun-moon':{x:155,y:135,w:630,h:500},
  'sword-shield':{x:245,y:125,w:450,h:570},
  'scarlet-violet':{x:245,y:125,w:450,h:570}
};
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
const isOpen=()=>progress===1&&!drag&&!frame;
const item=()=>sections[state.section].items[state.item];
const actionLabels={up:'Previous',down:'Next',left:'Previous page',right:'Next page',confirm:'Open',back:'Back',menu:'Menu',power:'Power'};

function screenHTML(side=false,reader=false){
  if(!state.power)return '<h2>Power off</h2><p>Use the power button to resume.</p>';
  const current=item(),section=sections[state.section],title=state.mode==='menu'?'MAIN MENU':section.name;
  if(side)return `<div class="screen-heading"><span>SM'S DEX</span><span>001 / OWNER</span></div><div class="screen-content"><h2>${esc(state.mode==='menu'?'SHIVAM MAHAJAN':current.name)}</h2><p class="tag">${esc(state.mode==='menu'?'SOFTWARE DEVELOPER':current.tag)}</p><p class="screen-hint">${state.mode==='detail'?'B BACK / LEFT-RIGHT PAGE':'A OPEN / B BACK'}</p></div>`;
  let body='';
  if(state.mode==='detail'){
    body=`<h2>${esc(current.name)}</h2><p class="tag">${esc(current.tag)}</p>`;
    body+=state.page===0?`<p>${esc(current.copy)}</p>`:`<ul class="facts">${current.facts.map(f=>`<li>${esc(f)}</li>`).join('')}</ul>`;
    if(current.links&&reader)body+=`<p>${current.links.map(([label,url])=>`<a href="${url}" target="_blank" rel="noreferrer">${label} ↗</a>`).join(' · ')}</p>`;
  }else{
    const rows=state.mode==='menu'?sections.map(s=>s.name):section.items.map(i=>i.name),selected=state.mode==='menu'?state.section:state.item;
    body=`<div class="screen-rows">${rows.map((r,i)=>`<button class="screen-row" data-row="${i}" aria-current="${i===selected}" data-tooltip="Open ${esc(r)}" data-tooltip-detail="View its description, results, and recorded dex facts."><span>${i===selected?'›':' '} ${esc(r)}</span><span>${String(i+1).padStart(2,'0')}</span></button>`).join('')}</div>`;
  }
  return `<div class="screen-heading"><span>${title}</span><span>${state.mode==='detail'?`${state.page+1}/2`:esc(device.region.toUpperCase())}</span></div><div class="screen-content">${body}</div>${reader?'':`<nav class="screen-nav" aria-label="Screen navigation"><button data-action="back" data-tooltip="Return to the previous screen">B Back</button><button data-action="${state.mode==='detail'?'right':'menu'}" data-tooltip="${state.mode==='detail'?'Show the next detail page':'Open the main menu'}">${state.mode==='detail'?'LEFT/RIGHT PAGE':'Menu'}</button></nav>`}`;
}
function handleContent(e){
  const row=e.target.closest('[data-row]');
  if(row&&isOpen()&&state.power&&effects.facingFront()){const n=Number(row.dataset.row);if(state.mode==='menu'){state={...state,section:n,item:0,mode:'list'};}else state={...state,item:n,mode:'detail',page:0};accepted++;lastAction='Entry selected';renderContent();if(device.id==='sun-moon')effects.react();return;}
  const button=e.target.closest('[data-action]');if(button)dispatch(button.dataset.action,button.textContent);
}
function dispatch(action,label=action){
  if(!isOpen()||!effects.facingFront()||(action!=='power'&&!state.power))return;
  state=reduce(state,action);accepted++;lastAction=label;renderContent();
  if(device.id==='sun-moon'&&action!=='power')effects.react();
}
function renderContent(sync=true){
  const active=document.activeElement,owner=active.closest('.glass,#reader-content');
  const previous=owner?{owner,action:active.dataset.action,row:active.dataset.row}:null;
  for(const glass of renderer.glasses){glass.innerHTML=screenHTML(glass.dataset.screen==='side');const row=glass.querySelector('.screen-row[aria-current=true]');if(row)glass.querySelector('.screen-content').scrollTop=Math.max(0,row.offsetTop-90);}
  for(const label of $('rig').querySelectorAll('[data-readout=section]'))label.textContent=sections[state.section].name;
  for(const label of $('rig').querySelectorAll('[data-readout]'))label.style.visibility=state.power?'visible':'hidden';
  $('reader-content').innerHTML=screenHTML(false,true);
  if(previous){const target=previous.action?owner.querySelector(`[data-action="${previous.action}"]`):owner.querySelector('[aria-current="true"]')||owner.querySelector('h2');if(target){if(target.tagName==='H2')target.tabIndex=-1;target.focus({preventScroll:true});}}
  $('power').textContent=state.power?'Power off':'Power on';
  if(sync){syncAvailability();status();}
}
function status(){
  $('status').textContent=drag?`Opening · ${Math.round(progress*100)}%`:progress===0?(stationary()?'Screen locked. Slide to unlock.':'Device closed. Slide to open.'):progress===1?(state.power?`${sections[state.section].name} · ${state.mode==='detail'?item().name:'Select an entry'}`:'Power off. Selection saved.'):'Opening device…';
  document.body.dataset.open=String(isOpen());document.body.dataset.generation=device.id;
  $('stage').dataset.progress=String(progress);$('stage').dataset.actions=String(accepted);$('stage').dataset.lastAction=lastAction;
  $('stage').dataset.facing=effects?.isBack()?'rear':'front';
  if(device.rear&&effects?.isBack()&&progress===1)$('status').textContent='Rear view. Flip to return to the portfolio screen.';
}
function stationary(){return !device.layers.some(l=>l.motion);}
function syncAvailability(){
  const open=isOpen(),frontOpen=open&&(!effects||effects.facingFront());renderer.available(frontOpen,state.power);
  effects?.setState({open,power:state.power,reduced:reduced()});
  $('reader').hidden=!frontOpen||!readerWanted;
  $('reader-toggle').setAttribute('aria-expanded',String(frontOpen&&readerWanted));
  for(const b of $('reader-controls').querySelectorAll('button'))b.disabled=!frontOpen||(!state.power&&b.dataset.action!=='power');
  $('power').hidden=false;$('power').disabled=!frontOpen;
  $('reader-toggle').disabled=!frontOpen;
  $('cover-drag').hidden=open;
  const text=open?(stationary()?'Lock screen':'Close device'):(stationary()?'Unlock screen':'Open device');
  for(const b of [$('toggle'),$('slide-handle')]){b.setAttribute('aria-expanded',String(open));b.setAttribute('aria-label',text);}
  $('toggle').textContent=text;
  $('slide-label').textContent=settled===1?(stationary()?'Slide left to lock':'Slide left to close'):(stationary()?'Slide right to unlock':'Slide right to open');
  $('slide-handle').firstElementChild.textContent=settled===1?'←':'→';
  document.body.classList.toggle('reduced',reduced());
}
function position(value){
  progress=Math.max(0,Math.min(1,value));
  // With reduced motion, drag still moves the thumb but the device changes at release.
  renderer.pose(reduced()&&drag?settled:progress);
  effects?.pose(reduced()&&drag?settled:progress);
  const handle=$('slide-handle'),track=$('slide-track');
  const travel=Math.max(0,track.clientWidth-handle.offsetWidth-(handle.offsetLeft*2));
  handle.style.transform=`translateX(${progress*travel}px) rotate(${progress*720}deg)`;
  syncAvailability();status();
}
function settle(target,animate=true){
  cancelAnimationFrame(frame);frame=0;renderer.cancel();
  if(reduced()||!animate||Math.abs(target-progress)<.001){settled=target;position(target);return;}
  const start=performance.now(),from=progress;
  const rotomTurn=device.id==='sun-moon';
  function tick(now){const t=Math.min(1,(now-start)/(rotomTurn?1050:320)),eased=rotomTurn?t*t*(3-2*t):1-(1-t)**3;position(from+(target-from)*eased);if(t<1)frame=requestAnimationFrame(tick);else{frame=0;settled=target;position(target);}}
  frame=requestAnimationFrame(tick);syncAvailability();
}
function cancelDrag(){if(!drag)return;const start=drag.start;drag=null;document.body.classList.remove('dragging');settle(start);}
function beginDrag(e){
  if(e.button!==0||drag)return;
  cancelAnimationFrame(frame);frame=0;renderer.cancel();
  drag={id:e.pointerId,x:e.clientX,start:settled,progress,element:e.currentTarget,moved:false};
  e.currentTarget.setPointerCapture(e.pointerId);document.body.classList.add('dragging');syncAvailability();
}
for(const el of [$('slide-handle'),$('cover-drag')]){
  el.addEventListener('pointerdown',beginDrag);
  el.addEventListener('pointermove',e=>{if(!drag||e.pointerId!==drag.id)return;const delta=e.clientX-drag.x;drag.moved ||= Math.abs(delta)>4;position(drag.progress+delta/Math.max(140,$('slide-track').clientWidth-56));});
  el.addEventListener('pointerup',e=>{if(!drag||e.pointerId!==drag.id)return;const moved=drag.moved,start=drag.start;drag=null;document.body.classList.remove('dragging');settle(moved?(progress>=.55?1:0):start);});
  el.addEventListener('pointercancel',cancelDrag);el.addEventListener('lostpointercapture',cancelDrag);
}
$('slide-handle').addEventListener('click',e=>{if(e.detail===0)settle(settled?0:1);});
$('slide-handle').addEventListener('keydown',e=>{if(e.repeat)return;if(['ArrowRight','End','ArrowLeft','Home'].includes(e.key)){e.preventDefault();settle(['ArrowRight','End'].includes(e.key)?1:0);}});
$('toggle').addEventListener('click',()=>{cancelDrag();settle(settled?0:1);});
$('power').addEventListener('click',()=>dispatch('power'));
$('reader-toggle').addEventListener('click',()=>{readerWanted=!readerWanted;syncAvailability();});
$('reader-content').addEventListener('click',handleContent);
$('reader-controls').innerHTML=Object.entries(actionLabels).map(([action,label])=>`<button data-action="${action}" data-tooltip="${label} portfolio selection">${label}</button>`).join('');
$('reader-controls').addEventListener('click',handleContent);
$('assets-toggle').addEventListener('click',()=>{const show=$('asset-panel').hidden;$('asset-panel').hidden=!show;$('assets-toggle').setAttribute('aria-expanded',String(show));if(show)$('asset-panel').scrollIntoView({behavior:reduced()?'instant':'smooth',block:'start'});});
$('reduce-motion').addEventListener('change',()=>{cancelDrag();settle(settled,false);});
media.addEventListener('change',()=>{cancelDrag();settle(settled,false);});
window.addEventListener('blur',()=>{cancelDrag();renderer.cancel();});
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'&&drag){e.preventDefault();cancelDrag();return;}
  if(e.repeat||!e.target.closest('#stage,#reader')||e.target.matches('input,textarea,select'))return;
  const action={ArrowUp:'up',ArrowDown:'down',ArrowLeft:'left',ArrowRight:'right',a:'confirm',b:'back',Escape:'back'}[e.key];
  if(action){e.preventDefault();dispatch(action);}
});
let resizeFrame=0,lastStageWidth=0;
function resize(){
  cancelAnimationFrame(resizeFrame);
  resizeFrame=requestAnimationFrame(()=>{
    resizeFrame=0;
    const width=$('stage').clientWidth;
    if(width===lastStageWidth)return;
    lastStageWidth=width;
    const mobile=matchMedia('(max-width:700px)').matches,mobileFrame=mobile?mobileFrames[device.id]:null;
    const scale=width/(mobileFrame?.w||device.width);
    const offsetX=mobileFrame?-mobileFrame.x*scale:0,offsetY=mobileFrame?-mobileFrame.y*scale:0;
    $('stage').style.height=mobileFrame?`${mobileFrame.h*scale}px`:'';
    $('stage').style.aspectRatio=mobileFrame?'auto':`${device.width}/${device.height}`;
    $('rig').style.transform=`translate(${offsetX}px,${offsetY}px) scale(${scale})`;
    $('rig').style.setProperty('--press-travel',`${4/scale}px`);
    position(progress);
  });
}
new ResizeObserver(resize).observe($('stage'));
function select(next){
  const changing=device.id!==next.id;
  cancelAnimationFrame(frame);frame=0;drag=null;document.body.classList.remove('dragging');
  effects?.dispose();
  // A newly selected rear-first device starts with its casing, ready to slide open.
  if(changing&&next.rear&&matchMedia('(max-width:700px)').matches){settled=1;progress=1;}
  device=next;document.documentElement.style.setProperty('--accent',device.accent);
  $('stage').style.aspectRatio=`${device.width}/${device.height}`;
  renderer=createDevice(device,$('rig'),dispatch);
  effects=createEffects(device,$('rig'),$('effect-controls'),()=>{syncAvailability();status();});
  for(const glass of renderer.glasses)glass.addEventListener('click',handleContent);
  $('region').textContent=device.region;$('games').textContent=device.games;$('edition').textContent=`GEN ${device.generation}`;
  $('reference').href=device.reference;$('source-note').textContent=device.note;
  $('generations').innerHTML=catalog.map(d=>`<button data-gen="${d.id}" aria-label="${esc(d.region)} · ${esc(d.games)}" aria-pressed="${d.id===device.id}" data-tooltip="Show Generation ${d.generation}: ${esc(d.region)} device">${d.generation}</button>`).join('');
  $('asset-grid').querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.gen===device.id)));
  const url=new URL(location.href);url.searchParams.set('pokedexgen',device.id);url.searchParams.delete('gen');history.replaceState(null,'',url);
  lastStageWidth=0;renderContent(false);position(settled);resize();
}
$('generations').addEventListener('click',e=>{const id=e.target.closest('[data-gen]')?.dataset.gen;if(id){hideTooltip();select(catalog.find(d=>d.id===id));}});
$('asset-grid').innerHTML=catalog.map(d=>`<button class="asset-card" data-gen="${d.id}" aria-pressed="${d.id===device.id}">${exportAsset(d).replace('<svg ','<svg aria-hidden="true" ')}<strong>${d.generation} · ${esc(d.region)}</strong><small>${esc(d.games)}</small></button>`).join('');
$('asset-grid').addEventListener('click',e=>{const id=e.target.closest('[data-gen]')?.dataset.gen;if(id){hideTooltip();select(catalog.find(d=>d.id===id));$('stage').scrollIntoView({behavior:'instant',block:'center'});}});
$('download').addEventListener('click',()=>{const blob=new Blob([exportAsset(device)],{type:'image/svg+xml'}),url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download=`${device.id}-open.svg`;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
select(device);

const tooltip=document.createElement('div');tooltip.id='button-tooltip';tooltip.className='button-tooltip';tooltip.setAttribute('role','tooltip');tooltip.hidden=true;document.body.append(tooltip);
const callout=document.createElementNS('http://www.w3.org/2000/svg','svg');callout.classList.add('callout-line');callout.setAttribute('aria-hidden','true');callout.innerHTML='<polyline></polyline>';callout.hidden=true;document.body.append(callout);
let tooltipOwner=null;
const tooltipSwitch=$('tooltip-switch');
let tooltipsEnabled=true;
try{tooltipsEnabled=localStorage.getItem('sm-dex-tooltips')!=='off';}catch{}
function syncTooltipSwitch(){tooltipSwitch?.setAttribute('aria-checked',String(tooltipsEnabled));}
syncTooltipSwitch();
tooltipSwitch?.addEventListener('click',()=>{tooltipsEnabled=!tooltipsEnabled;try{localStorage.setItem('sm-dex-tooltips',tooltipsEnabled?'on':'off');}catch{}hideTooltip();syncTooltipSwitch();});
function showTooltip(target){const button=target.closest?.('[data-tooltip]'),text=button?.dataset.tooltip;if(!tooltipsEnabled||!text||button===tooltipSwitch)return;tooltipOwner=button;tooltip.replaceChildren();const title=document.createElement('strong');title.textContent=text;tooltip.append(title);if(button.dataset.tooltipDetail){const detail=document.createElement('span');detail.textContent=button.dataset.tooltipDetail;tooltip.append(detail);}tooltip.hidden=false;callout.hidden=false;button.setAttribute('aria-describedby','button-tooltip');const rect=button.getBoundingClientRect(),above=rect.top>190;let top=above?rect.top-tooltip.offsetHeight-92:rect.bottom+92;top=Math.max(16,Math.min(innerHeight-tooltip.offsetHeight-16,top));let left=rect.left+rect.width/2-tooltip.offsetWidth/2+(rect.left<innerWidth/2?150:-150);left=Math.max(16,Math.min(innerWidth-tooltip.offsetWidth-16,left));tooltip.style.left=`${left}px`;tooltip.style.top=`${top}px`;const tx=rect.left+rect.width/2,ty=above?rect.top:rect.bottom,lx=left+tooltip.offsetWidth/2,ly=above?top+tooltip.offsetHeight:top,elbowY=above?ly+28:ly-28;callout.querySelector('polyline').setAttribute('points',`${lx},${ly} ${lx},${elbowY} ${tx},${ty}`);}
function hideTooltip(){tooltipOwner?.removeAttribute('aria-describedby');tooltipOwner=null;tooltip.hidden=true;callout.hidden=true;callout.querySelector('polyline').removeAttribute('points');}
document.addEventListener('pointerover',e=>{const button=e.target.closest?.('[data-tooltip]');if(button&&!button.contains(e.relatedTarget))showTooltip(button);});document.addEventListener('pointerout',e=>{const button=e.target.closest?.('[data-tooltip]');if(button&&!button.contains(e.relatedTarget))hideTooltip(button);});document.addEventListener('focusin',e=>showTooltip(e.target));document.addEventListener('focusout',e=>hideTooltip(e.target));
addEventListener('scroll',hideTooltip,{passive:true,capture:true});addEventListener('resize',hideTooltip,{passive:true});addEventListener('blur',hideTooltip);document.addEventListener('keydown',e=>{if(e.key==='Escape')hideTooltip();});
