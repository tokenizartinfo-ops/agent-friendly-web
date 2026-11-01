import test from 'node:test';
import assert from 'node:assert/strict';
import {armObservationFixture,observationPurpose} from './fixtures/qa-arm-observation.mjs';
const api=await import('../lib/mcp-qa-arm-observation.mjs').catch(()=>({}));
async function run(f,o=f.options()){assert.equal(typeof api.runPrivateQaArmObservation,'function');return api.runPrivateQaArmObservation(o);}
function safe(r){assert.equal(r.purpose,observationPurpose);assert.ok(Buffer.byteLength(JSON.stringify(r))<=2048);for(const k of ['authorizesEffects','guardLivenessVerified','nativeWithdrawalVerified','operationalReadiness','mayRetry'])assert.equal(r[k],false);for(const secret of ['synthetic-private-CF-token','PRIVATE-BODY','Authorization','bindings','closed-rollback.mjs'])assert.equal(JSON.stringify(r).includes(secret),false);}
test('native read-only composition qualifies two snapshots under one original lease',async()=>{
 const f=armObservationFixture(),r=await run(f);safe(r);assert.equal(r.status,'observed');assert.equal(r.snapshotsVerified,2);assert.equal(r.runtimeVersionId,f.version);assert.equal(r.sourceRevision,f.context.sourceRevision);assert.ok(r.reads>20&&r.reads<=128);assert.equal(r.qaCodeProvenanceVerified,false);
 assert.ok(f.requests.every(x=>x.init.method==='GET'&&x.url.origin==='https://api.cloudflare.com'));assert.equal(f.requests.filter(x=>x.url.pathname.includes('/versions/')).length,2);
 assert.equal(f.requests.some(x=>/github|d1|oauth|token/.test(x.url.href)),false);
});
for(const [name,attack] of Object.entries({
 'stale event':f=>{f.event.timestamp=new Date(f.wall-5000);},
 'future event':f=>{f.event.timestamp=new Date(f.wall+1);},
 'wrong native instance':f=>{f.event.instanceId='afw-qa-arm-'+'f'.repeat(64);},
 'open flag':f=>{f.env.AFW_MCP_CLOSURE_ENABLED='true';},
 'nonempty policy':f=>{f.env.AFW_MCP_CLOSURE_POLICY='PRIVATE-BODY';},
 'unknown extra flag':f=>{f.env.AFW_QA_UNKNOWN_ENABLED='false';},
 'expired compiled context':f=>{f.context.expiresAt=f.wall;},
 'caller resource selection':f=>{f.event.payload.url='https://example.com';},
 'credential accessor':f=>{Object.defineProperty(f.env,'AFW_MCP_CLOSURE_READ_TOKEN',{get(){throw Error('PRIVATE-BODY');},enumerable:true});},
 'cached Step result':f=>{f.step.do=async()=>({purpose:observationPurpose,status:'observed'});}
}))test('closed observation rejects '+name+' before outgoing calls',async()=>{const f=armObservationFixture();attack(f);const r=await run(f);safe(r);assert.equal(r.status,'blocked');assert.equal(f.requests.length,0);});
for(const [name,attack]of Object.entries({
 'credential':f=>{f.env.AFW_MCP_CLOSURE_READ_TOKEN='different-private-token';},
 'metadata':f=>{f.env.AFW_QA_VERSION={id:f.version};},
 'context':f=>{f.context.sourceRevision='b'.repeat(40);},
 'external pin':f=>{f.pins.operator.module.sha256='f'.repeat(64);},
 'payload':f=>{f.event.payload.observationId='f'.repeat(64);},
 'wall rollback':f=>{f.wall-=1;},
 'original absolute deadline':f=>{f.wall+=5000;}
}))test('full consumer fence rejects '+name+' drift after an await',async()=>{const f=armObservationFixture();let changed=false;f.attack=()=>{if(!changed){changed=true;attack(f);}};const r=await run(f);safe(r);assert.equal(r.status,'blocked');assert.ok(f.requests.length<=2);});
test('captures callable Step.do once when native access creates fresh wrappers',async()=>{
 const f=armObservationFixture();Object.defineProperty(f.step,'do',{get(){return async(_name,_config,work)=>work();}});const r=await run(f);safe(r);assert.equal(r.status,'observed');
});
test('complete fence runs after Promise.race consumer settlement',async()=>{
 const f=armObservationFixture(),race=Promise.race;Promise.race=function(values){return Reflect.apply(race,this,[values]).then(v=>{if(v?.purpose===observationPurpose&&v.status==='observed')f.env.AFW_QA_VERSION={id:f.version};return v;});};
 try{const r=await run(f);safe(r);assert.equal(r.status,'blocked');}finally{Promise.race=race;}
});
test('HTTP failures report sanitized negative evidence without retry',async()=>{
 const f=armObservationFixture();f.mutate=({response})=>{response.status=403;response.body={private:'PRIVATE-BODY'};};const r=await run(f);safe(r);assert.equal(r.status,'blocked');assert.equal(r.diagnostic.httpStatus,403);assert.ok(f.requests.length<=2);
});
test('unknown failed GET never leaks exceptions or retries',async()=>{
 const f=armObservationFixture(),o=f.options();o.fetchImpl=async()=>{throw Error('PRIVATE-BODY synthetic-private-CF-token');};const r=await run(f,o);safe(r);assert.equal(r.status,'blocked');assert.equal(r.diagnostic.reason,'request_failed');
});
test('no late start can refresh the native original absolute deadline',async()=>{
 const f=armObservationFixture(),o=f.options();f.event.timestamp=new Date(f.wall-4500);o.now=()=>{const at=f.wall;f.wall+=100;return at;};const r=await run(f,o);safe(r);assert.equal(r.status,'blocked');assert.ok(f.requests.length<25);
});
test('original monotonic deadline cannot be renewed by wall-clock readings',async()=>{
 const f=armObservationFixture(),descriptor=Object.getOwnPropertyDescriptor(performance,'now'),clock=performance.now.bind(performance);let offset=0;
 Object.defineProperty(performance,'now',{value:()=>clock()+offset,configurable:true});f.attack=()=>{offset=5001;};
 try{const r=await run(f);safe(r);assert.equal(r.status,'blocked');assert.ok(f.requests.length<=2);}finally{if(descriptor)Object.defineProperty(performance,'now',descriptor);else delete performance.now;}
});
test('complete consumer fence also runs after Step settlement',async()=>{
 const f=armObservationFixture();f.step.do=async(_n,_c,work)=>{const r=await work();f.env.AFW_MCP_CLOSURE_READ_TOKEN='different-private-token';return r;};const r=await run(f);safe(r);assert.equal(r.status,'blocked');
});
test('Step transports only a strict bounded primitive, never a borrowed metadata object',async()=>{
 const f=armObservationFixture();let primitive;
 f.step.do=async(_n,_c,work)=>{primitive=await work();assert.equal(typeof primitive,'string');assert.ok(Buffer.byteLength(primitive)<=2048);return primitive;};
 const r=await run(f);safe(r);assert.equal(r.status,'observed');assert.deepEqual(JSON.parse(primitive),r);
});
test('a borrowed or substituted Step object remains rejected after real local work',async()=>{
 const f=armObservationFixture();f.step.do=async(_n,_c,work)=>{const v=await work(),o=JSON.parse(v);Object.defineProperty(o,Symbol.dispose,{value(){}});return o;};const r=await run(f);safe(r);assert.equal(r.status,'blocked');
});
