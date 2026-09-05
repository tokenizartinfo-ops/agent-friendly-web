import { env } from 'cloudflare:workers';
// @ts-expect-error Shared ESM handler is exercised directly by Node tests.
import syntheticCommercialReviewHandler from '../../../../lib/synthetic-commercial-review.mjs';

export async function GET(request: Request) {
  return syntheticCommercialReviewHandler(request, env);
}
