import test from 'node:test';
import assert from 'node:assert/strict';
import {setup} from './fixtures/finite-transport-native.mjs';
// Unit1 intentionally retires the CURRENT owner-flow prerequisites of these
// composed positives: post-commandBy normal/grant/revision/selection. Unit2b
// must restore all four once a qualified owner continuation is available.
test('current owner preparation cannot reach selected setup facts through the Unit1 pending fence',async t=>{
 const f=await setup(t,'normal',{setupFacts:true}),first=await f.screen();
 assert.equal((await f.publish(first)).status,'admin_pending');assert.equal(f.posts(),0);
 const before=await f.json('/fixture/rows',{});
 assert.equal(before.filter(([k])=>k.endsWith(':connection:approval')).length,1);
 assert.equal(before.filter(([k])=>k.startsWith('owner-ticket:')&&k.endsWith(':use')).length,1);
 for(const prefix of ['source-selection:','preparation:','afw.finite-policy-effect.v1:'])assert.equal(before.filter(([k])=>k.startsWith(prefix)).length,0);
 const result=await f.json('/fixture/task4-facts',{});
 assert.equal(result.outcome.status,'admin_pending');assert.notEqual(result.facts?.accepted,true);assert.equal(f.posts(),0);
 const after=await f.json('/fixture/rows',{});
 for(const [k,v]of before)assert.deepEqual(after.find(([key])=>key===k)?.[1],v);
 for(const prefix of ['source-selection:','preparation:','afw.finite-policy-effect.v1:'])assert.equal(after.filter(([k])=>k.startsWith(prefix)).length,0);
});
