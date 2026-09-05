import { env } from 'cloudflare:workers';
// @ts-expect-error Shared ESM handler is exercised directly by Node tests.
import emailReviewReadyHandler from '../../../../../lib/email-review-ready-gate.mjs';

export async function POST(request: Request) {
  return emailReviewReadyHandler(request, env);
}
