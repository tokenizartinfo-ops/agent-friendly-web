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
export async function readPrivateQaFiniteOwnerContext(options){
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
  const actorId=Reflect.apply(toString,actor,[]),expected=readFiniteQaBootstrapSourceExpectations(),resident=readPrivateQaFiniteCandidate();
  const qaNamespaceId=finitePublicProfileTemplate('qaLive').bindings.find(b=>b.name==='AFW_INDEPENDENT_CLOSURE').namespace_id;
  if(!hex(actorId)||Reflect.apply(idFromName,self,[SLOT]).toString()!==actorId||resident.sourceRevision!==expected.sourceRevision||resident.sourceTree!==expected.sourceTree)fail();
  const holders=()=>{
   current(parent);
   if(options.ctx!==ctx||options.env!==env||options.parent!==parent||(options.preconnectionId??null)!==requested||parent.signal!==signal||parent.assertCurrent!==assertCurrent||readFiniteOwnerRequestDeadline(parent)!==deadline||readFiniteOwnerRequestContext(parent).root!==root||
    ctx.storage!==storage||storage.get!==get||storage.list!==list||storage.getAlarm!==getAlarm||storage.transaction!==transaction||storage.sync!==sync||ctx.id!==actor||actor.toString!==toString||Reflect.apply(toString,actor,[])!==actorId||
    env.AFW_INDEPENDENT_CLOSURE!==self||self.idFromName!==idFromName||self.get!==namespaceGet||Reflect.apply(idFromName,self,[SLOT]).toString()!==actorId||env.RELEASE_DB!==db||db.prepare!==prepare||db.withSession!==withSession||
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
    for(const k of inventory.keys())if(!['record','source','connection:approval','grant','connection'].some(s=>k===prefix+s))fail();
    for(const k of enrollment.keys())if(!['enrollment','ack'].some(s=>k==='afw.finite-preparation-cleanup.v1:'+s))fail();
    const issuer=await child(l=>createFinitePreparationIssuerJournal({ctx,env}).read({preconnectionId:capsule.preconnectionId},l));
    return {capsule,material,plan,a,inventory,effects,enrollment,issuer,anchor:canonical({anchors:a,backupRaw,inventory:[...inventory],effects:[...effects],enrollment:[...enrollment],issuer})};
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
   const credentials=async()=>{
    for(const [token,id,expiresAt]of [[reader,plan.readerId,plan.readerExpiresAt],[publisher,plan.publisherId,plan.publisherExpiresAt]]){
     const v=finiteCfEnvelope((await request('/tokens/verify',8192,token)).value);fields(v,['id','status','expires_on',...Object.hasOwn(v,'not_before')?['not_before']:[]]);
     if(v.id!==id||v.status!=='active'||Date.parse(v.expires_on)!==expiresAt||Date.parse(v.expires_on)<=Date.now()||v.not_before!=null&&(!Number.isSafeInteger(Date.parse(v.not_before))||Date.parse(v.not_before)>Date.now()))fail();
    }
   };
   const primary=async()=>{
    await credentials();
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
    return {project,pointer,currentConfiguration,initialBaseline:{versionId:capsule.activatedVersionId,deploymentId:capsule.activatedDeploymentId,moduleHash:sha(resident.bytes),configurationHash:finiteActivationConfigurationHash(plan.configuration),bindingsHash:finiteInitialCapsuleBindingsHash(configuration.bindings)}};
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
     if(v.send&&!v.ack||v.ack&&!v.send||['close_fence','revoke_grant'].includes(op)&&(v.send||v.ack)||v.ack?.observedAt>Date.now())fail();
    }
    const ops=issuer.operations,expectedFence={preconnection_id:id,authorization_hash:i.authorizationHash,grant_id:i.grantId,enrollment_hash:i.enrollmentHash,identity_hash:i.identityHash,reserved_at:i.reservedAt,forward_until:i.C0,cleanup_until:i.C1,fence_request_id:null,fenced_at:null};
    if(fence&&canonical(fence)!==canonical(expectedFence))fail();
    const consent=await select('SELECT handle_hash,user_id,kind,project_id,client_id,resource,scopes_json,expires_at,consumed_at FROM delegated_consent_sessions WHERE handle_hash=?',[i.authorizationHash]);
    const grant=await select('SELECT id,user_id,client_id,project_id,resource,scopes_json,created_at,expires_at,revoked_at,exchanged_at FROM delegated_access_grants WHERE id=?',[i.grantId]);
    const authorization=await getRecord('readAuthorizationLink',{authorizationHash:i.authorizationHash},false);
    const rowAck=(op,row)=>{const v=ops[op];if(!v.send){if(row)fail();return;}if(v.ack.outcome==='no_mutation'){if(v.ack.rowHash!==null||row)fail();return;}if(!row||v.ack.rowHash!==digest('afw.finite-preparation-issuer-row.v1',row))fail();};
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
     if(!consent?.consumed_at||!authorization||grant.id!==i.grantId||grant.user_id!==i.subject||grant.client_id!==i.clientId||grant.project_id!==i.projectId||grant.resource!==i.resource||!Array.isArray(scopes)||scopes[0]!=='afw:project:read'||new Set(scopes).size!==scopes.length||scopes.some(s=>!i.requestedScopes.includes(s))||JSON.stringify(scopes)!==grant.scopes_json||grant.revoked_at!==''||!iso(grant.created_at)||!iso(grant.expires_at)||grant.exchanged_at!==''&&(!iso(grant.exchanged_at)||Date.parse(grant.exchanged_at)>Date.now())||Date.parse(grant.created_at)<Date.parse(consent.consumed_at)||Date.parse(grant.created_at)>Date.now()||Date.parse(grant.expires_at)>Math.min(i.C0,Date.parse(consent.expires_at),data.preconnection.expiresAt))fail();
     clock.narrow(Date.parse(grant.expires_at));
    }
    rowAck('grant',grant);
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
   const qualify=async(f,actual)=>{
    const store=createFiniteOwnerPreparationStore({storage,now:Date.now}),id=capsule.preconnectionId,prefix='connection-preparation:'+id+':';
    const getRecord=async(method,arg,required=true)=>{const v=await child(l=>store[method](arg,l));if(v.status==='absent'&&!required)return null;if(v.status!=='observed')fail();return v.record;};
    const data={};
    if(f.inventory.size){
     data.sourceSnapshot=await getRecord('readOwnerSourceSnapshot',{preconnectionId:id});
     if(data.sourceSnapshot.preconnectionId!==id||canonical(data.sourceSnapshot.source)!==canonical(source))fail();
     data.ticket=await getRecord('readTicket',{ticketHash:data.sourceSnapshot.initialTicketHash});
     data.projectRef=await getRecord('readProjectRef',{projectRef:data.ticket.projectRef});
     const t=data.ticket,map=data.projectRef,realm=evidence('realm',{...source.access,origin:source.origin}),subject=evidence('subject',{accessRealmHash:realm,subject:p.subject});
     if(t.ticketHash!==data.sourceSnapshot.initialTicketHash||t.preconnectionId!==id||t.sourceRevision!==source.sourceRevision||t.action!=='connection'||t.connectionRef!==null||t.subjectHash!==subject||map.preconnectionId!==id||map.projectRef!==t.projectRef||map.sourceRevision!==source.sourceRevision||map.projectId!==source.project.projectId||map.revision!==source.project.revision||map.subjectHash!==subject||t.expiresAt>map.expiresAt||t.createdAt<source.window.startedAt||t.expiresAt>capsule.C0||Date.now()>=Math.min(t.expiresAt,map.expiresAt))fail();
     data.preconnection=await getRecord('readPreconnection',{preconnectionId:id},false);
     if(data.preconnection){
      data.stageApproval=await getRecord('readStageApproval',{preconnectionId:id,stage:'connection'});
      data.approval=await getRecord('readConfigurationApproval',{approvalHash:data.stageApproval.approvalHash});
      data.ticketUse=await getRecord('readTicketUse',{ticketHash:t.ticketHash});
      const pre=data.preconnection,sa=data.stageApproval,a=data.approval,use=data.ticketUse;
      const decision=evidence('decision',{ticket:t,decision:'approve',projectHash:a.projectHash,goal:source.goal,clientId:source.clientId,approvedAt:a.approvedAt,expiresAt:a.expiresAt});
      if(pre.preconnectionId!==id||pre.sourceRevision!==source.sourceRevision||pre.actorId!==actorId||pre.owner.subject!==p.subject||pre.owner.accessRealmHash!==realm||pre.clientId!==source.clientId||pre.resource!==source.resource||canonical(pre.project)!==canonical(source.project)||pre.baselineHash!==evidence('baseline',source.initialBaseline)||pre.startedAt<capsule.I0||pre.expiresAt>capsule.C0||sa.preconnectionId!==id||sa.sourceRevision!==source.sourceRevision||sa.stage!=='connection'||sa.ticketHash!==t.ticketHash||sa.approvalHash!==pre.approvalHash||sa.approvalHash!==prepHash('ConfigurationApproval',a)||a.subjectHash!==subject||a.sourceRevision!==source.sourceRevision||a.clientId!==source.clientId||a.projectHash!==projectHash(source.project)||a.csrfReceiptHash!==decision||use.ticketHash!==t.ticketHash||use.recordHash!==decision||use.consumedAt<a.approvedAt||use.consumedAt>Date.now()||a.approvedAt<pre.startedAt||a.approvedAt<t.createdAt||a.expiresAt>Math.min(pre.expiresAt,pre.owner.accessExpiresAt,t.expiresAt,capsule.C0))fail();
      clock.narrow(Math.min(pre.expiresAt,pre.owner.accessExpiresAt,a.expiresAt));
     }else if(f.inventory.size!==1||!f.inventory.has(prefix+'source')||f.enrollment.size||f.effects.size||f.issuer.reservation)fail();
    }else if(f.enrollment.size||f.effects.size||f.issuer.reservation)fail();
    let enrollment=null,ack=null;
    if(f.enrollment.size){
     enrollment=enrollmentRecord('Enrollment',f.enrollment.get('afw.finite-preparation-cleanup.v1:enrollment'));
     ack=f.enrollment.has('afw.finite-preparation-cleanup.v1:ack')?enrollmentRecord('Ack',f.enrollment.get('afw.finite-preparation-cleanup.v1:ack')):null;
     qualifyFinitePreparationEnrollmentFacts({anchors:f.a,enrollment,ack,...data});
    }
    let receipt=null;
    if(f.effects.size){
     if(!enrollment||!ack||!data.preconnection)fail();
     const identity={kind:'connection',preconnectionId:id,sourceRevision:source.sourceRevision,stage:'connection'},up=effectIdentity({...identity,effect:'upload'}),activationId=effectIdentity({...identity,effect:'activation'});
     const allowed=['writer-head',...['send','ack'].map(s=>up+':'+s),...['send','ack','receipt'].map(s=>activationId+':'+s)].map(s=>'afw.finite-policy-effect.v1:'+s);
     if(f.effects.size!==allowed.length||[...f.effects.keys()].some(k=>!allowed.includes(k)))fail();
     const upload=await child(l=>createFinitePolicyEffectJournal({storage,identity:{...identity,effect:'upload'},now:Date.now}).read(l)),activation=await child(l=>createFinitePolicyEffectJournal({storage,identity:{...identity,effect:'activation'},now:Date.now}).read(l));
     receipt=qualifyFiniteOwnerInstalledStage({source,preconnection:data.preconnection,sourceSnapshot:data.sourceSnapshot,initialTicket:data.ticket,connection:null,stage:'connection',stageApproval:data.stageApproval,approval:data.approval,ticket:data.ticket,ticketUse:data.ticketUse,upload,activation,predecessors:[],grantLink:null,noticeLink:null,observedAt:Date.now()});
     if(f.effects.get('afw.finite-policy-effect.v1:writer-head')!==JSON.stringify({identityHash:activationId,sendHash:prepHash('ConnectionSend',activation.send)})||receipt.moduleHash!==capsule.moduleHash||receipt.configurationHash!==finiteActivationConfigurationHash(actual.currentConfiguration))fail();
    }
    if(receipt?(actual.pointer.versionId!==receipt.versionId||actual.pointer.deploymentId!==receipt.deploymentId):(actual.pointer.versionId!==capsule.activatedVersionId||actual.pointer.deploymentId!==capsule.activatedDeploymentId))fail();
    const issuerFacts=await issuerPrimary(f,data,enrollment,ack,receipt,getRecord);
    return {receipt,data,enrollment,ack,issuerFacts};
   };
   const qualified=await qualify(first,observed),again=await primary(),second=await facts();
   if(canonical(again)!==canonical(observed)||second.anchor!==first.anchor||canonical(await qualify(second,again))!==canonical(qualified))fail();
   const receipt=qualified.receipt,result=receipt?validateFiniteOwnerSource({...source,phase:'read_consent',currentPublication:{stage:'connection',versionId:receipt.versionId,deploymentId:receipt.deploymentId,receiptHash:receipt.receiptHash}}):source;
   current(clock.lease);
   return Object.freeze({source:result,preconnectionId:capsule.preconnectionId,capsuleHash:capsule.capsuleHash});
  });
  return await run();
 }finally{if(parentSignal&&onAbort)parentSignal.removeEventListener('abort',onAbort);clock?.close();}
}
