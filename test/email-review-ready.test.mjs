import assert from 'node:assert/strict';
import test from 'node:test';

import {
  buildEmailReviewReadyMessage,
  EMAIL_REVIEW_READY_CONTRACT,
  validateEmailReviewReadyRequest,
} from '../lib/email-review-ready.mjs';

const validRequest = {
  contract: 'agent-friendly-web.email-review-ready.v1',
  eventId: 'afw-review-ready-20260902-0001',
  idempotencyKey: 'b9fab654-450d-4e8c-ab29-6c658c13064f',
  templateId: 'internal-review-ready-v1',
  locale: 'es',
  purpose: 'internal_review_ready',
  humanApproved: true,
};

test('accepts only the closed internal review-ready request contract', () => {
  assert.deepEqual(validateEmailReviewReadyRequest(validRequest), {
    ok: true,
    value: validRequest,
  });
});

test('builds fixed localized text without accepting caller-controlled content', () => {
  const expected = {
    es: {
      subject: 'Agent Friendly Web: solicitud lista para revision',
      text: 'Hay una solicitud de Agent Friendly Web lista para revision humana. Referencia: afw-review-ready-20260902-0001.',
    },
    en: {
      subject: 'Agent Friendly Web: request ready for review',
      text: 'An Agent Friendly Web request is ready for human review. Reference: afw-review-ready-20260902-0001.',
    },
    pt: {
      subject: 'Agent Friendly Web: solicitacao pronta para revisao',
      text: 'Uma solicitacao do Agent Friendly Web esta pronta para revisao humana. Referencia: afw-review-ready-20260902-0001.',
    },
  };

  for (const locale of ['es', 'en', 'pt']) {
    assert.deepEqual(buildEmailReviewReadyMessage({ ...validRequest, locale }), {
      ok: true,
      message: {
        to: undefined,
        from: 'hello@agentfriendlyweb.dev',
        replyTo: 'hello@agentfriendlyweb.dev',
        subject: expected[locale].subject,
        text: expected[locale].text,
      },
      metadata: {
        contract: EMAIL_REVIEW_READY_CONTRACT,
        eventId: validRequest.eventId,
        templateId: validRequest.templateId,
        locale,
        purpose: validRequest.purpose,
      },
    });
  }
});

test('rejects private addresses, caller content and unsupported fields', () => {
  const cases = [
    [{ ...validRequest, recipient: 'private@example.com' }, 'private_destination_not_accepted'],
    [{ ...validRequest, destinationAddress: 'private@example.com' }, 'private_destination_not_accepted'],
    [{ ...validRequest, body: 'write this' }, 'message_content_not_accepted'],
    [{ ...validRequest, html: '<p>write this</p>' }, 'message_content_not_accepted'],
    [{ ...validRequest, subject: 'caller subject' }, 'message_content_not_accepted'],
    [{ ...validRequest, headers: { 'x-test': 'value' } }, 'message_content_not_accepted'],
    [{ ...validRequest, attachments: [] }, 'message_content_not_accepted'],
    [{ ...validRequest, extra: true }, 'unsupported_input_field'],
  ];

  for (const [input, code] of cases) {
    assert.deepEqual(validateEmailReviewReadyRequest(input), { ok: false, code });
  }
});

test('rejects malformed or broadened transactional requests', () => {
  const cases = [
    [{ ...validRequest, contract: 'agent-friendly-web.email.v2' }, 'invalid_contract'],
    [{ ...validRequest, eventId: 'customer@example.com' }, 'invalid_event_id'],
    [{ ...validRequest, idempotencyKey: 'not-a-uuid' }, 'invalid_idempotency_key'],
    [{ ...validRequest, templateId: 'newsletter-v1' }, 'invalid_template_id'],
    [{ ...validRequest, locale: 'fr' }, 'unsupported_locale'],
    [{ ...validRequest, purpose: 'marketing' }, 'invalid_purpose'],
    [{ ...validRequest, humanApproved: false }, 'human_approval_required'],
    [{ ...validRequest, humanApproved: 'true' }, 'human_approval_required'],
  ];

  for (const [input, code] of cases) {
    assert.deepEqual(validateEmailReviewReadyRequest(input), { ok: false, code });
  }
});
