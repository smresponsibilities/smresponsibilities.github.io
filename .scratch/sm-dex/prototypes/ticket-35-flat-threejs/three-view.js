import * as THREE from './vendor/three.module.js';
import {controls,bodyOutline,lidOutline,bezelOutline,dpadOutline,mainScreen,sideScreen,WIDTH,HEIGHT,HINGE} from './model.js';

export function createThree(host,screens,onProjection,options={}){
  const buttonsOnly=options.buttonsOnly===true;
  const flatButtons=options.flatButtons===true;
  // Full-device outlines need extra coverage on 1x/fractional-DPR displays. Bound the cost at 2x.
  const renderPixelRatio=()=>buttonsOnly?Math.min(devicePixelRatio,2):2;
  const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});renderer.setPixelRatio(renderPixelRatio());renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.setClearColor(0x000000,0);host.append(renderer.domElement);
  renderer.domElement.setAttribute('aria-hidden','true');
  const scene=new THREE.Scene(),root=new THREE.Group(),body=new THREE.Group(),lid=new THREE.Group(),pivot=new THREE.Group();scene.add(root);root.add(body,pivot);pivot.add(lid);
  // Full 3D opens coplanar and closes with 36 units between inner faces. Hybrid follows the flat leaf.
  pivot.position.z=buttonsOnly?26:18;lid.position.z=buttonsOnly?0:-18;
  const camera=new THREE.OrthographicCamera(-470,470,352,-352,1,3000);camera.position.set(0,0,1400);camera.lookAt(0,0,0);
  scene.add(new THREE.HemisphereLight(0xf3f8ff,0x260812,.72));
  const keyLight=new THREE.DirectionalLight(0xfff3df,1.42);keyLight.position.set(-520,720,1000);scene.add(keyLight);
  const rimLight=new THREE.DirectionalLight(0x9fd6ff,.62);rimLight.position.set(720,-280,620);scene.add(rimLight);
  const materials=new Map(),geometries=new Set(),textures=new Set(),caps=new Map(),capBase=new Map();let width=940,height=704,currentPose=0;
  let indicator=null,latch=null,powered=true;
  const mat=(color,shine=35)=>{const key=color+'-'+shine;if(!materials.has(key))materials.set(key,new THREE.MeshPhongMaterial({color,shininess:shine,specular:0x18232a}));return materials.get(key);};
  function shape(points){const s=new THREE.Shape();points.forEach(([x,y],i)=>{if(i===0)s.moveTo(x-HINGE,352-y);else s.lineTo(x-HINGE,352-y);});s.closePath();return s;}
  function poly(parent,points,color,z,depth=4,bevel=1){const g=new THREE.ExtrudeGeometry(shape(points),{depth,steps:1,bevelEnabled:bevel>0,bevelSize:bevel,bevelThickness:bevel,bevelSegments:2,curveSegments:6});geometries.add(g);const m=new THREE.Mesh(g,mat(color));m.position.z=z;parent.add(m);return m;}
  function rounded(x,y,w,h,r=4){const points=[],rr=Math.min(r,w/2,h/2);for(const [cx,cy,start] of [[x+w-rr,y+rr,-90],[x+w-rr,y+h-rr,0],[x+rr,y+h-rr,90],[x+rr,y+rr,180]])for(let i=0;i<=5;i++){const a=(start+i*18)*Math.PI/180;points.push([cx+Math.cos(a)*rr,cy+Math.sin(a)*rr]);}return points;}
  const box=(parent,x,y,w,h,color,z=0,depth=4,r=4)=>poly(parent,rounded(x,y,w,h,r),color,z,depth,1);
  function disk(parent,x,y,r,color,z=0,depth=4){const g=new THREE.CylinderGeometry(r,r,depth,40);g.rotateX(Math.PI/2);geometries.add(g);const m=new THREE.Mesh(g,mat(color,70));m.position.set(x-HINGE,352-y,z+depth/2);parent.add(m);return m;}
  function roundCap(parent,x,y,r,color,z){const bevel=Math.min(4.5,r*.22),profile=[[0,0],[r-1,0],[r,1],[r,5],[r-1,7],[r-bevel,9],[0,9]].map(p=>new THREE.Vector2(...p));const g=new THREE.LatheGeometry(profile,48);g.rotateX(Math.PI/2);geometries.add(g);const mesh=new THREE.Mesh(g,mat(color,65));mesh.position.set(x-HINGE,352-y,z);parent.add(mesh);return mesh;}
  function line(parent,points,color,z){const path=new THREE.CurvePath();for(let i=1;i<points.length;i++)path.add(new THREE.LineCurve3(new THREE.Vector3(points[i-1][0]-HINGE,352-points[i-1][1],z),new THREE.Vector3(points[i][0]-HINGE,352-points[i][1],z)));const g=new THREE.TubeGeometry(path,points.length*24,1.35,4,false);geometries.add(g);const material=new THREE.MeshBasicMaterial({color});materials.set(Symbol(),material);const l=new THREE.Mesh(g,material);parent.add(l);return l;}
  function edge(parent,mesh,color=0x21050d){const g=new THREE.EdgesGeometry(mesh.geometry,24);geometries.add(g);const material=new THREE.LineBasicMaterial({color});materials.set(Symbol(),material);const e=new THREE.LineSegments(g,material);e.position.copy(mesh.position);parent.add(e);return e;}
  if(!buttonsOnly){
    const bodyShell=poly(body,bodyOutline,0xcd2945,-24,24,3);edge(body,bodyShell);line(body,[...bodyOutline,bodyOutline[0]],0x1e050d,3.2);
    line(body,[[57,178],[244,178],[337,124],[450,124]],0x3a0716,3.2);line(body,[[57,184],[246,184],[339,131],[450,131]],0xf0576b,3.25);
    disk(body,107,101,43,0xd0d8d0,2,7);disk(body,107,101,35,0x1e9dbf,9,5);
    const domeG=new THREE.SphereGeometry(34,32,16);geometries.add(domeG);
    const lensMaterial=new THREE.MeshPhongMaterial({color:0x238bb1,emissive:0x28bfff,emissiveIntensity:.9,shininess:150,specular:0x9bddf1});materials.set('indicator-lens',lensMaterial);
    const dome=new THREE.Mesh(domeG,lensMaterial);dome.scale.z=.32;dome.position.set(107-HINGE,352-101,15);body.add(dome);
    const lamp=new THREE.PointLight(0x54d2ff,900,95,2);lamp.position.set(107-HINGE,352-101,40);body.add(lamp);
    indicator={material:lensMaterial,light:lamp};
    disk(body,95,88,8,0xc4f6fa,24,1);
    for(const [x,col] of [[174,0xb32340],[208,0xe0ba32],[242,0x469257]])disk(body,x,74,10,col,2,4);
    const bezel=poly(body,bezelOutline,0xd2d8cb,1,5,2);edge(body,bezel,0x30372f);line(body,[...bezelOutline,bezelOutline[0]],0x30372f,8.2);
    box(body,107,230,286,231,0x273331,7,2,5);disk(body,235,219,3,0xa02a34,8,1);disk(body,252,219,3,0xa02a34,8,1);
    for(const y of [469,476,483])box(body,325,y,60,2,0x67746d,8,1,0);
    box(body,158,566,141,60,0x536f42,1,3,3);
    const lidShell=poly(lid,lidOutline,0xc32643,-14,14,2.5);edge(lid,lidShell);line(lid,[...lidOutline,lidOutline[0]],0x1e050d,3.2);
    line(lid,[[483,126],[585,126],[683,185],[868,185],[868,637],[855,650],[483,650],[483,126]],0x2c0612,3.4);
    line(lid,[[488,131],[583,131],[681,190],[864,190]],0xea6879,3.45);
    // The back belongs to the same physical leaf; these recesses rotate with it.
    for(const y of [588,601,614])box(lid,713,y,116,5,0x751630,-17,1,2);
    line(lid,[[483,134],[598,134],[696,192],[867,192],[867,628],[852,645],[483,645],[483,134]],0xf0576b,-16.8);
    const latchWell=poly(lid,[[838,388],[804,405],[833,434]],0x5b1020,-18,3,1);edge(lid,latchWell,0x27050d);
    latch=poly(lid,[[833,392],[809,405],[828,429]],0xe7c631,-20,3,1);edge(lid,latch,0x4a0b16);
    box(lid,512,228,327,126,0x1a292b,1,2,5);
    for(const [x,w] of [[519,145],[681,151]])box(lid,x,592,w,45,0x1a2a2b,1,2,3);
    for(const x of [678,693,708,723])for(const y of [540,549])box(lid,x,y,7,2,0x74192f,2,1,0);
  }
  if(buttonsOnly){
    // A depth-only copy of the leaf hides controls beneath its flat DOM exterior during closure.
    const mask=poly(lid,lidOutline,0x000000,-14,14,0),material=new THREE.MeshBasicMaterial({colorWrite:false});
    materials.set(Symbol(),material);mask.material=material;mask.renderOrder=-1;root.position.x=HINGE-WIDTH/2;
  }
  const scaledDpad=dpadOutline.map(([x,y])=>[361+(x-361)*1.1,586+(y-586)*1.1]);
  poly(body,scaledDpad,0x350e1d,flatButtons?0:-1,flatButtons?5:6,2);
  const rocker=new THREE.Group();body.add(rocker);
  const rockerFace=poly(rocker,dpadOutline,0x36434d,4,flatButtons?7:12,flatButtons?1.4:3);
  const rockerMaterial=rockerFace.material.clone();rockerMaterial.shininess=flatButtons?18:65;rockerMaterial.specular.setHex(flatButtons?0x11171c:0x18232a);materials.set(Symbol(),rockerMaterial);rockerFace.material=rockerMaterial;rocker.userData.surface=rockerMaterial;
  edge(rocker,rockerFace,0x121820);
  const arrowMarks=[[[355,559],[367,559],[361,551]],[[355,613],[367,613],[361,621]],[[335,579],[335,593],[326,586]],[[387,579],[387,593],[396,586]]];
  for(const mark of arrowMarks)poly(rocker,mark,0x111c24,flatButtons?12.2:18.2,.6,.15);
  disk(rocker,361,586,6,0x18232b,flatButtons?12.2:18.2,.6);caps.set('rocker',rocker);capBase.set('rocker',0);
  const colours={cyan:0x62b5cf,white:0xe0e3d8,dark:0x242c33,red:0xcd384d,blue:0x518ab5,round:0x36434d,'round-red':0xcc3448,'round-yellow':0xeaca3b};
  for(const c of controls){if(c.kind==='direction')continue;const parent=c.part==='body'?body:lid,z=c.part==='body'?5:3;let cap;
    if(flatButtons){
      const flatMaterial=new THREE.MeshPhongMaterial({color:colours[c.kind],shininess:18,specular:0x11171c,flatShading:true});materials.set(Symbol(),flatMaterial);
      if(c.kind.includes('round')){
        const cx=c.x+c.w/2,cy=c.y+c.h/2,r=c.w/2;
        disk(parent,cx,cy,r+3,0x35101d,z-4,5);cap=disk(parent,cx,cy,r,colours[c.kind],z,7);
      }
      else {box(parent,c.x-2,c.y-2,c.w+4,c.h,0x43172a,z-3,4,4);cap=box(parent,c.x,c.y,c.w,c.h-4,colours[c.kind],z,7,4);}
      cap.material=flatMaterial;edge(parent,cap,0x24101a);cap.userData.surface=flatMaterial;caps.set(c.id,cap);capBase.set(c.id,cap.position.z);continue;
    }
    if(c.kind.includes('round')){
      const cx=c.x+c.w/2,cy=c.y+c.h/2,r=c.w/2;
      disk(parent,cx,cy,r+4,0x350c1b,z-4,5);
      disk(parent,cx,cy,r+1.5,0x151b20,z,6);
      cap=new THREE.Group();parent.add(cap);const face=roundCap(cap,cx,cy,r,colours[c.kind],z+3);
      const own=face.material.clone();materials.set(Symbol(),own);face.material=own;edge(cap,face,0x161117);cap.userData.surface=own;
    }
    else {box(parent,c.x-2,c.y-2,c.w+4,c.h+4,0x43172a,z-3,4,4);cap=box(parent,c.x,c.y,c.w,c.h-4,colours[c.kind],z,8,4);edge(parent,cap,0x25101a);}
    // Each cap has its own material for acknowledgement without recolouring its neighbours.
    if(!cap.userData.surface){const own=cap.material.clone();materials.set(Symbol(),own);cap.material=own;cap.userData.surface=own;}caps.set(c.id,cap);capBase.set(c.id,cap.position.z);
  }
  if(!buttonsOnly){const hingeG=new THREE.CylinderGeometry(18,18,548,28);geometries.add(hingeG);const hinge=new THREE.Mesh(hingeG,mat(0xb92b43,70));hinge.position.set(0,352-389,18);body.add(hinge);
  for(const y of [143,152,619,628]){const g=new THREE.TorusGeometry(18.2,1,6,32);g.rotateX(Math.PI/2);geometries.add(g);const ring=new THREE.Mesh(g,mat(0x77132b));ring.position.set(0,352-y,18);body.add(ring);}}
  const screenTextures=[];
  function display(parent,canvas,area,z){
    const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;
    // Screens contain fine text, not an integer-scaled sprite. Average texels when reduced.
    texture.minFilter=THREE.LinearMipmapLinearFilter;texture.magFilter=THREE.LinearFilter;
    texture.generateMipmaps=true;texture.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());
    textures.add(texture);screenTextures.push(texture);
    const material=new THREE.MeshBasicMaterial({map:texture,toneMapped:false});materials.set(Symbol(),material);
    const geometry=new THREE.PlaneGeometry(area.w,area.h);geometries.add(geometry);
    const mesh=new THREE.Mesh(geometry,material);mesh.position.set(area.x+area.w/2-HINGE,352-area.y-area.h/2,z);parent.add(mesh);
    host.dataset.screenSampling='trilinear / linear';host.dataset.screenAnisotropy=texture.anisotropy;
  }
  if(!buttonsOnly){display(body,screens.main,mainScreen,11.5);display(lid,screens.side,sideScreen,5);
  for(const a of screens.auxiliary)display(a.part==='body'?body:lid,a.canvas,a.area,a.part==='body'?5.5:4.5);}
  const local=new THREE.Vector3();
  function projected(c,x,y){const group=c.part==='body'?body:lid;local.set(x-HINGE,352-y,c.part==='body'?13:9);group.localToWorld(local);local.project(camera);return [(local.x+1)*width/2,(1-local.y)*height/2];}
  function targets(){scene.updateMatrixWorld(true);return controls.map(c=>{const points=c.kind.includes('round')?Array.from({length:24},(_,i)=>{const a=i/24*Math.PI*2;return projected(c,c.x+c.w/2+Math.cos(a)*c.w/2,c.y+c.h/2+Math.sin(a)*c.h/2);}):[[c.x,c.y],[c.x+c.w,c.y],[c.x+c.w,c.y+c.h],[c.x,c.y+c.h]].map(p=>projected(c,...p));const xs=points.map(p=>p[0]),ys=points.map(p=>p[1]),left=Math.min(...xs),top=Math.min(...ys),w=Math.max(...xs)-left,h=Math.max(...ys)-top;return {...c,left,top,width:w,height:h,clip:'polygon('+points.map(p=>`${(p[0]-left)/w*100}% ${(p[1]-top)/h*100}%`).join(',')+')'};});}
  function render(){if(host.hidden)return;scene.updateMatrixWorld(true);renderer.render(scene,camera);host.dataset.drawCalls=renderer.info.render.calls;host.dataset.triangles=renderer.info.render.triangles;host.dataset.renderer='Three.js r'+THREE.REVISION;host.dataset.renderPixelRatio=renderer.getPixelRatio();}
  function resize(){width=host.parentElement.clientWidth;height=host.parentElement.clientHeight;if(width&&height){const pixelRatio=renderPixelRatio();if(renderer.getPixelRatio()!==pixelRatio)renderer.setPixelRatio(pixelRatio);renderer.setSize(width,height,false);const ratio=width/height;camera.left=-HEIGHT*ratio/2;camera.right=HEIGHT*ratio/2;camera.top=HEIGHT/2;camera.bottom=-HEIGHT/2;camera.updateProjectionMatrix();render();}}
  // Moving between displays or changing browser zoom can change DPR without resizing the stage.
  let densityQuery;
  function watchDensity(){densityQuery=matchMedia(`(resolution: ${devicePixelRatio}dppx)`);densityQuery.addEventListener('change',densityChanged,{once:true});}
  function densityChanged(){resize();onProjection();watchDensity();}
  watchDensity();
  function pose(p){currentPose=p;pivot.rotation.y=-Math.PI*p;host.dataset.latch=!buttonsOnly&&p>=.99?'visible':'hidden';render();}
  function view(preset){
    if(preset==='front'){root.rotation.set(0,0,0);root.scale.setScalar(1);root.position.x=HINGE-WIDTH/2;}
    else if(preset==='hinge'){root.rotation.set(-.10,.52,0);root.scale.setScalar(.90);root.position.x=0;}
    else {root.rotation.set(-.10,-.27,-.028);root.scale.setScalar(.95);root.position.x=0;}
    render();onProjection();
  }
  function press(id,on){const key=['up','down','left','right'].includes(id)?'rocker':id,cap=caps.get(key);if(cap){cap.position.z=capBase.get(key)-(on?4:0);const surface=cap.userData.surface;if(!cap.userData.restColor)cap.userData.restColor=surface.color.clone();surface.color.copy(cap.userData.restColor).multiplyScalar(on?.72:1);render();}}
  function feedback(id,on){
    const key=['up','down','left','right'].includes(id)?'rocker':id,cap=caps.get(key);
    if(!cap)return;
    const surface=cap.userData.surface;
    if(surface.emissive)surface.emissive.setHex(on?0x4e491d:0x000000);
    else {cap.userData.restColor??=surface.color.clone();surface.color.copy(cap.userData.restColor).multiplyScalar(on?1.38:1);}
    render();
  }
  function indicatorState(){return indicator?indicator.material.emissiveIntensity>0&&indicator.light.intensity>0:false;}
  function latchState(){return !buttonsOnly&&latch!==null&&currentPose>=.99;}
  function update(power=powered){
    powered=power;
    if(indicator){indicator.material.emissiveIntensity=powered?.9:0;indicator.material.color.setHex(powered?0x238bb1:0x13435b);indicator.light.intensity=powered?900:0;host.dataset.indicator=indicatorState()?'on':'off';}
    screenTextures.forEach(t=>t.needsUpdate=true);render();
  }
  renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();host.dataset.context='lost';document.getElementById('hint').textContent='3D graphics interrupted. Flat view remains available.';});
  renderer.domElement.addEventListener('webglcontextrestored',()=>{host.dataset.context='restored';update();});
  function dispose(){densityQuery.removeEventListener('change',densityChanged);geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());textures.forEach(t=>t.dispose());renderer.dispose();host.replaceChildren();}
  function measure(id){const key=['up','down','left','right'].includes(id)?'rocker':id,cap=caps.get(key);return {x:cap.position.x,y:cap.position.y,z:cap.position.z};}
  function renderChecks(){
    const ratio=renderPixelRatio(),canvas=renderer.domElement;
    const checks=[
      {name:'Drawing buffer matches bounded antialiasing resolution',pass:renderer.getPixelRatio()===ratio&&Math.abs(canvas.width-Math.floor(width*ratio))<=1&&Math.abs(canvas.height-Math.floor(height*ratio))<=1},
      {name:'Geometry antialiasing remains enabled',pass:renderer.getContext().getContextAttributes().antialias}
    ];
    if(!buttonsOnly)checks.push(
      {name:'Blue indicator emission follows device power',pass:indicatorState()===powered},
      {name:'All five screens filter minification with mipmaps',pass:screenTextures.length===5&&screenTextures.every(t=>t.minFilter===THREE.LinearMipmapLinearFilter&&t.magFilter===THREE.LinearFilter&&t.generateMipmaps)},
      {name:'Screen anisotropy matches the bounded device capability',pass:screenTextures.every(t=>t.anisotropy===Math.min(8,renderer.capabilities.getMaxAnisotropy()))}
    );
    return checks;
  }
  resize();view(buttonsOnly?'front':'angle');return {resize,pose,view,press,feedback,targets,measure,update,dispose,renderChecks,indicatorState,latchState};
}
