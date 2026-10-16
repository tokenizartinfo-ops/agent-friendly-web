import {createHash} from 'node:crypto';
import {snapshotOwnWorkerExecution} from './mcp-own-worker-execution.mjs';
const fail=()=>{throw Error('Closed publication unavailable');};
const hex=(v,n)=>typeof v==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(v);
const uuid=v=>typeof v==='string'&&/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(v);
const flags=['AFW_DELEGATED_OAUTH_ENABLED','AFW_DOSSIER_EVENTS_ENABLED','AFW_DOSSIER_EVENTS_SCHEDULE_ENABLED','AFW_DOSSIER_MONITORING_OWNER_ENABLED','AFW_DOSSIER_OWN_SAVE_ENABLED','AFW_OAUTH_REFRESH_ENABLED'];
const canonical=v=>JSON.stringify(v,(_,x)=>x&&typeof x==='object'&&!Array.isArray(x)?Object.fromEntries(Object.entries(x).sort(([a],[b])=>a.localeCompare(b))):x);
const snapshot=value=>{try{const keys=['script','sourceRevision','sourceTree','programHash','workerHash','sourceCheck','accountId','workerName'];if(!value||Object.getPrototypeOf(value)!==Object.prototype||Reflect.ownKeys(value).length!==keys.length)fail();const out={};for(const k of keys){const d=Object.getOwnPropertyDescriptor(value,k);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();out[k]=d.value;}return Object.freeze(out);}catch{fail();}};
/** Private journal upload adapter. Creates a closed version only. The durable
 * journal owns the attempt budget; this instance also refuses a second call. */
export function createClosedVersionUpload({accountId,workerName,baseVersionId,namespaceId,databaseId,kvId,workerHash,readCredential,fetchImpl=globalThis.fetch,timeoutMs=45000}={}){
 if(!hex(accountId,32)||workerName!=='agent-friendly-web-delegated-canary'||!uuid(baseVersionId)||!hex(namespaceId,32)||!uuid(databaseId)||!hex(kvId,32)||!hex(workerHash,64)||typeof readCredential!=='function'||typeof fetchImpl!=='function'||!Number.isSafeInteger(timeoutMs)||timeoutMs<1||timeoutMs>45000)fail();
 let spent=false;
 const inspect=v=>{
  const allowed=['id','number','startup_time_ms','compatibility_date','compatibility_flags','main_module','annotations','exports','usage_model','urls','source','created_on','bindings','env','author_id','author_email','containers'];
  if(!v||Object.keys(v).some(k=>!allowed.includes(k))||v.usage_model!==undefined&&v.usage_model!=='standard')fail();
  if(!Array.isArray(v?.bindings)||v.bindings.length<9||v.bindings.length>100||v.compatibility_date!=='2026-09-07'||canonical(v.compatibility_flags)!==canonical(['nodejs_compat','global_fetch_strictly_public']))fail();
  const execution=snapshotOwnWorkerExecution(v);
  const names=new Set();for(const b of v.bindings){if(!b||typeof b.name!=='string'||!/^[_A-Za-z][_A-Za-z0-9]{0,127}$/.test(b.name)||names.has(b.name)||!['plain_text','secret_text','d1','kv_namespace','durable_object_namespace','ratelimit'].includes(b.type))fail();names.add(b.name);}
  if(v.env!==undefined&&(!v.env||typeof v.env!=='object'||Array.isArray(v.env)||Object.keys(v.env).length!==names.size||Object.keys(v.env).some(n=>!names.has(n))))fail();
  const binding=n=>v.bindings.find(b=>b.name===n);for(const f of flags){const b=binding(f);if(b?.type!=='plain_text'||b.text!=='false')fail();}
  const node=binding('AFW_DOSSIER_EVENTS_NODE');if(node?.type!=='durable_object_namespace'||node.namespace_id!==namespaceId||node.class_name!=='AfwOwnEventNode'||node.script_name!==undefined&&node.script_name!==workerName||node.environment!==undefined||node.dispatch_namespace!==undefined)fail();
  const db=binding('DB'),kv=binding('OAUTH_KV');if(db?.type!=='d1'||db.id!==databaseId||db.database_id!==undefined&&db.database_id!==databaseId||kv?.type!=='kv_namespace'||kv.namespace_id!==kvId)fail();
  return canonical({bindings:[...v.bindings].sort((a,b)=>a.name.localeCompare(b.name)),env:v.env,usage_model:v.usage_model,...execution});
 };
 return async(input,signal)=>{
  const a=snapshot(input);if(spent||!(signal instanceof AbortSignal)||signal.aborted||a.accountId!==accountId||a.workerName!==workerName||a.workerHash!==workerHash||!hex(a.sourceRevision,40)||!hex(a.sourceTree,40)||!hex(a.programHash,64)||a.sourceCheck!=='git-inputs-before-after-v1'||typeof a.script!=='string'||!a.script.length||Buffer.byteLength(a.script)>2097152||createHash('sha256').update(a.script).digest('hex')!==workerHash)fail();spent=true;
  const controller=new AbortController(),end=performance.now()+timeoutMs;let timer,rejectCancel,stream;
  const check=()=>{if(signal.aborted||controller.signal.aborted||performance.now()>=end)fail();};
  const cancelled=new Promise((_,reject)=>{rejectCancel=reject;}),abort=()=>{controller.abort();rejectCancel(Error('Closed publication unavailable'));};signal.addEventListener('abort',abort,{once:true});
  const deadline=new Promise((_,reject)=>{timer=setTimeout(()=>{controller.abort();reject(Error('Closed publication unavailable'));},timeoutMs);});
  const work=async()=>{
   const credential=await readCredential();check();if(typeof credential!=='string'||credential.length<16||credential.length>4096||!/^[-A-Za-z0-9_]+$/.test(credential))fail();
   const request=async(url,body)=>{
    check();const r=await fetchImpl(url,{method:body?'POST':'GET',body:body?JSON.stringify(body):undefined,redirect:'manual',cache:'no-store',signal:controller.signal,headers:{Authorization:'Bearer '+credential,Accept:'application/json','Content-Type':'application/json','Cache-Control':'no-cache, no-store',Pragma:'no-cache'}});check();
    if(![200,201].includes(r?.status)||r.redirected||!r.body||!/^application\/json(?:\s*;|$)/i.test(r.headers.get('Content-Type')??''))fail();
    const age=r.headers.get('Age'),cache=r.headers.get('CF-Cache-Status'),size=r.headers.get('Content-Length');if(age!==null&&(!/^\d+$/.test(age)||Number(age)!==0)||cache!==null&&!['DYNAMIC','BYPASS','MISS'].includes(cache.toUpperCase())||size!==null&&(!/^\d+$/.test(size)||Number(size)>262144))fail();
    stream=r.body.getReader();const chunks=[];let length=0;for(;;){const {done,value}=await stream.read();check();if(done)break;length+=value.byteLength;if(length>262144)fail();chunks.push(value);}stream.releaseLock();stream=null;
    const envelope=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(Buffer.concat(chunks,length)));check();if(envelope?.success!==true||!Array.isArray(envelope.errors)||envelope.errors.length||!envelope.result)fail();return envelope.result;
   };
   const root='https://api.cloudflare.com/client/v4/accounts/'+accountId+'/workers/workers/'+workerName+'/versions';
   const base=await request(root+'/'+baseVersionId);if(base.id!==baseVersionId)fail();const baseline=inspect(base);
   const execution=snapshotOwnWorkerExecution(base);
   const body={main_module:'index.mjs',modules:[{name:'index.mjs',content_type:'application/javascript+module',content_base64:Buffer.from(a.script).toString('base64')}],bindings:base.bindings.map(b=>({name:b.name,type:'inherit',version_id:baseVersionId})),compatibility_date:base.compatibility_date,compatibility_flags:base.compatibility_flags,exports:execution.exports,...(execution.containers.length?{containers:execution.containers}:{}),...(base.usage_model===undefined?{}:{usage_model:base.usage_model})};
   const created=await request(root+'?deploy=false',body),versionId=created.id;if(!uuid(versionId)||versionId===baseVersionId)fail();
   const reconciliation=created.exports_reconciliation;if(reconciliation&&Object.values(reconciliation).some(v=>!Array.isArray(v)||v.length))fail();
   const observed=await request(root+'/'+versionId);if(observed.id!==versionId||inspect(observed)!==baseline||observed.main_module!==undefined&&observed.main_module!=='index.mjs')fail();check();return Object.freeze({versionId});
  };
  try{return await Promise.race([work(),cancelled,deadline]);}catch{fail();}finally{clearTimeout(timer);signal.removeEventListener('abort',abort);controller.abort();if(stream)Promise.resolve(stream.cancel()).catch(()=>{});}
 };
}
