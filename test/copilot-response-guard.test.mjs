import test from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { createCopilotResponseGuard } from '../lib/copilot-response-guard.mjs';

function fixture() {
  const sqlite = new DatabaseSync(':memory:');
  sqlite.exec("CREATE TABLE site_projects(id TEXT,user_id TEXT,revision INTEGER); CREATE TABLE copilot_consent_events(sequence INTEGER PRIMARY KEY AUTOINCREMENT,project_id TEXT,user_id TEXT,action TEXT,consent_version TEXT);");
  sqlite.exec("INSERT INTO site_projects VALUES('owned','owner-a',3);");
  const consent = action => sqlite.prepare('INSERT INTO copilot_consent_events(project_id,user_id,action,consent_version) VALUES(?,?,?,?)').run('owned','owner-a',action,'afw-copilot-processing-v1');
  consent('grant');
  const sessions = [];
  const db = { withSession(mode) { sessions.push(mode); return this; }, prepare(sql) { return { bind(...args) { return { async first() { return sqlite.prepare(sql).get(...args) || null; } }; } }; } };
  const env = { DB: db, AFW_COPILOT_ENABLED: 'true', AFW_COPILOT_PROJECT_ID: 'owned' };
  const options = { projectId: 'owned', userId: 'owner-a', revision: 3 };
  return { sqlite, consent, sessions, env, options };
}

test('primary authority is owner scoped and a regrant does not revive an in-flight request', async () => {
  const f = fixture();
  const guard = await createCopilotResponseGuard(f.env, f.options, async () => ({ userId: 'owner-a' }));
  assert.equal(guard.ok, true);
  assert.deepEqual(await guard.check(), { ok: true });
  f.consent('revoke'); f.consent('grant');
  assert.deepEqual(await guard.check(), { ok: false, code: 'project_consent_required', status: 403 });
  const next = await createCopilotResponseGuard(f.env, f.options, async () => ({ userId: 'owner-a' }));
  assert.equal(next.ok, true);
  f.sqlite.exec("UPDATE site_projects SET user_id='owner-b'");
  assert.deepEqual(await next.check(), { ok: false, code: 'project_unavailable', status: 404 });
  assert.equal(f.sessions.length, 5);
  assert.ok(f.sessions.every(mode => mode === 'first-primary'));
  f.sqlite.close();
});

test('revision changes and missing consent fail closed using the actual authority SQL', async () => {
  const f = fixture();
  f.sqlite.exec('DELETE FROM copilot_consent_events');
  const user = async () => ({ userId: 'owner-a' });
  assert.equal((await createCopilotResponseGuard(f.env, f.options, user)).status, 403);
  f.consent('grant');
  const guard = await createCopilotResponseGuard(f.env, f.options, user);
  f.sqlite.exec('UPDATE site_projects SET revision=4');
  assert.deepEqual(await guard.check(), { ok: false, code: 'project_changed', status: 409 });
  f.sqlite.close();
});

test('identity or rollout withdrawal during the authority query is denied', async () => {
  const f = fixture();
  let actor = { userId: 'owner-a' };
  const prepare = f.env.DB.prepare;
  f.env.DB.prepare = sql => ({ bind(...args) { const statement = prepare(sql).bind(...args); return { async first() { const result = await statement.first(); actor = null; return result; } }; } });
  assert.equal((await createCopilotResponseGuard(f.env, f.options, async () => actor)).status, 401);
  actor = { userId: 'owner-a' };
  f.env.DB.prepare = sql => ({ bind(...args) { const statement = prepare(sql).bind(...args); return { async first() { const result = await statement.first(); f.env.AFW_COPILOT_ENABLED = 'false'; return result; } }; } });
  assert.equal((await createCopilotResponseGuard(f.env, f.options, async () => actor)).status, 503);
  f.sqlite.close();
});
