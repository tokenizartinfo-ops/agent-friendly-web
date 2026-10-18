import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { setTimeout as delay } from 'node:timers/promises';
import ts from 'typescript';
import * as responses from '../lib/project-save-response.mjs';
import { createProjectSaveAttempt } from '../lib/project-save-attempt.mjs';
import { createIntakeRehearsal } from '../lib/intake-workspace-rehearsal.mjs';
import { normalizeIntake } from '../lib/intake.mjs';
import { reconcileSavedDraft } from '../lib/project-save-reconciliation.mjs';

// Exercise the actual component callback; only React state and the network boundary
// are supplied by the harness. No copied implementation of save/error handling.
function componentSave(request, project) {
  const source = ts.createSourceFile('intake-workspace.tsx', readFileSync('app/components/intake-workspace.tsx', 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  let callback;
  function find(node) {
    if (ts.isVariableDeclaration(node) && node.name.getText(source) === 'saveReviewedDraft') callback = node.initializer.arguments[0];
    ts.forEachChild(node, find);
  }
  find(source);
  assert.ok(callback, 'The form save callback must be exercised');
  const draft = normalizeIntake(project);
  const state = { draft, busy: false, status: 'idle', paused: false, message: '', sessionRequired: false };
  const lock = { current: false };
  const bindings = {
    Error, ready: { current: true }, manualLock: lock, conflictReview: null, data: draft,
    sourceHints: { current: {} }, projectId: project.id, savedRevision: { current: project.revision },
    savedBase: { current: draft }, saveAttempt: createProjectSaveAttempt(), request, locale: 'es', rehearsal: null,
    readProjectSaveResponse: responses.readProjectSaveResponse,
    saveProjectDraft: (...args) => responses.saveProjectDraft(...args, { timeoutMs: 20 }),
    intakeFromProject: normalizeIntake, reconcileSavedDraft,
    localizedMessage: (_locale, es) => es,
    setManualBusy: value => { state.busy = value; }, setStatus: value => { state.status = value; },
    setAutosavePaused: value => { state.paused = value; }, setMessage: value => { state.message = value; },
    setSessionRequired: value => { state.sessionRequired = value; },
    setData: value => { state.draft = typeof value === 'function' ? value(state.draft) : value; },
    setSavedSnapshot() {}, setScopeRevision() {}, setProjectId() {}, setSavedWebsite() {}, setRoadmap() {},
  };
  const code = ts.transpileModule(`(${callback.getText(source)})`, { compilerOptions: { target: ts.ScriptTarget.ES2022 } }).outputText;
  return { save: vm.runInNewContext(code, bindings), state, lock };
}

test('an unconfirmed form write releases saving, preserves the draft and never acknowledges a late reply', async () => {
  const transport = createIntakeRehearsal({ versioned: true });
  const original = (await (await transport.request('/api/projects')).json()).project;
  const project = { ...original, organization: 'Guardado interrumpido' };
  let release, writes = 0, observedSignal;
  const h = componentSave(async (url, init) => {
    writes++; observedSignal = init.signal;
    const response = await transport.request(url, init); // Server committed, ACK remains unconfirmed.
    return new Promise(resolve => { release = () => resolve(response); });
  }, project);
  const saving = h.save();
  try {
    const unsettled = Symbol('still saving');
    const result = await Promise.race([saving, delay(150).then(() => unsettled)]);
    assert.equal(result, false, 'A lost acknowledgement must return control instead of holding the save lock');
    assert.equal(h.state.busy, false);
    assert.equal(h.lock.current, false);
    assert.equal(h.state.status, 'error');
    assert.equal(h.state.paused, true);
    assert.match(h.state.message, /No recibimos la confirmación/);
    assert.equal(h.state.draft.organization, project.organization);
    assert.equal(observedSignal.aborted, true);
    assert.equal(writes, 1, 'No automatic retry of an uncertain mutation');
    release();
    await delay(10);
    assert.equal(h.state.status, 'error', 'Late acknowledgement must not mark the current form saved');
  } finally {
    release?.();
    await saving;
  }
});

test('a manual retry recovers a committed write with the same key and revision, without an automatic retry', async () => {
  const transport = createIntakeRehearsal({ versioned: true });
  const original = (await (await transport.request('/api/projects')).json()).project;
  const requests = [];
  let release;
  const h = componentSave(async (url, init) => {
    requests.push(init);
    const response = await transport.request(url, init);
    if (requests.length === 1) return new Promise(resolve => { release = () => resolve(response); });
    assert.equal((await response.clone().json()).replayed, true);
    return response;
  }, { ...original, organization: 'Una sola revisión' });
  assert.equal(await h.save(), false);
  assert.equal(requests.length, 1);
  assert.equal(await h.save(), true); // A second user action, not an automatic retry.
  assert.equal(requests.length, 2);
  assert.equal(requests[0].body, requests[1].body);
  assert.equal(requests[0].headers['idempotency-key'], requests[1].headers['idempotency-key']);
  assert.equal(requests[1].redirect, 'manual');
  assert.equal(h.state.status, 'saved');
  assert.equal((await (await transport.request('/api/projects')).json()).project.revision, original.revision + 1);
  release();
  await delay(10);
  assert.equal(h.state.status, 'saved');
  assert.equal(requests.length, 2);
});

test('the same deadline covers a stalled JSON body after successful response headers', async () => {
  let releaseBody, observedSignal;
  const response = new Response(new ReadableStream({ start(controller) {
    releaseBody = () => { controller.enqueue(new TextEncoder().encode('{"project":{"id":"demo"}}')); controller.close(); };
  } }), { headers: { 'content-type': 'application/json' } });
  try {
    await assert.rejects(responses.saveProjectDraft(async (_url, init) => {
      observedSignal = init.signal;
      return response;
    }, createProjectSaveAttempt().prepare({ website: 'https://example.invalid' }), { timeoutMs: 20 }), /response_lost/);
    assert.equal(observedSignal.aborted, true);
  } finally { releaseBody(); }
});

test('network failure, session recovery and permission errors preserve their distinct outcomes', async () => {
  const attempt = createProjectSaveAttempt().prepare({ website: 'https://example.invalid' });
  await assert.rejects(responses.saveProjectDraft(async () => { throw new TypeError('Network failed'); }, attempt), /response_lost/);
  const session = await responses.saveProjectDraft(async () => ({ status: 401 }), attempt);
  assert.equal(session.parsed.sessionRequired, true);
  const denied = await responses.saveProjectDraft(async () => Response.json({ error: 'forbidden' }, { status: 403 }), attempt);
  assert.equal(denied.response.status, 403);
  assert.deepEqual(denied.parsed.payload, { error: 'forbidden' });
  await assert.rejects(responses.saveProjectDraft(async () => new Response('login', { headers: { 'content-type': 'text/html' } }), attempt), /invalid_save_response/);
});

test('a completed save clears its timer and invalid budgets never send a write', async () => {
  let observedSignal, writes = 0;
  const request = async (_url, init) => { writes++; observedSignal = init.signal; return Response.json({ project: { id: 'demo' } }); };
  const attempt = createProjectSaveAttempt().prepare({ website: 'https://example.invalid' });
  assert.equal((await responses.saveProjectDraft(request, attempt, { timeoutMs: 20 })).parsed.payload.project.id, 'demo');
  await delay(35);
  assert.equal(observedSignal.aborted, false);
  for (const timeoutMs of [0, -1, Infinity, 15_001]) {
    await assert.rejects(responses.saveProjectDraft(request, attempt, { timeoutMs }), /invalid_save_timeout/);
  }
  assert.equal(writes, 1);
});
