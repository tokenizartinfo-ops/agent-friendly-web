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
