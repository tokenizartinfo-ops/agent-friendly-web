import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('Gate 6D.3 contract records the verified private read-only board with its kill switch off', async () => {
  const contract = JSON.parse(await readFile(
    new URL('../public/.well-known/synthetic-crm-readonly-contract.json', import.meta.url),
    'utf8',
  ));
  assert.equal(contract.contract, 'agent-friendly-web.synthetic-crm-readonly.v1');
  assert.equal(contract.status, 'synthetic_crm_readonly_verified_kill_switch_off');
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

test('Gate 6D.3 evidence records the remote read, unchanged D1 counts and final rollback', async () => {
  const evidence = JSON.parse(await readFile(
    new URL('../public/.well-known/synthetic-crm-readonly-evidence.json', import.meta.url),
    'utf8',
  ));
  assert.equal(evidence.contract, 'agent-friendly-web.synthetic-crm-readonly-evidence.v1');
  assert.equal(evidence.status, 'synthetic_crm_readonly_verified_kill_switch_off');
  assert.equal(evidence.scope.environment, 'afw_canary');
  assert.equal(evidence.scope.public_production_modified, false);
  assert.equal(evidence.scope.tokenizart_resources_used, false);
  assert.equal(evidence.execution.authenticated_page_http, 200);
  assert.equal(evidence.execution.api_status, 'synthetic_crm_readonly_ready');
  assert.equal(evidence.d1.before.crm_opportunities, 1);
  assert.equal(evidence.d1.before.crm_transition_events, 1);
  assert.equal(evidence.d1.final.crm_opportunities, 1);
  assert.equal(evidence.d1.final.crm_transition_events, 1);
  assert.equal(evidence.d1.rows_written, 0);
  assert.equal(evidence.final.worker_flag, 'off');
  assert.equal(evidence.final.real_contact_used, false);
  assert.equal(evidence.final.email_sent, false);
  assert.equal(evidence.final.proposal_created, false);
  assert.equal(evidence.final.payment_charged, false);
  assert.equal(evidence.final.customer_site_modified, false);
});
