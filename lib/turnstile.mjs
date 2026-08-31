const SITEVERIFY = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

export async function verifyTurnstileToken({
  token,
  secret,
  remoteIp = '',
  idempotencyKey = '',
  action = '',
  hostname = '',
  fetchImpl = fetch,
  timeoutMs = 8000,
}) {
  if (typeof secret !== 'string' || !secret || typeof token !== 'string' || !token || token.length > 2048) {
    return { success: false, reason: 'missing_configuration_or_token' };
  }

  const body = new FormData();
  body.set('secret', secret);
  body.set('response', token);
  if (remoteIp) body.set('remoteip', remoteIp);
  if (idempotencyKey) body.set('idempotency_key', idempotencyKey);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetchImpl(SITEVERIFY, { method: 'POST', body, signal: controller.signal });
    if (!response.ok) return { success: false, reason: 'siteverify_http_error' };
    const result = await response.json();
    if (!result.success) return { success: false, reason: result['error-codes']?.[0] || 'siteverify_rejected' };
    if (action && result.action !== action) return { success: false, reason: 'action_mismatch' };
    if (hostname && result.hostname !== hostname) return { success: false, reason: 'hostname_mismatch' };
    return { success: true, hostname: result.hostname, action: result.action };
  } catch {
    return { success: false, reason: 'siteverify_unavailable' };
  } finally {
    clearTimeout(timeout);
  }
}

