import { authorizeContactStaging } from './contact-staging-policy.mjs';

function result(status, code) {
  return { status, body: { accepted: false, code } };
}

export async function processStagingContactRequest(request, dependencies = {}) {
  let requestHost = '';
  try {
    requestHost = new URL(request.url).host.toLowerCase();
  } catch {
    return result(404, 'contact_staging_unavailable');
  }

  const authorization = authorizeContactStaging(
    dependencies.policy,
    requestHost,
    dependencies.identity,
  );
  if (!authorization.allowed) return result(authorization.status, authorization.code);

  if (dependencies.runtimeReady !== true) {
    return result(503, 'contact_staging_misconfigured');
  }

  if (typeof dependencies.consumeRateLimit !== 'function') {
    return result(503, 'contact_staging_misconfigured');
  }
  let rateLimit;
  try {
    rateLimit = await dependencies.consumeRateLimit(authorization.rateLimitKey);
  } catch {
    return result(503, 'contact_staging_misconfigured');
  }
  if (rateLimit?.allowed !== true) return result(429, 'contact_staging_rate_limited');

  if (typeof dependencies.readJson !== 'function' || typeof dependencies.handleContact !== 'function') {
    return result(503, 'contact_staging_misconfigured');
  }
  const parsed = await dependencies.readJson(request);
  if (!parsed?.ok) return result(parsed?.status || 400, parsed?.code || 'invalid_json');

  try {
    return await dependencies.handleContact(parsed.value);
  } catch {
    return result(503, 'contact_staging_misconfigured');
  }
}
