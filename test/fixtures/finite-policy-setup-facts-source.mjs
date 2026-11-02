// SYNTHETIC fixed native source/GitHub primary only. No real provenance claim.
// The actual readFiniteOwnerSetupFacts, current D1 owner/grant/notice reads,
// historical stage receipts, selected/witness codec and SQLite store run intact.
import {finitePolicySetupInstanceId} from '../../lib/mcp-qa-finite-policy-setup.mjs';
let seed;
export function syntheticMaterial(){if(!seed)throw Error('SYNTHETIC seed absent');return seed;}
export async function readPrivateQaFinitePolicySource({ctx,env,intentId,sourceRevision},lease){
 lease.assertCurrent();const arm=await ctx.storage.get('fixture:task4Arm'),ownerSource=await ctx.storage.get('fixture:source');lease.assertCurrent();
 if(!arm||sourceRevision!==ownerSource.sourceRevision)throw Error('SYNTHETIC native source absent');
 const T0=arm.T0,at=Date.now();
 seed={seedHash:'a'.repeat(64),seed:{intentId,sourceRevision,qaPublication:{qaLive:{versionId:env.AFW_QA_VERSION.id}}},primaryEvidence:{T0,seedStepCompletedAt:arm.commandBy,R1:T0+480000}};
 return {native:{setupInstanceId:finitePolicySetupInstanceId({intentId,sourceRevision}),sourceRevision,qaVersionId:env.AFW_QA_VERSION.id,eventTimestamp:at,queuedAt:at,startedAt:at,T0},ownerSource,originalContext:{},baseline:{},rollback:{},bytes:{},async assertCurrent(l){
  l.assertCurrent();const current=await ctx.storage.get('fixture:source');l.assertCurrent();if(JSON.stringify(current)!==JSON.stringify(ownerSource))throw Error('SYNTHETIC source drift');
 }};
}
export async function readPrivateQaFinitePolicyEntry(){throw Error('SYNTHETIC DO facts fixture only');}
export async function observeActualFacts(actual,options,lease){
 let facts;try{facts=await actual(options,lease);}catch(error){await options.ctx.storage.put('fixture:task4FactsResult',{accepted:false});throw error;}
 lease.assertCurrent();
 await options.ctx.storage.put('fixture:task4FactsResult',{accepted:true,T0:facts.material.primaryEvidence.T0,commandBy:facts.selected.preparation.commandBy,observedAt:Date.now(),selectedAt:facts.selected.selection.selectedAt,publishedAt:facts.witness.publishedAt,phase:facts.ownerSource.phase,publicationStage:facts.ownerSource.currentPublication.stage,programRevision:facts.value.programContext.sourceRevision,sourceRevision:facts.value.sourceRevision});
 // STOP before binding/context/effects: positive qualification tests this reader.
 throw Error('SYNTHETIC actual setup facts observed; no effect authority requested');
}
