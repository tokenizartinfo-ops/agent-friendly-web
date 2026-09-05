const CANARY_ORIGIN = 'https://canary.agentfriendlyweb.dev';
const ENDPOINT = `${CANARY_ORIGIN}/api/canary/email/review-ready`;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function canRunNegativeEmailProbe(enabledValue, probeMode) {
  return enabledValue !== 'true' && probeMode === 'negative';
}

export function buildEmailReviewReadyProbeRequest(incomingRequest, overrides = {}) {
  const randomUUID = overrides.randomUUID || (() => globalThis.crypto.randomUUID());
  const now = (overrides.now || (() => new Date()))();
  const idempotencyKey = randomUUID();
  const instant = now instanceof Date ? now : new Date(now);

  if (!UUID.test(String(idempotencyKey || '')) || Number.isNaN(instant.getTime())) {
    throw new Error('probe_generation_failed');
  }

  const day = instant.toISOString().slice(0, 10).replaceAll('-', '');
  const nonce = idempotencyKey.replaceAll('-', '').slice(0, 12).toLowerCase();
  const assertion = incomingRequest.headers.get('cf-access-jwt-assertion') || '';
  const body = {
    contract: 'agent-friendly-web.email-review-ready.v1',
    eventId: `afw-review-ready-${day}-${nonce}`,
    idempotencyKey,
    templateId: 'internal-review-ready-v1',
    locale: 'es',
    purpose: 'internal_review_ready',
    humanApproved: true,
  };

  return new Request(ENDPOINT, {
    method: 'POST',
    headers: {
      origin: CANARY_ORIGIN,
      'content-type': 'application/json',
      'cf-access-jwt-assertion': assertion,
    },
    body: JSON.stringify(body),
  });
}
