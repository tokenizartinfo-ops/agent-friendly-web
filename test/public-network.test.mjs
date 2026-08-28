import assert from 'node:assert/strict';
import test from 'node:test';

import {
  MAX_PUBLIC_RESPONSE_BYTES,
  assertPublicHostname,
  fetchLimitedPublicUrl,
} from '../lib/public-network.mjs';

test('assertPublicHostname accepts public DNS answers', async () => {
  const calls = [];
  await assertPublicHostname('museo.example', async (hostname) => {
    calls.push(hostname);
    return ['104.16.132.229', '2606:4700::6810:84e5'];
  });
  assert.deepEqual(calls, ['museo.example']);
});

test('assertPublicHostname rejects private literals, private DNS answers and empty DNS', async () => {
  await assert.rejects(() => assertPublicHostname('127.0.0.1'), /publica/i);
  await assert.rejects(
    () => assertPublicHostname('museo.example', async () => ['104.16.132.229', '10.0.0.1']),
    /publica/i,
  );
  await assert.rejects(
    () => assertPublicHostname('museo.example', async () => []),
    /publica/i,
  );
  await assert.rejects(
    () => assertPublicHostname('localhost', async () => ['104.16.132.229']),
    /publica/i,
  );
});

test('fetchLimitedPublicUrl verifies DNS, keeps redirects manual and returns bounded metadata', async () => {
  const calls = [];
  const result = await fetchLimitedPublicUrl('https://museo.example/resource', {
    resolveDns: async () => ['104.16.132.229'],
    fetchImpl: async (url, init) => {
      calls.push({ url: String(url), redirect: init.redirect, accept: init.headers.accept });
      return new Response('redirect body', {
        status: 302,
        headers: {
          location: 'http://127.0.0.1/private',
          'content-type': 'text/plain',
          link: '</sitemap.xml>; rel="sitemap"',
        },
      });
    },
    accept: 'text/plain',
  });

  assert.deepEqual(calls, [{
    url: 'https://museo.example/resource',
    redirect: 'manual',
    accept: 'text/plain',
  }]);
  assert.equal(result.status, 302);
  assert.equal(result.body, 'redirect body');
  assert.deepEqual([...result.bodyBytes], [...new TextEncoder().encode('redirect body')]);
  assert.equal(result.bytes, 13);
  assert.equal(result.truncated, false);
  assert.equal(result.contentType, 'text/plain');
  assert.equal(result.link, '</sitemap.xml>; rel="sitemap"');
});

test('fetchLimitedPublicUrl never fetches a destination that resolves privately', async () => {
  let fetched = false;
  await assert.rejects(
    () => fetchLimitedPublicUrl('https://museo.example/', {
      resolveDns: async () => ['192.168.1.3'],
      fetchImpl: async () => {
        fetched = true;
        return new Response('should not happen');
      },
    }),
    /publica/i,
  );
  assert.equal(fetched, false);
});

test('fetchLimitedPublicUrl truncates response bodies at the byte limit', async () => {
  const body = 'a'.repeat(MAX_PUBLIC_RESPONSE_BYTES + 5_000);
  const result = await fetchLimitedPublicUrl('https://museo.example/large', {
    resolveDns: async () => ['104.16.132.229'],
    fetchImpl: async () => new Response(body, { headers: { 'content-type': 'text/plain' } }),
  });

  assert.equal(result.bytes, MAX_PUBLIC_RESPONSE_BYTES);
  assert.equal(result.bodyBytes.byteLength, MAX_PUBLIC_RESPONSE_BYTES);
  assert.equal(result.truncated, true);
  assert.equal(new TextEncoder().encode(result.body).byteLength, MAX_PUBLIC_RESPONSE_BYTES);
});
