import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import test from 'node:test';
import { createDossierConditionsHandler } from '../lib/dossier-conditions.mjs';

const review = { terms: 'pending', privacy: 'reviewed', product: 'needs_changes', whitePaper: 'not_applicable', accessibility: 'reviewed' };

function fixture(t) {
  const sql = new DatabaseSync(':memory:');
  t.after(() => sql.close());
  sql.exec(`
    CREATE TABLE site_projects(id TEXT PRIMARY KEY, user_id TEXT, revision INTEGER, website TEXT, notes TEXT);
    CREATE TABLE project_events(id TEXT PRIMARY KEY, project_id TEXT, user_id TEXT, type TEXT, payload_json TEXT, created_at TEXT);
    INSERT INTO site_projects VALUES ('site','alice',3,'https://example.org','PRIVATE NOTE'),('new','alice',1,'',''),('other','bob',3,'','');
    INSERT INTO project_events VALUES ('old','site','alice','dossier_continuation_saved','{}','2026-11-23');
  `);
  const statement = (query, args = []) => ({
    bind: (...values) => statement(query, values),
    first: async () => sql.prepare(query).get(...args) ?? null,
    run: async () => sql.prepare(query).run(...args),
  });
  function call(body, { projectId = 'site', userId = 'alice', origin = 'https://afw.example', allowed = true } = {}) {
    const handle = createDossierConditionsHandler({ db: { prepare: statement },
      getIdentity: async () => userId ? { userId } : null,
      limiter: { limit: async () => ({ success: allowed }) } });
    return handle(new Request('https://afw.example/api/projects/' + projectId + '/conditions',
      body === undefined ? {} : { method: 'POST', headers: { origin, 'content-type': 'application/json' }, body: JSON.stringify(body) }), projectId);
  }
  return { sql, call };
}

const draft = (overrides = {}) => ({ requestId: crypto.randomUUID(), expectedRevision: 3, previousId: null, review, ...overrides });

test('an AF-2 review is private and leaves the dossier notes and continuation intact', async t => {
  const { sql, call } = fixture(t);
  assert.equal((await call(undefined, { userId: null })).status, 401);
  assert.equal((await call(undefined, { userId: 'bob' })).status, 404);
  assert.equal((await call(draft(), { userId: 'bob' })).status, 404);
  assert.equal((await call(draft(), { origin: 'https://foreign.example' })).status, 403);
  assert.equal((await call(draft(), { allowed: false })).status, 429);
  const stored = await call(draft());
  assert.equal(stored.status, 200);
  const view = await stored.json();
  assert.equal(view.projectRevision, 3);
  assert.deepEqual(view.checkpoint.review, review);
  assert.deepEqual(await (await call()).json(), view);
  assert.doesNotMatch(JSON.stringify(view), /PRIVATE NOTE|requestId|alice/);
  assert.equal(sql.prepare("SELECT notes FROM site_projects WHERE id='site'").get().notes, 'PRIVATE NOTE');
  assert.equal(sql.prepare("SELECT type FROM project_events WHERE id='old'").get().type, 'dossier_continuation_saved');
});

test('a site from scratch can save a review and stale or racing attempts preserve the latest update', async t => {
  const { sql, call } = fixture(t);
  const context = { projectId: 'new' }, request = draft({ expectedRevision: 1 });
  const saved = await (await call(request, context)).json();
  assert.deepEqual(await (await call(request, context)).json(), saved);
  const attempts = ['reviewed', 'needs_changes'].map(terms => call(draft({
    expectedRevision: 1, previousId: saved.checkpoint.id, review: { ...review, terms },
  }), context));
  assert.deepEqual((await Promise.all(attempts)).map(x => x.status).sort(), [200, 409]);
  assert.equal(sql.prepare("SELECT count(*) AS n FROM project_events WHERE project_id='new'").get().n, 2);
  const recent = await (await call(undefined, context)).json();
  sql.exec("UPDATE site_projects SET revision=2, website='https://example.org' WHERE id='new'");
  const after = await (await call(undefined, context)).json();
  assert.equal(after.projectRevision, 2);
  assert.equal(after.checkpoint.revision, 1);
  assert.equal((await call(draft({ expectedRevision: 1, previousId: recent.checkpoint.id }), context)).status, 409);
});

test('the dossier accepts only the five review statuses, never report data or attestations', async t => {
  const { call } = fixture(t);
  for (const input of [
    draft({ aimScore: 10 }), draft({ review: { ...review, privacy: 'certified' } }),
    draft({ review: { ...review, accessibility: 'not_applicable' } }),
    draft({ review: { ...review, terms: 'https://example.org/secret' } }),
    draft({ review: { ...review, report: 'x' } }),
  ]) assert.equal((await call(input)).status, 400);
});
