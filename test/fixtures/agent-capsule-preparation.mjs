import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {readFileSync,readdirSync} from 'node:fs';
export const input={contract:'agentfriendly.capsule-prepare.v1',expectedRevision:1,idempotencyKey:'prepare-test-0001'};
export const authority={subject:'owner-a',projectId:'project-a',clientId:'client-a',grantId:'grant-a',resource:'https://example.invalid/mcp'};
export function capsulePreparationFixture(factory){
 assert.equal(typeof factory,'function','missing closed capsule preparation service');
 const sql=new DatabaseSync(':memory:');
 for(const name of readdirSync('drizzle').filter(n=>/^\d+.*\.sql$/.test(n)).sort())sql.exec(readFileSync('drizzle/'+name,'utf8'));
 sql.exec(readFileSync('db/agent-capsule-preparations.sql','utf8'));
 const at=new Date(Date.now()-1000).toISOString(),future=new Date(Date.now()+600000).toISOString();
 sql.prepare("INSERT INTO site_projects(id,user_id,owner_email,organization,website,role,site_type,control,audience,goals_json,languages_json,authorized_resources_json,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)").run('project-a','owner-a','owner@example.invalid','Synthetic AFW','https://example.org','owner','services','owner','People','["explain_services"]','["es"]','["llms","robots"]',at,at);
 sql.prepare("INSERT INTO registry_sites(id,project_id,user_id,hostname,canonical_origin,verification_status,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?)").run('site-a','project-a','owner-a','example.org','https://example.org','verified',at,at);
 sql.prepare("INSERT INTO domain_claims(id,site_id,project_id,user_id,method,challenge_name,challenge_value,status,expires_at,verified_at,created_at) VALUES(?,?,?,?,?,?,?,?,?,?,?)").run('claim-a','site-a','project-a','owner-a','dns_txt','_synthetic','not-a-real-token','verified',future,at,at);
 sql.prepare("INSERT INTO delegated_access_grants(id,user_id,client_id,project_id,resource,scopes_json,created_at,expires_at,revoked_at,exchanged_at) VALUES(?,?,?,?,?,?,?,?,?,?)").run('grant-a','owner-a','client-a','project-a',authority.resource,'["afw:capsule:prepare"]',at,future,'',at);
 const f={sql,authority:{...authority},mono:0,wallOffset:0,reads:0,writes:0,batches:0,primaries:0,before:null,after:null,afterBatch:null};
 function stmt(query,args=[]){return {bind(...values){return stmt(query,values);},_query:query,_args:args,
  async first(){f.reads++;await f.before?.(query,'first');const value=sql.prepare(query).get(...args)??null;await f.after?.(query,'first');return value;},
  async all(){f.reads++;await f.before?.(query,'all');const result={results:sql.prepare(query).all(...args)};await f.after?.(query,'all');return result;},
  async run(){f.writes++;await f.before?.(query,'run');const v=sql.prepare(query).run(...args);await f.after?.(query,'run');return{success:true,meta:{changes:Number(v.changes)}};}
 };}
 const db={prepare:query=>stmt(query),async batch(statements){f.batches++;await f.before?.('BATCH','batch');sql.exec('BEGIN IMMEDIATE');let results;
  try{results=statements.map(s=>{const r=sql.prepare(s._query).run(...s._args);return{success:true,meta:{changes:Number(r.changes)}};});sql.exec('COMMIT');}catch(e){sql.exec('ROLLBACK');throw e;}
  await f.afterBatch?.();return results;
 }};
 f.db=db;f.sessionModes=[];db.withSession=mode=>{f.sessionModes.push(mode);f.primaries++;return {prepare:db.prepare,batch:db.batch};};
 f.service=factory({enabled:true,createPrimarySession:()=>{f.primaries++;return db;},resolveAuthority:async()=>f.authority,now:()=>Date.now()+f.wallOffset,monotonic:()=>f.mono});
 f.counts=()=>({intents:sql.prepare('SELECT count(*) AS n FROM agent_capsule_preparations').get().n,capsules:sql.prepare('SELECT count(*) AS n FROM publication_capsules').get().n,events:sql.prepare("SELECT count(*) AS n FROM project_events WHERE type='agent_capsule_prepared'").get().n});
 f.close=()=>sql.close();return f;
}
