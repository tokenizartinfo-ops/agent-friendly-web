import {createDossierMonitoringAuthorization} from './dossier-monitoring-authority.mjs';
import {projectDossierEvent} from './dossier-supervision.mjs';
const fail=()=>{throw Error('Saved dossier event unavailable');};
const identifier=x=>typeof x==='string'&&x.length>0&&x.length<=256&&x.trim()===x;
function exact(v,keys,row=false){if(!v||(Object.getPrototypeOf(v)!==Object.prototype&&(!row||Object.getPrototypeOf(v)!==null)))fail();const d=Object.getOwnPropertyDescriptors(v),own=Reflect.ownKeys(d);if(own.length!==keys.length||own.some(k=>typeof k!=='string'||!keys.includes(k)||!Object.hasOwn(d[k],'value')||!d[k].enumerable))fail();return Object.fromEntries(keys.map(k=>[k,d[k].value]));}

/** INTERNAL original SQL source only. Caller selects a saved event identifier;
 * it never supplies its metadata, owner, project, revision or payload. */
export async function readSavedDossierMcpEvent(options,eventId){try{
 const o=exact(options,['enabled','db','context','projectId','projectionSecret','window','now']);if(o.enabled!==true||!identifier(eventId))fail();
 const context=exact(o.context,['grantId','subject','clientId','resource','scopes']),w=exact(o.window,['startAt','expiresAt']);
 if(!Number.isSafeInteger(w.startAt)||w.startAt<0||!Number.isSafeInteger(w.expiresAt)||w.expiresAt<=w.startAt||w.expiresAt-w.startAt>600000||typeof o.now!=='function')fail();
 const readAuthorization=createDossierMonitoringAuthorization({db:o.db,context,projectId:o.projectId,projectionSecret:o.projectionSecret,now:o.now});
 const db=()=>o.db.withSession?o.db.withSession('first-primary'):o.db;let last=-1;
 const clock=()=>{const t=o.now();if(!Number.isSafeInteger(t)||t<last||t<w.startAt||t>=w.expiresAt)fail();last=t;return t;};
 const original=await readAuthorization();if(!original.enabled)fail();clock();
 const current=async()=>{clock();const a=await readAuthorization();clock();if(!a.enabled||['principalRef','resourceRef','projectRef','permissionRef'].some(k=>a[k]!==original[k]))fail();};
 const query='SELECT e.id,e.project_id AS projectId,e.type,e.created_at AS createdAt,e.payload_json AS payloadJson,p.revision AS projectRevision FROM project_events e JOIN site_projects p ON p.id=e.project_id AND p.user_id=e.user_id WHERE e.id=? AND p.id=? AND p.user_id=? AND e.user_id=?';
 const read=async()=>{const row=await db().prepare(query).bind(eventId,o.projectId,context.subject,context.subject).first();clock();if(!row)fail();const r=exact(row,['id','projectId','type','createdAt','payloadJson','projectRevision'],true);if(r.id!==eventId||r.projectId!==o.projectId||!['project_created','project_updated'].includes(r.type)||typeof r.createdAt!=='string'||!Number.isFinite(Date.parse(r.createdAt))||new Date(r.createdAt).toISOString()!==r.createdAt||Date.parse(r.createdAt)<w.startAt||Date.parse(r.createdAt)>clock()||typeof r.payloadJson!=='string'||Buffer.byteLength(r.payloadJson)>262144)fail();const payload=JSON.parse(r.payloadJson);if(!payload||Object.getPrototypeOf(payload)!==Object.prototype||JSON.stringify(payload)!==r.payloadJson||!Object.hasOwn(payload,'revision')||!Number.isSafeInteger(payload.revision)||payload.revision<1||payload.revision!==r.projectRevision)fail();return Object.freeze({...r,revision:payload.revision});};
 const row=await read();await current();const second=await read();if(JSON.stringify(second)!==JSON.stringify(row))fail();
 const signal=await projectDossierEvent({id:row.id,projectId:row.projectId,type:row.type,createdAt:row.createdAt,revision:row.revision},o.projectionSecret);
 await current();const final=await read();if(JSON.stringify(final)!==JSON.stringify(row)||signal.projectRef!==original.projectRef)fail();await current();return Object.freeze(signal);
 }catch{fail();}}
