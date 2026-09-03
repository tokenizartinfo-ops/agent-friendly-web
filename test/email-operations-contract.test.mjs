import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../', import.meta.url);

async function read(path) {
  return readFile(new URL(path, root), 'utf8');
}

test('public email operations contract reports verified canaries and the closed transactional case truthfully', async () => {
  const contract = JSON.parse(await read('public/.well-known/email-operations-contract.json'));

  assert.equal(contract.contract, 'agent-friendly-web.email-operations.v1');
  assert.equal(contract.status, 'single_canary_attempt_failed_no_retry_kill_switch_off');
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
  assert.equal(contract.capabilities.email_provider_configured, true);
  assert.equal(contract.capabilities.outbound_delivery_verified, true);
  assert.equal(contract.capabilities.outbound_binding_configured, true);
  assert.equal(contract.capabilities.transactional_case_selected, true);
  assert.equal(contract.capabilities.transactional_local_implementation_ready, true);
  assert.equal(contract.capabilities.transactional_remote_migration_applied, true);
  assert.equal(contract.capabilities.transactional_route_deployed_canary, true);
  assert.equal(contract.capabilities.transactional_rate_limit_binding_configured, true);
  assert.equal(contract.capabilities.transactional_automatic_sending, false);
  assert.equal(contract.capabilities.arbitrary_recipients, false);
  assert.equal(contract.capabilities.customer_email_sending, false);
  assert.equal(contract.latest_transactional_canary.email_sent, false);
  assert.equal(contract.latest_transactional_canary.provider_invocations, 1);
  assert.equal(contract.latest_transactional_canary.retries, 0);
  assert.equal(contract.latest_transactional_canary.remotely_verified_fix, false);
  assert.equal(
    contract.outbound_canary_contract,
    'https://agentfriendlyweb.dev/.well-known/email-outbound-canary-contract.json',
  );
  assert.equal(
    contract.review_ready_contract,
    'https://agentfriendlyweb.dev/.well-known/email-review-ready-contract.json',
  );
  assert.equal(contract.requires_separate_remote_approval, true);
  assert.ok(contract.blocked_actions.includes('send_email'));
  assert.ok(!contract.blocked_actions.includes('create_send_email_binding'));
  assert.ok(contract.blocked_actions.includes('read_message_body'));
});

test('review-ready contract is fixed-destination, metadata-only and at-most-once', async () => {
  const contract = JSON.parse(await read('public/.well-known/email-review-ready-contract.json'));

  assert.equal(contract.contract, 'agent-friendly-web.email-review-ready.v1');
  assert.equal(contract.status, 'single_canary_attempt_failed_no_retry_kill_switch_off');
  assert.equal(contract.environment, 'afw_email_review_ready_canary');
  assert.equal(contract.origin, 'https://canary.agentfriendlyweb.dev');
  assert.equal(contract.transactional_case.event, 'internal_review_ready');
  assert.equal(contract.transactional_case.template_id, 'internal-review-ready-v1');
  assert.equal(contract.transactional_case.destination.delivery, 'fixed_cloudflare_binding');
  assert.equal(contract.transactional_case.destination.request_supplied, false);
  assert.equal(contract.delivery_semantics.mode, 'at_most_once');
  assert.equal(contract.delivery_semantics.automatic_retry, false);
  assert.equal(contract.persistence.metadata_only, true);
  assert.equal(contract.capabilities.local_implementation_ready, true);
  assert.equal(contract.capabilities.remote_migration_applied, true);
  assert.equal(contract.capabilities.closed_route_deployed_canary, true);
  assert.equal(contract.capabilities.rate_limit_binding_configured, true);
  assert.equal(contract.capabilities.outbound_binding_configured, true);
  assert.equal(contract.capabilities.outbound_sending, false);
  assert.equal(contract.capabilities.automatic_sending, false);
  assert.equal(contract.capabilities.arbitrary_recipients, false);
  assert.equal(contract.capabilities.customer_sending, false);
  assert.equal(contract.latest_canary.approved_attempts, 1);
  assert.equal(contract.latest_canary.provider_invocations, 1);
  assert.equal(contract.latest_canary.retries, 0);
  assert.equal(contract.latest_canary.email_sent, false);
  assert.equal(contract.latest_canary.local_fix, 'explicit_to_undefined');
  assert.equal(contract.latest_canary.remotely_verified_fix, false);
  assert.ok(contract.blocked_actions.includes('accept_recipient_from_request'));
  assert.ok(contract.blocked_actions.includes('automatic_retry'));
});

test('Gate 6C.3A documentation records local readiness and a disabled remote boundary', async () => {
  const [gate, emailArchitecture, growthRoadmap, agentRoadmap] = await Promise.all([
    read('docs/BLOCK-6C3A-EMAIL-REVIEW-READY-LOCAL-GATE-2026-09-02.md'),
    read('docs/EMAIL-LEAD-CAPTURE-AND-CONSENT-ARCHITECTURE-V1.md'),
    read('docs/GROWTH-AND-MONETIZATION-ROADMAP-2026-08-31.md'),
    read('docs/AGENT-NATIVE-DISCOVERY-ROADMAP-2026-08-26.md'),
  ]);

  assert.match(gate, /transactional_case_selected_local_ready_remote_disabled/);
  for (const document of [gate, emailArchitecture, growthRoadmap, agentRoadmap]) {
    assert.match(document, /Gate 6C\.3B/);
  }
  for (const document of [emailArchitecture, growthRoadmap, agentRoadmap]) {
    assert.match(document, /private_bindings_ready_kill_switch_off/);
  }
  assert.match(gate, /at-most-once/i);
  assert.match(gate, /metadata-only/i);
  assert.match(gate, /destino fijo/i);
  assert.match(gate, /sin despliegue, migracion remota, binding ni envio/i);
  assert.match(gate, /node --test test\/email-review-ready\*\.test\.mjs test\/cloudflare-web-config\.test\.mjs/);
});

test('Gate 6C.3B phase 1 records the closed remote deployment without email capability', async () => {
  const [gate, evidence] = await Promise.all([
    read('docs/BLOCK-6C3B-EMAIL-REVIEW-READY-REMOTE-CLOSED-2026-09-02.md'),
    read('docs/evidence/email-review-ready-remote-closed-2026-09-02.json').then(JSON.parse),
  ]);

  for (const field of [
    'PROJECT',
    'REPOSITORY',
    'ENVIRONMENT',
    'ORIGIN',
    'RESOURCE_TYPE',
    'RESOURCE_ID',
    'ALLOWED_ACTION',
    'ROLLBACK',
  ]) assert.match(gate, new RegExp(field));

  assert.match(gate, /remote_database_and_closed_route_ready_binding_pending/);
  assert.match(gate, /6bb88a08-ec6c-4577-b131-5d7729446822/);
  assert.match(gate, /AFW_EMAIL_REVIEW_READY_ENABLED=false/);
  assert.match(gate, /cero filas/i);
  assert.match(gate, /no existe.*send_email/i);
  assert.match(gate, /ningun correo/i);

  assert.equal(evidence.contract, 'agent-friendly-web.email-review-ready-remote-closed-evidence.v1');
  assert.equal(evidence.status, 'remote_database_and_closed_route_ready_binding_pending');
  assert.equal(evidence.worker.deployed_version_id, '6bb88a08-ec6c-4577-b131-5d7729446822');
  assert.equal(evidence.worker.flag_enabled, false);
  assert.equal(evidence.worker.send_email_binding_configured, false);
  assert.equal(evidence.worker.rate_limit_binding_configured, true);
  assert.equal(evidence.database.migration_0006_applied, true);
  assert.equal(evidence.database.delivery_rows, 0);
  assert.equal(evidence.delivery.email_sent, false);
  assert.equal(evidence.public_origin.modified, false);
});

test('Gate 6C.3B phase 2 records private bindings with the kill switch still off', async () => {
  const [gate, evidence] = await Promise.all([
    read('docs/BLOCK-6C3B-EMAIL-REVIEW-READY-PRIVATE-BINDINGS-2026-09-02.md'),
    read('docs/evidence/email-review-ready-private-bindings-2026-09-02.json').then(JSON.parse),
  ]);

  for (const field of [
    'PROJECT',
    'REPOSITORY',
    'ENVIRONMENT',
    'ORIGIN',
    'RESOURCE_TYPE',
    'RESOURCE_ID',
    'ALLOWED_ACTION',
    'ROLLBACK',
  ]) assert.match(gate, new RegExp(field));

  assert.match(gate, /private_bindings_ready_kill_switch_off/);
  assert.match(gate, /d2ba9701-0c61-4d96-84e1-f5659a9426be/);
  assert.match(gate, /AFW_EMAIL_REVIEW_READY_ENABLED=false/);
  assert.match(gate, /destino fijo/i);
  assert.match(gate, /huella|hash/i);
  assert.match(gate, /cero filas/i);
  assert.match(gate, /ningun correo/i);

  assert.equal(evidence.contract, 'agent-friendly-web.email-review-ready-private-bindings-evidence.v1');
  assert.equal(evidence.status, 'private_bindings_ready_kill_switch_off');
  assert.equal(evidence.worker.code_version_id, 'd2ba9701-0c61-4d96-84e1-f5659a9426be');
  assert.equal(evidence.worker.flag_enabled, false);
  assert.equal(evidence.worker.send_email_binding_configured, true);
  assert.equal(evidence.worker.destination_restricted, true);
  assert.equal(evidence.worker.actor_allowlist_secret_configured, true);
  assert.equal(evidence.worker.secret_value_returned, false);
  assert.equal(evidence.database.delivery_rows, 0);
  assert.equal(evidence.delivery.email_sent, false);
  assert.equal(evidence.delivery.authenticated_application_probe_completed, false);
  assert.equal(evidence.public_origin.modified, false);
});

test('Gate 6C.3B records the single failed canary, immediate rollback and local recipient fix', async () => {
  const [gate, evidence, emailArchitecture, growthRoadmap, agentRoadmap] = await Promise.all([
    read('docs/BLOCK-6C3B-EMAIL-REVIEW-READY-SINGLE-CANARY-ATTEMPT-2026-09-03.md'),
    read('docs/evidence/email-review-ready-single-canary-attempt-2026-09-03.json').then(JSON.parse),
    read('docs/EMAIL-LEAD-CAPTURE-AND-CONSENT-ARCHITECTURE-V1.md'),
    read('docs/GROWTH-AND-MONETIZATION-ROADMAP-2026-08-31.md'),
    read('docs/AGENT-NATIVE-DISCOVERY-ROADMAP-2026-08-26.md'),
  ]);

  for (const field of [
    'PROJECT',
    'REPOSITORY',
    'ENVIRONMENT',
    'ORIGIN',
    'RESOURCE_TYPE',
    'RESOURCE_ID',
    'ALLOWED_ACTION',
    'ROLLBACK',
  ]) assert.match(gate, new RegExp(field));

  assert.match(gate, /single_canary_attempt_failed_no_retry_kill_switch_off/);
  assert.match(gate, /960c2834-3199-4c44-b42d-8d8a177b6007/);
  assert.match(gate, /189d6cd1-b70c-4552-aa1c-3e0101b35911/);
  assert.match(gate, /un solo intento/i);
  assert.match(gate, /sin reintento/i);
  assert.match(gate, /to.*undefined/i);

  assert.equal(evidence.contract, 'agent-friendly-web.email-review-ready-single-canary-attempt-evidence.v1');
  assert.equal(evidence.status, 'single_canary_attempt_failed_no_retry_kill_switch_off');
  assert.equal(evidence.scope.project, 'agent-friendly-web');
  assert.equal(evidence.scope.repository, 'tokenizartinfo-ops/agent-friendly-web');
  assert.equal(evidence.scope.environment, 'afw_email_review_ready_canary');
  assert.equal(evidence.scope.origin, 'https://canary.agentfriendlyweb.dev');
  assert.equal(evidence.worker.enabled_version_id, '960c2834-3199-4c44-b42d-8d8a177b6007');
  assert.equal(evidence.worker.restored_off_version_id, '189d6cd1-b70c-4552-aa1c-3e0101b35911');
  assert.equal(evidence.worker.flag_enabled_after_attempt, false);
  assert.equal(evidence.delivery.approved_attempts, 1);
  assert.equal(evidence.delivery.provider_invocations, 1);
  assert.equal(evidence.delivery.automatic_retries, 0);
  assert.equal(evidence.delivery.email_sent, false);
  assert.deepEqual(evidence.database.delivery_rows, {
    total: 1,
    reserved: 0,
    sent: 0,
    failed: 1,
  });
  assert.equal(evidence.provider_checks.daily_sent, 0);
  assert.equal(evidence.provider_checks.daily_quota, 200);
  assert.equal(evidence.provider_checks.sending_domain_enabled, true);
  assert.equal(evidence.provider_checks.fixed_destination_status, 'verified');
  assert.equal(evidence.provider_checks.suppressions, 0);
  assert.equal(evidence.provider_checks.gmail_exact_subject_matches, 0);
  assert.equal(evidence.diagnosis.code, 'missing_explicit_to_field_for_fixed_destination_binding');
  assert.equal(evidence.local_fix.explicit_to, 'undefined');
  assert.equal(evidence.local_fix.test_red_failures, 2);
  assert.equal(evidence.local_fix.test_green_passed, 13);
  assert.equal(evidence.local_fix.remotely_verified, false);
  assert.equal(evidence.next_gate.requires_new_action_time_approval, true);

  for (const document of [emailArchitecture, growthRoadmap, agentRoadmap]) {
    assert.match(document, /single_canary_attempt_failed_no_retry_kill_switch_off/);
    assert.match(document, /missing_explicit_to_field_for_fixed_destination_binding/);
  }
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
