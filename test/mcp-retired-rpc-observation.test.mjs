import test from 'node:test';
import assert from 'node:assert/strict';
let snapshotRetiredRpcObservation;
try{({snapshotRetiredRpcObservation}=await import('../lib/mcp-retired-rpc-observation.mjs'));}catch(error){if(error.code!=='ERR_MODULE_NOT_FOUND')throw error;}
const available={skip:typeof snapshotRetiredRpcObservation!=='function'};
const fixture=()=>({purpose:'afw.node-retirement-observation.v1',containerId:'a'.repeat(64),processGeneration:'b'.repeat(64),programHash:'c'.repeat(64),sourceRevision:'d'.repeat(40),image:'cloudflare/debian-trixie',createdAt:1000,expiresAt:2000,closedAt:2500,observedAt:3000,physicalStopVerified:false,mayStartSuccessor:false});
test('private retired-RPC boundary exposes its strict snapshot adapter',()=>assert.equal(typeof snapshotRetiredRpcObservation,'function'));
test('native lifecycle symbol is disposed once and never becomes domain evidence',available,()=>{
 const value=fixture();let disposed=0;Object.defineProperty(value,Symbol.dispose,{value:function(){assert.equal(this,value);disposed++;}});
 const result=snapshotRetiredRpcObservation(value);assert.deepEqual(result,fixture());assert.equal(Object.isFrozen(result),true);assert.equal(Reflect.ownKeys(result).length,12);assert.equal(disposed,1);
});
test('plain primitive DTO remains strict and immutable without a disposer',available,()=>{assert.deepEqual(snapshotRetiredRpcObservation(fixture()),fixture());});
test('extra fields, symbols, getters, nested capabilities and foreign prototypes fail closed',available,()=>{
 for(const kind of ['extra','symbol','getter','nested','prototype','dispose-getter','dispose-value']){
  const value=fixture();let disposed=0,getters=0;
  if(kind==='extra')value.extra=true;if(kind==='symbol')value[Symbol('other')]=true;
  if(kind==='getter')Object.defineProperty(value,'observedAt',{enumerable:true,get(){getters++;return 3000;}});
  if(kind==='nested')value.containerId={secret:'not-a-reference'};
  if(kind==='prototype')Object.setPrototypeOf(value,{foreign:true});
  if(kind==='dispose-getter')Object.defineProperty(value,Symbol.dispose,{get(){getters++;return ()=>{};}});
  else Object.defineProperty(value,Symbol.dispose,{value:kind==='dispose-value'?'not-a-function':()=>{disposed++;}});
  assert.throws(()=>snapshotRetiredRpcObservation(value));assert.equal(getters,0);
  assert.equal(disposed,['dispose-getter','dispose-value'].includes(kind)?0:1);
 }
});
test('cleanup failure cannot return an accepted snapshot',available,()=>{const value=fixture();Object.defineProperty(value,Symbol.dispose,{value(){throw Error('cleanup failed');}});assert.throws(()=>snapshotRetiredRpcObservation(value));});
