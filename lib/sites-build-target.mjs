import { copyFile, mkdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

import {
  assertSitesTarget,
  getSitesHostingConfigPath,
} from './surface-environments.mjs';

export async function loadSitesBuildTarget(root, requestedTarget = '') {
  const target = requestedTarget || 'public_web';
  const manifest = JSON.parse(await readFile(
    join(root, 'config', 'surface-environments.json'),
    'utf8',
  ));
  const hostingConfig = getSitesHostingConfigPath(manifest, target);
  const hostingConfigPath = join(root, ...hostingConfig.split('/'));
  const hosting = JSON.parse(await readFile(hostingConfigPath, 'utf8'));
  const verified = assertSitesTarget(manifest, hosting, target);
  return {
    ...verified,
    hosting,
    hostingConfig,
    hostingConfigPath,
  };
}

export function createSitesTargetOutputPlugin(root, selected) {
  return {
    name: 'agent-friendly-web-sites-target',
    enforce: 'post',
    async closeBundle() {
      const outputDirectory = join(root, 'dist', '.openai');
      await mkdir(outputDirectory, { recursive: true });
      await copyFile(selected.hostingConfigPath, join(outputDirectory, 'hosting.json'));
    },
  };
}
