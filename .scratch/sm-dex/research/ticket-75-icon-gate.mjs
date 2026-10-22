import sharp from 'sharp';
const files=['pixel-kotlin.png','pixel-kafka.png','pixel-snowflake.png','pixel-solidity.png'];
const results=[];
for(const file of files){const {data,info}=await sharp(`public/logos/${file}`).ensureAlpha().raw().toBuffer({resolveWithObject:true});let partialAlpha=0;for(let i=3;i<data.length;i+=info.channels)if(data[i]!==0&&data[i]!==255)partialAlpha++;results.push({file,width:info.width,height:info.height,partialAlpha});}
const checks={dimensions:results.every(x=>x.width===64&&x.height===64),hardEdges:results.every(x=>x.partialAlpha===0)};console.log(JSON.stringify({results,checks},null,2));if(Object.values(checks).some(v=>!v))process.exit(1);
