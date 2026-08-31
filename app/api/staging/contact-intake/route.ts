import { env } from 'cloudflare:workers';
import { saveContactIntake } from '../../../../lib/contact-store';
// @ts-expect-error Shared ESM module is exercised directly by Node tests.
import { readBoundedJsonBody } from '../../../../lib/bounded-json-body.mjs';
// @ts-expect-error Shared ESM module is exercised directly by Node tests.
import { processContactRequest } from '../../../../lib/contact-gate.mjs';
// @ts-expect-error Shared ESM module is exercised directly by Node tests.
import { processStagingContactRequest } from '../../../../lib/contact-staging-handler.mjs';
// @ts-expect-error Shared ESM module is exercised directly by Node tests.
import { readContactStagingPolicy } from '../../../../lib/contact-staging-policy.mjs';
// @ts-expect-error Shared ESM module is exercised directly by Node tests.
import { verifyTurnstileToken } from '../../../../lib/turnstile.mjs';

type RateLimitBinding = {
  limit(input: { key: string }): Promise<{ success: boolean }>;
};

type ContactStagingBindings = {
  DB?: unknown;
  CONTACT_STAGING_MODE?: string;
  CONTACT_STAGING_WRITES_ENABLED?: string;
  CONTACT_STAGING_EXPECTED_HOST?: string;
  CONTACT_STAGING_ALLOWED_EMAILS?: string;
  CONTACT_STAGING_TURNSTILE_SECRET?: string;
  CONTACT_STAGING_RATE_LIMITER?: RateLimitBinding;
};

const noStore = { 'cache-control': 'no-store' };

export async function POST(request: Request) {
  const bindings = env as unknown as ContactStagingBindings;
  const policy = readContactStagingPolicy(bindings);
  const turnstileSecret = bindings.CONTACT_STAGING_TURNSTILE_SECRET || '';
  const rateLimiter = bindings.CONTACT_STAGING_RATE_LIMITER;
  const runtimeReady = Boolean(bindings.DB && turnstileSecret && rateLimiter?.limit);
  const remoteIp = request.headers.get('cf-connecting-ip') || '';

  const result = await processStagingContactRequest(request, {
    policy,
    identity: {
      userId: request.headers.get('oai-authenticated-user-id') || '',
      email: request.headers.get('oai-authenticated-user-email') || '',
    },
    runtimeReady,
    consumeRateLimit: async (key: string) => {
      if (!rateLimiter) return { allowed: false };
      const response = await rateLimiter.limit({ key });
      return { allowed: response.success === true };
    },
    readJson: (incoming: Request) => readBoundedJsonBody(incoming, { maxBytes: 8192 }),
    handleContact: (input: Record<string, unknown>) => processContactRequest(input, {
      enabled: true,
      verifyTurnstile: ({ token, idempotencyKey, action }: { token: string; idempotencyKey: string; action: string }) => verifyTurnstileToken({
        token,
        secret: turnstileSecret,
        remoteIp,
        idempotencyKey,
        action,
        hostname: policy.expectedHost,
      }),
      save: saveContactIntake,
    }),
  });

  return Response.json(result.body, { status: result.status, headers: noStore });
}

