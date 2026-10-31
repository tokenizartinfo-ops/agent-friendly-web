import test from 'node:test';
import assert from 'node:assert/strict';
import {generationFixture,INFO,HEAD,CONTROL,hash} from './fixtures/qa-generation-ledger.mjs';
import {createPrivateQaGenerationLedger} from '../lib/mcp-qa-generation-ledger.mjs';
const api=await import('../lib/mcp-qa-generation-resolver.mjs').catch(()=>({}));
const slot='afw-own-successor-closure-v1',actor='f'.repeat(64),version='11111111-1111-4111-8111-111111111111';
async function fixture(){
 const f=generationFixture(),armed=await createPrivateQaGenerationLedger(f.options()).arm();assert.equal(armed.status,'armed');
 const namespace={idFromName(name){assert.equal(name,slot);return{toString:()=>actor};}};
 f.env.AFW_INDEPENDENT_CLOSURE=namespace;const ctx={storage:f.storage,id:{toString:()=>actor}};
 return {f,armed,ctx,options:{env:f.env,ctx,sourceRevision:'a'.repeat(40),now:f.now,timeoutMs:5000}};
}
const make=options=>{assert.equal(typeof api.createPrivateQaGenerationResolver,'function','fixed private resolver required');return api.createPrivateQaGenerationResolver(options);};
const flags=r=>{for(const k of ['authorizesEffects','guardLivenessVerified','operationalReadiness','mayRetry'])assert.equal(r[k],false);};
const read=async(o,plan)=>{const raw=await o.read(plan);assert.equal(typeof raw,'string');assert.ok(Buffer.byteLength(raw)<=2048);const r=JSON.parse(raw);flags(r);return r;};
test('fixed resolver reads primary capsule and current native identity without writes or private content',async()=>{
 const {f,armed,options}=await fixture(),before=structuredClone([...f.rows]),puts=f.storage.puts,o=make(options);
 assert.deepEqual(Object.keys(o),['read']);const r=await read(o,armed.planHash);
 assert.equal(r.status,'armed');assert.equal(r.planHash,armed.planHash);assert.equal(r.runtimeVersionId,version);assert.equal(r.sourceRevision,'a'.repeat(40));assert.equal(r.storedContext,'durable_object');assert.equal(r.isHead,true);assert.equal(r.withinWindow,true);
 assert.deepEqual([...f.rows],before);assert.equal(f.storage.puts,puts);const raw=JSON.stringify(r);for(const denied of ['capsule','grantId','current-grant','closurePolicyHash','predecessor','executionPin'])assert.equal(raw.includes(denied),false);
});
for(const input of [undefined,null,'','f'.repeat(63),'F'.repeat(64),{planHash:'f'.repeat(64)}])test('resolver rejects non-exact plan input '+JSON.stringify(input),async()=>{
 const {options}=await fixture(),o=make(options);assert.equal((await read(o,input)).status,'blocked');
});
test('resolver rejects extra arguments and unknown plan without leaks',async()=>{
 const {armed,options}=await fixture(),o=make(options);assert.equal(JSON.parse(await o.read(armed.planHash,{})).status,'blocked');assert.equal((await read(o,'0'.repeat(64))).status,'blocked');
});
for(const wrong of ['source','version','actor','namespace','metadata-accessor'])test('resolver rejects foreign '+wrong,async()=>{
 const {f,armed,ctx,options}=await fixture();
 if(wrong==='source')options.sourceRevision='b'.repeat(40);
 if(wrong==='version')f.env.AFW_QA_VERSION={id:'22222222-2222-4222-8222-222222222222'};
 if(wrong==='actor')ctx.id={toString:()=> 'e'.repeat(64)};
 if(wrong==='namespace')f.env.AFW_INDEPENDENT_CLOSURE={idFromName:()=>({toString:()=> 'e'.repeat(64)})};
 if(wrong==='metadata-accessor')Object.defineProperty(f.env.AFW_QA_VERSION,'id',{enumerable:true,get(){throw Error('private accessor');}});
 const o=make(options);assert.equal((await read(o,armed.planHash)).status,'blocked');
});
for(const state of ['pending','withdrawn','expired','missing-info','corrupt-info','foreign-capsule','orphan','missing-head'])test('resolver rejects '+state+' without repair',async()=>{
 const {f,armed,options}=await fixture(),o=make(options),control=f.rows.get(CONTROL+armed.planHash);
 if(state==='pending'){control.phase='pending';control.armedAt=null;}
 if(state==='withdrawn')await createPrivateQaGenerationLedger(f.options()).withdraw();
 if(state==='expired')f.setNow(f.capsule.expiresAt);
 if(state==='missing-info')f.rows.delete(INFO+armed.planHash);
 if(state==='corrupt-info')f.rows.get(INFO+armed.planHash).extra=true;
 if(state==='foreign-capsule')f.rows.get(INFO+armed.planHash).capsule=JSON.stringify({...f.capsule,grantId:'different'});
 if(state==='orphan')f.rows.set(INFO+'e'.repeat(64),{orphan:true});
 if(state==='missing-head')f.rows.delete(HEAD);
 const before=structuredClone([...f.rows]),puts=f.storage.puts;assert.equal((await read(o,armed.planHash)).status,'blocked');assert.deepEqual([...f.rows],before);assert.equal(f.storage.puts,puts);
});
test('historical target under a newer valid HEAD cannot become named current',async()=>{
 const {f,armed,options}=await fixture(),old=armed.planHash;await createPrivateQaGenerationLedger(f.options()).withdraw();f.setNow(f.capsule.expiresAt+1);
 f.capsule={...f.capsule,predecessor:{kind:'generation',planHash:armed.planHash,infoHash:armed.infoHash,sequence:armed.sequence},trialId:'8'.repeat(64),grantId:'next-grant',eventId:'9'.repeat(64),startAt:f.now(),expiresAt:f.now()+60000};
 const next=await createPrivateQaGenerationLedger(f.options()).arm();assert.equal(next.status,'armed');const o=make(options);assert.equal((await read(o,old)).status,'blocked');assert.equal((await read(o,next.planHash)).status,'armed');
});
for(const point of ['bootstrap','observer'])test('hung '+point+' uses one bounded original lease and discards late data',async()=>{
 const {f,armed,options}=await fixture();let release,n=0;const gate=new Promise(r=>{release=r;}),original=f.storage;
 const storage={transaction:fn=>original.transaction(async t=>{n++;if(n===(point==='bootstrap'?1:2))await gate;return fn(t);})};options.ctx.storage=storage;options.timeoutMs=30;const o=make(options),before=structuredClone([...f.rows]);
 try{const promise=o.read(armed.planHash),raw=await Promise.race([promise,new Promise(r=>setTimeout(()=>r('hung'),180))]);assert.notEqual(raw,'hung');assert.equal(JSON.parse(raw).status,'blocked');release();await new Promise(r=>setTimeout(r,10));assert.equal(await promise,raw);assert.deepEqual([...f.rows],before);}finally{release();}
});
test('bootstrap time cannot restart the observer deadline',async()=>{
 const {f,armed,options}=await fixture(),original=f.storage,at=f.now();let n=0;
 options.ctx.storage={transaction:fn=>original.transaction(async t=>{const r=await fn(t);if(++n===1)f.setNow(at+5000);return r;})};assert.equal((await read(make(options),armed.planHash)).status,'blocked');
});
for(const change of ['storage','namespace','metadata','source'])test('identity mutation after primary await is rejected: '+change,async()=>{
 const {f,armed,options}=await fixture(),original=f.storage;let once=false;
 const wrapper={transaction:fn=>original.transaction(async t=>{const r=await fn(t);if(!once){once=true;if(change==='storage')options.ctx.storage={};if(change==='namespace')f.env.AFW_INDEPENDENT_CLOSURE={};if(change==='metadata')f.env.AFW_QA_VERSION={id:version};if(change==='source')options.sourceRevision='b'.repeat(40);}return r;})};
 options.ctx.storage=wrapper;assert.equal((await read(make(options),armed.planHash)).status,'blocked');
});
test('resolver does not access provider credential or D1 surfaces',async()=>{
 const {f,armed,options}=await fixture();for(const key of ['AFW_QA_DOSSIER_DB','AFW_QA_DB','AFW_MCP_CLOSURE_PUBLISH_TOKEN','AFW_MCP_CLOSURE_READ_TOKEN'])Object.defineProperty(f.env,key,{get(){throw Error('forbidden secret or D1');}});
 assert.equal((await read(make(options),armed.planHash)).status,'armed');
});

test('bundle hash cannot substitute for the generation capsule hash',async()=>{
 const {f,armed,options}=await fixture();assert.notEqual(f.capsule.bundleHash,armed.planHash);assert.equal((await read(make(options),f.capsule.bundleHash)).status,'blocked');
});
test('primary HEAD narrows INFO lookup and read path never accesses put',async()=>{
 const {f,armed,options}=await fixture(),original=f.storage,keys=[];options.ctx.storage={transaction:fn=>original.transaction(t=>fn(Object.defineProperty({get:async k=>{keys.push(k);return t.get(k);},list:t.list},'put',{get(){throw Error('put forbidden');}})))};
 const o=make(options);assert.equal((await read(o,'e'.repeat(64))).status,'blocked');assert.deepEqual(keys,[HEAD]);keys.length=0;assert.equal((await read(o,armed.planHash)).status,'armed');assert.equal(keys[0],HEAD);assert.equal(keys[1],INFO+armed.planHash);
});

test('outer clock rejects regression before primary lookup',async()=>{
 const {f,armed,options}=await fixture(),at=f.now();let n=0;options.now=()=>++n===1?at+1:at;const before=f.storage.transactions;assert.equal((await read(make(options),armed.planHash)).status,'blocked');assert.equal(f.storage.transactions,before);
});
for(const initial of [NaN,-1])test('outer clock rejects invalid monotonic origin '+String(initial),async()=>{
 const {armed,options}=await fixture(),original=Object.getOwnPropertyDescriptor(performance,'now'),real=performance.now.bind(performance);let n=0;
 Object.defineProperty(performance,'now',{configurable:true,value:()=>++n===1?initial:real()});
 try{assert.equal((await read(make(options),armed.planHash)).status,'blocked');}finally{if(original)Object.defineProperty(performance,'now',original);else delete performance.now;}
});

for(const drift of ['deadline','metadata'])test('settlement after inner success revalidates '+drift,async()=>{
 const {f,armed,options}=await fixture(),original=Promise.race,at=f.now();let changed=false;
 Promise.race=function(values){return Reflect.apply(original,this,[values]).then(value=>{if(!changed&&typeof value==='string'&&JSON.parse(value).status==='armed'){changed=true;if(drift==='deadline')f.setNow(at+5000);else f.env.AFW_QA_VERSION={id:f.env.AFW_QA_VERSION.id};}return value;});};
 try{const r=await read(make(options),armed.planHash);assert.equal(changed,true);assert.equal(r.status,'blocked');}finally{Promise.race=original;}
});
