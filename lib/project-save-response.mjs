export async function readProjectSaveResponse(response) {
  if (response.status === 401 || response.type === 'opaqueredirect' ||
      (response.status >= 300 && response.status < 400)) return { sessionRequired: true };
  if (!response.headers?.get('content-type')?.toLowerCase().includes('application/json')) {
    throw new Error('invalid_save_response');
  }
  let payload;
  try { payload = await response.json(); } catch { throw new Error('invalid_save_response'); }
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) throw new Error('invalid_save_response');
  return { sessionRequired: false, payload };
}
