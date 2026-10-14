import {createHash} from 'node:crypto';
const fail=()=>{throw Error('Published artifact unavailable');};
const hex=(v,n)=>typeof v==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(v);
const uuid=v=>typeof v==='string'&&/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(v);
const target=value=>{try{const keys=['accountId','workerName','versionId'];if(!value||Object.getPrototypeOf(value)!==Object.prototype||Reflect.ownKeys(value).length!==keys.length)fail();const out={};for(const k of keys){const d=Object.getOwnPropertyDescriptor(value,k);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();out[k]=d.value;}return Object.freeze(out);}catch{fail();}};
/** Private readVersion adapter for the journal. Reads one immutable version's
 * actual module bytes through Workers API, then its legacy script etag. */
export function createPublicationArtifactReader({accountId,workerName,moduleName,workerHash,readCredential,fetchImpl=globalThis.fetch,timeoutMs=5000}={}){
 if(!hex(accountId,32)||workerName!=='agent-friendly-web-delegated-canary'||!['index.mjs','index.js'].includes(moduleName)||!hex(workerHash,64)||typeof readCredential!=='function'||typeof fetchImpl!=='function'||!Number.isSafeInteger(timeoutMs)||timeoutMs<1||timeoutMs>5000)fail();
 return async(input,signal)=>{
  const t=target(input);if(t.accountId!==accountId||t.workerName!==workerName||!uuid(t.versionId)||!(signal instanceof AbortSignal)||signal.aborted)fail();
  const versionId=t.versionId,controller=new AbortController(),end=performance.now()+timeoutMs;let timer,rejectCancel,stream;
  const check=()=>{if(signal.aborted||controller.signal.aborted||performance.now()>=end)fail();};
  const cancelled=new Promise((_,reject)=>{rejectCancel=reject;}),abort=()=>{controller.abort();rejectCancel(Error('Published artifact unavailable'));};signal.addEventListener('abort',abort,{once:true});
  const deadline=new Promise((_,reject)=>{timer=setTimeout(()=>{controller.abort();reject(Error('Published artifact unavailable'));},timeoutMs);});
  const work=async()=>{
   const credential=await readCredential();check();if(typeof credential!=='string'||credential.length<16||credential.length>4096||!/^[-A-Za-z0-9_]+$/.test(credential))fail();
   const get=async(url,limit)=>{
    check();const r=await fetchImpl(url,{method:'GET',redirect:'manual',cache:'no-store',signal:controller.signal,headers:{Authorization:'Bearer '+credential,Accept:'application/json','Cache-Control':'no-cache, no-store',Pragma:'no-cache'}});check();
    if(r?.status!==200||r.redirected||!r.body||!/^application\/json(?:\s*;|$)/i.test(r.headers.get('Content-Type')??''))fail();
    const age=r.headers.get('Age'),cache=r.headers.get('CF-Cache-Status'),size=r.headers.get('Content-Length');if(age!==null&&(!/^\d+$/.test(age)||Number(age)!==0)||cache!==null&&!['DYNAMIC','BYPASS','MISS'].includes(cache.toUpperCase())||size!==null&&(!/^\d+$/.test(size)||Number(size)>limit))fail();
    stream=r.body.getReader();const chunks=[];let length=0;for(;;){const {done,value}=await stream.read();check();if(done)break;length+=value.byteLength;if(length>limit)fail();chunks.push(value);}stream.releaseLock();stream=null;
    const bytes=Buffer.concat(chunks,length),envelope=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(bytes));check();if(envelope?.success!==true||!Array.isArray(envelope.errors)||envelope.errors.length||!envelope.result)fail();return envelope.result;
   };
   const root='https://api.cloudflare.com/client/v4/accounts/'+accountId+'/workers/';
   const v=await get(root+'workers/'+workerName+'/versions/'+versionId+'?include=modules',4194304);
   if(v.id!==versionId||v.main_module!==moduleName||!Array.isArray(v.modules)||v.modules.length!==1)fail();
   const m=v.modules[0];if(m?.name!==moduleName||m.content_type!=='application/javascript+module'||typeof m.content_base64!=='string'||!m.content_base64.length)fail();
   const bytes=Buffer.from(m.content_base64,'base64');if(bytes.toString('base64')!==m.content_base64||createHash('sha256').update(bytes).digest('hex')!==workerHash)fail();check();
   const legacy=await get(root+'scripts/'+workerName+'/versions/'+versionId,262144),etag=legacy.resources?.script?.etag;
   if(legacy.id!==versionId||!hex(etag,64))fail();check();return Object.freeze({id:versionId,etag});
  };
  try{return await Promise.race([work(),cancelled,deadline]);}catch{fail();}finally{clearTimeout(timer);signal.removeEventListener('abort',abort);controller.abort();if(stream)Promise.resolve(stream.cancel()).catch(()=>{});}
 };
}
