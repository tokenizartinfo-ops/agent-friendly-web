import {createHash} from 'node:crypto';
import {consumeFiniteOwnerStageAdmission,readFiniteOwnerRequestDeadline} from './mcp-qa-finite-owner-preparation.mjs';
import {readPrivateQaFiniteConnectionSource} from './mcp-qa-finite-connection-source.mjs';
import {createFinitePolicyEffectJournal} from './mcp-qa-finite-policy-journal.mjs';
import {createFiniteOwnerPreparationStore} from './mcp-qa-finite-preparation-store.mjs';
import {hashFinitePreparationRecord as hash,validateFiniteOwnerSource} from './mcp-qa-finite-preparation-records.mjs';
import {finiteFields as fields,finiteData as data} from './mcp-finite-evidence.mjs';
import {finiteCfEnvelope} from './mcp-qa-finite-custody.mjs';
import {validateFiniteModule} from './mcp-finite-cleanup-policy.mjs';
import {qualifyFiniteWorkerVersion} from './mcp-finite-primary-inventory.mjs';
import {activationConfigurationHash} from './mcp-activation-observer.mjs';
import {restorationConfigurationHash} from './mcp-restoration-configuration.mjs';
import {qualifyFiniteConnectionProfile} from './mcp-qa-finite-connection-profile.mjs';
import {projectFinitePublicConfiguration,finitePublicStaticExpectation} from './mcp-qa-finite-profile.mjs';
const ROOT='https://api.cloudflare.com/client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/workers/',W='agent-friendly-web-delegated-canary',MAX=4718592;
const stages=['connection','notices','finite'],phases=['closed_ui','read_consent','notice_consent'];
const pendingByContext=new WeakMap();
const pending=()=>Object.freeze({status:'admin_pending',mayRetry:false,operationalReadiness:false});
const fail=()=>{throw Error('Finite policy transport unavailable');};
const canonical=v=>JSON.stringify(v,(_,x)=>x&&typeof x==='object'&&!Array.isArray(x)?Object.fromEntries(Object.entries(x).sort(([a],[b])=>a<b?-1:1)):x);
const sha=v=>createHash('sha256').update(v).digest('hex'),digest=(d,v)=>sha(d+'\n'+canonical(v));
const uuid=x=>typeof x==='string'&&/^[a-f0-9]{8}(-[a-f0-9]{4}){3}-[a-f0-9]{12}$/.test(x);
const current=lease=>{if(lease.signal.aborted)fail();lease.assertCurrent();};
const observed=v=>{if(v?.status!=='observed'||!v.record)fail();return v.record;};
function configuration(v){
 const c=Object.fromEntries(['compatibility_date','compatibility_flags','main_module','exports','bindings','usage_model','containers'].map(k=>[k,v[k]]));
 activationConfigurationHash(c);return data(c);
}
function validateBytes(bytes,descriptor){
 validateFiniteModule(descriptor);if(!(bytes instanceof Uint8Array)||bytes.byteLength>3145728||bytes.byteLength!==descriptor.bytes||sha(bytes)!==descriptor.sha256)fail();
 return Uint8Array.from(bytes);
}
/** Only effect entry. No caller transport/credential/body/pins or exported mint. */
export function createFinitePolicyTransport({ctx,env}){
 return Object.freeze({run(refs,originalLease){
  const admission=consumeFiniteOwnerStageAdmission({ctx,env,preconnectionId:refs?.preconnectionId,stage:refs?.stage},originalLease);
  fields(refs,['preconnectionId','stage']);
  const originalEnd=readFiniteOwnerRequestDeadline(originalLease),lease=admission.lease;
  if(pendingByContext.has(ctx))return Promise.resolve(Object.freeze({outcome:pending(),admission}));
  const active={work:new Set(),done:false};pendingByContext.set(ctx,active);
  const release=()=>{if(active.done&&!active.work.size&&pendingByContext.get(ctx)===active)pendingByContext.delete(ctx);};
  const track=p=>{active.work.add(p);p.then(()=>{active.work.delete(p);release();},()=>{active.work.delete(p);release();});return p;};
  const storage=ctx.storage,db=env.RELEASE_DB,fetcher=globalThis.fetch,readToken=env.AFW_MCP_CLOSURE_READ_TOKEN,publishToken=env.AFW_MCP_CLOSURE_PUBLISH_TOKEN;
  let source,deadline=originalEnd,last=Date.now();
  const guard=()=>{current(lease);const at=Date.now();if(at<last||at>=deadline||ctx.storage!==storage||env.RELEASE_DB!==db||globalThis.fetch!==fetcher||env.AFW_MCP_CLOSURE_READ_TOKEN!==readToken||env.AFW_MCP_CLOSURE_PUBLISH_TOKEN!==publishToken||env.AFW_QA_VERSION?.id!==admission.ownerSource.qaVersionId)fail();last=at;return at;};
  async function child(fn){
   guard();const wall=Date.now(),mono=performance.now(),end=Math.min(deadline,wall+5000),controller=new AbortController();let alive=true,timer,rejectAbort;
   const stop=()=>{alive=false;controller.abort();};
   const c=Object.freeze({signal:controller.signal,assertCurrent(){guard();const at=Date.now(),elapsed=performance.now()-mono;if(!alive||controller.signal.aborted||at<wall||at>=end||elapsed<0||elapsed>=end-wall)fail();}});
   const aborted=new Promise((_,reject)=>{rejectAbort=reject;});
   const abort=()=>{stop();rejectAbort(Error('Finite parent expired'));};lease.signal.addEventListener('abort',abort,{once:true});
   const timeout=new Promise((_,reject)=>{timer=setTimeout(()=>{stop();reject(Error('Finite child expired'));},Math.max(1,end-Date.now()));});
   const work=track(Promise.resolve().then(()=>{current(c);return fn(c,end);}));
   try{const value=await Promise.race([work,timeout,aborted]);current(c);return value;}
   finally{stop();clearTimeout(timer);lease.signal.removeEventListener('abort',abort);}
  }
  async function qualified(c){current(c);await source.assertCurrent(c);current(c);}
  async function http(method,path,body,c){
   current(c);const token=method==='GET'?readToken:publishToken;
   if(typeof token!=='string'||!/^[-A-Za-z0-9_]{16,4096}$/.test(token)||typeof fetcher!=='function')fail();
   const response=await fetcher(ROOT+path,{method,redirect:'manual',cache:'no-store',signal:c.signal,headers:{Authorization:'Bearer '+token,Accept:'application/json','Content-Type':'application/json','Cache-Control':'no-cache, no-store'},...(body?{body:JSON.stringify(body)}:{})});
   let reader;
   try{
    current(c);if(!(response instanceof Response)||response.redirected||!(method==='GET'?response.status===200:[200,201].includes(response.status))||!response.body||!/^application\/json(?:\s*;|$)/i.test(response.headers.get('Content-Type')??''))fail();
    const age=response.headers.get('Age'),cache=response.headers.get('CF-Cache-Status'),length=response.headers.get('Content-Length');
    if(age!==null&&age!=='0'||cache!==null&&!['DYNAMIC','BYPASS','MISS'].includes(cache.toUpperCase())||length!==null&&(!/^\d+$/.test(length)||Number(length)>MAX))fail();
    reader=response.body.getReader();const chunks=[];let size=0;
    for(;;){const v=await reader.read();current(c);if(v.done)break;size+=v.value.byteLength;if(size>MAX)fail();chunks.push(v.value);}
    const raw=Buffer.concat(chunks,size);current(c);return finiteCfEnvelope(JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(raw)));
   }finally{if(reader)await reader.cancel().catch(()=>{});else if(response?.body&&!response.body.locked)void response.body.cancel().catch(()=>{});}
  }
  function pointer(value,versionId,deploymentId){
   const d=value?.deployments?.[0];
   if(!Array.isArray(value?.deployments)||value.deployments.length!==1||d?.id!==deploymentId||d.strategy!=='percentage'||!Array.isArray(d.versions)||d.versions.length!==1||d.versions[0].version_id!==versionId||d.versions[0].percentage!==100)fail();
  }
  const readPointer=(pin,c)=>http('GET','scripts/'+W+'/deployments?per_page=1',null,c).then(v=>{current(c);pointer(v,pin.versionId,pin.deploymentId);});
  async function readVersion(pin,c,closed=false){
   const v=await http('GET','workers/'+W+'/versions/'+pin.versionId+'?include=modules',null,c);current(c);
   qualifyFiniteWorkerVersion({metadata:v,pin:{versionId:pin.versionId,module:pin.module,configurationHash:restorationConfigurationHash(pin.configuration)},role:'canary',closed});
   if(activationConfigurationHash(configuration(v))!==activationConfigurationHash(pin.configuration))fail();return v;
  }
  function wire(config,baselineId,bytes){
   const value=configuration(config),out={...value,containers:value.containers.map(({class_name})=>({class_name})),bindings:value.bindings.map(b=>b.type==='secret_text'?{name:b.name,type:'inherit',version_id:baselineId}:b),modules:[{name:'index.mjs',content_type:'application/javascript+module',content_base64:Buffer.from(bytes).toString('base64')}]};
   for(const b of out.bindings)if(b.type==='inherit')fields(b,['name','type','version_id']);
   return out;
  }
  async function work(){
   guard();const index=stages.indexOf(refs.stage);if(index<0)fail();
   source=await child(c=>readPrivateQaFiniteConnectionSource({ctx,env,...refs},c));fields(source,['ownerSource','baseline','rollback','candidate','bytes','assertCurrent']);
   if(typeof source.assertCurrent!=='function'||canonical(validateFiniteOwnerSource(source.ownerSource))!==canonical(admission.ownerSource)||source.ownerSource.phase!==phases[index])fail();
   const owner=source.ownerSource,store=createFiniteOwnerPreparationStore({storage,now:Date.now});
   const pre=observed(await child(c=>store.readPreconnection({preconnectionId:refs.preconnectionId},c))),approval=observed(await child(c=>store.readStageApproval(refs,c)));
   if(hash('StageApproval',approval)!==admission.stageApprovalHash||pre.sourceRevision!==owner.sourceRevision||pre.actorId!==owner.actorId)fail();
   const decision=observed(await child(c=>store.readConfigurationApproval({approvalHash:approval.approvalHash},c)));
   deadline=Math.min(deadline,pre.expiresAt,pre.owner.accessExpiresAt,decision.expiresAt,owner.window.expiresAt);guard();
   const identity=effect=>({kind:'connection',...refs,sourceRevision:owner.sourceRevision,effect}),journal=effect=>createFinitePolicyEffectJournal({storage,identity:identity(effect),now:Date.now});
   const upload=journal('upload'),activation=journal('activation'),predecessors=[];
   for(let i=0;i<index;i++){
    const j=createFinitePolicyEffectJournal({storage,identity:{...identity('activation'),stage:stages[i]},now:Date.now}),state=await child(c=>j.read(c));
    if(state.state!=='installed')fail();predecessors.push(state.receipt);
   }
   const grant=index?observed(await child(c=>store.readLink({kind:'grant',preconnectionId:refs.preconnectionId},c))):null,notice=index===2?observed(await child(c=>store.readLink({kind:'notice',preconnectionId:refs.preconnectionId},c))):null;
   const contextHash=digest('afw.finite-connection-context.v1',{preconnection:pre,stageApproval:approval,predecessors,grant,notice});
   for(const pin of [source.baseline,source.rollback]){fields(pin,['versionId','deploymentId','module','configuration']);if(!uuid(pin.versionId)||!uuid(pin.deploymentId))fail();validateFiniteModule(pin.module);activationConfigurationHash(pin.configuration);}
   fields(source.candidate,['sourceRevision','role','module','configuration','publicStatic']);fields(source.bytes,['baseline','rollback','candidate']);
   const bytes=Object.fromEntries(['baseline','rollback','candidate'].map(k=>[k,validateBytes(source.bytes[k],source[k].module)]));
   const candidate=source.candidate,baseline=source.baseline;
   if(candidate.sourceRevision!==owner.sourceRevision||candidate.module.name!=='index.mjs'||baseline.versionId!==owner.currentPublication.versionId||baseline.deploymentId!==owner.currentPublication.deploymentId)fail();
   if(index===0&&(baseline.module.sha256!==owner.initialBaseline.moduleHash||activationConfigurationHash(baseline.configuration)!==owner.initialBaseline.configurationHash))fail();
   qualifyFiniteConnectionProfile({phase:phases[index],metadata:baseline.configuration});
   if(index<2){
    if(candidate.role!=='preparation'||candidate.publicStatic!==null||candidate.module.sha256!==baseline.module.sha256||!Buffer.from(bytes.candidate).equals(Buffer.from(bytes.baseline)))fail();
    qualifyFiniteConnectionProfile({phase:phases[index+1],metadata:candidate.configuration});
    const mutable=['AFW_DELEGATED_OAUTH_ENABLED','AFW_DOSSIER_MONITORING_OWNER_ENABLED','AFW_DOSSIER_MONITORING_OWNER_POLICY'];
    const invariant=v=>canonical({...v,bindings:v.bindings.filter(b=>!mutable.includes(b.name))});
    if(invariant(baseline.configuration)!==invariant(candidate.configuration))fail();
    if(index===1){const policy=JSON.parse(candidate.configuration.bindings.find(b=>b.name==='AFW_DOSSIER_MONITORING_OWNER_POLICY').text);if(policy.grantId!==grant.grantId||policy.startAt>Date.now()||policy.expiresAt>pre.expiresAt)fail();}
   }else{
    if(candidate.role!=='canaryLive'||canonical(candidate.publicStatic)!==canonical(finitePublicStaticExpectation('canaryLive')))fail();
    projectFinitePublicConfiguration({role:'canaryLive',metadata:candidate.configuration});
   }
   const binding=name=>baseline.configuration.bindings.find(b=>b.name===name)?.text;
   if(binding('ACCESS_TEAM_DOMAIN')!==owner.access.teamDomain||binding('ACCESS_AUD')!==owner.access.audience||binding('AFW_OAUTH_PILOT_CLIENT_ID')!==pre.clientId||binding('AFW_OAUTH_PILOT_PROJECT_ID')!==pre.project.projectId||Date.parse(binding('AFW_OAUTH_PILOT_EXPIRES_AT'))!==owner.window.expiresAt)fail();
   await child(async c=>{await qualified(c);await readPointer(baseline,c);await readVersion(baseline,c);await readVersion(source.rollback,c,true);await qualified(c);});
   const first=await child(c=>upload.read(c));if(first.state!=='absent')fail();
   const uploadBody=wire(candidate.configuration,baseline.versionId,bytes.candidate);
   async function effect(j,effectName,path,body){
    return child(async(c,end)=>{
     await qualified(c);await readPointer(baseline,c);current(c);
     const send={purpose:'afw.finite-connection-send.v1',...refs,sourceRevision:owner.sourceRevision,contextHash,effect:effectName,baselineVersionId:baseline.versionId,baselineDeploymentId:baseline.deploymentId,requestHash:digest('afw.finite-connection-request.v1',{method:'POST',path:ROOT+path,body}),issuedAt:Date.now(),deadline:end};
     const claim=await j.issue(send,c);current(c);if(claim.status!=='recorded'||claim.recordHash!==hash('ConnectionSend',send))fail();
     const read=await j.read(c);current(c);if(read.state!=='issued'||canonical(read.send)!==canonical(send)||read.ack!==null)fail();
     await qualified(c);current(c);
     const result=await http('POST',path,body,c);current(c);if(!uuid(result?.id))fail();
     const rec=result.exports_reconciliation;
     if(rec!==undefined&&(!rec||Object.keys(rec).some(k=>!['created','deleted','renamed','transfer_pending','transferred','updated','removable_entries','info','warnings'].includes(k))||Object.entries(rec).some(([k,v])=>!Array.isArray(v)||(k==='updated'?v.some(x=>x!=='AfwOwnEventNode'):v.length>0))))fail();
     const ack={purpose:'afw.finite-connection-ack.v1',sendHash:claim.recordHash,resourceId:result.id,acknowledgedAt:Date.now()};
     const saved=await j.acknowledge(ack,c);current(c);if(saved.status!=='recorded'||saved.recordHash!==hash('ConnectionAck',ack))fail();
     const actual=await j.read(c);current(c);if(actual.state!=='acknowledged'||canonical(actual.ack)!==canonical(ack))fail();
     return result.id;
    });
   }
   const versionId=await effect(upload,'upload','workers/'+W+'/versions?deploy=false',uploadBody);
   if(versionId===baseline.versionId||versionId===source.rollback.versionId)fail();
   const versionPin={...candidate,versionId};
   await child(async c=>{await qualified(c);await readVersion(versionPin,c);await readPointer(baseline,c);await qualified(c);});
   const deploymentId=await effect(activation,'activation','scripts/'+W+'/deployments',{strategy:'percentage',versions:[{version_id:versionId,percentage:100}]});
   if(deploymentId===baseline.deploymentId)fail();
   await child(async c=>{await qualified(c);await readPointer({versionId,deploymentId},c);await readVersion(versionPin,c);await qualified(c);});
   const raw={purpose:'afw.finite-connection-installed.v1',...refs,sourceRevision:owner.sourceRevision,baselineVersionId:baseline.versionId,baselineDeploymentId:baseline.deploymentId,versionId,deploymentId,moduleHash:candidate.module.sha256,configurationHash:activationConfigurationHash(candidate.configuration),completedAt:Date.now()},receipt={...raw,receiptHash:hash('ConnectionReceipt',raw)};
   await child(async c=>{const result=await activation.finish(receipt,c);current(c);if(result.status!=='recorded')fail();const actual=await activation.read(c);current(c);if(actual.state!=='installed'||canonical(actual.receipt)!==canonical(receipt))fail();});
   return Object.freeze({status:'installed',receipt:Object.freeze(receipt)});
  }
  const actual=track(Promise.resolve().then(work));
  return actual.then(outcome=>Object.freeze({outcome,admission}),()=>Object.freeze({outcome:pending(),admission})).finally(()=>{active.done=true;release();});
 }});
}
