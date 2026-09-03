export const CONTACT_PRIVACY_POLICY_VERSION = 'agent-friendly-web.contact-privacy.v1';

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
const HASH = /^[0-9a-f]{64}$/;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function iso(value) {
  if (typeof value !== 'string' || value.length > 40) return '';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '' : date.toISOString();
}

function failure(code) {
  return { ok: false, code };
}

export function deriveConsentStatus(events, purpose) {
  if (!PURPOSES.has(purpose) || !Array.isArray(events)) return 'none';
  const matching = events
    .filter((event) => event?.purpose === purpose && CONSENT_ACTIONS.has(event.action) && iso(event.createdAt))
    .sort((left, right) => `${left.createdAt}|${left.id}`.localeCompare(`${right.createdAt}|${right.id}`));
  if (matching.length === 0) return 'none';
  return matching.at(-1).action === 'granted' ? 'granted' : 'withdrawn';
}

export function calculateRetentionDeadline(input = {}) {
  const lastInteractionAt = iso(input.lastInteractionAt);
  if (!lastInteractionAt) return failure('privacy_last_interaction_invalid');
  if (!PURPOSES.has(input.purpose)) return failure('privacy_purpose_invalid');
  const days = input.synthetic === true ? RETENTION_DAYS.synthetic : RETENTION_DAYS[input.purpose];
  const due = new Date(lastInteractionAt);
  due.setUTCDate(due.getUTCDate() + days);
  return { ok: true, dueAt: due.toISOString(), days };
}

export function planRetentionAction(input = {}) {
  const now = iso(input.now);
  if (!now) return failure('privacy_now_invalid');
  const retention = calculateRetentionDeadline(input);
  if (!retention.ok) return retention;
  if (input.hold) {
    if (!HOLD_REASONS.has(input.hold.reasonCode)) return failure('privacy_hold_reason_invalid');
    const expiresAt = iso(input.hold.expiresAt);
    if (!expiresAt) return failure('privacy_hold_expiry_required');
    if (expiresAt > now) return { ok: true, action: 'retain_for_hold', dueAt: expiresAt };
  }
  if (retention.dueAt > now) return { ok: true, action: 'retain', dueAt: retention.dueAt };
  if (input.synthetic === true) return { ok: true, action: 'purge_synthetic', dueAt: retention.dueAt };
  if (input.purpose === 'product_updates') return { ok: true, action: 'suspend_updates', dueAt: retention.dueAt };
  return { ok: true, action: 'erase_identifiers', dueAt: retention.dueAt };
}

export function privacyRequestEffect(requestType) {
  return PRIVACY_REQUEST_EFFECTS[requestType] || 'unsupported';
}

export function validatePrivacyRequestMetadata(input = {}) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return failure('privacy_request_invalid');
  const allowed = new Set([
    'requestType', 'contactRefHash', 'verificationHash', 'verificationExpiresAt',
    'expiresAt', 'policyVersion', 'idempotencyKey',
  ]);
  if (Object.keys(input).some((key) => !allowed.has(key))) return failure('privacy_request_field_not_allowed');
  if (!REQUEST_TYPES.has(input.requestType)) return failure('privacy_request_type_invalid');
  if (!HASH.test(input.contactRefHash || '') || !HASH.test(input.verificationHash || '')) {
    return failure('privacy_request_hash_invalid');
  }
  const verificationExpiresAt = iso(input.verificationExpiresAt);
  const expiresAt = iso(input.expiresAt);
  if (!verificationExpiresAt || !expiresAt || verificationExpiresAt >= expiresAt) {
    return failure('privacy_request_expiry_invalid');
  }
  if (input.policyVersion !== CONTACT_PRIVACY_POLICY_VERSION) return failure('privacy_policy_version_invalid');
  if (!UUID.test(input.idempotencyKey || '')) return failure('privacy_request_idempotency_invalid');
  return { ok: true, value: { ...input, verificationExpiresAt, expiresAt } };
}
