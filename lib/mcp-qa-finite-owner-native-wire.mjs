import {readFiniteOwnerRequestBoundary} from './mcp-qa-finite-owner-preparation.mjs';
import {retainFiniteOwnerStagePromise} from './mcp-qa-finite-stage-work.mjs';
// Internal fixed wire vocabulary. DATA never represents approval or admission.
export const finiteNativeOrigin='https://delegated-canary.agentfriendlyweb.dev';
export const finiteNativeOriginalUrl=finiteNativeOrigin+'/connections/finite-prepare';
export const finiteNativeTarget='https://afw-private.invalid/_finite-owner/choice';
export const finiteNativeActor='afw-own-successor-closure-v1';
export const finiteNativeHeaders=['x-afw-finite-boundary','x-afw-finite-original-method','x-afw-finite-original-url','x-afw-finite-version','x-afw-finite-request-id'];
export const finiteNativePreservedHeaders=['Cf-Access-Jwt-Assertion','Origin','Cookie','Content-Type'];
export const finiteNativeUuid=value=>typeof value==='string'&&/^[a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/.test(value);
export function finiteNativeFailure(status=503){const error=Error('Finite native conduit unavailable');error.status=status;throw error;}
export function finiteNativePending(status=503){return Response.json({status:'admin_pending',mayRetry:false,operationalReadiness:false},{status,headers:{'Cache-Control':'no-store'}});}
export function finiteNativeMetadata(headers){
 const entries=[...headers].filter(([key])=>key.startsWith('x-afw-finite-'));
 if(entries.length!==finiteNativeHeaders.length||entries.some(([key])=>!finiteNativeHeaders.includes(key))||new TextEncoder().encode(JSON.stringify(entries)).length>2048)finiteNativeFailure(400);
 const raw=headers.get('x-afw-finite-boundary');let boundary;
 try{boundary=JSON.parse(raw);}catch{finiteNativeFailure(400);}
 if(!boundary||typeof boundary!=='object'||!['startedAt','deadline','remainingMs'].every(key=>Number.isSafeInteger(boundary[key]))||JSON.stringify({startedAt:boundary.startedAt,deadline:boundary.deadline,remainingMs:boundary.remainingMs})!==raw)finiteNativeFailure(400);
 const method=headers.get('x-afw-finite-original-method');
 if(!['GET','POST'].includes(method)||headers.get('x-afw-finite-original-url')!==finiteNativeOriginalUrl||!finiteNativeUuid(headers.get('x-afw-finite-version'))||!finiteNativeUuid(headers.get('x-afw-finite-request-id')))finiteNativeFailure(400);
 if(method==='POST'&&headers.get('Origin')!==finiteNativeOrigin)finiteNativeFailure(403);
 return {boundary,method};
}
/** Whole operation registered before any timeout/abort race. Known failure is
 * signalled promptly, while its real cancellation remains in the retained work. */
export async function finiteNativeOperation(lease,ctx,operation){
 const {remainingMs}=readFiniteOwnerRequestBoundary(lease);
 let rejectFirst,abort,timer;
 const first=new Promise((_,reject)=>{rejectFirst=reject;});
 const deadline=new Promise((_,reject)=>{
  abort=()=>{try{finiteNativeFailure();}catch(error){reject(error);}};
  lease.signal.addEventListener('abort',abort,{once:true});
  timer=setTimeout(abort,remainingMs);
 });
 const actual=retainFiniteOwnerStagePromise(Promise.resolve().then(()=>{lease.assertCurrent();return operation(rejectFirst);}));
 // waitUntil retains this same completion, not a timeout winner.
 if(typeof ctx.waitUntil==='function')ctx.waitUntil(actual.catch(()=>{}));
 try{return await Promise.race([actual,first,deadline]);}
 finally{clearTimeout(timer);lease.signal.removeEventListener('abort',abort);}
}
/** Caller owns the actual read/failure/cancel chain until physical settlement. */
export async function finiteNativeBytes(message,check,first,status=400){
 const reader=message.body?.getReader();if(!reader){check();return new Uint8Array();}
 const chunks=[];let length=0;
 try{
  check();
  for(;;){const {done,value}=await reader.read();check();if(done)break;if(!(value instanceof Uint8Array)||(length+=value.length)>16384)finiteNativeFailure(status);chunks.push(value);}
  const bytes=new Uint8Array(length);let at=0;for(const chunk of chunks){bytes.set(chunk,at);at+=chunk.length;}return bytes;
 }catch(error){first(error);try{await reader.cancel();}catch{}throw error;}
}
export async function finiteNativeCancel(message,error,first){
 first(error);try{await message.body?.cancel();}catch{}throw error;
}
