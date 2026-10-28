const species = {
  rose: { label: 'Rose', color: '#e52d28', note: 'vermilion petals', name: 'Productivity Caller' },
  cosmos: { label: 'Cosmos', color: '#bd4b76', note: 'pink petals', name: "SM’S DEX" },
  poppy: { label: 'Poppy', color: '#e86a30', note: 'orange petals', name: 'Chaincode' },
  iris: { label: 'Iris', color: '#7560b0', note: 'violet petals', name: 'Postie' },
};
const input = document.querySelector('#name');
const select = document.querySelector('#flower');
const hero = document.querySelector('#hero');
const pause = document.querySelector('#pause');
const palette = document.querySelector('#palette');
let paused = false;
let visible = true;
function petals(type, color) {
  if (type === 'rose') return '<path class="rose-shell" fill="'+color+'" d="M-33 7C-45-9-30-28-17-25C-11-40 12-34 17-25C37-29 44-8 33 4C40 24 17 36 4 29C-14 41-36 27-33 7Z"/><g class="rose-inner"><path class="petal-line" d="M-24 3C-31-11-11-22-2-15C15-24 31-8 23 8C12 25-13 21-18 9C-28-1-8-13 3-7C17-9 22 7 9 11C-5 17-15 3-6-1C1-8 14 0 6 5M-31 13C-13 32 9 29 26 16M-23-18C-12-25 7-24 16-17"/></g>';
  if (type === 'iris') return '<g fill="'+color+'" stroke="#efeee8" stroke-width="1">'+['M0 5C-29-11-28-39-13-41C-2-43 6-18 0 5Z','M0 5C-2-23 17-46 28-32C38-17 19 0 0 5Z','M0 4C23-12 44 1 33 22C22 41 9 17 0 4Z','M0 4C-23-14-43 1-32 23C-20 39-8 18 0 4Z','M0 0C-16 12-15 35 0 40C16 32 14 13 0 0Z'].map((d,i)=>'<g class="petal-unfurl" style="--petal-delay:'+i*.08+'s"><path d="'+d+'"/></g>').join('')+'</g><path d="M-4 9 0 27 4 9" stroke="#e6b84f" stroke-width="4" fill="none"/>';
  const count = type === 'cosmos' ? 8 : 5;
  return Array.from({length:count},(_,i)=>'<g transform="rotate('+i*360/count+')"><g class="petal-unfurl" style="--petal-delay:'+i*.08+'s"><path fill="'+color+'" stroke="#efeee8" stroke-width=".7" d="'+(type === 'cosmos' ? 'M-5 4C-21-6-21-29-13-34L-7-31 0-36 7-31 13-34C24-24 17-5 5 4Z' : 'M-3 5C-34 8-40-16-28-30C-21-40-7-29 0-33C20-40 32-17 16-3L4 7Z')+'"/></g></g>').join('')+'<circle r="'+(type === 'cosmos' ? 7 : 10)+'" fill="'+(type === 'cosmos' ? '#dca839' : '#25234a')+'"/>';
}
function artwork(type, front) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 500 430');
  svg.setAttribute('aria-hidden', 'true');
  svg.classList.add('botanical', front ? 'front' : 'back');
  const plants = front ? [[330,338,.65,155],[403,112,.62,18]] : [[132,100,.78,-24],[207,116,1,12]];
  svg.innerHTML = plants.map(([x,y,s,r],i)=>'<g transform="translate('+x+' '+y+') rotate('+r+') scale('+s+')"><g class="sprig"><path class="stem" pathLength="1" d="M-37 213C-20 154 30 109 0 0M-20 165C-82 129-113 155-146 115C-165 91-146 79-138 93M-9 119C35 106 65 79 58 46C52 25 32 41 44 48M0 71C-27 51-42 42-57 45"/><g class="leaf"><path d="M-21 163Q-78 168-68 204Q-34 189-21 163M-2 127Q39 113 44 86Q7 93-2 127M-8 85Q-50 94-55 68Q-26 63-8 85M-103 147Q-137 161-143 186Q-109 177-103 147M-2 38Q21 21 17-7Q-6 9-2 38"/><path d="M-22 164-64 198M0 126 39 92M-10 83-49 72" stroke="#efeee8" fill="none"/></g><g class="bloom" style="--delay:'+(i*.2+(front?.55:.12))+'s">'+petals(type,species[type].color)+'</g></g></g>').join('');
  if (front) {
    const butterfly = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    butterfly.classList.add('butterfly-flight');
    butterfly.innerHTML = '<g class="butterfly"><g class="wing wing-left"><path d="M0 0C-7-22-24-26-21-9C-20-2-12 2-9 4C-24 2-20 19-9 14C-3 12-1 6 0 0Z"/><path class="wing-mark" d="M-5-4Q-17-21-17-10M-5 5Q-17 14-13 7"/></g><g class="wing wing-right"><path d="M0 0C7-22 24-26 21-9C20-2 12 2 9 4C24 2 20 19 9 14C3 12 1 6 0 0Z"/><path class="wing-mark" d="M5-4Q17-21 17-10M5 5Q17 14 13 7"/></g><path class="butterfly-body" d="M0-9 0 12M-1-8Q-9-18-6-20M1-8Q9-18 6-20"/></g>';
    svg.append(butterfly);
  }
  return svg;
}
function decorate(target,type) {
  target.querySelectorAll('svg').forEach(node=>node.remove());
  target.prepend(artwork(type,false));
  target.append(artwork(type,true));
  const title = target.querySelector('.name');
  title.classList.remove('lettering-enter');
  void title.offsetWidth;
  title.classList.add('lettering-enter');
}
function update() {
  hero.querySelector('.name').textContent = input.value.trim() || 'Your project';
  decorate(hero,select.value);
  const item = species[select.value];
  document.querySelector('.context small').textContent = item.label+' · ink-blue stems · '+item.note;
  document.querySelectorAll('.variant').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.flower===select.value)));
}
for (const [type,item] of Object.entries(species)) {
  const button = document.createElement('button');
  button.type='button';
  button.className='variant';
  button.dataset.flower=type;
  button.setAttribute('aria-label','Preview '+item.label.toLowerCase()+' flowers');
  button.innerHTML='<div class="art"><h3 class="name"></h3></div><span>'+item.label+'</span><small>'+item.note+'</small>';
  button.querySelector('.name').textContent=item.name;
  decorate(button.querySelector('.art'),type);
  button.addEventListener('click',()=>{select.value=type;update();});
  document.querySelector('.variants').append(button);
}
input.addEventListener('input',()=>{hero.querySelector('.name').textContent=input.value.trim()||'Your project';});
select.addEventListener('change',update);
palette.addEventListener('change', () => {
  document.querySelectorAll('.art').forEach(art => { art.dataset.palette = palette.value; });
});
document.querySelector('#replay').addEventListener('click',()=>{paused=false;syncPause();update();});
function syncPause() {
  hero.classList.toggle('paused',paused||document.hidden||!visible);
  pause.setAttribute('aria-pressed',String(paused));
  pause.textContent=paused?'Resume motion':'Pause motion';
}
pause.addEventListener('click',()=>{paused=!paused;syncPause();});
document.addEventListener('visibilitychange',syncPause);
new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;syncPause();}).observe(hero);
update();
