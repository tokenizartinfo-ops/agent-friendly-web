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
 const canary='agent-friendly-web-delegated-canary';
 const pointerIndex=f.requests.findIndex(x=>x.url.includes('/scripts/'+canary+'/deployments'));
 const metadataIndex=f.requests.findIndex(x=>x.url.includes('/workers/'+canary+'/versions/'+f.p.deployments.canaryClosed.versionId));
 assert(pointerIndex>=0&&metadataIndex>pointerIndex);
 assert(!f.requests.some(x=>x.url.includes('/workers/'+canary+'/versions/'+f.p.deployments.canaryLive.versionId)));
 assert.equal(f.requests.some(x=>/\/d1\/|\/durable_objects\/.*\/invoke/.test(x.url)),false);
});
for(const mode of ['bad-token','bad-scope','wrong-first','wrong-native'])test('actual CF grammar rejects '+mode+' before GitHub effect fence',async()=>{
 const f=await cfFiniteFixture();f.state.mode=mode;const a=f.adapters();
 const r=await createPrivateQaFiniteTrialFinalizer({plan:f.p,readSnapshot:a.readSnapshot,claim:a.claim,deployClosed:a.deployClosed,now:f.base.f.now,signal:new AbortController().signal}).run();
 assert.equal(r.status,'admin_pending');assert.equal(f.gh.refPosts,0);assert.equal(f.state.posts,0);
});
test('successful first-step output is readable while observer stays active; technical only',async()=>{
 const f=await cfFiniteFixture();f.state.observerStatus='running';let preview;try{preview=await f.observer().preview();}catch{assert.fail('synthetic seed path stopped at '+f.requests.at(-1)?.url);}assert.equal(preview.controlHash,f.v.controlHash);assert.equal(JSON.stringify(preview).includes('selectors'),false);
});
test('caller ready boolean cannot create observer and consume a native occurrence',async()=>{
 const f=await cfFiniteFixture();assert.equal(f.observer().create,undefined);assert.equal(f.requests.length,0);
});

test('parent abort after first custody response cannot start further authenticated reads',async()=>{
 const f=await cfFiniteFixture(),parent=new AbortController(),original=f.fetchImpl;let calls=0;
 // The named read operation propagates its parent through both custody GETs.
 const {createPrivateQaFiniteObserverHttp}=await import('../lib/mcp-qa-finite-http.mjs');
 const o=createPrivateQaFiniteObserverHttp({admission:{intentId:f.v.intentId,sourceRevision:f.v.sourceRevision,T0:f.v.T0,R1:f.v.R1},source:{qaLive:f.p.deployments.qaLive,custody:f.p.custody},credential:'synthetic_cf',githubToken:'synthetic_gh',fetchImpl:async(...args)=>{calls++;const r=await original(...args);parent.abort();return r;},now:f.base.f.now,signal:new AbortController().signal});
 await assert.rejects(o.qualifyCustody(parent.signal,()=>{}));assert.equal(calls,1);
});

test('finite GHA ingress is GET-only even when exact observer is absent',async()=>{
 const f=await cfFiniteFixture(),o=f.observer();assert.equal(o.create,undefined);
 const {claimFiniteObserverCreation}=await import('../lib/mcp-qa-finite-http.mjs');assert.equal(claimFiniteObserverCreation,undefined);
 await o.read();assert.equal(f.requests.filter(x=>x.method==='POST').length,0);
 assert(!f.requests.some(x=>x.url.includes('/user/tokens')));
});
