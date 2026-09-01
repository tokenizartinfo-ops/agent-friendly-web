import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);

async function read(path) {
  return readFile(new URL(path, root), 'utf8');
}

test('CRM Lite contract reports a local planner rather than an active CRM', async () => {
  const contract = JSON.parse(await read('public/.well-known/crm-lite-contract.json'));
  assert.equal(contract.contract, 'agent-friendly-web.crm-lite.v1');
  assert.equal(contract.status, 'local_planning_only');
  assert.deepEqual(contract.pipeline, [
    'new',
    'qualified',
    'discovery',
    'proposal',
    'approved',
    'delivery',
    'verified',
    'won',
    'lost',
  ]);
  assert.equal(contract.capabilities.metadata_normalization, true);
  assert.equal(contract.capabilities.transition_planning, true);
  assert.equal(contract.capabilities.remote_persistence, false);
  assert.equal(contract.capabilities.automatic_scoring, false);
  assert.equal(contract.capabilities.email_actions, false);
  assert.equal(contract.capabilities.proposal_actions, false);
  assert.equal(contract.capabilities.payment_actions, false);
  assert.equal(contract.accepts_pii, false);
  assert.equal(contract.requires_separate_remote_approval, true);
  assert.ok(contract.blocked_actions.includes('persist_opportunity'));
  assert.ok(contract.blocked_actions.includes('modify_customer_site'));
});

test('Gate 6D documentation records privacy, transition and remote boundaries', async () => {
  const [gate, growth, agentRoadmap] = await Promise.all([
    read('docs/BLOCK-6D-CRM-LITE-LOCAL-GATE-2026-08-31.md'),
    read('docs/GROWTH-AND-MONETIZATION-ROADMAP-2026-08-31.md'),
    read('docs/AGENT-NATIVE-DISCOVERY-ROADMAP-2026-08-26.md'),
  ]);

  for (const document of [gate, growth, agentRoadmap]) {
    assert.match(document, /local_planning_only/);
    assert.match(document, /aprobacion separada/i);
  }
  assert.match(gate, /no copia emails, cuerpos ni credenciales/i);
  assert.match(gate, /node --test test\/crm-lite\.test\.mjs/);
  assert.match(growth, /Gate 6D - Ventas y CRM ligero/);
  assert.match(agentRoadmap, /Gate 6D - ventas y CRM ligero/);
});
