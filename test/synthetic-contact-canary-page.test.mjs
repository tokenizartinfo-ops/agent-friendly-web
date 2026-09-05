import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const pagePath = new URL('../app/canary/contact-intake/route.ts', import.meta.url);

test('private canary page exposes one fixed synthetic action behind Access and the kill switch', () => {
  assert.equal(existsSync(pagePath), true);
  const source = readFileSync(pagePath, 'utf8');

  assert.match(source, /AFW_CANARY_DIAGNOSTICS_ENABLED/);
  assert.match(source, /AFW_SYNTHETIC_CONTACT_ENABLED/);
  assert.match(source, /AFW_SYNTHETIC_CONTACT_TURNSTILE_SITE_KEY/);
  assert.match(source, /verifyCloudflareAccessJwt/);
  assert.match(source, /cf-access-jwt-assertion/i);
  assert.match(source, /crypto\.randomUUID\(\)/);
  assert.match(source, /agent-friendly-web\.synthetic-contact-canary\.v1/);
  assert.match(source, /create_synthetic_contact_and_prepare_review/);
  assert.match(source, /afw_synthetic_contact/);
  assert.match(source, /\/api\/canary\/contact-intake/);
  assert.match(source, /challenges\.cloudflare\.com\/turnstile\/v0\/api\.js/);
  assert.match(source, /textContent/);
  assert.match(source, /Cache-Control/);
  assert.doesNotMatch(source, /<input|<textarea|contenteditable|type=["']email/i);
  assert.doesNotMatch(source, /synthetic-canary@example\.invalid|EMAIL_REVIEW_READY|\.send\s*\(/);
});

test('private canary page never appears in the public sitemap', () => {
  const sitemap = readFileSync(new URL('../app/sitemap.ts', import.meta.url), 'utf8');
  assert.doesNotMatch(sitemap, /canary\/contact-intake/);
});
