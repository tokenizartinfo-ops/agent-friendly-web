import {createRemoteJWKSet,jwtVerify} from 'jose';
import {GOAL_READ_ORIGIN,validAssistanceGoalQuery,signedAssistanceGoalRequest} from './assistance-goal-service-identity.mjs';
import {validAssistanceGoalProposalQuery,signedAssistanceGoalProposalRequest} from './assistance-goal-proposal-identity.mjs';
const keySets=new Map();
const id=value=>typeof value==='string'&&value.length>0&&value.length<=512;
const secret=value=>typeof value==='string'&&value.length>=32&&value.length<=8192;
const reply=(code,status)=>Response.json({code},{status,headers:{'cache-control':'no-store','x-content-type-options':'nosniff'}});
async function boundedBody(request){
 const reader=request.body?.getReader();if(!reader)return null;
 let timer,size=0;const chunks=[];const deadline=new Promise((_,reject)=>{timer=setTimeout(()=>reject(Error('body timeout')),3000);});
 try{while(true){const part=await Promise.race([reader.read(),deadline]);if(part.done)break;size+=part.value.byteLength;if(size>512)return null;chunks.push(part.value);}
  const bytes=new Uint8Array(size);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.byteLength;}return new TextDecoder('utf-8',{fatal:true}).decode(bytes);
 }finally{clearTimeout(timer);void reader.cancel().catch(()=>{});}
}
// Exact-query custodial ingress, not a signing oracle. Only the server signs;
// the existing recipient repeats JWT/HMAC and primary consent/revision/lease
// checks. Valid JWT alone does not prove live Access revocation or consent.
export function createAssistanceGoalCustodialHttp({getSettings,signingSecret,readSigningSecret,signalSecret,dispatch,limiter,keySet,now=Date.now}={}){
 return async request=>{
  try{
   const url=new URL(request.url),path=url.pathname;
   if(url.origin!==GOAL_READ_ORIGIN||url.search||request.method!=='POST'||!['/custodial/context','/custodial/proposal'].includes(path))return reply('unavailable',404);
   const proposal=path==='/custodial/proposal',initial=structuredClone(getSettings?.(proposal)||{}),serialized=JSON.stringify(initial),started=now(),until=Date.parse(initial.expiresAt);
   const open=()=>initial.enabled===true&&(proposal?initial.proposalEnabled===true&&initial.generationEnabled===true:initial.contextEnabled===true)&&Number.isSafeInteger(started)&&Number.isFinite(until)&&typeof initial.expiresAt==='string'&&new Date(until).toISOString()===initial.expiresAt&&until>started&&until-started<=600000&&now()>=started&&now()<until&&JSON.stringify(getSettings(proposal))===serialized&&!request.signal.aborted;
   const pins=[[initial.readClientId,initial.proposalClientId,initial.operationsClientId],[initial.readAudience,initial.proposalAudience,initial.operationsAudience]];
   if(!open()||pins.some(values=>values.some(value=>!id(value))||new Set(values).size!==3)||!/^([a-z0-9-]+)\.cloudflareaccess\.com$/.test(initial.teamDomain)||[signingSecret,readSigningSecret,signalSecret].some(value=>!secret(value))||new Set([signingSecret,readSigningSecret,signalSecret]).size!==3||typeof dispatch!=='function')return reply('unavailable',404);
   if(request.headers.has('origin')||request.headers.has('sec-fetch-site'))return reply('service_request_required',403);
   if(typeof limiter?.limit!=='function')return reply('unavailable',503);
   if(request.headers.get('content-type')?.split(';')[0].trim().toLowerCase()!=='application/json')return reply('invalid_request',415);
   let query;try{const body=await boundedBody(request);query=JSON.parse(body);}catch{return reply('invalid_request',400);}
   if(!(proposal?validAssistanceGoalProposalQuery(query):validAssistanceGoalQuery(query)))return reply('invalid_request',400);
   if(!open())return reply('unavailable',404);
   const token=request.headers.get('cf-access-jwt-assertion');if(!token||token.length>16384)return reply('service_identity_required',401);
   const clientId=proposal?initial.proposalClientId:initial.readClientId,audience=proposal?initial.proposalAudience:initial.readAudience,issuer='https://'+initial.teamDomain;
   let payload;try{if(!keySet&&!keySets.has(issuer))keySets.set(issuer,createRemoteJWKSet(new URL(issuer+'/cdn-cgi/access/certs'),{timeoutDuration:5000,cooldownDuration:30000}));
    ({payload}=await jwtVerify(token,keySet||keySets.get(issuer),{issuer,audience,algorithms:['RS256'],requiredClaims:['exp','sub','common_name','type'],currentDate:new Date(now())}));
   }catch{return reply('service_identity_required',401);}
   const audiences=Array.isArray(payload.aud)?payload.aud:[payload.aud];
   if(audiences.length!==1||audiences[0]!==audience||payload.type!=='app'||payload.sub!==''||payload.common_name!==clientId||!Number.isSafeInteger(payload.exp))return reply('service_identity_required',401);
   if(!open())return reply('unavailable',404);
   if(!(await limiter.limit({key:'afw-goal-custodial:'+(proposal?'proposal:':'context:')+clientId})).success)return reply('try_later',429);
   if(!open())return reply('unavailable',404);
   const signed=await (proposal?signedAssistanceGoalProposalRequest(query,signingSecret,now()):signedAssistanceGoalRequest(query,readSigningSecret,now()));
   signed.headers.set('cf-access-jwt-assertion',token);
   if(!open())return reply('unavailable',404);
   const result=await dispatch(signed);
   if(!open())return reply('unavailable',404);
   if(!(result instanceof Response)||result.status<200||result.status>=300&&result.status<400)return reply('request_unavailable',503);
   // No credentials, timestamps, signatures, redirects or recipient headers
   // are returned. The recipient already owns the response's private schema.
   return new Response(result.body,{status:result.status,headers:{'content-type':'application/json','cache-control':'no-store','x-content-type-options':'nosniff'}});
  }catch{return reply('request_unavailable',503);}
 };
}
