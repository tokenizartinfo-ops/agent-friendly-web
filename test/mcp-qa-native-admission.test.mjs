import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import * as api from '../lib/mcp-qa-cloud-lifecycle-admission.mjs';
const source='a'.repeat(40),credential='synthetic.opaque+credential/=';
const purpose='afw.qa-native-observation-command.v1';
function fixture(native=true){const at=Date.now();return{wall:at,event:{action:'created',repository:{id:1347578006,full_name:'tokenizartinfo-ops/agent-friendly-web'},issue:{number:497},sender:{id:290715446,login:'tokenizartinfo-ops',type:'User'},comment:{id:6550000123,body:(native?'/afw-qa-native-observe-restore v1 ':'/afw-qa-deploy-observe-restore v1 ')+source,created_at:new Date(at-1000).toISOString(),author_association:'OWNER',user:{id:290715446,login:'tokenizartinfo-ops',type:'User'}}},context:{repository:'tokenizartinfo-ops/agent-friendly-web',repositoryId:'1347578006',ref:'refs/heads/main',eventName:'issue_comment',runId:'41200000123',runAttempt:'1',sourceRevision:source}};}
function options(f){return{event:f.event,context:f.context,now:()=>f.wall};}
function native(f){assert.equal(typeof api.validateQaNativeObservationCommand,'function');return api.validateQaNativeObservationCommand(options(f));}
function inspect(f){assert.equal(typeof api.inspectQaNativeCommand,'function');return api.inspectQaNativeCommand(options(f));}
function response(a,f,patch={},status=201){return new Response(JSON.stringify({ref:'refs/tags/afw-qa-closed-rollback/'+a.intentId,object:{type:'commit',sha:source},...patch}),{status,headers:{'content-type':'application/json',date:new Date(f.wall).toUTCString()}});}
function claim(a,fetchImpl,extra={}){assert.equal(typeof api.claimQaNativeObservationOnce,'function');return api.claimQaNativeObservationOnce({admission:a,credential,fetchImpl,...extra});}
test('native admission and stateless inspection bind identical original H/N1/R1',()=>{
 const f=fixture(),a=native(f),i=inspect(f);
 assert.equal(a.purpose,purpose);assert.ok(Object.isFrozen(a));assert.ok(Object.isFrozen(i));
 assert.equal(a.intentId,createHash('sha256').update(purpose+'\n1347578006\n'+a.commentId+'\n'+source+'\n'+a.createdAt).digest('hex'));
 for(const k of ['intentId','createdAt','expiresAt','cleanupExpiresAt','sourceRevision','commentId'])assert.equal(i[k],a[k]);
 assert.equal(i.purpose,'afw.qa-native-observation-preparation.v1');assert.equal(i.readOnly,true);
 assert.equal(a.expiresAt,a.createdAt+300000);assert.equal(a.cleanupExpiresAt,a.expiresAt+180000);
 for(const v of [a,i])for(const k of ['authorizesEffects','operationalReadiness','mayRetry'])assert.equal(v[k],false);
 f.context.runId='41200000124';assert.equal(native(f).intentId,a.intentId);
 const old=fixture(false);old.event.comment.created_at=f.event.comment.created_at;assert.notEqual(api.validateQaLifecycleCommand(options(old)).intentId,a.intentId);
});
test('preparation consumes original time without minting any authority or renewing admission',async()=>{
 const f=fixture(),i=inspect(f);f.wall+=110000;const a=native(f);assert.equal(a.expiresAt,i.expiresAt);assert.equal(a.cleanupExpiresAt,i.cleanupExpiresAt);
 assert.ok(api.remainingQaLifecycleWindow(a,'nominal')<=189000);
 let calls=0;const fetchImpl=async()=>{calls++;return response(a,f);};
 for(const forged of [i,{...a},Object.freeze({...a}),null]){
  assert.throws(()=>api.assertQaLifecycleWindow(forged,'nominal'));assert.throws(()=>api.assertQaLifecycleClaim(forged));assert.throws(()=>api.assertQaNativeObservationClaim(forged));
  await assert.rejects(claim(forged,fetchImpl));await assert.rejects(api.claimQaLifecycleOnce({admission:forged,credential,fetchImpl}));
 }
 assert.equal(calls,0);
 f.wall=a.expiresAt;assert.throws(()=>native(f));assert.throws(()=>inspect(f));
});
for(const[name,attack]of Object.entries({
 oldPrefix:f=>{f.event.comment.body='/afw-qa-deploy-observe-restore v1 '+source;},
 extra:f=>{f.event.comment.body+='\n';},wrongSHA:f=>{f.context.sourceRevision='b'.repeat(40);},
 actor:f=>{f.event.sender.id=1;},association:f=>{f.event.comment.author_association='MEMBER';},
 repository:f=>{f.context.repositoryId='1';},issue:f=>{f.event.issue.number=498;},pr:f=>{f.event.issue.pull_request={};},
 ref:f=>{f.context.ref='refs/heads/feature';},attempt:f=>{f.context.runAttempt='2';},
 event:f=>{f.context.eventName='workflow_dispatch';},edited:f=>{f.event.action='edited';},
 future:f=>{f.event.comment.created_at=new Date(f.wall+1).toISOString();},
 expired:f=>{f.event.comment.created_at=new Date(f.wall-300000).toISOString();},
 unknownContext:f=>{f.context.purpose=purpose;},
 accessor:f=>{Object.defineProperty(f.event.comment,'body',{enumerable:true,get(){throw Error('synthetic');}});}
}))test('both fixed native parsers reject '+name,()=>{const f=fixture();attack(f);assert.throws(()=>native(f));assert.throws(()=>inspect(f));});
test('factories have no caller-selectable command prefix or purpose',()=>{
 const f=fixture();assert.throws(()=>api.validateQaLifecycleCommand(options(f)));
 for(const method of ['validateQaNativeObservationCommand','inspectQaNativeCommand'])for(const field of ['purpose','prefix','url'])assert.throws(()=>api[method]({...options(f),[field]:'synthetic'}));
});
test('cross-kind claim and claim assertions fail before fetch, including already claimed admissions',async()=>{
 const f=fixture(),a=native(f),of=fixture(false),old=api.validateQaLifecycleCommand(options(of));let calls=0;
 const fetchImpl=async()=>{calls++;return response(a,f);};
 await assert.rejects(api.claimQaLifecycleOnce({admission:a,credential,fetchImpl}));await assert.rejects(claim(old,fetchImpl));assert.equal(calls,0);
 assert.throws(()=>api.assertQaLifecycleClaim(a));assert.throws(()=>api.assertQaNativeObservationClaim(old));
 await claim(a,fetchImpl);assert.equal(api.assertQaNativeObservationClaim(a),a);assert.throws(()=>api.assertQaLifecycleClaim(a));
 await api.claimQaLifecycleOnce({admission:old,credential,fetchImpl:async()=>response(old,of)});
 assert.equal(api.assertQaLifecycleClaim(old),old);assert.throws(()=>api.assertQaNativeObservationClaim(old));assert.equal(calls,1);
});
test('native claim uses the same fixed append-only namespace and opaque credential unchanged',async()=>{
 const f=fixture(),a=native(f),requests=[];const fetchImpl=async(url,init)=>{requests.push({url,init});return response(a,f);};
 const r=await claim(a,fetchImpl);assert.equal(r.purpose,'afw.qa-native-observation-claim.v1');assert.equal(r.claimed,true);assert.ok(Object.isFrozen(r));
 assert.equal(r.intentId,a.intentId);assert.equal(r.authorizesEffects,false);assert.equal(r.operationalReadiness,false);assert.equal(r.mayRetry,false);
 assert.equal(requests.length,1);const {url,init}=requests[0];assert.equal(url,'https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web/git/refs');
 assert.equal(init.method,'POST');assert.equal(init.redirect,'error');assert.equal(init.cache,'no-store');assert.equal(init.headers.Authorization,'Bearer '+credential);
 assert.deepEqual(JSON.parse(init.body),{ref:'refs/tags/afw-qa-closed-rollback/'+a.intentId,sha:source});assert.equal(JSON.stringify(r).includes(credential),false);
 await assert.rejects(claim(a,fetchImpl));assert.equal(requests.length,1);
});
for(const mode of ['409','403','unknownACK','wrongSHA','wrongRef','wrongType','lateACK','cache','date','body','length','redirect']){
 test('native claim consumes before '+mode+' and never refunds',async()=>{
  const f=fixture(),a=native(f);let calls=0;const fetchImpl=async()=>{calls++;
   if(mode==='unknownACK')throw Error(credential);if(mode==='lateACK'){f.wall+=5000;return response(a,f);}
   if(mode==='409'||mode==='403')return response(a,f,{},Number(mode));
   if(mode==='wrongSHA'||mode==='wrongType')return response(a,f,{object:{type:mode==='wrongType'?'tag':'commit',sha:mode==='wrongSHA'?'b'.repeat(40):source}});
   if(mode==='wrongRef')return response(a,f,{ref:'refs/heads/main'});
   if(mode==='redirect')return new Response('',{status:302});
   if(mode==='body')return new Response('x'.repeat(8193),{status:201,headers:{'content-type':'application/json',date:new Date(f.wall).toUTCString()}});
   const r=response(a,f);if(mode==='cache')r.headers.set('age','1');if(mode==='date')r.headers.set('date',new Date(f.wall-6000).toUTCString());if(mode==='length')r.headers.set('content-length','8193');return r;};
  await assert.rejects(claim(a,fetchImpl),e=>!String(e).includes(credential));assert.throws(()=>api.assertQaNativeObservationClaim(a));await assert.rejects(claim(a,fetchImpl));assert.equal(calls,1);
 });
}
test('native claim consumes before first await and concurrent calls cannot send twice',async()=>{
 const f=fixture(),a=native(f);let calls=0,release;const pending=new Promise(resolve=>{release=resolve;});
 const fetchImpl=async()=>{calls++;await pending;return response(a,f);};const first=claim(a,fetchImpl);await assert.rejects(claim(a,fetchImpl));release();await first;assert.equal(calls,1);
});
test('both original native clocks survive nominal failure and cannot renew',()=>{
 const f=fixture(),a=native(f);f.wall=a.expiresAt-179999;assert.throws(()=>api.assertQaLifecycleWindow(a,'nominal',180000));assert.equal(api.assertQaLifecycleWindow(a,'cleanup'),a);
 f.wall=a.expiresAt;assert.throws(()=>api.assertQaLifecycleWindow(a,'nominal'));assert.equal(api.assertQaLifecycleWindow(a,'cleanup'),a);
 f.wall=a.cleanupExpiresAt;assert.throws(()=>api.assertQaLifecycleWindow(a,'cleanup'));
});
test('native monotonic ends reject stalled wall; inspection does not touch performance',()=>{
 const descriptor=Object.getOwnPropertyDescriptor(globalThis,'performance');let mono=100;
 Object.defineProperty(globalThis,'performance',{configurable:true,value:{now:()=>mono}});
 try{const f=fixture(),a=native(f);mono+=299000;assert.throws(()=>api.assertQaLifecycleWindow(a,'nominal'));assert.equal(api.assertQaLifecycleWindow(a,'cleanup'),a);
 mono+=180000;assert.throws(()=>api.assertQaLifecycleWindow(a,'cleanup'));
 Object.defineProperty(globalThis,'performance',{configurable:true,value:{now:()=>{throw Error('no monotonic authority in inspection');}}});assert.ok(inspect(f).readOnly);
 }finally{Object.defineProperty(globalThis,'performance',descriptor);}
});
test('native clock rollback poisons both windows',()=>{
 const f=fixture(),a=native(f);f.wall++;api.assertQaLifecycleWindow(a,'cleanup');f.wall--;assert.throws(()=>api.assertQaLifecycleWindow(a,'cleanup'));f.wall+=1000;assert.throws(()=>api.assertQaLifecycleWindow(a,'cleanup'));
});
test('native noncooperative fetch has one finite timer and no second send',async()=>{
 const f=fixture(),a=native(f);let calls=0,signal;
 await assert.rejects(claim(a,async(_url,init)=>{calls++;signal=init.signal;return new Promise(()=>{});}));
 assert.equal(signal.aborted,true);assert.equal(calls,1);assert.throws(()=>api.assertQaNativeObservationClaim(a));await assert.rejects(claim(a,async()=>{calls++;return response(a,f);}));assert.equal(calls,1);
});
test('native margin failure and invalid options cannot fetch',async()=>{
 const f=fixture(),a=native(f);let calls=0;const fetchImpl=async()=>{calls++;return response(a,f);};
 for(const bad of ['', 'x'.repeat(8193),'bad\nheader'])await assert.rejects(api.claimQaNativeObservationOnce({admission:a,credential:bad,fetchImpl}));
 await assert.rejects(claim(a,fetchImpl,{url:'https://other.invalid'}));assert.equal(calls,0);
 f.wall=a.expiresAt-179999;await assert.rejects(claim(a,fetchImpl));assert.equal(calls,0);
});
