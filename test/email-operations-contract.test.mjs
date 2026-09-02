import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);

async function read(path) {
  return readFile(new URL(path, root), 'utf8');
}

test('public email operations contract reports the verified inbound canary and outbound limits truthfully', async () => {
  const contract = JSON.parse(await read('public/.well-known/email-operations-contract.json'));

  assert.equal(contract.contract, 'agent-friendly-web.email-operations.v1');
  assert.equal(contract.status, 'inbound_canary_verified');
  assert.equal(contract.canonical_address.address, 'hello@agentfriendlyweb.dev');
  assert.equal(contract.canonical_address.status, 'inbound_verified');
  assert.deepEqual(contract.aliases.map((item) => item.address), [
    'hola@agentfriendlyweb.dev',
    'ola@agentfriendlyweb.dev',
    'auditoria@agentfriendlyweb.dev',
    'seguridad@agentfriendlyweb.dev',
    'bajas@agentfriendlyweb.dev',
    'no-reply@agentfriendlyweb.dev',
  ]);
  assert.equal(contract.capabilities.local_draft_planning, true);
  assert.equal(contract.capabilities.inbound_routing, true);
  assert.equal(contract.capabilities.outbound_sending, false);
  assert.equal(contract.capabilities.dns_configured, true);
  assert.equal(contract.capabilities.synthetic_delivery_verified, true);
  assert.equal(contract.capabilities.outbound_provider_selected, true);
  assert.equal(contract.capabilities.email_provider_configured, false);
  assert.equal(
    contract.outbound_canary_contract,
    'https://agentfriendlyweb.dev/.well-known/email-outbound-canary-contract.json',
  );
  assert.equal(contract.requires_separate_remote_approval, true);
  assert.ok(contract.blocked_actions.includes('send_email'));
  assert.ok(contract.blocked_actions.includes('configure_dns'));
  assert.ok(contract.blocked_actions.includes('read_message_body'));
});

test('Gate 6C documentation records the local implementation and remote boundary', async () => {
  const [gate, emailArchitecture, growthRoadmap, agentRoadmap] = await Promise.all([
    read('docs/BLOCK-6C-EMAIL-ROUTING-DRAFT-LOCAL-GATE-2026-08-31.md'),
    read('docs/EMAIL-LEAD-CAPTURE-AND-CONSENT-ARCHITECTURE-V1.md'),
    read('docs/GROWTH-AND-MONETIZATION-ROADMAP-2026-08-31.md'),
    read('docs/AGENT-NATIVE-DISCOVERY-ROADMAP-2026-08-26.md'),
  ]);

  for (const document of [gate, emailArchitecture, growthRoadmap, agentRoadmap]) {
    assert.match(document, /planned_draft_only/);
    assert.match(document, /aprobacion separada/i);
  }
  assert.match(gate, /sin DNS, casillas, proveedor ni envio/i);
  assert.match(gate, /node --test test\/email-operations\.test\.mjs/);
  assert.match(emailArchitecture, /no acepta cuerpos completos ni adjuntos/i);
  assert.match(growthRoadmap, /Gate 6C - Correo operativo/);
  assert.match(agentRoadmap, /Gate 6C - correo operativo/);
});
