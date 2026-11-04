import test from 'node:test';
import assert from 'node:assert/strict';
import {initialEntryHarness} from './fixtures/finite-initial-entry-world.mjs';
import {validateFiniteOwnerSource} from '../lib/mcp-qa-finite-preparation-records.mjs';
async function plain(p){const r=await p;try{return JSON.parse(JSON.stringify(r));}finally{r[Symbol.dispose]?.();}}
async function world(fn){const f=await initialEntryHarness('phase-context');try{await f.stub.configure('normal');assert.equal((await plain(f.stub.invoke(f.refs))).status,'material_recorded');await f.stub.restoreMethods();await fn(f);}finally{await f.stub.restoreMethods();await f.mf.dispose();await f.cleanup();}}
async function read(f,mode='normal'){const rows=await plain(f.stub.snapshot()),c=JSON.parse(rows.find(([k])=>k.endsWith(':capsule'))[1]);f.nowOffset=c.I0+420000-Date.now();try{return await plain(f.stub.phaseContextRead(420000,mode));}finally{f.nowOffset=0;}}
test('closed source keeps original A and stable original context',()=>world(async f=>{
 const before=await plain(f.stub.snapshot()),original=await plain(f.ownerRead()),writes=f.uploads.length+f.activations.length;
 const result=await read(f);assert.equal(result.fixtureError,undefined,JSON.stringify(result));assert.deepEqual(Object.keys(result).sort(),['capsuleHash','preconnectionId','source']);assert.deepEqual(validateFiniteOwnerSource(result.source),original.source);assert.equal(result.preconnectionId,original.preconnectionId);assert.equal(result.capsuleHash,original.capsuleHash);
 assert.deepEqual(await plain(f.stub.snapshot()),before);assert.equal(await f.stub.ownerEffectCount(),0);assert.equal(f.uploads.length+f.activations.length,writes);
 const sessions=await plain(f.stub.phasePrimaryReads());assert(sessions.length>=2);for(const queries of sessions)assert.match(queries[0],/^SELECT/i);
}));

async function seed(f,kind='settled'){const rows=await plain(f.stub.snapshot()),c=JSON.parse(rows.find(([k])=>k.endsWith(':capsule'))[1]);f.nowOffset=c.I0+410000-Date.now();try{const result=await plain(f.stub.seedPhaseFacts(kind));assert.equal(result.fixtureError,undefined,JSON.stringify(result));return result;}finally{f.nowOffset=0;}}
test('original approval and enrollment stay closed without publication',()=>world(async f=>{
 await seed(f,'enrollment');const before=await plain(f.stub.snapshot()),r=await read(f);assert.equal(r.fixtureError,undefined,JSON.stringify(r));assert.equal(r.source.phase,'closed_ui');
 assert.equal((await plain(f.ownerRead(420000))).status,'unavailable');assert.deepEqual(await plain(f.stub.snapshot()),before);assert.equal(await f.stub.ownerEffectCount(),0);
 const mutations=await plain(f.stub.phaseEnrollmentMutations());for(const [key,value]of Object.entries(mutations))assert.equal(value,true,key);
}));
for(const kind of ['approval','enrollment-no-ack'])test('closed source preserves factual '+kind,()=>world(async f=>{await seed(f,kind);const r=await read(f);assert.equal(r.fixtureError,undefined,JSON.stringify(r));assert.equal(r.source.phase,'closed_ui');}));
test('settled first connection derives read_consent from exact primary state',()=>world(async f=>{
 const original=await plain(f.ownerRead());f.phaseCurrent=await seed(f);const before=await plain(f.stub.snapshot()),writes=f.uploads.length+f.activations.length;
 const r=await read(f);assert.equal(r.fixtureError,undefined,JSON.stringify(r));assert.equal(r.source.phase,'read_consent');assert.equal(r.source.currentPublication.receiptHash,f.phaseCurrent.receipt.receiptHash);assert.deepEqual(r.source.initialBaseline,original.source.initialBaseline);assert.deepEqual(r.source.programContext,original.source.programContext);assert.deepEqual(r.source.window,original.source.window);
 const plan=JSON.parse(before.find(([k])=>k==='afw.finite-initial-cleanup.v1:plan')[1]),expected=structuredClone(plan.configuration);expected.bindings.find(b=>b.name==='AFW_DELEGATED_OAUTH_ENABLED').text='true';assert.deepEqual(f.phaseCurrent.configuration,expected);
 assert.deepEqual(await plain(f.stub.snapshot()),before);assert.equal(await f.stub.ownerEffectCount(),0);assert.equal(f.uploads.length+f.activations.length,writes);assert.equal((await plain(f.ownerRead(420000))).status,'unavailable');
}));
for(const kind of ['upload-send','upload-ack','activation-send'])test('unknown SEND denies even while provider pointer equals original M: '+kind,()=>world(async f=>{
 await seed(f,kind);const before=await plain(f.stub.snapshot());assert.equal((await read(f)).status,'unavailable');assert.deepEqual(await plain(f.stub.snapshot()),before);assert.equal(await f.stub.ownerEffectCount(),0);
}));
for(const kind of ['writer-head','orphan-receipt','orphan-ack','contextHash','foreign-A','extra','later-approval','orphan-grant'])test('foreign extra and later stages never become matching phase state: '+kind,()=>world(async f=>{
 f.phaseCurrent=await seed(f);await f.stub.phaseCorrupt(kind);const before=await plain(f.stub.snapshot());assert.equal((await read(f)).status,'unavailable');assert.deepEqual(await plain(f.stub.snapshot()),before);
}));
for(const kind of ['missing-backup','missing-receipt','missing-chunk','tamper-backup','tamper-receipt','tamper-chunk'])test('retained original backup denies '+kind,()=>world(async f=>{
 await f.stub.phaseCorrupt(kind);const before=await plain(f.stub.snapshot());assert.equal((await read(f)).status,'unavailable');assert.deepEqual(await plain(f.stub.snapshot()),before);
}));
for(const fault of ['module','configuration','later'])test('actual current module and profile independently deny '+fault,()=>world(async f=>{
 f.phaseCurrent=await seed(f);f.phaseFault=fault;assert.equal((await read(f)).status,'unavailable');
}));
for(const mode of ['untrusted-parent','holder-drift','parent-deadline','request-abort','wrong-version','transition','head'])test('original retained request cannot be renewed or borrowed: '+mode,()=>world(async f=>{assert.equal((await read(f,mode)).status,'unavailable');assert.equal(await f.stub.ownerEffectCount(),0);}));
