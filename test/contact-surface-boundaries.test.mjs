import assert from 'node:assert/strict';
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

test('staging contact is a separate fail-closed route and the public component keeps its public default', async () => {
  const [route, component, page, robots, sitemap] = await Promise.all([
    readFile('app/api/staging/contact-intake/route.ts', 'utf8'),
    readFile('app/components/contact-intake.tsx', 'utf8'),
    readFile('app/contact-staging/page.tsx', 'utf8'),
    readFile('public/robots.txt', 'utf8'),
    readFile('app/sitemap.ts', 'utf8'),
  ]);
  assert.match(route, /processStagingContactRequest/);
  assert.match(route, /CONTACT_STAGING_TURNSTILE_SECRET/);
  assert.match(route, /oai-authenticated-user-id/);
  assert.match(route, /oai-authenticated-user-email/);
  assert.match(route, /runtimeReady/);
  assert.doesNotMatch(route, /request\.json\(/);
  assert.match(component, /endpoint = '\/api\/contact-intake'/);
  assert.match(component, /fetch\(endpoint/);
  assert.match(robots, /Disallow: \/contact-staging/);
  assert.match(robots, /Disallow: \/api\/staging/);
  assert.match(page, /domain="example\.com"/);
  assert.match(page, /robots: \{ index: false, follow: false/);
  assert.doesNotMatch(sitemap, /contact-staging/);
});

test('private contact staging exposes the one-time Turnstile response only for the synthetic gate', async () => {
  const component = await readFile('app/components/contact-intake.tsx', 'utf8');
  const page = await readFile('app/contact-staging/page.tsx', 'utf8');

  assert.match(component, /syntheticTokenProbe\?: boolean/);
  assert.match(component, /data-afw-synthetic-turnstile-token=\{turnstileToken\}/);
  assert.match(page, /syntheticTokenProbe/);
  assert.doesNotMatch(await readFile('app/components/scan-workspace.tsx', 'utf8'), /syntheticTokenProbe/);
});

test('private synthetic gate targets the Access-protected Worker with browser credentials', async () => {
  const component = await readFile('app/components/contact-intake.tsx', 'utf8');
  const page = await readFile('app/contact-staging/page.tsx', 'utf8');

  assert.match(component, /credentials: endpoint\.startsWith\('https:\/\/'\) \? 'include' : 'same-origin'/);
  assert.match(page, /endpoint="https:\/\/contact-staging\.agentfriendlyweb\.dev\/api\/contact-intake"/);
});
