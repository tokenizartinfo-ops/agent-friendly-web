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
test('a separately configured proposal route authenticates before inference; context activation is unnecessary',async()=>{
 let calls=0;const env={AFW_GOAL_PROPOSAL_ENABLED:'true',AFW_GOAL_GENERATION_ENABLED:'true',AFW_GOAL_PROPOSAL_EXPIRES_AT:new Date(Date.now()+60000).toISOString(),AFW_GOAL_PROPOSAL_ENROLLMENT:JSON.stringify({projectId:'own',userId:'owner',since:new Date(Date.now()-1000).toISOString()}),AFW_GOAL_PROPOSAL_ACCESS_TEAM_DOMAIN:'test.cloudflareaccess.com',AFW_GOAL_PROPOSAL_ACCESS_AUD:'proposal-aud',AFW_GOAL_PROPOSAL_CLIENT_ID:'proposal-client',AFW_GOAL_CONTEXT_ACCESS_AUD:'read-aud',AFW_GOAL_CONTEXT_CLIENT_ID:'read-client',AFW_ASSISTANCE_ACCESS_AUD:'operations-aud',AFW_ASSISTANCE_CLIENT_ID:'operations-client',AFW_GOAL_PROPOSAL_SIGNING_SECRET:'synthetic-proposal-secret-minimum-32',AFW_GOAL_CONTEXT_SIGNING_SECRET:'synthetic-read-secret-minimum-thirty-two',AFW_ASSISTANCE_SIGNING_SECRET:'synthetic-operations-secret-minimum-32',AFW_GOAL_GENERATION_LOCALE:'es',ASSISTANCE_SOURCE_DB:{prepare(){}},OPERATIONS_DB:{prepare(){}},GOAL_PROPOSAL_RATE_LIMIT:{limit:async()=>({success:true})},AI:{run:async()=>{calls++;}}};
 const body={eventId:'a'.repeat(64),projectRef:'b'.repeat(64),runId:crypto.randomUUID(),receiptId:crypto.randomUUID(),revision:1};
 const request=()=>new Request('https://goal-context-canary.agentfriendlyweb.dev/proposal',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body)});
 assert.equal((await worker.fetch(request(),env)).status,401);assert.equal(calls,0);
 delete env.AI;assert.equal((await worker.fetch(request(),env)).status,503);
 env.AFW_GOAL_PROPOSAL_ENABLED='false';assert.equal((await worker.fetch(request(),env)).status,404);
});
