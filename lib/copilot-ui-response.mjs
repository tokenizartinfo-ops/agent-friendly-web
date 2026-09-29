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
