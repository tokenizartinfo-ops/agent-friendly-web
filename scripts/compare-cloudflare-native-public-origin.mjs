import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';

const MAX_RESPONSE_BYTES = 512 * 1024;
const REQUEST_TIMEOUT_MS = 10_000;
const BASELINE_ORIGIN = 'https://agentfriendlyweb.dev';
const ALLOWED_CANDIDATES = new Set([
  'http://127.0.0.1:8788',
  'http://localhost:8788',
  'https://release.agentfriendlyweb.dev',
]);

export const CUTOVER_COMPARISON_ROUTES = Object.freeze([
  { path: '/', contentType: 'text/html', marker: /Agent Friendly Web/i },
  { path: '/robots.txt', contentType: 'text/plain', marker: /User-agent:/i },
  { path: '/llms.txt', contentType: 'text/plain', marker: /Agent Friendly Web/i },
  { path: '/llms-full.txt', contentType: 'text/plain', marker: /Agent Friendly Web/i },
  { path: '/sitemap.xml', contentType: 'application/xml', marker: /agentfriendlyweb\.dev/i },
  { path: '/.well-known/agent-readiness.json', contentType: 'application/json', marker: /agentfriendlyweb\.dev/i },
  { path: '/.well-known/infrastructure-status.json', contentType: 'application/json', marker: /agent-friendly-web/i, expectedAddition: true },
  { path: '/okf/v0.2/manifest.json', contentType: 'application/json', marker: /OKF|open.knowledge/i },
  { path: '/api-catalog', contentType: 'application/linkset+json', marker: /agentfriendlyweb\.dev/i },
]);

function normalizeOrigin(value, kind) {
  const url = new URL(String(value || ''));
  if (url.pathname !== '/' || url.search || url.hash) throw new Error(`${kind} must be an origin`);
  if (kind === 'baseline' && url.origin !== BASELINE_ORIGIN) throw new Error('baseline origin is not approved');
  if (kind === 'candidate' && !ALLOWED_CANDIDATES.has(url.origin)) throw new Error('candidate origin is not approved');
  return url.origin;
}

function sha256(bytes) {
  return createHash('sha256').update(bytes).digest('hex');
}

async function readBounded(response) {
  const declared = Number(response.headers.get('content-length') || 0);
  if (declared > MAX_RESPONSE_BYTES) throw new Error('response size exceeds byte limit');
  if (!response.body) return new Uint8Array();
  const reader = response.body.getReader();
  const chunks = [];
  let total = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > MAX_RESPONSE_BYTES) {
        await reader.cancel();
        throw new Error('response bytes exceed size limit');
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return bytes;
}

function contentTypeMatches(actual, expected) {
  const mediaType = String(actual || '').split(';')[0].trim().toLowerCase();
  if (expected === 'application/xml') return ['application/xml', 'text/xml'].includes(mediaType);
  return mediaType === expected;
}

async function observe(origin, route, fetchImpl) {
  const response = await fetchImpl(new URL(route.path, origin), {
    method: 'GET',
    redirect: 'manual',
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    headers: { accept: route.contentType },
  });
  const bytes = await readBounded(response);
  const text = new TextDecoder().decode(bytes);
  return {
    status: response.status,
    contentType: response.headers.get('content-type') || '',
    bytes: bytes.byteLength,
    sha256: sha256(bytes),
    marker: route.marker.test(text),
  };
}

export async function comparePublicOrigins({ baselineUrl, candidateUrl, fetchImpl = fetch } = {}) {
  const baselineOrigin = normalizeOrigin(baselineUrl, 'baseline');
  const candidateOrigin = normalizeOrigin(candidateUrl, 'candidate');
  const routes = [];

  for (const route of CUTOVER_COMPARISON_ROUTES) {
    let baseline;
    let candidate;
    let error = '';
    try {
      baseline = await observe(baselineOrigin, route, fetchImpl);
      candidate = await observe(candidateOrigin, route, fetchImpl);
      const baselineStatusOk = route.expectedAddition ? [200, 404, 410].includes(baseline.status) : baseline.status === 200;
      const candidateOk = candidate.status === 200
        && contentTypeMatches(candidate.contentType, route.contentType)
        && candidate.marker;
      const baselineOk = baselineStatusOk && (baseline.status !== 200 || (
        contentTypeMatches(baseline.contentType, route.contentType) && baseline.marker
      ));
      if (!baselineOk) error = 'baseline contract is unavailable';
      if (!candidateOk) error = 'candidate status, content type or marker contract failed';
    } catch (caught) {
      error = caught instanceof Error ? caught.message : String(caught);
    }

    let classification = 'critical_failure';
    if (!error && route.expectedAddition && baseline.status !== 200) classification = 'expected_addition';
    else if (!error && baseline.sha256 === candidate.sha256) classification = 'unchanged';
    else if (!error) classification = 'changed_semantic_parity';

    routes.push({
      path: route.path,
      classification,
      baseline: baseline ? { status: baseline.status, content_type: baseline.contentType, bytes: baseline.bytes, sha256: baseline.sha256 } : null,
      candidate: candidate ? { status: candidate.status, content_type: candidate.contentType, bytes: candidate.bytes, sha256: candidate.sha256 } : null,
      ...(error ? { error } : {}),
    });
  }

  const criticalFailures = routes.filter((route) => route.classification === 'critical_failure').length;
  return {
    contract_version: 'agentfriendly.cloudflare-native-origin-comparison.v1',
    baseline_origin: baselineOrigin,
    candidate_origin: candidateOrigin,
    ok: criticalFailures === 0,
    critical_failures: criticalFailures,
    routes,
    limits: {
      max_response_bytes: MAX_RESPONSE_BYTES,
      request_timeout_ms: REQUEST_TIMEOUT_MS,
      redirects: 'manual',
      response_bodies_persisted: false,
    },
  };
}

async function main() {
  const args = new Map();
  for (let index = 2; index < process.argv.length; index += 2) args.set(process.argv[index], process.argv[index + 1]);
  const report = await comparePublicOrigins({
    baselineUrl: args.get('--baseline-url'),
    candidateUrl: args.get('--candidate-url'),
  });
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  if (!report.ok) process.exitCode = 1;
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  await main();
}
