import { createHash } from 'node:crypto';
import { isIP } from 'node:net';

export const CRM_LITE_VERSION = 'agent-friendly-web.crm-lite.v1';

const opportunityFields = new Set([
  'opportunityId',
  'contactRef',
  'domain',
  'segment',
  'problem',
  'source',
  'locale',
  'stage',
  'ownerContext',
  'maintainerContext',
  'scopeCodes',
  'estimatedValueBand',
  'nextAction',
  'nextActionAt',
  'evidenceRefs',
  'lossReason',
]);
const transitionFields = new Set(['opportunity', 'toStage', 'actorRef', 'reasonCode', 'evidenceRefs']);
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
const problems = new Set([
  'discovery',
  'structured_data',
  'crawler_policy',
  'tool_exposure',
  'controlled_publication',
  'content_clarity',
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
const stages = new Set([
  'new',
  'qualified',
  'discovery',
  'proposal',
  'approved',
  'delivery',
  'verified',
  'won',
  'lost',
]);
const ownerContexts = new Set(['owner_verified', 'authorized_manager', 'owner_unverified', 'unknown']);
const maintainerContexts = new Set(['owner_managed', 'external_maintainer', 'unknown']);
const scopeCodeSet = new Set([
  'discovery_pack',
  'af0_to_af3',
  'external_evidence',
  'custom_skill',
  'mcp_readonly',
  'controlled_publication',
  'monitoring',
]);
const valueBands = new Set(['unknown', 'under_100', '100_500', '500_2000', 'over_2000']);
const nextActions = new Set([
  'confirm_interest',
  'schedule_discovery',
  'prepare_scope',
  'prepare_proposal',
  'request_approval',
  'start_delivery',
  'verify_delivery',
  'close_won',
  'close_lost',
  'follow_up',
]);
const lossReasons = new Set(['budget', 'timing', 'no_fit', 'no_response', 'maintainer_blocked', 'other']);
const nextStage = new Map([
  ['new', 'qualified'],
  ['qualified', 'discovery'],
  ['discovery', 'proposal'],
  ['proposal', 'approved'],
  ['approved', 'delivery'],
  ['delivery', 'verified'],
  ['verified', 'won'],
]);
const reviewStages = new Set(['proposal', 'approved', 'delivery', 'verified', 'won', 'lost']);
const opaqueRefPattern = /^[a-z][a-z0-9-]{2,79}$/;
const probableSecretPattern = /(?:password|contrasena|contrase\u00f1a|api[_ -]?key|secret|token|private[_ -]?key)\s*[:=]/i;

function failure(code, field, extra = {}) {
  return field ? { ok: false, code, field, ...extra } : { ok: false, code, ...extra };
}

function enumValue(value, allowed) {
  const normalized = typeof value === 'string' ? value.trim().toLowerCase() : '';
  return allowed.has(normalized) ? normalized : '';
}

function normalizeDomain(value) {
  const raw = typeof value === 'string' ? value.trim() : '';
  if (!raw || raw.length > 500 || probableSecretPattern.test(raw)) return '';
  try {
    const url = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
    const hostname = url.hostname.toLowerCase().replace(/\.$/, '');
    if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) return '';
    if (!hostname.includes('.') || hostname === 'localhost' || hostname.endsWith('.local') || isIP(hostname)) return '';
    return hostname;
  } catch {
    return '';
  }
}

function normalizeEvidenceRefs(value) {
  if (!Array.isArray(value) || value.length > 10) return null;
  const refs = [];
  for (const candidate of value) {
    if (typeof candidate !== 'string' || candidate.length > 1000 || probableSecretPattern.test(candidate)) return null;
    try {
      const url = new URL(candidate);
      const hostname = url.hostname.toLowerCase().replace(/\.$/, '');
      if (
        url.protocol !== 'https:'
        || url.username
        || url.password
        || !hostname.includes('.')
        || hostname === 'localhost'
        || hostname.endsWith('.local')
        || isIP(hostname)
      ) return null;
      url.hash = '';
      refs.push(url.toString());
    } catch {
      return null;
    }
  }
  return [...new Set(refs)].sort();
}

function normalizeDate(value) {
  if (value === null || value === undefined || value === '') return null;
  if (typeof value !== 'string' || value.length > 40) return '';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '' : date.toISOString();
}

export function normalizeOpportunityMetadata(input = {}) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return failure('invalid_opportunity');

  for (const key of Object.keys(input)) {
    if (forbiddenFields.has(key)) return failure('pii_or_message_content_not_accepted', key);
    if (!opportunityFields.has(key)) return failure('unsupported_opportunity_field', key);
  }

  const opportunityId = typeof input.opportunityId === 'string' ? input.opportunityId.trim().toLowerCase() : '';
  const contactRef = typeof input.contactRef === 'string' ? input.contactRef.trim().toLowerCase() : '';
  if (!opaqueRefPattern.test(opportunityId)) return failure('invalid_opportunity_id', 'opportunityId');
  if (!opaqueRefPattern.test(contactRef)) return failure('invalid_contact_ref', 'contactRef');

  const domain = normalizeDomain(input.domain);
  const segment = enumValue(input.segment, segments);
  const problem = enumValue(input.problem, problems);
  const source = enumValue(input.source, sources);
  const locale = enumValue(input.locale, locales);
  const stage = enumValue(input.stage, stages);
  const ownerContext = enumValue(input.ownerContext, ownerContexts);
  const maintainerContext = enumValue(input.maintainerContext, maintainerContexts);
  const estimatedValueBand = enumValue(input.estimatedValueBand, valueBands);
  const nextAction = enumValue(input.nextAction, nextActions);

  if (!domain) return failure('invalid_domain', 'domain');
  if (!segment) return failure('unsupported_segment', 'segment');
  if (!problem) return failure('unsupported_problem', 'problem');
  if (!source) return failure('unsupported_source', 'source');
  if (!locale) return failure('unsupported_locale', 'locale');
  if (!stage) return failure('unsupported_stage', 'stage');
  if (!ownerContext) return failure('unsupported_owner_context', 'ownerContext');
  if (!maintainerContext) return failure('unsupported_maintainer_context', 'maintainerContext');
  if (!estimatedValueBand) return failure('unsupported_value_band', 'estimatedValueBand');
  if (!nextAction) return failure('unsupported_next_action', 'nextAction');

  if (!Array.isArray(input.scopeCodes) || input.scopeCodes.length === 0 || input.scopeCodes.length > 10) {
    return failure('invalid_scope_codes', 'scopeCodes');
  }
  const scopeCodes = [];
  for (const value of input.scopeCodes) {
    const scope = enumValue(value, scopeCodeSet);
    if (!scope) return failure('unsupported_scope_code', 'scopeCodes');
    scopeCodes.push(scope);
  }

  const nextActionAt = normalizeDate(input.nextActionAt);
  if (nextActionAt === '') return failure('invalid_next_action_at', 'nextActionAt');
  const evidenceRefs = normalizeEvidenceRefs(input.evidenceRefs);
  if (!evidenceRefs) return failure('invalid_evidence_refs', 'evidenceRefs');

  const lossReason = input.lossReason === null || input.lossReason === undefined || input.lossReason === ''
    ? null
    : enumValue(input.lossReason, lossReasons);
  if (stage === 'lost' && !lossReason) return failure('loss_reason_required', 'lossReason');
  if (stage !== 'lost' && lossReason) return failure('loss_reason_not_allowed', 'lossReason');
  if (stage === 'lost' && !lossReasons.has(lossReason)) return failure('unsupported_loss_reason', 'lossReason');

  return {
    ok: true,
    value: {
      opportunityId,
      contactRef,
      domain,
      segment,
      problem,
      source,
      locale,
      stage,
      ownerContext,
      maintainerContext,
      scopeCodes: [...new Set(scopeCodes)].sort(),
      estimatedValueBand,
      nextAction,
      nextActionAt,
      evidenceRefs,
      lossReason,
    },
  };
}

export function planOpportunityTransition(input = {}) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return failure('invalid_transition_input');
  for (const key of Object.keys(input)) {
    if (forbiddenFields.has(key)) return failure('pii_or_message_content_not_accepted', key);
    if (!transitionFields.has(key)) return failure('unsupported_transition_field', key);
  }
  const opportunityResult = normalizeOpportunityMetadata(input.opportunity);
  if (!opportunityResult.ok) return opportunityResult;
  const opportunity = opportunityResult.value;
  const toStage = enumValue(input.toStage, stages);
  const actorRef = typeof input.actorRef === 'string' ? input.actorRef.trim().toLowerCase() : '';
  const reasonCode = input.reasonCode === null || input.reasonCode === undefined || input.reasonCode === ''
    ? null
    : enumValue(input.reasonCode, lossReasons);
  const evidenceRefs = normalizeEvidenceRefs(input.evidenceRefs);

  if (!toStage) return failure('unsupported_target_stage', 'toStage');
  if (!opaqueRefPattern.test(actorRef)) return failure('invalid_actor_ref', 'actorRef');
  if (!evidenceRefs) return failure('invalid_evidence_refs', 'evidenceRefs');
  if (opportunity.stage === 'won' || opportunity.stage === 'lost') {
    return failure('crm_terminal_stage', null, { stage: opportunity.stage });
  }
  if (toStage === 'lost' && !reasonCode) return failure('loss_reason_required');
  if (toStage !== 'lost' && reasonCode) return failure('loss_reason_not_allowed');
  if (toStage !== 'lost' && nextStage.get(opportunity.stage) !== toStage) {
    return failure('crm_transition_not_allowed', null, { fromStage: opportunity.stage, toStage });
  }

  const stablePayload = JSON.stringify({
    contract: CRM_LITE_VERSION,
    opportunity,
    toStage,
    actorRef,
    reasonCode,
    evidenceRefs,
  });
  const transitionPlanId = `crm-plan-${createHash('sha256').update(stablePayload).digest('hex').slice(0, 20)}`;

  return {
    ok: true,
    plan: {
      contract: CRM_LITE_VERSION,
      transitionPlanId,
      idempotencyKey: `${opportunity.opportunityId}:${opportunity.stage}:${toStage}`,
      opportunityId: opportunity.opportunityId,
      actorRef,
      fromStage: opportunity.stage,
      toStage,
      reasonCode,
      evidenceRefs,
      humanReview: {
        required: reviewStages.has(toStage),
        reasons: reviewStages.has(toStage) ? [`${toStage}_requires_human_review`] : [],
      },
      persistenceEnabled: false,
      automaticActionsAllowed: false,
      blockedActions: [
        'persist_opportunity',
        'send_email',
        'create_proposal',
        'charge_payment',
        'modify_customer_site',
      ],
    },
  };
}
