import test from 'node:test';
import assert from 'node:assert/strict';
import {initialEntryHarness} from './fixtures/finite-initial-entry-world.mjs';
const P='afw.finite-preparation-cleanup.v1:';
async function plain(p){const r=await p;try{return JSON.parse(JSON.stringify(r));}finally{r[Symbol.dispose]?.();}}
async function world(fn){const f=await initialEntryHarness('enrollment');try{await f.stub.configure('normal');assert.equal((await plain(f.stub.invoke(f.refs))).status,'material_recorded');await f.stub.restoreMethods();await fn(f);}finally{await f.stub.restoreMethods();await f.mf.dispose();await f.cleanup();}}
test('causal: genuine owner POST consumes admission for actual original native capsule, enrolls once, remains pending without owner SEND',()=>world(async f=>{
 const before=await plain(f.stub.snapshot()),capsule=JSON.parse(before.find(([k])=>k.endsWith(':capsule'))[1]);
 const source=(await plain(f.ownerRead())).source,token=await f.enrollmentToken(source);
 const screen=await plain(f.stub.enrollmentScreen(token));
 assert.equal(screen.preconnectionId,capsule.preconnectionId);
 const r=await plain(f.stub.enrollmentPost(token,screen));assert.equal(r.prepared.status,202);assert.match(r.result.admitted,/^[a-f0-9]{64}$/);
 assert.equal(r.result.outcome.status,'admin_pending');
 const rows=await plain(f.stub.snapshot());assert.equal(rows.filter(([k])=>k.startsWith(P)).length,2);
 assert.equal(f.uploads.length,1);assert.equal(f.activations.length,1);
 assert.equal(rows.filter(([k])=>k.startsWith('afw.finite-policy-effect.v1:')).length,0);
 for(const [k,v]of before)assert.equal(rows.find(([key])=>key===k)?.[1],v);
 assert.equal(await f.stub.alarmInfo(),capsule.C0);
}));
