import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('public contact preview defaults to disabled and cannot call the endpoint without both gate and Turnstile', async () => {
  const source = await readFile('app/components/contact-intake.tsx', 'utf8');
  assert.match(source, /captureEnabled = false/);
  assert.match(source, /if \(!captureEnabled \|\| !turnstileToken \|\| sending\) return/);
  assert.match(source, /fetch\('\/api\/contact-intake'/);
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
