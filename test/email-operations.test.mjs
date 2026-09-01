import assert from 'node:assert/strict';
import test from 'node:test';

import {
  CANONICAL_MAILBOX,
  normalizeEmailPlanningInput,
  prepareEmailDraftPlan,
} from '../lib/email-operations.mjs';

const baseInput = {
  messageId: 'msg-2026-0001',
  fromEmail: 'Visitor@Example.com',
  toEmail: 'hola@agentfriendlyweb.dev',
  subject: 'Quiero el plan de mi auditoria',
  locale: 'es',
  purpose: 'requested_plan',
  consentPurposes: ['requested_plan'],
};

test('normalizes candidate aliases into one canonical operation', () => {
  const aliases = [
    ['hello@agentfriendlyweb.dev', 'general'],
    ['hola@agentfriendlyweb.dev', 'general'],
    ['ola@agentfriendlyweb.dev', 'general'],
    ['auditoria@agentfriendlyweb.dev', 'audit'],
    ['seguridad@agentfriendlyweb.dev', 'security'],
    ['bajas@agentfriendlyweb.dev', 'privacy'],
  ];

  for (const [toEmail, expectedAliasQueue] of aliases) {
    const result = prepareEmailDraftPlan({ ...baseInput, toEmail });
    assert.equal(result.ok, true);
    assert.equal(result.plan.canonicalMailbox, CANONICAL_MAILBOX);
    assert.equal(result.plan.aliasQueue, expectedAliasQueue);
  }
});

test('rejects inbound messages addressed to no-reply', () => {
  const result = prepareEmailDraftPlan({
    ...baseInput,
    toEmail: 'no-reply@agentfriendlyweb.dev',
  });
  assert.deepEqual(result, { ok: false, code: 'inbound_address_not_allowed' });
});

test('rejects message content, attachments, unknown fields and probable secrets', () => {
  assert.deepEqual(
    normalizeEmailPlanningInput({ ...baseInput, body: 'texto privado' }),
    { ok: false, code: 'message_content_not_accepted', field: 'body' },
  );
  assert.deepEqual(
    normalizeEmailPlanningInput({ ...baseInput, attachments: ['private.pdf'] }),
    { ok: false, code: 'message_content_not_accepted', field: 'attachments' },
  );
  assert.deepEqual(
    normalizeEmailPlanningInput({ ...baseInput, internalNote: 'extra' }),
    { ok: false, code: 'unsupported_input_field', field: 'internalNote' },
  );
  assert.deepEqual(
    normalizeEmailPlanningInput({ ...baseInput, subject: 'password: hunter2' }),
    { ok: false, code: 'probable_secret_rejected', field: 'subject' },
  );
  assert.deepEqual(
    normalizeEmailPlanningInput({ ...baseInput, subject: 'contrase\u00f1a: privada' }),
    { ok: false, code: 'probable_secret_rejected', field: 'subject' },
  );
});

test('keeps requested replies separate from product-update consent', () => {
  const transactional = prepareEmailDraftPlan(baseInput);
  assert.equal(transactional.ok, true);
  assert.equal(transactional.plan.consent.status, 'transactional_request_confirmed');
  assert.equal(transactional.plan.blockedReason, null);

  const blockedMarketing = prepareEmailDraftPlan({
    ...baseInput,
    purpose: 'product_updates',
    consentPurposes: ['requested_plan'],
  });
  assert.equal(blockedMarketing.ok, true);
  assert.equal(blockedMarketing.plan.consent.status, 'missing_product_updates_consent');
  assert.equal(blockedMarketing.plan.blockedReason, 'marketing_consent_required');

  const consentedMarketing = prepareEmailDraftPlan({
    ...baseInput,
    purpose: 'product_updates',
    consentPurposes: ['product_updates'],
  });
  assert.equal(consentedMarketing.ok, true);
  assert.equal(consentedMarketing.plan.consent.status, 'product_updates_consent_confirmed');
  assert.equal(consentedMarketing.plan.blockedReason, null);
});

test('forces human review for sensitive aliases, purposes and subjects', () => {
  const cases = [
    { ...baseInput, toEmail: 'seguridad@agentfriendlyweb.dev' },
    { ...baseInput, purpose: 'withdrawal', toEmail: 'bajas@agentfriendlyweb.dev' },
    { ...baseInput, subject: 'Necesito un contrato y confirmar el precio' },
    { ...baseInput, subject: 'Solicito un reembolso del pago' },
  ];

  for (const input of cases) {
    const result = prepareEmailDraftPlan(input);
    assert.equal(result.ok, true);
    assert.equal(result.plan.humanReview.required, true);
    assert.ok(result.plan.humanReview.reasons.length > 0);
  }
});

test('produces a stable plan and never enables providers, DNS or sending', () => {
  const first = prepareEmailDraftPlan(baseInput);
  const second = prepareEmailDraftPlan({
    ...baseInput,
    fromEmail: 'visitor@example.com',
    consentPurposes: ['requested_plan', 'requested_plan'],
  });

  assert.equal(first.ok, true);
  assert.equal(second.ok, true);
  assert.equal(first.plan.planId, second.plan.planId);
  assert.equal(first.plan.sendMode, 'draft_only');
  assert.equal(first.plan.automaticSendAllowed, false);
  assert.equal(first.plan.emailProviderConfigured, false);
  assert.equal(first.plan.dnsConfigured, false);
  assert.deepEqual(first.plan.blockedActions, [
    'send_email',
    'configure_dns',
    'provision_mailbox',
    'read_message_body',
    'read_attachments',
  ]);
});
