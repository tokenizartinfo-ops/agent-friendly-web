import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('all private Block 1 routes fail closed without an authenticated user', async () => {
  const routes = await Promise.all([
    read('app/api/projects/route.ts'),
    read('app/api/projects/[projectId]/domain-claims/route.ts'),
    read('app/api/projects/[projectId]/domain-claims/[claimId]/verify/route.ts'),
    read('app/api/projects/[projectId]/observations/route.ts'),
    read('app/api/projects/[projectId]/publish-profile/route.ts'),
  ]);

  for (const route of routes) {
    assert.match(route, /if \(!user\).*status:\s*401/s);
  }
});

test('publication requires explicit consent and a current verified domain', async () => {
  const route = await read('app/api/projects/[projectId]/publish-profile/route.ts');

  assert.match(route, /confirmPublicProjection !== true/);
  assert.match(route, /status:\s*400/);
  assert.match(route, /verificationStatus !== 'verified'/);
  assert.match(route, /verifiedUntil/);
  assert.match(route, /status:\s*409/);
});

test('observations require an explicit save action and project ownership', async () => {
  const route = await read('app/api/projects/[projectId]/observations/route.ts');

  assert.match(route, /confirmSave !== true/);
  assert.match(route, /status:\s*400/);
  assert.match(route, /ownedProject\(projectId, user\.userId\)/);
  assert.match(route, /status:\s*404/);
});

test('domain challenges are bounded and cannot be replayed', async () => {
  const route = await read('app/api/projects/[projectId]/domain-claims/[claimId]/verify/route.ts');

  assert.match(route, /MAX_ATTEMPTS\s*=\s*10/);
  assert.match(route, /claim\.status !== 'pending'/);
  assert.match(route, /claim\.attemptCount >= MAX_ATTEMPTS/);
  assert.match(route, /Date\.parse\(claim\.expiresAt\)/);
});

test('the visible brand text remains the accessible name', async () => {
  const header = await read('app/components/site-header.tsx');

  assert.doesNotMatch(header, /className="brand"[^>]*aria-label=/);
  assert.match(header, /Agent Friendly Web/);
  assert.match(header, /by Gabriel Mucchiut/);
});
