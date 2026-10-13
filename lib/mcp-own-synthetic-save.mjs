import {createHash} from 'node:crypto';
import {ownSubscriptionReceiptEligibilitySql} from './mcp-own-subscription-receipt.mjs';
const failure=status=>Object.freeze({status,code:'synthetic_save_unavailable'});
const fail=()=>{throw Error('Synthetic save unavailable');};
const sha=x=>createHash('sha256').update(x).digest('hex');
const sqlNow="CAST(strftime('%s','now') AS INTEGER)*1000+CAST(substr(strftime('%f','now'),4,3) AS INTEGER)";
const sqlDate="strftime('%Y-%m-%dT%H:%M:%fZ','now')";
// The reviewed eligibility query has newline-delimited top-level AND clauses.
// Balance those conjunctions before nesting it in writes: native D1 caps SQL
// expression depth at 100. Keep every predicate and bound pin unchanged.
const eligibilityParts=ownSubscriptionReceiptEligibilitySql.split('\n WHERE ');
const conjunction=clauses=>clauses.length===1?`(${clauses[0]})`:`(${conjunction(clauses.slice(0,Math.floor(clauses.length/2)))} AND ${conjunction(clauses.slice(Math.floor(clauses.length/2)))})`;
const eligibilitySql=eligibilityParts[0]+' WHERE '+conjunction(eligibilityParts[1].split('\n AND '));
const time=t=>Number.isSafeInteger(t)&&t>=0&&t<=8640000000000000;
function exact(v,keys){if(!v||Object.getPrototypeOf(v)!==Object.prototype)fail();const d=Object.getOwnPropertyDescriptors(v);if(Reflect.ownKeys(d).length!==keys.length||Reflect.ownKeys(d).some(k=>typeof k!=='string'||!keys.includes(k)||!Object.hasOwn(d[k],'value')||!d[k].enumerable))fail();return Object.freeze(Object.fromEntries(keys.map(k=>[k,d[k].value])));}

/** INTERNAL finite own-QA writer. Host must separately verify human Access and
 * CSRF before supplying beforeCommit. This is NOT an OAuth write tool, route,
 * schema installer, synthetic event seeder or permission to operate clients. */
export async function saveOwnSyntheticGoal(options,value){
 try{
  if(options?.enabled!==true)return failure(404);
  const o=exact(options,['enabled','db','context','projectId','containerId','programHash','sourceRevision','window','now','beforeCommit']);
  const c=exact(o.context,['grantId','subject','clientId','resource','scopes']),w=exact(o.window,['startAt','expiresAt']),v=exact(value,['expectedRevision','idempotencyKey','goal']);
  if(!o.db?.prepare||typeof o.now!=='function'||typeof o.beforeCommit!=='function'||!time(w.startAt)||!time(w.expiresAt)||w.expiresAt<=w.startAt||w.expiresAt-w.startAt>600000||!Number.isSafeInteger(v.expectedRevision)||v.expectedRevision<1||v.expectedRevision>=Number.MAX_SAFE_INTEGER||!(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/).test(v.idempotencyKey)||!['discovery','content'].includes(v.goal)||!['grantId','subject','clientId','resource'].every(k=>typeof c[k]==='string'&&c[k].length>0&&c[k].length<=256)||typeof o.projectId!=='string'||!(/^[0-9a-f]{64}$/).test(o.containerId)||!(/^[0-9a-f]{64}$/).test(o.programHash)||!(/^[0-9a-f]{40}$/).test(o.sourceRevision))return failure(400);
  const db=o.db.withSession?o.db.withSession('first-primary'):o.db;if(typeof db.batch!=='function')fail();
  const pins=[c.grantId,c.subject,o.projectId,c.clientId,c.resource,o.containerId,o.programHash,o.sourceRevision];
  let last=-1;const clock=()=>{const t=o.now();if(!time(t)||t<last||t<w.startAt||t>=w.expiresAt)fail();last=t;return t;};
  const current=async()=>{clock();if(await o.beforeCommit()!==true)fail();clock();const r=await db.prepare(ownSubscriptionReceiptEligibilitySql).bind(...pins).first();const t=clock();if(!r||r.expires_at<=t||r.observed_at<w.startAt||r.recorded_at>t)fail();return r;};
  const receipt=await current(),eventId=sha(JSON.stringify(['afw.own-synthetic-save.v1',c.subject,o.projectId,v.idempotencyKey]));
  const fingerprint=sha(JSON.stringify(['afw.own-synthetic-save.v1',c.grantId,v.expectedRevision,v.goal]));
  const revision=v.expectedRevision+1,payload=JSON.stringify({changedFields:['goals'],revision,fingerprint});
  const query='SELECT e.id,e.payload_json,e.created_at,p.revision FROM project_events e JOIN site_projects p ON p.id=e.project_id AND p.user_id=e.user_id WHERE e.id=? AND e.project_id=? AND e.user_id=?';
  const prior=await db.prepare(query).bind(eventId,o.projectId,c.subject).first();await current();
  if(prior){if(prior.payload_json!==payload||prior.revision!==revision)return failure(409);return Object.freeze({status:200,eventId,revision,replayed:true});}
  // The SQL error sentinel rolls back the UPDATE if authorization expires
  // between statements, independently of the table's conflict policy.
  const schema=await db.prepare("SELECT name FROM pragma_table_info('project_events') WHERE name='id' AND upper(type)='TEXT' AND [notnull]=1 AND pk=1 AND dflt_value IS NULL").bind().first();if(!schema)fail();
  const latest=await current();if(latest.subscription_id!==receipt.subscription_id||latest.process_generation!==receipt.process_generation||latest.expires_at!==receipt.expires_at)fail();
  const condition=`${sqlNow}>=? AND ${sqlNow}<? AND EXISTS(${eligibilitySql})`;
  const update=db.prepare(`UPDATE site_projects SET goals_json=?,revision=?,updated_at=${sqlDate} WHERE id=? AND user_id=? AND revision=? AND ${condition}`).bind(JSON.stringify([v.goal]),revision,o.projectId,c.subject,v.expectedRevision,w.startAt,w.expiresAt,...pins);
  const event=db.prepare(`INSERT INTO project_events(id,project_id,user_id,type,payload_json,created_at) SELECT CASE WHEN ${condition} THEN ? ELSE json('!') END,?,?,'project_updated',?,${sqlDate} WHERE changes()>0`).bind(w.startAt,w.expiresAt,...pins,eventId,o.projectId,c.subject,payload);
  if(await o.beforeCommit()!==true)fail();clock();
  const result=await db.batch([update,event]);if(!Array.isArray(result)||result.length!==2||result.some(r=>r?.meta?.changes!==1))return failure(409);
  await current();const saved=await db.prepare(query).bind(eventId,o.projectId,c.subject).first();await current();
  if(!saved||saved.payload_json!==payload||saved.revision!==revision||Date.parse(saved.created_at)<receipt.recorded_at)fail();
  return Object.freeze({status:200,eventId,revision,replayed:false});
 }catch{return failure(503);}
}
