import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, writeFile, rm, realpath } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { buildPublicationCapsule, capsuleState } from '../lib/publication-capsule.mjs';

// No target, credentials, arbitrary input or real approvals accepted by this rehearsal.
const scenario = process.argv[2];
assert.equal(process.argv.length, 3);
assert(['interrupted', 'missing-provider', 'expired'].includes(scenario));
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
const started = performance.now();
const receipt = {
  contract: 'agentfriendly.assisted-delivery-rehearsal.v1',
  scenario, recordedAt: new Date().toISOString(), syntheticOnly: true,
  remoteMutation: false, identityVerified: false, httpTested: false,
  publicationAttempted: false, status: 'blocked', files: [], steps: [],
  metrics: { humanActiveMs: null, providerWaitMs: null, llmCostUsd: null, totalExecutionMs: null },
  limits: ['Synthetic approvals only; no identity or provider verified',
    'Local filesystem only, no browser, WordPress, HTTP or CDN in this run',
    'No live intake, audio transcription, email, customer, billing or deployment',
    'No production recovery adapter; no concurrent writers or power-loss guarantee']
};
const timed = async (name, work) => {
  const start = performance.now();
  try { return await work(); }
  finally { receipt.steps.push({ name, elapsedMs: Math.round((performance.now() - start) * 1000) / 1000 }); }
};
let root, parent;
try {
  const capsule = await timed('prepare_capsule', () => buildPublicationCapsule({
    capsuleId: 'synthetic-delivery-001', projectId: 'synthetic-project-001', siteId: 'synthetic-site-001',
    version: 1, canonicalOrigin: 'https://restaurant.example', organization: 'Restaurante Ficticio',
    siteType: 'restaurant', audience: 'Visitantes del restaurante ficticio',
    goals: ['discovery', 'content'], languages: ['es', 'en', 'pt'],
    selectedResources: ['llms', 'llms_full'], maintainerRequired: true,
    ownerRef: 'synthetic:owner', maintainerRef: 'synthetic:provider',
    createdAt: '2026-09-11T10:00:00.000Z', expiresAt: '2026-09-12T10:00:00.000Z'
  }));
  receipt.manifestSha256 = capsule.integrity.manifestSha256;
  receipt.files = capsule.files.map(file => ({ path: file.destinationPath, approvedSha256: file.sha256,
    status: 'prepared', beforeSha256: null, interruptedSha256: null, finalSha256: null }));
  receipt.gate = await timed('simulated_approvals', () => capsuleState({
    requiredRoles: capsule.approvals.requiredRoles,
    approvals: (scenario === 'missing-provider' ? ['owner'] : ['owner', 'maintainer'])
      .map(role => ({ role, decision: 'approved' })),
    expiresAt: capsule.expiresAt,
    now: scenario === 'expired' ? '2026-09-13T10:00:00.000Z' : '2026-09-11T11:00:00.000Z'
  }));
  if (receipt.gate === 'approved_for_manual_handoff') {
    await timed('prepare_local_fixture', async () => {
      parent = await realpath(tmpdir());
      root = await mkdtemp(join(parent, 'afw-recovery-fixture-'));
      await mkdir(join(root, 'public'));
      await mkdir(join(root, 'approved'));
      await writeFile(join(root, 'fixture.json'), JSON.stringify({ syntheticOnly: true }), { flag: 'wx' });
      for (const [i, file] of capsule.files.entries()) {
        const name = file.destinationPath.slice(1);
        assert(['llms.txt', 'llms-full.txt'].includes(name));
        const before = Buffer.from(`# Original synthetic ${name}\r\n`);
        assert.equal(sha(Buffer.from(file.content)), file.sha256);
        await writeFile(join(root, 'public', name), before, { flag: 'wx' });
        await writeFile(join(root, 'approved', name), file.content, { flag: 'wx' });
        receipt.files[i].beforeSha256 = sha(before);
      }
    });
    const worker = fileURLToPath(new URL('../test/fixtures/delivery-recovery-worker.mjs', import.meta.url));
    const run = mode => spawnSync(process.execPath, [worker, root, mode], {
      encoding: 'utf8', timeout: 5000, maxBuffer: 65536,
      env: { SystemRoot: process.env.SystemRoot, TMP: tmpdir(), TEMP: tmpdir(), TMPDIR: tmpdir() }
    });
    await timed('partial_publication', async () => {
      receipt.publicationAttempted = true;
      assert.equal(run('interrupt').status, 86);
      for (const file of receipt.files) file.interruptedSha256 = sha(await readFile(join(root, 'public', file.path.slice(1))));
      assert.equal(receipt.files[0].interruptedSha256, receipt.files[0].approvedSha256);
      assert.equal(receipt.files[1].interruptedSha256, receipt.files[1].beforeSha256);
      receipt.partialUpdateObserved = true;
    });
    await timed('recover_and_verify', async () => {
      const result = run('recover');
      assert.equal(result.status, 0);
      const recovery = JSON.parse(result.stdout);
      assert.equal(recovery.status, 'restored');
      for (const [i, file] of receipt.files.entries()) {
        file.finalSha256 = sha(await readFile(join(root, 'public', file.path.slice(1))));
        assert.equal(file.finalSha256, file.beforeSha256);
        file.status = recovery.files[i].status;
      }
      receipt.status = 'restored';
    });
  }
} catch {
  receipt.status = 'failed'; process.exitCode = 1;
} finally {
  receipt.cleanupVerified = false;
  if (root) {
    assert.equal(dirname(root), parent);
    assert(basename(root).startsWith('afw-recovery-fixture-'));
    await timed('cleanup', () => rm(root, { recursive: true }));
  }
  receipt.cleanupVerified = true;
  receipt.metrics.totalExecutionMs = Math.round((performance.now() - started) * 1000) / 1000;
}
console.log(JSON.stringify(receipt, null, 2));
