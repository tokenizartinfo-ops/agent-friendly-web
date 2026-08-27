import assert from 'node:assert/strict';
import test from 'node:test';

import {
  CLAIM_TTL_MS,
  HTTP_CHALLENGE_PATH,
  VERIFIED_TTL_MS,
  createDomainChallenge,
  domainClaimStatusAt,
  evaluateDomainChallenge,
} from '../lib/domain-verification.mjs';

function fixtureFor(claim) {
  return claim.method === 'dns_txt'
    ? { claim, dnsAnswers: [claim.challengeValue], httpBody: '' }
    : { claim, dnsAnswers: [], httpBody: claim.challengeValue };
}

test('DNS challenge matches one exact TXT value and consumes once', () => {
  const claim = createDomainChallenge({
    hostname: 'Museo.Example.',
    method: 'dns_txt',
    token: 'abc123',
    now: '2026-08-26T12:00:00.000Z',
  });

  assert.equal(claim.hostname, 'museo.example');
  assert.equal(claim.challengeName, '_agentfriendly-challenge.museo.example');
  assert.equal(claim.challengeValue, 'agentfriendly-domain-verification=abc123');
  assert.equal(
    Date.parse(claim.expiresAt) - Date.parse(claim.createdAt),
    CLAIM_TTL_MS,
  );

  const result = evaluateDomainChallenge({
    claim,
    dnsAnswers: ['unrelated=value', claim.challengeValue],
    httpBody: '',
    now: '2026-08-26T12:10:00.000Z',
  });

  assert.equal(result.verified, true);
  assert.equal(result.nextStatus, 'verified');
  assert.equal(result.consumedAt, '2026-08-26T12:10:00.000Z');
  assert.equal(
    Date.parse(result.verifiedUntil) - Date.parse(result.verifiedAt),
    VERIFIED_TTL_MS,
  );

  const reused = evaluateDomainChallenge({
    ...fixtureFor({ ...claim, status: result.nextStatus, consumedAt: result.consumedAt }),
    now: '2026-08-26T12:11:00.000Z',
  });
  assert.equal(reused.verified, false);
  assert.equal(reused.reason, 'claim_not_pending');
});

test('HTTP challenge validates the exact contract, hostname and token', () => {
  const claim = createDomainChallenge({
    hostname: 'museo.example',
    method: 'http_file',
    token: 'abc123',
    now: '2026-08-26T12:00:00.000Z',
  });

  assert.equal(claim.challengeName, HTTP_CHALLENGE_PATH);
  assert.deepEqual(JSON.parse(claim.challengeValue), {
    contract: 'agentfriendly.domain-claim.v1',
    hostname: 'museo.example',
    token: 'abc123',
  });
  assert.equal(
    evaluateDomainChallenge({
      ...fixtureFor(claim),
      now: '2026-08-26T12:10:00.000Z',
    }).verified,
    true,
  );

  for (const httpBody of [
    '{not-json',
    JSON.stringify({ contract: 'agentfriendly.domain-claim.v1', hostname: 'other.example', token: 'abc123' }),
    JSON.stringify({ contract: 'agentfriendly.domain-claim.v1', hostname: 'museo.example', token: 'wrong' }),
    JSON.stringify({ contract: 'agentfriendly.domain-claim.v1', hostname: 'museo.example', token: 'abc123', extra: true }),
  ]) {
    const result = evaluateDomainChallenge({
      claim,
      dnsAnswers: [],
      httpBody,
      now: '2026-08-26T12:10:00.000Z',
    });
    assert.equal(result.verified, false, httpBody);
    assert.equal(result.nextStatus, 'pending');
  }
});

test('expired, consumed and non-pending challenges fail closed', () => {
  const claim = createDomainChallenge({
    hostname: 'museo.example',
    method: 'http_file',
    token: 'abc123',
    now: '2026-08-26T12:00:00.000Z',
  });

  const expired = evaluateDomainChallenge({
    ...fixtureFor(claim),
    now: '2026-08-26T12:31:00.000Z',
  });
  assert.equal(expired.verified, false);
  assert.equal(expired.nextStatus, 'expired');
  assert.equal(expired.reason, 'claim_expired');

  for (const changed of [
    { ...claim, status: 'verified' },
    { ...claim, status: 'failed' },
    { ...claim, consumedAt: '2026-08-26T12:05:00.000Z' },
  ]) {
    const result = evaluateDomainChallenge({
      ...fixtureFor(changed),
      now: '2026-08-26T12:10:00.000Z',
    });
    assert.equal(result.verified, false);
    assert.equal(result.reason, 'claim_not_pending');
  }
});

test('verified status expires after the approved 90-day window', () => {
  const verified = {
    ...createDomainChallenge({
      hostname: 'museo.example',
      method: 'dns_txt',
      token: 'abc123',
      now: '2026-08-26T12:00:00.000Z',
    }),
    status: 'verified',
    verifiedAt: '2026-08-26T12:10:00.000Z',
    consumedAt: '2026-08-26T12:10:00.000Z',
  };

  assert.equal(domainClaimStatusAt(verified, '2026-11-24T12:09:59.999Z'), 'verified');
  assert.equal(domainClaimStatusAt(verified, '2026-11-24T12:10:00.000Z'), 'expired');
});

test('challenge creation rejects unsupported methods, malformed hosts and invalid dates', () => {
  for (const input of [
    { hostname: 'museo.example/path', method: 'dns_txt', token: 'abc123', now: '2026-08-26T12:00:00.000Z' },
    { hostname: 'museo.example', method: 'email', token: 'abc123', now: '2026-08-26T12:00:00.000Z' },
    { hostname: 'museo.example', method: 'dns_txt', token: '', now: '2026-08-26T12:00:00.000Z' },
    { hostname: 'museo.example', method: 'dns_txt', token: 'abc123', now: 'invalid' },
  ]) {
    assert.throws(() => createDomainChallenge(input));
  }
});
