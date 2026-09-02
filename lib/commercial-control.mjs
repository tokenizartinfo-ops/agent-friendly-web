import { normalizeOpportunityMetadata } from './crm-lite.mjs';
import { qualifyTractionOpportunity } from './traction-f1.mjs';

export const COMMERCIAL_CONTROL_VERSION = 'agent-friendly-web.commercial-control.v1';

const blockedActions = Object.freeze([
  'persist_opportunity',
  'send_email',
  'publish_social_content',
  'create_proposal',
  'publish_price',
  'charge_payment',
  'modify_customer_site',
]);

const capabilities = Object.freeze({
  localFiltering: true,
  localPlanning: true,
  remotePersistence: false,
  emailSending: false,
  socialPublishing: false,
  proposalCreation: false,
  paymentCollection: false,
  customerSiteChanges: false,
});

const syntheticCases = Object.freeze([
  {
    label: 'Caso restaurante',
    opportunity: {
      opportunityId: 'opp-synthetic-restaurant-001',
      contactRef: 'contact-synthetic-restaurant-001',
      domain: 'restaurant.example',
      segment: 'restaurants_hospitality',
      problem: 'discovery',
      source: 'public_audit',
      locale: 'es',
      stage: 'new',
      ownerContext: 'owner_verified',
      maintainerContext: 'external_maintainer',
      scopeCodes: ['discovery_pack', 'external_evidence'],
      estimatedValueBand: '100_500',
      nextAction: 'confirm_interest',
      nextActionAt: '2026-09-03T13:00:00.000Z',
      evidenceRefs: ['https://restaurant.example/robots.txt'],
      lossReason: null,
    },
    assessment: {
      assessmentId: 'assessment-synthetic-restaurant-001',
      segment: 'restaurants_hospitality',
      source: 'public_audit',
      locale: 'es',
      signals: { pain: 2, responsible: 2, access: 1, evidence: 2, urgency: 2, budget: 1 },
    },
  },
  {
    label: 'Caso museo',
    opportunity: {
      opportunityId: 'opp-synthetic-museum-001',
      contactRef: 'contact-synthetic-museum-001',
      domain: 'museum.example',
      segment: 'art_culture',
      problem: 'content_clarity',
      source: 'referral',
      locale: 'es',
      stage: 'qualified',
      ownerContext: 'authorized_manager',
      maintainerContext: 'external_maintainer',
      scopeCodes: ['discovery_pack', 'controlled_publication'],
      estimatedValueBand: '500_2000',
      nextAction: 'schedule_discovery',
      nextActionAt: '2026-09-04T15:00:00.000Z',
      evidenceRefs: ['https://museum.example/sitemap.xml'],
      lossReason: null,
    },
    assessment: {
      assessmentId: 'assessment-synthetic-museum-001',
      segment: 'art_culture',
      source: 'referral',
      locale: 'es',
      signals: { pain: 2, responsible: 2, access: 1, evidence: 1, urgency: 1, budget: 1 },
    },
  },
  {
    label: 'Caso agencia web',
    opportunity: {
      opportunityId: 'opp-synthetic-agency-001',
      contactRef: 'contact-synthetic-agency-001',
      domain: 'agency.example',
      segment: 'web_agency',
      problem: 'controlled_publication',
      source: 'agency_partner',
      locale: 'en',
      stage: 'discovery',
      ownerContext: 'owner_verified',
      maintainerContext: 'owner_managed',
      scopeCodes: ['controlled_publication', 'custom_skill'],
      estimatedValueBand: '500_2000',
      nextAction: 'prepare_proposal',
      nextActionAt: '2026-09-05T16:00:00.000Z',
      evidenceRefs: ['https://agency.example/llms.txt'],
      lossReason: null,
    },
    assessment: {
      assessmentId: 'assessment-synthetic-agency-001',
      segment: 'web_agency',
      source: 'agency_partner',
      locale: 'en',
      signals: { pain: 1, responsible: 2, access: 2, evidence: 1, urgency: 0, budget: 1 },
    },
  },
  {
    label: 'Caso estudio profesional',
    opportunity: {
      opportunityId: 'opp-synthetic-professional-001',
      contactRef: 'contact-synthetic-professional-001',
      domain: 'professional.example',
      segment: 'professional_services',
      problem: 'structured_data',
      source: 'inbound_request',
      locale: 'pt',
      stage: 'proposal',
      ownerContext: 'owner_verified',
      maintainerContext: 'unknown',
      scopeCodes: ['af0_to_af3', 'external_evidence'],
      estimatedValueBand: '100_500',
      nextAction: 'request_approval',
      nextActionAt: '2026-09-07T14:00:00.000Z',
      evidenceRefs: ['https://professional.example/openapi.json'],
      lossReason: null,
    },
    assessment: {
      assessmentId: 'assessment-synthetic-professional-001',
      segment: 'professional_services',
      source: 'inbound_request',
      locale: 'pt',
      signals: { pain: 1, responsible: 1, access: 1, evidence: 1, urgency: 1, budget: 1 },
    },
  },
  {
    label: 'Caso institucion publica',
    opportunity: {
      opportunityId: 'opp-synthetic-institution-001',
      contactRef: 'contact-synthetic-institution-001',
      domain: 'institution.example',
      segment: 'public_institution',
      problem: 'crawler_policy',
      source: 'outbound_research',
      locale: 'es',
      stage: 'delivery',
      ownerContext: 'owner_unverified',
      maintainerContext: 'external_maintainer',
      scopeCodes: ['af0_to_af3', 'monitoring'],
      estimatedValueBand: 'unknown',
      nextAction: 'verify_delivery',
      nextActionAt: '2026-09-09T13:00:00.000Z',
      evidenceRefs: ['https://institution.example/robots.txt'],
      lossReason: null,
    },
    assessment: {
      assessmentId: 'assessment-synthetic-institution-001',
      segment: 'public_institution',
      source: 'outbound_research',
      locale: 'es',
      signals: { pain: 1, responsible: 1, access: 0, evidence: 1, urgency: 0, budget: 1 },
    },
  },
]);

const offers = Object.freeze([
  { offerId: 'public_audit', label: 'Auditoria publica', pricingMode: 'free', listUsd: 0, pilotUsd: 0, status: 'available_free_entry' },
  { offerId: 'guided_diagnostic', label: 'Diagnostico guiado', pricingMode: 'fixed_pilot_hypothesis', listUsd: 20, pilotUsd: 10, status: 'launch_hypothesis_not_active' },
  { offerId: 'discovery_pack', label: 'Discovery Pack', pricingMode: 'fixed_pilot_hypothesis', listUsd: 198, pilotUsd: 99, pilotSiteLimit: 5, pilotDurationDays: 30, status: 'launch_hypothesis_not_active' },
  { offerId: 'af0_to_af3', label: 'Implementacion AF-0/AF-1 a AF-3', pricingMode: 'bounded_quote', listUsd: null, pilotUsd: null, quoteRangeUsd: [250, 600], status: 'quote_required' },
  { offerId: 'af4_af5', label: 'Proyecto AF-4 o AF-5', pricingMode: 'custom_pdr_quote', listUsd: null, pilotUsd: null, status: 'pdr_required' },
]);

const contentPlan = Object.freeze([
  { contentId: 'content-linkedin-001', channel: 'linkedin', locale: 'es', topicCode: 'agent_readiness_basics', status: 'draft_only' },
  { contentId: 'content-instagram-001', channel: 'instagram', locale: 'es', topicCode: 'comic_af0_to_af5', status: 'draft_only' },
  { contentId: 'content-youtube-001', channel: 'youtube', locale: 'en', topicCode: 'before_after_explainer', status: 'outline_only' },
  { contentId: 'content-x-001', channel: 'x', locale: 'en', topicCode: 'mcp_a2a_x402_boundaries', status: 'outline_only' },
]);

const emailTemplates = Object.freeze([
  { templateId: 'email-audit-result-v1', purposeCode: 'audit_result', locale: 'es', status: 'structure_only', requiresHumanReview: true, sendAllowed: false },
  { templateId: 'email-guided-diagnostic-v1', purposeCode: 'guided_diagnostic', locale: 'es', status: 'structure_only', requiresHumanReview: true, sendAllowed: false },
  { templateId: 'email-discovery-pack-v1', purposeCode: 'discovery_pack', locale: 'en', status: 'structure_only', requiresHumanReview: true, sendAllowed: false },
]);

const metricDefinitions = Object.freeze([
  { metricId: 'audits_completed_weekly', label: 'Auditorias completas', cadence: 'weekly', target: 10, unit: 'count', status: 'initial_hypothesis' },
  { metricId: 'plan_request_rate', label: 'Solicitudes voluntarias de plan', cadence: 'weekly', target: 10, unit: 'percent_of_completed_audits', status: 'initial_hypothesis' },
  { metricId: 'accepted_proposal_rate', label: 'Propuestas aceptadas', cadence: 'monthly', target: 20, unit: 'percent_of_proposals', status: 'initial_hypothesis' },
  { metricId: 'unconsented_contact_count', label: 'Contactos sin consentimiento valido', cadence: 'weekly', target: 0, unit: 'count', status: 'privacy_guardrail' },
]);

function buildOpportunity(entry) {
  const normalized = normalizeOpportunityMetadata(entry.opportunity);
  if (!normalized.ok) throw new Error(`Invalid synthetic opportunity: ${normalized.code}`);
  const qualification = qualifyTractionOpportunity(entry.assessment);
  if (!qualification.ok) throw new Error(`Invalid synthetic assessment: ${qualification.code}`);
  return {
    label: entry.label,
    opportunity: normalized.value,
    qualification: qualification.result,
  };
}

export function createCommercialControlSnapshot() {
  const opportunities = syntheticCases.map(buildOpportunity);
  const humanReviewStages = new Set(['proposal', 'approved', 'delivery', 'verified', 'won', 'lost']);

  return {
    contract: COMMERCIAL_CONTROL_VERSION,
    mode: 'local_synthetic_only',
    source: 'versioned_synthetic_fixture',
    generatedAt: '2026-09-02T12:00:00.000Z',
    commercialActivationStarted: false,
    capabilities,
    blockedActions,
    summary: {
      opportunityCount: opportunities.length,
      prepareDiagnosticCount: opportunities.filter((entry) => entry.qualification.qualification === 'prepare_diagnostic').length,
      humanReviewCount: opportunities.filter((entry) => humanReviewStages.has(entry.opportunity.stage)).length,
      plannedContentCount: contentPlan.length,
    },
    opportunities,
    offers,
    contentPlan,
    emailTemplates,
    metricDefinitions,
  };
}

export function evaluateCommercialControlAccess({ runtime, localFlag } = {}) {
  if (runtime === 'production' || runtime === 'afw_canary' || runtime === 'afw_public_prod') {
    return { allowed: false, reason: 'remote_environment_not_allowed' };
  }
  if (localFlag !== 'true') return { allowed: false, reason: 'local_flag_disabled' };
  if (runtime !== 'afw_local_dev' && runtime !== 'test') {
    return { allowed: false, reason: 'unsupported_runtime' };
  }
  return { allowed: true, reason: 'local_synthetic_gate_enabled' };
}
