import { validateEmailReviewReadyRequest } from './email-review-ready.mjs';

export const INTERNAL_REVIEW_READY_TRIGGER_CONTRACT = 'agent-friendly-web.internal-review-ready-trigger.v1';

const ACTION = 'notify_internal_operator';
const ALLOWED_KEYS = new Set(['contract', 'requestId', 'action', 'humanApproved']);
const FORBIDDEN_KEYS = new Set([
  'email',
  'name',
  'phone',
  'address',
  'domain',
  'recipient',
  'to',
  'subject',
  'body',
  'text',
  'html',
  'headers',
  'attachments',
  'message',
  'raw',
  'password',
  'secret',
  'token',
]);
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const LOCALES = new Set(['es', 'en', 'pt']);

function failure(code) {
  return { ok: false, code };
}

export function validateInternalReviewReadyTrigger(input = {}) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return failure('invalid_internal_review_ready_trigger');
  }
  for (const key of Object.keys(input)) {
    if (FORBIDDEN_KEYS.has(key) || !ALLOWED_KEYS.has(key)) {
      return failure('invalid_internal_review_ready_trigger');
    }
  }
  if (
    input.contract !== INTERNAL_REVIEW_READY_TRIGGER_CONTRACT
    || typeof input.requestId !== 'string'
    || !UUID.test(input.requestId)
    || input.action !== ACTION
    || input.humanApproved !== true
  ) {
    return failure('invalid_internal_review_ready_trigger');
  }

  return {
    ok: true,
    value: {
      contract: INTERNAL_REVIEW_READY_TRIGGER_CONTRACT,
      requestId: input.requestId.toLowerCase(),
      action: ACTION,
      humanApproved: true,
    },
  };
}

function isD1Database(database) {
  return Boolean(database && typeof database.prepare === 'function');
}

async function loadPrivateReviewSource(database, requestId) {
  return database
    .prepare('SELECT id, locale, state FROM contact_leads WHERE id = ? LIMIT 1')
    .bind(requestId)
    .first();
}

export async function preparePrivateReviewReadyNotification(database, input = {}) {
  const trigger = validateInternalReviewReadyTrigger(input);
  if (!trigger.ok) return trigger;
  if (!isD1Database(database)) return failure('private_review_ready_store_unavailable');

  let source;
  try {
    source = await loadPrivateReviewSource(database, trigger.value.requestId);
  } catch {
    return failure('private_review_ready_store_unavailable');
  }
  if (!source) return failure('private_review_ready_request_not_found');
  if (source.state !== 'new') return failure('private_review_ready_request_not_eligible');
  if (source.id !== trigger.value.requestId || !LOCALES.has(source.locale)) {
    return failure('private_review_ready_source_invalid');
  }

  const emailRequest = {
    contract: 'agent-friendly-web.email-review-ready.v1',
    eventId: `afw-review-ready-${trigger.value.requestId}`,
    idempotencyKey: trigger.value.requestId,
    templateId: 'internal-review-ready-v1',
    locale: source.locale,
    purpose: 'internal_review_ready',
    humanApproved: true,
  };
  if (!validateEmailReviewReadyRequest(emailRequest).ok) {
    return failure('private_review_ready_source_invalid');
  }

  return {
    ok: true,
    status: 'prepared_not_sent',
    source: {
      type: 'contact_lead',
      requestId: trigger.value.requestId,
      persistedState: source.state,
      derivedState: 'review_ready',
    },
    emailRequest,
    capabilities: {
      sendsEmail: false,
      persistsData: false,
      retriesAutomatically: false,
    },
  };
}
