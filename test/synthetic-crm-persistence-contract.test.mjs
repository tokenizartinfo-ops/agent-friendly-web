import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root), 'utf8');

test('Gate 6D.2 contract declares a synthetic-only persistence gate disabled remotely', async () => {
  const contract = JSON.parse(await read('public/.well-known/synthetic-crm-persistence-contract.json'));
  assert.equal(contract.contract, 'agent-friendly-web.synthetic-crm-persistence.v1');
  assert.equal(contract.status, 'local_ready_remote_disabled');
  assert.equal(contract.scope.environment, 'afw_canary');
  assert.equal(contract.scope.public_production_modified, false);
  assert.equal(contract.scope.tokenizart_resources_used, false);
  assert.equal(contract.source.accepts_real_contacts, false);
  assert.equal(contract.capabilities.persists_one_synthetic_opportunity, true);
  assert.equal(contract.capabilities.sends_email, false);
  assert.equal(contract.capabilities.creates_proposal, false);
  assert.equal(contract.capabilities.charges_payment, false);
  assert.equal(contract.kill_switch_default, 'off');
});

test('Gate 6D.2 documentation and config preserve the synthetic boundary', async () => {
  const [gate, config, growth, company] = await Promise.all([
    read('docs/BLOCK-6D2-SYNTHETIC-CRM-PERSISTENCE-LOCAL-2026-09-03.md'),
    read('wrangler.jsonc'),
    read('docs/GROWTH-AND-MONETIZATION-ROADMAP-2026-08-31.md'),
    read('docs/COMPANY-BUILDING-AND-CAPITAL-ROADMAP-2026-09-02.md'),
  ]);
  for (const document of [gate, growth, company]) assert.match(document, /Gate 6D\.2/i);
  assert.match(gate, /no envia correos/i);
  assert.match(gate, /no crea propuestas/i);
  assert.match(gate, /no cobra pagos/i);
  const parsed = JSON.parse(config);
  assert.equal(parsed.vars.AFW_SYNTHETIC_CRM_PERSISTENCE_ENABLED, 'false');
  assert.equal(parsed.env.canary.vars.AFW_SYNTHETIC_CRM_PERSISTENCE_ENABLED, 'false');
  assert.equal(parsed.env.production.vars.AFW_SYNTHETIC_CRM_PERSISTENCE_ENABLED, 'false');
});
