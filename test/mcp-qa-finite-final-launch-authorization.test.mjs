import assert from 'node:assert/strict';
import test from 'node:test';
import {finiteFixture,ROOT,digest,hash} from './fixtures/qa-finite-trial.mjs';
import {createPrivateQaFiniteTrialNativePin,readPrivateQaFiniteControlIdentity} from '../lib/mcp-qa-finite-trial-control.mjs';
import {finiteArmedGuardState,finiteChildConfirmationBindingHash,hashFiniteLaunchRecord} from '../lib/mcp-qa-finite-launch-records.mjs';

const api=await import('../lib/mcp-qa-finite-final-launch-authorization.mjs').catch(error=>{
 if(error.code!=='ERR_MODULE_NOT_FOUND'||!error.message.includes('mcp-qa-finite-final-launch-authorization.mjs'))throw error;return {};
});
function fixture(mode){
 assert.equal(typeof api.createPrivateQaFiniteFinalLaunchAuthorization,'function');
 const f=finiteFixture(),p=f.plan;
 const id=readPrivateQaFiniteControlIdentity({nativePin:createPrivateQaFiniteTrialNativePin({
  ctx:f.ctx,env:f.env,sourceRevision:p.source.revision,
 }),raw:JSON.stringify(p)});
 const control={plan:p,planHash:id.planHash,controlHash:id.controlHash};
 const nominal={purpose:ROOT+':effect',intentId:p.intentId,controlHash:id.controlHash,kind:'nominal',phase:'issued',
  issuedAt:p.T0,deadline:p.N1,proofHash:null};
 const fields={intentId:p.intentId,finitePlanHash:id.planHash,controlHash:id.controlHash,sourceRevision:p.source.revision,
  qaVersionId:p.deployments.qaLive.versionId,actorId:p.resources.actorId,launcherId:p.workflows.launcher,
  nominalId:p.workflows.confirmation,bundleHash:p.bundleHash,nominalClaimHash:digest(ROOT+':effect',nominal)};
 const prepared={purpose:'afw.qa-finite-launch-prepared.v1',...fields,
  guardStateHash:hash(JSON.stringify(finiteArmedGuardState(id.controlHash,p.C0))),preparedAt:p.T0,...p.launchPolicy};
 f.setNow(p.launchPolicy.launchAt+1);
 const send={purpose:'afw.qa-finite-child-create-send.v1',...fields,preparedHash:hashFiniteLaunchRecord(prepared),
  bindingHash:finiteChildConfirmationBindingHash(p),issuedAt:f.now(),deadline:p.launchPolicy.lastCreateAt};
 const parent={check:f.now,deadline:f.now()+4000,signal:new AbortController().signal};
 let reads=0;
 const expiry=f.now()+50;
 const authorize=api.createPrivateQaFiniteFinalLaunchAuthorization({control,parent,
  readPermission:async()=>{reads++;return {grantHash:p.grantHash,monitorHash:p.monitorHash,valid:mode!=='withdrawn',expiresAt:expiry};},
  readFinalizer:async()=>{const value=f.finalizer();if(mode==='wrong-finalizer')value.runId++;return value;}});
 const call=(value=send)=>authorize({prepared,send:value},f.now);
 return {f,p,send,call,expiry,get reads(){return reads;}};
}
test('a valid committed launch request receives one invocation-bound authorization',async()=>{
 const x=fixture(),consume=await x.call();
 assert.equal(x.reads,1);assert.equal(consume(x.send),true);
 assert.throws(()=>consume(x.send));await assert.rejects(x.call());assert.equal(x.reads,1);
});
test('readback drift, expired permission and a foreign child are rejected',async()=>{
 const a=fixture(),expired=await a.call();a.f.setNow(a.expiry);assert.throws(()=>expired(a.send));
 const b=fixture(),consume=await b.call();assert.throws(()=>consume({...b.send,bindingHash:'0'.repeat(64)}));
 assert.throws(()=>consume(b.send));
 const c=fixture();await assert.rejects(c.call({...c.send,nominalId:'afw-release-'+'f'.repeat(64)}));assert.equal(c.reads,0);
});
for(const mode of ['withdrawn','wrong-finalizer'])test('final launch rejects '+mode,async()=>{
 const x=fixture(mode);await assert.rejects(x.call());
});
