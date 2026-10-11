import {createHash} from 'node:crypto';
import {projectDossierEvent} from './dossier-supervision.mjs';
import {createMcpSubscriptionController} from './mcp-subscription-lifecycle.mjs';
const purpose='afw.dossier-monitoring.v1';
const id=x=>typeof x==='string'&&x.length>0&&x.length<=200&&x.trim()===x;
const time=x=>Number.isSafeInteger(x)&&x>=0&&x<=8640000000000000;
const primary=db=>db.withSession?db.withSession('first-primary'):db;
const fail=()=>{throw Error('Monitoring authorization unavailable');};
const digest=value=>createHash('sha256').update(JSON.stringify([purpose,...value])).digest('hex');
const receipt=row=>({status:200,sequence:row.sequence,action:row.action,expiresAt:row.expires_at});
const validScopes="json_valid(g.scopes_json) AND json_type(CASE WHEN json_valid(g.scopes_json) THEN g.scopes_json ELSE '[]' END)='array' AND EXISTS(SELECT 1 FROM json_each(CASE WHEN json_valid(g.scopes_json) THEN g.scopes_json ELSE '[]' END) WHERE value='afw:project:read') AND NOT EXISTS(SELECT 1 FROM json_each(CASE WHEN json_valid(g.scopes_json) THEN g.scopes_json ELSE '[]' END) WHERE type<>'text')";

/** Source-only journal writer. The future UI adapter MUST resolve authenticated
 * owner, grant/project, CSRF, request bounds and finite QA rollout on the server.
 * Never expose this options object as a public endpoint or infer consent from a
 * read grant. One explicit grant then terminal withdrawal, never grant renewal.
 */
export async function recordDossierMonitoringConsent(options){
 let o;try{
  if(!options||Object.getPrototypeOf(options)!==Object.prototype)throw Error('input');
  const descriptors=Object.getOwnPropertyDescriptors(options),allowed=['db','subject','grantId','projectId','expectedRevision','expectedSequence','requestId','action','now','expiresAt','commitWindow','expectedClientId','expectedResource','beforeCommit'];
  if(Reflect.ownKeys(descriptors).some(k=>typeof k!=='string'||!allowed.includes(k)||!Object.hasOwn(descriptors[k],'value')||!descriptors[k].enumerable))throw Error('input');
  const snapshot=Object.fromEntries(Object.entries(descriptors).map(([k,d])=>[k,d.value]));
  if(snapshot.commitWindow!==undefined){
   const w=snapshot.commitWindow;if(!w||Object.getPrototypeOf(w)!==Object.prototype)throw Error('input');
   const d=Object.getOwnPropertyDescriptors(w);if(Reflect.ownKeys(d).length!==2||!['startAt','expiresAt'].every(k=>d[k]&&Object.hasOwn(d[k],'value')&&time(d[k].value)))throw Error('input');
   snapshot.commitWindow=Object.freeze({startAt:d.startAt.value,expiresAt:d.expiresAt.value});
   if(snapshot.commitWindow.expiresAt<=snapshot.commitWindow.startAt||snapshot.commitWindow.expiresAt-snapshot.commitWindow.startAt>600000)throw Error('input');
  }
  o=Object.freeze(snapshot);
 }catch{return{status:400,code:'invalid_input'};}
 if(!o?.db?.prepare||!['subject','grantId','projectId'].every(k=>id(o[k]))||!['grant','revoke'].includes(o.action)||!Number.isSafeInteger(o.expectedRevision)||o.expectedRevision<1||!Number.isSafeInteger(o.expectedSequence)||o.expectedSequence<0||!time(o.now)||typeof o.requestId!=='string'||!(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/).test(o.requestId))return{status:400,code:'invalid_input'};
 if((o.expectedClientId!==undefined||o.expectedResource!==undefined)&&(!id(o.expectedClientId)||!id(o.expectedResource)))return{status:400,code:'invalid_input'};
 if(o.beforeCommit!==undefined&&typeof o.beforeCommit!=='function')return{status:400,code:'invalid_input'};
 const until=o.action==='grant'?(o.expiresAt??o.now+600000):o.now;
 if(!time(until)||o.action==='grant'&&(until<=o.now||until-o.now>600000))return{status:400,code:'invalid_input'};
 try{
  const db=primary(o.db);
  const recover=async()=>{
   const row=await db.prepare(`SELECT c.* FROM dossier_monitoring_consent_events c JOIN site_projects p ON p.id=c.project_id AND p.user_id=c.user_id WHERE c.grant_id=? AND c.request_id=? AND c.project_id=? AND c.user_id=?`).bind(o.grantId,o.requestId,o.projectId,o.subject).first();
   if(!row)return null;
   return row.action===o.action&&row.revision===o.expectedRevision&&row.purpose===purpose?receipt(row):{status:409,code:'idempotency_conflict'};
  };
  const prior=await recover();if(o.beforeCommit&&(await o.beforeCommit())!==true)return{status:403,code:'monitoring_consent_unavailable'};if(prior)return prior;
  await db.prepare(`INSERT INTO dossier_monitoring_consent_events(grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at)
   SELECT g.id,g.project_id,g.user_id,g.client_id,g.resource,?,?,?,?,?,? FROM delegated_access_grants g JOIN site_projects p ON p.id=g.project_id AND p.user_id=g.user_id
   WHERE g.id=? AND g.project_id=? AND g.user_id=? AND
   COALESCE((SELECT MAX(sequence) FROM dossier_monitoring_consent_events WHERE grant_id=g.id),0)=? AND
   ${o.action==='grant'?`p.revision=? AND g.revoked_at='' AND g.expires_at>? AND g.expires_at>=? AND ${validScopes} AND NOT EXISTS(SELECT 1 FROM dossier_monitoring_consent_events WHERE grant_id=g.id)`:
    "EXISTS(SELECT 1 FROM dossier_monitoring_consent_events WHERE grant_id=g.id AND action='grant') AND NOT EXISTS(SELECT 1 FROM dossier_monitoring_consent_events WHERE grant_id=g.id AND action='revoke')"}
   ${o.expectedClientId!==undefined?'AND g.client_id=? AND g.resource=?':''}
   ${o.commitWindow?"AND CAST(unixepoch('subsec')*1000 AS INTEGER)>=? AND CAST(unixepoch('subsec')*1000 AS INTEGER)<?":''}
   ON CONFLICT(grant_id,request_id) DO NOTHING`).bind(o.expectedRevision,o.action,purpose,o.requestId,o.now,until,o.grantId,o.projectId,o.subject,o.expectedSequence,...(o.action==='grant'?[o.expectedRevision,new Date(o.now).toISOString(),new Date(until).toISOString()]:[]),...(o.expectedClientId!==undefined?[o.expectedClientId,o.expectedResource]:[]),...(o.commitWindow?[o.commitWindow.startAt,o.commitWindow.expiresAt]:[])).run();
  return(await recover())??{status:409,code:'monitoring_consent_changed'};
 }catch{return{status:503,code:'monitoring_consent_unavailable'};}
}

/** Resolver for lifecycle readAuthorization. Only a cryptographically validated
 * OAuth host supplies context; current primary grant/owner and separate original
 * monitoring journal are read together, uncached. Missing consent stays disabled.
 * No mount, original user consent or storage custody is proved by this factory.
 */
export function createDossierMonitoringAuthorization({db,context,projectId,projectionSecret,now=Date.now}={}){
 if(!db?.prepare||!context||!['grantId','subject','clientId','resource'].every(k=>id(context[k]))||!id(projectId)||!Array.isArray(context.scopes)||context.scopes.some(scope=>typeof scope!=='string')||!context.scopes.includes('afw:project:read')||typeof projectionSecret!=='string'||projectionSecret.length<32||projectionSecret.length>8192||typeof now!=='function')fail();
 const ctx=Object.freeze(Object.fromEntries(['grantId','subject','clientId','resource'].map(k=>[k,context[k]])));
 let last=-1;const clock=()=>{const t=now();if(!time(t)||t<last)fail();last=t;return t;};
 const query=`SELECT g.*,c.sequence,c.purpose,c.client_id AS consent_client,c.resource AS consent_resource,c.issued_at,c.expires_at AS consent_expires,
  COALESCE((SELECT MAX(sequence) FROM dossier_monitoring_consent_events WHERE grant_id=g.id),0) AS latest_sequence,
  EXISTS(SELECT 1 FROM dossier_monitoring_consent_events WHERE grant_id=g.id AND action='revoke') AS withdrawn
  FROM delegated_access_grants g JOIN site_projects p ON p.id=g.project_id AND p.user_id=g.user_id
  LEFT JOIN dossier_monitoring_consent_events c ON c.grant_id=g.id AND c.project_id=g.project_id AND c.user_id=g.user_id AND c.action='grant'
  WHERE g.id=? AND g.user_id=? AND g.client_id=? AND g.project_id=? AND g.resource=? AND g.revoked_at='' AND ${validScopes}`;
 return async()=>{try{
  clock();const source=await projectDossierEvent({id:'monitor-projection',projectId,type:'project_created',revision:1,createdAt:'1970-01-01T00:00:00.000Z'},projectionSecret);clock();
  const read=()=>primary(db).prepare(query).bind(ctx.grantId,ctx.subject,ctx.clientId,projectId,ctx.resource).first();
  const row=await read();clock();if(!row)fail();
  const fresh=await read();const t=clock();if(!fresh||JSON.stringify(fresh)!==JSON.stringify(row))fail();
  const expires=Date.parse(row.expires_at);if(!time(expires)||new Date(expires).toISOString()!==row.expires_at||expires<=t)fail();
  const consent=row.sequence!==null;
  if(consent&&(row.purpose!==purpose||row.consent_client!==ctx.clientId||row.consent_resource!==ctx.resource||!time(row.issued_at)||!time(row.consent_expires)||row.issued_at>t||row.consent_expires<=row.issued_at||row.consent_expires-row.issued_at>600000))fail();
  return Object.freeze({principalRef:digest(['principal',ctx.subject,ctx.clientId]),resourceRef:digest(['resource',ctx.resource]),projectRef:source.projectRef,
   permissionRef:digest(['permission',ctx.grantId,row.sequence??0,row.issued_at??0,row.consent_expires??0]),enabled:consent&&row.withdrawn===0&&t<row.consent_expires,
   expiresAt:consent?Math.min(expires,row.consent_expires):expires});
 }catch{fail();}};
}

/** Fixed private host composition; no OAuth/UI/RPC mount. Storage is ONE trusted
 * dedicated QA authority namespace; never supplied by MCP or pooled by customer.
 * The original dossier producer alone may call deliver with verified metadata.
 */
export function createDossierMonitoringEventsAuthority(options){
 const readAuthorization=createDossierMonitoringAuthorization(options);
 const controller=createMcpSubscriptionController({storage:options.storage,readAuthorization,custodyKey:options.custodyKey,send:options.send,now:options.now});
 return Object.freeze({list:async()=>{const auth=await readAuthorization();return auth.enabled?auth.projectRef:null;},subscribe:controller.subscribe,unsubscribe:controller.unsubscribe,deliver:controller.deliver});
}
