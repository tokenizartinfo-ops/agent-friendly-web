import assert from 'node:assert/strict';
import test from 'node:test';

import {
  COMMERCIAL_CONTROL_VERSION,
  createCommercialControlSnapshot,
  evaluateCommercialControlAccess,
} from '../lib/commercial-control.mjs';

const forbiddenKeys = new Set([
  'email',
  'name',
  'phone',
  'address',
  'body',
  'text',
  'notes',
  'message',
  'password',
  'token',
  'secret',
  'apiKey',
  'privateKey',
]);

function visit(value, path = '$') {
  if (Array.isArray(value)) {
    value.forEach((entry, index) => visit(entry, `${path}[${index}]`));
    return;
  }
  if (!value || typeof value !== 'object') return;
  for (const [key, child] of Object.entries(value)) {
    assert.equal(forbiddenKeys.has(key), false, `${path}.${key} must not contain PII, content or secrets`);
    visit(child, `${path}.${key}`);
  }
}

test('builds a deterministic synthetic commercial snapshot from the CRM and traction contracts', () => {
  const snapshot = createCommercialControlSnapshot();

  assert.equal(snapshot.contract, COMMERCIAL_CONTROL_VERSION);
  assert.equal(snapshot.mode, 'local_synthetic_only');
  assert.equal(snapshot.source, 'versioned_synthetic_fixture');
  assert.equal(snapshot.generatedAt, '2026-09-02T12:00:00.000Z');
  assert.equal(snapshot.opportunities.length, 5);
  assert.deepEqual(snapshot.summary, {
    opportunityCount: 5,
    prepareDiagnosticCount: 2,
    humanReviewCount: 2,
    plannedContentCount: 4,
  });

  for (const entry of snapshot.opportunities) {
    assert.equal(entry.opportunity.domain.endsWith('.example'), true);
    assert.equal(entry.qualification.humanReview.required, true);
    assert.equal(entry.qualification.persistence, 'none');
    assert.equal(entry.qualification.automaticOutreachAllowed, false);
  }
});

test('contains no PII, message bodies, credentials or remote capabilities', () => {
  const snapshot = createCommercialControlSnapshot();
  visit(snapshot);

  assert.deepEqual(snapshot.capabilities, {
    localFiltering: true,
    localPlanning: true,
    remotePersistence: false,
    emailSending: false,
    socialPublishing: false,
    proposalCreation: false,
    paymentCollection: false,
    customerSiteChanges: false,
  });
  assert.ok(snapshot.blockedActions.includes('persist_opportunity'));
  assert.ok(snapshot.blockedActions.includes('send_email'));
  assert.ok(snapshot.blockedActions.includes('charge_payment'));
});

test('keeps pricing hypotheses explicit and custom work outside fixed packages', () => {
  const snapshot = createCommercialControlSnapshot();
  const offers = Object.fromEntries(snapshot.offers.map((offer) => [offer.offerId, offer]));

  assert.equal(offers.public_audit.listUsd, 0);
  assert.equal(offers.guided_diagnostic.listUsd, 20);
  assert.equal(offers.guided_diagnostic.pilotUsd, 10);
  assert.equal(offers.discovery_pack.listUsd, 198);
  assert.equal(offers.discovery_pack.pilotUsd, 99);
  assert.equal(offers.discovery_pack.pilotSiteLimit, 5);
  assert.equal(offers.discovery_pack.pilotDurationDays, 30);
  assert.deepEqual(offers.af0_to_af3.quoteRangeUsd, [250, 600]);
  assert.equal(offers.af4_af5.pricingMode, 'custom_pdr_quote');
  assert.equal(offers.af4_af5.listUsd, null);
  assert.equal(snapshot.commercialActivationStarted, false);
});

test('fails closed unless the exact local development flag is enabled', () => {
  assert.deepEqual(
    evaluateCommercialControlAccess({ runtime: 'afw_local_dev', localFlag: 'true' }),
    { allowed: true, reason: 'local_synthetic_gate_enabled' },
  );
  assert.deepEqual(
    evaluateCommercialControlAccess({ runtime: 'production', localFlag: 'true' }),
    { allowed: false, reason: 'remote_environment_not_allowed' },
  );
  assert.deepEqual(
    evaluateCommercialControlAccess({ runtime: 'afw_canary', localFlag: 'true' }),
    { allowed: false, reason: 'remote_environment_not_allowed' },
  );
  assert.deepEqual(
    evaluateCommercialControlAccess({ runtime: 'afw_local_dev', localFlag: 'TRUE' }),
    { allowed: false, reason: 'local_flag_disabled' },
  );
  assert.deepEqual(
    evaluateCommercialControlAccess({ runtime: 'test', localFlag: undefined }),
    { allowed: false, reason: 'local_flag_disabled' },
  );
});
