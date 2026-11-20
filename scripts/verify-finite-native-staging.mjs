import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
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

function workerOptions(staging,role){
 const config=finiteWranglerProfileTemplate(role);
 const source=staging.files[role+'/index.mjs'];
 const module=staging.modules[role].module;
 assert.equal(source.byteLength,module.bytes);
 assert.equal(createHash('sha256').update(source).digest('hex'),module.sha256);
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
  d1Databases:Object.fromEntries(config.d1_databases.map(binding=>[binding.binding,binding.database_id])),
  kvNamespaces:Object.fromEntries(config.kv_namespaces.map(binding=>[binding.binding,binding.id]))
 };
}

export async function verifyFiniteStagingMounts(staging){
 const workers=roles.map(role=>workerOptions(staging,role));
 // All namespaces are ephemeral. Catch every external request, including
 // attempts handled as ordinary pending responses by the mounted Worker.
 const blocked=async()=>{outboundAttempts+=1;return new Response(null,{status:503});};
 let outboundAttempts=0;
 const mf=new Miniflare(convertV4MiniflareOptions({
  workers:workers.map(worker=>({...worker,outboundService:blocked}))
 }));
 try{
  const [canary,qa]=workers.map(worker=>worker.name);
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
  const event=localCanary.get(eventId);
  await assert.rejects(async()=>event.deliverOwnSaved('synthetic-event'),/unavailable/i);
  await assert.rejects(async()=>event.deliverSaved('synthetic-event','synthetic-subscription'),/unavailable/i);
  await assert.rejects(async()=>event.withdrawPermissions(),/Finite legacy withdrawal unavailable/);
  await assert.rejects(async()=>event.withdrawPermissionsForPlan({}),/Finite legacy withdrawal unavailable/);
  assert.equal(outboundAttempts,0);
  return Object.freeze({exactModuleCount:workers.length,operationalReadiness:false});
 }finally{
  await mf.dispose();
 }
}
