import {controls,bodyOutline,lidOutline,bezelOutline,mainScreen,sideScreen,dpadOutline,outerLatchOutline,outerLatchWellOutline,outerLatchRailX,polygon,WIDTH,HEIGHT,HINGE} from './model.js';
const svg=body=>`<svg viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg" fill="none" aria-hidden="true">${body}</svg>`;
const poly=(points,fill,stroke='#530b1c',width=3)=>`<polygon points="${polygon(points)}" fill="${fill}" stroke="${stroke}" stroke-width="${width}" stroke-linejoin="round"/>`;
const rect=(x,y,w,h,fill,r=4,stroke='#550c1c')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
const circle=(x,y,r,fill,stroke='#550c1c')=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
export function createFlat(host,screens){
  host.innerHTML='<div class="flat-device"><div class="flat-body"></div><div class="flat-leaf"><div class="leaf-face leaf-inner"></div><div class="leaf-face leaf-back"></div></div><div class="flat-hinge"></div></div>';
  const device=host.firstElementChild,body=host.querySelector('.flat-body'),inner=host.querySelector('.leaf-inner'),back=host.querySelector('.leaf-back'),leaf=host.querySelector('.flat-leaf');
  const wells=part=>controls.filter(c=>c.part===part&&c.kind!=='direction').map(c=>rect(c.x-2,c.y-2,c.w+4,c.h+2,'#71263a',c.kind.includes('round')?c.w/2:5,'#641b2f')).join('');
  body.innerHTML=svg(`<defs><linearGradient id="shell" x2="1" y2="1"><stop stop-color="#df3c53"/><stop offset=".47" stop-color="#ce2d45"/><stop offset="1" stop-color="#bd2540"/></linearGradient><radialGradient id="lens" cx=".32" cy=".28"><stop stop-color="#8cefff"/><stop offset=".5" stop-color="#30a8ce"/><stop offset="1" stop-color="#176c98"/></radialGradient></defs>${poly(bodyOutline,'url(#shell)')}
  <path d="M59 178H244L337 124H458M59 184H246L339 131H458" stroke="#740e28" stroke-width="5"/><path d="M61 63V161M65 199V636Q65 648 80 648H447" stroke="#f7737e" stroke-width="3" opacity=".65"/>
  ${circle(107,101,43,'#c7d0c9')}${circle(107,101,35,'url(#lens)','#194b63')}${circle(95,88,11,'#bfeffa','#bfeffa')}
  ${circle(174,74,11,'#b21935')}${circle(208,74,11,'#eac347')}${circle(242,74,11,'#45945b')}
  ${poly(bezelOutline,'#d6dacf','#62675d',3)}<path d="M94 214H402V484" stroke="#f8f9e8" stroke-width="4"/>
  ${rect(107,230,286,231,'#333b3b',7,'#4c5149')}${circle(235,219,3,'#a62937')}${circle(252,219,3,'#a62937')}
  <path d="M325 469H385M325 476H385M325 483H385" stroke="#717b78" stroke-width="3"/>
  ${wells('body')}${rect(158,566,141,60,'#627d43',4)}<text x="174" y="590" fill="#183720" font-family="Departure,monospace" font-size="11">ENTRY 001</text><text x="174" y="610" fill="#183720" font-family="Departure,monospace" font-size="10">SHIVAM</text>
  ${poly(dpadOutline,'#0e151b','#10151b',7)}<circle cx="361" cy="586" r="6" fill="#161d22"/>
  <text x="90" y="591" fill="#73152b" font-family="Departure,monospace" font-size="9">B / BACK</text><path d="M332 647H345M352 647H365M372 647H385" stroke="#591027" stroke-width="3"/>`);
  inner.innerHTML=svg(`${poly(lidOutline,'#c62943')}<path d="M483 126H585L683 185H868V637Q868 650 855 650H483Z" stroke="#711029" stroke-width="3"/><path d="M488 130H583L681 188H866" stroke="#f06775" stroke-width="3"/>
    ${rect(512,228,327,126,'#17252a',6,'#690d27')}${wells('lid')}
    ${rect(519,592,145,45,'#172a2b',4)}${rect(681,592,151,45,'#172a2b',4)}<text x="533" y="621" fill="#8da897" font-family="Departure,monospace" font-size="12">KANTO</text><text x="695" y="621" fill="#8da897" font-family="Departure,monospace" font-size="12">SM / 001</text>
    <path d="M678 540H685M693 540H700M708 540H715M723 540H730M678 549H685M693 549H700M708 549H715M723 549H730" stroke="#6a1930" stroke-width="3"/>`);
  // Mirror the same leaf silhouette. Its exterior is not a separately stretched illustration.
  const mirrored=lidOutline.map(([x,y])=>[2*HINGE-x,y]);
  back.innerHTML=svg(`${poly(mirrored,'#c62b44')}<path d="M65 192H236L334 134H449V645H82Q65 645 65 628Z" stroke="#740c27" stroke-width="3"/><path d="M${outerLatchRailX} 202V625" stroke="#f36879" stroke-width="3"/><polygon data-latch-well="exterior" points="${polygon(outerLatchWellOutline)}" fill="#5b1020"/><polygon data-latch="exterior" points="${polygon(outerLatchOutline)}" fill="#e7c631"/><path d="M103 588H219M103 601H219M103 614H219" stroke="#6a132c" stroke-width="7" stroke-linecap="round"/>`);
  host.querySelector('.flat-hinge').innerHTML=svg(`<defs><linearGradient id="hinge"><stop stop-color="#6c0d27"/><stop offset=".35" stop-color="#e84a60"/><stop offset=".65" stop-color="#ce2c48"/><stop offset="1" stop-color="#690c25"/></linearGradient></defs>${rect(451,115,29,548,'url(#hinge)',9,'#6c1027')}<path d="M452 143H478M452 152H478M452 619H478M452 628H478" stroke="#740e29" stroke-width="3"/>`);
  const faces=new Map();for(const c of controls){if(c.kind==='direction')continue;const cap=document.createElement('div');cap.className='cap-art '+c.kind;cap.style.cssText=`left:${c.x}px;top:${c.y}px;width:${c.w}px;height:${c.h-4}px`; (c.part==='body'?body:inner).append(cap);faces.set(c.id,cap);}
  const rocker=document.createElement('div');rocker.className='dpad-art';body.append(rocker);
  const main=screens.main,side=screens.side;
  for(const [canvas,area,parent] of [[main,mainScreen,body],[side,sideScreen,inner]]){canvas.className='screen-canvas';canvas.style.cssText=`left:${area.x}px;top:${area.y}px;width:${area.w}px;height:${area.h}px`;canvas.setAttribute('aria-hidden','true');parent.append(canvas);}
  for(const {canvas,area,part} of screens.auxiliary){canvas.className='screen-canvas';canvas.style.cssText=`left:${area.x}px;top:${area.y}px;width:${area.w}px;height:${area.h}px`;canvas.setAttribute('aria-hidden','true');(part==='body'?body:inner).append(canvas);}
  let scale=1,currentPose=0;
  function resize(){scale=host.clientWidth/WIDTH;device.style.transform=`scale(${scale})`;}
  function pose(progress){currentPose=progress;leaf.style.transform=`rotateY(${-180*progress}deg)`;leaf.style.zIndex=progress>0?'3':'1';host.dataset.latch=progress>=.99?'visible':'hidden';}
  function press(id,held){const c=controls.find(c=>c.id===id);if(c?.kind==='direction'){rocker.style.transform=held?'translateY(4px)':'none';return;}faces.get(id)?.classList.toggle('is-held',held);}
  function feedback(id,on){faces.get(id)?.classList.toggle('ack',on);}
  function setCapsVisible(visible){for(const face of faces.values())face.hidden=!visible;rocker.hidden=!visible;}
  function targets(){return controls.map(c=>({...c,left:c.x*scale,top:c.y*scale,width:c.w*scale,height:c.h*scale,clip:c.kind.includes('round')?'circle(50%)':'inset(0 round '+(c.kind==='direction'?0:4*scale)+'px)'}));}
  function measure(id){const c=controls.find(c=>c.id===id),r=(c?.kind==='direction'?rocker:faces.get(id)).getBoundingClientRect();return {x:r.x,y:r.y,z:0};}
  function latchState(){return currentPose>=.99&&back.querySelector('[data-latch="exterior"]')!==null;}
  function latchMountState(){return Math.min(...outerLatchWellOutline.map(([x])=>x))<=outerLatchRailX;}
  return {resize,pose,press,feedback,setCapsVisible,targets,measure,latchState,latchMountState,dispose:()=>host.replaceChildren()};
}
