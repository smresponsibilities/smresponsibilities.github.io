import {mkdir,writeFile} from 'node:fs/promises';
import {kanto} from './assets/kanto.js';
import {devices as classic} from './assets/classic.js';
import {devices as middle} from './assets/middle.js';
import {devices as rotom} from './assets/rotom.js';
import {exportAsset,svg,controlArt} from './renderer.js';

// Deterministic compilation of the authored vector source, not an image edit.
const devices=[kanto,...classic,...middle,...rotom];
const root=new URL('./assets/exported/',import.meta.url);
await mkdir(root,{recursive:true});
const manifest=[];
for(const device of devices){
  await writeFile(new URL(`${device.id}-open.svg`,root),exportAsset(device));
  const layerFiles=[];
  const rockerArt=[];
  for(const layer of device.layers){
    const file=`${device.id}-${layer.id}.svg`;
    // Each connected rocker is one moving asset. Its fixed well remains in the body.
    const fixedArt=layer.svg.replace(/<g data-rocker="([^"]+)">[\s\S]*?<\/g>/g,match=>{rockerArt.push(match);return '';});
    await writeFile(new URL(file,root),exportAsset({...device,layers:[{...layer,svg:fixedArt}],controls:[]}));
    layerFiles.push({id:layer.id,file,motion:layer.motion||null});
    if(layer.outer){
      const outerFile=`${device.id}-${layer.id}-outer.svg`;
      await writeFile(new URL(outerFile,root),svg(device,layer.outer));
      layerFiles.at(-1).outer=outerFile;
    }
  }
  const controlsFile=`${device.id}-controls.svg`;
  await writeFile(new URL(controlsFile,root),svg(device,rockerArt.join('')+device.controls.map(c=>`<g id="${device.id}-${c.id}">${controlArt(c)}</g>`).join('')));
  const rearFile=device.rear?`${device.id}-rear.svg`:null;
  if(rearFile)await writeFile(new URL(rearFile,root),svg(device,device.rear));
  manifest.push({id:device.id,generation:device.generation,region:device.region,games:device.games,reference:device.reference,note:device.note,width:device.width,height:device.height,open:`${device.id}-open.svg`,layers:layerFiles,controlsFile,controls:device.controls,screens:device.screens,...(rearFile?{rear:rearFile}:{})});
}
await writeFile(new URL('manifest.json',root),JSON.stringify({version:1,format:'Authored layered SVG',deviceCount:devices.length,devices:manifest},null,2)+'\n');
console.log(`Exported ${devices.length} devices, ${manifest.reduce((n,d)=>n+d.layers.length,0)} inner layers, ${manifest.reduce((n,d)=>n+d.layers.filter(l=>l.outer).length,0)} outer faces, ${manifest.reduce((n,d)=>n+d.controls.length,0)} controls.`);
