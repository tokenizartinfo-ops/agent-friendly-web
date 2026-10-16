import {createHash} from 'node:crypto';
import {createInvocationStorage} from './mcp-invocation-storage.mjs';
import {createDossierMonitoringAuthorization} from './dossier-monitoring-authority.mjs';
import {createNodeProcessCustody} from './mcp-node-process-custody.mjs';
import {createOriginalContainerRuntime} from './mcp-original-container-runtime.mjs';
import {createMcpSubscriptionController,snapshotMcpSubscriptionRequest} from './mcp-subscription-lifecycle.mjs';
import {createPrivateNodeSender,createPrivateNodeConsumeHandler} from './mcp-node-private-bridge.mjs';
import {readSavedDossierMcpEvent} from './mcp-saved-dossier-event.mjs';
import {createOwnSubscriptionReceiptJournal,ownSubscriptionReceiptEligibilitySql} from './mcp-own-subscription-receipt.mjs';
import {resolveSuccessorPreparation} from './mcp-successor-manifest.mjs';
import {createSuccessorLaunchGate} from './mcp-successor-launch-gate.mjs';
const fail=()=>{throw Error('Own durable event host unavailable');};
const closed=async()=>fail();
const deny=()=>new Response('{"code":"unavailable"}',{status:404,headers:{'Content-Type':'application/json','Cache-Control':'no-store'}});
function exact(v,keys){if(!v||Object.getPrototypeOf(v)!==Object.prototype)fail();const d=Object.getOwnPropertyDescriptors(v),own=Reflect.ownKeys(d);if(own.length!==keys.length||own.some(k=>typeof k!=='string'||!keys.includes(k)||!Object.hasOwn(d[k],'value')||!d[k].enumerable))fail();return Object.fromEntries(keys.map(k=>[k,d[k].value]));}

/** INTERNAL composition only. Original ctx/D1/OAuth pins/control entrypoint
 * are supplied by the server, never a request. Not a Worker/RPC mount. */
export function createOwnDurableEventHost(options,observe){
 const trace=stage=>{try{if(typeof observe==='function')observe(stage);}catch{}};
 const fields=['enabled','db','context','projectId','projectionSecret','custodyKey','ctx','program','sourceRevision','window','makeControl','now'];
 const o=exact(options,Object.hasOwn(options??{},'successor')?[...fields,'successor']:fields);if(o.enabled!==true)fail();
 const context=exact(o.context,['grantId','subject','clientId','resource','scopes']);if(!Array.isArray(context.scopes))fail();context.scopes=Object.freeze([...context.scopes]);Object.freeze(context);
 const window=Object.freeze(exact(o.window,['startAt','expiresAt'])),storage=o.ctx?.storage,container=o.ctx?.container,containerId=o.ctx?.id?.toString();
 if(typeof storage?.transaction!=='function'||typeof o.program!=='string'||!Buffer.isBuffer(o.custodyKey)||o.custodyKey.length!==32)fail();
 const custodyKey=Buffer.from(o.custodyKey),programHash=createHash('sha256').update(o.program).digest('hex'),readAuthorization=createDossierMonitoringAuthorization({db:o.db,context,projectId:o.projectId,projectionSecret:o.projectionSecret,now:o.now});
 let successor;
 if(Object.hasOwn(o,'successor')){
  const s=exact(o.successor,['version','plan','readRetirement','readDeployment']);
  if(s.version!=='afw.successor-host.v1'||typeof s.readRetirement!=='function'||typeof s.readDeployment!=='function')fail();
  const resolved=resolveSuccessorPreparation(s.plan),c=resolved.candidate;
  if(c.containerId!==containerId||c.programHash!==programHash||c.sourceRevision!==o.sourceRevision||c.startAt!==window.startAt||c.expiresAt!==window.expiresAt)fail();
  const candidate=Object.freeze(Object.fromEntries(['trialId','programHash','sourceRevision','startAt','expiresAt','budget'].map(k=>[k,c[k]])));
  successor=Object.freeze({...s,plan:Object.freeze({scope:resolved.manifest.scope,original:resolved.original,candidate,namespace:s.plan.namespace})});
 }
 // Construction validates the fixed runtime without allocating a process.
 trace('native_runtime_check');
 createOriginalContainerRuntime({...Object.fromEntries(['enabled','ctx','program','sourceRevision','makeControl','now'].map(k=>[k,o[k]])),window});
 trace('native_runtime_ready');
 const db=()=>o.db.withSession?o.db.withSession('first-primary'):o.db;
 const receipts=createOwnSubscriptionReceiptJournal({db:o.db,context,projectId:o.projectId,containerId,programHash,sourceRevision:o.sourceRevision,window,readAuthorization,now:o.now});
 const isClosed=async()=>{trace('native_closure_read');const result=!!await db().prepare('SELECT grant_id FROM dossier_node_process_closures WHERE grant_id=?').bind(context.grantId).first();trace('native_closure_ready');return result;};
 function invocation(){
  const scope=createInvocationStorage(storage),originalRuntime=createOriginalContainerRuntime({...Object.fromEntries(['enabled','ctx','program','sourceRevision','makeControl','now'].map(k=>[k,o[k]])),window});
  const runtime=successor?Object.freeze({...originalRuntime,launch:(boot,signal)=>createSuccessorLaunchGate({db:o.db,plan:successor.plan,context,projectId:o.projectId,projectionSecret:o.projectionSecret,readRetirement:successor.readRetirement,readDeployment:successor.readDeployment,launch:originalRuntime.launch,now:o.now})(boot,signal)}):originalRuntime;
  const custody=createNodeProcessCustody({enabled:true,db:o.db,context,projectId:o.projectId,projectionSecret:o.projectionSecret,storage:scope.storage,custodyKey,containerId,programHash,sourceRevision:o.sourceRevision,image:'cloudflare/debian-trixie',window,runtime,now:o.now});
  const controller=(processGeneration,readIdentity=closed)=>createMcpSubscriptionController({storage:scope.storage,readAuthorization,custodyKey,send:closed,now:o.now,nodeHost:{processGeneration,readIdentity,readReadiness:custody.readReadiness,send:async(ref,signal)=>{
   scope.assertOutside();const bridge=await custody.createBridge();scope.assertOutside();
   return createPrivateNodeSender({bridge,now:o.now,dispatch:request=>{scope.assertOutside();return container.getTcpPort(8080).fetch(request);}})(ref,signal);
  }}});
  return{scope,custody,controller};
 }
 const safe=fn=>async(...args)=>{try{return await fn(...args);}catch{fail();}};
 const host=Object.freeze({
  list:safe(async()=>{const a=await readAuthorization();trace('native_authorization_ready');if(!a.enabled||await isClosed())return null;const b=await readAuthorization();if(!b.enabled||['principalRef','resourceRef','projectRef','permissionRef'].some(k=>a[k]!==b[k])||await isClosed())return null;return b.projectRef;}),
  subscribe:safe(async value=>{
   const p=snapshotMcpSubscriptionRequest(value),a=await readAuthorization();if(!a.enabled||p.arguments.projectRef!==a.projectRef||await isClosed())fail();
   const anchor=await receipts.preflight(),i=invocation();i.scope.assertOutside();
   const started=performance.now(),duration=(end,start)=>Math.min(600000,Math.max(0,Math.floor(end-start)));
   let stage='process_readiness',stageStarted=started;
   try{
    const ready=await i.custody.start();stage='callback_verification';stageStarted=performance.now();
    const receipt=await i.controller(ready.processGeneration).subscribe(p);stage='receipt_record';stageStarted=performance.now();
    await receipts.record(receipt,ready,anchor);stage='final_readiness';stageStarted=performance.now();
    // A primary receipt is history, not proof that its original process survived
    // the insertion await. Reprobe the same signed custody before returning.
    const latest=await i.custody.readReadiness();if(latest.processGeneration!==ready.processGeneration||latest.expiresAt!==ready.expiresAt||latest.ready!==true)fail();
    return receipt;
   }catch{
    const failedAt=performance.now();
    let closureCompleted=false;try{await i.custody.close();closureCompleted=true;}catch{}
    // Operator diagnostic only: fixed stages, no exception, identity, callback,
    // request or secret. A closure request does not prove physical termination.
    // Logging must never prevent closure or alter the generic public failure.
    try{console.warn(JSON.stringify({event:'afw.own_subscription_failed',stage,closureCompleted,elapsedMs:duration(failedAt,started),stageElapsedMs:duration(failedAt,stageStarted),closureElapsedMs:duration(performance.now(),failedAt)}));}catch{}
    fail();
   }
  }),
  // INTERNAL saved-event producer only, never registered as an MCP method.
  readReadiness:safe(async()=>invocation().custody.readReadiness()),
  // INTERNAL original receipt observation only. No caller SID, callback,
  // boot/readiness, refresh or public HTTP/RPC/MCP registration.
  observeSubscription:safe(async()=>{
   let last=-1;const clock=()=>{const t=o.now();if(!Number.isSafeInteger(t)||t<last||t<window.startAt||t>=window.expiresAt)fail();last=t;return t;};
   clock();const a=await readAuthorization();clock();
   const current=async()=>{const b=await readAuthorization();const t=clock();if(a.expiresAt!==b.expiresAt||a.enabled!==b.enabled||t>=b.expiresAt||['principalRef','resourceRef','projectRef','permissionRef'].some(k=>a[k]!==b[k]))fail();};
   const read=()=>db().prepare("SELECT subscription_id,process_generation,expires_at FROM dossier_event_subscription_receipts WHERE grant_id=? AND project_id=? AND user_id=? AND client_id=? AND resource=? AND container_id=? AND program_hash=? AND source_revision=? AND image='cloudflare/debian-trixie'").bind(context.grantId,o.projectId,context.subject,context.clientId,context.resource,containerId,programHash,o.sourceRevision).first();
   const row=await read();await current();if(!row)return null;
   if(!/^sub_[0-9a-f]{64}$/.test(row.subscription_id)||!(/^[0-9a-f]{64}$/).test(row.process_generation)||!Number.isSafeInteger(row.expires_at)||row.expires_at<=window.startAt||row.expires_at>window.expiresAt)fail();
   const result=await invocation().controller(row.process_generation).observe(row.subscription_id);await current();
   const latest=await read();await current();if(JSON.stringify(latest)!==JSON.stringify(row)||!result||result.expiresAt!==row.expires_at)fail();return result;
  }),
  deliver:safe(async(id,source)=>{const i=invocation(),ready=await i.custody.readReadiness();return i.controller(ready.processGeneration).deliver(id,source);}),
  // Mounts must expose only this internally: metadata comes from SAME DB,
  // never a caller-authored signal. Still not a public MCP method/endpoint.
  deliverSaved:safe(async(id,eventId)=>{const i=invocation(),ready=await i.custody.readReadiness();const source=await readSavedDossierMcpEvent({enabled:true,db:o.db,context,projectId:o.projectId,projectionSecret:o.projectionSecret,window,now:o.now},eventId);return i.controller(ready.processGeneration).deliver(id,source);}),
  // Private prepared schedule: resolve the immutable receipt, never a caller SID.
  // The event must already exist in the original project's primary database.
  deliverOwnSaved:safe(async eventId=>{
   if(typeof eventId!=='string'||!/^[A-Za-z0-9_-]{1,200}$/.test(eventId))fail();
   const read=()=>db().prepare(ownSubscriptionReceiptEligibilitySql).bind(context.grantId,context.subject,o.projectId,context.clientId,context.resource,containerId,programHash,o.sourceRevision).first();
   const row=await read();if(!row||!/^sub_[0-9a-f]{64}$/.test(row.subscription_id))fail();
   const i=invocation(),ready=await i.custody.readReadiness();if(ready.processGeneration!==row.process_generation)fail();
   const source=await readSavedDossierMcpEvent({enabled:true,db:o.db,context,projectId:o.projectId,projectionSecret:o.projectionSecret,window,now:o.now},eventId);
   const latest=await read();if(!latest||JSON.stringify(latest)!==JSON.stringify(row))fail();
   return i.controller(ready.processGeneration).deliver(row.subscription_id,source);
  }),
  unsubscribe:safe(async value=>{const p=snapshotMcpSubscriptionRequest(value,false),a=await readAuthorization();if(p.arguments.projectRef!==a.projectRef)fail();const i=invocation();const row=await db().prepare('SELECT process_generation FROM dossier_node_process_admissions WHERE grant_id=? AND project_id=? AND user_id=? AND client_id=? AND resource=? AND container_id=? AND program_hash=? AND source_revision=? AND image=?').bind(context.grantId,o.projectId,context.subject,context.clientId,context.resource,containerId,programHash,o.sourceRevision,'cloudflare/debian-trixie').first();await i.controller(row?.process_generation??'0'.repeat(64)).unsubscribe(p);await i.custody.close();return Object.freeze({});}),
  close:safe(async()=>invocation().custody.close()),
  // Props must originate from makeControl's server-created entrypoint, never
  // request data. The cryptographic bridge also matches original generation.
  async consume(request,serverProps){try{const props=Object.freeze(exact(serverProps,['containerId','processGeneration','expiresAt'])),i=invocation(),bridge=await i.custody.createBridge();return await createPrivateNodeConsumeHandler({enabled:true,bridge,now:o.now,readPlatformContext:async()=>{if(container.running!==true||containerId!==props.containerId)fail();return props;},createController:async identity=>i.controller(identity.processGeneration,identity.readIdentity)})(request);}catch{return deny();}},
 });
 return host;
}
