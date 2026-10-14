const fail=()=>{throw Error('Retirement provider unavailable');};
const fields=(v,keys)=>{if(!v||Object.getPrototypeOf(v)!==Object.prototype||Reflect.ownKeys(v).length!==keys.length)fail();const out={};for(const k of keys){const d=Object.getOwnPropertyDescriptor(v,k);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();out[k]=d.value;}return out;};
/** Private fixed-account GET. No runtime mount, retries, writes or client credentials. */
export function createRetirementProviderReader({resources,readCredential,fetchImpl=globalThis.fetch,timeoutMs=5000}={}){
 const pins=fields(resources,['accountId','applicationId','containerId']);
 if(Object.values(pins).some(v=>typeof v!=='string')||!/^[a-f0-9]{32}$/.test(pins.accountId)||!/^[a-zA-Z0-9-]{1,200}$/.test(pins.applicationId)||!/^[a-f0-9]{64}$/.test(pins.containerId)||typeof readCredential!=='function'||typeof fetchImpl!=='function'||!Number.isSafeInteger(timeoutMs)||timeoutMs<1||timeoutMs>5000)fail();
 const url=`https://api.cloudflare.com/client/v4/accounts/${pins.accountId}/containers/applications/${pins.applicationId}/instances/${pins.containerId}`;
 return async input=>{
  const c=fields(input,['containerId','applicationId','signal']);
  if(c.containerId!==pins.containerId||c.applicationId!==pins.applicationId||!(c.signal instanceof AbortSignal)||c.signal.aborted)fail();
  const controller=new AbortController(),end=performance.now()+timeoutMs;let timer,reader,rejectCancelled;
  const live=()=>{if(controller.signal.aborted||c.signal.aborted||performance.now()>=end)fail();};
  const cancelled=new Promise((_,reject)=>{rejectCancelled=reject;});
  const abort=()=>{controller.abort();rejectCancelled(Error('Retirement provider unavailable'));};
  c.signal.addEventListener('abort',abort,{once:true});
  const deadline=new Promise((_,reject)=>{timer=setTimeout(()=>{controller.abort();reject(Error('Retirement provider unavailable'));},timeoutMs);});
  const work=async()=>{
   const credential=await readCredential();live();
   if(typeof credential!=='string'||credential.length<16||credential.length>4096||!/^[-A-Za-z0-9_]+$/.test(credential))fail();
   const r=await fetchImpl(url,{method:'GET',redirect:'manual',cache:'no-store',headers:{Authorization:'Bearer '+credential,Accept:'application/json','Cache-Control':'no-cache, no-store',Pragma:'no-cache'},signal:controller.signal});live();
   if(r?.status!==200||r.redirected||!r.body||!/^application\/json(?:\s*;|$)/i.test(r.headers.get('Content-Type')??''))fail();
   const age=r.headers.get('Age'),cache=r.headers.get('CF-Cache-Status'),size=r.headers.get('Content-Length');
   if(age!==null&&(!/^\d+$/.test(age)||Number(age)!==0)||cache!==null&&!['DYNAMIC','BYPASS','MISS'].includes(cache.toUpperCase())||size!==null&&(!/^\d+$/.test(size)||Number(size)>65536))fail();
   reader=r.body.getReader();const chunks=[];let length=0;
   for(;;){const {done,value}=await reader.read();live();if(done)break;length+=value.byteLength;if(length>65536)fail();chunks.push(value);}
   const bytes=new Uint8Array(length);let offset=0;for(const part of chunks){bytes.set(part,offset);offset+=part.byteLength;}
   const e=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(bytes));live();
   const v=e?.result;if(e?.success!==true||!Array.isArray(e.errors)||e.errors.length||!v||v.id!==pins.containerId||v.application_id!==pins.applicationId||typeof v.image!=='string'||typeof v.started_at!=='string'||typeof v.status?.state!=='string'||typeof v.status.updated_at!=='string'||!Number.isSafeInteger(v.status.exit_code))fail();
   return Object.freeze({id:v.id,application_id:v.application_id,image:v.image,started_at:v.started_at,status:Object.freeze({state:v.status.state,updated_at:v.status.updated_at,exit_code:v.status.exit_code})});
  };
  try{return await Promise.race([work(),deadline,cancelled]);}catch{fail();}finally{clearTimeout(timer);c.signal.removeEventListener('abort',abort);controller.abort();if(reader)Promise.resolve(reader.cancel()).catch(()=>{});}
 };
}
