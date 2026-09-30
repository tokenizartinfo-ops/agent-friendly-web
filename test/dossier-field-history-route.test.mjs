import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import ts from 'typescript';
import { latestDossierFieldHistory } from '../lib/dossier-field-history.mjs';

async function routeHarness() {
  let user = { userId: 'owner-a' };
  let eventReads = 0;
  const projects = [{ id: 'owned', userId: 'owner-a' }];
  const events = [{ projectId: 'owned', userId: 'owner-a', type: 'project_updated',
    createdAt: '2026-09-30T12:00:00Z', payloadJson: JSON.stringify({ revision: 2, changedFields: ['cms'], secret: 'private' }) }];
  const siteProjects = new Proxy({}, { get: (_, key) => key });
  const projectEvents = new Proxy({}, { get: (_, key) => key });
  const db = { select(selection) {
    const isEvents = Object.hasOwn(selection, 'payloadJson');
    let predicate = () => true;
    const query = { from: () => query, where: rule => { predicate = rule; return query; }, orderBy: () => query,
      limit: async n => { if (isEvents) eventReads++; return (isEvents ? events : projects).filter(predicate).slice(0, n); } };
    return query;
  } };
  const modules = {
    'drizzle-orm': { eq: (field, value) => row => row[field] === value, and: (...rules) => row => rules.every(rule => rule(row)), desc: value => value },
    '../../../../cloudflare-access-auth': { getCloudflareAccessUser: async () => user },
    '../../../../../db': { getDb: () => db },
    '../../../../../db/schema': { siteProjects, projectEvents },
    '../../../../../lib/dossier-field-history.mjs': { latestDossierFieldHistory },
  };
  const source = await readFile('app/api/projects/[projectId]/field-history/route.ts', 'utf8');
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const exports = {};
  vm.runInNewContext(code, { exports, require: name => { assert.ok(modules[name], `unknown import ${name}`); return modules[name]; }, Response });
  return { get: projectId => exports.GET(new Request(`https://agentfriendlyweb.dev/api/projects/${projectId}/field-history`),
    { params: Promise.resolve({ projectId }) }), setUser: value => { user = value; }, eventReads: () => eventReads };
}

test('field history is private and reads no events for another project', async () => {
  const h = await routeHarness();
  h.setUser(null);
  assert.equal((await h.get('owned')).status, 401);
  h.setUser({ userId: 'owner-b' });
  assert.equal((await h.get('owned')).status, 404);
  assert.equal(h.eventReads(), 0);
});

test('field history returns bounded metadata without private values', async () => {
  const h = await routeHarness();
  const response = await h.get('owned');
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.deepEqual(await response.json(), { fields: { cms: { revision: 2, savedAt: '2026-09-30T12:00:00Z' } } });
  assert.equal(h.eventReads(), 1);
});
