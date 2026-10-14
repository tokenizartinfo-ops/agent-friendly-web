import test from 'node:test';
import assert from 'node:assert/strict';

test('invoker refuses blocked or unknown provider before connecting',async()=>{
 const {invokeReleaseOperator}=await import('../scripts/invoke-mcp-release-operator.mjs');let calls=0;
 for(const providerGate of ['blocked','unknown']){
  const r=await invokeReleaseOperator({planHash:'a'.repeat(64),checkProvider:async()=>({providerGate,mayRunClosedVerification:false}),connect:async()=>{calls++;}});
  assert.equal(r.status,'blocked');assert.equal(r.operationalReadiness,false);
 }assert.equal(calls,0);
});
test('invoker calls private RPC once, disposes, and never retries an uncertain result',async()=>{
 const {invokeReleaseOperator}=await import('../scripts/invoke-mcp-release-operator.mjs');let calls=0,disposed=0;
 const r=await invokeReleaseOperator({planHash:'a'.repeat(64),checkProvider:async()=>({providerGate:'resolved',mayRunClosedVerification:true}),connect:async()=>({env:{RELEASE_OPERATOR:{run:async()=>{calls++;throw Error('private credential must not leak');}}},dispose:async()=>{disposed++;}})});
 assert.equal(r.status,'uncertain');assert.equal(r.mayRetry,false);assert.equal(calls,1);assert.equal(disposed,1);assert.equal(JSON.stringify(r).includes('credential'),false);
});
