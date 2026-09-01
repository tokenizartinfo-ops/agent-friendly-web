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
  assert.equal(canary.vars.AFW_REMOTE_DEPLOY_ENABLED, 'false');
  assert.equal(production.vars.AFW_REMOTE_DEPLOY_ENABLED, 'false');
});

test('package exposes Cloudflare-native local and dry-run commands only', () => {
  const packageJson = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));

  assert.match(packageJson.scripts['web:deploy:dry-run'], /@vinext\/cloudflare deploy --env canary --dry-run/);
  assert.equal(packageJson.scripts['web:deploy:canary'], undefined);
  assert.equal(packageJson.scripts['web:deploy:production'], undefined);
  assert.equal(packageJson.devDependencies['@vinext/cloudflare'], '1.0.0-beta.3');
});
