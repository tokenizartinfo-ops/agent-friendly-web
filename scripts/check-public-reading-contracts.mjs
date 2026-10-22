import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';

const ORIGIN = 'https://agentfriendlyweb.dev';
const MAX_BYTES = 512 * 1024;
const REQUEST_TIMEOUT_MS = 10_000;
const TOTAL_TIMEOUT_MS = 60_000;
const REPRESENTATIONS = [
  { id: 'home-html', path: '/', accept: 'text/html', type: 'text/html' },
  { id: 'home-markdown', path: '/', accept: 'text/markdown', type: 'text/markdown' },
  { id: 'home-markdown-excluded', path: '/', accept: 'text/html, text/markdown;q=0', type: 'text/html' },
  { id: 'guide-html', path: '/guia', accept: 'text/html', type: 'text/html' },
  { id: 'guide-html-fallback', path: '/guia', accept: 'text/markdown, text/html;q=0.9', type: 'text/html' },
];

class CheckFailure extends Error {
  constructor(code) { super(code); this.code = code; }
}

function cancelWithoutWaiting(stream) {
  try { Promise.resolve(stream?.cancel()).catch(() => {}); } catch { /* Best effort, never extend the deadline. */ }
}

function hasDocument(body, item) {
  if (item.type === 'text/markdown') {
    return /^---\r?\n/.test(body) && /^canonical: https:\/\/agentfriendlyweb\.dev\/\s*$/m.test(body) &&
      /^# Agent Friendly Web\s*$/m.test(body) && !/<html[\s>]/i.test(body);
  }
  return /<html[\s>]/i.test(body) && /<h1[\s>]/i.test(body) &&
    (item.path === '/' ? /Agent Friendly Web/.test(body) : /public-guide-page/.test(body));
}

async function checkOne(item, method, fetchImpl, limits, timeoutMs) {
  const result = { id: item.id + '-' + method.toLowerCase(), path: item.path, method, accept: item.accept,
    status: null, content_type: null, bytes: 0, ok: false };
  const controller = new AbortController();
  let response;
  let reader;
  let timer;
  let cancelled = false;
  const cancel = () => {
    if (!cancelled) { cancelled = true; cancelWithoutWaiting(reader || response?.body); }
  };
  const timeout = new Promise((resolve, reject) => {
    timer = setTimeout(() => {
      controller.abort();
      cancel();
      reject(new CheckFailure('request_timeout'));
    }, timeoutMs);
  });
  const operation = async () => {
    response = await fetchImpl(new URL(item.path, ORIGIN), {
      method, redirect: 'manual', credentials: 'omit', signal: controller.signal,
      headers: { accept: item.accept, 'user-agent': 'AFW-Public-Reading-QA/1.0' },
    });
    if (controller.signal.aborted) {
      // A transport that ignores abort may return after the report was finalized.
      cancelWithoutWaiting(response.body);
      throw new CheckFailure('request_timeout');
    }
    result.status = response.status;
    const mime = (response.headers.get('content-type') || '').split(';')[0].trim().toLowerCase();
    result.content_type = ['text/html', 'text/markdown'].includes(mime) ? mime : null;
    if (response.headers.get('cf-mitigated')?.toLowerCase() === 'challenge') throw new CheckFailure('unexpected_challenge');
    if (response.status !== 200) throw new CheckFailure('unexpected_status');
    if (mime !== item.type) throw new CheckFailure('unexpected_content_type');
    if (item.path === '/' && !(response.headers.get('vary') || '').split(',').some(t => t.trim().toLowerCase() === 'accept')) {
      throw new CheckFailure('missing_vary_accept');
    }
    const chunks = [];
    if (response.body) {
      reader = response.body.getReader();
      while (true) {
        const chunk = await reader.read();
        if (controller.signal.aborted) throw new CheckFailure('request_timeout');
        if (chunk.done) break;
        result.bytes += chunk.value.byteLength;
        if (method === 'HEAD' && result.bytes > 0) throw new CheckFailure('unexpected_head_body');
        if (result.bytes > limits.maxBodyBytes) throw new CheckFailure('body_limit');
        chunks.push(chunk.value);
      }
    }
    if (method === 'GET') {
      const bytes = Buffer.concat(chunks);
      if (!hasDocument(bytes.toString('utf8'), item)) throw new CheckFailure('unexpected_document');
      result.body_sha256 = createHash('sha256').update(bytes).digest('hex');
    }
    result.ok = true;
  };
  try {
    await Promise.race([operation(), timeout]);
  } catch (error) {
    controller.abort();
    cancel();
    result.error = error instanceof CheckFailure ? error.code : 'transport_error';
  } finally {
    clearTimeout(timer);
    try { reader?.releaseLock(); } catch { /* Cancellation may still be pending. */ }
  }
  // Copy, so a late transport cannot mutate a receipt that has already returned.
  return { ...result };
}

export async function runPublicReadingCheck({
  fetchImpl = fetch, requestTimeoutMs = REQUEST_TIMEOUT_MS,
  totalTimeoutMs = TOTAL_TIMEOUT_MS, maxBodyBytes = MAX_BYTES,
} = {}) {
  if (![[requestTimeoutMs, REQUEST_TIMEOUT_MS], [totalTimeoutMs, TOTAL_TIMEOUT_MS], [maxBodyBytes, MAX_BYTES]]
    .every(([value, cap]) => Number.isSafeInteger(value) && value > 0 && value <= cap)) {
    throw new Error('invalid_limits');
  }
  const started = performance.now();
  const checkedAt = new Date().toISOString();
  const checks = [];
  let windowExhausted = false;
  for (const item of REPRESENTATIONS) {
    for (const method of ['GET', 'HEAD']) {
      const remaining = Math.floor(totalTimeoutMs - (performance.now() - started));
      if (windowExhausted || remaining <= 0) {
        checks.push({ id: item.id + '-' + method.toLowerCase(), path: item.path, method,
          accept: item.accept, status: null, content_type: null, bytes: 0, ok: false, error: 'window_exhausted' });
        continue;
      }
      const check = await checkOne(item, method, fetchImpl, { maxBodyBytes }, Math.min(requestTimeoutMs, remaining));
      checks.push(check);
      // The last partial millisecond must not become a second request window.
      if (check.error === 'request_timeout' && remaining <= requestTimeoutMs) windowExhausted = true;
    }
  }
  return {
    contract_version: 'agentfriendly.public-reading-check.v1', checked_at: checkedAt,
    completed_at: new Date().toISOString(), origin: ORIGIN,
    request_limit: 10, max_body_bytes: maxBodyBytes, request_timeout_ms: requestTimeoutMs,
    total_timeout_ms: totalTimeoutMs, ok: checks.every(c => c.ok), checks,
    wafEnforcementAccepted: false, operationalReadiness: false, pcOffAccepted: false,
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  if (process.argv.length !== 2) {
    console.error('No arguments accepted; origin and public read scope are fixed.');
    process.exitCode = 1;
  } else {
    const result = await runPublicReadingCheck();
    console.log(JSON.stringify(result, null, 2));
    process.exitCode = result.ok ? 0 : 1;
  }
}
