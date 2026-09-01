import { createHash } from 'node:crypto';

export const EMAIL_OPERATION_VERSION = 'agent-friendly-web.email-operations.v1';
export const CANONICAL_MAILBOX = 'hello@agentfriendlyweb.dev';

const aliasQueues = new Map([
  ['hello@agentfriendlyweb.dev', 'general'],
  ['hola@agentfriendlyweb.dev', 'general'],
  ['ola@agentfriendlyweb.dev', 'general'],
  ['auditoria@agentfriendlyweb.dev', 'audit'],
  ['seguridad@agentfriendlyweb.dev', 'security'],
  ['bajas@agentfriendlyweb.dev', 'privacy'],
]);
const inboundBlockedAddresses = new Set(['no-reply@agentfriendlyweb.dev']);
const allowedKeys = new Set([
  'messageId',
  'fromEmail',
  'toEmail',
  'subject',
  'locale',
  'purpose',
  'consentPurposes',
]);
const messageContentKeys = new Set([
  'body',
  'text',
  'html',
  'attachments',
  'raw',
  'rawMessage',
  'headers',
]);
const locales = new Set(['es', 'en', 'pt']);
const purposes = new Set([
  'requested_plan',
  'commercial_contact',
  'product_updates',
  'support',
  'security',
  'withdrawal',
]);
const consentPurposeSet = new Set([
  'requested_plan',
  'commercial_contact',
  'product_updates',
]);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const probableSecretPattern = /(?:password|contrasena|contrase\u00f1a|api[_ -]?key|secret|token|private[_ -]?key)\s*[:=]\s*\S+/i;
const sensitiveSubjectPattern = /contract|contrato|price|precio|payment|pago|refund|reembolso|tax|impuesto|dispute|disputa|deadline|plazo|security|seguridad|incident|incidente|personal data|datos sensibles|publish case|publicar caso|website action|sitio del cliente/i;

function normalizeEmail(value) {
  const email = typeof value === 'string' ? value.trim().toLowerCase() : '';
  return email.length <= 254 && emailPattern.test(email) ? email : '';
}

function normalizeLimitedText(value, maxLength) {
  const text = typeof value === 'string' ? value.trim().replace(/\s+/g, ' ') : '';
  return text && text.length <= maxLength ? text : '';
}

function failure(code, field) {
  return field ? { ok: false, code, field } : { ok: false, code };
}

export function normalizeEmailPlanningInput(input = {}) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return failure('invalid_input');
  }

  for (const key of Object.keys(input)) {
    if (messageContentKeys.has(key)) {
      return failure('message_content_not_accepted', key);
    }
    if (!allowedKeys.has(key)) {
      return failure('unsupported_input_field', key);
    }
  }

  const messageId = normalizeLimitedText(input.messageId, 200);
  const fromEmail = normalizeEmail(input.fromEmail);
  const toEmail = normalizeEmail(input.toEmail);
  const subject = normalizeLimitedText(input.subject, 240);
  const locale = typeof input.locale === 'string' ? input.locale.trim().toLowerCase() : '';
  const purpose = typeof input.purpose === 'string' ? input.purpose.trim().toLowerCase() : '';

  if (!messageId) return failure('invalid_message_id', 'messageId');
  if (!fromEmail) return failure('invalid_from_email', 'fromEmail');
  if (!toEmail) return failure('invalid_to_email', 'toEmail');
  if (!subject) return failure('invalid_subject', 'subject');
  if (probableSecretPattern.test(subject)) return failure('probable_secret_rejected', 'subject');
  if (!locales.has(locale)) return failure('unsupported_locale', 'locale');
  if (!purposes.has(purpose)) return failure('unsupported_purpose', 'purpose');
  if (!Array.isArray(input.consentPurposes)) return failure('invalid_consent_purposes', 'consentPurposes');

  const normalizedConsents = [];
  for (const value of input.consentPurposes) {
    const consent = typeof value === 'string' ? value.trim().toLowerCase() : '';
    if (!consentPurposeSet.has(consent)) {
      return failure('unsupported_consent_purpose', 'consentPurposes');
    }
    normalizedConsents.push(consent);
  }

  return {
    ok: true,
    value: {
      messageId,
      fromEmail,
      toEmail,
      subject,
      locale,
      purpose,
      consentPurposes: [...new Set(normalizedConsents)].sort(),
    },
  };
}

function queueFor(normalized, aliasQueue) {
  if (aliasQueue === 'security' || normalized.purpose === 'security') return 'security';
  if (aliasQueue === 'privacy' || normalized.purpose === 'withdrawal') return 'privacy';
  if (aliasQueue === 'audit' || normalized.purpose === 'requested_plan') return 'audit';
  if (normalized.purpose === 'support') return 'support';
  return 'general';
}

function consentFor(normalized) {
  if (normalized.purpose === 'product_updates') {
    const confirmed = normalized.consentPurposes.includes('product_updates');
    return {
      status: confirmed ? 'product_updates_consent_confirmed' : 'missing_product_updates_consent',
      blockedReason: confirmed ? null : 'marketing_consent_required',
    };
  }
  if (normalized.purpose === 'withdrawal') {
    return { status: 'withdrawal_requested', blockedReason: null };
  }
  return { status: 'transactional_request_confirmed', blockedReason: null };
}

function templateFor(queue, purpose) {
  if (purpose === 'product_updates') return 'product-updates-v1';
  if (queue === 'security') return 'security-acknowledgement-v1';
  if (queue === 'privacy') return 'consent-withdrawal-v1';
  if (queue === 'audit') return 'requested-plan-v1';
  if (queue === 'support') return 'support-acknowledgement-v1';
  return 'general-acknowledgement-v1';
}

export function prepareEmailDraftPlan(input = {}) {
  const normalizedResult = normalizeEmailPlanningInput(input);
  if (!normalizedResult.ok) return normalizedResult;

  const normalized = normalizedResult.value;
  if (inboundBlockedAddresses.has(normalized.toEmail)) {
    return failure('inbound_address_not_allowed');
  }
  const aliasQueue = aliasQueues.get(normalized.toEmail);
  if (!aliasQueue) return failure('unknown_recipient_address');

  const queue = queueFor(normalized, aliasQueue);
  const consent = consentFor(normalized);
  const reviewReasons = [];
  if (queue === 'security') reviewReasons.push('security_review');
  if (queue === 'privacy') reviewReasons.push('privacy_or_withdrawal_review');
  if (sensitiveSubjectPattern.test(normalized.subject)) reviewReasons.push('sensitive_subject_review');

  const stablePayload = JSON.stringify({ version: EMAIL_OPERATION_VERSION, ...normalized, aliasQueue, queue });
  const planId = `email-plan-${createHash('sha256').update(stablePayload).digest('hex').slice(0, 20)}`;

  return {
    ok: true,
    plan: {
      contract: EMAIL_OPERATION_VERSION,
      planId,
      idempotencyKey: normalized.messageId,
      canonicalMailbox: CANONICAL_MAILBOX,
      receivedAlias: normalized.toEmail,
      aliasQueue,
      queue,
      locale: normalized.locale,
      purpose: normalized.purpose,
      template: templateFor(queue, normalized.purpose),
      consent: { status: consent.status, purposes: normalized.consentPurposes },
      humanReview: { required: reviewReasons.length > 0, reasons: reviewReasons },
      blockedReason: consent.blockedReason,
      sendMode: 'draft_only',
      automaticSendAllowed: false,
      emailProviderConfigured: false,
      dnsConfigured: false,
      blockedActions: [
        'send_email',
        'configure_dns',
        'provision_mailbox',
        'read_message_body',
        'read_attachments',
      ],
    },
  };
}
