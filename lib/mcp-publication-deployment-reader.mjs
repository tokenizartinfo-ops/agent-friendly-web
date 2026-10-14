import {createSuccessorDeploymentReader} from './mcp-successor-deployment-reader.mjs';
const fail=()=>{throw Error('Publication deployment observation unavailable');};
const hex=(v,n)=>typeof v==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(v);
const exact=(value,keys)=>{
 if(!value||Object.getPrototypeOf(value)!==Object.prototype||Reflect.ownKeys(value).length!==keys.length)fail();
 const out={};for(const k of keys){const d=Object.getOwnPropertyDescriptor(value,k);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();out[k]=d.value;}return Object.freeze(out);
};
/** Documentary receipt is read from the trusted primary journal, not supplied by
 * the client. Deployment/namespace pins are a separately approved operator plan.
 * Construction grants nothing; every invocation performs fresh provider GETs. */
export async function createPublicationDeploymentReader({db,artifactKey,expected,deployment,readCredential,fetchImpl,now,timeoutMs=5000,signal}={}){
 const e=exact(expected,['accountId','workerName','sourceRevision','programHash','workerHash']);
 const d=exact(deployment,['namespaceId','applicationId','deploymentId','scopeHash']);
 if(!db?.withSession||!hex(artifactKey,64)||!hex(e.accountId,32)||e.workerName!=='agent-friendly-web-delegated-canary'||!hex(e.sourceRevision,40)||!hex(e.programHash,64)||!hex(e.workerHash,64))fail();
 if(!Number.isSafeInteger(timeoutMs)||timeoutMs<1||timeoutMs>5000||signal!==undefined&&(!(signal instanceof AbortSignal)||signal.aborted))fail();
 let row,timer,rejectCancel;const abort=()=>rejectCancel(Error('Publication deployment observation unavailable'));
 const cancelled=new Promise((_,reject)=>{rejectCancel=reject;});signal?.addEventListener('abort',abort,{once:true});
 try{row=await Promise.race([db.withSession('first-primary').prepare('SELECT a.account_id,a.worker_name,a.source_revision,a.program_hash,a.worker_hash,r.version_id,r.etag,r.confirmed_at FROM dossier_publication_attempts a JOIN dossier_publication_receipts r ON r.artifact_key=a.artifact_key WHERE a.artifact_key=?').bind(artifactKey).first(),cancelled,new Promise((_,reject)=>{timer=setTimeout(()=>reject(Error('Publication deployment observation unavailable')),timeoutMs);})]);if(signal?.aborted)fail();}catch{fail();}finally{clearTimeout(timer);signal?.removeEventListener('abort',abort);}
 if(!row||row.account_id!==e.accountId||row.worker_name!==e.workerName||row.source_revision!==e.sourceRevision||row.program_hash!==e.programHash||row.worker_hash!==e.workerHash||!Number.isSafeInteger(row.confirmed_at)||row.confirmed_at<0)fail();
 return createSuccessorDeploymentReader({pins:{accountId:e.accountId,workerName:e.workerName,sourceRevision:e.sourceRevision,programHash:e.programHash,...d,versionId:row.version_id,etag:row.etag},readCredential,fetchImpl,now,timeoutMs});
}
