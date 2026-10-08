import {computeServiceIdentityDigest} from './assistance-service-identity-disable.mjs';
const LIMIT=262144;
const UUID=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const failure=()=>Object.freeze({success:false});
function fields(value,keys){
 if(value===null||typeof value!=='object'||![Object.prototype,null].includes(Object.getPrototypeOf(value)))return null;
 const own=Reflect.ownKeys(value);if(own.length!==keys.length||!keys.every(k=>own.includes(k)))return null;
 const descriptors=Object.getOwnPropertyDescriptors(value);
 if(!keys.every(k=>Object.hasOwn(descriptors[k],'value')&&descriptors[k].enumerable))return null;
 return Object.fromEntries(keys.map(k=>[k,descriptors[k].value]));
}

/** Server-only preparation, not a route or custody provisioning mechanism.
 * Requires the approved exclusive QA catalog and durable issued fence outside.
 */
export function createServiceIdentityTransport({identity,closeAt,readCredential,fetchImpl=globalThis.fetch,now=Date.now,timeoutMs=5000}={}){
 const raw=fields(identity,['accountId','tokenId','name','exclusiveQa']);
 if(!raw||raw.exclusiveQa!==true||typeof raw.accountId!=='string'||!/^[0-9a-f]{32}$/.test(raw.accountId)||typeof raw.tokenId!=='string'||!UUID.test(raw.tokenId)||typeof raw.name!=='string'||raw.name.length<1||raw.name.length>4096||!Number.isSafeInteger(closeAt)||closeAt<1||typeof readCredential!=='function'||typeof fetchImpl!=='function'||typeof now!=='function'||!Number.isSafeInteger(timeoutMs)||timeoutMs<1||timeoutMs>10000)throw Error('Invalid service transport configuration');
 const pin=Object.freeze({...raw}),path='/accounts/'+pin.accountId+'/access/service_tokens/'+pin.tokenId;
 let lastTime=-1;
 function methodOf(input){
  const get=fields(input,['method','path']);if(get?.method==='GET'&&get.path===path)return 'GET';
  const put=fields(input,['method','path','body']),body=put&&fields(put.body,['enabled','name']);
  return put?.method==='PUT'&&put.path===path&&body?.enabled===false&&body.name===pin.name?'PUT':null;
 }
 function allowed(input,method){
  if(methodOf(input)!==method)return false;
  const t=now();if(!Number.isSafeInteger(t)||t<0||t<lastTime||(method==='PUT'&&t<closeAt))return false;lastTime=t;return true;
 }
 return async input=>{
  let method;try{method=methodOf(input);if(!method||!allowed(input,method))return failure();}catch{return failure();}
  const controller=new AbortController(),wallDeadline=performance.now()+timeoutMs;let timer,reader;
  const deadline=new Promise((_,reject)=>{timer=setTimeout(()=>{controller.abort();reject(Error('Service transport deadline'));},timeoutMs);});
  const live=()=>!controller.signal.aborted&&performance.now()<wallDeadline&&allowed(input,method);
  const work=async()=>{
   const credential=await readCredential();
   if(!live()||typeof credential!=='string'||credential.length<16||credential.length>4096||!/^[-A-Za-z0-9_]+$/.test(credential))return failure();
   const headers={Authorization:'Bearer '+credential,Accept:'application/json'};
   const init={method,headers,redirect:'error',signal:controller.signal};
   if(method==='PUT'){headers['Content-Type']='application/json';init.body=JSON.stringify({enabled:false,name:pin.name});}
   // No asynchronous work between the final guard and dispatch.
   if(!live())return failure();
   const response=await fetchImpl('https://api.cloudflare.com/client/v4'+path,init);
   if(!live()||response?.status!==200||!/^application\/json(?:\s*;.*)?$/i.test(response.headers.get('Content-Type')?.trim()||'')||!response.body)return failure();
   const declared=response.headers.get('Content-Length');if(declared!==null&&(!/^\d+$/.test(declared)||Number(declared)>LIMIT))return failure();
   reader=response.body.getReader();let length=0;const chunks=[];
   for(;;){const {done,value}=await reader.read();if(!live())return failure();if(done)break;length+=value.byteLength;if(length>LIMIT)return failure();chunks.push(value);}
   const bytes=new Uint8Array(length);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.byteLength;}
   const envelope=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(bytes));
   if(!live()||envelope?.success!==true||!Object.hasOwn(envelope,'result')||(envelope.errors!==undefined&&(!Array.isArray(envelope.errors)||envelope.errors.length)))return failure();
   // An update response can contain a rotated/generated credential: drop result.
   if(method==='PUT')return Object.freeze({success:true,result:null});
   await computeServiceIdentityDigest(envelope.result);
   if(!live()||envelope.result.id!==pin.tokenId||envelope.result.name!==pin.name)return failure();
   return Object.freeze({success:true,result:envelope.result});
  };
  try{return await Promise.race([work(),deadline]);}catch{return failure();}finally{
   clearTimeout(timer);controller.abort();if(reader)Promise.resolve(reader.cancel()).catch(()=>{});
  }
 };
}
