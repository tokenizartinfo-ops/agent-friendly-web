import {mkdir,open,readFile} from 'node:fs/promises';
import {join,resolve} from 'node:path';
const UUID=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const keys=['version','occurrenceId','eventId','requestId','sequence','phase','state','attempts','observedAt'];
const fail=()=>{throw Error('Checkpoint unavailable');};
function validate(value,id){
 const allowed=[...keys,...(Object.hasOwn(value??{},'runId')?['runId','leaseExpiresAt']:[])];
 if(!value||typeof value!=='object'||Array.isArray(value)||Object.keys(value).length!==allowed.length||!allowed.every(key=>Object.hasOwn(value,key))||!['version','occurrenceId','eventId','requestId','phase','state'].every(key=>typeof value[key]==='string')||value.version!=='afw-assistance-occurrence-v1'||value.occurrenceId!==id||!UUID.test(value.requestId)||!/^[0-9a-f]{64}$/.test(value.eventId)||!Number.isSafeInteger(value.sequence)||value.sequence<0||value.sequence>12||!Number.isSafeInteger(value.attempts)||value.attempts<0||value.attempts>3||!Number.isSafeInteger(value.observedAt)||value.observedAt<0||!['preflight','list','claim','finish'].includes(value.phase)||!['started','attempted','received','completed','stopped'].includes(value.state)||(Object.hasOwn(value,'runId')&&(typeof value.runId!=='string'||!UUID.test(value.runId)||!Number.isSafeInteger(value.leaseExpiresAt)||value.leaseExpiresAt<0)))fail();
 return {...value};
}
/** Append-only fsync'd files and directory entries. The existing parent must be operator-selected
 * persistent storage: this adapter cannot prove a cloud filesystem's lifetime.
 * Existing/incomplete occurrences refuse replay; never delete to retry.
 */
export function createOccurrenceFileCheckpoint(root,occurrenceId){
 if(process.platform==='win32'||typeof root!=='string'||!root||typeof occurrenceId!=='string'||!UUID.test(occurrenceId))fail();
 const directory=join(resolve(root),occurrenceId);
 async function close(handle){if(handle){try{await handle.close();}catch{fail();}}}
 async function syncDirectory(path){
  let handle;try{handle=await open(path,'r');await handle.sync();}
  catch{fail();}finally{await close(handle);}
 }
 async function append(receipt){
  let handle;
  try{
   handle=await open(join(directory,`${receipt.sequence}.json`),'wx',0o600);
   await handle.writeFile(JSON.stringify(receipt)+'\n','utf8');await handle.sync();await syncDirectory(directory);return true;
  }catch(error){if(error.code==='EEXIST')return false;throw Error('Checkpoint unavailable');}
  finally{await close(handle);}
 }
 return {
  async create(value){
   const receipt=validate(value,occurrenceId);if(receipt.sequence!==0||receipt.state!=='started'||receipt.attempts!==0)fail();
   try{await syncDirectory(resolve(root));await mkdir(directory);await syncDirectory(resolve(root));}
   catch(error){if(error.code==='EEXIST')return false;throw Error('Checkpoint unavailable');}
   return append(receipt);
  },
  async advance(expected,value){
   const receipt=validate(value,occurrenceId);
   if(!Number.isSafeInteger(expected)||expected<0||expected>11||receipt.sequence!==expected+1)fail();
   let prior;
   try{prior=validate(JSON.parse(await readFile(join(directory,`${expected}.json`),'utf8')),occurrenceId);}
   catch{throw Error('Checkpoint unavailable');}
   if(prior.sequence!==expected||prior.eventId!==receipt.eventId||prior.requestId!==receipt.requestId||prior.attempts>receipt.attempts||prior.observedAt>receipt.observedAt||['completed','stopped'].includes(prior.state))return false;
   return append(receipt);
  },
 };
}
