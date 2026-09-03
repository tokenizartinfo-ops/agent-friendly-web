import { env } from 'cloudflare:workers';
// @ts-expect-error Shared ESM handler is exercised directly by Node tests.
import syntheticContactCanaryHandler from '../../../../lib/synthetic-contact-canary.mjs';

export async function POST(request: Request) {
  return syntheticContactCanaryHandler(request, env);
}
