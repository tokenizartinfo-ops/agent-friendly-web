import {createRemoteJWKSet,jwtVerify} from 'jose';
import {validAssistanceGoalQuery,GOAL_READ_ORIGIN} from './assistance-goal-service-identity.mjs';
// Prepared authority only. No route, Access app, provider or credentials provisioned.
export const GOAL_PROPOSAL_ORIGIN=GOAL_READ_ORIGIN,GOAL_PROPOSAL_PATH='/proposal',GOAL_PROPOSAL_PURPOSE='afw.goal-guidance.propose.v1';
const keySets=new Map();
const id=value=>typeof value==='string'&&value.length>0&&value.length<=512;
const time=value=>Number.isSafeInteger(value)&&value>=0&&Number.isFinite(new Date(value).getTime());
const secret=value=>typeof value==='string'&&value.length>=32&&value.length<=8192;
const hash=value=>typeof value==='string'&&/^[a-f0-9]{64}$/.test(value);
export function validAssistanceGoalProposalQuery(value){
 if(!value||typeof value!=='object'||Array.isArray(value)||Object.keys(value).length!==5||!['eventId','projectRef','runId','revision','receiptId'].every(key=>Object.hasOwn(value,key)))return false;
 return validAssistanceGoalQuery({eventId:value.eventId,projectRef:value.projectRef,runId:value.runId,revision:value.revision})&&typeof value.receiptId==='string'&&/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(value.receiptId);
}
const signingText=(timestamp,body)=>JSON.stringify([GOAL_PROPOSAL_PURPOSE,GOAL_PROPOSAL_ORIGIN,GOAL_PROPOSAL_PATH,timestamp,body]);
const key=(value,usage)=>crypto.subtle.importKey('raw',new TextEncoder().encode(value),{name:'HMAC',hash:'SHA-256'},false,[usage]);
export async function signedAssistanceGoalProposalRequest(query,signingSecret,now){
 if(!validAssistanceGoalProposalQuery(query)||!secret(signingSecret)||!time(now))throw Error('Invalid proposal request');
 const body=JSON.stringify(query),timestamp=String(now);
 const signature=Array.from(new Uint8Array(await crypto.subtle.sign('HMAC',await key(signingSecret,'sign'),new TextEncoder().encode(signingText(timestamp,body)))),value=>value.toString(16).padStart(2,'0')).join('');
 return new Request(GOAL_PROPOSAL_ORIGIN+GOAL_PROPOSAL_PATH,{method:'POST',redirect:'manual',headers:{'content-type':'application/json','x-afw-timestamp':timestamp,'x-afw-signature':signature},body});
}
// Signature/JWT verification is not a live Access revocation lookup, enrollment,
// consent, revision, active operational lease or permission to modify a project.
export async function verifyAssistanceGoalProposalService({request,body,config,keySet,signingSecret,readSigningSecret,signalSecret,now}){
 try{
 if(!config||config.origin!==GOAL_PROPOSAL_ORIGIN||config.purpose!==GOAL_PROPOSAL_PURPOSE||!/^([a-z0-9-]+)\.cloudflareaccess\.com$/.test(config.teamDomain)||!time(now))return null;
 for(const pins of [[config.clientId,config.readClientId,config.operationsClientId],[config.audience,config.readAudience,config.operationsAudience]])if(pins.some(value=>!id(value))||new Set(pins).size!==3)return null;
 if([signingSecret,readSigningSecret,signalSecret].some(value=>!secret(value))||new Set([signingSecret,readSigningSecret,signalSecret]).size!==3)return null;
 const url=new URL(request.url);
 if(url.origin!==GOAL_PROPOSAL_ORIGIN||url.pathname!==GOAL_PROPOSAL_PATH||url.search||request.method!=='POST'||request.headers.has('origin')||request.headers.has('sec-fetch-site')||request.headers.get('content-type')?.split(';')[0].trim()!=='application/json'||typeof body!=='string'||new TextEncoder().encode(body).byteLength>512||!validAssistanceGoalProposalQuery(JSON.parse(body)))return null;
 const token=request.headers.get('Cf-Access-Jwt-Assertion'),timestamp=request.headers.get('x-afw-timestamp'),signature=request.headers.get('x-afw-signature');
 if(!token||token.length>16384||!/^\d{13}$/.test(timestamp||'')||Math.abs(now-Number(timestamp))>60000||!hash(signature))return null;
 const issuer='https://'+config.teamDomain;
 if(!keySet&&!keySets.has(issuer))keySets.set(issuer,createRemoteJWKSet(new URL(issuer+'/cdn-cgi/access/certs'),{timeoutDuration:5000,cooldownDuration:30000}));
 const {payload}=await jwtVerify(token,keySet||keySets.get(issuer),{issuer,audience:config.audience,algorithms:['RS256'],requiredClaims:['exp','sub','common_name','type'],currentDate:new Date(now)});
 const audiences=Array.isArray(payload.aud)?payload.aud:[payload.aud];
 if(audiences.length!==1||audiences[0]!==config.audience||payload.type!=='app'||payload.sub!==''||payload.common_name!==config.clientId||!Number.isSafeInteger(payload.exp))return null;
 if(!await crypto.subtle.verify('HMAC',await key(signingSecret,'verify'),Uint8Array.from(signature.match(/../g),value=>parseInt(value,16)),new TextEncoder().encode(signingText(timestamp,body))))return null;
 return{id:config.clientId,purpose:GOAL_PROPOSAL_PURPOSE};
 }catch{return null;}
}
