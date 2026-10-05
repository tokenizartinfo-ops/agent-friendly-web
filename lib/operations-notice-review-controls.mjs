import {decodeJwt} from 'jose';
import {resolveOperationsReviewOperator} from './operations-review-operator.mjs';
import {operationsWindowOpen} from './operations-window.mjs';
import {recordNoticeReview} from './operations-notice-review.mjs';

const json=(body,status=200,headers={})=>Response.json(body,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff',...headers}});
const invalid=status=>json({code:'invalid_request'},status);

class BodyError extends Error {
 constructor(status){super('Invalid request');this.status=status;}
}
async function payload(request,timeoutMs){
 if(request.headers.get('content-type')?.split(';')[0].trim().toLowerCase()!=='application/json')throw new BodyError(415);
 const reader=request.body?.getReader();
 if(!reader)throw new BodyError(400);
 let timer,length=0;
 const chunks=[],deadline=new Promise((_,reject)=>{timer=setTimeout(()=>reject(new BodyError(408)),timeoutMs);});
 try{
  if(Number(request.headers.get('content-length'))>1024)throw new BodyError(413);
  while(true){
   const {done,value}=await Promise.race([reader.read(),deadline]);
   if(done)break;
   if(!(value instanceof Uint8Array))throw new BodyError(400);
   length+=value.byteLength;
   if(length>1024)throw new BodyError(413);
   chunks.push(value);
  }
  const bytes=new Uint8Array(length);let offset=0;
  for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.byteLength;}
  const body=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(bytes));
  if(!body||typeof body!=='object'||Array.isArray(body))throw new BodyError(400);
  return body;
 }catch(error){throw error instanceof BodyError?error:new BodyError(400);}
 finally{clearTimeout(timer);void reader.cancel().catch(()=>{});}
}
function unexpired(request,time){
 try{const {exp}=decodeJwt(request.headers.get('Cf-Access-Jwt-Assertion'));return Number.isSafeInteger(exp)&&exp>Math.floor(time/1000);}
 catch{return false;}
}

/** Internal synthetic adapter only. No route or Worker imports this module.
 * All dependencies, actor authorization and operational DB are server-owned.
 */
export function createNoticeReviewControls({env,config,keySet,limiter,now=Date.now,bodyTimeoutMs=1000}={}){
 const open=time=>config?.enabled===true&&env?.AFW_OPERATIONS_REVIEWS_ENABLED==='true'&&Number.isSafeInteger(time)&&time>=0&&Number.isFinite(new Date(time).getTime())&&operationsWindowOpen(env,time);
 return async request=>{
  try{
   if(!open(now()))return json({code:'unavailable'},404);
   const url=new URL(request.url);
   if(url.origin!==config.origin||url.pathname!=='/notices/review'||url.search)return json({code:'unavailable'},404);
   if(request.method!=='POST')return json({code:'method_not_allowed'},405,{Allow:'POST'});
   if(request.headers.get('Origin')!==config.origin||request.headers.get('Sec-Fetch-Site')!=='same-origin')return json({code:'same_origin_required'},403);
   if(typeof limiter?.limit!=='function'||!Number.isSafeInteger(bodyTimeoutMs)||bodyTimeoutMs<10||bodyTimeoutMs>3000)return json({code:'temporarily_unavailable'},503);
   let providerFailed=false;
   const resolveKey=typeof keySet==='function'?async(...args)=>{
    try{return await keySet(...args);}
    catch(error){if(error?.code!=='ERR_JWKS_NO_MATCHING_KEY')providerFailed=true;throw Error('Key unavailable');}
   }:keySet;
   const operator=await resolveOperationsReviewOperator(request,config,{keySet:resolveKey,now});
   if(!open(now()))return json({code:'unavailable'},404);
   if(providerFailed)return json({code:'temporarily_unavailable'},503);
   if(!operator.ok||!unexpired(request,now()))return json({code:'operator_identity_required'},401);
   const limited=await limiter.limit({key:operator.operatorId});
   if(!open(now()))return json({code:'unavailable'},404);
   if(!unexpired(request,now()))return json({code:'operator_identity_required'},401);
   if(limited?.success===false)return json({code:'try_later'},429);
   if(limited?.success!==true)return json({code:'temporarily_unavailable'},503);
   let body;
   try{body=await payload(request,bodyTimeoutMs);}catch(error){return invalid(error.status??400);}
   if(!open(now()))return json({code:'unavailable'},404);
   // Reverify after all body/limiter awaits; capture a fresh clock AFTER verification too.
   const current=await resolveOperationsReviewOperator(request,config,{keySet:resolveKey,now});
   const persistedAt=now();
   if(!open(persistedAt))return json({code:'unavailable'},404);
   if(providerFailed)return json({code:'temporarily_unavailable'},503);
   if(!current.ok||current.operatorId!==operator.operatorId||!unexpired(request,persistedAt))return json({code:'operator_identity_required'},401);
   try{
    const review=await recordNoticeReview(env,body,{authorized:true,operatorId:current.operatorId,now:persistedAt});
    return review?json({review}):json({code:'not_reviewed'},409);
   }catch(error){
    if(error?.message==='Invalid review input')return invalid(400);
    if(error?.message==='Review conflict')return json({code:'not_reviewed'},409);
    return json({code:'temporarily_unavailable'},503);
   }
  }catch{return json({code:'temporarily_unavailable'},503);}
 };
}
