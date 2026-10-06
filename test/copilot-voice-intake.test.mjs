import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import ts from 'typescript';
import { createCopilotResponseGuard } from '../lib/copilot-response-guard.mjs';
import { validateVoiceUpload, reviewVoiceTranscript, appendVoiceSegment } from '../lib/intake-copilot-audio.mjs';

test('audio input is bounded and accepts only recorded browser media', () => {
  assert.equal(validateVoiceUpload('audio/webm;codecs=opus', 150_000).ok, true);
  assert.equal(validateVoiceUpload('audio/mp4', 150_000).ok, true);
  assert.equal(validateVoiceUpload('application/octet-stream', 150_000).ok, false);
  assert.equal(validateVoiceUpload('audio/webm', 0).ok, false);
  assert.equal(validateVoiceUpload('audio/webm', 2_000_001).ok, false);
});

test('transcript is provisional and never persists or applies fields', () => {
  const result = reviewVoiceTranscript({ text: 'Queremos que visitantes encuentren horarios.' }, 'es');
  assert.deepEqual(result, { contract: 'intake-copilot-audio.v1', text: 'Queremos que visitantes encuentren horarios.', persistence: 'none', autonomousWrite: false });
  assert.equal(reviewVoiceTranscript({ text: 'password abc' }, 'es').code, 'sensitive_input');
  assert.equal(reviewVoiceTranscript({ text: '  ' }, 'es').code, 'empty_transcript');
  assert.equal(reviewVoiceTranscript({ text: 'x'.repeat(5001) }, 'es').code, 'transcript_too_large');
});

test('confirmed voice segments append to the editable account without overflow', () => {
  assert.equal(appendVoiceSegment('Somos Museo Faro.', 'Queremos publicar horarios.'), 'Somos Museo Faro.\nQueremos publicar horarios.');
  assert.equal(appendVoiceSegment('', '  Visitantes encuentran horarios.  '), 'Visitantes encuentran horarios.');
  assert.equal(appendVoiceSegment('x'.repeat(5000), 'otro'), null);
});

test('audio route shares the exact project gate, ownership, durable consent and rate limit', async () => {
  const route = await readFile('app/api/projects/[projectId]/copilot/audio/route.ts', 'utf8');
  for (const marker of ['getCloudflareAccessUser', 'isCopilotProjectAllowed', 'siteProjects.userId', 'currentCopilotConsent', 'COPILOT_RATE_LIMIT', 'x-afw-processing-consent', 'validateVoiceUpload', 'reviewVoiceTranscript']) assert.match(route, new RegExp(marker));
  assert.doesNotMatch(route, /\.insert\(|\.update\(/);
});

test('audio route refuses unauthorized or oversized uploads before inference and returns only reviewed text', async () => {
  let actor = { userId: 'owner-a' };
  let consent = true;
  let calls = 0;
  const env = { DB: { withSession(mode) { assert.equal(mode, 'first-primary'); return this; }, prepare() { return { bind() { return { async first() { return { revision: 3, sequence: 1, action: consent ? 'grant' : 'revoke', consent_version: 'afw-copilot-processing-v1' }; } }; } }; } }, AFW_COPILOT_ENABLED: 'true', AFW_COPILOT_PROJECT_ID: 'owned',
    COPILOT_RATE_LIMIT: { limit: async () => ({ success: true }) },
    AI: { run: async (model, input) => { calls++; assert.equal(model, '@cf/openai/whisper-large-v3-turbo'); assert.equal(input.task, 'transcribe'); return { text: 'Queremos que visitantes encuentren horarios.' }; } },
  };
  const table = new Proxy({}, { get: (_, key) => key });
  const db = { select() { let predicate = () => true; const q = { from: () => q, where(fn) { predicate = fn; return q; }, async limit() { return [{ id: 'owned', userId: 'owner-a', revision: 3 }].filter(predicate); } }; return q; }, insert() { throw Error('write'); }, update() { throw Error('write'); } };
  const modules = {
    'cloudflare:workers': { env }, 'drizzle-orm': { eq: (key, value) => row => row[key] === value, and: (...parts) => row => parts.every(fn => fn(row)) },
    '../../../../../cloudflare-access-auth': { getCloudflareAccessUser: async () => actor },
    '../../../../../../db': { getDb: () => db }, '../../../../../../db/schema': { siteProjects: table },
    '../../../../../../lib/copilot-response-guard.mjs': { createCopilotResponseGuard },
    '../../../../../../lib/copilot-consent': { currentCopilotConsent: async () => ({ granted: consent }) },
    '../../../../../../lib/copilot-rollout.mjs': { isCopilotProjectAllowed: ({ enabled, allowedProjectId, projectId }) => enabled && allowedProjectId === projectId },
    '../../../../../../lib/intake-copilot-audio.mjs': await import('../lib/intake-copilot-audio.mjs'),
  };
  const source = await readFile('app/api/projects/[projectId]/copilot/audio/route.ts', 'utf8');
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const exports = {};
  vm.runInNewContext(code, { exports, require: name => { assert.ok(modules[name], name); return modules[name]; }, Response, URL, btoa });
  const post = (body = Buffer.from('fictional audio'), headers = {}) => exports.POST(new Request('https://agentfriendlyweb.dev/api/projects/owned/copilot/audio', { method: 'POST', body, headers: { origin: 'https://agentfriendlyweb.dev', 'content-type': 'audio/webm', 'x-afw-locale': 'es', 'x-afw-processing-consent': 'afw-copilot-processing-v1', ...headers } }), { params: Promise.resolve({ projectId: 'owned' }) });
  actor = null; assert.equal((await post()).status, 401);
  actor = { userId: 'owner-a' }; consent = false; assert.equal((await post()).status, 403);
  consent = true; assert.equal((await post(Buffer.from('audio'), { origin: 'https://other.example' })).status, 403);
  assert.equal((await post(Buffer.from('audio'), { 'content-type': 'text/plain' })).status, 400);
  assert.equal((await post(Buffer.from('audio'), { 'x-afw-processing-consent': '' })).status, 400);
  assert.equal((await post(Buffer.alloc(2_000_001))).status, 413);
  assert.equal(calls, 0);
  const response = await post();
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { contract: 'intake-copilot-audio.v1', text: 'Queremos que visitantes encuentren horarios.', persistence: 'none', autonomousWrite: false });
  assert.equal(calls, 1);
  env.AI.run = async () => { consent = false; return { text: 'This must be discarded.' }; };
  const revoked = await post();
  assert.equal(revoked.status, 403);
  assert.equal((await revoked.json()).code, 'project_consent_required');
});

test('voice UI requires separate send and transcript review before existing copilot proposals', async () => {
  const ui = await readFile('app/components/intake-intelligent-copilot.tsx', 'utf8');
  for (const marker of ['MediaRecorder', 'getUserMedia', 'copilot/audio', 'appendVoiceSegment', 'transcriptDraft', 'processingConsent']) assert.match(ui, new RegExp(marker));
});
