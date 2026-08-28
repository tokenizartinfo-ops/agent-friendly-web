import { getPublishedProfile } from '../../lib/registry-store';
// The MCP adapter is plain ESM so it can also be exercised by protocol tests.
// @ts-expect-error The JavaScript module intentionally has no separate declarations.
import { allowedHostnamesForRequest, createPublicMcpHttpHandler } from '../../lib/public-mcp-server.mjs';

const MAX_MCP_REQUEST_BYTES = 32 * 1024;

function jsonError(status: number, code: string, message: string) {
  return Response.json(
    { error: { code, message } },
    { status, headers: { 'Cache-Control': 'no-store' } },
  );
}

function methodNotAllowed() {
  return new Response('Method Not Allowed', {
    status: 405,
    headers: { Allow: 'POST', 'Cache-Control': 'no-store' },
  });
}

export async function POST(request: Request) {
  const allowedHostnames = allowedHostnamesForRequest(request);
  if (!allowedHostnames) return jsonError(403, 'invalid_host', 'Host no permitido.');

  const contentType = request.headers.get('content-type')?.split(';', 1)[0]?.trim().toLowerCase();
  if (contentType !== 'application/json') {
    return jsonError(415, 'unsupported_media_type', 'El endpoint MCP requiere application/json.');
  }

  const declaredLength = Number(request.headers.get('content-length'));
  if (Number.isFinite(declaredLength) && declaredLength > MAX_MCP_REQUEST_BYTES) {
    return jsonError(413, 'request_too_large', 'La solicitud MCP excede 32 KiB.');
  }

  const body = await request.arrayBuffer();
  if (body.byteLength > MAX_MCP_REQUEST_BYTES) {
    return jsonError(413, 'request_too_large', 'La solicitud MCP excede 32 KiB.');
  }

  const headers = new Headers(request.headers);
  headers.delete('content-length');
  const boundedRequest = new Request(request.url, {
    method: 'POST',
    headers,
    body,
  });
  const handler = createPublicMcpHttpHandler({ getPublishedProfile }, allowedHostnames);
  return handler.fetch(boundedRequest);
}

export const GET = methodNotAllowed;
export const HEAD = methodNotAllowed;
export const PUT = methodNotAllowed;
export const PATCH = methodNotAllowed;
export const DELETE = methodNotAllowed;
export const OPTIONS = methodNotAllowed;
