import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import test from 'node:test';

const requiredFiles = [
  'lib/public-profile.mjs',
  'lib/registry-store.ts',
  'app/api/projects/[projectId]/publish-profile/route.ts',
  'app/registry/page.tsx',
  'app/registry/[slug]/page.tsx',
  'app/registry/[slug]/profile.json/route.ts',
  'app/registry/[slug]/profile.md/route.ts',
];

test('Registry implementation exposes human, JSON and Markdown surfaces', async () => {
  for (const path of requiredFiles) {
    const exists = await stat(path).then(() => true).catch(() => false);
    assert.equal(exists, true, `${path} must exist`);
  }

  const jsonRoute = await readFile('app/registry/[slug]/profile.json/route.ts', 'utf8');
  const markdownRoute = await readFile('app/registry/[slug]/profile.md/route.ts', 'utf8');
  assert.match(jsonRoute, /application\/json; charset=utf-8/i);
  assert.match(markdownRoute, /text\/markdown; charset=utf-8/i);
});

test('publication requires an authenticated owner, verification and explicit confirmation', async () => {
  const route = await readFile('app/api/projects/[projectId]/publish-profile/route.ts', 'utf8');

  assert.match(route, /getCloudflareAccessUser/);
  assert.match(route, /agentfriendly\.owner-attestation\.v1/);
  assert.match(route, /confirmPublicProjection/);
  assert.match(route, /expectedDomain/);
  assert.match(route, /domainClaimStatusAt/);
  assert.match(route, /verificationStatus/);
  assert.match(route, /db\.batch/);
});

test('public navigation and sitemap include the Registry but exclude private APIs', async () => {
  const header = await readFile('app/components/site-header.tsx', 'utf8');
  const sitemap = await readFile('app/sitemap.ts', 'utf8');

  assert.match(header, /\['registry', 'registry'\]/);
  assert.match(sitemap, /'registry'/);
  assert.equal(sitemap.includes('/api/projects'), false);
  assert.equal(sitemap.includes('/expediente'), false);
});
