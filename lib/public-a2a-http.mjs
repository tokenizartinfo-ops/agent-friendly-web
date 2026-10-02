import { createDiagnosticAgent, DIAGNOSTIC_A2A_VERSION } from './public-a2a.mjs';

const headers={'content-type':'application/json','cache-control':'no-store','a2a-version':DIAGNOSTIC_A2A_VERSION,'x-content-type-options':'nosniff'};
const failure=(status,message)=>Response.json({error:message},{status,headers});

async function readBody(request,maxBytes,timeoutMs) {
 const reader=request.body?.getReader();
 if (!reader) throw {status:400};
 let timer;
 const timeout=new Promise((_,reject)=>{timer=setTimeout(()=>reject({status:408}),timeoutMs);});
 try {
  return await Promise.race([timeout,(async()=>{
   const chunks=[];let size=0;
   while(true){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>maxBytes)throw {status:413};chunks.push(value);}
   const bytes=new Uint8Array(size);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.byteLength;}
   return JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(bytes));
  })()]);
 } finally {clearTimeout(timer);void reader.cancel().catch(()=>{});}
}

/** Closed preparation surface. rateLimit must use trusted server binding/context,
 * never a forwarded header supplied by an arbitrary HTTP client.
 * Distributed enforcement and route wiring remain deployment prerequisites. */
export function createDiagnosticHttpHandler({enabled=false,agent=createDiagnosticAgent(),rateLimit,maxBodyBytes=8192,bodyTimeoutMs=5000}={}) {
 if (!Number.isInteger(maxBodyBytes)||maxBodyBytes<256||maxBodyBytes>8192||!Number.isInteger(bodyTimeoutMs)||bodyTimeoutMs<1||bodyTimeoutMs>5000) throw Error('Invalid HTTP limits');
 return async function handle(request) {
  if(enabled!==true)return failure(404,'Unavailable');
  if(typeof rateLimit!=='function')return failure(503,'Limiter unavailable');
  if(request.method!=='POST')return new Response(null,{status:405,headers:{...headers,allow:'POST'}});
  if(request.headers.get('content-type')?.split(';')[0].trim().toLowerCase()!=='application/json')return failure(415,'Expected application/json');
  const declared=request.headers.get('content-length');
  if(declared!==null && (!/^\d+$/.test(declared)||Number(declared)>maxBodyBytes))return failure(413,'Body exceeds limit');
  try {if(await rateLimit(request)!==true)return new Response(null,{status:429,headers:{...headers,'retry-after':'60'}});}
  catch {return failure(503,'Limiter unavailable');}
  let body;
  try {body=await readBody(request,maxBodyBytes,bodyTimeoutMs);}
  catch(error){const status=[408,413].includes(error?.status)?error.status:400;return failure(status,status===408?'Body timeout':status===413?'Body exceeds limit':'Invalid JSON');}
  try {return Response.json(await agent.handle(body,request.headers.get('a2a-version')||DIAGNOSTIC_A2A_VERSION),{headers});}
  catch {return failure(500,'Diagnostic unavailable');}
 };
}
