import { hashAccessSubject } from './access-subject-hash.mjs';
import { normalizeOpportunityMetadata, planOpportunityTransition } from './crm-lite.mjs';
import { verifyCloudflareAccessJwt } from './cloudflare-access-identity.mjs';

export const SYNTHETIC_COMMERCIAL_REVIEW_CONTRACT = 'agent-friendly-web.synthetic-commercial-review.v1';

const CANARY_HOST = 'canary.agentfriendlyweb.dev';
const CANARY_PATH = '/api/canary/commercial-review';
const SYNTHETIC_EMAIL = 'synthetic-canary@example.invalid';
const SYNTHETIC_DOMAIN = 'example.invalid';
const SYNTHETIC_ORGANIZATION = 'Agent Friendly Web Synthetic Canary';
const REQUESTED_PLAN_PURPOSE = 'requested_plan';
const GRANTED_ACTION = 'granted';
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const HASH = /^[0-9a-f]{64}$/;
const LOCALES = new Set(['es', 'en', 'pt']);
const noStore = { 'cache-control': 'no-store, private' };

function failure(code) {
  return { ok: false, code };
}

function json(body, status) {
  return Response.json(body, { status, headers: noStore });
}

function allowedSubjectHashes(value) {
  return new Set(
    String(value || '')
      .split(',')
      .map((item) => item.trim().toLowerCase())
      .filter((item) => HASH.test(item)),
  );
}

function validBoundary(request) {
  try {
    const url = new URL(request.url);
    return request.method === 'GET'
      && url.protocol === 'https:'
      && url.host.toLowerCase() === CANARY_HOST
      && url.pathname === CANARY_PATH
      && !url.search;
  } catch {
    return false;
  }
}

function isD1Database(database) {
  return Boolean(database && typeof database.prepare === 'function');
}

async function loadSyntheticSource(database) {
  return database
    .prepare(`SELECT l.id, l.locale, l.state, COUNT(*) OVER () AS candidateCount
      FROM contact_leads AS l
      WHERE l.email = ?
        AND l.domain = ?
        AND l.organization = ?
        AND EXISTS (
          SELECT 1 FROM consent_receipts AS c
          WHERE c.lead_id = l.id AND c.purpose = ? AND c.action = ?
        )
      ORDER BY l.created_at DESC
      LIMIT 1`)
    .bind(
      SYNTHETIC_EMAIL,
      SYNTHETIC_DOMAIN,
      SYNTHETIC_ORGANIZATION,
      REQUESTED_PLAN_PURPOSE,
      GRANTED_ACTION,
    )
    .first();
}

export async function loadSyntheticCommercialReview(database, actorHash) {
  if (!isD1Database(database)) return failure('synthetic_commercial_review_store_unavailable');
  if (typeof actorHash !== 'string' || !HASH.test(actorHash)) {
    return failure('synthetic_commercial_review_actor_invalid');
  }

  let source;
  try {
    source = await loadSyntheticSource(database);
  } catch {
    return failure('synthetic_commercial_review_store_unavailable');
  }
  if (!source) return failure('synthetic_commercial_review_source_not_found');
  if (
    !UUID.test(source.id)
    || !LOCALES.has(source.locale)
    || source.state !== 'new'
    || source.candidateCount !== 1
  ) {
    return failure('synthetic_commercial_review_source_invalid');
  }

  const sourceHash = await hashAccessSubject(source.id.toLowerCase());
  const normalized = normalizeOpportunityMetadata({
    opportunityId: `opp-synthetic-${sourceHash.slice(0, 20)}`,
    contactRef: `contact-synthetic-${sourceHash.slice(20, 40)}`,
    domain: SYNTHETIC_DOMAIN,
    segment: 'other',
    problem: 'discovery',
    source: 'inbound_request',
    locale: source.locale,
    stage: 'new',
    ownerContext: 'owner_unverified',
    maintainerContext: 'unknown',
    scopeCodes: ['discovery_pack', 'external_evidence'],
    estimatedValueBand: 'unknown',
    nextAction: 'confirm_interest',
    nextActionAt: null,
    evidenceRefs: [],
    lossReason: null,
  });
  if (!normalized.ok) return failure('synthetic_commercial_review_plan_invalid');

  const transition = planOpportunityTransition({
    opportunity: normalized.value,
    toStage: 'qualified',
    actorRef: `actor-${actorHash.slice(0, 20)}`,
    reasonCode: null,
    evidenceRefs: [],
  });
  if (!transition.ok) return failure('synthetic_commercial_review_plan_invalid');

  return {
    ok: true,
    value: {
      contract: SYNTHETIC_COMMERCIAL_REVIEW_CONTRACT,
      status: 'planned_not_persisted',
      synthetic: true,
      source: {
        type: 'synthetic_contact',
        persistedState: source.state,
        consentPurpose: REQUESTED_PLAN_PURPOSE,
      },
      opportunity: normalized.value,
      transition: transition.plan,
      capabilities: {
        readsSyntheticContact: true,
        persistsData: false,
        sendsEmail: false,
        createsProposal: false,
        chargesPayment: false,
      },
    },
  };
}

export function createSyntheticCommercialReviewHandler(overrides = {}) {
  const verifyAccessJwt = overrides.verifyAccessJwt || verifyCloudflareAccessJwt;
  const loadReview = overrides.loadReview || loadSyntheticCommercialReview;

  return async function handleSyntheticCommercialReview(request, env = {}) {
    if (env.AFW_SYNTHETIC_COMMERCIAL_REVIEW_ENABLED !== 'true') {
      return json(failure('synthetic_commercial_review_unavailable'), 404);
    }
    if (!validBoundary(request)) {
      return json(failure('synthetic_commercial_review_boundary_rejected'), 403);
    }
    if (!env.ACCESS_TEAM_DOMAIN || !env.ACCESS_AUD) {
      return json(failure('synthetic_commercial_review_misconfigured'), 503);
    }

    let access;
    try {
      access = await verifyAccessJwt({
        token: request.headers.get('cf-access-jwt-assertion') || '',
        teamDomain: env.ACCESS_TEAM_DOMAIN,
        audience: env.ACCESS_AUD,
      });
    } catch {
      return json(failure('synthetic_commercial_review_identity_rejected'), 403);
    }
    if (!access?.ok || typeof access.identity?.userId !== 'string' || !access.identity.userId) {
      return json(failure('synthetic_commercial_review_identity_rejected'), 403);
    }

    let actorHash;
    try {
      actorHash = await hashAccessSubject(access.identity.userId);
    } catch {
      return json(failure('synthetic_commercial_review_identity_rejected'), 403);
    }
    const allowlist = allowedSubjectHashes(env.AFW_SYNTHETIC_CONTACT_ALLOWED_SUBJECT_HASHES);
    if (allowlist.size === 0) {
      return json(failure('synthetic_commercial_review_misconfigured'), 503);
    }
    if (!allowlist.has(actorHash)) {
      return json(failure('synthetic_commercial_review_actor_not_allowed'), 403);
    }
    if (!isD1Database(env.DB)) {
      return json(failure('synthetic_commercial_review_misconfigured'), 503);
    }

    let result;
    try {
      result = await loadReview(env.DB, actorHash);
    } catch {
      return json(failure('synthetic_commercial_review_store_unavailable'), 503);
    }
    if (!result?.ok) {
      const status = result?.code === 'synthetic_commercial_review_source_not_found' ? 404 : 503;
      return json(failure(result?.code || 'synthetic_commercial_review_store_unavailable'), status);
    }
    return json(result.value, 200);
  };
}

export default createSyntheticCommercialReviewHandler();
