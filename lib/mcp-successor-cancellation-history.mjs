const fail=()=>{throw Error('Successor reservation unavailable');};
const time=v=>Number.isSafeInteger(v)&&v>=0&&v<=8640000000000000;
const positive=v=>Number.isSafeInteger(v)&&v>0;
const id=v=>typeof v==='string'&&/^[A-Za-z0-9_-]{1,200}$/.test(v);
const hex=(v,size)=>typeof v==='string'&&new RegExp('^[a-f0-9]{'+size+'}$').test(v);
const exact=(v,keys)=>{if(!v||Object.getPrototypeOf(v)!==Object.prototype||Reflect.ownKeys(v).length!==keys.length)fail();for(const k of keys){const d=Object.getOwnPropertyDescriptor(v,k);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();}return v;};
const iso=v=>typeof v==='string'&&/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(v)&&time(Date.parse(v))&&new Date(v).toISOString()===v;
const singletonScope=alias=>{
 const safe="CASE WHEN json_valid("+alias+".scopes_json) THEN "+alias+".scopes_json ELSE '[]' END";
 return "json_valid("+alias+".scopes_json) AND json_type("+safe+")='array' AND json_array_length("+safe+")=1 AND json_extract("+safe+",'$[0]')='afw:project:read'";
};
/** Constructor-only server pins. Does not establish authority, reserve or read D1.
 * Complete classification is part of the caller's one atomic INSERT SELECT. */
export function prepareKnownCancellationHistory(raw,candidate){
 if(typeof raw!=='string'||raw.length>16384||new TextEncoder().encode(raw).byteLength>16384)fail();
 let history;try{history=JSON.parse(raw);}catch{fail();}
 exact(history,['purpose','currentGrant','cancellations']);
 if(history.purpose!=='afw.successor-known-cancellations.v1'||!Array.isArray(history.cancellations)||history.cancellations.length>8)fail();
 const current=exact(history.currentGrant,['grantId','consentSequence','consentRevision','issuedAt','expiresAt']);
 if(!id(current.grantId)||!positive(current.consentSequence)||!positive(current.consentRevision)||!time(current.issuedAt)||!time(current.expiresAt)||current.expiresAt<=current.issuedAt||current.expiresAt-current.issuedAt>600000||current.expiresAt<candidate.expiresAt)fail();
 const seen=new Set();
 for(const record of history.cancellations){
  exact(record,['grantId','containerId','programHash','sourceRevision','image','closedAt','revokedAt','monitorSequence','monitorRevision','monitorRevokedAt']);
  if(!id(record.grantId)||record.grantId===current.grantId||seen.has(record.grantId)||!hex(record.containerId,64)||!hex(record.programHash,64)||!hex(record.sourceRevision,40)||record.image!=='cloudflare/debian-trixie'||!time(record.closedAt)||record.closedAt>=candidate.startAt||!iso(record.revokedAt)||Date.parse(record.revokedAt)>record.closedAt||!positive(record.monitorSequence)||!positive(record.monitorRevision)||!time(record.monitorRevokedAt)||record.monitorRevokedAt>record.closedAt)fail();
  seen.add(record.grantId);
 }
 const cancellations=JSON.stringify(history.cancellations);
 const clause=`(SELECT COUNT(*) FROM dossier_node_process_closures)=1+json_array_length(?)
 AND (SELECT COUNT(*) FROM dossier_node_process_closures WHERE process_generation IS NOT NULL)=1
 AND EXISTS(SELECT 1 FROM site_projects p WHERE p.id=a.project_id AND p.user_id=a.user_id)
 AND EXISTS(
  SELECT 1 FROM delegated_access_grants cg JOIN dossier_monitoring_consent_events cm ON cm.grant_id=cg.id
  WHERE cg.id=? AND cg.id<>a.grant_id AND cg.user_id=a.user_id AND cg.project_id=a.project_id AND cg.client_id=a.client_id AND cg.resource=a.resource
  AND cg.revoked_at='' AND ${singletonScope('cg')}
  AND strftime('%Y-%m-%dT%H:%M:%fZ',cg.created_at)=cg.created_at
  AND strftime('%Y-%m-%dT%H:%M:%fZ',cg.exchanged_at)=cg.exchanged_at
  AND strftime('%Y-%m-%dT%H:%M:%fZ',cg.expires_at)=cg.expires_at
  AND cg.created_at>='1970-01-01T00:00:00.000Z' AND cg.created_at<=cg.exchanged_at AND cg.exchanged_at<=strftime('%Y-%m-%dT%H:%M:%fZ','now')
  AND cg.expires_at>strftime('%Y-%m-%dT%H:%M:%fZ','now') AND cg.expires_at>=?
  AND cm.sequence=? AND cm.revision=? AND cm.issued_at=? AND cm.expires_at=?
  AND cm.action='grant' AND cm.purpose='afw.dossier-monitoring.v1'
  AND cm.user_id=a.user_id AND cm.project_id=a.project_id AND cm.client_id=a.client_id AND cm.resource=a.resource
  AND cm.sequence=(SELECT MAX(sequence) FROM dossier_monitoring_consent_events WHERE grant_id=cg.id)
  AND cm.issued_at<=CAST(strftime('%s','now') AS INTEGER)*1000+CAST(substr(strftime('%f','now'),4,3) AS INTEGER)
  AND NOT EXISTS(SELECT 1 FROM dossier_monitoring_consent_events WHERE grant_id=cg.id AND action='revoke')
 )
 AND NOT EXISTS(
  SELECT 1 FROM json_each(?) k WHERE NOT EXISTS(
   SELECT 1 FROM dossier_node_process_closures cz
   JOIN delegated_access_grants g ON g.id=cz.grant_id
   JOIN dossier_monitoring_consent_events m ON m.grant_id=g.id
   WHERE cz.grant_id=json_extract(k.value,'$.grantId') AND cz.process_generation IS NULL
   AND cz.container_id=json_extract(k.value,'$.containerId') AND cz.program_hash=json_extract(k.value,'$.programHash')
   AND cz.source_revision=json_extract(k.value,'$.sourceRevision') AND cz.image=json_extract(k.value,'$.image') AND cz.closed_at=json_extract(k.value,'$.closedAt')
   AND g.id<>a.grant_id AND g.user_id=a.user_id AND g.project_id=a.project_id AND g.client_id=a.client_id AND g.resource=a.resource
   AND g.revoked_at=json_extract(k.value,'$.revokedAt') AND ${singletonScope('g')}
   AND NOT EXISTS(SELECT 1 FROM dossier_node_process_admissions WHERE grant_id=g.id)
   AND m.sequence=json_extract(k.value,'$.monitorSequence') AND m.revision=json_extract(k.value,'$.monitorRevision')
   AND m.action='revoke' AND m.purpose='afw.dossier-monitoring.v1' AND m.issued_at=json_extract(k.value,'$.monitorRevokedAt') AND m.expires_at=m.issued_at
   AND m.user_id=a.user_id AND m.project_id=a.project_id AND m.client_id=a.client_id AND m.resource=a.resource
   AND m.sequence=(SELECT MAX(sequence) FROM dossier_monitoring_consent_events WHERE grant_id=g.id)
   AND EXISTS(SELECT 1 FROM dossier_monitoring_consent_events earlier WHERE earlier.grant_id=g.id AND earlier.sequence<m.sequence AND earlier.action='grant' AND earlier.purpose='afw.dossier-monitoring.v1' AND earlier.user_id=a.user_id AND earlier.project_id=a.project_id AND earlier.client_id=a.client_id AND earlier.resource=a.resource)
  )
 )`;
 return Object.freeze({clause,params:Object.freeze([cancellations,current.grantId,new Date(candidate.expiresAt).toISOString(),current.consentSequence,current.consentRevision,current.issuedAt,current.expiresAt,cancellations])});
}
