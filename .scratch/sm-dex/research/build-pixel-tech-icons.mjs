import sharp from 'sharp';

const icons=[
  ['kotlin.svg','pixel-kotlin.png'],
  ['apache-kafka.svg','pixel-kafka.png'],
  ['snowflake.svg','pixel-snowflake.png'],
  ['solidity.svg','pixel-solidity.png']
];

for(const [source,target] of icons){
  const {data,info}=await sharp(`public/logos/${source}`).resize(16,16,{fit:'contain'}).ensureAlpha().raw().toBuffer({resolveWithObject:true});
  for(let i=0;i<data.length;i+=info.channels){
    if(data[i+3]<128){data[i]=0;data[i+1]=0;data[i+2]=0;data[i+3]=0;continue;}
    data[i+3]=255;
    data[i]=Math.round(data[i]/51)*51;
    data[i+1]=Math.round(data[i+1]/51)*51;
    data[i+2]=Math.round(data[i+2]/51)*51;
  }
  await sharp(data,{raw:info}).resize(64,64,{kernel:'nearest'}).png({palette:true,colours:24,dither:0}).toFile(`public/logos/${target}.next`);
  await sharp(`public/logos/${target}.next`).toFile(`public/logos/${target}`);
  await import('node:fs/promises').then(fs=>fs.unlink(`public/logos/${target}.next`));
}
