export const CLAIM_TTL_MS = 30 * 60 * 1000;
export const VERIFIED_TTL_MS = 90 * 24 * 60 * 60 * 1000;
export const HTTP_CHALLENGE_PATH = '/.well-known/agent-friendly-owner.json';

const HTTP_CONTRACT = 'agentfriendly.domain-claim.v1';
const METHODS = new Set(['dns_txt', 'http_file']);

function normalizeHostname(value) {
  const hostname = String(value || '').trim().toLowerCase().replace(/\.$/, '');
  if (
    !hostname ||
    hostname.length > 253 ||
    !/^[a-z0-9.-]+$/.test(hostname) ||
    hostname.includes('..') ||
    hostname.startsWith('.') ||
    hostname.endsWith('.')
  ) {
    throw new Error('El dominio no es valido para verificacion.');
  }
  return hostname;
}

function parseDate(value, label) {
  const timestamp = Date.parse(value);
  if (!Number.isFinite(timestamp)) throw new Error(`${label} no contiene una fecha valida.`);
  return timestamp;
}

function httpChallengeValue(hostname, token) {
  return JSON.stringify({
    contract: HTTP_CONTRACT,
    hostname,
    token,
  });
}

export function domainClaimStatusAt(claim, now = new Date().toISOString()) {
  if (!claim || typeof claim !== 'object') throw new Error('El challenge no es valido.');
  const checkedAtMs = typeof now === 'number' ? now : parseDate(now, 'now');

  if (claim.status === 'pending' && checkedAtMs >= parseDate(claim.expiresAt, 'expiresAt')) {
    return 'expired';
  }
  if (
    claim.status === 'verified' &&
    claim.verifiedAt &&
    checkedAtMs >= parseDate(claim.verifiedAt, 'verifiedAt') + VERIFIED_TTL_MS
  ) {
    return 'expired';
  }
  return claim.status;
}

export function createDomainChallenge({ hostname, method, token, now }) {
  const normalizedHostname = normalizeHostname(hostname);
  if (!METHODS.has(method)) throw new Error('El metodo de verificacion no esta permitido.');

  const normalizedToken = String(token || '').trim();
  if (!normalizedToken || normalizedToken.length > 512) {
    throw new Error('El token de verificacion no es valido.');
  }

  const createdAtMs = parseDate(now, 'now');
  const createdAt = new Date(createdAtMs).toISOString();
  const expiresAt = new Date(createdAtMs + CLAIM_TTL_MS).toISOString();

  return {
    hostname: normalizedHostname,
    method,
    token: normalizedToken,
    challengeName:
      method === 'dns_txt'
        ? `_agentfriendly-challenge.${normalizedHostname}`
        : HTTP_CHALLENGE_PATH,
    challengeValue:
      method === 'dns_txt'
        ? `agentfriendly-domain-verification=${normalizedToken}`
        : httpChallengeValue(normalizedHostname, normalizedToken),
    status: 'pending',
    createdAt,
    expiresAt,
    verifiedAt: '',
    consumedAt: '',
  };
}

function hasExactHttpChallenge(claim, httpBody) {
  let parsed;
  try {
    parsed = JSON.parse(String(httpBody || ''));
  } catch {
    return false;
  }

  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return false;
  const keys = Object.keys(parsed).sort();
  if (keys.join(',') !== 'contract,hostname,token') return false;

  return (
    parsed.contract === HTTP_CONTRACT &&
    parsed.hostname === claim.hostname &&
    parsed.token === claim.token
  );
}

/**
 * @param {{
 *   claim: Record<string, any>,
 *   dnsAnswers?: string[],
 *   httpBody?: string,
 *   now: string,
 * }} input
 */
export function evaluateDomainChallenge({ claim, dnsAnswers = [], httpBody = '', now }) {
  if (!claim || typeof claim !== 'object') throw new Error('El challenge no es valido.');
  const checkedAtMs = parseDate(now, 'now');
  const checkedAt = new Date(checkedAtMs).toISOString();

  if (claim.status !== 'pending' || claim.consumedAt) {
    return {
      verified: false,
      nextStatus: claim.status || 'failed',
      reason: 'claim_not_pending',
      checkedAt,
    };
  }

  const expiresAtMs = parseDate(claim.expiresAt, 'expiresAt');
  if (checkedAtMs >= expiresAtMs) {
    return {
      verified: false,
      nextStatus: 'expired',
      reason: 'claim_expired',
      checkedAt,
    };
  }

  let matched = false;
  if (claim.method === 'dns_txt') {
    matched = Array.isArray(dnsAnswers) && dnsAnswers.some(
      (answer) => String(answer) === claim.challengeValue,
    );
  } else if (claim.method === 'http_file') {
    matched = hasExactHttpChallenge(claim, httpBody);
  } else {
    return {
      verified: false,
      nextStatus: 'failed',
      reason: 'unsupported_method',
      checkedAt,
    };
  }

  if (!matched) {
    return {
      verified: false,
      nextStatus: 'pending',
      reason: 'challenge_mismatch',
      checkedAt,
    };
  }

  return {
    verified: true,
    nextStatus: 'verified',
    reason: 'challenge_verified',
    checkedAt,
    verifiedAt: checkedAt,
    consumedAt: checkedAt,
    verifiedUntil: new Date(checkedAtMs + VERIFIED_TTL_MS).toISOString(),
  };
}
