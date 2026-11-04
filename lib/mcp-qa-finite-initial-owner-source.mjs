import {createHash} from 'node:crypto';
import {readFiniteOwnerRequestDeadline,readFiniteOwnerRequestContext} from './mcp-qa-finite-owner-preparation.mjs';
import {observeFiniteFactualReadWork,retainFiniteOwnerStagePromise as retain} from './mcp-qa-finite-stage-work.mjs';
import {createFiniteInitialLease} from './mcp-qa-finite-initial-lease.mjs';
import {FINITE_INITIAL_CAPSULE_KEY,decodeFiniteInitialCapsule,sealFiniteInitialCapsule,encodeFiniteInitialCapsule,finiteInitialCapsuleBindingsHash} from './mcp-qa-finite-initial-capsule-records.mjs';
import {initialFields as fields,initialCanonical as canonical,initialHash as digest,initialHex as hex,decodeFiniteInitialMaterialRecord as materialRecord} from './mcp-qa-finite-initial-material-records.mjs';
import {decodeFiniteInitialEntry} from './mcp-qa-finite-initial-entry-records.mjs';
import {FINITE_INITIAL_CLEANUP_PREFIX as CLEANUP,FINITE_INITIAL_CLEANUP_KINDS,decodeFiniteInitialCleanupRecord as cleanupRecord} from './mcp-qa-finite-initial-cleanup-records.mjs';
import {readFiniteQaBootstrapSourceExpectations} from './mcp-qa-finite-bootstrap-source.mjs';
import {readPrivateQaFiniteCandidate} from './mcp-qa-finite-candidate-residency.mjs';
import {finitePublicProfileTemplate,projectFinitePublicConfiguration} from './mcp-qa-finite-profile.mjs';
import {finiteQaPointer} from './mcp-qa-finite-publication.mjs';
import {finiteCfEnvelope} from './mcp-qa-finite-custody.mjs';
import {qualifyFiniteInitialUploadedVersion} from './mcp-qa-finite-initial-upload-wire.mjs';
import {restorationConfigurationHash} from './mcp-restoration-configuration.mjs';
import {activationConfigurationHash} from './mcp-activation-observer.mjs';
import {createDelegatedProjectRepository} from './delegated-project-repository.mjs';
import {createDelegatedOAuthStore} from './delegated-oauth-store.mjs';
import {validateFiniteOwnerSource} from './mcp-qa-finite-preparation-records.mjs';

const CF='https://api.cloudflare.com/client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec';
const SLOT='afw-own-successor-closure-v1',PREPARATION='afw.finite-initial-preparation.v1:',QA='agent-friendly-web-independent-closure-qa',CANARY='agent-friendly-web-delegated-canary';
const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
const fail=()=>{throw Error('Finite initial owner source unavailable');};
const current=l=>{l.assertCurrent();if(l.signal.aborted)fail();};

/** UNMOUNTED factual entry. A genuine original incoming request lease is
 * or internally registered descendant is required, never browser data.
 * Retention confers no owner admission and preserves the original request.
 */
export async function readPrivateQaFiniteInitialOwnerSource(options){
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
   const facts=async()=>{
    const raw=await read(FINITE_INITIAL_CAPSULE_KEY),capsule=decodeFiniteInitialCapsule(raw);
    if(capsule.sourceRevision!==expected.sourceRevision||capsule.sourceTree!==expected.sourceTree||capsule.qaVersionId!==qaVersionId||capsule.moduleHash!==resident.module.sha256||requested!==null&&requested!==capsule.preconnectionId)fail();
    clock.narrow(capsule.C0);
    if(Date.now()<capsule.I0||Date.now()>=capsule.C0||capsule.recordedAt>Date.now())fail();
    const entry=decodeFiniteInitialEntry(await read(PREPARATION+'entry')),claim=materialRecord('InitialClaim',await read(PREPARATION+'once')),selector=materialRecord('InitialSelector',await read(PREPARATION+'selector')),materialAck=materialRecord('InitialAck',await read(PREPARATION+'ack')),material=materialRecord('InitialMaterial',await read(PREPARATION+'material:'+capsule.materialHash));
    const cleanup=await rows(CLEANUP,16),names=['plan','state','arm-ack','activation-send','activation-ack','activation-completion'];
    if(cleanup.size!==names.length||names.some(k=>!cleanup.has(CLEANUP+k)))fail();
    const records=Object.fromEntries(names.map(k=>[k,cleanupRecord(FINITE_INITIAL_CLEANUP_KINDS[k],cleanup.get(CLEANUP+k))]));
    const plan=records.plan;
    clock.narrow(Math.min(plan.readerExpiresAt,plan.publisherExpiresAt));
    const rebuilt=sealFiniteInitialCapsule({entry,claim,selector,materialAck,material,plan,state:records.state,arm:records['arm-ack'],send:records['activation-send'],activationAck:records['activation-ack'],completion:records['activation-completion'],recordedAt:capsule.recordedAt});
    if(encodeFiniteInitialCapsule(rebuilt)!==raw||await child(()=>Reflect.apply(getAlarm,storage,[]))!==capsule.C0)fail();
    // Absence is bounded by prefix; unknown extra records also fail closed.
    for(const prefix of ['afw.qa-finite-trial.v1:','afw.finite-policy-effect.v1:','source-selection:'+capsule.sourceRevision+':']){
     if((await rows(prefix,1)).size!==0)fail();
    }
    for(const stage of ['connection','notices','finite'])if(await read('connection-preparation:'+capsule.preconnectionId+':'+stage+':approval')!==undefined)fail();
    current(clock.lease);
    return {capsule,material,plan,anchor:canonical({capsule,entry,claim,selector,materialAck,material,cleanup:[...cleanup],alarm:capsule.C0})};
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
    if(pointer.versionId!==capsule.activatedVersionId||pointer.deploymentId!==capsule.activatedDeploymentId)fail();
    const metadata=finiteCfEnvelope((await request('/workers/workers/'+CANARY+'/versions/'+capsule.activatedVersionId+'?include=modules',4500000)).value);
    const configuration=qualifyFiniteInitialUploadedVersion(metadata,capsule.activatedVersionId,plan.configuration,resident.bytes);
    if(restorationConfigurationHash(configuration)!==capsule.configurationHash||finiteInitialCapsuleBindingsHash(configuration.bindings)!==capsule.bindingsHash)fail();
    const binding=name=>configuration.bindings.find(b=>b.name===name),text=name=>binding(name)?.text;
    if(text('AFW_OAUTH_PILOT_CLIENT_ID')!==p.clientId||text('AFW_OAUTH_PILOT_PROJECT_ID')!==p.project.projectId||text('AFW_OAUTH_RESOURCE')!==p.resource||text('ACCESS_TEAM_DOMAIN')!==p.access.teamDomain||text('ACCESS_AUD')!==p.access.audience||text('AFW_OAUTH_PILOT_EXPIRES_AT')!==new Date(capsule.C0).toISOString()||canonical(binding('DELEGATED_RATE_LIMITER'))!==canonical(p.limiter))fail();
    const project=await owned();
    return {project,initialBaseline:{versionId:pointer.versionId,deploymentId:pointer.deploymentId,moduleHash:sha(resident.bytes),configurationHash:activationConfigurationHash(configuration),bindingsHash:finiteInitialCapsuleBindingsHash(configuration.bindings)}};
   };
   const observed=await primary();
   const source=validateFiniteOwnerSource({sourceRevision:capsule.sourceRevision,actorId,qaNamespaceId,qaVersionId,origin:'https://delegated-canary.agentfriendlyweb.dev',phase:'closed_ui',access:p.access,clientId:p.clientId,resource:p.resource,project:observed.project,goal:p.goal,
    programContext:{programHash:material.originalContext.original.programHash,sourceRevision:material.originalContext.original.sourceRevision,originalContextHash:digest('afw.finite-original-context.v1',material.originalContext)},
    initialBaseline:observed.initialBaseline,currentPublication:{stage:null,versionId:capsule.activatedVersionId,deploymentId:capsule.activatedDeploymentId,receiptHash:null},window:{startedAt:capsule.I0,expiresAt:capsule.C0}});
   if(canonical(await primary())!==canonical(observed)||(await facts()).anchor!==first.anchor)fail();
   current(clock.lease);
   return Object.freeze({source,preconnectionId:capsule.preconnectionId,capsuleHash:capsule.capsuleHash});
  });
  return await run();
 }finally{if(parentSignal&&onAbort)parentSignal.removeEventListener('abort',onAbort);clock?.close();}
}
