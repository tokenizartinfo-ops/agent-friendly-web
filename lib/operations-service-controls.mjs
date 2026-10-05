import { createRemoteJWKSet, jwtVerify } from 'jose';
import { listPendingIncidents, reserveInvestigation, completeInvestigation } from './operations-consumer.mjs';
import {listCurrentNotices,reserveNotice,acknowledgeNotice} from './operations-notice-reservation.mjs';
import {operationsWindowOpen} from './operations-window.mjs';

export const OPERATIONS_MANAGER_ORIGIN = 'https://operations-manager.agentfriendlyweb.dev';
const keys = new Map();
const json = (body, status = 200) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' } });
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
class BodyError extends Error { constructor(status) { super('Invalid request'); this.status = status; } }

async function identity(request, config, keySet) {
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

async function payload(request, timeoutMs) {
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
function exact(value, fields) { return Object.keys(value).length === fields.length && fields.every(field => Object.hasOwn(value, field) && typeof value[field] === 'string'); }

/** Prepared service-only adapter. No deploy, customer reads, email or arbitrary commands.
 * Config/keySet/limiter are trusted server dependencies, never request arguments.
 */
export function createOperationsServiceControls({ db, config, keySet, limiter, noticeEnv, now = Date.now, bodyTimeoutMs = 1000 }) {
  return async request => {
    if (config?.enabled !== true) return json({ code: 'unavailable' }, 404);
    const url = new URL(request.url);
    const noticePath=['/notices','/notices/claim','/notices/ack'].includes(url.pathname);
    if(noticePath&&(!operationsWindowOpen(noticeEnv,now())||noticeEnv?.AFW_OPERATIONS_NOTICES_ENABLED!=='true'||noticeEnv.AFW_OPERATIONS_WATCHDOG_ENABLED!=='true'||noticeEnv.AFW_OPERATIONS_PRODUCER_ENABLED!=='true'))return json({code:'unavailable'},404);
    const read = ['/incidents','/notices'].includes(url.pathname) && request.method === 'GET';
    const write = ['/claim', '/finish','/notices/claim','/notices/ack'].includes(url.pathname) && request.method === 'POST';
    if (url.origin !== OPERATIONS_MANAGER_ORIGIN || url.search || (!read && !write)) return json({ code: 'unavailable' }, 404);
    if (request.headers.has('Origin') || request.headers.has('Sec-Fetch-Site')) return json({ code: 'service_request_required' }, 403);
    if (!await identity(request, config, keySet)) return json({ code: 'service_identity_required' }, 401);
    try {
      if (typeof limiter?.limit !== 'function' || !Number.isSafeInteger(bodyTimeoutMs) || bodyTimeoutMs < 10 || bodyTimeoutMs > 3000) return json({ code: 'service_unavailable' }, 503);
      if (!(await limiter.limit({ key: 'afw-operations-consumer' })).success) return json({ code: 'try_later' }, 429);
      const primary = db.withSession ? db.withSession('first-primary') : db;
      const notices={...noticeEnv,OPERATIONS_STATE_DB:primary};
      if(url.pathname==='/notices')return json({notices:await listCurrentNotices(notices,{now:now()})});
      if (read) return json({ incidents: await listPendingIncidents(primary, now()) });
      let body;
      try { body = await payload(request, bodyTimeoutMs); }
      catch (error) { return json({ code: 'invalid_request' }, error.status ?? 400); }
      if(url.pathname==='/notices/claim'){
        if(Object.keys(body).length!==3||!['afw_delegated_canary','afw_delegated_real_pilot'].includes(body.resource)||!Number.isSafeInteger(body.revision)||body.revision<1||typeof body.requestId!=='string'||!UUID.test(body.requestId))return json({code:'invalid_request'},400);
        const reservation=await reserveNotice(notices,{...body,now:now()});return reservation?json({reservation}):json({code:'not_claimed'},409);
      }
      if(url.pathname==='/notices/ack'){
        if(!exact(body,['runId'])||!UUID.test(body.runId))return json({code:'invalid_request'},400);
        const outcome=await acknowledgeNotice(notices,body.runId,{now:now()});return outcome?json({outcome}):json({code:'not_completed'},409);
      }
      if (url.pathname === '/claim') {
        if (!exact(body, ['fingerprint', 'requestId']) || !/^[0-9a-f]{64}$/.test(body.fingerprint) || !UUID.test(body.requestId)) return json({ code: 'invalid_request' }, 400);
        const reservation = await reserveInvestigation(primary, body.fingerprint, now(), body.requestId);
        return reservation ? json({ reservation }) : json({ code: 'not_claimed' }, 409);
      }
      if (!exact(body, ['runId', 'outcome']) || !UUID.test(body.runId) || !['diagnosed', 'blocked'].includes(body.outcome)) return json({ code: 'invalid_request' }, 400);
      const outcome = await completeInvestigation(primary, body.runId, body.outcome, now());
      return outcome ? json({ outcome }) : json({ code: 'not_completed' }, 409);
    } catch { return json({ code: 'temporarily_unavailable' }, 503); }
  };
}
