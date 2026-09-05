import { CONTACT_COPY_VERSION } from './contact-intake.mjs';

export const CONTACT_PRIVACY_POLICY_VERSION = 'agent-friendly-web.contact-privacy.v1';

export const APPROVED_CONSENT_COPY_VERSIONS = Object.freeze({
  requested_plan: Object.freeze([CONTACT_COPY_VERSION]),
  commercial_contact: Object.freeze([CONTACT_COPY_VERSION]),
  product_updates: Object.freeze([CONTACT_COPY_VERSION]),
});

export const RETENTION_DAYS = Object.freeze({
  requested_plan: 180,
  commercial_contact: 365,
  product_updates: 730,
  consent_evidence: 730,
  suppression: 730,
  synthetic: 7,
});

export const PRIVACY_REQUEST_EFFECTS = Object.freeze({
  access_export: 'prepare_subject_export',
  rectification: 'update_allowlisted_fields',
  withdraw_consent: 'record_purpose_withdrawal',
  deletion: 'erase_identifiers',
  restriction: 'restrict_processing',
  consent_status: 'report_consent_state',
});

const PURPOSES = new Set(['requested_plan', 'commercial_contact', 'product_updates']);
const CONSENT_ACTIONS = new Set(['granted', 'withdrawn', 'superseded']);
const REQUEST_TYPES = new Set([
  'access_export',
  'rectification',
  'withdraw_consent',
  'deletion',
  'restriction',
  'consent_status',
]);
const HOLD_REASONS = new Set(['contractual_record', 'legal_claim', 'security_incident']);
const PRIVACY_REQUEST_FIELDS = new Set([
  'requestType',
  'contactRefHash',
  'verificationHash',
  'verificationExpiresAt',
  'expiresAt',
  'policyVersion',
  'idempotencyKey',
]);
const HASH = /^[0-9a-f]{64}$/;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const ISO_WITH_TIMEZONE = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{1,3}))?(Z|[+-](\d{2}):(\d{2}))$/;

function isPlainRecord(value) {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function parseIsoTimestamp(value) {
  if (typeof value !== 'string' || value.length > 40) return null;
  const match = ISO_WITH_TIMEZONE.exec(value);
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const hour = Number(match[4]);
  const minute = Number(match[5]);
  const second = Number(match[6]);
  const offsetHour = match[9] === undefined ? 0 : Number(match[9]);
  const offsetMinute = match[10] === undefined ? 0 : Number(match[10]);
  const leapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const daysInMonth = [31, leapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (
    month < 1 || month > 12
    || day < 1 || day > daysInMonth[month - 1]
    || hour > 23 || minute > 59 || second > 59
    || offsetHour > 14 || offsetMinute > 59
    || (offsetHour === 14 && offsetMinute !== 0)
  ) return null;

  const date = new Date(value);
  const epochMs = date.getTime();
  if (Number.isNaN(epochMs)) return null;
  return { epochMs, normalized: date.toISOString() };
}

function failure(code) {
  return { ok: false, code };
}

function ownDataValue(descriptors, key) {
  const descriptor = descriptors[key];
  return descriptor && Object.hasOwn(descriptor, 'value') ? descriptor.value : undefined;
}

export function validateConsentCopyVersion(purpose, copyVersion) {
  if (typeof purpose !== 'string' || !Object.hasOwn(APPROVED_CONSENT_COPY_VERSIONS, purpose)) {
    return failure('privacy_consent_purpose_invalid');
  }
  if (
    typeof copyVersion !== 'string'
    || !APPROVED_CONSENT_COPY_VERSIONS[purpose].includes(copyVersion)
  ) return failure('privacy_consent_copy_version_invalid');
  return { ok: true, value: { purpose, copyVersion } };
}

export function deriveConsentStatus(events, purpose) {
  if (!PURPOSES.has(purpose) || !Array.isArray(events)) return 'none';
  const matching = events
    .map((event) => {
      if (event?.purpose !== purpose || !CONSENT_ACTIONS.has(event.action)) return null;
      const createdAt = parseIsoTimestamp(event.createdAt);
      if (!createdAt) return null;
      return {
        action: event.action,
        epochMs: createdAt.epochMs,
      };
    })
    .filter(Boolean);
  if (matching.length === 0) return 'none';
  const latestEpochMs = Math.max(...matching.map((event) => event.epochMs));
  return matching.some((event) => (
    event.epochMs === latestEpochMs && event.action !== 'granted'
  )) ? 'withdrawn' : 'granted';
}

export function calculateRetentionDeadline(input = {}) {
  if (!isPlainRecord(input)) return failure('privacy_retention_input_invalid');
  const lastInteractionAt = parseIsoTimestamp(input.lastInteractionAt);
  if (!lastInteractionAt) return failure('privacy_last_interaction_invalid');
  if (!PURPOSES.has(input.purpose)) return failure('privacy_purpose_invalid');
  const days = input.synthetic === true ? RETENTION_DAYS.synthetic : RETENTION_DAYS[input.purpose];
  const due = new Date(lastInteractionAt.epochMs);
  due.setUTCDate(due.getUTCDate() + days);
  return { ok: true, dueAt: due.toISOString(), days };
}

export function planRetentionAction(input = {}) {
  if (!isPlainRecord(input)) return failure('privacy_retention_input_invalid');
  const now = parseIsoTimestamp(input.now);
  if (!now) return failure('privacy_now_invalid');
  const retention = calculateRetentionDeadline(input);
  if (!retention.ok) return retention;
  if (input.hold) {
    if (!HOLD_REASONS.has(input.hold.reasonCode)) return failure('privacy_hold_reason_invalid');
    const expiresAt = parseIsoTimestamp(input.hold.expiresAt);
    if (!expiresAt) return failure('privacy_hold_expiry_required');
    if (expiresAt.epochMs > now.epochMs) {
      return { ok: true, action: 'retain_for_hold', dueAt: expiresAt.normalized };
    }
  }
  if (new Date(retention.dueAt).getTime() > now.epochMs) {
    return { ok: true, action: 'retain', dueAt: retention.dueAt };
  }
  if (input.synthetic === true) return { ok: true, action: 'purge_synthetic', dueAt: retention.dueAt };
  if (input.purpose === 'product_updates') return { ok: true, action: 'suspend_updates', dueAt: retention.dueAt };
  return { ok: true, action: 'erase_identifiers', dueAt: retention.dueAt };
}

export function privacyRequestEffect(requestType) {
  if (typeof requestType !== 'string' || !Object.hasOwn(PRIVACY_REQUEST_EFFECTS, requestType)) {
    return 'unsupported';
  }
  return PRIVACY_REQUEST_EFFECTS[requestType];
}

export function validatePrivacyRequestMetadata(input = {}) {
  if (!isPlainRecord(input)) return failure('privacy_request_invalid');
  const keys = Reflect.ownKeys(input);
  if (keys.some((key) => typeof key !== 'string' || !PRIVACY_REQUEST_FIELDS.has(key))) {
    return failure('privacy_request_field_not_allowed');
  }
  const descriptors = Object.getOwnPropertyDescriptors(input);
  const requestType = ownDataValue(descriptors, 'requestType');
  const contactRefHash = ownDataValue(descriptors, 'contactRefHash');
  const verificationHash = ownDataValue(descriptors, 'verificationHash');
  const policyVersion = ownDataValue(descriptors, 'policyVersion');
  const idempotencyKey = ownDataValue(descriptors, 'idempotencyKey');
  if (typeof requestType !== 'string' || !REQUEST_TYPES.has(requestType)) {
    return failure('privacy_request_type_invalid');
  }
  if (
    typeof contactRefHash !== 'string'
    || typeof verificationHash !== 'string'
    || !HASH.test(contactRefHash)
    || !HASH.test(verificationHash)
  ) {
    return failure('privacy_request_hash_invalid');
  }
  const verificationExpiresAt = parseIsoTimestamp(ownDataValue(descriptors, 'verificationExpiresAt'));
  const expiresAt = parseIsoTimestamp(ownDataValue(descriptors, 'expiresAt'));
  if (!verificationExpiresAt || !expiresAt || verificationExpiresAt.epochMs >= expiresAt.epochMs) {
    return failure('privacy_request_expiry_invalid');
  }
  if (policyVersion !== CONTACT_PRIVACY_POLICY_VERSION) return failure('privacy_policy_version_invalid');
  if (typeof idempotencyKey !== 'string' || !UUID.test(idempotencyKey)) {
    return failure('privacy_request_idempotency_invalid');
  }
  return {
    ok: true,
    value: {
      requestType,
      contactRefHash,
      verificationHash,
      verificationExpiresAt: verificationExpiresAt.normalized,
      expiresAt: expiresAt.normalized,
      policyVersion,
      idempotencyKey,
    },
  };
}
