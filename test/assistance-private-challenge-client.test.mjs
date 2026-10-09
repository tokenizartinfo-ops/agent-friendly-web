import test from 'node:test';
import assert from 'node:assert/strict';
const load=()=>import('../lib/assistance-private-challenge-client.mjs');
const env={AFW_OPERATIONS_ACCESS_CLIENT_ID:'synthetic-id',AFW_OPERATIONS_ACCESS_CLIENT_SECRET:'synthetic-secret'},plan={recordRef:'a'.repeat(64),startAt:1000,deadline:2000},nonce='b'.repeat(64);
const receipt={contract:'afw-private-custody-challenge/v1',state:'confirmed',recordRef:plan.recordRef,receiptRef:'1de5f9b72dc310e0f89c461835db2ba9c790b8ecda7c1e4b9ac4e9c002729e2a',issuedAt:1100,deadline:2000,consumedAt:1200};
test('one client performs only two fixed requests and returns correlated metadata without nonce or credentials',async()=>{
 const {createPrivateChallengeClient}=await load(),calls=[];let t=1200;
 const client=createPrivateChallengeClient({env,now:()=>t,fetchImpl:async request=>{calls.push(request);assert.equal(request.url,'https://operations-manager.agentfriendlyweb.dev/assistance/custody/confirm');assert.equal(request.redirect,'manual');const body=await request.json();assert.deepEqual(body,calls.length===1?{challenge:'request'}:{nonce});return Response.json(calls.length===1?{nonce,recordRef:plan.recordRef}:receipt);}});
 assert.deepEqual(await client.confirm(plan),receipt);t=1300;await assert.rejects(client.confirm(plan),/unavailable/);assert.equal(calls.length,2);
 assert.ok(!JSON.stringify(receipt).includes(nonce));assert.ok(!JSON.stringify(receipt).includes(env.AFW_OPERATIONS_ACCESS_CLIENT_SECRET));
});
test('receipt must cryptographically correspond to the issued nonce, record and deadline',async()=>{
 const {createPrivateChallengeClient}=await load();let calls=0;
 const client=createPrivateChallengeClient({env,now:()=>1200,fetchImpl:async()=>Response.json(++calls===1?{nonce,recordRef:plan.recordRef}:{...receipt,receiptRef:'c'.repeat(64)})});
 await assert.rejects(client.confirm(plan));assert.equal(calls,2);
});
test('uncertain issue, uncorrelated receipt and redirected transport never retry or reissue',async()=>{
 const {createPrivateChallengeClient}=await load();
 for(const mode of ['lost','foreign','extra','redirect','bad-confirm','expired']){
  let calls=0,t=1200;
  const client=createPrivateChallengeClient({env,now:()=>t,fetchImpl:async()=>{calls++;if(mode==='lost')throw Error('synthetic-secret');if(mode==='redirect')return new Response(null,{status:302,headers:{location:'https://foreign.invalid'}});if(mode==='expired')t=2000;return Response.json(calls===1?{nonce,recordRef:mode==='foreign'?'d'.repeat(64):plan.recordRef,...(mode==='extra'?{unexpected:nonce}:{})}:{...receipt,recordRef:'d'.repeat(64)});}});
  await assert.rejects(client.confirm(plan),e=>e.message.includes('unavailable')&&!e.message.includes('synthetic-secret'));await assert.rejects(client.confirm(plan));assert.equal(calls,mode==='bad-confirm'?2:1);
 }
});
test('invalid plans do not send and monotonic deadline blocks confirmation after issue',async()=>{
 const {createPrivateChallengeClient}=await load();let calls=0,t=1200;
 const client=createPrivateChallengeClient({env,now:()=>t,fetchImpl:async()=>{calls++;t=1199;return Response.json({nonce,recordRef:plan.recordRef});}});
 for(const bad of [{...plan,recordRef:'foreign'},{...plan,deadline:1000},{...plan,extra:true}])await assert.rejects(client.confirm(bad));assert.equal(calls,0);
 await assert.rejects(client.confirm(plan));assert.equal(calls,1);await assert.rejects(client.confirm(plan));assert.equal(calls,1);
});
