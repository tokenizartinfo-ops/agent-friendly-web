import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import vm from 'node:vm';
import ts from 'typescript';
import { isCopilotProjectAllowed } from '../lib/copilot-rollout.mjs';
import { validateCopilotWorkingDraft } from '../lib/copilot-working-draft.mjs';

const key = '8a6296d4-ff88-4d34-830e-90757b4f0e33';

test('working text is bounded and credentials are not persisted', () => {
  const base = { text: 'Mi sitio explica nuestros servicios.', revision: 0, mutationKey: key, locale: 'es' };
  assert.equal(validateCopilotWorkingDraft(base).ok, true);
  assert.equal(validateCopilotWorkingDraft({ ...base, text: 'x'.repeat(5001) }).ok, false);
  assert.equal(validateCopilotWorkingDraft({ ...base, text: 'Mi password es abc123' }).code, 'sensitive_working_draft');
  assert.equal(validateCopilotWorkingDraft({ ...base, privateKey: 'x' }).ok, false);
  assert.equal(validateCopilotWorkingDraft({ ...base, revision: -1 }).ok, false);
});

test('additive migration leaves existing projects intact and creates isolated working drafts', () => {
  const db = new DatabaseSync(':memory:');
  try {
    for (let i = 0; i < 8; i++) {
      const files = ['0000_tearful_ego.sql', '0001_registry_block1.sql', '0002_publication_capsules.sql', '0003_origin_comparisons_and_draft_pr_plans.sql', '0004_common_guardsmen.sql', '0005_normal_ma_gnuci.sql', '0006_reduced_pilot_revision.sql', '0007_dry_power_pack.sql'];
      db.exec(readFileSync(`drizzle/${files[i]}`, 'utf8'));
    }
    db.exec("INSERT INTO site_projects(id,user_id,owner_email,website,created_at,updated_at) VALUES ('qa','owner','owner@example.invalid','https://example.invalid','2026-09-29','2026-09-29')");
    const before = db.prepare("SELECT * FROM site_projects WHERE id='qa'").get();
    db.exec(readFileSync('drizzle/0008_happy_klaw.sql', 'utf8'));
    assert.deepEqual(db.prepare("SELECT * FROM site_projects WHERE id='qa'").get(), before);
    assert.equal(db.prepare('SELECT COUNT(*) AS count FROM copilot_working_drafts').get().count, 0);
  } finally { db.close(); }
});

async function harness() {
  let actor = { userId: 'owner' };
  const env = { AFW_COPILOT_ENABLED: 'true', AFW_COPILOT_PROJECT_ID: 'pilot' };
  const projects = [{ id: 'pilot', userId: 'owner' }];
  const drafts = [];
  const projectTable = new Proxy({}, { get: (_, key) => key });
  const draftTable = new Proxy({}, { get: (_, key) => key });
  const eq = (key, value) => row => row[key] === value;
  const and = (...parts) => row => parts.every(part => part(row));
  const db = {
    select() {
      let rows, predicate = () => true;
      const query = { from(table) { rows = table === projectTable ? projects : drafts; return query; }, where(fn) { predicate = fn; return query; }, async limit(n) { return rows.filter(predicate).slice(0, n).map(row => ({ ...row })); } };
      return query;
    },
    insert(table) {
      assert.equal(table, draftTable);
      return { values(row) { return { onConflictDoNothing() { return { async returning() { if (drafts.some(item => item.projectId === row.projectId)) return []; drafts.push({ ...row }); return [{ revision: row.revision, updatedAt: row.updatedAt }]; } }; } }; } };
    },
    update(table) {
      assert.equal(table, draftTable);
      return { set(patch) { return { where(predicate) { return { async returning() { const row = drafts.find(predicate); if (!row) return []; Object.assign(row, patch); return [{ revision: row.revision, updatedAt: row.updatedAt }]; } }; } }; } };
    },
  };
  const imports = {
    'cloudflare:workers': { env }, 'drizzle-orm': { and, eq },
    '../../../../../cloudflare-access-auth': { getCloudflareAccessUser: async () => actor },
    '../../../../../../db': { getDb: () => db },
    '../../../../../../db/schema': { siteProjects: projectTable, copilotWorkingDrafts: draftTable },
    '../../../../../../lib/copilot-rollout.mjs': { isCopilotProjectAllowed },
    '../../../../../../lib/copilot-working-draft.mjs': { validateCopilotWorkingDraft },
  };
  const code = ts.transpileModule(readFileSync('app/api/projects/[projectId]/copilot/working-draft/route.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const exports = {};
  vm.runInNewContext(code, { exports, require: name => { assert.ok(imports[name], name); return imports[name]; }, Response, URL, TextDecoder, Date });
  const request = (method, body, options = {}) => {
    const url = 'https://agentfriendlyweb.dev/api/projects/pilot/copilot/working-draft';
    const input = new Request(url, method === 'PUT' ? { method, headers: { origin: 'https://agentfriendlyweb.dev', 'content-type': 'application/json', ...options.headers }, body: JSON.stringify(body) } : { method });
    return exports[method](input, { params: Promise.resolve({ projectId: options.projectId || 'pilot' }) });
  };
  return { env, drafts, request, actor(value) { actor = value; } };
}

test('working draft route is owner-only, exact-pilot, versioned and idempotent', async () => {
  const h = await harness();
  const first = { text: 'Somos una librería.', revision: 0, mutationKey: key, locale: 'es' };
  h.actor(null); assert.equal((await h.request('GET')).status, 401);
  h.actor({ userId: 'other' }); assert.equal((await h.request('GET')).status, 404);
  h.actor({ userId: 'owner' }); assert.equal((await h.request('GET', null, { projectId: 'other' })).status, 404);
  assert.equal((await h.request('PUT', first, { headers: { origin: 'https://evil.invalid' } })).status, 403);
  assert.equal((await h.request('PUT', { ...first, text: 'Mi password es abc123' })).status, 422);
  assert.equal(h.drafts.length, 0);
  assert.equal((await h.request('PUT', first)).status, 200);
  assert.equal((await h.request('PUT', first)).status, 200);
  assert.equal(h.drafts.length, 1);
  const second = { ...first, text: 'Somos una librería independiente.', revision: 1, mutationKey: '8b6296d4-ff88-4d34-830e-90757b4f0e33' };
  assert.equal((await h.request('PUT', second)).status, 200);
  assert.equal((await h.request('PUT', { ...first, mutationKey: '8c6296d4-ff88-4d34-830e-90757b4f0e33' })).status, 409);
  assert.equal((await (await h.request('GET')).json()).draft.text, second.text);
  h.env.AFW_COPILOT_ENABLED = 'false'; assert.equal((await h.request('GET')).status, 503);
});
