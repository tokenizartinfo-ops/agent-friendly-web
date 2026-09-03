import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const routePath = new URL('../app/api/canary/access-diagnostic/route.ts', import.meta.url);
const subjectHashPath = new URL('../lib/access-subject-hash.mjs', import.meta.url);
const wranglerPath = new URL('../wrangler.jsonc', import.meta.url);

test('canary exposes a metadata-only Access diagnostic behind an explicit flag', () => {
  assert.equal(existsSync(routePath), true);
  const source = readFileSync(routePath, 'utf8');

  assert.match(source, /AFW_CANARY_DIAGNOSTICS_ENABLED/);
  assert.match(source, /cf-access-jwt-assertion/i);
  assert.match(source, /verifyCloudflareAccessJwt/);
  assert.match(source, /assertion_header_present/);
  assert.match(source, /verification_status/);
  assert.match(source, /hashAccessSubject/);
  assert.match(source, /actor_subject_hash/);
  assert.match(source, /status:\s*result\.ok\s*\?\s*200\s*:\s*403/);
  assert.doesNotMatch(source, /identity\.email|actor_email|actor_subject\s*:|token:/);
  assert.doesNotMatch(source, /as unknown as Record/);
});

test('Access subject hashing is deterministic and rejects missing subjects', async () => {
  assert.equal(existsSync(subjectHashPath), true);
  const { hashAccessSubject } = await import(subjectHashPath.href);

  assert.equal(
    await hashAccessSubject('owner-subject-1'),
    '27598022052c3a9bdcee550f65a586d67cab354f434936a4f6b5fee14669c6ec',
  );
  await assert.rejects(() => hashAccessSubject(''), /Access subject is required/);
  await assert.rejects(() => hashAccessSubject('x'.repeat(201)), /Access subject is invalid/);
});

test('Access diagnostics are enabled only in the isolated canary environment', () => {
  const source = readFileSync(wranglerPath, 'utf8');
  const config = JSON.parse(source.replace(/^\s*\/\/.*$/gm, ''));

  assert.equal(config.vars.AFW_CANARY_DIAGNOSTICS_ENABLED, 'false');
  assert.equal(config.env.canary.vars.AFW_CANARY_DIAGNOSTICS_ENABLED, 'true');
  assert.equal(config.env.production.vars.AFW_CANARY_DIAGNOSTICS_ENABLED, 'false');
});
