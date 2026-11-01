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
