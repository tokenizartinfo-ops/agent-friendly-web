const fail=()=>{throw Error('Original subscription receipt unavailable');};
const time=x=>Number.isSafeInteger(x)&&x>=0&&x<=8640000000000000;
const hash=/^[0-9a-f]{64}$/;
const pins=['principalRef','resourceRef','projectRef','permissionRef'];
const sqlNow="CAST(strftime('%s','now') AS INTEGER)*1000+CAST(substr(strftime('%f','now'),4,3) AS INTEGER)";
const sqlExpiry="CAST(strftime('%s',g.expires_at) AS INTEGER)*1000+CAST(substr(g.expires_at,21,3) AS INTEGER)";
const table='dossier_event_subscription_receipts';
// INTERNAL operator primary read. Arguments are original grant, subject,
// project, client, resource, container, program and source pins, never event
// payload. This is eligibility metadata only, not permission or ACK recovery.
export const ownSubscriptionReceiptEligibilitySql=`SELECT r.* FROM ${table} r
 JOIN delegated_access_grants g ON g.id=r.grant_id JOIN site_projects p ON p.id=g.project_id AND p.user_id=g.user_id JOIN dossier_node_process_admissions n ON n.grant_id=g.id JOIN dossier_monitoring_consent_events c ON c.grant_id=g.id
 WHERE g.id=? AND g.user_id=? AND g.project_id=? AND g.client_id=? AND g.resource=?
 AND r.project_id=g.project_id AND r.user_id=g.user_id AND r.client_id=g.client_id AND r.resource=g.resource AND g.revoked_at=''
 AND r.container_id=? AND r.program_hash=? AND r.source_revision=? AND r.image='cloudflare/debian-trixie'
 AND n.container_id=r.container_id AND n.process_generation=r.process_generation AND n.program_hash=r.program_hash AND n.source_revision=r.source_revision AND n.image=r.image AND n.project_id=g.project_id AND n.user_id=g.user_id AND n.client_id=g.client_id AND n.resource=g.resource
 AND c.project_id=g.project_id AND c.user_id=g.user_id AND c.client_id=g.client_id AND c.resource=g.resource AND c.action='grant' AND c.purpose='afw.dossier-monitoring.v1'
 AND c.sequence=n.consent_sequence AND c.issued_at=n.consent_issued_at AND c.expires_at=n.consent_expires_at AND c.sequence=(SELECT MAX(sequence) FROM dossier_monitoring_consent_events WHERE grant_id=g.id)
 AND NOT EXISTS(SELECT 1 FROM dossier_monitoring_consent_events WHERE grant_id=g.id AND action='revoke') AND NOT EXISTS(SELECT 1 FROM dossier_node_process_closures WHERE grant_id=g.id)
 AND json_valid(g.scopes_json) AND json_type(CASE WHEN json_valid(g.scopes_json) THEN g.scopes_json ELSE '[]' END)='array' AND EXISTS(SELECT 1 FROM json_each(CASE WHEN json_valid(g.scopes_json) THEN g.scopes_json ELSE '[]' END) WHERE value='afw:project:read') AND NOT EXISTS(SELECT 1 FROM json_each(CASE WHEN json_valid(g.scopes_json) THEN g.scopes_json ELSE '[]' END) WHERE type<>'text')
 AND c.issued_at<=${sqlNow} AND n.created_at<=${sqlNow} AND r.recorded_at<=${sqlNow} AND ${sqlNow}<r.expires_at AND r.expires_at<=n.expires_at AND r.expires_at<=c.expires_at AND r.expires_at<=${sqlExpiry}`;
export const ownSubscriptionReceiptSchema=Object.freeze({
 table:`CREATE TABLE ${table} (
 grant_id TEXT PRIMARY KEY REFERENCES delegated_access_grants(id),
 subscription_id TEXT NOT NULL UNIQUE,
 project_id TEXT NOT NULL, user_id TEXT NOT NULL, client_id TEXT NOT NULL, resource TEXT NOT NULL,
 container_id TEXT NOT NULL, process_generation TEXT NOT NULL, program_hash TEXT NOT NULL, source_revision TEXT NOT NULL, image TEXT NOT NULL,
 observed_at INTEGER NOT NULL, recorded_at INTEGER NOT NULL, expires_at INTEGER NOT NULL,
 CHECK(observed_at>=0 AND recorded_at>=0 AND expires_at>observed_at AND expires_at>recorded_at)
)`,
 noUpdate:`CREATE TRIGGER dossier_subscription_receipt_no_update BEFORE UPDATE ON ${table} BEGIN SELECT RAISE(ABORT,'immutable_subscription_receipt'); END`,
 noDelete:`CREATE TRIGGER dossier_subscription_receipt_no_delete BEFORE DELETE ON ${table} BEGIN SELECT RAISE(ABORT,'immutable_subscription_receipt'); END`,
});
const normalize=s=>typeof s==='string'?s.replace(/\bIF NOT EXISTS\b/gi,'').replace(/\s+/g,' ').trim().replace(/;$/,''):'';
function exact(v,keys){if(!v||Object.getPrototypeOf(v)!==Object.prototype)fail();const d=Object.getOwnPropertyDescriptors(v),own=Reflect.ownKeys(d);if(own.length!==keys.length||own.some(k=>typeof k!=='string'||!keys.includes(k)||!Object.hasOwn(d[k],'value')||!d[k].enumerable))fail();return Object.fromEntries(keys.map(k=>[k,d[k].value]));}

/** INTERNAL observation of the first completed producer subscription only.
 * No callback material, new identity, schema setup, retry or native-cloud ACK.
 * The caller must close original custody if completion persistence fails. */
export function createOwnSubscriptionReceiptJournal(options){
 const o=exact(options,['db','context','projectId','containerId','programHash','sourceRevision','window','readAuthorization','now']);
 const ctx=Object.freeze(exact(o.context,['grantId','subject','clientId','resource','scopes'])),w=Object.freeze(exact(o.window,['startAt','expiresAt']));
 if(!o.db?.prepare||typeof o.readAuthorization!=='function'||typeof o.now!=='function'||!hash.test(o.containerId)||!hash.test(o.programHash)||!(/^[0-9a-f]{40}$/).test(o.sourceRevision)||!time(w.startAt)||!time(w.expiresAt)||w.expiresAt<=w.startAt||w.expiresAt-w.startAt>600000)fail();
 const db=()=>o.db.withSession?o.db.withSession('first-primary'):o.db;
 let last=-1;const clock=()=>{const t=o.now();if(!time(t)||t<last||t<w.startAt||t>=w.expiresAt)fail();last=t;return t;};
 const current=async expected=>{clock();const a=await o.readAuthorization();const t=clock();if(!a||a.enabled!==true||!time(a.expiresAt)||a.expiresAt<=t||pins.some(k=>!hash.test(a[k])||expected&&a[k]!==expected[k]))fail();return Object.freeze({...Object.fromEntries(pins.map(k=>[k,a[k]])),expiresAt:a.expiresAt});};
 return Object.freeze({
  async preflight(){
   const a=await current();
   await db().prepare(`SELECT grant_id,subscription_id,project_id,user_id,client_id,resource,container_id,process_generation,program_hash,source_revision,image,observed_at,recorded_at,expires_at FROM ${table} WHERE 0`).bind().first();
   const schema=await db().prepare(`SELECT (SELECT sql FROM sqlite_master WHERE type='table' AND name='${table}') AS table_sql,(SELECT sql FROM sqlite_master WHERE type='trigger' AND name='dossier_subscription_receipt_no_update') AS update_sql,(SELECT sql FROM sqlite_master WHERE type='trigger' AND name='dossier_subscription_receipt_no_delete') AS delete_sql`).bind().first();
   if(!schema||[['table_sql','table'],['update_sql','noUpdate'],['delete_sql','noDelete']].some(([field,key])=>normalize(schema[field])!==normalize(ownSubscriptionReceiptSchema[key])))fail();
   const prior=await db().prepare(`SELECT grant_id FROM ${table} WHERE grant_id=?`).bind(ctx.grantId).first();await current(a);
   // First completion only: no controller refresh or custody start on repeats.
   if(prior)fail();return a;
  },
  async record(value,readiness,expected){
   const r=exact(value,['id','refreshBefore','cursor','truncated']),ready=exact(readiness,['purpose','processGeneration','ready','expiresAt']);
   const expiresAt=Date.parse(r.refreshBefore),observedAt=clock();
   if(!/^sub_[0-9a-f]{64}$/.test(r.id)||typeof r.refreshBefore!=='string'||!time(expiresAt)||new Date(expiresAt).toISOString()!==r.refreshBefore||r.cursor!==null||r.truncated!==false||ready.purpose!=='afw.mcp-node-readiness.v1'||ready.ready!==true||!hash.test(ready.processGeneration)||!time(ready.expiresAt)||expiresAt<=observedAt||expiresAt>w.expiresAt||expiresAt>ready.expiresAt)fail();
   const a=await current(expected);if(expiresAt>a.expiresAt)fail();
   const sql=`INSERT INTO ${table}(grant_id,subscription_id,project_id,user_id,client_id,resource,container_id,process_generation,program_hash,source_revision,image,observed_at,recorded_at,expires_at)
    SELECT g.id,?,g.project_id,g.user_id,g.client_id,g.resource,n.container_id,n.process_generation,n.program_hash,n.source_revision,n.image,?,${sqlNow},?
    FROM delegated_access_grants g JOIN site_projects p ON p.id=g.project_id AND p.user_id=g.user_id JOIN dossier_node_process_admissions n ON n.grant_id=g.id JOIN dossier_monitoring_consent_events c ON c.grant_id=g.id
    WHERE g.id=? AND g.user_id=? AND g.project_id=? AND g.client_id=? AND g.resource=? AND g.revoked_at=''
    AND n.project_id=g.project_id AND n.user_id=g.user_id AND n.client_id=g.client_id AND n.resource=g.resource AND n.container_id=? AND n.process_generation=? AND n.program_hash=? AND n.source_revision=? AND n.image='cloudflare/debian-trixie'
    AND c.project_id=g.project_id AND c.user_id=g.user_id AND c.client_id=g.client_id AND c.resource=g.resource AND c.action='grant' AND c.purpose='afw.dossier-monitoring.v1'
    AND c.sequence=n.consent_sequence AND c.issued_at=n.consent_issued_at AND c.expires_at=n.consent_expires_at AND c.sequence=(SELECT MAX(sequence) FROM dossier_monitoring_consent_events WHERE grant_id=g.id)
    AND NOT EXISTS(SELECT 1 FROM dossier_monitoring_consent_events WHERE grant_id=g.id AND action='revoke') AND NOT EXISTS(SELECT 1 FROM dossier_node_process_closures WHERE grant_id=g.id)
    AND json_valid(g.scopes_json) AND json_type(CASE WHEN json_valid(g.scopes_json) THEN g.scopes_json ELSE '[]' END)='array' AND EXISTS(SELECT 1 FROM json_each(CASE WHEN json_valid(g.scopes_json) THEN g.scopes_json ELSE '[]' END) WHERE value='afw:project:read') AND NOT EXISTS(SELECT 1 FROM json_each(CASE WHEN json_valid(g.scopes_json) THEN g.scopes_json ELSE '[]' END) WHERE type<>'text')
    AND c.issued_at<=${sqlNow} AND n.created_at<=${sqlNow} AND ${sqlNow}>=? AND ${sqlNow}<? AND ${sqlNow}<? AND n.expires_at>=? AND c.expires_at>=? AND ${sqlExpiry}>=?`;
   const result=await db().prepare(sql).bind(r.id,observedAt,expiresAt,ctx.grantId,ctx.subject,o.projectId,ctx.clientId,ctx.resource,o.containerId,ready.processGeneration,o.programHash,o.sourceRevision,w.startAt,w.expiresAt,expiresAt,expiresAt,expiresAt,expiresAt).run();
   if(result?.meta?.changes!==1)fail();await current(a);
   return Object.freeze({recorded:true});
  },
 });
}
