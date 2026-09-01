import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const authPath = new URL('../app/cloudflare-access-auth.ts', import.meta.url);

test('private web identity is derived from a verified Cloudflare Access JWT', () => {
  assert.equal(existsSync(authPath), true);
  const source = readFileSync(authPath, 'utf8');

  assert.match(source, /cf-access-jwt-assertion/i);
  assert.match(source, /verifyCloudflareAccessJwt/);
  assert.match(source, /ACCESS_TEAM_DOMAIN/);
  assert.match(source, /ACCESS_AUD/);
  assert.doesNotMatch(source, /cf-access-authenticated-user-email/i);
  assert.doesNotMatch(source, /oai-authenticated-/i);
});

test('private web identity exposes a bounded logout and fail-closed redirect', () => {
  assert.equal(existsSync(authPath), true);
  const source = readFileSync(authPath, 'utf8');

  assert.match(source, /\/cdn-cgi\/access\/logout/);
  assert.match(source, /requireCloudflareAccessUser/);
  assert.match(source, /redirect\(/);
});

