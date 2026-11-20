import {createCanaryRestorationTransport} from './mcp-canary-restoration-transport.mjs';
import {finiteCleanupPolicy} from './mcp-finite-cleanup-policy.mjs';
import {finiteControlIdentity, finiteData as data, finiteFields as fields, finiteHash as hash, finiteSame as same, finiteTime as time} from './mcp-finite-evidence.mjs';
import {createFiniteProviderInventoryReader} from './mcp-finite-primary-inventory.mjs';
import {finiteAdmissionIdentity} from './mcp-own-finite-cleanup-proof.mjs';
import {createPrivateQaFiniteCanaryRestorer} from './mcp-qa-finite-canary-restorer.mjs';
import {createPrivateQaFiniteCleanupProofCollector} from './mcp-qa-finite-cleanup-collector.mjs';
import {createPrivateQaFiniteCleanupStore} from './mcp-qa-finite-cleanup-store.mjs';
import {createPrivateQaFiniteTrialNativePin} from './mcp-qa-finite-trial-control.mjs';

const CONTROL='afw.qa-finite-trial.v1';
const ADMISSION='afw.own-finite-admission.v1';
const SLOT='afw-own-event-first-successor-v1';
const fail=()=>{throw Error('Finite native closure unavailable');};

/** Compose only after the native source qualifies the exact execution and
 * custody. These operations are private to the retained QA alarm. */
export function createPrivateQaFiniteClosureCapabilities({ctx,env,identity,source,now=Date.now}={}){
 const c=finiteControlIdentity(identity),p=c.plan,storage=ctx.storage;
 const native=fields(source,['readPrimary','qualifiedExecution','readReadCredential','readPublishCredential']);
 const {readPrimary,qualifiedExecution,readReadCredential,readPublishCredential}=native;
 const ns=env.AFW_RELEASE_EVENTS_NODE,idFromName=ns?.idFromName,get=ns?.get;
 if([idFromName,get,readPrimary,readReadCredential,readPublishCredential,now].some(fn=>typeof fn!=='function'))fail();
 const actor=idFromName.call(ns,SLOT),actorKey=actor.toString();
 if(actorKey!==p.resources.containerId)fail();
 const stub=get.call(ns,actor);
 function assertBinding(){
  createPrivateQaFiniteTrialNativePin({ctx,env,sourceRevision:p.source.revision});
  if(ctx.storage!==storage||ctx.id.toString()!==p.resources.actorId||env.AFW_QA_VERSION.id!==p.deployments.qaLive.versionId||
     env.AFW_RELEASE_EVENTS_NODE!==ns||ns.idFromName!==idFromName||ns.get!==get||idFromName.call(ns,SLOT).toString()!==actorKey)fail();
 }
 assertBinding();
 function lease(assertParent){
  if(typeof assertParent!=='function')fail();
  return ()=>{
   assertParent();
   assertBinding();
   const at=now();
   if(!time(at)||at<p.C0||at>=p.C1)fail();
   return at;
  };
 }
 const controlRefs={intentId:p.intentId,controlHash:c.controlHash};
 const planRefs={intentId:p.intentId,planHash:c.planHash};

 async function rpc(method,refs,check){
  check();
  const result=await stub[method](refs);
  try{
   check();
   return data(structuredClone(result));
  }finally{result?.[Symbol.dispose]?.();}
 }
 function action(kind,send,refs,reconcile){
  async function run(input,assertParent,execute){
   const check=lease(assertParent),at=check();
   const x=fields(input,['claim','proofHash']);
   const claim=fields(x.claim,['purpose','intentId','controlHash','kind','phase','issuedAt','deadline','proofHash']);
   if(claim.purpose!==CONTROL+':effect'||claim.intentId!==p.intentId||claim.controlHash!==c.controlHash||
      claim.kind!==kind||claim.phase!=='issued'||claim.deadline!==p.C1||x.proofHash!==null||claim.proofHash!==null||
      !time(claim.issuedAt)||claim.issuedAt<p.C0||claim.issuedAt>at)fail();
   const persisted=await storage.get(CONTROL+':'+p.intentId+':effect:'+kind);
   check();
   if(!same(persisted,x.claim))fail();
   return execute?rpc(send,refs,check):reconcile(check);
  }
  return Object.freeze({execute:(x,parent)=>run(x,parent,true),reconcile:(x,parent)=>run(x,parent,false)});
 }
 const reduction=kind=>async check=>{
  const result=await rpc('readFiniteTrialReductionReceipts',controlRefs,check);
  return fields(result,['withdraw','close'])[kind];
 };
 const admissionIdentity=finiteAdmissionIdentity(c),identityHash=hash({purpose:ADMISSION,identity:admissionIdentity});
 async function readSeal(check){
  const result=await rpc('readFiniteTrialSealedAdmissionJournal',controlRefs,check);
  const journal=fields(result,['status','identity','identityHash','sealed','seal','sealHash','writers','unresolvedWriters','launchNeverIssued','authorizesEffects','operationalReadiness']);
  if(journal.status!=='observed'||!same(journal.identity,admissionIdentity)||journal.identityHash!==identityHash||
     journal.authorizesEffects!==false||journal.operationalReadiness!==false)fail();
  if(journal.sealed===false&&journal.seal===null&&journal.sealHash===null)return null;
  const seal=fields(journal.seal,['purpose','identityHash','sealedAt']);
  if(journal.sealed!==true||seal.purpose!==ADMISSION+':seal'||seal.identityHash!==identityHash||
     !time(seal.sealedAt)||seal.sealedAt<p.T0||seal.sealedAt>check()||hash(seal)!==journal.sealHash)fail();
  return {sealHash:journal.sealHash,sealedAt:seal.sealedAt};
 }

 const store=createPrivateQaFiniteCleanupStore({storage,control:c,now});
 const policy=JSON.stringify(finiteCleanupPolicy(p));
 const request=createCanaryRestorationTransport({
  finiteTrial:c,now,readControl:()=>{assertBinding();return {enabled:true,policy};},readReadCredential,readPublishCredential
 });
 const inventory=createFiniteProviderInventoryReader({control:c,request,now});
 const proof=createPrivateQaFiniteCleanupProofCollector({
  control:store,now,primaryRead:readPrimary,
  providerRead:check=>inventory({signal:new AbortController().signal,assertCurrent:check}),
  nativeProof:{
   ready:check=>rpc('readFiniteTrialCleanupReadiness',planRefs,check),
   observe:({proofChallenge},check)=>rpc('observeFiniteTrialCleanup',{...planRefs,proofChallenge},check)
  }
 });
 return Object.freeze({
  withdraw:action('withdraw','withdrawFiniteTrialPermissions',controlRefs,reduction('withdraw')),
  close:action('close','closeFiniteTrial',controlRefs,reduction('close')),
  seal:action('seal','sealFiniteTrialAdmission',planRefs,readSeal),
  proof:Object.freeze({read:parent=>proof.read(lease(parent))}),
  canary_restore:createPrivateQaFiniteCanaryRestorer({storage,control:c,proofStore:store,request,primaryRead:readPrimary,qualifiedExecution,now})
 });
}
