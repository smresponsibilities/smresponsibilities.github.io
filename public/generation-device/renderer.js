export const svg = (device, body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${device.width} ${device.height}" fill="none">${body}</svg>`;
const escape = text => String(text).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');

export function controlArt(c){
  if(c.shape==='direction')return '';
  const radius=c.shape==='round'?Math.min(c.w,c.h)/2:c.shape==='pill'?c.h/2:5;
  const fill=!c.kind&&['#e2e4df','#f1f0e7'].includes(c.fill)?'#e5e5d9':c.fill;
  return `<g id="${c.id}-base"><rect x="${c.x}" y="${c.y}" width="${c.w}" height="${c.h}" rx="${radius}" fill="#26303a"/></g><g id="${c.id}-face"><rect x="${c.x}" y="${c.y}" width="${c.w}" height="${c.h-4}" rx="${radius}" fill="${fill}" stroke="#233037" stroke-width="1.5"/></g>`;
}

// A standalone SVG contains named groups, ready for extraction without runtime cropping.
// Screen apertures remain transparent. Masks clear the source drawing's recess fill only.
export function exportAsset(device){
  const defs=device.layers.map(layer=>`<mask id="${device.id}-${layer.id}-apertures"><rect width="100%" height="100%" fill="white"/>${device.screens.filter(s=>s.layer===layer.id).map(s=>`<rect x="${s.x}" y="${s.y}" width="${s.w}" height="${s.h}" rx="3" fill="black"/>`).join('')}</mask>`).join('');
  const groups=device.layers.map(layer=>`<g id="${escape(layer.id)}" mask="url(#${device.id}-${layer.id}-apertures)">${layer.svg}${device.controls.filter(c=>c.layer===layer.id).map(c=>`<g id="${escape(c.id)}">${controlArt(c)}</g>`).join('')}</g>`).join('');
  return svg(device,`<title>${escape(device.region)} · ${escape(device.games)}</title><desc>Authored flat interface asset. ${escape(device.note)}</desc><defs>${defs}</defs>${groups}`)
    .replaceAll(/id="([^"]+)"/g,(_,id)=>`id="export-${device.id}-${id}"`)
    .replaceAll(/url\(#([^\)]+)\)/g,(_,id)=>`url(#export-${device.id}-${id})`);
}

export function createDevice(device,host,onControl){
  host.replaceChildren();
  host.style.width=`${device.width}px`;host.style.height=`${device.height}px`;
  const layers=new Map(),buttons=[],glasses=[];
  for(const layer of device.layers){
    const el=document.createElement('div');el.className=`device-layer ${layer.motion?'moving':''} ${layer.id.includes('hinge')?'fixed-hinge':''}`;el.dataset.layer=layer.id;
    const inner=document.createElement('div');inner.className='layer-face';inner.innerHTML=svg(device,layer.svg);inner.firstElementChild.classList.add('device-art');inner.firstElementChild.setAttribute('aria-hidden','true');el.append(inner);
    if(layer.motion?.origin){
      el.style.transformOrigin=layer.motion.origin.map(n=>`${n}px`).join(' ');
      if(layer.outer){const outer=document.createElement('div');outer.className='layer-face outer';outer.innerHTML=svg(device,layer.outer);outer.firstElementChild.classList.add('device-art');outer.setAttribute('aria-hidden','true');outer.style.transformOrigin=el.style.transformOrigin;outer.style.transform=layer.motion.type==='hinge-x'?'rotateX(180deg)':'rotateY(180deg)';el.append(outer);}
    }
    host.append(el);layers.set(layer.id,{el,inner,definition:layer});
  }
  for(const c of device.controls){
    const button=document.createElement('button');button.type='button';button.className=`hardware ${c.shape}`;button.dataset.control=c.id;button.dataset.action=c.action;button.dataset.finish='original-flat';button.dataset.tooltip=`${c.label}: ${({up:'move to the previous entry',down:'move to the next entry',left:'show the previous page',right:'show the next page',confirm:'open the selected entry',back:'return to the previous screen',menu:'open the main menu',power:'turn the screen on or off'})[c.action]||'use this device control'}`;button.setAttribute('aria-label',c.label);
    if(device.id==='red'){button.dataset.kind=c.kind;button.dataset.finish='original-flat';}
    else button.dataset.kind=['#e2e4df','#f6f8ee','#f1f0e7','#e5e5d9'].includes(c.fill)?'white':['#65bb55','#43d053','#199b59'].includes(c.fill)?'green':'dark';
    button.style.cssText=`left:${c.x}px;top:${c.y}px;width:${c.w}px;height:${c.h}px;--cap:${c.fill}`;
    button.innerHTML='<span class="cap"></span>';
    const rocker=c.rocker?host.querySelector(`[data-rocker="${c.rocker}"]`):null;
    let active=null,cancelled=false,suppressClick=false;
    const held=value=>{button.classList.toggle('held',value);rocker?.classList.toggle('held',value);};
    const clear=()=>{held(false);active=null;};
    const contains=e=>{const r=button.getBoundingClientRect(),nx=(e.clientX-r.left)/r.width,ny=(e.clientY-r.top)/r.height;return c.shape==='round'?(nx-.5)**2+(ny-.5)**2<=.25:nx>=0&&nx<=1&&ny>=0&&ny<=1;};
    button.addEventListener('pointerdown',e=>{if(e.button!==0||active!==null||button.disabled)return;e.preventDefault();button.focus({preventScroll:true});active=e.pointerId;cancelled=false;suppressClick=true;button.setPointerCapture(e.pointerId);held(true);});
    button.addEventListener('pointermove',e=>{if(e.pointerId!==active)return;if(!contains(e)){cancelled=true;held(false);}});
    button.addEventListener('pointerup',e=>{if(e.pointerId!==active)return;const accept=!cancelled&&contains(e);clear();if(accept){button.classList.add('ack');setTimeout(()=>button.classList.remove('ack'),160);onControl(c.action,c.id);}setTimeout(()=>{suppressClick=false;},0);});
    button.addEventListener('pointercancel',clear);button.addEventListener('lostpointercapture',clear);button.addEventListener('blur',clear);
    button.addEventListener('click',e=>{if(suppressClick||e.detail>0)return;onControl(c.action,c.id);});
    button.addEventListener('keydown',e=>{if(['Enter',' '].includes(e.key)){if(e.repeat)e.preventDefault();else held(true);}});
    button.addEventListener('keyup',()=>held(false));
    layers.get(c.layer).inner.append(button);buttons.push({button,clear,c});
  }
  for(const s of device.screens){
    const glass=document.createElement('div');glass.className=`glass ${s.role} ${s.h<=210?'compact':''}`;glass.dataset.screen=s.role;glass.style.cssText=`left:${s.x}px;top:${s.y}px;width:${s.w}px;height:${s.h}px`;
    layers.get(s.layer).inner.append(glass);glasses.push(glass);
  }
  let lock=null;
  let closedMark=null;
  if(device.id==='x'){
    closedMark=document.createElement('div');closedMark.className='device-layer';closedMark.dataset.part='kalos-closed-pokeball';closedMark.setAttribute('aria-hidden','true');closedMark.style.zIndex='4';
    closedMark.innerHTML=svg(device,'<g fill="none" stroke="#ddffff"><circle cx="470" cy="380" r="67" stroke-width="2" opacity=".35"/><circle cx="470" cy="380" r="57" stroke-width="4" opacity=".7"/><path d="M413 380H527" stroke-width="5" opacity=".7"/><circle cx="470" cy="380" r="22" fill="#a8f1fa" stroke-width="5"/><circle cx="470" cy="380" r="14" fill="#d2ffff" stroke="none" opacity=".8"/></g>');host.append(closedMark);
  }
  if(!device.layers.some(l=>l.motion)){
    const s=device.screens.find(s=>s.role==='main');lock=document.createElement('div');lock.className='lock-screen';lock.style.cssText=`left:${s.x}px;top:${s.y}px;width:${s.w}px;height:${s.h}px`;lock.innerHTML="SM'S DEX<br><small>SHIVAM MAHAJAN<br>SLIDE TO UNLOCK</small>";layers.get(s.layer).inner.append(lock);
  }
  function pose(progress){
    if(closedMark){closedMark.style.opacity=String(Math.max(0,1-progress*4));closedMark.hidden=progress>=.25;}
    for(const {el,definition:l} of layers.values()){
      if(!l.motion)continue;const m=l.motion;
      const phase=m.range?Math.max(0,Math.min(1,(progress-m.range[0])/(m.range[1]-m.range[0]))):progress;
      const lift=m.clearance?`translateZ(${m.clearance}px) `:'';
      // Upper leaves lie above their hinge. Negative X rotation brings them forward.
      if(m.type==='hinge-x')el.style.transform=`${lift}rotateX(${-180*(1-phase)}deg)`;
      if(m.type==='hinge-y')el.style.transform=`${lift}rotateY(${-180*(1-phase)}deg)`;
      if(m.type==='slide')el.style.transform=`translate(${m.closed[0]*(1-phase)}px,${m.closed[1]*(1-phase)}px)`;
    }
    if(lock)lock.hidden=progress===1;
  }
  function available(open,power){
    for(const {inner} of layers.values())inner.setAttribute('aria-hidden',String(!open));
    for(const {button,clear,c} of buttons){button.disabled=!open||(!power&&c.action!=='power');if(button.disabled)clear();}
    for(const glass of glasses){glass.inert=!open||!power;glass.setAttribute('aria-hidden',String(!open||!power));glass.classList.toggle('off',!power);glass.classList.toggle('screen-inactive',!open);}
  }
  return {pose,available,glasses,buttons,layers,cancel:()=>buttons.forEach(b=>b.clear())};
}
