import {projectFiniteSetupPrearmMaterial} from './mcp-qa-finite-policy-prearm-material.mjs';
import {readPrivateQaFinitePolicyOrigin} from './mcp-qa-finite-policy-setup-source.mjs';
import {readPrivateQaFiniteSetupPrearmContext} from './mcp-qa-finite-owner-phase-context.mjs';
import {narrowFinitePolicySetupClock,readFinitePolicySetupActorScope} from './mcp-qa-finite-policy-setup.mjs';
import {readPrivateQaFiniteCandidate} from './mcp-qa-finite-candidate-residency.mjs';
import {initialCanonical as canonical} from './mcp-qa-finite-initial-material-records.mjs';
import {retainFiniteOwnerStagePromise as retain} from './mcp-qa-finite-stage-work.mjs';

const qualifiedReads=new WeakMap();
const fail=()=>{throw Error('Finite private setup expediente unavailable');};

/** Factual-only provenance shared with the read-side owner phase. */
export function readFinitePrivateSetupPrearmScope({ctx,env,parent}){
 const source=qualifiedReads.get(parent);
 if(!source||source.ctx!==ctx||source.env!==env)fail();
 return readFinitePolicySetupActorScope({ctx,env,refs:source.refs},parent);
}

/** Fixed QA-only source mounted on the actual private actor. */
export async function readPrivateQaFiniteSetupOwnerSource({ctx,env,intentId,sourceRevision},originalLease){
 const refs={intentId,sourceRevision},options={ctx,env,refs};
 const scope=readFinitePolicySetupActorScope(options,originalLease);
 const native=await scope.child(lease=>readPrivateQaFinitePolicyOrigin({ctx,env,...refs},lease));
 narrowFinitePolicySetupClock(originalLease,native,refs,env);
 if(qualifiedReads.has(originalLease))fail();
 qualifiedReads.set(originalLease,{...options});
 let observed;
 try{observed=await readPrivateQaFiniteSetupPrearmContext({ctx,env,parent:originalLease});}
 finally{qualifiedReads.delete(originalLease);}
 const candidate=readPrivateQaFiniteCandidate();
 const material=projectFiniteSetupPrearmMaterial(observed,native,candidate);
 const {snapshot}=observed,storage=ctx.storage,db=env.RELEASE_DB,metadata=env.AFW_QA_VERSION,actor=ctx.id;
 const transaction=storage.transaction;
 const records=[
  ...snapshot.anchor.anchors.anchors,
  ...snapshot.anchor.backupRaw.filter(([key])=>!key.includes(':chunk:')),
  ...snapshot.records.inventory,
  ...snapshot.records.enrollment,
  ...snapshot.records.effects.filter(([key])=>!key.endsWith(':writer-head')),
  ...snapshot.anchor.selectionRows,
  ...snapshot.ownerFacts.tickets,
  ...snapshot.ownerFacts.projects,
  ...snapshot.ownerFacts.approvals,
  ...snapshot.ownerFacts.preparations,
  ...snapshot.ownerFacts.selections,
 ];
 const retained=new Map(records);
 if(!retained.size||retained.size!==records.length||retained.size>96||typeof transaction!=='function')fail();
 const keys=[...retained.keys()],alarm=snapshot.anchor.anchors.alarm;
 const assertCurrent=async lease=>{
  const check=()=>{
   lease.assertCurrent();readFinitePolicySetupActorScope(options,originalLease);
   if(lease.signal.aborted||ctx.storage!==storage||storage.transaction!==transaction||ctx.id!==actor||actor.toString()!==observed.ownerSource.actorId||
      env.RELEASE_DB!==db||env.AFW_QA_VERSION!==metadata||metadata.id!==native.qaVersionId||
      Date.now()>=observed.ownerSource.window.expiresAt)fail();
  };
  check();
  await retain(Reflect.apply(transaction,storage,[async tx=>{
   check();const rows=await retain(tx.get(keys));check();
   if(!(rows instanceof Map)||rows.size!==retained.size)fail();
   for(const key of keys)if(!rows.has(key)||canonical(rows.get(key))!==canonical(retained.get(key)))fail();
   const next=await retain(tx.getAlarm());check();if(next!==alarm)fail();
  }]));check();
 };
 // Re-read the same storage before handing any material to the policy producer.
 await scope.child(assertCurrent);
 return Object.freeze({native,ownerSource:observed.ownerSource,...material,assertCurrent});
}

