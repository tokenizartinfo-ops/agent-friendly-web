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
async function setup({missing}={}){
 const f=finiteFixture(),base=f.storage.transaction;f.storage.transaction=fn=>base.call(f.storage,tx=>fn({...tx,deleteAlarm:()=>tx.setAlarm(null)}));
 let store,armed;
 f.primary.effect=async kind=>{const r=await store.read();if(r.status!=='observed')return null;return {purpose:'afw.qa-finite-effect-eligibility.v1',intentId:f.plan.intentId,controlHash:armed.controlHash,kind,proofHash:r.record.proofHash,observedAt:f.now(),eligible:true,evidenceHash:'a'.repeat(64)};};
 let control=controls.createPrivateQaFiniteTrialControl(f.options(controls));armed=await control.prepare();assert.equal(armed.status,'armed');
 const proof=finiteProofFixture({fixture:f,controlHash:armed.controlHash});store=stores.createPrivateQaFiniteCleanupStore({storage:f.storage,control:proof.control,now:f.now});
 const calls=[],receipts=new Map();
 const withdrawal={purpose:'afw.own-permissions-only-reduction.v1',monitoringWithdrawn:true,readWithdrawn:true,permissionsWithdrawn:true,runtimeStopRequested:false,physicalStopVerified:false,nativeWithdrawalVerified:false,operationalReadiness:false};
 const values={withdraw:withdrawal,close:{closed:true,runtimeStopRequested:true},seal:{sealHash:proof.proof.sealHash,sealedAt:f.plan.C0}};
 const capabilities={identity:proof.control,readPrimary:f.primary.admission,proof:{read:()=>store.capture(async challenge=>({proof:{...proof.proof,proofChallenge:challenge,evidenceHash:finiteHash({proofChallenge:challenge,sealHash:proof.proof.sealHash,support:proof.support})},support:proof.support}))}};
 for(const kind of ['withdraw','close','seal','canary_restore'])capabilities[kind]={
  execute:async({claim,proofHash})=>{
   calls.push(kind);assert.equal(claim.phase,'issued');
   const state=f.rows.get('afw.qa-finite-guard.v1:'+f.plan.intentId+':state');assert.ok(state.deliveries>=1);
   assert.equal(f.alarm,state.nextAt); // recovery committed BEFORE this effect
   if(kind===missing)throw Error('synthetic lost provider ACK');
   const receipt=kind==='canary_restore'?{purpose:'afw.finite-canary-restored.v1',intentId:f.plan.intentId,controlHash:armed.controlHash,proofHash,versionId:f.plan.deployments.canaryClosed.versionId,deploymentId:'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',readbackHash:'f'.repeat(64),observedAt:f.now()}:values[kind];
   receipts.set(kind,receipt);
  },
  reconcile:async()=>receipts.get(kind)??null
 };
 
 const options=()=>({ctx:f.ctx,env:f.env,control,capabilities,now:f.now});
 return {f,store,calls,capabilities,options,reconstruct:()=>{control=controls.createPrivateQaFiniteTrialControl(f.options(controls));},control};
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
 for(const mode of ['profile','history','containment']){const x=await setup();
  if(mode==='profile')x.f.env.AFW_RELEASE_OPERATOR_ENABLED='false';
  else {const primary=x.capabilities.readPrimary;x.capabilities.readPrimary=async()=>{const p=await primary();if(mode==='history')p.legacyPreparedHash='0'.repeat(64);else p.containment.denyBeforeAccess=false;return p;};}
  assert.equal((await api.createPrivateQaFiniteTrialGuard(x.options()).arm()).status,'admin_pending');assert.equal(x.calls.length,0);
 }
});
