import {createHash} from 'node:crypto';
import {readDossierEventHostPolicy} from './dossier-event-rpc-authority.mjs';
import {createOwnSyntheticSaveHandler} from './mcp-own-synthetic-save-http.mjs';
import {createOwnSubscriptionObservationHandler} from './mcp-own-subscription-observation-http.mjs';
import {readOwnEventSchedulePlan} from './mcp-own-event-schedule.mjs';
const deny=()=>new Response('{"code":"unavailable"}',{status:404,headers:{'Content-Type':'application/json','Cache-Control':'no-store'}});
/** INTERNAL trusted Worker composition. No client-supplied environment or pins. */
export function createOwnSyntheticSaveHost({env,program,sourceRevision,accessVerifier}={}){
 try{
  if(env?.AFW_DOSSIER_OWN_SAVE_ENABLED!=='true')return async()=>deny();
  const c=readDossierEventHostPolicy({enabled:env.AFW_DOSSIER_EVENTS_ENABLED==='true',env}),p=c.policy;
  const serviceMode=env.AFW_OAUTH_SERVICE_MODE,serviceExpiry=env.AFW_OAUTH_PILOT_EXPIRES_AT,serviceExpiresAt=Date.parse(serviceExpiry);
  if(env.AFW_OAUTH_ISSUER!=='https://delegated-canary.agentfriendlyweb.dev'||p.projectId!=='oauth-canary-owner'||env.AFW_DELEGATED_OAUTH_ENABLED!=='true'||env.AFW_DOSSIER_MONITORING_OWNER_ENABLED!=='true'||serviceMode!=='window'||typeof serviceExpiry!=='string'||!Number.isSafeInteger(serviceExpiresAt)||serviceExpiresAt<=Date.now()||p.expiresAt>serviceExpiresAt)return async()=>deny();
  const flag=env.AFW_DOSSIER_OWN_SAVE_ENABLED,db=c.pins.DB,key=env.AFW_DOSSIER_EVENTS_PROJECTION_SECRET,teamDomain=env.ACCESS_TEAM_DOMAIN,audience=env.ACCESS_AUD;
  const preparedSaveKey=env.AFW_DOSSIER_OWN_SAVE_KEY,schedule=env.AFW_DOSSIER_EVENTS_SCHEDULE,scheduleEnabled=env.AFW_DOSSIER_EVENTS_SCHEDULE_ENABLED,scheduleMode=env.AFW_DOSSIER_EVENTS_SCHEDULE_MODE;
  if(preparedSaveKey!==undefined){
   if(typeof preparedSaveKey!=='string'||!(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/).test(preparedSaveKey)||typeof schedule!=='string'||schedule.length>1024)return async()=>deny();
   const {plan:planned,ownReceipt}=readOwnEventSchedulePlan(schedule,p),eventId=createHash('sha256').update(JSON.stringify(['afw.own-synthetic-save.v1',p.subject,p.projectId,preparedSaveKey])).digest('hex');
   if(!ownReceipt||planned.eventId!==eventId||scheduleEnabled!=='true'||!['exact','stable-minute'].includes(scheduleMode??'exact'))return async()=>deny();
  }
  const id=c.pins.AFW_DOSSIER_EVENTS_NODE.idFromString(p.containerId);if(id.toString()!==p.containerId)return async()=>deny();
  const current=()=>{c.current();return env.AFW_DOSSIER_OWN_SAVE_KEY===preparedSaveKey&&env.AFW_DOSSIER_EVENTS_SCHEDULE===schedule&&env.AFW_DOSSIER_EVENTS_SCHEDULE_ENABLED===scheduleEnabled&&env.AFW_DOSSIER_EVENTS_SCHEDULE_MODE===scheduleMode&&env.AFW_DOSSIER_OWN_SAVE_ENABLED===flag&&env.AFW_DOSSIER_EVENTS_PROJECTION_SECRET===key&&env.ACCESS_TEAM_DOMAIN===teamDomain&&env.ACCESS_AUD===audience&&env.AFW_DELEGATED_OAUTH_ENABLED==='true'&&env.AFW_DOSSIER_MONITORING_OWNER_ENABLED==='true'&&env.AFW_OAUTH_SERVICE_MODE===serviceMode&&env.AFW_OAUTH_PILOT_EXPIRES_AT===serviceExpiry&&Date.now()<serviceExpiresAt;};
  const beforeCommit=async()=>{
   if(!current())return false;
   const r=await c.pins.AFW_DOSSIER_EVENTS_NODE.get(id).readReadiness();
   return current()&&r?.purpose==='afw.mcp-node-readiness.v1'&&r.ready===true&&r.expiresAt>Date.now()&&r.expiresAt<=p.expiresAt;
  };
  const save=createOwnSyntheticSaveHandler({enabled:true,issuer:env.AFW_OAUTH_ISSUER,signingKey:key,teamDomain,audience,preparedSaveKey,accessVerifier,writerOptions:{enabled:true,db,context:{grantId:p.grantId,subject:p.subject,clientId:p.clientId,resource:p.resource,scopes:['afw:project:read']},projectId:p.projectId,containerId:p.containerId,programHash:createHash('sha256').update(program).digest('hex'),sourceRevision,window:{startAt:p.startAt,expiresAt:p.expiresAt},now:Date.now,beforeCommit}});
  const review=createOwnSubscriptionObservationHandler({enabled:true,issuer:env.AFW_OAUTH_ISSUER,subject:p.subject,teamDomain,audience,accessVerifier,window:{startAt:p.startAt,expiresAt:p.expiresAt},now:Date.now,current,readObservation:async()=>{if(!current())throw Error('closed');const r=await c.pins.AFW_DOSSIER_EVENTS_NODE.get(id).observeSubscription();if(!current())throw Error('closed');return r;}});
  return request=>new URL(request.url).search==='?view=avisos'?review(request):save(request);
 }catch{return async()=>deny();}
}
