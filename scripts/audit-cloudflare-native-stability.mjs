import { spawnSync } from 'node:child_process';
import { createPublicKey, verify as verifySignature } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

import {
  PRODUCTION_D1_READ_SQL,
  parseProductionWorkerConfig,
  parseWranglerDeployments,
  parseWranglerD1Read,
  parseWranglerVersion,
  runCloudflareNativeStabilityAudit,
} from '../lib/cloudflare-native-stability.mjs';

const WRANGLER_TIMEOUT_MS = 30_000;
const WRANGLER_MAX_BUFFER = 2 * 1024 * 1024;
const CLOUDFLARE_API_BASE = 'https://api.cloudflare.com/client/v4';
const CLOUDFLARE_API_MAX_BYTES = 256 * 1024;
const CLOUDFLARE_API_TIMEOUT_MS = 10_000;
const CLOUDFLARE_READ_ATTEMPTS = 3;

function retryDelay(attempt) {
  return new Promise((resolve) => setTimeout(resolve, attempt * 100));
}

function cancelWithoutBlocking(streamOrReader) {
  try {
    const cancellation = streamOrReader?.cancel();
    if (cancellation && typeof cancellation.catch === 'function') void cancellation.catch(() => {});
  } catch {
    // Cancellation is best-effort and must never block the fail-closed result.
  }
}

async function fetchReadOnlyWithRetry(fetchImpl, url, init) {
  let lastError;
  for (let attempt = 1; attempt <= CLOUDFLARE_READ_ATTEMPTS; attempt += 1) {
    try {
      const response = await fetchImpl(url, {
        ...init,
        signal: AbortSignal.timeout(CLOUDFLARE_API_TIMEOUT_MS),
      });
      if ((response.status !== 429 && response.status < 500) || attempt === CLOUDFLARE_READ_ATTEMPTS) {
        return response;
      }
      cancelWithoutBlocking(response.body);
    } catch (error) {
      lastError = error;
      if (attempt === CLOUDFLARE_READ_ATTEMPTS) throw error;
    }
    await retryDelay(attempt);
  }
  throw lastError || new Error('Cloudflare read failed');
}

async function readBoundedResponseJson(response, maxBytes) {
  if (response.status !== 200 || !(response.headers.get('content-type') || '').toLowerCase().startsWith('application/json')) {
    throw new Error('Cloudflare control-plane read must return JSON 200');
  }
  if (!response.body) throw new Error('Cloudflare control-plane response body is required');
  const reader = response.body.getReader();
  const chunks = [];
  let total = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > maxBytes) {
        cancelWithoutBlocking(reader);
        throw new Error('Cloudflare control-plane response exceeds byte limit');
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
  try {
    return JSON.parse(new TextDecoder().decode(body));
  } catch {
    throw new Error('Cloudflare control-plane response must be valid JSON');
  }
}

export async function fetchCloudflareCustomDomain({
  accountId,
  apiToken = process.env.CLOUDFLARE_API_TOKEN,
  fetchImpl = fetch,
} = {}) {
  if (accountId !== '85d0d5dadac3341a564f22ce885e9eec') throw new Error('Cloudflare account is not allowlisted');
  if (typeof apiToken !== 'string' || !apiToken) throw new Error('Cloudflare API token is required for a live domain read');
  const response = await fetchReadOnlyWithRetry(fetchImpl, `${CLOUDFLARE_API_BASE}/accounts/${accountId}/workers/domains`, {
    method: 'GET',
    redirect: 'error',
    headers: {
      accept: 'application/json',
      authorization: `Bearer ${apiToken}`,
    },
  });
  const payload = await readBoundedResponseJson(response, CLOUDFLARE_API_MAX_BYTES);
  const matches = payload?.success === true && Array.isArray(payload?.result)
    ? payload.result.filter((entry) => entry?.hostname === 'agentfriendlyweb.dev')
    : [];
  if (matches.length !== 1) throw new Error('Cloudflare must return one Agent Friendly Web custom domain');
  const domain = matches[0];
  return {
    account_id: accountId,
    domain_id: domain.id,
    hostname: domain.hostname,
    service: domain.service,
    environment: domain.environment,
    enabled: domain.enabled,
    previews_enabled: domain.previews_enabled,
  };
}

function decodeJwtJson(value, label) {
  if (typeof value !== 'string' || value.length === 0 || value.length > 16 * 1024 || !/^[A-Za-z0-9_-]+$/.test(value)) {
    throw new Error(`Cloudflare Access ${label} is invalid`);
  }
  try {
    return JSON.parse(Buffer.from(value, 'base64url').toString('utf8'));
  } catch {
    throw new Error(`Cloudflare Access ${label} must be valid JSON`);
  }
}

export function verifyCloudflareAccessMeta({ token, jwks, audience, expectedRoute, verificationTime }) {
  const parts = typeof token === 'string' ? token.split('.') : [];
  if (parts.length !== 3) throw new Error('Cloudflare Access meta must be a compact JWT');
  const [encodedHeader, encodedClaims, encodedSignature] = parts;
  if (typeof encodedSignature !== 'string'
    || encodedSignature.length === 0
    || encodedSignature.length > 2 * 1024
    || !/^[A-Za-z0-9_-]+$/.test(encodedSignature)) {
    throw new Error('Cloudflare Access meta signature is invalid');
  }
  const header = decodeJwtJson(encodedHeader, 'meta header');
  const claims = decodeJwtJson(encodedClaims, 'meta claims');
  if (header?.typ !== 'JWT' || header?.alg !== 'RS256' || typeof header?.kid !== 'string') {
    throw new Error('Cloudflare Access meta algorithm is not allowlisted');
  }
  const signingKeys = Array.isArray(jwks?.keys)
    ? jwks.keys.filter((key) => key?.kid === header.kid && key?.kty === 'RSA' && key?.alg === 'RS256' && key?.use === 'sig')
    : [];
  if (signingKeys.length !== 1) throw new Error('Cloudflare Access meta signing key is not unique');
  let verified = false;
  try {
    const publicKey = createPublicKey({ key: signingKeys[0], format: 'jwk' });
    verified = verifySignature(
      'RSA-SHA256',
      Buffer.from(`${encodedHeader}.${encodedClaims}`),
      publicKey,
      Buffer.from(encodedSignature, 'base64url'),
    );
  } catch {
    throw new Error('Cloudflare Access meta signature could not be verified');
  }
  if (!verified) throw new Error('Cloudflare Access meta signature is invalid');

  if (claims?.type !== 'meta'
    || claims?.aud !== audience
    || claims?.hostname !== 'agentfriendlyweb.dev'
    || claims?.redirect_url !== expectedRoute) {
    throw new Error('Cloudflare Access meta audience or route is invalid');
  }
  if (claims?.auth_status !== 'NONE' || claims?.service_token_status !== false) {
    throw new Error('Cloudflare Access meta must represent an anonymous challenge');
  }
  const observedSeconds = Date.parse(verificationTime || '') / 1000;
  if (!Number.isFinite(observedSeconds)
    || !Number.isInteger(claims.iat)
    || !Number.isInteger(claims.nbf)
    || !Number.isInteger(claims.exp)
    || claims.nbf < claims.iat - 60
    || claims.nbf > observedSeconds + 60
    || claims.iat > observedSeconds + 60
    || claims.exp < observedSeconds - 60
    || claims.exp <= claims.iat
    || claims.exp - claims.iat > 10 * 60) {
    throw new Error('Cloudflare Access meta validity window is invalid');
  }
  return {
    signing_key_id: header.kid,
    audience: claims.aud,
    meta_valid_from: new Date(claims.nbf * 1000).toISOString(),
    meta_expires_at: new Date(claims.exp * 1000).toISOString(),
  };
}

export async function fetchCloudflareAccessEvidence({
  teamDomain,
  audience,
  now = () => new Date(),
  fetchImpl = fetch,
} = {}) {
  if (teamDomain !== 'tokenizart.cloudflareaccess.com') throw new Error('Cloudflare Access team domain is not allowlisted');
  if (audience !== 'afac57a0e7660c20cffe344cd331a2d42a37eb1440d6b20bdbca9d6ad89708ac') {
    throw new Error('Cloudflare Access audience is not allowlisted');
  }
  const origin = 'https://agentfriendlyweb.dev';
  const certsResponse = await fetchReadOnlyWithRetry(fetchImpl, `https://${teamDomain}/cdn-cgi/access/certs`, {
    method: 'GET',
    redirect: 'error',
    headers: { accept: 'application/json' },
  });
  const jwks = await readBoundedResponseJson(certsResponse, CLOUDFLARE_API_MAX_BYTES);
  const protectedRoutes = [];

  for (const protectedRoute of ['/expediente', '/api/projects', '/api/projects/probe']) {
    const response = await fetchReadOnlyWithRetry(fetchImpl, `${origin}${protectedRoute}`, {
      method: 'GET',
      redirect: 'manual',
      headers: { accept: 'application/json' },
    });
    if (![301, 302, 303, 307, 308].includes(response.status)) {
      throw new Error('Cloudflare Access edge must return a login redirect');
    }
    cancelWithoutBlocking(response.body);
    let login;
    try {
      login = new URL(response.headers.get('location') || '');
    } catch {
      throw new Error('Cloudflare Access edge returned an invalid login URL');
    }
    const meta = login.searchParams.get('meta') || '';
    if (login.protocol !== 'https:'
      || login.hostname !== teamDomain
      || login.pathname !== '/cdn-cgi/access/login/agentfriendlyweb.dev'
      || login.searchParams.get('kid') !== audience
      || login.searchParams.get('redirect_url') !== protectedRoute) {
      throw new Error('Cloudflare Access edge challenge does not match AFW');
    }

    const resourceMetadataUrl = `${origin}/.well-known/cloudflare-access-protected-resource${protectedRoute}`;
    const metadataResponse = await fetchReadOnlyWithRetry(fetchImpl, resourceMetadataUrl, {
      method: 'GET',
      redirect: 'error',
      headers: { accept: 'application/json' },
    });
    const metadata = await readBoundedResponseJson(metadataResponse, CLOUDFLARE_API_MAX_BYTES);
    if (metadata?.resource !== `${origin}${protectedRoute}`
      || metadata?.protected !== true
      || metadata?.team_domain !== teamDomain
      || JSON.stringify(metadata?.authorization_servers) !== JSON.stringify([`https://${teamDomain}`])) {
      throw new Error('Cloudflare Access protected-resource metadata does not match AFW');
    }
    const verifiedMeta = verifyCloudflareAccessMeta({
      token: meta,
      jwks,
      audience,
      expectedRoute: protectedRoute,
      verificationTime: now().toISOString(),
    });
    protectedRoutes.push({
      path: protectedRoute,
      status: response.status,
      login_path: login.pathname,
      redirect_url: login.searchParams.get('redirect_url'),
      resource_metadata_url: resourceMetadataUrl,
      resource_metadata_protected: metadata.protected,
      signing_key_id: verifiedMeta.signing_key_id,
      meta_signature_verified: true,
      meta_valid_from: verifiedMeta.meta_valid_from,
      meta_expires_at: verifiedMeta.meta_expires_at,
    });
  }

  return {
    origin,
    team_domain: teamDomain,
    audience,
    shared_identity_container: true,
    protected_routes: protectedRoutes,
  };
}

function runWranglerJson({ cwd, nodePath, spawnImpl, args }) {
  const wrangler = join(cwd, 'node_modules', 'wrangler', 'bin', 'wrangler.js');
  const execution = spawnImpl(nodePath, [wrangler, ...args], {
    cwd,
    encoding: 'utf8',
    shell: false,
    windowsHide: true,
    timeout: WRANGLER_TIMEOUT_MS,
    maxBuffer: WRANGLER_MAX_BUFFER,
  });
  if (execution.error || execution.status !== 0) throw new Error('Wrangler production read failed closed');
  return execution.stdout;
}

function readProductionConfig({ cwd, readFileImpl }) {
  return parseProductionWorkerConfig(readFileImpl(join(cwd, 'wrangler.jsonc'), 'utf8'));
}

export async function readProductionInfrastructure({
  cwd = process.cwd(),
  nodePath = process.execPath,
  observedAt,
  now = () => new Date(),
  readFileImpl = readFileSync,
  spawnImpl = spawnSync,
  cloudflareDomainRead = fetchCloudflareCustomDomain,
  cloudflareAccessRead = fetchCloudflareAccessEvidence,
} = {}) {
  const localConfig = readProductionConfig({ cwd, readFileImpl });
  const deployment = parseWranglerDeployments(runWranglerJson({
    cwd,
    nodePath,
    spawnImpl,
    args: ['deployments', 'list', '--name', localConfig.worker, '--json'],
  }));
  const version = parseWranglerVersion(runWranglerJson({
    cwd,
    nodePath,
    spawnImpl,
    args: ['versions', 'view', deployment.version_id, '--name', localConfig.worker, '--json'],
  }));
  if (version.version_id !== deployment.version_id) throw new Error('Wrangler deployment and version evidence must match');

  const cloudflareCustomDomain = await cloudflareDomainRead({ accountId: localConfig.account_id });
  const cloudflareAccessEdge = await cloudflareAccessRead({
    teamDomain: localConfig.access_team_domain,
    audience: localConfig.access_aud,
    now,
  });

  return {
    observed_at: observedAt || now().toISOString(),
    local_config: localConfig,
    remote_worker: {
      worker: localConfig.worker,
      ...deployment,
      ...version,
    },
    cloudflare_custom_domain: cloudflareCustomDomain,
    cloudflare_access_edge: cloudflareAccessEdge,
  };
}

export function executeProductionD1Read({
  sql = PRODUCTION_D1_READ_SQL,
  cwd = process.cwd(),
  nodePath = process.execPath,
  readFileImpl = readFileSync,
  spawnImpl = spawnSync,
} = {}) {
  if (sql !== PRODUCTION_D1_READ_SQL) {
    throw new Error('production D1 stability command must be the exact fixed SELECT');
  }
  const config = readProductionConfig({ cwd, readFileImpl });
  const stdout = runWranglerJson({
    cwd,
    nodePath,
    spawnImpl,
    args: [
      'd1',
      'execute',
      config.d1_database_id,
      '--remote',
      '--json',
      '--command',
      sql,
    ],
  });
  return {
    ...parseWranglerD1Read(stdout),
    database_id: config.d1_database_id,
  };
}

async function main() {
  const infrastructure = await readProductionInfrastructure();
  const report = await runCloudflareNativeStabilityAudit({
    infrastructureRead: async () => infrastructure,
    d1Read: (sql) => executeProductionD1Read({ sql }),
  });
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  if (!report.ok) process.exitCode = 1;
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  await main();
}
