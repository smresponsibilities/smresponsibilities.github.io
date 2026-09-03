import {controls,initial,reduce,screenData,sections,WIDTH} from './model.js';
import {createScreens} from './screens.js';
import {createFlat} from './flat.js?v=36';
const $=id=>document.getElementById(id),screens=createScreens(),flat=createFlat($('flat-host'),screens),variants=['flat','three','hybrid'];
let state=initial(),variant='flat',three=null,hybrid=null,pending=null,progress=0,moving=false,animation=0,feedbackTimer=0,activeFeedback=null;
const motion=matchMedia('(prefers-reduced-motion: reduce)'),reduced=()=>motion.matches||$('reduce-motion').checked;
const physical=new Map(),accessible=new Map(),allButtons=[];
const escaped=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const activeRenderer=()=>variant==='three'&&three?three:variant==='hybrid'&&hybrid?hybrid:flat;
function updateTargets(){for(const t of activeRenderer().targets()){const b=physical.get(t.id);Object.assign(b.style,{left:t.left+'px',top:t.top+'px',width:t.width+'px',height:t.height+'px',clipPath:t.clip});}}
function draw(){screens.draw(state);three?.update();flat.pose(progress);three?.pose(progress);hybrid?.pose(progress);updateTargets();}
function render(){
  const d=screenData(state);document.body.classList.toggle('reduced',reduced());
  $('lid-toggle').textContent=state.open?'Close device':'Open device';$('lid-toggle').setAttribute('aria-expanded',String(state.open));
  $('power-toggle').textContent=state.power?'Power off':'Power on';$('power-toggle').disabled=!state.open||moving;
  for(const b of allButtons)b.disabled=moving||!state.open||(!state.power&&b.dataset.action!=='power');
  $('state-status').textContent=`${d.heading} / ${moving?'LID IN TRANSIT':state.open?'OPEN':'CLOSED'} / ${state.power?'ON':'OFF'} / ${state.accepted}`;
  $('device-stage').dataset.mode=state.mode;$('device-stage').dataset.accepted=state.accepted;$('device-stage').dataset.cancelled=state.cancelled;$('device-stage').dataset.open=state.open;$('device-stage').dataset.power=state.power;$('device-stage').dataset.moving=moving;
  $('reader-content').innerHTML=d.active?`<h2>${escaped(d.heading)}</h2>${state.mode==='detail'?`<h3>${escaped(d.item.name)}</h3><p>${escaped(state.page?d.item.facts.join(' · '):d.item.copy)}</p>`:`<ul>${d.rows.map((row,i)=>`<li class="${i===d.selection?'selected':''}">${i===d.selection?'→ ':''}${escaped(row)}</li>`).join('')}</ul><p>${escaped(d.item.tag)}</p>`}`:'<p>Screen inactive. Open the device and switch on to resume.</p>';
  $('reader-content').setAttribute('aria-hidden',String(!d.active));$('reader-content').inert=!d.active;
  $('screen-summary').textContent=d.active?`${d.heading}. ${state.mode==='detail'?d.item.name+'. '+(state.page?d.item.facts.join('. '):d.item.copy):d.rows.map((r,i)=>(i===d.selection?'Selected: ':'')+r).join('. ')}`:'';
  $('screen-summary').setAttribute('aria-hidden',String(!d.active));draw();
}
function clearFeedback(){clearTimeout(feedbackTimer);for(const b of physical.values()){b.replaceChildren();delete b.dataset.static;}if(activeFeedback)activeRenderer().feedback(activeFeedback,false);activeFeedback=null;}
function held(c,on){if(!reduced())activeRenderer().press(c.id,on);physical.get(c.id).dataset.held=String(on);}
function cancel(){if(!pending)return;held(pending.control,false);pending=null;state=reduce(state,'cancel');clearFeedback();render();$('hint').textContent=state.last;}
function measureHold(c,input){
  const before=[...physical.values()].map(b=>b.getBoundingClientRect()),capBefore=activeRenderer().measure(c.id);held(c,true);const after=[...physical.values()].map(b=>b.getBoundingClientRect()),capAfter=activeRenderer().measure(c.id);
  const drift=Math.max(...before.flatMap((r,i)=>['x','y','width','height'].map(k=>Math.abs(r[k]-after[i][k]))));
  const webgl=variant!=='flat',travel=webgl?capBefore.z-capAfter.z:capAfter.y-capBefore.y;
  $('press-metrics').textContent=`${input} · ${c.label}\nTarget / neighbour drift: ${drift.toFixed(3)}px\nCap travel: ${travel.toFixed(3)} ${webgl?'model units into casing':'CSS px downward'}\nAccepted: ${state.accepted}; cancelled: ${state.cancelled}`;
  $('press-metrics').dataset.drift=drift;$('press-metrics').dataset.input=input;$('press-metrics').dataset.travel=travel;
}
function acknowledge(c,x,y){
  const b=physical.get(c.id);activeFeedback=c.id;
  if(reduced()){b.dataset.static='true';activeRenderer().feedback(c.id,true);}
  else {const rect=b.getBoundingClientRect(),r=document.createElement('i'),size=Math.hypot(rect.width,rect.height)*2;r.className='ripple';r.style.width=r.style.height=size+'px';r.style.left=(x==null||x<rect.left||x>rect.right?rect.width/2:x-rect.left)+'px';r.style.top=(y==null||y<rect.top||y>rect.bottom?rect.height/2:y-rect.top)+'px';b.append(r);}
  feedbackTimer=setTimeout(clearFeedback,reduced()?220:370);
}
function action(c,input,x,y){const next=reduce(state,c.action);if(next===state)return;state=next;render();acknowledge(c,x,y);$('hint').textContent=`${c.label} · ${input}`;}
function inside(button,x,y){return document.elementFromPoint(x,y)?.closest('button')===button;}
function install(button,c){
  button.dataset.action=c.action;button.dataset.control=c.id;button.title=c.label+'. Press and release; dragging off cancels.';button.setAttribute('aria-label',c.label);
  button.addEventListener('pointerenter',()=>{$('hint').textContent=button.title;});button.addEventListener('focus',()=>{$('hint').textContent=button.title;});
  button.addEventListener('pointerdown',e=>{if(e.button!==0||!e.isPrimary||pending||button.disabled)return;e.preventDefault();clearFeedback();button.focus({preventScroll:true});pending={button,control:c,pointer:e.pointerId,cancelled:false,input:e.isTrusted?'Browser '+e.pointerType:'Synthetic '+e.pointerType};if(e.isTrusted)button.setPointerCapture(e.pointerId);measureHold(c,pending.input);});
  button.addEventListener('pointermove',e=>{if(pending?.button!==button||pending.pointer!==e.pointerId)return;if(!inside(button,e.clientX,e.clientY)){pending.cancelled=true;held(c,false);}});
  button.addEventListener('pointerup',e=>{if(pending?.button!==button||pending.pointer!==e.pointerId)return;e.preventDefault();if(pending.cancelled||!inside(button,e.clientX,e.clientY)){cancel();return;}const input=pending.input;held(c,false);pending=null;action(c,input,e.clientX,e.clientY);});
  for(const name of ['pointercancel','lostpointercapture'])button.addEventListener(name,e=>{if(pending?.button===button&&pending.pointer===e.pointerId)cancel();});
  button.addEventListener('keydown',e=>{if(![' ','Enter'].includes(e.key))return;e.preventDefault();e.stopPropagation();if(e.repeat||pending||button.disabled)return;clearFeedback();pending={button,control:c,key:e.key,input:e.isTrusted?'Browser keyboard':'Synthetic keyboard'};measureHold(c,pending.input);});
  button.addEventListener('keyup',e=>{if(pending?.button!==button||pending.key!==e.key)return;e.preventDefault();e.stopPropagation();const input=pending.input;held(c,false);pending=null;action(c,input);});
  button.addEventListener('blur',()=>{if(pending?.button===button)cancel();});
  button.addEventListener('click',e=>{e.preventDefault();if(e.detail===0&&!pending&&!button.disabled)action(c,e.isTrusted?'Assistive activation':'Synthetic activation');});
  allButtons.push(button);
}
const summary=document.createElement('div');summary.id='screen-summary';summary.className='sr-only';summary.setAttribute('aria-live','polite');$('device-stage').after(summary);
for(const c of controls){const b=document.createElement('button');b.type='button';b.className='physical';b.id='control-'+c.id;physical.set(c.id,b);$('targets').append(b);install(b,c);const a=document.createElement('button');a.type='button';a.textContent=c.label;a.id='accessible-'+c.id;accessible.set(c.id,a);$('accessible-controls').append(a);install(a,c);}
function toggleLid(){
  cancel();clearFeedback();state=reduce(state,'lid');cancelAnimationFrame(animation);const from=progress,to=state.open?0:1;
  $('hint').textContent=state.last;
  if(reduced()){progress=to;moving=false;render();return;}
  moving=true;render();const start=performance.now();
  function step(now){const t=Math.min(1,(now-start)/650),smooth=t*t*(3-2*t);progress=from+(to-from)*smooth;draw();if(t<1)animation=requestAnimationFrame(step);else{moving=false;render();}}
  animation=requestAnimationFrame(step);
}
$('lid-toggle').addEventListener('click',toggleLid);$('power-toggle').addEventListener('click',()=>action(controls.find(c=>c.id==='power'),'Toolbar'));
$('half-open').addEventListener('click',()=>{cancel();clearFeedback();cancelAnimationFrame(animation);progress=.5;moving=true;state={...state,open:false};render();$('hint').textContent='Half-open inspection. Controls disabled; Open device resumes.';});
function readable(show){$('reader').hidden=!show;$('read-toggle').setAttribute('aria-expanded',String(show));$('read-toggle').textContent=show?'Hide readable view':'Readable view';}
$('read-toggle').addEventListener('click',()=>readable($('reader').hidden));if(matchMedia('(max-width:640px)').matches)readable(true);
function changeMotion(){cancel();clearFeedback();if(reduced()){for(const c of controls)activeRenderer().press(c.id,false);cancelAnimationFrame(animation);progress=state.open?0:1;moving=false;}render();}
$('reduce-motion').addEventListener('change',changeMotion);motion.addEventListener('change',changeMotion);
window.addEventListener('blur',cancel);document.addEventListener('visibilitychange',()=>{if(document.hidden)cancel();});
let switchSerial=0;
async function setVariant(next){
  cancel();clearFeedback();const serial=++switchSerial;
  if(!variants.includes(next))next='flat';
  if(next==='three'&&!three){$('hint').textContent='Loading the 3D device…';try{const {createThree}=await import('./three-view.js?v=36c');three=createThree($('three-host'),screens,updateTargets);}catch(error){$('hint').textContent='3D unavailable: '+error.message;return;}}
  if(next==='hybrid'&&!hybrid){$('hint').textContent='Loading the hybrid controls…';try{const {createThree}=await import('./three-view.js?v=36c');const overlay=createThree($('hybrid-host'),screens,updateTargets,{buttonsOnly:true});hybrid={...overlay,targets:()=>flat.targets()};}catch(error){$('hint').textContent='Hybrid unavailable: '+error.message;return;}}
  if(serial!==switchSerial)return;variant=next;const url=new URL(location.href);url.searchParams.set('variant',variant);history.replaceState(null,'',url);
  $('flat-host').hidden=variant==='three';$('three-host').hidden=variant!=='three';$('hybrid-host').hidden=variant!=='hybrid';$('view-tools').hidden=variant!=='three';flat.setCapsVisible(variant!=='hybrid');
  document.querySelectorAll('[data-variant]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.variant===variant)));$('device-stage').dataset.variant=variant;
  flat.resize();three?.resize();hybrid?.resize();render();$('hint').textContent=variant==='flat'?'Flat SVG / DOM. Same portfolio controls.':variant==='three'?'Three.js. Use view buttons to inspect stronger depth.':'Flat casing with genuine Three.js controls.';
}
document.querySelectorAll('[data-variant]').forEach(b=>b.addEventListener('click',()=>setVariant(b.dataset.variant)));
const cycle=direction=>setVariant(variants[(variants.indexOf(variant)+direction+variants.length)%variants.length]);$('previous-variant').addEventListener('click',()=>cycle(-1));$('next-variant').addEventListener('click',()=>cycle(1));
for(const [id,preset] of [['front-view','front'],['angle-view','angle'],['hinge-view','hinge']])$(id).addEventListener('click',()=>{cancel();three?.view(preset);updateTargets();});
document.querySelector('.switcher').addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();e.stopPropagation();cycle(e.key==='ArrowLeft'?-1:1);}});
window.addEventListener('keydown',e=>{if(e.defaultPrevented||e.repeat||pending||e.target.closest('input,select,textarea,[contenteditable]')||(e.target.closest('button')&&!e.target.closest('.physical')))return;const map={ArrowUp:'up',ArrowDown:'down',ArrowLeft:'left',ArrowRight:'right',Enter:'entry',Escape:'back',a:'entry',b:'back'};const c=controls.find(c=>c.id===map[e.key]);if(c){e.preventDefault();clearFeedback();action(c,'Keyboard shortcut');}});
window.addEventListener('popstate',()=>setVariant(new URL(location.href).searchParams.get('variant')));
new ResizeObserver(()=>{flat.resize();three?.resize();hybrid?.resize();updateTargets();}).observe($('device-stage'));
$('run-checks').addEventListener('click',()=>{
  cancel();clearFeedback();cancelAnimationFrame(animation);moving=false;progress=0;state=initial();render();const checks=[],check=(name,pass)=>checks.push({name,pass});
  const emit=(b,type,kind='mouse',point,repeat=false)=>{const r=b.getBoundingClientRect(),p=point||[r.x+r.width/2,r.y+r.height/2];b.dispatchEvent(new PointerEvent(type,{bubbles:true,cancelable:true,isPrimary:true,pointerId:19,pointerType:kind,button:0,buttons:type==='pointerup'?0:1,clientX:p[0],clientY:p[1]}));};
  for(const c of controls){if(!state.power){state={...state,power:true};render();}const b=physical.get(c.id);b.scrollIntoView({block:'center',behavior:'instant'});const before=state.accepted;emit(b,'pointerdown');emit(b,'pointerup');check(c.id+' accepts once',state.accepted===before+1);check(c.id+' targets stay fixed',Number($('press-metrics').dataset.drift)<.01);}
  state=initial();render();const b=physical.get('key-2');b.scrollIntoView({block:'center',behavior:'instant'});const r=b.getBoundingClientRect();emit(b,'pointerdown');emit(b,'pointermove','mouse',[r.right+5,r.top+r.height/2]);emit(b,'pointerup','mouse',[r.right+5,r.top+r.height/2]);check('Off-target release cancels',state.accepted===0&&state.cancelled===1&&!document.querySelector('.ripple'));
  emit(b,'pointerdown','touch');emit(b,'pointercancel','touch');check('Touch cancellation clears hold',pending===null&&state.accepted===0);
  emit(b,'pointerdown','touch');emit(b,'pointerup','touch');check('Synthetic touch accepts once',state.accepted===1);
  for(const key of [' ','Enter']){const before=state.accepted;b.dispatchEvent(new KeyboardEvent('keydown',{key,bubbles:true,cancelable:true}));b.dispatchEvent(new KeyboardEvent('keydown',{key,repeat:true,bubbles:true,cancelable:true}));b.dispatchEvent(new KeyboardEvent('keyup',{key,bubbles:true,cancelable:true}));check(key+' ignores repeat',state.accepted===before+1);}
  check('Ripple remains pointer-inert',getComputedStyle(b).overflow==='hidden'&&(!b.querySelector('.ripple')||getComputedStyle(b.querySelector('.ripple')).pointerEvents==='none'));
  const previousReduced=$('reduce-motion').checked;$('reduce-motion').checked=true;render();clearFeedback();emit(b,'pointerdown');emit(b,'pointerup');check('Reduced motion has zero travel and static feedback',Number($('press-metrics').dataset.travel)===0&&b.dataset.static==='true'&&!document.querySelector('.ripple'));$('reduce-motion').checked=previousReduced;render();
  state={...state,power:false};render();check('Power-off disables controls',allButtons.filter(b=>b.dataset.action!=='power').every(b=>b.disabled));
  state={...state,open:false};progress=1;render();check('Closed removes screen accessibility',$('reader-content').inert&&$('screen-summary').getAttribute('aria-hidden')==='true'&&allButtons.every(b=>b.disabled));
  state={...state,open:true,power:true};progress=0;render();check('Reopen resumes selection',state.section===1&&state.mode==='list');
  $('check-results').replaceChildren(...checks.map(c=>{const li=document.createElement('li');li.textContent=(c.pass?'PASS · ':'FAIL · ')+c.name;li.dataset.pass=c.pass;return li;}));$('check-results').dataset.passed=checks.filter(c=>c.pass).length;$('check-results').dataset.total=checks.length;$('check-results').scrollIntoView({block:'start',behavior:'instant'});
});
await document.fonts.load('12px Departure');render();await setVariant(new URL(location.href).searchParams.get('variant'));
window.addEventListener('pagehide',()=>{cancelAnimationFrame(animation);clearTimeout(feedbackTimer);three?.dispose();hybrid?.dispose();},{once:true});
