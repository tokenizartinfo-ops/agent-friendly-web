import { hashAccessSubject } from './access-subject-hash.mjs';
import { readBoundedJsonBody } from './bounded-json-body.mjs';
import { verifyCloudflareAccessJwt } from './cloudflare-access-identity.mjs';
import { loadSyntheticCommercialReview } from './synthetic-commercial-review.mjs';

export const SYNTHETIC_CRM_PERSISTENCE_CONTRACT = 'agent-friendly-web.synthetic-crm-persistence.v1';

const CANARY_ORIGIN = 'https://canary.agentfriendlyweb.dev';
const CANARY_HOST = 'canary.agentfriendlyweb.dev';
const CANARY_PATH = '/api/canary/synthetic-crm-persistence';
const ACTION = 'persist_one_synthetic_opportunity';
const CONFIRMATION = 'synthetic_only';
const ALLOWED_KEYS = new Set(['contract', 'action', 'confirmation']);
const HASH = /^[0-9a-f]{64}$/;
const OPAQUE_REF = /^[a-z][a-z0-9-]{2,79}$/;
const noStore = { 'cache-control': 'no-store, private' };

function failure(code) {
  return { ok: false, code };
}

function json(body, status) {
  return Response.json(body, { status, headers: noStore });
}

async function sha256(value) {
  const bytes = new TextEncoder().encode(value);
  const digest = await globalThis.crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

function isD1Database(database) {
  return Boolean(
    database
    && typeof database.prepare === 'function'
    && typeof database.batch === 'function',
  );
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
    return request.method === 'POST'
      && url.protocol === 'https:'
      && url.host.toLowerCase() === CANARY_HOST
      && url.pathname === CANARY_PATH
      && !url.search
      && request.headers.get('origin') === CANARY_ORIGIN;
  } catch {
    return false;
  }
}

function validateRequest(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return false;
  const keys = Object.keys(input);
  return keys.length === ALLOWED_KEYS.size
    && keys.every((key) => ALLOWED_KEYS.has(key))
    && input.contract === SYNTHETIC_CRM_PERSISTENCE_CONTRACT
    && input.action === ACTION
    && input.confirmation === CONFIRMATION;
}

function validateReview(review, actorHash) {
  const opportunity = review?.opportunity;
  const transition = review?.transition;
  const source = review?.source;
  const refsAreSafe = (value) => Array.isArray(value)
    && value.length <= 10
    && value.every((item) => typeof item === 'string' && item.startsWith('https://'));
  const scopesAreSafe = Array.isArray(opportunity?.scopeCodes)
    && opportunity.scopeCodes.length > 0
    && opportunity.scopeCodes.length <= 10
    && opportunity.scopeCodes.every((item) => typeof item === 'string' && /^[a-z][a-z0-9_]{2,63}$/.test(item));

  return HASH.test(String(actorHash || ''))
    && review?.contract === 'agent-friendly-web.synthetic-commercial-review.v1'
    && review?.status === 'planned_not_persisted'
    && review?.synthetic === true
    && source?.type === 'synthetic_contact'
    && source?.persistedState === 'new'
    && source?.consentPurpose === 'requested_plan'
    && OPAQUE_REF.test(String(opportunity?.opportunityId || ''))
    && OPAQUE_REF.test(String(opportunity?.contactRef || ''))
    && opportunity?.domain === 'example.invalid'
    && opportunity?.stage === 'new'
    && ['es', 'en', 'pt'].includes(opportunity?.locale)
    && typeof opportunity?.segment === 'string'
    && typeof opportunity?.problem === 'string'
    && typeof opportunity?.source === 'string'
    && typeof opportunity?.ownerContext === 'string'
    && typeof opportunity?.maintainerContext === 'string'
    && typeof opportunity?.estimatedValueBand === 'string'
    && typeof opportunity?.nextAction === 'string'
    && (opportunity?.nextActionAt === null || typeof opportunity?.nextActionAt === 'string')
    && (opportunity?.lossReason === null || typeof opportunity?.lossReason === 'string')
    && scopesAreSafe
    && refsAreSafe(opportunity?.evidenceRefs)
    && transition?.contract === 'agent-friendly-web.crm-lite.v1'
    && OPAQUE_REF.test(String(transition?.transitionPlanId || ''))
    && transition?.opportunityId === opportunity.opportunityId
    && transition?.idempotencyKey === `${opportunity.opportunityId}:new:qualified`
    && transition?.fromStage === 'new'
    && transition?.toStage === 'qualified'
    && transition?.persistenceEnabled === false
    && transition?.automaticActionsAllowed === false
    && refsAreSafe(transition?.evidenceRefs);
}

function resultFor(review, values = {}) {
  return {
    opportunityId: review.opportunity.opportunityId,
    transitionPlanId: review.transition.transitionPlanId,
    stage: 'qualified',
    persisted: values.persisted === true,
    duplicate: values.duplicate === true,
    conflict: values.conflict === true,
  };
}

async function findExisting(database, review, actorHash) {
  return database
    .prepare(`SELECT o.id AS opportunityId, o.stage, o.request_hash AS requestHash,
        e.id AS transitionPlanId, e.request_hash AS eventRequestHash
      FROM crm_opportunities AS o
      JOIN crm_transition_events AS e ON e.opportunity_id = o.id
      WHERE o.idempotency_key = ? AND o.actor_subject_hash = ?
      LIMIT 1`)
    .bind(review.transition.idempotencyKey, actorHash)
    .first();
}

function classifyExisting(row, review, requestHash) {
  const duplicate = row?.opportunityId === review.opportunity.opportunityId
    && row?.transitionPlanId === review.transition.transitionPlanId
    && row?.stage === 'qualified'
    && row?.requestHash === requestHash
    && row?.eventRequestHash === requestHash;
  return resultFor(review, {
    persisted: duplicate,
    duplicate,
    conflict: !duplicate,
  });
}

function batchSucceeded(results) {
  return Array.isArray(results)
    && results.length === 2
    && results.every((item) => item?.success !== false && Number(item?.meta?.changes || 0) === 1);
}

function isUniqueConflict(error) {
  return String(error instanceof Error ? error.message : error || '').includes('UNIQUE constraint failed');
}

export async function canonicalSyntheticCrmRequestHash(review, actorHash) {
  if (!validateReview(review, actorHash)) throw new Error('synthetic_crm_store_invalid_input');
  return sha256(JSON.stringify([
    SYNTHETIC_CRM_PERSISTENCE_CONTRACT,
    review.source,
    review.opportunity,
    review.transition,
    actorHash,
  ]));
}

export async function persistSyntheticCrmPlan(database, review, actorHash, overrides = {}) {
  if (!isD1Database(database)) throw new Error('synthetic_crm_store_unavailable');
  if (!validateReview(review, actorHash)) throw new Error('synthetic_crm_store_invalid_input');
  const requestHash = await canonicalSyntheticCrmRequestHash(review, actorHash);
  const existing = await findExisting(database, review, actorHash);
  if (existing) return classifyExisting(existing, review, requestHash);

  const now = (overrides.now || (() => new Date().toISOString()))();
  if (typeof now !== 'string' || Number.isNaN(Date.parse(now))) {
    throw new Error('synthetic_crm_store_invalid_input');
  }
  const opportunity = review.opportunity;
  const transition = review.transition;
  const opportunityInsert = database
    .prepare(`INSERT INTO crm_opportunities (
      id, contact_ref, domain, segment, problem, source, locale, stage,
      owner_context, maintainer_context, scope_codes_json, estimated_value_band,
      next_action, next_action_at, evidence_refs_json, loss_reason,
      actor_subject_hash, idempotency_key, request_hash, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .bind(
      opportunity.opportunityId,
      opportunity.contactRef,
      opportunity.domain,
      opportunity.segment,
      opportunity.problem,
      opportunity.source,
      opportunity.locale,
      transition.toStage,
      opportunity.ownerContext,
      opportunity.maintainerContext,
      JSON.stringify(opportunity.scopeCodes),
      opportunity.estimatedValueBand,
      opportunity.nextAction,
      opportunity.nextActionAt || '',
      JSON.stringify(opportunity.evidenceRefs),
      opportunity.lossReason || '',
      actorHash,
      transition.idempotencyKey,
      requestHash,
      now,
      now,
    );
  const transitionInsert = database
    .prepare(`INSERT INTO crm_transition_events (
      id, opportunity_id, actor_subject_hash, from_stage, to_stage,
      reason_code, evidence_refs_json, idempotency_key, request_hash, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .bind(
      transition.transitionPlanId,
      opportunity.opportunityId,
      actorHash,
      transition.fromStage,
      transition.toStage,
      transition.reasonCode || '',
      JSON.stringify(transition.evidenceRefs),
      transition.idempotencyKey,
      requestHash,
      now,
    );

  try {
    const results = await database.batch([opportunityInsert, transitionInsert]);
    if (!batchSucceeded(results)) throw new Error('synthetic_crm_store_failed');
  } catch (error) {
    if (!isUniqueConflict(error)) throw new Error('synthetic_crm_store_failed');
    const winner = await findExisting(database, review, actorHash);
    if (!winner) throw new Error('synthetic_crm_store_failed');
    return classifyExisting(winner, review, requestHash);
  }

  return resultFor(review, { persisted: true });
}

export function createSyntheticCrmPersistenceHandler(overrides = {}) {
  const verifyAccessJwt = overrides.verifyAccessJwt || verifyCloudflareAccessJwt;
  const readJson = overrides.readJson || ((request) => readBoundedJsonBody(request, { maxBytes: 1024 }));
  const loadReview = overrides.loadReview || loadSyntheticCommercialReview;
  const persistPlan = overrides.persistPlan || persistSyntheticCrmPlan;

  return async function handleSyntheticCrmPersistence(request, env = {}) {
    if (env.AFW_SYNTHETIC_CRM_PERSISTENCE_ENABLED !== 'true') {
      return json(failure('synthetic_crm_persistence_unavailable'), 404);
    }
    if (!validBoundary(request)) return json(failure('synthetic_crm_persistence_boundary_rejected'), 403);
    if (!env.ACCESS_TEAM_DOMAIN || !env.ACCESS_AUD) {
      return json(failure('synthetic_crm_persistence_misconfigured'), 503);
    }

    let access;
    try {
      access = await verifyAccessJwt({
        token: request.headers.get('cf-access-jwt-assertion') || '',
        teamDomain: env.ACCESS_TEAM_DOMAIN,
        audience: env.ACCESS_AUD,
      });
    } catch {
      return json(failure('synthetic_crm_persistence_identity_rejected'), 403);
    }
    if (!access?.ok || typeof access.identity?.userId !== 'string' || !access.identity.userId) {
      return json(failure('synthetic_crm_persistence_identity_rejected'), 403);
    }

    let actorHash;
    try {
      actorHash = await hashAccessSubject(access.identity.userId);
    } catch {
      return json(failure('synthetic_crm_persistence_identity_rejected'), 403);
    }
    const allowlist = allowedSubjectHashes(env.AFW_SYNTHETIC_CONTACT_ALLOWED_SUBJECT_HASHES);
    if (allowlist.size === 0 || !isD1Database(env.DB) || typeof env.AFW_SYNTHETIC_CONTACT_RATE_LIMITER?.limit !== 'function') {
      return json(failure('synthetic_crm_persistence_misconfigured'), 503);
    }
    if (!allowlist.has(actorHash)) {
      return json(failure('synthetic_crm_persistence_actor_not_allowed'), 403);
    }

    let rateLimit;
    try {
      rateLimit = await env.AFW_SYNTHETIC_CONTACT_RATE_LIMITER.limit({
        key: `synthetic-crm:${actorHash}`,
      });
    } catch {
      return json(failure('synthetic_crm_persistence_misconfigured'), 503);
    }
    if (!rateLimit || typeof rateLimit.success !== 'boolean') {
      return json(failure('synthetic_crm_persistence_misconfigured'), 503);
    }
    if (!rateLimit.success) return json(failure('synthetic_crm_persistence_rate_limited'), 429);

    const parsed = await readJson(request);
    if (!parsed?.ok || !validateRequest(parsed.value)) {
      return json(failure('invalid_synthetic_crm_persistence_request'), parsed?.status || 400);
    }

    let review;
    try {
      review = await loadReview(env.DB, actorHash);
    } catch {
      return json(failure('synthetic_crm_persistence_source_unavailable'), 503);
    }
    if (!review?.ok) {
      const status = review?.code === 'synthetic_commercial_review_source_not_found' ? 404 : 503;
      return json(failure(review?.code || 'synthetic_crm_persistence_source_unavailable'), status);
    }

    let stored;
    try {
      stored = await persistPlan(env.DB, review.value, actorHash);
    } catch {
      return json(failure('synthetic_crm_persistence_store_failed'), 503);
    }
    if (stored?.conflict) {
      return json(failure('synthetic_crm_persistence_idempotency_conflict'), 409);
    }
    if (!stored?.persisted || stored.stage !== 'qualified') {
      return json(failure('synthetic_crm_persistence_store_failed'), 503);
    }

    return json({
      contract: SYNTHETIC_CRM_PERSISTENCE_CONTRACT,
      status: stored.duplicate
        ? 'synthetic_opportunity_already_persisted'
        : 'synthetic_opportunity_persisted',
      synthetic: true,
      opportunity: {
        opportunityId: stored.opportunityId,
        transitionPlanId: stored.transitionPlanId,
        stage: stored.stage,
        duplicate: stored.duplicate,
      },
      capabilities: {
        persistsSyntheticOpportunity: true,
        sendsEmail: false,
        createsProposal: false,
        chargesPayment: false,
        modifiesCustomerSite: false,
      },
    }, stored.duplicate ? 200 : 201);
  };
}

export default createSyntheticCrmPersistenceHandler();
