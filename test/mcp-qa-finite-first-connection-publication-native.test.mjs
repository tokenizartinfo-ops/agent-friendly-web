import test from 'node:test';
import assert from 'node:assert/strict';
import {gunzipSync} from 'node:zlib';
import {initialEntryHarness} from './fixtures/finite-initial-entry-world.mjs';
import {plain,approveFirstConnection,readFirstConnectionProbe,setFirstConnectionFault} from './fixtures/finite-first-connection-publication.mjs';
const O='https://delegated-canary.agentfriendlyweb.dev';
async function fixture(t){
 const f=await initialEntryHarness('first-connection-publication');
 t.after(async()=>{console.info('T2 native stage','teardown-start');await f.stub.restoreMethods();console.info('T2 native stage','teardown-restored');await f.mf.dispose();console.info('T2 native stage','teardown-disposed');await f.cleanup();console.info('T2 native stage','teardown-done');});
 await f.stub.configure('normal');
 console.info('T2 native stage','upstream-start');const initial=await plain(f.stub.invoke(f.refs));console.info('T2 native stage','upstream-done:'+initial.status);if(initial.status!=='material_recorded'){const seen=await plain(f.stub.snapshot());console.info('T2 upstream DATA inspection',JSON.stringify({requests:f.providerRegistry.requests.map(({url,method})=>({method,path:new URL(url).pathname})),responses:f.providerRegistry.responses,rows:seen.map(([key])=>key),stats:await plain(f.stub.stats()),M:{sha256:f.firstConnectionBuild.M.sha256,bytes:f.firstConnectionBuild.M.bytes},QA:{sha256:f.firstConnectionBuild.QA.sha256,bytes:f.firstConnectionBuild.QA.bytes}}));}assert.equal(initial.status,'material_recorded',JSON.stringify(initial));await f.stub.restoreMethods();await f.mountFirstConnection();
 const rows=await plain(f.stub.snapshot()),capsule=JSON.parse(rows.find(([key])=>key.endsWith(':capsule'))[1]);
 assert.equal(f.uploads.length,1);assert.equal(f.activations.length,1);assert.equal(f.phaseCurrent,undefined);
 assert.equal(capsule.moduleHash,f.firstConnectionBuild.residency.module.sha256);
 assert.equal(f.uploaded.modules[0].content_base64,gunzipSync(Buffer.from(f.resident.content,'base64')).toString('base64'));
 return f;
}
test('T2 finite dispatch never falls through ordinary',{timeout:120000},async t=>{
 const f=await fixture(t),spy=f.negative;
 const cases=[
  [O+'/connections/finite-prepare?x=1',{}],[O+'/connections/finite-prepare#bad',{}],
  ['https://other.invalid/connections/finite-prepare',{}],[O+'/connections/finite-prepare',{method:'DELETE'}],
  [O+'/connections',{}],[O+'/connections/revoke',{method:'POST'}],[O+'/monitoring/revoke',{method:'POST'}],
  [O+'/authorize?bad=1',{method:'DELETE'}],[O+'/monitoring?x=1',{}],[O+'/monitoring/grant',{method:'GET'}]
 ];
 for(const [url,options]of cases){const r=await spy.fetch(url,options);assert.notEqual(r.status,200,url);await r.body?.cancel();}
 for(const fault of ['qa-absent','version','actor','version-drift']){
  await setFirstConnectionFault(f,fault);const r=await spy.fetch(O+'/connections/finite-prepare');assert.notEqual(r.status,200,fault);await r.body?.cancel();
 }
 await setFirstConnectionFault(f,'oauth-open');
 for(const path of ['/authorize?bad=1','/monitoring','/monitoring/grant']){const r=await spy.fetch(O+path,path.endsWith('grant')?{method:'POST',headers:{Origin:O,'Content-Type':'application/x-www-form-urlencoded'},body:'handle='+'a'.repeat(43)}:{});assert.notEqual(r.status,200,path);await r.body?.cancel();}
 const probe=await readFirstConnectionProbe(f);assert.equal(probe.negative.ordinary,0,'finite paths never enter ordinary handler before SQL');assert.equal(probe.negative.sql,0,'zero ordinary SQL');assert.equal(probe.effects,0);assert.equal(probe.uploads,1);assert.equal(probe.activations,1);
 assert(probe.native.calls.some(c=>c.url==='https://afw-private.invalid/_finite-owner/monitoring'),'OAuth=true reaches QA without ordinary monitoring flag');
 const target='https://afw-private.invalid/_finite-owner/';
 for(const url of [target+'unknown',target+'choice?x=1',target+'monitoring/revoke']){const r=await f.stub.fetch(url,{method:'POST'});assert.notEqual(r.status,200);await r.body?.cancel();}
 console.info('T2 negative bundle',JSON.stringify({spyHash:f.firstConnectionBuild.spyHash,probe:{...probe,rows:undefined,providerRequests:undefined,native:{...probe.native,business:undefined}}}));
});
test('T2 closed mounted conduits cannot authorize business',{timeout:120000},async t=>{
 const f=await fixture(t);
 const response=await approveFirstConnection(f);assert.equal(response.status,503,'choice reaches pending QA, never a connection success');await response.body.cancel();
 const before=await readFirstConnectionProbe(f);assert.equal(before.native.calls.filter(c=>c.url.endsWith('/choice')).length,1,'actual closed M dispatches to actual QA receiver');
 for(const path of ['/authorize','/monitoring','/monitoring/grant']){const r=await f.call(path,path.endsWith('/grant')?{method:'POST'}:{});assert.notEqual(r.status,200);await r.body?.cancel();}
 const p=await readFirstConnectionProbe(f);assert.equal(p.native.calls.length,before.native.calls.length,'closed OAuth/notice denied before QA');assert.equal(p.effects,0);assert.deepEqual(p.native.business,[]);assert.equal(p.uploads,1);assert.equal(p.activations,1);
 const rows=p.rows,capsule=JSON.parse(rows.find(([k])=>k.endsWith(':capsule'))[1]);assert.equal(p.native.alarm,capsule.C0);assert.equal(capsule.C0,capsule.I0+900000);assert.equal(capsule.C1,capsule.C0+180000);
 const plan=JSON.parse(rows.find(([k])=>k==='afw.finite-initial-cleanup.v1:plan')[1]);assert.equal(plan.configuration.bindings.find(b=>b.name==='AFW_DELEGATED_OAUTH_ENABLED').text,'false');
 assert.equal(f.phaseCurrent,undefined);assert.equal(f.firstConnectionBuild.M.sha256,f.resident.module.sha256);
 assert(f.firstConnectionBuild.M.inputs.includes('worker/mcp-own/finite.mjs'));assert(!f.firstConnectionBuild.M.inputs.includes('lib/mcp-qa-finite-candidate-residency.mjs'));
 assert(f.firstConnectionBuild.QA.inputs.includes('lib/mcp-qa-finite-candidate-residency.mjs'));
 console.info('T2 initial native build',JSON.stringify({...f.firstConnectionBuild,residency:{...f.resident,content:undefined},M:{...f.firstConnectionBuild.M,inputs:f.firstConnectionBuild.M.inputs.length},QA:{...f.firstConnectionBuild.QA,inputs:f.firstConnectionBuild.QA.inputs.length},requests:p.providerRequests.length}));
});
