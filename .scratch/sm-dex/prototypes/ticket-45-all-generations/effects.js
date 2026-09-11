import {svg} from './renderer.js?v=47.1';

// Device-specific presentation. Portfolio state and hardware actions stay in app.js.
export function createEffects(device,host,controls,onChange){
  controls.replaceChildren();
  host.dataset.device=device.id;
  const stage=host.parentElement;
  let open=false,power=true,reduced=false,paused=false,back=false,turning=false;
  let timer=0,turnTimer=0,primary=null,pause=null,turn=null,front=null,rear=null,reactionButton=null;
  const rotom=device.id==='sun-moon',noun=rotom?'Rotom':'phone';
  let lastProgress=null,rearLock=false;
  const cleanups=[];
  const message=document.createElement('span');message.className='effect-status';
  message.id='effect-status';message.setAttribute('role','status');
  const listen=(el,event,fn)=>{el.addEventListener(event,fn);cleanups.push(()=>el.removeEventListener(event,fn));};
  function button(id,label,fn){const b=document.createElement('button');b.id=id;b.textContent=label;b.type='button';listen(b,'click',fn);controls.append(b);return b;}
  function stopReaction(){
    clearTimeout(timer);host.classList.remove('reacting');delete host.dataset.emotion;
    host.querySelector('.glass')?.classList.remove('scanning');
  }
  function react(){
    if(!open||!power||back||turning)return;
    stopReaction();
    void host.offsetWidth;
    if(device.id==='x'){
      const glass=host.querySelector('.glass');
      glass.classList.toggle('scanning',!reduced);
      message.textContent=reduced?'Scan complete. Portfolio ready.':'Scanning portfolio…';
      timer=setTimeout(()=>{glass.classList.remove('scanning');message.textContent='Scan complete. Portfolio ready.';},reduced?0:850);
    }else if(device.id==='sun-moon'){
      host.classList.add('reacting');host.dataset.emotion='happy';
      message.textContent='Rotom waves hello!';
      timer=setTimeout(()=>{host.classList.remove('reacting');delete host.dataset.emotion;message.textContent='Rotom is ready.';},900);
    }
  }
  function flip(){
    if(!turn||turning||!open)return;
    back=!back;turning=!reduced;
    turn.classList.remove('slide-turn');turn.style.removeProperty('transform');
    turn.classList.toggle('back-facing',back);
    front.setAttribute('aria-hidden',String(back||turning));
    rear.setAttribute('aria-hidden',String(!back||turning));rear.inert=!back||turning;
    primary.textContent=back?'Show screen ↻':`Flip ${noun} ↻`;primary.setAttribute('aria-pressed',String(back));
    message.textContent=back?(rotom?'Rear view. Camera, arm recesses and round cover.':'Rear view. Camera and Rotom face.'):'Screen view.';
    primary.disabled=turning;onChange();
    clearTimeout(turnTimer);
    turnTimer=setTimeout(()=>{
      turning=false;primary.disabled=false;
      front.setAttribute('aria-hidden',String(back));rear.setAttribute('aria-hidden',String(!back));rear.inert=!back;
      onChange();
    },reduced?0:520);
  }
  if(device.rear){
    turn=document.createElement('div');turn.className='phone-turn';
    front=document.createElement('div');front.className='phone-front';
    while(host.firstChild)front.append(host.firstChild);
    rear=document.createElement('div');rear.className='phone-back';rear.inert=true;rear.setAttribute('aria-hidden','true');
    rear.innerHTML=svg(device,device.rear);
    rear.firstElementChild.classList.add('device-art');rear.firstElementChild.setAttribute('aria-hidden','true');
    const hit=document.createElement('button');hit.type='button';hit.className='phone-back-hit';hit.setAttribute('aria-label',`Show ${noun} screen`);
    listen(hit,'click',flip);rear.append(hit);turn.append(front,rear);host.append(turn);
    primary=button('device-effect',`Flip ${noun} ↻`,flip);primary.setAttribute('aria-pressed','false');
    message.textContent='Flip to inspect the rear.';
  }else if(device.id==='x'){
    primary=button('device-effect','Scan again',react);
    // app.js replaces screen content during navigation. CSS supplies the scan overlay.
    message.textContent='Open the card to scan.';
  }
  if(rotom){
    reactionButton=button('rotom-react','Say hello to Rotom',react);
    pause=button('pause-motion','Pause motion',()=>{paused=!paused;sync();});
    message.textContent='Unlock to wake Rotom.';
    listen(stage,'pointermove',e=>{
      if(!open||!power||reduced||paused||back||turning)return;
      const r=stage.getBoundingClientRect(),x=Math.max(-1,Math.min(1,(e.clientX-r.left)/r.width*2-1)),y=Math.max(-1,Math.min(1,(e.clientY-r.top)/r.height*2-1));
      host.style.setProperty('--look-x',`${x*7}px`);host.style.setProperty('--look-y',`${y*5}px`);
      host.style.setProperty('--arm-look',`${x*4}deg`);
    });
    listen(stage,'pointerleave',()=>{host.style.setProperty('--look-x','0px');host.style.setProperty('--look-y','0px');host.style.setProperty('--arm-look','0deg');});
  }
  if(primary)controls.append(message);
  controls.hidden=!primary;
  function sync(){
    host.classList.toggle('effects-reduced',reduced);
    host.classList.toggle('rotom-awake',rotom&&open&&power&&!paused&&!reduced&&!back&&!turning);
    if(reactionButton)reactionButton.disabled=!open||!power||back||turning;
    if(primary&&!device.rear)primary.disabled=!open||!power;
    if(primary&&device.rear){primary.hidden=!open;primary.disabled=turning;}
    if(pause){pause.disabled=!open||!power||reduced||back||turning;pause.textContent=paused?'Resume motion':'Pause motion';pause.setAttribute('aria-pressed',String(paused||reduced));}
  }
  return {
    pose(value){
      if(!turn||value===lastProgress)return;
      if(lastProgress===1&&value<1)rearLock=back;
      if(lastProgress===0&&value>0)rearLock=false;
      clearTimeout(turnTimer);
      turning=value>0&&value<1;
      const angle=rearLock?180:180*(1-value);
      if(rotom){
        const reveal=Math.max(0,Math.min(1,(value-.48)/.32));
        const rearReveal=Math.max(0,Math.min(1,value/.52));
        host.style.setProperty('--rotom-left-arm-shift',`${(1-reveal)*150}px`);
        host.style.setProperty('--rotom-right-arm-shift',`${(reveal-1)*150}px`);
        host.style.setProperty('--rotom-arm-scale',String(.18+reveal*.82));
        host.style.setProperty('--rotom-rear-left-exit',`${-160*rearReveal}px`);
        host.style.setProperty('--rotom-rear-right-exit',`${160*rearReveal}px`);
        host.style.setProperty('--rotom-rear-left-turn',`${-10*rearReveal}deg`);
        host.style.setProperty('--rotom-rear-right-turn',`${10*rearReveal}deg`);
      }
      back=angle>=90;lastProgress=value;
      turn.classList.add('slide-turn');turn.classList.toggle('back-facing',back);
      turn.style.transform=`rotateY(${angle}deg)`;
      front.setAttribute('aria-hidden',String(value!==1||back));
      rear.setAttribute('aria-hidden',String(!(value===0||(value===1&&back))));rear.inert=turning||value!==1||!back;
      primary.setAttribute('aria-pressed',String(back));primary.textContent=back?'Show screen ↻':`Flip ${noun} ↻`;
      message.textContent=value===0?'Slide right to turn over and unlock.':value===1?'Flip to inspect the rear.':`Turning ${noun} over…`;
    },
    setState(next){
      const waking=!open&&next.open;
      ({open,power,reduced}=next);sync();
      if(!open||!power||reduced)stopReaction();
      if(!open&&!device.rear)message.textContent=device.id==='x'?'Open the card to scan.':'Unlock to wake Rotom.';
      if(waking&&power&&(device.id==='x'||device.id==='sun-moon'))react();
    },
    react,
    facingFront:()=>!back&&!turning,
    isBack:()=>back,
    dispose(){clearTimeout(timer);clearTimeout(turnTimer);cleanups.forEach(fn=>fn());host.classList.remove('reacting','rotom-awake','effects-reduced');delete host.dataset.emotion;host.style.removeProperty('--look-x');host.style.removeProperty('--look-y');host.style.removeProperty('--arm-look');host.style.removeProperty('--rotom-left-arm-shift');host.style.removeProperty('--rotom-right-arm-shift');host.style.removeProperty('--rotom-arm-scale');host.style.removeProperty('--rotom-rear-left-exit');host.style.removeProperty('--rotom-rear-right-exit');host.style.removeProperty('--rotom-rear-left-turn');host.style.removeProperty('--rotom-rear-right-turn');}
  };
}
