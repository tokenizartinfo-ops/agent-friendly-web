import assert from 'node:assert/strict';
import test from 'node:test';

import {
  TRACTION_F1_VERSION,
  qualifyTractionOpportunity,
} from '../lib/traction-f1.mjs';

const baseAssessment = {
  assessmentId: 'assessment-example-001',
  segment: 'restaurants_hospitality',
  source: 'public_audit',
  locale: 'es',
  signals: {
    pain: 2,
    responsible: 2,
    access: 1,
    evidence: 1,
    urgency: 1,
    budget: 1,
  },
};

test('qualifies scores of 8 to 12 for a human-reviewed diagnostic', () => {
  const result = qualifyTractionOpportunity(baseAssessment);

  assert.equal(result.ok, true);
  assert.deepEqual(result.result.scores, baseAssessment.signals);
  assert.equal(result.result.contract, TRACTION_F1_VERSION);
  assert.equal(result.result.total, 8);
  assert.equal(result.result.maxTotal, 12);
  assert.equal(result.result.qualification, 'prepare_diagnostic');
  assert.equal(result.result.recommendedOffer, 'discovery_pack');
  assert.equal(result.result.nextAction, 'human_review');
});

test('routes scores of 5 to 7 to nurture and clarification', () => {
  const result = qualifyTractionOpportunity({
    ...baseAssessment,
    signals: {
      ...baseAssessment.signals,
      pain: 1,
      responsible: 1,
      access: 0,
    },
  });

  assert.equal(result.ok, true);
  assert.equal(result.result.total, 5);
  assert.equal(result.result.qualification, 'nurture_and_clarify');
  assert.equal(result.result.recommendedOffer, 'guided_diagnostic');
});

test('routes scores below 5 to the free public audit without quoting', () => {
  const result = qualifyTractionOpportunity({
    ...baseAssessment,
    signals: {
      pain: 1,
      responsible: 1,
      access: 0,
      evidence: 1,
      urgency: 0,
      budget: 1,
    },
  });

  assert.equal(result.ok, true);
  assert.equal(result.result.total, 4);
  assert.equal(result.result.qualification, 'not_ready');
  assert.equal(result.result.recommendedOffer, 'public_audit');
  assert.equal(result.result.nextAction, 'collect_missing_context');
});

test('enforces all six integer signals between zero and two', () => {
  assert.deepEqual(
    qualifyTractionOpportunity({
      ...baseAssessment,
      signals: { ...baseAssessment.signals, pain: 3 },
    }),
    { ok: false, code: 'invalid_signal_score', field: 'signals.pain' },
  );
  assert.deepEqual(
    qualifyTractionOpportunity({
      ...baseAssessment,
      signals: { ...baseAssessment.signals, budget: 1.5 },
    }),
    { ok: false, code: 'invalid_signal_score', field: 'signals.budget' },
  );
  const missingUrgency = { ...baseAssessment.signals };
  delete missingUrgency.urgency;
  assert.deepEqual(
    qualifyTractionOpportunity({ ...baseAssessment, signals: missingUrgency }),
    { ok: false, code: 'missing_signal', field: 'signals.urgency' },
  );
  assert.deepEqual(
    qualifyTractionOpportunity({
      ...baseAssessment,
      signals: { ...baseAssessment.signals, fit: 2 },
    }),
    { ok: false, code: 'unsupported_signal', field: 'signals.fit' },
  );
});

test('rejects PII, message content, probable secrets and unknown fields', () => {
  const forbidden = [
    ['email', 'person@example.com'],
    ['name', 'Example Person'],
    ['phone', '+5400000000'],
    ['body', 'free-form message'],
    ['notes', 'private notes'],
    ['password', 'not-accepted'],
  ];
  for (const [field, value] of forbidden) {
    assert.deepEqual(
      qualifyTractionOpportunity({ ...baseAssessment, [field]: value }),
      { ok: false, code: 'pii_or_message_content_not_accepted', field },
    );
  }
  assert.deepEqual(
    qualifyTractionOpportunity({ ...baseAssessment, assessmentId: 'token=secret-value' }),
    { ok: false, code: 'invalid_assessment_id', field: 'assessmentId' },
  );
  assert.deepEqual(
    qualifyTractionOpportunity({ ...baseAssessment, callbackUrl: 'https://example.com/hook' }),
    { ok: false, code: 'unsupported_assessment_field', field: 'callbackUrl' },
  );
});

test('returns deterministic advice without persistence, outreach, proposals or payments', () => {
  const first = qualifyTractionOpportunity(baseAssessment);
  const second = qualifyTractionOpportunity(baseAssessment);

  assert.deepEqual(first, second);
  assert.equal(first.result.humanReview.required, true);
  assert.equal(first.result.persistence, 'none');
  assert.equal(first.result.automaticOutreachAllowed, false);
  assert.equal(first.result.proposalAllowed, false);
  assert.equal(first.result.paymentAllowed, false);
  assert.deepEqual(first.result.blockedActions, [
    'persist_assessment',
    'send_outreach',
    'create_proposal',
    'publish_price',
    'charge_payment',
    'modify_customer_site',
  ]);
});
