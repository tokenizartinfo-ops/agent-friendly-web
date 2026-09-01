import assert from 'node:assert/strict';
import test from 'node:test';

import {
  CRM_LITE_VERSION,
  normalizeOpportunityMetadata,
  planOpportunityTransition,
} from '../lib/crm-lite.mjs';

const baseOpportunity = {
  opportunityId: 'opp-example-001',
  contactRef: 'contact-example-001',
  domain: 'https://restaurant.example.com/menu?campaign=test',
  segment: 'restaurants_hospitality',
  problem: 'discovery',
  source: 'public_audit',
  locale: 'es',
  stage: 'new',
  ownerContext: 'owner_verified',
  maintainerContext: 'external_maintainer',
  scopeCodes: ['external_evidence', 'discovery_pack', 'discovery_pack'],
  estimatedValueBand: '100_500',
  nextAction: 'confirm_interest',
  nextActionAt: '2026-09-05T12:00:00-03:00',
  evidenceRefs: ['https://restaurant.example.com/robots.txt'],
  lossReason: null,
};

test('normalizes one metadata-only opportunity deterministically', () => {
  const result = normalizeOpportunityMetadata(baseOpportunity);
  assert.equal(result.ok, true);
  assert.deepEqual(result.value, {
    ...baseOpportunity,
    domain: 'restaurant.example.com',
    scopeCodes: ['discovery_pack', 'external_evidence'],
    nextActionAt: '2026-09-05T15:00:00.000Z',
  });
});

test('rejects PII, message content, notes, secrets and unknown fields', () => {
  const forbidden = [
    ['email', 'person@example.com'],
    ['name', 'Example Person'],
    ['phone', '+5400000000'],
    ['body', 'message body'],
    ['notes', 'free text'],
    ['attachments', ['private.pdf']],
  ];
  for (const [field, value] of forbidden) {
    assert.deepEqual(
      normalizeOpportunityMetadata({ ...baseOpportunity, [field]: value }),
      { ok: false, code: 'pii_or_message_content_not_accepted', field },
    );
  }
  assert.deepEqual(
    normalizeOpportunityMetadata({ ...baseOpportunity, opportunityId: 'token=secret-value' }),
    { ok: false, code: 'invalid_opportunity_id', field: 'opportunityId' },
  );
  assert.deepEqual(
    normalizeOpportunityMetadata({ ...baseOpportunity, arbitrary: true }),
    { ok: false, code: 'unsupported_opportunity_field', field: 'arbitrary' },
  );
  assert.deepEqual(
    normalizeOpportunityMetadata({ ...baseOpportunity, evidenceRefs: ['https://service.local/private'] }),
    { ok: false, code: 'invalid_evidence_refs', field: 'evidenceRefs' },
  );
});

test('rejects message content and unknown fields at the transition boundary', () => {
  const transition = {
    opportunity: baseOpportunity,
    toStage: 'qualified',
    actorRef: 'actor-gabriel',
    reasonCode: null,
    evidenceRefs: [],
  };
  assert.deepEqual(
    planOpportunityTransition({ ...transition, body: 'private message' }),
    { ok: false, code: 'pii_or_message_content_not_accepted', field: 'body' },
  );
  assert.deepEqual(
    planOpportunityTransition({ ...transition, callbackUrl: 'https://example.com/hook' }),
    { ok: false, code: 'unsupported_transition_field', field: 'callbackUrl' },
  );
});

test('allows only the next canonical stage or a reasoned loss', () => {
  const qualified = planOpportunityTransition({
    opportunity: baseOpportunity,
    toStage: 'qualified',
    actorRef: 'actor-gabriel',
    reasonCode: null,
    evidenceRefs: ['https://agentfriendlyweb.dev/metodologia'],
  });
  assert.equal(qualified.ok, true);
  assert.equal(qualified.plan.fromStage, 'new');
  assert.equal(qualified.plan.toStage, 'qualified');
  assert.equal(qualified.plan.humanReview.required, false);

  assert.deepEqual(
    planOpportunityTransition({
      opportunity: baseOpportunity,
      toStage: 'proposal',
      actorRef: 'actor-gabriel',
      reasonCode: null,
      evidenceRefs: [],
    }),
    { ok: false, code: 'crm_transition_not_allowed', fromStage: 'new', toStage: 'proposal' },
  );

  const lost = planOpportunityTransition({
    opportunity: baseOpportunity,
    toStage: 'lost',
    actorRef: 'actor-gabriel',
    reasonCode: 'timing',
    evidenceRefs: [],
  });
  assert.equal(lost.ok, true);
  assert.equal(lost.plan.humanReview.required, true);
  assert.equal(lost.plan.reasonCode, 'timing');
});

test('requires an allowlisted reason for lost and forbids reasons elsewhere', () => {
  assert.deepEqual(
    planOpportunityTransition({
      opportunity: baseOpportunity,
      toStage: 'lost',
      actorRef: 'actor-gabriel',
      reasonCode: null,
      evidenceRefs: [],
    }),
    { ok: false, code: 'loss_reason_required' },
  );
  assert.deepEqual(
    planOpportunityTransition({
      opportunity: baseOpportunity,
      toStage: 'qualified',
      actorRef: 'actor-gabriel',
      reasonCode: 'timing',
      evidenceRefs: [],
    }),
    { ok: false, code: 'loss_reason_not_allowed' },
  );
});

test('blocks transitions from terminal stages and wins before verification', () => {
  const terminal = { ...baseOpportunity, stage: 'won', nextAction: 'close_won' };
  assert.deepEqual(
    planOpportunityTransition({
      opportunity: terminal,
      toStage: 'lost',
      actorRef: 'actor-gabriel',
      reasonCode: 'other',
      evidenceRefs: [],
    }),
    { ok: false, code: 'crm_terminal_stage', stage: 'won' },
  );
  assert.deepEqual(
    planOpportunityTransition({
      opportunity: { ...baseOpportunity, stage: 'delivery', nextAction: 'verify_delivery' },
      toStage: 'won',
      actorRef: 'actor-gabriel',
      reasonCode: null,
      evidenceRefs: [],
    }),
    { ok: false, code: 'crm_transition_not_allowed', fromStage: 'delivery', toStage: 'won' },
  );
});

test('creates stable review plans without persistence or automatic actions', () => {
  const input = {
    opportunity: { ...baseOpportunity, stage: 'discovery', nextAction: 'prepare_proposal' },
    toStage: 'proposal',
    actorRef: 'actor-gabriel',
    reasonCode: null,
    evidenceRefs: ['https://agentfriendlyweb.dev/verificacion-externa'],
  };
  const first = planOpportunityTransition(input);
  const second = planOpportunityTransition(input);

  assert.equal(first.ok, true);
  assert.equal(first.plan.contract, CRM_LITE_VERSION);
  assert.equal(first.plan.transitionPlanId, second.plan.transitionPlanId);
  assert.equal(first.plan.humanReview.required, true);
  assert.equal(first.plan.persistenceEnabled, false);
  assert.equal(first.plan.automaticActionsAllowed, false);
  assert.deepEqual(first.plan.blockedActions, [
    'persist_opportunity',
    'send_email',
    'create_proposal',
    'charge_payment',
    'modify_customer_site',
  ]);
});
