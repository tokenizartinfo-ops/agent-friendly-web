import assert from 'node:assert/strict';
import test from 'node:test';
import { DatabaseSync } from 'node:sqlite';
import { Client, InMemoryTransport } from '@modelcontextprotocol/client';
import { createDelegatedOAuthStore } from '../lib/delegated-oauth-store.mjs';
import { createDelegatedProjectRepository } from '../lib/delegated-project-repository.mjs';
import { readDelegatedProject } from '../lib/delegated-project-read.mjs';
import { createDelegatedProjectMcpServer } from '../lib/delegated-project-mcp.mjs';

const START = Date.parse('2026-10-19T14:00:00.000Z');
const RESOURCE = 'https://fixture.example.invalid/mcp';
const iso = delta => new Date(START + delta).toISOString();
function fixture(t) {
  const sqlite = new DatabaseSync(':memory:');
  t.after(() => sqlite.close());
  sqlite.exec(`
    CREATE TABLE site_projects(id TEXT PRIMARY KEY,user_id TEXT,organization TEXT,website TEXT,role TEXT,site_type TEXT,control TEXT,audience TEXT,
      goals_json TEXT,languages_json TEXT,status TEXT,completion INTEGER,revision INTEGER,updated_at TEXT,cms TEXT,hosting TEXT,content_sources_json TEXT,notes TEXT);
    CREATE TABLE copilot_working_drafts(project_id TEXT PRIMARY KEY,user_id TEXT,session_json TEXT,text TEXT);
    CREATE TABLE delegated_access_grants(id TEXT PRIMARY KEY,user_id TEXT,client_id TEXT,project_id TEXT,resource TEXT,scopes_json TEXT,
      created_at TEXT,expires_at TEXT,revoked_at TEXT,exchanged_at TEXT);
    INSERT INTO site_projects VALUES('p-synthetic','fixture.owner@example.invalid','PRIVATE_ORGANIZATION','https://fixture.example.invalid/','owner','content','none','',
      '["content"]','[]','draft',40,3,'2026-10-19T13:00:00.000Z','','','[]','PRIVATE_NOTES');
    INSERT INTO copilot_working_drafts VALUES('p-synthetic','fixture.owner@example.invalid','{"version":1,"deferred":[],"pending":{"sourceExcerpt":"PRIVATE_QUOTE"}}','PRIVATE_NARRATIVE');
    INSERT INTO delegated_access_grants VALUES('g-synthetic','fixture.owner@example.invalid','c-synthetic','p-synthetic','https://fixture.example.invalid/mcp',
      '["afw:project:read"]','2026-10-19T13:59:00.000Z','2026-10-19T14:01:00.000Z','','2026-10-19T13:59:00.000Z');
  `);
  let epoch = START, queries = 0;
  const db = { prepare(sql) {
    queries++;
    const statement = sqlite.prepare(sql);
    return { bind(...args) { return { first: async () => statement.get(...args) ?? null,
      all: async () => ({ results: statement.all(...args) }) }; } };
  } };
  const repository = createDelegatedProjectRepository({ db, grantStore: createDelegatedOAuthStore(db), createPrimarySession: () => db });
  const context = { grantId: 'g-synthetic', subject: 'fixture.owner@example.invalid', clientId: 'c-synthetic', resource: RESOURCE, scopes: ['afw:project:read'] };
  return { sqlite, db, repository, context, admission: repository.getProjectReadAdmission?.bind(repository), now: () => new Date(epoch).toISOString(), advance: delta => { epoch = START + delta; },
    queries: () => queries, read: extra => readDelegatedProject({ context, projectId: 'p-synthetic', operation: 'project_next_step', repository, resource: RESOURCE,
      now: () => new Date(epoch).toISOString(), ...extra }) };
}
function beforeAdmission(f, run) {
  const original = f.admission;
  f.repository.getProjectReadAdmission = async (...args) => { run(); return original?.(...args); };
}
function closed(result) {
  for (const field of ['executionAllowed','chargeAllowed','publicationAllowed']) assert.equal(result[field], false);
}
async function withClient(f, options, run) {
  const server = createDelegatedProjectMcpServer({ repository: f.repository, resource: RESOURCE, now: f.now,
    resolveAuthorization: async () => ({ context: f.context, projectId: 'p-synthetic' }), ...options });
  const client = new Client({ name: 'synthetic-continuity', version: '1.0.0' }, { versionNegotiation: { mode: 'legacy' } });
  const [ct, st] = InMemoryTransport.createLinkedPair();
  await server.connect(st); await client.connect(ct);
  try {
    const catalog = await client.listTools();
    if (options.continuityEnabled === true) assert.ok(catalog.tools.some(x => x.name === 'read_project_next_step'), 'continuity tool missing');
    await run(client, catalog);
  } finally { await client.close(); await server.close(); }
}

test('delegated continuity reads native primary state and projects one bounded question without private fields', async t => {
  const f = fixture(t), before = f.sqlite.prepare('SELECT total_changes() AS n').get().n;
  const result = await f.read();
  assert.equal(result.status, 200);
  assert.equal(result.data.contract, 'afw.agent-consumption.next-step.v1');
  assert.equal(result.data.projectRef, 'p-synthetic'); assert.equal(result.data.revision, 3);
  assert.equal(result.data.nextStep.kind, 'provide_information');
  assert.equal(result.data.missingInput.key, 'audience');
  assert.equal(result.data.observedAt, iso(0)); assert.equal(result.data.expiresAt, iso(5000));
  assert.deepEqual(result.data.evidenceRefs, []); assert.equal(result.data.capsuleRef, null); closed(result.data);
  for (const secret of ['PRIVATE_', 'fixture.owner', 'g-synthetic', 'c-synthetic']) assert.equal(JSON.stringify(result).includes(secret), false);
  assert.equal(f.sqlite.prepare('SELECT total_changes() AS n').get().n, before);
});
test('delegated continuity honors deferred questions and projects review when the scoped intake is complete', async t => {
  const f = fixture(t);
  f.sqlite.exec(`UPDATE copilot_working_drafts SET session_json='{"version":1,"deferred":["audience"]}'`);
  assert.equal((await f.read()).data?.missingInput?.key, 'languages');
  f.sqlite.exec(`UPDATE site_projects SET audience='PRIVATE_AUDIENCE',languages_json='["es"]',content_sources_json='["PRIVATE_SOURCE"]'`);
  const done = await f.read(); assert.equal(done.status, 200);
  assert.equal(done.data.nextStep.kind, 'review'); assert.equal(done.data.missingInput, null);
  assert.equal(JSON.stringify(done).includes('PRIVATE_'), false);
});
test('delegated continuity rejects a caller stale revision and invalid revision inputs', async t => {
  const f = fixture(t);
  assert.equal((await f.read({ expectedRevision: 2 })).code, 'revision_conflict');
  for (const expectedRevision of [0, -1, 1.5, Number.MAX_SAFE_INTEGER + 1, '3', null]) {
    const result = await f.read({ expectedRevision }); assert.equal(result.status, 400); assert.equal(result.data, undefined);
  }
  assert.equal((await f.read({ expectedRevision: 3 })).status, 200);
});
for (const [name, sql, want] of [
  ['revoked grant', "UPDATE delegated_access_grants SET revoked_at='2026-10-19T14:00:00.000Z'", 'delegated_access_denied'],
  ['scope withdrawal', "UPDATE delegated_access_grants SET scopes_json='[]'", 'delegated_access_denied'],
  ['malformed scope', "UPDATE delegated_access_grants SET scopes_json='broken'", 'delegated_access_denied'],
  ['changed client', "UPDATE delegated_access_grants SET client_id='foreign-client'", 'delegated_access_denied'],
  ['changed resource', "UPDATE delegated_access_grants SET resource='https://foreign.example.invalid/mcp'", 'delegated_access_denied'],
  ['changed project ownership', "UPDATE site_projects SET user_id='foreign-owner'", 'delegated_access_denied'],
  ['changed revision', 'UPDATE site_projects SET revision=4', 'revision_conflict'],
]) {
  test('delegated continuity rechecks native admission after the initial project read: ' + name, async t => {
    const f = fixture(t); beforeAdmission(f, () => f.sqlite.exec(sql));
    const result = await f.read(); assert.equal(result.code, want); assert.equal(result.data, undefined);
  });
}
test('delegated continuity rejects expiry during native admission and never extends the original grant deadline', async t => {
  const f = fixture(t); f.sqlite.prepare('UPDATE delegated_access_grants SET expires_at=?').run(iso(1000));
  beforeAdmission(f, () => { f.advance(1000); });
  assert.equal((await f.read()).code, 'delegated_access_denied');
  f.advance(0);
  beforeAdmission(f, () => { f.sqlite.prepare('UPDATE delegated_access_grants SET expires_at=?').run(iso(60000)); });
  const result = await f.read(); assert.equal(result.status, 200); assert.equal(result.data.expiresAt, iso(1000));
});
test('delegated continuity drops a snapshot that exhausted its freshness budget or moved its clock backwards', async t => {
  const f = fixture(t); beforeAdmission(f, () => f.advance(5000));
  const late = await f.read(); assert.equal(late.code, 'delegated_read_unavailable'); assert.equal(late.data, undefined);
  f.advance(0); beforeAdmission(f, () => f.advance(-1));
  assert.equal((await f.read()).code, 'delegated_read_unavailable');
});
test('delegated continuity fails closed on absent admission storage, malformed revision and repository exceptions', async t => {
  const f = fixture(t); const admission = f.repository.getProjectReadAdmission;
  f.repository.getProjectReadAdmission = undefined;
  assert.equal((await f.read()).code, 'delegated_read_unavailable');
  f.repository.getProjectReadAdmission = admission;
  f.sqlite.exec('UPDATE site_projects SET revision=NULL');
  assert.equal((await f.read()).code, 'delegated_read_unavailable');
  f.sqlite.exec('UPDATE site_projects SET revision=3');
  f.repository.getProjectReadAdmission = async () => { throw Error('PRIVATE_DATABASE_FAILURE'); };
  const result = await f.read(); assert.equal(result.code, 'delegated_read_unavailable');
  assert.equal(JSON.stringify(result).includes('PRIVATE_'), false);
});
test('delegated continuity requires current project read scope before selecting private state', async t => {
  const f = fixture(t); f.context.scopes = ['afw:evidence:read'];
  const before = f.queries(), result = await f.read();
  assert.equal(result.code, 'insufficient_scope'); assert.equal(f.queries(), before);
});
test('native admission query binds grant, owner, client, resource and project in the same row', async t => {
  const f = fixture(t), args = { grantId: 'g-synthetic', subject: 'fixture.owner@example.invalid', clientId: 'c-synthetic', resource: RESOURCE, projectId: 'p-synthetic' };
  const row = await f.repository.getProjectReadAdmission?.(args);
  assert.equal(row?.revision, 3); assert.equal(row?.grantId, 'g-synthetic'); assert.equal(row?.expiresAt, iso(60000));
  assert.equal(JSON.stringify(row).includes('PRIVATE_'), false);
  for (const patch of [{ grantId: "g-synthetic' OR 1=1 --" }, { subject: 'foreign' }, { clientId: 'foreign' }, { resource: 'foreign' }, { projectId: 'foreign' }]) {
    assert.equal(await f.repository.getProjectReadAdmission({ ...args, ...patch }), null);
  }
});
test('MCP continuation requires exact server opt-in; defaults keep the accepted two-tool surface', async t => {
  const f = fixture(t);
  for (const continuityEnabled of [undefined, false, 'true', 1]) {
    await withClient(f, { continuityEnabled }, async (_client, catalog) => {
      assert.deepEqual(catalog.tools.map(x => x.name).sort(), ['read_project_summary','read_saved_evidence']);
    });
  }
});
test('MCP continuation uses current server-owned identity and rejects client identity or scope injection', async t => {
  const f = fixture(t);
  await withClient(f, { continuityEnabled: true }, async (client, catalog) => {
    const tool = catalog.tools.find(x => x.name === 'read_project_next_step');
    assert.deepEqual(tool._meta.securitySchemes, [{ type: 'oauth2', scopes: ['afw:project:read'] }]);
    assert.equal(tool.annotations.readOnlyHint, true); assert.equal(tool.inputSchema.additionalProperties, false);
    const result = await client.callTool({ name: 'read_project_next_step', arguments: {} });
    assert.equal(result.structuredContent.status, 200); closed(result.structuredContent.data);
    for (const args of [{ projectId: 'foreign' }, { subject: 'foreign' }, { grantId: 'foreign' }, { expectedRevision: 0 }]) {
      const before = f.queries(), rejected = await client.callTool({ name: 'read_project_next_step', arguments: args });
      assert.equal(rejected.isError, true); assert.equal(f.queries(), before);
    }
  });
});
test('MCP continuation reports revision recovery without reconnecting and denies later grant withdrawal', async t => {
  const f = fixture(t);
  await withClient(f, { continuityEnabled: true }, async client => {
    const conflict = await client.callTool({ name: 'read_project_next_step', arguments: { expectedRevision: 2 } });
    assert.equal(conflict.structuredContent.code, 'revision_conflict');
    assert.equal(conflict.structuredContent.recovery.action, 'retry_read');
    assert.equal(conflict.structuredContent.recovery.automaticReconnect, false);
    f.sqlite.exec(`UPDATE delegated_access_grants SET revoked_at='2026-10-19T14:00:00.000Z'`);
    const denied = await client.callTool({ name: 'read_project_next_step', arguments: {} });
    assert.equal(denied.structuredContent.code, 'delegated_access_denied');
    assert.equal(denied.structuredContent.data, undefined); assert.equal(denied._meta, undefined);
  });
});

for (const [name, mutation, want] of [
  ['withdrawal', "UPDATE delegated_access_grants SET revoked_at='2026-10-19T14:00:00.000Z'", 'delegated_access_denied'],
  ['owner transfer', "UPDATE site_projects SET user_id='foreign-owner'", 'delegated_access_denied'],
  ['revision update', 'UPDATE site_projects SET revision=4', 'revision_conflict'],
]) {
  test('delegated admission reads the fresh primary instead of an earlier stale snapshot: ' + name, async t => {
    const stale = fixture(t), primary = fixture(t);
    primary.sqlite.exec(mutation);
    const repository = createDelegatedProjectRepository({ db: stale.db, grantStore: createDelegatedOAuthStore(stale.db),
      createPrimarySession: () => primary.db });
    const result = await stale.read({ repository });
    assert.equal(result.code, want); assert.equal(result.data, undefined);
  });
}
test('delegated admission refuses missing or failed primary custody instead of falling back to old state', async t => {
  const f = fixture(t);
  const missing = createDelegatedProjectRepository({ db: f.db, grantStore: createDelegatedOAuthStore(f.db) });
  assert.equal((await f.read({ repository: missing })).code, 'delegated_read_unavailable');
  const failed = createDelegatedProjectRepository({ db: f.db, grantStore: createDelegatedOAuthStore(f.db),
    createPrimarySession() { throw Error('PRIVATE_PRIMARY_FAILURE'); } });
  const result = await f.read({ repository: failed });
  assert.equal(result.code, 'delegated_read_unavailable'); assert.equal(JSON.stringify(result).includes('PRIVATE_'), false);
});
