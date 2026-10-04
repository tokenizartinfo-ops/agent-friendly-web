import { pathToFileURL } from 'node:url';
import { createOperationsClient } from '../lib/operations-client.mjs';

export async function runOperationsClient(args, env = process.env) {
  const client = createOperationsClient({ env });
  if (args.length === 1 && args[0] === 'list') return { incidents: await client.list() };
  if (args.length === 3 && args[0] === 'claim') return { reservation: await client.claim(args[1], args[2]) };
  if (args.length === 3 && args[0] === 'finish') return { outcome: await client.finish(args[1], args[2]) };
  throw new Error('Invalid operational command');
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try { process.stdout.write(JSON.stringify(await runOperationsClient(process.argv.slice(2))) + '\n'); }
  catch { process.stderr.write('Operational request unavailable\n'); process.exitCode = 1; }
}
