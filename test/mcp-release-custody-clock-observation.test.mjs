import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
const module=await import('../lib/mcp-release-custody-clock-observation.mjs').catch(()=>null);
const run=module?.runReleaseCustodyClockObservation;
test('private original clock sampler is available',()=>assert.equal(typeof run,'function'));
const enabled=!!run,original='1'.repeat(64),program='3'.repeat(64),source='a'.repeat(40),ns='d6fc71552de7494a863aca20365a572d';
function fixture(){
 let wall=10000,mono=0,calls=0,disposed=0;
 const answer=()=>({purpose:'afw.node-retirement-observation.v1',containerId:original,processGeneration:'4'.repeat(64),programHash:program,sourceRevision:source,image:'cloudflare/debian-trixie',createdAt:1000,expiresAt:2000,closedAt:2000,observedAt:10010,physicalStopVerified:false,mayStartSuccessor:false});
 const namespace={idFromName(n){assert.equal(n,'afw-own-event-one-occurrence-v1');return{toString:()=>original};},idFromString(id){assert.equal(id,original);return{toString:()=>id};},get(id){assert.equal(id.toString(),original);return{async observeRetired(){calls++;const v=answer();Object.defineProperty(v,Symbol.dispose,{value(){disposed++;}});return v;}};}};
 const env={AFW_RELEASE_CUSTODY_CLOCK_OBSERVATION_ENABLED:'true',AFW_RELEASE_CUSTODY_CLOCK_OBSERVATION_POLICY:JSON.stringify({startAt:9000,expiresAt:20000,namespaceId:ns,original:{containerId:original,programHash:program,sourceRevision:source}}),AFW_RELEASE_OPERATOR_ENABLED:'false',AFW_RELEASE_WORKFLOW_ENABLED:'false',AFW_RELEASE_CONFIRMATION_WORKFLOW_ENABLED:'false',AFW_RELEASE_EVENTS_NODE:namespace};
 for(const k of ['AFW_RELEASE_READ_TOKEN','AFW_RELEASE_PUBLISH_TOKEN','RELEASE_DB'])Object.defineProperty(env,k,{get(){throw Error('Forbidden '+k);}});
 const event={timestamp:new Date(10000)},step={do:async(n,o,fn)=>{assert.equal(o.retries.limit,0);assert.ok(o.timeout<=5000);return fn();}};
 const rebind=()=>{const hash=createHash('sha256').update(env.AFW_RELEASE_CUSTODY_CLOCK_OBSERVATION_POLICY).digest('hex');event.instanceId='afw-original-clock-'+hash;event.payload={observationHash:hash};};rebind();
 return {env,event,step,namespace,rebind,answer,now:()=>wall,monotonicNow:()=>mono,setClock:(w,m)=>{wall=w;mono=m;},calls:()=>calls,disposed:()=>disposed};
}
const check=r=>{assert.equal(r.mayBoot,false);assert.equal(r.mayReserve,false);assert.equal(r.mayWrite,false);assert.equal(r.operationalReadiness,false);};
test('frozen caller and future actor timestamps are data only, with two disposed RPC results',{skip:!enabled},async()=>{
 const f=fixture(),r=await run(f);assert.equal(r.status,'observed');assert.equal(r.samples.length,2);assert.deepEqual(r.samples[0],{callerBefore:10000,callerAfter:10000,remoteObservedAt:10010,deltaMs:10});assert.equal(f.calls(),2);assert.equal(f.disposed(),2);check(r);
});
test('past and equal clocks remain measurements without authority',{skip:!enabled},async()=>{
 for(const remote of [9990,10000]){const f=fixture();f.namespace.get=()=>({async observeRetired(){return{...f.answer(),observedAt:remote};}});const r=await run(f);assert.equal(r.status,'observed');assert.equal(r.samples[0].deltaMs,remote-10000);check(r);}
});
test('closed or competing modes deny before acquiring the actor',{skip:!enabled},async()=>{
 for(const k of ['AFW_RELEASE_OPERATOR_ENABLED','AFW_RELEASE_WORKFLOW_ENABLED','AFW_RELEASE_CONFIRMATION_WORKFLOW_ENABLED','AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED','AFW_RELEASE_IDENTITY_OBSERVATION_ENABLED','AFW_RELEASE_RETIREMENT_OBSERVATION_ENABLED']){const f=fixture();f.env[k]='true';assert.equal((await run(f)).status,'blocked');assert.equal(f.calls(),0);}
 const f=fixture();f.env.AFW_RELEASE_CUSTODY_CLOCK_OBSERVATION_ENABLED='false';assert.equal((await run(f)).status,'blocked');assert.equal(f.calls(),0);
});
test('wrong policy, namespace, original actor, payload, schedule and queued timestamp stay blocked',{skip:!enabled},async()=>{
 for(const change of [f=>f.env.AFW_RELEASE_CUSTODY_CLOCK_OBSERVATION_POLICY='{}',f=>{const p=JSON.parse(f.env.AFW_RELEASE_CUSTODY_CLOCK_OBSERVATION_POLICY);p.namespaceId='b'.repeat(32);f.env.AFW_RELEASE_CUSTODY_CLOCK_OBSERVATION_POLICY=JSON.stringify(p);f.rebind();},f=>{const p=JSON.parse(f.env.AFW_RELEASE_CUSTODY_CLOCK_OBSERVATION_POLICY);p.expiresAt=129001;f.env.AFW_RELEASE_CUSTODY_CLOCK_OBSERVATION_POLICY=JSON.stringify(p);f.rebind();},f=>f.event.schedule={},f=>f.event.timestamp=new Date(4999),f=>f.event.timestamp=new Date(10001),f=>f.event.payload.extra=true,f=>f.event.instanceId='foreign']){const f=fixture();change(f);assert.equal((await run(f)).status,'blocked');assert.equal(f.calls(),0);}
});
test('malformed or foreign actor snapshots never become a sample and are disposed',{skip:!enabled},async()=>{
 for(const patch of [{containerId:'f'.repeat(64)},{programHash:'f'.repeat(64)},{sourceRevision:'f'.repeat(40)},{purpose:'foreign'},{image:'foreign'},{physicalStopVerified:true},{mayStartSuccessor:true},{observedAt:NaN},{observedAt:-1},{extra:true}]){const f=fixture();let disposed=0;f.namespace.get=()=>({async observeRetired(){const r={...f.answer(),...patch};Object.defineProperty(r,Symbol.dispose,{value(){disposed++;}});return r;}});const r=await run(f);assert.equal(r.status,'uncertain');assert.equal(r.samples.length,0);assert.equal(disposed,1);}
});
test('expiry, backwards clock or binding withdrawal after RPC prevents a second sample',{skip:!enabled},async()=>{
 for(const change of [f=>f.setClock(15000,5000),f=>f.setClock(9999,1),f=>f.setClock(10001,-1),f=>f.env.AFW_RELEASE_CUSTODY_CLOCK_OBSERVATION_ENABLED='false',f=>f.env.AFW_RELEASE_EVENTS_NODE={...f.namespace}]){const f=fixture(),get=f.namespace.get;f.namespace.get=id=>{const x=get(id);return{async observeRetired(){const r=await x.observeRetired();change(f);return r;}};};const r=await run(f);assert.equal(r.status,'uncertain');assert.equal(f.calls(),1);assert.equal(f.disposed(),1);check(r);}
});
test('unknown RPC acknowledgement is terminal and has no retry',{skip:!enabled},async()=>{
 const f=fixture();let calls=0;f.namespace.get=()=>({async observeRetired(){calls++;throw Error('Unknown ACK');}});const r=await run(f);assert.equal(r.status,'uncertain');assert.equal(calls,1);assert.equal(r.samples.length,0);assert.equal(r.mayRetry,false);
});
test('foreign cached outputs and local re-entry never create new reads',{skip:!enabled},async()=>{
 const f=fixture();f.step.do=async()=>JSON.stringify({status:'observed'});assert.equal((await run(f)).status,'uncertain');assert.equal(f.calls(),0);
 const g=fixture();g.step.do=async(n,o,fn)=>{const r=await fn();await assert.rejects(fn);return r;};assert.equal((await run(g)).status,'observed');assert.equal(g.calls(),2);
});
