import {stageAlarmFixture,useNativeAlarmIntent as attachNativeAlarmIntent} from './fixtures/finite-alarm-handoff.mjs';
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
async function setup({missing,pending=false,ownNamespace,coupled=false,withNotice=false}={}){
 const f=finiteFixture(),base=f.storage.transaction;f.storage.transaction=fn=>base.call(f.storage,tx=>fn({...tx,deleteAlarm:()=>tx.setAlarm(null)}));
 if(ownNamespace)f.env.AFW_RELEASE_EVENTS_NODE=ownNamespace(f.plan);
 let store,armed;
 f.primary.effect=async kind=>{const r=await store.read();if(r.status!=='observed')return null;return {purpose:'afw.qa-finite-effect-eligibility.v1',intentId:f.plan.intentId,controlHash:armed.controlHash,kind,proofHash:r.record.proofHash,observedAt:f.now(),eligible:true,evidenceHash:'a'.repeat(64)};};
 if(pending)f.primary.finalizer=async()=>{throw Error('synthetic unavailable first finalizer');};
 if(coupled)attachNativeAlarmIntent(f);
 const opts=f.options(controls),handoff=coupled?await stageAlarmFixture(f,opts):null;
 let control=controls.createPrivateQaFiniteTrialControl({...opts,...handoff?{alarmHandoff:handoff.token}:{}});armed=await control.prepare();assert.equal(armed.status,pending?'uncertain':'armed');if(pending)armed=await control.read();
 const proof=finiteProofFixture({fixture:f,controlHash:armed.controlHash});store=stores.createPrivateQaFiniteCleanupStore({storage:f.storage,control:proof.control,now:f.now});
 const calls=[],receipts=new Map();
 const withdrawal={purpose:'afw.own-permissions-only-reduction.v1',monitoringWithdrawn:true,readWithdrawn:true,permissionsWithdrawn:true,runtimeStopRequested:false,physicalStopVerified:false,nativeWithdrawalVerified:false,operationalReadiness:false};
 const notice=withNotice?{purpose:'afw.finite-native-subscription-closure.v1',subscriptionHash:'2'.repeat(64),eventId:'3'.repeat(64),httpReceipt:{status:200,httpReceivedAt:f.plan.T0+10000},withdrawn:true,cloudReviewConfirmed:false}:undefined;
 const values={withdraw:withdrawal,close:{closed:true,runtimeStopRequested:true,...(notice?{notice}:{})},seal:{sealHash:proof.proof.sealHash,sealedAt:f.plan.C0}};
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
 return {f,store,calls,capabilities,handoff,notice,options,reconstruct:()=>{control=controls.createPrivateQaFiniteTrialControl(f.options(controls));},control};
}
test('nominal death and reconstruction leave durable cleanup independent of live nominal grant',async()=>{
 const x=await setup(),guard=api.createPrivateQaFiniteTrialGuard(x.options());assert.equal((await guard.arm()).status,'armed');
 await x.control.claimEffect('nominal');x.reconstruct();x.f.setNow(x.f.plan.C0+3);
 const result=await api.createPrivateQaFiniteTrialGuard(x.options()).alarm();assert.equal(result.status,'complete');assert.deepEqual(x.calls,['withdraw','close','seal','canary_restore']);assert.equal(x.f.alarm,null);
 assert.equal((await x.store.completion()).status,'complete');
 x.f.setNow(x.f.plan.C1+1);assert.equal((await x.store.read()).status,'observed');
});
test('coupled cleanup retains the matching cloud review before the receipt service closes',async()=>{
 const x=await setup({coupled:true,withNotice:true});
 const c=x.capabilities.identity,notice=x.notice;
 const review={purpose:'afw.finite-dossier-review.v1',eventId:notice.eventId,controlHash:c.controlHash,actorHash:'4'.repeat(64),executionHash:'5'.repeat(64),resultHash:'6'.repeat(64),runId:'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',revision:c.plan.selectors.expectedProjectRevision+1,receivedAt:c.plan.T0+9999,reviewedAt:c.plan.C0-1};
 let reads=0;
 x.f.env.AFW_FINITE_DOSSIER_REVIEW_RECEIVER={async readReview(refs){
  reads++;assert.deepEqual(refs,{eventId:notice.eventId,controlHash:c.controlHash});
  assert.ok(x.f.now()<c.plan.R1);return review;
 }};
 const guard=api.createPrivateQaFiniteTrialGuard(x.options());await guard.arm();
 x.f.setNow(c.plan.C0+3);
 const outcome=await guard.alarm();
 assert.equal(outcome.status,'complete');assert.equal(reads,1);
 x.f.setNow(x.handoff.initialC0);
 delete x.f.env.AFW_FINITE_DOSSIER_REVIEW_RECEIVER;
 const readback=await x.store.completion();
 assert.deepEqual(readback.receipt.review,review);
 assert.equal(readback.receipt.notice.withdrawn,true);
 assert.equal(readback.receipt.notice.eventId,readback.receipt.review.eventId);
 assert.equal(x.f.alarm,x.handoff.initialC0);
});
test('a receiver result for another notice cannot attest a review or obstruct independent cleanup',async()=>{
 const x=await setup({coupled:true,withNotice:true}),c=x.capabilities.identity;
 x.f.env.AFW_FINITE_DOSSIER_REVIEW_RECEIVER={async readReview(){
  return {purpose:'afw.finite-dossier-review.v1',eventId:'7'.repeat(64),controlHash:c.controlHash,actorHash:'4'.repeat(64),executionHash:'5'.repeat(64),resultHash:'6'.repeat(64),runId:'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',revision:c.plan.selectors.expectedProjectRevision+1,receivedAt:c.plan.T0+9999,reviewedAt:c.plan.C0-1};
 }};
 const guard=api.createPrivateQaFiniteTrialGuard(x.options());await guard.arm();x.f.setNow(c.plan.C0+3);
 assert.equal((await guard.alarm()).status,'complete');
 const closed=await x.store.completion();assert.equal(closed.receipt.review,undefined);
 assert.equal(closed.receipt.notice.withdrawn,true);assert.equal(x.f.alarm,x.handoff.initialC0);
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
     async readFiniteTrialSealedAdmissionJournal(){return observed;},
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

test('historical completion refuses a deployment or readback that differs from the restoration journal',async()=>{
 const x=await setup(),guard=api.createPrivateQaFiniteTrialGuard(x.options());
 assert.equal((await guard.arm()).status,'armed');
 x.f.setNow(x.f.plan.C0+3);
 assert.equal((await guard.alarm()).status,'complete');
 x.f.setNow(x.f.plan.R1+60000);
 const key='afw.qa-finite-cleanup.v1:'+x.f.plan.intentId+':completion';
 const original=x.f.rows.get(key);
 assert.equal((await x.store.completion()).status,'complete');
 const changes=[
  {canaryDeploymentId:'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb'},
  {readbackHash:'b'.repeat(64)},
 ];
 for(const change of changes){
  const {receiptHash,...body}=original;
  const altered={...body,...change};
  x.f.rows.set(key,{...altered,receiptHash:finiteHash(altered)});
  await assert.rejects(()=>x.store.completion());
 }
});

test('the original alarm qualifies only the retained restoration with its own exact SEND',async()=>{
 const evidence=await import('../lib/mcp-qa-finite-original-restoration.mjs').catch(()=>({}));
 assert.equal(typeof evidence.readPrivateQaFiniteBusinessRestoreEvidence,'function');
 const x=await setup({coupled:true}),guard=api.createPrivateQaFiniteTrialGuard(x.options());
 assert.equal((await guard.arm()).status,'armed');
 x.f.setNow(x.f.plan.C0+3);
 assert.equal((await guard.alarm()).status,'complete');
 x.f.setNow(x.handoff.initialC0);
 const {f}=x,control=x.capabilities.identity;
 const check=()=>f.now();
 const snapshot=()=>evidence.readPrivateQaFiniteBusinessRestoreEvidence({ctx:f.ctx,env:f.env,check});
 const sendKey='afw.qa-finite-canary.v1:'+f.plan.intentId+':send';
 const claim=f.rows.get('afw.qa-finite-trial.v1:'+f.plan.intentId+':effect:canary_restore');
 const completion=(await x.store.completion()).receipt;
 assert.equal((await snapshot()).kind,'ambiguous');
 const {finiteCanaryRestorationBody}=await import('../lib/mcp-qa-finite-canary-restorer.mjs');
 const send={purpose:'afw.finite-canary-send.v1',controlHash:control.controlHash,proofHash:completion.proofHash,
  claimHash:finiteHash(claim),bodyHash:finiteHash(finiteCanaryRestorationBody(f.plan)),issuedAt:claim.issuedAt};
 f.rows.set(sendKey,send);
 const result=await snapshot();
 assert.equal(result.kind,'retained');
 assert.equal(result.deploymentId,completion.canaryDeploymentId);
 assert.equal(result.completionHash,completion.receiptHash);
 assert.equal(result.sendHash,finiteHash(send));
 assert.equal(typeof evidence.retainPrivateQaFinitePriorRestoration,'function');
 const key='afw.finite-original-alarm-handoff.v1:prior-restoration';
 const exact={id:result.deploymentId,strategy:'percentage',versions:[{version_id:result.versionId,percentage:100}],
  annotations:{'workers/message':result.annotation}};
 f.storage.sync=async()=>{};
 const retain=readCurrentDeployment=>evidence.retainPrivateQaFinitePriorRestoration({ctx:f.ctx,env:f.env,check,readCurrentDeployment});
 await assert.rejects(()=>retain(async()=>({...exact,id:'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb'})));
 assert.equal(f.rows.has(key),false);
 const observed=await retain(async()=>exact);
 assert.equal(observed.deploymentId,completion.canaryDeploymentId);
 assert.equal(observed.completionHash,completion.receiptHash);
 assert.equal(observed.operationalReadiness,false);
 assert.deepEqual(f.rows.get(key),observed);
 assert.deepEqual(await retain(async()=>exact),observed);
 await assert.rejects(()=>retain(async()=>({...exact,annotations:{'workers/message':'foreign'}})));
 assert.deepEqual(f.rows.get(key),observed);
 assert.equal(f.alarm,x.handoff.initialC0);
 for(const edit of [{bodyHash:'1'.repeat(64)},{issuedAt:f.plan.C1},{claimHash:'1'.repeat(64)}]){
  f.rows.set(sendKey,{...send,...edit});
  await assert.rejects(snapshot);
 }
 x.f.env.AFW_QA_VERSION={...x.f.env.AFW_QA_VERSION,id:f.plan.deployments.qaClosed.versionId};
 f.rows.set(sendKey,send);
 await assert.rejects(snapshot);
});

test('an issued business SEND without retained completion leaves original recovery uncertain',async()=>{
 const evidence=await import('../lib/mcp-qa-finite-original-restoration.mjs').catch(()=>({}));
 assert.equal(typeof evidence.readPrivateQaFiniteBusinessRestoreEvidence,'function');
 const x=await setup({coupled:true,missing:'withdraw'}),{f}=x;
 f.setNow(x.handoff.initialC0);
 const scheduled=f.alarm;
 const snapshot=()=>evidence.readPrivateQaFiniteBusinessRestoreEvidence({ctx:f.ctx,env:f.env,check:f.now});
 assert.equal((await snapshot()).kind,'no_restore');
 f.rows.set('afw.qa-finite-canary.v1:'+f.plan.intentId+':send',{purpose:'afw.finite-canary-send.v1'});
 assert.equal((await snapshot()).kind,'ambiguous');
 assert.equal(f.alarm,scheduled);
});
