import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);

async function read(path) {
  return readFile(new URL(path, root), 'utf8');
}

test('Traction F1 contract exposes a local planner rather than an active sales service', async () => {
  const contract = JSON.parse(await read('public/.well-known/traction-f1-contract.json'));

  assert.equal(contract.contract, 'agent-friendly-web.traction-f1.v1');
  assert.equal(contract.status, 'local_planning_only');
  assert.deepEqual(contract.signals, [
    'pain',
    'responsible',
    'access',
    'evidence',
    'urgency',
    'budget',
  ]);
  assert.deepEqual(contract.score_bands, [
    { minimum: 8, maximum: 12, qualification: 'prepare_diagnostic', recommended_offer: 'discovery_pack' },
    { minimum: 5, maximum: 7, qualification: 'nurture_and_clarify', recommended_offer: 'guided_diagnostic' },
    { minimum: 0, maximum: 4, qualification: 'not_ready', recommended_offer: 'public_audit' },
  ]);
  assert.equal(contract.capabilities.deterministic_scoring_from_human_inputs, true);
  assert.equal(contract.capabilities.remote_persistence, false);
  assert.equal(contract.capabilities.automatic_outreach, false);
  assert.equal(contract.capabilities.proposal_actions, false);
  assert.equal(contract.capabilities.pricing_actions, false);
  assert.equal(contract.capabilities.payment_actions, false);
  assert.equal(contract.accepts_pii, false);
  assert.equal(contract.requires_human_review, true);
  assert.equal(contract.requires_separate_remote_approval, true);
  assert.deepEqual(contract.delivery_model.standardizable, ['af0_to_af3']);
  assert.deepEqual(contract.delivery_model.custom, ['af4', 'af5']);
  assert.ok(contract.delivery_model.custom_requires.includes('pdr'));
  assert.ok(contract.delivery_model.custom_requires.includes('custom_quote'));
  assert.ok(contract.delivery_model.custom_requires.includes('rollback_plan'));
  assert.ok(contract.blocked_actions.includes('publish_price'));
  assert.ok(contract.blocked_actions.includes('charge_payment'));
});

test('Gate 6A.1 documentation records launch pricing and remote boundaries', async () => {
  const [gate, growth, sales, agentRoadmap] = await Promise.all([
    read('docs/BLOCK-6A1-TRACTION-F1-LOCAL-GATE-2026-09-02.md'),
    read('docs/GROWTH-AND-MONETIZATION-ROADMAP-2026-08-31.md'),
    read('docs/INITIAL-GO-TO-MARKET-AND-SALES-MOTION-V1.md'),
    read('docs/AGENT-NATIVE-DISCOVERY-ROADMAP-2026-08-26.md'),
  ]);

  for (const document of [gate, growth, sales, agentRoadmap]) {
    assert.match(document, /Gate 6A\.1/);
    assert.match(document, /local_planning_only/);
    assert.match(document, /aprobacion separada/i);
  }
  assert.match(gate, /node --test test\/traction-f1\.test\.mjs/);
  assert.match(sales, /primeros cinco sitios o 30 dias/i);
  assert.match(sales, /USD 198/);
  assert.match(sales, /USD 99/);
  assert.match(sales, /no constituye una tarifa publica activa/i);
  assert.match(sales, /dos horas y media/i);
  assert.match(sales, /Experimento comercial de 30 dias/);
  assert.match(sales, /AF-0 a AF-3[\s\S]*estandarizar/i);
  assert.match(sales, /AF-4 y AF-5[\s\S]*PDR[\s\S]*cotizacion/i);
  assert.doesNotMatch(growth, /USD 29-79/);
});
