import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('Gate 6D.3 contract declares a private synthetic read-only board disabled remotely', async () => {
  const contract = JSON.parse(await readFile(
    new URL('../public/.well-known/synthetic-crm-readonly-contract.json', import.meta.url),
    'utf8',
  ));
  assert.equal(contract.contract, 'agent-friendly-web.synthetic-crm-readonly.v1');
  assert.equal(contract.status, 'local_ready_remote_disabled');
  assert.equal(contract.scope.environment, 'afw_canary');
  assert.equal(contract.scope.public_production_modified, false);
  assert.equal(contract.scope.tokenizart_resources_used, false);
  assert.equal(contract.capabilities.reads_synthetic_opportunity, true);
  assert.equal(contract.capabilities.persists_data, false);
  assert.equal(contract.capabilities.changes_stage, false);
  assert.equal(contract.capabilities.sends_email, false);
  assert.equal(contract.capabilities.creates_proposal, false);
  assert.equal(contract.capabilities.charges_payment, false);
  assert.equal(contract.kill_switch_default, 'off');
});
