import {createHash} from 'node:crypto';
import {readDossierEventHostPolicy} from './dossier-event-rpc-authority.mjs';
import {createOwnSyntheticSaveHandler} from './mcp-own-synthetic-save-http.mjs';
const deny=()=>new Response('{"code":"unavailable"}',{status:404,headers:{'Content-Type':'application/json','Cache-Control':'no-store'}});
/** INTERNAL trusted Worker composition. No client-supplied environment or pins. */
export function createOwnSyntheticSaveHost({env,program,sourceRevision,accessVerifier}={}){
 try{
  if(env?.AFW_DOSSIER_OWN_SAVE_ENABLED!=='true')return async()=>deny();
  const c=readDossierEventHostPolicy({enabled:env.AFW_DOSSIER_EVENTS_ENABLED==='true',env}),p=c.policy;
  const serviceMode=env.AFW_OAUTH_SERVICE_MODE,serviceExpiry=env.AFW_OAUTH_PILOT_EXPIRES_AT,serviceExpiresAt=Date.parse(serviceExpiry);
  if(env.AFW_OAUTH_ISSUER!=='https://delegated-canary.agentfriendlyweb.dev'||p.projectId!=='oauth-canary-owner'||env.AFW_DELEGATED_OAUTH_ENABLED!=='true'||env.AFW_DOSSIER_MONITORING_OWNER_ENABLED!=='true'||serviceMode!=='window'||typeof serviceExpiry!=='string'||!Number.isSafeInteger(serviceExpiresAt)||serviceExpiresAt<=Date.now()||p.expiresAt>serviceExpiresAt)return async()=>deny();
  const flag=env.AFW_DOSSIER_OWN_SAVE_ENABLED,db=c.pins.DB,key=env.AFW_DOSSIER_EVENTS_PROJECTION_SECRET,teamDomain=env.ACCESS_TEAM_DOMAIN,audience=env.ACCESS_AUD;
  const id=c.pins.AFW_DOSSIER_EVENTS_NODE.idFromString(p.containerId);if(id.toString()!==p.containerId)return async()=>deny();
  const current=()=>{c.current();return env.AFW_DOSSIER_OWN_SAVE_ENABLED===flag&&env.AFW_DOSSIER_EVENTS_PROJECTION_SECRET===key&&env.ACCESS_TEAM_DOMAIN===teamDomain&&env.ACCESS_AUD===audience&&env.AFW_DELEGATED_OAUTH_ENABLED==='true'&&env.AFW_DOSSIER_MONITORING_OWNER_ENABLED==='true'&&env.AFW_OAUTH_SERVICE_MODE===serviceMode&&env.AFW_OAUTH_PILOT_EXPIRES_AT===serviceExpiry&&Date.now()<serviceExpiresAt;};
  const beforeCommit=async()=>{
   if(!current())return false;
   const r=await c.pins.AFW_DOSSIER_EVENTS_NODE.get(id).readReadiness();
   return current()&&r?.purpose==='afw.mcp-node-readiness.v1'&&r.ready===true&&r.expiresAt>Date.now()&&r.expiresAt<=p.expiresAt;
  };
  return createOwnSyntheticSaveHandler({enabled:true,issuer:env.AFW_OAUTH_ISSUER,signingKey:key,teamDomain,audience,accessVerifier,writerOptions:{enabled:true,db,context:{grantId:p.grantId,subject:p.subject,clientId:p.clientId,resource:p.resource,scopes:['afw:project:read']},projectId:p.projectId,containerId:p.containerId,programHash:createHash('sha256').update(program).digest('hex'),sourceRevision,window:{startAt:p.startAt,expiresAt:p.expiresAt},now:Date.now,beforeCommit}});
 }catch{return async()=>deny();}
}
