import { createRemoteJWKSet, jwtVerify } from 'jose';
const OPERATIONS_MANAGER_ORIGIN='https://operations-manager.agentfriendlyweb.dev';
const keys = new Map();
class BodyError extends Error { constructor(status) { super('Invalid request'); this.status = status; } }

export async function verifyOperationsServiceIdentity(request, config, keySet) {
  try {
    if (config.origin !== OPERATIONS_MANAGER_ORIGIN || !/^[a-z0-9-]+\.cloudflareaccess\.com$/.test(config.teamDomain) ||
      typeof config.audience !== 'string' || !config.audience || config.audience.length > 512 ||
      typeof config.clientId !== 'string' || !config.clientId || config.clientId.length > 200) return false;
    const token = request.headers.get('Cf-Access-Jwt-Assertion');
    if (!token || token.length > 16384) return false;
    const issuer = 'https://' + config.teamDomain;
    if (!keySet && !keys.has(issuer)) keys.set(issuer, createRemoteJWKSet(new URL(issuer + '/cdn-cgi/access/certs'), { timeoutDuration: 5000, cooldownDuration: 30000 }));
    const { payload } = await jwtVerify(token, keySet || keys.get(issuer), { issuer, audience: config.audience, algorithms: ['RS256'], requiredClaims: ['exp', 'sub', 'common_name', 'type'] });
    const audiences = Array.isArray(payload.aud) ? payload.aud : [payload.aud];
    return audiences.length === 1 && audiences[0] === config.audience && payload.type === 'app' && payload.sub === '' &&
      payload.common_name === config.clientId && Number.isSafeInteger(payload.exp);
  } catch { return false; }
}

export async function readOperationsServicePayload(request, timeoutMs) {
  if (request.headers.get('content-type')?.split(';')[0].trim().toLowerCase() !== 'application/json') throw new BodyError(415);
  const reader = request.body?.getReader();
  if (!reader) throw new BodyError(400);
  let deadline, length = 0;
  const chunks = [], timeout = new Promise((_, reject) => { deadline = setTimeout(() => reject(new BodyError(408)), timeoutMs); });
  try {
    while (true) {
      const { done, value } = await Promise.race([reader.read(), timeout]);
      if (done) break;
      length += value.byteLength;
      if (length > 1024) throw new BodyError(413);
      chunks.push(value);
    }
    const bytes = new Uint8Array(length); let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
    const value = JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes));
    if (!value || typeof value !== 'object' || Array.isArray(value)) throw new BodyError(400);
    return value;
  } catch (error) { throw error instanceof BodyError ? error : new BodyError(400); }
  finally { clearTimeout(deadline); void reader.cancel().catch(() => {}); }
}
