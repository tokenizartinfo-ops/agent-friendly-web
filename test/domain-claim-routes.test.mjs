import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const claimsRoutePath = 'app/api/projects/[projectId]/domain-claims/route.ts';
const verifyRoutePath = 'app/api/projects/[projectId]/domain-claims/[claimId]/verify/route.ts';

test('domain claim creation is owner-scoped and issues a 32-byte challenge', async () => {
  const route = await readFile(claimsRoutePath, 'utf8');

  assert.match(route, /getChatGPTUser/);
  assert.match(route, /eq\(siteProjects\.id, projectId\)/);
  assert.match(route, /eq\(siteProjects\.userId, (?:user\.userId|userId)\)/);
  assert.match(route, /new Uint8Array\(32\)/);
  assert.match(route, /dns_txt/);
  assert.match(route, /http_file/);
  assert.match(route, /status:\s*'superseded'/);
  assert.match(route, /db\.batch\(/);
  assert.doesNotMatch(route, /payloadJson:\s*JSON\.stringify\([^)]*challengeValue/);
});

test('domain claim listing remains scoped to the authenticated owner', async () => {
  const route = await readFile(claimsRoutePath, 'utf8');

  assert.match(route, /eq\(domainClaims\.projectId, projectId\)/);
  assert.match(route, /eq\(domainClaims\.userId, user\.userId\)/);
  assert.match(route, /orderBy\(desc\(domainClaims\.createdAt\)\)/);
});

test('verification is read-only externally, rate limited and atomically audited', async () => {
  const route = await readFile(verifyRoutePath, 'utf8');

  assert.match(route, /ATTEMPT_INTERVAL_MS\s*=\s*10_000/);
  assert.match(route, /MAX_ATTEMPTS\s*=\s*10/);
  assert.match(route, /resolvePublicTxt/);
  assert.match(route, /fetchLimitedPublicUrl/);
  assert.match(route, /eq\(domainClaims\.userId, user\.userId\)/);
  assert.match(route, /eq\(registrySites\.userId, user\.userId\)/);
  assert.match(route, /db\.batch\(/);
  assert.match(route, /domain_claim_verified/);
  assert.match(route, /domain_claim_failed/);
  assert.doesNotMatch(route, /method:\s*['"](?:PUT|PATCH|DELETE|POST)['"]/);
});
