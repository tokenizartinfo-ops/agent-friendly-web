import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { setTimeout as delay } from 'node:timers/promises';
import ts from 'typescript';
import * as working from '../lib/copilot-working-draft.mjs';
import { emptyCopilotSession } from '../lib/copilot-session.mjs';

const source = ts.createSourceFile('copilot.tsx', readFileSync('app/components/intake-intelligent-copilot.tsx', 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
let saveCallback, readEffect;
function find(node) {
  if (ts.isVariableDeclaration(node) && node.name.getText(source) === 'saveWorkingNow') saveCallback = node.initializer.arguments[0];
  if (ts.isCallExpression(node) && node.expression.getText(source) === 'useEffect' && node.arguments[1]?.getText(source).includes('workingRetry')) readEffect = node.arguments[0];
  ts.forEachChild(node, find);
}
find(source);
assert.ok(saveCallback); assert.ok(readEffect);

// Real component callbacks; React setters and the network are the boundaries.
function harness(fetch, mode = 'ready', options = {}) {
  const session = emptyCopilotSession();
  const state = { mode, notes: options.notes ?? 'Tenemos una librería de barrio.', saved: null, conflict: null };
  const inFlight = { current: null };
  const currentNotes = { current: state.notes };
  const bindings = {
    Error, DOMException, AbortController, crypto, JSON, fetch,
    requestCopilotWorkingDraft: (projectId, init) => working.requestCopilotWorkingDraft(projectId, init, { request: fetch, timeoutMs: 20 }),
    workingInFlight: inFlight, workingState: mode, workingDirty: true,
    workingEdited: { current: options.edited ?? true },
    projectId: 'synthetic-own', locale: 'es', notes: state.notes, session,
    workingSaved: options.saved ?? { text: '', revision: 0, session }, currentNotes,
    currentSession: { current: session }, emptyCopilotSession,
    validateCopilotWorkingDraft: working.validateCopilotWorkingDraft,
    setWorkingState: value => { state.mode = value; },
    setWorkingSaved: value => { state.saved = value; },
    setWorkingConflict: value => { state.conflict = value; },
    setNotes: value => { state.notes = value; }, setSession() {},
    setNotesState: value => { state.notes = value; }, setSessionState() {},
  };
  const compile = callback => vm.runInNewContext(ts.transpileModule(`(${callback.getText(source)})`, { compilerOptions: { target: ts.ScriptTarget.ES2022 } }).outputText, bindings);
  return { save: compile(saveCallback), read: compile(readEffect), state, inFlight, currentNotes };
}

test('an unconfirmed working-account write releases its in-flight lock without losing notes or accepting a late ACK', async () => {
  let release, signal, writes = 0;
  const h = harness(async (_url, init) => {
    writes++; signal = init.signal;
    return new Promise(resolve => { release = () => resolve(Response.json({ draft: { text: 'Tenemos una librería de barrio.', revision: 1, session: emptyCopilotSession() } })); });
  });
  const saving = h.save();
  try {
    const pending = Symbol('still waiting');
    assert.equal(await Promise.race([saving, delay(150).then(() => pending)]), false, 'An unconfirmed working save must return control');
    assert.equal(h.inFlight.current, null);
    assert.equal(h.state.mode, 'error');
    assert.equal(h.state.notes, 'Tenemos una librería de barrio.');
    assert.equal(h.state.saved, null);
    assert.equal(signal.aborted, true);
    assert.equal(writes, 1);
    release(); await delay(10);
    assert.equal(h.state.mode, 'error');
    assert.equal(h.state.saved, null);
  } finally { release?.(); await saving; }
});

test('a stalled working-account read offers recovery and a cancelled effect cannot replace notes later', async () => {
  let release;
  const h = harness(async () => new Promise(resolve => {
    release = () => resolve(Response.json({ draft: { text: 'Relato remoto', revision: 3, session: emptyCopilotSession() } }));
  }), 'loading');
  const cleanup = h.read();
  try {
    await delay(150);
    assert.equal(h.state.mode, 'error', 'An unanswered read must stop displaying loading');
    assert.equal(h.state.notes, 'Tenemos una librería de barrio.');
    assert.equal(h.state.saved, null);
  } finally { cleanup(); release?.(); await delay(10); }
  assert.equal(h.state.notes, 'Tenemos una librería de barrio.');
  assert.equal(h.state.saved, null);
});

test('recovery reads the committed notes and decisions without retrying the uncertain write', async () => {
  let stored, release;
  const methods = [];
  const h = harness(async (_url, init) => {
    methods.push(init.method || 'GET');
    if (init.method === 'PUT') {
      const input = JSON.parse(init.body);
      stored = { text: input.text, session: input.session, revision: 1 };
      return new Promise(resolve => { release = () => resolve(Response.json({ draft: stored })); });
    }
    return Response.json({ draft: stored });
  });
  assert.equal(await h.save(), false);
  assert.equal(h.state.mode, 'error');
  const cleanup = h.read();
  try {
    await delay(10);
    assert.equal(h.state.mode, 'ready');
    assert.equal(h.state.saved.revision, 1);
    assert.equal(h.state.notes, stored.text);
    assert.deepEqual(h.state.saved.session, stored.session);
    assert.deepEqual(methods, ['PUT', 'GET']);
    release(); await delay(10);
    assert.equal(h.state.saved.revision, 1);
    assert.deepEqual(methods, ['PUT', 'GET']);
  } finally { cleanup(); release?.(); }
});

test('a recovery read detects a newer local account without replacing it or sending another write', async () => {
  const h = harness(async (_url, init) => {
    assert.notEqual(init.method, 'PUT');
    return Response.json({ draft: { text: 'Relato guardado anterior', revision: 2, session: emptyCopilotSession() } });
  }, 'loading');
  const cleanup = h.read();
  try {
    await delay(10);
    assert.equal(h.state.mode, 'conflict');
    assert.equal(h.state.notes, 'Tenemos una librería de barrio.');
    assert.equal(h.state.conflict.text, 'Relato guardado anterior');
  } finally { cleanup(); }
});

test('effect cleanup suppresses a late network failure as well as a late response', async () => {
  let fail;
  const h = harness(async () => new Promise((_resolve, reject) => { fail = reject; }), 'loading');
  const cleanup = h.read();
  cleanup();
  fail(new TypeError('late connection failure'));
  await delay(35);
  assert.equal(h.state.mode, 'loading');
  assert.equal(h.state.saved, null);
  assert.equal(h.state.notes, 'Tenemos una librería de barrio.');
});

test('headers and a blocked JSON body share one bounded request', async () => {
  let finish, signal;
  const response = new Response(new ReadableStream({ start(controller) {
    finish = () => { controller.enqueue(new TextEncoder().encode('{"draft":{"text":"","revision":0}}')); controller.close(); };
  } }), { headers: { 'content-type': 'application/json' } });
  let calls = 0;
  try {
    await assert.rejects(working.requestCopilotWorkingDraft('synthetic-own', {}, { request: async (_url, init) => {
      calls++; signal = init.signal; return response;
    }, timeoutMs: 20 }), /working_draft_unconfirmed/);
    assert.equal(signal.aborted, true);
    assert.equal(calls, 1);
  } finally { finish(); }
});

test('session redirects and invalid responses cannot become a recovered draft; conflicts remain distinct', async () => {
  const send = response => working.requestCopilotWorkingDraft('synthetic-own', {}, { request: async () => response });
  for (const response of [{ status: 401 }, { status: 302 }, { type: 'opaqueredirect', status: 0 }]) {
    await assert.rejects(send(response), /working_draft_session_required/);
  }
  await assert.rejects(send(new Response('<html>login</html>', { headers: { 'content-type': 'text/html' } })), /invalid_working_draft_response/);
  await assert.rejects(send(Response.json([])), /invalid_working_draft_response/);
  const h = harness(async () => Response.json({ draft: { text: 'Otra versión', revision: 4, session: emptyCopilotSession() } }, { status: 409 }));
  assert.equal(await h.save(), false);
  assert.equal(h.state.mode, 'conflict');
  assert.equal(h.state.saved, null);
  assert.equal(h.state.notes, 'Tenemos una librería de barrio.');
});

test('successful reads remove their abort listener and timer; invalid scopes do not send requests', async () => {
  const parent = new AbortController();
  let signal, calls = 0;
  const request = async (url, init) => {
    calls++; signal = init.signal;
    assert.equal(url, '/api/projects/synthetic-own/copilot/working-draft');
    assert.equal(init.cache, 'no-store'); assert.equal(init.redirect, 'manual');
    return Response.json({ draft: { text: '', revision: 0 } });
  };
  await working.requestCopilotWorkingDraft('synthetic-own', { signal: parent.signal }, { request, timeoutMs: 20 });
  parent.abort(); await delay(35);
  assert.equal(signal.aborted, false);
  for (const projectId of ['../foreign', 'https://other.invalid', '', 'a'.repeat(201)]) {
    await assert.rejects(working.requestCopilotWorkingDraft(projectId, {}, { request }), /invalid_working_draft_request/);
  }
  await assert.rejects(working.requestCopilotWorkingDraft('synthetic-own', { method: 'DELETE' }, { request }), /invalid_working_draft_request/);
  await assert.rejects(working.requestCopilotWorkingDraft('synthetic-own', {}, { request, timeoutMs: 0 }), /invalid_working_draft_request/);
  await assert.rejects(working.requestCopilotWorkingDraft('synthetic-own', { signal: parent.signal }, { request }), /working_draft_cancelled/);
  assert.equal(calls, 1);
});

test('clearing notes, losing the acknowledgement and recovering an older record never silently restores deleted text', async () => {
  const saved = { text: 'Relato que quiero borrar', revision: 2, session: emptyCopilotSession() };
  let release;
  const methods = [];
  const h = harness(async (_url, init) => {
    methods.push(init.method || 'GET');
    if (init.method === 'PUT') return new Promise(resolve => { release = () => resolve(Response.json({ draft: saved })); });
    return Response.json({ draft: saved });
  }, 'ready', { notes: '', edited: true, saved });
  assert.equal(await h.save(), false);
  const cleanup = h.read();
  try {
    await delay(10);
    assert.equal(h.state.mode, 'conflict', 'An intentionally empty edit must be reviewed, not mistaken for initial hydration');
    assert.equal(h.state.notes, '');
    assert.equal(h.currentNotes.current, '');
    assert.equal(h.state.conflict.text, saved.text);
    assert.deepEqual(methods, ['PUT', 'GET']);
  } finally { cleanup(); release?.(); }
});

test('an untouched initial load still restores saved notes and conversation decisions', async () => {
  const saved = { text: 'Contexto para continuar', revision: 2, session: emptyCopilotSession() };
  const h = harness(async () => Response.json({ draft: saved }), 'loading', { notes: '', edited: false });
  const cleanup = h.read();
  try {
    await delay(10);
    assert.equal(h.state.mode, 'ready');
    assert.equal(h.state.notes, saved.text);
    assert.equal(h.state.saved.revision, 2);
    assert.equal(h.state.conflict, null);
  } finally { cleanup(); }
});
