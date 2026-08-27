import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
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

test('the server page passes the query prefill without a state-setting effect', async () => {
  const [home, scanner] = await Promise.all([
    readFile('app/page.tsx', 'utf8'),
    readFile('app/components/scan-workspace.tsx', 'utf8'),
  ]);

  assert.match(home, /searchParams/);
  assert.match(home, /<ScanWorkspace initialSite=/);
  assert.doesNotMatch(scanner, /useEffect/);
  assert.match(scanner, /initialSite\?: string/);
});
