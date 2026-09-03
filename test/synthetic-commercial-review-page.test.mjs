import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const pagePath = new URL('../app/canary/commercial-review/route.ts', import.meta.url);
const apiPath = new URL('../app/api/canary/commercial-review/route.ts', import.meta.url);

test('private commercial review page is Access-protected, read-only and sanitized', () => {
  assert.equal(existsSync(pagePath), true);
  assert.equal(existsSync(apiPath), true);
  const page = readFileSync(pagePath, 'utf8');
  const api = readFileSync(apiPath, 'utf8');

  assert.match(page, /AFW_CANARY_DIAGNOSTICS_ENABLED/);
  assert.match(page, /AFW_SYNTHETIC_COMMERCIAL_REVIEW_ENABLED/);
  assert.match(page, /AFW_SYNTHETIC_CONTACT_ALLOWED_SUBJECT_HASHES/);
  assert.match(page, /hashAccessSubject/);
  assert.match(page, /verifyCloudflareAccessJwt/);
  assert.match(page, /cf-access-jwt-assertion/i);
  assert.match(page, /\/api\/canary\/commercial-review/);
  assert.match(page, /Solo lectura/);
  assert.match(page, /No guardado/);
  assert.match(page, /textContent/);
  assert.match(page, /noindex, nofollow/);
  assert.doesNotMatch(page, /<form|<input|<textarea|contenteditable|method=["']post/i);
  assert.doesNotMatch(page, /synthetic-canary@|operator@|EMAIL_REVIEW_READY|\.send\s*\(/i);

  assert.match(api, /synthetic-commercial-review/);
  assert.match(api, /cloudflare:workers/);
  assert.match(api, /export async function GET/);
  assert.doesNotMatch(api, /export async function POST|email-review-ready-gate|EMAIL_REVIEW_READY/i);
});

test('private commercial review routes never appear in the public sitemap', () => {
  const sitemap = readFileSync(new URL('../app/sitemap.ts', import.meta.url), 'utf8');
  assert.doesNotMatch(sitemap, /canary\/commercial-review/);
});
