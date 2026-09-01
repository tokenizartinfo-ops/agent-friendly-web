const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const hostPattern = /^(?=.{1,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/;
const teamDomainPattern = /^(?=.{1,253}$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.cloudflareaccess\.com$/;
const contactPath = '/api/contact-intake';
const allowedRequestHeaders = new Set(['content-type']);

function normalizeEmail(value) {
  const email = typeof value === 'string' ? value.trim().toLowerCase() : '';
  return email.length <= 254 && emailPattern.test(email) ? email : '';
}

function normalizeHost(value) {
  const host = typeof value === 'string' ? value.trim().toLowerCase().replace(/\.$/, '') : '';
  return hostPattern.test(host) ? host : '';
}

function normalizeFormOrigin(value) {
  if (typeof value !== 'string') return '';
  try {
    const url = new URL(value.trim());
    if (
      url.protocol !== 'https:'
      || url.username
      || url.password
      || url.pathname !== '/'
      || url.search
      || url.hash
      || url.port
    ) return '';
    return url.origin;
  } catch {
    return '';
  }
}

function baseCorsHeaders(policy) {
  return {
    'access-control-allow-origin': policy.formOrigin,
    'access-control-allow-credentials': 'true',
    'cache-control': 'no-store',
    vary: 'Origin',
  };
}

function denied(status, code, corsHeaders = {}) {
  return { proceed: false, status, code, corsHeaders };
}

function isConfigured(policy) {
  return Boolean(
    policy?.apiHost
    && policy?.formOrigin
    && policy?.widgetHost
    && Array.isArray(policy.allowedEmails)
    && policy.allowedEmails.length > 0
    && policy.accessTeamDomain
    && policy.accessAudience,
  );
}

export function readContactWorkerPolicy(input = {}) {
  const allowedEmails = [...new Set(
    String(input.CONTACT_STAGING_ALLOWED_EMAILS || '')
      .split(',')
      .map(normalizeEmail)
      .filter(Boolean),
  )];
  const teamDomain = typeof input.CONTACT_ACCESS_TEAM_DOMAIN === 'string'
    ? input.CONTACT_ACCESS_TEAM_DOMAIN.trim().toLowerCase().replace(/\.$/, '')
    : '';
  const accessAudience = typeof input.CONTACT_ACCESS_AUD === 'string'
    ? input.CONTACT_ACCESS_AUD.trim().slice(0, 513)
    : '';

  return {
    mode: input.CONTACT_STAGING_MODE === 'staging_allowlist' ? 'staging_allowlist' : '',
    writesEnabled: input.CONTACT_STAGING_WRITES_ENABLED === 'true',
    apiHost: normalizeHost(input.CONTACT_STAGING_API_HOST),
    formOrigin: normalizeFormOrigin(input.CONTACT_STAGING_FORM_ORIGIN),
    widgetHost: normalizeHost(input.CONTACT_STAGING_WIDGET_HOST),
    allowedEmails,
    accessTeamDomain: teamDomainPattern.test(teamDomain) ? teamDomain : '',
    accessAudience: accessAudience.length <= 512 ? accessAudience : '',
  };
}

export function evaluateContactWorkerRequest(policy, request) {
  let url;
  try {
    url = new URL(request.url);
  } catch {
    return denied(404, 'contact_staging_unavailable');
  }

  if (url.pathname !== contactPath || url.search) {
    return denied(404, 'contact_staging_unavailable');
  }
  if (request.method !== 'POST' && request.method !== 'OPTIONS') {
    return denied(405, 'contact_staging_method_not_allowed');
  }
  if (policy?.mode !== 'staging_allowlist') {
    return denied(404, 'contact_staging_unavailable');
  }
  if (!isConfigured(policy)) {
    return denied(503, 'contact_staging_misconfigured');
  }
  if (url.protocol !== 'https:' || url.host.toLowerCase() !== policy.apiHost) {
    return denied(404, 'contact_staging_unavailable');
  }

  const origin = request.headers.get('origin') || '';
  if (origin !== policy.formOrigin) {
    return denied(403, 'contact_staging_cors_forbidden');
  }
  const corsHeaders = baseCorsHeaders(policy);
  if (policy.writesEnabled !== true) {
    return denied(503, 'contact_staging_kill_switch_closed', corsHeaders);
  }

  if (request.method === 'OPTIONS') {
    const requestedMethod = request.headers.get('access-control-request-method') || '';
    const requestedHeaders = (request.headers.get('access-control-request-headers') || '')
      .split(',')
      .map((header) => header.trim().toLowerCase())
      .filter(Boolean);
    if (
      requestedMethod !== 'POST'
      || requestedHeaders.some((header) => !allowedRequestHeaders.has(header))
    ) {
      return denied(403, 'contact_staging_cors_forbidden', corsHeaders);
    }
    return {
      proceed: false,
      preflight: true,
      status: 204,
      code: 'contact_staging_preflight',
      corsHeaders: {
        ...corsHeaders,
        'access-control-allow-methods': 'POST, OPTIONS',
        'access-control-allow-headers': 'content-type',
        'access-control-max-age': '600',
      },
    };
  }

  return { proceed: true, corsHeaders };
}

export function authorizeContactWorkerIdentity(policy, identity = {}) {
  const actor = {
    userId: typeof identity.userId === 'string' ? identity.userId.trim().slice(0, 200) : '',
    email: normalizeEmail(identity.email),
  };
  if (!actor.userId || !actor.email) {
    return { allowed: false, status: 401, code: 'contact_staging_identity_required' };
  }
  if (!Array.isArray(policy?.allowedEmails) || !policy.allowedEmails.includes(actor.email)) {
    return { allowed: false, status: 403, code: 'contact_staging_actor_not_allowed' };
  }
  return { allowed: true, actor };
}

export async function createOpaqueRateLimitKey(userId, pathname) {
  const actor = typeof userId === 'string' ? userId.trim() : '';
  const path = typeof pathname === 'string' ? pathname.trim() : '';
  if (!actor || actor.length > 200 || path !== contactPath) {
    throw new Error('invalid_rate_limit_subject');
  }
  const bytes = new TextEncoder().encode(`${actor}\n${path}`);
  const digest = await globalThis.crypto.subtle.digest('SHA-256', bytes);
  const hex = Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
  return `contact:${hex}`;
}
