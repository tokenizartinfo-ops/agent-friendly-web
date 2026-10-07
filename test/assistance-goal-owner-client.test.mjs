import test from 'node:test';
import assert from 'node:assert/strict';
const contract=await import('../lib/assistance-goal-owner-client.mjs').catch(()=>({}));
const proposalId='11111111-1111-4111-8111-111111111111',sourceId='help-'+ 'a'.repeat(64),time=1791323200000;
const guidance={proposalId,message:{question:'¿Por dónde empezamos?',why:'Vamos de a un paso.'},revision:3,preparedAt:time,expiresAt:time+60000,expired:false,stale:false,confirmedAt:null};
test('reading retry keeps the exact proposal, revision and request; response only confirms reading',async()=>{
 assert.equal(typeof contract.createGoalReadConfirmationAttempt,'function');
 const attempt=contract.createGoalReadConfirmationAttempt({sourceId,proposalId,revision:3});
 const first=attempt.body();assert.deepEqual(attempt.body(),first);assert.equal(Object.keys(first).length,4);first.expectedRevision=99;assert.equal(attempt.body().expectedRevision,3);
 assert.deepEqual(await contract.readGoalReadConfirmationResponse(Response.json({confirmedAt:time}),{now:time}),{confirmedAt:time});
 await assert.rejects(()=>contract.readGoalReadConfirmationResponse(Response.json({confirmedAt:time,accepted:true}),{now:time}));
});
test('minimal guidance parser rejects extra fields, active expiry inconsistency and stale confirmation',async()=>{
 assert.equal(typeof contract.readOwnerGuidanceResponse,'function');
 assert.deepEqual(await contract.readOwnerGuidanceResponse(Response.json({guidance}),{now:time}),{guidance});
 for(const bad of [{...guidance,privateGoals:['discovery']},{...guidance,expired:false,expiresAt:time},{...guidance,confirmedAt:time-1},{...guidance,message:{question:'<script>?',why:'x'}}])await assert.rejects(()=>contract.readOwnerGuidanceResponse(Response.json({guidance:bad}),{now:time}));
 await assert.rejects(()=>contract.readOwnerGuidanceResponse(Response.json({guidance,payload:'secret'}),{now:time}));
});
test('bounded reader cancels oversized and stalled bodies',async()=>{
 assert.equal(typeof contract.readOwnerGuidanceResponse,'function');
 await assert.rejects(()=>contract.readOwnerGuidanceResponse(new Response('x'.repeat(5000),{headers:{'content-type':'application/json'}}),{now:time}));
 let cancelled=false;
 const response=new Response(new ReadableStream({pull(){return new Promise(()=>{});},cancel(){cancelled=true;}}),{headers:{'content-type':'application/json'}});
 await assert.rejects(()=>contract.readOwnerGuidanceResponse(response,{now:time,timeoutMs:20}));assert.equal(cancelled,true);
});
