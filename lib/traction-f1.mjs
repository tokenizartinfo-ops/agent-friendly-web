export const TRACTION_F1_VERSION = 'agent-friendly-web.traction-f1.v1';

const assessmentFields = new Set(['assessmentId', 'segment', 'source', 'locale', 'signals']);
const signalNames = ['pain', 'responsible', 'access', 'evidence', 'urgency', 'budget'];
const signalSet = new Set(signalNames);
const forbiddenFields = new Set([
  'email',
  'name',
  'phone',
  'address',
  'body',
  'text',
  'html',
  'notes',
  'attachments',
  'raw',
  'message',
  'password',
  'token',
  'secret',
  'apiKey',
  'privateKey',
]);
const segments = new Set([
  'art_culture',
  'restaurants_hospitality',
  'professional_services',
  'web_agency',
  'public_institution',
  'commerce',
  'other',
]);
const sources = new Set([
  'public_audit',
  'referral',
  'inbound_request',
  'agency_partner',
  'outbound_research',
  'other',
]);
const locales = new Set(['es', 'en', 'pt']);
const opaqueRefPattern = /^[a-z][a-z0-9-]{2,79}$/;

function failure(code, field) {
  return field ? { ok: false, code, field } : { ok: false, code };
}

function enumValue(value, allowed) {
  const normalized = typeof value === 'string' ? value.trim().toLowerCase() : '';
  return allowed.has(normalized) ? normalized : '';
}

function recommendation(total) {
  if (total >= 8) {
    return {
      qualification: 'prepare_diagnostic',
      recommendedOffer: 'discovery_pack',
      nextAction: 'human_review',
    };
  }
  if (total >= 5) {
    return {
      qualification: 'nurture_and_clarify',
      recommendedOffer: 'guided_diagnostic',
      nextAction: 'collect_missing_context',
    };
  }
  return {
    qualification: 'not_ready',
    recommendedOffer: 'public_audit',
    nextAction: 'collect_missing_context',
  };
}

export function qualifyTractionOpportunity(input = {}) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return failure('invalid_assessment');
  }

  for (const key of Object.keys(input)) {
    if (forbiddenFields.has(key)) return failure('pii_or_message_content_not_accepted', key);
    if (!assessmentFields.has(key)) return failure('unsupported_assessment_field', key);
  }

  const assessmentId = typeof input.assessmentId === 'string'
    ? input.assessmentId.trim().toLowerCase()
    : '';
  if (!opaqueRefPattern.test(assessmentId)) {
    return failure('invalid_assessment_id', 'assessmentId');
  }

  const segment = enumValue(input.segment, segments);
  const source = enumValue(input.source, sources);
  const locale = enumValue(input.locale, locales);
  if (!segment) return failure('unsupported_segment', 'segment');
  if (!source) return failure('unsupported_source', 'source');
  if (!locale) return failure('unsupported_locale', 'locale');

  if (!input.signals || typeof input.signals !== 'object' || Array.isArray(input.signals)) {
    return failure('invalid_signals', 'signals');
  }
  for (const key of Object.keys(input.signals)) {
    if (!signalSet.has(key)) return failure('unsupported_signal', `signals.${key}`);
  }

  const scores = {};
  for (const signal of signalNames) {
    if (!Object.hasOwn(input.signals, signal)) return failure('missing_signal', `signals.${signal}`);
    const score = input.signals[signal];
    if (!Number.isInteger(score) || score < 0 || score > 2) {
      return failure('invalid_signal_score', `signals.${signal}`);
    }
    scores[signal] = score;
  }

  const total = signalNames.reduce((sum, signal) => sum + scores[signal], 0);
  const advice = recommendation(total);

  return {
    ok: true,
    result: {
      contract: TRACTION_F1_VERSION,
      assessmentId,
      segment,
      source,
      locale,
      scores,
      total,
      maxTotal: 12,
      ...advice,
      humanReview: {
        required: true,
        reason: 'commercial_decision_requires_human_review',
      },
      persistence: 'none',
      automaticOutreachAllowed: false,
      proposalAllowed: false,
      paymentAllowed: false,
      blockedActions: [
        'persist_assessment',
        'send_outreach',
        'create_proposal',
        'publish_price',
        'charge_payment',
        'modify_customer_site',
      ],
    },
  };
}
