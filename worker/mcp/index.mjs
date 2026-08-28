import { getBuiltinProfile } from "../../registry/builtin/index.ts";
import { fetchLimitedPublicUrl } from "../../lib/public-network.mjs";
import {
  allowedHostnamesForRequest,
  createPublicMcpHttpHandler,
} from "../../lib/public-mcp-server.mjs";
import {
  prepareBoundedPublicMcpRequest,
  PublicMcpHttpError,
  sanitizePublicMcpResponse,
} from "../../lib/public-mcp-http.mjs";

const CANONICAL_ORIGIN = "https://agentfriendlyweb.dev";
const MAX_PROFILE_BYTES = 64 * 1024;

function jsonResponse(body, status = 200, cacheControl = "no-store") {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": cacheControl },
  });
}

function methodNotAllowed() {
  return new Response("Method Not Allowed", {
    status: 405,
    headers: { Allow: "POST", "Cache-Control": "no-store" },
  });
}

async function getPublicProfileForMcp(slug, version) {
  const builtin = getBuiltinProfile(slug, version);
  if (builtin) return builtin;

  const url = new URL(`/registry/${encodeURIComponent(slug)}/profile.json`, CANONICAL_ORIGIN);
  if (version !== undefined) url.searchParams.set("version", String(version));
  const response = await fetchLimitedPublicUrl(url, {
    accept: "application/json",
    maxBytes: MAX_PROFILE_BYTES,
    userAgent: "AgentFriendlyWebPublicMcp/0.1",
  });
  if (response.status === 404) return null;
  if (
    response.status !== 200
    || response.truncated
    || !response.contentType.toLowerCase().startsWith("application/json")
  ) {
    throw new Error("El perfil publico no esta disponible con el contrato esperado.");
  }
  try {
    return JSON.parse(response.body);
  } catch {
    throw new Error("El perfil publico no contiene JSON valido.");
  }
}

async function handleMcp(request) {
  const allowedHostnames = allowedHostnamesForRequest(request);
  if (!allowedHostnames) {
    return jsonResponse({ error: { code: "invalid_host", message: "Host no permitido." } }, 403);
  }
  if (request.method !== "POST") return methodNotAllowed();

  let boundedRequest;
  try {
    boundedRequest = await prepareBoundedPublicMcpRequest(request);
  } catch (error) {
    if (error instanceof PublicMcpHttpError) {
      return jsonResponse({ error: { code: error.code, message: error.message } }, error.status);
    }
    return jsonResponse({ error: { code: "invalid_request", message: "La solicitud MCP no es valida." } }, 400);
  }

  const handler = createPublicMcpHttpHandler(
    { getPublishedProfile: getPublicProfileForMcp },
    allowedHostnames,
  );
  return sanitizePublicMcpResponse(await handler.fetch(boundedRequest));
}

const worker = {
  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname !== "/mcp") {
      if (request.method === "GET" && (url.pathname === "/" || url.pathname === "/health")) {
        return jsonResponse({
          service: "agent-friendly-web-public-mcp",
          status: "release_candidate",
          endpoint: "/mcp",
          protocol: "2026-07-28",
          access: "public-read-only",
          writes: false,
        }, 200, "public, max-age=300");
      }
      return new Response("Not Found", { status: 404, headers: { "Cache-Control": "no-store" } });
    }
    return handleMcp(request);
  },
};

export default worker;
