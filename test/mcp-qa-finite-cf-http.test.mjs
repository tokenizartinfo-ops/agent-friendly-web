import test from 'node:test';
import assert from 'node:assert/strict';
import {cfFiniteFixture} from './fixtures/finite-cf-http.mjs';
import {createPrivateQaFiniteTrialFinalizer} from '../lib/mcp-qa-finite-trial-finalizer.mjs';
test('real fixed HTTP adapters recover terminal proof, perform one QA POST and separate GET-only readback',async()=>{
 const f=await cfFiniteFixture(),a=f.adapters();
 const r=await createPrivateQaFiniteTrialFinalizer({plan:f.p,readSnapshot:a.readSnapshot,claim:a.claim,deployClosed:a.deployClosed,now:f.base.f.now,signal:new AbortController().signal}).run();
 assert.equal(r.status,'restored_observed');assert.equal(f.state.posts,1);
 assert.ok(f.requests.some(x=>x.url.includes('/versions/77777777-7777-4777-8777-777777777777')));
 const cfPosts=f.requests.filter(x=>x.method==='POST'&&x.url.includes('api.cloudflare.com'));
 assert.equal(cfPosts.length,1);assert.ok(cfPosts[0].url.endsWith('/workers/scripts/agent-friendly-web-independent-closure-qa/deployments'));
 assert.equal(f.requests.some(x=>/\/d1\/|\/durable_objects\/.*\/invoke/.test(x.url)),false);
});
for(const mode of ['bad-token','bad-scope','wrong-first','wrong-native'])test('actual CF grammar rejects '+mode+' before GitHub effect fence',async()=>{
 const f=await cfFiniteFixture();f.state.mode=mode;const a=f.adapters();
 const r=await createPrivateQaFiniteTrialFinalizer({plan:f.p,readSnapshot:a.readSnapshot,claim:a.claim,deployClosed:a.deployClosed,now:f.base.f.now,signal:new AbortController().signal}).run();
 assert.equal(r.status,'admin_pending');assert.equal(f.gh.refPosts,0);assert.equal(f.state.posts,0);
});
test('successful first-step output is readable while observer stays active; technical only',async()=>{
 const f=await cfFiniteFixture();f.state.observerStatus='running';const preview=await f.observer().preview();assert.equal(preview.controlHash,f.v.controlHash);assert.equal(JSON.stringify(preview).includes('selectors'),false);
});
test('caller ready boolean cannot create observer and consume a native occurrence',async()=>{
 const f=await cfFiniteFixture();await assert.rejects(f.observer().create(true));assert.equal(f.requests.length,0);
});

test('parent abort after first custody response cannot start further authenticated reads',async()=>{
 const f=await cfFiniteFixture(),parent=new AbortController(),original=f.fetchImpl;let calls=0;
 // The named read operation propagates its parent through both custody GETs.
 const {createPrivateQaFiniteObserverHttp}=await import('../lib/mcp-qa-finite-http.mjs');
 const o=createPrivateQaFiniteObserverHttp({admission:{intentId:f.v.intentId,sourceRevision:f.v.sourceRevision,T0:f.v.T0,R1:f.v.R1},source:{qaLive:f.p.deployments.qaLive,custody:f.p.custody},credential:'synthetic_cf',githubToken:'synthetic_gh',fetchImpl:async(...args)=>{calls++;const r=await original(...args);parent.abort();return r;},now:f.base.f.now,signal:new AbortController().signal});
 await assert.rejects(o.qualifyCustody(parent.signal,()=>{}));assert.equal(calls,1);
});

test('lost Workflow create ACK reconciles the exact instance and never sends a replacement',async()=>{
 const {validateQaFiniteConfirmationCommand}=await import('../lib/mcp-qa-cloud-lifecycle-admission.mjs');
 const {claimFiniteObserverCreation,createPrivateQaFiniteObserverHttp,createPrivateQaFiniteGithub}=await import('../lib/mcp-qa-finite-http.mjs');
 const {finiteObserverInstanceId}=await import('../lib/mcp-qa-finite-observer.mjs');
 const at=Date.now(),sha='b'.repeat(40),actor={id:290715446,login:'tokenizartinfo-ops',type:'User'};
 const event={action:'created',repository:{id:1347578006,full_name:'tokenizartinfo-ops/agent-friendly-web'},issue:{number:497},sender:{...actor},comment:{id:123,body:'/afw-qa-finite-confirmation v1 '+sha,created_at:new Date(at).toISOString(),author_association:'OWNER',user:{...actor}}};
 const context={repository:'tokenizartinfo-ops/agent-friendly-web',repositoryId:'1347578006',ref:'refs/heads/main',eventName:'issue_comment',runId:'11',runAttempt:'1',sourceRevision:sha};
 let observed=at+100;
 const admission=validateQaFiniteConfirmationCommand({event,context,now:()=>observed});
 const f=await cfFiniteFixture({at,configure:p=>{p.intentId=admission.intentId;p.workflows.bootstrap=finiteObserverInstanceId({intentId:p.intentId,sourceRevision:p.source.revision});}});
 f.base.f.setNow(at+100);f.state.observerStatus='running';f.gh.rows.delete('refs/tags/afw-finite-observer-create/'+admission.intentId);
 let sends=0;
 const fetchImpl=async(url,init)=>{if(init.method==='POST'&&url.includes('api.cloudflare.com')){sends++;const body=JSON.parse(init.body);assert.equal(body.id,f.p.workflows.bootstrap);assert.deepEqual(body.params,{operation:'finite_cleanup_observer',intentId:admission.intentId,sourceRevision:sha});throw Error('synthetic lost create ACK');}return f.fetchImpl(url,init);};
 const signal=new AbortController().signal,options={githubToken:'synthetic_gh',fetchImpl,now:f.base.f.now,signal};
 const token=await claimFiniteObserverCreation({admission,...options});
 const observer=createPrivateQaFiniteObserverHttp({admission:{intentId:admission.intentId,sourceRevision:sha,T0:at,R1:at+480000},source:{qaLive:f.p.deployments.qaLive,custody:f.p.custody},credential:'synthetic_cf',...options});
 assert.equal((await observer.create(token)).status,'running');assert.equal(sends,1);
 await assert.rejects(observer.create(token));await assert.rejects(claimFiniteObserverCreation({admission,...options}));
 assert.equal((await observer.read()).preview.controlHash,f.v.controlHash);assert.equal(sends,1);
 const ready=createPrivateQaFiniteGithub({plan:f.p,...options});
 assert.equal((await ready.persistAdmission('synthetic_cf',admission)).controlPlanHash,f.v.planHash);
 const beforeRefs=f.gh.refPosts,beforeTags=f.gh.tagPosts;
 const late=createPrivateQaFiniteGithub({plan:f.p,...options,fetchImpl:async(url,init)=>{
  const response=await fetchImpl(url,init);
  if(url.endsWith('/git/tags')&&init.method==='POST'){observed=at+120001;f.base.f.setNow(observed);}
  return response;
 }});
 await assert.rejects(late.persistAdmission('synthetic_cf',admission));
 assert.equal(f.gh.tagPosts,beforeTags+1);assert.equal(f.gh.refPosts,beforeRefs);
});

