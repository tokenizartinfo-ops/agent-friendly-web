import test from 'node:test';
import assert from 'node:assert/strict';
const client=await import('../lib/assistance-goal-consent-client.mjs').catch(()=>({}));
const sourceId='help-'+'a'.repeat(64),now=Date.now();
test('lost consent receipt reuses one bounded intent without retargeting another source',()=>{
 assert.equal(typeof client.createGoalConsentAttempt,'function');
 const attempt=client.createGoalConsentAttempt(),args={action:'grant',sourceId,revision:3,stateVersion:'b'.repeat(64)};
 const first=attempt.prepare(args);assert.deepEqual(attempt.prepare(args),first);
 assert.deepEqual(attempt.retry(),first);
 const body=JSON.parse(first.body);assert.equal(body.consentVersion,'afw.assistance-goals-consent.v1');assert.equal(body.expectedRevision,3);
 assert.equal(Object.keys(body).length,6);
 assert.throws(()=>attempt.prepare({...args,action:'revoke'}),/Pending consent intent/);
 attempt.confirm();assert.notEqual(attempt.prepare(args).body,first.body);
});
test('permission reader accepts only the public bounded state and rejects private metadata',async()=>{
 const state={granted:true,issuedAt:now-1000,expiresAt:now+10000,stateVersion:'b'.repeat(64)};
 assert.deepEqual(await client.readGoalConsentResponse(Response.json(state)),state);
 const empty={granted:false,issuedAt:null,expiresAt:null,stateVersion:'b'.repeat(64)};
 assert.deepEqual(await client.readGoalConsentResponse(Response.json(empty)),empty);
 for(const bad of [{...state,sequence:1},{...state,userId:'private'}, {...state,expiresAt:state.issuedAt+600001},{...state,expiresAt:0},{...state,issuedAt:9000000000000000,expiresAt:9000000000000001}])await assert.rejects(client.readGoalConsentResponse(Response.json(bad)));
 await assert.rejects(client.readGoalConsentResponse(new Response('x'.repeat(513),{headers:{'content-type':'application/json'}})));
 await assert.rejects(client.readGoalConsentResponse(Response.json({code:'unavailable'},{status:404})));
 await assert.rejects(client.readGoalConsentResponse(Response.json({code:'consent_changed'},{status:409})),error=>error.status===409);
});
test('a stalled permission response is cancelled without inventing a confirmed state',async()=>{
 let cancelled=false;
 const response=new Response(new ReadableStream({pull(){return new Promise(()=>{});},cancel(){cancelled=true;}}),{headers:{'content-type':'application/json'}});
 await assert.rejects(client.readGoalConsentResponse(response),/timeout/);
 assert.equal(cancelled,true);
});
