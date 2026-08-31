const DEFAULT_MAX_BYTES = 8192;

function failure(status, code) {
  return { ok: false, status, code };
}

export async function readBoundedJsonBody(request, options = {}) {
  const maxBytes = Number.isSafeInteger(options.maxBytes) && options.maxBytes > 0
    ? options.maxBytes
    : DEFAULT_MAX_BYTES;
  const mediaType = String(request?.headers?.get?.('content-type') || '').split(';', 1)[0].trim().toLowerCase();
  if (mediaType !== 'application/json') return failure(415, 'unsupported_media_type');

  const declaredLength = Number(request.headers.get('content-length'));
  if (Number.isFinite(declaredLength) && declaredLength > maxBytes) {
    return failure(413, 'request_body_too_large');
  }

  const body = request.body;
  if (!body || typeof body.getReader !== 'function') return failure(400, 'invalid_json');

  const reader = body.getReader();
  const chunks = [];
  let total = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > maxBytes) {
        await reader.cancel('request_body_too_large');
        return failure(413, 'request_body_too_large');
      }
      chunks.push(value);
    }
  } catch {
    return failure(400, 'invalid_json');
  }

  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  try {
    const value = JSON.parse(new TextDecoder().decode(bytes));
    if (!value || typeof value !== 'object' || Array.isArray(value)) return failure(400, 'invalid_json');
    return { ok: true, value };
  } catch {
    return failure(400, 'invalid_json');
  }
}

