import {readPrivateQaFiniteOwnerSdkGrant} from './mcp-qa-finite-owner-cleanup.mjs';
import {finiteOwnerSdkCleanupCorrelation} from './mcp-qa-finite-owner-issuer-provenance-records.mjs';
import {continuePrivateQaFiniteOwnerChoice,consumeFiniteOwnerStageAdmission} from './mcp-qa-finite-owner-preparation.mjs';
import {adoptFiniteOwnerRequestStageWork} from './mcp-qa-finite-stage-work.mjs';
import {createFiniteFixedPolicyEngine} from './mcp-qa-finite-fixed-policy-engine.mjs';
import {prepareFinitePreparationEnrollmentWrite} from './mcp-qa-finite-preparation-enrollment-writer.mjs';
import {encodeFinitePreparationCleanupRecord as enrollmentEncode} from './mcp-qa-finite-preparation-cleanup-records.mjs';
import {finiteNativeMetadata as connectionMetadata,qualifyFiniteOwnerChoiceRequest,finiteNativeOriginalUrl as connectionUrl,finiteNativeBytes as connectionBytes} from './mcp-qa-finite-owner-native-wire.mjs';
import {readFiniteOwnerNoticeConsentBody} from './mcp-qa-finite-owner-notice-consent-body.mjs';
import {readFiniteOwnerNoticeGetMetadata,qualifyFiniteOwnerNoticeGetRequest,readFiniteOwnerNoticeConsentMetadata,qualifyFiniteOwnerNoticeConsentRequest} from './mcp-qa-finite-owner-notice-get-wire.mjs';
import {sealFinitePreparationNoticeRecord as noticeSeal} from './mcp-qa-finite-preparation-notice-records.mjs';

import {createFinitePreparationNoticeJournal as noticeJournal} from './mcp-qa-finite-preparation-notice-journal.mjs';
import {FINITE_PREPARATION_MONITORING_SCHEMA} from './mcp-qa-finite-preparation-issuer-store.mjs';
import {randomBytes} from 'node:crypto';
import {captureFinitePreparationIssuerContext} from './mcp-qa-finite-preparation-issuer-journal.mjs';
import {createFinitePreparationIssuerStore} from './mcp-qa-finite-preparation-issuer-store.mjs';
import {sealFinitePreparationIssuerRecord as issuerSeal,issuerScopes} from './mcp-qa-finite-preparation-issuer-records.mjs';
import {encodeFiniteOwnerIssuerProvenanceRecord as sdkEncode,FINITE_OWNER_SDK_OPERATIONS as sdkOperations} from './mcp-qa-finite-owner-issuer-provenance-records.mjs';
import {encodeFinitePreparationRecord as prepEncode} from './mcp-qa-finite-preparation-records.mjs';
import {qualifyFiniteOwnerApprovedTicket,finiteOwnerAuthorizationLink,finiteOwnerGrantLink,finiteOwnerPreconnectionConnection,finiteOwnerConnectionRef,qualifyFiniteOwnerConnectionPair} from './mcp-qa-finite-owner-approved-ticket-facts.mjs';
import {qualifyFiniteOwnerSdkBindingFacts} from './mcp-qa-finite-owner-sdk-binding-facts.mjs';
import {createFiniteOwnerIssuerProvenanceJournal as sdkJournal} from './mcp-qa-finite-owner-issuer-provenance-journal.mjs';
import {sealFiniteOwnerIssuerProvenanceRecord as sdkSeal} from './mcp-qa-finite-owner-issuer-provenance-records.mjs';
import {OAuthAuthorizationServer} from '@cloudflare/workers-oauth-provider';
import {observeFiniteOwnerRequestWork} from './mcp-qa-finite-stage-work.mjs';
import {verifyCloudflareAccessJwtWithExpiry} from './cloudflare-access-identity.mjs';
import {readFiniteOwnerOAuthMetadata,qualifyFiniteOwnerOAuthRequest,finiteNativeOperation,finiteNativeBytes,finiteNativePending as pending} from './mcp-qa-finite-owner-oauth-wire.mjs';
import {FINITE_PREPARATION_ISSUER_SCHEMA} from './mcp-qa-finite-preparation-issuer-store.mjs';
import {readPrivateQaFiniteInitialAnchors} from './mcp-qa-finite-initial-anchors.mjs';
import {decodeFiniteInitialUploadRecord as uploadRecord} from './mcp-qa-finite-initial-upload-records.mjs';
import {initialOwn as own} from './mcp-qa-finite-initial-material-records.mjs';
import {createFiniteOwnerPreparationStore} from './mcp-qa-finite-preparation-store.mjs';
import {createFinitePolicyEffectJournal} from './mcp-qa-finite-policy-journal.mjs';
import {createFinitePreparationIssuerJournal} from './mcp-qa-finite-preparation-issuer-journal.mjs';
import {decodeFinitePreparationCleanupRecord as enrollmentRecord} from './mcp-qa-finite-preparation-cleanup-records.mjs';
import {hashFinitePreparationRecord as prepHash,hashFinitePolicyEffectIdentity as effectIdentity,hashFiniteOwnerEvidence as evidence,hashFiniteOwnerPreparationProject as projectHash} from './mcp-qa-finite-preparation-records.mjs';
import {qualifyFiniteOwnerInstalledStage} from './mcp-qa-finite-owner-stage-facts.mjs';
import {qualifyFinitePreparationEnrollmentFacts} from './mcp-qa-finite-preparation-enrollment-facts.mjs';
import {qualifyFiniteConnectionProfile} from './mcp-qa-finite-connection-profile.mjs';
import {createHash} from 'node:crypto';
import {readFiniteOwnerRequestDeadline,readFiniteOwnerRequestContext} from './mcp-qa-finite-owner-preparation.mjs';
import {observeFiniteFactualReadWork,retainFiniteOwnerStagePromise as retain} from './mcp-qa-finite-stage-work.mjs';
import {createFiniteInitialLease} from './mcp-qa-finite-initial-lease.mjs';
import {finiteInitialCapsuleBindingsHash} from './mcp-qa-finite-initial-capsule-records.mjs';
import {initialFields as fields,initialCanonical as canonical,initialHash as digest,initialHex as hex} from './mcp-qa-finite-initial-material-records.mjs';
import {readFiniteQaBootstrapSourceExpectations} from './mcp-qa-finite-bootstrap-source.mjs';
import {readPrivateQaFiniteCandidate} from './mcp-qa-finite-candidate-residency.mjs';
import {finitePublicProfileTemplate,projectFinitePublicConfiguration} from './mcp-qa-finite-profile.mjs';
import {finiteQaPointer} from './mcp-qa-finite-publication.mjs';
import {finiteCfEnvelope} from './mcp-qa-finite-custody.mjs';
import {qualifyFiniteInitialUploadedVersion} from './mcp-qa-finite-initial-upload-wire.mjs';
import {restorationConfigurationHash} from './mcp-restoration-configuration.mjs';
import {finiteActivationConfigurationHash} from './mcp-activation-observer.mjs';
import {createDelegatedProjectRepository} from './delegated-project-repository.mjs';
import {createDelegatedOAuthStore} from './delegated-oauth-store.mjs';
import {validateFiniteOwnerSource} from './mcp-qa-finite-preparation-records.mjs';

const CF='https://api.cloudflare.com/client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec';
const SLOT='afw-own-successor-closure-v1',QA='agent-friendly-web-independent-closure-qa',CANARY='agent-friendly-web-delegated-canary';
const iso=x=>typeof x==='string'&&Number.isSafeInteger(Date.parse(x))&&new Date(Date.parse(x)).toISOString()===x;
const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
const fail=()=>{throw Error('Finite owner phase context unavailable');};
const current=l=>{l.assertCurrent();if(l.signal.aborted)fail();};

/** UNMOUNTED factual entry. A genuine original incoming request lease is
 * or internally registered descendant is required, never browser data.
 * Retention confers no owner admission and preserves the original request.
 */
async function observeOwnerPhasePair(options){
 let clock,onAbort,parentSignal;
 try{
  if(arguments.length!==1)fail();
  fields(options,['ctx','env','parent',...Object.hasOwn(options,'preconnectionId')?['preconnectionId']:[]]);
  const {ctx,env,parent}=options,requested=options.preconnectionId??null;
  fields(parent,['signal','assertCurrent']);
  const {root,deadline}=readFiniteOwnerRequestContext(parent);
  if(requested!==null&&!hex(requested))fail();
  const signal=parent.signal,assertCurrent=parent.assertCurrent;
  const storage=ctx?.storage,get=storage?.get,list=storage?.list,getAlarm=storage?.getAlarm,transaction=storage?.transaction,sync=storage?.sync;
  const actor=ctx?.id,toString=actor?.toString,self=env?.AFW_INDEPENDENT_CLOSURE,idFromName=self?.idFromName,namespaceGet=self?.get;
  const db=env?.RELEASE_DB,prepare=db?.prepare,withSession=db?.withSession,node=env?.AFW_RELEASE_EVENTS_NODE,nodeName=node?.idFromName,nodeString=node?.idFromString,nodeGet=node?.get;
  const metadata=env?.AFW_QA_VERSION,qaVersionId=metadata?.id,reader=env?.AFW_MCP_CLOSURE_READ_TOKEN,publisher=env?.AFW_MCP_CLOSURE_PUBLISH_TOKEN,fetcher=globalThis.fetch;
  if(!(signal instanceof AbortSignal)||[assertCurrent,get,list,getAlarm,transaction,sync,toString,idFromName,namespaceGet,prepare,withSession,nodeName,nodeString,nodeGet,fetcher].some(v=>typeof v!=='function')||db===env.DB||[reader,publisher].some(v=>typeof v!=='string'||!/^[-A-Za-z0-9_]{16,4096}$/.test(v)))fail();
  const alias=env?.AFW_FINITE_OWNER_OAUTH_KV,aliasGet=alias?.get,aliasPut=alias?.put,aliasDelete=alias?.delete,aliasList=alias?.list;
  if([aliasGet,aliasPut,aliasDelete,aliasList].some(v=>typeof v!=='function'))fail();
  const actorId=Reflect.apply(toString,actor,[]),expected=readFiniteQaBootstrapSourceExpectations(),resident=readPrivateQaFiniteCandidate();
  const qaNamespaceId=finitePublicProfileTemplate('qaLive').bindings.find(b=>b.name==='AFW_INDEPENDENT_CLOSURE').namespace_id;
  if(!hex(actorId)||Reflect.apply(idFromName,self,[SLOT]).toString()!==actorId||resident.sourceRevision!==expected.sourceRevision||resident.sourceTree!==expected.sourceTree)fail();
  const holders=()=>{
   current(parent);
   if(options.ctx!==ctx||options.env!==env||options.parent!==parent||(options.preconnectionId??null)!==requested||parent.signal!==signal||parent.assertCurrent!==assertCurrent||readFiniteOwnerRequestDeadline(parent)!==deadline||readFiniteOwnerRequestContext(parent).root!==root||
    ctx.storage!==storage||storage.get!==get||storage.list!==list||storage.getAlarm!==getAlarm||storage.transaction!==transaction||storage.sync!==sync||ctx.id!==actor||actor.toString!==toString||Reflect.apply(toString,actor,[])!==actorId||
    env.AFW_FINITE_OWNER_OAUTH_KV!==alias||alias.get!==aliasGet||alias.put!==aliasPut||alias.delete!==aliasDelete||alias.list!==aliasList||env.AFW_INDEPENDENT_CLOSURE!==self||self.idFromName!==idFromName||self.get!==namespaceGet||Reflect.apply(idFromName,self,[SLOT]).toString()!==actorId||env.RELEASE_DB!==db||db.prepare!==prepare||db.withSession!==withSession||
    env.AFW_RELEASE_EVENTS_NODE!==node||node.idFromName!==nodeName||node.idFromString!==nodeString||node.get!==nodeGet||env.AFW_QA_VERSION!==metadata||metadata.id!==qaVersionId||
    env.AFW_MCP_CLOSURE_READ_TOKEN!==reader||env.AFW_MCP_CLOSURE_PUBLISH_TOKEN!==publisher||globalThis.fetch!==fetcher)fail();
  };
  // Narrow the original request deadline; do not reuse B1/A's expired technical
  // authority or manufacture a new incoming request window from this call.
  clock=createFiniteInitialLease(deadline,deadline,holders,fail);
  parentSignal=signal;onAbort=()=>clock.close();signal.addEventListener('abort',onAbort,{once:true});current(clock.lease);
  const run=()=>observeFiniteFactualReadWork({ctx,env,originalLease:clock.lease,requestLease:parent},async()=>{
   const child=work=>clock.child(l=>retain(Promise.resolve().then(()=>{current(l);return work(l);})));
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
    if(capsule.sourceRevision!==expected.sourceRevision||capsule.sourceTree!==expected.sourceTree||capsule.qaVersionId!==qaVersionId||capsule.moduleHash!==resident.module.sha256||requested!==null&&requested!==capsule.preconnectionId)fail();
    clock.narrow(Math.min(capsule.C0,plan.readerExpiresAt,plan.publisherExpiresAt));
    if(Date.now()<capsule.I0||Date.now()>=capsule.C0||capsule.recordedAt>Date.now()||a.alarm!==capsule.C0||canonical(a.state)!==canonical(a.zero)||Object.keys(a.records).length!==6)fail();
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
   const owned=()=>child(async l=>{
    const session=Reflect.apply(withSession,db,['first-primary']),sessionPrepare=session?.prepare;
    if(typeof sessionPrepare!=='function')fail();
    const value=await retain(createDelegatedProjectRepository({db:session,grantStore:createDelegatedOAuthStore(session)}).getOwnedProject(p.project.projectId,p.subject));current(l);
    if(session.prepare!==sessionPrepare||!value||value.id!==p.project.projectId||value.userId!==p.subject||value.revision!==p.project.revision)fail();
    return {projectId:value.id,revision:value.revision,synthetic:true};
   });
   const verifyCredential=async(token,id,expiresAt)=>{
    const v=finiteCfEnvelope((await request('/tokens/verify',8192,token)).value);fields(v,['id','status','expires_on',...Object.hasOwn(v,'not_before')?['not_before']:[]]);
    if(v.id!==id||v.status!=='active'||Date.parse(v.expires_on)!==expiresAt||Date.parse(v.expires_on)<=Date.now()||v.not_before!=null&&(!Number.isSafeInteger(Date.parse(v.not_before))||Date.parse(v.not_before)>Date.now()))fail();
   };
   const credentials=async()=>{
    const readerWork=retain(Promise.resolve().then(()=>verifyCredential(reader,plan.readerId,plan.readerExpiresAt)));
    const publisherWork=retain(Promise.resolve().then(()=>verifyCredential(publisher,plan.publisherId,plan.publisherExpiresAt)));
    const joined=await retain(Promise.allSettled([readerWork,publisherWork]));
    current(clock.lease);if(joined.some(result=>result.status!=='fulfilled'))fail();
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
    const pointer=finiteQaPointer(await request('/workers/scripts/'+CANARY+'/deployments?per_page=1'));

    const metadata=finiteCfEnvelope((await request('/workers/workers/'+CANARY+'/versions/'+capsule.activatedVersionId+'?include=modules',4500000)).value);
    const configuration=qualifyFiniteInitialUploadedVersion(metadata,capsule.activatedVersionId,plan.configuration,resident.bytes);
    if(restorationConfigurationHash(configuration)!==capsule.configurationHash||finiteInitialCapsuleBindingsHash(configuration.bindings)!==capsule.bindingsHash)fail();
    const binding=name=>configuration.bindings.find(b=>b.name===name),text=name=>binding(name)?.text;
    if(text('AFW_OAUTH_PILOT_CLIENT_ID')!==p.clientId||text('AFW_OAUTH_PILOT_PROJECT_ID')!==p.project.projectId||text('AFW_OAUTH_RESOURCE')!==p.resource||text('ACCESS_TEAM_DOMAIN')!==p.access.teamDomain||text('ACCESS_AUD')!==p.access.audience||text('AFW_OAUTH_PILOT_EXPIRES_AT')!==new Date(capsule.C0).toISOString()||canonical(binding('DELEGATED_RATE_LIMITER'))!==canonical(p.limiter))fail();
    const project=await owned();
    let currentConfiguration=configuration;
    if(pointer.versionId!==capsule.activatedVersionId||pointer.deploymentId!==capsule.activatedDeploymentId){
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
    return {project,pointer,currentConfiguration,configuration,initialBaseline:{versionId:capsule.activatedVersionId,deploymentId:capsule.activatedDeploymentId,moduleHash:sha(resident.bytes),configurationHash:finiteActivationConfigurationHash(plan.configuration),bindingsHash:finiteInitialCapsuleBindingsHash(configuration.bindings)}};
   };
   const primary=async()=>{
    await credentials();
    const qaWork=retain(Promise.resolve().then(readQaPrimary)),mWork=retain(Promise.resolve().then(readMPrimary));
    const joined=await retain(Promise.allSettled([qaWork,mWork]));
    current(clock.lease);if(joined.some(result=>result.status!=='fulfilled'))fail();
    const {qaMetadata}=joined[0].value,{project,pointer,currentConfiguration,configuration,initialBaseline}=joined[1].value;
    const qaSdkBindingFacts=qualifyFiniteOwnerSdkBindingFacts({qaMetadata,mMetadata:currentConfiguration});
    qualifyFiniteOwnerSdkBindingFacts({qaMetadata,mMetadata:configuration});
    return {project,pointer,currentConfiguration,qaSdkBindingFacts,initialBaseline};
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
    if(!receipt||!enrollment||!ack||issuer.freeze||i.preconnectionId!==id||i.enrollmentHash!==enrollment.recordHash||i.capsuleHash!==capsule.capsuleHash||i.sourceRevision!==capsule.sourceRevision||i.qaVersionId!==qaVersionId||i.actorId!==actorId||i.subject!==p.subject||i.accessRealmHash!==data.preconnection.owner.accessRealmHash||i.projectId!==p.project.projectId||i.projectRevision!==p.project.revision||i.clientId!==p.clientId||i.resource!==p.resource||i.I0!==capsule.I0||i.C0!==capsule.C0||i.C1!==capsule.C1||i.reservedAt<ack.acknowledgedAt||i.reservedAt>Date.now()||issuer.reservation.issuedAt>Date.now()||Date.parse(i.consentExpiresAt)>data.preconnection.expiresAt)fail();
    clock.narrow(Date.parse(i.consentExpiresAt));
    for(const [op,v]of Object.entries(issuer.operations)){
     if(v.ack&&!v.send||['close_fence','revoke_grant'].includes(op)&&(v.send||v.ack)||v.ack?.observedAt>Date.now())fail();
    }
    const ops=issuer.operations,expectedFence={preconnection_id:id,authorization_hash:i.authorizationHash,grant_id:i.grantId,enrollment_hash:i.enrollmentHash,identity_hash:i.identityHash,reserved_at:i.reservedAt,forward_until:i.C0,cleanup_until:i.C1,fence_request_id:null,fenced_at:null};
    if(fence&&canonical(fence)!==canonical(expectedFence))fail();
    const consent=await select('SELECT handle_hash,user_id,kind,project_id,client_id,resource,scopes_json,expires_at,consumed_at FROM delegated_consent_sessions WHERE handle_hash=?',[i.authorizationHash]);
    const grant=await select('SELECT id,user_id,client_id,project_id,resource,scopes_json,created_at,expires_at,revoked_at,exchanged_at FROM delegated_access_grants WHERE id=?',[i.grantId]);
    const authorization=await getRecord('readAuthorizationLink',{authorizationHash:i.authorizationHash},false);
    const rowAck=(op,row)=>{const v=ops[op];if(!v.send){if(row)fail();return;}if(!v.ack)return;if(v.ack.outcome==='no_mutation'){if(v.ack.rowHash!==null||row)fail();return;}if(!row||v.ack.rowHash!==digest('afw.finite-preparation-issuer-row.v1',row))fail();};
    rowAck('open_fence',fence);
    if(!fence&&(consent||grant||authorization||grantLink||relation||ops.authorization.send||ops.consume.send||ops.grant.send))fail();
    if(consent){
     const expected={handle_hash:i.authorizationHash,user_id:i.subject,kind:'authorize',project_id:i.projectId,client_id:i.clientId,resource:i.resource,scopes_json:JSON.stringify(i.requestedScopes),expires_at:i.consentExpiresAt,consumed_at:consent.consumed_at};
     if(canonical(consent)!==canonical(expected)||consent.consumed_at!==''&&(!iso(consent.consumed_at)||Date.parse(consent.consumed_at)<i.reservedAt||Date.parse(consent.consumed_at)>Date.now()||Date.parse(consent.consumed_at)>=Date.parse(consent.expires_at)))fail();
    }
    rowAck('authorization',consent?{...consent,consumed_at:''}:null);
    rowAck('consume',consent?.consumed_at?consent:null);
    if(authorization){
     if(!consent||authorization.preconnectionId!==id||authorization.authorizationHash!==i.authorizationHash||authorization.subjectHash!==data.ticket.subjectHash||authorization.sourceRevision!==source.sourceRevision||authorization.projectRef!==data.ticket.projectRef||authorization.clientId!==i.clientId||authorization.resource!==i.resource||authorization.issuedAt<i.reservedAt||authorization.issuedAt>Date.now()||authorization.expiresAt>Math.min(data.preconnection.expiresAt,Date.parse(consent.expires_at))||Date.now()>=authorization.expiresAt)fail();
    }
    if(grant){
     let scopes;try{scopes=JSON.parse(grant.scopes_json);}catch{fail();}
     if(!consent?.consumed_at||!authorization||grant.id!==i.grantId||grant.user_id!==i.subject||grant.client_id!==i.clientId||grant.project_id!==i.projectId||grant.resource!==i.resource||!Array.isArray(scopes)||scopes[0]!=='afw:project:read'||new Set(scopes).size!==scopes.length||scopes.some(s=>!i.requestedScopes.includes(s))||JSON.stringify(scopes)!==grant.scopes_json||grant.revoked_at!==''||!iso(grant.created_at)||!iso(grant.expires_at)||grant.exchanged_at!==''&&(!iso(grant.exchanged_at)||Date.parse(grant.exchanged_at)>Date.now()||Date.parse(grant.exchanged_at)<Date.parse(grant.created_at)||Date.parse(grant.exchanged_at)>=Date.parse(grant.expires_at))||Date.parse(grant.created_at)<Date.parse(consent.consumed_at)||Date.parse(grant.created_at)>Date.now()||Date.parse(grant.expires_at)>Math.min(i.C0,Date.parse(consent.expires_at),data.preconnection.expiresAt))fail();
     clock.narrow(Date.parse(grant.expires_at));
    }
    rowAck('grant',grant?{...grant,exchanged_at:''}:grant);
    if(grantLink){
     if(!grant||!authorization||grantLink.preconnectionId!==id||grantLink.authorizationHash!==i.authorizationHash||grantLink.grantId!==i.grantId||grantLink.grantHash!==sha(i.grantId)||grantLink.acceptedAt<Date.parse(grant.created_at)||grantLink.acceptedAt>Date.now())fail();
    }
    let connection=null;
    if(relation){
     if(!grantLink||relation.preconnectionId!==id||relation.grantHash!==grantLink.grantHash||relation.linkedAt<grantLink.acceptedAt||relation.linkedAt>Date.now())fail();
     connection=await getRecord('readConnectionRef',{connectionRef:relation.connectionRef});
     if(connection.connectionRef!==relation.connectionRef||connection.subject!==i.subject||connection.grantId!==i.grantId||connection.clientId!==i.clientId||connection.projectId!==i.projectId||connection.resource!==i.resource||connection.issuedAt!==relation.linkedAt||connection.expiresAt>Math.min(data.preconnection.expiresAt,data.preconnection.owner.accessExpiresAt,Date.parse(grant.expires_at))||Date.now()>=connection.expiresAt)fail();
    }
    return {schema,fence,consent,grant,authorization,grantLink,relation,connection};
   };
   const noticePrimary=async(f,data,issuerFacts)=>{
    const n=f.notice,r=n.reservation,i=f.issuer.reservation?.identity;
    if(n.freeze)fail();
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
    const events=await selectAll('SELECT sequence,grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at FROM dossier_monitoring_consent_events WHERE grant_id=? ORDER BY sequence LIMIT 3',[i.grantId],3);
    if(tickets.length>=2||events.length>1)fail();
    if(!r){if(tickets.length||events.length)fail();return {schema,tickets,events};}
    const grant=issuerFacts.grant,ops=f.issuer.operations,sdk=f.sdk;
    if(!grant||!issuerFacts.authorization||!issuerFacts.grantLink||!issuerFacts.relation||!issuerFacts.connection||!data.preconnection||!data.approval||!sdk.root||!sdk.grant||!['sdk_begin','sdk_approve','sdk_complete'].every(op=>sdk.operations[op].send&&sdk.operations[op].observed)||!ops.grant.ack||ops.grant.ack.outcome!=='applied')fail();
    for(const op of Object.values(ops))if(op.send&&!op.ack||op.ack&&!op.send)fail();
    const expectedGrant={scopes:JSON.parse(grant.scopes_json),createdAt:grant.created_at,expiresAt:grant.expires_at};
    const t=r.ticket,ceil=Math.min(r.accessExpiresAt,r.preconnectionExpiresAt,data.approval.expiresAt,issuerFacts.connection.expiresAt,i.C0,Date.parse(i.consentExpiresAt),Date.parse(grant.expires_at));
    if(canonical(r.identity)!==canonical(i)||r.issuerReservationHash!==f.issuer.reservation.recordHash||r.originalGrantAckHash!==ops.grant.ack.recordHash||r.grantLinkHash!==prepHash('GrantLink',issuerFacts.grantLink)||r.connectionHash!==prepHash('ConnectionRef',issuerFacts.connection)||canonical(r.expectedGrant)!==canonical(expectedGrant)||r.consumedAt!==issuerFacts.consent.consumed_at||r.preconnectionExpiresAt!==data.preconnection.expiresAt||r.accessExpiresAt>Math.min(data.preconnection.owner.accessExpiresAt,i.C0)||r.accessExpiresAt<=r.issuedAt||r.issuedAt>Date.now()||t.expiresAt>ceil||t.permissionExpiresAt>ceil||Date.now()>=t.permissionExpiresAt)fail();
    clock.narrow(ceil);
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
    return {schema,tickets,events};
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
     if(t.ticketHash!==data.sourceSnapshot.initialTicketHash||t.preconnectionId!==id||t.sourceRevision!==source.sourceRevision||t.action!=='connection'||t.connectionRef!==null||t.subjectHash!==subject||map.preconnectionId!==id||map.projectRef!==t.projectRef||map.sourceRevision!==source.sourceRevision||map.projectId!==source.project.projectId||map.revision!==source.project.revision||map.subjectHash!==subject||t.expiresAt>map.expiresAt||t.createdAt<source.window.startedAt||t.createdAt>Date.now()||map.issuedAt<source.window.startedAt||map.issuedAt>t.createdAt||map.expiresAt>capsule.C0||t.expiresAt>capsule.C0||Date.now()>=Math.min(t.expiresAt,map.expiresAt))fail();
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
      clock.narrow(Math.min(pre.expiresAt,pre.owner.accessExpiresAt,a.expiresAt));
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
      if(upload.ack.resourceId===capsule.activatedVersionId||activation.ack.resourceId===capsule.activatedDeploymentId||actual.pointer.versionId!==upload.ack.resourceId||actual.pointer.deploymentId!==activation.ack.resourceId||canonical(actual.currentConfiguration)!==canonical(expected))fail();
      qualifyFiniteConnectionProfile({phase:'read_consent',metadata:actual.currentConfiguration});
     }else if(actual.pointer.versionId!==capsule.activatedVersionId||actual.pointer.deploymentId!==capsule.activatedDeploymentId||canonical(actual.currentConfiguration)!==canonical(plan.configuration))fail();
     if(activation.receipt){
      receipt=qualifyFiniteOwnerInstalledStage({source,preconnection:data.preconnection,sourceSnapshot:data.sourceSnapshot,initialTicket:data.ticket,connection:null,stage:'connection',stageApproval:data.stageApproval,approval:data.approval,ticket:data.ticket,ticketUse:data.ticketUse,upload,activation,predecessors:[],grantLink:null,noticeLink:null,observedAt:Date.now()});
      if(receipt.moduleHash!==capsule.moduleHash||receipt.configurationHash!==finiteActivationConfigurationHash(actual.currentConfiguration))fail();
     }
    }else if(actual.pointer.versionId!==capsule.activatedVersionId||actual.pointer.deploymentId!==capsule.activatedDeploymentId||canonical(actual.currentConfiguration)!==canonical(plan.configuration))fail();
    if(f.sdk.root){const r=f.sdk.root;if(!receipt||!enrollment||!ack||r.preconnectionId!==id||r.capsuleHash!==capsule.capsuleHash||r.enrollmentHash!==enrollment.recordHash||r.originalConnectionReceiptHash!==receipt.receiptHash||r.sourceRevision!==capsule.sourceRevision||r.actorId!==actorId||r.qaVersionId!==qaVersionId||r.mVersionId!==receipt.versionId||r.I0!==capsule.I0||r.C0!==capsule.C0||r.C1!==capsule.C1||r.createdAt>Date.now())fail();for(const v of Object.values(f.sdk.operations))if(v.observed?.observedAt>Date.now())fail();}
    data.noticeLink=await getRecord('readLink',{kind:'notice',preconnectionId:id},false);
    if(data.noticeLink?(f.inventory.get(prefix+'notice')!==prepEncode('NoticeLink',data.noticeLink)):f.inventory.has(prefix+'notice'))fail();
    const issuerFacts=await issuerPrimary(f,data,enrollment,ack,receipt,getRecord);
    if(f.sdk.root){
     const b=f.sdk.operations.sdk_begin,a=f.sdk.operations.sdk_approve,c=f.sdk.operations.sdk_complete,i=f.issuer.reservation?.identity,g=f.sdk.grant;
     if(b.send&&b.send.bindingHash!==b.send.originalRequestHash||a.send&&(!i||a.send.bindingHash!==i.authorizationHash)||c.send&&(!issuerFacts.grant||!issuerFacts.grantLink||!issuerFacts.relation))fail();
     if(i&&(!b.observed||b.observed.resultHash!==digest('afw.finite-owner-sdk-begin-result.v1',{authorizationHash:i.authorizationHash,requestHash:b.send.originalRequestHash})))fail();
     if(g&&(!i||g.rootHash!==f.sdk.root.recordHash||g.identityHash!==i.identityHash||g.reservationHash!==f.issuer.reservation.recordHash||g.authorizationHash!==i.authorizationHash||g.grantId!==i.grantId||g.approvedRequestHash!==a.observed?.resultHash||Date.parse(g.createdAt)>Date.now()||Date.now()>=Date.parse(g.expiresAt)||Date.parse(g.expiresAt)>Math.min(i.C0,Date.parse(i.consentExpiresAt),data.preconnection.expiresAt)||g.scopes.some(s=>!i.requestedScopes.includes(s))))fail();
     if(f.sdk.reference&&(!i||f.sdk.reference.correlationHash!==finiteOwnerSdkCleanupCorrelation({root:f.sdk.root,expectedGrant:g,completeSend:c.send,identity:i})||f.sdk.reference.observedAt>Date.now()))fail();
     if(issuerFacts.grant&&g&&(canonical(JSON.parse(issuerFacts.grant.scopes_json))!==canonical(g.scopes)||issuerFacts.grant.created_at!==g.createdAt||issuerFacts.grant.expires_at!==g.expiresAt))fail();
    }
    const noticeFacts=await noticePrimary(f,data,issuerFacts);
    qualifyNoticeLink(f,data,issuerFacts,noticeFacts);
    return {receipt,data,enrollment,ack,issuerFacts,noticeFacts};
   };
   const qualified=await qualify(first,observed),again=await primary(),second=await facts(),secondQualified=await qualify(second,again);
   const snapshot=(f,physical,q)=>({
    sourceBase:source,preconnectionId:capsule.preconnectionId,capsuleHash:capsule.capsuleHash,
    anchor:JSON.parse(f.anchor),physical,
    preparation:Object.fromEntries(['sourceSnapshot','ticket','ticketUse','projectRef','preconnection','stageApproval','approval','noticeLink'].map(k=>[k,q.data[k]??null])),
    records:{inventory:[...f.inventory],effects:[...f.effects],enrollment:[...f.enrollment],issuer:f.issuer,sdk:f.sdk.entries,notice:f.notice},
    installed:{receipt:q.receipt,enrollment:q.enrollment,ack:q.ack},
    noticeRows:q.noticeFacts,
    issuerRows:{schema:null,fence:null,consent:null,grant:null,authorization:null,grantLink:null,relation:null,connection:null,...q.issuerFacts}
   });
   const pair={first:snapshot(first,observed,qualified),second:snapshot(second,again,secondQualified)};
   if(canonical(pair.first)!==canonical(pair.second))fail();
   current(clock.lease);return freezeOwnerPhaseData(pair);
  });
  return await run();
 }finally{if(parentSignal&&onAbort)parentSignal.removeEventListener('abort',onAbort);clock?.close();}
}


// Existing consumer projection of the ORIGINAL SQL row, never an ACK row hash.
function noticeEventHash(row){
 return evidence('event',{grantId:row.grant_id,projectId:row.project_id,subject:row.user_id,clientId:row.client_id,resource:row.resource,revision:row.revision,action:row.action,purpose:row.purpose,requestId:row.request_id,sequence:row.sequence,issuedAt:row.issued_at,expiresAt:row.expires_at});
}
function qualifyNoticeLink(f,data,rows,notice){
 const link=data.noticeLink;if(!link)return;
 const n=f.notice,r=n.reservation,i=f.issuer.reservation?.identity,send=n.operations.consent.send,ack=n.operations.consent.ack;
 if(!i||!r||n.freeze||!data.preconnection||!data.approval||!rows.grant||!rows.authorization||!rows.grantLink||!rows.relation||!rows.connection||!f.sdk.root||!f.sdk.grant||!notice.schema||notice.tickets.length!==1||notice.events.length!==1||n.operations.ticket.ack?.outcome!=='applied'||!n.operations.ticket.send||!send||ack?.outcome!=='applied')fail();
 const row=notice.events[0],ceiling=Math.min(send.accessExpiresAt,r.accessExpiresAt,data.preconnection.owner.accessExpiresAt,data.preconnection.expiresAt,data.approval.expiresAt,rows.connection.expiresAt,Date.parse(i.consentExpiresAt),Date.parse(rows.grant.expires_at),r.ticket.permissionExpiresAt,i.C0);
 qualifyNoticeConsentEvent(row,i,r.ticket,send);
 if(link.preconnectionId!==i.preconnectionId||link.grantHash!==rows.grantLink.grantHash||link.grantHash!==sha(i.grantId)||link.sequence!==row.sequence||link.sequence!==ack.sequence||link.eventHash!==noticeEventHash(row)||link.acceptedAt<Math.max(ack.observedAt,row.issued_at,rows.grantLink.acceptedAt)||link.acceptedAt>=send.window.deadline||link.acceptedAt>=Math.min(ceiling,r.ticket.expiresAt)||link.acceptedAt>Date.now()||Date.now()>=ceiling)fail();
}
function qualifyNoticeConsentEvent(row,i,t,send){
 fields(row,['sequence','grant_id','project_id','user_id','client_id','resource','revision','action','purpose','request_id','issued_at','expires_at']);
 if(!Number.isSafeInteger(row.sequence)||row.sequence<=0||!Number.isSafeInteger(row.issued_at)||row.issued_at<Math.max(send.window.startedAt,t.issuedAt,send.issuedAt)||row.issued_at>=Math.min(send.window.deadline,t.permissionExpiresAt)||row.issued_at>Date.now())fail();
 const expected={sequence:row.sequence,grant_id:i.grantId,project_id:i.projectId,user_id:i.subject,client_id:i.clientId,resource:i.resource,revision:i.projectRevision,action:'grant',purpose:'afw.dossier-monitoring.v1',request_id:t.requestId,issued_at:row.issued_at,expires_at:t.permissionExpiresAt};
 if(canonical(row)!==canonical(expected))fail();
}
function qualifyNoticeConsentBaseline(pair){
 for(const s of [pair.first,pair.second]){
  const n=s.records.notice,issuer=s.records.issuer,rows=s.issuerRows;
  if(s.preparation.noticeLink||!s.installed.receipt||!s.noticeRows.schema||!n.reservation||n.freeze||n.operations.ticket.ack?.outcome!=='applied'||!n.operations.ticket.send||n.operations.consent.send||n.operations.consent.ack||s.noticeRows.tickets.length!==1||s.noticeRows.events.length)fail();
  if(!issuer.reservation||issuer.operations.grant.ack?.outcome!=='applied'||!rows.grant||!rows.authorization||!rows.grantLink||!rows.relation||!rows.connection)fail();
  for(const v of Object.values(issuer.operations))if(v.send&&!v.ack||v.ack&&!v.send)fail();
  const names=new Set(s.records.sdk.map(([key])=>key)),prefix='afw.finite-owner-issuer-provenance.v1:'+s.preconnectionId+':';
  if(!['root','grant','sdk_begin:send','sdk_begin:observed','sdk_approve:send','sdk_approve:observed','sdk_complete:send','sdk_complete:observed'].every(key=>names.has(prefix+key)))fail();
  for(const [key]of s.records.sdk)if(key.endsWith(':send')&&!names.has(key.slice(0,-4)+'observed'))fail();
 }
 const {sourceBase,installed,preconnectionId,capsuleHash}=pair.second,r=installed.receipt;
 const source=validateFiniteOwnerSource({...sourceBase,phase:'read_consent',currentPublication:{stage:'connection',versionId:r.versionId,deploymentId:r.deploymentId,receiptHash:r.receiptHash}});
 return Object.freeze({source,preconnectionId,capsuleHash});
}
function expectedNoticeTicket(i,t){return {handle_hash:t.handleHash,request_id:t.requestId,user_id:i.subject,grant_id:i.grantId,project_id:i.projectId,client_id:i.clientId,resource:i.resource,purpose:'afw.dossier-monitoring-owner.v1',action:'grant',revision:i.projectRevision,expected_sequence:t.expectedSequence,issued_at:t.issuedAt,expires_at:t.expiresAt,permission_expires_at:t.permissionExpiresAt};}
function requireEmptyNotice(s){
 const n=s.records.notice;
 if(s.preparation.noticeLink||n.reservation||n.freeze||Object.values(n.operations).some(v=>v.send||v.ack)||s.noticeRows.tickets.length||s.noticeRows.events.length)fail();
}
function freezeOwnerPhaseData(value){
 if(value&&typeof value==='object'){for(const v of Object.values(value))freezeOwnerPhaseData(v);Object.freeze(value);}return value;
}
function qualifySettledOwnerPair(pair){
 for(const s of [pair.first,pair.second]){
  if(s.records.effects.length&&!s.installed.receipt||s.preparation.ticketUse&&!s.preparation.stageApproval)fail();
  requireEmptyNotice(s);
  for(const v of Object.values(s.records.issuer.operations))if(v.send&&!v.ack||v.ack&&!v.send)fail();
  const names=new Set(s.records.sdk.map(([key])=>key));
  for(const [key]of s.records.sdk)if(key.endsWith(':send')&&!names.has(key.slice(0,-4)+'observed'))fail();
 }
 const {sourceBase,installed,preconnectionId,capsuleHash}=pair.second,r=installed.receipt;
 const source=r?validateFiniteOwnerSource({...sourceBase,phase:'read_consent',currentPublication:{stage:'connection',versionId:r.versionId,deploymentId:r.deploymentId,receiptHash:r.receiptHash}}):sourceBase;
 return Object.freeze({source,preconnectionId,capsuleHash});
}
export async function readPrivateQaFiniteOwnerContext(options){
 if(arguments.length!==1)fail();
 return qualifySettledOwnerPair(await observeOwnerPhasePair(options));
}


/** Fixed native connection producer. One original human continuation owns every
 * native result; journal DATA is observed but never resumes this stack. */
export async function handlePrivateQaFiniteOwnerConnection({request,env,ctx},originalLease){
 let clock,onAbort,failed=false,position='entry';
 try{
  if(readFiniteOwnerRequestContext(originalLease).root!==originalLease)fail();
  return await observeFiniteOwnerRequestWork({ctx,env,originalLease},()=>finiteNativeOperation(originalLease,ctx,async firstFailure=>{
   const received=connectionMetadata(request.headers),storage=ctx.storage,db=env.RELEASE_DB,fetcher=globalThis.fetch;
   const metadata=env.AFW_QA_VERSION,reader=env.AFW_MCP_CLOSURE_READ_TOKEN,publisher=env.AFW_MCP_CLOSURE_PUBLISH_TOKEN;
   const native={get:storage.get,list:storage.list,transaction:storage.transaction,sync:storage.sync,getAlarm:storage.getAlarm},headers=request.headers,signal=request.signal,url=request.url,headerBytes=canonical([...headers]);
   // Capture native objects/methods ONCE for the whole original continuation.
   // New first-primary sessions/statements are still captured per operation.
   const actor=ctx.id,toString=actor?.toString,self=env.AFW_INDEPENDENT_CLOSURE,node=env.AFW_RELEASE_EVENTS_NODE,alias=env.AFW_FINITE_OWNER_OAUTH_KV,qaVersionId=metadata?.id;
   const dbMethods={prepare:db?.prepare,withSession:db?.withSession},selfMethods={idFromName:self?.idFromName,get:self?.get},nodeMethods={idFromName:node?.idFromName,idFromString:node?.idFromString,get:node?.get},aliasMethods={get:alias?.get,put:alias?.put,delete:alias?.delete,list:alias?.list};
   if([toString,...Object.values(native),...Object.values(dbMethods),...Object.values(selfMethods),...Object.values(nodeMethods),...Object.values(aliasMethods)].some(value=>typeof value!=='function'))fail();
   const actorId=Reflect.apply(toString,actor,[]);if(!hex(actorId))fail();
   let activeChild=null,admission=null;
   const holders=()=>{
    current(originalLease);
    if(failed||ctx.storage!==storage||ctx.id!==actor||actor.toString!==toString||Reflect.apply(toString,actor,[])!==actorId||env.RELEASE_DB!==db||Object.keys(dbMethods).some(key=>db[key]!==dbMethods[key])||env.AFW_INDEPENDENT_CLOSURE!==self||Object.keys(selfMethods).some(key=>self[key]!==selfMethods[key])||env.AFW_RELEASE_EVENTS_NODE!==node||Object.keys(nodeMethods).some(key=>node[key]!==nodeMethods[key])||env.AFW_FINITE_OWNER_OAUTH_KV!==alias||Object.keys(aliasMethods).some(key=>alias[key]!==aliasMethods[key])||globalThis.fetch!==fetcher||env.AFW_QA_VERSION!==metadata||metadata.id!==qaVersionId||env.AFW_MCP_CLOSURE_READ_TOKEN!==reader||env.AFW_MCP_CLOSURE_PUBLISH_TOKEN!==publisher||Object.keys(native).some(k=>storage[k]!==native[k])||request.headers!==headers||request.signal!==signal||request.url!==url||request.method!=='POST'||canonical([...headers])!==headerBytes)fail();
    if(admission)current(admission.lease);
   };
   clock=createFiniteInitialLease(readFiniteOwnerRequestDeadline(originalLease),readFiniteOwnerRequestDeadline(originalLease),holders,fail);
   onAbort=()=>{clock.close();};originalLease.signal.addEventListener('abort',onAbort,{once:true});
   const check=()=>{current(clock.lease);if(activeChild)current(activeChild);};
   const wait=async work=>{check();const promise=work();const value=await clock.wait(retain(promise),activeChild??clock.lease);check();return value;};
   const first=error=>{failed=true;firstFailure(error);};
   const bytes=await wait(()=>received.method==='POST'?readFiniteOwnerNoticeConsentBody(request,check,first):connectionBytes(request,check,first));
   const original=new Request(connectionUrl,{method:received.method,headers,body:bytes.length?bytes:undefined,signal:originalLease.signal});
   const grammar=qualifyFiniteOwnerChoiceRequest(original,bytes),initial=await wait(()=>observeOwnerPhasePair({ctx,env,parent:originalLease})),initialState=initial.second;
   const clean=s=>{
    requireEmptyNotice(s);
    if(s.installed.receipt||s.installed.enrollment||s.installed.ack||s.records.effects.length||s.records.sdk.length||s.records.issuer.reservation||s.records.issuer.freeze||Object.values(s.records.issuer.operations).some(v=>v.send||v.ack)||s.preparation.preconnection||s.preparation.stageApproval||s.preparation.ticketUse)fail();
   };
   clean(initial.first);clean(initialState);
   if(headers.get('x-afw-finite-version')!==initialState.sourceBase.initialBaseline.versionId)fail();
   const id=initialState.preconnectionId;
   // This lexical reader returns exactly the three factual public keys. During
   // choice's own sequential writes it describes closed prefixes without granting
   // publication permission. Admission is minted only by choice's actual finish.
   const readChoice=async(parent,requested)=>{
    check();const pair=await wait(()=>observeOwnerPhasePair({ctx,env,parent,...requested?{preconnectionId:requested}:{}}));
    for(const s of [pair.first,pair.second]){
     requireEmptyNotice(s);
     if(s.preconnectionId!==id||s.capsuleHash!==initialState.capsuleHash||canonical(s.sourceBase)!==canonical(initialState.sourceBase)||s.records.effects.length||s.installed.enrollment||s.installed.receipt||s.records.sdk.length||s.records.issuer.reservation)fail();
    }
    return Object.freeze({source:pair.second.sourceBase,preconnectionId:id,capsuleHash:pair.second.capsuleHash});
   };
   const choice=await wait(()=>continuePrivateQaFiniteOwnerChoice({ctx,env,request:original},originalLease,readChoice));
   if(grammar.method==='GET'){
    if(choice.status!==200||choice.stage!=='connection'||!hex(choice.handle)||!hex(choice.projectRef)||choice.goal!==initialState.sourceBase.goal||!Number.isSafeInteger(choice.expiresAt)||choice.expiresAt<=Date.now())fail();
    const html='<h1>Preparar configuración de lectura</h1><p>La lectura y los avisos requieren decisiones separadas.</p><form method="post" action="/connections/finite-prepare"><input type="hidden" name="handle" value="'+choice.handle+'"><input type="hidden" name="projectRef" value="'+choice.projectRef+'"><button name="decision" value="approve">Preparar lectura</button></form>';
    check();return new Response(html,{headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store','Set-Cookie':'__Host-afw-finite-prepare='+choice.handle+'; Secure; HttpOnly; SameSite=Strict; Path=/; Max-Age='+Math.max(0,Math.floor((choice.expiresAt-Date.now())/1000))}});
   }
   if(choice.status!==202||choice.stage!=='connection'||choice.preconnectionId!==id)fail();
   admission=consumeFiniteOwnerStageAdmission({ctx,env,preconnectionId:id,stage:'connection'},originalLease);
   position='approved';
   return adoptFiniteOwnerRequestStageWork({ctx,env,admission,originalLease},async()=>{
    const approved=await wait(()=>observeOwnerPhasePair({ctx,env,parent:originalLease,preconnectionId:id})),expected=structuredClone(approved.second),prep=expected.preparation,capsule=expected.anchor.anchors.capsule,plan=expected.anchor.anchors.plan,resident=readPrivateQaFiniteCandidate();
    if(!prep.preconnection||!prep.stageApproval||!prep.ticketUse||prep.noticeLink||expected.records.effects.length||expected.installed.enrollment||expected.installed.receipt||prep.ticket.ticketHash!==sha(grammar.handle)||prep.ticket.projectRef!==grammar.projectRef||prepHash('StageApproval',prep.stageApproval)!==admission.stageApprovalHash||canonical(admission.ownerSource)!==canonical(expected.sourceBase))fail();
    clock.narrow(Math.min(capsule.C0,prep.preconnection.expiresAt,prep.preconnection.owner.accessExpiresAt,prep.approval.expiresAt,plan.readerExpiresAt,plan.publisherExpiresAt));
    const baseline={versionId:capsule.activatedVersionId,deploymentId:capsule.activatedDeploymentId,module:resident.module,configuration:plan.configuration};
    const configuration=structuredClone(plan.configuration);configuration.bindings.find(b=>b.name==='AFW_DELEGATED_OAUTH_ENABLED').text='true';
    qualifyFiniteConnectionProfile({phase:'read_consent',metadata:configuration});
    const candidate={module:resident.module,configuration},candidateBytes=Uint8Array.from(resident.bytes);
    if(sha(candidateBytes)!==capsule.moduleHash||candidateBytes.length!==plan.moduleBytes||resident.sourceRevision!==capsule.sourceRevision||resident.sourceTree!==capsule.sourceTree)fail();
    const backupEntry=expected.anchor.backupRaw.find(([key])=>key.endsWith(':backup'));if(!backupEntry)fail();
    const backup=uploadRecord('Backup',backupEntry[1]),rollbackBytes=Buffer.concat(expected.anchor.backupRaw.filter(([key])=>key.includes(':chunk:')).map(([,raw])=>Buffer.from(uploadRecord('Chunk',raw).content,'base64')));
    if(rollbackBytes.length!==backup.moduleBytes||sha(rollbackBytes)!==backup.moduleHash||restorationConfigurationHash(backup.rawConfiguration)!==backup.configurationHash)fail();
    const rollback={versionId:backup.baselineVersionId,module:{name:'index.mjs',bytes:backup.moduleBytes,sha256:backup.moduleHash},configuration:backup.rawConfiguration};
    let ownEnrollment=null,ownEnrollmentAck=null,writer=null,enrollmentResult=null,enrollmentAckResult=null;
    let ownUploadSend=null,actualUploadPromise=null,actualUploadResult=null,uploadSettled=false,ownUploadAck=null;
    let ownActivationSend=null,actualActivationPromise=null,actualActivationResult=null,activationSettled=false,ownActivationAck=null;
    let ownReceipt=null,receiptWrite=null,receiptReadback=null;
    const states=['approved','enrollment-recorded','enrollment-ack-recorded','upload-send-recorded','upload-native-pending','upload-ack-recorded','upload-observed','activation-send-recorded','activation-native-pending','activation-ack-recorded','activation-observed','receipt-recorded','complete'];
    const engine=createFiniteFixedPolicyEngine({ctx,env},check);
    const identity=effect=>({kind:'connection',preconnectionId:id,sourceRevision:capsule.sourceRevision,stage:'connection',effect});
    const journal=effect=>createFinitePolicyEffectJournal({storage,identity:identity(effect),now:Date.now}),upload=journal('upload'),activation=journal('activation');
    const contextHash=digest('afw.finite-connection-context.v1',{preconnection:prep.preconnection,stageApproval:prep.stageApproval,predecessors:[],grant:null,notice:null});
    const updateAnchor=()=>{expected.anchor.enrollment=structuredClone(expected.records.enrollment);expected.anchor.effects=structuredClone(expected.records.effects);};
    const ordered=rows=>rows.sort(([a],[b])=>a<b?-1:a>b?1:0);
    async function recheckOwned(){
     check();if(!states.includes(position)||['upload-native-pending','activation-native-pending'].includes(position))fail();
     if(actualUploadPromise&&!uploadSettled||actualActivationPromise&&!activationSettled)fail();
     if(states.indexOf(position)>=states.indexOf('enrollment-recorded')&&(!writer||!enrollmentResult||enrollmentResult.enrollment!==ownEnrollment))fail();
     if(states.indexOf(position)>=states.indexOf('enrollment-ack-recorded')&&(!enrollmentAckResult||enrollmentAckResult.ack!==ownEnrollmentAck))fail();
     if(states.indexOf(position)>=states.indexOf('upload-send-recorded')&&!ownUploadSend)fail();
     if(states.indexOf(position)>=states.indexOf('upload-ack-recorded')&&(!actualUploadPromise||!uploadSettled||!actualUploadResult||ownUploadAck?.resourceId!==actualUploadResult.id))fail();
     if(states.indexOf(position)>=states.indexOf('activation-send-recorded')&&!ownActivationSend)fail();
     if(states.indexOf(position)>=states.indexOf('activation-ack-recorded')&&(!actualActivationPromise||!activationSettled||!actualActivationResult||ownActivationAck?.resourceId!==actualActivationResult.id))fail();
     if(states.indexOf(position)>=states.indexOf('receipt-recorded')&&(!ownReceipt||!receiptWrite||!receiptReadback))fail();
     const pair=await wait(()=>observeOwnerPhasePair({ctx,env,parent:originalLease,preconnectionId:id}));
     if(canonical(pair.first)!==canonical(expected)||canonical(pair.second)!==canonical(expected))fail();check();
    }
    const withChild=action=>clock.child(async(l,end)=>{activeChild=l;try{check();return await action(l,end);}finally{activeChild=null;}});
    const sync=()=>wait(()=>Reflect.apply(native.sync,storage,[]));
    const setEnrollment=(kind,record)=>{
     expected.records.enrollment.push(['afw.finite-preparation-cleanup.v1:'+(kind==='Enrollment'?'enrollment':'ack'),enrollmentEncode(kind,record)]);ordered(expected.records.enrollment);
     expected.installed[kind==='Enrollment'?'enrollment':'ack']=structuredClone(record);updateAnchor();
    };
    const setEffect=(kind,record,effect)=>{
     const prefix='afw.finite-policy-effect.v1:',key=prefix+effectIdentity(identity(effect))+':'+({ConnectionSend:'send',ConnectionAck:'ack',ConnectionReceipt:'receipt'})[kind];
     if(expected.records.effects.some(([k])=>k===key))fail();
     expected.records.effects.push([key,prepEncode(kind,record)]);
     if(kind==='ConnectionSend'){
      const head=prefix+'writer-head',raw=JSON.stringify({identityHash:effectIdentity(identity(effect)),sendHash:prepHash(kind,record)}),prior=expected.records.effects.find(row=>row[0]===head);
      if(prior)prior[1]=raw;else expected.records.effects.push([head,raw]);
     }
     ordered(expected.records.effects);updateAnchor();
    };
    const record=async(j,kind,value,method,l,state)=>{
     check();const result=await wait(()=>j[method](value,l));if(result.status!=='recorded'||result.recordHash!==prepHash(kind,value))fail();
     await sync();const read=await wait(()=>j.read(l));if(read.state!==state||prepEncode(kind,read[method==='issue'?'send':method==='acknowledge'?'ack':'receipt'])!==prepEncode(kind,value))fail();
     return {result,read};
    };
    await recheckOwned();
    await withChild(async l=>{await engine.readPointer(baseline,l);await engine.readVersion(baseline,l);await engine.readVersion(rollback,l,true);await recheckOwned();});
    await withChild(async(l,end)=>{
     await recheckOwned();
     writer=await wait(()=>prepareFinitePreparationEnrollmentWrite({ctx,env,preconnectionId:id,stageApprovalHash:admission.stageApprovalHash,ownerSource:admission.ownerSource,baseline,baselineBytes:Uint8Array.from(resident.bytes)},l,end));
     await recheckOwned();enrollmentResult=await wait(()=>writer.recordEnrollment());ownEnrollment=enrollmentResult.enrollment;
     setEnrollment('Enrollment',ownEnrollment);position='enrollment-recorded';await recheckOwned();
     enrollmentAckResult=await wait(()=>writer.recordAck());ownEnrollmentAck=enrollmentAckResult.ack;
     setEnrollment('Ack',ownEnrollmentAck);position='enrollment-ack-recorded';await recheckOwned();
    });
    const uploadInput={configuration,baselineVersionId:baseline.versionId,bytes:candidateBytes};
    const sendFor=(effect,description,end)=>({purpose:'afw.finite-connection-send.v1',preconnectionId:id,sourceRevision:capsule.sourceRevision,stage:'connection',effect,contextHash,requestHash:digest('afw.finite-policy-request.v1',{method:description.method,path:description.path,body:description.body,baselineVersionId:baseline.versionId,baselineDeploymentId:baseline.deploymentId}),baselineVersionId:baseline.versionId,baselineDeploymentId:baseline.deploymentId,issuedAt:Date.now(),deadline:end});
    await withChild(async(l,end)=>{
     await recheckOwned();await engine.readPointer(baseline,l);
     ownUploadSend=sendFor('upload',engine.describeUpload(uploadInput),end);
     await record(upload,'ConnectionSend',ownUploadSend,'issue',l,'issued');setEffect('ConnectionSend',ownUploadSend,'upload');position='upload-send-recorded';await recheckOwned();check();
     position='upload-native-pending';actualUploadPromise=retain(Promise.resolve().then(()=>{check();return engine.upload(uploadInput,l);}));
     actualUploadResult=await wait(()=>actualUploadPromise);uploadSettled=true;
     if(actualUploadResult.id===baseline.versionId||actualUploadResult.id===rollback.versionId||actualUploadResult.id===capsule.qaVersionId)fail();
     ownUploadAck={purpose:'afw.finite-connection-ack.v1',sendHash:prepHash('ConnectionSend',ownUploadSend),resourceId:actualUploadResult.id,acknowledgedAt:Date.now()};
     await record(upload,'ConnectionAck',ownUploadAck,'acknowledge',l,'acknowledged');setEffect('ConnectionAck',ownUploadAck,'upload');position='upload-ack-recorded';await recheckOwned();
     await engine.readVersion({versionId:actualUploadResult.id,...candidate},l);await engine.readPointer(baseline,l);position='upload-observed';await recheckOwned();
    });
    await withChild(async(l,end)=>{
     await recheckOwned();await engine.readPointer(baseline,l);
     const input={versionId:actualUploadResult.id},description=engine.describeActivation(input);
     ownActivationSend=sendFor('activation',description,end);
     await record(activation,'ConnectionSend',ownActivationSend,'issue',l,'issued');setEffect('ConnectionSend',ownActivationSend,'activation');position='activation-send-recorded';await recheckOwned();check();
     position='activation-native-pending';actualActivationPromise=retain(Promise.resolve().then(()=>{check();return engine.activate(input,l);}));
     actualActivationResult=await wait(()=>actualActivationPromise);activationSettled=true;
     if(actualActivationResult.id===baseline.deploymentId||actualActivationResult.strategy!=='percentage'||canonical(actualActivationResult.versions)!==canonical(description.body.versions))fail();
     ownActivationAck={purpose:'afw.finite-connection-ack.v1',sendHash:prepHash('ConnectionSend',ownActivationSend),resourceId:actualActivationResult.id,acknowledgedAt:Date.now()};
     await record(activation,'ConnectionAck',ownActivationAck,'acknowledge',l,'acknowledged');setEffect('ConnectionAck',ownActivationAck,'activation');
     expected.physical.pointer={versionId:actualUploadResult.id,deploymentId:actualActivationResult.id};expected.physical.currentConfiguration=structuredClone(configuration);
     expected.physical.qaSdkBindingFacts=qualifyFiniteOwnerSdkBindingFacts({qaMetadata:finitePublicProfileTemplate('qaLive'),mMetadata:configuration});
     position='activation-ack-recorded';await recheckOwned();
     await engine.readPointer({versionId:actualUploadResult.id,deploymentId:actualActivationResult.id},l);await engine.readVersion({versionId:actualUploadResult.id,...candidate},l);position='activation-observed';await recheckOwned();
     const raw={purpose:'afw.finite-connection-installed.v1',preconnectionId:id,sourceRevision:capsule.sourceRevision,stage:'connection',baselineVersionId:baseline.versionId,baselineDeploymentId:baseline.deploymentId,versionId:actualUploadResult.id,deploymentId:actualActivationResult.id,moduleHash:candidate.module.sha256,configurationHash:finiteActivationConfigurationHash(configuration),completedAt:Date.now()};
     ownReceipt={...raw,receiptHash:prepHash('ConnectionReceipt',raw)};
     receiptWrite=await record(activation,'ConnectionReceipt',ownReceipt,'finish',l,'installed');receiptReadback=receiptWrite.read;
     setEffect('ConnectionReceipt',ownReceipt,'activation');expected.installed.receipt=structuredClone(ownReceipt);position='receipt-recorded';await recheckOwned();position='complete';await recheckOwned();
    });
    check();return new Response('<h1>Configuración de lectura preparada</h1><p>La lectura y los avisos requieren decisiones separadas.</p>',{headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'}});
   });
  }));
 }catch(error){failed=true;position='failed';return pending([400,401,403,404,405,413,429].includes(error?.status)?error.status:503);}
 finally{if(onAbort)originalLease.signal.removeEventListener('abort',onAbort);clock?.close();}
}

/** Fixed unmounted QA implementation. All continuations and witnesses live only
 * in this invocation's stack; persisted DATA never recreates them. */
export async function handlePrivateQaFiniteOwnerOAuth({request,env,ctx},originalLease){
 let clock,onAbort;
 try{
  if(readFiniteOwnerRequestContext(originalLease).root!==originalLease)fail();
  return await observeFiniteOwnerRequestWork({ctx,env,originalLease},()=>finiteNativeOperation(originalLease,ctx,async firstFailure=>{
   const received=readFiniteOwnerOAuthMetadata(request.headers);
   const issuerCapture=captureFinitePreparationIssuerContext({ctx,env});
   const alias=env.AFW_FINITE_OWNER_OAUTH_KV,methods={get:alias?.get,put:alias?.put,delete:alias?.delete,list:alias?.list};
   const db=env.RELEASE_DB,dbPrepare=db?.prepare,node=env.AFW_RELEASE_EVENTS_NODE,nodeMethods={idFromName:node?.idFromName,idFromString:node?.idFromString,get:node?.get};
   const self=env.AFW_INDEPENDENT_CLOSURE,selfGet=self?.get,metadata=env.AFW_QA_VERSION,reader=env.AFW_MCP_CLOSURE_READ_TOKEN,publisher=env.AFW_MCP_CLOSURE_PUBLISH_TOKEN,fetcher=globalThis.fetch;
   const headers=request.headers,signal=request.signal,url=request.url,method=request.method,headerBytes=canonical([...headers]);
   if([...Object.values(methods),...Object.values(nodeMethods),dbPrepare,selfGet].some(v=>typeof v!=='function'))fail();
   let identity=null,activeChild=null;
   const holders=()=>{
    current(originalLease);issuerCapture.holders();
    if(env.AFW_FINITE_OWNER_OAUTH_KV!==alias||Object.keys(methods).some(k=>alias[k]!==methods[k])||env.RELEASE_DB!==db||db.prepare!==dbPrepare||env.AFW_RELEASE_EVENTS_NODE!==node||Object.keys(nodeMethods).some(k=>node[k]!==nodeMethods[k])||env.AFW_INDEPENDENT_CLOSURE!==self||self.get!==selfGet||env.AFW_QA_VERSION!==metadata||env.AFW_MCP_CLOSURE_READ_TOKEN!==reader||env.AFW_MCP_CLOSURE_PUBLISH_TOKEN!==publisher||globalThis.fetch!==fetcher||request.headers!==headers||request.signal!==signal||request.url!==url||request.method!==method||canonical([...headers])!==headerBytes)fail();
    if(identity&&Date.now()>=identity.expiresAt)fail();
   };
   clock=createFiniteInitialLease(readFiniteOwnerRequestDeadline(originalLease),readFiniteOwnerRequestDeadline(originalLease),holders,fail);
   onAbort=()=>clock.close();originalLease.signal.addEventListener('abort',onAbort,{once:true});
   const check=()=>{current(clock.lease);if(activeChild)current(activeChild);};
   const wait=async promise=>{check();const result=await clock.wait(retain(promise),activeChild??clock.lease);check();return result;};
   const bytes=await wait(finiteNativeBytes(request,check,firstFailure));check();
   const original=new Request(received.url,{method:received.method,headers,body:bytes.length?bytes:undefined,signal:originalLease.signal});
   const grammar=qualifyFiniteOwnerOAuthRequest(original,bytes);
   const baseline=await wait(observeOwnerPhasePair({ctx,env,parent:originalLease})),context=qualifySettledOwnerPair(baseline);
   if(context.source.phase!=='read_consent'||received.mVersionId!==context.source.currentPublication.versionId||!baseline.second.issuerRows.schema)fail();
   const expected=structuredClone(baseline.second),source=context.source,id=context.preconnectionId;
   const capsule=expected.anchor.anchors.capsule,prep=expected.preparation;
   clock.narrow(Math.min(capsule.C0,prep.preconnection.expiresAt,prep.preconnection.owner.accessExpiresAt,prep.approval.expiresAt));
   const verified=await wait(verifyCloudflareAccessJwtWithExpiry({token:original.headers.get('Cf-Access-Jwt-Assertion'),teamDomain:source.access.teamDomain,audience:source.access.audience}));
   if(!verified.ok)fail();identity=verified.identity;clock.narrow(identity.expiresAt);
   const rawCookies=(original.headers.get('Cookie')??'').split(';').map(s=>s.trim()),cookie=rawCookies.filter(s=>s.startsWith('__Host-afw-finite-prepare='));
   if(cookie.length!==1||!/^__Host-afw-finite-prepare=[a-f0-9]{64}$/.test(cookie[0])||sha(cookie[0].slice('__Host-afw-finite-prepare='.length))!==prep.ticket.ticketHash)fail();
   const realm=evidence('realm',{...source.access,origin:source.origin}),subjectHash=evidence('subject',{accessRealmHash:realm,subject:identity.subject});
   qualifyFiniteOwnerApprovedTicket({source,identity,currentTicket:prep.ticket,ticket:prep.ticket,use:prep.ticketUse,pre:prep.preconnection,approval:prep.approval,snapshot:prep.sourceSnapshot,realm,subjectHash,observedAt:Date.now()});
   if(identity.subject!==expected.anchor.anchors.material.ownerSelection.subject)fail();
   const sdk=sdkJournal({ctx,env}),issuer=createFinitePreparationIssuerJournal({ctx,env}),store=createFinitePreparationIssuerStore({ctx,env}),preparation=createFiniteOwnerPreparationStore({storage:ctx.storage,now:Date.now});
   const sdkPrefix='afw.finite-owner-issuer-provenance.v1:'+id+':',inventoryPrefix='connection-preparation:'+id+':';
   let position='baseline',operation=null,actualPromise=null,actualResult=null,settled=false;
   // These are lexical objects, never fields in a frame/journal/response.
   let consumption=null,consumptionChild=null,consumptionStore=null;
   const readSdk=(suffix)=>{const row=expected.records.sdk.find(([key])=>key===sdkPrefix+suffix);return row?JSON.parse(row[1]):null;};
   function updateAnchor(){
    expected.anchor.inventory=structuredClone(expected.records.inventory);
    expected.anchor.issuer=structuredClone(expected.records.issuer);
    expected.anchor.sdk=structuredClone(expected.records.sdk);
   }
   async function recheckOwned(){
    check();requireEmptyNotice(expected);
    if(actualPromise&&!settled)fail();
    const pendingIssuer=Object.entries(expected.records.issuer.operations).filter(([,v])=>v.send&&!v.ack).map(([k])=>k);
    const pendingSdk=sdkOperations.filter(op=>readSdk(op+':send')&&!readSdk(op+':observed'));
    if(pendingIssuer.length+pendingSdk.length>1)fail();
    if(pendingIssuer.length&&(pendingIssuer[0]!==operation||!['issuer-send','issuer-resolved'].includes(position)))fail();
    if(pendingSdk.length&&(pendingSdk[0]!==operation||!['sdk-send','sdk-resolved'].includes(position)))fail();
    if(position.endsWith('-resolved')&&(!actualPromise||!settled||!actualResult))fail();
    const pair=await wait(observeOwnerPhasePair({ctx,env,parent:originalLease,preconnectionId:id}));
    if(canonical(pair.first)!==canonical(expected)||canonical(pair.second)!==canonical(expected))fail();
    check();
   }
   const fresh=async(promise,record)=>{const result=await wait(promise);if(result?.status!=='recorded'||result.recordHash!==record.recordHash)fail();return result;};
   const sdkAppend=async(kind,record,op=null)=>{
    check();
    const suffix=kind==='Root'?'root':kind==='ExpectedGrant'?'grant':kind==='SdkGrantReference'?'reference':op+(kind==='SdkSend'?':send':':observed');
    if(readSdk(suffix))fail();
    const call=kind==='SdkGrantReference'?sdk.appendSdkReference({preconnectionId:id,record},activeChild):kind==='Root'?sdk.appendRoot(record,clock.lease):kind==='ExpectedGrant'?sdk.appendExpectedGrant({preconnectionId:id,record},clock.lease):kind==='SdkSend'?sdk.appendSend({preconnectionId:id,record},clock.lease):sdk.appendObserved({preconnectionId:id,operation:op,record},clock.lease);
    await fresh(call,record);expected.records.sdk.push([sdkPrefix+suffix,sdkEncode(kind,record)]);expected.records.sdk.sort(([a],[b])=>a.localeCompare(b));updateAnchor();
   };
   const api=new OAuthAuthorizationServer({issuer:source.origin,resources:[source.resource],scopesSupported:['afw:project:read','afw:evidence:read'],accessTokenTTL:300,clientIdMetadataDocumentEnabled:false}).getOAuthApi(Object.freeze({OAUTH_KV:alias}));
   const authData=value=>{
    const v=own(value);fields(v,['responseType','clientId','redirectUri','scope','state','codeChallenge','codeChallengeMethod','resource','issuer']);
    if(v.responseType!=='code'||v.clientId!==source.clientId||v.resource!==source.resource||v.issuer!==source.origin||v.codeChallengeMethod!=='S256'||!/^[-_A-Za-z0-9]{43}$/.test(v.codeChallenge)||!issuerScopes(v.scope)||typeof v.state!=='string'||!v.state||v.state.length>4096||typeof v.redirectUri!=='string'||v.redirectUri.length>4096)fail();
    const redirect=new URL(v.redirectUri);if(redirect.protocol!=='https:'||redirect.username||redirect.password||redirect.hash)fail();return v;
   };
   const authHash=v=>digest('afw.finite-owner-sdk-request.v1',authData(v));
   async function sdkCall(op,bindingHash,requestHash,call,resultHash){
    await recheckOwned();if(readSdk(op+':send'))fail();
    operation=op;actualPromise=null;actualResult=null;settled=false;position='sdk-send';
    const send=sdkSeal('SdkSend',{purpose:'afw.finite-owner-sdk-send.v1',rootHash:readSdk('root').recordHash,operation:op,originalRequestId:crypto.randomUUID(),originalRequestHash:requestHash,issuedAt:Date.now(),deadline:clock.end(),bindingHash});
    await sdkAppend('SdkSend',send,op);await recheckOwned();check();
    actualPromise=retain(Promise.resolve().then(()=>{check();return call(send);}));position='sdk-pending';
    actualResult=await wait(actualPromise);settled=true;position='sdk-resolved';await recheckOwned();
    const observed=sdkSeal('SdkObserved',{purpose:'afw.finite-owner-sdk-observed.v1',sendHash:send.recordHash,resultHash:resultHash(actualResult),observedAt:Date.now(),outcome:'resolved'});
    await sdkAppend('SdkObserved',observed,op);position='sdk-observed';await recheckOwned();
    const result=actualResult;if(op!=='sdk_complete'){actualPromise=null;actualResult=null;settled=false;}operation=null;position='settled';return result;
   }
   const issuerAppend=async(kind,record,op=null)=>{
    check();const call=kind==='Reservation'?issuer.appendReservation(record,activeChild):kind==='Send'?issuer.appendSend({preconnectionId:id,record},activeChild):issuer.appendAck({preconnectionId:id,operation:op,record},activeChild);
    await fresh(call,record);
    if(kind==='Reservation')expected.records.issuer.reservation=record;
    else expected.records.issuer.operations[op][kind==='Send'?'send':'ack']=record;
    updateAnchor();
   };
   async function issuerCall(op,window,call){
    await recheckOwned();operation=op;position='issuer-send';actualPromise=null;actualResult=null;settled=false;
    const reservation=expected.records.issuer.reservation,i=reservation.identity;
    if(expected.records.issuer.operations[op].send)fail();
    const send=issuerSeal('Send',{purpose:'afw.finite-preparation-issuer-send.v1',identityHash:i.identityHash,reservationHash:reservation.recordHash,operation:op,requestId:null,requestHash:digest('afw.finite-owner-issuer-request.v1',{identityHash:i.identityHash,operation:op}),issuedAt:Date.now(),deadline:window.deadline});
    await issuerAppend('Send',send,op);await recheckOwned();check();
    actualPromise=retain(Promise.resolve().then(()=>{check();return call();}));position='issuer-pending';
    actualResult=await wait(actualPromise);settled=true;
    const row=op==='consume'?actualResult:actualResult?.status==='applied'?actualResult.row:null;
    if(!row)fail();
    const rowName=({open_fence:'fence',authorization:'consent',consume:'consent',grant:'grant'})[op];if(!rowName)fail();
    expected.issuerRows[rowName]=structuredClone(row);position='issuer-resolved';await recheckOwned();
    const ack=issuerSeal('Ack',{purpose:'afw.finite-preparation-issuer-ack.v1',sendHash:send.recordHash,rowHash:digest('afw.finite-preparation-issuer-row.v1',row),outcome:'applied',observedAt:Date.now()});
    await issuerAppend('Ack',ack,op);position='issuer-ack';await recheckOwned();
    const result=op==='consume'?actualResult:row;actualPromise=null;actualResult=null;settled=false;operation=null;position='settled';return result;
   }
   async function localPreparation(kind,record,call,readBack,rowName,inventorySuffix=null){
    await recheckOwned();const result=await wait(call());
    if(result?.status!=='recorded'||result.recordHash!==prepHash(kind,record))fail();
    const read=await wait(readBack());if(read?.status!=='observed'||prepEncode(kind,read.record)!==prepEncode(kind,record))fail();
    expected.issuerRows[rowName]=structuredClone(record);
    if(inventorySuffix){expected.records.inventory.push([inventoryPrefix+inventorySuffix,prepEncode(kind,record)]);expected.records.inventory.sort(([a],[b])=>a.localeCompare(b));}
    updateAnchor();await recheckOwned();return result;
   }
   const withChild=async action=>clock.child(async(l,until)=>{activeChild=l;try{check();return await action(l,{startedAt:Date.now(),deadline:until});}finally{activeChild=null;}});
   await recheckOwned();
   if(grammar.method==='GET'){
    if(readSdk('root')||expected.records.issuer.reservation)fail();
    const parsed=authData(await wait(api.parseAuthRequest(original))),description=await wait(api.describeConsent(parsed));
    await recheckOwned();
    const root=sdkSeal('Root',{purpose:'afw.finite-owner-issuer-root.v1',preconnectionId:id,capsuleHash:capsule.capsuleHash,enrollmentHash:expected.installed.enrollment.recordHash,sourceRevision:source.sourceRevision,actorId:source.actorId,qaVersionId:source.qaVersionId,mVersionId:received.mVersionId,originalConnectionReceiptHash:expected.installed.receipt.receiptHash,I0:capsule.I0,C0:capsule.C0,C1:capsule.C1,createdAt:Date.now()});
    await sdkAppend('Root',root);await recheckOwned();
    const requestHash=authHash(parsed),transaction=await sdkCall('sdk_begin',requestHash,requestHash,()=>api.beginConsent(parsed),result=>{
     if(typeof result?.handle!=='string'||!/^[-_A-Za-z0-9]{43}$/.test(result.handle)||!(result.headers instanceof Headers))fail();
     return digest('afw.finite-owner-sdk-begin-result.v1',{authorizationHash:sha(result.handle),requestHash});
    });
    const authorizationHash=sha(transaction.handle),at=Date.now();
    // Consent remains original C0/owner expiry; request lifetime controls mutations,
    // not a new duration for the user's independently submitted POST.
    const consentExpiry=new Date(Math.min(capsule.C0,prep.preconnection.expiresAt,identity.expiresAt,prep.preconnection.owner.accessExpiresAt)).toISOString();
    const i=issuerSeal('Identity',{preconnectionId:id,enrollmentHash:expected.installed.enrollment.recordHash,capsuleHash:capsule.capsuleHash,sourceRevision:source.sourceRevision,qaVersionId:source.qaVersionId,actorId:source.actorId,subject:identity.subject,accessRealmHash:realm,projectId:source.project.projectId,projectRevision:source.project.revision,clientId:source.clientId,resource:source.resource,authorizationHash,grantId:crypto.randomUUID(),requestedScopes:parsed.scope,consentExpiresAt:consentExpiry,I0:capsule.I0,C0:capsule.C0,C1:capsule.C1,reservedAt:at});
    await withChild(async(_l,w)=>{const r=issuerSeal('Reservation',{purpose:'afw.finite-preparation-issuer-reservation.v1',identity:i,requestHash,issuedAt:Date.now(),deadline:w.deadline});await issuerAppend('Reservation',r);await recheckOwned();});
    await withChild((l,w)=>issuerCall('open_fence',w,()=>store.openFence({identity:i,window:w},l)));
    await withChild((l,w)=>issuerCall('authorization',w,()=>store.insertAuthorization({identity:i,window:w},l)));
    const link=finiteOwnerAuthorizationLink({preconnectionId:id,authorizationHash,subjectHash,sourceRevision:source.sourceRevision,projectRef:prep.ticket.projectRef,clientId:source.clientId,resource:source.resource,issuedAt:Date.now(),expiresAt:Math.min(prep.preconnection.expiresAt,Date.parse(consentExpiry))});
    await withChild(l=>localPreparation('AuthorizationLink',link,()=>preparation.putAuthorizationLink(link,l),()=>preparation.readAuthorizationLink({authorizationHash},l),'authorization'));
    await recheckOwned();
    const escape=x=>String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    if(typeof description.clientName!=='string'||description.clientName.length>1024)fail();
    const html='<h1>Permitir lectura</h1><p>'+escape(description.clientName)+'</p><form method="post" action="/authorize"><input type="hidden" name="handle" value="'+escape(transaction.handle)+'"><input type="hidden" name="project" value="'+escape(source.project.projectId)+'"><input type="hidden" name="scope" value="afw:project:read">'+(parsed.scope.includes('afw:evidence:read')?'<label><input type="checkbox" name="scope" value="afw:evidence:read"> Compartir observaciones</label>':'')+'<button name="decision" value="approve">Permitir lectura</button></form>';
    const out=new Headers(transaction.headers);out.set('Content-Type','text/html; charset=utf-8');out.set('Cache-Control','no-store');
    if(Buffer.byteLength(html)>16384||[...out].some(([,v])=>v.length>8192))fail();check();return new Response(html,{headers:out});
   }
   const form=grammar.form,i=expected.records.issuer.reservation?.identity,root=readSdk('root');
   if(!i||!root||!readSdk('sdk_begin:observed')||readSdk('sdk_approve:send')||!expected.issuerRows.authorization||!expected.issuerRows.consent||expected.issuerRows.consent.consumed_at!==''||expected.issuerRows.grant||sha(form.get('handle'))!==i.authorizationHash||form.has('project')&&form.get('project')!==i.projectId||form.getAll('scope').some(s=>!i.requestedScopes.includes(s)))fail();
   clock.narrow(Date.parse(i.consentExpiresAt));
   const scopes=form.getAll('scope');
   const approved=await sdkCall('sdk_approve',i.authorizationHash,digest('afw.finite-owner-approved-form.v1',{authorizationHash:i.authorizationHash,scopes}),()=>api.approveConsent(original,form.get('handle'),{scope:scopes}),result=>{
    const actual=authData(result.request);
    if(canonical(actual.scope)!==canonical(scopes)||authHash({...actual,scope:i.requestedScopes})!==readSdk('sdk_begin:send').originalRequestHash||!(result.headers instanceof Headers))fail();
    return authHash(actual);
   });
   const createdAt=new Date().toISOString(),expiresAt=new Date(Math.min(i.C0,Date.parse(i.consentExpiresAt),prep.preconnection.expiresAt,identity.expiresAt)).toISOString();
   const grant=sdkSeal('ExpectedGrant',{purpose:'afw.finite-owner-expected-grant.v1',rootHash:root.recordHash,identityHash:i.identityHash,reservationHash:expected.records.issuer.reservation.recordHash,authorizationHash:i.authorizationHash,grantId:i.grantId,approvedRequestHash:authHash(approved.request),scopes,createdAt,expiresAt});
   await sdkAppend('ExpectedGrant',grant);await recheckOwned();
   await withChild(async(l,w)=>{
    consumptionChild=l;consumptionStore=store;
    consumption=await issuerCall('consume',w,()=>store.consumeAuthorization({identity:i,window:w,consumedAt:createdAt},l));
    if(consumptionChild!==l||consumptionStore!==store||!consumption)fail();
    await issuerCall('grant',w,()=>store.insertReadGrant({identity:i,window:w,consumption,grant:{scopes,createdAt,expiresAt}},l));
    consumption=null;consumptionChild=null;consumptionStore=null;
   });
   const grantLink=finiteOwnerGrantLink({preconnectionId:id,authorizationHash:i.authorizationHash,grantId:i.grantId,grantHash:sha(i.grantId),acceptedAt:Date.now()});
   await withChild(async l=>{
    const linked=await localPreparation('GrantLink',grantLink,()=>preparation.putLink({kind:'grant',record:grantLink},l),()=>preparation.readLink({kind:'grant',preconnectionId:id},l),'grantLink','grant');
    // Only this stack's genuinely new link ACK permits pair allocation.
    if(linked.status!=='recorded'||expected.issuerRows.relation)fail();
    const connectionRef=randomBytes(32).toString('hex'),linkedAt=Date.now();
    const relation=finiteOwnerPreconnectionConnection({preconnectionId:id,connectionRef,grantHash:grantLink.grantHash,linkedAt});
    const connection=finiteOwnerConnectionRef({connectionRef,subject:identity.subject,grantId:i.grantId,clientId:source.clientId,projectId:source.project.projectId,resource:source.resource,issuedAt:linkedAt,expiresAt:Math.min(prep.preconnection.expiresAt,prep.preconnection.owner.accessExpiresAt,identity.expiresAt,Date.parse(expiresAt))});
    await recheckOwned();
    const paired=await wait(preparation.putPreconnectionConnection({relation,connection},l));
    if(paired?.status!=='recorded'||paired.recordHash!==prepHash('PreconnectionConnection',relation))fail();
    const rr=await wait(preparation.readPreconnectionConnection({preconnectionId:id},l)),cr=await wait(preparation.readConnectionRef({connectionRef},l));
    if(rr.status!=='observed'||cr.status!=='observed'||prepEncode('PreconnectionConnection',rr.record)!==prepEncode('PreconnectionConnection',relation)||prepEncode('ConnectionRef',cr.record)!==prepEncode('ConnectionRef',connection))fail();
    qualifyFiniteOwnerConnectionPair({source,identity,pre:prep.preconnection,link:grantLink,grant:{grantId:i.grantId,expiresAt},relation:rr.record,connection:cr.record,observedAt:Date.now()});
    expected.issuerRows.relation=structuredClone(relation);expected.issuerRows.connection=structuredClone(connection);
    expected.records.inventory.push([inventoryPrefix+'connection',prepEncode('PreconnectionConnection',relation)]);expected.records.inventory.sort(([a],[b])=>a.localeCompare(b));updateAnchor();await recheckOwned();
   });
   const completed=await sdkCall('sdk_complete',grant.recordHash,grant.approvedRequestHash,send=>api.completeAuthorization({request:approved.request,userId:i.subject,scope:scopes,metadata:{afwFiniteCleanup:{purpose:'afw.finite-sdk-cleanup-correlation.v1',correlationHash:finiteOwnerSdkCleanupCorrelation({root,expectedGrant:grant,completeSend:send,identity:i})}},props:{applicationGrantId:i.grantId,userId:i.subject,projectId:i.projectId},revokeExistingGrants:false}),result=>{
    if(typeof result?.redirectTo!=='string'||result.redirectTo.length>8192)fail();
    const target=new URL(result.redirectTo),registered=new URL(approved.request.redirectUri);
    if(target.origin!==registered.origin||target.pathname!==registered.pathname||!target.searchParams.get('code'))fail();
    return digest('afw.finite-owner-sdk-complete-result.v1',{redirectHash:sha(result.redirectTo)});
   });
   if(!actualPromise||!settled||actualResult!==completed)fail();
   const summary=await withChild(l=>readPrivateQaFiniteOwnerSdkGrant({ctx,env,preconnectionId:id,parent:originalLease},l));
   await recheckOwned();check();
   const reference=sdkSeal('SdkGrantReference',{purpose:'afw.finite-owner-sdk-reference.v1',...summary,observedAt:Date.now()});
   await withChild(()=>sdkAppend('SdkGrantReference',reference));
   await recheckOwned();if(!actualPromise||!settled||actualResult!==completed)fail();
   actualPromise=null;actualResult=null;settled=false;
   const out=new Headers(approved.headers);out.set('Location',completed.redirectTo);out.set('Cache-Control','no-store');
   if([...out].some(([,v])=>v.length>8192))fail();check();return new Response(null,{status:302,headers:out});
  }));
 }catch{return pending();}finally{if(onAbort)originalLease.signal.removeEventListener('abort',onAbort);clock?.close();}
}

/** UNMOUNTED fixed GET. Only this invocation can retain its own SQL result. */
export async function handlePrivateQaFiniteOwnerNoticeGet({request,env,ctx},originalLease){
 let clock,onAbort;
 try{
  if(arguments.length!==2)fail();fields(arguments[0],['request','env','ctx']);if(!(request instanceof Request))fail();
  if(readFiniteOwnerRequestContext(originalLease).root!==originalLease)fail();
  return await observeFiniteOwnerRequestWork({ctx,env,originalLease},()=>finiteNativeOperation(originalLease,ctx,async firstFailure=>{
   const received=readFiniteOwnerNoticeGetMetadata(request.headers);
   const issuerCapture=captureFinitePreparationIssuerContext({ctx,env});
   const alias=env.AFW_FINITE_OWNER_OAUTH_KV,methods={get:alias?.get,put:alias?.put,delete:alias?.delete,list:alias?.list};
   const db=env.RELEASE_DB,dbPrepare=db?.prepare,node=env.AFW_RELEASE_EVENTS_NODE,nodeMethods={idFromName:node?.idFromName,idFromString:node?.idFromString,get:node?.get};
   const self=env.AFW_INDEPENDENT_CLOSURE,selfGet=self?.get,metadata=env.AFW_QA_VERSION,reader=env.AFW_MCP_CLOSURE_READ_TOKEN,publisher=env.AFW_MCP_CLOSURE_PUBLISH_TOKEN,fetcher=globalThis.fetch;
   const headers=request.headers,signal=request.signal,url=request.url,method=request.method,headerBytes=canonical([...headers]);
   if([...Object.values(methods),...Object.values(nodeMethods),dbPrepare,selfGet].some(v=>typeof v!=='function'))fail();
   let identity=null,activeChild=null;
   const holders=()=>{
    current(originalLease);issuerCapture.holders();
    if(env.AFW_FINITE_OWNER_OAUTH_KV!==alias||Object.keys(methods).some(k=>alias[k]!==methods[k])||env.RELEASE_DB!==db||db.prepare!==dbPrepare||env.AFW_RELEASE_EVENTS_NODE!==node||Object.keys(nodeMethods).some(k=>node[k]!==nodeMethods[k])||env.AFW_INDEPENDENT_CLOSURE!==self||self.get!==selfGet||env.AFW_QA_VERSION!==metadata||env.AFW_MCP_CLOSURE_READ_TOKEN!==reader||env.AFW_MCP_CLOSURE_PUBLISH_TOKEN!==publisher||globalThis.fetch!==fetcher||request.headers!==headers||request.signal!==signal||request.url!==url||request.method!==method||canonical([...headers])!==headerBytes)fail();
    if(identity&&Date.now()>=identity.expiresAt)fail();
   };
   clock=createFiniteInitialLease(readFiniteOwnerRequestDeadline(originalLease),readFiniteOwnerRequestDeadline(originalLease),holders,fail);
   onAbort=()=>clock.close();originalLease.signal.addEventListener('abort',onAbort,{once:true});
   const check=()=>{current(clock.lease);if(activeChild)current(activeChild);};
   const wait=async promise=>{check();const result=await clock.wait(retain(promise),activeChild??clock.lease);check();return result;};
   const bytes=await wait(finiteNativeBytes(request,check,firstFailure));check();
   const original=new Request(received.url,{method:received.method,headers,body:bytes.length?bytes:undefined,signal:originalLease.signal});
   qualifyFiniteOwnerNoticeGetRequest(original,bytes);
   const baseline=await wait(observeOwnerPhasePair({ctx,env,parent:originalLease})),context=qualifySettledOwnerPair(baseline);
   if(context.source.phase!=='read_consent'||received.mVersionId!==context.source.currentPublication.versionId||!baseline.second.noticeRows.schema)fail();
   const expected=structuredClone(baseline.second),source=context.source,id=context.preconnectionId;
   const capsule=expected.anchor.anchors.capsule,prep=expected.preparation;
   clock.narrow(Math.min(capsule.C0,prep.preconnection.expiresAt,prep.preconnection.owner.accessExpiresAt,prep.approval.expiresAt));
   const verified=await wait(verifyCloudflareAccessJwtWithExpiry({token:original.headers.get('Cf-Access-Jwt-Assertion'),teamDomain:source.access.teamDomain,audience:source.access.audience}));
   if(!verified.ok)fail();identity=verified.identity;clock.narrow(identity.expiresAt);
   const rawCookies=(original.headers.get('Cookie')??'').split(';').map(s=>s.trim()),cookie=rawCookies.filter(s=>s.startsWith('__Host-afw-finite-prepare='));
   if(cookie.length!==1||!/^__Host-afw-finite-prepare=[a-f0-9]{64}$/.test(cookie[0])||sha(cookie[0].slice('__Host-afw-finite-prepare='.length))!==prep.ticket.ticketHash)fail();
   const realm=evidence('realm',{...source.access,origin:source.origin}),subjectHash=evidence('subject',{accessRealmHash:realm,subject:identity.subject});
   qualifyFiniteOwnerApprovedTicket({source,identity,currentTicket:prep.ticket,ticket:prep.ticket,use:prep.ticketUse,pre:prep.preconnection,approval:prep.approval,snapshot:prep.sourceSnapshot,realm,subjectHash,observedAt:Date.now()});
   if(identity.subject!==expected.anchor.anchors.material.ownerSelection.subject||identity.subject!==expected.records.issuer.reservation?.identity.subject)fail();
   const issuer=expected.records.issuer,rows=expected.issuerRows,i=issuer.reservation?.identity;
   if(!i||!rows.grant||!rows.authorization||!rows.grantLink||!rows.relation||!rows.connection||issuer.operations.grant.ack?.outcome!=='applied')fail();
   const sdkPrefix='afw.finite-owner-issuer-provenance.v1:'+id+':';
   const sdkNames=new Set(expected.records.sdk.map(([key])=>key));
   if(!['root','grant','sdk_begin:observed','sdk_approve:observed','sdk_complete:observed'].every(k=>sdkNames.has(sdkPrefix+k)))fail();
   if(rawCookies.some(v=>v.startsWith('__Host-afw-monitoring-owner=')))fail();
   const accessExpiresAt=Math.min(identity.expiresAt,prep.preconnection.owner.accessExpiresAt,i.C0),preconnectionExpiresAt=prep.preconnection.expiresAt;
   const permissionCeiling=Math.min(accessExpiresAt,preconnectionExpiresAt,prep.approval.expiresAt,rows.connection.expiresAt,i.C0,Date.parse(i.consentExpiresAt),Date.parse(rows.grant.expires_at));
   clock.narrow(permissionCeiling);
   const at=Date.now(),handle=randomBytes(32).toString('base64url'),expiresAt=Math.min(at+600000,permissionCeiling);
   if(expiresAt<=at)fail();
   const ticket={handleHash:sha(handle),requestId:crypto.randomUUID(),expectedSequence:0,issuedAt:at,expiresAt,permissionExpiresAt:expiresAt};
   const expectedGrant={scopes:JSON.parse(rows.grant.scopes_json),createdAt:rows.grant.created_at,expiresAt:rows.grant.expires_at},consumedAt=rows.consent.consumed_at;
   const journal=noticeJournal({ctx,env}),store=createFinitePreparationIssuerStore({ctx,env});
   let position='baseline',operation=null,actualPromise=null,actualResult=null,settled=false,ownedReservation=null,ownedSend=null;
   const anchor=()=>{expected.anchor.notice=structuredClone(expected.records.notice);};
   async function recheckNoticeGetOwned(){
    check();
    if(actualPromise&&!settled)fail();
    for(const v of Object.values(expected.records.issuer.operations))if(v.send&&!v.ack||v.ack&&!v.send)fail();
    const names=new Set(expected.records.sdk.map(([key])=>key));
    for(const [key]of expected.records.sdk)if(key.endsWith(':send')&&!names.has(key.slice(0,-4)+'observed'))fail();
    const n=expected.records.notice;
    if(n.freeze||n.operations.consent.send||n.operations.consent.ack)fail();
    if(position==='baseline'){requireEmptyNotice(expected);if(ownedReservation||ownedSend||operation)fail();}
    else{
     if(!ownedReservation||canonical(n.reservation)!==canonical(ownedReservation))fail();
     if(position!=='reservation-recorded'){
      if(operation!=='ticket'||!ownedSend||canonical(n.operations.ticket.send)!==canonical(ownedSend)||ownedSend.reservationHash!==ownedReservation.recordHash)fail();
      if(['ticket-sql-resolved','ticket-ack-recorded'].includes(position)&&(!actualPromise||!settled||actualResult?.status!=='applied'||canonical(actualResult.row)!==canonical(expectedNoticeTicket(i,ticket))))fail();
     }
    }
    const pair=await wait(observeOwnerPhasePair({ctx,env,parent:originalLease,preconnectionId:id}));
    if(canonical(pair.first)!==canonical(expected)||canonical(pair.second)!==canonical(expected))fail();
    check();
   }
   await recheckNoticeGetOwned();
   await clock.child((l)=>retain((async()=>{
    activeChild=l;check();
    const record=noticeSeal('Reservation',{purpose:'afw.finite-preparation-notice-reservation.v1',identity:i,issuerReservationHash:issuer.reservation.recordHash,originalGrantAckHash:issuer.operations.grant.ack.recordHash,grantLinkHash:prepHash('GrantLink',rows.grantLink),connectionHash:prepHash('ConnectionRef',rows.connection),expectedGrant,consumedAt,accessExpiresAt,preconnectionExpiresAt,ticket,issuedAt:Date.now()});
    const appendPromise=retain(journal.appendReservation(record,l)),appendResult=await wait(appendPromise);
    if(appendResult?.status!=='recorded'||appendResult.recordHash!==record.recordHash)fail();
    ownedReservation=record;expected.records.notice.reservation=structuredClone(record);anchor();position='reservation-recorded';
    await recheckNoticeGetOwned();activeChild=null;
   })()));
   await clock.child((l,deadline)=>retain((async()=>{
    activeChild=l;check();
    const window={startedAt:Date.now(),deadline:Math.min(deadline,permissionCeiling)};
    const common={identity:i,expectedGrant,consumedAt,accessExpiresAt,preconnectionExpiresAt,window};
    const send=noticeSeal('Send',{purpose:'afw.finite-preparation-notice-send.v1',identityHash:i.identityHash,reservationHash:ownedReservation.recordHash,operation:'ticket',requestHash:digest('afw.finite-preparation-notice-request.v1',{operation:'ticket',common,ticket,decisionHash:null}),accessExpiresAt,window,issuedAt:Date.now(),decisionHash:null});
    const appendSendPromise=retain(journal.appendSend({preconnectionId:id,record:send},l)),appendSendResult=await wait(appendSendPromise);
    if(appendSendResult?.status!=='recorded'||appendSendResult.recordHash!==send.recordHash)fail();
    ownedSend=send;operation='ticket';expected.records.notice.operations.ticket.send=structuredClone(send);anchor();position='ticket-send-recorded';await recheckNoticeGetOwned();check();
    position='ticket-sql-pending';settled=false;
    actualPromise=retain(store.insertMonitoringTicket({...common,ticket},l));
    actualResult=await wait(actualPromise);settled=true;
    if(actualResult?.status!=='applied'||canonical(actualResult.row)!==canonical(expectedNoticeTicket(i,ticket)))fail();
    expected.noticeRows.tickets=[structuredClone(actualResult.row)];position='ticket-sql-resolved';await recheckNoticeGetOwned();check();
    const ack=noticeSeal('Ack',{purpose:'afw.finite-preparation-notice-ack.v1',sendHash:ownedSend.recordHash,outcome:'applied',rowHash:digest('afw.finite-preparation-notice-row.v1',actualResult.row),sequence:null,observedAt:Date.now()});
    const appendAckPromise=retain(journal.appendAck({preconnectionId:id,operation:'ticket',record:ack},l)),appendAckResult=await wait(appendAckPromise);
    if(appendAckResult?.status!=='recorded'||appendAckResult.recordHash!==ack.recordHash)fail();
    expected.records.notice.operations.ticket.ack=structuredClone(ack);anchor();position='ticket-ack-recorded';await recheckNoticeGetOwned();activeChild=null;
   })()));
   check();
   const maxAge=Math.floor((ticket.expiresAt-Date.now())/1000);if(maxAge<1)fail();
   const escaped=handle.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),nonce=randomBytes(18).toString('base64url');
   const html='<!doctype html><html lang="es"><meta charset="utf-8"><title>Preparación de avisos</title><body><h1>Preparación de avisos</h1><p>Podés registrar un permiso temporal para avisos sobre este expediente. No cambia datos ni publica. El permiso vence en la fecha indicada. Registrar el permiso no confirma una suscripción, entrega ni revisión del asistente.</p><p>El permiso vence: '+new Date(ticket.permissionExpiresAt).toISOString()+'</p><form method="post" action="/monitoring/grant"><input type="hidden" name="handle" value="'+escaped+'"><button type="submit">Permitir avisos temporales</button></form><a href="https://agentfriendlyweb.dev/expediente">Volver al expediente</a></body></html>';
   check();return new Response(html,{status:200,headers:{'Content-Type':'text/html; charset=UTF-8','Cache-Control':'no-store','Referrer-Policy':'same-origin','X-Content-Type-Options':'nosniff','Content-Security-Policy':"default-src 'none'; script-src 'nonce-"+nonce+"'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'",'Set-Cookie':'__Host-afw-monitoring-owner='+handle+'; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age='+maxAge}});
  }));
 }catch{return pending();}finally{if(onAbort)originalLease.signal.removeEventListener('abort',onAbort);clock?.close();}
}

/** UNMOUNTED fixed human POST. Native SQL continuation never leaves this stack. */
export async function handlePrivateQaFiniteOwnerNoticeConsent({request,env,ctx},originalLease){
 let clock,onAbort;
 try{
  if(arguments.length!==2)fail();fields(arguments[0],['request','env','ctx']);if(!(request instanceof Request))fail();
  if(readFiniteOwnerRequestContext(originalLease).root!==originalLease)fail();
  return await observeFiniteOwnerRequestWork({ctx,env,originalLease},()=>finiteNativeOperation(originalLease,ctx,async signalFailure=>{
   let failed=false;const firstFailure=error=>{failed=true;signalFailure(error);};
   const received=readFiniteOwnerNoticeConsentMetadata(request.headers);
   const issuerCapture=captureFinitePreparationIssuerContext({ctx,env});
   const alias=env.AFW_FINITE_OWNER_OAUTH_KV,methods={get:alias?.get,put:alias?.put,delete:alias?.delete,list:alias?.list};
   const db=env.RELEASE_DB,dbPrepare=db?.prepare,node=env.AFW_RELEASE_EVENTS_NODE,nodeMethods={idFromName:node?.idFromName,idFromString:node?.idFromString,get:node?.get};
   const self=env.AFW_INDEPENDENT_CLOSURE,selfGet=self?.get,metadata=env.AFW_QA_VERSION,reader=env.AFW_MCP_CLOSURE_READ_TOKEN,publisher=env.AFW_MCP_CLOSURE_PUBLISH_TOKEN,fetcher=globalThis.fetch;
   const headers=request.headers,signal=request.signal,url=request.url,method=request.method,headerBytes=canonical([...headers]);
   if([...Object.values(methods),...Object.values(nodeMethods),dbPrepare,selfGet].some(v=>typeof v!=='function'))fail();
   let identity=null,activeChild=null;
   const holders=()=>{
    current(originalLease);issuerCapture.holders();
    if(env.AFW_FINITE_OWNER_OAUTH_KV!==alias||Object.keys(methods).some(k=>alias[k]!==methods[k])||env.RELEASE_DB!==db||db.prepare!==dbPrepare||env.AFW_RELEASE_EVENTS_NODE!==node||Object.keys(nodeMethods).some(k=>node[k]!==nodeMethods[k])||env.AFW_INDEPENDENT_CLOSURE!==self||self.get!==selfGet||env.AFW_QA_VERSION!==metadata||env.AFW_MCP_CLOSURE_READ_TOKEN!==reader||env.AFW_MCP_CLOSURE_PUBLISH_TOKEN!==publisher||globalThis.fetch!==fetcher||request.headers!==headers||request.signal!==signal||request.url!==url||request.method!==method||canonical([...headers])!==headerBytes)fail();
    if(identity&&Date.now()>=identity.expiresAt)fail();
   };
   clock=createFiniteInitialLease(readFiniteOwnerRequestDeadline(originalLease),readFiniteOwnerRequestDeadline(originalLease),holders,fail);
   onAbort=()=>clock.close();originalLease.signal.addEventListener('abort',onAbort,{once:true});
   const check=()=>{if(failed)fail();try{current(clock.lease);if(activeChild)current(activeChild);}catch(error){failed=true;throw error;}};
   const wait=async promise=>{try{check();const result=await clock.wait(retain(promise),activeChild??clock.lease);check();return result;}catch(error){failed=true;throw error;}};
   const bytes=await wait(readFiniteOwnerNoticeConsentBody(request,check,firstFailure));check();
   const original=new Request(received.url,{method:received.method,headers,body:bytes.length?bytes:undefined,signal:originalLease.signal});
   const input=qualifyFiniteOwnerNoticeConsentRequest(original,bytes);
   const baseline=await wait(observeOwnerPhasePair({ctx,env,parent:originalLease})),context=qualifyNoticeConsentBaseline(baseline);
   if(context.source.phase!=='read_consent'||received.mVersionId!==context.source.currentPublication.versionId||!baseline.second.noticeRows.schema)fail();
   const expected=structuredClone(baseline.second),source=context.source,id=context.preconnectionId;
   const capsule=expected.anchor.anchors.capsule,prep=expected.preparation;
   clock.narrow(Math.min(capsule.C0,prep.preconnection.expiresAt,prep.preconnection.owner.accessExpiresAt,prep.approval.expiresAt));
   const verified=await wait(verifyCloudflareAccessJwtWithExpiry({token:original.headers.get('Cf-Access-Jwt-Assertion'),teamDomain:source.access.teamDomain,audience:source.access.audience}));
   if(!verified.ok)fail();identity=verified.identity;clock.narrow(identity.expiresAt);
   const rawCookies=(original.headers.get('Cookie')??'').split(';').map(s=>s.trim()),cookie=rawCookies.filter(s=>s.startsWith('__Host-afw-finite-prepare='));
   if(cookie.length!==1||!/^__Host-afw-finite-prepare=[a-f0-9]{64}$/.test(cookie[0])||sha(cookie[0].slice('__Host-afw-finite-prepare='.length))!==prep.ticket.ticketHash)fail();
   const realm=evidence('realm',{...source.access,origin:source.origin}),subjectHash=evidence('subject',{accessRealmHash:realm,subject:identity.subject});
   qualifyFiniteOwnerApprovedTicket({source,identity,currentTicket:prep.ticket,ticket:prep.ticket,use:prep.ticketUse,pre:prep.preconnection,approval:prep.approval,snapshot:prep.sourceSnapshot,realm,subjectHash,observedAt:Date.now()});
   if(identity.subject!==expected.anchor.anchors.material.ownerSelection.subject||identity.subject!==expected.records.issuer.reservation?.identity.subject)fail();
   const issuer=expected.records.issuer,rows=expected.issuerRows,i=issuer.reservation?.identity;
   if(!i||!rows.grant||!rows.authorization||!rows.grantLink||!rows.relation||!rows.connection||issuer.operations.grant.ack?.outcome!=='applied')fail();
   const sdkPrefix='afw.finite-owner-issuer-provenance.v1:'+id+':';
   const sdkNames=new Set(expected.records.sdk.map(([key])=>key));
   if(!['root','grant','sdk_begin:observed','sdk_approve:observed','sdk_complete:observed'].every(k=>sdkNames.has(sdkPrefix+k)))fail();
   if(identity.subject!==rows.connection.subject)fail();
   const reservation=expected.records.notice.reservation,ticket=reservation.ticket;
   const monitoring=rawCookies.filter(v=>v.startsWith('__Host-afw-monitoring-owner='));
   if(monitoring.length!==1||!/^__Host-afw-monitoring-owner=[A-Za-z0-9_-]{43}$/.test(monitoring[0])||sha(monitoring[0].slice('__Host-afw-monitoring-owner='.length))!==ticket.handleHash||sha(input.handle)!==ticket.handleHash)fail();
   const accessExpiresAt=Math.min(reservation.accessExpiresAt,prep.preconnection.owner.accessExpiresAt,identity.expiresAt,i.C0);
   if(ticket.expiresAt>accessExpiresAt)fail();
   const permissionCeiling=Math.min(accessExpiresAt,reservation.preconnectionExpiresAt,prep.approval.expiresAt,rows.connection.expiresAt,i.C0,Date.parse(i.consentExpiresAt),Date.parse(rows.grant.expires_at),ticket.permissionExpiresAt);
   clock.narrow(permissionCeiling);
   const journal=noticeJournal({ctx,env}),store=createFinitePreparationIssuerStore({ctx,env}),preparationStore=createFiniteOwnerPreparationStore({storage:issuerCapture.storage,now:Date.now});
   let position='baseline',witness=null,ownSend=null,ownAck=null,actualSqlPromise=null,actualSqlResult=null,sqlSettled=false;
   let ownedNoticeLink=null,linkPromise=null,linkResult=null,linkSyncPromise=null,linkReadPromise=null,linkReadResult=null,linkSynced=false,linkSettled=false;
   const anchor=()=>{expected.anchor.notice=structuredClone(expected.records.notice);};
   async function recheckConsentOwned(){
    check();
    if(!['baseline','ticket-observed','consent-send-recorded','consent-sql-resolved','consent-ack-recorded','notice-link-recorded'].includes(position)||actualSqlPromise&&!sqlSettled)fail();
    for(const v of Object.values(expected.records.issuer.operations))if(v.send&&!v.ack||v.ack&&!v.send)fail();
    const names=new Set(expected.records.sdk.map(([key])=>key));
    for(const [key]of expected.records.sdk)if(key.endsWith(':send')&&!names.has(key.slice(0,-4)+'observed'))fail();
    const n=expected.records.notice;
    if(n.freeze||canonical(n.reservation)!==canonical(reservation)||n.operations.ticket.ack?.outcome!=='applied')fail();
    if(position==='baseline'||position==='ticket-observed'){
     if(ownSend||ownAck||actualSqlPromise||n.operations.consent.send||n.operations.consent.ack||expected.noticeRows.events.length||expected.preparation.noticeLink)fail();
    }else{
     if(!witness||!ownSend||canonical(n.operations.consent.send)!==canonical(ownSend))fail();
     if(position==='consent-send-recorded'&&(actualSqlPromise||expected.noticeRows.events.length||n.operations.consent.ack))fail();
     if(['consent-sql-resolved','consent-ack-recorded','notice-link-recorded'].includes(position)){
      if(!actualSqlPromise||!sqlSettled||actualSqlResult?.status!=='applied'||canonical(expected.noticeRows.events)!==canonical([actualSqlResult.row]))fail();
      qualifyNoticeConsentEvent(actualSqlResult.row,i,ticket,ownSend);
     }
     if(['consent-ack-recorded','notice-link-recorded'].includes(position)){
      if(!ownAck||ownAck.sendHash!==ownSend.recordHash||ownAck.rowHash!==digest('afw.finite-preparation-notice-row.v1',actualSqlResult.row)||ownAck.sequence!==actualSqlResult.row.sequence||canonical(ownAck)!==canonical(n.operations.consent.ack))fail();
     }else if(ownAck||n.operations.consent.ack)fail();
     if(position==='notice-link-recorded'){
      if(!ownedNoticeLink||!linkPromise||linkResult?.status!=='recorded'||linkResult.recordHash!==prepHash('NoticeLink',ownedNoticeLink)||!linkSyncPromise||!linkSynced||!linkReadPromise||linkReadResult?.status!=='observed'||!linkSettled||prepEncode('NoticeLink',linkReadResult.record)!==prepEncode('NoticeLink',ownedNoticeLink)||canonical(expected.preparation.noticeLink)!==canonical(ownedNoticeLink))fail();
     }else if(expected.preparation.noticeLink||ownedNoticeLink||linkPromise)fail();
    }
    const pair=await wait(observeOwnerPhasePair({ctx,env,parent:originalLease,preconnectionId:id}));
    if(canonical(pair.first)!==canonical(expected)||canonical(pair.second)!==canonical(expected))fail();
    check();
   }
   await recheckConsentOwned();
   await clock.child((l,deadline)=>retain((async()=>{
    activeChild=l;check();
    const window={startedAt:Date.now(),deadline:Math.min(deadline,permissionCeiling)};
    const common={identity:reservation.identity,expectedGrant:reservation.expectedGrant,consumedAt:reservation.consumedAt,accessExpiresAt,preconnectionExpiresAt:reservation.preconnectionExpiresAt,window};
    witness=await wait(store.observeMonitoringTicket({...common,ticket},l));
    if(witness?.status!=='observed'||canonical(witness.row)!==canonical(expected.noticeRows.tickets[0]))fail();
    position='ticket-observed';await recheckConsentOwned();check();
    const again=await wait(verifyCloudflareAccessJwtWithExpiry({token:original.headers.get('Cf-Access-Jwt-Assertion'),teamDomain:source.access.teamDomain,audience:source.access.audience}));
    if(!again.ok||again.identity.subject!==identity.subject||again.identity.expiresAt!==identity.expiresAt)fail();
    check();const issuedAt=Date.now(),decisionHash=digest('afw.finite-preparation-notice-decision.v1',{identityHash:i.identityHash,ticketRequestId:ticket.requestId,handleHash:ticket.handleHash,method:'POST',path:'/monitoring/grant',action:'grant',issuedAt});
    const send=noticeSeal('Send',{purpose:'afw.finite-preparation-notice-send.v1',identityHash:i.identityHash,reservationHash:reservation.recordHash,operation:'consent',requestHash:digest('afw.finite-preparation-notice-request.v1',{operation:'consent',common,ticket,decisionHash}),accessExpiresAt,window,issuedAt,decisionHash});
    const appendSendPromise=retain(journal.appendSend({preconnectionId:id,record:send},l)),appendSendResult=await wait(appendSendPromise);
    if(appendSendResult?.status!=='recorded'||appendSendResult.recordHash!==send.recordHash)fail();
    ownSend=send;expected.records.notice.operations.consent.send=structuredClone(send);anchor();position='consent-send-recorded';
    await recheckConsentOwned();check();
    position='consent-sql-pending';sqlSettled=false;
    actualSqlPromise=retain(store.insertMonitoringConsent({...common,ticketWitness:witness},l));
    actualSqlResult=await wait(actualSqlPromise);sqlSettled=true;
    if(actualSqlResult?.status!=='applied')fail();qualifyNoticeConsentEvent(actualSqlResult.row,i,ticket,ownSend);
    expected.noticeRows.events=[structuredClone(actualSqlResult.row)];position='consent-sql-resolved';await recheckConsentOwned();check();
    const ack=noticeSeal('Ack',{purpose:'afw.finite-preparation-notice-ack.v1',sendHash:ownSend.recordHash,outcome:'applied',rowHash:digest('afw.finite-preparation-notice-row.v1',actualSqlResult.row),sequence:actualSqlResult.row.sequence,observedAt:Date.now()});
    const appendAckPromise=retain(journal.appendAck({preconnectionId:id,operation:'consent',record:ack},l)),appendAckResult=await wait(appendAckPromise);
    if(appendAckResult?.status!=='recorded'||appendAckResult.recordHash!==ack.recordHash)fail();
    ownAck=ack;expected.records.notice.operations.consent.ack=structuredClone(ack);anchor();position='consent-ack-recorded';await recheckConsentOwned();
    check();
    if(!actualSqlPromise||!sqlSettled||actualSqlResult?.status!=='applied'||!ownSend||!ownAck||expected.preparation.noticeLink||expected.records.inventory.some(([key])=>key==='connection-preparation:'+id+':notice'))fail();
    const acceptedAt=Date.now();
    if(acceptedAt<Math.max(ownAck.observedAt,actualSqlResult.row.issued_at,rows.grantLink.acceptedAt)||acceptedAt>=Math.min(window.deadline,permissionCeiling,ticket.expiresAt))fail();
    ownedNoticeLink={preconnectionId:id,grantHash:rows.grantLink.grantHash,eventHash:noticeEventHash(actualSqlResult.row),sequence:actualSqlResult.row.sequence,acceptedAt};
    const linkRaw=prepEncode('NoticeLink',ownedNoticeLink),linkHash=prepHash('NoticeLink',ownedNoticeLink);
    position='notice-link-pending';linkSettled=false;
    linkPromise=retain(preparationStore.putLink({kind:'notice',record:ownedNoticeLink},l));linkResult=await wait(linkPromise);
    if(linkResult?.status!=='recorded'||linkResult.recordHash!==linkHash)fail();
    check();linkSyncPromise=retain(Reflect.apply(issuerCapture.sync,issuerCapture.storage,[]));await wait(linkSyncPromise);linkSynced=true;
    check();linkReadPromise=retain(preparationStore.readLink({kind:'notice',preconnectionId:id},l));linkReadResult=await wait(linkReadPromise);
    if(linkReadResult?.status!=='observed'||prepEncode('NoticeLink',linkReadResult.record)!==linkRaw||prepHash('NoticeLink',linkReadResult.record)!==linkHash)fail();
    check();linkSettled=true;
    expected.preparation.noticeLink=structuredClone(ownedNoticeLink);
    const key='connection-preparation:'+id+':notice',at=expected.records.inventory.findIndex(([entry])=>entry>key);
    expected.records.inventory.splice(at<0?expected.records.inventory.length:at,0,[key,linkRaw]);expected.anchor.inventory=structuredClone(expected.records.inventory);
    position='notice-link-recorded';await recheckConsentOwned();check();activeChild=null;
   })()));
   check();
   const html='<!doctype html><html lang="es"><meta charset="utf-8"><title>Decisión temporal</title><body><h1>Registré tu decisión temporal.</h1><p>Esto no confirma que exista una suscripción ni que el asistente haya revisado el expediente.</p><p>El permiso vence: '+new Date(ticket.permissionExpiresAt).toISOString()+'</p><a href="https://agentfriendlyweb.dev/expediente">Volver al expediente</a></body></html>';
   check();return new Response(html,{status:200,headers:{'Content-Type':'text/html; charset=UTF-8','Cache-Control':'no-store','Referrer-Policy':'same-origin','X-Content-Type-Options':'nosniff','Content-Security-Policy':"default-src 'none'; frame-ancestors 'none'; base-uri 'none'; form-action 'none'",'Set-Cookie':'__Host-afw-monitoring-owner=; Path=/; Secure; HttpOnly; SameSite=Strict; Max-Age=0'}});
  }));
 }catch{return pending();}finally{if(onAbort)originalLease.signal.removeEventListener('abort',onAbort);clock?.close();}
}
