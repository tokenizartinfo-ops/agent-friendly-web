import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('public contact preview defaults to disabled and cannot call the endpoint without both gate and Turnstile', async () => {
  const source = await readFile('app/components/contact-intake.tsx', 'utf8');
  assert.match(source, /captureEnabled = false/);
  assert.match(source, /if \(!captureEnabled \|\| !turnstileToken \|\| sending\) return/);
  assert.match(source, /endpoint = '\/api\/contact-intake'/);
  assert.match(source, /fetch\(endpoint/);
  assert.match(source, /idempotencyKey: requestId/);
  assert.match(source, /setRequestId\(''\)/);
  assert.match(source, /setTurnstileToken\(''\)/);
});

test('contact endpoint is physically disabled and does not read request bodies in preview-only Gate 6B', async () => {
  const source = await readFile('app/api/contact-intake/route.ts', 'utf8');
  assert.match(source, /contact_capture_disabled/);
  assert.doesNotMatch(source, /request\.text|request\.json|getReader\(/);
  assert.doesNotMatch(source, /CONTACT_CAPTURE_ENABLED|TURNSTILE_SECRET_KEY|saveContactIntake/);
});

test('synthetic contact exists only on the private canary route and cannot enable the public endpoint', async () => {
  const [publicRoute, canaryRoute] = await Promise.all([
    readFile('app/api/contact-intake/route.ts', 'utf8'),
    readFile('app/api/canary/contact-intake/route.ts', 'utf8'),
  ]);
  assert.match(publicRoute, /contact_capture_disabled/);
  assert.doesNotMatch(publicRoute, /synthetic-contact-canary|AFW_SYNTHETIC_CONTACT/);
  assert.match(canaryRoute, /synthetic-contact-canary/);
  assert.match(canaryRoute, /cloudflare:workers/);
  assert.doesNotMatch(canaryRoute, /email-review-ready-gate|EMAIL_REVIEW_READY/);
});

test('retired Sites contact UI is absent and the public component stays disabled', async () => {
  const [component, robots, sitemap] = await Promise.all([
    readFile('app/components/contact-intake.tsx', 'utf8'),
    readFile('public/robots.txt', 'utf8'),
    readFile('app/sitemap.ts', 'utf8'),
  ]);
  assert.equal(existsSync('app/api/staging/contact-intake/route.ts'), false);
  assert.equal(existsSync('app/contact-staging/page.tsx'), false);
  assert.match(component, /endpoint = '\/api\/contact-intake'/);
  assert.match(component, /fetch\(endpoint/);
  assert.doesNotMatch(robots, /\/contact-staging|\/api\/staging/);
  assert.doesNotMatch(sitemap, /contact-staging/);
});
