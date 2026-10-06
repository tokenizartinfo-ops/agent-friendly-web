import test from 'node:test';
import assert from 'node:assert/strict';
const client=await import('../lib/dossier-assistance-client.mjs').catch(()=>({}));
test('lost help receipt reuses the same request and rejects invented review status',async()=>{
 assert.equal(typeof client.createAssistanceAttempt,'function');
 const attempt=client.createAssistanceAttempt(),first=attempt.prepare('p',3,'save');
 assert.deepEqual(attempt.prepare('p',4,'delivery'),first,'unconfirmed intent survives later edits');
 const receipt={id:'help-'+'a'.repeat(64),requestedAt:'2026-10-06T16:00:00.000Z',revision:3,topic:'save',state:'received',stale:false};
 assert.deepEqual(await client.readAssistanceResponse(Response.json({status:200,receipt})),receipt);
 await assert.rejects(()=>client.readAssistanceResponse(Response.json({status:200,receipt:{...receipt,state:'resolved'}})));
 await assert.rejects(()=>client.readAssistanceResponse(Response.json({status:200,receipt:{...receipt,notes:'private'}})));
 await assert.rejects(()=>client.readAssistanceResponse(Response.json({status:200,receipt:null})),/unconfirmed/);
 await assert.rejects(()=>client.readAssistanceResponse(Response.json({status:200,receipt}),{expected:{expectedRevision:4,topic:'save'}}));
 await assert.rejects(()=>client.readAssistanceResponse(Response.json({status:409,code:'project_changed'},{status:409})),error=>error.code==='project_changed');
 attempt.confirm();assert.notEqual(attempt.prepare('p',4,'delivery').body,first.body);
});
