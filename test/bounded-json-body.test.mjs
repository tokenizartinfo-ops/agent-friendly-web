import assert from 'node:assert/strict';
import test from 'node:test';

import { readBoundedJsonBody } from '../lib/bounded-json-body.mjs';

test('bounded JSON reader accepts one object with the expected media type', async () => {
  const request = new Request('https://contact-staging.example.com/api/staging/contact-intake', {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ email: 'owner@example.com' }),
  });
  assert.deepEqual(await readBoundedJsonBody(request, { maxBytes: 1024 }), {
    ok: true,
    value: { email: 'owner@example.com' },
  });
});

test('bounded JSON reader rejects unsupported media, declared oversize and malformed JSON', async () => {
  const textRequest = new Request('https://example.com', { method: 'POST', headers: { 'content-type': 'text/plain' }, body: '{}' });
  assert.deepEqual(await readBoundedJsonBody(textRequest), { ok: false, status: 415, code: 'unsupported_media_type' });

  let bodyRead = false;
  const declaredLarge = {
    headers: new Headers({ 'content-type': 'application/json', 'content-length': '9000' }),
    get body() { bodyRead = true; return null; },
  };
  assert.deepEqual(await readBoundedJsonBody(declaredLarge, { maxBytes: 8192 }), { ok: false, status: 413, code: 'request_body_too_large' });
  assert.equal(bodyRead, false);

  const malformed = new Request('https://example.com', { method: 'POST', headers: { 'content-type': 'application/json' }, body: '{' });
  assert.deepEqual(await readBoundedJsonBody(malformed), { ok: false, status: 400, code: 'invalid_json' });
});

test('bounded JSON reader stops an undeclared streaming body above the byte limit and rejects arrays', async () => {
  const large = new Request('https://example.com', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ data: 'x'.repeat(9000) }),
  });
  large.headers.delete('content-length');
  assert.deepEqual(await readBoundedJsonBody(large, { maxBytes: 8192 }), { ok: false, status: 413, code: 'request_body_too_large' });

  const array = new Request('https://example.com', { method: 'POST', headers: { 'content-type': 'application/json' }, body: '[]' });
  assert.deepEqual(await readBoundedJsonBody(array), { ok: false, status: 400, code: 'invalid_json' });
});

