export const MAX_PUBLIC_MCP_REQUEST_BYTES = 32 * 1024;

export class PublicMcpHttpError extends Error {
  constructor(status, code, message) {
    super(message);
    this.name = "PublicMcpHttpError";
    this.status = status;
    this.code = code;
  }
}

function requestError(status, code, message) {
  return new PublicMcpHttpError(status, code, message);
}

export async function prepareBoundedPublicMcpRequest(
  request,
  maxBytes = MAX_PUBLIC_MCP_REQUEST_BYTES,
) {
  const contentType = request.headers.get("content-type")?.split(";", 1)[0]?.trim().toLowerCase();
  if (contentType !== "application/json") {
    throw requestError(415, "unsupported_media_type", "El endpoint MCP requiere application/json.");
  }

  const contentLength = request.headers.get("content-length");
  if (contentLength !== null) {
    const declaredLength = Number(contentLength);
    if (Number.isFinite(declaredLength) && declaredLength > maxBytes) {
      throw requestError(413, "request_too_large", "La solicitud MCP excede 32 KiB.");
    }
  }

  const chunks = [];
  let totalBytes = 0;
  const reader = request.body?.getReader();
  if (reader) {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = value instanceof Uint8Array ? value : new Uint8Array(value);
      totalBytes += chunk.byteLength;
      if (totalBytes > maxBytes) {
        await reader.cancel().catch(() => undefined);
        throw requestError(413, "request_too_large", "La solicitud MCP excede 32 KiB.");
      }
      chunks.push(chunk);
    }
  }

  const body = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }

  const headers = new Headers(request.headers);
  headers.delete("content-length");
  return new Request(request.url, {
    method: "POST",
    headers,
    body,
  });
}

function sanitizeProtocolError(value) {
  if (Array.isArray(value)) return value.map(sanitizeProtocolError);
  if (!value || typeof value !== "object") return value;

  const sanitized = Object.fromEntries(
    Object.entries(value).map(([key, item]) => [key, sanitizeProtocolError(item)]),
  );
  const error = sanitized.error;
  if (
    error
    && typeof error === "object"
    && error.code === -32602
    && typeof error.message === "string"
    && (/^Tool .* not found$/s.test(error.message) || /^Resource not found:/s.test(error.message))
  ) {
    sanitized.error = {
      code: -32602,
      message: "Requested capability is not available.",
    };
  }
  return sanitized;
}

export async function sanitizePublicMcpResponse(response) {
  const contentType = response.headers.get("content-type")?.toLowerCase() ?? "";
  if (!contentType.includes("application/json")) return response;

  const clone = response.clone();
  let payload;
  try {
    payload = JSON.parse(await clone.text());
  } catch {
    return response;
  }

  const headers = new Headers(response.headers);
  headers.delete("content-length");
  headers.delete("etag");
  return Response.json(sanitizeProtocolError(payload), {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
