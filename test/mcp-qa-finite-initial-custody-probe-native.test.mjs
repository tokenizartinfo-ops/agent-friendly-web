import test from 'node:test';
import assert from 'node:assert/strict';
import {initialEntryHarness} from './fixtures/finite-initial-entry-world.mjs';
async function using(mode,fn){const f=await initialEntryHarness(mode);try{await fn(f);}finally{await f.stub.restoreMethods();await f.mf.dispose();await f.cleanup();}}
test('native actor observes fixed custody identity and old guard without effects',()=>using('normal',async f=>{
 const before=await f.stub.snapshot(),result=await f.stub.probeNativeCustody();
 assert.equal(result.status,'observed');assert.equal(result.guardVerified,true);assert.equal(result.authorizesEffects,false);assert.equal(result.operationalReadiness,false);
 assert.equal(result.reader.status,'active');assert.equal(result.publisher.status,'active');
 assert.deepEqual(await f.stub.snapshot(),before);assert.equal(f.uploads.length,0);assert.equal(f.restores.length,0);
 assert.equal(f.requests.filter(x=>x.endsWith('/tokens/verify')).length,2);
 assert.equal(f.requests.filter(x=>x.includes('/instances/afw-mcp-closure-d56b5e850d24cc23058a024d73bae4c830a91c1fb9659f2e96282854ccae2c04')).length,1);
 assert.equal(JSON.stringify(result).includes('synthetic-native'),false);assert.equal(JSON.stringify(result).includes('Bearer'),false);
}));
for(const mode of ['reader-wrong-id','publisher-wrong-id','reader-inactive','publisher-inactive','reader-expired','publisher-expired','reader-not-before','publisher-not-before'])test('native custody observation rejects '+mode,()=>using(mode,async f=>{
 const before=await f.stub.snapshot(),r=await f.stub.probeNativeCustody();assert.notEqual(r.status,'observed');assert.deepEqual(await f.stub.snapshot(),before);assert.equal(f.uploads.length,0);assert.equal(f.restores.length,0);
}));
test('old guard 401 stays unavailable without exposing credential or changing actor state',()=>using('normal',async f=>{
 f.oldGuardMode='http-401';const before=await f.stub.snapshot(),r=await f.stub.probeNativeCustody();assert.notEqual(r.status,'observed');assert.equal(JSON.stringify(r).includes('synthetic-native'),false);assert.deepEqual(await f.stub.snapshot(),before);
}));
for(const mode of ['aborted','expired'])test('unavailable parent prevents native custody reads '+mode,()=>using('normal',async f=>{
 const n=f.requests.length,r=await f.stub.probeNativeCustody(mode);assert.notEqual(r.status,'observed');assert.equal(f.requests.length,n);assert.equal(f.uploads.length,0);
}));

test('unscoped caller cannot start native custody reads',()=>using('normal',async f=>{
 const before=f.requests.length,r=await f.stub.probeNativeCustody('unscoped');
 assert.equal(r.status,'unavailable');assert.equal(f.requests.length,before);assert.equal(f.uploads.length,0);
}));
test('scoped pending custody read remains retained after timeout',()=>using('custody-hold',async f=>{
 const before=await f.stub.snapshot(),result=await f.stub.probeNativeCustody();
 assert.equal(result.status,'unavailable');assert.equal(f.held,'custody-read');
 try{assert.equal((await f.stub.probeStageAvailability()).available,false);}finally{f.release();}
 let available=false;for(let n=0;n<200&&!available;n++){available=(await f.stub.probeStageAvailability()).available;if(!available)await new Promise(resolve=>setTimeout(resolve,10));}
 assert.equal(available,true);assert.deepEqual(await f.stub.snapshot(),before);assert.equal(f.uploads.length,0);assert.equal(f.restores.length,0);
}));

test('pre-entry custody observes without entry or mutation',()=>using('normal',async f=>{
 const before=await f.stub.snapshot(),r=await f.stub.preEntryCustody();
 assert.equal(before.some(([key])=>key==='afw.finite-initial-preparation.v1:entry'),false);
 assert.equal(r.status,'observed');assert.equal(r.authorizesEffects,false);assert.equal(r.operationalReadiness,false);
 assert.deepEqual(await f.stub.snapshot(),before);assert.equal(f.uploads.length,0);assert.equal(f.restores.length,0);
 assert.equal(JSON.stringify(r).includes('synthetic-native'),false);
}));
test('pre-entry pending read retains exclusive scope after timeout',()=>using('custody-hold',async f=>{
 const before=await f.stub.snapshot(),r=await f.stub.preEntryCustody();assert.equal(r.status,'unavailable');assert.equal(f.held,'custody-read');
 try{assert.equal((await f.stub.probeStageAvailability()).available,false);assert.equal((await f.stub.preEntryCustody()).status,'unavailable');}finally{f.release();}
 let available=false;for(let n=0;n<200&&!available;n++){available=(await f.stub.probeStageAvailability()).available;if(!available)await new Promise(resolve=>setTimeout(resolve,10));}
 assert.equal(available,true);assert.deepEqual(await f.stub.snapshot(),before);assert.equal(f.uploads.length,0);
}));

for(const mode of ['reader-wrong-id','publisher-wrong-id','reader-expired','publisher-inactive'])test('pre-entry rejects '+mode,()=>using(mode,async f=>{
 const before=await f.stub.snapshot(),r=await f.stub.preEntryCustody();
 assert.equal(r.status,'unavailable');assert.deepEqual(await f.stub.snapshot(),before);assert.equal(f.uploads.length,0);assert.equal(f.restores.length,0);
}));

test('wrong native actor cannot start a pre-entry custody read',()=>using('normal',async f=>{
 const n=f.requests.length,before=await f.stub.snapshot(),r=await f.stub.preEntryCustody('wrong-actor');
 assert.equal(r.status,'unavailable');assert.equal(f.requests.length,n);assert.deepEqual(await f.stub.snapshot(),before);
}));
