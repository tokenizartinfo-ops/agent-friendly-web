import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {setTimeout as delay} from 'node:timers/promises';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {finiteWranglerProfileTemplate} from '../lib/mcp-qa-finite-profile.mjs';

const roles=['canaryLive','qaLive'];
const versionIds={
 canaryLive:'11111111-1111-4111-8111-111111111111',
 qaLive:'22222222-2222-4222-8222-222222222222'
};
const canaryOrigin='https://delegated-canary.agentfriendlyweb.dev';
const pending={status:'admin_pending',mayRetry:false,operationalReadiness:false};
const qaActorName='afw-own-successor-closure-v1';
const eventActorName='afw-own-event-first-successor-v1';
const legacyProbeName='afw-staging-legacy-rpc-probe';
const legacyProbeSource=`
 export default {async fetch(_request,env){
  const node=env.NODE.get(env.NODE.idFromName('${eventActorName}'));
  const checks=[
   [()=>node.deliverOwnSaved('synthetic-event'),'Finite legacy delivery unavailable'],
   [()=>node.deliverSaved('synthetic-subscription','synthetic-event'),'Finite legacy delivery unavailable'],
   [()=>node.withdrawPermissions(),'Finite legacy withdrawal unavailable'],
   [()=>node.withdrawPermissionsForPlan({}),'Finite legacy withdrawal unavailable']
  ];
  for(const [invoke,expected] of checks){
   try{await invoke();return Response.json({denied:false});}
   catch(error){if(error?.message!==expected)return Response.json({denied:false});}
  }
  return Response.json({denied:true});
 }};
`;

function workerOptions(staging,role){
 const config=finiteWranglerProfileTemplate(role);
 const source=staging.files[role+'/index.mjs'];
 const compiledModule=staging.modules[role].module;
 assert.equal(source.byteLength,compiledModule.bytes);
 assert.equal(createHash('sha256').update(source).digest('hex'),compiledModule.sha256);
 return {
  name:config.name,
  modules:[{type:'ESModule',path:role+'/index.mjs',contents:source}],
  compatibilityDate:config.compatibility_date,
  compatibilityFlags:config.compatibility_flags,
  bindings:{...config.vars,[config.version_metadata.binding]:{id:versionIds[role]}},
  durableObjects:Object.fromEntries(config.durable_objects.bindings.map(binding=>[
   binding.name,{
    className:binding.class_name,useSQLite:true,
    ...(binding.script_name?{scriptName:binding.script_name}:{})
   }
  ])),
  workflows:Object.fromEntries((config.workflows??[]).map(workflow=>[
   workflow.binding,{name:workflow.name,className:workflow.class_name}
  ])),
  d1Databases:Object.fromEntries(config.d1_databases.map(binding=>[binding.binding,binding.database_id])),
  kvNamespaces:Object.fromEntries(config.kv_namespaces.map(binding=>[binding.binding,binding.id]))
 };
}

export async function verifyClosedQaWorkflows(runtime,qa,{timeoutMs=10000}={}){
 const bindings=await runtime.getBindings(qa);
 const planHash='1'.repeat(64);
 const attempts=[
  {binding:'AFW_QA_BOOTSTRAP',id:'afw-staging-deny-initial',
   params:{operation:'finite_initial_preparation'},status:'admin_pending'},
  {binding:'AFW_QA_NAMED_CONFIRMATION',id:'afw-release-'+planHash,
   params:{planHash},status:'blocked'}
 ];
 for(const attempt of attempts){
  const stop=new AbortController();
  const deadline=performance.now()+timeoutMs;
  const timedOut=Error(attempt.binding+' did not finish before the staging deadline');
  const check=()=>{
   if(stop.signal.aborted||performance.now()>=deadline)throw timedOut;
  };
  let timeout;
  const expired=new Promise((_,reject)=>{
   timeout=setTimeout(()=>{reject(timedOut);stop.abort();},timeoutMs);
  });
  const run=async()=>{
   check();
   const instance=await bindings[attempt.binding].create({id:attempt.id,params:attempt.params});
   for(;;){
    check();
    const execution=await instance.status();
    check();
    if(execution.status==='complete'){
     assert.deepEqual(execution.output,{...pending,status:attempt.status},attempt.binding);
     return;
    }
    assert(!['errored','terminated'].includes(execution.status),attempt.binding);
    await delay(25,undefined,{signal:stop.signal});
   }
  };
  try{await Promise.race([expired,run()]);}
  finally{clearTimeout(timeout);stop.abort();}
 }
 return attempts.length;
}

export async function verifyFiniteStagingMounts(staging){
 const workers=roles.map(role=>workerOptions(staging,role));
 const [canary,qa]=workers.map(worker=>worker.name);
 // All namespaces are ephemeral. Catch every external request, including
 // attempts handled as ordinary pending responses by the mounted Worker.
 let outboundAttempts=0;
 const blocked=async()=>{outboundAttempts+=1;return new Response(null,{status:503});};
 // Invoke legacy RPCs from Workerd so Miniflare's Node proxy cannot absorb
 // the exception before the probe checks the denial reason.
 const legacyProbe={name:legacyProbeName,modules:true,script:legacyProbeSource,
  compatibilityDate:workers[0].compatibilityDate,
  durableObjects:{NODE:{className:'AfwOwnEventNode',useSQLite:true,scriptName:canary}}};
 const mf=new Miniflare(convertV4MiniflareOptions({
  workers:[...workers,legacyProbe].map(worker=>({...worker,outboundService:blocked}))
 }));
 try{
  const canaryFetch=await mf.getWorker(canary);
  for(const [path,method] of [
   ['/connections/finite-prepare','GET'],['/authorize','GET'],
   ['/monitoring','GET'],['/monitoring/grant','POST']
  ]){
   const result=await canaryFetch.fetch(canaryOrigin+path,{method});
   assert.equal(result.status,503,path);
   assert.deepEqual(await result.json(),pending,path);
  }
  const qaFetch=await mf.getWorker(qa);
  const disabled=await qaFetch.fetch('https://afw-private.invalid/_finite-owner/choice',{method:'POST'});
  assert.equal(disabled.status,404);
  await disabled.body?.cancel();

  const localQa=await mf.getDurableObjectNamespace('AFW_INDEPENDENT_CLOSURE',qa);
  const canaryQa=await mf.getDurableObjectNamespace('AFW_FINITE_TRIAL_CONTROL',canary);
  const qaId=localQa.idFromName(qaActorName);
  const crossQaId=canaryQa.idFromName(qaActorName);
  assert.equal(qaId.toString(),crossQaId.toString());
  const observed=JSON.parse(await canaryQa.get(crossQaId).observeOwnQaClosedContext({
   operation:'observe_closed_context',expectedVersionId:versionIds.qaLive,expectedSourceRevision:staging.sourceRevision
  }));
  assert.equal(observed.status,'observed');
  assert.equal(observed.allClosed,true);
  assert.equal(observed.authorizesEffects,false);
  assert.equal(observed.operationalReadiness,false);

  const localCanary=await mf.getDurableObjectNamespace('AFW_DOSSIER_EVENTS_NODE',canary);
  const eventId=localCanary.idFromName(eventActorName);
  for(const binding of ['AFW_MCP_CLOSURE_NODE','AFW_RELEASE_EVENTS_NODE']){
   const namespace=await mf.getDurableObjectNamespace(binding,qa);
   assert.equal(namespace.idFromName(eventActorName).toString(),eventId.toString());
  }
  const probe=await mf.getWorker(legacyProbeName);
  assert.deepEqual(await (await probe.fetch('https://fixture.invalid')).json(),{denied:true});
  const nativeWorkflowDenials=await verifyClosedQaWorkflows(mf,qa);
  assert.equal(outboundAttempts,0);
  return Object.freeze({exactModuleCount:workers.length,nativeWorkflowDenials,operationalReadiness:false});
 }finally{
  await mf.dispose();
 }
}
