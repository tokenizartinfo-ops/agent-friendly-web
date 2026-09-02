import assert from 'node:assert/strict';
import test from 'node:test';

import {
  CANARY_PREFLIGHT_CONTRACT,
  validateCanaryPreflight,
} from '../scripts/preflight-cloudflare-native-canary.mjs';

function validMetadata(overrides = {}) {
  return {
    contract_version: CANARY_PREFLIGHT_CONTRACT,
    project: 'agent-friendly-web',
    repository: 'tokenizartinfo-ops/agent-friendly-web',
    environment: 'afw_canary',
    origin: 'https://canary.agentfriendlyweb.dev',
    worker: {
      name: 'agent-friendly-web-web-canary',
      workers_dev: false,
      preview_urls: false,
      deployed: true,
      deployment_id: 'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
      version_id: 'dddddddd-dddd-4ddd-8ddd-dddddddddddd',
      custom_domain_attached: true,
      custom_domain_id: 'e'.repeat(40),
    },
    database: {
      name: 'agent-friendly-web-web-canary',
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      isolation: 'canary_only',
      schema_state: 'migrations_applied_empty',
      row_count: 0,
      backup_state: 'new_empty_database_no_backup_required',
    },
    access: {
      application_id: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      audience: 'a'.repeat(64),
      team_domain: 'tokenizart.cloudflareaccess.com',
      policy_decision: 'allow',
      allowed_emails: ['tokenizart.info@gmail.com'],
      protected_before_domain_attach: true,
    },
    traffic: {
      public_percent: 0,
      canonical_origin_unchanged: true,
      canonical_origin: 'https://agentfriendlyweb.dev',
      canary_linked_from_public_site: false,
    },
    rollback: {
      action: 'detach_canary_custom_domain',
      production_change_required: false,
      canonical_origin: 'https://agentfriendlyweb.dev',
      legacy_runtime_observed: 'OpenAI Sites',
    },
    ...overrides,
  };
}

test('preflight accepts only the exact isolated Agent Friendly Web canary boundary', () => {
  const report = validateCanaryPreflight(validMetadata());
  assert.deepEqual(report, {
    ok: true,
    contract_version: CANARY_PREFLIGHT_CONTRACT,
    project: 'agent-friendly-web',
    environment: 'afw_canary',
    origin: 'https://canary.agentfriendlyweb.dev',
    errors: [],
  });
});

test('preflight rejects missing or placeholder remote resource identifiers', () => {
  const missing = validateCanaryPreflight({});
  assert.equal(missing.ok, false);
  assert.ok(missing.errors.length >= 10);

  const placeholder = validateCanaryPreflight(validMetadata({
    worker: { ...validMetadata().worker, deployment_id: '' },
    database: { ...validMetadata().database, id: '11111111-1111-4111-8111-111111111111' },
    access: { ...validMetadata().access, audience: 'replace-before-remote-deploy' },
  }));
  assert.equal(placeholder.ok, false);
  assert.match(placeholder.errors.join('\n'), /deployment/i);
  assert.match(placeholder.errors.join('\n'), /placeholder|audience/i);
});

test('preflight rejects public traffic, production coupling, Tokenizart targets and non-empty D1', () => {
  const unsafe = validateCanaryPreflight(validMetadata({
    project: 'tokenizart',
    repository: 'tokenizartinfo-ops/tokenizart-cloudflare-ai',
    origin: 'https://companion-staging.tokenizart.info',
    database: { ...validMetadata().database, row_count: 2, isolation: 'shared' },
    traffic: {
      ...validMetadata().traffic,
      public_percent: 1,
      canonical_origin_unchanged: false,
      canary_linked_from_public_site: true,
    },
    rollback: { ...validMetadata().rollback, production_change_required: true },
  }));

  assert.equal(unsafe.ok, false);
  const errors = unsafe.errors.join('\n');
  assert.match(errors, /project|repository|origin/i);
  assert.match(errors, /database|row_count|isolation/i);
  assert.match(errors, /traffic|canonical|public/i);
  assert.match(errors, /rollback|production/i);
});
