import test from 'node:test';
import assert from 'node:assert/strict';
const load=()=>import('../lib/mcp-successor-deployment-reader.mjs');
function fixture(){
 const pins={accountId:'1'.repeat(32),workerName:'agent-friendly-web-delegated-canary',namespaceId:'2'.repeat(32),applicationId:'own-app',deploymentId:'11111111-1111-4111-8111-111111111111',versionId:'22222222-2222-4222-8222-222222222222',etag:'3'.repeat(64),scopeHash:'4'.repeat(64),programHash:'5'.repeat(64),sourceRevision:'6'.repeat(40)};
 const deployment={id:pins.deploymentId,strategy:'percentage',versions:[{version_id:pins.versionId,percentage:100}]};
 const version={id:pins.versionId,resources:{script:{etag:pins.etag},bindings:[{name:'AFW_DOSSIER_EVENTS_NODE',type:'durable_object_namespace',namespace_id:pins.namespaceId,class_name:'AfwOwnEventNode'}]}};
 const app={id:pins.applicationId,account_id:pins.accountId,scheduling_policy:'durable_object',durable_objects:{namespace_id:pins.namespaceId}};
 const calls=[];const options={pins,readCredential:async()=> 'synthetic_credential_only',fetchImpl:async(url,init)=>{calls.push({url,init});const result=url.endsWith('/deployments')?{deployments:[deployment]}:url.includes('/versions/')?version:app;return Response.json({success:true,errors:[],result});}};
 return {pins,deployment,version,app,calls,options};
}
test('fixed GET deployment reader brackets version and app and projects only receipt pins',async()=>{
 const {createSuccessorDeploymentReader}=await load(),f=fixture(),before=Date.now();const r=await createSuccessorDeploymentReader(f.options)({signal:new AbortController().signal});
 assert.equal(f.calls.length,4);assert.equal(f.calls[0].url,f.calls[3].url);assert.ok(f.calls.every(c=>c.init.method==='GET'&&c.init.redirect==='manual'&&c.init.cache==='no-store'));
 assert.deepEqual(Object.keys(r).sort(),['observedAt','programHash','scopeHash','sourceRevision']);assert.equal(r.scopeHash,f.pins.scopeHash);assert.ok(r.observedAt>=before);
});
test('split traffic, foreign namespace, app account and external class are rejected',async()=>{
 const {createSuccessorDeploymentReader}=await load();for(const mode of ['split','namespace','account','external','etag']){const f=fixture();if(mode==='split')f.deployment.versions[0].percentage=50;if(mode==='namespace')f.app.durable_objects.namespace_id='7'.repeat(32);if(mode==='account')f.app.account_id='7'.repeat(32);if(mode==='external')f.version.resources.bindings[0].script_name='foreign';if(mode==='etag')f.version.resources.script.etag='7'.repeat(64);
 await assert.rejects(createSuccessorDeploymentReader(f.options)({signal:new AbortController().signal}));}
});
test('deployment change on second read, cached response and abort fail closed',async()=>{
 const {createSuccessorDeploymentReader}=await load();for(const mode of ['drift','cache','abort']){const f=fixture(),controller=new AbortController(),base=f.options.fetchImpl;let n=0;f.options.fetchImpl=async(...args)=>{if(++n===4&&mode==='drift')f.deployment.id='33333333-3333-4333-8333-333333333333';const r=await base(...args);if(mode==='cache')r.headers.set('Age','1');if(mode==='abort')controller.abort();return r;};
 await assert.rejects(createSuccessorDeploymentReader(f.options)({signal:controller.signal}),/Deployment observation unavailable/);}
});
test('hung credential and oversized stream are bounded with generic failures',async()=>{
 const {createSuccessorDeploymentReader}=await load();for(const mode of ['timeout','size']){const f=fixture();
 if(mode==='timeout'){f.options.timeoutMs=10;f.options.readCredential=()=>new Promise(()=>{});}else f.options.fetchImpl=async()=>new Response('x'.repeat(262145),{headers:{'Content-Type':'application/json'}});
 await assert.rejects(createSuccessorDeploymentReader(f.options)({signal:new AbortController().signal}),/^Error: Deployment observation unavailable$/);
 }
});
test('ambiguous binding and invalid UTF-8 are rejected',async()=>{
 const {createSuccessorDeploymentReader}=await load();for(const mode of ['duplicate','utf8']){const f=fixture();
 if(mode==='duplicate')f.version.resources.bindings.push({...f.version.resources.bindings[0]});else f.options.fetchImpl=async()=>new Response(new Uint8Array([0xc3,0x28]),{headers:{'Content-Type':'application/json'}});
 await assert.rejects(createSuccessorDeploymentReader(f.options)({signal:new AbortController().signal}),/Deployment observation unavailable/);
 }
});
