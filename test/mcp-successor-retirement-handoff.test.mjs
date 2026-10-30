import {createRetiredRpcReceipt,readRetiredRpcReceipt} from '../lib/mcp-retired-rpc-receipt.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
const load=()=>import('../lib/mcp-successor-retirement-handoff.mjs');
const KEY='afw.successor-retirement-handoff.v1';
function storage(){
 const rows=new Map();let chain=Promise.resolve(),writes=0,lose=false;
 const tx={async get(k){return structuredClone(rows.get(k));},async put(k,v){writes++;rows.set(k,structuredClone(v));}};
 return {rows,get writes(){return writes;},lose(){lose=true;},transaction(fn){const next=chain.then(async()=>{const value=await fn(tx);if(lose){lose=false;throw Error('synthetic lost ACK');}return value;});chain=next.catch(()=>{});return next;}};
}
function fixture(){
 let wall=Date.UTC(2026,9,28,16),reads=0,custodyReads=0;
 const original={containerId:'a'.repeat(64),applicationId:'d6fc71552de7494a863aca20365a572d',programHash:'b'.repeat(64),sourceRevision:'c'.repeat(40)},db=storage();
 const custody={purpose:'afw.node-retirement-observation.v1',containerId:original.containerId,programHash:original.programHash,sourceRevision:original.sourceRevision,processGeneration:'d'.repeat(64),image:'cloudflare/debian-trixie',createdAt:wall-60000,expiresAt:wall-10000,closedAt:wall-20000,observedAt:wall,physicalStopVerified:false,mayStartSuccessor:false};
 const instance={id:original.containerId,application_id:original.applicationId,image:'cloudflare/debian-trixie',started_at:new Date(wall-50000).toISOString(),status:{state:'stopped',updated_at:new Date(wall-21000).toISOString(),exit_code:0}};
 const options={storage:db,original,now:()=>wall,readCustody:async()=>{custodyReads++;return {...custody,observedAt:wall};},readInstance:async input=>{reads++;assert.equal(input.containerId,original.containerId);assert.equal(input.applicationId,original.applicationId);assert.ok(input.signal instanceof AbortSignal);return structuredClone(instance);}};
 return {db,original,custody,instance,options,reads:()=>reads,custodyReads:()=>custodyReads,advance:ms=>{wall+=ms;}};
}
test('capture preserves original proof and later observation never calls the retired RPC or rewrites history',async()=>{
 const {createSuccessorRetirementHandoff}=await load(),f=fixture(),h=createSuccessorRetirementHandoff(f.options);
 const c=await h.capture();assert.equal(c.status,'recorded');assert.equal(f.db.writes,1);assert.equal(f.reads(),2);
 const raw=structuredClone(f.db.rows.get(KEY)),at=c.capturedAt;f.advance(60000);
 const next=createSuccessorRetirementHandoff({...f.options,readCustody:async()=>{assert.fail('Retired RPC must not be called');}});
 const r=await next.observe();assert.equal(r.status,'retired_handoff_observed');assert.equal(r.capturedAt,at);assert.equal(r.observedAt,at+60000);assert.equal(r.physicalStopVerified,true);assert.equal(r.mayRestoreAdministration,false);assert.equal(r.mayStartSuccessor,false);assert.equal(r.operationalReadiness,false);assert.equal(r.processGeneration,'d'.repeat(64));assert.equal(f.db.writes,1);assert.deepEqual(f.db.rows.get(KEY),raw);assert.equal(f.reads(),4);
 const again=await next.capture();assert.equal(again.status,'already_recorded');assert.equal(again.capturedAt,at);assert.equal(f.reads(),4);assert.equal(f.db.writes,1);
});
test('live foreign changed or failed process cannot create or reuse the handoff',async()=>{
 const {createSuccessorRetirementHandoff}=await load();
 const changes=[f=>f.instance.status.state='running',f=>f.instance.status.exit_code=1,f=>f.instance.id='f'.repeat(64),f=>f.instance.application_id='foreign',f=>f.instance.image='foreign',f=>f.instance.started_at=new Date(Date.UTC(2026,9,28,15)).toISOString(),f=>f.instance.status.updated_at=new Date(Date.UTC(2026,9,28,16)-19000).toISOString()];
 for(const change of changes){
  const f=fixture(),h=createSuccessorRetirementHandoff(f.options);assert.equal((await h.capture()).status,'recorded');change(f);assert.equal((await h.observe()).status,'blocked');assert.equal(f.db.writes,1);
 }
 const bad=fixture();bad.instance.status.state='running';assert.equal((await createSuccessorRetirementHandoff(bad.options).capture()).status,'blocked');assert.equal(bad.db.writes,0);
});
test('other application, getters, additional fields and replacement original are rejected without effects',async()=>{
 const {createSuccessorRetirementHandoff}=await load(),f=fixture();
 assert.throws(()=>createSuccessorRetirementHandoff({...f.options,original:{...f.original,applicationId:'foreign'}}));
 let invoked=false;const g={...f.original};Object.defineProperty(g,'sourceRevision',{enumerable:true,get(){invoked=true;return 'c'.repeat(40);}});
 assert.throws(()=>createSuccessorRetirementHandoff({...f.options,original:g}));assert.equal(invoked,false);
 assert.throws(()=>createSuccessorRetirementHandoff({...f.options,original:{...f.original,token:'no'}}));
 assert.equal((await createSuccessorRetirementHandoff(f.options).capture()).status,'recorded');
 const foreign=createSuccessorRetirementHandoff({...f.options,original:{...f.original,sourceRevision:'e'.repeat(40)}});
 assert.equal((await foreign.capture()).status,'blocked');assert.equal((await foreign.observe()).status,'blocked');assert.equal(f.db.writes,1);
});
test('lost storage acknowledgement remains uncertain and a new invocation cannot write again',async()=>{
 const {createSuccessorRetirementHandoff}=await load(),f=fixture();
 const base=f.options.storage;let calls=0;
 f.options.storage={transaction:async fn=>{const result=await base.transaction(fn);if(++calls===2)throw Error('commit ACK lost');return result;}};
 const h=createSuccessorRetirementHandoff(f.options);
 assert.equal((await h.capture()).status,'uncertain');assert.equal(f.db.writes,1);
 assert.equal((await h.capture()).status,'already_recorded');assert.equal(f.db.writes,1);
});
test('concurrent capture commits once and never overwrites a different generation',async()=>{
 const {createSuccessorRetirementHandoff}=await load(),f=fixture(),g={...f.options,readCustody:async()=>({...f.custody,processGeneration:'e'.repeat(64)})};
 const results=await Promise.all([createSuccessorRetirementHandoff(f.options).capture(),createSuccessorRetirementHandoff(g).capture()]);
 assert.deepEqual(results.map(r=>r.status).sort(),['blocked','recorded']);assert.equal(f.db.writes,1);
});
test('storage changes during provider readback and corrupt extra fields fail closed',async()=>{
 const {createSuccessorRetirementHandoff}=await load(),f=fixture(),h=createSuccessorRetirementHandoff(f.options);await h.capture();
 const saved=structuredClone(f.db.rows.get(KEY)),changed={...saved,untrusted:true};
 const altered=createSuccessorRetirementHandoff({...f.options,readInstance:async()=>{f.db.rows.set(KEY,changed);return structuredClone(f.instance);}});
 assert.equal((await altered.observe()).status,'blocked');assert.equal(f.db.writes,1);
 f.db.rows.set(KEY,{...saved,original:{...f.original,sourceRevision:'e'.repeat(40)}});
 assert.equal((await h.observe()).status,'blocked');assert.equal(f.db.writes,1);
});
test('missing record and stale or future original custody fail without writes',async()=>{
 const {createSuccessorRetirementHandoff}=await load(),f=fixture(),h=createSuccessorRetirementHandoff(f.options);
 assert.equal((await h.observe()).status,'blocked');assert.equal(f.reads(),0);
 for(const offset of [-30001,1]){const g=fixture();g.options.readCustody=async()=>({...g.custody,observedAt:g.custody.observedAt+offset});assert.equal((await createSuccessorRetirementHandoff(g.options).capture()).status,'blocked');assert.equal(g.db.writes,0);}
});
test('hung and late provider callbacks cannot write after the original invocation lease',async()=>{
 const {createSuccessorRetirementHandoff}=await load(),f=fixture();let signal,release;
 f.options.readInstance=input=>{signal=input.signal;return new Promise(r=>{release=()=>r(structuredClone(f.instance));});};
 const h=createSuccessorRetirementHandoff({...f.options,timeoutMs:30});
 assert.equal((await h.capture()).status,'blocked');assert.equal(signal.aborted,true);assert.equal(f.db.writes,0);
 release();await new Promise(r=>setTimeout(r,10));assert.equal(f.db.writes,0);
});
test('backwards wall time and monotonic deadline overrun are rejected before persistence',async t=>{
 const {createSuccessorRetirementHandoff}=await load(),f=fixture();
 f.options.readInstance=async()=>{f.advance(-1);return structuredClone(f.instance);};
 assert.equal((await createSuccessorRetirementHandoff(f.options).capture()).status,'blocked');assert.equal(f.db.writes,0);
 const g=fixture();let tick=100;t.mock.method(performance,'now',()=>tick);
 g.options.readInstance=async()=>{tick+=31;return structuredClone(g.instance);};
 assert.equal((await createSuccessorRetirementHandoff({...g.options,timeoutMs:30}).capture()).status,'blocked');assert.equal(g.db.writes,0);
});

test('capture cannot qualify one mutable provider start and persist another outside the original custody window',async()=>{
 const {createSuccessorRetirementHandoff}=await load(),f=fixture(),valid=f.instance.started_at,outside=new Date(f.custody.createdAt-1000).toISOString();
 f.options.readInstance=()=>{f.instance.started_at=outside;queueMicrotask(()=>queueMicrotask(()=>{f.instance.started_at=valid;}));return f.instance;};
 assert.equal((await createSuccessorRetirementHandoff(f.options).capture()).status,'blocked');assert.equal(f.db.writes,0);
});
function lateStorage(base,after,depth,expire){
 let calls=0;const queue=n=>queueMicrotask(()=>n===1?expire():queue(n-1));
 return {transaction:async fn=>{const value=await base.transaction(fn);if(++calls===after)queue(depth);return value;}};
}
test('existing-record delivery rejects expiry after the transaction check but before fast-path continuation',async t=>{
 const {createSuccessorRetirementHandoff}=await load(),f=fixture();await createSuccessorRetirementHandoff(f.options).capture();
 let tick=100;t.mock.method(performance,'now',()=>tick);
 const storage=lateStorage(f.db,1,2,()=>{tick=131;});
 const r=await createSuccessorRetirementHandoff({...f.options,storage,timeoutMs:30}).capture();
 assert.equal(r.status,'blocked');assert.equal(f.db.writes,1);
});
test('final observe result cannot escape after monotonic expiry while the timeout callback is starved',async t=>{
 const {createSuccessorRetirementHandoff}=await load(),f=fixture();await createSuccessorRetirementHandoff(f.options).capture();
 let tick=100;t.mock.method(performance,'now',()=>tick);
 const storage=lateStorage(f.db,2,3,()=>{tick=131;});
 const r=await createSuccessorRetirementHandoff({...f.options,storage,timeoutMs:30}).observe();
 assert.equal(r.status,'blocked');assert.equal(r.physicalStopVerified,false);assert.equal(f.db.writes,1);
});
test('late post-write result stays uncertain instead of claiming an acknowledged capture',async t=>{
 const {createSuccessorRetirementHandoff}=await load(),f=fixture();let tick=100;t.mock.method(performance,'now',()=>tick);
 const storage=lateStorage(f.db,2,3,()=>{tick=131;});
 const r=await createSuccessorRetirementHandoff({...f.options,storage,timeoutMs:30}).capture();
 assert.equal(r.status,'uncertain');assert.equal(f.db.writes,1);
});

test('challenged successor handoff preserves history with observer clock21ms ahead',async()=>{
 const {createSuccessorRetirementHandoff}=await load(),f=fixture(),options={...f.options};delete options.readCustody;
 options.readCustodyReceipt=async({signal},assertCurrent)=>readRetiredRpcReceipt({signal,now:options.now,assertCurrent,invoke:async challenge=>({value:await createRetiredRpcReceipt({challenge,now:()=>options.now()+21,observe:async()=>({value:{...f.custody,observedAt:options.now()+21}})})})});
 const h=createSuccessorRetirementHandoff(options),r=await h.capture();assert.equal(r.status,'recorded');assert.equal(f.db.writes,1);
 const preserved=structuredClone(f.db.rows.get(KEY));f.advance(60000);assert.equal((await h.observe()).status,'retired_handoff_observed');assert.deepEqual(f.db.rows.get(KEY),preserved);
});
