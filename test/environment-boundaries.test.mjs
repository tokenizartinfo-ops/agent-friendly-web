import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

const PUBLIC_SITES_PROJECT = 'appgprj_6a8f19e35d688191a53e93432543e39c';
const PRIVATE_CONTACT_SITES_PROJECT = 'appgprj_6a9626e7c0988191af5625107dd55ba7';

test('canonical surface manifest keeps production, private UI and API distinct', async () => {
  const manifest = JSON.parse(await readFile('config/surface-environments.json', 'utf8'));
  assert.equal(manifest.version, 1);
  assert.deepEqual(Object.keys(manifest.surfaces).sort(), [
    'contact_staging_api',
    'contact_staging_ui',
    'public_web',
  ]);
  assert.equal(manifest.surfaces.public_web.origin, 'https://agentfriendlyweb.dev');
  assert.equal(manifest.surfaces.public_web.projectId, PUBLIC_SITES_PROJECT);
  assert.equal(manifest.surfaces.public_web.hostingConfig, '.openai/hosting.json');
  assert.equal(manifest.surfaces.contact_staging_ui.origin, 'https://agent-friendly-web-contact-staging.tokenizart.chatgpt.site');
  assert.equal(manifest.surfaces.contact_staging_ui.projectId, PRIVATE_CONTACT_SITES_PROJECT);
  assert.equal(manifest.surfaces.contact_staging_ui.hostingConfig, '.openai/hosting.contact-staging.json');
  assert.equal(manifest.surfaces.contact_staging_ui.canWrite, false);
  assert.equal(manifest.surfaces.contact_staging_api.origin, 'https://contact-staging.agentfriendlyweb.dev');
  assert.equal(manifest.surfaces.contact_staging_api.service, 'agent-friendly-web-contact-staging-frontier');
  assert.equal(manifest.surfaces.contact_staging_api.servesHumanUi, false);
});

test('committed Sites target always points to the public website', async () => {
  const hosting = JSON.parse(await readFile('.openai/hosting.json', 'utf8'));
  assert.equal(hosting.project_id, PUBLIC_SITES_PROJECT);
});

test('private Sites target is explicit and cannot be mistaken for production', async () => {
  const hosting = JSON.parse(await readFile('.openai/hosting.contact-staging.json', 'utf8'));
  assert.equal(hosting.project_id, PRIVATE_CONTACT_SITES_PROJECT);
  assert.notEqual(hosting.project_id, PUBLIC_SITES_PROJECT);
});

test('each Sites guard reads its own committed hosting manifest', async () => {
  const publicResult = await execFileAsync(process.execPath, [
    'scripts/assert-sites-target.mjs',
    'public_web',
  ]);
  const privateResult = await execFileAsync(process.execPath, [
    'scripts/assert-sites-target.mjs',
    'contact_staging_ui',
  ]);

  assert.match(publicResult.stdout, /Sites target verified: public_web/);
  assert.match(privateResult.stdout, /Sites target verified: contact_staging_ui/);
});

test('deployment target guard rejects a Sites project from another surface', async () => {
  const { assertSitesTarget } = await import('../lib/surface-environments.mjs');
  const manifest = JSON.parse(await readFile('config/surface-environments.json', 'utf8'));

  assert.deepEqual(
    assertSitesTarget(manifest, { project_id: PUBLIC_SITES_PROJECT }, 'public_web'),
    {
      target: 'public_web',
      origin: 'https://agentfriendlyweb.dev',
      projectId: PUBLIC_SITES_PROJECT,
    },
  );
  assert.throws(
    () => assertSitesTarget(manifest, { project_id: PRIVATE_CONTACT_SITES_PROJECT }, 'public_web'),
    /sites_target_mismatch/,
  );
  assert.throws(
    () => assertSitesTarget(manifest, { project_id: PUBLIC_SITES_PROJECT }, 'contact_staging_api'),
    /sites_target_not_supported/,
  );
});
