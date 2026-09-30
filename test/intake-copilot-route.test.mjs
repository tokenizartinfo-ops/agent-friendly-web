import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import ts from 'typescript';
import * as copilot from '../lib/intake-copilot.mjs';
import { requestIntakeSuggestions } from '../lib/intake-copilot-provider.mjs';
import { isCopilotProjectAllowed } from '../lib/copilot-rollout.mjs';
import { buildCopilotContext } from '../lib/copilot-context.mjs';

async function harness() {
  let actor = { userId: 'owner-a' };
  let inferenceCalls = 0;
  let rateCalls = 0;
  let allowed = true;
  let consentGranted = true;
  const rows = [{ id: 'owned', userId: 'owner-a' }];
  const env = {
    AFW_COPILOT_ENABLED: 'true',
    AFW_COPILOT_PROJECT_ID: 'owned',
    AI: { run: async (_model, options) => {
      inferenceCalls++;
      assert.equal(options.max_tokens, 650);
      assert.match(options.messages[1].content, /WordPress/);
      return { response: { suggestions: [{ field: 'cms', value: 'WordPress', sourceExcerpt: 'WordPress' }] } };
    } },
    COPILOT_RATE_LIMIT: { limit: async ({ key }) => {
      assert.equal(key, actor.userId);
      rateCalls++;
      return { success: allowed };
    } },
  };
  const table = new Proxy({}, { get: (_, key) => key });
  const db = {
    select() {
      let predicate = () => true;
      const query = {
        from: () => query,
        where(fn) { predicate = fn; return query; },
        async limit(n) { return rows.filter(predicate).slice(0, n); },
      };
      return query;
    },
    insert() { throw new Error('copilot must not persist'); },
    update() { throw new Error('copilot must not persist'); },
    delete() { throw new Error('copilot must not persist'); },
  };
  const modules = {
    'cloudflare:workers': { env },
    'drizzle-orm': { eq: (key, value) => row => row[key] === value, and: (...parts) => row => parts.every(fn => fn(row)) },
    '../../../../cloudflare-access-auth': { getCloudflareAccessUser: async () => actor },
    '../../../../../db': { getDb: () => db },
    '../../../../../db/schema': { siteProjects: table, copilotWorkingDrafts: table },
    '../../../../../lib/copilot-context.mjs': { buildCopilotContext },
    '../../../../../lib/intake-copilot.mjs': copilot,
    '../../../../../lib/intake-copilot-provider.mjs': { requestIntakeSuggestions },
    '../../../../../lib/copilot-rollout.mjs': { isCopilotProjectAllowed },
    '../../../../../lib/copilot-consent': { currentCopilotConsent: async () => ({ granted: consentGranted }) },
  };
  const source = await readFile('app/api/projects/[projectId]/copilot/route.ts', 'utf8');
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const exports = {};
  vm.runInNewContext(code, { exports, require: name => {
    assert.ok(modules[name], `unknown import ${name}`);
    return modules[name];
  }, Response, URL, TextDecoder });
  const post = (body, options = {}) => exports.POST(new Request('https://agentfriendlyweb.dev/api/projects/owned/copilot', {
    method: 'POST',
    headers: { origin: 'https://agentfriendlyweb.dev', 'content-type': 'application/json', ...options.headers },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  }), { params: Promise.resolve({ projectId: options.projectId || 'owned' }) });
  return {
    env, rows, post,
    actor(value) { actor = value; },
    rate(value) { allowed = value; },
    consent(value) { consentGranted = value; },
    counts() { return { inferenceCalls, rateCalls }; },
  };
}

const safe = { locale: 'es', notes: 'Museo Sur utiliza WordPress.', processingConsentVersion: 'afw-copilot-processing-v1' };

test('private copilot requires a durable active consent for the owned dossier', async () => {
  const h = await harness();
  h.consent(false);
  const response = await h.post(safe);
  assert.equal(response.status, 403);
  assert.equal((await response.json()).code, 'project_consent_required');
  assert.deepEqual(h.counts(), { inferenceCalls: 0, rateCalls: 0 });
});

test('private copilot requires explicit versioned processing consent before rate limit or inference', async () => {
  const h = await harness();
  assert.equal((await h.post({ locale: 'es', notes: safe.notes })).status, 400);
  assert.equal((await h.post({ ...safe, processingConsentVersion: false })).status, 400);
  assert.equal((await h.post({ ...safe, processingConsentVersion: 'old-version' })).status, 400);
  assert.deepEqual(h.counts(), { inferenceCalls: 0, rateCalls: 0 });
});

test('private copilot rejects unauthenticated access before D1 or inference', async () => {
  const h = await harness();
  h.actor(null);
  assert.equal((await h.post(safe)).status, 401);
  assert.deepEqual(h.counts(), { inferenceCalls: 0, rateCalls: 0 });
});

test('private copilot is closed when the feature flag is off', async () => {
  const h = await harness();
  h.env.AFW_COPILOT_ENABLED = 'false';
  assert.equal((await h.post(safe)).status, 503);
  assert.deepEqual(h.counts(), { inferenceCalls: 0, rateCalls: 0 });
});

test('private copilot requires an exact rollout project before any inference', async () => {
  const h = await harness();
  h.env.AFW_COPILOT_PROJECT_ID = '';
  assert.equal((await h.post(safe)).status, 503);
  h.env.AFW_COPILOT_PROJECT_ID = 'other';
  assert.equal((await h.post(safe)).status, 404);
  assert.deepEqual(h.counts(), { inferenceCalls: 0, rateCalls: 0 });
});

test('private copilot rejects cross-origin and non-JSON requests', async () => {
  const h = await harness();
  assert.equal((await h.post(safe, { headers: { origin: 'https://elsewhere.example' } })).status, 403);
  assert.equal((await h.post(safe, { headers: { 'content-type': 'text/plain' } })).status, 403);
  assert.deepEqual(h.counts(), { inferenceCalls: 0, rateCalls: 0 });
});

test('private copilot only uses a dossier owned by the authenticated actor', async () => {
  const h = await harness();
  h.actor({ userId: 'owner-b' });
  assert.equal((await h.post(safe)).status, 404);
  assert.deepEqual(h.counts(), { inferenceCalls: 0, rateCalls: 0 });
});

test('private copilot rejects sensitive, malformed and oversized input before inference', async () => {
  const h = await harness();
  assert.equal((await h.post({ locale: 'es', notes: 'password del sitio: abcdef' })).status, 400);
  assert.equal((await h.post('{')).status, 400);
  assert.equal((await h.post({ locale: 'es', notes: 'A'.repeat(12001) })).status, 413);
  assert.deepEqual(h.counts(), { inferenceCalls: 0, rateCalls: 0 });
});

test('private copilot bounds UTF-8 request bytes before inference', async () => {
  const h = await harness();
  const notes = '文'.repeat(5000);
  const response = await h.post({ locale: 'es', notes });
  assert.equal(response.status, 413);
  assert.deepEqual(h.counts(), { inferenceCalls: 0, rateCalls: 0 });
});

test('private copilot rate-limits before model use and never writes automatically', async () => {
  const h = await harness();
  h.rate(false);
  const limited = await h.post(safe);
  assert.equal(limited.status, 429);
  assert.equal(limited.headers.get('retry-after'), '60');
  assert.deepEqual(h.counts(), { inferenceCalls: 0, rateCalls: 1 });
  h.rate(true);
  const response = await h.post(safe);
  assert.equal(response.status, 200);
  const result = await response.json();
  assert.equal(result.autonomousWrite, false);
  assert.equal(result.persistence, 'none');
  assert.equal(result.suggestions[0].field, 'cms');
  assert.deepEqual(h.counts(), { inferenceCalls: 1, rateCalls: 2 });
  assert.deepEqual(h.rows, [{ id: 'owned', userId: 'owner-a' }]);
});
