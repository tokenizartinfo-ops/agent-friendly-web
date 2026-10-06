/** Classify a copilot HTTP response without exposing private server details. */
export function classifyCopilotResponse(response) {
  const contentType = response.headers?.get('content-type')?.split(';')[0]?.trim().toLowerCase();
  if (response.status === 401 || response.status === 403) return 'session';
  if (response.status === 404) return 'project_unavailable';
  if (response.status === 429) return 'rate_limited';
  if (response.redirected && contentType !== 'application/json') return 'session';
  if (!response.ok || contentType !== 'application/json') return 'unavailable';
  return 'ok';
}

/** Only interpret the two public failure codes emitted by the private copilot. */
export async function readCopilotResponseKind(response) {
  const fallback = classifyCopilotResponse(response);
  if (![403, 409].includes(response.status)
    || response.headers?.get('content-type')?.split(';')[0]?.trim().toLowerCase() !== 'application/json') return fallback;
  try {
    const body = await response.json();
    if (response.status === 403 && body?.code === 'project_consent_required') return 'consent';
    if (response.status === 409 && body?.code === 'project_changed') return 'project_changed';
  } catch { /* Preserve the existing recovery for malformed proxy/provider responses. */ }
  return fallback;
}
