import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

test('contact Worker staging config binds isolated D1 and native rate limiting with writes OFF', () => {
  const config = JSON.parse(fs.readFileSync(path.join(root, 'wrangler.contact.jsonc'), 'utf8'));
  const staging = config.env.staging;
  assert.equal(config.main, 'worker/contact/index.mjs');
  assert.equal(config.workers_dev, false);
  assert.equal(staging.workers_dev, false);
  assert.equal(staging.vars.CONTACT_STAGING_WRITES_ENABLED, 'false');
  assert.equal(staging.vars.CONTACT_STAGING_MODE, 'staging_allowlist');
  assert.deepEqual(staging.d1_databases, [{
    binding: 'DB',
    database_name: 'agent-friendly-web-contact-staging-frontier',
    migrations_dir: 'drizzle',
  }]);
  assert.deepEqual(staging.ratelimits, [{
    name: 'CONTACT_STAGING_RATE_LIMITER',
    namespace_id: '6831',
    simple: { limit: 10, period: 60 },
  }]);
  assert.deepEqual(staging.routes, [{
    pattern: 'contact-staging.agentfriendlyweb.dev',
    custom_domain: true,
  }]);
});

test('contact Worker config never commits allowlists, Access identifiers or Turnstile secrets', () => {
  const source = fs.readFileSync(path.join(root, 'wrangler.contact.jsonc'), 'utf8');
  assert.doesNotMatch(source, /CONTACT_STAGING_ALLOWED_EMAILS/);
  assert.doesNotMatch(source, /CONTACT_ACCESS_TEAM_DOMAIN/);
  assert.doesNotMatch(source, /CONTACT_ACCESS_AUD/);
  assert.doesNotMatch(source, /CONTACT_STAGING_TURNSTILE_SECRET/);
  assert.doesNotMatch(source, /@/);
});
