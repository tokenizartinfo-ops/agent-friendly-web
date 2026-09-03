const MAX_SUBJECT_LENGTH = 200;

export async function hashAccessSubject(value) {
  if (typeof value !== 'string' || !value) {
    throw new Error('Access subject is required');
  }
  if (value.length > MAX_SUBJECT_LENGTH) {
    throw new Error('Access subject is invalid');
  }

  const bytes = new TextEncoder().encode(value);
  const digest = await globalThis.crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}
