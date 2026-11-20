import test from 'node:test';
import assert from 'node:assert/strict';
import * as profile from '../lib/mcp-qa-finite-profile.mjs';

const historicalBindings={
 qaClosed:'69ee386c99509440ec3ca6bbf5e4296d04015e3f3fcd985b0c1afc09c4d04b0f',
 canaryClosed:'379f2f3e7f655675e30af08142fb38c30bae04624f6a2a79c2b64721d3ac4249',
 operatorClosed:'efeac7ce7d4eb2b3ca91321f502d3cbaf8394da5bde0a10bef4c035b4c3850bd'
};
test('historical source profiles pin each observed closed binding inventory',()=>{
 const receipts=Object.keys(historicalBindings).map(role=>{
  const receipt=profile.finitePublicStaticExpectation(role);
  assert.deepEqual(Object.keys(receipt).sort(),['bindingsHash','configurationHash','profileHash','purpose']);
  assert.equal(receipt.purpose,'afw.finite-public-static-profile.v1');
  assert.equal(receipt.bindingsHash,historicalBindings[role]);
  assert.match(receipt.configurationHash,/^[a-f0-9]{64}$/);
  assert.match(receipt.profileHash,/^[a-f0-9]{64}$/);
  assert(Object.isFrozen(receipt));
  return receipt;
 });
 assert.equal(new Set(receipts.map(receipt=>receipt.profileHash)).size,3);
 assert.throws(()=>profile.finitePublicStaticExpectation('foreign'));
});

test('closed proof refuses caller metadata and accessors before reading any private field',()=>{
 assert.equal(typeof profile.qualifyHistoricalClosedVersionProfile,'function');
 const claimed={id:'c570b60b-95dc-48e1-89f3-9c4651691dbc',main_module:'closed-rollback.mjs',
  urls:[],bindings:[{name:'AFW_QA_HTTP_ENABLED',type:'plain_text',text:'false'}]};
 assert.throws(()=>profile.qualifyHistoricalClosedVersionProfile('qaClosed',claimed),/unavailable/);
 assert.throws(()=>profile.qualifyHistoricalClosedVersionProfile('qaLive',claimed),/unavailable/);
 let reads=0;
 Object.defineProperty(claimed,'bindings',{enumerable:true,get(){reads++;return [];}});
 assert.throws(()=>profile.qualifyHistoricalClosedVersionProfile('qaClosed',claimed),/unavailable/);
 assert.equal(reads,0);
});
