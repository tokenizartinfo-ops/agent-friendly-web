import {stageAlarmFixture} from './fixtures/finite-alarm-handoff.mjs';
import {finiteAdmissionIdentity} from '../lib/mcp-own-finite-cleanup-proof.mjs';
import {finiteHash} from '../lib/mcp-finite-evidence.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import * as controls from '../lib/mcp-qa-finite-trial-control.mjs';
import {finiteFixture} from './fixtures/qa-finite-trial.mjs';
import {finiteProofFixture} from './fixtures/finite-cleanup-proof.mjs';
const api=await import('../lib/mcp-qa-finite-trial-guard.mjs').catch(()=>({}));
const stores=await import('../lib/mcp-qa-finite-cleanup-store.mjs').catch(()=>({}));
test('finite guard and fixed native alarm adapter are available',()=>{
 for(const k of ['createPrivateQaFiniteTrialGuard','runPrivateQaFiniteTrialAlarm'])assert.equal(typeof api[k],'function');
});
async function setup({missing,pending=false,ownNamespace,coupled=false}={}){
 const f=finiteFixture(),base=f.storage.transaction;f.storage.transaction=fn=>base.call(f.storage,tx=>fn({...tx,deleteAlarm:()=>tx.setAlarm(null)}));
 if(ownNamespace)f.env.AFW_RELEASE_EVENTS_NODE=ownNamespace(f.plan);
 let store,armed;
 f.primary.effect=async kind=>{const r=await store.read();if(r.status!=='observed')return null;return {purpose:'afw.qa-finite-effect-eligibility.v1',intentId:f.plan.intentId,controlHash:armed.controlHash,kind,proofHash:r.record.proofHash,observedAt:f.now(),eligible:true,evidenceHash:'a'.repeat(64)};};
 if(pending)f.primary.finalizer=async()=>{throw Error('synthetic unavailable first finalizer');};
 const opts=f.options(controls),handoff=coupled?await stageAlarmFixture(f,opts):null;
 let control=controls.createPrivateQaFiniteTrialControl({...opts,...handoff?{alarmHandoff:handoff.token}:{}});armed=await control.prepare();assert.equal(armed.status,pending?'uncertain':'armed');if(pending)armed=await control.read();
 const proof=finiteProofFixture({fixture:f,controlHash:armed.controlHash});store=stores.createPrivateQaFiniteCleanupStore({storage:f.storage,control:proof.control,now:f.now});
 const calls=[],receipts=new Map();
 const withdrawal={purpose:'afw.own-permissions-only-reduction.v1',monitoringWithdrawn:true,readWithdrawn:true,permissionsWithdrawn:true,runtimeStopRequested:false,physicalStopVerified:false,nativeWithdrawalVerified:false,operationalReadiness:false};
 const values={withdraw:withdrawal,close:{closed:true,runtimeStopRequested:true},seal:{sealHash:proof.proof.sealHash,sealedAt:f.plan.C0}};
 const capabilities={identity:proof.control,readPrimary:f.primary.admission,proof:{read:()=>store.capture(async challenge=>{const at=f.now(),support={...proof.support,primary:{...proof.support.primary,observedAt:at},providerBefore:{...proof.support.providerBefore,observedAt:at},providerAfter:{...proof.support.providerAfter,observedAt:at}};return {proof:{...proof.proof,proofChallenge:challenge,observedAt:at,primarySnapshotHash:finiteHash(support.primary),providerAbsenceHash:finiteHash([support.providerBefore,support.providerAfter]),evidenceHash:finiteHash({proofChallenge:challenge,sealHash:proof.proof.sealHash,support})},support};})}};
 for(const kind of ['withdraw','close','seal','canary_restore'])capabilities[kind]={
  execute:async({claim,proofHash})=>{
   calls.push(kind);assert.equal(claim.phase,'issued');
   const state=f.rows.get('afw.qa-finite-guard.v1:'+f.plan.intentId+':state');assert.ok(state.deliveries>=1);
   assert.equal(f.alarm,handoff?handoff.initialC0:state.nextAt); // recovery committed BEFORE this effect
   if(kind===missing)throw Error('synthetic lost provider ACK');
   const receipt=kind==='canary_restore'?{purpose:'afw.finite-canary-restored.v1',intentId:f.plan.intentId,controlHash:armed.controlHash,proofHash,versionId:f.plan.deployments.canaryClosed.versionId,deploymentId:'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',readbackHash:'f'.repeat(64),observedAt:f.now()}:values[kind];
   receipts.set(kind,receipt);
  },
  reconcile:async()=>receipts.get(kind)??null
 };
 
 const options=()=>({ctx:f.ctx,env:f.env,control,capabilities,now:f.now});
 return {f,store,calls,capabilities,handoff,options,reconstruct:()=>{control=controls.createPrivateQaFiniteTrialControl(f.options(controls));},control};
}
test('nominal death and reconstruction leave durable cleanup independent of live nominal grant',async()=>{
 const x=await setup(),guard=api.createPrivateQaFiniteTrialGuard(x.options());assert.equal((await guard.arm()).status,'armed');
 await x.control.claimEffect('nominal');x.reconstruct();x.f.setNow(x.f.plan.C0+3);
 const result=await api.createPrivateQaFiniteTrialGuard(x.options()).alarm();assert.equal(result.status,'complete');assert.deepEqual(x.calls,['withdraw','close','seal','canary_restore']);assert.equal(x.f.alarm,null);
 assert.equal((await x.store.completion()).status,'complete');
 x.f.setNow(x.f.plan.C1+1);assert.equal((await x.store.read()).status,'observed');
});
test('unknown issued effects reconcile read only across at most three deliveries',async()=>{
 const x=await setup({missing:'withdraw'});await api.createPrivateQaFiniteTrialGuard(x.options()).arm();
 for(let n=0;n<3;n++){x.reconstruct();x.f.setNow(x.f.plan.C0+n*60000+3);assert.equal((await api.createPrivateQaFiniteTrialGuard(x.options()).alarm()).status,'admin_pending');}
 assert.deepEqual(x.calls,['withdraw','close','seal']);assert.equal(x.f.alarm,null);
 assert.equal((await api.createPrivateQaFiniteTrialGuard(x.options()).alarm()).status,'admin_pending');assert.deepEqual(x.calls,['withdraw','close','seal']);
 assert.equal((await x.store.completion()).status,'not_yet_observed');
});
test('guard rejects unqualified actual profile and inherited-history substitution before arm',async()=>{
 for(const mode of ['profile','history','containment','resources']){const x=await setup();
  if(mode==='profile')x.f.env.AFW_RELEASE_OPERATOR_ENABLED='false';
  else {const primary=x.capabilities.readPrimary;x.capabilities.readPrimary=async()=>{const p=await primary();if(mode==='history')p.legacyPreparedHash='0'.repeat(64);else if(mode==='resources')p.resources.containerId='0'.repeat(64);else p.containment.denyBeforeAccess=false;return p;};}
  assert.equal((await api.createPrivateQaFiniteTrialGuard(x.options()).arm()).status,'admin_pending');assert.equal(x.calls.length,0);
 }
});

test('delayed synthetic STOP is observed on second delivery without spending proof early or resending close',async()=>{
 const x=await setup(),base=x.capabilities.proof.read;let observations=0;
 x.capabilities.proof.read=async()=>{observations++;if(x.f.now()<x.f.plan.C0+45000)return {status:'not_yet_observed'};return base();};
 await api.createPrivateQaFiniteTrialGuard(x.options()).arm();x.f.setNow(x.f.plan.C0+3);
 assert.equal((await api.createPrivateQaFiniteTrialGuard(x.options()).alarm()).status,'admin_pending');
 assert.equal(x.f.alarm,x.f.plan.C0+60000);assert.equal(x.f.rows.has('afw.qa-finite-cleanup.v1:'+x.f.plan.intentId+':capture'),false);
 x.reconstruct();x.f.setNow(x.f.plan.C0+60003);
 assert.equal((await api.createPrivateQaFiniteTrialGuard(x.options()).alarm()).status,'complete');
 assert.equal(observations,2);assert.deepEqual(x.calls,['withdraw','close','seal','canary_restore']);assert.equal(x.f.alarm,null);
});

test('unavailable first finalizer leaves pending native cleanup, never nominal authority',async()=>{
 const x=await setup({pending:true});assert.equal(x.f.alarm,x.f.plan.C0);assert.equal((await x.control.claimEffect('nominal')).status,'blocked');
 x.reconstruct();x.f.setNow(x.f.plan.C0+3);
 assert.equal((await api.createPrivateQaFiniteTrialGuard(x.options()).alarm()).status,'complete');
 assert.deepEqual(x.calls,['withdraw','close','seal','canary_restore']);assert.equal((await x.store.completion()).status,'complete');
 const key='afw.qa-finite-guard.v1:'+x.f.plan.intentId+':effect:close',row=x.f.rows.get(key);x.f.rows.set(key,{...row,phase:'issued'});
 await assert.rejects(()=>x.store.completion());
});

test('native QA alarm derives fixed effects only for the retained control',async()=>{
 const rpcCalls=[];
 let observed;
 const x=await setup({ownNamespace:p=>{
  const id={toString:()=>p.resources.containerId};
  return {
   idFromName(name){assert.equal(name,'afw-own-event-first-successor-v1');return id;},
   get(value){
    assert.equal(value,id);
    return {
     async withdrawFiniteTrialPermissions(){rpcCalls.push('withdraw');},
     async closeFiniteTrial(){rpcCalls.push('close');},
     async readFiniteTrialReductionReceipts(){
      return {
       withdraw:{purpose:'afw.own-permissions-only-reduction.v1',monitoringWithdrawn:true,readWithdrawn:true,
        permissionsWithdrawn:true,runtimeStopRequested:false,physicalStopVerified:false,nativeWithdrawalVerified:false,operationalReadiness:false},
       close:{closed:true,runtimeStopRequested:true}
      };
     },
     async sealFiniteTrialAdmission(){
      rpcCalls.push('seal');
      const identity=finiteAdmissionIdentity(x.capabilities.identity);
      const purpose='afw.own-finite-admission.v1',identityHash=finiteHash({purpose,identity});
      const seal={purpose:purpose+':seal',identityHash,sealedAt:x.f.now()};
      observed={status:'observed',identity,identityHash,sealed:true,seal,sealHash:finiteHash(seal),
       writers:{},unresolvedWriters:0,launchNeverIssued:true,authorizesEffects:false,operationalReadiness:false};
     },
     async readFiniteTrialAdmissionJournal(){return observed;},
     async readFiniteTrialCleanupReadiness(){rpcCalls.push('ready');return {status:'not_yet_observed'};}
    };
   }
  };
 }});
 const headKey='afw.qa-finite-trial.v1:head',original=x.f.rows.get(headKey);
 const guard=api.createPrivateQaFiniteTrialGuard(x.options());
 assert.equal((await guard.arm()).status,'armed');
 const {identity,readPrimary}=x.capabilities,p=x.f.plan;
 let loads=0;
 api.installPrivateQaFiniteNativeGuardFactory(async({ctx,env,head})=>{
  loads++;assert.equal(ctx,x.f.ctx);assert.equal(env,x.f.env);
  assert.deepEqual(head,original);
  return {ctx,env,control:x.control,now:x.f.now,capabilities:{identity,readPrimary},closureSource:{
   readPrimary:async()=>{throw Error('no native proof yet');},
   readReadCredential:async()=>{throw Error('no native proof yet');},
   readPublishCredential:async()=>{throw Error('no native proof yet');},
   qualifiedExecution:{intentId:p.intentId,controlHash:identity.controlHash,sourceRevision:p.source.revision,
    moduleHash:p.source.moduleHash,confirmationId:p.workflows.confirmation,observerId:p.workflows.bootstrap,admissionHash:'a'.repeat(64)}
  }};
 });
 x.f.setNow(p.C0+3);
 x.f.rows.set(headKey,{...original,controlHash:'b'.repeat(64)});
 assert.equal((await api.runPrivateQaFiniteTrialAlarm({ctx:x.f.ctx,env:x.f.env})).status,'admin_pending');
 assert.equal(loads,0);
 assert.deepEqual(rpcCalls,[]);

 x.f.rows.set(headKey,original);
 const result=await api.runPrivateQaFiniteTrialAlarm({ctx:x.f.ctx,env:x.f.env});
 assert.equal(result.status,'admin_pending');
 assert.equal(loads,1);
 assert.deepEqual(rpcCalls,['withdraw','close','seal','ready']);
 assert.deepEqual(x.calls,[]);
 assert.equal((await x.store.completion()).status,'not_yet_observed');
});

test('successful business close leaves the original recovery armed',async()=>{
 const x=await setup({coupled:true}),guard=api.createPrivateQaFiniteTrialGuard(x.options());assert.equal((await guard.arm()).status,'armed');
 x.f.setNow(x.f.plan.C0+3);
 assert.equal((await guard.alarm()).status,'complete');
 assert.equal(x.f.alarm,x.handoff.initialC0);
});
test('third business delivery keeps original fallback even with an unresolved effect',async()=>{
 const x=await setup({coupled:true,missing:'withdraw'});await api.createPrivateQaFiniteTrialGuard(x.options()).arm();
 for(let n=0;n<3;n++){x.reconstruct();x.f.setNow(x.f.plan.C0+n*60000+3);assert.equal((await api.createPrivateQaFiniteTrialGuard(x.options()).alarm()).status,'admin_pending');}
 assert.equal(x.f.alarm,x.handoff.initialC0);
 assert.deepEqual(x.calls,['withdraw','close','seal']);
});
