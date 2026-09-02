import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

import {
  PRODUCTION_D1_READ_SQL,
  parseProductionWorkerConfig,
  parseWranglerDeployments,
  parseWranglerD1Read,
  parseWranglerVersion,
  runCloudflareNativeStabilityAudit,
} from '../lib/cloudflare-native-stability.mjs';

const WRANGLER_TIMEOUT_MS = 30_000;
const WRANGLER_MAX_BUFFER = 2 * 1024 * 1024;

function runWranglerJson({ cwd, nodePath, spawnImpl, args }) {
  const wrangler = join(cwd, 'node_modules', 'wrangler', 'bin', 'wrangler.js');
  const execution = spawnImpl(nodePath, [wrangler, ...args], {
    cwd,
    encoding: 'utf8',
    shell: false,
    windowsHide: true,
    timeout: WRANGLER_TIMEOUT_MS,
    maxBuffer: WRANGLER_MAX_BUFFER,
  });
  if (execution.error || execution.status !== 0) throw new Error('Wrangler production read failed closed');
  return execution.stdout;
}

function readProductionConfig({ cwd, readFileImpl }) {
  return parseProductionWorkerConfig(readFileImpl(join(cwd, 'wrangler.jsonc'), 'utf8'));
}

export function readProductionInfrastructure({
  cwd = process.cwd(),
  nodePath = process.execPath,
  observedAt = new Date().toISOString(),
  readFileImpl = readFileSync,
  spawnImpl = spawnSync,
} = {}) {
  const localConfig = readProductionConfig({ cwd, readFileImpl });
  const deployment = parseWranglerDeployments(runWranglerJson({
    cwd,
    nodePath,
    spawnImpl,
    args: ['deployments', 'list', '--name', localConfig.worker, '--json'],
  }));
  const version = parseWranglerVersion(runWranglerJson({
    cwd,
    nodePath,
    spawnImpl,
    args: ['versions', 'view', deployment.version_id, '--name', localConfig.worker, '--json'],
  }));
  if (version.version_id !== deployment.version_id) throw new Error('Wrangler deployment and version evidence must match');

  let controlPlane;
  try {
    controlPlane = JSON.parse(readFileImpl(join(cwd, 'docs', 'evidence', 'cloudflare-native-control-plane-observation.json'), 'utf8'));
  } catch {
    throw new Error('sanitized control-plane observation must be valid JSON');
  }
  if (controlPlane?.contract_version !== 'agentfriendly.control-plane-observation.v1') {
    throw new Error('sanitized control-plane observation has an unsupported contract');
  }

  return {
    observed_at: observedAt,
    control_plane_observed_at: controlPlane.observed_at,
    local_config: localConfig,
    remote_worker: {
      worker: localConfig.worker,
      ...deployment,
      ...version,
    },
    cloudflare_custom_domain: controlPlane.cloudflare_custom_domain,
    legacy_sites: controlPlane.legacy_sites,
  };
}

export function executeProductionD1Read({
  sql = PRODUCTION_D1_READ_SQL,
  cwd = process.cwd(),
  nodePath = process.execPath,
  readFileImpl = readFileSync,
  spawnImpl = spawnSync,
} = {}) {
  if (sql !== PRODUCTION_D1_READ_SQL) {
    throw new Error('production D1 stability command must be the exact fixed SELECT');
  }
  const config = readProductionConfig({ cwd, readFileImpl });
  const stdout = runWranglerJson({
    cwd,
    nodePath,
    spawnImpl,
    args: [
      'd1',
      'execute',
      config.d1_database_id,
      '--remote',
      '--json',
      '--command',
      sql,
    ],
  });
  return {
    ...parseWranglerD1Read(stdout),
    database_id: config.d1_database_id,
  };
}

async function main() {
  const observedAt = new Date().toISOString();
  const infrastructure = readProductionInfrastructure({ observedAt });
  const report = await runCloudflareNativeStabilityAudit({
    observedAt,
    infrastructureRead: async () => infrastructure,
    d1Read: (sql) => executeProductionD1Read({ sql }),
  });
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  if (!report.ok) process.exitCode = 1;
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  await main();
}
