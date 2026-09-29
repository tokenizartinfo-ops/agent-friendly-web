import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { DatabaseSync } from 'node:sqlite';

test('reduced migration preserves production records and fences legacy writers without CRM tables',()=>{
  const db=new DatabaseSync(':memory:');
  try {
    for(const name of readdirSync('drizzle').filter(n=>/^000[0-5]_.*\.sql$/.test(n)).sort()) db.exec(readFileSync(`drizzle/${name}`,'utf8'));
    db.exec("INSERT INTO site_projects(id,user_id,owner_email,organization,created_at,updated_at) VALUES ('qa','qa-owner','qa@example.invalid','Preserved','2026-09-14','2026-09-14')");
    const before=db.prepare("SELECT * FROM site_projects WHERE id='qa'").get();
    db.exec(readFileSync('drizzle/0006_reduced_pilot_revision.sql','utf8'));
    const {revision,...after}=db.prepare("SELECT * FROM site_projects WHERE id='qa'").get();
    assert.equal(revision,1); assert.deepEqual(after,{...before});
    db.exec("UPDATE site_projects SET organization='Legacy update' WHERE id='qa'");
    assert.equal(db.prepare("SELECT revision FROM site_projects WHERE id='qa'").get().revision,2);
    const stale=db.prepare("UPDATE site_projects SET organization='Stale',revision=2 WHERE id='qa' AND revision=1").run();
    assert.equal(stale.changes,0);
    db.exec("UPDATE site_projects SET organization='Current',revision=3 WHERE id='qa' AND revision=2");
    assert.equal(db.prepare("SELECT revision FROM site_projects WHERE id='qa'").get().revision,3);
    assert.deepEqual(db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND (name LIKE 'crm_%' OR name='project_crm_links' OR name='email_transactional_deliveries')").all(),[]);
    assert.match(readFileSync('db/schema.ts','utf8'),/revision: integer\('revision'\)\.notNull\(\)\.default\(1\)/);
  } finally { db.close(); }
});
