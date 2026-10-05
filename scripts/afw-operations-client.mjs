import { pathToFileURL } from 'node:url';
import { createOperationsClient } from '../lib/operations-client.mjs';
import {runNoticeCycle} from '../lib/operations-notice-cycle.mjs';

export async function runOperationsClient(args, env = process.env) {
  const client = createOperationsClient({ env });
  if(args.length===1&&args[0]==='notice-cycle')return runNoticeCycle(client);
  if(args.length===1&&args[0]==='notice-receipts')return {receipts:await client.listNoticeReceipts()};
  if(args.length===1&&args[0]==='notice-list')return {notices:await client.listNotices()};
  if(args.length===4&&args[0]==='notice-claim'&&['afw_delegated_canary','afw_delegated_real_pilot'].includes(args[1])&&/^[1-9][0-9]*$/.test(args[2])&&Number.isSafeInteger(Number(args[2]))&&/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(args[3]))return {reservation:await client.claimNotice(args[1],Number(args[2]),args[3])};
  if(args.length===2&&args[0]==='notice-ack'&&/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(args[1]))return {outcome:await client.ackNotice(args[1])};
  if (args.length === 1 && args[0] === 'list') return { incidents: await client.list() };
  if (args.length === 3 && args[0] === 'claim') return { reservation: await client.claim(args[1], args[2]) };
  if (args.length === 3 && args[0] === 'finish') return { outcome: await client.finish(args[1], args[2]) };
  throw new Error('Invalid operational command');
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try { process.stdout.write(JSON.stringify(await runOperationsClient(process.argv.slice(2))) + '\n'); }
  catch { process.stderr.write('Operational request unavailable\n'); process.exitCode = 1; }
}
