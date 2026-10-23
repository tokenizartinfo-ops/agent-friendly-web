import {WorkerEntrypoint,WorkflowEntrypoint} from 'cloudflare:workers';
import {createHash} from 'node:crypto';
import {checkOwnCronProvider} from '../../scripts/check-own-cron-provider.mjs';
import {createClosedPublication} from '../../lib/mcp-closed-publication.mjs';
import {createActivationJournal} from '../../lib/mcp-activation-journal.mjs';
import {createActivationObserver} from '../../lib/mcp-activation-observer.mjs';
import {validateReleaseOperatorBundle,resolveNamedActivationPlan,RELEASE_TARGET} from '../../lib/mcp-release-operator-policy.mjs';

// Build-time inputs, not RPC arguments or public environment metadata.
const bundle=globalThis.__AFW_RELEASE_OPERATOR_BUNDLE__;
const closedHttp={fetch(){return new Response(null,{status:404,headers:{'Cache-Control':'no-store'}});}};
export default closedHttp;
async function runReleaseOperator(env,args,lease){
  const fail=()=>{throw Error('Release operator unavailable');};
  let timer;
  const controller=new AbortController();
  try{
   if(args.length!==1||typeof args[0]!=='string'||env.AFW_RELEASE_OPERATOR_ENABLED!=='true')fail();
   validateReleaseOperatorBundle(bundle);
   if(args[0]!==createHash('sha256').update(JSON.stringify(bundle)).digest('hex'))fail();
   const {artifact,policy}=bundle;
   let named;const namespace=env.AFW_RELEASE_EVENTS_NODE;
   const check=()=>{const now=Date.now();if(env.AFW_RELEASE_OPERATOR_ENABLED!=='true'||controller.signal.aborted||now<policy.startAt||now>=policy.expiresAt||lease&&!lease.current())fail();if(named){if(env.AFW_RELEASE_EVENTS_NODE!==namespace)fail();named.current();}return now;};
   const remaining=()=>Math.min(policy.expiresAt-Date.now(),lease?lease.remaining():Infinity);
   check();timer=setTimeout(()=>controller.abort(),remaining());
   if(policy.operation==='confirm_named')named=resolveNamedActivationPlan(bundle,namespace);
   const db=env.RELEASE_DB;if(!db?.withSession)fail();
   const readCredential=async()=>{check();const value=env[policy.operation==='publish'?'AFW_RELEASE_PUBLISH_TOKEN':'AFW_RELEASE_READ_TOKEN'];if(typeof value!=='string'||!/^[-A-Za-z0-9_]{16,4096}$/.test(value))fail();return value;};
   await readCredential();check();
   // All provider requests remain under the same finite operator window.
   const fetchImpl=async(url,init)=>{check();const result=await fetch(url,init);check();return result;};
   if(policy.operation==='publish'){
    const result=await createClosedPublication({db,artifact,pins:policy.pins,readCredential,fetchImpl,now:lease?check:undefined,timeoutMs:Math.min(60000,remaining())}).publish(controller.signal);
    check();return result;
   }
   // Do not confirm a receipt for a different build or administrative target.
   const row=await db.withSession('first-primary').prepare('SELECT account_id,worker_name,source_revision,source_tree,program_hash,worker_hash FROM dossier_publication_attempts WHERE artifact_key=?').bind(policy.plan.artifactKey).first();check();
   if(!row||row.account_id!==RELEASE_TARGET.accountId||row.worker_name!==RELEASE_TARGET.workerName||row.source_revision!==artifact.sourceRevision||row.source_tree!==artifact.sourceTree||row.program_hash!==artifact.programHash||row.worker_hash!==artifact.workerHash)fail();
   const expectedKey=createHash('sha256').update(JSON.stringify([row.account_id,row.worker_name,row.worker_hash])).digest('hex');if(expectedKey!==policy.plan.artifactKey)fail();
   const reader=createActivationObserver({...policy.observation,readCredential,fetchImpl});
   const observe=async(...args)=>{check();const result=await reader(...args);check();return result;};
   const result=await createActivationJournal({db,plan:named?.plan??policy.plan,observe,now:lease?check:undefined,timeoutMs:Math.min(20000,remaining())}).confirm(controller.signal);
   check();return result;
  }catch{fail();}finally{clearTimeout(timer);controller.abort();}
}
export class AfwReleaseOperator extends WorkerEntrypoint {
 run(...args){return runReleaseOperator(this.env,args);}
}

/** Administrative API adapter only. Named confirmation requires its own opt-in.
 * No schedule, HTTP or client event consumer. */
export class AfwReleaseWorkflow extends WorkflowEntrypoint {
 async run(event,step){
  const outcome=status=>({status,mayRetry:false,operationalReadiness:false});
  const env=this.env;let policy,expectedHash;
  try{
   if(env.AFW_RELEASE_OPERATOR_ENABLED!=='true'||env.AFW_RELEASE_WORKFLOW_ENABLED!=='true')return outcome('blocked');
   validateReleaseOperatorBundle(bundle);policy=bundle.policy;
   expectedHash=createHash('sha256').update(JSON.stringify(bundle)).digest('hex');
   const rawPayload=event?.payload;
   const payload=typeof rawPayload==='string'&&rawPayload===JSON.stringify({planHash:expectedHash})?{planHash:expectedHash}:rawPayload;
   if(policy.operation!=='publish'&&(policy.operation!=='confirm_named'||env.AFW_RELEASE_CONFIRMATION_WORKFLOW_ENABLED!=='true')||event?.schedule!==undefined||event?.instanceId!=='afw-release-'+expectedHash||!payload||Object.getPrototypeOf(payload)!==Object.prototype||Reflect.ownKeys(payload).length!==1||!Object.hasOwn(payload,'planHash')||payload.planHash!==expectedHash)return outcome('blocked');
  }catch{return outcome('blocked');}
  const admittedAt=Date.now(),admittedMono=performance.now(),monotonicEnd=admittedMono+(policy.expiresAt-admittedAt);
  let lastWall=admittedAt,lastMono=admittedMono;
  const current=()=>{try{const now=Date.now(),mono=performance.now();if(env.AFW_RELEASE_OPERATOR_ENABLED!=='true'||env.AFW_RELEASE_WORKFLOW_ENABLED!=='true'||policy.operation==='confirm_named'&&env.AFW_RELEASE_CONFIRMATION_WORKFLOW_ENABLED!=='true'||!Number.isSafeInteger(now)||!Number.isFinite(mono)||mono<lastMono||mono>=monotonicEnd||now<lastWall||now<policy.startAt||now>=policy.expiresAt)return false;lastWall=now;lastMono=mono;return true;}catch{return false;}};
  const remaining=()=>Math.max(1,Math.floor(Math.min(policy.expiresAt-Date.now(),monotonicEnd-performance.now())));
  if(!current())return outcome('blocked');
  try{
   return await step.do(policy.operation==='publish'?'publish-closed-release':'confirm-named-activation',{retries:{limit:0,delay:1000,backoff:'constant'},timeout:Math.min(70000,remaining())},async()=>{
    if(!current())return outcome('blocked');
    const gate=await checkOwnCronProvider({fetchImpl:(url,init)=>fetch(url,{...init,redirect:'manual'}),timeoutMs:Math.min(5000,remaining())});
    if(!current()||gate.providerGate!=='resolved'||gate.mayRunClosedVerification!==true)return outcome('blocked');
    try{
     const result=await runReleaseOperator(env,[expectedHash],{current,remaining});
     if(!current())return outcome('uncertain');
     if(policy.operation==='confirm_named'){
      if(result?.mayLaunch!==false||result.activationKey!==policy.plan.activationKey||result.versionId!==policy.observation.versionId||result.deploymentId!==policy.observation.deploymentId||!Number.isSafeInteger(result.confirmedAt)||result.confirmedAt<policy.startAt||result.confirmedAt>=policy.expiresAt||result.confirmedAt>Date.now())return outcome('uncertain');
      return {...outcome('confirmed'),receipt:{activationKey:result.activationKey,versionId:result.versionId,deploymentId:result.deploymentId}};
     }
     if(result?.mayDeploy!==false||typeof result.artifactKey!=='string'||!/^[a-f0-9]{64}$/.test(result.artifactKey)||typeof result.versionId!=='string'||!/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(result.versionId))return outcome('uncertain');
     return {...outcome('confirmed'),receipt:{artifactKey:result.artifactKey,versionId:result.versionId}};
    }catch{return outcome('uncertain');}
   });
  }catch{return outcome('uncertain');}
 }
}
