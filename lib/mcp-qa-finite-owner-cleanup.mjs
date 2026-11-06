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
 const node=env.AFW_RELEASE_EVENTS_NODE,nodeMethods={idFromName:node?.idFromName,idFromString:node?.idFromString,get:node?.get},db=env.RELEASE_DB,prepare=db?.prepare,metadata=env.AFW_QA_VERSION,reader=env.AFW_MCP_CLOSURE_READ_TOKEN,publisher=env.AFW_MCP_CLOSURE_PUBLISH_TOKEN,fetcher=globalThis.fetch;
 if([assertCurrent,...Object.values(methods),...Object.values(nodeMethods),prepare].some(v=>typeof v!=='function')||!(signal instanceof AbortSignal))fail();
 let ceiling=deadline;
 const guard=()=>{
  current(parent);current(lease);c.holders();
  if(options.ctx!==ctx||options.env!==env||options.parent!==parent||options.preconnectionId!==preconnectionId||lease.signal!==signal||lease.assertCurrent!==assertCurrent||parent.signal!==parentSignal||parent.assertCurrent!==parentAssert||readFiniteOwnerRequestContext(parent).deadline!==deadline||Date.now()>=ceiling||env.AFW_FINITE_OWNER_OAUTH_KV!==alias||Object.keys(methods).some(k=>alias[k]!==methods[k])||env.AFW_RELEASE_EVENTS_NODE!==node||Object.keys(nodeMethods).some(k=>node[k]!==nodeMethods[k])||env.RELEASE_DB!==db||db.prepare!==prepare||env.AFW_QA_VERSION!==metadata||env.AFW_MCP_CLOSURE_READ_TOKEN!==reader||env.AFW_MCP_CLOSURE_PUBLISH_TOKEN!==publisher||globalThis.fetch!==fetcher)fail();
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
