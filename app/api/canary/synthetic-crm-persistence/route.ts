import { env } from 'cloudflare:workers';
// @ts-expect-error Shared ESM handler is exercised directly by Node tests.
import syntheticCrmPersistenceHandler from '../../../../lib/synthetic-crm-persistence.mjs';

export async function POST(request: Request) {
  return syntheticCrmPersistenceHandler(request, env);
}
