import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const pagePath = new URL('../app/canary/private-human-privacy-pilot/route.ts', import.meta.url);
const sitemapPath = new URL('../app/sitemap.ts', import.meta.url);

test('private human privacy pilot page is Access-protected and hidden from public discovery', () => {
  assert.equal(existsSync(pagePath), true);
  const source = readFileSync(pagePath, 'utf8');
  const sitemap = readFileSync(sitemapPath, 'utf8');

  assert.match(source, /AFW_PRIVATE_HUMAN_PRIVACY_PILOT_ENABLED/);
  assert.match(source, /AFW_CANARY_DIAGNOSTICS_ENABLED/);
  assert.match(source, /cf-access-jwt-assertion/i);
  assert.match(source, /verifyCloudflareAccessJwt/);
  assert.match(source, /AFW_SYNTHETIC_CONTACT_ALLOWED_SUBJECT_HASHES/);
  assert.match(source, /noindex, nofollow/i);
  assert.match(source, /Cache-Control/);
  assert.doesNotMatch(sitemap, /private-human-privacy-pilot/);
});

test('private pilot renders five ordered own-data actions without free-form PII fields', () => {
  const source = readFileSync(pagePath, 'utf8');

  const labels = [
    'Registrar mis datos de prueba',
    'Ver mi exportacion',
    'Cambiar mi idioma',
    'Retirar el consentimiento de respuesta',
    'Borrar mis datos',
  ];
  let previous = -1;
  for (const label of labels) {
    const current = source.indexOf(label);
    assert.ok(current > previous, `${label} must appear in order`);
    previous = current;
  }

  assert.match(source, /<select[^>]+id="locale"/);
  assert.doesNotMatch(source, /<input/i);
  assert.doesNotMatch(source, /<textarea/i);
  assert.doesNotMatch(source, /localStorage|sessionStorage/);
  assert.doesNotMatch(source, /type="email"|name="email"/i);
});

test('private pilot client sends only the exact contract and disables the flow after erasure', () => {
  const source = readFileSync(pagePath, 'utf8');

  assert.match(source, /agent-friendly-web\.private-human-privacy-pilot\.v1/);
  assert.match(source, /own_data_private_pilot/);
  assert.match(source, /\/api\/canary\/private-human-privacy-pilot/);
  assert.match(source, /enroll/);
  assert.match(source, /inspect_export/);
  assert.match(source, /rectify_locale/);
  assert.match(source, /withdraw_requested_plan/);
  assert.match(source, /erase/);
  assert.match(source, /privacy_pilot_erased/);
  assert.match(source, /disabled\s*=\s*true/);
  assert.doesNotMatch(source, /export\s+async\s+function\s+POST/);
});

test('private pilot escapes line breaks inside its template-rendered client script', () => {
  const source = readFileSync(pagePath, 'utf8');

  assert.ok(source.includes(String.raw`Datos verificados de esta prueba:\\n`));
});

test('private pilot restores the next enabled step after a browser reload', () => {
  const source = readFileSync(pagePath, 'utf8');

  assert.match(source, /payload\.resumeStage/);
  assert.match(source, /Progreso recuperado/);
});
