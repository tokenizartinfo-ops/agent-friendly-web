import { createRemoteJWKSet, jwtVerify } from 'jose';

const teamDomainPattern = /^(?=.{1,253}$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.cloudflareaccess\.com$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const remoteKeySets = new Map();

function fail(diagnostics, diagnosticCode = 'verification_failed') {
  return diagnostics
    ? { ok: false, code: 'contact_staging_identity_required', diagnosticCode }
    : { ok: false, code: 'contact_staging_identity_required' };
}

function classifyVerificationError(error) {
  if (!error || typeof error !== 'object') return 'verification_failed';
  if (error.code === 'ERR_JWT_EXPIRED') return 'token_expired';
  if (error.code === 'ERR_JWT_CLAIM_VALIDATION_FAILED') {
    if (error.claim === 'iss') return 'issuer_mismatch';
    if (error.claim === 'aud') return 'audience_mismatch';
    return 'claim_validation_failed';
  }
  if (error.code === 'ERR_JWKS_NO_MATCHING_KEY') return 'jwks_no_matching_key';
  if (error.code === 'ERR_JWKS_TIMEOUT') return 'jwks_timeout';
  if (error.code === 'ERR_JWS_SIGNATURE_VERIFICATION_FAILED') return 'signature_invalid';
  if (error.code === 'ERR_JOSE_ALG_NOT_ALLOWED') return 'algorithm_not_allowed';
  if (error.code === 'ERR_JWS_INVALID' || error.code === 'ERR_JWT_INVALID') return 'token_malformed';
  return 'verification_failed';
}

function normalizeTeamDomain(value) {
  const domain = typeof value === 'string' ? value.trim().toLowerCase().replace(/\.$/, '') : '';
  return teamDomainPattern.test(domain) ? domain : '';
}

function normalizeEmail(value) {
  const email = typeof value === 'string' ? value.trim().toLowerCase() : '';
  return email.length <= 254 && emailPattern.test(email) ? email : '';
}

function remoteKeySet(issuer) {
  if (!remoteKeySets.has(issuer)) {
    remoteKeySets.set(issuer, createRemoteJWKSet(
      new URL(`${issuer}/cdn-cgi/access/certs`),
      { timeoutDuration: 5000, cooldownDuration: 30000 },
    ));
  }
  return remoteKeySets.get(issuer);
}

export async function verifyCloudflareAccessJwt({
  token,
  teamDomain,
  audience,
  keySet,
  diagnostics = false,
} = {}) {
  const domain = normalizeTeamDomain(teamDomain);
  const expectedAudience = typeof audience === 'string' ? audience.trim() : '';
  const assertion = typeof token === 'string' ? token.trim() : '';
  if (!domain || !expectedAudience || expectedAudience.length > 512 || !assertion || assertion.length > 16384) {
    return fail(diagnostics, 'input_invalid');
  }

  const issuer = `https://${domain}`;
  try {
    const { payload } = await jwtVerify(assertion, keySet || remoteKeySet(issuer), {
      issuer,
      audience: expectedAudience,
      algorithms: ['RS256'],
    });
    const userId = typeof payload.sub === 'string' ? payload.sub.trim() : '';
    const email = normalizeEmail(payload.email);
    if (!userId || userId.length > 200) return fail(diagnostics, 'subject_claim_invalid');
    if (!email) return fail(diagnostics, 'email_claim_invalid');
    return { ok: true, identity: { userId, email } };
  } catch (error) {
    return fail(diagnostics, classifyVerificationError(error));
  }
}
