import {createHash} from 'node:crypto';
import {parseOwnPermissionWithdrawalPolicy} from './mcp-own-permission-withdrawal-policy.mjs';
import {RELEASE_TARGET} from './mcp-release-operator-policy.mjs';
import {parseCanaryRestorationPolicy} from './mcp-canary-restoration-policy.mjs';
import {snapshotOwnWorkerExecution} from './mcp-own-worker-execution.mjs';
const KEY='afw.successor-canary-restoration.v1',NAME='afw-own-event-first-successor-v1';
const W=RELEASE_TARGET.workerName,OP='agent-friendly-web-release-operator',R='/accounts/'+RELEASE_TARGET.accountId,F='afw-release-administrative';
const CONFIG=['compatibility_date','compatibility_flags','main_module','containers','exports','limits','placement','usage_model','cache_options','assets','package_dependencies'];
const META=['id','number','startup_time_ms','compatibility_date','compatibility_flags','main_module','annotations','exports','usage_model','urls','source','created_on','bindings','author_id','author_email','containers','modules','limits','placement','cache_options','assets','package_dependencies','_envNames'];
const CANARY_FLAGS=['AFW_DELEGATED_OAUTH_ENABLED','AFW_DOSSIER_EVENTS_ENABLED','AFW_DOSSIER_EVENTS_SCHEDULE_ENABLED','AFW_DOSSIER_MONITORING_OWNER_ENABLED','AFW_DOSSIER_OWN_SAVE_ENABLED','AFW_OAUTH_REFRESH_ENABLED'];
const OP_FLAGS=['AFW_RELEASE_OPERATOR_ENABLED','AFW_RELEASE_WORKFLOW_ENABLED','AFW_RELEASE_CONFIRMATION_WORKFLOW_ENABLED'];
const fail=()=>{throw Error('Successor canary restoration unavailable');};
const hex=(x,n)=>typeof x==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(x);
const uuid=x=>typeof x==='string'&&/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(x);
const time=x=>Number.isSafeInteger(x)&&x>=0&&x<=8640000000000000;
const hash=x=>createHash('sha256').update(x).digest('hex');
function fields(v,keys,strict=true){
 if(!v||Object.getPrototypeOf(v)!==Object.prototype||strict&&Reflect.ownKeys(v).length!==keys.length)fail();
 const out={};for(const k of keys){const d=Object.getOwnPropertyDescriptor(v,k);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();out[k]=d.value;}return Object.freeze(out);
}
function data(value){
 let bytes=0,nodes=0;
 const copy=(v,depth)=>{
  if(++nodes>20000||depth>24)fail();
  if(v===null||typeof v==='boolean'||typeof v==='number'&&Number.isFinite(v))return v;
  if(typeof v==='string'){bytes+=Buffer.byteLength(v);if(bytes>6291456)fail();return v;}
  if(!v||typeof v!=='object'||Object.getPrototypeOf(v)!==(Array.isArray(v)?Array.prototype:Object.prototype))fail();
  const out=Array.isArray(v)?[]:{},keys=Reflect.ownKeys(v);
  if(Array.isArray(v)&&Object.keys(v).length!==v.length)fail();
  for(const k of keys){if(Array.isArray(v)&&k==='length')continue;const d=Object.getOwnPropertyDescriptor(v,k);if(typeof k!=='string'||['__proto__','toJSON','constructor'].includes(k)||!d?.enumerable||!Object.hasOwn(d,'value'))fail();Object.defineProperty(out,k,{value:copy(d.value,depth+1),enumerable:true});}
  return Object.freeze(out);
 };return copy(value,0);
}
const canonical=v=>JSON.stringify(v,(_,x)=>x&&typeof x==='object'&&!Array.isArray(x)?Object.fromEntries(Object.entries(x).sort(([a],[b])=>a<b?-1:a>b?1:0)):x);
function configurationHash(v){
 if(!Array.isArray(v.bindings))fail();const c={};for(const k of CONFIG)if(Object.hasOwn(v,k))c[k]=v[k];
 c.bindings=[...v.bindings].sort((a,b)=>a.name<b.name?-1:a.name>b.name?1:0);
 return hash('afw.canary-restoration-configuration.v1\n'+canonical(c));
}
/** Fingerprint only, never approval or authority. Does not inspect secret values. */
export function restorationConfigurationHash(metadata){
 const v=fields(metadata,[...CONFIG.filter(k=>Object.hasOwn(metadata??{},k)),'bindings'],false);
 return configurationHash(data(v));
}
function versionData(raw){
 if(!raw||Object.getPrototypeOf(raw)!==Object.prototype||Reflect.ownKeys(raw).some(k=>k!=='env'&&!META.filter(x=>x!=='_envNames').includes(k)))fail();
 const ds=Object.getOwnPropertyDescriptors(raw),out={};
 for(const[k,d]of Object.entries(ds)){if(!d.enumerable||!Object.hasOwn(d,'value'))fail();if(k==='env'){
   const e=d.value;if(!e||Object.getPrototypeOf(e)!==Object.prototype)fail();out._envNames=Object.keys(e);
  }else out[k]=d.value;
 }return data(out);
}
function emptyInventory(values,info,cursor=false){
 if(!Array.isArray(values)||values.length)fail();
 if(info===undefined){if(cursor)fail();return;}
 if(!info||Object.getPrototypeOf(info)!==Object.prototype)fail();
 const allowed=['per_page','page','total_pages','count','total_count','cursor','next_cursor','next_page_token','page_token','has_more'];
 if(Reflect.ownKeys(info).some(k=>!allowed.includes(k))||cursor&&info.per_page!==100||
  info.per_page!==undefined&&(!Number.isSafeInteger(info.per_page)||info.per_page<1||info.per_page>1000)||
  info.page!==undefined&&info.page!==1||info.total_pages!==undefined&&info.total_pages!==0&&info.total_pages!==1||
  ['count','total_count'].some(k=>info[k]!==undefined&&info[k]!==0)||
  ['cursor','next_cursor','next_page_token','page_token'].some(k=>info[k]!==undefined&&info[k]!=='')||
  info.has_more!==undefined&&info.has_more!==false)fail();
}
function versionProof(v,p,role,closed=true){
 if(v.id!==p.versionId||v.main_module!=='index.mjs'||!Array.isArray(v.modules)||v.modules.length!==1||v.modules[0].name!=='index.mjs'||v.modules[0].content_type!=='application/javascript+module'||typeof v.modules[0].content_base64!=='string'||v.modules[0].content_base64.length>2796204||!Array.isArray(v.urls)||v.urls.length)fail();
 const raw=Buffer.from(v.modules[0].content_base64,'base64');if(raw.toString('base64')!==v.modules[0].content_base64||raw.length!==p.moduleBytes||hash(raw)!==p.moduleHash||configurationHash(v)!==p.configurationHash)fail();
 if(v.compatibility_date!=='2026-09-07'||canonical(v.compatibility_flags)!==canonical(['nodejs_compat','global_fetch_strictly_public'])||v.usage_model!=='standard'||!Array.isArray(v.bindings)||v.bindings.length>100)fail();
 const bs=v.bindings,names=new Set();for(const b of bs){
  if(!b||typeof b.name!=='string'||!/^[_A-Za-z][_A-Za-z0-9]{0,127}$/.test(b.name)||names.has(b.name)||!['plain_text','secret_text','d1','kv_namespace','durable_object_namespace','ratelimit'].includes(b.type))fail();names.add(b.name);
  if(b.type==='secret_text'&&Reflect.ownKeys(b).length!==2)fail();
 }
 if(v._envNames!==undefined&&(!Array.isArray(v._envNames)||v._envNames.length!==names.size||v._envNames.some(n=>!names.has(n))))fail();
 const binding=n=>bs.find(b=>b.name===n),node=binding(role==='canary'?'AFW_DOSSIER_EVENTS_NODE':'AFW_RELEASE_EVENTS_NODE'),db=binding(role==='canary'?'DB':'RELEASE_DB');
 if(node?.type!=='durable_object_namespace'||node.namespace_id!==RELEASE_TARGET.namespaceId||node.class_name!=='AfwOwnEventNode'||node.script_name!==undefined&&node.script_name!==W||node.environment!==undefined||node.dispatch_namespace!==undefined||bs.filter(b=>b.type==='durable_object_namespace').length!==1||
  db?.type!=='d1'||db.id!==RELEASE_TARGET.databaseId||db.database_id!==undefined&&db.database_id!==RELEASE_TARGET.databaseId||bs.filter(b=>b.type==='d1').length!==1)fail();
 const flags=bs.filter(b=>b.name.startsWith('AFW_')&&b.name.endsWith('_ENABLED'));
 if(role==='canary'){
  const kv=binding('OAUTH_KV');if(kv?.type!=='kv_namespace'||kv.namespace_id!==RELEASE_TARGET.kvId||bs.filter(b=>b.type==='kv_namespace').length!==1)fail();
  snapshotOwnWorkerExecution(v);
  if(closed&&(bs.length!==29||flags.length!==8||CANARY_FLAGS.some(n=>binding(n)?.type!=='plain_text'||binding(n).text!=='false')))fail();
 }else if(bs.length!==7||flags.length!==3||bs.some(b=>b.type==='kv_namespace')||v.containers!==undefined&&(!Array.isArray(v.containers)||v.containers.length)||OP_FLAGS.some(n=>binding(n)?.type!=='plain_text'||binding(n).text!=='false'))fail();
 if(closed&&flags.some(b=>b.type!=='plain_text'||b.text!=='false'))fail();
 return true;
}
const outcome=(status,extra={})=>Object.freeze({status,mayRetry:false,mayStartSuccessor:false,nativeWithdrawalVerified:false,operationalReadiness:false,observedSnapshotOnly:true,apiCancellationSupported:false,...extra});
/** Detached private coordinator. All dependencies are trusted server capabilities.
 * No HTTP/MCP mount, token setup, native withdrawal, process stop or new host. */
export function createSuccessorCanaryRestorer({storage,namespace,readControl,readHandoff,request,now=Date.now,timeoutMs=30000}={}){
 if([readControl,readHandoff,request,now].some(x=>typeof x!=='function')||!Number.isSafeInteger(timeoutMs)||timeoutMs<1||timeoutMs>30000)fail();
 async function run(){
  let issued=false,finished=false,timer,lastW=-1,lastM=-1,lastProofAt,p,raw,planHash,proofHash,reads=0,transaction,idFromName,idFromString,absoluteEnd,endM;
  const abort=new AbortController();
  try{
   const entryWall=now(),entryMono=performance.now();if(!time(entryWall)||!Number.isFinite(entryMono)||entryMono<0)fail();
   const c=fields(readControl(),['enabled','policy']);if(c.enabled!==true)return outcome('blocked');
   raw=c.policy;p=data(parseCanaryRestorationPolicy(raw));
   transaction=storage?.transaction;idFromName=namespace?.idFromName;idFromString=namespace?.idFromString;
   if([transaction,idFromName,idFromString].some(x=>typeof x!=='function'))fail();
   planHash=hash(raw);const w=entryWall,m=entryMono;if(!time(w)||w<p.startAt||w>=p.expiresAt||!Number.isFinite(m)||m<0)fail();
   absoluteEnd=Math.min(p.expiresAt,w+timeoutMs);endM=m+(absoluteEnd-w);
   const clock=()=>{
    const n=now(),tick=performance.now(),a=fields(readControl(),['enabled','policy']);
    if(finished||abort.signal.aborted||!time(n)||n<lastW||n<p.startAt||n>=absoluteEnd||!Number.isFinite(tick)||tick<lastM||tick>=endM||a.enabled!==true||a.policy!==raw||
     Reflect.apply(idFromName,namespace,[NAME]).toString()!==p.candidate.containerId||Reflect.apply(idFromString,namespace,[p.candidate.containerId]).toString()!==p.candidate.containerId)fail();lastW=n;lastM=tick;return n;
   };clock();
   const fresh=()=>{const n=clock();if(lastProofAt===undefined||n<lastProofAt||n-lastProofAt>5000)fail();return n;};
   const record=value=>{
    const x=fields(value,['purpose','planHash','phase','proofHash','issuedAt','deploymentId','completedAt']);
    if(x.purpose!==KEY||x.planHash!==planHash||!hex(x.proofHash,64)||!['issued','complete'].includes(x.phase)||!time(x.issuedAt)||x.issuedAt<p.startAt||x.issuedAt>=p.expiresAt||x.issuedAt>clock()||
     (x.phase==='issued'?(x.deploymentId!==null||x.completedAt!==null):(!uuid(x.deploymentId)||x.deploymentId===p.live.deploymentId||!time(x.completedAt)||x.completedAt<x.issuedAt||x.completedAt>=p.expiresAt||x.completedAt>clock())))fail();
    return x;
   };
   const transact=async fn=>{clock();const v=await Reflect.apply(transaction,storage,[async tx=>{clock();if(typeof tx?.get!=='function'||typeof tx?.put!=='function')fail();const row=await tx.get(KEY);clock();return fn(tx,row===undefined?null:record(data(row)));}]);clock();return v;};
   const call=async input=>{
    clock();if(input.method==='GET'&&++reads>64)fail();
    const response=await request(Object.freeze({...input,signal:abort.signal}),clock);clock();
    const e=fields(response,['success','status','result','errors'],false);if(e.success!==true||!Number.isInteger(e.status)||e.status<200||e.status>=300||!Array.isArray(e.errors)||e.errors.length)fail();
    const value=input.path.includes('/workers/workers/')?versionData(e.result):data(e.result);
    const d=Object.getOwnPropertyDescriptor(response,'result_info');if(d&&(!d.enumerable||!Object.hasOwn(d,'value')))fail();
    const info=d?data(d.value):undefined;clock();return{value,info};
   };
   const get=async(path,query)=>call({method:'GET',path:R+path,...query?{query}:{}});
   const current=async n=>{const r=(await get('/workers/scripts/'+n+'/deployments')).value;return(Array.isArray(r)?r:r.deployments)?.[0];};
   const pointer=(d,v,id)=>{if(!d||!uuid(d.id)||d.id!==id||d.strategy!=='percentage'||!Array.isArray(d.versions)||d.versions.length!==1||d.versions[0].version_id!==v||d.versions[0].percentage!==100)fail();};
   const handoff=async()=>{
    clock();const h=data(await readHandoff(Object.freeze({signal:abort.signal}),clock));clock();
    fields(h,['status','physicalStopVerified','mayStartSuccessor','mayRestoreAdministration','operationalReadiness',...Object.keys(p.candidate),'processGeneration','closedAt','stoppedAt','capturedAt','observedAt']);
    if(h.status!=='retired_handoff_observed'||h.physicalStopVerified!==true||h.mayStartSuccessor!==false||h.mayRestoreAdministration!==false||h.operationalReadiness!==false||Object.keys(p.candidate).some(k=>h[k]!==p.candidate[k])||!hex(h.processGeneration,64)||!['closedAt','stoppedAt','capturedAt','observedAt'].every(k=>time(h[k]))||h.closedAt>h.capturedAt||h.stoppedAt>h.capturedAt||h.capturedAt>h.observedAt||h.observedAt>lastW||lastW-h.observedAt>5000)fail();
    const value=hash(canonical(Object.fromEntries(Object.entries(h).filter(([k])=>k!=='observedAt'))));if(proofHash!==undefined&&value!==proofHash)fail();lastProofAt=h.observedAt;return value;
   };
   const passive=async()=>{
    const jobs=[get('/workflows/'+F),get('/workflows/'+F+'/instances',{per_page:100,direction:'desc'}),get('/containers/applications/'+RELEASE_TARGET.namespaceId+'/instances-v2',{state:'active',per_page:100})];
    for(const n of[W,OP])for(const part of['schedules','tails'])jobs.push(get('/workers/scripts/'+n+'/'+part));
    const xs=await Promise.all(jobs);clock();const f=xs[0].value,i=xs[1].info,rows=xs[1].value,cs=xs[2];
    if(f.id!=='0ee9231b-8952-46bd-8124-a0c5dbb06dd0'||f.name!==F||f.script_name!==OP||f.class_name!=='AfwReleaseWorkflow'||f.script_deleted===true||f.schedules!==undefined&&(!Array.isArray(f.schedules)||f.schedules.length)||
     !Array.isArray(rows)||rows.length>100||!i||i.per_page!==100||i.count!==rows.length||i.total_count!==rows.length||i.page!==undefined&&i.page!==1||i.total_pages!==undefined&&i.total_pages!==1||i.cursor||i.next_cursor||i.next_page_token||i.has_more!==undefined&&i.has_more!==false||
     rows.some(x=>typeof x.id!=='string'||!['complete','errored','terminated'].includes(x.status))||new Set(rows.map(x=>x.id)).size!==rows.length)fail();
    emptyInventory(cs.value,cs.info,true);
    for(let n=3;n<xs.length;n++){const v=xs[n].value,a=Array.isArray(v)?v:v.schedules;emptyInventory(a,xs[n].info);}
   };
   const pointers=async(versionId,deploymentId)=>{const[a,b]=await Promise.all([current(W),current(OP)]);clock();pointer(a,versionId,deploymentId);pointer(b,p.operator.versionId,p.operator.deploymentId);return a;};
   const qualify=async(mode,deploymentId)=>{
    const values=await Promise.all([current(W),current(OP),get('/workers/workers/'+W+'/versions/'+p.closed.versionId,{include:'modules'}),get('/workers/workers/'+OP+'/versions/'+p.operator.versionId,{include:'modules'}),...(mode==='live'||mode==='either'?[get('/workers/workers/'+W+'/versions/'+p.live.versionId,{include:'modules'})]:[]),passive()]);
    clock();const[a,b,c,o]=values;pointer(b,p.operator.versionId,p.operator.deploymentId);
    versionProof(c.value,p.closed,'canary');versionProof(o.value,p.operator,'operator');
    if(mode==='live'||mode==='either')versionProof(values[4].value,{...p.closed,...p.live},'canary',false);
    const isClosed=a?.versions?.[0]?.version_id===p.closed.versionId;
    if(mode==='closed'||mode==='either'&&isClosed)pointer(a,p.closed.versionId,deploymentId??a?.id);else pointer(a,p.live.versionId,p.live.deploymentId);
    return a;
   };
   const work=async()=>{
    const before=await transact((_tx,s)=>s);clock();if(before){issued=true;proofHash=before.proofHash;}
    const firstProof=await handoff();if(proofHash!==undefined&&firstProof!==proofHash)fail();proofHash=firstProof;
    if(before){
     const d=await qualify(before.phase==='complete'?'closed':'either',before.deploymentId??undefined);await handoff();await pointers(d.versions[0].version_id,d.id);const at=fresh();
     if(before.phase==='issued')return outcome(d.versions[0].version_id===p.closed.versionId?'closed_observed_uncertain':'uncertain',{planHash,versionId:d.versions[0].version_id,deploymentId:d.id,observedAt:at});
     return outcome('restored_observed',{planHash,versionId:p.closed.versionId,deploymentId:before.deploymentId,observedAt:at});
    }
    await qualify('live');await handoff();clock();
    const issuedAt=fresh();
    const claimed=await transact(async(tx,s)=>{if(s)return false;fresh();issued=true;await tx.put(KEY,{purpose:KEY,planHash,phase:'issued',proofHash,issuedAt,deploymentId:null,completedAt:null});clock();return true;});
    clock();if(!claimed)return outcome('uncertain',{planHash});
    await pointers(p.live.versionId,p.live.deploymentId);await handoff();fresh();
    const body=Object.freeze({strategy:'percentage',versions:Object.freeze([Object.freeze({version_id:p.closed.versionId,percentage:100})]),annotations:Object.freeze({'workers/message':'AFW closed canary restoration '+planHash})});
    const ack=(await call({method:'POST',path:R+'/workers/scripts/'+W+'/deployments',body})).value;
    if(!uuid(ack.id)||ack.id===p.live.deploymentId||ack.strategy!==undefined&&ack.strategy!=='percentage'||ack.versions!==undefined&&(ack.versions.length!==1||ack.versions[0].version_id!==p.closed.versionId||ack.versions[0].percentage!==100))fail();
    await qualify('closed',ack.id);await handoff();await pointers(p.closed.versionId,ack.id);const completedAt=fresh();
    const saved=await transact(async(tx,s)=>{if(!s||s.phase!=='issued'||s.proofHash!==proofHash||s.issuedAt!==issuedAt)fail();fresh();await tx.put(KEY,{...s,phase:'complete',deploymentId:ack.id,completedAt});clock();return true;});
    clock();if(saved!==true)fail();return outcome('restored_observed',{planHash,versionId:p.closed.versionId,deploymentId:ack.id,observedAt:fresh()});
   };
   const value=await Promise.race([work(),new Promise((_,reject)=>{timer=setTimeout(()=>{finished=true;abort.abort();reject(Error('Successor canary restoration unavailable'));},Math.max(1,Math.floor(endM-lastM)));})]);clock();if(['restored_observed','closed_observed_uncertain'].includes(value.status))fresh();return value;
  }catch{return outcome(issued?'uncertain':'blocked',planHash?{planHash}:{});}
  finally{finished=true;clearTimeout(timer);abort.abort();}
 }
 return Object.freeze({advance:(...args)=>args.length?Promise.resolve(outcome('blocked')):run()});
}

/** Strict snapshot check only. It conveys no permission and performs no I/O. */
export function qualifyPermissionReductionSnapshot(input){
 const x=fields(input,['policy','withdrawalPolicyHash','canaryDeployment','operatorDeployment','canaryVersion','operatorVersion','observedAt']);
 const p=parseCanaryRestorationPolicy(x.policy);
 if(!hex(x.withdrawalPolicyHash,64))fail();
 const pointer=(d,id,v)=>{
  const a=data(d);
  if(a?.id!==id||a.strategy!=='percentage'||!Array.isArray(a.versions)||a.versions.length!==1||
   a.versions[0].version_id!==v||a.versions[0].percentage!==100)fail();
 };
 pointer(x.canaryDeployment,p.live.deploymentId,p.live.versionId);
 pointer(x.operatorDeployment,p.operator.deploymentId,p.operator.versionId);
 const canary=versionData(x.canaryVersion),operator=versionData(x.operatorVersion);
 versionProof(canary,{...p.closed,...p.live},'canary',false);
 versionProof(operator,p.operator,'operator');
 const flag=canary.bindings.find(b=>b.name==='AFW_DOSSIER_PERMISSION_WITHDRAWAL_ENABLED');
 const policy=canary.bindings.find(b=>b.name==='AFW_DOSSIER_PERMISSION_WITHDRAWAL_POLICY');
 if(flag?.type!=='plain_text'||flag.text!=='true'||policy?.type!=='plain_text'||typeof policy.text!=='string'||
  hash(policy.text)!==x.withdrawalPolicyHash)fail();
 const original=parseOwnPermissionWithdrawalPolicy(policy.text);
 if(!time(x.observedAt)||x.observedAt<original.startAt||x.observedAt>=original.expiresAt||
  ['containerId','programHash','sourceRevision'].some(k=>original[k]!==p.candidate[k]))fail();
 return Object.freeze({qualifiedSnapshot:true,withdrawalExpiresAt:original.expiresAt});
}
