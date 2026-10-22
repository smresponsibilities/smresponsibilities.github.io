const url=new URL('https://www.wikidex.net/api.php');
url.search=new URLSearchParams({action:'query',list:'search',srsearch:'Pokédex',srnamespace:'6',srlimit:'500',format:'json'});
const res=await fetch(url,{signal:AbortSignal.timeout(15000)});console.log(res.status);
const raw=await res.text();
if(!res.ok){console.log(raw.slice(0,100));process.exit(1);}
await (await import('node:fs/promises')).writeFile('.scratch/sm-dex/research/ticket-55-refs/wikidex-search.json',raw);
const data=JSON.parse(raw);console.log(data.query?.search?.map(x=>x.title).filter(x=>/^Archivo:EP[1-7]/.test(x)));console.log(data.continue);
