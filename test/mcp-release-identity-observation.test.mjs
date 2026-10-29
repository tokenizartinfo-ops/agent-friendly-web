import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {runReleaseIdentityObservation as run} from '../lib/mcp-release-identity-observation.mjs';
const original='1'.repeat(64),successor='2'.repeat(64),ns='d6fc71552de7494a863aca20365a572d';
function fixture(){
 let wall=10000,mono=0,calls=0;
 const namespace={idFromName(name){calls++;if(name==='afw-own-event-one-occurrence-v1')return{toString:()=>original};if(name==='afw-own-event-first-successor-v1')return{toString:()=>successor};throw Error('Unexpected name');},idFromString(id){return{toString:()=>id};}};
 Object.defineProperty(namespace,'get',{get(){throw Error('Must not acquire actor');}});
 const env={AFW_RELEASE_IDENTITY_OBSERVATION_ENABLED:'true',AFW_RELEASE_IDENTITY_OBSERVATION_POLICY:JSON.stringify({startAt:9000,expiresAt:20000,namespaceId:ns,originalContainerId:original}),AFW_RELEASE_OPERATOR_ENABLED:'false',AFW_RELEASE_WORKFLOW_ENABLED:'false',AFW_RELEASE_CONFIRMATION_WORKFLOW_ENABLED:'false',AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED:'false',AFW_RELEASE_EVENTS_NODE:namespace};
 for(const key of ['AFW_RELEASE_READ_TOKEN','AFW_RELEASE_PUBLISH_TOKEN','RELEASE_DB'])Object.defineProperty(env,key,{get(){throw Error('Forbidden data access');}});
 const event={timestamp:new Date(10000)},step={do:async(name,options,fn)=>fn()};
 const rebind=()=>{const hash=createHash('sha256').update(env.AFW_RELEASE_IDENTITY_OBSERVATION_POLICY).digest('hex');event.instanceId='afw-release-identity-'+hash;event.payload={identityHash:hash};};
 rebind();return{env,event,step,namespace,rebind,now:()=>wall,monotonicNow:()=>mono,setClock:(w,m)=>{wall=w;mono=m;},calls:()=>calls};
}
test('identity observation has no capability to reserve, boot, acquire actors or read credentials',async()=>{
 const f=fixture(),r=await run(f);assert.equal(r.status,'observed');assert.equal(r.namespaceId,ns);assert.equal(r.originalContainerId,original);assert.equal(r.successorContainerId,successor);assert.equal(r.observedAt,10000);
 assert.equal(r.mayBoot,false);assert.equal(r.mayReserve,false);assert.equal(r.operationalReadiness,false);
});
test('closed and competing modes reject before namespace use',async()=>{
 for(const key of ['AFW_RELEASE_OPERATOR_ENABLED','AFW_RELEASE_WORKFLOW_ENABLED','AFW_RELEASE_CONFIRMATION_WORKFLOW_ENABLED','AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED','AFW_RELEASE_RETIREMENT_OBSERVATION_ENABLED']){
  const f=fixture();f.env[key]='true';assert.equal((await run(f)).status,'blocked',key);assert.equal(f.calls(),0);
 }
 const f=fixture();f.env.AFW_RELEASE_IDENTITY_OBSERVATION_ENABLED='false';assert.equal((await run(f)).status,'blocked');assert.equal(f.calls(),0);
});
test('foreign namespace, original identity and extended window do not produce identity proof',async()=>{
 for(const patch of [{namespaceId:'a'.repeat(32)},{originalContainerId:'3'.repeat(64)},{expiresAt:609001},{startAt:10001},{expiresAt:10000},{extra:true}]){
  const f=fixture();f.env.AFW_RELEASE_IDENTITY_OBSERVATION_POLICY=JSON.stringify({...JSON.parse(f.env.AFW_RELEASE_IDENTITY_OBSERVATION_POLICY),...patch});f.rebind();assert.notEqual((await run(f)).status,'observed',JSON.stringify(patch));
 }
});
test('scheduled, altered and old workflow invocations are denied without a new lease',async()=>{
 for(const change of [f=>f.event.schedule={},f=>f.event.payload.extra=true,f=>f.event.timestamp=new Date(4999),f=>f.event.timestamp=new Date(10001),f=>f.event.instanceId='another',f=>f.event.payload.identityHash='f'.repeat(64)]){
  const f=fixture();change(f);assert.equal((await run(f)).status,'blocked');assert.equal(f.calls(),0);
 }
});
test('clock expiry, rollback, binding change and foreign cached result are not accepted',async()=>{
 for(const change of [
  f=>f.setClock(15000,5000),f=>f.setClock(9999,1),f=>f.setClock(10001,-1),
  f=>f.env.AFW_RELEASE_EVENTS_NODE={...f.namespace},
  f=>f.env.AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED='true'
 ]){
  const f=fixture();f.step.do=async(n,o,fn)=>{const value=await fn();change(f);return value;};assert.equal((await run(f)).status,'uncertain');
 }
 const f=fixture();f.step.do=async()=>JSON.stringify({status:'observed',successorContainerId:successor});assert.equal((await run(f)).status,'uncertain');
});
test('native step accessor may rebind, but re-entry cannot run twice',async()=>{
 const f=fixture();Object.defineProperty(f.step,'do',{get(){return async(n,o,fn)=>{assert.equal(o.retries.limit,0);assert.ok(o.timeout<=5000);return fn();};}});
 assert.equal((await run(f)).status,'observed');
 const g=fixture();g.step.do=async(n,o,fn)=>{await fn();return fn();};assert.equal((await run(g)).status,'uncertain');
});
