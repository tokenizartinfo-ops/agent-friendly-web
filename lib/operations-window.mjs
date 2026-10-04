/** Server-owned admission deadline. Missing/invalid values always keep the pilot closed. */
export function operationsWindowOpen(env, now = Date.now()) {
  const value = env?.AFW_OPERATIONS_WINDOW_EXPIRES_AT;
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value) || !Number.isSafeInteger(now)) return false;
  const expiry = Date.parse(value);
  return Number.isFinite(expiry) && new Date(expiry).toISOString() === value && now < expiry;
}
