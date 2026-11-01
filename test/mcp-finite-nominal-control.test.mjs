import {finiteAdmissionIdentity} from '../lib/mcp-own-finite-cleanup-proof.mjs';
import {finiteProofFixture} from './fixtures/finite-cleanup-proof.mjs';
import {finiteHash} from '../lib/mcp-finite-evidence.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import {createFiniteAdmissionGate} from '../lib/mcp-own-finite-admission-gate.mjs';
import {finiteGateFixture} from './fixtures/finite-admission-gate.mjs';
import {nominalFixture} from './fixtures/finite-nominal-control.mjs';
import * as controlApi from '../lib/mcp-qa-finite-trial-control.mjs';
import {finiteFixture} from './fixtures/qa-finite-trial.mjs';
test('only actual issued nominal claim permits children after nominalEligible is spent',async()=>{
 const f=finiteFixture(),ctl=controlApi.createPrivateQaFiniteTrialControl(f.options(controlApi));
 await ctl.prepare();assert.equal((await ctl.readNominalControl()).status,'blocked');
 const issued=await ctl.claimEffect('nominal');assert.equal(issued.status,'issued');assert.equal((await ctl.read()).nominalEligible,false);
 const view=await ctl.readNominalControl();assert.equal(view.status,'observed');assert.deepEqual(view.value.claim,issued.claim);
 const rebuilt=controlApi.createPrivateQaFiniteTrialControl(f.options(controlApi));assert.equal((await rebuilt.readNominalControl()).status,'observed');
 await ctl.withdrawNominal();assert.equal((await rebuilt.readNominalControl()).status,'blocked');
});
for(const mode of ['pending','missing_claim','withdrawn','wrong_source','expiry','narrow_consent','held_read']){
 test('every finite begin rejects '+mode+' while seal remains available',async()=>{
  const f=finiteGateFixture(),q=nominalFixture(f.identity);let reads=0;
  const read=async()=>{reads++;const v=structuredClone(q.value);
   if(mode==='pending')v.phase='pending';if(mode==='missing_claim')v.claim=null;if(mode==='withdrawn')v.withdrawnAt=f.identity.T0;
   if(mode==='wrong_source')v.sourceRevision='f'.repeat(40);if(mode==='expiry')f.setTime(f.identity.N1);
   if(mode==='narrow_consent')v.consent.expiresAt=f.identity.T0;
   if(mode==='held_read'&&reads===2)f.setTime(f.identity.N1);
   return v;
  };
  const gate=createFiniteAdmissionGate({...f.options,readNominalControl:read,nominalIdentity:q.nominalIdentity});
  for(const kind of ['Reservation','Admission','Launch'])assert.equal((await gate['begin'+kind]()).status,'blocked');
  assert.equal((await gate.read()).unresolvedWriters,0);assert.equal((await gate.seal()).status,'sealed');
 });
}

test('child primary permits exact pending own admission, rejects identical counts for another writer',async()=>{
 const f=finiteFixture();let nativeJournal,writers;
 f.primary.nominal=async()=>{const primary=f.admission();primary.quiescence={currentWriters:1,newScopeWriters:1,unresolvedWrites:1,completeInventory:true,inventoryHash:finiteHash(writers),receiptsHash:finiteHash(nativeJournal),snapshotHash:'1'.repeat(64)};return {purpose:'afw.qa-finite-child-primary.v1',primary,nativeJournal,writers};};
 const ctl=controlApi.createPrivateQaFiniteTrialControl(f.options(controlApi));const armed=await ctl.prepare();await ctl.claimEffect('nominal');
 const proof=finiteProofFixture({fixture:f,controlHash:armed.controlHash}),g=structuredClone(proof.support.gate),p=f.plan;
 g.sealed=false;g.seal=null;g.sealHash=null;
 const claim={purpose:'afw.own-finite-admission.v1:writer',identityHash:g.identityHash,kind:'admission',issuedAt:p.T0,deadline:p.N1};
 g.writers.admission={claim,settlement:null};g.unresolvedWriters=1;nativeJournal=g;
 const own={intentId:p.intentId,controlHash:armed.controlHash,actorId:p.resources.containerId,kind:'admission',claimHash:finiteHash(claim),phase:'issued',current:true,newScope:true,unresolved:true};writers=[own];
 assert.equal((await ctl.readNominalControl()).status,'observed');
 for(const patch of [{actorId:'f'.repeat(64)},{controlHash:'f'.repeat(64)},{kind:'launch'},{claimHash:'f'.repeat(64)},{phase:'unknown'}]){
  writers=[{...own,...patch}];assert.equal((await ctl.readNominalControl()).status,'blocked');
 }
 writers=[own,{...own,kind:'launch'}];assert.equal((await ctl.readNominalControl()).status,'blocked');
});
test('candidate independently matches child exclusions against its own exact journal',async()=>{
 const f=finiteGateFixture(),g=createFiniteAdmissionGate(f.options);assert.equal((await g.beginAdmission()).status,'issued');
 assert.equal((await g.beginLaunch()).status,'issued');
 const h=finiteGateFixture(),base=h.options.readNominalControl;
 h.options.readNominalControl=async()=>{const v=await base();return {...v,ownedWriters:v.ownedWriters.map(x=>({...x,actorId:'f'.repeat(64)}))};};
 const other=createFiniteAdmissionGate(h.options);assert.equal((await other.beginAdmission()).status,'issued');assert.equal((await other.beginLaunch()).status,'blocked');
 assert.equal((await other.read()).writers.launch,null);
});

test('actual Task1 narrower observed consent claim admits before its deadline and never extends it',async()=>{
 const f=finiteFixture(),original=f.primary.admission,end=f.plan.T0+250000;
 f.primary.admission=async()=>{const p=await original();p.consent.expiresAt=end;return p;};
 const ctl=controlApi.createPrivateQaFiniteTrialControl(f.options(controlApi));const armed=await ctl.prepare();assert.equal(armed.status,'armed');
 const claim=await ctl.claimEffect('nominal');assert.equal(claim.claim.deadline,end);assert.ok(end<f.plan.selectors.expiresAt);
 const identity=finiteAdmissionIdentity({plan:f.plan,planHash:armed.planHash,controlHash:armed.controlHash}),g=finiteGateFixture(f.plan.T0);
 const gate=createFiniteAdmissionGate({...g.options,identity,nominalIdentity:{sourceRevision:f.plan.source.revision,runtimeVersionId:f.plan.deployments.qaLive.versionId,actorId:f.plan.resources.actorId,monitorHash:f.plan.monitorHash,consentExpiresAt:f.plan.selectors.expiresAt},readNominalControl:async()=>(await ctl.readNominalControl()).value,now:f.now});
 assert.equal((await gate.beginReservation()).status,'issued');const before=JSON.stringify([...g.rows]);
 f.setNow(end);assert.equal((await gate.beginAdmission()).status,'blocked');assert.equal(JSON.stringify([...g.rows]),before);
 assert.equal((await gate.read()).writers.admission,null);
});
