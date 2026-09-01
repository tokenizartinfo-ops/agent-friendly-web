import { readFile } from 'node:fs/promises';
import {
  assertSitesTarget,
  getSitesHostingConfigPath,
} from '../lib/surface-environments.mjs';

const target = process.argv[2] || 'public_web';

try {
  const manifest = JSON.parse(await readFile(
    new URL('../config/surface-environments.json', import.meta.url),
    'utf8',
  ));
  const hostingConfig = getSitesHostingConfigPath(manifest, target);
  const hosting = JSON.parse(await readFile(new URL(`../${hostingConfig}`, import.meta.url), 'utf8'));
  const result = assertSitesTarget(manifest, hosting, target);
  process.stdout.write(`Sites target verified: ${result.target} (${result.origin}) via ${hostingConfig}\n`);
} catch (error) {
  process.stderr.write(`${error instanceof Error ? error.message : 'sites_target_invalid'}\n`);
  process.exitCode = 1;
}
