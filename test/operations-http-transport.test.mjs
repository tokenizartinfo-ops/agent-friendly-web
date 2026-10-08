import test from 'node:test';
import assert from 'node:assert/strict';
const load=()=>import('../lib/operations-http-transport.mjs');
const env={AFW_OPERATIONS_ACCESS_CLIENT_ID:'synthetic-id',AFW_OPERATIONS_ACCESS_CLIENT_SECRET:'synthetic-secret'};
test('transport pins destination and rejects unknown routes, methods and oversized bodies before sending',async()=>{
 const {createOperationsHttpTransport}=await load();const calls=[];
 const request=createOperationsHttpTransport({env,fetchImpl:async r=>{calls.push(r);return Response.json({ok:true});}});
 for(const [path,body] of [['//foreign.invalid'],['/incidents?x=1'],['/claim'],['/incidents',{}],['/assistance/occurrences/create',{x:'x'.repeat(1100)}]])await assert.rejects(request(path,body),/Operational request unavailable/);
 assert.equal(calls.length,0);
 assert.deepEqual(await request('/assistance/occurrences/create',{occurrenceId:crypto.randomUUID()}),{ok:true});
 assert.equal(calls.length,1);assert.equal(calls[0].url,'https://operations-manager.agentfriendlyweb.dev/assistance/occurrences/create');assert.equal(calls[0].redirect,'manual');assert.equal(calls[0].method,'POST');
});
test('lost responses and hostile content never retry or leak credentials into diagnostics',async()=>{
 const {createOperationsHttpTransport}=await load();
 for(const reply of [new Response(null,{status:302}),new Response('login',{headers:{'content-type':'text/html'}}),Response.json({secret:env.AFW_OPERATIONS_ACCESS_CLIENT_SECRET},{status:503}),new Response('x'.repeat(8300),{headers:{'content-type':'application/json'}})]){
  let calls=0;const diagnostics=[];const request=createOperationsHttpTransport({env,onDiagnostic:d=>diagnostics.push(d),fetchImpl:async()=>{calls++;return reply;}});
  await assert.rejects(request('/incidents'),e=>e.message==='Operational request unavailable');assert.equal(calls,1);assert.equal(JSON.stringify(diagnostics).includes(env.AFW_OPERATIONS_ACCESS_CLIENT_SECRET),false);
 }
});
test('timeout bounds body consumption and cancels its stream',async()=>{
 const {createOperationsHttpTransport}=await load();let cancelled=false;
 const reply=new Response(new ReadableStream({cancel(){cancelled=true;}}),{headers:{'content-type':'application/json'}});
 await assert.rejects(createOperationsHttpTransport({env,timeoutMs:15,fetchImpl:async()=>reply})('/incidents'),/Operational request unavailable/);assert.equal(cancelled,true);
});
