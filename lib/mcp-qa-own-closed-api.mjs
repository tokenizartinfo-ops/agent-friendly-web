import {QA_CLOUD_CLOSED_PINS as P} from './mcp-qa-cloud-closed-pins.mjs';
import {AFW_FIXED_WORKFLOWS} from './mcp-fixed-terminal-workflows.mjs';
const ROOT='/accounts/85d0d5dadac3341a564f22ce885e9eec',ORIGIN='https://api.cloudflare.com/client/v4';
const pins=[P.qaClosed,P.canary,P.operator],QA=P.qaClosed.name,APP='d6fc71552de7494a863aca20365a572d';
const fail=()=>{throw Error('Own closed metadata request unavailable');};
function own(v,k){if(!v||Object.getPrototypeOf(v)!==Object.prototype)fail();const d=Object.getOwnPropertyDescriptor(v,k);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();return d.value;}
function exact(v,keys){if(!v||Reflect.ownKeys(v).length!==keys.length)fail();return Object.fromEntries(keys.map(k=>[k,own(v,k)]));}
function query(q,values,optional=[]){
 if(q!==undefined&&(!q||Object.getPrototypeOf(q)!==Object.prototype))fail();
 const keys=Reflect.ownKeys(q??{});if(keys.some(k=>typeof k!=='string'||!Object.hasOwn(values,k)&&!optional.includes(k)))fail();
 for(const[k,v]of Object.entries(values))if(own(q,k)!==v)fail();
 const out={...values};for(const k of optional)if(Object.hasOwn(q,k)){const s=own(q,k);if(typeof s!=='string'||!s||Buffer.byteLength(s)>1024||[...s].some(c=>c.charCodeAt(0)<=32||c.charCodeAt(0)===127))fail();out[k]=s;}
 return out;
}
function target(input){
 if(!input||Object.getPrototypeOf(input)!==Object.prototype||Reflect.ownKeys(input).some(k=>!['method','path','query'].includes(k))||own(input,'method')!=='GET')fail();
 const path=own(input,'path'),q=Object.hasOwn(input,'query')?own(input,'query'):undefined;if(typeof path!=='string'||!path.startsWith(ROOT+'/'))fail();
 const p=path.slice(ROOT.length);let checked,large=false;
 for(const pin of pins){
  if(p==='/workers/scripts/'+pin.name+'/deployments')checked=query(q,{per_page:1});
  if(p==='/workers/workers/'+pin.name+'/versions/'+pin.id){checked=query(q,{include:'modules'});large=true;}
  if(['schedules','tails'].some(part=>p==='/workers/scripts/'+pin.name+'/'+part))checked=query(q,{});
 }
 if(p==='/workers/scripts/'+QA+'/subdomain')checked=query(q,{});
 if(p==='/containers/applications/'+APP+'/instances-v2')checked=query(q,{state:'active',per_page:100});
 if(p==='/workers/durable_objects/namespaces')checked=query(q,{page:1,per_page:1000});
 if(p==='/workflows'){
  const page=q&&own(q,'page');if(!Number.isSafeInteger(page)||page<1||page>4)fail();checked=query(q,{page,per_page:100});
 }
 for(const wf of AFW_FIXED_WORKFLOWS){if(p==='/workflows/'+wf.name)checked=query(q,{});if(p==='/workflows/'+wf.name+'/instances')checked=query(q,{per_page:100},['cursor']);}
 if(checked===undefined)fail();return{path,query:checked,large,namespace:p==='/workers/durable_objects/namespaces'};
}
/** Trusted Node CLI only. Fixed GET authority; no URL, budget or write selector. */
export function createOwnClosedReadbackApi(options){
 const origin=performance.now(),o=exact(options,['credential','fetchImpl','now']),{credential,fetchImpl,now}=o;
 if(typeof credential!=='string'||!/^[A-Za-z0-9_-]{20,512}$/.test(credential)||typeof fetchImpl!=='function'||typeof now!=='function'||!Number.isFinite(origin)||origin<0)fail();
 const entered=now();if(!Number.isSafeInteger(entered)||entered<0)fail();let lastWall=entered,lastMono=origin,reads=0,closed=false,failed=false,httpStatus=null,state='idle';
 const root=new AbortController(),lease=setTimeout(()=>root.abort(),120000);
 const current=()=>{const c=exact(options,['credential','fetchImpl','now']),wall=now(),mono=performance.now();if(closed||failed||root.signal.aborted||c.credential!==credential||c.fetchImpl!==fetchImpl||c.now!==now||!Number.isSafeInteger(wall)||wall<lastWall||wall-entered>=120000||!Number.isFinite(mono)||mono<lastMono||mono-origin>=120000||reads>128)fail();lastWall=wall;lastMono=mono;return wall;};
 async function request(input){
  let timer,reader,stopRoot;const child=new AbortController();
  try{
   current();httpStatus=null;const t=target(input),started=current(),mono=lastMono,duration=Math.min(5000,entered+120000-started,origin+120000-mono);if(duration<1||++reads>128)fail();
   const check=()=>{const at=current();if(child.signal.aborted||at-started>=duration||lastMono-mono>=duration)fail();};
   const stop=new Promise((_,reject)=>{stopRoot=()=>{child.abort();reject(Error('Own closed request stopped'));};root.signal.addEventListener('abort',stopRoot,{once:true});timer=setTimeout(stopRoot,Math.max(1,Math.floor(duration)));});
   const work=async()=>{
    check();const url=new URL(ORIGIN+t.path);for(const[k,v]of Object.entries(t.query))url.searchParams.set(k,String(v));
    const r=await fetchImpl(url.href,{method:'GET',redirect:'error',cache:'no-store',signal:child.signal,headers:{Authorization:'Bearer '+credential,Accept:'application/json','Cache-Control':'no-cache','User-Agent':'AFW-own-closed-readback'}});check();
    if(!(r instanceof Response)||!Number.isSafeInteger(r.status)||r.status<100||r.status>599)fail();httpStatus=r.status;if(r.status!==200)fail();
    const date=Date.parse(r.headers.get('date')??'');if(!Number.isFinite(date)||Math.abs(current()-date)>5000||r.headers.has('age')&&r.headers.get('age')!=='0'||['HIT','REVALIDATED','STALE','UPDATING'].includes(r.headers.get('cf-cache-status')?.toUpperCase())||!(r.headers.get('content-type')??'').toLowerCase().startsWith('application/json'))fail();
    const cap=t.large?4194304:1048576,length=r.headers.get('content-length');if(length!==null&&(!/^\d+$/.test(length)||Number(length)>cap)||!r.body)fail();
    reader=r.body.getReader();const chunks=[];let size=0;while(true){check();const b=await reader.read();check();if(b.done)break;if(!(b.value instanceof Uint8Array)||(size+=b.value.length)>cap)fail();chunks.push(b.value);}
    const e=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(Buffer.concat(chunks,size)));check();
    if(!e||Object.getPrototypeOf(e)!==Object.prototype||e.success!==true||!Object.hasOwn(e,'result')||!(Array.isArray(e.errors)&&!e.errors.length||t.namespace&&e.errors===null)||!(Array.isArray(e.messages)&&!e.messages.length||t.namespace&&e.messages===null))fail();
    state='read';return e;
   };
   const e=await Promise.race([stop,work()]);check();return e;
  }catch{state='blocked';failed=true;root.abort();fail();}
  finally{clearTimeout(timer);if(stopRoot)root.signal.removeEventListener('abort',stopRoot);child.abort();if(reader)void reader.cancel().catch(()=>{});}
 }
 return Object.freeze({request,close(){closed=true;clearTimeout(lease);root.abort();},readDiagnostic(){return Object.freeze({purpose:'afw.own-closed-read-transport.v1',state,httpStatus,reads,authorizesEffects:false,operationalReadiness:false});}});
}
