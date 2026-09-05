import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const pagePath = new URL('../app/canary/synthetic-crm-persistence/route.ts', import.meta.url);
const apiPath = new URL('../app/api/canary/synthetic-crm-persistence/route.ts', import.meta.url);

test('private synthetic CRM page requires Access and exposes one fixed confirmed action', () => {
  assert.equal(existsSync(pagePath), true);
  assert.equal(existsSync(apiPath), true);
  const page = readFileSync(pagePath, 'utf8');
  const api = readFileSync(apiPath, 'utf8');

  assert.match(page, /AFW_SYNTHETIC_CRM_PERSISTENCE_ENABLED/);
  assert.match(page, /verifyCloudflareAccessJwt/);
  assert.match(page, /persist_one_synthetic_opportunity/);
  assert.match(page, /synthetic_only/);
  assert.match(page, /\/api\/canary\/synthetic-crm-persistence/);
  assert.match(page, /Guardar oportunidad sintetica/);
  assert.match(page, /textContent/);
  assert.match(page, /noindex, nofollow/);
  assert.doesNotMatch(page, /<input|<textarea|contenteditable|type=["']email/i);
  assert.doesNotMatch(page, /synthetic-canary@|EMAIL_REVIEW_READY|\.send\s*\(/i);

  assert.match(api, /synthetic-crm-persistence/);
  assert.match(api, /export async function POST/);
  assert.doesNotMatch(api, /export async function GET|EMAIL_REVIEW_READY/i);
});

test('private synthetic CRM routes stay out of the public sitemap', () => {
  const sitemap = readFileSync(new URL('../app/sitemap.ts', import.meta.url), 'utf8');
  assert.doesNotMatch(sitemap, /canary\/synthetic-crm-persistence/);
});
