import {administrativeClosurePaths} from './assistance-administrative-closure-readback.mjs';
const LIMIT=262144,failure=()=>Object.freeze({success:false});
const fields=(v,keys)=>{if(!v||Object.getPrototypeOf(v)!==Object.prototype||Reflect.ownKeys(v).length!==keys.length)return null;const out={};for(const k of keys){const d=Object.getOwnPropertyDescriptor(v,k);if(!d?.enumerable||!Object.hasOwn(d,'value'))return null;out[k]=d.value;}return out;};
/** Fixed-origin private GET transport, no retry or mutation. Custody is supplied
 * by the administrative host, never the consumer. No route or binding here. */
export function createPrivateProviderGetTransport({resources,readCredential,fetchImpl=globalThis.fetch,timeoutMs=5000}={}){
 const pinned=fields(resources,['accountId','tokenId','workerName','applicationId','policyId']);if(!pinned)throw Error('Invalid private provider resources');
 const point=administrativeClosurePaths(pinned),root='/accounts/'+pinned.accountId,app=root+'/access/apps/'+pinned.applicationId,lists=[root+'/access/service_tokens',app+'/policies'];
 const points=[...point,app];
 if(typeof readCredential!=='function'||typeof fetchImpl!=='function'||!Number.isSafeInteger(timeoutMs)||timeoutMs<1||timeoutMs>10000)throw Error('Invalid private provider transport');
 return async input=>{
  const hasQuery=Object.hasOwn(input??{},'query'),c=fields(input,['method','path','signal',...(hasQuery?['query']:[])]);if(!c||c.method!=='GET'||typeof c.path!=='string'||!(c.signal instanceof AbortSignal)||c.signal.aborted)return failure();
  const query=hasQuery?fields(c.query,['page','per_page']):null;if(lists.includes(c.path)){if(!query||!Number.isSafeInteger(query.page)||query.page<1||query.page>4||query.per_page!==100)return failure();}else if(!points.includes(c.path)||hasQuery)return failure();
  const url='https://api.cloudflare.com/client/v4'+c.path+(query?'?page='+query.page+'&per_page=100':'');
  const controller=new AbortController(),wallDeadline=performance.now()+timeoutMs;let timer,reader,rejectCancelled;
  const live=()=>!controller.signal.aborted&&!c.signal.aborted&&performance.now()<wallDeadline;
  const cancelled=new Promise((_,reject)=>{rejectCancelled=reject;});
  const abort=()=>{controller.abort();rejectCancelled(Error('Private provider cancelled'));};
  c.signal.addEventListener('abort',abort,{once:true});
  const deadline=new Promise((_,reject)=>{timer=setTimeout(()=>{controller.abort();reject(Error('Private provider deadline'));},timeoutMs);});
  const work=async()=>{
   const credential=await readCredential();
   if(!live()||typeof credential!=='string'||credential.length<16||credential.length>4096||!/^[-A-Za-z0-9_]+$/.test(credential))return failure();
   const response=await fetchImpl(url,{method:'GET',headers:{Authorization:'Bearer '+credential,Accept:'application/json'},redirect:'manual',signal:controller.signal});
   if(!live()||response?.status!==200||!response.headers.get('Content-Type')?.toLowerCase().startsWith('application/json')||!response.body)return failure();
   const declared=response.headers.get('Content-Length');if(declared!==null&&(!/^\d+$/.test(declared)||Number(declared)>LIMIT))return failure();
   reader=response.body.getReader();let length=0;const chunks=[];
   for(;;){const {done,value}=await reader.read();if(!live())return failure();if(done)break;length+=value.byteLength;if(length>LIMIT)return failure();chunks.push(value);}
   const bytes=new Uint8Array(length);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.byteLength;}
   const envelope=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(bytes));
   if(!live()||envelope?.success!==true||!Object.hasOwn(envelope,'result')||(envelope.errors!==undefined&&(!Array.isArray(envelope.errors)||envelope.errors.length)))return failure();
   return Object.freeze({success:true,result:envelope.result,...(Object.hasOwn(envelope,'result_info')?{result_info:envelope.result_info}:{})});
  };
  try{return await Promise.race([work(),deadline,cancelled]);}catch{return failure();}finally{clearTimeout(timer);c.signal.removeEventListener('abort',abort);controller.abort();if(reader)Promise.resolve(reader.cancel()).catch(()=>{});}
 };
}
