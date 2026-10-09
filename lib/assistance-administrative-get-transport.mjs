import {administrativeClosurePaths} from './assistance-administrative-closure-readback.mjs';
const LIMIT=262144;
const failure=()=>Object.freeze({success:false});
const exactRequest=(input,path)=>input!==null&&typeof input==='object'&&!Array.isArray(input)&&Object.keys(input).length===2&&Object.hasOwn(input,'method')&&Object.hasOwn(input,'path')&&input.method==='GET'&&input.path===path;

/** Server-only fixed GET transport. Supply custody outside the consumer/runner.
 * No runtime mount, remote credential or retry is created by this factory.
 */
export function createAdministrativeGetTransport({resources,readCredential,fetchImpl=globalThis.fetch,timeoutMs=5000}={}){
 const paths=administrativeClosurePaths(resources);
 if(typeof readCredential!=='function'||typeof fetchImpl!=='function'||!Number.isSafeInteger(timeoutMs)||timeoutMs<1||timeoutMs>10000)throw Error('Invalid administrative transport configuration');
 return async input=>{
  const path=input?.path;if(typeof path!=='string'||!paths.includes(path)||!exactRequest(input,path))return failure();
  const controller=new AbortController();let timer,reader;
  const deadline=new Promise((_,reject)=>{timer=setTimeout(()=>{controller.abort();reject(Error('Administrative deadline'));},timeoutMs);});
  const work=async()=>{
   const credential=await readCredential();
   if(controller.signal.aborted||!exactRequest(input,path)||typeof credential!=='string'||credential.length<16||credential.length>4096||!/^[-A-Za-z0-9_]+$/.test(credential))return failure();
   // Native edge requests support manual; reject all redirects at the status gate.
   const response=await fetchImpl('https://api.cloudflare.com/client/v4'+path,{method:'GET',headers:{Authorization:'Bearer '+credential,Accept:'application/json'},redirect:'manual',signal:controller.signal});
   if(controller.signal.aborted||response?.status!==200||!response.headers.get('Content-Type')?.toLowerCase().startsWith('application/json')||!response.body)return failure();
   const declared=response.headers.get('Content-Length');if(declared!==null&&(!/^\d+$/.test(declared)||Number(declared)>LIMIT))return failure();
   reader=response.body.getReader();let length=0;const chunks=[];
   for(;;){const {done,value}=await reader.read();if(controller.signal.aborted)return failure();if(done)break;length+=value.byteLength;if(length>LIMIT)return failure();chunks.push(value);}
   if(!exactRequest(input,path))return failure();
   const bytes=new Uint8Array(length);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.byteLength;}
   const envelope=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(bytes));
   if(envelope?.success!==true||!Object.hasOwn(envelope,'result')||(envelope.errors!==undefined&&(!Array.isArray(envelope.errors)||envelope.errors.length)))return failure();
   return Object.freeze({success:true,result:envelope.result});
  };
  try{return await Promise.race([work(),deadline]);}catch{return failure();}finally{
   clearTimeout(timer);controller.abort();
   // Cancellation is bounded by the request deadline; never await a stuck reader.
   if(reader)Promise.resolve(reader.cancel()).catch(()=>{});
  }
 };
}
