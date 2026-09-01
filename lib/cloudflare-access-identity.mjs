import { createRemoteJWKSet, jwtVerify } from 'jose';

const teamDomainPattern = /^(?=.{1,253}$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.cloudflareaccess\.com$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const remoteKeySets = new Map();

function fail() {
  return { ok: false, code: 'contact_staging_identity_required' };
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
    remoteKeySets.set(issuer, createRemoteJWKSet(new URL(`${issuer}/cdn-cgi/access/certs`)));
  }
  return remoteKeySets.get(issuer);
}

export async function verifyCloudflareAccessJwt({
  token,
  teamDomain,
  audience,
  keySet,
} = {}) {
  const domain = normalizeTeamDomain(teamDomain);
  const expectedAudience = typeof audience === 'string' ? audience.trim() : '';
  const assertion = typeof token === 'string' ? token.trim() : '';
  if (!domain || !expectedAudience || expectedAudience.length > 512 || !assertion || assertion.length > 16384) {
    return fail();
  }

  const issuer = `https://${domain}`;
  try {
    const { payload } = await jwtVerify(assertion, keySet || remoteKeySet(issuer), {
      issuer,
      audience: expectedAudience,
      algorithms: ['RS256'],
    });
    const userId = typeof payload.sub === 'string' ? payload.sub.trim().slice(0, 200) : '';
    const email = normalizeEmail(payload.email);
    if (!userId || !email) return fail();
    return { ok: true, identity: { userId, email } };
  } catch {
    return fail();
  }
}
