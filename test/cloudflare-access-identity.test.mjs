import assert from 'node:assert/strict';
import test from 'node:test';

import { generateKeyPair, SignJWT } from 'jose';

import { verifyCloudflareAccessJwt } from '../lib/cloudflare-access-identity.mjs';

const issuer = 'https://tokenizart.cloudflareaccess.com';
const audience = 'contact-staging-audience';
const { privateKey, publicKey } = await generateKeyPair('RS256');

async function accessToken(claims = {}, options = {}) {
  const now = Math.floor(Date.now() / 1000);
  const protectedHeader = options.omitTyp
    ? { alg: 'RS256', kid: 'test-key' }
    : { alg: 'RS256', kid: 'test-key', typ: options.typ === undefined ? 'JWT' : options.typ };
  return new SignJWT({
    email: ' Owner@Example.com ',
    ...claims,
  })
    .setProtectedHeader(protectedHeader)
    .setIssuer(options.issuer || issuer)
    .setAudience(options.audience || audience)
    .setSubject(options.subject === undefined ? 'owner-1' : options.subject)
    .setIssuedAt(now)
    .setExpirationTime(options.expiresAt || now + 300)
    .sign(privateKey);
}

test('validates a signed Access JWT and returns only bounded identity', async () => {
  const result = await verifyCloudflareAccessJwt({
    token: await accessToken(),
    teamDomain: 'tokenizart.cloudflareaccess.com',
    audience,
    keySet: publicKey,
  });
  assert.deepEqual(result, {
    ok: true,
    identity: { userId: 'owner-1', email: 'owner@example.com' },
  });
});

test('fails closed for wrong issuer, audience or expiration without returning claims', async () => {
  const cases = [
    accessToken({}, { issuer: 'https://other.cloudflareaccess.com' }),
    accessToken({}, { audience: 'other-audience' }),
    accessToken({}, { expiresAt: Math.floor(Date.now() / 1000) - 10 }),
  ];
  for (const tokenPromise of cases) {
    const result = await verifyCloudflareAccessJwt({
      token: await tokenPromise,
      teamDomain: 'tokenizart.cloudflareaccess.com',
      audience,
      keySet: publicKey,
    });
    assert.deepEqual(result, { ok: false, code: 'contact_staging_identity_required' });
    assert.equal(JSON.stringify(result).includes('Owner@Example.com'), false);
  }
});

test('accepts a valid Cloudflare Access JWT without the optional typ header', async () => {
  const result = await verifyCloudflareAccessJwt({
    token: await accessToken({}, { omitTyp: true }),
    teamDomain: 'tokenizart.cloudflareaccess.com',
    audience,
    keySet: publicKey,
  });
  assert.deepEqual(result, {
    ok: true,
    identity: { userId: 'owner-1', email: 'owner@example.com' },
  });
});

test('returns only a bounded diagnostic category when canary diagnostics are requested', async () => {
  const cases = [
    {
      token: await accessToken({}, { issuer: 'https://other.cloudflareaccess.com' }),
      diagnosticCode: 'issuer_mismatch',
    },
    {
      token: await accessToken({}, { audience: 'other-audience' }),
      diagnosticCode: 'audience_mismatch',
    },
    {
      token: await accessToken({}, { expiresAt: Math.floor(Date.now() / 1000) - 10 }),
      diagnosticCode: 'token_expired',
    },
  ];

  for (const testCase of cases) {
    const result = await verifyCloudflareAccessJwt({
      token: testCase.token,
      teamDomain: 'tokenizart.cloudflareaccess.com',
      audience,
      keySet: publicKey,
      diagnostics: true,
    });
    assert.deepEqual(result, {
      ok: false,
      code: 'contact_staging_identity_required',
      diagnosticCode: testCase.diagnosticCode,
    });
    assert.equal(JSON.stringify(result).includes('Owner@Example.com'), false);
  }
});

test('requires subject and normalized email claims', async () => {
  const missingEmail = await accessToken({ email: '' });
  const missingSubject = await accessToken({}, { subject: '' });
  const oversizedSubject = await accessToken({}, { subject: 'a'.repeat(201) });
  for (const token of [missingEmail, missingSubject, oversizedSubject]) {
    assert.deepEqual(await verifyCloudflareAccessJwt({
      token,
      teamDomain: 'tokenizart.cloudflareaccess.com',
      audience,
      keySet: publicKey,
    }), { ok: false, code: 'contact_staging_identity_required' });
  }
});

test('rejects missing tokens and invalid Access configuration before network lookup', async () => {
  for (const input of [
    { token: '', teamDomain: 'tokenizart.cloudflareaccess.com', audience },
    { token: 'not-a-jwt', teamDomain: 'https://tokenizart.cloudflareaccess.com', audience },
    { token: 'not-a-jwt', teamDomain: 'attacker.example', audience },
    { token: 'not-a-jwt', teamDomain: 'tokenizart.cloudflareaccess.com', audience: '' },
  ]) {
    assert.deepEqual(await verifyCloudflareAccessJwt({ ...input, keySet: publicKey }), {
      ok: false,
      code: 'contact_staging_identity_required',
    });
  }
});
