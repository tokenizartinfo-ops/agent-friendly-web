const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

async function sha256(value) {
  const bytes = new TextEncoder().encode(value);
  const digest = await globalThis.crypto.subtle.digest('SHA-256', bytes);
  return Array.from(
    new Uint8Array(digest),
    (byte) => byte.toString(16).padStart(2, '0'),
  ).join('');
}

export async function deriveContactIntakeIdempotencyKeys(value) {
  if (typeof value !== 'string' || !UUID.test(value)) return null;
  const intakeKey = value.toLowerCase();
  const digest = await sha256(intakeKey);
  return Object.freeze({
    intakeKey,
    tombstoneKey: `erased-${digest.slice(0, 29)}`,
  });
}
