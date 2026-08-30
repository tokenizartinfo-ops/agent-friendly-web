import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import test from 'node:test';

import {
  ORIGIN_COMPARISON_CONTRACT,
  compareCapsuleOrigin,
  validateOriginComparison,
} from '../lib/origin-comparison.mjs';

const capsule = {
  contract: 'agentfriendly.publication-capsule.v1',
  capsuleId: 'capsule-123',
  version: 2,
  target: { origin: 'https://example.com', hostname: 'example.com' },
  integrity: { manifestSha256: 'a'.repeat(64) },
  files: [
    {
      packagePath: 'files/llms.txt',
      destinationPath: '/llms.txt',
      operation: 'create_or_replace',
      mediaType: 'text/plain; charset=utf-8',
      sha256: createHash('sha256').update('# Example\n\nNew context\n').digest('hex'),
      content: '# Example\n\nNew context\n',
    },
    {
      packagePath: 'proposals/robots.agent-friendly-snippet.txt',
      destinationPath: '/robots.txt',
      operation: 'manual_merge',
      mediaType: 'text/plain; charset=utf-8',
      sha256: createHash('sha256').update('User-agent: GPTBot\nAllow: /\n').digest('hex'),
      content: 'User-agent: GPTBot\nAllow: /\n',
    },
  ],
};

function response(status, body, contentType = 'text/plain; charset=utf-8', extra = {}) {
  return {
    status,
    body,
    bodyBytes: new TextEncoder().encode(body),
    bytes: Buffer.byteLength(body),
    contentType,
    truncated: false,
    ...extra,
  };
}

test('origin comparison classifies changed and manual-review resources and binds hashes to the manifest', async () => {
  const comparison = await compareCapsuleOrigin(capsule, {
    observedAt: '2026-08-30T22:10:00.000Z',
    fetchLimitedPublicUrl: async (url) => url.endsWith('/llms.txt')
      ? response(200, '# Example\r\n\r\nOld context\r\n')
      : response(200, 'User-agent: *\nAllow: /\n'),
  });

  assert.equal(comparison.contract, ORIGIN_COMPARISON_CONTRACT);
  assert.equal(comparison.capsuleId, capsule.capsuleId);
  assert.equal(comparison.manifestSha256, capsule.integrity.manifestSha256);
  assert.equal(comparison.status, 'complete');
  assert.equal(comparison.resources[0].status, 'changed');
  assert.equal(comparison.resources[1].status, 'manual_review_required');
  assert.match(JSON.stringify(comparison.resources[0].diff), /Old context/);
  assert.match(JSON.stringify(comparison.resources[0].diff), /New context/);
  assert.match(comparison.resources[0].currentSha256, /^[a-f0-9]{64}$/);
  assert.equal(comparison.resources[0].proposedSha256, capsule.files[0].sha256);
  assert.deepEqual(validateOriginComparison(comparison), comparison);
});

test('origin comparison recognizes missing and normalized unchanged resources', async () => {
  const fixture = {
    ...capsule,
    files: [
      capsule.files[0],
      { ...capsule.files[0], packagePath: 'files/llms-full.txt', destinationPath: '/llms-full.txt', content: 'same\n', sha256: createHash('sha256').update('same\n').digest('hex') },
    ],
  };
  const comparison = await compareCapsuleOrigin(fixture, {
    fetchLimitedPublicUrl: async (url) => url.endsWith('/llms.txt')
      ? response(404, '')
      : response(200, 'same\r\n'),
  });

  assert.equal(comparison.resources[0].status, 'missing');
  assert.equal(comparison.resources[1].status, 'unchanged');
  assert.equal(comparison.status, 'complete');
});

test('origin comparison keeps partial failures and blocks secrets without reflecting them', async () => {
  const secret = 'api_key=super-secret-value';
  const comparison = await compareCapsuleOrigin(capsule, {
    fetchLimitedPublicUrl: async (url) => {
      if (url.endsWith('/llms.txt')) throw new Error('socket exposed details');
      return response(200, secret);
    },
  });

  assert.equal(comparison.status, 'incomplete');
  assert.equal(comparison.resources[0].status, 'unavailable');
  assert.equal(comparison.resources[1].status, 'blocked');
  assert.doesNotMatch(JSON.stringify(comparison), /super-secret-value|socket exposed details/);
});

test('origin comparison rejects non-allowlisted destinations and truncated or incompatible responses', async () => {
  const blockedCapsule = { ...capsule, files: [{ ...capsule.files[0], destinationPath: '/admin/config' }] };
  const blocked = await compareCapsuleOrigin(blockedCapsule, {
    fetchLimitedPublicUrl: async () => response(200, 'ignored'),
  });
  assert.equal(blocked.resources[0].status, 'blocked');

  const unavailable = await compareCapsuleOrigin(capsule, {
    fetchLimitedPublicUrl: async (url) => url.endsWith('/llms.txt')
      ? response(200, 'partial', 'text/plain', { truncated: true })
      : response(200, '<binary>', 'application/octet-stream'),
  });
  assert.equal(unavailable.resources[0].status, 'unavailable');
  assert.equal(unavailable.resources[1].status, 'unavailable');
  assert.equal(unavailable.status, 'incomplete');
});
