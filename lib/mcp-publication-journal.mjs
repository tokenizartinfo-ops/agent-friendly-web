const fail=()=>{throw Error('Publication confirmation unavailable');};
const hex=(v,n)=>typeof v==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(v);
const uuid=v=>typeof v==='string'&&/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(v);
const snapshot=value=>{
 const keys=['script','sourceRevision','sourceTree','programHash','workerHash','sourceCheck'];
 if(!value||Object.getPrototypeOf(value)!==Object.prototype||Reflect.ownKeys(value).length!==keys.length)fail();
 const out={};for(const k of keys){const d=Object.getOwnPropertyDescriptor(value,k);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();out[k]=d.value;}
 return Object.freeze(out);
};
import {createHash} from 'node:crypto';
const hash=text=>createHash('sha256').update(text).digest('hex');
/** Private operator composition. Trusted build metadata and upload adapters are
 * required; a receipt records publication, never deployment or launch authority. */
export function createPublicationJournal({db,accountId,workerName,artifact,upload,readVersion,now=Date.now,timeoutMs=60000}={}){
 const a=snapshot(artifact);
 if(!hex(accountId,32)||workerName!=='agent-friendly-web-delegated-canary'||!db?.withSession||typeof upload!=='function'||typeof readVersion!=='function'||typeof now!=='function'||!Number.isSafeInteger(timeoutMs)||timeoutMs<1||timeoutMs>60000||typeof a.script!=='string'||!a.script.length||!hex(a.sourceRevision,40)||!hex(a.sourceTree,40)||!hex(a.programHash,64)||!hex(a.workerHash,64)||a.sourceCheck!=='git-inputs-before-after-v1'||hash(a.script)!==a.workerHash)fail();
 const artifactKey=hash(JSON.stringify([accountId,workerName,a.workerHash]));
 return Object.freeze({async publish(signal){
  if(!(signal instanceof AbortSignal)||signal.aborted)fail();
  const controller=new AbortController(),end=performance.now()+timeoutMs;let last=-1,timer,rejectCancel;
  const check=()=>{const t=now();if(signal.aborted||controller.signal.aborted||performance.now()>=end||!Number.isSafeInteger(t)||t<0||t<last)fail();last=t;return t;};
  const cancelled=new Promise((_,reject)=>{rejectCancel=reject;}),abort=()=>{controller.abort();rejectCancel(Error('Publication confirmation unavailable'));};
  signal.addEventListener('abort',abort,{once:true});
  const deadline=new Promise((_,reject)=>{timer=setTimeout(()=>{controller.abort();reject(Error('Publication confirmation unavailable'));},timeoutMs);});
  const work=async()=>{
   const startedAt=check(),primary=db.withSession('first-primary');
   const attempt=await primary.prepare('INSERT INTO dossier_publication_attempts (artifact_key,account_id,worker_name,source_revision,source_tree,program_hash,worker_hash,started_at) VALUES (?,?,?,?,?,?,?,?)').bind(artifactKey,accountId,workerName,a.sourceRevision,a.sourceTree,a.programHash,a.workerHash,startedAt).run();
   check();if(attempt?.success!==true||attempt.meta?.changes!==1)fail();
   const result=await upload(Object.freeze({...a,accountId,workerName}),controller.signal);check();
   const versionId=result?.versionId;if(!uuid(versionId))fail();
   const observed=await readVersion(Object.freeze({accountId,workerName,versionId}),controller.signal);check();
   const etag=observed?.etag;if(observed?.id!==versionId||!hex(etag,64))fail();
   const confirmedAt=check();
   const receipt=await primary.prepare('INSERT INTO dossier_publication_receipts (artifact_key,version_id,etag,confirmed_at) VALUES (?,?,?,?)').bind(artifactKey,versionId,etag,confirmedAt).run();
   check();if(receipt?.success!==true||receipt.meta?.changes!==1)fail();
   return Object.freeze({purpose:'afw.publication-receipt.v1',artifactKey,accountId,workerName,sourceRevision:a.sourceRevision,sourceTree:a.sourceTree,programHash:a.programHash,workerHash:a.workerHash,versionId,etag,confirmedAt,mayDeploy:false});
  };
  try{return await Promise.race([work(),cancelled,deadline]);}catch{fail();}finally{clearTimeout(timer);signal.removeEventListener('abort',abort);controller.abort();}
 }});
}
