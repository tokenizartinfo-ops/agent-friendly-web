import {createCapsulePreparationRequestLease,readCapsulePreparationRequestLease} from './capsule-preparation-request-lease.mjs';

class Rejected extends Error{constructor(status){super('Request unavailable');this.status=status;}}
const jsonType=value=>typeof value==='string'&&/^application\/json(?:\s*;\s*charset\s*=\s*utf-8)?$/i.test(value);
const deny=(status,invoked=false)=>Response.json({
 code:invoked?'request_outcome_unknown':'request_unavailable',
 ...(invoked?{recovery:'reconcile_original_request',automaticRetry:false,automaticReconnect:false}:{}),
 executionAllowed:false,chargeAllowed:false,publicationAllowed:false,
},{status,headers:{'Cache-Control':'no-store'}});
function declared(value,maximum){
 if(value===null)return null;
 if(!/^(0|[1-9][0-9]{0,5})$/.test(value))throw new Rejected(400);
 const size=Number(value);if(size>maximum)throw new Rejected(413);return size;
}
async function readBounded(stream,maximum,control){
 if(!stream)return new Uint8Array();
 let reader,done=false;const chunks=[];let total=0,turns=0;
 try{
  reader=stream.getReader();
  for(;;){
   const item=await control.wait(()=>reader.read());
   if(item.done){done=true;break;}
   if(!(item.value instanceof Uint8Array)||++turns>maximum+1)throw new Rejected(400);
   total+=item.value.byteLength;if(total>maximum)throw new Rejected(413);
   if(item.value.byteLength)chunks.push(new Uint8Array(item.value));
  }
  const body=new Uint8Array(total);let offset=0;
  for(const chunk of chunks){body.set(chunk,offset);offset+=chunk.byteLength;}
  return body;
 }finally{
  // Cancellation is best effort, not an unbounded await on a faulty source.
  if(reader&&!done)try{Promise.resolve(reader.cancel()).catch(()=>{});}catch{/* no details */}
  try{reader?.releaseLock();}catch{/* a pending read can keep its lock */}
 }
}
function discard(response){
 try{
  if(response instanceof Response&&response.body)Promise.resolve(response.body.cancel()).catch(()=>{});
 }catch{/* best effort; do not wait for a rejected/late source */}
}
function objectJson(body){
 try{
  const value=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(body));
  if(!value||typeof value!=='object'||Array.isArray(value))throw Error();
 }catch{throw new Rejected(400);}
}

/** Detached JSON HTTP budget boundary, not an OAuth/MCP server or verifier.
 * handle is trusted protected server code; its fourth argument MUST be passed
 * to the preparation OAuth host as requestLease in any future composition.
 */
export function createCapsulePreparationHttpBoundary(options={}){
 let issuer,handle,now,monotonic;
 try{
  if(options?.enabled!==true)return null;
  ({issuer,handle,now=()=>Date.now(),monotonic=()=>performance.now()}=options);
  const url=new URL(issuer);
  if(url.protocol!=='https:'||url.origin!==issuer||url.username||url.password||typeof handle!=='function'
   ||typeof now!=='function'||typeof monotonic!=='function')throw Error();
 }catch{throw new Error('Preparation HTTP boundary unavailable');}
 return async function(request,env,ctx,originalLease){
  let control,invoked=false,protectedResponse;const ownsLease=originalLease===undefined;
  try{
   const lease=ownsLease?createCapsulePreparationRequestLease({now,monotonic,signal:request.signal}):originalLease;
   control=readCapsulePreparationRequestLease(lease);if(!control)throw new Error('Preparation request unavailable');control.check();
   if(request.url!==issuer+'/mcp')throw new Rejected(404);
   const origin=request.headers.get('Origin');
   if(origin!==null&&origin!==issuer)throw new Rejected(403);
   if(request.method!=='POST')throw new Rejected(405);
   if(!jsonType(request.headers.get('Content-Type'))||request.headers.has('Content-Encoding'))throw new Rejected(415);
   const length=declared(request.headers.get('Content-Length'),4096);
   const body=await readBounded(request.body,4096,control);
   if(length!==null&&length!==body.byteLength)throw new Rejected(400);
   objectJson(body);control.check();
   const headers=new Headers(request.headers);headers.delete('Content-Length');
   const bounded=new Request(request.url,{method:'POST',headers,body,signal:request.signal});
   const result=await control.wait(async()=>{
    invoked=true;
    const response=await handle(bounded,env,ctx,lease);
    // This continuation can run after the outer timeout/abort returned.
    try{control.check();}catch{discard(response);throw new Error('Request unavailable');}
    protectedResponse=response;return response;
   });
   if(!(result instanceof Response))throw Error();
   if(result.body&&(!jsonType(result.headers.get('Content-Type'))||result.headers.has('Content-Encoding')))throw Error();
   const output=await readBounded(result.body,32768,control);
   if(output.byteLength)objectJson(output);
   else if(![202,204,205,304].includes(result.status)
    &&!(result.status===401&&/^Bearer(?:\s|$)/i.test(result.headers.get('WWW-Authenticate')??'')))throw Error();
   control.check();const outHeaders=new Headers(result.headers);
   outHeaders.set('Cache-Control','no-store');outHeaders.delete('Content-Length');outHeaders.delete('Transfer-Encoding');
   return new Response([204,205,304].includes(result.status)?null:output,{status:result.status,statusText:result.statusText,headers:outHeaders});
  }catch(error){return deny(invoked?503:error instanceof Rejected?error.status:408,invoked);}
  finally{if(ownsLease)control?.close();discard(protectedResponse);}
 };
}
