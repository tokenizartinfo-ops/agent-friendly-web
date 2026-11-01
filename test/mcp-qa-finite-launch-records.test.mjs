import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
// New source primitives; absence is asserted as RED rather than an import error.
const api=await import('../lib/mcp-qa-finite-launch-records.mjs').catch(()=>({}));
const h=(domain,value)=>createHash('sha256').update(domain+'\n'+JSON.stringify(Object.fromEntries(Object.entries(value).sort(([a],[b])=>a<b?-1:1)))).digest('hex');
const T0=1700000000000, sourceRevision='b'.repeat(40), intentId='finite-test-001';
const launcherId='afw-finite-launch-'+h('afw.finite-launcher.v1',{intentId,sourceRevision});
const identity={intentId,finitePlanHash:'1'.repeat(64),controlHash:'2'.repeat(64),sourceRevision,qaVersionId:'11111111-1111-4111-8111-111111111111',actorId:'3'.repeat(64),launcherId,nominalId:'afw-release-'+'4'.repeat(64),bundleHash:'4'.repeat(64),nominalClaimHash:'5'.repeat(64)};
const policy={armAckBy:T0+90000,launchAt:T0+150000,lastCreateAt:T0+160000};
const prepared={purpose:'afw.qa-finite-launch-prepared.v1',...identity,guardStateHash:'6'.repeat(64),preparedAt:T0+90000,...policy};
const send={purpose:'afw.qa-finite-child-create-send.v1',...identity,preparedHash:'7'.repeat(64),bindingHash:'8'.repeat(64),issuedAt:policy.launchAt,deadline:policy.lastCreateAt};
const ack={purpose:'afw.qa-finite-child-create-ack.v1',intentId,controlHash:identity.controlHash,sendHash:'9'.repeat(64),nominalId:identity.nominalId,acknowledgedAt:policy.lastCreateAt-1};
test('launcher identity uses the exact new domain and canonical key order',()=>{
 assert.equal(typeof api.finiteLauncherInstanceId,'function');
 assert.equal(api.finiteLauncherInstanceId({sourceRevision,intentId}),launcherId);
 assert.throws(()=>api.finiteLauncherInstanceId({intentId,sourceRevision,extra:true}));
 assert.throws(()=>api.finiteLauncherInstanceId({intentId,sourceRevision:'B'.repeat(40)}));
});
test('launch policy is exact original T0 arithmetic with safe dates',()=>{
 assert.equal(typeof api.validateFiniteLaunchPolicy,'function');
 assert.deepEqual(api.validateFiniteLaunchPolicy({T0,launchPolicy:policy}),policy);
 for(const k of Object.keys(policy))for(const value of [policy[k]+1,NaN,Infinity,-1,8640000000000001]){
  assert.throws(()=>api.validateFiniteLaunchPolicy({T0,launchPolicy:{...policy,[k]:value}}),k);
 }
 assert.throws(()=>api.validateFiniteLaunchPolicy({T0,launchPolicy:{...policy,extra:true}}));
 assert.throws(()=>api.validateFiniteLaunchPolicy({T0:8640000000000000,launchPolicy:policy}));
});
for(const [name,value]of [['validateFiniteLaunchPrepared',prepared],['validateFiniteChildCreateSend',send],['validateFiniteChildCreateAck',ack]]){
 test(name+' validates exact immutable data and canonical purpose hash',()=>{
  assert.equal(typeof api[name],'function');assert.equal(typeof api.hashFiniteLaunchRecord,'function');
  const result=api[name](value);assert.deepEqual(result,value);assert.ok(Object.isFrozen(result));
  assert.equal(api.hashFiniteLaunchRecord(value),h(value.purpose,value));
  assert.equal(api.hashFiniteLaunchRecord(Object.fromEntries(Object.entries(value).reverse())),h(value.purpose,value));
  for(const key of Object.keys(value)){const copy={...value};delete copy[key];assert.throws(()=>api[name](copy),key);}
  assert.throws(()=>api[name]({...value,extra:true}));
  assert.throws(()=>api[name](Object.create(value)));
  const getter={...value};Object.defineProperty(getter,'intentId',{enumerable:true,get(){throw Error('getter must not run');}});
  assert.throws(()=>api[name](getter),/unavailable/);
  for(const key of Object.keys(value).filter(k=>/Hash$/.test(k)))assert.throws(()=>api[name]({...value,[key]:'G'.repeat(64)}),key);
  assert.throws(()=>api.hashFiniteLaunchRecord({...value,purpose:'arbitrary'}));
 });
}
test('prepared identity and arm acknowledgement reject altered IDs and timing',()=>{
 assert.equal(typeof api.validateFiniteLaunchPrepared,'function');
 for(const change of [{launcherId:'afw-finite-launch-'+'0'.repeat(64)},{nominalId:'afw-release-'+'0'.repeat(64)},{preparedAt:policy.armAckBy+1},{preparedAt:T0-1},{launchAt:policy.launchAt+1},{qaVersionId:'bad'},{sourceRevision:'0'.repeat(64)}])assert.throws(()=>api.validateFiniteLaunchPrepared({...prepared,...change}));
});
test('SEND has original half-open create window, distinct from permission claim',()=>{
 assert.equal(typeof api.validateFiniteChildCreateSend,'function');
 for(const issuedAt of [policy.launchAt,policy.lastCreateAt-1])assert.equal(api.validateFiniteChildCreateSend({...send,issuedAt}).issuedAt,issuedAt);
 for(const issuedAt of [policy.launchAt-1,policy.lastCreateAt])assert.throws(()=>api.validateFiniteChildCreateSend({...send,issuedAt}));
 assert.throws(()=>api.validateFiniteChildCreateSend({...send,purpose:'afw.qa-finite-trial.v1:effect'}));
});
test('ACK accepts only safe factual timestamp and exact nominal identity grammar',()=>{
 assert.equal(typeof api.validateFiniteChildCreateAck,'function');
 assert.throws(()=>api.validateFiniteChildCreateAck({...ack,acknowledgedAt:NaN}));
 assert.throws(()=>api.validateFiniteChildCreateAck({...ack,nominalId:launcherId}));
});
