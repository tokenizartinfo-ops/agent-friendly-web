import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import test from 'node:test';

import {
  CAPSULE_DECISION_CONTRACT,
  PUBLICATION_CAPSULE_CONTRACT,
  buildPublicationCapsule,
  capsuleState,
  validateCapsuleDecision,
} from '../lib/publication-capsule.mjs';

const baseInput = {
  capsuleId: 'capsule-123',
  projectId: 'project-123',
  siteId: 'site-123',
  version: 2,
  canonicalOrigin: 'https://museo.example',
  organization: 'Museo Ejemplo',
  siteType: 'museum',
  audience: 'Coleccionistas e investigadores',
  goals: ['discovery', 'content'],
  languages: ['Español', 'Ingles'],
  selectedResources: ['llms', 'llms_full', 'robots', 'sitemap', 'jsonld', 'openapi', 'mcp', 'skills'],
  crawlerSearchPolicy: 'allow',
  crawlerTrainingPolicy: 'reserve',
  ownerRef: 'user:owner-123',
  maintainerRequired: true,
  maintainerRef: 'email-sha256:abc123',
  createdAt: '2026-08-28T12:00:00.000Z',
  expiresAt: '2026-09-04T12:00:00.000Z',
};

test('publication capsule generation is deterministic and includes only allowlisted files', () => {
  const first = buildPublicationCapsule(baseInput);
  const second = buildPublicationCapsule(baseInput);

  assert.deepEqual(first, second);
  assert.equal(first.contract, PUBLICATION_CAPSULE_CONTRACT);
  assert.equal(first.mode, 'manual_handoff');
  assert.equal(first.status, 'owner_approval_pending');
  assert.deepEqual(first.approvals.requiredRoles, ['owner', 'maintainer']);
  assert.deepEqual(
    first.files.map((file) => [file.packagePath, file.destinationPath, file.operation]),
    [
      ['files/llms.txt', '/llms.txt', 'create_or_replace'],
      ['files/llms-full.txt', '/llms-full.txt', 'create_or_replace'],
      ['proposals/robots.agent-friendly-snippet.txt', '/robots.txt', 'manual_merge'],
      ['proposals/sitemap.agent-friendly-entries.xml', '/sitemap.xml', 'manual_merge'],
      ['proposals/organization.jsonld', '/', 'manual_embed'],
    ],
  );

  for (const file of first.files) {
    assert.match(file.sha256, /^[a-f0-9]{64}$/);
    assert.equal(file.bytes, Buffer.byteLength(file.content, 'utf8'));
    assert.ok(file.content.length > 0);
    assert.ok(file.packagePath.startsWith('files/') || file.packagePath.startsWith('proposals/'));
  }
  assert.match(first.integrity.manifestSha256, /^[a-f0-9]{64}$/);
  assert.match(first.integrity.checksumsSha256, /^[a-f0-9]{64}$/);
  assert.match(first.idempotencyKey, /^[a-f0-9]{64}$/);
  assert.equal(first.checksums.split('\n').filter(Boolean).length, first.files.length);
});

test('publication capsule never fabricates tools that require a real implementation', () => {
  const capsule = buildPublicationCapsule(baseInput);

  assert.deepEqual(
    capsule.unsupportedResources.map((resource) => resource.id),
    ['openapi', 'mcp', 'skills'],
  );
  assert.ok(capsule.unsupportedResources.every((resource) => /real|verificable|contrato/i.test(resource.reason)));
  assert.equal(capsule.files.some((file) => /openapi|mcp|skill/i.test(file.packagePath)), false);
});

test('generated discovery files describe declarations without claiming a pending approval', () => {
  const capsule = buildPublicationCapsule(baseInput);
  assert.equal(capsule.approvals.owner, 'pending');
  for (const path of ['files/llms.txt', 'files/llms-full.txt']) {
    const {content} = capsule.files.find(file => file.packagePath === path);
    assert.doesNotMatch(content, /datos aprobados|owner.approved|verified declarations/i);
    assert.match(content, /declarad[oa]s/i);
    assert.match(content, /revision y (?:la )?decision de publicacion[\s\S]*por separado/i);
  }
});

test('discovery lists generated resources separately from requested tools not implemented by the capsule', () => {
  const capsule = buildPublicationCapsule(baseInput);
  const {content} = capsule.files.find(file => file.packagePath === 'files/llms-full.txt');
  const prepared = content.match(/## Recursos de descubrimiento preparados en esta capsula\n([\s\S]*?)(?=\n## |$)/)?.[1];
  assert.ok(prepared, 'the proposed-resource section must exist');
  assert.deepEqual([...prepared.matchAll(/^- `([^`]+)`$/gm)].map(match => match[1]), ['llms', 'llms_full', 'robots', 'sitemap', 'jsonld']);
  const unsupported = content.match(/## Recursos solicitados que esta capsula no implementa\n([\s\S]*?)(?=\n## |$)/)?.[1];
  assert.ok(unsupported, 'requested tools must have a distinct unimplemented section');
  assert.deepEqual([...unsupported.matchAll(/^- `([^`]+)`$/gm)].map(match => match[1]), ['openapi', 'mcp', 'skills']);
  assert.match(unsupported, /no acredita.*disponibilidad/i);
});

test('a discovery-only capsule has no unimplemented tools section and hashes bind the delivered bytes', () => {
  const capsule = buildPublicationCapsule({...baseInput, selectedResources: ['llms_full', 'llms']});
  const {content} = capsule.files.find(file => file.packagePath === 'files/llms-full.txt');
  assert.doesNotMatch(content, /## Recursos solicitados que esta capsula no implementa/);
  for (const file of capsule.files) {
    const digest = createHash('sha256').update(file.content).digest('hex');
    assert.equal(file.sha256, digest);
    assert.equal(capsule.manifest.files.find(item => item.packagePath === file.packagePath).sha256, digest);
    assert.ok(capsule.checksums.includes(`${digest}  ${file.packagePath}\n`));
  }
});

test('robots and sitemap remain manual integrations instead of destructive replacements', () => {
  const capsule = buildPublicationCapsule(baseInput);
  const robots = capsule.files.find((file) => file.destinationPath === '/robots.txt');
  const sitemap = capsule.files.find((file) => file.destinationPath === '/sitemap.xml');

  assert.equal(robots.operation, 'manual_merge');
  assert.match(robots.content, /GPTBot[\s\S]*Disallow: \/|Disallow: \/[\s\S]*GPTBot/);
  assert.match(robots.content, /OAI-SearchBot/);
  assert.equal(sitemap.operation, 'manual_merge');
  assert.match(sitemap.content, /https:\/\/museo\.example\/llms\.txt/);
});

test('capsule rejects missing generable resources, unsafe origins and probable secrets', () => {
  assert.throws(
    () => buildPublicationCapsule({ ...baseInput, selectedResources: ['openapi', 'mcp'] }),
    /no generable resources/i,
  );
  assert.throws(
    () => buildPublicationCapsule({ ...baseInput, canonicalOrigin: 'http://127.0.0.1:8787' }),
    /public HTTPS origin/i,
  );
  assert.throws(
    () => buildPublicationCapsule({ ...baseInput, organization: 'password=do-not-package-this' }),
    /probable secret/i,
  );
});

test('capsule state requires each applicable role and fails closed on rejection or expiry', () => {
  const requiredRoles = ['owner', 'maintainer'];
  const expiresAt = '2026-09-04T12:00:00.000Z';

  assert.equal(capsuleState({ requiredRoles, approvals: [], expiresAt, now: '2026-08-28T12:00:00.000Z' }), 'owner_approval_pending');
  assert.equal(capsuleState({
    requiredRoles,
    approvals: [{ role: 'owner', decision: 'approved' }],
    expiresAt,
    now: '2026-08-28T12:00:00.000Z',
  }), 'maintainer_approval_pending');
  assert.equal(capsuleState({
    requiredRoles,
    approvals: [{ role: 'owner', decision: 'approved' }, { role: 'maintainer', decision: 'approved' }],
    expiresAt,
    now: '2026-08-28T12:00:00.000Z',
  }), 'approved_for_manual_handoff');
  assert.equal(capsuleState({
    requiredRoles,
    approvals: [{ role: 'owner', decision: 'rejected' }],
    expiresAt,
    now: '2026-08-28T12:00:00.000Z',
  }), 'rejected');
  assert.equal(capsuleState({ requiredRoles, approvals: [], expiresAt, now: expiresAt }), 'expired');
});

test('capsule decisions bind role, manifest and idempotency without trusting arbitrary input', () => {
  const decision = validateCapsuleDecision({
    contract: 'agentfriendly.capsule-decision.v1',
    decision: 'approved',
    manifestSha256: 'a'.repeat(64),
    idempotencyKey: 'review-owner-v1',
    note: 'Contenido revisado.',
  });

  assert.deepEqual(decision, {
    contract: 'agentfriendly.capsule-decision.v1',
    decision: 'approved',
    manifestSha256: 'a'.repeat(64),
    idempotencyKey: 'review-owner-v1',
    note: 'Contenido revisado.',
  });
  assert.equal('role' in decision, false);
  assert.throws(() => validateCapsuleDecision({ ...decision, manifestSha256: 'bad' }), /manifest hash/i);
  assert.throws(() => validateCapsuleDecision({ ...decision, decision: 'apply' }), /decision/i);
});

test('capsule decisions reject probable secrets in human notes', () => {
  assert.throws(
    () => validateCapsuleDecision({
      contract: CAPSULE_DECISION_CONTRACT,
      decision: 'approved',
      manifestSha256: 'a'.repeat(64),
      idempotencyKey: 'decision:secret-note:1234',
      note: 'password=super-secret-value',
    }),
    /must not contain credentials/i,
  );
});
