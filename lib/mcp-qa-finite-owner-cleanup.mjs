import {createHash,randomUUID} from 'node:crypto';
import {createFiniteInitialLease} from './mcp-qa-finite-initial-lease.mjs';
import {sealFiniteOwnerCleanupRecord as cleanupSeal} from './mcp-qa-finite-owner-cleanup-records.mjs';
import {createFiniteOwnerCleanupJournal} from './mcp-qa-finite-owner-cleanup-journal.mjs';
import {createFinitePreparationIssuerStore,FINITE_PREPARATION_ISSUER_SCHEMA,FINITE_PREPARATION_MONITORING_SCHEMA} from './mcp-qa-finite-preparation-issuer-store.mjs';
import {sealFinitePreparationIssuerRecord as issuerSeal} from './mcp-qa-finite-preparation-issuer-records.mjs';
import {createFinitePreparationNoticeJournal as noticeJournal} from './mcp-qa-finite-preparation-notice-journal.mjs';
import {decodeFinitePreparationCleanupRecord as enrollmentRecord} from './mcp-qa-finite-preparation-cleanup-records.mjs';
import {createFiniteOwnerPreparationStore} from './mcp-qa-finite-preparation-store.mjs';
import {createFinitePolicyEffectJournal} from './mcp-qa-finite-policy-journal.mjs';
import {hashFinitePreparationRecord as prepHash,encodeFinitePreparationRecord as prepEncode,hashFinitePolicyEffectIdentity as effectIdentity,hashFiniteOwnerEvidence as evidence,hashFiniteOwnerPreparationProject as projectHash,validateFiniteOwnerSource} from './mcp-qa-finite-preparation-records.mjs';
import {qualifyFinitePreparationEnrollmentFacts} from './mcp-qa-finite-preparation-enrollment-facts.mjs';
import {qualifyFiniteOwnerInstalledStage} from './mcp-qa-finite-owner-stage-facts.mjs';
import {qualifyFiniteConnectionProfile} from './mcp-qa-finite-connection-profile.mjs';
import {qualifyFiniteOwnerSdkBindingFacts} from './mcp-qa-finite-owner-sdk-binding-facts.mjs';
import {finiteInitialCapsuleBindingsHash} from './mcp-qa-finite-initial-capsule-records.mjs';
import {finiteActivationConfigurationHash} from './mcp-activation-observer.mjs';
import {restorationConfigurationHash} from './mcp-restoration-configuration.mjs';
import {decodeFiniteInitialUploadRecord as uploadRecord} from './mcp-qa-finite-initial-upload-records.mjs';
import {qualifyFiniteInitialUploadedVersion} from './mcp-qa-finite-initial-upload-wire.mjs';
import {qualifyFiniteInitialHistoricalBaseline} from './mcp-qa-finite-historical-source.mjs';
import {readFiniteQaBootstrapSourceExpectations} from './mcp-qa-finite-bootstrap-source.mjs';
import {readPrivateQaFiniteCandidate} from './mcp-qa-finite-candidate-residency.mjs';
import {finitePublicProfileTemplate,projectFinitePublicConfiguration} from './mcp-qa-finite-profile.mjs';
import {finiteQaPointer} from './mcp-qa-finite-publication.mjs';
import {finiteCfEnvelope} from './mcp-qa-finite-custody.mjs';
import {initialHash as digest} from './mcp-qa-finite-initial-material-records.mjs';
import {OAuthAuthorizationServer} from '@cloudflare/workers-oauth-provider';
import {captureFinitePreparationIssuerContext,createFinitePreparationIssuerJournal} from './mcp-qa-finite-preparation-issuer-journal.mjs';
import {createFiniteOwnerIssuerProvenanceJournal} from './mcp-qa-finite-owner-issuer-provenance-journal.mjs';
import {finiteOwnerSdkCleanupCorrelation} from './mcp-qa-finite-owner-issuer-provenance-records.mjs';
import {readPrivateQaFiniteInitialAnchors} from './mcp-qa-finite-initial-anchors.mjs';
import {readPrivateQaFiniteOwnerContext} from './mcp-qa-finite-owner-phase-context.mjs';
import {readFiniteOwnerRequestContext} from './mcp-qa-finite-owner-preparation.mjs';
import {observeFiniteFactualReadWork,retainFiniteOwnerStagePromise as retain} from './mcp-qa-finite-stage-work.mjs';
import {initialFields as fields,initialOwn as own,initialCanonical as canonical,initialHex as hex} from './mcp-qa-finite-initial-material-records.mjs';
const fail=()=>{throw Error('Finite owner SDK grant unavailable');};
const current=l=>{l.assertCurrent();if(l.signal.aborted)fail();};
/** Private, single-call readonly facade. Sticky denial stops queued I/O; started
 * native promises remain retained through actual settlement, including failures.
 * SDK1.2.1 may paginate legacy keys and fan out get() internally. */
function readonlyGrantKv(alias,methods,subject,guard){
 const prefix='grant:'+subject+':',queue=[];let active=0,lists=0,gets=0,failed=null,nextCursor;
 const stop=error=>{failed??=error;for(const q of queue.splice(0))q.reject(failed);};
 const check=()=>{if(failed)throw failed;guard();};
 const pump=()=>{
  while(active<2&&queue.length){
   try{check();}catch(error){stop(error);return;}
   const q=queue.shift();active++;
   const actual=retain(Promise.resolve().then(()=>{
    check();const native=Reflect.apply(methods[q.method],alias,q.args);return retain(native);
   }));
   actual.then(value=>{
    try{check();
     if(q.method==='list'){
      if(!value||!Array.isArray(value.keys)||value.keys.length>100||typeof value.list_complete!=='boolean'||value.keys.some(k=>typeof k?.name!=='string'||!k.name.startsWith(prefix))||!value.list_complete&&(typeof value.cursor!=='string'||!value.cursor||value.cursor.length>2048))fail();
      nextCursor=value.list_complete?undefined:value.cursor;
     }
     q.resolve(value);
    }catch(error){stop(error);q.reject(error);}
   },error=>{stop(error);q.reject(error);}).finally(()=>{active--;pump();}).catch(()=>{});
  }
 };
 const enqueue=(method,args)=>{
  try{
   check();
   if(method==='list'){
    const v=own(args[0]);fields(v,['prefix',...Object.hasOwn(v,'limit')?['limit']:[],...Object.hasOwn(v,'cursor')?['cursor']:[]]);
    if(v.prefix!==prefix||Object.hasOwn(v,'limit')&&v.limit!==100||v.cursor!==nextCursor||lists>=2)fail();lists++;
    args=[{...v,limit:100}];
   }else{
    if(typeof args[0]!=='string'||!args[0].startsWith(prefix)||!/^[A-Za-z0-9_-]{16}$/.test(args[0].slice(prefix.length))||canonical(own(args[1]))!==canonical({type:'json'})||gets>=200)fail();gets++;
   }
   return retain(new Promise((resolve,reject)=>{queue.push({method,args,resolve,reject});pump();}));
  }catch(error){stop(error);return Promise.reject(error);}
 };
 return Object.freeze({list:options=>enqueue('list',[options]),get:(key,options)=>enqueue('get',[key,options])});
}
/** Factual SDK summary only. Genuine original request Root and its current child
 * remain live throughout; no writer, selector from caller, or exported facet. */
export async function readPrivateQaFiniteOwnerSdkGrant(options,lease){
 fields(options,['ctx','env','preconnectionId','parent']);
 const {ctx,env,preconnectionId,parent}=options;
 if(!hex(preconnectionId)||readFiniteOwnerRequestContext(parent).root!==parent||lease===parent)fail();
 fields(lease,['signal','assertCurrent']);const signal=lease.signal,assertCurrent=lease.assertCurrent,parentSignal=parent.signal,parentAssert=parent.assertCurrent,deadline=readFiniteOwnerRequestContext(parent).deadline;
 const c=captureFinitePreparationIssuerContext({ctx,env}),alias=env.AFW_FINITE_OWNER_OAUTH_KV,methods={get:alias?.get,put:alias?.put,delete:alias?.delete,list:alias?.list};
 const self=env.AFW_INDEPENDENT_CLOSURE,selfGet=self?.get,getAlarm=c.storage?.getAlarm;
 const node=env.AFW_RELEASE_EVENTS_NODE,nodeMethods={idFromName:node?.idFromName,idFromString:node?.idFromString,get:node?.get},db=env.RELEASE_DB,prepare=db?.prepare,metadata=env.AFW_QA_VERSION,reader=env.AFW_MCP_CLOSURE_READ_TOKEN,publisher=env.AFW_MCP_CLOSURE_PUBLISH_TOKEN,fetcher=globalThis.fetch;
 if([assertCurrent,selfGet,getAlarm,...Object.values(methods),...Object.values(nodeMethods),prepare].some(v=>typeof v!=='function')||!(signal instanceof AbortSignal))fail();
 let ceiling=deadline;
 const guard=()=>{
  current(parent);current(lease);c.holders();
  if(options.ctx!==ctx||options.env!==env||options.parent!==parent||options.preconnectionId!==preconnectionId||lease.signal!==signal||lease.assertCurrent!==assertCurrent||parent.signal!==parentSignal||parent.assertCurrent!==parentAssert||readFiniteOwnerRequestContext(parent).deadline!==deadline||Date.now()>=ceiling||env.AFW_INDEPENDENT_CLOSURE!==self||self.get!==selfGet||c.storage.getAlarm!==getAlarm||env.AFW_FINITE_OWNER_OAUTH_KV!==alias||Object.keys(methods).some(k=>alias[k]!==methods[k])||env.AFW_RELEASE_EVENTS_NODE!==node||Object.keys(nodeMethods).some(k=>node[k]!==nodeMethods[k])||env.RELEASE_DB!==db||db.prepare!==prepare||env.AFW_QA_VERSION!==metadata||env.AFW_MCP_CLOSURE_READ_TOKEN!==reader||env.AFW_MCP_CLOSURE_PUBLISH_TOKEN!==publisher||globalThis.fetch!==fetcher)fail();
 };
 const wait=async promise=>{const value=await retain(promise);guard();return value;};
 guard();
 return observeFiniteFactualReadWork({ctx,env,originalLease:lease,requestLease:parent},async()=>{
  const source=await wait(readPrivateQaFiniteOwnerContext({ctx,env,parent,preconnectionId})),anchors=await wait(readPrivateQaFiniteInitialAnchors({ctx,env},lease));
  const sdk=await wait(createFiniteOwnerIssuerProvenanceJournal({ctx,env}).read({preconnectionId},lease)),issuer=await wait(createFinitePreparationIssuerJournal({ctx,env}).read({preconnectionId},lease));
  const root=sdk.root,expectedGrant=sdk.grant,complete=sdk.operations.sdk_complete,identity=issuer.reservation?.identity,capsule=anchors.capsule;
  if(!root||!expectedGrant||!complete.send||!complete.observed||!identity||issuer.freeze||issuer.operations.grant.ack?.outcome!=='applied'||source.source.phase!=='read_consent'||source.preconnectionId!==preconnectionId||capsule.preconnectionId!==preconnectionId||source.capsuleHash!==capsule.capsuleHash||root.capsuleHash!==capsule.capsuleHash||root.enrollmentHash!==identity.enrollmentHash||root.actorId!==c.actorId||root.qaVersionId!==c.qa||root.sourceRevision!==source.source.sourceRevision||root.mVersionId!==source.source.currentPublication.versionId||identity.subject!==anchors.material.ownerSelection.subject||identity.clientId!==source.source.clientId||identity.resource!==source.source.resource||identity.projectId!==source.source.project.projectId||identity.projectRevision!==source.source.project.revision||anchors.alarm!==capsule.C0)fail();
  ceiling=Math.min(ceiling,root.C0,Date.parse(identity.consentExpiresAt),Date.parse(expectedGrant.expiresAt));guard();
  const correlationHash=finiteOwnerSdkCleanupCorrelation({root,expectedGrant,completeSend:complete.send,identity}),metadataValue={afwFiniteCleanup:{purpose:'afw.finite-sdk-cleanup-correlation.v1',correlationHash}};
  const facet=readonlyGrantKv(alias,methods,identity.subject,guard),api=new OAuthAuthorizationServer({issuer:source.source.origin,resources:[identity.resource],scopesSupported:['afw:project:read','afw:evidence:read'],accessTokenTTL:300,clientIdMetadataDocumentEnabled:false}).getOAuthApi(Object.freeze({OAUTH_KV:facet}));
  let cursor,found=null;
  do{
   guard();const result=await wait(api.listUserGrants(identity.subject,{limit:100,...cursor===undefined?{}:{cursor}}));
   if(!result||!Array.isArray(result.items)||result.items.length>100||result.cursor!==undefined&&(typeof result.cursor!=='string'||!result.cursor||result.cursor.length>2048))fail();
   for(const input of result.items){
    // Read real own SDK properties before normalizing only undefined expiry.
    const summary={};for(const key of ['id','clientId','userId','scope','metadata','createdAt','expiresAt','redirectUri','resource']){
     const d=Object.getOwnPropertyDescriptor(input,key);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();summary[key]=key==='expiresAt'&&d.value===undefined?null:d.value;
    }
    if(Reflect.ownKeys(input).length!==9)fail();const value=own(summary);
    if(canonical(value.metadata)!==canonical(metadataValue))continue;
    if(found||typeof value.id!=='string'||!/^[A-Za-z0-9_-]{16}$/.test(value.id)||value.userId!==identity.subject||value.clientId!==identity.clientId||value.resource!==identity.resource||canonical(value.scope)!==canonical(expectedGrant.scopes)||!Number.isSafeInteger(value.createdAt)||value.createdAt<Math.floor(complete.send.issuedAt/1000)||value.createdAt*1000>=complete.send.deadline||value.createdAt*1000>Date.now()||value.expiresAt!==null&&(!Number.isSafeInteger(value.expiresAt)||value.expiresAt<=value.createdAt)||typeof value.redirectUri!=='string'||value.redirectUri.length>4096)fail();
    found=value;
   }
   cursor=result.cursor;
  }while(cursor!==undefined);
  if(!found)fail();guard();
  const again=await wait(readPrivateQaFiniteOwnerContext({ctx,env,parent,preconnectionId})),after=await wait(readPrivateQaFiniteInitialAnchors({ctx,env},lease)),afterSdk=await wait(createFiniteOwnerIssuerProvenanceJournal({ctx,env}).read({preconnectionId},lease)),afterIssuer=await wait(createFinitePreparationIssuerJournal({ctx,env}).read({preconnectionId},lease));
  if(canonical(again)!==canonical(source)||canonical(after)!==canonical(anchors)||canonical(afterSdk)!==canonical(sdk)||canonical(afterIssuer)!==canonical(issuer))fail();guard();
  return Object.freeze({rootHash:root.recordHash,expectedGrantHash:expectedGrant.recordHash,completeSendHash:complete.send.recordHash,completeObservedHash:complete.observed.recordHash,correlationHash,sdkGrantId:found.id,createdAt:found.createdAt,expiresAt:found.expiresAt});
 });
}

const CF='https://api.cloudflare.com/client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec';
const SLOT='afw-own-successor-closure-v1',QA='agent-friendly-web-independent-closure-qa',CANARY='agent-friendly-web-delegated-canary';
const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
const iso=x=>typeof x==='string'&&Number.isSafeInteger(Date.parse(x))&&new Date(Date.parse(x)).toISOString()===x;
const sdkJournal=createFiniteOwnerIssuerProvenanceJournal;
function frozen(value){if(value&&typeof value==='object'){for(const v of Object.values(value))frozen(v);Object.freeze(value);}return value;}
// Children borrow the original alarm lease. Their own five-second timers may
// only shorten that invocation; no incoming-request Root or admission is minted.
function cleanupLifetime(options,originalLease){
 fields(options,['ctx','env']);const {ctx,env}=options,c=captureFinitePreparationIssuerContext(options);
 const storage=c.storage,get=c.get,list=c.list,db=c.db,withSession=c.session,prepare=db.prepare,getAlarm=storage.getAlarm;
 const node=env.AFW_RELEASE_EVENTS_NODE,nodeName=node?.idFromName,nodeString=node?.idFromString,nodeGet=node?.get,self=env.AFW_INDEPENDENT_CLOSURE,namespaceGet=self?.get;
 const alias=env.AFW_FINITE_OWNER_OAUTH_KV,methods={get:alias?.get,put:alias?.put,delete:alias?.delete,list:alias?.list};
 const reader=env.AFW_MCP_CLOSURE_READ_TOKEN,publisher=env.AFW_MCP_CLOSURE_PUBLISH_TOKEN,fetcher=globalThis.fetch;
 if([prepare,getAlarm,nodeName,nodeString,nodeGet,namespaceGet,fetcher,...Object.values(methods)].some(x=>typeof x!=='function')||db===env.DB||[reader,publisher].some(v=>typeof v!=='string'||!/^[-A-Za-z0-9_]{16,4096}$/.test(v)))fail();
 const nativeGuard=c.leaseGuard(originalLease),guard=()=>{
  nativeGuard();
  if(options.ctx!==ctx||options.env!==env||db.prepare!==prepare||storage.getAlarm!==getAlarm||env.AFW_RELEASE_EVENTS_NODE!==node||node.idFromName!==nodeName||node.idFromString!==nodeString||node.get!==nodeGet||env.AFW_INDEPENDENT_CLOSURE!==self||self.get!==namespaceGet||env.AFW_FINITE_OWNER_OAUTH_KV!==alias||Object.keys(methods).some(k=>alias[k]!==methods[k])||env.AFW_MCP_CLOSURE_READ_TOKEN!==reader||env.AFW_MCP_CLOSURE_PUBLISH_TOKEN!==publisher||globalThis.fetch!==fetcher)fail();
 };
 async function child(work){
  guard();const end=Date.now()+5000,clock=createFiniteInitialLease(end,end,guard,fail),stop=()=>clock.close();
  originalLease.signal.addEventListener('abort',stop,{once:true});
  const actual=retain(Promise.resolve().then(()=>{current(clock.lease);return work(clock.lease,end);}));
  try{return await clock.wait(actual);}finally{originalLease.signal.removeEventListener('abort',stop);clock.close();}
 }
 return {ctx,env,c,storage,get,list,db,withSession,node,nodeName,reader,publisher,fetcher,alias,methods,guard,child};
}
/** Fixed cleanup-only factual snapshot. Historical receipts remain dated facts;
 * fresh native holders, owner revision, provider bytes and original C1 govern
 * this invocation. Task1's forward reader above is unchanged. */
export async function readPrivateQaFiniteOwnerCleanup(options,originalLease){
 const life=cleanupLifetime(options,originalLease),{ctx,env,c,storage,get,list,db,withSession,node,nodeName,reader,publisher,fetcher,child}=life;
 const actorId=c.actorId,qaVersionId=c.qa,expected=readFiniteQaBootstrapSourceExpectations(),resident=readPrivateQaFiniteCandidate();
 const qaNamespaceId=finitePublicProfileTemplate('qaLive').bindings.find(b=>b.name==='AFW_INDEPENDENT_CLOSURE').namespace_id;
 const obligations=await child(()=>Reflect.apply(list,storage,[{prefix:'afw.finite-preparation-cleanup.v1:',limit:3}]));
 if(!obligations.size){
  for(const prefix of ['afw.finite-policy-effect.v1:','afw.finite-preparation-issuer.v1:','afw.finite-owner-issuer-provenance.v1:','afw.finite-preparation-notice.v1:','afw.finite-owner-cleanup.v1:'])if((await child(()=>Reflect.apply(list,storage,[{prefix,limit:1}]))).size)fail();
  return null;
 }
   const read=key=>child(()=>Reflect.apply(get,storage,[key]));
   const rows=(prefix,limit)=>child(()=>Reflect.apply(list,storage,[{prefix,limit}]));
   const request=(path,cap=65536,token=reader)=>child(async l=>{
    let response,stream;
    try{
     // Keep the actual fetch and body/cancellation lifecycle retained even if a
     // timeout wins. An aborted signal is never physical-settlement evidence.
     response=await retain(fetcher(CF+path,{method:'GET',redirect:'manual',cache:'no-store',credentials:'omit',referrerPolicy:'no-referrer',headers:{Authorization:'Bearer '+token,Accept:'application/json','Cache-Control':'no-cache'}}));current(l);
     const date=Date.parse(response?.headers?.get('date')??''),length=response?.headers?.get('content-length');
     if(!(response instanceof Response)||response.status!==200||response.redirected||!response.body||!Number.isSafeInteger(date)||Math.abs(Date.now()-date)>5000||
      !/^application\/json(?:\s*;|$)/i.test(response.headers.get('content-type')??'')||response.headers.has('age')&&response.headers.get('age')!=='0'||response.headers.has('retry-after')||response.headers.has('link')||
      ['HIT','STALE','REVALIDATED','UPDATING'].includes(response.headers.get('cf-cache-status')?.toUpperCase())||length!==null&&(!/^\d+$/.test(length)||Number(length)>cap))fail();
     stream=response.body.getReader();const chunks=[];let size=0;
     for(;;){const part=await retain(stream.read());current(l);if(part.done)break;if(!(part.value instanceof Uint8Array)||(size+=part.value.length)>cap)fail();chunks.push(part.value);}
     if(length!==null&&Number(length)!==size)fail();
     return {value:JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(Buffer.concat(chunks,size))),date};
    }finally{if(stream)await retain(stream.cancel()).catch(()=>{});else if(response?.body&&!response.body.locked)await retain(response.body.cancel()).catch(()=>{});}
   });
   const select=(sql,args=[])=>child(async l=>{
    const session=Reflect.apply(withSession,db,['first-primary']),method=session?.prepare;
    if(typeof method!=='function'||!sql.startsWith('SELECT '))fail();
    const statement=Reflect.apply(method,session,[sql]),bind=statement?.bind;if(typeof bind!=='function')fail();
    const bound=Reflect.apply(bind,statement,args),first=bound?.first;if(typeof first!=='function')fail();
    const result=await retain(Reflect.apply(first,bound,[]));current(l);if(session.prepare!==method)fail();return result;
   });
   // Each factual ALL is the first statement of its own primary session.
   const selectAll=(sql,args,cap)=>child(async l=>{
    const session=Reflect.apply(withSession,db,['first-primary']),method=session?.prepare;
    if(typeof method!=='function')fail();
    const statement=Reflect.apply(method,session,[sql]),bind=statement?.bind;if(typeof bind!=='function')fail();
    const bound=Reflect.apply(bind,statement,args),all=bound?.all;if(typeof all!=='function')fail();
    const actual=retain(Reflect.apply(all,bound,[])),result=await actual;current(l);
    if(session.prepare!==method||statement.bind!==bind||bound.all!==all||result?.success!==true||!Array.isArray(result.results)||result.results.length>cap)fail();
    return result.results.map(row=>own(row));
   });
   const facts=async()=>{
    const a=await child(l=>readPrivateQaFiniteInitialAnchors({ctx,env},l)),{capsule,material,plan}=a;
    if(capsule.sourceRevision!==expected.sourceRevision||capsule.sourceTree!==expected.sourceTree||capsule.qaVersionId!==qaVersionId||capsule.moduleHash!==resident.module.sha256)fail();
    if(Date.now()>=Math.min(capsule.C1,plan.readerExpiresAt,plan.publisherExpiresAt))fail();
    if(Date.now()<capsule.C0||Date.now()>=capsule.C1||capsule.recordedAt>Date.now()||a.alarm!==null&&a.alarm!==a.state.nextAt)fail();
    for(const prefix of ['afw.qa-finite-trial.v1:','source-selection:'+capsule.sourceRevision+':'])if((await rows(prefix,1)).size)fail();
    const backupRaw=[],backupRead=async(key,kind)=>{const raw=await read(key);backupRaw.push([key,raw]);return uploadRecord(kind,raw);};
    const up='afw.finite-initial-upload.v1:'+plan.entryHash+':',backup=await backupRead(up+'backup','Backup'),receipt=await backupRead(up+'receipt','Receipt');
    for(const k of ['entryHash','materialHash','sourceRevision','sourceTree','qaVersionId','initialInstanceId','baselineVersionId','baselineDeploymentId'])if(receipt[k]!==plan[k]||backup[k]!==plan[k])fail();
    if(backup.recordHash!==plan.manifestHash||receipt.manifestHash!==plan.manifestHash||receipt.uploadedVersionId!==capsule.activatedVersionId||receipt.moduleHash!==plan.moduleHash||receipt.configurationHash!==plan.configurationHash||backup.retainedIds.preconnectionId!==capsule.preconnectionId||canonical(backup.retainedIds)!==canonical({preconnectionId:capsule.preconnectionId,trialId:material.originalContext.trialId,activationKey:material.originalContext.publication.activationKey,withdrawalRequestId:material.originalContext.withdrawalRequestId,saveIdempotencyKey:material.originalContext.saveIdempotencyKey})||receipt.recordedAt>capsule.recordedAt)fail();
    const chunks=[];let bytes=0;
    for(const c of backup.chunks){const chunk=await backupRead(up+'chunk:'+String(c.index).padStart(3,'0'),'Chunk');if(chunk.manifestHash!==backup.recordHash||chunk.index!==c.index||chunk.bytes!==c.bytes||chunk.sha256!==c.sha256)fail();const part=Buffer.from(chunk.content,'base64');bytes+=part.length;if(bytes>2097152)fail();chunks.push(part);}
    if(bytes!==backup.moduleBytes||sha(Buffer.concat(chunks,bytes))!==backup.moduleHash)fail();
    const prefix='connection-preparation:'+capsule.preconnectionId+':',inventory=await rows(prefix,17),effects=await rows('afw.finite-policy-effect.v1:',33),enrollment=await rows('afw.finite-preparation-cleanup.v1:',3);
    if(inventory.size>16||effects.size>32||enrollment.size>2)fail();
    for(const k of inventory.keys())if(!['record','source','connection:approval','grant','connection','notice'].some(s=>k===prefix+s))fail();
    for(const k of enrollment.keys())if(!['enrollment','ack'].some(s=>k==='afw.finite-preparation-cleanup.v1:'+s))fail();
    const issuer=await child(l=>createFinitePreparationIssuerJournal({ctx,env}).read({preconnectionId:capsule.preconnectionId},l));
    const sdk=await child(l=>sdkJournal({ctx,env}).read({preconnectionId:capsule.preconnectionId},l));
    const notice=await child(l=>noticeJournal({ctx,env}).read({preconnectionId:capsule.preconnectionId},l));
    return {capsule,material,plan,a,inventory,effects,enrollment,issuer,sdk,notice,anchor:canonical({anchors:a,backupRaw,inventory:[...inventory],effects:[...effects],enrollment:[...enrollment],issuer,sdk:sdk.entries,notice})};
   };
   const first=await facts(),{capsule,material,plan}=first,p=material.ownerSelection;
   if(plan.moduleBytes!==resident.bytes.length||sha(resident.bytes)!==capsule.moduleHash||material.originalContext.original.containerId!==Reflect.apply(nodeName,node,['afw-own-event-one-occurrence-v1']).toString())fail();
   const owned=async()=>{
    const value=await select('SELECT id,user_id,revision FROM site_projects WHERE id=? AND user_id=?',[p.project.projectId,p.subject]);
    if(!value||value.id!==p.project.projectId||value.user_id!==p.subject||value.revision!==p.project.revision)fail();
    return {projectId:value.id,revision:value.revision,synthetic:true};
   };
   const verifyCredential=async(token,id,expiresAt)=>{
    const v=finiteCfEnvelope((await request('/tokens/verify',8192,token)).value);fields(v,['id','status','expires_on',...Object.hasOwn(v,'not_before')?['not_before']:[]]);
    if(v.id!==id||v.status!=='active'||Date.parse(v.expires_on)!==expiresAt||Date.parse(v.expires_on)<=Date.now()||v.not_before!=null&&(!Number.isSafeInteger(Date.parse(v.not_before))||Date.parse(v.not_before)>Date.now()))fail();
   };
   const credentials=async()=>{
    const readerWork=retain(Promise.resolve().then(()=>verifyCredential(reader,plan.readerId,plan.readerExpiresAt)));
    const publisherWork=retain(Promise.resolve().then(()=>verifyCredential(publisher,plan.publisherId,plan.publisherExpiresAt)));
    const joined=await retain(Promise.allSettled([readerWork,publisherWork]));
    current(originalLease);if(joined.some(result=>result.status!=='fulfilled'))fail();
   };
   const readQaPrimary=async()=>{
    const qaPointer=finiteQaPointer(await request('/workers/scripts/'+QA+'/deployments?per_page=1'));
    if(canonical(qaPointer)!==canonical(material.qaBootstrap.currentPointer))fail();
    const q=finiteCfEnvelope((await request('/workers/workers/'+QA+'/versions/'+qaVersionId+'?include=modules',4500000)).value);
    const configKeys=Object.keys(finitePublicProfileTemplate('qaLive')),wrappers=['id','number','startup_time_ms','annotations','urls','source','created_on','author_id','author_email','modules'];
    fields(q,[...configKeys,...wrappers.filter(k=>Object.hasOwn(q,k))]);
    if(q.id!==qaVersionId||!Array.isArray(q.urls)||q.urls.length||!Array.isArray(q.modules)||q.modules.length!==1)fail();
    const qaModule=fields(q.modules[0],['name','content_type','content_base64']),expectedModule=material.qaBootstrap.record.qaLive.module;
    if(qaModule.name!==expectedModule.name||qaModule.content_type!=='application/javascript+module'||typeof qaModule.content_base64!=='string'||qaModule.content_base64.length>Math.ceil(expectedModule.bytes/3)*4)fail();
    const bytes=Buffer.from(qaModule.content_base64,'base64');
    if(bytes.toString('base64')!==qaModule.content_base64||bytes.length!==expectedModule.bytes||sha(bytes)!==expectedModule.sha256)fail();
    projectFinitePublicConfiguration({role:'qaLive',metadata:Object.fromEntries(configKeys.map(k=>[k,q[k]]))});
    return {qaMetadata:Object.fromEntries(configKeys.map(k=>[k,q[k]]))};
   };
   const readMPrimary=async()=>{
    const rawPointer=await request('/workers/scripts/'+CANARY+'/deployments?per_page=1'),pointer=finiteQaPointer(rawPointer),deployment=finiteCfEnvelope(rawPointer.value).deployments[0];
    const restored=first.a.records['restore-ack'],restoreSend=first.a.records['restore-send'];
    const isRestored=!!restored;
    if(isRestored){
     if(!restoreSend||restored.sendHash!==restoreSend.recordHash||restored.planHash!==plan.recordHash||restored.acknowledgedAt<restoreSend.issuedAt||restored.acknowledgedAt>=restoreSend.deadline||pointer.versionId!==plan.baselineVersionId||pointer.deploymentId!==restored.deploymentId||deployment.annotations?.['workers/message']!=='afw-finite-initial-restore-'+plan.recordHash)fail();
     const baseline=qualifyFiniteInitialHistoricalBaseline(finiteCfEnvelope((await request('/workers/workers/'+CANARY+'/versions/'+plan.baselineVersionId+'?include=modules',4500000)).value));
     const backup=uploadRecord('Backup',await read('afw.finite-initial-upload.v1:'+plan.entryHash+':backup'));
     if(sha(baseline.bytes)!==backup.moduleHash||restorationConfigurationHash(baseline.rawConfiguration)!==backup.rawConfigurationHash)fail();
    }

    const metadata=finiteCfEnvelope((await request('/workers/workers/'+CANARY+'/versions/'+capsule.activatedVersionId+'?include=modules',4500000)).value);
    const configuration=qualifyFiniteInitialUploadedVersion(metadata,capsule.activatedVersionId,plan.configuration,resident.bytes);
    if(restorationConfigurationHash(configuration)!==capsule.configurationHash||finiteInitialCapsuleBindingsHash(configuration.bindings)!==capsule.bindingsHash)fail();
    const binding=name=>configuration.bindings.find(b=>b.name===name),text=name=>binding(name)?.text;
    if(text('AFW_OAUTH_PILOT_CLIENT_ID')!==p.clientId||text('AFW_OAUTH_PILOT_PROJECT_ID')!==p.project.projectId||text('AFW_OAUTH_RESOURCE')!==p.resource||text('ACCESS_TEAM_DOMAIN')!==p.access.teamDomain||text('ACCESS_AUD')!==p.access.audience||text('AFW_OAUTH_PILOT_EXPIRES_AT')!==new Date(capsule.C0).toISOString()||canonical(binding('DELEGATED_RATE_LIMITER'))!==canonical(p.limiter))fail();
    const project=await owned();
    let currentConfiguration=configuration;
    if(!isRestored&&(pointer.versionId!==capsule.activatedVersionId||pointer.deploymentId!==capsule.activatedDeploymentId)){
     const raw=finiteCfEnvelope((await request('/workers/workers/'+CANARY+'/versions/'+pointer.versionId+'?include=modules',4500000)).value);
     const configKeys=Object.keys(plan.configuration),wrappers=['id','number','startup_time_ms','annotations','urls','source','created_on','author_id','author_email','modules'];
     fields(raw,[...configKeys,...wrappers.filter(k=>Object.hasOwn(raw,k)),...Object.hasOwn(raw,'cache_options')?['cache_options']:[]]);
     if(raw.id!==pointer.versionId||!Array.isArray(raw.urls)||raw.urls.length||!Array.isArray(raw.modules)||raw.modules.length!==1)fail();
     const cfg=structuredClone(own(Object.fromEntries(configKeys.map(k=>[k,raw[k]]))));
     fields(cfg.exports,['default','AfwNodeControl','AfwOwnEventNode']);
     for(const [name,e]of Object.entries(cfg.exports)){const keys=name==='AfwOwnEventNode'?['type','storage','container']:['type'];fields(e,[...keys,...Object.hasOwn(e,'state')?['state']:[],...Object.hasOwn(e,'cache')?['cache']:[]]);if(Object.hasOwn(e,'state')){if(e.state!=='created')fail();delete e.state;}if(Object.hasOwn(e,'cache')){fields(e.cache,['enabled']);if(name==='AfwOwnEventNode'||e.cache.enabled!==false)fail();delete e.cache;}}
     if(Object.hasOwn(raw,'cache_options')){const keys=['enabled','cross_version_cache'].filter(k=>Object.hasOwn(raw.cache_options??{},k));if(!keys.length)fail();fields(raw.cache_options,keys);if(keys.some(k=>raw.cache_options[k]!==false))fail();}
     const expected=structuredClone(plan.configuration);expected.bindings.find(b=>b.name==='AFW_DELEGATED_OAUTH_ENABLED').text='true';
     if(canonical(cfg)!==canonical(expected))fail();qualifyFiniteConnectionProfile({phase:'read_consent',metadata:cfg});
     const currentModule=fields(raw.modules[0],['name','content_type','content_base64']);if(currentModule.name!=='index.mjs'||currentModule.content_type!=='application/javascript+module'||typeof currentModule.content_base64!=='string'||currentModule.content_base64!==Buffer.from(resident.bytes).toString('base64'))fail();currentConfiguration=cfg;
    }
    return {project,pointer,deployment,isRestored,currentConfiguration,configuration,initialBaseline:{versionId:capsule.activatedVersionId,deploymentId:capsule.activatedDeploymentId,moduleHash:sha(resident.bytes),configurationHash:finiteActivationConfigurationHash(plan.configuration),bindingsHash:finiteInitialCapsuleBindingsHash(configuration.bindings)}};
   };
   const primary=async()=>{
    await credentials();
    const qaWork=retain(Promise.resolve().then(readQaPrimary)),mWork=retain(Promise.resolve().then(readMPrimary));
    const joined=await retain(Promise.allSettled([qaWork,mWork]));
    current(originalLease);if(joined.some(result=>result.status!=='fulfilled'))fail();
    const {qaMetadata}=joined[0].value,{project,pointer,deployment,isRestored,currentConfiguration,configuration,initialBaseline}=joined[1].value;
    const qaSdkBindingFacts=qualifyFiniteOwnerSdkBindingFacts({qaMetadata,mMetadata:currentConfiguration});
    qualifyFiniteOwnerSdkBindingFacts({qaMetadata,mMetadata:configuration});
    return {project,pointer,deployment,isRestored,currentConfiguration,qaSdkBindingFacts,initialBaseline};
   };
   const observed=await primary();
   const source=validateFiniteOwnerSource({sourceRevision:capsule.sourceRevision,actorId,qaNamespaceId,qaVersionId,origin:'https://delegated-canary.agentfriendlyweb.dev',phase:'closed_ui',access:p.access,clientId:p.clientId,resource:p.resource,project:observed.project,goal:p.goal,
    programContext:{programHash:material.originalContext.original.programHash,sourceRevision:material.originalContext.original.sourceRevision,originalContextHash:digest('afw.finite-original-context.v1',material.originalContext)},
    initialBaseline:observed.initialBaseline,currentPublication:{stage:null,versionId:capsule.activatedVersionId,deploymentId:capsule.activatedDeploymentId,receiptHash:null},window:{startedAt:capsule.I0,expiresAt:capsule.C0}});
   const issuerPrimary=async(f,data,enrollment,ack,receipt,getRecord)=>{
    const id=capsule.preconnectionId,issuer=f.issuer,i=issuer.reservation?.identity;
    const schema=await select('SELECT type,name,sql FROM sqlite_schema WHERE name=?',['finite_preparation_issuer_fences']);
    const grantLink=await getRecord('readLink',{kind:'grant',preconnectionId:id},false),relation=await getRecord('readPreconnectionConnection',{preconnectionId:id},false);
    if(!schema){if(i||grantLink||relation)fail();return {schema:null};}
    fields(schema,['type','name','sql']);const normalized=x=>typeof x==='string'?x.replace(/\s+/g,' ').trim().replace(/;$/,''):null;
    if(schema.type!=='table'||schema.name!=='finite_preparation_issuer_fences'||normalized(schema.sql)!==normalized(FINITE_PREPARATION_ISSUER_SCHEMA[0]))fail();
    const fence=await select('SELECT preconnection_id,authorization_hash,grant_id,enrollment_hash,identity_hash,reserved_at,forward_until,cleanup_until,fence_request_id,fenced_at FROM finite_preparation_issuer_fences WHERE preconnection_id=?',[id]);
    if(!i){if(fence||grantLink||relation)fail();return {schema,fence,grantLink,relation};}
    if(!receipt||!enrollment||!ack||i.preconnectionId!==id||i.enrollmentHash!==enrollment.recordHash||i.capsuleHash!==capsule.capsuleHash||i.sourceRevision!==capsule.sourceRevision||i.qaVersionId!==qaVersionId||i.actorId!==actorId||i.subject!==p.subject||i.accessRealmHash!==data.preconnection.owner.accessRealmHash||i.projectId!==p.project.projectId||i.projectRevision!==p.project.revision||i.clientId!==p.clientId||i.resource!==p.resource||i.I0!==capsule.I0||i.C0!==capsule.C0||i.C1!==capsule.C1||i.reservedAt<ack.acknowledgedAt||i.reservedAt>Date.now()||issuer.reservation.issuedAt>Date.now()||Date.parse(i.consentExpiresAt)>data.preconnection.expiresAt)fail();

    for(const v of Object.values(issuer.operations)){
     if(v.ack&&!v.send||v.ack?.observedAt>Date.now())fail();
    }
    const ops=issuer.operations,expectedFence={preconnection_id:id,authorization_hash:i.authorizationHash,grant_id:i.grantId,enrollment_hash:i.enrollmentHash,identity_hash:i.identityHash,reserved_at:i.reservedAt,forward_until:i.C0,cleanup_until:i.C1,fence_request_id:null,fenced_at:null};
    if(fence&&(canonical({...fence,fence_request_id:null,fenced_at:null})!==canonical(expectedFence)||fence?.fenced_at!==null&&fence&&(!issuer.operations.close_fence.send||fence.fence_request_id!==issuer.operations.close_fence.send.requestId||fence.fenced_at<issuer.operations.close_fence.send.issuedAt||fence.fenced_at>=issuer.operations.close_fence.send.deadline)))fail();
    const consent=await select('SELECT handle_hash,user_id,kind,project_id,client_id,resource,scopes_json,expires_at,consumed_at FROM delegated_consent_sessions WHERE handle_hash=?',[i.authorizationHash]);
    const grant=await select('SELECT id,user_id,client_id,project_id,resource,scopes_json,created_at,expires_at,revoked_at,exchanged_at FROM delegated_access_grants WHERE id=?',[i.grantId]);
    const authorization=await getRecord('readAuthorizationLink',{authorizationHash:i.authorizationHash},false);
    const rowAck=(op,row)=>{const v=ops[op];if(!v.send){if(row)fail();return;}if(!v.ack)return;if(v.ack.outcome==='no_mutation'){if(v.ack.rowHash!==null||row)fail();return;}if(!row||v.ack.rowHash!==digest('afw.finite-preparation-issuer-row.v1',row))fail();};
    rowAck('open_fence',fence?{...fence,fence_request_id:null,fenced_at:null}:null);
    if(!fence&&(consent||grant||authorization||grantLink||relation||ops.authorization.send||ops.consume.send||ops.grant.send))fail();
    if(consent){
     const expected={handle_hash:i.authorizationHash,user_id:i.subject,kind:'authorize',project_id:i.projectId,client_id:i.clientId,resource:i.resource,scopes_json:JSON.stringify(i.requestedScopes),expires_at:i.consentExpiresAt,consumed_at:consent.consumed_at};
     if(canonical(consent)!==canonical(expected)||consent.consumed_at!==''&&(!iso(consent.consumed_at)||Date.parse(consent.consumed_at)<i.reservedAt||Date.parse(consent.consumed_at)>Date.now()||Date.parse(consent.consumed_at)>=Date.parse(consent.expires_at)))fail();
    }
    rowAck('authorization',consent?{...consent,consumed_at:''}:null);
    rowAck('consume',consent?.consumed_at?consent:null);
    if(authorization){
     if(!consent||authorization.preconnectionId!==id||authorization.authorizationHash!==i.authorizationHash||authorization.subjectHash!==data.ticket.subjectHash||authorization.sourceRevision!==source.sourceRevision||authorization.projectRef!==data.ticket.projectRef||authorization.clientId!==i.clientId||authorization.resource!==i.resource||authorization.issuedAt<i.reservedAt||authorization.issuedAt>Date.now()||authorization.expiresAt>Math.min(data.preconnection.expiresAt,Date.parse(consent.expires_at)))fail();
    }
    if(grant){
     let scopes;try{scopes=JSON.parse(grant.scopes_json);}catch{fail();}
     if(!consent?.consumed_at||!authorization||grant.id!==i.grantId||grant.user_id!==i.subject||grant.client_id!==i.clientId||grant.project_id!==i.projectId||grant.resource!==i.resource||!Array.isArray(scopes)||scopes[0]!=='afw:project:read'||new Set(scopes).size!==scopes.length||scopes.some(s=>!i.requestedScopes.includes(s))||JSON.stringify(scopes)!==grant.scopes_json||grant.revoked_at!==''&&(!iso(grant.revoked_at)||Date.parse(grant.revoked_at)<Date.parse(grant.created_at)||Date.parse(grant.revoked_at)>Date.now())||!iso(grant.created_at)||!iso(grant.expires_at)||grant.exchanged_at!==''&&(!iso(grant.exchanged_at)||Date.parse(grant.exchanged_at)>Date.now()||Date.parse(grant.exchanged_at)<Date.parse(grant.created_at)||Date.parse(grant.exchanged_at)>=Date.parse(grant.expires_at))||Date.parse(grant.created_at)<Date.parse(consent.consumed_at)||Date.parse(grant.created_at)>Date.now()||Date.parse(grant.expires_at)>Math.min(i.C0,Date.parse(consent.expires_at),data.preconnection.expiresAt))fail();

    }
    rowAck('grant',grant?{...grant,exchanged_at:'',revoked_at:''}:grant);
    if(grantLink){
     if(!grant||!authorization||grantLink.preconnectionId!==id||grantLink.authorizationHash!==i.authorizationHash||grantLink.grantId!==i.grantId||grantLink.grantHash!==sha(i.grantId)||grantLink.acceptedAt<Date.parse(grant.created_at)||grantLink.acceptedAt>Date.now())fail();
    }
    let connection=null;
    if(relation){
     if(!grantLink||relation.preconnectionId!==id||relation.grantHash!==grantLink.grantHash||relation.linkedAt<grantLink.acceptedAt||relation.linkedAt>Date.now())fail();
     connection=await getRecord('readConnectionRef',{connectionRef:relation.connectionRef});
     if(connection.connectionRef!==relation.connectionRef||connection.subject!==i.subject||connection.grantId!==i.grantId||connection.clientId!==i.clientId||connection.projectId!==i.projectId||connection.resource!==i.resource||connection.issuedAt!==relation.linkedAt||connection.expiresAt>Math.min(data.preconnection.expiresAt,data.preconnection.owner.accessExpiresAt,Date.parse(grant.expires_at)))fail();
    }
    return {schema,fence,consent,grant,authorization,grantLink,relation,connection};
   };
   const noticePrimary=async(f,data,issuerFacts)=>{
    const n=f.notice,r=n.reservation,i=f.issuer.reservation?.identity;
    if(n.freeze)fail(); // Future notice cleanup is not part of this unit.
    const objects=await selectAll("SELECT type,name,tbl_name,sql FROM sqlite_schema WHERE tbl_name IN ('dossier_monitoring_consent_events','dossier_monitoring_owner_tickets') AND sql IS NOT NULL ORDER BY name LIMIT 8",[],8);
    if(objects.length!==0&&objects.length!==7)fail();
    const empty={schema:null,tickets:[],events:[]};
    if(!objects.length){if(r)fail();return empty;}
    const normalize=x=>x.replace(/\s+/g,' ').trim().replace(/;$/,'').replace(/^CREATE (TABLE|INDEX|TRIGGER) IF NOT EXISTS /,'CREATE $1 ');
    for(const row of objects)fields(row,['type','name','tbl_name','sql']);
    for(const def of FINITE_PREPARATION_MONITORING_SCHEMA){
     const [,kind,name]=def.match(/^CREATE (TABLE|INDEX|TRIGGER) IF NOT EXISTS (\w+)/),table=kind==='TABLE'?name:def.match(/(?: ON | ON)(\w+)/)?.[1];
     if(!objects.some(row=>row.type===kind.toLowerCase()&&row.name===name&&row.tbl_name===table&&typeof row.sql==='string'&&normalize(row.sql)===normalize(def)))fail();
    }
    const schema={objects};
    if(!i){if(r)fail();return {...empty,schema};}
    const tickets=await selectAll('SELECT handle_hash,request_id,user_id,grant_id,project_id,client_id,resource,purpose,action,revision,expected_sequence,issued_at,expires_at,permission_expires_at FROM dossier_monitoring_owner_tickets WHERE grant_id=? ORDER BY handle_hash LIMIT 2',[i.grantId],2);
    let events=await selectAll('SELECT sequence,grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at FROM dossier_monitoring_consent_events WHERE grant_id=? ORDER BY sequence LIMIT 3',[i.grantId],3);
    if(tickets.length>=2||events.length>2)fail();
    const withdrawals=events.filter(e=>e.action==='revoke');
    if(withdrawals.length>1)fail();
    const grants=events.filter(e=>e.action==='grant');if(grants.length>1||withdrawals.length&&!grants.length)fail();
    for(const e of withdrawals)if(!i||e.grant_id!==i.grantId||e.project_id!==i.projectId||e.user_id!==i.subject||e.client_id!==i.clientId||e.resource!==i.resource||e.revision!==i.projectRevision||e.purpose!=='afw.dossier-monitoring.v1'||!Number.isSafeInteger(e.issued_at)||e.issued_at!==e.expires_at||e.issued_at<Date.parse(issuerFacts.grant?.created_at)||e.issued_at>Date.now()||e.sequence<=grants[0].sequence)fail();
    const allEvents=events;events=grants;
    if(!r){if(tickets.length||events.length)fail();return {schema,tickets,events};}
    const grant=issuerFacts.grant,ops=f.issuer.operations,sdk=f.sdk;
    if(!grant||!issuerFacts.authorization||!issuerFacts.grantLink||!issuerFacts.relation||!issuerFacts.connection||!data.preconnection||!data.approval||!sdk.root||!sdk.grant||!['sdk_begin','sdk_approve','sdk_complete'].every(op=>sdk.operations[op].send&&sdk.operations[op].observed)||!ops.grant.ack||ops.grant.ack.outcome!=='applied')fail();
    for(const [name,op]of Object.entries(ops))if(!['close_fence','revoke_grant'].includes(name)&&(op.send&&!op.ack||op.ack&&!op.send))fail();
    const expectedGrant={scopes:JSON.parse(grant.scopes_json),createdAt:grant.created_at,expiresAt:grant.expires_at};
    const t=r.ticket,ceil=Math.min(r.accessExpiresAt,r.preconnectionExpiresAt,data.approval.expiresAt,issuerFacts.connection.expiresAt,i.C0,Date.parse(i.consentExpiresAt),Date.parse(grant.expires_at));
    if(canonical(r.identity)!==canonical(i)||r.issuerReservationHash!==f.issuer.reservation.recordHash||r.originalGrantAckHash!==ops.grant.ack.recordHash||r.grantLinkHash!==prepHash('GrantLink',issuerFacts.grantLink)||r.connectionHash!==prepHash('ConnectionRef',issuerFacts.connection)||canonical(r.expectedGrant)!==canonical(expectedGrant)||r.consumedAt!==issuerFacts.consent.consumed_at||r.preconnectionExpiresAt!==data.preconnection.expiresAt||r.accessExpiresAt>Math.min(data.preconnection.owner.accessExpiresAt,i.C0)||r.accessExpiresAt<=r.issuedAt||r.issuedAt>Date.now()||t.expiresAt>ceil||t.permissionExpiresAt>ceil)fail();

    const {send,ack}=n.operations.ticket;
    if(send?.issuedAt>Date.now()||ack?.observedAt>Date.now())fail();
    const row=expectedNoticeTicket(i,t);
    if(tickets.some(v=>canonical(v)!==canonical(row)))fail();
    if(!send&&tickets.length)fail();
    if(ack?.outcome==='applied'&&(tickets.length!==1||ack.sequence!==null||ack.rowHash!==digest('afw.finite-preparation-notice-row.v1',tickets[0])))fail();
    if(ack?.outcome==='no_mutation'&&(tickets.length||ack.rowHash!==null||ack.sequence!==null))fail();
    const consent=n.operations.consent;
    if(!consent.send){if(consent.ack||events.length)fail();}
    else{
     if(ack?.outcome!=='applied'||tickets.length!==1||consent.send.issuedAt>Date.now()||consent.ack?.observedAt>Date.now())fail();
     for(const event of events)qualifyNoticeConsentEvent(event,i,t,consent.send);
     if(consent.ack?.outcome==='applied'&&(events.length!==1||consent.ack.rowHash!==digest('afw.finite-preparation-notice-row.v1',events[0])||consent.ack.sequence!==events[0].sequence||events[0].issued_at>consent.ack.observedAt))fail();
     if(consent.ack?.outcome==='no_mutation'&&(events.length||consent.ack.rowHash!==null||consent.ack.sequence!==null))fail();
    }
    return {schema,tickets,events,withdrawals,allEvents};
   };
   const qualify=async(f,actual)=>{
    const store=createFiniteOwnerPreparationStore({storage,now:Date.now}),id=capsule.preconnectionId,prefix='connection-preparation:'+id+':';
    const getRecord=async(method,arg,required=true)=>{const v=await child(l=>store[method](arg,l));if(v.status==='absent'&&!required)return null;if(v.status!=='observed')fail();return v.record;};
    const data={};
    if(f.inventory.size){
     data.sourceSnapshot=await getRecord('readOwnerSourceSnapshot',{preconnectionId:id});
     if(data.sourceSnapshot.preconnectionId!==id||canonical(data.sourceSnapshot.source)!==canonical(source))fail();
     data.ticket=await getRecord('readTicket',{ticketHash:data.sourceSnapshot.initialTicketHash},false);
     if(!data.ticket){
      data.ticketUse=await getRecord('readTicketUse',{ticketHash:data.sourceSnapshot.initialTicketHash},false);
      data.preconnection=await getRecord('readPreconnection',{preconnectionId:id},false);
      if(data.ticketUse||data.preconnection||f.inventory.size!==1||!f.inventory.has(prefix+'source')||f.enrollment.size||f.effects.size||f.issuer.reservation)fail();
     }else{
     data.projectRef=await getRecord('readProjectRef',{projectRef:data.ticket.projectRef});
     const t=data.ticket,map=data.projectRef,realm=evidence('realm',{...source.access,origin:source.origin}),subject=evidence('subject',{accessRealmHash:realm,subject:p.subject});
     if(t.ticketHash!==data.sourceSnapshot.initialTicketHash||t.preconnectionId!==id||t.sourceRevision!==source.sourceRevision||t.action!=='connection'||t.connectionRef!==null||t.subjectHash!==subject||map.preconnectionId!==id||map.projectRef!==t.projectRef||map.sourceRevision!==source.sourceRevision||map.projectId!==source.project.projectId||map.revision!==source.project.revision||map.subjectHash!==subject||t.expiresAt>map.expiresAt||t.createdAt<source.window.startedAt||t.createdAt>Date.now()||map.issuedAt<source.window.startedAt||map.issuedAt>t.createdAt||map.expiresAt>capsule.C0||t.expiresAt>capsule.C0)fail();
     data.ticketUse=await getRecord('readTicketUse',{ticketHash:t.ticketHash},false);
     data.preconnection=await getRecord('readPreconnection',{preconnectionId:id},false);
     if(data.preconnection){
      data.stageApproval=await getRecord('readStageApproval',{preconnectionId:id,stage:'connection'},false);
      data.approval=await getRecord('readConfigurationApproval',{approvalHash:data.preconnection.approvalHash});
      data.ticketUse=await getRecord('readTicketUse',{ticketHash:t.ticketHash});
      const pre=data.preconnection,sa=data.stageApproval,a=data.approval,use=data.ticketUse;
      if(!use)fail();
      const decision=evidence('decision',{ticket:t,decision:'approve',projectHash:a.projectHash,goal:source.goal,clientId:source.clientId,approvedAt:a.approvedAt,expiresAt:a.expiresAt});
      if(pre.preconnectionId!==id||pre.sourceRevision!==source.sourceRevision||pre.actorId!==actorId||pre.owner.subject!==p.subject||pre.owner.accessRealmHash!==realm||pre.clientId!==source.clientId||pre.resource!==source.resource||canonical(pre.project)!==canonical(source.project)||pre.baselineHash!==evidence('baseline',source.initialBaseline)||pre.startedAt<capsule.I0||pre.expiresAt>capsule.C0||(sa&&(sa.preconnectionId!==id||sa.sourceRevision!==source.sourceRevision||sa.stage!=='connection'||sa.ticketHash!==t.ticketHash||sa.approvalHash!==pre.approvalHash))||pre.approvalHash!==prepHash('ConfigurationApproval',a)||a.subjectHash!==subject||a.sourceRevision!==source.sourceRevision||a.clientId!==source.clientId||a.projectHash!==projectHash(source.project)||a.csrfReceiptHash!==decision||use.ticketHash!==t.ticketHash||use.recordHash!==decision||use.consumedAt<a.approvedAt||use.consumedAt>Date.now()||a.approvedAt<pre.startedAt||a.approvedAt<t.createdAt||a.expiresAt>Math.min(pre.expiresAt,pre.owner.accessExpiresAt,t.expiresAt,capsule.C0))fail();

     }else if(f.inventory.size!==1||!f.inventory.has(prefix+'source')||f.enrollment.size||f.effects.size||f.issuer.reservation)fail();
     }
    }else if(f.enrollment.size||f.effects.size||f.issuer.reservation)fail();
    let enrollment=null,ack=null;
    if(f.enrollment.size){
     enrollment=enrollmentRecord('Enrollment',f.enrollment.get('afw.finite-preparation-cleanup.v1:enrollment'));
     ack=f.enrollment.has('afw.finite-preparation-cleanup.v1:ack')?enrollmentRecord('Ack',f.enrollment.get('afw.finite-preparation-cleanup.v1:ack')):null;
     qualifyFinitePreparationEnrollmentFacts({anchors:f.a,enrollment,ack,...data});
    }
    let receipt=null;
    if(f.effects.size){
     if(!enrollment||!ack||!data.preconnection||!data.stageApproval)fail();
     const identity={kind:'connection',preconnectionId:id,sourceRevision:source.sourceRevision,stage:'connection'},up=effectIdentity({...identity,effect:'upload'}),activationId=effectIdentity({...identity,effect:'activation'});
     const allowed=['writer-head',...['send','ack'].map(s=>up+':'+s),...['send','ack','receipt'].map(s=>activationId+':'+s)].map(s=>'afw.finite-policy-effect.v1:'+s);

     if([...f.effects.keys()].some(k=>!allowed.includes(k)))fail();
     const upload=await child(l=>createFinitePolicyEffectJournal({storage,identity:{...identity,effect:'upload'},now:Date.now}).read(l)),activation=await child(l=>createFinitePolicyEffectJournal({storage,identity:{...identity,effect:'activation'},now:Date.now}).read(l));
     const contextHash=digest('afw.finite-connection-context.v1',{preconnection:data.preconnection,stageApproval:data.stageApproval,predecessors:[],grant:null,notice:null});
     const historical=(journal,effect)=>{
      if(!['absent','issued','acknowledged','installed'].includes(journal.state)||journal.receipt&&effect!=='activation')fail();
      if(!journal.send){if(journal.state!=='absent'||journal.ack||journal.receipt)fail();return;}
      const s=journal.send,a=journal.ack,pre=data.preconnection,approval=data.approval;
      if(s.preconnectionId!==id||s.sourceRevision!==source.sourceRevision||s.stage!=='connection'||s.effect!==effect||s.contextHash!==contextHash||s.baselineVersionId!==capsule.activatedVersionId||s.baselineDeploymentId!==capsule.activatedDeploymentId||s.issuedAt<Math.max(ack.acknowledgedAt,approval.approvedAt,data.ticketUse.consumedAt)||s.issuedAt>Date.now()||s.deadline>Math.min(pre.expiresAt,pre.owner.accessExpiresAt,approval.expiresAt,capsule.C0)||s.deadline-s.issuedAt>5000||a&&(a.sendHash!==prepHash('ConnectionSend',s)||a.acknowledgedAt<s.issuedAt||a.acknowledgedAt>=s.deadline||a.acknowledgedAt>Date.now()))fail();
     };
     historical(upload,'upload');historical(activation,'activation');
     if(!upload.send||upload.receipt||activation.send&&(!upload.ack||activation.send.issuedAt<upload.ack.acknowledgedAt)||activation.ack&&!activation.send)fail();
     const last=activation.send??upload.send,lastId=activation.send?activationId:up,expectedRows=1+(upload.send?1:0)+(upload.ack?1:0)+(activation.send?1:0)+(activation.ack?1:0)+(activation.receipt?1:0);
     if(f.effects.size!==expectedRows||f.effects.get('afw.finite-policy-effect.v1:writer-head')!==JSON.stringify({identityHash:lastId,sendHash:prepHash('ConnectionSend',last)}))fail();
     const expected=structuredClone(plan.configuration);expected.bindings.find(b=>b.name==='AFW_DELEGATED_OAUTH_ENABLED').text='true';
     if(activation.ack){
      if(upload.ack.resourceId===capsule.activatedVersionId||activation.ack.resourceId===capsule.activatedDeploymentId||!actual.isRestored&&(actual.pointer.versionId!==upload.ack.resourceId||actual.pointer.deploymentId!==activation.ack.resourceId||canonical(actual.currentConfiguration)!==canonical(expected)))fail();
      if(!actual.isRestored)qualifyFiniteConnectionProfile({phase:'read_consent',metadata:actual.currentConfiguration});
      const activationBody={strategy:'percentage',versions:[{version_id:upload.ack.resourceId,percentage:100}]};
      if(activation.send.requestHash!==digest('afw.finite-policy-request.v1',{method:'POST',path:CF+'/workers/scripts/'+CANARY+'/deployments',body:activationBody,baselineVersionId:capsule.activatedVersionId,baselineDeploymentId:capsule.activatedDeploymentId})||!actual.isRestored&&Object.hasOwn(actual.deployment,'annotations'))fail();
     }else if(!actual.isRestored&&(actual.pointer.versionId!==capsule.activatedVersionId||actual.pointer.deploymentId!==capsule.activatedDeploymentId||canonical(actual.currentConfiguration)!==canonical(plan.configuration)))fail();
     if(activation.receipt){
      receipt=qualifyFiniteOwnerInstalledStage({source,preconnection:data.preconnection,sourceSnapshot:data.sourceSnapshot,initialTicket:data.ticket,connection:null,stage:'connection',stageApproval:data.stageApproval,approval:data.approval,ticket:data.ticket,ticketUse:data.ticketUse,upload,activation,predecessors:[],grantLink:null,noticeLink:null,observedAt:activation.receipt.completedAt});
      if(receipt.moduleHash!==capsule.moduleHash||receipt.configurationHash!==finiteActivationConfigurationHash(expected))fail();
     }
    }else if(!actual.isRestored&&(actual.pointer.versionId!==capsule.activatedVersionId||actual.pointer.deploymentId!==capsule.activatedDeploymentId||canonical(actual.currentConfiguration)!==canonical(plan.configuration)))fail();
    if(f.sdk.root){const r=f.sdk.root;if(!receipt||!enrollment||!ack||r.preconnectionId!==id||r.capsuleHash!==capsule.capsuleHash||r.enrollmentHash!==enrollment.recordHash||r.originalConnectionReceiptHash!==receipt.receiptHash||r.sourceRevision!==capsule.sourceRevision||r.actorId!==actorId||r.qaVersionId!==qaVersionId||r.mVersionId!==receipt.versionId||r.I0!==capsule.I0||r.C0!==capsule.C0||r.C1!==capsule.C1||r.createdAt>Date.now())fail();for(const v of Object.values(f.sdk.operations))if(v.observed?.observedAt>Date.now())fail();}
    data.noticeLink=await getRecord('readLink',{kind:'notice',preconnectionId:id},false);
    if(data.noticeLink?(f.inventory.get(prefix+'notice')!==prepEncode('NoticeLink',data.noticeLink)):f.inventory.has(prefix+'notice'))fail();
    const issuerFacts=await issuerPrimary(f,data,enrollment,ack,receipt,getRecord);
    if(f.sdk.root){
     const b=f.sdk.operations.sdk_begin,a=f.sdk.operations.sdk_approve,c=f.sdk.operations.sdk_complete,i=f.issuer.reservation?.identity,g=f.sdk.grant;
     if(b.send&&b.send.bindingHash!==b.send.originalRequestHash||a.send&&(!i||a.send.bindingHash!==i.authorizationHash)||c.send&&(!issuerFacts.grant||!issuerFacts.grantLink||!issuerFacts.relation))fail();
     if(i&&(!b.observed||b.observed.resultHash!==digest('afw.finite-owner-sdk-begin-result.v1',{authorizationHash:i.authorizationHash,requestHash:b.send.originalRequestHash})))fail();
     if(g&&(!i||g.rootHash!==f.sdk.root.recordHash||g.identityHash!==i.identityHash||g.reservationHash!==f.issuer.reservation.recordHash||g.authorizationHash!==i.authorizationHash||g.grantId!==i.grantId||g.approvedRequestHash!==a.observed?.resultHash||Date.parse(g.createdAt)>Date.now()||Date.parse(g.expiresAt)>Math.min(i.C0,Date.parse(i.consentExpiresAt),data.preconnection.expiresAt)||g.scopes.some(s=>!i.requestedScopes.includes(s))))fail();
     if(f.sdk.reference&&(!i||f.sdk.reference.correlationHash!==finiteOwnerSdkCleanupCorrelation({root:f.sdk.root,expectedGrant:g,completeSend:c.send,identity:i})||f.sdk.reference.observedAt>Date.now()))fail();
     if(issuerFacts.grant&&g&&(canonical(JSON.parse(issuerFacts.grant.scopes_json))!==canonical(g.scopes)||issuerFacts.grant.created_at!==g.createdAt||issuerFacts.grant.expires_at!==g.expiresAt))fail();
    }
    const noticeFacts=await noticePrimary(f,data,issuerFacts);
    qualifyNoticeLink(f,data,issuerFacts,noticeFacts);
    return {receipt,data,enrollment,ack,issuerFacts,noticeFacts};
   };

   const qualified=await qualify(first,observed);
   // A second native observation detects intervening drift; no snapshots are
   // polled, and no observed record is synthesized from these factual reads.
   const again=await primary(),second=await facts(),secondQualified=await qualify(second,again);
   const snapshot=(f,physical,q)=>({
    sourceBase:source,preconnectionId:capsule.preconnectionId,capsuleHash:capsule.capsuleHash,
    anchors:f.a,physical,preparation:q.data,installed:{receipt:q.receipt,enrollment:q.enrollment,ack:q.ack},
    records:{inventory:[...f.inventory],effects:[...f.effects],enrollment:[...f.enrollment],issuer:f.issuer,sdk:f.sdk,notice:f.notice},
    issuerRows:q.issuerFacts,noticeRows:q.noticeFacts,originalFactsHash:digest('afw.finite-owner-cleanup-original-facts.v1',JSON.parse(f.anchor))
   });
   const before=snapshot(first,observed,qualified),after=snapshot(second,again,secondQualified);
   if(canonical(before)!==canonical(after))fail();
   life.guard();return frozen(after);
}
function noticeEventHash(row){
 return evidence('event',{grantId:row.grant_id,projectId:row.project_id,subject:row.user_id,clientId:row.client_id,resource:row.resource,revision:row.revision,action:row.action,purpose:row.purpose,requestId:row.request_id,sequence:row.sequence,issuedAt:row.issued_at,expiresAt:row.expires_at});
}
function qualifyNoticeLink(f,data,rows,notice){
 const link=data.noticeLink;if(!link)return;
 const n=f.notice,r=n.reservation,i=f.issuer.reservation?.identity,send=n.operations.consent.send,ack=n.operations.consent.ack;
 if(!i||!r||n.freeze||!data.preconnection||!data.approval||!rows.grant||!rows.authorization||!rows.grantLink||!rows.relation||!rows.connection||!f.sdk.root||!f.sdk.grant||!notice.schema||notice.tickets.length!==1||notice.events.length!==1||n.operations.ticket.ack?.outcome!=='applied'||!n.operations.ticket.send||!send||ack?.outcome!=='applied')fail();
 const row=notice.events[0],ceiling=Math.min(send.accessExpiresAt,r.accessExpiresAt,data.preconnection.owner.accessExpiresAt,data.preconnection.expiresAt,data.approval.expiresAt,rows.connection.expiresAt,Date.parse(i.consentExpiresAt),Date.parse(rows.grant.expires_at),r.ticket.permissionExpiresAt,i.C0);
 qualifyNoticeConsentEvent(row,i,r.ticket,send);
 if(link.preconnectionId!==i.preconnectionId||link.grantHash!==rows.grantLink.grantHash||link.grantHash!==sha(i.grantId)||link.sequence!==row.sequence||link.sequence!==ack.sequence||link.eventHash!==noticeEventHash(row)||link.acceptedAt<Math.max(ack.observedAt,row.issued_at,rows.grantLink.acceptedAt)||link.acceptedAt>=send.window.deadline||link.acceptedAt>=Math.min(ceiling,r.ticket.expiresAt)||link.acceptedAt>Date.now())fail();
}
function qualifyNoticeConsentEvent(row,i,t,send){
 fields(row,['sequence','grant_id','project_id','user_id','client_id','resource','revision','action','purpose','request_id','issued_at','expires_at']);
 if(!Number.isSafeInteger(row.sequence)||row.sequence<=0||!Number.isSafeInteger(row.issued_at)||row.issued_at<Math.max(send.window.startedAt,t.issuedAt,send.issuedAt)||row.issued_at>=Math.min(send.window.deadline,t.permissionExpiresAt)||row.issued_at>Date.now())fail();
 const expected={sequence:row.sequence,grant_id:i.grantId,project_id:i.projectId,user_id:i.subject,client_id:i.clientId,resource:i.resource,revision:i.projectRevision,action:'grant',purpose:'afw.dossier-monitoring.v1',request_id:t.requestId,issued_at:row.issued_at,expires_at:t.permissionExpiresAt};
 if(canonical(row)!==canonical(expected))fail();
}
function expectedNoticeTicket(i,t){return {handle_hash:t.handleHash,request_id:t.requestId,user_id:i.subject,grant_id:i.grantId,project_id:i.projectId,client_id:i.clientId,resource:i.resource,purpose:'afw.dossier-monitoring-owner.v1',action:'grant',revision:i.projectRevision,expected_sequence:t.expectedSequence,issued_at:t.issuedAt,expires_at:t.expiresAt,permission_expires_at:t.permissionExpiresAt};}

const reductions=new WeakMap(),receipts=new WeakMap();
const purpose=(kind,value)=>cleanupSeal(kind,{purpose:'afw.finite-owner-cleanup-'+kind.toLowerCase()+'.v1',...value});
const issued=(kind,value)=>issuerSeal(kind,{purpose:'afw.finite-preparation-issuer-'+kind.toLowerCase()+'.v1',...value});
function recorded(value){if(!['recorded','existing'].includes(value?.status))fail();return value;}
function cleanupIdentity(s){
 const a=s.anchors,c=a.capsule;
 return purpose('Identity',{planHash:a.plan.recordHash,capsuleHash:c.capsuleHash,enrollmentHash:s.installed.enrollment.recordHash,preconnectionId:c.preconnectionId,sourceRevision:c.sourceRevision,qaVersionId:c.qaVersionId,actorId:a.actorId,I0:c.I0,C0:c.C0,C1:c.C1});
}
function sameCycle(a,b){if(a.preconnectionId!==b.preconnectionId||a.capsuleHash!==b.capsuleHash||canonical(a.anchors.plan)!==canonical(b.anchors.plan)||canonical(a.installed)!==canonical(b.installed))fail();}
function expectedGrant(s){
 const g=s.issuerRows.grant,e=s.records.sdk.grant;
 if(g)return {scopes:JSON.parse(g.scopes_json),createdAt:g.created_at,expiresAt:g.expires_at};
 if(e)return {scopes:e.scopes,createdAt:e.createdAt,expiresAt:e.expiresAt};
 // No grant has been emitted. This value is only the bounded expected tuple
 // for the fixed post-fence absence SELECT; it cannot authorize creation.
 const i=s.records.issuer.reservation.identity;
 return {scopes:i.requestedScopes,createdAt:new Date(i.reservedAt).toISOString(),expiresAt:i.consentExpiresAt};
}
export async function reducePrivateQaFiniteOwnerCleanup(options,originalLease){
 const life=cleanupLifetime(options,originalLease),{ctx,env,child,guard}=life,s=await readPrivateQaFiniteOwnerCleanup(options,originalLease);
 if(!s)return null;
 const id=cleanupIdentity(s),key={preconnectionId:id.preconnectionId},journal=createFiniteOwnerCleanupJournal({ctx,env});
 recorded(await child(l=>journal.appendIdentity(id,l)));
 const ownJournal=await child(l=>journal.read(key,l)),issuer=s.records.issuer,i=issuer.reservation?.identity;
 let fenceFact={status:'never_issued'},grantFact={status:'never_issued'},noticeFact={status:'never_issued'};
 if(i){
  const ij=createFinitePreparationIssuerJournal({ctx,env}),store=createFinitePreparationIssuerStore({ctx,env});
  if(!issuer.freeze)recorded(await child(l=>ij.freeze({...key,record:issued('Freeze',{identityHash:i.identityHash,reservationHash:issuer.reservation.recordHash,frozenAt:Date.now()})},l)));
  await child(async(l,end)=>{
   const window=()=>({startedAt:Date.now(),deadline:Math.min(end,i.C1)}),ops=issuer.operations;
   let close=ops.close_fence.send,barrier;
   if(close){
    barrier=await store.reconcileFence({identity:i,fenceRequestId:close.requestId,window:window()},l);
    if(!ops.close_fence.ack){
     recorded(await journal.appendReconciled({...key,record:purpose('Reconciled',{identityHash:id.recordHash,sendHash:close.recordHash,delivery:s.anchors.state.deliveries,factsHash:digest('afw.finite-owner-cleanup-reconciliation.v1',{barrier}),observedAt:Date.now()})},l));
     fail(); // Factual reconciliation is never the lost SQL acknowledgement.
    }
    if(ops.close_fence.ack.outcome!=='applied'||ops.close_fence.ack.rowHash!==barrier.rowHash)fail();
   }else{
    close=issued('Send',{identityHash:i.identityHash,reservationHash:issuer.reservation.recordHash,operation:'close_fence',requestId:randomUUID(),requestHash:digest('afw.finite-owner-cleanup-fence-request.v1',{identityHash:i.identityHash}),issuedAt:Date.now(),deadline:Math.min(end,i.C1)});
    recorded(await ij.appendSend({...key,record:close},l));current(l);
    const actual=retain(store.closeFence({identity:i,fenceRequestId:close.requestId,window:window()},l));barrier=await actual;current(l);
    recorded(await ij.appendAck({...key,operation:'close_fence',record:issued('Ack',{sendHash:close.recordHash,rowHash:barrier.rowHash,outcome:'applied',observedAt:Date.now()})},l));
   }
   fenceFact=barrier;
   const g=expectedGrant(s),observation=await store.observeGrant({identity:i,barrier,expectedGrant:g,window:window()},l);
   if(ops.revoke_grant.send&&!ops.revoke_grant.ack)fail();
   if(ops.revoke_grant.ack){
    if(ops.revoke_grant.ack.outcome!=='applied'||!observation.row||!observation.row.revoked_at||ops.revoke_grant.ack.rowHash!==digest('afw.finite-preparation-issuer-row.v1',observation.row))fail();
    grantFact={status:'historical_normal',row:observation.row};
   }else if(observation.status==='absent')grantFact={status:'absent_after_terminal_fence',barrierHash:barrier.rowHash};
   else if(observation.row.revoked_at!=='')grantFact={status:'already_revoked',row:observation.row};
   else{
    const send=issued('Send',{identityHash:i.identityHash,reservationHash:issuer.reservation.recordHash,operation:'revoke_grant',requestId:randomUUID(),requestHash:digest('afw.finite-owner-cleanup-grant-request.v1',{identityHash:i.identityHash,barrierHash:barrier.rowHash,expectedGrant:g}),issuedAt:Date.now(),deadline:Math.min(end,i.C1)});
    recorded(await ij.appendSend({...key,record:send},l));current(l);
    const actual=retain(store.revokeGrant({identity:i,barrier,observation,window:window()},l));grantFact=await actual;current(l);
    if(!['revoked','already_revoked'].includes(grantFact.status)||!grantFact.row?.revoked_at)fail();
    recorded(await ij.appendAck({...key,operation:'revoke_grant',record:issued('Ack',{sendHash:send.recordHash,rowHash:digest('afw.finite-preparation-issuer-row.v1',grantFact.row),outcome:'applied',observedAt:Date.now()})},l));
   }
   const consent=s.noticeRows.events[0],op=ownJournal.operations.monitoring_revoke;
   if(op.send&&!op.observed)fail();
   if(consent){
    if(!observation.row)fail();
    if(op.observed){
     const withdrawn=s.noticeRows.withdrawals?.[0];
     if(!withdrawn||op.observed.resultHash!==digest('afw.finite-owner-cleanup-monitoring-result.v1',{status:op.observed.outcome,row:withdrawn}))fail();
     noticeFact={status:'historical_normal',row:withdrawn};
    }else{
     const requestId=randomUUID(),send=purpose('Send',{identityHash:id.recordHash,operation:'monitoring_revoke',requestId,requestHash:digest('afw.finite-owner-cleanup-monitoring-request.v1',{identityHash:i.identityHash,barrierHash:barrier.rowHash,expectedGrant:g,expectedConsent:consent,requestId}),issuedAt:Date.now(),deadline:Math.min(end,i.C1)});
     recorded(await journal.appendSend({...key,record:send},l));current(l);
     const actual=retain(store.insertMonitoringRevocation({identity:i,barrier,expectedGrant:g,expectedConsent:consent,requestId,window:window()},l));noticeFact=await actual;current(l);
     if(!['applied','already_withdrawn'].includes(noticeFact.status))fail();
     recorded(await journal.appendObserved({...key,operation:'monitoring_revoke',record:purpose('Observed',{sendHash:send.recordHash,resultHash:digest('afw.finite-owner-cleanup-monitoring-result.v1',noticeFact),outcome:noticeFact.status,observedAt:Date.now()})},l));
    }
   }else{if(op.send)fail();noticeFact={status:'no_original_consent',barrierHash:barrier.rowHash};}
  });
 }
 guard();
 const opaque=Object.freeze({});
 reductions.set(opaque,{options,ctx,env,originalLease,s,id,fenceFact,grantFact,noticeFact,guard,state:'beforeRestore'});
 return opaque;
}
function reductionKv(alias,methods,subject,id,guard){
 const grant='grant:'+subject+':'+id,prefix='token:'+subject+':'+id+':',queue=[];
 let active=0,lists=0,deletes=0,gets=0,nextCursor,failed=null,peak=0;
 const stop=error=>{failed??=error;for(const q of queue.splice(0))q.reject(failed);};
 const check=()=>{if(failed)throw failed;guard();};
 const pump=()=>{
  while(active<2&&queue.length){
   try{check();}catch(error){stop(error);return;}
   const q=queue.shift();active++;peak=Math.max(peak,active);
   const actual=retain(Promise.resolve().then(()=>{check();return retain(Reflect.apply(methods[q.method],alias,q.args));}));
   actual.then(value=>{
    try{check();
     if(q.method==='list'){
      if(!value||!Array.isArray(value.keys)||value.keys.length>100||typeof value.list_complete!=='boolean'||value.keys.some(k=>typeof k?.name!=='string'||!k.name.startsWith(prefix))||!value.list_complete&&(typeof value.cursor!=='string'||!value.cursor||value.cursor.length>2048))fail();
      nextCursor=value.list_complete?undefined:value.cursor;
     }
     q.resolve(value);
    }catch(error){stop(error);q.reject(error);}
   },error=>{stop(error);q.reject(error);}).finally(()=>{active--;pump();}).catch(()=>{});
  }
 };
 const enqueue=(method,args)=>{
  try{
   check();
   if(method==='list'){
    const v=own(args[0]);fields(v,['prefix',...Object.hasOwn(v,'limit')?['limit']:[],...Object.hasOwn(v,'cursor')?['cursor']:[]]);
    if(v.prefix!==prefix||Object.hasOwn(v,'limit')&&v.limit!==100||v.cursor!==nextCursor||lists>=2)fail();lists++;args=[{...v,limit:100}];
   }else if(method==='delete'){
    if(typeof args[0]!=='string'||!(args[0]===grant||args[0].startsWith(prefix))||deletes>=200)fail();deletes++;
   }else{
    if(args[0]!==grant||canonical(own(args[1]))!==canonical({type:'json'})||gets>=1)fail();gets++;
   }
   return retain(new Promise((resolve,reject)=>{queue.push({method,args,resolve,reject});pump();}));
  }catch(error){stop(error);return Promise.reject(error);}
 };
 return {facet:Object.freeze({list:v=>enqueue('list',[v]),get:(k,v)=>enqueue('get',[k,v]),delete:k=>enqueue('delete',[k])}),facts:()=>({lists,deletes,gets,peak,active,queued:queue.length,failed:failed!==null})};
}
function closedFacts(s){
 const i=s.records.issuer.reservation?.identity;
 if(i){
  const row=s.issuerRows.fence;
  if(!row?.fenced_at||!row.fence_request_id||s.issuerRows.grant&&!s.issuerRows.grant.revoked_at)fail();
  for(const op of ['close_fence','revoke_grant']){const v=s.records.issuer.operations[op];if(v.send&&!v.ack)fail();}
  if(s.noticeRows.events.length&&s.noticeRows.withdrawals?.length!==1)fail();
 }
 if(!s.physical.isRestored||!s.anchors.records['restore-send']||!s.anchors.records['restore-ack'])fail();
}
export async function finishPrivateQaFiniteOwnerCleanup(options,reduction,originalLease){
 const r=reductions.get(reduction);
 if(!r||r.state!=='beforeRestore'||r.ctx!==options.ctx||r.env!==options.env||r.originalLease!==originalLease)fail();
 r.state='finishing';r.guard();
 const life=cleanupLifetime(options,originalLease),{ctx,env,child}=life,s=await readPrivateQaFiniteOwnerCleanup(options,originalLease);
 if(!s)fail();sameCycle(r.s,s);closedFacts(s);
 const journal=createFiniteOwnerCleanupJournal({ctx,env}),key={preconnectionId:r.id.preconnectionId},j=await child(l=>journal.read(key,l));
 if(canonical(j.identity)!==canonical(r.id))fail();
 const sdk=s.records.sdk,i=s.records.issuer.reservation?.identity,op=j.operations.sdk_revoke;
 if(op.send&&!op.observed)fail();
 let sdkFact={status:'never_issued'};
 if(sdk.operations.sdk_complete.send){
  if(!i||!sdk.root||!sdk.grant)fail();
  let selector=sdk.reference?.sdkGrantId;
  if(!selector){
   // Missing Reference is not absence of a grant. Search only bounded original
   // metadata correlation; an expired/missing result cannot become an ACK.
   selector=await child(async l=>{
    const check=()=>{life.guard();current(l);},facet=readonlyGrantKv(life.alias,life.methods,i.subject,check);
    const api=new OAuthAuthorizationServer({issuer:s.sourceBase.origin,resources:[i.resource],scopesSupported:['afw:project:read','afw:evidence:read'],accessTokenTTL:300,clientIdMetadataDocumentEnabled:false}).getOAuthApi(Object.freeze({OAUTH_KV:facet}));
    const correlationHash=finiteOwnerSdkCleanupCorrelation({root:sdk.root,expectedGrant:sdk.grant,completeSend:sdk.operations.sdk_complete.send,identity:i});
    let cursor,found;
    do{
     const result=await retain(api.listUserGrants(i.subject,{limit:100,...cursor===undefined?{}:{cursor}}));check();
     if(!result||!Array.isArray(result.items)||result.items.length>100)fail();
     for(const v of result.items)if(canonical(v.metadata)===canonical({afwFiniteCleanup:{purpose:'afw.finite-sdk-cleanup-correlation.v1',correlationHash}})){
      if(found||typeof v.id!=='string'||!/^[A-Za-z0-9_-]{16}$/.test(v.id)||v.userId!==i.subject||v.clientId!==i.clientId||v.resource!==i.resource||canonical(v.scope)!==canonical(sdk.grant.scopes)||!Number.isSafeInteger(v.createdAt)||v.createdAt<Math.floor(sdk.operations.sdk_complete.send.issuedAt/1000)||v.createdAt*1000>=sdk.operations.sdk_complete.send.deadline)fail();found=v.id;
     }cursor=result.cursor;
    }while(cursor!==undefined);
    if(!found)fail();return found;
   });
  }
  if(op.observed){if(op.observed.outcome!=='returned')fail();sdkFact={status:'historical_normal',sendHash:op.send.recordHash,observedHash:op.observed.recordHash};}
  else await child(async(l,end)=>{
   const check=()=>{life.guard();current(l);},bounded=reductionKv(life.alias,life.methods,i.subject,selector,check);
   const send=purpose('Send',{identityHash:r.id.recordHash,operation:'sdk_revoke',requestId:randomUUID(),requestHash:digest('afw.finite-owner-cleanup-sdk-request.v1',{identityHash:i.identityHash,selector,subject:i.subject,correlationHash:finiteOwnerSdkCleanupCorrelation({root:sdk.root,expectedGrant:sdk.grant,completeSend:sdk.operations.sdk_complete.send,identity:i})}),issuedAt:Date.now(),deadline:Math.min(end,i.C1)});
   recorded(await journal.appendSend({...key,record:send},l));check();
   const api=new OAuthAuthorizationServer({issuer:s.sourceBase.origin,resources:[i.resource],scopesSupported:['afw:project:read','afw:evidence:read'],accessTokenTTL:300,clientIdMetadataDocumentEnabled:false}).getOAuthApi(Object.freeze({OAUTH_KV:bounded.facet}));
   const actual=retain(api.revokeGrant(selector,i.subject));await actual;check();
   const metrics=bounded.facts();if(metrics.active||metrics.queued||metrics.failed)fail();
   sdkFact={status:'returned',selectorHash:sha(selector),metrics};
   const observed=purpose('Observed',{sendHash:send.recordHash,resultHash:digest('afw.finite-owner-cleanup-sdk-result.v1',sdkFact),outcome:'returned',observedAt:Date.now()});
   recorded(await journal.appendObserved({...key,operation:'sdk_revoke',record:observed},l));
  });
 }else if(op.send)fail();
 const final=await readPrivateQaFiniteOwnerCleanup(options,originalLease);sameCycle(s,final);closedFacts(final);
 const finalJournal=await child(l=>journal.read(key,l));
 for(const op of Object.values(finalJournal.operations))if(op.send&&!op.observed)fail();
 const rs=final.anchors.records['restore-send'],ra=final.anchors.records['restore-ack'];
 const record=finalJournal.receipt??purpose('Receipt',{identityHash:r.id.recordHash,planHash:r.id.planHash,fenceHash:digest('afw.finite-owner-cleanup-fence-facts.v1',r.fenceFact),grantFactHash:digest('afw.finite-owner-cleanup-grant-facts.v1',r.grantFact),noticeFactHash:digest('afw.finite-owner-cleanup-notice-facts.v1',r.noticeFact),sdkSendHash:finalJournal.operations.sdk_revoke.send?.recordHash??null,sdkObservedHash:finalJournal.operations.sdk_revoke.observed?.recordHash??null,restoreSendHash:rs.recordHash,restoreAckHash:ra.recordHash,baselineVersionId:final.anchors.plan.baselineVersionId,baselineDeploymentId:ra.deploymentId,finalFactsHash:digest('afw.finite-owner-cleanup-final-facts.v1',{final,sdkFact,observedAt:Date.now()}),observedAt:Date.now(),businessAccessClosed:true,sdkReductionReturned:!!sdk.operations.sdk_complete.send,globalNativeDrainVerified:false,sdkNamespaceEmptyVerified:false});
 if(record.identityHash!==r.id.recordHash||record.planHash!==r.id.planHash||record.restoreSendHash!==rs.recordHash||record.restoreAckHash!==ra.recordHash||record.baselineVersionId!==final.anchors.plan.baselineVersionId||record.baselineDeploymentId!==ra.deploymentId||record.sdkSendHash!==(finalJournal.operations.sdk_revoke.send?.recordHash??null)||record.sdkObservedHash!==(finalJournal.operations.sdk_revoke.observed?.recordHash??null)||record.sdkReductionReturned!==!!sdk.operations.sdk_complete.send)fail();
 if(!finalJournal.receipt)recorded(await child(l=>journal.finish({...key,record},l)));
 const readback=await child(l=>journal.read(key,l));if(canonical(readback.receipt)!==canonical(record))fail();
 life.guard();r.state='finished';const opaque=Object.freeze({});
 receipts.set(opaque,{ctx,env,originalLease,guard:r.guard,record,consumed:false});return opaque;
}
export function consumePrivateQaFiniteOwnerCleanup(receipt,{ctx,env},originalLease){
 const r=receipts.get(receipt);if(!r||r.consumed||r.ctx!==ctx||r.env!==env||r.originalLease!==originalLease)fail();r.guard();r.consumed=true;
 return frozen({status:'CURRENT_CYCLE_BUSINESS_CLOSED',record:r.record,operationalReadiness:false});
}
