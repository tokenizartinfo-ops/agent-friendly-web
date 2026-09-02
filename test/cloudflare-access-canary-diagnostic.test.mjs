import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const routePath = new URL('../app/api/canary/access-diagnostic/route.ts', import.meta.url);
const wranglerPath = new URL('../wrangler.jsonc', import.meta.url);

test('canary exposes a metadata-only Access diagnostic behind an explicit flag', () => {
  assert.equal(existsSync(routePath), true);
  const source = readFileSync(routePath, 'utf8');

  assert.match(source, /AFW_CANARY_DIAGNOSTICS_ENABLED/);
  assert.match(source, /cf-access-jwt-assertion/i);
  assert.match(source, /verifyCloudflareAccessJwt/);
  assert.match(source, /assertion_header_present/);
  assert.match(source, /verification_status/);
  assert.match(source, /status:\s*result\.ok\s*\?\s*200\s*:\s*403/);
  assert.doesNotMatch(source, /identity\.email|result\.identity|token:/);
  assert.doesNotMatch(source, /as unknown as Record/);
});

test('Access diagnostics are enabled only in the isolated canary environment', () => {
  const source = readFileSync(wranglerPath, 'utf8');
  const config = JSON.parse(source.replace(/^\s*\/\/.*$/gm, ''));

  assert.equal(config.vars.AFW_CANARY_DIAGNOSTICS_ENABLED, 'false');
  assert.equal(config.env.canary.vars.AFW_CANARY_DIAGNOSTICS_ENABLED, 'true');
  assert.equal(config.env.production.vars.AFW_CANARY_DIAGNOSTICS_ENABLED, 'false');
});
