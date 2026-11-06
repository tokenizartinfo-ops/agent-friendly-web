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

// Fixed choice grammar; metadata and cookie text remain DATA, not approval.
function choiceCookies(headers){
 const raw=headers.get('Cookie'),assertion=headers.get('Cf-Access-Jwt-Assertion')??'';
 if((raw?.length??0)>8192||assertion.length>8192||/[\r\n]/.test((raw??'')+assertion))finiteNativeFailure(400);
 if(raw===null)return null;
 const cookie=raw.replace(/^[ \t]+|[ \t]+$/g,'');if(!cookie)finiteNativeFailure(400);
 const names=new Set();let prepare=null;
 for(const part of cookie.split('; ')){
  const at=part.indexOf('='),name=part.slice(0,at),value=part.slice(at+1);
  if(at<1||!/^[!#$%&'*+\-.^_\x60|~0-9A-Za-z]+$/.test(name)||names.has(name))finiteNativeFailure(400);
  names.add(name);
  const octets=value.startsWith('"')&&value.endsWith('"')&&value.length>=2?value.slice(1,-1):value;
  if(!/^[\x21\x23-\x2b\x2d-\x3a\x3c-\x5b\x5d-\x7e]*$/.test(octets))finiteNativeFailure(400);
  if(name==='__Host-afw-finite-prepare')prepare=value;
 }
 return prepare;
}
export function qualifyFiniteOwnerChoiceRequest(request,bytes){
 if(!(request instanceof Request)||request.url!==finiteNativeOriginalUrl)finiteNativeFailure(404);
 if(!['GET','POST'].includes(request.method))finiteNativeFailure(405);
 if(!(bytes instanceof Uint8Array))finiteNativeFailure(400);
 const origin=request.headers.get('Origin');
 if(origin!==null&&origin!==finiteNativeOrigin||request.method==='POST'&&origin!==finiteNativeOrigin)finiteNativeFailure(403);
 const cookie=choiceCookies(request.headers);
 if(request.method==='GET'){if(bytes.length)finiteNativeFailure(400);return Object.freeze({method:'GET'});}
 if(bytes.length>1024)finiteNativeFailure(413);
 if(request.headers.get('Content-Type')!=='application/x-www-form-urlencoded'||!bytes.length)finiteNativeFailure(400);
 let text;try{text=new TextDecoder('utf-8',{fatal:true}).decode(bytes);if(/%(?![a-f0-9]{2})/i.test(text))finiteNativeFailure(400);decodeURIComponent(text.replace(/\+/g,' '));}catch{finiteNativeFailure(400);}
 const form=new URLSearchParams(text),entries=[...form];
 if(entries.length!==3||!['handle','projectRef','decision'].every(key=>form.getAll(key).length===1)||entries.some(([key])=>!['handle','projectRef','decision'].includes(key))||form.get('decision')!=='approve'||![form.get('handle'),form.get('projectRef')].every(value=>/^[a-f0-9]{64}$/.test(value??'')))finiteNativeFailure(400);
 if(cookie!==form.get('handle'))finiteNativeFailure(403);
 return Object.freeze({method:'POST',handle:form.get('handle'),projectRef:form.get('projectRef')});
}
export function finiteNativeChoiceHtml(response,bytes){
 if(!(response instanceof Response)||response.status!==200||!(bytes instanceof Uint8Array)||bytes.length>16384||!/^text\/html(?:;|$)/i.test(response.headers.get('content-type')??''))finiteNativeFailure();
 try{new TextDecoder('utf-8',{fatal:true}).decode(bytes);}catch{finiteNativeFailure();}
 const headers=new Headers();let size=0;
 for(const [key,value]of response.headers){
  if(!['content-type','content-security-policy','referrer-policy','set-cookie','cache-control','x-frame-options','x-content-type-options'].includes(key)||value.length>8192||(size+=key.length+value.length)>16384)finiteNativeFailure();
  if(key==='x-content-type-options'&&value!=='nosniff')finiteNativeFailure();
  headers.append(key,value);
 }
 headers.set('Content-Type','text/html; charset=utf-8');headers.set('Cache-Control','no-store');headers.set('Referrer-Policy','no-referrer');headers.set('X-Content-Type-Options','nosniff');headers.set('X-Frame-Options','DENY');
 headers.set('Content-Security-Policy',"default-src 'none'; form-action 'self'; frame-ancestors 'none'; base-uri 'none'");
 return new Response(bytes,{status:200,headers});
}
