import { getBuiltinProfile } from '../../registry/builtin';
// The MCP adapter is plain ESM so it can also be exercised by protocol tests.
// @ts-expect-error The JavaScript module intentionally has no separate declarations.
import { allowedHostnamesForRequest, createPublicMcpHttpHandler } from '../../lib/public-mcp-server.mjs';
// @ts-expect-error The JavaScript module intentionally has no separate declarations.
import { prepareBoundedPublicMcpRequest, PublicMcpHttpError, sanitizePublicMcpResponse } from '../../lib/public-mcp-http.mjs';

async function getPublicProfileForMcp(slug: string, version?: number) {
  const builtin = getBuiltinProfile(slug, version);
  if (builtin) return builtin;

  const { getPublishedProfile } = await import('../../lib/registry-store');
  return getPublishedProfile(slug, version);
}

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

  let boundedRequest;
  try {
    boundedRequest = await prepareBoundedPublicMcpRequest(request);
  } catch (error) {
    if (error instanceof PublicMcpHttpError) {
      return jsonError(error.status, error.code, error.message);
    }
    return jsonError(400, 'invalid_request', 'La solicitud MCP no es valida.');
  }
  const handler = createPublicMcpHttpHandler({ getPublishedProfile: getPublicProfileForMcp }, allowedHostnames);
  return sanitizePublicMcpResponse(await handler.fetch(boundedRequest));
}

export const GET = methodNotAllowed;
export const HEAD = methodNotAllowed;
export const PUT = methodNotAllowed;
export const PATCH = methodNotAllowed;
export const DELETE = methodNotAllowed;
export const OPTIONS = methodNotAllowed;
