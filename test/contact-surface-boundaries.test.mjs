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
