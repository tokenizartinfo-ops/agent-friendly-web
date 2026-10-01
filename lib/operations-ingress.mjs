import { recordSignal, validateSignal } from './operations-ledger.mjs';

const ORIGIN = 'https://operations.agentfriendlyweb.dev';
const BODY_LIMIT = 8192;
class BodyError extends Error { constructor(status) { super('invalid body'); this.status = status; } }
async function readBounded(request, timeoutMs) {
  const reader = request.body?.getReader();
  if (!reader) throw new BodyError(400);
  let timer, length = 0;
  const chunks = [];
  const deadline = new Promise((_, reject) => { timer = setTimeout(() => reject(new BodyError(408)), timeoutMs); });
  try {
    while (true) {
      const { done, value } = await Promise.race([reader.read(), deadline]);
      if (done) break;
      length += value.byteLength;
      if (length > BODY_LIMIT) throw new BodyError(413);
      chunks.push(value);
    }
    const bytes = new Uint8Array(length);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
    return bytes;
  } finally { clearTimeout(timer); void reader.cancel().catch(() => {}); }
}

async function verify(bytes, timestamp, signature, secret) {
  if (!/^[0-9a-f]{64}$/.test(signature ?? '')) return false;
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']);
  const prefix = new TextEncoder().encode(timestamp + '.');
  const signed = new Uint8Array(prefix.length + bytes.length);
  signed.set(prefix); signed.set(bytes, prefix.length);
  return crypto.subtle.verify('HMAC', key, Uint8Array.from(signature.match(/../g), hex => parseInt(hex, 16)), signed);
}

export function createOperationsIngress({ now = Date.now, bodyTimeoutMs = 3000 } = {}) {
  const reply = (status, body) => Response.json(body, { status, headers: { 'cache-control': 'no-store' } });
  return { async fetch(request, env) {
    const url = new URL(request.url);
    if (url.origin !== ORIGIN || url.pathname !== '/signals' || url.search) return reply(404, { error: 'not_found' });
    if (request.method !== 'POST') return reply(405, { error: 'method_not_allowed' });
    if (env.AFW_OPERATIONS_ENABLED !== 'true' || !env.OPERATIONS_DB || typeof env.AFW_OPERATIONS_SIGNING_SECRET !== 'string' || env.AFW_OPERATIONS_SIGNING_SECRET.length < 32) return reply(503, { error: 'paused' });
    if (request.headers.get('content-type')?.split(';')[0].trim().toLowerCase() !== 'application/json') return reply(415, { error: 'content_type' });
    const timestamp = request.headers.get('x-afw-timestamp'), time = now();
    if (!/^\d{13}$/.test(timestamp ?? '') || Math.abs(time - Number(timestamp)) > 300000) return reply(401, { error: 'signature' });
    let bytes;
    try { bytes = await readBounded(request, bodyTimeoutMs); }
    catch (error) { return reply(error.status ?? 400, { error: 'body' }); }
    if (!await verify(bytes, timestamp, request.headers.get('x-afw-signature'), env.AFW_OPERATIONS_SIGNING_SECRET)) return reply(401, { error: 'signature' });
    let signal;
    try { signal = validateSignal(JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes)), time); }
    catch { return reply(400, { error: 'invalid_signal' }); }
    try { return reply(202, await recordSignal(env.OPERATIONS_DB, signal, time)); }
    catch (error) { return reply(error.message === 'event collision' ? 409 : 503, { error: error.message === 'event collision' ? 'collision' : 'storage_unavailable' }); }
  } };
}
