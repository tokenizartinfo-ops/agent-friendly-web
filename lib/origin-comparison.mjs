import { createHash } from 'node:crypto';

import { fetchLimitedPublicUrl } from './public-network.mjs';

export const ORIGIN_COMPARISON_CONTRACT = 'agentfriendly.origin-comparison.v1';

const CAPSULE_CONTRACT = 'agentfriendly.publication-capsule.v1';
const ALLOWED_DESTINATIONS = new Set(['/llms.txt', '/llms-full.txt', '/robots.txt', '/sitemap.xml', '/']);
const HASH = /^[a-f0-9]{64}$/;
const MAX_DIFF_LINES = 400;
const MAX_DIFF_LINE_CHARS = 1000;

function sha256(value) {
  return createHash('sha256').update(value).digest('hex');
}

function probableSecret(value) {
  const source = String(value || '');
  return (
    /-----BEGIN (?:RSA |EC |OPENSSH |PGP )?PRIVATE KEY-----/i.test(source) ||
    /\b(?:password|passwd|api[_-]?key|client[_-]?secret|access[_-]?token|private[_-]?key)\s*[:=]\s*\S{6,}/i.test(source) ||
    /\b(?:ghp|github_pat|sk_live|sk_test|xox[baprs])-[_a-z0-9]{12,}\b/i.test(source)
  );
}

function normalizedText(value) {
  return String(value || '').replaceAll('\r\n', '\n').replaceAll('\r', '\n');
}

function mediaTypeAllowed(path, contentType) {
  const mediaType = String(contentType || '').split(';')[0].trim().toLowerCase();
  if (path === '/') return mediaType === 'text/html' || mediaType === 'application/xhtml+xml';
  if (path === '/sitemap.xml') return ['application/xml', 'text/xml', 'text/plain'].includes(mediaType);
  return mediaType.startsWith('text/');
}

function cleanLine(line) {
  const value = String(line || '');
  return value.length > MAX_DIFF_LINE_CHARS ? `${value.slice(0, MAX_DIFF_LINE_CHARS)}…` : value;
}

function boundedLinearDiff(current, proposed) {
  const before = normalizedText(current).split('\n');
  const after = normalizedText(proposed).split('\n');
  const changes = [];
  const max = Math.max(before.length, after.length);

  for (let index = 0; index < max && changes.length < MAX_DIFF_LINES; index += 1) {
    const oldLine = before[index];
    const newLine = after[index];
    if (oldLine === newLine) {
      changes.push({ type: 'context', oldLine: index + 1, newLine: index + 1, text: cleanLine(oldLine) });
      continue;
    }
    if (oldLine !== undefined) changes.push({ type: 'remove', oldLine: index + 1, newLine: null, text: cleanLine(oldLine) });
    if (changes.length >= MAX_DIFF_LINES) break;
    if (newLine !== undefined) changes.push({ type: 'add', oldLine: null, newLine: index + 1, text: cleanLine(newLine) });
  }

  return {
    algorithm: 'bounded_line_comparison_v1',
    changes,
    truncated: max > MAX_DIFF_LINES || changes.length >= MAX_DIFF_LINES,
  };
}

function baseResult(file) {
  return {
    packagePath: String(file?.packagePath || ''),
    destinationPath: String(file?.destinationPath || ''),
    operation: String(file?.operation || ''),
    status: 'blocked',
    httpStatus: null,
    currentSha256: null,
    proposedSha256: HASH.test(String(file?.sha256 || '')) ? file.sha256 : null,
    diff: null,
    note: 'Resource blocked by a comparison rule.',
  };
}

async function compareResource(origin, file, fetcher) {
  const result = baseResult(file);
  if (!ALLOWED_DESTINATIONS.has(result.destinationPath)) return result;
  if (!['create_or_replace', 'manual_merge', 'manual_embed'].includes(result.operation)) return result;
  if (typeof file.content !== 'string' || !file.content || probableSecret(file.content)) return result;

  const proposedBytes = Buffer.from(file.content, 'utf8');
  const proposedSha256 = sha256(proposedBytes);
  if (!HASH.test(String(file.sha256 || '')) || proposedSha256 !== file.sha256) return result;
  result.proposedSha256 = proposedSha256;

  let remote;
  try {
    remote = await fetcher(new URL(result.destinationPath, origin).href, {
      accept: result.destinationPath === '/' ? 'text/html' : file.mediaType,
    });
  } catch {
    return { ...result, status: 'unavailable', note: 'The public origin could not be read safely.' };
  }

  result.httpStatus = Number.isInteger(remote?.status) ? remote.status : null;
  if ([404, 410].includes(result.httpStatus)) {
    return { ...result, status: 'missing', note: 'The resource is absent and the proposal would create it.' };
  }
  if (result.httpStatus !== 200 || remote?.truncated === true || !mediaTypeAllowed(result.destinationPath, remote?.contentType)) {
    return { ...result, status: 'unavailable', note: 'The response was incomplete or not safely comparable.' };
  }

  const currentBody = String(remote.body || '');
  if (probableSecret(currentBody)) {
    return { ...result, status: 'blocked', note: 'Probable sensitive content prevents comparison.' };
  }
  const currentBytes = remote.bodyBytes instanceof Uint8Array ? remote.bodyBytes : Buffer.from(currentBody, 'utf8');
  result.currentSha256 = sha256(currentBytes);
  result.diff = boundedLinearDiff(currentBody, file.content);

  if (normalizedText(currentBody) === normalizedText(file.content)) {
    return { ...result, status: 'unchanged', note: 'Normalized text is unchanged.' };
  }
  if (result.operation === 'manual_merge' || result.operation === 'manual_embed') {
    return { ...result, status: 'manual_review_required', note: 'The proposal must be integrated manually.' };
  }
  return { ...result, status: 'changed', note: 'The public resource differs from the proposed bytes.' };
}

export async function compareCapsuleOrigin(capsule, dependencies = {}) {
  if (capsule?.contract !== CAPSULE_CONTRACT) throw new Error('Publication capsule contract is invalid');
  if (!capsule?.capsuleId || !HASH.test(String(capsule?.integrity?.manifestSha256 || ''))) {
    throw new Error('Publication capsule identity is invalid');
  }
  const origin = new URL(String(capsule?.target?.origin || ''));
  if (origin.protocol !== 'https:' || origin.origin !== String(capsule.target.origin).replace(/\/$/, '')) {
    throw new Error('Publication capsule origin is invalid');
  }
  const fetcher = dependencies.fetchLimitedPublicUrl || fetchLimitedPublicUrl;
  const resources = [];
  for (const file of Array.isArray(capsule.files) ? capsule.files : []) {
    resources.push(await compareResource(origin, file, fetcher));
  }
  if (!resources.length) throw new Error('Publication capsule contains no comparable files');

  const incomplete = resources.some((resource) => ['blocked', 'unavailable'].includes(resource.status));
  return {
    contract: ORIGIN_COMPARISON_CONTRACT,
    comparisonId: String(dependencies.comparisonId || crypto.randomUUID()),
    capsuleId: capsule.capsuleId,
    capsuleVersion: Number(capsule.version),
    manifestSha256: capsule.integrity.manifestSha256,
    origin: origin.origin,
    observedAt: dependencies.observedAt || new Date().toISOString(),
    status: incomplete ? 'incomplete' : 'complete',
    resources,
    limits: {
      maxResponseBytes: 250000,
      maxDiffLines: MAX_DIFF_LINES,
      redirects: 'manual',
      remoteMutation: false,
    },
  };
}

export function validateOriginComparison(value) {
  if (!value || value.contract !== ORIGIN_COMPARISON_CONTRACT) throw new Error('Origin comparison contract is invalid');
  if (!value.comparisonId || !value.capsuleId || !HASH.test(String(value.manifestSha256 || ''))) {
    throw new Error('Origin comparison identity is invalid');
  }
  if (!['complete', 'incomplete'].includes(value.status) || !Array.isArray(value.resources) || !value.resources.length) {
    throw new Error('Origin comparison status is invalid');
  }
  return value;
}
