import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const configPath = new URL('../wrangler.jsonc', import.meta.url);

test('web Worker config isolates canary and production without attaching traffic', () => {
  assert.equal(existsSync(configPath), true);
  const config = JSON.parse(readFileSync(configPath, 'utf8'));

  assert.equal(config.name, 'agent-friendly-web-web');
  assert.equal(config.main, 'vinext/server/fetch-handler');
  assert.equal(config.assets.directory, 'dist/client');
  assert.equal(config.assets.binding, 'ASSETS');
  assert.equal(config.workers_dev, false);
  assert.equal(config.preview_urls, false);
  assert.equal(config.routes, undefined);

  const canary = config.env.canary;
  const production = config.env.production;
  assert.equal(canary.name, 'agent-friendly-web-web-canary');
  assert.equal(production.name, 'agent-friendly-web-web-production');
  assert.equal(canary.routes, undefined);
  assert.equal(production.routes, undefined);
  assert.equal(canary.d1_databases[0].binding, 'DB');
  assert.equal(production.d1_databases[0].binding, 'DB');
  assert.notEqual(canary.d1_databases[0].database_id, production.d1_databases[0].database_id);
  assert.match(canary.d1_databases[0].database_id, /^[0-9a-f-]{36}$/i);
  assert.notEqual(canary.d1_databases[0].database_id, '11111111-1111-4111-8111-111111111111');
  assert.equal(canary.vars.ACCESS_TEAM_DOMAIN, 'tokenizart.cloudflareaccess.com');
  assert.match(canary.vars.ACCESS_AUD, /^[0-9a-f]{64}$/i);
  assert.equal(canary.vars.AFW_REMOTE_DEPLOY_ENABLED, 'false');
  assert.equal(production.vars.AFW_REMOTE_DEPLOY_ENABLED, 'false');
  assert.equal(config.vars.AFW_EMAIL_REVIEW_READY_ENABLED, 'false');
  assert.equal(canary.vars.AFW_EMAIL_REVIEW_READY_ENABLED, 'false');
  assert.equal(production.vars.AFW_EMAIL_REVIEW_READY_ENABLED, 'false');
  assert.equal(config.vars.AFW_SYNTHETIC_CONTACT_ENABLED, 'false');
  assert.equal(canary.vars.AFW_SYNTHETIC_CONTACT_ENABLED, 'false');
  assert.equal(production.vars.AFW_SYNTHETIC_CONTACT_ENABLED, 'false');
  assert.equal(config.vars.AFW_SYNTHETIC_COMMERCIAL_REVIEW_ENABLED, 'false');
  assert.equal(canary.vars.AFW_SYNTHETIC_COMMERCIAL_REVIEW_ENABLED, 'false');
  assert.equal(production.vars.AFW_SYNTHETIC_COMMERCIAL_REVIEW_ENABLED, 'false');
  assert.equal(canary.vars.AFW_SYNTHETIC_CONTACT_TURNSTILE_SITE_KEY, '1x00000000000000000000AA');
  assert.equal(canary.vars.AFW_SYNTHETIC_CONTACT_TURNSTILE_SECRET, '1x0000000000000000000000000000000AA');
  assert.equal(config.vars.AFW_SYNTHETIC_CONTACT_TURNSTILE_SITE_KEY, undefined);
  assert.equal(config.vars.AFW_SYNTHETIC_CONTACT_TURNSTILE_SECRET, undefined);
  assert.equal(production.vars.AFW_SYNTHETIC_CONTACT_TURNSTILE_SITE_KEY, undefined);
  assert.equal(production.vars.AFW_SYNTHETIC_CONTACT_TURNSTILE_SECRET, undefined);
  assert.equal(config.vars.AFW_SYNTHETIC_CONTACT_ALLOWED_SUBJECT_HASHES, undefined);
  assert.equal(canary.vars.AFW_SYNTHETIC_CONTACT_ALLOWED_SUBJECT_HASHES, undefined);
  assert.equal(production.vars.AFW_SYNTHETIC_CONTACT_ALLOWED_SUBJECT_HASHES, undefined);
  assert.equal(config.send_email, undefined);
  assert.equal(canary.send_email, undefined);
  assert.equal(production.send_email, undefined);
  assert.deepEqual(canary.unsafe?.bindings, [
    {
      name: 'EMAIL_REVIEW_READY',
      type: 'inherit',
    },
  ]);
  assert.equal(config.unsafe, undefined);
  assert.equal(production.unsafe, undefined);
  assert.equal(config.ratelimits, undefined);
  assert.deepEqual(canary.ratelimits, [
    {
      name: 'AFW_EMAIL_REVIEW_READY_RATE_LIMITER',
      namespace_id: '1895760673',
      simple: { limit: 1, period: 60 },
    },
    {
      name: 'AFW_SYNTHETIC_CONTACT_RATE_LIMITER',
      namespace_id: '1895760674',
      simple: { limit: 3, period: 60 },
    },
  ]);
  assert.equal(production.ratelimits, undefined);
});

test('web Worker can audit its own public Custom Domain through the Cloudflare front door', () => {
  const config = JSON.parse(readFileSync(configPath, 'utf8'));

  assert.ok(
    config.compatibility_flags.includes('global_fetch_strictly_public'),
    'same-origin public probes require global_fetch_strictly_public on a Worker Custom Domain',
  );
});

test('package exposes bounded Cloudflare-native canary and production commands', () => {
  const packageJson = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));

  assert.match(packageJson.scripts['web:deploy:dry-run'], /@vinext\/cloudflare deploy --env canary --dry-run/);
  assert.match(packageJson.scripts['web:smoke:local'], /smoke-cloudflare-native-local\.mjs.*http:\/\/localhost:8788.*--mode local/);
  assert.match(packageJson.scripts['web:smoke:canary-edge'], /smoke-cloudflare-native-local\.mjs.*--mode access-edge/);
  assert.match(packageJson.scripts['web:preflight:canary'], /preflight-cloudflare-native-canary\.mjs/);
  assert.match(packageJson.scripts['web:d1:migrations:canary'], /d1 migrations apply agent-friendly-web-web-canary --remote.*--env canary/);
  assert.match(packageJson.scripts['web:deploy:canary'], /@vinext\/cloudflare deploy --env canary$/);
  assert.equal(packageJson.scripts['web:preflight:production'], undefined);
  assert.match(packageJson.scripts['web:verify:production'], /smoke-cloudflare-native-local\.mjs.*agentfriendlyweb\.dev.*--mode public-edge/);
  assert.match(packageJson.scripts['web:d1:migrations:production'], /d1 migrations apply agent-friendly-web-web-production --remote.*--env production/);
  assert.match(packageJson.scripts['web:deploy:production:dry-run'], /@vinext\/cloudflare deploy --env production --dry-run/);
  assert.match(packageJson.scripts['web:deploy:production'], /@vinext\/cloudflare deploy --env production$/);
  assert.match(packageJson.scripts['web:smoke:production'], /smoke-cloudflare-native-local\.mjs.*agentfriendlyweb\.dev.*--mode public-edge/);
  assert.equal(packageJson.scripts['web:audit:stability'], 'node scripts/audit-cloudflare-native-stability.mjs');
  assert.equal(packageJson.scripts['web:compare:cutover'], undefined);
  assert.match(packageJson.scripts['web:compare:precutover-local'], /compare-cloudflare-native-public-origin\.mjs.*127\.0\.0\.1:8788/);
  assert.equal(packageJson.devDependencies['@vinext/cloudflare'], '1.0.0-beta.6');
  assert.equal(packageJson.devDependencies.vinext, '1.0.0-beta.8');
  assert.equal(packageJson.dependencies.react, '19.2.8');
  assert.equal(packageJson.dependencies['react-dom'], '19.2.8');
  assert.equal(packageJson.devDependencies['react-server-dom-webpack'], '19.2.8');
  assert.equal(packageJson.devDependencies['@cloudflare/vite-plugin'], '1.54.3');
  assert.equal(packageJson.devDependencies.wrangler, '4.128.0');
  assert.equal(packageJson.engines.node, '>=22.18.0');
});

test('production Worker configuration contains real isolated identifiers and no source route', () => {
  const config = JSON.parse(readFileSync(configPath, 'utf8'));
  const production = config.env.production;
  assert.equal(production.routes, undefined);
  assert.match(production.d1_databases[0].database_id, /^[0-9a-f]{8}-[0-9a-f-]{27}$/i);
  assert.notEqual(production.d1_databases[0].database_id, '22222222-2222-4222-8222-222222222222');
  assert.equal(production.vars.ACCESS_TEAM_DOMAIN, 'tokenizart.cloudflareaccess.com');
  assert.match(production.vars.ACCESS_AUD, /^[0-9a-f]{64}$/i);
  assert.equal(production.vars.AFW_CANARY_DIAGNOSTICS_ENABLED, 'false');
  assert.equal(production.vars.AFW_REMOTE_DEPLOY_ENABLED, 'false');
});
