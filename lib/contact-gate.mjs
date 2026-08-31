import { validateContactIntake } from './contact-intake.mjs';

export async function processContactRequest(input, dependencies) {
  if (dependencies?.enabled !== true) {
    return { status: 503, body: { accepted: false, code: 'contact_capture_disabled' } };
  }

  const validation = validateContactIntake(input);
  if (!validation.ok) {
    return { status: 400, body: { accepted: false, code: 'invalid_contact_intake', errors: validation.errors } };
  }

  const turnstile = await dependencies.verifyTurnstile({
    token: input.turnstileToken,
    idempotencyKey: validation.value.idempotencyKey,
    action: 'request_plan',
  });
  if (!turnstile?.success) {
    return { status: 400, body: { accepted: false, code: 'turnstile_failed' } };
  }

  const saved = await dependencies.save(validation.value);
  if (saved.conflict) {
    return { status: 409, body: { accepted: false, code: 'idempotency_conflict' } };
  }
  return {
    status: saved.duplicate ? 200 : 201,
    body: {
      accepted: true,
      leadId: saved.leadId,
      duplicate: saved.duplicate,
      emailQueued: false,
    },
  };
}
