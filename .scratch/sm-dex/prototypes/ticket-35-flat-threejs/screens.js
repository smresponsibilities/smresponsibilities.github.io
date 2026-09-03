import {sections,screenData} from './model.js';
export function createScreens(){
  const main=document.createElement('canvas'),side=document.createElement('canvas');main.width=548;main.height=436;side.width=626;side.height=224;
  const auxiliary=[{part:'body',area:{x:160,y:568,w:137,h:56}},{part:'lid',area:{x:521,y:594,w:141,h:41}},{part:'lid',area:{x:683,y:594,w:147,h:41}}].map(item=>{const canvas=document.createElement('canvas');canvas.width=item.area.w*2;canvas.height=item.area.h*2;return {...item,canvas};});
  const fill=(ctx,color,x,y,w,h)=>{ctx.fillStyle=color;ctx.fillRect(x,y,w,h);};
  function text(ctx,str,x,y,size=11,color='#e6edf3'){ctx.fillStyle=color;ctx.font=`${size}px Departure, monospace`;ctx.fillText(str,x,y);}
  function wrap(ctx,str,x,y,width,size=10,line=15){let row='';for(const word of str.split(' ')){const next=row?row+' '+word:word;ctx.font=`${size}px Departure, monospace`;if(ctx.measureText(next).width>width&&row){text(ctx,row,x,y,size);y+=line;row=word;}else row=next;}text(ctx,row,x,y,size);return y;}
  function draw(s){
    const d=screenData(s),m=main.getContext('2d'),r=side.getContext('2d');
    for(const c of [m,r]){c.setTransform(2,0,0,2,0,0);fill(c,'#0d1117',0,0,c.canvas.width/2,c.canvas.height/2);}
    auxiliary.forEach((a,i)=>{const ctx=a.canvas.getContext('2d');ctx.setTransform(2,0,0,2,0,0);fill(ctx,i===0?'#607f46':'#172a2b',0,0,a.area.w,a.area.h);if(s.power){text(ctx,i===0?'ENTRY 001':i===1?'KANTO':'SM / 001',12,i===0?21:26,11,i===0?'#163520':'#98b39b');if(i===0)text(ctx,sections[s.section].name,12,40,9,'#163520');}});
    if(!s.power)return;
    text(m,d.heading,12,21,10,'#a6b3c1');text(m,s.mode==='detail'?`${s.page+1}/2`:'KANTO',226,21,9,'#8190a0');fill(m,'#38414b',12,29,250,1);
    if(s.mode==='detail'){
      text(m,d.item.name,12,53,13,'#d4ecc3');text(m,d.item.tag,12,75,9,'#86b5cc');
      if(s.page===0)wrap(m,d.item.copy,12,102,245,10,16);
      else d.item.facts.forEach((f,i)=>text(m,f,12,104+i*22,11));
    }else{
      const rows=s.mode==='menu'?sections.map(x=>x.name):d.rows;
      rows.forEach((name,i)=>{const y=40+i*29;if(i===d.selection)fill(m,'#293a40',9,y,256,26);text(m,i===d.selection?'>':' ',15,y+18,13,'#d4ed9a');text(m,name,34,y+18,12,i===d.selection?'#e9f3cf':'#c2cdd8');text(m,String(i+1).padStart(2,'0'),238,y+18,9,'#7c8d9c');});
    }
    fill(m,'#303944',12,193,250,1);text(m,d.footer,12,208,8,'#899eaf');
    text(r,"SM'S DEX",14,22,11,'#e8efd4');text(r,'001 / OWNER',204,22,9,'#80aabd');fill(r,'#34414c',14,31,285,1);
    text(r,s.mode==='menu'?'SHIVAM MAHAJAN':d.item.name,14,53,13,'#d9e6c1');
    text(r,s.mode==='menu'?'SOFTWARE DEVELOPER':d.item.tag,14,73,9,'#b1bece');
    text(r,s.mode==='detail'?'B BACK / LEFT-RIGHT PAGE':'A OPEN / B BACK',14,99,9,'#88a0b4');
  }
  return {main,side,auxiliary,draw};
}
