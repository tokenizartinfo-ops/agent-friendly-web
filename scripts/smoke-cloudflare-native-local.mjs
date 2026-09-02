import { pathToFileURL } from 'node:url';

const MAX_RESPONSE_BYTES = 512 * 1024;
const LOCAL_REQUEST_TIMEOUT_MS = 30_000;
const EDGE_REQUEST_TIMEOUT_MS = 10_000;
const ACCESS_AUDIENCE_BY_ORIGIN = Object.freeze({
  'https://agentfriendlyweb.dev': 'afac57a0e7660c20cffe344cd331a2d42a37eb1440d6b20bdbca9d6ad89708ac',
  'https://release.agentfriendlyweb.dev': 'afac57a0e7660c20cffe344cd331a2d42a37eb1440d6b20bdbca9d6ad89708ac',
  'https://canary.agentfriendlyweb.dev': '5e6f80fdd77e026d6e9f513d4614d22e10cba0f7a90ea4bf7a10b27d6de67a45',
});

export const CLOUD_NATIVE_SMOKE_ROUTES = Object.freeze([
  { path: '/', boundary: 'public', contentType: 'text/html', marker: /Agent Friendly Web/i },
  { path: '/robots.txt', boundary: 'public', contentType: 'text/plain', marker: /User-agent:/i },
  { path: '/llms.txt', boundary: 'public', contentType: 'text/plain', marker: /Agent Friendly Web/i },
  { path: '/index.md', boundary: 'public', contentType: 'text/markdown', marker: /# Agent Friendly Web/i },
  { path: '/.well-known/agent-readiness.json', boundary: 'public', contentType: 'application/json', marker: /agentfriendlyweb\.dev/i },
  { path: '/.well-known/infrastructure-status.json', boundary: 'public', contentType: 'application/json', marker: /agent-friendly-web/i },
  { path: '/okf/v0.2/manifest.json', boundary: 'public', contentType: 'application/json', marker: /OKF|open.knowledge/i },
  { path: '/api-catalog', boundary: 'public', contentType: 'application/linkset+json', marker: /agentfriendlyweb\.dev/i },
  { path: '/expediente', boundary: 'private' },
  { path: '/api/projects', boundary: 'private' },
  { path: '/api/projects/probe', boundary: 'private' },
]);

async function readBoundedBody(response, limit = MAX_RESPONSE_BYTES) {
  if (!response.body) return '';
  const reader = response.body.getReader();
  const chunks = [];
  let total = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > limit) {
        await reader.cancel();
        throw new Error(`response exceeds ${limit} bytes`);
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const body = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(body);
}

function isAccessBoundary(response, origin, routePath) {
  if (![301, 302, 303, 307, 308].includes(response.status)) return false;
  const location = response.headers.get('location') || '';
  const challenge = response.headers.get('www-authenticate') || '';
  const cookie = response.headers.get('set-cookie') || '';
  try {
    const login = new URL(location);
    return login.protocol === 'https:'
      && login.hostname === 'tokenizart.cloudflareaccess.com'
      && login.pathname === `/cdn-cgi/access/login/${origin.hostname}`
      && login.searchParams.get('kid') === ACCESS_AUDIENCE_BY_ORIGIN[origin.origin]
      && /^[^.]+\.[^.]+\.[^.]+$/.test(login.searchParams.get('meta') || '')
      && login.searchParams.get('redirect_url') === routePath
      && challenge === `Cloudflare-Access resource_metadata="${origin.origin}/.well-known/cloudflare-access-protected-resource${routePath}"`
      && /(?:^|,\s*)CF_AppSession=[^;]+;/i.test(cookie);
  } catch {
    return false;
  }
}

function isLocalPrivateBoundary(response) {
  if (![301, 302, 303, 307, 308].includes(response.status)) return false;
  return /(?:\?|&)access=required(?:&|$)/i.test(response.headers.get('location') || '');
}

export async function runCloudflareNativeSmoke({
  baseUrl,
  mode = 'local',
  fetchImpl = fetch,
} = {}) {
  if (!['local', 'access-edge', 'public-edge'].includes(mode)) throw new Error('mode must be local, access-edge or public-edge');
  const origin = new URL(baseUrl || 'http://127.0.0.1:8788');
  if (origin.pathname !== '/' || origin.search || origin.hash) throw new Error('baseUrl must be an origin');
  if (mode === 'public-edge' && origin.origin !== 'https://agentfriendlyweb.dev') {
    throw new Error('public-edge origin must be Agent Friendly Web production');
  }
  if (mode === 'access-edge' && !['https://canary.agentfriendlyweb.dev', 'https://release.agentfriendlyweb.dev'].includes(origin.origin)) {
    throw new Error('access-edge origin must be an approved Agent Friendly Web release');
  }
  const requestTimeoutMs = mode === 'local' ? LOCAL_REQUEST_TIMEOUT_MS : EDGE_REQUEST_TIMEOUT_MS;

  const checks = [];
  for (const route of CLOUD_NATIVE_SMOKE_ROUTES) {
    const url = new URL(route.path, origin);
    try {
      const response = await fetchImpl(url, {
        method: 'GET',
        redirect: 'manual',
        signal: AbortSignal.timeout(requestTimeoutMs),
        headers: { accept: route.contentType || 'text/html' },
      });

      if (mode === 'access-edge' || (mode === 'public-edge' && route.boundary === 'private')) {
        const ok = isAccessBoundary(response, origin, route.path);
        checks.push({
          path: route.path,
          boundary: 'cloudflare_access',
          status: response.status,
          ok,
          ...(ok ? {} : { error: 'route did not present the expected Cloudflare Access login redirect' }),
        });
        continue;
      }

      if (route.boundary === 'private') {
        const ok = isLocalPrivateBoundary(response);
        checks.push({
          path: route.path,
          boundary: route.boundary,
          status: response.status,
          ok,
          ...(ok ? {} : { error: 'private route did not fail closed' }),
        });
        continue;
      }

      const contentType = response.headers.get('content-type') || '';
      const body = await readBoundedBody(response);
      const ok = response.status === 200
        && contentType.toLowerCase().startsWith(route.contentType)
        && route.marker.test(body);
      checks.push({
        path: route.path,
        boundary: route.boundary,
        status: response.status,
        content_type: contentType,
        bytes: new TextEncoder().encode(body).byteLength,
        ok,
        ...(ok ? {} : { error: 'public parity contract failed' }),
      });
    } catch (error) {
      checks.push({
        path: route.path,
        boundary: mode === 'access-edge' || (mode === 'public-edge' && route.boundary === 'private') ? 'cloudflare_access' : route.boundary,
        status: 0,
        ok: false,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  return {
    contract_version: 'agentfriendly.cloudflare-native-smoke.v1',
    mode,
    origin: origin.origin,
    ok: checks.every((check) => check.ok),
    checks,
  };
}

async function main() {
  const args = new Map();
  for (let index = 2; index < process.argv.length; index += 2) {
    args.set(process.argv[index], process.argv[index + 1]);
  }
  const report = await runCloudflareNativeSmoke({
    baseUrl: args.get('--base-url'),
    mode: args.get('--mode') || 'local',
  });
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  if (!report.ok) process.exitCode = 1;
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  await main();
}
