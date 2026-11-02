import {createHash} from 'node:crypto';
import {readPrivateQaFiniteCandidate} from './mcp-qa-finite-candidate-residency.mjs';
import {readPrivateQaFiniteBootstrap} from './mcp-qa-finite-bootstrap-native.mjs';
import {readFiniteQaBootstrapSourceExpectations} from './mcp-qa-finite-bootstrap-source.mjs';
import {readPrivateQaFiniteHistoricalSource} from './mcp-qa-finite-historical-source.mjs';
import {createDelegatedProjectRepository} from './delegated-project-repository.mjs';
import {createDelegatedOAuthStore} from './delegated-oauth-store.mjs';
import {resolveSuccessorPreparation} from './mcp-successor-manifest.mjs';
import {createFiniteInitialMaterialStore} from './mcp-qa-finite-initial-material-store.mjs';
import {initialFields as fields,initialOwn as own,initialCanonical as canonical,initialHash as hash,initialHex as hex,initialInstanceId,validateFiniteInitialOriginalContext,encodeFiniteInitialMaterialRecord as encode,decodeFiniteInitialMaterialRecord as decode,hashFiniteInitialMaterialRecord as recordHash} from './mcp-qa-finite-initial-material-records.mjs';
import {observeFiniteOwnerStageWork,retainFiniteOwnerStagePromise as track} from './mcp-qa-finite-stage-work.mjs';
const GH='https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web',CEILING=Date.parse('2026-11-03T02:59:00Z');
const fail=()=>{throw Error('Finite initial material unavailable');},pending=()=>Object.freeze({status:'admin_pending',mayRetry:false,operationalReadiness:false});
const sha=x=>createHash('sha256').update(x).digest('hex');
/** UNMOUNTED factual constructor. No effects, authority registration or RPC. */
export function createPrivateQaFiniteInitialMaterial(options){
 fields(options,['ctx','env']);const {ctx,env}=options,storage=ctx?.storage,actor=ctx?.id,toString=actor?.toString,db=env?.RELEASE_DB,withSession=db?.withSession,prepare=db?.prepare,self=env?.AFW_INDEPENDENT_CLOSURE,selfName=self?.idFromName,node=env?.AFW_RELEASE_EVENTS_NODE,nodeName=node?.idFromName,nodeString=node?.idFromString,metadata=env?.AFW_QA_VERSION,qaVersionId=metadata?.id,credential=env?.AFW_MCP_CLOSURE_READ_TOKEN,fetcher=globalThis.fetch,transaction=storage?.transaction,get=storage?.get;
 if([toString,withSession,prepare,selfName,nodeName,nodeString,fetcher,transaction,get].some(x=>typeof x!=='function'))fail();
 const actorId=Reflect.apply(toString,actor,[]),expected=readFiniteQaBootstrapSourceExpectations(),results=new WeakMap();
 if(!hex(actorId)||self.idFromName('afw-own-successor-closure-v1').toString()!==actorId||typeof qaVersionId!=='string')fail();
 const holders=()=>{if(options.ctx!==ctx||options.env!==env||ctx.storage!==storage||storage.transaction!==transaction||storage.get!==get||ctx.id!==actor||actor.toString!==toString||Reflect.apply(toString,actor,[])!==actorId||env.RELEASE_DB!==db||db.withSession!==withSession||db.prepare!==prepare||env.AFW_INDEPENDENT_CLOSURE!==self||self.idFromName!==selfName||self.idFromName('afw-own-successor-closure-v1').toString()!==actorId||env.AFW_RELEASE_EVENTS_NODE!==node||node.idFromName!==nodeName||node.idFromString!==nodeString||env.AFW_QA_VERSION!==metadata||metadata.id!==qaVersionId||env.AFW_MCP_CLOSURE_READ_TOKEN!==credential||globalThis.fetch!==fetcher)fail();};
 const store=createFiniteInitialMaterialStore({storage});
 return Object.freeze({
  async collect(refs,originalLease){
   let stop,controller,timer,success=false;
   try{
    fields(refs,['commandId']);fields(originalLease,['signal','assertCurrent']);const commandId=refs.commandId;
    if(!Number.isSafeInteger(commandId)||commandId<1||!(originalLease.signal instanceof AbortSignal)||typeof originalLease.assertCurrent!=='function')fail();
    const originalSignal=originalLease.signal,originalAssert=originalLease.assertCurrent,entered=Date.now(),mono=performance.now();let end=Math.min(entered+30000,CEILING),last=entered,lastMono=mono;
    controller=new AbortController();stop=()=>{clearTimeout(timer);controller.abort();originalSignal.removeEventListener('abort',stop);};
    originalSignal.addEventListener('abort',stop,{once:true});if(originalSignal.aborted)stop();
    const check=()=>{originalAssert();holders();const at=Date.now(),m=performance.now();if(originalLease.signal!==originalSignal||originalLease.assertCurrent!==originalAssert||originalSignal.aborted||controller.signal.aborted||at<last||at>=end||!Number.isFinite(m)||m<lastMono||m-mono>=end-entered)fail();last=at;lastMono=m;return at;};
    const narrow=until=>{check();end=Math.min(end,until);clearTimeout(timer);check();timer=setTimeout(stop,Math.max(1,end-Date.now()));};
    const lease=Object.freeze({signal:controller.signal,assertCurrent:check});narrow(end);
    const child=async work=>{
     check();const began=Date.now(),m0=performance.now(),childEnd=Math.min(end,began+5000),abort=new AbortController();let active=true,t,on;
     const current=()=>{check();if(!active||abort.signal.aborted||Date.now()>=childEnd||performance.now()-m0>=childEnd-began)fail();};
     const l=Object.freeze({signal:abort.signal,assertCurrent:current});
     const stopped=new Promise((_,reject)=>{on=()=>{active=false;abort.abort();reject(Error('Finite initial child expired'));};controller.signal.addEventListener('abort',on,{once:true});t=setTimeout(on,Math.max(1,childEnd-Date.now()));});
     const actual=track(Promise.resolve().then(()=>{current();return work(l);}));
     try{const value=await Promise.race([actual,stopped]);current();return value;}finally{active=false;clearTimeout(t);controller.signal.removeEventListener('abort',on);abort.abort();}
    };
    const command=()=>child(async l=>{
     let reader;try{
      const response=await fetcher(GH+'/issues/comments/'+commandId,{method:'GET',redirect:'manual',cache:'no-store',credentials:'omit',referrerPolicy:'no-referrer',signal:l.signal,headers:{Accept:'application/json','Cache-Control':'no-cache','X-GitHub-Api-Version':'2022-11-28'}});l.assertCurrent();
      const date=Date.parse(response?.headers?.get('date')??''),length=response?.headers?.get('content-length'),remaining=response?.headers?.get('x-ratelimit-remaining');
      if(!(response instanceof Response)||response.status!==200||response.redirected||!response.body||!Number.isSafeInteger(date)||Math.abs(Date.now()-date)>5000||response.headers.has('age')&&response.headers.get('age')!=='0'||response.headers.has('retry-after')||response.headers.has('link')||['HIT','STALE','REVALIDATED','UPDATING'].includes(response.headers.get('cf-cache-status')?.toUpperCase())||!(response.headers.get('content-type')??'').startsWith('application/json')||length!==null&&(!/^\d+$/.test(length)||Number(length)>16384)||remaining!==null&&(!/^\d+$/.test(remaining)||Number(remaining)<1))fail();
      reader=response.body.getReader();let size=0;const chunks=[];for(;;){const v=await reader.read();l.assertCurrent();if(v.done)break;if(!(v.value instanceof Uint8Array)||(size+=v.value.length)>16384)fail();chunks.push(v.value);}
      const v=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(Buffer.concat(chunks,size))),I0=Date.parse(v.created_at);
      if(v.id!==commandId||v.body!=='/afw-qa-finite-prepare v1 '+expected.sourceRevision+' '+qaVersionId||v.user?.id!==290715446||v.user.login!=='tokenizartinfo-ops'||v.user.type!=='User'||v.author_association!=='OWNER'||v.issue_url!==GH+'/issues/497'||!Number.isSafeInteger(I0)||I0<0||new Date(I0).toISOString()!==v.created_at||v.updated_at!==v.created_at||I0>check()||check()>=I0+300000)fail();
      return own({commandId,body:v.body,createdAt:I0,updatedAt:I0,ownerId:290715446,repository:'tokenizartinfo-ops/agent-friendly-web',issueNumber:497});
     }finally{if(reader)track(reader.cancel()).catch(()=>{});}
    });
    const admission=Object.freeze({lease:originalLease});
    return await observeFiniteOwnerStageWork({ctx,env,admission,originalLease},async()=>{
     check();if(!await child(l=>store.available(l)))fail();
     const candidate=readPrivateQaFiniteCandidate();check();
     if(candidate.sourceRevision!==expected.sourceRevision||candidate.sourceTree!==expected.sourceTree)fail();
     const first=await command();narrow(first.createdAt+300000);
     const intent={purpose:'afw.finite-initial-intent.v1',repository:first.repository,commandId,sourceRevision:expected.sourceRevision,sourceTree:expected.sourceTree,qaVersionId,initialInstanceId:initialInstanceId({commandId,sourceRevision:expected.sourceRevision,qaVersionId}),I0:first.createdAt,initialDeadline:first.createdAt+300000,goal:'content'};
     const claim=await child(l=>store.claim(intent,hash('afw.finite-initial-command.v1',first),end,l));check();
     // Real factual producers, once. No whole-source DTO substitutes or cache.
     const qaBootstrap=await readPrivateQaFiniteBootstrap({ctx,env},lease);check();
     const historical=await readPrivateQaFiniteHistoricalSource({ctx,env},lease);check();
     const manifest=fields(JSON.parse(historical.bindings.successorPolicy),['scope','original','candidate','publication']);
     resolveSuccessorPreparation({scope:manifest.scope,original:manifest.original,candidate:manifest.candidate,namespace:node});check();
     const old=historical.history.originalAdmission;
     if(manifest.original.containerId!==old.containerId||manifest.original.programHash!==old.programHash||manifest.original.sourceRevision!==old.sourceRevision)fail();
     const owned=()=>child(async l=>{
      const primary=Reflect.apply(withSession,db,['first-primary']);
      const row=await track(createDelegatedProjectRepository({db:primary,grantStore:createDelegatedOAuthStore(primary)}).getOwnedProject(old.projectId,old.subject));l.assertCurrent();
      if(!row||row.id!==old.projectId||row.userId!==old.subject||!Number.isSafeInteger(row.revision)||row.revision<1)fail();return own({id:row.id,userId:row.userId,revision:row.revision});
     });
     const project=await owned(),binding=name=>{const found=historical.configuration.bindings.filter(b=>b.name===name);if(found.length!==1)fail();return found[0];},text=name=>{const b=fields(binding(name),['name','type','text']);if(b.type!=='plain_text')fail();return b.text;};
     if(text('AFW_OAUTH_PILOT_CLIENT_ID')!==old.clientId||text('AFW_OAUTH_PILOT_PROJECT_ID')!==old.projectId||text('AFW_OAUTH_RESOURCE')!==old.resource||manifest.scope.resource!==old.resource)fail();
     const ownerSelection={subject:old.subject,project:{projectId:old.projectId,revision:project.revision,synthetic:true},clientId:old.clientId,resource:old.resource,goal:'content',access:{teamDomain:text('ACCESS_TEAM_DOMAIN'),audience:text('ACCESS_AUD')},limiter:binding('DELEGATED_RATE_LIMITER')};
     const historicalEvidence={purpose:'afw.finite-historical-evidence.v1',reader:{sourceRevision:expected.sourceRevision,sourceTree:expected.sourceTree},artifactReceiptHash:hash('afw.finite-historical-artifact-receipt.v1',historical.receipt),metadataProofHash:hash('afw.finite-historical-metadata-proof.v1',historical.metadataProof),bindingsHash:hash('afw.finite-historical-bindings.v1',historical.bindings),legacyHash:hash('afw.finite-historical-legacy.v1',historical.legacy),historyHash:hash('afw.finite-historical-history.v1',historical.history)};
     const artifact={sourceRevision:candidate.sourceRevision,sourceTree:candidate.sourceTree,programHash:candidate.programHash,workerHash:candidate.module.sha256,sourceCheck:candidate.sourceCheck};
     const originalContext=validateFiniteInitialOriginalContext({artifact,scope:manifest.scope,original:manifest.original,publication:{artifactKey:sha(JSON.stringify([manifest.scope.accountId,manifest.scope.workerName,artifact.workerHash])),workerHash:artifact.workerHash,activationKey:claim.ids.activationKey},cancellations:historical.history.cancellations,retirementPolicy:historical.bindings.retirementPolicy,withdrawalRequestId:claim.ids.withdrawalRequestId,saveIdempotencyKey:claim.ids.saveIdempotencyKey,legacy:{...historical.legacy,sourceRevision:expected.sourceRevision,sourceHash:hash('afw.finite-historical-evidence.v1',historicalEvidence)},trialId:claim.ids.trialId});
     if(canonical(await owned())!==canonical(project)||canonical(await command())!==canonical(first))fail();check();
     const raw={purpose:'afw.finite-initial-material.v1',intent,claimHash:claim.claimHash,preconnectionId:claim.ids.preconnectionId,qaBootstrap,historicalEvidence,ownerSelection,originalContext,observedAt:check()};
     const material=decode('InitialMaterial',encode('InitialMaterial',{...raw,materialHash:recordHash('InitialMaterial',raw)}));
     const recorded=await child(l=>store.publish(claim,material,l));check();
     const bytes=new Uint8Array(candidate.bytes),script=new TextDecoder('utf-8',{fatal:true}).decode(bytes);
     if(sha(bytes)!==candidate.module.sha256||sha(script)!==candidate.module.sha256||bytes.length!==candidate.module.bytes)fail();
     const result=Object.freeze({purpose:'afw.finite-initial-material-result.v1',material:recorded,originalContext:Object.freeze({...recorded.originalContext,artifact:Object.freeze({script,...recorded.originalContext.artifact})}),candidateBytes:bytes,sourceIdentityVerified:false,scopeVerified:false,authorizesEffects:false,completePackage:false,operationalReadiness:false});
     results.set(result,{originalLease,check,hash:candidate.module.sha256,bytes:candidate.module.bytes,materialHash:recorded.materialHash});success=true;return result;
    });
   }catch{return pending();}finally{if(!success)stop?.();}
  },
  assertCurrent(result,originalLease){
   const r=results.get(result);if(!r||r.originalLease!==originalLease)fail();r.check();
   if(result.material.materialHash!==r.materialHash||recordHash('InitialMaterial',result.material)!==r.materialHash||!(result.candidateBytes instanceof Uint8Array)||result.candidateBytes.length!==r.bytes||sha(result.candidateBytes)!==r.hash||sha(result.originalContext.artifact.script)!==r.hash)fail();
  }
 });
}
