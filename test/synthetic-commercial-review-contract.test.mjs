import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);

async function read(path) {
  return readFile(new URL(path, root), 'utf8');
}

test('synthetic commercial review contract declares a private read-only local gate', async () => {
  const contract = JSON.parse(await read('public/.well-known/synthetic-commercial-review-contract.json'));

  assert.equal(contract.contract, 'agent-friendly-web.synthetic-commercial-review.v1');
  assert.equal(contract.status, 'local_ready_remote_disabled');
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
  const [gate, growth, company] = await Promise.all([
    read('docs/BLOCK-6D1-SYNTHETIC-COMMERCIAL-REVIEW-LOCAL-2026-09-03.md'),
    read('docs/GROWTH-AND-MONETIZATION-ROADMAP-2026-08-31.md'),
    read('docs/COMPANY-BUILDING-AND-CAPITAL-ROADMAP-2026-09-02.md'),
  ]);

  for (const document of [gate, growth, company]) {
    assert.match(document, /Gate 6D\.1/i);
    assert.match(document, /planned_not_persisted/);
  }
  assert.match(gate, /no envia correos/i);
  assert.match(gate, /no crea propuestas/i);
  assert.match(gate, /no cobra pagos/i);
  assert.match(gate, /node --test test\/synthetic-commercial-review\.test\.mjs/);
});
