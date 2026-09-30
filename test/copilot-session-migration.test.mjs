import test from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { readFileSync, readdirSync, copyFileSync, unlinkSync, existsSync, mkdtempSync, rmdirSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

test('the additive session migration preserves working text and a restored database recovers decisions', () => {
  const directory = mkdtempSync(join(tmpdir(), 'afw-session-'));
  const source = join(directory, 'source.sqlite');
  const restored = `${source}.restored`;
  let db;
  try {
    db = new DatabaseSync(source);
    const migrations = readdirSync('drizzle').filter(file => /^000[0-8]_.*\.sql$/.test(file)).sort();
    for (const file of migrations) db.exec(readFileSync(`drizzle/${file}`, 'utf8'));
    db.exec("INSERT INTO copilot_working_drafts(project_id,user_id,text,revision,last_mutation_key,updated_at) VALUES ('synthetic','owner','Mi relato preservado',3,'test-key','2026-09-30T12:00:00Z')");
    db.exec(readFileSync('drizzle/0009_volatile_meltdown.sql', 'utf8'));
    assert.equal(db.prepare('SELECT text FROM copilot_working_drafts').get().text, 'Mi relato preservado');
    const session = { version: 1, basedOnRevision: 8, deferred: ['hosting'], decisions: [{ field: 'cms', choice: 'discarded' }], pending: null };
    db.prepare('UPDATE copilot_working_drafts SET session_json=?').run(JSON.stringify(session));
    db.close(); db = null;
    copyFileSync(source, restored);
    db = new DatabaseSync(restored);
    const row = db.prepare('SELECT text,revision,session_json FROM copilot_working_drafts').get();
    assert.equal(row.text, 'Mi relato preservado');
    assert.equal(row.revision, 3);
    assert.deepEqual(JSON.parse(row.session_json), session);
  } finally {
    db?.close();
    for (const file of [source, restored]) if (existsSync(file)) unlinkSync(file);
    rmdirSync(directory);
  }
});
