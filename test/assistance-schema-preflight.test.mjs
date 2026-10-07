import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {readFileSync} from 'node:fs';
import {assistanceSchemaPreflightSql} from '../lib/assistance-schema-preflight.mjs';

test('source preflight catches missing feedback before delivery without reading private rows',()=>{
 const db=new DatabaseSync(':memory:');
 try{
  db.exec("CREATE TABLE site_projects(id TEXT,user_id TEXT); CREATE TABLE project_events(id TEXT,project_id TEXT,user_id TEXT,type TEXT,created_at TEXT,payload_json TEXT); INSERT INTO project_events(payload_json) VALUES('private narrative must stay private');");
  db.exec(readFileSync(new URL('../worker/operations/assistance-delivery-receipts.sql',import.meta.url),'utf8'));
  assert.throws(()=>db.exec(assistanceSchemaPreflightSql('source')),/assistance_feedback_receipts/);
  db.exec(readFileSync(new URL('../worker/operations/assistance-feedback-receipts.sql',import.meta.url),'utf8'));
  const before=db.prepare('SELECT total_changes() AS n').get().n;
  for(const statement of assistanceSchemaPreflightSql('source').split(';').filter(x=>x.trim()))assert.deepEqual(db.prepare(statement).all(),[]);
  assert.equal(db.prepare('SELECT total_changes() AS n').get().n,before);
  db.exec('ALTER TABLE assistance_feedback_receipts RENAME COLUMN review_json TO incompatible');
  assert.throws(()=>db.exec(assistanceSchemaPreflightSql('source')),/review_json/);
 }finally{db.close();}
});

test('operational preflight compiles only metadata tables and catches a missing budget',()=>{
 const db=new DatabaseSync(':memory:');
 try{
  for(const file of ['assistance-supervision.sql','assistance-supervision-runs.sql'])db.exec(readFileSync(new URL('../worker/operations/'+file,import.meta.url),'utf8'));
  assert.throws(()=>db.exec(assistanceSchemaPreflightSql('operations')),/assistance_goal_generation_budget/);
  db.exec(readFileSync(new URL('../worker/operations/assistance-goal-generation-budget.sql',import.meta.url),'utf8'));
  for(const statement of assistanceSchemaPreflightSql('operations').split(';').filter(x=>x.trim()))assert.deepEqual(db.prepare(statement).all(),[]);
  assert.doesNotMatch(assistanceSchemaPreflightSql('operations'),/site_projects|project_events|payload_json|user_id/);
 }finally{db.close();}
 for(const role of [undefined,'production','source; DROP TABLE site_projects'])assert.throws(()=>assistanceSchemaPreflightSql(role),/invalid_role/);
});
