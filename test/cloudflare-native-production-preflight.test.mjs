import assert from 'node:assert/strict';
import test from 'node:test';

import {
  PRODUCTION_CUTOVER_CONTRACT,
  validateProductionCutoverPreflight,
} from '../scripts/preflight-cloudflare-native-production.mjs';

function validMetadata(overrides = {}) {
  return {
    contract_version: PRODUCTION_CUTOVER_CONTRACT,
    phase: 'apex_cutover_ready',
    project: 'agent-friendly-web',
    repository: 'tokenizartinfo-ops/agent-friendly-web',
    environment: 'afw_public',
    origin: 'https://agentfriendlyweb.dev',
    allowed_action: 'bounded_cloudflare_native_apex_cutover',
    authorization: {
      approved: true,
      owner: 'Gabriel Mucchiut',
      scope: 'agent-friendly-web-production-cutover-v1',
    },
    worker: {
      name: 'agent-friendly-web-web-production',
      workers_dev: false,
      preview_urls: false,
      deployed: true,
      deployment_id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      version_id: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      apex_custom_domain_attached: false,
    },
    database: {
      name: 'agent-friendly-web-web-production',
      id: 'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
      isolation: 'production_only',
      schema_state: 'migrations_applied_empty',
      migration_count: 6,
      functional_table_count: 13,
      functional_row_count: 0,
      rows_written_during_verification: 0,
      time_travel_bookmark_recorded: true,
    },
    access: {
      application_id: 'dddddddd-dddd-4ddd-8ddd-dddddddddddd',
      audience: 'e'.repeat(64),
      team_domain: 'tokenizart.cloudflareaccess.com',
      policy_decision: 'allow',
      allowed_emails: ['tokenizart.info@gmail.com'],
      release_origin_protected: true,
      apex_private_destinations_prepared: true,
      apex_private_destinations: [
        'agentfriendlyweb.dev/expediente*',
        'agentfriendlyweb.dev/capsula/*',
        'agentfriendlyweb.dev/api/projects/*',
      ],
    },
    release: {
      origin: 'https://release.agentfriendlyweb.dev',
      custom_domain_id: 'f'.repeat(40),
      anonymous_access_smoke: 'passed',
      authenticated_html: 'passed',
      responsive_qa: ['1440x900', '390x844'],
      detach_reattach_rollback: 'passed',
    },
    comparison: {
      baseline_origin: 'https://agentfriendlyweb.dev',
      candidate_origin: 'https://release.agentfriendlyweb.dev',
      status: 'passed',
      critical_failures: 0,
    },
    legacy: {
      provider: 'OpenAI Sites',
      project_id: 'appgprj_6a8f19e35d688191a53e93432543e39c',
      custom_domain_id: 'appgdom_6a8f665d5bc881919ac5fbdd05f69cbd',
      binding_state: 'active_retained_for_rollback',
      validation_txt_retained: true,
    },
    dns_snapshot: {
      zone_id: '4b1a3fe4b6dcb81e9d6a633174c5939f',
      apex_records: [
        { id: '04591fffee45db59433aa4af15c48485', type: 'A', name: 'agentfriendlyweb.dev', content: '162.159.143.30', proxied: false, ttl: 1 },
        { id: '52f25c64e4973872c3191ed6d3958a5e', type: 'A', name: 'agentfriendlyweb.dev', content: '172.66.3.26', proxied: false, ttl: 1 },
      ],
      rollback_restore_ready: true,
    },
    traffic: {
      public_percent_before_cutover: 0,
      canonical_origin_unchanged: true,
      release_linked_publicly: false,
    },
    capabilities: {
      contact_writes: false,
      email_sending: false,
      crm_remote: false,
      payments: false,
      tokenizart_runtime_dependency: false,
    },
    verification: {
      full_suite: 'passed',
      build: 'passed',
      lint_errors: 0,
      production_dry_run: 'passed',
      rollback_window_minutes: 30,
    },
    ...overrides,
  };
}

test('production preflight accepts only the exact rollback-ready AFW apex cutover', () => {
  const report = validateProductionCutoverPreflight(validMetadata());
  assert.deepEqual(report, {
    ok: true,
    contract_version: PRODUCTION_CUTOVER_CONTRACT,
    phase: 'apex_cutover_ready',
    project: 'agent-friendly-web',
    environment: 'afw_public',
    origin: 'https://agentfriendlyweb.dev',
    errors: [],
  });
});

test('production preflight rejects placeholders, cross-project targets and non-empty data', () => {
  const fixture = validMetadata();
  const report = validateProductionCutoverPreflight({
    ...fixture,
    project: 'tokenizart',
    repository: 'tokenizartinfo-ops/tokenizart-cloudflare-ai',
    origin: 'https://companion.tokenizart.info',
    worker: { ...fixture.worker, deployment_id: '11111111-1111-4111-8111-111111111111' },
    database: { ...fixture.database, functional_row_count: 2, rows_written_during_verification: 1 },
    capabilities: { ...fixture.capabilities, contact_writes: true, tokenizart_runtime_dependency: true },
  });

  assert.equal(report.ok, false);
  assert.match(report.errors.join('\n'), /project|repository|origin/i);
  assert.match(report.errors.join('\n'), /deployment|placeholder/i);
  assert.match(report.errors.join('\n'), /row|database|write/i);
  assert.match(report.errors.join('\n'), /contact|tokenizart/i);
});

test('production preflight rejects missing Access, release rollback, DNS restore or explicit authorization', () => {
  const fixture = validMetadata();
  const report = validateProductionCutoverPreflight({
    ...fixture,
    authorization: { ...fixture.authorization, approved: false },
    access: { ...fixture.access, apex_private_destinations: [], apex_private_destinations_prepared: false },
    release: { ...fixture.release, detach_reattach_rollback: 'not_run' },
    comparison: { ...fixture.comparison, status: 'failed', critical_failures: 1 },
    legacy: { ...fixture.legacy, binding_state: 'removed' },
    dns_snapshot: { ...fixture.dns_snapshot, rollback_restore_ready: false, apex_records: [] },
    traffic: { ...fixture.traffic, public_percent_before_cutover: 1 },
  });

  assert.equal(report.ok, false);
  const errors = report.errors.join('\n');
  assert.match(errors, /authorization/i);
  assert.match(errors, /Access|destination/i);
  assert.match(errors, /detach|rollback|release/i);
  assert.match(errors, /comparison/i);
  assert.match(errors, /Sites|legacy/i);
  assert.match(errors, /DNS|restore/i);
  assert.match(errors, /traffic/i);
});
