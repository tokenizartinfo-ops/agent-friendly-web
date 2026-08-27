import assert from 'node:assert/strict';
import test from 'node:test';

import { sanitizeObservation } from '../lib/public-audit.mjs';

test('saved observation keeps public evidence and removes response bodies and raw errors', () => {
  const sanitized = sanitizeObservation({
    target: 'https://example.org',
    checkedAt: '2026-08-27T18:00:00.000Z',
    evidence: { robots: true, sitemap: false },
    readiness: { methodology: 'AF Method v1', score: 18, level: 'AF-1 descubrible' },
    probes: [{
      id: 'robots', path: '/robots.txt', status: 200, bytes: 120,
      contentType: 'text/plain', link: '', detected: true,
      body: 'private response body',
      headers: { 'content-type': 'text/plain', authorization: 'Bearer secret' },
      error: 'raw network error', stack: 'private stack trace',
    }],
    limits: ['Read-only public audit.'],
    internalDebug: { token: 'secret' },
  });

  assert.deepEqual(sanitized.evidence, { robots: true, sitemap: false });
  assert.equal(sanitized.readiness.score, 18);
  assert.deepEqual(sanitized.probes, [{
    id: 'robots', path: '/robots.txt', status: 200, bytes: 120,
    contentType: 'text/plain', link: '', detected: true,
  }]);
  const serialized = JSON.stringify(sanitized);
  assert.equal(serialized.includes('private response body'), false);
  assert.equal(serialized.includes('Bearer secret'), false);
  assert.equal(serialized.includes('raw network error'), false);
  assert.equal(serialized.includes('private stack trace'), false);
  assert.equal(serialized.includes('internalDebug'), false);
});

test('saved observation rejects a non-public target contract', () => {
  assert.throws(() => sanitizeObservation({ target: 'javascript:alert(1)' }), /target/i);
});
