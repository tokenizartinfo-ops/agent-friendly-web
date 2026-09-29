import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import ts from 'typescript';
import { isCopilotProjectAllowed } from '../lib/copilot-rollout.mjs';

const VERSION = 'afw-copilot-processing-v1';
const KEY = 'f03ad766-d14e-4d22-ae18-23a098f63f20';

async function harness() {
  let actor = { userId: 'owner-a' };
  let nextSequence = 0;
  const projects = [{ id: 'owned', userId: 'owner-a' }];
  const events = [];
  const env = { AFW_COPILOT_ENABLED: 'true', AFW_COPILOT_PROJECT_ID: 'owned' };
  const projectTable = new Proxy({ name: 'project' }, { get: (target, key) => key in target ? target[key] : key });
  const eventTable = new Proxy({ name: 'event' }, { get: (target, key) => key in target ? target[key] : key });
  const db = {
    select() {
      let table;
      let predicate = () => true;
      const query = {
        from(value) { table = value; return query; },
        where(value) { predicate = value; return query; },
        async limit(n) { return (table === projectTable ? projects : events).filter(predicate).slice(0, n); },
      };
      return query;
    },
    insert(table) {
      assert.equal(table, eventTable);
      let row;
      return { values(value) { row = value; return { async onConflictDoNothing() {
        if (!events.some(item => item.projectId === row.projectId && item.idempotencyKey === row.idempotencyKey)) {
          events.push({ ...row, sequence: ++nextSequence });
        }
      } }; } };
    },
  };
  const modules = {
    'cloudflare:workers': { env },
    'drizzle-orm': { eq: (key, value) => row => row[key] === value, and: (...parts) => row => parts.every(fn => fn(row)) },
    '../../../../cloudflare-access-auth': { getCloudflareAccessUser: async () => actor },
    '../../../../../db': { getDb: () => db },
    '../../../../../db/schema': { siteProjects: projectTable, copilotConsentEvents: eventTable },
    '../../../../../lib/copilot-consent': {
      COPILOT_CONSENT_VERSION: VERSION,
      currentCopilotConsent: async (projectId, userId) => {
        const latest = events.filter(item => item.projectId === projectId && item.userId === userId).at(-1);
        return { granted: latest?.action === 'grant' && latest.consentVersion === VERSION, updatedAt: latest?.createdAt ?? null };
      },
    },
    '../../../../../lib/copilot-rollout.mjs': { isCopilotProjectAllowed },
  };
  const source = await readFile('app/api/projects/[projectId]/copilot-consent/route.ts', 'utf8');
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const exports = {};
  vm.runInNewContext(code, { exports, require: name => { assert.ok(modules[name], `unknown import ${name}`); return modules[name]; }, Response, URL, TextDecoder, Date });
  const request = (method, body, options = {}) => {
    const url = 'https://agentfriendlyweb.dev/api/projects/owned/copilot-consent';
    const input = new Request(url, method === 'POST' ? {
      method, headers: { origin: 'https://agentfriendlyweb.dev', 'content-type': 'application/json', ...options.headers },
      body: typeof body === 'string' ? body : JSON.stringify(body),
    } : { method });
    return exports[method](input, { params: Promise.resolve({ projectId: options.projectId || 'owned' }) });
  };
  return { env, events, request, actor(value) { actor = value; } };
}

test('project consent is private, exact-project and closed by rollout flag', async () => {
  const h = await harness();
  h.actor(null);
  assert.equal((await h.request('GET')).status, 401);
  h.actor({ userId: 'owner-b' });
  assert.equal((await h.request('GET')).status, 404);
  h.actor({ userId: 'owner-a' });
  assert.equal((await h.request('GET', null, { projectId: 'other' })).status, 404);
  h.env.AFW_COPILOT_ENABLED = 'false';
  assert.equal((await h.request('GET')).status, 503);
  assert.equal(h.events.length, 0);
});

test('project consent validates origin, version and bounded JSON before persistence', async () => {
  const h = await harness();
  const body = { action: 'grant', consentVersion: VERSION, idempotencyKey: KEY };
  assert.equal((await h.request('POST', body, { headers: { origin: 'https://elsewhere.example' } })).status, 403);
  assert.equal((await h.request('POST', { ...body, consentVersion: 'old' })).status, 400);
  assert.equal((await h.request('POST', { ...body, idempotencyKey: 'invalid' })).status, 400);
  assert.equal((await h.request('POST', 'a'.repeat(1025))).status, 413);
  assert.equal(h.events.length, 0);
});

test('grant, duplicate retry and revoke leave the latest durable decision effective', async () => {
  const h = await harness();
  assert.equal((await (await h.request('GET')).json()).granted, false);
  const grant = { action: 'grant', consentVersion: VERSION, idempotencyKey: KEY };
  assert.equal((await (await h.request('POST', grant)).json()).granted, true);
  assert.equal((await (await h.request('POST', grant)).json()).granted, true);
  assert.equal(h.events.length, 1);
  assert.equal((await h.request('POST', { ...grant, action: 'revoke' })).status, 409);
  const revoke = { ...grant, action: 'revoke', idempotencyKey: '6d3659b1-e4e3-4135-9b9d-de54dc70f543' };
  assert.equal((await (await h.request('POST', revoke)).json()).granted, false);
  assert.deepEqual(h.events.map(item => item.action), ['grant', 'revoke']);
  assert.deepEqual(h.events.map(item => item.sequence), [1, 2]);
});
