const fail=()=>{throw Error('Deployment observation unavailable');};
const exact=(v,keys)=>{if(!v||Object.getPrototypeOf(v)!==Object.prototype||Reflect.ownKeys(v).length!==keys.length)fail();const out={};for(const k of keys){const d=Object.getOwnPropertyDescriptor(v,k);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();out[k]=d.value;}return Object.freeze(out);};
const hex=(v,n)=>typeof v==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(v);
const uuid=v=>typeof v==='string'&&/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(v);
/** Private server receipt pins, never caller evidence. Etag proves only the
 * pinned Worker artifact; its mapping to Node/source must come from release custody. */
export function createSuccessorDeploymentReader({pins,readCredential,fetchImpl=globalThis.fetch,now=Date.now,timeoutMs=5000}={}){
 const p=exact(pins,['accountId','workerName','namespaceId','applicationId','deploymentId','versionId','etag','scopeHash','programHash','sourceRevision']);
 if(!hex(p.accountId,32)||!hex(p.namespaceId,32)||!uuid(p.deploymentId)||!uuid(p.versionId)||!hex(p.etag,64)||!hex(p.scopeHash,64)||!hex(p.programHash,64)||!hex(p.sourceRevision,40)||p.workerName!=='agent-friendly-web-delegated-canary'||typeof p.applicationId!=='string'||!/^[A-Za-z0-9-]{1,200}$/.test(p.applicationId)||typeof readCredential!=='function'||typeof fetchImpl!=='function'||typeof now!=='function'||!Number.isSafeInteger(timeoutMs)||timeoutMs<1||timeoutMs>5000)fail();
 const root='https://api.cloudflare.com/client/v4/accounts/'+p.accountId,worker=root+'/workers/scripts/'+p.workerName;
 return async input=>{
  const {signal}=exact(input,['signal']);if(!(signal instanceof AbortSignal)||signal.aborted)fail();
  const controller=new AbortController(),end=performance.now()+timeoutMs;let timer,reader,rejectCancel,last=-1;
  const clock=()=>{const t=now();if(signal.aborted||controller.signal.aborted||performance.now()>=end||!Number.isSafeInteger(t)||t<0||t<last)fail();last=t;return t;};
  const cancelled=new Promise((_,reject)=>{rejectCancel=reject;}),abort=()=>{controller.abort();rejectCancel(Error('Deployment observation unavailable'));};signal.addEventListener('abort',abort,{once:true});
  const deadline=new Promise((_,reject)=>{timer=setTimeout(()=>{controller.abort();reject(Error('Deployment observation unavailable'));},timeoutMs);});
  const work=async()=>{
   const observedAt=clock(),credential=await readCredential();clock();if(typeof credential!=='string'||credential.length<16||credential.length>4096||!/^[-A-Za-z0-9_]+$/.test(credential))fail();
   const get=async url=>{
    clock();const r=await fetchImpl(url,{method:'GET',redirect:'manual',cache:'no-store',headers:{Authorization:'Bearer '+credential,Accept:'application/json','Cache-Control':'no-cache, no-store',Pragma:'no-cache'},signal:controller.signal});clock();
    if(r?.status!==200||r.redirected||!r.body||!/^application\/json(?:\s*;|$)/i.test(r.headers.get('Content-Type')??''))fail();
    const age=r.headers.get('Age'),cache=r.headers.get('CF-Cache-Status'),size=r.headers.get('Content-Length');if(age!==null&&(!/^\d+$/.test(age)||Number(age)!==0)||cache!==null&&!['DYNAMIC','BYPASS','MISS'].includes(cache.toUpperCase())||size!==null&&(!/^\d+$/.test(size)||Number(size)>262144))fail();
    reader=r.body.getReader();const chunks=[];let length=0;for(;;){const {done,value}=await reader.read();clock();if(done)break;length+=value.byteLength;if(length>262144)fail();chunks.push(value);}
    reader.releaseLock();reader=null;const bytes=new Uint8Array(length);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.byteLength;}
    const e=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(bytes));clock();if(e?.success!==true||!Array.isArray(e.errors)||e.errors.length||!e.result)fail();return e.result;
   };
   const active=async()=>{const v=await get(worker+'/deployments'),d=v.deployments?.[0];if(!Array.isArray(v.deployments)||!d||d.id!==p.deploymentId||d.strategy!=='percentage'||!Array.isArray(d.versions)||d.versions.length!==1||d.versions[0].version_id!==p.versionId||d.versions[0].percentage!==100)fail();};
   await active();const version=await get(worker+'/versions/'+p.versionId),bindings=version.resources?.bindings;
   if(version.id!==p.versionId||version.resources?.script?.etag!==p.etag||!Array.isArray(bindings))fail();
   const matches=bindings.filter(b=>b?.name==='AFW_DOSSIER_EVENTS_NODE');if(matches.length!==1)fail();const b=matches[0];
   if(b.type!=='durable_object_namespace'||b.namespace_id!==p.namespaceId||b.class_name!=='AfwOwnEventNode'||b.script_name!==undefined&&b.script_name!==p.workerName||b.environment!==undefined||b.dispatch_namespace!==undefined)fail();
   const app=await get(root+'/containers/applications/'+p.applicationId);if(app.id!==p.applicationId||app.account_id!==p.accountId||app.scheduling_policy!=='durable_object'||app.durable_objects?.namespace_id!==p.namespaceId)fail();
   await active();clock();return Object.freeze({scopeHash:p.scopeHash,sourceRevision:p.sourceRevision,programHash:p.programHash,observedAt});
  };
  try{return await Promise.race([work(),cancelled,deadline]);}catch{fail();}finally{clearTimeout(timer);signal.removeEventListener('abort',abort);controller.abort();if(reader)Promise.resolve(reader.cancel()).catch(()=>{});}
 };
}
