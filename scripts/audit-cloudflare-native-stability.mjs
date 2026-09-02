import { spawnSync } from 'node:child_process';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

import {
  PRODUCTION_D1_READ_SQL,
  parseWranglerD1Read,
  runCloudflareNativeStabilityAudit,
} from '../lib/cloudflare-native-stability.mjs';

const D1_ID = 'd26fc9d2-df5a-4957-8e58-cc4c945faad8';
const WRANGLER_TIMEOUT_MS = 30_000;
const WRANGLER_MAX_BUFFER = 2 * 1024 * 1024;

export function executeProductionD1Read({
  sql = PRODUCTION_D1_READ_SQL,
  cwd = process.cwd(),
  nodePath = process.execPath,
  spawnImpl = spawnSync,
} = {}) {
  const wrangler = join(cwd, 'node_modules', 'wrangler', 'bin', 'wrangler.js');
  if (sql !== PRODUCTION_D1_READ_SQL) {
    throw new Error('production D1 stability command must be the exact fixed SELECT');
  }
  const execution = spawnImpl(nodePath, [
    wrangler,
    'd1',
    'execute',
    D1_ID,
    '--remote',
    '--json',
    '--command',
    sql,
  ], {
    cwd,
    encoding: 'utf8',
    shell: false,
    windowsHide: true,
    timeout: WRANGLER_TIMEOUT_MS,
    maxBuffer: WRANGLER_MAX_BUFFER,
  });
  if (execution.error || execution.status !== 0) throw new Error('Wrangler production D1 read failed closed');
  return parseWranglerD1Read(execution.stdout);
}

async function main() {
  const report = await runCloudflareNativeStabilityAudit({
    d1Read: (sql) => executeProductionD1Read({ sql }),
  });
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  if (!report.ok) process.exitCode = 1;
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  await main();
}
