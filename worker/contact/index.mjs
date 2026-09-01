import { readBoundedJsonBody } from '../../lib/bounded-json-body.mjs';
import { verifyCloudflareAccessJwt } from '../../lib/cloudflare-access-identity.mjs';
import { saveContactIntakeToD1 } from '../../lib/contact-d1-store.mjs';
import { processContactRequest } from '../../lib/contact-gate.mjs';
import {
  authorizeContactWorkerIdentity,
  createOpaqueRateLimitKey,
  evaluateContactWorkerRequest,
  readContactWorkerPolicy,
} from '../../lib/contact-worker-policy.mjs';
import { verifyTurnstileToken } from '../../lib/turnstile.mjs';

const noStore = { 'cache-control': 'no-store' };
const syntheticTurnstileSecret = '1x0000000000000000000000000000000AA';
const syntheticTurnstileToken = 'XXXX.DUMMY.TOKEN.XXXX';

function jsonResponse(body, status, corsHeaders = {}) {
  return Response.json(body, { status, headers: { ...corsHeaders, ...noStore } });
}

function failure(status, code, corsHeaders = {}) {
  return jsonResponse({ accepted: false, code }, status, corsHeaders);
}

function isExactSyntheticPayload(value) {
  return Boolean(
    value
    && value.email === 'gate-6b3-canary@example.com'
    && value.name === 'Caso sintetico Gate 6B.3'
    && value.organization === 'Agent Friendly Web Synthetic'
    && value.role === 'synthetic_test'
    && value.domain === 'example.com'
    && value.locale === 'es'
    && value.objective === 'receive_plan'
    && value.source === 'public_audit'
    && value.requestedPlanConsent === true
    && value.commercialContactConsent === false
    && value.productUpdatesConsent === false
    && value.turnstileToken === syntheticTurnstileToken
  );
}

function readSyntheticGateState(env = {}) {
  const gate = env.CONTACT_SYNTHETIC_GATE_ENABLED;
  const turnstile = env.CONTACT_SYNTHETIC_TURNSTILE_TEST;
  if (
    (gate === undefined || gate === 'false')
    && (turnstile === undefined || turnstile === 'false')
  ) return 'off';
  if (gate === 'true' && turnstile === 'true') return 'on';
  return 'invalid';
}

function runtimeReady(env) {
  return Boolean(
    env?.DB
    && typeof env.DB.prepare === 'function'
    && typeof env.DB.batch === 'function'
    && typeof env.CONTACT_STAGING_TURNSTILE_SECRET === 'string'
    && env.CONTACT_STAGING_TURNSTILE_SECRET
    && env.CONTACT_STAGING_RATE_LIMITER
    && typeof env.CONTACT_STAGING_RATE_LIMITER.limit === 'function',
  );
}

export function createContactWorker(overrides = {}) {
  const verifyAccessJwt = overrides.verifyAccessJwt || verifyCloudflareAccessJwt;
  const readJson = overrides.readJson || ((request) => readBoundedJsonBody(request, { maxBytes: 8192 }));
  const processContact = overrides.processContact || processContactRequest;
  const verifyTurnstile = overrides.verifyTurnstile || verifyTurnstileToken;
  const saveContact = overrides.saveContact || saveContactIntakeToD1;

  return {
    async fetch(request, env = {}) {
      let url;
      try {
        url = new URL(request.url);
      } catch {
        return failure(404, 'contact_staging_unavailable');
      }

      const policy = readContactWorkerPolicy(env);
      if (request.method === 'GET' && url.pathname === '/health' && !url.search) {
        return jsonResponse({
          service: 'agent-friendly-web-contact-staging-frontier',
          surface: 'contact_staging_api',
          status: 'deployed',
          mode: policy.mode || 'unavailable',
          writes: policy.writesEnabled === true,
        }, 200);
      }

      const syntheticGateState = readSyntheticGateState(env);
      if (syntheticGateState === 'invalid') {
        return failure(503, 'contact_staging_misconfigured');
      }

      const boundary = evaluateContactWorkerRequest(policy, request);
      if (!boundary.proceed) {
        if (boundary.preflight && boundary.status === 204) {
          return new Response(null, { status: 204, headers: boundary.corsHeaders });
        }
        return failure(boundary.status, boundary.code, boundary.corsHeaders);
      }

      try {
        const access = await verifyAccessJwt({
          token: request.headers.get('cf-access-jwt-assertion') || '',
          teamDomain: policy.accessTeamDomain,
          audience: policy.accessAudience,
        });
        if (!access?.ok) {
          return failure(401, 'contact_staging_identity_required', boundary.corsHeaders);
        }

        const authorization = authorizeContactWorkerIdentity(policy, access.identity);
        if (!authorization.allowed) {
          return failure(authorization.status, authorization.code, boundary.corsHeaders);
        }
        if (!runtimeReady(env)) {
          return failure(503, 'contact_staging_misconfigured', boundary.corsHeaders);
        }

        const rateLimitKey = await createOpaqueRateLimitKey(authorization.actor.userId, url.pathname);
        const rateLimit = await env.CONTACT_STAGING_RATE_LIMITER.limit({ key: rateLimitKey });
        if (!rateLimit || typeof rateLimit.success !== 'boolean') {
          return failure(503, 'contact_staging_misconfigured', boundary.corsHeaders);
        }
        if (!rateLimit.success) {
          return failure(429, 'contact_staging_rate_limited', boundary.corsHeaders);
        }

        const parsed = await readJson(request);
        if (!parsed?.ok) {
          return failure(parsed?.status || 400, parsed?.code || 'invalid_json', boundary.corsHeaders);
        }

        const syntheticTurnstileTest = syntheticGateState === 'on';
        if (syntheticTurnstileTest) {
          if (env.CONTACT_STAGING_TURNSTILE_SECRET !== syntheticTurnstileSecret) {
            return failure(503, 'contact_staging_misconfigured', boundary.corsHeaders);
          }
          if (!isExactSyntheticPayload(parsed.value)) {
            return failure(403, 'synthetic_gate_payload_mismatch', boundary.corsHeaders);
          }
        }

        const remoteIp = request.headers.get('cf-connecting-ip') || '';
        const result = await processContact(parsed.value, {
          enabled: true,
          verifyTurnstile: ({ token, idempotencyKey, action }) => verifyTurnstile({
            token,
            secret: env.CONTACT_STAGING_TURNSTILE_SECRET,
            remoteIp,
            idempotencyKey,
            action: syntheticTurnstileTest ? '' : action,
            hostname: syntheticTurnstileTest ? '' : policy.widgetHost,
          }),
          save: (intake) => saveContact(env.DB, intake),
        });
        if (!result || !Number.isInteger(result.status) || !result.body) {
          return failure(503, 'contact_staging_misconfigured', boundary.corsHeaders);
        }
        return jsonResponse(result.body, result.status, boundary.corsHeaders);
      } catch {
        return failure(503, 'contact_staging_misconfigured', boundary.corsHeaders);
      }
    },
  };
}

export default createContactWorker();
