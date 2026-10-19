import {agentCapsulePreparationSchemaChecks} from './agent-capsule-preparation.mjs';

// Exact source schema, not an installer or a certificate of authorization.
const objects=Object.freeze([
 {type:"table",name:"agent_capsule_preparations",sql:`CREATE TABLE IF NOT EXISTS agent_capsule_preparations (
 intent_id TEXT PRIMARY KEY,
 request_ref TEXT NOT NULL UNIQUE,
 user_id TEXT NOT NULL,
 project_id TEXT NOT NULL,
 client_id TEXT NOT NULL,
 resource TEXT NOT NULL,
 grant_id TEXT NOT NULL,
 scope_hash TEXT NOT NULL CHECK(length(scope_hash)=64),
 source_hash TEXT NOT NULL CHECK(length(source_hash)=64),
 source_revision INTEGER NOT NULL CHECK(source_revision>0),
 generator_revision TEXT NOT NULL,
 site_id TEXT NOT NULL,
 version INTEGER NOT NULL CHECK(version>0),
 capsule_id TEXT NOT NULL UNIQUE,
 capsule_key TEXT NOT NULL UNIQUE,
 event_id TEXT NOT NULL UNIQUE,
 reserved_at INTEGER NOT NULL CHECK(reserved_at>=0),
 expires_at INTEGER NOT NULL CHECK(expires_at>reserved_at AND expires_at-reserved_at<=5000),
 status TEXT NOT NULL DEFAULT 'reserved' CHECK(status IN ('reserved','prepared')),
 manifest_sha256 TEXT NOT NULL DEFAULT '',
 persisted_at TEXT NOT NULL DEFAULT '',
 UNIQUE(site_id,version),
 CHECK((status='reserved' AND manifest_sha256='' AND persisted_at='') OR
       (status='prepared' AND length(manifest_sha256)=64 AND persisted_at<>''))
);`},
 {type:"trigger",name:"agent_capsule_preparations_immutable",sql:`CREATE TRIGGER IF NOT EXISTS agent_capsule_preparations_immutable
BEFORE UPDATE ON agent_capsule_preparations
WHEN OLD.status<>'reserved' OR NEW.status<>'prepared'
 OR NEW.intent_id IS NOT OLD.intent_id OR NEW.request_ref IS NOT OLD.request_ref
 OR NEW.user_id IS NOT OLD.user_id OR NEW.project_id IS NOT OLD.project_id
 OR NEW.client_id IS NOT OLD.client_id OR NEW.resource IS NOT OLD.resource
 OR NEW.grant_id IS NOT OLD.grant_id OR NEW.scope_hash IS NOT OLD.scope_hash
 OR NEW.source_hash IS NOT OLD.source_hash OR NEW.source_revision IS NOT OLD.source_revision
 OR NEW.generator_revision IS NOT OLD.generator_revision OR NEW.site_id IS NOT OLD.site_id
 OR NEW.version IS NOT OLD.version OR NEW.capsule_id IS NOT OLD.capsule_id
 OR NEW.capsule_key IS NOT OLD.capsule_key OR NEW.event_id IS NOT OLD.event_id
 OR NEW.reserved_at IS NOT OLD.reserved_at OR NEW.expires_at IS NOT OLD.expires_at
 OR NOT EXISTS(SELECT 1 FROM publication_capsules c WHERE c.id=OLD.capsule_id
  AND c.site_id=OLD.site_id AND c.project_id=OLD.project_id AND c.user_id=OLD.user_id
  AND c.version=OLD.version AND c.idempotency_key=OLD.capsule_key
  AND c.manifest_sha256=NEW.manifest_sha256)
BEGIN SELECT RAISE(ABORT,'Preparation identity/history is immutable'); END;`},
 {type:"trigger",name:"agent_capsule_preparations_no_delete",sql:`CREATE TRIGGER IF NOT EXISTS agent_capsule_preparations_no_delete
BEFORE DELETE ON agent_capsule_preparations
BEGIN SELECT RAISE(ABORT,'Preparation history is retained'); END;`}
].map(value=>Object.freeze(value)));
const preamble="-- Source preparation only: NOT an installed migration. No remote schema action authorized here.";
const META_SQL=`SELECT type,substr(name,1,129) AS name,tbl_name,substr(sql,1,32769) AS sql FROM sqlite_master
 WHERE (type='table' AND name='agent_capsule_preparations')
 OR (type='trigger' AND tbl_name='agent_capsule_preparations')
 ORDER BY type,name LIMIT 4`;
// SQLite normalizes CREATE prefixes. Do not remove arbitrary whitespace,
// comments, conditions or trigger bodies: drift must remain a closed gate.
function canonical(sql){
 return typeof sql==='string'&&sql.length<=32768
  ?sql.trim().replace(/\r\n/g,'\n').replace(/^CREATE (TABLE|TRIGGER) IF NOT EXISTS /,'CREATE $1 ').replace(/;\s*$/,''):null;
}
export function agentCapsulePreparationSchemaSql(){
 return preamble+'\n'+objects.map(value=>value.sql).join('\n--> statement-breakpoint\n')+'\n';
}
/** Read own schema metadata and compile LIMIT0 queries only. No migration or owner rows.
 * Fresh primary sessions and assertCurrent are trusted host dependencies.
 * Readiness is a point-in-time result; call for every operation, never cache it.
 */
export async function checkAgentCapsulePreparationSchema({createPrimarySession,assertCurrent=()=>{}}={}){
 const failed=()=>({ready:false});
 try{
  const read=async(sql)=>{
   assertCurrent();const db=createPrimarySession();
   if(typeof db?.prepare!=='function')throw Error('schema unavailable');
   const result=await db.prepare(sql).bind().all();assertCurrent();
   if(result?.success===false||!Array.isArray(result?.results))throw Error('schema unavailable');
   return result.results;
  };
  const rows=await read(META_SQL);
  if(rows.length!==objects.length)return failed();
  const seen=new Set();
  for(const row of rows){
   const expected=objects.find(value=>value.name===row.name);
   if(!expected||seen.has(row.name)||row.type!==expected.type||row.tbl_name!=='agent_capsule_preparations'
    ||canonical(row.sql)!==canonical(expected.sql))return failed();
   seen.add(row.name);
  }
  for(const sql of agentCapsulePreparationSchemaChecks())if((await read(sql)).length!==0)return failed();
  return {ready:true};
 }catch{return failed();}
}
