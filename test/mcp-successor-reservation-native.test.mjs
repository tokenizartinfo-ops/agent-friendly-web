import test from 'node:test';
import assert from 'node:assert/strict';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {readFileSync} from 'node:fs';
import {createSuccessorReservation} from '../lib/mcp-successor-reservation.mjs';
test('native primary D1 reserves once across two bindings and keeps immutable predecessor',async()=>{
 const runtime=new Miniflare(convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',script:'export default {fetch(){return new Response(null,{status:404});}}',d1Databases:{DB:'native-successor',OTHER:'native-successor'}}));
 try{
 const db=await runtime.getD1Database('DB'),other=await runtime.getD1Database('OTHER');
 await db.exec('CREATE TABLE dossier_node_process_admissions(grant_id TEXT,container_id TEXT,process_generation TEXT,program_hash TEXT,source_revision TEXT,image TEXT);CREATE TABLE dossier_node_process_closures(grant_id TEXT,container_id TEXT,process_generation TEXT,program_hash TEXT,source_revision TEXT,image TEXT,closed_at INTEGER);');
 const schema=readFileSync('db/dossier-successor-reservation.sql','utf8');const statements=[...schema.matchAll(/CREATE TABLE[\s\S]*?\);|CREATE TRIGGER[^\n]+;/g)].map(m=>m[0]);assert.equal(statements.length,3);for(const sql of statements)await db.prepare(sql).run();
 const now=Date.now(),original={containerId:'a'.repeat(64),applicationId:'own-app',programHash:'b'.repeat(64),sourceRevision:'c'.repeat(40)},evidence={purpose:'afw.retirement-evidence.v1',...original,processGeneration:'d'.repeat(64),closedAt:now-1000,stoppedAt:now-1500,observedAt:now,physicalStopVerified:true,mayStartSuccessor:false};
 await db.prepare('INSERT INTO dossier_node_process_admissions VALUES(?,?,?,?,?,?)').bind('original',original.containerId,evidence.processGeneration,original.programHash,original.sourceRevision,'cloudflare/debian-trixie').run();
 await db.prepare('INSERT INTO dossier_node_process_closures VALUES(?,?,?,?,?,?,?)').bind('original',original.containerId,evidence.processGeneration,original.programHash,original.sourceRevision,'cloudflare/debian-trixie',evidence.closedAt).run();
 const candidate={trialId:'e'.repeat(64),containerId:'f'.repeat(64),programHash:'1'.repeat(64),sourceRevision:'2'.repeat(40),scopeHash:'3'.repeat(64),startAt:now,expiresAt:now+60000,budget:1};
 const make=(binding,c)=>createSuccessorReservation({db:binding,original,candidate:c,readRetirement:async()=>evidence});
 const result=await Promise.allSettled([make(db,candidate).reserve(),make(other,{...candidate,trialId:'4'.repeat(64),containerId:'5'.repeat(64)}).reserve()]);assert.equal(result.filter(v=>v.status==='fulfilled').length,1);
 assert.equal((await db.prepare('SELECT COUNT(*) AS n FROM dossier_successor_reservations').first()).n,1);assert.equal((await db.prepare('SELECT COUNT(*) AS n FROM dossier_node_process_admissions').first()).n,1);
 await assert.rejects(other.prepare('DELETE FROM dossier_successor_reservations').run());await assert.rejects(make(other,candidate).reserve());
 }finally{await runtime.dispose();}
});
