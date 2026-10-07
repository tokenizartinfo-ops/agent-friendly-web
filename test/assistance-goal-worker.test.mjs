import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../worker/assistance-goal-context/index.mjs';
test('the independent entrypoint remains closed with no bindings or credentials',async()=>{
 for(const path of ['/context','/context?owner=private','/proposal','/publish']){
  const response=await worker.fetch(new Request('https://goal-context-canary.agentfriendlyweb.dev'+path,{method:'POST'}),{});
  assert.equal(response.status,404);assert.deepEqual(await response.json(),{code:'unavailable'});
 }
});
test('proposal runtime remains independent of context activation and missing custodial bindings',async()=>{
 const response=await worker.fetch(new Request('https://goal-context-canary.agentfriendlyweb.dev/proposal',{method:'POST'}),{AFW_GOAL_CONTEXT_ENABLED:'true'});
 assert.equal(response.status,404);
});
