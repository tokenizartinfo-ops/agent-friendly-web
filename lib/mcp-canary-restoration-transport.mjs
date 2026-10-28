import {createHash} from 'node:crypto';
import {RELEASE_TARGET} from './mcp-release-operator-policy.mjs';
const W=RELEASE_TARGET.workerName,OP='agent-friendly-web-release-operator',ROOT='/accounts/'+RELEASE_TARGET.accountId,BASE='https://api.cloudflare.com/client/v4',F='afw-release-administrative',MAX=4194304;
const fail=()=>{throw Error('Canary restoration transport unavailable');};
const hex=(x,n)=>typeof x==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(x);
const uuid=x=>typeof x==='string'&&/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(x);
const time=x=>Number.isSafeInteger(x)&&x>=0&&x<=8640000000000000;
function fields(v,keys){
 if(!v||Object.getPrototypeOf(v)!==Object.prototype||Reflect.ownKeys(v).length!==keys.length)fail();
 const x={};for(const k of keys){const d=Object.getOwnPropertyDescriptor(v,k);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();x[k]=d.value;}return Object.freeze(x);
}
function policy(raw){
 if(typeof raw!=='string'||Buffer.byteLength(raw)>8192)fail();
 const p=JSON.parse(raw);fields(p,['operation','startAt','expiresAt','candidate','live','closed','operator']);
 fields(p.candidate,['containerId','applicationId','programHash','sourceRevision']);fields(p.live,['versionId','deploymentId','configurationHash']);fields(p.closed,['versionId','moduleHash','moduleBytes','configurationHash']);fields(p.operator,['versionId','deploymentId','moduleHash','moduleBytes','configurationHash']);
 if(JSON.stringify(p)!==raw||p.operation!=='restore_canary'||!time(p.startAt)||!time(p.expiresAt)||p.expiresAt<=p.startAt||p.expiresAt-p.startAt>600000||
  !hex(p.candidate.containerId,64)||p.candidate.applicationId!==RELEASE_TARGET.namespaceId||!hex(p.candidate.programHash,64)||!hex(p.candidate.sourceRevision,40)||
  !uuid(p.live.deploymentId)||!uuid(p.operator.deploymentId)||[p.live,p.closed,p.operator].some(x=>!uuid(x.versionId)||!hex(x.configurationHash,64))||
  p.live.versionId===p.closed.versionId||[p.closed,p.operator].some(x=>!hex(x.moduleHash,64)||!Number.isSafeInteger(x.moduleBytes)||x.moduleBytes<1||x.moduleBytes>2097152))fail();
 return p;
}
function routes(p){
 const m=new Map();for(const n of[W,OP])for(const part of['deployments','schedules','tails'])m.set(ROOT+'/workers/scripts/'+n+'/'+part,null);
 for(const[n,id]of[[W,p.live.versionId],[W,p.closed.versionId],[OP,p.operator.versionId]])m.set(ROOT+'/workers/workers/'+n+'/versions/'+id,{include:'modules'});
 m.set(ROOT+'/workflows/'+F,null);m.set(ROOT+'/workflows/'+F+'/instances',{per_page:100,direction:'desc'});
 m.set(ROOT+'/containers/applications/'+RELEASE_TARGET.namespaceId+'/instances-v2',{state:'active',per_page:100});
 return m;
}
function input(value,p,raw){
 const ds=value&&Object.getOwnPropertyDescriptors(value);
 if(!ds)fail();const keys=['method','path','signal',...Object.hasOwn(ds,'query')?['query']:[],...Object.hasOwn(ds,'body')?['body']:[]],v=fields(value,keys);
 if(typeof v.path!=='string'||!(v.signal instanceof AbortSignal)||v.signal.aborted)fail();
 if(v.method==='GET'){
  const allowed=routes(p);if(!allowed.has(v.path)||Object.hasOwn(v,'body'))fail();
  const q=allowed.get(v.path);if(q){const x=fields(v.query,Object.keys(q));if(Object.keys(q).some(k=>x[k]!==q[k]))fail();return{...v,query:q};}
  if(Object.hasOwn(v,'query'))fail();return v;
 }
 if(v.method!=='POST'||v.path!==ROOT+'/workers/scripts/'+W+'/deployments'||Object.hasOwn(v,'query'))fail();
 const b=fields(v.body,['strategy','versions','annotations']);if(b.strategy!=='percentage'||!Array.isArray(b.versions)||b.versions.length!==1||Reflect.ownKeys(b.versions).length!==2)fail();
 const d=Object.getOwnPropertyDescriptor(b.versions,'0');if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();
 const version=fields(d.value,['version_id','percentage']),annotation=fields(b.annotations,['workers/message']),message='AFW closed canary restoration '+createHash('sha256').update(raw).digest('hex');
 if(version.version_id!==p.closed.versionId||version.percentage!==100||annotation['workers/message']!==message)fail();
 return{...v,body:{strategy:'percentage',versions:[{version_id:p.closed.versionId,percentage:100}],annotations:{'workers/message':message}}};
}
function versionProjection(value){
 if(!value||Object.getPrototypeOf(value)!==Object.prototype||!Array.isArray(value.bindings))fail();
 for(const b of value.bindings)if(b?.type==='secret_text'){const x=fields(b,['name','type']);if(typeof x.name!=='string'||!x.name.length)fail();}
 const result={...value};
 if(Object.hasOwn(value,'env')){
  const e=value.env;if(!e||Object.getPrototypeOf(e)!==Object.prototype)fail();
  result.env=Object.fromEntries(Object.keys(e).map(k=>[k,null]));
 }
 return result;
}
/** Server-only fixed transport, not a public proxy or write authority.
 * The caller must be core629 with its durable issued-before-effect journal.
 * No credentials, host, retries, scheduling or native withdrawal are installed. */
export function createCanaryRestorationTransport({readControl,readReadCredential,readPublishCredential,fetchImpl=globalThis.fetch,now=Date.now,timeoutMs=5000}={}){
 if([readControl,readReadCredential,readPublishCredential,fetchImpl,now].some(x=>typeof x!=='function')||!Number.isSafeInteger(timeoutMs)||timeoutMs<1||timeoutMs>5000)fail();
 let originalControl,writeAttempted=false,reads=0;
 async function run(value){
  let finished=false,timer,reader,signal,onAbort;const controller=new AbortController();
  try{
   const enteredWall=now(),enteredMono=performance.now(),c=fields(readControl(),['enabled','policy']);if(c.enabled!==true)fail();
   const raw=c.policy,p=policy(raw);if(originalControl===undefined)originalControl=raw;if(originalControl!==raw||!time(enteredWall)||enteredWall<p.startAt||enteredWall>=p.expiresAt||!Number.isFinite(enteredMono)||enteredMono<0)fail();
   const endWall=Math.min(p.expiresAt,enteredWall+timeoutMs),endMono=enteredMono+(endWall-enteredWall);let lastWall=enteredWall,lastMono=enteredMono;
   const current=()=>{
    const n=now(),m=performance.now(),a=fields(readControl(),['enabled','policy']);
    if(finished||controller.signal.aborted||signal?.aborted||!time(n)||n<lastWall||n<p.startAt||n>=endWall||!Number.isFinite(m)||m<lastMono||m>=endMono||a.enabled!==true||a.policy!==raw)fail();
    lastWall=n;lastMono=m;
   };
   current();const v=input(value,p,raw);signal=v.signal;current();
   if(v.method==='POST'){if(writeAttempted)fail();writeAttempted=true;}else if(++reads>64)fail();
   let rejectCancelled;const cancelled=new Promise((_,reject)=>{rejectCancelled=reject;});
   onAbort=()=>{controller.abort();rejectCancelled(Error('Canary restoration transport unavailable'));};signal.addEventListener('abort',onAbort,{once:true});current();
   const deadline=new Promise((_,reject)=>{timer=setTimeout(()=>{finished=true;controller.abort();reject(Error('Canary restoration transport unavailable'));},Math.max(1,Math.floor(endMono-lastMono)));});
   const work=async()=>{
    const credential=await(v.method==='GET'?readReadCredential():readPublishCredential());current();
    if(typeof credential!=='string'||credential.length<16||credential.length>4096||!/^[-A-Za-z0-9_]+$/.test(credential))fail();
    const url=new URL(BASE+v.path);for(const[k,x]of Object.entries(v.query??{}))url.searchParams.set(k,String(x));
    const r=await fetchImpl(url.href,{method:v.method,redirect:'manual',cache:'no-store',headers:{Authorization:'Bearer '+credential,Accept:'application/json','Content-Type':'application/json','Cache-Control':'no-cache, no-store',Pragma:'no-cache'},signal:controller.signal,...v.body?{body:JSON.stringify(v.body)}:{}});current();
    if(!(r instanceof Response)||r.redirected||!(v.method==='GET'?r.status===200:r.status===200||r.status===201)||!r.body||!/^application\/json(?:\s*;|$)/i.test(r.headers.get('Content-Type')??''))fail();
    const age=r.headers.get('Age'),cache=r.headers.get('CF-Cache-Status'),size=r.headers.get('Content-Length');
    if(age!==null&&(!/^\d+$/.test(age)||Number(age)!==0)||cache!==null&&!['DYNAMIC','BYPASS','MISS'].includes(cache.toUpperCase())||size!==null&&(!/^\d+$/.test(size)||Number(size)>MAX))fail();
    reader=r.body.getReader();const chunks=[];let length=0;
    for(;;){const x=await reader.read();current();if(x.done)break;if(!(x.value instanceof Uint8Array))fail();length+=x.value.byteLength;if(length>MAX)fail();chunks.push(x.value);}
    const bytes=new Uint8Array(length);let offset=0;for(const x of chunks){bytes.set(x,offset);offset+=x.byteLength;}
    const e=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(bytes));current();
    if(!e||e.success!==true||!Array.isArray(e.errors)||e.errors.length||!Object.hasOwn(e,'result'))fail();
    const result=v.path.includes('/workers/workers/')?versionProjection(e.result):e.result;
    const output={success:true,status:r.status,result,errors:[],...Object.hasOwn(e,'result_info')?{result_info:e.result_info}:{}};current();return output;
   };
   const result=await Promise.race([work(),deadline,cancelled]);current();return result;
  }catch{fail();}
  finally{finished=true;clearTimeout(timer);if(signal&&onAbort)signal.removeEventListener('abort',onAbort);controller.abort();if(reader)try{Promise.resolve(reader.cancel()).catch(()=>{});}catch{}}
 }
 return value=>run(value);
}
