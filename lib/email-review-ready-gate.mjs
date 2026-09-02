import { readBoundedJsonBody } from './bounded-json-body.mjs';
import { verifyCloudflareAccessJwt } from './cloudflare-access-identity.mjs';
import {
  markEmailReviewReadyFailed,
  markEmailReviewReadySent,
  reserveEmailReviewReadyDelivery,
} from './email-review-ready-d1.mjs';
import {
  buildEmailReviewReadyMessage,
  validateEmailReviewReadyRequest,
} from './email-review-ready.mjs';

const CANARY_ORIGIN = 'https://canary.agentfriendlyweb.dev';
const CANARY_HOST = 'canary.agentfriendlyweb.dev';
const CANARY_PATH = '/api/canary/email/review-ready';
const HASH = /^[0-9a-f]{64}$/;
const noStore = { 'cache-control': 'no-store, private' };

function json(body, status) {
  return Response.json(body, { status, headers: noStore });
}

function failure(status, code) {
  return json({ sent: false, code }, status);
}

async function sha256(value) {
  const bytes = new TextEncoder().encode(value);
  const digest = await globalThis.crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

function allowedSubjectHashes(value) {
  const hashes = String(value || '')
    .split(',')
    .map((item) => item.trim().toLowerCase())
    .filter((item) => HASH.test(item));
  return new Set(hashes);
}

function runtimeReady(env) {
  return Boolean(
    env?.DB
    && typeof env.DB.prepare === 'function'
    && env?.EMAIL_REVIEW_READY
    && typeof env.EMAIL_REVIEW_READY.send === 'function'
    && env?.AFW_EMAIL_REVIEW_READY_RATE_LIMITER
    && typeof env.AFW_EMAIL_REVIEW_READY_RATE_LIMITER.limit === 'function',
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

function sentReceipt(value, duplicate) {
  return {
    sent: true,
    duplicate,
    eventId: value.eventId,
    templateId: value.templateId,
  };
}

export function createEmailReviewReadyHandler(overrides = {}) {
  const verifyAccessJwt = overrides.verifyAccessJwt || verifyCloudflareAccessJwt;
  const readJson = overrides.readJson || ((request) => readBoundedJsonBody(request, { maxBytes: 2048 }));
  const reserve = overrides.reserve || reserveEmailReviewReadyDelivery;
  const markSent = overrides.markSent || markEmailReviewReadySent;
  const markFailed = overrides.markFailed || markEmailReviewReadyFailed;

  return async function handleEmailReviewReady(request, env = {}) {
    if (env.AFW_EMAIL_REVIEW_READY_ENABLED !== 'true') {
      return failure(404, 'email_review_ready_unavailable');
    }
    if (!validBoundary(request)) return failure(403, 'email_review_ready_boundary_rejected');
    if (!env.ACCESS_TEAM_DOMAIN || !env.ACCESS_AUD) {
      return failure(503, 'email_review_ready_misconfigured');
    }

    const access = await verifyAccessJwt({
      token: request.headers.get('cf-access-jwt-assertion') || '',
      teamDomain: env.ACCESS_TEAM_DOMAIN,
      audience: env.ACCESS_AUD,
    });
    if (!access?.ok || typeof access.identity?.userId !== 'string' || !access.identity.userId) {
      return failure(403, 'email_review_ready_identity_rejected');
    }

    const actorHash = await sha256(access.identity.userId);
    const allowlist = allowedSubjectHashes(env.AFW_EMAIL_REVIEW_READY_ALLOWED_SUBJECT_HASHES);
    if (allowlist.size === 0) return failure(503, 'email_review_ready_misconfigured');
    if (!allowlist.has(actorHash)) return failure(403, 'email_review_ready_actor_not_allowed');
    if (!runtimeReady(env)) return failure(503, 'email_review_ready_misconfigured');

    const rateLimit = await env.AFW_EMAIL_REVIEW_READY_RATE_LIMITER.limit({
      key: `email-review-ready:${actorHash}`,
    });
    if (!rateLimit || typeof rateLimit.success !== 'boolean') {
      return failure(503, 'email_review_ready_misconfigured');
    }
    if (!rateLimit.success) return failure(429, 'email_review_ready_rate_limited');

    const parsed = await readJson(request);
    if (!parsed?.ok) return failure(parsed?.status || 400, 'invalid_email_review_ready_request');
    const validation = validateEmailReviewReadyRequest(parsed.value);
    if (!validation.ok) return failure(400, 'invalid_email_review_ready_request');
    const value = validation.value;

    let reservation;
    try {
      reservation = await reserve(env.DB, value, actorHash);
    } catch {
      return failure(503, 'email_review_ready_storage_unavailable');
    }
    if (!reservation || reservation.conflict === true) {
      return failure(409, 'email_review_ready_idempotency_conflict');
    }
    if (reservation.duplicate === true) {
      if (reservation.state === 'sent') return json(sentReceipt(value, true), 200);
      if (reservation.state === 'reserved') return failure(409, 'email_review_ready_delivery_pending');
      if (reservation.state === 'failed') return failure(409, 'email_review_ready_delivery_failed_no_retry');
      return failure(503, 'email_review_ready_storage_unavailable');
    }
    if (reservation.state !== 'reserved' || typeof reservation.reservationId !== 'string') {
      return failure(503, 'email_review_ready_storage_unavailable');
    }

    const built = buildEmailReviewReadyMessage(value);
    if (!built.ok) return failure(500, 'email_review_ready_template_failed');

    let providerResult;
    try {
      providerResult = await env.EMAIL_REVIEW_READY.send(built.message);
    } catch {
      try {
        await markFailed(env.DB, reservation.reservationId, 'provider_delivery_failed');
      } catch {
        // The reservation remains at-most-once and requires manual reconciliation.
      }
      return failure(502, 'email_review_ready_delivery_failed');
    }

    if (!providerResult || typeof providerResult.messageId !== 'string' || !providerResult.messageId) {
      try {
        await markFailed(env.DB, reservation.reservationId, 'provider_invalid_receipt');
      } catch {
        // The reservation remains at-most-once and requires manual reconciliation.
      }
      return failure(502, 'email_review_ready_delivery_failed');
    }

    try {
      const marked = await markSent(env.DB, reservation.reservationId, providerResult.messageId);
      if (!marked?.updated) return failure(503, 'email_review_ready_receipt_unavailable');
    } catch {
      return failure(503, 'email_review_ready_receipt_unavailable');
    }

    return json(sentReceipt(value, false), 201);
  };
}

export default createEmailReviewReadyHandler();
