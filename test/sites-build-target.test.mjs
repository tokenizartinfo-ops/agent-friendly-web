import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';

import {
  createSitesTargetOutputPlugin,
  loadSitesBuildTarget,
} from '../lib/sites-build-target.mjs';

async function fixture() {
  const root = await mkdtemp(join(tmpdir(), 'afw-sites-target-'));
  await mkdir(join(root, '.openai'), { recursive: true });
  await mkdir(join(root, 'config'), { recursive: true });
  const manifest = {
    version: 1,
    surfaces: {
      public_web: {
        kind: 'sites_public',
        origin: 'https://public.example',
        projectId: 'public-project',
        hostingConfig: '.openai/hosting.json',
      },
      contact_staging_ui: {
        kind: 'sites_private',
        origin: 'https://private.example',
        projectId: 'private-project',
        hostingConfig: '.openai/hosting.contact-staging.json',
      },
    },
  };
  await writeFile(join(root, 'config', 'surface-environments.json'), JSON.stringify(manifest));
  await writeFile(join(root, '.openai', 'hosting.json'), JSON.stringify({ project_id: 'public-project', d1: 'DB', r2: null }));
  await writeFile(join(root, '.openai', 'hosting.contact-staging.json'), JSON.stringify({ project_id: 'private-project', d1: 'DB', r2: null }));
  return root;
}

test('Sites build target defaults to public and rejects unknown targets', async () => {
  const root = await fixture();
  const selected = await loadSitesBuildTarget(root);
  assert.equal(selected.target, 'public_web');
  assert.equal(selected.projectId, 'public-project');
  await assert.rejects(
    () => loadSitesBuildTarget(root, 'contact_staging_api'),
    /sites_target_not_supported/,
  );
});

test('private Sites build writes only its manifest to dist and preserves public source config', async () => {
  const root = await fixture();
  const selected = await loadSitesBuildTarget(root, 'contact_staging_ui');
  const plugin = createSitesTargetOutputPlugin(root, selected);

  await plugin.closeBundle();

  const built = JSON.parse(await readFile(join(root, 'dist', '.openai', 'hosting.json'), 'utf8'));
  const publicSource = JSON.parse(await readFile(join(root, '.openai', 'hosting.json'), 'utf8'));
  assert.equal(built.project_id, 'private-project');
  assert.equal(publicSource.project_id, 'public-project');
});
