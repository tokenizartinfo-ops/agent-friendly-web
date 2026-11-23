import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { DatabaseSync } from 'node:sqlite';
import test from 'node:test';

import { createContinuationHandler } from '../lib/dossier-continuation.mjs';

function fixture(t) {
  const sql = new DatabaseSync(':memory:');
  t.after(() => sql.close());
  sql.exec(`
    CREATE TABLE site_projects(id TEXT PRIMARY KEY, user_id TEXT, revision INTEGER, website TEXT, notes TEXT);
    CREATE TABLE project_events(id TEXT PRIMARY KEY, project_id TEXT, user_id TEXT, type TEXT, payload_json TEXT, created_at TEXT);
    INSERT INTO site_projects VALUES ('p','alice',3,'https://example.org','PRIVATE ANSWER'),('draft','alice',1,'',''),('other','bob',3,'','');
    INSERT INTO project_events VALUES ('help-1','p','alice','assistance_requested','{}','2026-11-23');
  `);
  const statement = (query, args = []) => ({
    bind: (...values) => statement(query, values),
    first: async () => sql.prepare(query).get(...args) ?? null,
    run: async () => ({ meta: { changes: sql.prepare(query).run(...args).changes } }),
  });
  const db = { prepare: query => statement(query) };
  function call(input, { userId = 'alice', projectId = 'p', origin = 'https://afw.example', limit = true } = {}) {
    const serve = createContinuationHandler({ db, getIdentity: async () => userId ? { userId } : null,
      limiter: { limit: async () => ({ success: limit }) } });
    const url = 'https://afw.example/api/projects/' + projectId + '/continuation';
    const post = { method: 'POST', headers: { origin, 'content-type': 'application/json' },
      body: JSON.stringify(input) };
    return serve(new Request(url, input === undefined ? {} : post), projectId);
  }
  return { sql, call };
}

function input(overrides = {}) {
  return {
    requestId: crypto.randomUUID(), expectedRevision: 3, previousId: null,
    kind: 'advanced', level: 'AF-4', progress: 'Guía preparada', pending: 'Verificar el permiso',
    nextStep: 'Probar con el mantenedor', responsible: 'maintainer', approvedVersion: 'v2',
    ...overrides,
  };
}

test('an advanced checkpoint is private, reloadable and tied to the saved revision', async t => {
  const { sql, call } = fixture(t);
  assert.equal((await call(undefined, { userId: null })).status, 401);
  assert.equal((await call(undefined, { userId: 'bob' })).status, 404);
  assert.deepEqual(await (await call()).json(), { projectRevision: 3, checkpoint: null });
  const draft = input();
  assert.equal((await call(draft, { userId: 'bob' })).status, 404);
  assert.equal((await call(draft, { origin: 'https://foreign.example' })).status, 403);
  assert.equal((await call(draft, { limit: false })).status, 429);
  assert.equal((await call(draft)).status, 200);
  const view = await (await call()).json();
  assert.equal(view.checkpoint.level, 'AF-4');
  assert.equal(view.checkpoint.pending, 'Verificar el permiso');
  assert.equal(view.checkpoint.responsible, 'maintainer');
  assert.equal(view.checkpoint.revision, 3);
  assert.doesNotMatch(JSON.stringify(view), /PRIVATE ANSWER|alice|requestId/);
  sql.exec("UPDATE site_projects SET revision=4 WHERE id='p'");
  const refreshed = await (await call()).json();
  assert.equal(refreshed.projectRevision, 4);
  assert.equal(refreshed.checkpoint.revision, 3);
  assert.equal((await call(input({ previousId: view.checkpoint.id }))).status, 409);
  assert.equal(sql.prepare("SELECT notes FROM site_projects WHERE id='p'").get().notes, 'PRIVATE ANSWER');
});

test('a site with no URL resumes with its approved reference and preserves competing changes', async t => {
  const { sql, call } = fixture(t);
  const project = { projectId: 'draft' };
  const draft = input({ kind: 'new_site', level: null, expectedRevision: 1,
    progress: 'Portada y contacto', pending: 'Agregar una sección de trabajos',
    nextStep: 'Preparar una variante privada', responsible: 'afw', approvedVersion: 'Diseño v1' });
  const initial = await (await call(draft, project)).json();
  assert.equal(initial.checkpoint.nextStep, draft.nextStep);
  assert.equal(initial.checkpoint.approvedVersion, 'Diseño v1');
  assert.deepEqual(await (await call(draft, project)).json(), initial);
  assert.equal((await call({ ...draft, pending: 'Otro cambio' }, project)).status, 409);
  const siblings = ['Galería', 'Equipo'].map(pending => call({
    ...draft, requestId: crypto.randomUUID(), previousId: initial.checkpoint.id, pending,
  }, project));
  assert.deepEqual((await Promise.all(siblings)).map(r => r.status).sort(), [200, 409]);
  const latest = await (await call(undefined, project)).json();
  assert.equal(latest.checkpoint.revision, 1);
  assert.equal(latest.checkpoint.approvedVersion, 'Diseño v1');
  assert.notEqual(latest.checkpoint.pending, draft.pending);
  assert.equal((await call(draft, project)).status, 409);
  assert.equal(sql.prepare('SELECT COUNT(*) n FROM project_events WHERE project_id = ?').get('draft').n, 2);
  assert.equal(sql.prepare("SELECT website FROM site_projects WHERE id='draft'").get().website, '');
});

test('the checkpoint accepts only bounded notes and eligible paths', async t => {
  const { call } = fixture(t);
  for (const invalid of [
    { kind: 'new_site' }, { level: 'AF-2' }, { pending: '   ' }, { nextStep: 'x'.repeat(361) },
    { responsible: 'unspecified' }, { previousId: '' }, { userId: 'bob' },
  ]) assert.equal((await call(input(invalid))).status, 400);
  assert.equal((await call(input({ pending: 'x'.repeat(7000) }))).status, 413);
  assert.equal((await call(input({ progress: 'password: unsafe-synthetic-example' }))).status, 400);
  assert.equal((await call(input({ progress: 'Authorization: Bearer synthetic-opaque-example' }))).status, 400);
  assert.equal((await call(input({ approvedVersion: 'https://example.org/?token=example' }))).status, 400);
  assert.equal((await call(input({ approvedVersion: 'https://example.org/?%74oken=example' }))).status, 400);
  assert.equal((await call(input({ approvedVersion: 'https://example.org/#access%5Ftoken=example' }))).status, 400);
  assert.deepEqual(await (await call()).json(), { projectRevision: 3, checkpoint: null });
});

test('normal private workspace mounts the continuation card and a domainless creation entry', async () => {
  const workspace = await readFile(new URL('../app/components/intake-workspace.tsx', import.meta.url), 'utf8');
  assert.match(workspace, /!rehearsal && loaded && projectId[\s\S]{0,80}<DossierContinuation/);
  assert.match(workspace, /!rehearsal && loaded && !projectId && !sessionRequired[\s\S]{0,80}<ProjectCreate/);
  const route = await readFile(new URL('../app/api/projects/[projectId]/continuation/route.ts', import.meta.url), 'utf8');
  assert.match(route, /getIdentity: getCloudflareAccessUser/);
  assert.match(workspace, /onStartWithoutWebsite=\{openNamedDraft\}/);
  assert.match(workspace, /initialCreationUnconfirmed \|\| !shouldAutosaveProject/);
  assert.match(workspace, /!workingPending && !continuationPending && !hasPendingDraft/);
  assert.match(workspace, /sessionRequired=\{sessionRequired\} onPendingChange=\{setContinuationPending\}/);
});

test('project panels have distinct keys so opening the workspace cannot remount a sibling draft', async () => {
  const workspace = await readFile(new URL('../app/components/intake-workspace.tsx', import.meta.url), 'utf8');
  const panels = ['DossierContinuation', 'DossierTrustSummary', 'DossierAiIndexPreparation'];
  const keys = panels.map(panel => {
    const key = workspace.match(new RegExp(`<${panel}\\s+key=\\{(.+?)\\}\\s`))?.[1];
    assert.ok(key?.includes('projectId'), `${panel} must reset when the project changes`);
    return key;
  });
  assert.equal(new Set(keys).size, panels.length);
});
