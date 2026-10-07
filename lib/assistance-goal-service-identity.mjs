import {createRemoteJWKSet,jwtVerify} from 'jose';
export const GOAL_READ_ORIGIN='https://goal-context-canary.agentfriendlyweb.dev',GOAL_READ_PATH='/context',GOAL_READ_PURPOSE='afw.goal-guidance.read.v1';
const keySets=new Map(),hash=value=>typeof value==='string'&&/^[a-f0-9]{64}$/.test(value);
const id=value=>typeof value==='string'&&value.length>0&&value.length<=512;
const time=value=>Number.isSafeInteger(value)&&value>=0&&Number.isFinite(new Date(value).getTime());
const keyValid=value=>typeof value==='string'&&value.length>=32&&value.length<=8192;
export function validAssistanceGoalQuery(value){return value&&typeof value==='object'&&!Array.isArray(value)&&Object.keys(value).length===4&&['eventId','projectRef','runId','revision'].every(key=>Object.hasOwn(value,key))&&hash(value.eventId)&&hash(value.projectRef)&&typeof value.runId==='string'&&/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(value.runId)&&Number.isSafeInteger(value.revision)&&value.revision>0;}
const signingText=(timestamp,body)=>JSON.stringify([GOAL_READ_PURPOSE,GOAL_READ_ORIGIN,GOAL_READ_PATH,timestamp,body]);
const key=(secret,usage)=>crypto.subtle.importKey('raw',new TextEncoder().encode(secret),{name:'HMAC',hash:'SHA-256'},false,[usage]);
export async function signedAssistanceGoalRequest(query,secret,now){
 if(!validAssistanceGoalQuery(query)||!keyValid(secret)||!time(now))throw Error('Invalid goal read request');
 const body=JSON.stringify(query),timestamp=String(now);
 const signature=Array.from(new Uint8Array(await crypto.subtle.sign('HMAC',await key(secret,'sign'),new TextEncoder().encode(signingText(timestamp,body)))),value=>value.toString(16).padStart(2,'0')).join('');
 return new Request(GOAL_READ_ORIGIN+GOAL_READ_PATH,{method:'POST',redirect:'manual',headers:{'content-type':'application/json','x-afw-timestamp':timestamp,'x-afw-signature':signature},body});
}
// Actual cryptographic verification, prepared but not provisioned/deployed.
// Fresh JWT validity is not a live Cloudflare Access revocation lookup.
export async function verifyAssistanceGoalService({request,body,config,keySet,signingSecret,now}){
 try{
  if(!config||config.origin!==GOAL_READ_ORIGIN||config.purpose!==GOAL_READ_PURPOSE||!id(config.audience)||!id(config.clientId)||!/^([a-z0-9-]+)\.cloudflareaccess\.com$/.test(config.teamDomain)||!time(now)||!keyValid(signingSecret))return null;
  for(const [values,current] of [[config.excludedClientIds,config.clientId],[config.excludedAudiences,config.audience]])if(!Array.isArray(values)||values.length<1||values.length>8||values.some(value=>!id(value))||values.includes(current))return null;
  const url=new URL(request.url);
  if(url.origin!==GOAL_READ_ORIGIN||url.pathname!==GOAL_READ_PATH||url.search||request.method!=='POST'||request.headers.has('origin')||request.headers.has('sec-fetch-site')||typeof body!=='string'||new TextEncoder().encode(body).byteLength>512)return null;
  const token=request.headers.get('Cf-Access-Jwt-Assertion');if(!token||token.length>16384)return null;
  const timestamp=request.headers.get('x-afw-timestamp'),signature=request.headers.get('x-afw-signature');
  if(!/^\d{13}$/.test(timestamp||'')||Math.abs(now-Number(timestamp))>60000||!hash(signature))return null;
  const issuer='https://'+config.teamDomain;
  if(!keySet&&!keySets.has(issuer))keySets.set(issuer,createRemoteJWKSet(new URL(issuer+'/cdn-cgi/access/certs'),{timeoutDuration:5000,cooldownDuration:30000}));
  const {payload}=await jwtVerify(token,keySet||keySets.get(issuer),{issuer,audience:config.audience,algorithms:['RS256'],requiredClaims:['exp','sub','common_name','type'],currentDate:new Date(now)});
  const audiences=Array.isArray(payload.aud)?payload.aud:[payload.aud];
  if(audiences.length!==1||audiences[0]!==config.audience||payload.type!=='app'||payload.sub!==''||payload.common_name!==config.clientId||!Number.isSafeInteger(payload.exp))return null;
  if(!await crypto.subtle.verify('HMAC',await key(signingSecret,'verify'),Uint8Array.from(signature.match(/../g),value=>parseInt(value,16)),new TextEncoder().encode(signingText(timestamp,body))))return null;
  return{id:config.clientId,purpose:GOAL_READ_PURPOSE};
 }catch{return null;}
}
