import assert from 'node:assert/strict';
import test from 'node:test';
import { normalizeSitePrefill } from '../lib/site-prefill.mjs';

test('normalizeSitePrefill accepts a public hostname and path', () => {
  assert.equal(normalizeSitePrefill('https://Example.org/path/'), 'example.org/path');
  assert.equal(normalizeSitePrefill('tokenizart.com'), 'tokenizart.com');
});

test('normalizeSitePrefill removes query strings and fragments', () => {
  assert.equal(
    normalizeSitePrefill('https://example.org/guide?token=not-public#section'),
    'example.org/guide',
  );
});

test('normalizeSitePrefill rejects private, credentialed and unsupported targets', () => {
  for (const value of [
    'localhost',
    '127.0.0.1',
    '192.168.1.4',
    'service.internal',
    'file:///tmp/a',
    'javascript:alert(1)',
    'https://user:pass@example.org',
    'https://example.org:8443',
  ]) {
    assert.equal(normalizeSitePrefill(value), '', `${value} must be rejected`);
  }
});
