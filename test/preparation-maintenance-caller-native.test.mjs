import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
const revision='bc34ea0cac064e854e0a4612581895b3a0a33f4a';
const target='agent-friendly-web-preparation-maintenance',workflow='afw-preparation-client-maintenance';
const flags=['AFW_DELEGATED_OAUTH_ENABLED','AFW_DELEGATED_PREPARATION_ENABLED','AFW_DELEGATED_PREPARATION_ROUTER_ENABLED','AFW_DELEGATED_PREPARATION_CONNECTIONS_ENABLED'];
test('native administrative Workflow calls actual private maintenance RPC',{timeout:120000},async t=>{
 let source;try{source=await readFile('worker/preparation-maintenance-caller/index.mjs','utf8');}catch(e){if(e.code!=='ENOENT')throw e;}
 assert.ok(source,'missing preparation maintenance Workflow entry');
 const {buildPreparationMaintenanceCaller}=await import('../scripts/build-preparation-maintenance-caller.mjs');
 const {buildPreparationMaintenanceWorker}=await import('../scripts/build-preparation-maintenance-worker.mjs');
 const caller=await buildPreparationMaintenanceCaller({sourceRevision:revision}),callee=await buildPreparationMaintenanceWorker({sourceRevision:revision});
 const ddl=await readFile('db/preparation-client-bootstrap.sql','utf8');
 async function own(enabled,run){
  const start=Date.now()-1000;
  const policy={method:'register',operationId:'ci-native-caller-1',issuer:'https://preparation.example.invalid',resource:'https://preparation.example.invalid/mcp',
   redirectUri:'https://chatgpt.com/connector/oauth/ci_native_caller_1',startedAt:new Date(start).toISOString(),expiresAt:new Date(start+600000).toISOString()};
  const planHash=createHash('sha256').update(JSON.stringify(['afw.preparation.client-caller.v1',target,policy.method,policy.operationId,policy.issuer,policy.resource,policy.redirectUri,policy.startedAt,policy.expiresAt])).digest('hex');
  const {method,...maintenancePolicy}=policy;void method;delete maintenancePolicy.issuer;delete maintenancePolicy.resource;
  const common={modules:true,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat']};
  const mf=new Miniflare(convertV4MiniflareOptions({workers:[
   {name:'caller',...common,script:caller.script+`\nexport class Diagnostic extends WorkflowEntrypoint { async run(event,step){return step.do('probe',async()=>({workflowName:event.workflowName??null,instanceId:event.instanceId,serviceType:typeof this.env.PREPARATION_MAINTENANCE,methodType:typeof this.env.PREPARATION_MAINTENANCE?.register,methodStable:this.env.PREPARATION_MAINTENANCE?.register===this.env.PREPARATION_MAINTENANCE?.register,serviceStable:this.env.PREPARATION_MAINTENANCE===this.env.PREPARATION_MAINTENANCE}));}}`,bindings:{AFW_PREPARATION_MAINTENANCE_CALLER_ENABLED:String(enabled),
    ...(enabled?{AFW_PREPARATION_MAINTENANCE_CALLER_POLICY:JSON.stringify(policy)}:{})},
    ...(enabled?{serviceBindings:{PREPARATION_MAINTENANCE:'maintenance'}}:{}),
    workflows:{FLOW:{name:workflow,className:'AfwPreparationClientMaintenanceWorkflow'},PROBE:{name:'afw-preparation-caller-probe',className:'Diagnostic'}}},
   {name:'maintenance',...common,script:callee.script,bindings:{AFW_PREPARATION_CLIENT_MAINTENANCE_ENABLED:'true',AFW_OAUTH_ISSUER:policy.issuer,
    AFW_OAUTH_RESOURCE:policy.resource,AFW_PREPARATION_CLIENT_MAINTENANCE_POLICY:JSON.stringify(maintenancePolicy),...Object.fromEntries(flags.map(k=>[k,'false']))},
    kvNamespaces:{OAUTH_KV:'caller-ci-kv'},d1Databases:{DB:'caller-ci-db'}},
  ]}));
  try{
   const db=await mf.getD1Database('DB','maintenance'),kv=await mf.getKVNamespace('OAUTH_KV','maintenance');await db.prepare(ddl).run();
   const bindings=await mf.getBindings('caller'),id='afw-prep-'+planHash;
   if(enabled){const probe=await bindings.PROBE.create({id:'probe-ci',params:{}});console.log('CI_NATIVE_BOUNDARY',JSON.stringify(await settled(probe)));}
   await run({mf,db,kv,flow:bindings.FLOW,id,planHash,policy});
  }finally{await mf.dispose();}
 }
 async function settled(instance){
  for(let i=0;i<150;i++){const s=await instance.status();if(s.status==='complete')return s.output;if(['errored','terminated'].includes(s.status))assert.fail(JSON.stringify(s));await new Promise(r=>setTimeout(r,100));}
  assert.fail('native Workflow did not settle in 15 seconds');
 }
 await t.test('disabled real Workflow has no target capability and no data effects',()=>own(false,async({mf,db,kv,flow,id,planHash})=>{
  const instance=await flow.create({id,params:{planHash}});const result=await settled(instance);assert.equal(result.status,'blocked');assert.equal(result.operationalReadiness,false);
  assert.equal((await kv.list()).keys.length,0);assert.equal((await db.prepare('SELECT COUNT(*) AS count FROM preparation_client_bootstrap').first()).count,0);
  const http=await mf.dispatchFetch('https://caller.invalid/register',{method:'POST',body:'PRIVATE'});assert.equal(http.status,404);assert.equal(http.headers.get('Cache-Control'),'no-store');
 }));
 await t.test('actual Workflow/service binding/SDK writes once and preserves native receipt',()=>own(true,async({mf,db,kv,flow,id,planHash,policy})=>{
  const instance=await flow.create({id,params:{planHash}});const result=await settled(instance);assert.equal(result.status,'confirmed');
  assert.equal(result.receipt.redirectUri,policy.redirectUri);assert.equal(result.receipt.configuredResource,policy.resource);assert.equal(result.operationalReadiness,false);
  assert.deepEqual((await (await flow.get(id)).status()).output,result);
  await assert.rejects(flow.create({id,params:{planHash}}));
  const rows=(await db.prepare('SELECT * FROM preparation_client_bootstrap').all()).results;assert.equal(rows.length,1);assert.equal(rows[0].client_id,result.receipt.clientId);
  const keys=await kv.list();assert.equal(keys.keys.length,1);const metadata=await kv.get(keys.keys[0].name,'json');assert.equal(metadata.tokenEndpointAuthMethod,'none');
  const http=await mf.dispatchFetch('https://caller.invalid/mcp');assert.equal(http.status,404);
 }));
});
