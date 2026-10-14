import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
function parseStatements(source){
 const clean=source.replace(/^\s*--[^\r\n]*/gm,''),pattern=/CREATE TABLE[\s\S]*?\);|CREATE (?:UNIQUE )?INDEX[^;\r\n]+;|CREATE TRIGGER[^\r\n]*? END;/g;
 const matches=[...clean.matchAll(pattern)];assert.equal(clean.replace(pattern,'').trim(),'','Unrehearsed SQL in schema');return matches.map(m=>m[0]);
}
const statements=name=>parseStatements(readFileSync('db/'+name+'.sql','utf8'));
test('rehearsal rejects SQL that its statement extractor would otherwise omit',()=>{
 const schema=readFileSync('db/dossier-successor-reservation.sql','utf8');for(const extra of ['DELETE FROM dossier_node_process_closures;','DROP TABLE dossier_node_process_admissions;','ALTER TABLE dossier_publication_attempts ADD COLUMN ignored TEXT;','CREATE INDEX extra ON dossier_successor_reservations(state); DELETE FROM dossier_node_process_closures;'])assert.throws(()=>parseStatements(schema+'\n'+extra),/Unrehearsed SQL/);
});
const additions=['dossier-successor-reservation','dossier-successor-launch','dossier-publication-receipt'];
test('native additive install preserves original custody and immutable new records on replay',async()=>{
 const runtime=new Miniflare(convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',script:'export default {fetch(){return new Response(null,{status:404});}}',d1Databases:{DB:'schema-rehearsal'}}));
 try{
  const binding=await runtime.getD1Database('DB'),db=binding.withSession('first-primary');
  await db.prepare('CREATE TABLE site_projects(id TEXT PRIMARY KEY)').run();await db.prepare('CREATE TABLE delegated_access_grants(id TEXT PRIMARY KEY)').run();
  await db.prepare("INSERT INTO site_projects VALUES('p')").run();await db.prepare("INSERT INTO delegated_access_grants VALUES('g')").run();
  const originalSchema=statements('dossier-node-process');assert.equal(originalSchema.length,7);for(const sql of originalSchema)await db.prepare(sql).run();
  await db.prepare('INSERT INTO dossier_node_process_admissions VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)').bind('g','p','owner','client','https://synthetic.invalid/mcp',1,1000,61000,'a'.repeat(64),'b'.repeat(64),'c'.repeat(64),'d'.repeat(40),'cloudflare/debian-trixie',1000,61000).run();
  await db.prepare('INSERT INTO dossier_node_process_closures VALUES(?,?,?,?,?,?,?)').bind('g','b'.repeat(64),'a'.repeat(64),'c'.repeat(64),'d'.repeat(40),'cloudflare/debian-trixie',2000).run();
  const install=async()=>{for(const [i,name] of additions.entries()){const sqls=statements(name);assert.equal(sqls.length,[3,3,6][i]);for(const sql of sqls)assert.equal((await db.prepare(sql).run()).success,true);}};
  // D1 metadata varies by query; compare actual row content, not duration/size.
  const rows=async table=>(await db.prepare('SELECT * FROM '+table).all()).results;
  const originalRows=[await rows('dossier_node_process_admissions'),await rows('dossier_node_process_closures')];
  await install();await install();
  assert.deepEqual([await rows('dossier_node_process_admissions'),await rows('dossier_node_process_closures')],originalRows);
  await db.prepare('INSERT INTO dossier_successor_reservations VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)').bind('afw.own-successor.v1','e'.repeat(64),'a'.repeat(64),'b'.repeat(64),'c'.repeat(64),'d'.repeat(40),'app','f'.repeat(64),'1'.repeat(64),'2'.repeat(40),'3'.repeat(64),3000,63000,1,2000,2100,2500,3000,'prepared').run();
  await db.prepare('INSERT INTO dossier_successor_launch_claims VALUES(?,?,?,?,?,?)').bind('e'.repeat(64),'3'.repeat(64),'f'.repeat(64),'4'.repeat(64),'g',3100).run();
  await db.prepare('INSERT INTO dossier_publication_attempts VALUES(?,?,?,?,?,?,?,?)').bind('5'.repeat(64),'6'.repeat(32),'agent-friendly-web-delegated-canary','2'.repeat(40),'7'.repeat(40),'1'.repeat(64),'8'.repeat(64),3000).run();
  await db.prepare('INSERT INTO dossier_publication_receipts VALUES(?,?,?,?)').bind('5'.repeat(64),'11111111-1111-4111-8111-111111111111','9'.repeat(64),3200).run();
  const tables=['dossier_successor_reservations','dossier_successor_launch_claims','dossier_publication_attempts','dossier_publication_receipts'],saved=await Promise.all(tables.map(rows));
  await install();assert.deepEqual(await Promise.all(tables.map(rows)),saved);
  for(const [table,column] of [...tables.map(t=>[t,t==='dossier_successor_reservations'?'trial_id':t==='dossier_successor_launch_claims'?'trial_id':'artifact_key']),['dossier_node_process_admissions','grant_id'],['dossier_node_process_closures','grant_id']]){
   await assert.rejects(db.prepare('UPDATE '+table+' SET '+column+'='+column).run(),/immutable_/);await assert.rejects(db.prepare('DELETE FROM '+table).run(),/immutable_/);
  }
  assert.deepEqual([await rows('dossier_node_process_admissions'),await rows('dossier_node_process_closures')],originalRows);assert.deepEqual(await Promise.all(tables.map(rows)),saved);
  assert.equal((await db.prepare('PRAGMA foreign_key_check').all()).results.length,0);
 }finally{await runtime.dispose();}
});
