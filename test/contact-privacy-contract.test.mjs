import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import * as contactPrivacyPolicy from '../lib/contact-privacy-policy.mjs';

test('privacy lifecycle contract reports local readiness and remote closure', async () => {
  const contract = JSON.parse(await readFile(
    'public/.well-known/contact-privacy-lifecycle-contract.json',
    'utf8',
  ));
  assert.equal(contract.contract, 'agent-friendly-web.contact-privacy-lifecycle.v1');
  assert.equal(contract.status, 'private_synthetic_lifecycle_local_ready_remote_disabled');
  assert.equal(contract.audit_requires_email, false);
  assert.equal(contract.synthetic_privacy_lifecycle_enabled, false);
  assert.equal(contract.real_contact_enabled, false);
  assert.equal(contract.privacy_requests_enabled, false);
  assert.equal(contract.retention_jobs_enabled, false);
  assert.equal(contract.product_updates_enabled, false);
  assert.equal(contract.claims.global_legal_compliance, false);
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
