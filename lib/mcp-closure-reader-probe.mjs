import {createHash} from 'node:crypto';
import {restorationConfigurationHash} from './mcp-successor-canary-restorer.mjs';
import {RELEASE_TARGET} from './mcp-release-operator-policy.mjs';
const SLOT='afw-own-successor-closure-v1',KEY='afw.closure-reader-probe.v1',ROOT='/accounts/'+RELEASE_TARGET.accountId,BASE='https://api.cloudflare.com/client/v4';
const W=RELEASE_TARGET.workerName,OP='agent-friendly-web-release-operator',FLOW='afw-release-administrative',MAX=4194304;
const RESOURCES=['canary_deployment','canary_version','operator_deployment','operator_version','operator_workflow','operator_instances','container_active_instances'];
const PUBLISH_KEY='afw.closure-publisher-probe.v1';
const PUBLISH_RESOURCES=[...RESOURCES,'canary_cron','canary_tails','operator_cron','operator_tails','canary_before_write','canary_reselection','canary_after_write','canary_closed_version','container_after_write'];
function mode(publish){return publish?{key:PUBLISH_KEY,resources:PUBLISH_RESOURCES,flag:'AFW_MCP_PUBLISHER_PROBE_ENABLED',policy:'AFW_MCP_PUBLISHER_PROBE_POLICY',operation:'qualify_closure_publisher',workflow:'mcp_closure_publisher_probe',method:'runOwnClosurePublisherProbe',step:'qualify-own-closure-publisher',success:'qualified'}:{key:KEY,resources:RESOURCES,flag:'AFW_MCP_READER_PROBE_ENABLED',policy:'AFW_MCP_READER_PROBE_POLICY',operation:'inspect_closure_reader',workflow:'mcp_closure_reader_probe',method:'runOwnClosureReaderProbe',step:'read-own-closure-provider',success:'observed'};}
const fail=()=>{throw Error('Private closure reader unavailable');};
const sha=x=>createHash('sha256').update(x).digest('hex'),hex=(x,n)=>typeof x==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(x);
const time=x=>Number.isSafeInteger(x)&&x>=0&&x<=8640000000000000;
const uuid=x=>typeof x==='string'&&/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(x);
function fields(v,keys){
 if(!v||Object.getPrototypeOf(v)!==Object.prototype||Reflect.ownKeys(v).length!==keys.length)fail();
 const out={};for(const k of keys){const d=Object.getOwnPropertyDescriptor(v,k);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();out[k]=d.value;}return out;
}
function policy(raw,publish=false){
 if(typeof raw!=='string'||Buffer.byteLength(raw)>4096)fail();
 const p=fields(JSON.parse(raw),['operation','startAt','expiresAt','canary','operator']);
 if(JSON.stringify(p)!==raw||p.operation!==mode(publish).operation||!time(p.startAt)||!time(p.expiresAt)||p.expiresAt<=p.startAt||p.expiresAt-p.startAt>600000)fail();
 for(const role of['canary','operator']){
  const r=fields(p[role],['versionId','deploymentId','moduleHash','moduleBytes','configurationHash']);
  if(!uuid(r.versionId)||!uuid(r.deploymentId)||!hex(r.moduleHash,64)||!hex(r.configurationHash,64)||!Number.isSafeInteger(r.moduleBytes)||r.moduleBytes<1||r.moduleBytes>2097152)fail();
 }
 return p;
}
const probeOutput=(publish,status,planHash=null,observedAt=null,observations=[],selectedDeploymentId=null)=>Object.freeze({purpose:mode(publish).key,status,planHash,observedAt,observations,observedSnapshotOnly:!publish,mayRetry:false,operationalReadiness:false,...publish?{selectedDeploymentId}:{}});
function receipt(raw,planHash,at,p,publish=false){
 const settings=mode(publish);
 const r=fields(raw,['purpose','status','planHash','observedAt','observations','observedSnapshotOnly','mayRetry','operationalReadiness',...publish?['selectedDeploymentId']:[]]);
 if(r.purpose!==settings.key||![settings.success,'blocked','uncertain','historical'].includes(r.status)||r.planHash!==planHash||!time(r.observedAt)||r.observedAt<p.startAt||r.observedAt>at||r.observedAt>=p.expiresAt||r.observedSnapshotOnly!==!publish||r.mayRetry!==false||r.operationalReadiness!==false||!Array.isArray(r.observations)||r.observations.length>settings.resources.length||publish&&r.selectedDeploymentId!==null&&!uuid(r.selectedDeploymentId))fail();
 for(let i=0;i<r.observations.length;i++){
  const o=fields(r.observations[i],['resource','status','httpStatus']);
  if(o.resource!==settings.resources[i]||!['matched','mismatch','denied','unavailable'].includes(o.status)||o.httpStatus!==null&&(!Number.isInteger(o.httpStatus)||o.httpStatus<100||o.httpStatus>599))fail();
 }
 if(r.status===settings.success&&(r.observations.length!==settings.resources.length||r.observations.some(o=>o.status!=='matched')||publish&&!uuid(r.selectedDeploymentId)))fail();
 return r;
}
function inventory(values,info,activeOnly=false){
 if(!Array.isArray(values)||values.length>100||!info||Object.getPrototypeOf(info)!==Object.prototype)return false;
 const allowed=['per_page','page','total_pages','count','total_count','cursor','next_cursor','next_page_token','page_token','has_more'];
 if(Reflect.ownKeys(info).some(k=>!allowed.includes(k))||info.per_page!==100||info.page!==undefined&&info.page!==1||info.total_pages!==undefined&&![0,1].includes(info.total_pages)||
  ['count','total_count'].some(k=>info[k]!==undefined&&info[k]!==values.length)||['cursor','next_cursor','next_page_token','page_token'].some(k=>info[k]!==undefined&&info[k]!=='')||info.has_more!==undefined&&info.has_more!==false)return false;
 // Workflow counts prove the page is complete; the Container endpoint
 // legitimately returns only per_page for an empty active inventory.
 if(info.total_pages===0&&values.length!==0||!activeOnly&&(info.count!==values.length||info.total_count!==values.length))return false;
 return activeOnly?values.length===0:values.every(v=>v&&['complete','errored','terminated'].includes(v.status));
}
function matched(index,envelope,p){
 const v=envelope.result;
 if(index===0||index===2){const r=p[index===0?'canary':'operator'],d=Array.isArray(v)?v[0]:v?.deployments?.[0];return d?.id===r.deploymentId&&d.strategy==='percentage'&&Array.isArray(d.versions)&&d.versions.length===1&&d.versions[0].version_id===r.versionId&&d.versions[0].percentage===100;}
 if(index===1||index===3){
  const role=index===1?'canary':'operator',r=p[role];
  if(!v||v.id!==r.versionId||v.main_module!=='index.mjs'||!Array.isArray(v.modules)||v.modules.length!==1||v.modules[0].name!=='index.mjs'||v.modules[0].content_type!=='application/javascript+module'||typeof v.modules[0].content_base64!=='string'||v.modules[0].content_base64.length>2796204||!Array.isArray(v.bindings)||v.bindings.length>100||!Array.isArray(v.urls)||v.urls.length)return false;
  const names=new Set();
  for(const b of v.bindings){if(!b||typeof b.name!=='string'||names.has(b.name))return false;names.add(b.name);if(b.type==='secret_text'&&(Reflect.ownKeys(b).length!==2||!Object.hasOwn(b,'type')||!Object.hasOwn(b,'name')))return false;if(b.name.endsWith('_ENABLED')&&(b.type!=='plain_text'||b.text!=='false'))return false;}
  const flags=role==='canary'?['AFW_DELEGATED_OAUTH_ENABLED','AFW_DOSSIER_EVENTS_ENABLED','AFW_DOSSIER_EVENTS_SCHEDULE_ENABLED','AFW_DOSSIER_MONITORING_OWNER_ENABLED','AFW_DOSSIER_OWN_SAVE_ENABLED','AFW_OAUTH_REFRESH_ENABLED','AFW_DOSSIER_RETIREMENT_READ_ENABLED','AFW_DOSSIER_SUCCESSOR_ENABLED']:['AFW_RELEASE_OPERATOR_ENABLED','AFW_RELEASE_WORKFLOW_ENABLED','AFW_RELEASE_CONFIRMATION_WORKFLOW_ENABLED'];
  if(flags.some(name=>!v.bindings.some(b=>b.name===name&&b.type==='plain_text'&&b.text==='false')))return false;
  const bytes=Buffer.from(v.modules[0].content_base64,'base64');
  return bytes.toString('base64')===v.modules[0].content_base64&&bytes.length===r.moduleBytes&&sha(bytes)===r.moduleHash&&restorationConfigurationHash(v)===r.configurationHash;
 }
 if(index===4)return v?.id==='0ee9231b-8952-46bd-8124-a0c5dbb06dd0'&&v.name===FLOW&&v.class_name==='AfwReleaseWorkflow'&&v.script_name===OP&&(v.script_deleted===undefined||v.script_deleted===false);
 return inventory(v,envelope.result_info,index===6);
}
function routes(p){
 return[
  [ROOT+'/workers/scripts/'+W+'/deployments',null],
  [ROOT+'/workers/workers/'+W+'/versions/'+p.canary.versionId,{include:'modules'}],
  [ROOT+'/workers/scripts/'+OP+'/deployments',null],
  [ROOT+'/workers/workers/'+OP+'/versions/'+p.operator.versionId,{include:'modules'}],
  [ROOT+'/workflows/'+FLOW,null],
  [ROOT+'/workflows/'+FLOW+'/instances',{per_page:100,direction:'desc'}],
  [ROOT+'/containers/applications/'+RELEASE_TARGET.namespaceId+'/instances-v2',{state:'active',per_page:100}]
 ];
}
/** Both private modes share bounds and identity guards. Only the explicit
 * publisher factory can reselect the server-pinned CLOSED version once. */
function createPrivateClosureProbe({env,ctx,fetchImpl=globalThis.fetch,now=Date.now}={},publish=false){
 const settings=mode(publish),output=(...args)=>probeOutput(publish,...args);
 if(!env||!ctx||typeof fetchImpl!=='function'||typeof now!=='function')fail();
 return Object.freeze({async run(...args){
  if(args.length!==1||!hex(args[0],64))return output('blocked');
  const planHash=args[0],controller=new AbortController();let timer,finished=false,issued=false;
  try{
   const raw=env[settings.policy],p=policy(raw,publish),storage=ctx.storage,transaction=storage?.transaction,self=env.AFW_INDEPENDENT_CLOSURE,idFromName=self?.idFromName,id=ctx.id;
   const token=env.AFW_MCP_CLOSURE_READ_TOKEN,publisher=publish?env.AFW_MCP_CLOSURE_PUBLISH_TOKEN:null,entered=now(),mono=performance.now();let lastWall=entered,lastMono=mono;
   if(sha(raw)!==planHash||env[settings.flag]!=='true'||!time(entered)||entered<p.startAt||entered>=p.expiresAt||!Number.isFinite(mono)||mono<0||typeof transaction!=='function'||typeof idFromName!=='function'||!hex(id?.toString(),64)||typeof token!=='string'||token.length<16||token.length>4096||!/^[-A-Za-z0-9_]+$/.test(token)||publish&&(typeof publisher!=='string'||publisher.length<16||publisher.length>4096||!/^[-A-Za-z0-9_]+$/.test(publisher)))fail();
   const endWall=Math.min(p.expiresAt,entered+30000),endMono=mono+endWall-entered;
   const current=()=>{
    const w=now(),m=performance.now();
    if(finished||controller.signal.aborted||!time(w)||w<lastWall||w<p.startAt||w>=endWall||!Number.isFinite(m)||m<lastMono||m>=endMono||env[settings.flag]!=='true'||env[settings.policy]!==raw||env.AFW_MCP_CLOSURE_READ_TOKEN!==token||publish&&env.AFW_MCP_CLOSURE_PUBLISH_TOKEN!==publisher||ctx.storage!==storage||storage.transaction!==transaction||ctx.id!==id||env.AFW_INDEPENDENT_CLOSURE!==self||self.idFromName!==idFromName||Reflect.apply(idFromName,self,[SLOT]).toString()!==id.toString())fail();
    lastWall=w;lastMono=m;return w;
   };current();
   const record=v=>{
    const r=fields(v,['purpose','planHash','issuedAt','finishedAt','policyStartAt','policyExpiresAt','receipt']),at=current();
    if(r.purpose!==settings.key||r.planHash!==planHash||r.policyStartAt!==p.startAt||r.policyExpiresAt!==p.expiresAt||!time(r.issuedAt)||r.issuedAt<p.startAt||r.issuedAt>=p.expiresAt||r.issuedAt>at||r.finishedAt===null&&r.receipt!==null||r.finishedAt!==null&&(!time(r.finishedAt)||r.finishedAt<r.issuedAt||r.finishedAt>=p.expiresAt||r.finishedAt>at))fail();
    if(r.receipt!==null)receipt(r.receipt,planHash,r.finishedAt,p,publish);else if(r.finishedAt!==null)fail();return r;
   };
   const key=settings.key+':'+planHash;
   const tx=async fn=>{current();const r=await Reflect.apply(transaction,storage,[async t=>{current();if(typeof t?.get!=='function'||typeof t?.put!=='function')fail();const v=await t.get(key);current();return fn(t,v===undefined?null:record(v));}]);current();return r;};
   const cancel=response=>{try{if(response instanceof Response&&!response.body?.locked)Promise.resolve(response.body?.cancel()).catch(()=>{});}catch{/* No provider error data escapes. */}};
   const read=async(path,query,body)=>{
    const child=new AbortController(),signal=AbortSignal.any([child.signal,controller.signal]),start=current(),end=Math.min(endWall,start+5000),stop=performance.now()+end-start;let childTimer,reader;
    const live=()=>{const at=current();if(signal.aborted||at>=end||performance.now()>=stop)fail();return at;};
    const work=async()=>{
     const url=new URL(BASE+path);for(const[k,v]of Object.entries(query??{}))url.searchParams.set(k,String(v));
     live();const response=await fetchImpl(url.href,{method:body===undefined?'GET':'POST',redirect:'manual',cache:'no-store',headers:{Authorization:'Bearer '+(body===undefined?token:publisher),Accept:'application/json','Cache-Control':'no-cache, no-store',Pragma:'no-cache',...body===undefined?{}:{'Content-Type':'application/json'}},...body===undefined?{}:{body:JSON.stringify(body)},signal});
     try{
      live();if(!(response instanceof Response))fail();
      if([401,403].includes(response.status))return{httpStatus:response.status,denied:true};
      if(response.status!==200||response.redirected||!response.body||!/^application\/json(?:\s*;|$)/i.test(response.headers.get('Content-Type')??''))return{httpStatus:response.status>=100?response.status:null};
      const age=response.headers.get('Age'),cache=response.headers.get('CF-Cache-Status'),size=response.headers.get('Content-Length');
      if(age!==null&&(!/^\d+$/.test(age)||Number(age)!==0)||cache!==null&&!['DYNAMIC','BYPASS','MISS'].includes(cache.toUpperCase())||size!==null&&(!/^\d+$/.test(size)||Number(size)>MAX))return{httpStatus:200};
      reader=response.body.getReader();const chunks=[];let length=0;
      for(;;){const chunk=await reader.read();live();if(chunk.done)break;if(!(chunk.value instanceof Uint8Array))fail();length+=chunk.value.byteLength;if(length>MAX)fail();chunks.push(chunk.value);}
      const bytes=new Uint8Array(length);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.byteLength;}
      const parsed=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(bytes));live();
      if(!parsed||parsed.success!==true||!Array.isArray(parsed.errors)||parsed.errors.length||!Object.hasOwn(parsed,'result'))return{httpStatus:200};
      return{httpStatus:200,envelope:parsed};
     }finally{if(!reader)cancel(response);}
    };
    try{return await Promise.race([work(),new Promise((_,reject)=>{childTimer=setTimeout(()=>{child.abort();reject(Error('Private closure reader unavailable'));},Math.max(1,Math.floor(stop-performance.now())));})]);}
    catch{current();return{httpStatus:null};}
    finally{clearTimeout(childTimer);child.abort();if(reader)try{Promise.resolve(reader.cancel()).catch(()=>{});}catch{/* Body ownership already released. */}}
   };
   const work=async()=>{
    const claimed=await tx(async(t,r)=>{
     if(r)return{previous:r};
     const row={purpose:settings.key,planHash,issuedAt:current(),finishedAt:null,policyStartAt:p.startAt,policyExpiresAt:p.expiresAt,receipt:null};
     issued=true;await t.put(key,row);current();return{issuedAt:row.issuedAt};
    });current();
    if(claimed.previous)return claimed.previous.receipt?output('historical',planHash,claimed.previous.receipt.observedAt,claimed.previous.receipt.observations,claimed.previous.receipt.selectedDeploymentId):output('uncertain',planHash);
    const observations=[];
    for(const[index,[path,query]]of routes(p).entries()){
     current();const r=await read(path,query);current();let ok=false;
     try{if(r.envelope)ok=matched(index,r.envelope,p);}catch{/* Malformed private metadata is not exported. */}
     observations.push(Object.freeze({resource:RESOURCES[index],status:r.denied?'denied':r.envelope?(ok?'matched':'mismatch'):'unavailable',httpStatus:r.httpStatus}));
    }
    let selectedDeploymentId=null,writeIssued=false;
    const observe=async(resource,path,query,match,body)=>{
     current();const r=await read(path,query,body);current();let ok=false;
     try{if(r.envelope)ok=match(r.envelope);}catch{/* No private provider content escapes. */}
     observations.push(Object.freeze({resource,status:r.denied?'denied':r.envelope?(ok?'matched':'mismatch'):'unavailable',httpStatus:r.httpStatus}));
     return ok;
    };
    if(publish&&observations.every(x=>x.status==='matched')){
     let ready=true;
     for(const[role,worker]of[['canary',W],['operator',OP]]){
      ready=await observe(role+'_cron',ROOT+'/workers/scripts/'+worker+'/schedules',null,e=>Array.isArray(e.result?.schedules)&&e.result.schedules.length===0)&&ready;
      ready=await observe(role+'_tails',ROOT+'/workers/scripts/'+worker+'/tails',null,e=>Array.isArray(e.result)&&e.result.length===0)&&ready;
     }
     if(ready)ready=await observe('canary_before_write',ROOT+'/workers/scripts/'+W+'/deployments',null,e=>matched(0,e,p));
     if(ready){
      const message='AFW closed publisher qualification '+planHash;
      const selection=d=>d?.strategy==='percentage'&&Array.isArray(d.versions)&&d.versions.length===1&&d.versions[0].version_id===p.canary.versionId&&d.versions[0].percentage===100&&d.annotations?.['workers/message']===message;
      current();writeIssued=true;
      const acknowledged=await observe('canary_reselection',ROOT+'/workers/scripts/'+W+'/deployments',null,e=>{
       const d=e.result;if(!uuid(d?.id)||d.id===p.canary.deploymentId||!selection(d))return false;selectedDeploymentId=d.id;return true;
      },{strategy:'percentage',versions:[{version_id:p.canary.versionId,percentage:100}],annotations:{'workers/message':message}});
      if(acknowledged){
       await observe('canary_after_write',ROOT+'/workers/scripts/'+W+'/deployments',null,e=>{const d=Array.isArray(e.result)?e.result[0]:e.result?.deployments?.[0];return d?.id===selectedDeploymentId&&selection(d);});
       await observe('canary_closed_version',ROOT+'/workers/workers/'+W+'/versions/'+p.canary.versionId,{include:'modules'},e=>matched(1,e,p));
       await observe('container_after_write',ROOT+'/containers/applications/'+RELEASE_TARGET.namespaceId+'/instances-v2',{state:'active',per_page:100},e=>matched(6,e,p));
      }
     }
    }
    const complete=observations.length===settings.resources.length&&observations.every(x=>x.status==='matched');
    const result=output(complete?settings.success:writeIssued?'uncertain':'blocked',planHash,current(),observations,selectedDeploymentId);
    await tx(async(t,r)=>{if(!r||r.issuedAt!==claimed.issuedAt||r.receipt!==null)fail();current();await t.put(key,{...r,finishedAt:result.observedAt,receipt:result});current();});current();return result;
   };
   timer=setTimeout(()=>{finished=true;controller.abort();},Math.max(1,Math.floor(endMono-performance.now())));
   const deadline=new Promise((_,reject)=>controller.signal.addEventListener('abort',()=>reject(Error('Private closure reader unavailable')),{once:true}));
   const result=await Promise.race([work(),deadline]);current();return result;
  }catch{return output(issued?'uncertain':'blocked',planHash);}
  finally{finished=true;clearTimeout(timer);controller.abort();}
 }});
}
export const createPrivateClosureReaderProbe=options=>createPrivateClosureProbe(options,false);
export const createPrivateClosurePublisherProbe=options=>createPrivateClosureProbe(options,true);
/** Private native Workflow dispatchers; no HTTP exposure or caller selectors. */
async function runPrivateClosureProbeWorkflow({env,event,step,now=Date.now}={},publish=false){
 const settings=mode(publish),output=(...args)=>probeOutput(publish,...args);
 try{
  let payload=event?.payload;if(typeof payload==='string'&&payload.length<=256)payload=JSON.parse(payload);
  const x=fields(payload,['operation','planHash']),raw=env[settings.policy],p=policy(raw,publish),entered=now();let last=entered,executed=false;
  if(x.operation!==settings.workflow||!hex(x.planHash,64)||sha(raw)!==x.planHash||typeof step?.do!=='function')fail();
  const current=()=>{const at=now();if(!time(at)||at<last||at<p.startAt||at>=p.expiresAt||env[settings.flag]!=='true'||env[settings.policy]!==raw)fail();last=at;return at;};current();
  const value=await step.do(settings.step,{retries:{limit:0,delay:1000,backoff:'constant'},timeout:35000},async()=>{
   executed=true;current();const ns=env.AFW_INDEPENDENT_CLOSURE;if(typeof ns?.idFromName!=='function'||typeof ns.get!=='function')fail();
   const actor=ns.get(ns.idFromName(SLOT));current();if(typeof actor?.[settings.method]!=='function')fail();
   const text=await actor[settings.method](x.planHash);const at=current();
   if(typeof text!=='string'||Buffer.byteLength(text)>8192)fail();return JSON.stringify(receipt(JSON.parse(text),x.planHash,at,p,publish));
  });
  if(typeof value!=='string'||Buffer.byteLength(value)>8192)fail();
  const at=current(),r=receipt(JSON.parse(value),x.planHash,at,p,publish);
  return r.observedAt<entered||publish&&!executed?output('historical',x.planHash,r.observedAt,r.observations,r.selectedDeploymentId):r;
 }catch{return output('blocked');}
}

export const runPrivateClosureReaderProbeWorkflow=options=>runPrivateClosureProbeWorkflow(options,false);
export const runPrivateClosurePublisherProbeWorkflow=options=>runPrivateClosureProbeWorkflow(options,true);
