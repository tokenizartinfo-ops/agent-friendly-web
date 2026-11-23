import { createHash } from 'node:crypto';
import { once } from 'node:events';
import { createServer } from 'node:http';
import { performance } from 'node:perf_hooks';
import assert from 'node:assert/strict';
import test from 'node:test';
import { reviewCopilotOutput } from '../lib/intake-copilot.mjs';
import { reviewedGoalProposal } from '../lib/copilot-goal-contract.mjs';
import { applyIntakeDraft, previewIntakeDraft } from '../lib/intake-draft-review.mjs';
import { createIntakeRehearsal } from '../lib/intake-workspace-rehearsal.mjs';
import { planCopilotNextTurn } from '../lib/copilot-next-turn.mjs';
import { deliveryInstructions } from '../lib/delivery-instructions.mjs';
import {
  buildPublicationCapsule, CAPSULE_DECISION_CONTRACT, capsuleState, validateCapsuleDecision,
} from '../lib/publication-capsule.mjs';
import { compareCapsuleOrigin } from '../lib/origin-comparison.mjs';

test('social-first business rehearses a website it can own and verify', async (t) => {
  const rehearsal = createIntakeRehearsal({ versioned: true });
  const url = '/api/projects';
  const timings = {};
  let stageStart = performance.now();
  const finish = stage => {
    const end = performance.now();
    timings[stage] = Math.round(end - stageStart);
    stageStart = end;
  };

  const { project } = await (await rehearsal.request(url)).json();
  const site = {
    ...project, organization: 'Taller Ejemplo', website: 'https://taller.example',
    audience: 'Personas que necesitan reparar una bicicleta', goals: [], contentSources: [], control: 'provider',
  };
  const notes = 'Vendemos por redes y queremos explicar mejor nuestros servicios.';
  const reviewed = reviewCopilotOutput({
    suggestions: [], goalEvidence: { mode: 'explain', sourceExcerpt: 'explicar mejor nuestros servicios' },
  }, notes);
  assert.equal(planCopilotNextTurn(site, reviewed).field, 'goals');
  const goal = reviewedGoalProposal({ goalGuidance: reviewed.goalGuidance, currentGoals: site.goals });
  const draft = applyIntakeDraft(site, previewIntakeDraft(site, { suggestions: [goal] }, ['goals']));
  assert.deepEqual(site.goals, []);
  assert.deepEqual(draft.goals, ['content']);
  assert.equal(planCopilotNextTurn(draft).field, 'contentSources');
  const save = await rehearsal.request(url, {
    method: 'PUT', body: JSON.stringify({ ...draft, contentSources: ['services', 'faq'] }),
  });
  assert.equal(save.status, 200);
  const { project: saved } = await (await rehearsal.request(url)).json();
  assert.equal(saved.revision, project.revision + 1);
  assert.deepEqual(saved.contentSources, ['services', 'faq']);
  assert.equal(planCopilotNextTurn(saved).actionId, 'review_scope');
  finish('guideSaveReloadMs');

  // A fictitious social bio is out of date. The simulated owner confirms the correction.
  const socialLocation = 'Barrio Ejemplo';
  const confirmedLocation = 'Villa Ejemplo';
  assert.notEqual(socialLocation, confirmedLocation);
  const facts = ['Reparamos bicicletas urbanas', 'Atendemos en ' + confirmedLocation];
  const previous = Buffer.from('<h1>Taller Ejemplo</h1>');
  const homepage = Buffer.from('<h1>Taller Ejemplo</h1>' + facts.map(fact => '<p>' + fact + '</p>').join('')
    + '<a href="/contacto">Pedir turno</a>');
  const contact = Buffer.from('<h1>Contacto</h1><p>Solicitá un turno por mensaje privado en nuestro perfil ficticio.</p>');
  const pages = new Map([['/', homepage], ['/contacto', contact]]);
  const files = new Map([['/', previous]]);
  const server = createServer((request, response) => {
    const bytes = files.get(request.url);
    if (!bytes) return response.writeHead(404).end();
    response.writeHead(200, { 'content-type': request.url.endsWith('.txt') ? 'text/plain; charset=utf-8' : 'text/html; charset=utf-8' }).end(bytes);
  });
  server.listen(0, '127.0.0.1');
  t.after(() => new Promise(resolve => {
    server.closeAllConnections();
    server.close(resolve);
  }));
  await once(server, 'listening');
  const local = 'http://127.0.0.1:' + server.address().port;
  const read = async path => {
    const response = await fetch(local + path, { redirect: 'error', signal: AbortSignal.timeout(5000) });
    const bodyBytes = Buffer.from(await response.arrayBuffer());
    return { status: response.status, body: bodyBytes.toString('utf8'), bodyBytes,
      contentType: response.headers.get('content-type'), truncated: false };
  };
  const baseline = await read('/');
  for (const fact of facts) assert.equal(baseline.body.includes(fact), false);
  assert.equal((await read('/contacto')).status, 404);
  finish('baselineMs');

  const capsule = buildPublicationCapsule({
    capsuleId: 'social-first-demo', projectId: saved.id, siteId: 'taller-demo', version: 1,
    canonicalOrigin: saved.website, organization: saved.organization, audience: saved.audience,
    goals: saved.goals, languages: saved.languages, selectedResources: ['llms', 'llms_full'],
    ownerRef: 'fixture-owner', maintainerRequired: true, maintainerRef: 'fixture-maintainer',
    createdAt: '2026-11-23T15:00:00Z', expiresAt: '2026-11-24T15:00:00Z',
  });
  assert.equal(capsule.manifest.projectRef, saved.id);
  assert.equal(capsule.manifest.target.origin, 'https://taller.example');
  const guide = deliveryInstructions({ capability: 'maintainer', locale: 'es' });
  assert.equal(guide.method, 'maintainer_handoff');
  assert.equal(guide.publishes, false);
  assert.deepEqual(guide.steps.slice(-5).map(step => step.id), ['backup', 'review', 'install', 'verify', 'rollback']);
  const compare = () => compareCapsuleOrigin(capsule, {
    observedAt: '2026-11-23T15:10:00Z',
    fetchLimitedPublicUrl: async url => {
      const target = new URL(url);
      assert.equal(target.origin, capsule.manifest.target.origin);
      assert.ok(['/llms.txt', '/llms-full.txt'].includes(target.pathname));
      return read(target.pathname);
    },
  });
  assert.ok((await compare()).resources.every(resource => resource.status === 'missing'));
  const hash = bytes => createHash('sha256').update(bytes).digest('hex');
  const packageBytes = new Map(pages);
  for (const file of capsule.files) packageBytes.set(file.destinationPath, Buffer.from(file.content, 'utf8'));

  // The test-only handoff identifies the reviewed website pages and the same AFW manifest.
  const handoffId = contents => hash(JSON.stringify({
    project: saved.id, revision: saved.revision, origin: capsule.manifest.target.origin,
    capsule: capsule.integrity.manifestSha256,
    destinations: Array.from(contents, ([path, bytes]) => [path, hash(bytes)]),
  }));
  const reviewedHandoff = handoffId(packageBytes);
  const approvals = [];
  const handoffApprovals = new Map();
  const state = () => capsuleState({
    requiredRoles: capsule.manifest.approvals.requiredRoles, approvals,
    expiresAt: capsule.expiresAt, now: '2026-11-23T15:05:00Z',
  });
  assert.equal(state(), 'owner_approval_pending');
  for (const role of ['owner', 'maintainer']) {
    const decision = validateCapsuleDecision({
      contract: CAPSULE_DECISION_CONTRACT, decision: 'approved',
      manifestSha256: capsule.integrity.manifestSha256, idempotencyKey: 'fixture-approval-' + role,
    });
    assert.equal(decision.manifestSha256, capsule.integrity.manifestSha256);
    approvals.push({ ...decision, role });
    handoffApprovals.set(role, reviewedHandoff);
    if (role === 'owner') assert.equal(state(), 'maintainer_approval_pending');
  }
  assert.equal(state(), 'approved_for_manual_handoff');
  finish('prepareAndApproveMs');

  const install = contents => {
    for (const role of capsule.manifest.approvals.requiredRoles) {
      assert.equal(handoffApprovals.get(role), handoffId(contents), 'Handoff changed after review');
    }
    for (const [path, bytes] of contents) files.set(path, bytes);
  };
  assert.throws(() => install(new Map(packageBytes).set('/', Buffer.from('unreviewed'))), /Handoff changed/);
  assert.deepEqual((await read('/')).bodyBytes, previous);
  install(packageBytes);
  const after = await compare();
  assert.equal(after.manifestSha256, capsule.integrity.manifestSha256);
  assert.equal(after.limits.remoteMutation, false);
  for (const result of after.resources) {
    assert.equal(result.status, 'unchanged');
    assert.equal(result.currentSha256, capsule.files.find(file => file.destinationPath === result.destinationPath).sha256);
  }
  const installed = await read('/');
  assert.deepEqual(installed.bodyBytes, homepage);
  assert.ok(installed.body.includes('href="/contacto"'));
  const contactReadback = await read('/contacto');
  assert.equal(contactReadback.status, 200);
  assert.deepEqual(contactReadback.bodyBytes, contact);
  assert.equal(installed.body.includes(socialLocation), false);
  for (const fact of facts) assert.ok(installed.body.includes(fact));
  for (const file of capsule.files) {
    // Today the capsule carries declared metadata. The pages need their own semantic review.
    assert.equal(file.content.includes(facts[0]), false);
  }
  finish('installAndVerifyMs');

  files.set('/', previous);
  files.delete('/contacto');
  for (const file of capsule.files) files.delete(file.destinationPath);
  assert.deepEqual((await read('/')).bodyBytes, previous);
  assert.equal((await read('/contacto')).status, 404);
  assert.ok((await compare()).resources.every(resource => resource.status === 'missing'));
  finish('rollbackAndVerifyMs');
  t.diagnostic(JSON.stringify({
    sourceRevision: saved.revision, capsuleVersion: capsule.version, checkedFacts: facts.length,
    verifiedPages: pages.size, reviewedHandoff,
    verifiedFiles: after.resources.length, localRunnerTimings: timings, humanTime: null,
    semanticFactsInCapsule: false, customerPublication: false,
  }));
});
