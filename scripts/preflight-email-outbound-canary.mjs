import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

import { buildEmailOutboundCanaryPlan } from '../lib/email-outbound-canary.mjs';

function parseInputPath(args) {
  if (args.length !== 2 || args[0] !== '--input' || !args[1]) return '';
  return args[1];
}

export async function runEmailOutboundCanaryPreflight(inputPath) {
  if (!inputPath) return { ok: false, code: 'invalid_arguments' };
  try {
    const input = JSON.parse(await readFile(inputPath, 'utf8'));
    return buildEmailOutboundCanaryPlan(input);
  } catch {
    return { ok: false, code: 'invalid_input_file' };
  }
}

async function main() {
  const result = await runEmailOutboundCanaryPreflight(parseInputPath(process.argv.slice(2)));
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  if (!result.ok) process.exitCode = 1;
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  await main();
}
