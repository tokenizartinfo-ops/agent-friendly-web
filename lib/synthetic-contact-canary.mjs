import { hashAccessSubject } from './access-subject-hash.mjs';
import { readBoundedJsonBody } from './bounded-json-body.mjs';
import { saveContactIntakeToD1 } from './contact-d1-store.mjs';
import { processContactRequest } from './contact-gate.mjs';
import { verifyCloudflareAccessJwt } from './cloudflare-access-identity.mjs';
import { preparePrivateReviewReadyNotification } from './private-review-ready-integration.mjs';
import { verifyTurnstileToken } from './turnstile.mjs';

export const SYNTHETIC_CONTACT_CANARY_CONTRACT = 'agent-friendly-web.synthetic-contact-canary.v1';

const CANARY_ORIGIN = 'https://canary.agentfriendlyweb.dev';
const CANARY_HOST = 'canary.agentfriendlyweb.dev';
const CANARY_PATH = '/api/canary/contact-intake';
const ACTION = 'create_synthetic_contact_and_prepare_review';
const TURNSTILE_ACTION = 'afw_synthetic_contact';
const ALLOWED_KEYS = new Set(['contract', 'idempotencyKey', 'action', 'humanApproved', 'turnstileToken']);
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const HASH = /^[0-9a-f]{64}$/;
const noStore = { 'cache-control': 'no-store, private' };

function json(body, status) {
  return Response.json(body, { status, headers: noStore });
}

function failure(status, code) {
  return json({ accepted: false, code }, status);
}

function allowedSubjectHashes(value) {
  return new Set(
    String(value || '')
      .split(',')
      .map((item) => item.trim().toLowerCase())
      .filter((item) => HASH.test(item)),
  );
}

function runtimeReady(env) {
  return Boolean(
    env?.DB
    && typeof env.DB.prepare === 'function'
    && typeof env.DB.batch === 'function'
    && typeof env.AFW_SYNTHETIC_CONTACT_TURNSTILE_SECRET === 'string'
    && env.AFW_SYNTHETIC_CONTACT_TURNSTILE_SECRET
    && env.AFW_SYNTHETIC_CONTACT_RATE_LIMITER
    && typeof env.AFW_SYNTHETIC_CONTACT_RATE_LIMITER.limit === 'function',
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

export function validateSyntheticContactCanaryRequest(input = {}) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return { ok: false, code: 'invalid_synthetic_contact_request' };
  }
  if (Object.keys(input).some((key) => !ALLOWED_KEYS.has(key))) {
    return { ok: false, code: 'invalid_synthetic_contact_request' };
  }
  if (
    Object.keys(input).length !== ALLOWED_KEYS.size
    || input.contract !== SYNTHETIC_CONTACT_CANARY_CONTRACT
    || typeof input.idempotencyKey !== 'string'
    || !UUID.test(input.idempotencyKey)
    || input.action !== ACTION
    || input.humanApproved !== true
    || typeof input.turnstileToken !== 'string'
    || input.turnstileToken.length < 1
    || input.turnstileToken.length > 2048
  ) {
    return { ok: false, code: 'invalid_synthetic_contact_request' };
  }

  return {
    ok: true,
    value: {
      contract: SYNTHETIC_CONTACT_CANARY_CONTRACT,
      idempotencyKey: input.idempotencyKey.toLowerCase(),
      action: ACTION,
      humanApproved: true,
      turnstileToken: input.turnstileToken,
    },
  };
}

function syntheticIntake(value) {
  return {
    email: 'synthetic-canary@example.invalid',
    name: '',
    domain: 'example.invalid',
    role: 'owner',
    organization: 'Agent Friendly Web Synthetic Canary',
    locale: 'es',
    objective: 'receive_plan',
    source: 'direct',
    idempotencyKey: value.idempotencyKey,
    requestedPlanConsent: true,
    commercialContactConsent: false,
    productUpdatesConsent: false,
    turnstileToken: value.turnstileToken,
  };
}

export function createSyntheticContactCanaryHandler(overrides = {}) {
  const verifyAccessJwt = overrides.verifyAccessJwt || verifyCloudflareAccessJwt;
  const readJson = overrides.readJson || ((request) => readBoundedJsonBody(request, { maxBytes: 4096 }));
  const processContact = overrides.processContact || processContactRequest;
  const verifyTurnstile = overrides.verifyTurnstile || verifyTurnstileToken;
  const saveContact = overrides.saveContact || saveContactIntakeToD1;
  const prepareReview = overrides.prepareReview || preparePrivateReviewReadyNotification;

  return async function handleSyntheticContactCanary(request, env = {}) {
    if (env.AFW_SYNTHETIC_CONTACT_ENABLED !== 'true') {
      return failure(404, 'synthetic_contact_unavailable');
    }
    if (!validBoundary(request)) return failure(403, 'synthetic_contact_boundary_rejected');
    if (!env.ACCESS_TEAM_DOMAIN || !env.ACCESS_AUD) {
      return failure(503, 'synthetic_contact_misconfigured');
    }

    let access;
    try {
      access = await verifyAccessJwt({
        token: request.headers.get('cf-access-jwt-assertion') || '',
        teamDomain: env.ACCESS_TEAM_DOMAIN,
        audience: env.ACCESS_AUD,
      });
    } catch {
      return failure(403, 'synthetic_contact_identity_rejected');
    }
    if (!access?.ok || typeof access.identity?.userId !== 'string' || !access.identity.userId) {
      return failure(403, 'synthetic_contact_identity_rejected');
    }

    let actorHash;
    try {
      actorHash = await hashAccessSubject(access.identity.userId);
    } catch {
      return failure(403, 'synthetic_contact_identity_rejected');
    }
    const allowlist = allowedSubjectHashes(env.AFW_SYNTHETIC_CONTACT_ALLOWED_SUBJECT_HASHES);
    if (allowlist.size === 0) return failure(503, 'synthetic_contact_misconfigured');
    if (!allowlist.has(actorHash)) return failure(403, 'synthetic_contact_actor_not_allowed');
    if (!runtimeReady(env)) return failure(503, 'synthetic_contact_misconfigured');

    let rateLimit;
    try {
      rateLimit = await env.AFW_SYNTHETIC_CONTACT_RATE_LIMITER.limit({
        key: `synthetic-contact:${actorHash}`,
      });
    } catch {
      return failure(503, 'synthetic_contact_misconfigured');
    }
    if (!rateLimit || typeof rateLimit.success !== 'boolean') {
      return failure(503, 'synthetic_contact_misconfigured');
    }
    if (!rateLimit.success) return failure(429, 'synthetic_contact_rate_limited');

    const parsed = await readJson(request);
    if (!parsed?.ok) return failure(parsed?.status || 400, 'invalid_synthetic_contact_request');
    const validation = validateSyntheticContactCanaryRequest(parsed.value);
    if (!validation.ok) return failure(400, validation.code);

    const remoteIp = request.headers.get('cf-connecting-ip') || '';
    let contact;
    try {
      contact = await processContact(syntheticIntake(validation.value), {
        enabled: true,
        verifyTurnstile: ({ token, idempotencyKey }) => verifyTurnstile({
          token,
          secret: env.AFW_SYNTHETIC_CONTACT_TURNSTILE_SECRET,
          remoteIp,
          idempotencyKey,
          action: TURNSTILE_ACTION,
          hostname: CANARY_HOST,
        }),
        save: (intake) => saveContact(env.DB, intake),
      });
    } catch {
      return failure(503, 'synthetic_contact_misconfigured');
    }
    if (!contact || !Number.isInteger(contact.status) || !contact.body) {
      return failure(503, 'synthetic_contact_misconfigured');
    }
    if (contact.body.accepted !== true) {
      return json(contact.body, contact.status);
    }
    if (typeof contact.body.leadId !== 'string' || !UUID.test(contact.body.leadId)) {
      return failure(503, 'synthetic_contact_storage_unavailable');
    }

    let review;
    try {
      review = await prepareReview(env.DB, {
        contract: 'agent-friendly-web.internal-review-ready-trigger.v1',
        requestId: contact.body.leadId,
        action: 'notify_internal_operator',
        humanApproved: true,
      });
    } catch {
      return failure(503, 'synthetic_contact_review_prepare_failed');
    }
    if (!review?.ok || review.status !== 'prepared_not_sent' || review.capabilities?.sendsEmail !== false) {
      return failure(503, 'synthetic_contact_review_prepare_failed');
    }

    return json({
      accepted: true,
      synthetic: true,
      duplicate: contact.body.duplicate === true,
      referenceId: contact.body.leadId,
      persistedState: 'new',
      consentPurposes: ['requested_plan'],
      reviewNotification: {
        prepared: true,
        status: 'prepared_not_sent',
        emailSent: false,
      },
    }, contact.body.duplicate === true ? 200 : 201);
  };
}

export default createSyntheticContactCanaryHandler();
