// SYNTHETIC C2 provenance and external primary evidence only. No runtime hook.
// The native DO, SQLite, control, guard, parent, inventory and Workflow are real.
import {fixture,resolvePrivateQaFiniteLaunchContext as resolve,readPrivateQaFiniteLaunchMaterial} from './finite-launch-native.mjs';
import {finiteAdmissionIdentity} from '../../lib/mcp-own-finite-cleanup-proof.mjs';
import {finiteHash} from '../../lib/mcp-finite-evidence.mjs';
import {createPrivateQaFiniteTrialNativePin,readPrivateQaFiniteControlSnapshot} from '../../lib/mcp-qa-finite-trial-control.mjs';
export {fixture,readPrivateQaFiniteLaunchMaterial};
export async function resolvePrivateQaFiniteLaunchContext(options){
 const {ctx,env,refs,parent}=options,f=await fixture(ctx,env);parent.check();
 if(f.sourceUnavailable||f.setup!=='completed'||f.seed!=='original'||f.prepareSuccess===false&&Object.hasOwn(refs,'controlHash'))throw Error('SYNTHETIC provenance unavailable');
 const context=await resolve({...options,refs:{intentId:refs.intentId,sourceRevision:refs.sourceRevision??f.plan.source.revision}});parent.check();
 const m=readPrivateQaFiniteLaunchMaterial({ctx,env,context,parent});
 if(Object.hasOwn(refs,'controlHash')&&refs.controlHash!==m.execution.controlHash)throw Error('SYNTHETIC control mismatch');
 return context;
}
export async function readPrivateQaFiniteLaunchOperations(options){
 const {ctx,env,context,parent}=options,m=readPrivateQaFiniteLaunchMaterial(options),f=await fixture(ctx,env);parent.check();
 if(f.operationsUnavailable)throw Error('SYNTHETIC operations unavailable');
 const original=f.primary.admission;
 const nominal=async()=>{
  const nativePin=createPrivateQaFiniteTrialNativePin({ctx,env,sourceRevision:f.plan.source.revision});
  const s=await readPrivateQaFiniteControlSnapshot({storage:ctx.storage,nativePin,plan:m.plan,parent});parent.check();
  const identity=finiteAdmissionIdentity(s.control),nativeJournal={status:'observed',identity,identityHash:finiteHash({purpose:'afw.own-finite-admission.v1',identity}),sealed:!!f.sealed,seal:null,sealHash:null,writers:{reservation:null,admission:null,launch:null},unresolvedWriters:0,launchNeverIssued:true,authorizesEffects:false,operationalReadiness:false};
  const primary=await original();parent.check();
  primary.quiescence={currentWriters:0,newScopeWriters:0,unresolvedWrites:0,completeInventory:true,inventoryHash:finiteHash([]),receiptsHash:finiteHash(nativeJournal),snapshotHash:'1'.repeat(64)};
  return {purpose:'afw.qa-finite-child-primary.v1',primary,nativeJournal,writers:[]};
 };
 const effects=Object.fromEntries(['withdraw','close','seal','canary_restore'].map(k=>[k,{execute:async()=>{throw Error('unused synthetic cleanup');},reconcile:async()=>null}]));
 return {controlPrimary:{...f.primary,nominal},guardActions:{readPrimary:original,...effects,proof:{read:async()=>{throw Error('unused synthetic proof');}}}};
}
