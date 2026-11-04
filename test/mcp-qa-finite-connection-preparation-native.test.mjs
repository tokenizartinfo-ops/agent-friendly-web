import test from 'node:test';
import assert from 'node:assert/strict';
import {setup} from './fixtures/finite-transport-native.mjs';
test('first genuine owner decision stops pending before permission phases, receipts, selection or audit',async t=>{
 const f=await setup(t),first=await f.screen(),answer=await f.publish(first);
 assert.equal(answer.status,'admin_pending');assert.equal(answer.mayRetry,false);assert.equal(f.posts(),0);
 const all=await f.json('/fixture/rows',{});
 assert.equal(all.filter(([k])=>k.startsWith('connection-preparation:')&&k.endsWith(':connection:approval')).length,1);
 assert.equal(all.filter(([k])=>k.startsWith('owner-ticket:')&&k.endsWith(':use')).length,1);
 for(const prefix of ['afw.finite-policy-effect.v1:','preparation:','source-selection:'])assert.equal(all.filter(([k])=>k.startsWith(prefix)).length,0);
 assert.equal(all.filter(([k])=>/:grant$|:notice$|:connection$|:notices:approval$|:finite:approval$/.test(k)).length,0);
 const next=await f.call('/connections/finite-prepare',{headers:{Cookie:first.cookie}});assert.equal(next.status,503);assert.equal(next.headers.get('Set-Cookie'),null);
 assert.equal((await f.publish(first)).status,'admin_pending');assert.equal(f.posts(),0);
 assert.deepEqual(await f.json('/fixture/rows',{}),all,'used owner decision cannot be repaired or advanced');
});
