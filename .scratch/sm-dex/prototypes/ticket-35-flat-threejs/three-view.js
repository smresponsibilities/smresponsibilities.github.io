import * as THREE from 'three';
import {controls,bodyOutline,lidOutline,bezelOutline,dpadOutline,mainScreen,sideScreen,WIDTH,HEIGHT,HINGE} from './model.js';

export function createThree(host,screens,onProjection){
  const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.setClearColor(0x000000,0);host.append(renderer.domElement);
  renderer.domElement.setAttribute('aria-hidden','true');
  const scene=new THREE.Scene(),root=new THREE.Group(),body=new THREE.Group(),lid=new THREE.Group();scene.add(root);root.add(body,lid);lid.position.z=26;
  const camera=new THREE.OrthographicCamera(-470,470,352,-352,1,3000);camera.position.set(0,0,1400);camera.lookAt(0,0,0);
  scene.add(new THREE.HemisphereLight(0xeaf5ff,0x321420,.85));const light=new THREE.DirectionalLight(0xfff5e8,1.05);light.position.set(-500,700,1100);scene.add(light);
  const materials=new Map(),geometries=new Set(),textures=new Set(),caps=new Map(),capBase=new Map();let width=940,height=704,currentPose=0;
  const mat=(color,shine=35)=>{const key=color+'-'+shine;if(!materials.has(key))materials.set(key,new THREE.MeshPhongMaterial({color,shininess:shine,specular:0x18232a}));return materials.get(key);};
  function shape(points){const s=new THREE.Shape();points.forEach(([x,y],i)=>{if(i===0)s.moveTo(x-HINGE,352-y);else s.lineTo(x-HINGE,352-y);});s.closePath();return s;}
  function poly(parent,points,color,z,depth=4,bevel=1){const g=new THREE.ExtrudeGeometry(shape(points),{depth,steps:1,bevelEnabled:bevel>0,bevelSize:bevel,bevelThickness:bevel,bevelSegments:2,curveSegments:6});geometries.add(g);const m=new THREE.Mesh(g,mat(color));m.position.z=z;parent.add(m);return m;}
  function rounded(x,y,w,h,r=4){const points=[],rr=Math.min(r,w/2,h/2);for(const [cx,cy,start] of [[x+w-rr,y+rr,-90],[x+w-rr,y+h-rr,0],[x+rr,y+h-rr,90],[x+rr,y+rr,180]])for(let i=0;i<=5;i++){const a=(start+i*18)*Math.PI/180;points.push([cx+Math.cos(a)*rr,cy+Math.sin(a)*rr]);}return points;}
  const box=(parent,x,y,w,h,color,z=0,depth=4,r=4)=>poly(parent,rounded(x,y,w,h,r),color,z,depth,1);
  function disk(parent,x,y,r,color,z=0,depth=4){const g=new THREE.CylinderGeometry(r,r,depth,40);g.rotateX(Math.PI/2);geometries.add(g);const m=new THREE.Mesh(g,mat(color,70));m.position.set(x-HINGE,352-y,z+depth/2);parent.add(m);return m;}
  function line(parent,points,color,z){const g=new THREE.BufferGeometry().setFromPoints(points.map(([x,y])=>new THREE.Vector3(x-HINGE,352-y,z)));geometries.add(g);const material=new THREE.LineBasicMaterial({color});materials.set(Symbol(),material);const l=new THREE.Line(g,material);parent.add(l);return l;}
  poly(body,bodyOutline,0xcd2945,-24,24,3);line(body,[...bodyOutline,bodyOutline[0]],0x6b122b,3);
  line(body,[[57,178],[244,178],[337,124],[450,124]],0x670e29,3);line(body,[[57,184],[246,184],[339,131],[450,131]],0x71102b,3);
  disk(body,107,101,43,0xd0d8d0,2,7);disk(body,107,101,35,0x1e9dbf,9,5);
  const domeG=new THREE.SphereGeometry(34,32,16);geometries.add(domeG);const dome=new THREE.Mesh(domeG,mat(0x2aa5ce,150));dome.scale.z=.32;dome.position.set(107-HINGE,352-101,15);body.add(dome);
  disk(body,95,88,8,0xc4f6fa,24,1);
  for(const [x,col] of [[174,0xb32340],[208,0xe0ba32],[242,0x469257]])disk(body,x,74,10,col,2,4);
  poly(body,bezelOutline,0xd2d8cb,1,5,2);line(body,[...bezelOutline,bezelOutline[0]],0x525f55,8);
  box(body,107,230,286,231,0x273331,7,2,5);disk(body,235,219,3,0xa02a34,8,1);disk(body,252,219,3,0xa02a34,8,1);
  for(const y of [469,476,483])box(body,325,y,60,2,0x67746d,8,1,0);
  box(body,158,566,141,60,0x536f42,1,3,3);
  poly(lid,lidOutline,0xc32643,-14,14,2.5);line(lid,[...lidOutline,lidOutline[0]],0x69122b,2);
  line(lid,[[483,126],[585,126],[683,185],[868,185],[868,637],[855,650],[483,650],[483,126]],0x6e122b,2);
  // The back belongs to the same physical leaf; these recesses rotate with it.
  for(const y of [588,601,614])box(lid,713,y,116,5,0x751630,-17,1,2);
  line(lid,[[483,134],[598,134],[696,192],[867,192],[867,628],[852,645],[483,645],[483,134]],0x72142b,-17);
  box(lid,512,228,327,126,0x1a292b,1,2,5);
  for(const [x,w] of [[519,145],[681,151]])box(lid,x,592,w,45,0x1a2a2b,1,2,3);
  for(const x of [678,693,708,723])for(const y of [540,549])box(lid,x,y,7,2,0x74192f,2,1,0);
  const rocker=poly(body,dpadOutline,0x222b30,4,7,1.5);caps.set('rocker',rocker);capBase.set('rocker',rocker.position.z);
  const colours={cyan:0x62b5cf,white:0xe0e3d8,dark:0x242c33,red:0xcd384d,blue:0x518ab5,round:0x252d32,'round-red':0xcc3448,'round-yellow':0xeaca3b};
  for(const c of controls){if(c.kind==='direction')continue;const parent=c.part==='body'?body:lid,z=c.part==='body'?5:3;let cap;
    if(c.kind.includes('round')){disk(parent,c.x+c.w/2,c.y+c.h/2,c.w/2+2,0x48182a,z-3,3);cap=disk(parent,c.x+c.w/2,c.y+c.h/2,c.w/2,colours[c.kind],z,5);}
    else {box(parent,c.x-2,c.y-2,c.w+4,c.h+4,0x43172a,z-3,3,4);cap=box(parent,c.x,c.y,c.w,c.h-4,colours[c.kind],z,5,4);}
    // Each cap has its own material for acknowledgement without recolouring its neighbours.
    const own=cap.material.clone();materials.set(Symbol(),own);cap.material=own;caps.set(c.id,cap);capBase.set(c.id,cap.position.z);
  }
  const hingeG=new THREE.CylinderGeometry(14,14,548,28);geometries.add(hingeG);const hinge=new THREE.Mesh(hingeG,mat(0xb92b43,70));hinge.position.set(0,352-389,26);body.add(hinge);
  for(const y of [143,152,619,628]){const g=new THREE.TorusGeometry(14.2,1,6,32);g.rotateX(Math.PI/2);geometries.add(g);const ring=new THREE.Mesh(g,mat(0x77132b));ring.position.set(0,352-y,26);body.add(ring);}
  const screenTextures=[];
  function display(parent,canvas,area,z){const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;texture.minFilter=THREE.LinearFilter;texture.magFilter=THREE.NearestFilter;texture.generateMipmaps=false;textures.add(texture);screenTextures.push(texture);const material=new THREE.MeshBasicMaterial({map:texture,toneMapped:false});materials.set(Symbol(),material);const geometry=new THREE.PlaneGeometry(area.w,area.h);geometries.add(geometry);const mesh=new THREE.Mesh(geometry,material);mesh.position.set(area.x+area.w/2-HINGE,352-area.y-area.h/2,z);parent.add(mesh);}
  display(body,screens.main,mainScreen,11.5);display(lid,screens.side,sideScreen,5);
  for(const a of screens.auxiliary)display(a.part==='body'?body:lid,a.canvas,a.area,a.part==='body'?5.5:4.5);
  const local=new THREE.Vector3();
  function projected(c,x,y){const group=c.part==='body'?body:lid;local.set(x-HINGE,352-y,c.part==='body'?13:9);group.localToWorld(local);local.project(camera);return [(local.x+1)*width/2,(1-local.y)*height/2];}
  function targets(){scene.updateMatrixWorld(true);return controls.map(c=>{const points=c.kind.includes('round')?Array.from({length:24},(_,i)=>{const a=i/24*Math.PI*2;return projected(c,c.x+c.w/2+Math.cos(a)*c.w/2,c.y+c.h/2+Math.sin(a)*c.h/2);}):[[c.x,c.y],[c.x+c.w,c.y],[c.x+c.w,c.y+c.h],[c.x,c.y+c.h]].map(p=>projected(c,...p));const xs=points.map(p=>p[0]),ys=points.map(p=>p[1]),left=Math.min(...xs),top=Math.min(...ys),w=Math.max(...xs)-left,h=Math.max(...ys)-top;return {...c,left,top,width:w,height:h,clip:'polygon('+points.map(p=>`${(p[0]-left)/w*100}% ${(p[1]-top)/h*100}%`).join(',')+')'};});}
  function render(){if(host.hidden)return;scene.updateMatrixWorld(true);renderer.render(scene,camera);host.dataset.drawCalls=renderer.info.render.calls;host.dataset.triangles=renderer.info.render.triangles;host.dataset.renderer='Three.js r'+THREE.REVISION;}
  function resize(){width=host.parentElement.clientWidth;height=host.parentElement.clientHeight;if(width&&height){renderer.setSize(width,height,false);const ratio=width/height;camera.left=-HEIGHT*ratio/2;camera.right=HEIGHT*ratio/2;camera.top=HEIGHT/2;camera.bottom=-HEIGHT/2;camera.updateProjectionMatrix();render();}}
  function pose(p){currentPose=p;lid.rotation.y=-Math.PI*p;render();}
  function view(preset){root.rotation.set(preset==='front'?0:-.10,preset==='front'?0:preset==='hinge'?.52:-.16,0);root.scale.setScalar(preset==='hinge'?.90:.97);render();onProjection();}
  function press(id,on){const key=['up','down','left','right'].includes(id)?'rocker':id,cap=caps.get(key);if(cap){cap.position.z=capBase.get(key)-(on?4:0);render();}}
  function feedback(id,on){const key=['up','down','left','right'].includes(id)?'rocker':id,cap=caps.get(key);if(cap){cap.material.emissive.setHex(on?0x4e491d:0x000000);render();}}
  function update(){screenTextures.forEach(t=>t.needsUpdate=true);render();}
  renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();host.dataset.context='lost';document.getElementById('hint').textContent='3D graphics interrupted. Flat view remains available.';});
  renderer.domElement.addEventListener('webglcontextrestored',()=>{host.dataset.context='restored';update();});
  function dispose(){geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());textures.forEach(t=>t.dispose());renderer.dispose();host.replaceChildren();}
  function measure(id){const key=['up','down','left','right'].includes(id)?'rocker':id,cap=caps.get(key);return {x:cap.position.x,y:cap.position.y,z:cap.position.z};}
  resize();view('angle');return {resize,pose,view,press,feedback,targets,measure,update,dispose};
}
