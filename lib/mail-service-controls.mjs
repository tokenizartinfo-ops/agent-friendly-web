import { createRemoteJWKSet,jwtVerify } from 'jose';
import { consumeApprovedMail } from './mail-consumer.mjs';
import { loadMailContent,authorizeMailDecision,storeMailReceipt } from './mail-custody.mjs';
const sets=new Map();
const json=(value,status=200)=>Response.json(value,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
async function hasPayload(request) {
  if(request.body===null)return false;
  const reader=request.body.getReader();let deadline;
  try {
    return await Promise.race([
      (async()=>{for(let reads=0;reads<8;reads++){const chunk=await reader.read();if(chunk.done)return false;if(chunk.value?.byteLength)return true;}return true;})(),
      new Promise(resolve=>{deadline=setTimeout(()=>resolve(true),1000);}),
    ]);
  }catch{return true;}
  finally{clearTimeout(deadline);void reader.cancel().catch(()=>{});}
}
async function serviceIdentity(request,config,keySet) {
  try {
    if(!config || !/^[a-z0-9-]+\.cloudflareaccess\.com$/.test(config.teamDomain) || typeof config.clientId!=='string' || !config.clientId || config.clientId.length>200 || typeof config.audience!=='string' || !config.audience || typeof config.operatorAudience!=='string' || !config.operatorAudience || config.audience===config.operatorAudience)return false;
    const origin=new URL(config.origin);
    if(origin.protocol!=='https:' || origin.port || origin.origin!==config.origin || !origin.hostname.endsWith('.agentfriendlyweb.dev') || new URL(request.url).origin!==config.origin)return false;
    const token=request.headers.get('Cf-Access-Jwt-Assertion');if(!token || token.length>16384)return false;
    const issuer='https://'+config.teamDomain;
    if(!keySet && !sets.has(issuer))sets.set(issuer,createRemoteJWKSet(new URL(issuer+'/cdn-cgi/access/certs'),{timeoutDuration:5000,cooldownDuration:30000}));
    const {payload}=await jwtVerify(token,keySet||sets.get(issuer),{issuer,audience:config.audience,algorithms:['RS256'],requiredClaims:['exp','sub','common_name','type']});
    const audiences=Array.isArray(payload.aud)?payload.aud:[payload.aud];
    return audiences.length===1 && audiences[0]===config.audience && payload.type==='app' && payload.sub==='' && payload.common_name===config.clientId && Number.isSafeInteger(payload.exp);
  }catch{return false;}
}

/** Isolated service-only composition. No approval, ingestion, review or purge routes.
 * Config, limiter and provider binding are resolved by server, not request/model.
 */
export function createMailServiceControls({db,email,limiter,config,keySet,now=Date.now}) {
  const primary=()=>db.withSession?db.withSession('first-primary'):db;
  return async request=>{
    if(config?.enabled!==true)return json({code:'unavailable'},404);
    const url=new URL(request.url),match=url.pathname.match(/^\/consume\/([A-Za-z0-9_-]{1,128})$/);
    if(request.method!=='POST' || !match || url.search)return json({code:'unavailable'},404);
    if(request.headers.has('Origin') || await hasPayload(request))return json({code:'service_request_required'},403);
    if(!await serviceIdentity(request,config,keySet))return json({code:'service_identity_required'},401);
    try {
      if(typeof limiter?.limit!=='function')return json({code:'service_unavailable'},503);
      if(!(await limiter.limit({key:'afw-mail-consumer'})).success)return json({code:'try_later'},429);
      const result=await consumeApprovedMail({db:primary(),key:match[1],email,now,allowBrand:config.brandEnabled===true,
        loadMessage:key=>loadMailContent(primary(),key),
        // Start each permission read on primary; never reuse a stale replica snapshot.
        authorize:context=>authorizeMailDecision(primary(),context,now()),
        saveReceipt:receipt=>storeMailReceipt(primary(),receipt)});
      return json(result);
    }catch{return json({code:'temporarily_unavailable'},503);}
  };
}
