export const CONTACT_COPY_VERSION = 'agent-friendly-web.contact-intake.v1';

const locales = new Set(['es', 'en', 'pt']);
const objectives = new Set(['receive_plan', 'understand_results', 'request_pilot', 'agency_partnership']);
const sources = new Set(['public_audit', 'public_guide', 'direct']);
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const probableSecretPatterns = [
  /(?:password|passwd|contrase(?:n|ñ)a|api[_ -]?key|private[_ -]?key|secret|bearer|token)\s*[:=]\s*\S{6,}/i,
  /\bsk-(?:proj-|svcacct-|admin-)?[a-z0-9_-]{20,}\b/i,
  /\bgh[pousr]_[a-z0-9]{20,}\b/i,
  /\b(?:AKIA|ASIA)[A-Z0-9]{16}\b/,
  /\beyJ[a-z0-9_-]{8,}\.eyJ[a-z0-9_-]{8,}\.[a-z0-9_-]{8,}\b/i,
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/i,
];

function containsProbableSecret(value) {
  return probableSecretPatterns.some((pattern) => pattern.test(value));
}

function text(value, maxLength) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength + 1) : '';
}

function hostname(value) {
  const candidate = text(value, 300);
  if (!candidate) return '';
  try {
    const url = new URL(candidate.includes('://') ? candidate : `https://${candidate}`);
    return url.hostname.toLowerCase().replace(/^www\./, '');
  } catch {
    return '';
  }
}

export function consentPurposesFor(input) {
  const purposes = [];
  if (input?.requestedPlanConsent === true) purposes.push('requested_plan');
  if (input?.commercialContactConsent === true) purposes.push('commercial_contact');
  if (input?.productUpdatesConsent === true) purposes.push('product_updates');
  return purposes;
}

export function normalizeContactIntake(input = {}) {
  return {
    email: text(input.email, 254).toLowerCase(),
    name: text(input.name, 120),
    domain: hostname(input.domain),
    role: text(input.role, 80),
    organization: text(input.organization, 160),
    locale: locales.has(input.locale) ? input.locale : '',
    objective: objectives.has(input.objective) ? input.objective : '',
    source: sources.has(input.source) ? input.source : '',
    idempotencyKey: text(input.idempotencyKey, 36),
    requestedPlanConsent: input.requestedPlanConsent === true,
    commercialContactConsent: input.commercialContactConsent === true,
    productUpdatesConsent: input.productUpdatesConsent === true,
    consentPurposes: consentPurposesFor(input),
    copyVersion: CONTACT_COPY_VERSION,
  };
}

export function validateContactIntake(input = {}) {
  const value = normalizeContactIntake(input);
  const errors = [];
  if (!emailPattern.test(value.email) || value.email.length > 254) errors.push('invalid_email');
  if (!value.domain || value.domain.length > 253) errors.push('invalid_domain');
  if (!value.locale) errors.push('invalid_locale');
  if (!value.objective) errors.push('invalid_objective');
  if (!value.source) errors.push('invalid_source');
  if (!uuidPattern.test(value.idempotencyKey)) errors.push('invalid_idempotency_key');
  if (!value.requestedPlanConsent) errors.push('requested_plan_consent_required');
  if (typeof input.turnstileToken !== 'string' || input.turnstileToken.length < 1 || input.turnstileToken.length > 2048) errors.push('invalid_turnstile_token');

  for (const [field, limit] of [['name', 120], ['role', 80], ['organization', 160]]) {
    const raw = typeof input[field] === 'string' ? input[field].trim() : '';
    if (raw.length > limit) errors.push(`${field}_too_long`);
    if (containsProbableSecret(raw)) errors.push(`probable_secret_in_${field}`);
  }
  return { ok: errors.length === 0, errors, value };
}

export function validateContactPreview(input = {}) {
  const validation = validateContactIntake({ ...input, turnstileToken: 'preview-only' });
  return {
    ...validation,
    errors: validation.errors.filter((error) => error !== 'invalid_turnstile_token'),
    ok: validation.errors.every((error) => error === 'invalid_turnstile_token'),
  };
}
