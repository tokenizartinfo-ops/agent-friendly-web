import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import * as contactPrivacyPolicy from '../lib/contact-privacy-policy.mjs';

test('privacy lifecycle contract reports the verified synthetic canary with every real capability OFF', async () => {
  const contract = JSON.parse(await readFile(
    'public/.well-known/contact-privacy-lifecycle-contract.json',
    'utf8',
  ));
  assert.equal(contract.contract, 'agent-friendly-web.contact-privacy-lifecycle.v1');
  assert.equal(contract.status, 'private_synthetic_lifecycle_verified_kill_switch_off');
  assert.equal(contract.audit_requires_email, false);
  assert.equal(contract.synthetic_privacy_lifecycle_enabled, false);
  assert.equal(contract.real_contact_enabled, false);
  assert.equal(contract.privacy_requests_enabled, false);
  assert.equal(contract.retention_jobs_enabled, false);
  assert.equal(contract.product_updates_enabled, false);
  assert.equal(contract.claims.global_legal_compliance, false);
  assert.equal(contract.claims.legal_review_required_before_real_capture, true);
  assert.equal(contract.next_gate, 'private_human_privacy_pilot_legal_review_required');
  assert.deepEqual(contract.consent.required, ['requested_plan']);
  assert.deepEqual(contract.consent.optional, ['commercial_contact', 'product_updates']);
  assert.deepEqual(contract.consent.approved_copy_versions, {
    requested_plan: ['agent-friendly-web.contact-intake.v1'],
    commercial_contact: ['agent-friendly-web.contact-intake.v1'],
    product_updates: ['agent-friendly-web.contact-intake.v1'],
  });
  assert.deepEqual(
    contract.consent.approved_copy_versions,
    contactPrivacyPolicy.APPROVED_CONSENT_COPY_VERSIONS,
  );
  assert.equal(contract.boundaries.crm_stores_direct_pii, false);
  assert.equal(contract.boundaries.tokenizart_resources_used, false);
});

test('Gate 6D.4C evidence records one idempotent synthetic lifecycle and the final closed boundary', async () => {
  const evidenceText = await readFile(
    'docs/evidence/synthetic-privacy-lifecycle-canary-remote-2026-09-04.json',
    'utf8',
  );
  const reportText = await readFile(
    'docs/BLOCK-6D4C-SYNTHETIC-PRIVACY-CANARY-REMOTE-2026-09-04.md',
    'utf8',
  );
  const evidence = JSON.parse(evidenceText);

  assert.equal(evidence.contract, 'agent-friendly-web.synthetic-privacy-lifecycle-canary-remote-evidence.v1');
  assert.equal(evidence.status, 'private_synthetic_lifecycle_verified_kill_switch_off');
  assert.equal(evidence.observed_at, '2026-09-04');
  assert.deepEqual(evidence.scope, {
    project: 'agent-friendly-web',
    repository: 'tokenizartinfo-ops/agent-friendly-web',
    environment: 'afw_canary',
    origin: 'https://canary.agentfriendlyweb.dev',
  });
  assert.deepEqual(evidence.resources, {
    worker: 'agent-friendly-web-web-canary',
    canary_database: {
      name: 'agent-friendly-web-web-canary',
      id: '2b518988-eacb-4c31-b760-4e58c3c0285b',
    },
    production_database: {
      name: 'agent-friendly-web-web-production',
      id: 'd26fc9d2-df5a-4957-8e58-cc4c945faad8',
    },
  });
  assert.deepEqual(evidence.access, {
    application_id: 'dc905004-16dc-4174-b6ec-bb9911f6965c',
    policy_id: '39a8f0e6-419f-4c21-b8af-eabd6295a9b9',
    audience: '5e6f80fdd77e026d6e9f513d4614d22e10cba0f7a90ea4bf7a10b27d6de67a45',
    allow_policy_count: 1,
    allowed_identity_count: 1,
    bypass_policy_count: 0,
  });
  assert.doesNotMatch(evidenceText, /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/iu);
  assert.doesNotMatch(reportText, /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/iu);
  assert.deepEqual(evidence.migration, {
    name: '0008_contact_privacy_lifecycle.sql',
    applied_successfully: true,
    pending_after: 0,
  });
  assert.deepEqual(evidence.versions, {
    previous_off_baseline: '4ac5d285-b8eb-40e4-8cfd-5624dcba37bf',
    post_migration_code_off: 'b8122cf6-00f6-401a-b949-b57b97994192',
    secret_change: '3159b5d8-ddea-40ca-8c96-d46220a0f225',
    bounded_on: '83890e0e-55b4-4b2d-9504-94b4d12419bd',
    final_off: '5105a6f1-a7b9-40ec-aa1a-9f650cf3ff5c',
  });
  assert.deepEqual(evidence.hmac_secret, {
    random_source_bytes: 48,
    piped_directly: true,
    binding_exists: true,
    value_persisted_locally: false,
    value_published: false,
  });
  assert.deepEqual(evidence.before, {
    contact_rows: 1,
    eligible_fixed_invalid_fixture_rows: 1,
    requested_plan_grants: 1,
    consent_events: 0,
    privacy_requests: 0,
    suppressions: 0,
    lifecycle_events: 0,
    email_deliveries: 4,
  });
  assert.deepEqual(evidence.execution, {
    first_result: 'synthetic_privacy_lifecycle_completed',
    replay_result: 'synthetic_privacy_lifecycle_already_completed',
    replay_created_new_events: false,
  });
  assert.deepEqual(evidence.after.contact, {
    rows: 1,
    safely_erased_rows: 1,
    blank_fields: [
      'email',
      'name',
      'domain',
      'role',
      'organization',
      'objective',
      'source',
      'request_hash',
    ],
    state: 'erased',
    erased_at_populated: true,
    restriction_state: 'none',
  });
  assert.deepEqual(evidence.after.consent_events, {
    total: 2,
    commercial_contact_granted: 1,
    commercial_contact_withdrawn: 1,
  });
  assert.deepEqual(evidence.after.privacy_requests, {
    total: 4,
    resolved: 4,
    access_export: 1,
    deletion: 1,
    rectification: 1,
    withdraw_consent: 1,
  });
  assert.deepEqual(evidence.after.suppressions, {
    total: 2,
    commercial_contact_consent_withdrawal: 1,
    requested_plan_subject_deletion: 1,
  });
  assert.deepEqual(evidence.after.lifecycle_events, {
    total: 3,
    deleted_identifiers_erased: 1,
    exported_subject_export_hashed: 1,
    suppressed_commercial_contact_withdrawn: 1,
  });
  assert.deepEqual(evidence.after.email_deliveries, {
    total: 4,
    failed: 3,
    sent: 1,
    provider_sends_by_gate: 0,
  });
  assert.deepEqual(evidence.final_remote, {
    synthetic_privacy_lifecycle_enabled: false,
    real_data_flags: {
      AFW_REAL_CONTACT_ENABLED: false,
      AFW_PRIVACY_REQUESTS_ENABLED: false,
      AFW_RETENTION_JOBS_ENABLED: false,
      AFW_PRODUCT_UPDATES_ENABLED: false,
    },
    all_other_synthetic_write_flags_false: true,
    hmac_binding_exists: true,
    authenticated_private_page_http: 404,
    authenticated_api_http: 404,
    authenticated_api_code: 'synthetic_privacy_lifecycle_unavailable',
    anonymous_request: 'redirected_to_access',
    access_allow_policy_count: 1,
    access_bypass_policy_count: 0,
    public_production_http: 200,
    successful_synthetic_erasure_restored: false,
  });
  assert.deepEqual(evidence.production_database, {
    distinct_from_canary: true,
    table_count: 14,
    write_queries_24h: 0,
    rows_written_24h: 0,
  });
  assert.deepEqual(evidence.capabilities, {
    real_contact_used: false,
    email_sent: false,
    proposal_created: false,
    payment_charged: false,
    customer_site_modified: false,
    production_database_mutated: false,
    tokenizart_resource_used: false,
    real_privacy_ready: false,
    legal_approval_granted: false,
  });
  assert.deepEqual(evidence.rollback, {
    previous_worker_version_available: true,
    previous_worker_version: '4ac5d285-b8eb-40e4-8cfd-5624dcba37bf',
    pre_migration_time_travel_bookmark: '00000037-00000000-000050dc-743c3544fbd07da4b625026cf0c8d4f5',
    time_travel_restore_used: false,
  });
  assert.equal(evidence.next_gate, 'private_human_privacy_pilot_legal_review_required');
});

test('all web environments keep every real-data flag OFF', async () => {
  const config = JSON.parse(await readFile('wrangler.jsonc', 'utf8'));
  const flags = [
    'AFW_SYNTHETIC_PRIVACY_LIFECYCLE_ENABLED',
    'AFW_REAL_CONTACT_ENABLED',
    'AFW_PRIVACY_REQUESTS_ENABLED',
    'AFW_RETENTION_JOBS_ENABLED',
    'AFW_PRODUCT_UPDATES_ENABLED',
  ];
  for (const vars of [config.vars, config.env.canary.vars, config.env.production.vars]) {
    for (const flag of flags) assert.equal(vars[flag], 'false');
  }
  assert.equal('AFW_CONTACT_SUPPRESSION_HMAC_KEY' in config.vars, false);
  assert.equal('AFW_CONTACT_SUPPRESSION_HMAC_KEY' in config.env.canary.vars, false);
  assert.equal('AFW_CONTACT_SUPPRESSION_HMAC_KEY' in config.env.production.vars, false);
});

test('generated Worker types expose the OFF switch without materializing the HMAC secret', async () => {
  const types = await readFile('worker-configuration.d.ts', 'utf8');

  assert.match(types, /AFW_SYNTHETIC_PRIVACY_LIFECYCLE_ENABLED: "false";/);
  assert.doesNotMatch(types, /AFW_CONTACT_SUPPRESSION_HMAC_KEY/);
});
