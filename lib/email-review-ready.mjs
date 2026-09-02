export const EMAIL_REVIEW_READY_CONTRACT = 'agent-friendly-web.email-review-ready.v1';

const CANONICAL_SENDER = 'hello@agentfriendlyweb.dev';
const TEMPLATE_ID = 'internal-review-ready-v1';
const PURPOSE = 'internal_review_ready';
const ALLOWED_KEYS = new Set([
  'contract',
  'eventId',
  'idempotencyKey',
  'templateId',
  'locale',
  'purpose',
  'humanApproved',
]);
const PRIVATE_DESTINATION_KEYS = new Set([
  'to',
  'email',
  'recipient',
  'recipientAddress',
  'destination',
  'destinationAddress',
  'destinationEmail',
]);
const MESSAGE_CONTENT_KEYS = new Set([
  'subject',
  'body',
  'text',
  'html',
  'headers',
  'attachments',
  'message',
  'raw',
]);
const EVENT_ID = /^afw-review-ready-[a-z0-9-]{8,80}$/;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const LOCALES = new Set(['es', 'en', 'pt']);

const COPY = Object.freeze({
  es: {
    subject: 'Agent Friendly Web: solicitud lista para revision',
    text: (eventId) => `Hay una solicitud de Agent Friendly Web lista para revision humana. Referencia: ${eventId}.`,
  },
  en: {
    subject: 'Agent Friendly Web: request ready for review',
    text: (eventId) => `An Agent Friendly Web request is ready for human review. Reference: ${eventId}.`,
  },
  pt: {
    subject: 'Agent Friendly Web: solicitacao pronta para revisao',
    text: (eventId) => `Uma solicitacao do Agent Friendly Web esta pronta para revisao humana. Referencia: ${eventId}.`,
  },
});

function failure(code) {
  return { ok: false, code };
}

export function validateEmailReviewReadyRequest(input = {}) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return failure('invalid_input');

  for (const key of Object.keys(input)) {
    if (PRIVATE_DESTINATION_KEYS.has(key)) return failure('private_destination_not_accepted');
    if (MESSAGE_CONTENT_KEYS.has(key)) return failure('message_content_not_accepted');
    if (!ALLOWED_KEYS.has(key)) return failure('unsupported_input_field');
  }

  if (input.contract !== EMAIL_REVIEW_READY_CONTRACT) return failure('invalid_contract');
  if (typeof input.eventId !== 'string' || !EVENT_ID.test(input.eventId)) return failure('invalid_event_id');
  if (typeof input.idempotencyKey !== 'string' || !UUID.test(input.idempotencyKey)) {
    return failure('invalid_idempotency_key');
  }
  if (input.templateId !== TEMPLATE_ID) return failure('invalid_template_id');
  if (!LOCALES.has(input.locale)) return failure('unsupported_locale');
  if (input.purpose !== PURPOSE) return failure('invalid_purpose');
  if (input.humanApproved !== true) return failure('human_approval_required');

  return {
    ok: true,
    value: {
      contract: EMAIL_REVIEW_READY_CONTRACT,
      eventId: input.eventId,
      idempotencyKey: input.idempotencyKey,
      templateId: TEMPLATE_ID,
      locale: input.locale,
      purpose: PURPOSE,
      humanApproved: true,
    },
  };
}

export function buildEmailReviewReadyMessage(input = {}) {
  const validation = validateEmailReviewReadyRequest(input);
  if (!validation.ok) return validation;

  const value = validation.value;
  const localized = COPY[value.locale];
  return {
    ok: true,
    message: {
      from: CANONICAL_SENDER,
      replyTo: CANONICAL_SENDER,
      subject: localized.subject,
      text: localized.text(value.eventId),
    },
    metadata: {
      contract: EMAIL_REVIEW_READY_CONTRACT,
      eventId: value.eventId,
      templateId: value.templateId,
      locale: value.locale,
      purpose: value.purpose,
    },
  };
}
