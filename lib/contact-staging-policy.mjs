const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const hostPattern = /^(?=.{1,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)*[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/;
const publicHosts = new Set(['agentfriendlyweb.dev', 'www.agentfriendlyweb.dev']);

function normalizedEmail(value) {
  const email = typeof value === 'string' ? value.trim().toLowerCase() : '';
  return email.length <= 254 && emailPattern.test(email) ? email : '';
}

function normalizedHost(value) {
  const host = typeof value === 'string' ? value.trim().toLowerCase().replace(/\.$/, '') : '';
  return hostPattern.test(host) && !publicHosts.has(host) ? host : '';
}

export function readContactStagingPolicy(input = {}) {
  const allowedEmails = [...new Set(
    String(input.CONTACT_STAGING_ALLOWED_EMAILS || '')
      .split(',')
      .map(normalizedEmail)
      .filter(Boolean),
  )];
  return {
    mode: input.CONTACT_STAGING_MODE === 'staging_allowlist' ? 'staging_allowlist' : '',
    writesEnabled: input.CONTACT_STAGING_WRITES_ENABLED === 'true',
    expectedHost: normalizedHost(input.CONTACT_STAGING_EXPECTED_HOST),
    allowedEmails,
  };
}

export function authorizeContactStaging(policy, requestHost, identity = {}) {
  if (policy?.mode !== 'staging_allowlist') {
    return { allowed: false, status: 404, code: 'contact_staging_unavailable' };
  }
  if (!policy.expectedHost || !Array.isArray(policy.allowedEmails) || policy.allowedEmails.length === 0) {
    return { allowed: false, status: 503, code: 'contact_staging_misconfigured' };
  }
  const actualHost = typeof requestHost === 'string' ? requestHost.trim().toLowerCase().replace(/\.$/, '') : '';
  if (actualHost !== policy.expectedHost) {
    return { allowed: false, status: 404, code: 'contact_staging_unavailable' };
  }

  const actor = {
    userId: typeof identity.userId === 'string' ? identity.userId.trim().slice(0, 200) : '',
    email: normalizedEmail(identity.email),
  };
  if (!actor.userId || !actor.email) {
    return { allowed: false, status: 401, code: 'contact_staging_identity_required' };
  }
  if (!policy.allowedEmails.includes(actor.email)) {
    return { allowed: false, status: 403, code: 'contact_staging_actor_not_allowed' };
  }
  if (policy.writesEnabled !== true) {
    return { allowed: false, status: 503, code: 'contact_staging_kill_switch_closed' };
  }
  return { allowed: true, actor, rateLimitKey: `contact:${actor.userId}` };
}
