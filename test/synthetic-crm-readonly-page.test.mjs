import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const pagePath = new URL('../app/canary/synthetic-crm-readonly/route.ts', import.meta.url);
const apiPath = new URL('../app/api/canary/synthetic-crm-readonly/route.ts', import.meta.url);

test('private CRM board is Access-protected, responsive and strictly read-only', () => {
  assert.equal(existsSync(pagePath), true);
  assert.equal(existsSync(apiPath), true);
  const page = readFileSync(pagePath, 'utf8');
  const api = readFileSync(apiPath, 'utf8');

  assert.match(page, /AFW_SYNTHETIC_CRM_READONLY_ENABLED/);
  assert.match(page, /verifyCloudflareAccessJwt/);
  assert.match(page, /\/api\/canary\/synthetic-crm-readonly/);
  assert.match(page, /Bandeja comercial sintetica/);
  assert.match(page, /Solo lectura/);
  assert.match(page, /@media \(max-width: 680px\)/);
  assert.match(page, /textContent/);
  assert.match(page, /noindex, nofollow/);
  assert.doesNotMatch(page, /<form|<input|<textarea|contenteditable|<button/i);
  assert.doesNotMatch(page, /synthetic-canary@|EMAIL_REVIEW_READY|\.send\s*\(/i);

  assert.match(api, /synthetic-crm-readonly/);
  assert.match(api, /export async function GET/);
  assert.doesNotMatch(api, /export async function POST|EMAIL_REVIEW_READY/i);
});

test('private CRM board never appears in the public sitemap', () => {
  const sitemap = readFileSync(new URL('../app/sitemap.ts', import.meta.url), 'utf8');
  assert.doesNotMatch(sitemap, /canary\/synthetic-crm-readonly/);
});
