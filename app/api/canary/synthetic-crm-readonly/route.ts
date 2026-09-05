import { env } from 'cloudflare:workers';
// @ts-expect-error Shared ESM handler is exercised directly by Node tests.
import syntheticCrmReadonlyHandler from '../../../../lib/synthetic-crm-readonly.mjs';

export async function GET(request: Request) {
  return syntheticCrmReadonlyHandler(request, env);
}
