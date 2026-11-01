import {createHash} from 'node:crypto';
import {RELEASE_TARGET} from './mcp-release-operator-policy.mjs';
import {finiteCleanupPolicy,parseFiniteCleanupPolicy} from './mcp-finite-cleanup-policy.mjs';
import {finiteControlIdentity,finiteFields as fields,finiteHash as hash,finiteSame as same,finiteTime as time} from './mcp-finite-evidence.mjs';
import {validatePrivateQaFiniteCleanupProof} from './mcp-own-finite-cleanup-proof.mjs';
import {qualifyFiniteWorkerVersion,createFiniteProviderInventoryReader} from './mcp-finite-primary-inventory.mjs';
import {readFiniteTrialAfwWorkflows} from './mcp-fixed-terminal-workflows.mjs';
const ROOT='/accounts/'+RELEASE_TARGET.accountId,W=RELEASE_TARGET.workerName,OP='agent-friendly-web-release-operator';
const fail=()=>{throw Error('Finite canary restore unavailable');};
const strip=v=>Object.fromEntries(Object.entries(v).filter(([k])=>k!=='observedAt'));
/** Private one-target adapter using the existing bounded allowlisted transport.
 * Retired and no-admission remain separate evidence kinds. No fake stop flag,
 * caller URL/version, legacy journal reuse or nominal OAuth renewal. */
export function createPrivateQaFiniteCanaryRestorer({storage,control,proofStore,request,primaryRead,qualifiedExecution,now=Date.now}={}){
 const c=finiteControlIdentity(control),p=c.plan,key='afw.qa-finite-canary.v1:'+p.intentId+':send',raw=JSON.stringify(finiteCleanupPolicy(p));
 parseFiniteCleanupPolicy(raw,p);if(p.resources.applicationId!==RELEASE_TARGET.namespaceId||typeof storage?.transaction!=='function'||typeof storage?.get!=='function'||typeof proofStore?.read!=='function'||[request,primaryRead,now].some(f=>typeof f!=='function'))fail();
 const message='AFW closed canary restoration '+createHash('sha256').update(raw).digest('hex');
 const body=Object.freeze({strategy:'percentage',versions:Object.freeze([Object.freeze({version_id:p.deployments.canaryClosed.versionId,percentage:100})]),annotations:Object.freeze({'workers/message':message})});
 const provider=createFiniteProviderInventoryReader({control:c,request,now});
 const identity=fields(qualifiedExecution,['intentId','controlHash','sourceRevision','moduleHash','confirmationId','observerId','admissionHash']);
 if(identity.intentId!==p.intentId||identity.controlHash!==c.controlHash||identity.sourceRevision!==p.source.revision||identity.moduleHash!==p.source.moduleHash||identity.confirmationId!==p.workflows.confirmation||identity.observerId!==p.workflows.bootstrap)fail();
 async function run(input,send){
  const x=fields(input,['claim','proofHash']),claim=fields(x.claim,['purpose','intentId','controlHash','kind','phase','issuedAt','deadline','proofHash']);
  const entered=now(),mono=performance.now(),abort=new AbortController();let ended=false,last=entered,timer;
  const check=()=>{const at=now();if(ended||abort.signal.aborted||!time(at)||at<last||at<p.C0||at>=p.C1||at-entered>=30000||performance.now()-mono>=30000)fail();last=at;return at;};
  const get=async(path,query)=>{check();const r=await request({method:'GET',path:ROOT+path,...(query?{query}:{}),signal:abort.signal},check);check();if(r?.success!==true||r.status!==200||!Array.isArray(r.errors)||r.errors.length)fail();return {value:r.result,info:r.result_info};};
  const pointer=(v,pin,id)=>{const d=(Array.isArray(v)?v:v?.deployments)?.[0];if(!d||d.strategy!=='percentage'||!Array.isArray(d.versions)||d.versions.length!==1||d.versions[0].version_id!==pin.versionId||d.versions[0].percentage!==100||typeof d.id!=='string'||id!==undefined&&d.id!==id)fail();return d;};
  async function qualify(mode,retained,expectedDeployment){
   const [canary,operator,closed,op,live,inventory,instances,primary]=await Promise.all([
    get('/workers/scripts/'+W+'/deployments'),get('/workers/scripts/'+OP+'/deployments'),
    get('/workers/workers/'+W+'/versions/'+p.deployments.canaryClosed.versionId,{include:'modules'}),
    get('/workers/workers/'+OP+'/versions/'+p.deployments.operatorClosed.versionId,{include:'modules'}),
    mode==='live'?get('/workers/workers/'+W+'/versions/'+p.deployments.canaryLive.versionId,{include:'modules'}):Promise.resolve(null),
    readFiniteTrialAfwWorkflows({read:get,assertCurrent:check,phase:'canary_restore',confirmationId:p.workflows.confirmation,observerId:p.workflows.bootstrap,qualifiedExecution:identity}),
    provider({signal:abort.signal,assertCurrent:check}),primaryRead()
   ]);check();
   pointer(operator.value,p.deployments.operatorClosed,p.deployments.operatorClosed.deploymentId);
   qualifyFiniteWorkerVersion({metadata:closed.value,pin:p.deployments.canaryClosed,role:'canary',closed:true});
   qualifyFiniteWorkerVersion({metadata:op.value,pin:p.deployments.operatorClosed,role:'operator',closed:true});
   if(live)qualifyFiniteWorkerVersion({metadata:live.value,pin:p.deployments.canaryLive,role:'canary',closed:false});
   if(!same(strip(primary),strip(retained.support.primary))||!same(strip(instances),strip(retained.support.providerAfter))||primary.observedAt<retained.capturedAt)fail();
   const d=pointer(canary.value,mode==='live'?p.deployments.canaryLive:p.deployments.canaryClosed,mode==='live'?p.deployments.canaryLive.deploymentId:expectedDeployment);
   if(mode==='closed'&&d.annotations?.['workers/message']!==message)fail();
   for(const name of [W,OP])for(const part of ['schedules','tails']){const v=(await get('/workers/scripts/'+name+'/'+part)).value,a=Array.isArray(v)?v:v?.schedules;if(!Array.isArray(a)||a.length)fail();}
   return {deployment:d,readbackHash:hash({canary:d,operator:operator.value,inventory,instances,primary,closed:closed.value.id,module:p.deployments.canaryClosed.module})};
  }
  const work=async()=>{
   check();
   const recorded=await storage.get('afw.qa-finite-trial.v1:'+p.intentId+':effect:canary_restore');check();
   if(!same(recorded,claim)||claim.purpose!=='afw.qa-finite-trial.v1:effect'||claim.intentId!==p.intentId||claim.controlHash!==c.controlHash||claim.kind!=='canary_restore'||claim.phase!=='issued'||claim.deadline!==p.C1||claim.proofHash!==x.proofHash)fail();
   const proof=await proofStore.read();check();if(proof.status!=='observed'||proof.record.proofHash!==x.proofHash)fail();const r=proof.record;
   validatePrivateQaFiniteCleanupProof({proof:r.proof,support:r.support,control:c,expectedChallenge:r.proof.proofChallenge,now:check});
   // Explicit finite union branch; legacy handoff consumer is never bypassed.
   if(r.proof.kind==='sealed_without_admission'){if(r.proof.launchNeverIssued!==true)fail();}
   else if(r.proof.kind==='retired_process'){if(r.proof.retirementHandoff.physicalStopVerified!==true)fail();}else fail();
   const previous=await storage.get(key);check();let deploymentId;
   if(send){
    if(previous!==undefined)fail();await qualify('live',r);check();
    const retainedAgain=await proofStore.read();check();if(!same(retainedAgain.record,r))fail();
    const journal={purpose:'afw.finite-canary-send.v1',controlHash:c.controlHash,proofHash:x.proofHash,claimHash:hash(claim),bodyHash:hash(body),issuedAt:check()};
    await storage.transaction(async tx=>{check();if(await tx.get(key)!==undefined)fail();check();await tx.put(key,journal);check();});check();
    // One final exact pointer read; no blind override of a foreign deployment.
    pointer((await get('/workers/scripts/'+W+'/deployments')).value,p.deployments.canaryLive,p.deployments.canaryLive.deploymentId);check();
    const response=await request({method:'POST',path:ROOT+'/workers/scripts/'+W+'/deployments',body,signal:abort.signal},check);check();
    if(response?.success!==true||![200,201].includes(response.status)||typeof response.result?.id!=='string')fail();deploymentId=response.result.id;
   }else{
    const j=fields(previous,['purpose','controlHash','proofHash','claimHash','bodyHash','issuedAt']);
    if(j.purpose!=='afw.finite-canary-send.v1'||j.controlHash!==c.controlHash||j.proofHash!==x.proofHash||j.claimHash!==hash(claim)||j.bodyHash!==hash(body)||!time(j.issuedAt)||j.issuedAt<claim.issuedAt||j.issuedAt>=p.C1)fail();
   }
   const first=await qualify('closed',r,deploymentId);check();
   const final=pointer((await get('/workers/scripts/'+W+'/deployments')).value,p.deployments.canaryClosed,first.deployment.id);check();
   if(final.annotations?.['workers/message']!==message)fail();
   return Object.freeze({purpose:'afw.finite-canary-restored.v1',intentId:p.intentId,controlHash:c.controlHash,proofHash:x.proofHash,versionId:p.deployments.canaryClosed.versionId,deploymentId:final.id,readbackHash:first.readbackHash,observedAt:check()});
  };
  try{return await Promise.race([work(),new Promise((_,reject)=>{timer=setTimeout(()=>{ended=true;abort.abort();reject(Error('Finite restore unavailable'));},Math.max(1,Math.min(30000,p.C1-entered)));})]);}catch{if(!send)return null;fail();}finally{ended=true;clearTimeout(timer);abort.abort();}
 }
 return Object.freeze({execute:input=>run(input,true),reconcile:input=>run(input,false)});
}
