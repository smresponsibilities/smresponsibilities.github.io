import { writeFileSync } from 'node:fs';
import assert from 'node:assert/strict';

// Original botanical studies: shared engraving palette, species-specific petal architecture.
const flowers = [
  { id:'rose', name:'Rose', rings:6, count:7, step:1, length:150, shrink:21, width:76, kind:'cup', heart:9 },
  { id:'peony', name:'Peony', rings:5, count:10, step:1, length:164, shrink:26, width:65, kind:'ruffle', heart:19 },
  { id:'lotus', name:'Lotus', rings:3, count:9, step:0, length:174, shrink:39, width:48, kind:'point', heart:22 },
  { id:'dahlia', name:'Dahlia', rings:7, count:14, step:2, length:170, shrink:20, width:28, kind:'point', heart:10 },
  { id:'poppy', name:'Poppy', rings:2, count:4, step:0, length:158, shrink:20, width:115, kind:'ruffle', heart:42 },
  { id:'iris', name:'Iris', rings:2, count:3, step:0, length:174, shrink:44, width:71, kind:'fall', heart:16 },
  { id:'lily', name:'Lily', rings:2, count:3, step:0, length:183, shrink:17, width:40, kind:'curl', heart:8 },
  { id:'camellia', name:'Camellia', rings:5, count:8, step:0, length:163, shrink:27, width:64, kind:'round', heart:21 },
  { id:'cosmos', name:'Cosmos', rings:1, count:8, step:0, length:153, shrink:0, width:64, kind:'notch', heart:33 },
  { id:'sunflower', name:'Sunflower', rings:2, count:24, step:0, length:171, shrink:18, width:23, kind:'point', heart:66 },
  { id:'anemone', name:'Anemone', rings:1, count:7, step:0, length:153, shrink:0, width:74, kind:'round', heart:43 },
  { id:'magnolia', name:'Magnolia', rings:2, count:5, step:0, length:175, shrink:35, width:80, kind:'cup', heart:20 },
  { id:'gerbera', name:'Gerbera', rings:3, count:28, step:3, length:171, shrink:20, width:18, kind:'round', heart:37 },
  { id:'zinnia', name:'Zinnia', rings:6, count:12, step:1, length:163, shrink:22, width:36, kind:'round', heart:17 },
  { id:'cornflower', name:'Cornflower', rings:3, count:11, step:0, length:162, shrink:30, width:33, kind:'fringe', heart:19 },
  { id:'carnation', name:'Carnation', rings:5, count:9, step:1, length:159, shrink:23, width:70, kind:'fringe', heart:8 },
  { id:'hibiscus', name:'Hibiscus', rings:1, count:5, step:0, length:174, shrink:0, width:98, kind:'ruffle', heart:15 },
  { id:'clematis', name:'Clematis', rings:1, count:6, step:0, length:175, shrink:0, width:55, kind:'point', heart:27 },
  { id:'passionflower', name:'Passionflower', rings:2, count:5, step:0, length:161, shrink:12, width:39, kind:'round', heart:28 },
  { id:'plumeria', name:'Plumeria', rings:1, count:5, step:0, length:168, shrink:0, width:78, kind:'twist', heart:9 },
];
const f = n => Number(n.toFixed(3));
for (const [index, flower] of flowers.entries()) {
  const out = [`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 18 500 440" fill="none"><title>${flower.name}, engraved botanical study</title><defs><linearGradient id="petal" x1="0" y1="0" x2=".7" y2="1"><stop stop-color="#4d5143"/><stop offset=".55" stop-color="#293632"/><stop offset="1" stop-color="#152327"/></linearGradient></defs><g transform="translate(250 238) rotate(-12) scale(1 .91)">`];
  let count = 0;
  for(let ring=0;ring<flower.rings;ring++) {
    const n=flower.count+ring*flower.step;
    for(let i=0;i<n;i++) {
      const phase=i*2.399+ring*1.83+index;
      const angle=f(i*360/n+ring*(flower.kind==='fall'?60:23)+Math.sin(phase)*3);
      const l=f((flower.length-ring*flower.shrink)*(1+.045*Math.sin(phase)));
      const w=f(flower.width*(1-ring/(flower.rings+1)*.65));
      const bend=f(Math.sin(phase)*12);
      let tip=`Q${bend} ${-l-8} ${bend+9} ${-l+2}`;
      if(flower.kind==='point') tip=`L${bend} ${-l-16}L${bend+10} ${-l+5}`;
      if(flower.kind==='round'||flower.kind==='cup') tip=`C${-w*.7+bend} ${-l-21} ${w*.7+bend} ${-l-21} ${w*.84+bend} ${-l+16}`;
      if(flower.kind==='ruffle'||flower.kind==='notch') tip=`Q${-w*.68} ${-l-12} ${-w*.4} ${-l+2}Q${-w*.17} ${-l-16} 0 ${-l+1}Q${w*.2} ${-l-17} ${w*.4} ${-l+3}Q${w*.72} ${-l-11} ${w*.85} ${-l+15}`;
      if(flower.kind==='fringe') {
        tip = '';
        for(let tooth=0;tooth<8;tooth++) tip += `L${f(-w*.82+tooth*w*1.64/7)} ${f(-l+(tooth%2?13:-6))}`;
      }
      if(flower.kind==='twist') tip=`C${-w*.6} ${-l-33} ${w*1.5} ${-l-18} ${w*.9} ${-l+32}`;
      if(flower.kind==='curl') tip=`Q${bend+45} ${-l-35} ${bend+20} ${-l+22}`;
      if(flower.kind==='fall') tip=`C${-w} ${-l-30} ${w} ${-l-22} ${w} ${-l+24}`;
      const leftTip=(flower.kind==='point'||flower.kind==='curl')?bend-8:-w*.82+bend;
      out.push(`<g transform="rotate(${angle})"><path d="M-7 19C${-w*.7} ${-l*.18} ${-w*1.12} ${-l*.68} ${leftTip} ${-l+8}${tip}C${w*1.13} ${-l*.65} ${w*.65} ${-l*.15} 7 19Z" fill="url(#petal)" stroke="#c5aa7e" stroke-width=".8"/>`);
      for(let line=0;line<9;line++) {
        const t=(line-4)/4;
        out.push(`<path d="M${f(t*5)} 7C${f(t*w*.6)} ${f(-l*.28)} ${f(t*w*.7+bend)} ${f(-l*.73)} ${f(t*w*.65+bend)} ${f(-l+18+Math.abs(t)*12)}" stroke="#cdb68b" stroke-width=".4" opacity=".4"/>`);
      }
      if(flower.kind==='cup') out.push(`<path d="M${-w*.8} ${-l+10}Q0 ${-l*.4} ${w*.8} ${-l+16}" stroke="#d2ba8e" stroke-width=".7" fill="none"/>`);
      out.push('</g>'); count++;
    }
  }
  if(flower.id==='passionflower') for(let i=0;i<72;i++) {
    const a=i*Math.PI*2/72;
    out.push(`<path d="M${f(Math.cos(a)*32)} ${f(Math.sin(a)*32)}Q${f(Math.cos(a+.16)*87)} ${f(Math.sin(a+.16)*87)} ${f(Math.cos(a)*118)} ${f(Math.sin(a)*118)}" stroke="#dac298" stroke-width=".9"/>`);
  }
  out.push(`<circle r="${flower.heart}" fill="#202c29" stroke="#ad9267" stroke-width=".7"/>`);
  const seeds=flower.id==='sunflower'?280:flower.id==='rose'?28:100;
  for(let i=0;i<seeds;i++) {
    const a=i*2.399963, r=Math.sqrt(i/seeds)*flower.heart;
    out.push(`<path d="M${f(Math.cos(a)*r)} ${f(Math.sin(a)*r)}l${f(Math.cos(a)*2)} ${f(Math.sin(a)*2-2)}" stroke="#d4ba82" stroke-width=".9" stroke-linecap="round"/>`);
  }
  if(flower.id==='lily') for(let i=0;i<6;i++) out.push(`<path d="M0 0Q${Math.cos(i)*23} -40 ${Math.cos(i)*38} ${-58+Math.sin(i)*24}" stroke="#d8bd88" stroke-width="1.4"/><ellipse cx="${Math.cos(i)*38}" cy="${-58+Math.sin(i)*24}" rx="3" ry="7" fill="#cfab63"/>`);
  if(flower.id==='hibiscus') {
    out.push('<path d="M0 0Q23-51 74-98" stroke="#d1b785" stroke-width="3"/>');
    for(let i=0;i<18;i++) out.push(`<path d="M${i*3+10} ${-i*3-20}l${i%2?9:-7} -8" stroke="#e0c892" stroke-width="1.1"/><circle cx="${i*3+10+(i%2?9:-7)}" cy="${-i*3-28}" r="1.7" fill="#d1af73"/>`);
    out.push('<circle cx="74" cy="-98" r="4" fill="#d5b576"/>');
  }
  if(flower.id==='clematis') for(let i=0;i<28;i++) {
    const a=i*2.399963;
    out.push(`<path d="M0 0L${f(Math.cos(a)*48)} ${f(Math.sin(a)*48)}" stroke="#dbca9c" stroke-width=".8"/>`);
  }
  out.push('</g></svg>');
  const svg=out.join('');
  assert.ok(count>0 && !/NaN|Infinity/.test(svg));
  assert.ok(svg.includes(`<title>${flower.name},`));
  writeFileSync(new URL(`./${flower.id}-engraving.svg`,import.meta.url),svg);
  console.log(`${flower.name}: ${count} petals`);
}
assert.equal(new Set(flowers.map(f=>f.id)).size,20);
