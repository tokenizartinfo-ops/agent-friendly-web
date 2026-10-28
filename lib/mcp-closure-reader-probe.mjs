import {createHash} from 'node:crypto';
import {restorationConfigurationHash} from './mcp-successor-canary-restorer.mjs';
import {RELEASE_TARGET} from './mcp-release-operator-policy.mjs';
const SLOT='afw-own-successor-closure-v1',KEY='afw.closure-reader-probe.v1',ROOT='/accounts/'+RELEASE_TARGET.accountId,BASE='https://api.cloudflare.com/client/v4';
const W=RELEASE_TARGET.workerName,OP='agent-friendly-web-release-operator',FLOW='afw-release-administrative',MAX=4194304;
const RESOURCES=['canary_deployment','canary_version','operator_deployment','operator_version','operator_workflow','operator_instances','container_active_instances'];
const fail=()=>{throw Error('Private closure reader unavailable');};
const sha=x=>createHash('sha256').update(x).digest('hex'),hex=(x,n)=>typeof x==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(x);
const time=x=>Number.isSafeInteger(x)&&x>=0&&x<=8640000000000000;
const uuid=x=>typeof x==='string'&&/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(x);
function fields(v,keys){
 if(!v||Object.getPrototypeOf(v)!==Object.prototype||Reflect.ownKeys(v).length!==keys.length)fail();
 const out={};for(const k of keys){const d=Object.getOwnPropertyDescriptor(v,k);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();out[k]=d.value;}return out;
}
function policy(raw){
 if(typeof raw!=='string'||Buffer.byteLength(raw)>4096)fail();
 const p=fields(JSON.parse(raw),['operation','startAt','expiresAt','canary','operator']);
 if(JSON.stringify(p)!==raw||p.operation!=='inspect_closure_reader'||!time(p.startAt)||!time(p.expiresAt)||p.expiresAt<=p.startAt||p.expiresAt-p.startAt>600000)fail();
 for(const role of['canary','operator']){
  const r=fields(p[role],['versionId','deploymentId','moduleHash','moduleBytes','configurationHash']);
  if(!uuid(r.versionId)||!uuid(r.deploymentId)||!hex(r.moduleHash,64)||!hex(r.configurationHash,64)||!Number.isSafeInteger(r.moduleBytes)||r.moduleBytes<1||r.moduleBytes>2097152)fail();
 }
 return p;
}
const output=(status,planHash=null,observedAt=null,observations=[])=>Object.freeze({purpose:KEY,status,planHash,observedAt,observations,observedSnapshotOnly:true,mayRetry:false,operationalReadiness:false});
function receipt(raw,planHash,at,p){
 const r=fields(raw,['purpose','status','planHash','observedAt','observations','observedSnapshotOnly','mayRetry','operationalReadiness']);
 if(r.purpose!==KEY||!['observed','blocked','uncertain','historical'].includes(r.status)||r.planHash!==planHash||!time(r.observedAt)||r.observedAt<p.startAt||r.observedAt>at||r.observedAt>=p.expiresAt||r.observedSnapshotOnly!==true||r.mayRetry!==false||r.operationalReadiness!==false||!Array.isArray(r.observations)||r.observations.length>7)fail();
 for(let i=0;i<r.observations.length;i++){
  const o=fields(r.observations[i],['resource','status','httpStatus']);
  if(o.resource!==RESOURCES[i]||!['matched','mismatch','denied','unavailable'].includes(o.status)||o.httpStatus!==null&&(!Number.isInteger(o.httpStatus)||o.httpStatus<100||o.httpStatus>599))fail();
 }
 if(r.status==='observed'&&(r.observations.length!==7||r.observations.some(o=>o.status!=='matched')))fail();
 return r;
}
function inventory(values,info,activeOnly=false){
 if(!Array.isArray(values)||values.length>100||!info||Object.getPrototypeOf(info)!==Object.prototype)return false;
 const allowed=['per_page','page','total_pages','count','total_count','cursor','next_cursor','next_page_token','page_token','has_more'];
 if(Reflect.ownKeys(info).some(k=>!allowed.includes(k))||info.per_page!==100||info.page!==undefined&&info.page!==1||info.total_pages!==undefined&&![0,1].includes(info.total_pages)||
  ['count','total_count'].some(k=>info[k]!==undefined&&info[k]!==values.length)||['cursor','next_cursor','next_page_token','page_token'].some(k=>info[k]!==undefined&&info[k]!=='')||info.has_more!==undefined&&info.has_more!==false)return false;
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
 if(index===4)return v?.id==='0ee9231b-8952-46bd-8124-a0c5dbb06dd0'&&v.name===FLOW&&v.class_name==='AfwReleaseWorkflow'&&v.script_name===OP;
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
/** One private, durable read budget. No caller URL, write method, credential,
 * grant, original-node RPC, alarm or lifecycle authority. */
export function createPrivateClosureReaderProbe({env,ctx,fetchImpl=globalThis.fetch,now=Date.now}={}){
 if(!env||!ctx||typeof fetchImpl!=='function'||typeof now!=='function')fail();
 return Object.freeze({async run(...args){
  if(args.length!==1||!hex(args[0],64))return output('blocked');
  const planHash=args[0],controller=new AbortController();let timer,finished=false,issued=false;
  try{
   const raw=env.AFW_MCP_READER_PROBE_POLICY,p=policy(raw),storage=ctx.storage,transaction=storage?.transaction,self=env.AFW_INDEPENDENT_CLOSURE,idFromName=self?.idFromName,id=ctx.id;
   const token=env.AFW_MCP_CLOSURE_READ_TOKEN,entered=now(),mono=performance.now();let lastWall=entered,lastMono=mono;
   if(sha(raw)!==planHash||env.AFW_MCP_READER_PROBE_ENABLED!=='true'||!time(entered)||entered<p.startAt||entered>=p.expiresAt||!Number.isFinite(mono)||mono<0||typeof transaction!=='function'||typeof idFromName!=='function'||!hex(id?.toString(),64)||typeof token!=='string'||token.length<16||token.length>4096||!/^[-A-Za-z0-9_]+$/.test(token))fail();
   const endWall=Math.min(p.expiresAt,entered+30000),endMono=mono+endWall-entered;
   const current=()=>{
    const w=now(),m=performance.now();
    if(finished||controller.signal.aborted||!time(w)||w<lastWall||w<p.startAt||w>=endWall||!Number.isFinite(m)||m<lastMono||m>=endMono||env.AFW_MCP_READER_PROBE_ENABLED!=='true'||env.AFW_MCP_READER_PROBE_POLICY!==raw||env.AFW_MCP_CLOSURE_READ_TOKEN!==token||ctx.storage!==storage||storage.transaction!==transaction||ctx.id!==id||env.AFW_INDEPENDENT_CLOSURE!==self||self.idFromName!==idFromName||Reflect.apply(idFromName,self,[SLOT]).toString()!==id.toString())fail();
    lastWall=w;lastMono=m;return w;
   };current();
   const record=v=>{
    const r=fields(v,['purpose','planHash','issuedAt','finishedAt','policyStartAt','policyExpiresAt','receipt']),at=current();
    if(r.purpose!==KEY||r.planHash!==planHash||r.policyStartAt!==p.startAt||r.policyExpiresAt!==p.expiresAt||!time(r.issuedAt)||r.issuedAt<p.startAt||r.issuedAt>=p.expiresAt||r.issuedAt>at||r.finishedAt===null&&r.receipt!==null||r.finishedAt!==null&&(!time(r.finishedAt)||r.finishedAt<r.issuedAt||r.finishedAt>=p.expiresAt||r.finishedAt>at))fail();
    if(r.receipt!==null)receipt(r.receipt,planHash,r.finishedAt,p);else if(r.finishedAt!==null)fail();return r;
   };
   const key=KEY+':'+planHash;
   const tx=async fn=>{current();const r=await Reflect.apply(transaction,storage,[async t=>{current();if(typeof t?.get!=='function'||typeof t?.put!=='function')fail();const v=await t.get(key);current();return fn(t,v===undefined?null:record(v));}]);current();return r;};
   const cancel=response=>{try{if(response instanceof Response&&!response.body?.locked)Promise.resolve(response.body?.cancel()).catch(()=>{});}catch{/* No provider error data escapes. */}};
   const read=async(path,query)=>{
    const child=new AbortController(),signal=AbortSignal.any([child.signal,controller.signal]),start=current(),end=Math.min(endWall,start+5000),stop=performance.now()+end-start;let childTimer,reader;
    const live=()=>{const at=current();if(signal.aborted||at>=end||performance.now()>=stop)fail();return at;};
    const work=async()=>{
     const url=new URL(BASE+path);for(const[k,v]of Object.entries(query??{}))url.searchParams.set(k,String(v));
     live();const response=await fetchImpl(url.href,{method:'GET',redirect:'manual',cache:'no-store',headers:{Authorization:'Bearer '+token,Accept:'application/json','Cache-Control':'no-cache, no-store',Pragma:'no-cache'},signal});
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
     const row={purpose:KEY,planHash,issuedAt:current(),finishedAt:null,policyStartAt:p.startAt,policyExpiresAt:p.expiresAt,receipt:null};
     issued=true;await t.put(key,row);current();return{issuedAt:row.issuedAt};
    });current();
    if(claimed.previous)return claimed.previous.receipt?output('historical',planHash,claimed.previous.receipt.observedAt,claimed.previous.receipt.observations):output('uncertain',planHash);
    const observations=[];
    for(const[index,[path,query]]of routes(p).entries()){
     current();const r=await read(path,query);current();let ok=false;
     try{if(r.envelope)ok=matched(index,r.envelope,p);}catch{/* Malformed private metadata is not exported. */}
     observations.push(Object.freeze({resource:RESOURCES[index],status:r.denied?'denied':r.envelope?(ok?'matched':'mismatch'):'unavailable',httpStatus:r.httpStatus}));
    }
    const result=output(observations.every(x=>x.status==='matched')?'observed':'blocked',planHash,current(),observations);
    await tx(async(t,r)=>{if(!r||r.issuedAt!==claimed.issuedAt||r.receipt!==null)fail();current();await t.put(key,{...r,finishedAt:result.observedAt,receipt:result});current();});current();return result;
   };
   timer=setTimeout(()=>{finished=true;controller.abort();},Math.max(1,Math.floor(endMono-performance.now())));
   const deadline=new Promise((_,reject)=>controller.signal.addEventListener('abort',()=>reject(Error('Private closure reader unavailable')),{once:true}));
   const result=await Promise.race([work(),deadline]);current();return result;
  }catch{return output(issued?'uncertain':'blocked',planHash);}
  finally{finished=true;clearTimeout(timer);controller.abort();}
 }});
}
/** Private native Workflow dispatcher; no HTTP exposure or caller selectors. */
export async function runPrivateClosureReaderProbeWorkflow({env,event,step,now=Date.now}={}){
 try{
  let payload=event?.payload;if(typeof payload==='string'&&payload.length<=256)payload=JSON.parse(payload);
  const x=fields(payload,['operation','planHash']),raw=env.AFW_MCP_READER_PROBE_POLICY,p=policy(raw),entered=now();let last=entered;
  if(x.operation!=='mcp_closure_reader_probe'||!hex(x.planHash,64)||sha(raw)!==x.planHash||typeof step?.do!=='function')fail();
  const current=()=>{const at=now();if(!time(at)||at<last||at<p.startAt||at>=p.expiresAt||env.AFW_MCP_READER_PROBE_ENABLED!=='true'||env.AFW_MCP_READER_PROBE_POLICY!==raw)fail();last=at;return at;};current();
  const value=await step.do('read-own-closure-provider',{retries:{limit:0,delay:1000,backoff:'constant'},timeout:35000},async()=>{
   current();const ns=env.AFW_INDEPENDENT_CLOSURE;if(typeof ns?.idFromName!=='function'||typeof ns.get!=='function')fail();
   const actor=ns.get(ns.idFromName(SLOT));current();if(typeof actor?.runOwnClosureReaderProbe!=='function')fail();
   const text=await actor.runOwnClosureReaderProbe(x.planHash);const at=current();
   if(typeof text!=='string'||Buffer.byteLength(text)>8192)fail();return JSON.stringify(receipt(JSON.parse(text),x.planHash,at,p));
  });
  if(typeof value!=='string'||Buffer.byteLength(value)>8192)fail();
  const at=current(),r=receipt(JSON.parse(value),x.planHash,at,p);
  return r.observedAt<entered?output('historical',x.planHash,r.observedAt,r.observations):r;
 }catch{return output('blocked');}
}
