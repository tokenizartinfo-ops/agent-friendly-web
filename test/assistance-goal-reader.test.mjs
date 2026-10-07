import test from 'node:test';
import assert from 'node:assert/strict';
import {projectAssistanceSignal} from '../lib/assistance-supervision-contract.mjs';
const readerContract=await import('../lib/assistance-goal-reader.mjs').catch(()=>({}));
const now=1791323200000,secret='synthetic-assistance-event-secret-minimum-32';
async function fixture(){
 const source={id:'help-'+'a'.repeat(64),projectId:'own',type:'assistance_requested',createdAt:new Date(now-1000).toISOString(),payload:{contract:'afw.assistance-request.v1',requestId:'11111111-1111-4111-8111-111111111111',expectedRevision:3,topic:'orientation'}};
 const signal=await projectAssistanceSignal(source,secret);
 const request={eventId:signal.eventId,projectRef:signal.projectRef,runId:'22222222-2222-4222-8222-222222222222',revision:3};
 const state={open:true,service:{id:'synthetic-goal-service',purpose:'afw.goal-guidance.read.v1'},source:{projectId:'own',userId:'owner',sourceId:source.id},snapshot:{project:{id:'own',userId:'owner',revision:3,siteType:'commerce',goalsJson:'["discovery"]'},source,consent:{sequence:1,issuedAt:now-1000,expiresAt:now+60000}},lease:{...request,topic:'orientation',expiresAt:now+30000},reads:0};
 const deps={authenticate:async()=>structuredClone(state.service),resolveSource:async()=>structuredClone(state.source),readSnapshot:async()=>{state.reads++;return state.snapshot?{status:200,snapshot:structuredClone(state.snapshot)}:{status:403,code:'consent_required'};},readLease:async()=>structuredClone(state.lease),signalSecret:secret,isOpen:()=>state.open,getWindowExpiresAt:()=>now+60000,now:()=>now};
 return{state,deps,request};
}
test('the read orchestration returns only the minimal context after fresh server checks',async()=>{
 assert.equal(typeof readerContract.createAssistanceGoalReader,'function');const f=await fixture();
 const result=await readerContract.createAssistanceGoalReader(f.deps)(f.request);
 assert.equal(result.status,200);assert.deepEqual(result.context.declarations,{siteType:'commerce',goals:['discovery']});
 assert.equal(result.context.expiresAt,now+30000);assert.equal(result.context.operationsAuthorized,false);assert.equal(f.state.reads,2);
 assert.doesNotMatch(JSON.stringify(result),/"owner"|"own"|sourceId|sequence|synthetic-goal-service/);
});
test('finite window caps delivery and missing authentication remains closed',async()=>{
 const f=await fixture();f.deps.getWindowExpiresAt=()=>now+10000;
 assert.equal((await readerContract.createAssistanceGoalReader(f.deps)(f.request)).context.expiresAt,now+10000);
 const result=await readerContract.createAssistanceGoalReader({...f.deps,authenticate:undefined})(f.request);assert.notEqual(result.status,200);
 const g=await fixture();let clock=now;g.deps.now=()=>clock;const read=g.deps.readSnapshot;g.deps.readSnapshot=async()=>{const result=await read();clock=now+60000;return result;};
 assert.notEqual((await readerContract.createAssistanceGoalReader(g.deps)(g.request)).status,200);
});
test('an operational identity, closed window or substituted source cannot read private declarations',async()=>{
 for(const change of [f=>{f.state.service.purpose='afw.operations.read.v1';},f=>{f.state.open=false;},f=>{f.state.source.projectId='other';},f=>{f.request.owner='owner';}]){
  const f=await fixture();change(f);const result=await readerContract.createAssistanceGoalReader(f.deps)(f.request);assert.notEqual(result.status,200);assert.equal(result.context,undefined);
 }
});
test('withdrawal or regrant during a lease check invalidates the captured permission',async()=>{
 for(const mode of ['revoke','regrant']){const f=await fixture();let checks=0;f.deps.readLease=async()=>{if(++checks===2){if(mode==='revoke')f.state.snapshot=null;else f.state.snapshot.consent.sequence++;}return structuredClone(f.state.lease);};
  const result=await readerContract.createAssistanceGoalReader(f.deps)(f.request);assert.notEqual(result.status,200);assert.equal(result.context,undefined);
 }
});
test('owner, revision, authority, lease and configuration changes during awaits deny delivery',async()=>{
 const changes=[f=>{f.state.snapshot.project.userId='other';},f=>{f.state.snapshot.project.revision++;},f=>{f.state.service=null;},f=>{f.state.lease=null;},f=>{f.state.open=false;},f=>{f.state.snapshot.project.goalsJson='["content"]';}];
 for(const change of changes){const f=await fixture();const original=f.deps.readSnapshot;let reads=0;f.deps.readSnapshot=async()=>{const value=await original();if(++reads===1)change(f);return value;};
  const result=await readerContract.createAssistanceGoalReader(f.deps)(f.request);assert.notEqual(result.status,200);assert.equal(result.context,undefined);
 }
});
