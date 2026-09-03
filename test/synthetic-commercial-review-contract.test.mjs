import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);

async function read(path) {
  return readFile(new URL(path, root), 'utf8');
}

test('synthetic commercial review contract records the verified private read-only gate', async () => {
  const contract = JSON.parse(await read('public/.well-known/synthetic-commercial-review-contract.json'));

  assert.equal(contract.contract, 'agent-friendly-web.synthetic-commercial-review.v1');
  assert.equal(contract.status, 'synthetic_commercial_review_verified_kill_switch_off');
  assert.equal(contract.scope.environment, 'afw_canary');
  assert.equal(contract.scope.public_production_modified, false);
  assert.equal(contract.scope.tokenizart_resources_used, false);
  assert.equal(contract.capabilities.reads_one_synthetic_contact, true);
  assert.equal(contract.capabilities.plans_crm_transition, true);
  assert.equal(contract.capabilities.persists_crm, false);
  assert.equal(contract.capabilities.sends_email, false);
  assert.equal(contract.accepts_request_parameters, false);
  assert.equal(contract.requires_cloudflare_access, true);
  assert.equal(contract.kill_switch_default, 'off');
});

test('Gate 6D.1 documentation records the synthetic-only and no-action boundary', async () => {
  const [gate, remoteGate, remoteEvidence, growth, company] = await Promise.all([
    read('docs/BLOCK-6D1-SYNTHETIC-COMMERCIAL-REVIEW-LOCAL-2026-09-03.md'),
    read('docs/BLOCK-6D1-SYNTHETIC-COMMERCIAL-REVIEW-REMOTE-2026-09-03.md'),
    read('docs/evidence/synthetic-commercial-review-remote-2026-09-03.json'),
    read('docs/GROWTH-AND-MONETIZATION-ROADMAP-2026-08-31.md'),
    read('docs/COMPANY-BUILDING-AND-CAPITAL-ROADMAP-2026-09-02.md'),
  ]);

  for (const document of [gate, remoteGate, growth, company]) {
    assert.match(document, /Gate 6D\.1/i);
    assert.match(document, /planned_not_persisted/);
  }
  assert.match(gate, /no envia correos/i);
  assert.match(gate, /no crea propuestas/i);
  assert.match(gate, /no cobra pagos/i);
  assert.match(gate, /node --test test\/synthetic-commercial-review\.test\.mjs/);

  const evidence = JSON.parse(remoteEvidence);
  assert.equal(evidence.status, 'synthetic_commercial_review_verified_kill_switch_off');
  assert.equal(evidence.database.rows_written_before, 0);
  assert.equal(evidence.database.rows_written_after, 0);
  assert.deepEqual(evidence.database.counts_before, evidence.database.counts_after);
  assert.equal(evidence.rollback.kill_switch_enabled, false);
  assert.equal(evidence.public_production.modified, false);
  assert.equal(evidence.security.tokenizart_resources_used, false);
});
