import {createHash} from 'node:crypto';
import {QA_CLOUD_CLOSED_PINS as P} from './mcp-qa-cloud-closed-pins.mjs';
import {qaClosedConfigurationHash} from './mcp-restoration-configuration.mjs';
import {createOwnClosedReadbackApi} from './mcp-qa-own-closed-api.mjs';
import {readOwnClosedRuntime} from './mcp-qa-own-closed-readback.mjs';
import {assertQaLifecycleWindow,remainingQaLifecycleWindow,assertQaLifecycleClaim,claimQaLifecycleOnce} from './mcp-qa-cloud-lifecycle-admission.mjs';
const ROOT='/accounts/85d0d5dadac3341a564f22ce885e9eec',ORIGIN='https://api.cloudflare.com/client/v4',QA=P.qaClosed.name,BASE=P.qaClosed.id;
const CONFIG=['compatibility_date','compatibility_flags','main_module','containers','exports','limits','placement','usage_model','cache_options','assets','package_dependencies'];
const fail=()=>{throw Error('Closed QA cloud clone unavailable');};
const uuid=v=>typeof v==='string'&&/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(v);
function exact(o,keys){if(!o||Object.getPrototypeOf(o)!==Object.prototype||Reflect.ownKeys(o).length!==keys.length)fail();return Object.fromEntries(keys.map(k=>{const d=Object.getOwnPropertyDescriptor(o,k);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();return[k,d.value];}));}
function closed(v,id,tag){
 const pin=P.qaClosed;
 if(v?.id!==id||v.main_module!==pin.module.name||!Array.isArray(v.modules)||v.modules.length!==1||!Array.isArray(v.bindings)||v.bindings.length!==pin.bindingCount||new Set(v.bindings.map(b=>b.name)).size!==pin.bindingCount||!Array.isArray(v.urls)||v.urls.length)fail();
 const m=v.modules[0];if(m?.name!==pin.module.name||m.content_type!=='application/javascript+module'||typeof m.content_base64!=='string')fail();
 const bytes=Buffer.from(m.content_base64,'base64');if(bytes.toString('base64')!==m.content_base64||bytes.length!==pin.module.bytes||createHash('sha256').update(bytes).digest('hex')!==pin.module.sha256||qaClosedConfigurationHash(v)!==pin.configurationHash)fail();
 const flags=v.bindings.filter(b=>b.name?.startsWith('AFW_')&&b.name.endsWith('_ENABLED'));
 if(flags.length!==pin.flagCount||flags.some(b=>b.type!=='plain_text'||b.text!=='false'))fail();
 for(const b of v.bindings)if(typeof b.name!=='string'||b.type==='secret_text'&&(Reflect.ownKeys(b).length!==2||Reflect.ownKeys(b).some(k=>!['name','type'].includes(k))))fail();
 if(tag!==undefined&&v.annotations?.['workers/tag']!==tag)fail();return v;
}
/** Trusted Node entry point only. Fixed literal-copy operation; no public target, mode or policy. */
export async function runQaClosedCloudClone(options){
 const o=exact(options,['admission','credential','githubCredential','fetchImpl','now']),{admission,credential,githubCredential,fetchImpl,now}=o;
 if(typeof credential!=='string'||!/^[A-Za-z0-9_-]{20,512}$/.test(credential)||typeof githubCredential!=='string'||!/^[A-Za-z0-9_-]{20,512}$/.test(githubCredential)||typeof fetchImpl!=='function'||typeof now!=='function')fail();
 assertQaLifecycleWindow(admission,'cleanup');
 let wall=now(),mono=performance.now(),poisoned=false;
 if(!Number.isSafeInteger(wall)||wall<0||!Number.isFinite(mono)||mono<0)fail();
 let stage='admission',candidate=null,activationDeployment=null,restorationDeployment=null,claimAck=false,candidateObserved=false,restorationAcknowledged=false,finalReadback=null,uncertain=false,conflict=false,normal=false,providerChecked=false,otherIncidentCount=0,failureStage=null,cleanupFailureStage=null;
 const posts={upload:0,activate:0,restore:0},outcomes={upload:'not_sent',activate:'not_sent',restore:'not_sent'},reads={nominal:0,cleanup:0};
 const message='AFW closed QA clone '+admission.intentId;
 const check=(phase,margin=0)=>{
  const c=exact(options,['admission','credential','githubCredential','fetchImpl','now']);if(Object.keys(o).some(k=>c[k]!==o[k])||poisoned)fail();
  let w,m;try{w=now();m=performance.now();}catch{poisoned=true;fail();}
  if(!Number.isSafeInteger(w)||w<wall||!Number.isFinite(m)||m<mono){poisoned=true;fail();}wall=w;mono=m;
  assertQaLifecycleWindow(admission,phase,margin);return w;
 };
 // Each request has its own abort, but all authorization ends at the original N1/R1.
 async function json(phase,method,url,body,publicStatus=false){
  let timer,reader,httpStatus=null;const abort=new AbortController(),began=check(phase),origin=mono;
  const duration=Math.min(5000,remainingQaLifecycleWindow(admission,phase));
  if(duration<1)fail();
  const current=()=>{check(phase);if(abort.signal.aborted||wall-began>=duration||mono-origin>=duration)fail();};
  try{
   const stopped=new Promise((_,reject)=>{timer=setTimeout(()=>{abort.abort();reject(Error('Closed QA request stopped'));},duration);});
   const work=async()=>{
    current();if(method==='GET'&&++reads[phase]>128)fail();
    const headers={Accept:'application/json','Cache-Control':'no-cache'};if(!publicStatus)headers.Authorization='Bearer '+credential;
    if(body!==undefined)headers['Content-Type']='application/json';
    const serialized=body===undefined?undefined:JSON.stringify(body);current();
    const r=await fetchImpl(url,{method,redirect:'error',cache:'no-store',headers,signal:abort.signal,...(serialized===undefined?{}:{body:serialized})});current();
    if(!(r instanceof Response))fail();httpStatus=r.status;if(r.status!==200)fail();
    if(!(r.headers.get('content-type')??'').toLowerCase().startsWith('application/json'))fail();
    if(!publicStatus){const date=Date.parse(r.headers.get('date')??'');if(!Number.isFinite(date)||Math.abs(wall-date)>5000||r.headers.has('age')&&r.headers.get('age')!=='0'||['HIT','REVALIDATED','STALE','UPDATING'].includes(r.headers.get('cf-cache-status')?.toUpperCase()))fail();}
    const cap=publicStatus?131072:4194304,length=r.headers.get('content-length');
    if(length!==null&&(!/^\d+$/.test(length)||Number(length)>cap)||!r.body)fail();
    reader=r.body.getReader();let size=0;const chunks=[];
    while(true){current();const b=await reader.read();current();if(b.done)break;if(!(b.value instanceof Uint8Array)||(size+=b.value.length)>cap)fail();chunks.push(b.value);}
    const e=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(Buffer.concat(chunks,size)));current();
    if(publicStatus)return e;
    if(!e||Object.getPrototypeOf(e)!==Object.prototype||e.success!==true||!Array.isArray(e.errors)||e.errors.length||!Array.isArray(e.messages)||e.messages.length||!Object.hasOwn(e,'result'))fail();
    return e.result;
   };
   const v=await Promise.race([work(),stopped]);current();return v;
  }catch{if(method==='POST'){const kind=stage==='upload'?'upload':stage==='activate'?'activate':'restore';outcomes[kind]=httpStatus!==null&&httpStatus>=400&&httpStatus<500?'denied':'unknown';if(outcomes[kind]==='unknown')uncertain=true;}fail();}
  finally{clearTimeout(timer);abort.abort();if(reader)void reader.cancel().catch(()=>{});}
 }
 const read=async(phase,path,query)=>{const u=new URL(ORIGIN+ROOT+path);for(const[k,v]of Object.entries(query??{}))u.searchParams.set(k,String(v));return json(phase,'GET',u.href);};
 const active=async(phase,role='qa')=>{
  const pin=role==='qa'?P.qaClosed:P[role];if(!pin||!['qa','canary','operator'].includes(role)||phase==='cleanup'&&role!=='qa')fail();
  const r=await read(phase,'/workers/scripts/'+pin.name+'/deployments',{per_page:1}),d=r?.deployments?.[0];
  if(r?.deployments?.length!==1||!uuid(d.id)||d.strategy!=='percentage'||d.versions?.length!==1||d.versions[0].percentage!==100||!uuid(d.versions[0].version_id))fail();
  return{versionId:d.versions[0].version_id,deploymentId:d.id,message:d.annotations?.['workers/message']??null};
 };
 const post=async(kind,path,body,query)=>{
  const phase=kind==='restore'?'cleanup':'nominal';check(phase);
  if(!claimAck||posts[kind]!==0)fail();if(phase==='nominal')assertQaLifecycleClaim(admission);
  posts[kind]++;outcomes[kind]='sent';const u=new URL(ORIGIN+ROOT+path);for(const[k,v]of Object.entries(query??{}))u.searchParams.set(k,String(v));
  const v=await json(phase,'POST',u.href,body);outcomes[kind]='received';return v;
 };
 async function snapshot(phase){
  check(phase);
  // The existing GET-only allowlist is not broadened by this writer.
  const stop=new AbortController(),remaining=remainingQaLifecycleWindow(admission,phase);
  let c,rejectPhase;
  const expired=new Promise((_,reject)=>{rejectPhase=reject;});
  const phaseTimer=setTimeout(()=>{stop.abort();c?.close();rejectPhase(Error('Closed QA snapshot stopped'));},Math.max(1,Math.floor(remaining)));
  try{
   c=createOwnClosedReadbackApi({credential,now,fetchImpl:async(url,init)=>{check(phase);if(++reads[phase]>128||stop.signal.aborted)fail();return fetchImpl(url,{...init,signal:AbortSignal.any([init.signal,stop.signal])});}});
   const proof=await Promise.race([readOwnClosedRuntime({request:async q=>{check(phase);const v=await c.request(q);check(phase);return v;},now}),expired]);c.assertCurrent();if(proof.purpose!=='afw.own-closed-readback.v1'||proof.status!=='closed'||proof.operationalReadiness!==false||proof.authorizesEffects!==false)fail();check(phase);return proof;
  }finally{c?.close();clearTimeout(phaseTimer);stop.abort();}
 }
 try{
  check('nominal',180000);stage='provider';
  const provider=await json('nominal','GET','https://www.cloudflarestatus.com/api/v2/incidents/unresolved.json',undefined,true);
  if(!provider||Object.getPrototypeOf(provider)!==Object.prototype||!Array.isArray(provider.incidents)||provider.incidents.length>100)fail();
  const relevant=/workers|durable objects|\bd1\b|workflows|containers|cloudflare api/i;
  for(const incident of provider.incidents){
   if(!incident||Object.getPrototypeOf(incident)!==Object.prototype||typeof incident.id!=='string'||typeof incident.name!=='string'||!['investigating','identified','monitoring','resolved','postmortem'].includes(incident.status))fail();
   if(['resolved','postmortem'].includes(incident.status))continue;
   if(relevant.test(incident.name))fail();
   if(!Array.isArray(incident.components)||incident.components.some(c=>!c||typeof c.name!=='string'||relevant.test(c.name)))fail();
   otherIncidentCount++;
  }providerChecked=true;
  stage='preflight';const before=await snapshot('nominal');check('nominal',180000);
  stage='claim';const claim=await claimQaLifecycleOnce({admission,credential:githubCredential,fetchImpl});
  check('nominal',180000);if(claim.claimed!==true||claim.intentId!==admission.intentId)fail();claimAck=true;
  stage='baseline';const base=closed(await read('nominal','/workers/workers/'+QA+'/versions/'+BASE,{include:'modules'}),BASE);
  const unchanged=async()=>{for(const role of ['canary','operator','qa']){const a=await active('nominal',role),p=before.deployments[role];if(a.versionId!==p.versionId||a.deploymentId!==p.deploymentId)fail();}};
  await unchanged();check('nominal',180000);
  const body={...Object.fromEntries(CONFIG.filter(k=>Object.hasOwn(base,k)).map(k=>[k,base[k]])),bindings:base.bindings.map(b=>({name:b.name,type:'inherit',version_id:BASE})),modules:base.modules,annotations:{'workers/tag':admission.intentId,'workers/message':message}};
  stage='upload';const uploaded=await post('upload','/workers/workers/'+QA+'/versions',body,{deploy:false});
  if(!uuid(uploaded?.id)||uploaded.id===BASE){uncertain=true;fail();}candidate=uploaded.id;outcomes.upload='acknowledged';
  stage='inactive_readback';closed(await read('nominal','/workers/workers/'+QA+'/versions/'+candidate,{include:'modules'}),candidate,admission.intentId);
  const inactive=await active('nominal');if(inactive.versionId===candidate){uncertain=true;fail();}
  if(inactive.versionId!==BASE||inactive.deploymentId!==before.deployments.qa.deploymentId)fail();await unchanged();
  stage='activate';const deployed=await post('activate','/workers/scripts/'+QA+'/deployments',{strategy:'percentage',versions:[{version_id:candidate,percentage:100}],annotations:{'workers/message':message}});
  if(!uuid(deployed?.id)){uncertain=true;fail();}activationDeployment=deployed.id;outcomes.activate='acknowledged';
  stage='candidate_observation';const observed=await active('nominal');
  if(observed.versionId!==candidate||observed.deploymentId!==activationDeployment||observed.message!==message){conflict=true;fail();}
  closed(await read('nominal','/workers/workers/'+QA+'/versions/'+candidate,{include:'modules'}),candidate,admission.intentId);
  for(const role of ['canary','operator']){const a=await active('nominal',role),p=before.deployments[role];if(a.versionId!==p.versionId||a.deploymentId!==p.deploymentId)fail();}
  check('nominal');candidateObserved=true;normal=true;
 }catch{failureStage=stage;/* Never propagate provider/credential text. */}
 finally{
  if(posts.upload&&claimAck){
   try{
    stage='cleanup';check('cleanup');const a=await active('cleanup');
    if(a.versionId!==BASE){
     if(!candidate||a.versionId!==candidate||a.message!==message||activationDeployment&&a.deploymentId!==activationDeployment){conflict=true;fail();}
     const owned=await read('cleanup','/workers/workers/'+QA+'/versions/'+candidate,{include:'modules'});
     if(owned?.id!==candidate||owned.annotations?.['workers/tag']!==admission.intentId){conflict=true;fail();}
     // Cleanup depends on ownership and recoverable BASE, never failed nominal eligibility.
     closed(await read('cleanup','/workers/workers/'+QA+'/versions/'+BASE,{include:'modules'}),BASE);
     if(posts.activate===0)uncertain=true;
     const immediatelyBefore=await active('cleanup');
     if(immediatelyBefore.versionId!==a.versionId||immediatelyBefore.deploymentId!==a.deploymentId||immediatelyBefore.message!==message){conflict=true;fail();}
     stage='restore';const restored=await post('restore','/workers/scripts/'+QA+'/deployments',{strategy:'percentage',versions:[{version_id:BASE,percentage:100}],annotations:{'workers/message':'AFW closed QA restoration '+admission.intentId}});
     if(!uuid(restored?.id)){uncertain=true;fail();}restorationDeployment=restored.id;outcomes.restore='acknowledged';
     const closedPointer=await active('cleanup');if(closedPointer.versionId!==BASE||closedPointer.deploymentId!==restorationDeployment)fail();restorationAcknowledged=true;
    }
   }catch{cleanupFailureStage=stage;/* No second restore or force after any uncertain result. */}
   try{stage='final_readback';finalReadback=await snapshot('cleanup');check('cleanup');}catch{finalReadback=null;}
  }
 }
 const verified=normal&&!uncertain&&!conflict&&candidateObserved&&restorationAcknowledged&&finalReadback!==null;
 return Object.freeze({purpose:'afw.qa-closed-cloud-clone.v1',status:verified?'verified':uncertain?'uncertain':'blocked',observedAt:new Date(wall).toISOString(),stage:verified?'complete':failureStage??stage,cleanupFailureStage,intentId:admission.intentId,sourceRevision:admission.sourceRevision,artifactBaseVersionId:BASE,artifactModuleHash:P.qaClosed.module.sha256,providerChecked,otherIncidentCount,claimAcknowledged:claimAck,candidateVersionId:candidate,activationDeploymentId:activationDeployment,restorationDeploymentId:restorationDeployment,candidateObserved,restorationAcknowledged,finalClosedVerified:finalReadback!==null,finalReadback,posts:Object.freeze({...posts}),outcomes:Object.freeze({...outcomes}),reads:Object.freeze({...reads}),uncertain,conflict,controlPlaneOnly:true,nativeExecutionVerified:false,authorizesEffects:false,guardLivenessVerified:false,nativeWithdrawalVerified:false,operationalReadiness:false,mayRetry:false});
}
