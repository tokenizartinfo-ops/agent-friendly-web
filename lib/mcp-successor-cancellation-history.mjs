const fail=()=>{throw Error('Successor reservation unavailable');};
const time=v=>Number.isSafeInteger(v)&&v>=0&&v<=8640000000000000;
const positive=v=>Number.isSafeInteger(v)&&v>0;
const id=v=>typeof v==='string'&&/^[A-Za-z0-9_-]{1,200}$/.test(v);
const hex=(v,size)=>typeof v==='string'&&new RegExp('^[a-f0-9]{'+size+'}$').test(v);
const exact=(v,keys)=>{if(!v||Object.getPrototypeOf(v)!==Object.prototype||Reflect.ownKeys(v).length!==keys.length)fail();for(const k of keys){const d=Object.getOwnPropertyDescriptor(v,k);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();}return v;};
const iso=v=>typeof v==='string'&&/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(v)&&time(Date.parse(v))&&new Date(v).toISOString()===v;
// Balance static conjunctions for D1's native expression-depth limit; bind all data.
const all=parts=>parts.length===1?'('+parts[0]+')':'('+all(parts.slice(0,Math.floor(parts.length/2)))+' AND '+all(parts.slice(Math.floor(parts.length/2)))+')';
const singletonScope=alias=>{
 const safe="CASE WHEN json_valid("+alias+".scopes_json) THEN "+alias+".scopes_json ELSE '[]' END";
 return all(["json_valid("+alias+".scopes_json)","json_type("+safe+")='array'","json_array_length("+safe+")=1","json_extract("+safe+",'$[0]')='afw:project:read'"]);
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
 const earlier=all([
  "earlier.grant_id=g.id","earlier.sequence<m.sequence","earlier.action='grant'",
  "earlier.purpose='afw.dossier-monitoring.v1'","earlier.user_id=a.user_id",
  "earlier.project_id=a.project_id","earlier.client_id=a.client_id","earlier.resource=a.resource"
 ]);
 const cancelled=all([
  "cz.grant_id=json_extract(k.value,'$.grantId')","cz.process_generation IS NULL",
  "cz.container_id=json_extract(k.value,'$.containerId')","cz.program_hash=json_extract(k.value,'$.programHash')",
  "cz.source_revision=json_extract(k.value,'$.sourceRevision')","cz.image=json_extract(k.value,'$.image')","cz.closed_at=json_extract(k.value,'$.closedAt')",
  "g.id<>a.grant_id","g.user_id=a.user_id","g.project_id=a.project_id","g.client_id=a.client_id","g.resource=a.resource",
  "g.revoked_at=json_extract(k.value,'$.revokedAt')",singletonScope('g'),
  "NOT EXISTS(SELECT 1 FROM dossier_node_process_admissions WHERE grant_id=g.id)",
  "m.sequence=json_extract(k.value,'$.monitorSequence')","m.revision=json_extract(k.value,'$.monitorRevision')",
  "m.action='revoke'","m.purpose='afw.dossier-monitoring.v1'","m.issued_at=json_extract(k.value,'$.monitorRevokedAt')","m.expires_at=m.issued_at",
  "m.user_id=a.user_id","m.project_id=a.project_id","m.client_id=a.client_id","m.resource=a.resource",
  "m.sequence=(SELECT MAX(sequence) FROM dossier_monitoring_consent_events WHERE grant_id=g.id)",
  "EXISTS(SELECT 1 FROM dossier_monitoring_consent_events earlier WHERE "+earlier+")"
 ]);
 const present=all([
  "cg.id=?","cg.id<>a.grant_id","cg.user_id=a.user_id","cg.project_id=a.project_id","cg.client_id=a.client_id","cg.resource=a.resource",
  "cg.revoked_at=''",singletonScope('cg'),
  "strftime('%Y-%m-%dT%H:%M:%fZ',cg.created_at)=cg.created_at",
  "strftime('%Y-%m-%dT%H:%M:%fZ',cg.exchanged_at)=cg.exchanged_at",
  "strftime('%Y-%m-%dT%H:%M:%fZ',cg.expires_at)=cg.expires_at",
  "cg.created_at>='1970-01-01T00:00:00.000Z'","cg.created_at<=cg.exchanged_at",
  "cg.exchanged_at<=strftime('%Y-%m-%dT%H:%M:%fZ','now')",
  "cg.expires_at>strftime('%Y-%m-%dT%H:%M:%fZ','now')","cg.expires_at>=?",
  "cm.sequence=?","cm.revision=?","cm.issued_at=?","cm.expires_at=?",
  "cm.action='grant'","cm.purpose='afw.dossier-monitoring.v1'",
  "cm.user_id=a.user_id","cm.project_id=a.project_id","cm.client_id=a.client_id","cm.resource=a.resource",
  "cm.sequence=(SELECT MAX(sequence) FROM dossier_monitoring_consent_events WHERE grant_id=cg.id)",
  "cm.issued_at<=CAST(strftime('%s','now') AS INTEGER)*1000+CAST(substr(strftime('%f','now'),4,3) AS INTEGER)",
  "NOT EXISTS(SELECT 1 FROM dossier_monitoring_consent_events WHERE grant_id=cg.id AND action='revoke')"
 ]);
 const clause=all([
  "(SELECT COUNT(*) FROM dossier_node_process_closures)=1+json_array_length(?)",
  "(SELECT COUNT(*) FROM dossier_node_process_closures WHERE process_generation IS NOT NULL)=1",
  "EXISTS(SELECT 1 FROM site_projects p WHERE p.id=a.project_id AND p.user_id=a.user_id)",
  "EXISTS(SELECT 1 FROM delegated_access_grants cg JOIN dossier_monitoring_consent_events cm ON cm.grant_id=cg.id WHERE "+present+")",
  "NOT EXISTS(SELECT 1 FROM json_each(?) k WHERE NOT EXISTS(SELECT 1 FROM dossier_node_process_closures cz JOIN delegated_access_grants g ON g.id=cz.grant_id JOIN dossier_monitoring_consent_events m ON m.grant_id=g.id WHERE "+cancelled+"))"
 ]);
 return Object.freeze({clause,params:Object.freeze([cancellations,current.grantId,new Date(candidate.expiresAt).toISOString(),current.consentSequence,current.consentRevision,current.issuedAt,current.expiresAt,cancellations])});
}
