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
export async function createPublicationDeploymentReader({db,artifactKey,expected,deployment,activation,readCredential,fetchImpl,now,timeoutMs=5000,signal}={}){
 const e=exact(expected,['accountId','workerName','sourceRevision','programHash','workerHash']);
 const d=exact(deployment,['namespaceId','applicationId','scopeHash']);
 const a=exact(activation,['activationKey','trialId','startAt','expiresAt']);
 if(!hex(a.activationKey,64)||!hex(a.trialId,64)||!Number.isSafeInteger(a.startAt)||!Number.isSafeInteger(a.expiresAt)||a.startAt<0||a.expiresAt<=a.startAt||a.expiresAt-a.startAt>600000)fail();
 if(!db?.withSession||!hex(artifactKey,64)||!hex(e.accountId,32)||e.workerName!=='agent-friendly-web-delegated-canary'||!hex(e.sourceRevision,40)||!hex(e.programHash,64)||!hex(e.workerHash,64))fail();
 if(!Number.isSafeInteger(timeoutMs)||timeoutMs<1||timeoutMs>5000||signal!==undefined&&(!(signal instanceof AbortSignal)||signal.aborted))fail();
 let row,timer,rejectCancel;const abort=()=>rejectCancel(Error('Publication deployment observation unavailable'));
 const cancelled=new Promise((_,reject)=>{rejectCancel=reject;});signal?.addEventListener('abort',abort,{once:true});
 try{row=await Promise.race([db.withSession('first-primary').prepare('SELECT p.account_id,p.worker_name,p.source_revision,p.program_hash,p.worker_hash,b.version_id base_version_id,a.trial_id,a.scope_hash,a.start_at,a.expires_at,r.version_id,r.deployment_id,r.etag,r.confirmed_at,k.acknowledged_at FROM dossier_publication_attempts p JOIN dossier_publication_receipts b ON b.artifact_key=p.artifact_key JOIN dossier_activation_attempts a ON a.artifact_key=p.artifact_key JOIN dossier_activation_receipts r ON r.activation_key=a.activation_key JOIN dossier_activation_acceptances k ON k.activation_key=r.activation_key WHERE p.artifact_key=? AND a.activation_key=?').bind(artifactKey,a.activationKey).first(),cancelled,new Promise((_,reject)=>{timer=setTimeout(()=>reject(Error('Publication deployment observation unavailable')),timeoutMs);})]);if(signal?.aborted)fail();}catch{fail();}finally{clearTimeout(timer);signal?.removeEventListener('abort',abort);}
 const at=(now??Date.now)();
 if(!row||!Number.isSafeInteger(at)||at<a.startAt||at>=a.expiresAt||row.trial_id!==a.trialId||row.scope_hash!==d.scopeHash||row.start_at!==a.startAt||row.expires_at!==a.expiresAt||row.version_id===row.base_version_id||row.confirmed_at<a.startAt||row.confirmed_at>=a.expiresAt||row.confirmed_at>at||!Number.isSafeInteger(row.acknowledged_at)||row.acknowledged_at<row.confirmed_at||row.acknowledged_at>=a.expiresAt||row.acknowledged_at>at||row.account_id!==e.accountId||row.worker_name!==e.workerName||row.source_revision!==e.sourceRevision||row.program_hash!==e.programHash||row.worker_hash!==e.workerHash||!Number.isSafeInteger(row.confirmed_at)||row.confirmed_at<0)fail();
 return createSuccessorDeploymentReader({pins:{accountId:e.accountId,workerName:e.workerName,sourceRevision:e.sourceRevision,programHash:e.programHash,...d,deploymentId:row.deployment_id,versionId:row.version_id,etag:row.etag},readCredential,fetchImpl,now,timeoutMs});
}
