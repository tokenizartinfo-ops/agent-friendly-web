import { spawn } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { assertSitesTarget } from '../lib/surface-environments.mjs';
import { loadSitesBuildTarget } from '../lib/sites-build-target.mjs';

const target = process.argv[2] || 'public_web';
const root = fileURLToPath(new URL('..', import.meta.url));
const selected = await loadSitesBuildTarget(root, target);
const npmCli = process.env.npm_execpath;
if (!npmCli) throw new Error('sites_build_requires_npm_execpath');

const exitCode = await new Promise((resolveExit, reject) => {
  const child = spawn(process.execPath, [npmCli, 'run', 'build'], {
    cwd: root,
    env: { ...process.env, AFW_SITES_TARGET: target },
    stdio: 'inherit',
  });
  child.once('error', reject);
  child.once('exit', (code, signal) => {
    if (signal) reject(new Error(`sites_build_terminated:${signal}`));
    else resolveExit(code ?? 1);
  });
});

if (exitCode !== 0) process.exit(exitCode);

const builtHosting = JSON.parse(await readFile(
  resolve(root, 'dist', '.openai', 'hosting.json'),
  'utf8',
));
assertSitesTarget({ surfaces: { [target]: {
  kind: 'sites_build',
  origin: selected.origin,
  projectId: selected.projectId,
} } }, builtHosting, target);
process.stdout.write(`Sites build verified: ${target} (${selected.projectId})\n`);
