import { verifyRemoteOkf } from "./cli-okf.mjs";
import { methodologyCategories, normalizePublicUrl } from "./methodology.mjs";
import { runPublicAudit, sanitizeObservation } from "./public-audit.mjs";
import { buildPublicProfile, PUBLIC_PROFILE_CONTRACT } from "./public-profile.mjs";

export const PUBLIC_MCP_RESULT_CONTRACT = "agent-friendly-web.mcp-result.v1";
export const PUBLIC_MCP_RESOURCE_CONTRACT = "agent-friendly-web.mcp-resource.v1";
export const PUBLIC_MCP_SERVER_VERSION = "0.1.0";

export const MCP_TOOL_NAMES = Object.freeze([
  "audit_public_site",
  "get_afw_methodology",
  "get_public_registry_profile",
  "verify_public_okf_release",
]);

export const MCP_RESOURCE_URIS = Object.freeze([
  "afw://capabilities/v1",
  "afw://methodology/v1",
  "afw://okf/v0.2",
  "afw://readiness/v1",
]);

const CANONICAL_ORIGIN = "https://agentfriendlyweb.dev";
const APPROVED_OKF_RELEASE = "v0.2";
const METHODOLOGY_NAME = "Gabriel Mucchiut Agent Friendly Web Method v1";
const METHODOLOGY_SECTIONS = new Set(["overview", "levels", "categories", "limits", "roadmap"]);
const BLOCKED_ACTIONS = Object.freeze([
  "credentials",
  "private-expedients",
  "registry-write",
  "publish",
  "deploy",
  "dns",
  "billing",
  "payments",
  "owner-data",
  "website-mutation",
]);

const LEVELS = Object.freeze([
  Object.freeze({ id: "AF-0", label: "invisible", score_min: 0, score_max: 17 }),
  Object.freeze({ id: "AF-1", label: "descubrible", score_min: 18, score_max: 35 }),
  Object.freeze({ id: "AF-2", label: "legible", score_min: 36, score_max: 53 }),
  Object.freeze({ id: "AF-3", label: "herramientas", score_min: 54, score_max: 71 }),
  Object.freeze({ id: "AF-4", label: "delegable", score_min: 72, score_max: 89 }),
  Object.freeze({ id: "AF-5", label: "transaccional", score_min: 90, score_max: 100 }),
]);

const SOURCES = Object.freeze({
  methodology: Object.freeze({
    title: "Metodologia Agent Friendly Web",
    url: `${CANONICAL_ORIGIN}/metodologia`,
  }),
  audit: Object.freeze({
    title: "Auditoria publica Agent Friendly Web",
    url: `${CANONICAL_ORIGIN}/#auditar`,
  }),
  registry: Object.freeze({
    title: "Registry publico Agent Friendly Web",
    url: `${CANONICAL_ORIGIN}/registry`,
  }),
  okf: Object.freeze({
    title: "Release OKF publica v0.2",
    url: `${CANONICAL_ORIGIN}/okf/v0.2/index.md`,
  }),
  readiness: Object.freeze({
    title: "Capability readiness manifest",
    url: `${CANONICAL_ORIGIN}/.well-known/agent-readiness.json`,
  }),
});

export class PublicMcpError extends Error {
  constructor(code, message, details = undefined) {
    super(message);
    this.name = "PublicMcpError";
    this.code = code;
    this.details = details;
  }
}

function generatedAt(dependencies) {
  return (dependencies.now ?? (() => new Date().toISOString()))();
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function inputObject(value) {
  return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}

function text(value, max) {
  return String(value ?? "").replace(/[\u0000-\u001f]/g, " ").trim().slice(0, max);
}

function methodologyResult(section) {
  const categories = Object.entries(methodologyCategories).map(([id, definition]) => ({
    id,
    label: definition.label,
    weight: definition.weight,
    checks: Object.entries(definition.checks).map(([check, points]) => ({ check, points })),
  }));
  const overview = {
    methodology: METHODOLOGY_NAME,
    owner: "Gabriel Mucchiut",
    scale: "AF-0 to AF-5",
    normative_status: "Metodologia propia transparente; no es una certificacion oficial ni un estandar de industria.",
  };

  if (section === "levels") return { ...overview, levels: clone(LEVELS) };
  if (section === "categories") return { ...overview, categories };
  if (section === "limits") {
    return {
      ...overview,
      limits: [
        "La evidencia observada no prueba indexacion ni recomendacion por un proveedor de modelos.",
        "Los estados planificado, research o release_candidate no cuentan como capacidad desplegada.",
        "Una auditoria publica no acredita datos privados ni ejecucion sobre el sitio.",
      ],
    };
  }
  if (section === "roadmap") {
    return {
      ...overview,
      roadmap: [
        "Descubrimiento y politica de crawlers",
        "Contenido estructurado y citable",
        "Recursos legibles por maquinas",
        "Tools read-only con contratos verificables",
        "Delegacion autenticada y auditable",
        "Acciones agent-native con gobernanza y limites",
      ],
    };
  }
  return { ...overview, levels: clone(LEVELS), categories };
}

export function createMcpResult(tool, input, result, options = {}) {
  return {
    contract: PUBLIC_MCP_RESULT_CONTRACT,
    server_version: PUBLIC_MCP_SERVER_VERSION,
    tool,
    status: options.status ?? "ok",
    generated_at: options.generatedAt ?? new Date().toISOString(),
    input: clone(input),
    result: clone(result),
    sources: clone(options.sources ?? []),
    limits: clone(options.limits ?? []),
    blocked_actions: clone(BLOCKED_ACTIONS),
  };
}

function normalizedSlug(value) {
  const slug = text(value, 64).toLowerCase();
  if (!/^[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?$/.test(slug)) {
    throw new PublicMcpError("invalid_slug", "El slug publico no es valido.");
  }
  return slug;
}

function normalizedVersion(value) {
  if (value === undefined) return undefined;
  if (!Number.isInteger(value) || value < 1 || value > 999_999) {
    throw new PublicMcpError("invalid_version", "La version debe ser un entero positivo.");
  }
  return value;
}

async function executeAudit(args, dependencies) {
  const url = text(args.url, 2_000);
  try {
    normalizePublicUrl(url);
  } catch (error) {
    throw new PublicMcpError(
      "invalid_target",
      error instanceof Error ? error.message : "La URL publica no es valida.",
    );
  }

  let report;
  try {
    report = sanitizeObservation(await (dependencies.runPublicAudit ?? runPublicAudit)(url));
  } catch (error) {
    if (error instanceof PublicMcpError) throw error;
    throw new PublicMcpError(
      "audit_failed",
      error instanceof Error ? error.message : "No se pudo completar la auditoria publica.",
    );
  }

  return createMcpResult(
    "audit_public_site",
    { url },
    { report },
    {
      generatedAt: generatedAt(dependencies),
      sources: [SOURCES.audit, SOURCES.methodology],
      limits: [
        ...(Array.isArray(report?.limits) ? report.limits.slice(0, 12) : []),
        "La auditoria observa recursos publicos y no persiste la observacion.",
      ],
    },
  );
}

async function executeMethodology(args, dependencies) {
  const section = text(args.section || "overview", 24).toLowerCase();
  if (!METHODOLOGY_SECTIONS.has(section)) {
    throw new PublicMcpError("invalid_section", "La seccion de metodologia no esta permitida.");
  }
  return createMcpResult(
    "get_afw_methodology",
    { section },
    methodologyResult(section),
    {
      generatedAt: generatedAt(dependencies),
      sources: [SOURCES.methodology, SOURCES.readiness],
      limits: ["La escala AF-0 a AF-5 es una metodologia propia, no una certificacion oficial."],
    },
  );
}

async function executeRegistry(args, dependencies) {
  const slug = normalizedSlug(args.slug);
  const version = normalizedVersion(args.version);
  if (typeof dependencies.getPublishedProfile !== "function") {
    throw new PublicMcpError("registry_unavailable", "El adaptador del Registry publico no esta disponible.");
  }
  const profile = await dependencies.getPublishedProfile(slug, version);
  if (!profile) throw new PublicMcpError("profile_not_found", "El perfil publico solicitado no existe.");
  if (profile.contract !== PUBLIC_PROFILE_CONTRACT) {
    throw new PublicMcpError("invalid_profile_contract", "El perfil publico no cumple el contrato vigente.");
  }
  let publicProfile;
  try {
    publicProfile = buildPublicProfile(profile);
  } catch {
    throw new PublicMcpError("invalid_profile_contract", "El perfil publico no cumple el contrato vigente.");
  }
  if (publicProfile.slug !== slug || (version !== undefined && publicProfile.version !== version)) {
    throw new PublicMcpError("invalid_profile_contract", "El perfil publico no coincide con la consulta solicitada.");
  }
  return createMcpResult(
    "get_public_registry_profile",
    version === undefined ? { slug } : { slug, version },
    { profile: publicProfile },
    {
      generatedAt: generatedAt(dependencies),
      sources: [
        SOURCES.registry,
        { title: `Perfil publico ${slug}`, url: `${CANONICAL_ORIGIN}/registry/${slug}/profile.json${version ? `?version=${version}` : ""}` },
      ],
      limits: ["Solo se devuelven perfiles ya publicados; no se consultan expedientes, borradores ni observaciones privadas."],
    },
  );
}

async function executeOkf(args, dependencies) {
  const release = text(args.release || APPROVED_OKF_RELEASE, 16);
  if (release !== APPROVED_OKF_RELEASE) {
    throw new PublicMcpError("unsupported_release", "La release OKF solicitada no esta allowlisted.");
  }
  try {
    const verification = await (dependencies.verifyRemoteOkf ?? verifyRemoteOkf)(
      { origin: CANONICAL_ORIGIN, release, dryRun: false },
      dependencies,
    );
    return createMcpResult(
      "verify_public_okf_release",
      { release },
      { verification },
      {
        generatedAt: generatedAt(dependencies),
        sources: [SOURCES.okf],
        limits: [
          "La verificacion ocurre en memoria y no crea archivos.",
          "La integridad del bundle no certifica la exactitud sustantiva de cada afirmacion.",
        ],
      },
    );
  } catch (error) {
    if (error instanceof PublicMcpError) throw error;
    throw new PublicMcpError(
      "okf_verification_failed",
      error instanceof Error ? error.message : "No se pudo verificar la release OKF publica.",
    );
  }
}

export async function executePublicMcpTool(name, value, dependencies = {}) {
  const args = inputObject(value);
  switch (name) {
    case "audit_public_site":
      return executeAudit(args, dependencies);
    case "get_afw_methodology":
      return executeMethodology(args, dependencies);
    case "get_public_registry_profile":
      return executeRegistry(args, dependencies);
    case "verify_public_okf_release":
      return executeOkf(args, dependencies);
    default:
      throw new PublicMcpError("unsupported_tool", "La tool MCP solicitada no esta disponible.");
  }
}

function resourceData(uri) {
  switch (uri) {
    case "afw://capabilities/v1":
      return {
        access: "public-read-only",
        endpoint: `${CANONICAL_ORIGIN}/mcp`,
        protocol_preferred: "2026-07-28",
        tools: clone(MCP_TOOL_NAMES),
        resources: clone(MCP_RESOURCE_URIS),
        authentication: "none-public-data-only",
        blocked_actions: clone(BLOCKED_ACTIONS),
      };
    case "afw://methodology/v1":
      return methodologyResult("overview");
    case "afw://okf/v0.2":
      return {
        release: APPROVED_OKF_RELEASE,
        index: `${CANONICAL_ORIGIN}/okf/v0.2/index.md`,
        manifest: `${CANONICAL_ORIGIN}/okf/v0.2/manifest.json`,
        checksums: `${CANONICAL_ORIGIN}/okf/v0.2/CHECKSUMS.sha256`,
        access: "public-read-only",
      };
    case "afw://readiness/v1":
      return {
        manifest: `${CANONICAL_ORIGIN}/.well-known/agent-readiness.json`,
        status_rule: "Only deployed capabilities count as active evidence.",
        methodology: METHODOLOGY_NAME,
        limits: ["Observed evidence does not prove indexing or recommendation by a model provider."],
      };
    default:
      throw new PublicMcpError("resource_not_found", "El recurso MCP publico solicitado no existe.");
  }
}

export async function readPublicMcpResource(uri, dependencies = {}) {
  const normalized = text(uri, 200);
  return {
    contract: PUBLIC_MCP_RESOURCE_CONTRACT,
    server_version: PUBLIC_MCP_SERVER_VERSION,
    uri: normalized,
    generated_at: generatedAt(dependencies),
    data: resourceData(normalized),
    sources: [SOURCES.methodology, SOURCES.readiness, SOURCES.okf],
    limits: ["Recurso publico y versionado; no contiene expedientes ni datos owner."],
  };
}
