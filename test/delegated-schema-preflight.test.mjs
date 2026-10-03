import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {delegatedSchemaPreflightSql} from '../lib/delegated-project-repository.mjs';

test('schema preflight rejects legacy canary before consent despite a working project list',()=>{
  const db=new DatabaseSync(':memory:');
  try {
    db.exec('CREATE TABLE site_projects(id TEXT,user_id TEXT,organization TEXT,website TEXT,role TEXT,site_type TEXT,control TEXT,audience TEXT,goals_json TEXT,languages_json TEXT,status TEXT,completion INTEGER,revision INTEGER,updated_at TEXT)');
    assert.deepEqual(db.prepare('SELECT id,organization FROM site_projects LIMIT 0').all(),[]);
    assert.throws(()=>db.exec(delegatedSchemaPreflightSql()),/no such/);
  } finally {db.close();}
});

test('schema preflight compiles current project join and evidence without exposing or changing rows',()=>{
  const db=new DatabaseSync(':memory:');
  try {
    db.exec(`CREATE TABLE site_projects(id TEXT,user_id TEXT,organization TEXT,website TEXT,role TEXT,site_type TEXT,control TEXT,audience TEXT,goals_json TEXT,languages_json TEXT,status TEXT,completion INTEGER,revision INTEGER,updated_at TEXT,cms TEXT,hosting TEXT,content_sources_json TEXT);
      CREATE TABLE copilot_working_drafts(project_id TEXT,user_id TEXT,session_json TEXT);
      CREATE TABLE scan_observations(id TEXT,project_id TEXT,user_id TEXT,target_origin TEXT,readiness_json TEXT,checked_at TEXT);
      INSERT INTO site_projects(id,user_id,organization) VALUES('private','owner','Do not output');`);
    const before=db.prepare('SELECT total_changes() AS count').get().count;
    db.exec(delegatedSchemaPreflightSql());
    assert.equal(db.prepare('SELECT total_changes() AS count').get().count,before);
    assert.deepEqual(db.prepare('SELECT organization FROM site_projects').get(),Object.assign(Object.create(null),{organization:'Do not output'}));
    db.exec('DROP TABLE scan_observations');
    assert.throws(()=>db.exec(delegatedSchemaPreflightSql()),/no such table/);
  } finally {db.close();}
});
