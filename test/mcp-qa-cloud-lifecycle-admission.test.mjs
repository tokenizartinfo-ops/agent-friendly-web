import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFile} from 'node:fs/promises';
const api=await import('../lib/mcp-qa-cloud-lifecycle-admission.mjs').catch(()=>({}));
function fixture(){const at=Date.now(),sha='a'.repeat(40);return{at,wall:at,event:{action:'created',repository:{id:1347578006,full_name:'tokenizartinfo-ops/agent-friendly-web'},issue:{number:497},sender:{id:290715446,login:'tokenizartinfo-ops',type:'User'},comment:{id:6550000011,body:'/afw-qa-deploy-observe-restore v1 '+sha,created_at:new Date(at-1000).toISOString(),author_association:'OWNER',user:{id:290715446,login:'tokenizartinfo-ops',type:'User'}}},context:{repository:'tokenizartinfo-ops/agent-friendly-web',repositoryId:'1347578006',ref:'refs/heads/main',eventName:'issue_comment',runId:'41200000001',runAttempt:'1',sourceRevision:sha}};}
function admit(f){assert.equal(typeof api.validateQaLifecycleCommand,'function');return api.validateQaLifecycleCommand({event:f.event,context:f.context,now:()=>f.wall});}
const token='private_credential_not_for_output_123456789';
function response(a,f,status=201){return new Response(JSON.stringify({ref:'refs/tags/afw-qa-closed-rollback/'+a.intentId,object:{type:'commit',sha:a.sourceRevision}}),{status,headers:{'content-type':'application/json',date:new Date(f.wall).toUTCString()}});}
function claim(f,a,fetchImpl){assert.equal(typeof api.claimQaLifecycleOnce,'function');return api.claimQaLifecycleOnce({admission:a,credential:token,fetchImpl});}
test('exact owner admission binds original nominal/cleanup clocks and stable intent without runID',()=>{
 const f=fixture(),a=admit(f);assert.equal(a.purpose,'afw.qa-closed-lifecycle-command.v1');assert.equal(a.expiresAt,a.createdAt+300000);assert.equal(a.cleanupExpiresAt,a.expiresAt+180000);assert.equal(a.intentId,createHash('sha256').update('afw.qa-closed-lifecycle-command.v1\n1347578006\n'+a.commentId+'\n'+a.sourceRevision+'\n'+a.createdAt).digest('hex'));assert.ok(Object.isFrozen(a));
 f.context.runId='41200000002';assert.equal(admit(f).intentId,a.intentId);
 for(const k of ['authorizesEffects','operationalReadiness','mayRetry'])assert.equal(a[k],false);
});
for(const[name,attack]of Object.entries({
 repository:f=>{f.event.repository.id=1;},issue:f=>{f.event.issue.number=498;},PR:f=>{f.event.issue.pull_request={};},
 author:f=>{f.event.comment.user.id=1;},sender:f=>{f.event.sender.login='other';},bot:f=>{f.event.sender.type='Bot';},association:f=>{f.event.comment.author_association='NONE';},
 event:f=>{f.context.eventName='workflow_dispatch';},action:f=>{f.event.action='edited';},ref:f=>{f.context.ref='refs/heads/feature';},attempt:f=>{f.context.runAttempt='2';},
 source:f=>{f.context.sourceRevision='b'.repeat(40);},newline:f=>{f.event.comment.body+='\n';},shell:f=>{f.event.comment.body+=';echo SECRET';},oldPrefix:f=>{f.event.comment.body='/afw-own-closed-readback v1 '+f.context.sourceRevision;},
 future:f=>{f.event.comment.created_at=new Date(f.wall+1).toISOString();},expired:f=>{f.event.comment.created_at=new Date(f.wall-300000).toISOString();},unknownContext:f=>{f.context.url='https://other.invalid';},
 accessor:f=>{Object.defineProperty(f.event.comment,'body',{enumerable:true,get(){throw Error('PRIVATE');}});}
}))test('admission denies '+name,()=>{const f=fixture();attack(f);assert.throws(()=>admit(f));});
test('claim emits one fixed append-only GitHub request; cannot refund or repeat',async()=>{
 const f=fixture(),a=admit(f),seen=[];
 const fetchImpl=async(url,init)=>{seen.push({url,init});return response(a,f);};
 const r=await claim(f,a,fetchImpl);assert.equal(r.claimed,true);assert.equal(r.intentId,a.intentId);assert.equal(r.mayRetry,false);assert.ok(Object.isFrozen(r));assert.equal(seen.length,1);
 assert.equal(seen[0].url,'https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web/git/refs');assert.equal(seen[0].init.method,'POST');assert.equal(seen[0].init.redirect,'error');assert.equal(seen[0].init.cache,'no-store');
 assert.deepEqual(JSON.parse(seen[0].init.body),{ref:'refs/tags/afw-qa-closed-rollback/'+a.intentId,sha:a.sourceRevision});
 assert.equal(JSON.stringify(r).includes(token),false);
 assert.equal(api.assertQaLifecycleClaim(a),a);
 await assert.rejects(claim(f,a,fetchImpl));assert.equal(seen.length,1);
});
for(const mode of ['409duplicate','403denied','unknownACK','wrongSHA','wrongRef','lateACK','cached','largeBody','badDate','redirect']){
 test('claim preserves blocked state after '+mode+' and never retries',async()=>{
  const f=fixture(),a=admit(f);let calls=0;
  const fetchImpl=async()=>{calls++;if(mode==='unknownACK')throw Error(token);if(mode==='lateACK'){f.wall+=5000;return response(a,f);}
   if(mode==='409duplicate')return response(a,f,409);if(mode==='403denied')return response(a,f,403);if(mode==='redirect')return new Response('',{status:302,headers:{location:'https://other.invalid'}});
   if(mode==='wrongSHA')return new Response(JSON.stringify({ref:'refs/tags/afw-qa-closed-rollback/'+a.intentId,object:{type:'commit',sha:'b'.repeat(40)}}),{status:201,headers:{'content-type':'application/json',date:new Date(f.wall).toUTCString()}});
   if(mode==='wrongRef')return new Response(JSON.stringify({ref:'refs/heads/main',object:{type:'commit',sha:a.sourceRevision}}),{status:201,headers:{'content-type':'application/json',date:new Date(f.wall).toUTCString()}});
   if(mode==='largeBody')return new Response('x'.repeat(8193),{status:201,headers:{'content-type':'application/json',date:new Date(f.wall).toUTCString()}});
   const r=response(a,f);if(mode==='cached')r.headers.set('age','1');if(mode==='badDate')r.headers.set('date',new Date(f.wall-6000).toUTCString());return r;};
  await assert.rejects(claim(f,a,fetchImpl),e=>!String(e).includes(token));assert.throws(()=>api.assertQaLifecycleClaim(a));await assert.rejects(claim(f,a,fetchImpl));assert.equal(calls,1);
 });
}
test('forged admission cannot claim; unknown options do not create a resource selector',async()=>{
 const f=fixture(),a=admit(f);let calls=0;const fetchImpl=async()=>{calls++;return response(a,f);};
 await assert.rejects(claim(f,{...a},fetchImpl));assert.equal(calls,0);
 await assert.rejects(api.claimQaLifecycleOnce({admission:a,credential:token,fetchImpl,url:'https://other.invalid'}));assert.equal(calls,0);
});
test('nominal margin and cleanup are independent but use one original wall/monotonic origin',()=>{
 const f=fixture(),a=admit(f);assert.equal(api.assertQaLifecycleWindow(a,'nominal',180000),a);
 f.wall=a.expiresAt-179999;assert.throws(()=>api.assertQaLifecycleWindow(a,'nominal',180000));assert.equal(api.assertQaLifecycleWindow(a,'cleanup'),a);
 f.wall=a.expiresAt;assert.throws(()=>api.assertQaLifecycleWindow(a,'nominal'));assert.equal(api.assertQaLifecycleWindow(a,'cleanup'),a);
 f.wall=a.cleanupExpiresAt-1;assert.equal(api.assertQaLifecycleWindow(a,'cleanup'),a);f.wall++;assert.throws(()=>api.assertQaLifecycleWindow(a,'cleanup'));
});
test('clock rollback latches both windows; no lease renewal',()=>{
 const f=fixture(),a=admit(f);f.wall++;api.assertQaLifecycleWindow(a,'cleanup');f.wall--;assert.throws(()=>api.assertQaLifecycleWindow(a,'cleanup'));f.wall+=1000;assert.throws(()=>api.assertQaLifecycleWindow(a,'cleanup'));
});
test('aborted/late nominal claim cannot renew cleanup clock',async()=>{
 const f=fixture(),a=admit(f);await assert.rejects(claim(f,a,async()=>{f.wall=a.expiresAt;return response(a,f);}));
 assert.equal(api.assertQaLifecycleWindow(a,'cleanup'),a);assert.throws(()=>api.assertQaLifecycleClaim(a));f.wall=a.cleanupExpiresAt;assert.throws(()=>api.assertQaLifecycleWindow(a,'cleanup'));
});
test('existing writer and real source qualification use documented max queue without running cancellation',async()=>{
 const old=await readFile('.github/workflows/afw-qa-cloud-closed-rollback.yml','utf8'),probe=await readFile('.github/workflows/afw-qa-writer-queue-qualification.yml','utf8');
 assert.match(old,/group: afw-qa-cloud-closed-rollback\n  queue: max\n  cancel-in-progress: false/);
 assert.match(probe,/queue: max/);assert.match(probe,/cancel-in-progress: false/);assert.doesNotMatch(probe,/secrets\.|environment:|contents: write|workflow_dispatch/);assert.match(probe,/pull_request:/);
 const readback=await readFile('.github/workflows/afw-own-closed-readback.yml','utf8');assert.match(readback,/group: afw-own-closed-readback/);
});

test('concurrent claim calls consume before the first await',async()=>{
 const f=fixture(),a=admit(f);let calls=0,release;const waiting=new Promise(resolve=>{release=resolve;});
 const fetchImpl=async()=>{calls++;await waiting;return response(a,f);};
 const first=claim(f,a,fetchImpl);await assert.rejects(claim(f,a,fetchImpl));release();assert.equal((await first).claimed,true);assert.equal(calls,1);
});
test('monotonic deadline cannot be renewed by a stalled wall clock',()=>{
 const descriptor=Object.getOwnPropertyDescriptor(globalThis,'performance');let mono=100;
 Object.defineProperty(globalThis,'performance',{configurable:true,value:{now:()=>mono}});
 try{const f=fixture(),a=admit(f);mono+=479000;assert.throws(()=>api.assertQaLifecycleWindow(a,'cleanup'));}
 finally{Object.defineProperty(globalThis,'performance',descriptor);}
});
test('noncooperative fetch is stopped by the independent finite claim timer',async()=>{
 const f=fixture(),a=admit(f);let calls=0,signal;
 await assert.rejects(claim(f,a,async(_url,init)=>{calls++;signal=init.signal;return new Promise(()=>{});}));
 assert.equal(calls,1);assert.equal(signal.aborted,true);assert.throws(()=>api.assertQaLifecycleClaim(a));await assert.rejects(claim(f,a,async()=>{calls++;return response(a,f);}));assert.equal(calls,1);
});
