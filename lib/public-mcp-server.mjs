import { McpServer } from "@modelcontextprotocol/server";
import { createMcpHandler } from "agents/mcp/server";
import { z } from "zod";

import {
  MCP_RESOURCE_URIS,
  PUBLIC_MCP_SERVER_VERSION,
  PublicMcpError,
  createMcpResult,
  executePublicMcpTool,
  readPublicMcpResource,
} from "./public-mcp.mjs";

const SERVER_NAME = "agent-friendly-web-public";
const CANONICAL_HOSTNAMES = Object.freeze([
  "agentfriendlyweb.dev",
  "www.agentfriendlyweb.dev",
  "localhost",
  "127.0.0.1",
  "[::1]",
]);
const PREVIEW_HOST_SUFFIXES = Object.freeze([".chatgpt.site", ".workers.dev"]);

const READ_ONLY_ANNOTATIONS = Object.freeze({
  readOnlyHint: true,
  destructiveHint: false,
  idempotentHint: true,
  openWorldHint: false,
});

const auditSchema = z.object({
  url: z.string().min(1).max(2_000),
});
const methodologySchema = z.object({
  section: z.enum(["overview", "levels", "categories", "limits", "roadmap"]).optional(),
});
const registrySchema = z.object({
  slug: z.string().min(1).max(64),
  version: z.number().int().min(1).max(999_999).optional(),
});
const okfSchema = z.object({
  release: z.literal("v0.2").optional(),
});

function textResult(envelope, summary) {
  return {
    content: [{ type: "text", text: summary }],
    structuredContent: envelope,
  };
}

function errorResult(tool, error, dependencies) {
  const publicError = error instanceof PublicMcpError
    ? error
    : new PublicMcpError("internal_error", "No se pudo completar la consulta publica.");
  const generatedAt = (dependencies.now ?? (() => new Date().toISOString()))();
  const envelope = createMcpResult(
    tool,
    {},
    { error: { code: publicError.code, message: publicError.message } },
    {
      status: "error",
      generatedAt,
      limits: ["El error no incluye argumentos, credenciales ni datos privados."],
    },
  );
  return {
    isError: true,
    content: [{ type: "text", text: `${publicError.code}: ${publicError.message}` }],
    structuredContent: envelope,
  };
}

function registerTool(server, name, config, dependencies, summarize) {
  server.registerTool(
    name,
    {
      ...config,
      annotations: READ_ONLY_ANNOTATIONS,
    },
    async (args) => {
      try {
        const envelope = await executePublicMcpTool(name, args, dependencies);
        return textResult(envelope, summarize(envelope));
      } catch (error) {
        return errorResult(name, error, dependencies);
      }
    },
  );
}

export function createPublicMcpServer(dependencies = {}) {
  const server = new McpServer({
    name: SERVER_NAME,
    version: PUBLIC_MCP_SERVER_VERSION,
  });

  registerTool(
    server,
    "audit_public_site",
    {
      title: "Auditar sitio publico",
      description: "Observa senales agent-friendly publicas con proteccion SSRF, sin persistir ni modificar el sitio.",
      inputSchema: auditSchema,
    },
    dependencies,
    (envelope) => `Auditoria publica completada para ${envelope.result.report.target}.`,
  );
  registerTool(
    server,
    "get_afw_methodology",
    {
      title: "Consultar metodologia AFW",
      description: "Devuelve una seccion publica y versionada de la metodologia AF-0 a AF-5.",
      inputSchema: methodologySchema,
    },
    dependencies,
    (envelope) => `Metodologia publica: ${envelope.result.methodology}.`,
  );
  registerTool(
    server,
    "get_public_registry_profile",
    {
      title: "Consultar perfil publico del Registry",
      description: "Lee exclusivamente un perfil ya publicado; nunca accede a expedientes o borradores privados.",
      inputSchema: registrySchema,
    },
    dependencies,
    (envelope) => `Perfil publico encontrado: ${envelope.result.profile.organization}.`,
  );
  registerTool(
    server,
    "verify_public_okf_release",
    {
      title: "Verificar release OKF publica",
      description: "Verifica en memoria la release OKF v0.2 allowlisted, sin escribir archivos ni consultar otro origen.",
      inputSchema: okfSchema,
    },
    dependencies,
    (envelope) => `Release OKF publica verificada: ${envelope.result.verification.valid ? "valida" : "con observaciones"}.`,
  );

  for (const uri of MCP_RESOURCE_URIS) {
    const resourceName = uri.replace("afw://", "").replaceAll("/", "-").replaceAll(".", "-");
    server.registerResource(
      resourceName,
      uri,
      {
        title: `Recurso publico ${uri}`,
        description: "Conocimiento publico, versionado y solo lectura de Agent Friendly Web.",
        mimeType: "application/json",
      },
      async (requestedUri) => {
        const resource = await readPublicMcpResource(requestedUri.href, dependencies);
        return {
          contents: [{
            uri: requestedUri.href,
            mimeType: "application/json",
            text: JSON.stringify(resource),
          }],
        };
      },
    );
  }

  return server;
}

export function allowedHostnamesForRequest(request) {
  let hostname;
  try {
    hostname = new URL(request.url).hostname.toLowerCase();
  } catch {
    return null;
  }
  if (
    CANONICAL_HOSTNAMES.includes(hostname)
    || PREVIEW_HOST_SUFFIXES.some((suffix) => hostname.endsWith(suffix))
  ) {
    return [hostname];
  }
  return null;
}

export function createPublicMcpHttpHandler(dependencies = {}, allowedHostnames = CANONICAL_HOSTNAMES) {
  return createMcpHandler(
    () => createPublicMcpServer(dependencies),
    {
      route: "/mcp",
      corsOptions: false,
      allowedHostnames,
      allowedOriginHostnames: allowedHostnames,
      legacy: "stateless",
      responseMode: "json",
    },
  );
}
