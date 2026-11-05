import {readFile,writeFile,mkdir,rename,rm} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=fileURLToPath(new URL('../',import.meta.url));
const manifest=JSON.parse(await readFile(new URL('./vendor-manifest.json',import.meta.url),'utf8'));
const hash=b=>createHash('sha256').update(b).digest('hex');
async function install(item){const dest=path.join(root,'dist/vendor',item.path);try{if(hash(await readFile(dest))===item.sha256){console.log('Verified '+item.path);return}}catch{}
 let error;for(let attempt=0;attempt<3;attempt++){try{const response=await fetch(item.url,{signal:AbortSignal.timeout(90000)});if(!response.ok)throw Error('HTTP '+response.status);const data=Buffer.from(await response.arrayBuffer());if(hash(data)!==item.sha256)throw Error('SHA-256 mismatch; refusing changed dependency');await mkdir(path.dirname(dest),{recursive:true});const tmp=dest+'.tmp';await writeFile(tmp,data);await rename(tmp,dest);console.log('Fetched '+item.path);return}catch(e){error=e}}
 await rm(dest+'.tmp',{force:true});throw Error(item.path+': '+error.message)}
let next=0;await Promise.all(Array.from({length:3},async()=>{while(next<manifest.length){const item=manifest[next++];await install(item)}}));
await writeFile(path.join(root,'dist/vendor/package.json'),JSON.stringify({type:'commonjs'})+'\n');
console.log('All pinned assets ready. Run npm test, then npm start.');
