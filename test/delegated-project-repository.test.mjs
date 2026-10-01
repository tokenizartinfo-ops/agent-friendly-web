import assert from 'node:assert/strict';
import test from 'node:test';
import { DatabaseSync } from 'node:sqlite';
import { createDelegatedProjectRepository } from '../lib/delegated-project-repository.mjs';

test('SQLite queries bind current owner/project/origin and only read selected fields',async()=>{
  const sqlite=new DatabaseSync(':memory:');
  try {
    sqlite.exec(`CREATE TABLE site_projects (id TEXT,user_id TEXT,organization TEXT,website TEXT,role TEXT,site_type TEXT,control TEXT,audience TEXT,goals_json TEXT,languages_json TEXT,status TEXT,completion INTEGER,revision INTEGER,updated_at TEXT,notes TEXT);
      CREATE TABLE scan_observations (id TEXT,project_id TEXT,user_id TEXT,target_origin TEXT,readiness_json TEXT,checked_at TEXT,probes_json TEXT);
      INSERT INTO site_projects VALUES ('p-a','owner-a','A','https://a.example/','owner','content','none','users','["content"]','["es"]','draft',30,2,'2026-09-30T18:00:00Z','secret-notes');
      INSERT INTO scan_observations VALUES ('o-a','p-a','owner-a','https://a.example','{"score":30}','2026-09-30T18:00:00Z','secret-probes'),('o-b','p-a','owner-b','https://a.example','{}','2026-09-30T18:00:00Z','secret'),('o-old','p-a','owner-a','https://old.example','{}','2026-09-30T18:00:00Z','secret');`);
    const db={prepare(sql){const statement=sqlite.prepare(sql);return {bind(...args){return {first:async()=>statement.get(...args)??null,all:async()=>({results:statement.all(...args)})};}};}};
    const store={getGrant:async id=>({grantId:id})};
    const repository=createDelegatedProjectRepository({db,grantStore:store});
    assert.equal((await repository.getGrant('g')).grantId,'g');
    assert.equal(await repository.getOwnedProject('p-a','owner-b'),null);
    assert.equal(await repository.getOwnedProject("p-a' OR 1=1 --",'owner-a'),null);
    const project=await repository.getOwnedProject('p-a','owner-a');
    assert.equal(project.intake.siteType,'content');
    assert.deepEqual(project.intake.goals,['content']);
    assert.ok(!JSON.stringify(project).includes('secret'));
    const observations=await repository.listCurrentObservations('p-a','owner-a','https://a.example');
    assert.deepEqual(observations.map(x=>x.id),['o-a']);
    assert.ok(!JSON.stringify(observations).includes('secret'));
  } finally { sqlite.close(); }
});

test('repository refuses a missing authoritative grant store',()=>{
  assert.throws(()=>createDelegatedProjectRepository({db:{}}),/grant store/i);
});
