import { env } from 'cloudflare:workers';
// @ts-expect-error Shared ESM handler is exercised directly by Node tests.
import syntheticPrivacyLifecycleHandler from '../../../../lib/synthetic-privacy-lifecycle.mjs';

export async function POST(request: Request) {
  return syntheticPrivacyLifecycleHandler(request, env);
}
