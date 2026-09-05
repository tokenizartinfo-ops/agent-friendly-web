import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const pagePath = new URL('../app/canary/synthetic-privacy-lifecycle/route.ts', import.meta.url);
const apiPath = new URL('../app/api/canary/synthetic-privacy-lifecycle/route.ts', import.meta.url);

test('private lifecycle routes use the independent switch and Access boundary', () => {
  assert.equal(existsSync(pagePath), true);
  assert.equal(existsSync(apiPath), true);
  const page = readFileSync(pagePath, 'utf8');
  const api = readFileSync(apiPath, 'utf8');

  assert.match(page, /AFW_CANARY_DIAGNOSTICS_ENABLED/);
  assert.match(page, /AFW_SYNTHETIC_PRIVACY_LIFECYCLE_ENABLED/);
  assert.match(page, /AFW_SYNTHETIC_CONTACT_ALLOWED_SUBJECT_HASHES/);
  assert.match(page, /verifyCloudflareAccessJwt/);
  assert.match(page, /hashAccessSubject/);
  assert.match(page, /cf-access-jwt-assertion/i);
  assert.match(page, /new Response\(null, \{ status: 404, headers: noStoreHeaders \}\)/);
  assert.match(page, /Cache-Control/);
  assert.match(page, /X-Robots-Tag/);
  assert.match(page, /noindex, nofollow/);

  assert.match(api, /synthetic-privacy-lifecycle/);
  assert.match(api, /cloudflare:workers/);
  assert.match(api, /export async function POST/);
  assert.doesNotMatch(api, /export async function (?:GET|PUT|PATCH|DELETE)/);
});

test('human probe page renders one fixed action without accepting user data', () => {
  const page = readFileSync(pagePath, 'utf8');
  assert.equal((page.match(/<button\b/g) || []).length, 1);
  assert.match(page, /\/api\/canary\/synthetic-privacy-lifecycle/);
  assert.match(page, /agent-friendly-web\.synthetic-privacy-lifecycle\.v1/);
  assert.match(page, /run_one_private_synthetic_privacy_lifecycle/);
  assert.match(page, /synthetic_only/);
  assert.match(page, /Solo datos sinteticos/);
  assert.match(page, /textContent/);
  assert.doesNotMatch(page, /<form|<input|<textarea|<select|contenteditable/i);
  assert.doesNotMatch(page, /synthetic-canary@|type=["']email|operator@/i);
});

test('private lifecycle routes contain no email, payment or proposal integration', () => {
  const source = `${readFileSync(pagePath, 'utf8')}\n${readFileSync(apiPath, 'utf8')}`;
  assert.doesNotMatch(
    source,
    /email-review-ready-gate|private-review-ready-integration|EMAIL_REVIEW_READY|\.send\s*\(|stripe|checkout|createProposal|proposal-integration/i,
  );
});

test('private lifecycle routes never appear in the public sitemap', () => {
  const sitemap = readFileSync(new URL('../app/sitemap.ts', import.meta.url), 'utf8');
  assert.doesNotMatch(sitemap, /canary\/synthetic-privacy-lifecycle/);
});
