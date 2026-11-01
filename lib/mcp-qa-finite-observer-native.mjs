import {projectFiniteExternalPlan,validateFinitePrimaryReceipt} from './mcp-qa-finite-external-contract.mjs';
import {createPrivateQaFiniteTrialControl,createPrivateQaFiniteTrialNativePin,projectPrivateQaFiniteReferences} from './mcp-qa-finite-trial-control.mjs';
import {createPrivateQaFiniteCleanupStore,readFiniteCleanupControl} from './mcp-qa-finite-cleanup-store.mjs';
import {finiteFields as fields,finiteSame as same,finiteHash as hash,finiteHex as hex,finiteTime as time} from './mcp-finite-evidence.mjs';
import {FINITE_OBSERVER_SLOT,validateFiniteMaterialPreview} from './mcp-qa-finite-observer.mjs';
let factory;
const fail=()=>{throw Error('Finite native material unavailable');};
/** Task4 installs actual compiled producer. Absence is unavailable, never env DTO. */
export function installPrivateQaFiniteMaterialFactory(value){if(factory||typeof value!=='function')fail();factory=value;}
async function resolve(ctx,env,refs){
 if(!factory||ctx.id.toString()!==env.AFW_INDEPENDENT_CLOSURE.idFromName(FINITE_OBSERVER_SLOT).toString())fail();
 const capabilities=fields(await factory({ctx,env,refs}),['controlOptions','readFinalPrimary','custody']),options=capabilities.controlOptions;
 if(options?.storage!==ctx.storage)fail();
 createPrivateQaFiniteTrialNativePin({ctx,env,sourceRevision:refs.sourceRevision});
 return {options,capabilities,control:createPrivateQaFiniteTrialControl(options)};
}
export async function previewPrivateQaFiniteTrialMaterial({ctx,env,refs}={}){
 const x=fields(refs,['intentId','sourceRevision']);if(!hex(x.intentId)||!hex(x.sourceRevision,40))fail();
 const {control}=await resolve(ctx,env,x),p=validateFiniteMaterialPreview(await control.preview());
 if(p.intentId!==x.intentId||p.sourceRevision!==x.sourceRevision)fail();return p;
}
/** The single explicit journal mutation in the observer. Existing/uncertain
 * native claim is never upgraded to an acknowledged handoff on reconstruction. */
export async function claimPrivateQaFiniteTrialRestore({ctx,env,refs,now=Date.now}={}){
 const x=fields(refs,['intentId','controlHash','proofHash']);if(!hex(x.intentId)||!hex(x.controlHash)||!hex(x.proofHash))fail();
 const entered=now(),mono=performance.now();let last=entered,done=false,timer;
 const check=()=>{const n=now();if(done||!time(n)||n<last||n-entered>=5000||performance.now()-mono>=5000)fail();last=n;return n;};
 const work=async()=>{
  check();const c=await readFiniteCleanupControl({storage:ctx.storage,intentId:x.intentId,controlHash:x.controlHash});check();
  const p=c.plan;if(check()<p.C0||check()>=p.R1)fail();
  const store=createPrivateQaFiniteCleanupStore({storage:ctx.storage,control:c,now:check});
  const r=await store.read();check();const completion=await store.completion();check();
  if(r.status!=='observed'||r.record.proofHash!==x.proofHash||completion.status!=='complete'||completion.receipt.proofHash!==x.proofHash)fail();
  const {options,control}=await resolve(ctx,env,{intentId:x.intentId,sourceRevision:p.source.revision});check();
  if(options.plan!==JSON.stringify(p))fail();
  // control.claimEffect invokes the actual source producer's fresh qa_restore
  // eligibility (native pins + admitted finalizer), never an RPC boolean.
  const claimed=await control.claimEffect('qa_restore');check();
  if(claimed.status!=='issued'||claimed.controlHash!==x.controlHash||claimed.claim?.proofHash!==x.proofHash||claimed.claim?.deadline!==p.R1||check()>=p.R1)fail();
  const retained=await store.read(),completed=await store.completion();check();
  if(!same(retained.record,r.record)||!same(completed.receipt,completion.receipt))fail();
  return Object.freeze({purpose:'afw.finite-qa-claim-handoff.v1',claim:claimed.claim,claimHash:hash(claimed.claim)});
 };
 try{return await Promise.race([work(),new Promise((_,reject)=>{timer=setTimeout(()=>{done=true;reject(Error('Finite claim unavailable'));},5000);})]);}finally{done=true;clearTimeout(timer);}
}

/** One final native readonly first-primary receipt, not an external D1 API.
 * The source-qualified Task4 producer must enumerate held remote writers too. */
export async function readPrivateQaFiniteFinalPrimary({ctx,env,refs,now=Date.now}={}){
 const x=fields(refs,['intentId','controlHash','proofHash','claimHash']);
 if(!hex(x.intentId)||['controlHash','proofHash','claimHash'].some(k=>!hex(x[k])))fail();
 const entered=now(),mono=performance.now();let last=entered,done=false,timer;
 const check=()=>{const n=now();if(done||!time(n)||n<last||n-entered>=5000||performance.now()-mono>=5000)fail();last=n;return n;};
 const work=async()=>{
  const c=await readFiniteCleanupControl({storage:ctx.storage,intentId:x.intentId,controlHash:x.controlHash});check();const p=c.plan;
  if(check()>=p.R1)fail();
  const {options,capabilities}=await resolve(ctx,env,{intentId:x.intentId,sourceRevision:p.source.revision});check();
  if(options.plan!==JSON.stringify(p)||typeof capabilities.readFinalPrimary!=='function')fail();
  const store=createPrivateQaFiniteCleanupStore({storage:ctx.storage,control:c,now:check});
  const read=async()=>{
   const retained=await store.read(),completion=await store.completion(),claim=await ctx.storage.get('afw.qa-finite-trial.v1:'+p.intentId+':effect:qa_restore');check();
   if(retained.status!=='observed'||completion.status!=='complete'||retained.record.proofHash!==x.proofHash||hash(claim)!==x.claimHash||claim.kind!=='qa_restore'||claim.proofHash!==x.proofHash||claim.controlHash!==x.controlHash)fail();
   return {retained:retained.record,completion:completion.receipt,claim};
  };
  const before=await read();check();
  const observed=fields(await capabilities.readFinalPrimary(check),['primary','writers']);check();
  const after=await read();check();
  createPrivateQaFiniteTrialNativePin({ctx,env,sourceRevision:p.source.revision});check();
  if(!same(before,after)||check()>=p.R1)fail();
  const plan=projectFiniteExternalPlan({control:c,preview:projectPrivateQaFiniteReferences(c),custody:capabilities.custody});
  const body={purpose:'afw.finite-final-primary.v1',intentId:p.intentId,controlHash:c.controlHash,planHash:c.planHash,proofHash:x.proofHash,completionHash:before.completion.receiptHash,nativeClaimHash:x.claimHash,sealHash:before.retained.proof.sealHash,sourceRevision:p.source.revision,runtimeVersionId:p.deployments.qaLive.versionId,actorId:p.resources.actorId,closedCanaryVersionId:p.deployments.canaryClosed.versionId,closedCanaryModuleHash:p.deployments.canaryClosed.module.sha256,primary:observed.primary,writers:observed.writers,observedAt:check()};
  const receipt={...body,receiptHash:hash(body)};
  validateFinitePrimaryReceipt(receipt,plan,before.retained,before.completion,{claim:before.claim,claimHash:x.claimHash});
  return {plan,receipt};
 };
 try{return await Promise.race([work(),new Promise((_,reject)=>{timer=setTimeout(()=>{done=true;reject(Error('Finite primary unavailable'));},5000);})]);}finally{done=true;clearTimeout(timer);}
}
