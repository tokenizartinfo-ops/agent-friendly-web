import {
  CLI_VERSION,
  CliError,
  EXIT_CODES,
  createSuccessEnvelope,
} from "./cli-contract.mjs";
import { normalizePublicUrl } from "./methodology.mjs";
import { PUBLIC_AUDIT_PROBES, runPublicAudit } from "./public-audit.mjs";
import {
  fetchLimitedPublicUrl,
  MAX_PUBLIC_RESPONSE_BYTES,
  PUBLIC_REQUEST_TIMEOUT_MS,
} from "./public-network.mjs";
import { buildPublicProfile, PUBLIC_PROFILE_CONTRACT } from "./public-profile.mjs";
import { verifyRemoteOkf } from "./cli-okf.mjs";

const NETWORK_LIMITS = Object.freeze([
  `Timeout maximo por recurso: ${PUBLIC_REQUEST_TIMEOUT_MS} ms.`,
  `Respuesta maxima por recurso: ${MAX_PUBLIC_RESPONSE_BYTES} bytes.`,
  "Solo GET publico, sin credenciales y sin seguir redirecciones.",
]);

function invalidTarget(error) {
  return new CliError(
    "invalid_target",
    error instanceof Error ? error.message : "La URL publica no es valida.",
    EXIT_CODES.USAGE,
  );
}

function normalizeAuditOrigin(value) {
  try {
    const normalized = new URL(normalizePublicUrl(value));
    return `${normalized.origin}/`;
  } catch (error) {
    throw invalidTarget(error);
  }
}

async function runAuditCommand(parsed, dependencies) {
  const target = normalizeAuditOrigin(parsed.target);
  const input = { target };

  if (parsed.dryRun) {
    return createSuccessEnvelope(
      "audit",
      {
        target,
        executed_requests: 0,
        probes: PUBLIC_AUDIT_PROBES.map(({ id, path, accept }) => ({ id, path, accept })),
      },
      { dryRun: true, input, limits: [...NETWORK_LIMITS] },
    );
  }

  try {
    const report = await (dependencies.runPublicAudit ?? runPublicAudit)(target);
    return createSuccessEnvelope(
      "audit",
      { report },
      { input, limits: [...NETWORK_LIMITS, ...(report.limits ?? [])] },
    );
  } catch (error) {
    if (error instanceof CliError) throw error;
    throw new CliError(
      "network_failure",
      error instanceof Error ? error.message : "No se pudo completar la auditoria publica.",
      EXIT_CODES.NETWORK,
    );
  }
}

function runCapabilitiesCommand() {
  return createSuccessEnvelope("capabilities", {
    access: "public-read-only",
    commands: ["audit", "registry-get", "okf-verify", "capabilities", "version"],
    http_methods: ["GET"],
    local_writes: false,
    remote_writes: false,
    authentication: "none",
    blocked_actions: [
      "credentials",
      "publish",
      "deploy",
      "dns",
      "billing",
      "registry-write",
      "mcp",
      "a2a",
      "payments",
    ],
  });
}

function registryProfileUrl(parsed) {
  const url = new URL(`/registry/${parsed.slug}/profile.json`, parsed.origin);
  if (parsed.version !== undefined) {
    url.searchParams.set("version", String(parsed.version));
  }
  return url;
}

async function runRegistryGetCommand(parsed, dependencies) {
  const url = registryProfileUrl(parsed);
  const input = {
    slug: parsed.slug,
    origin: parsed.origin,
    ...(parsed.version === undefined ? {} : { version: parsed.version }),
  };

  if (parsed.dryRun) {
    return createSuccessEnvelope(
      "registry-get",
      { url: url.toString(), executed_requests: 0 },
      { dryRun: true, input, limits: [...NETWORK_LIMITS] },
    );
  }

  let remote;
  try {
    remote = await (dependencies.fetchLimitedPublicUrl ?? fetchLimitedPublicUrl)(url, {
      accept: "application/json,*/*;q=0.8",
    });
  } catch (error) {
    throw new CliError(
      "network_failure",
      error instanceof Error ? error.message : "No se pudo consultar el Registry publico.",
      EXIT_CODES.NETWORK,
    );
  }

  if (remote.status !== 200) {
    throw new CliError(
      "registry_unavailable",
      `El perfil publico no esta disponible (HTTP ${remote.status}).`,
      EXIT_CODES.NETWORK,
      { status: remote.status },
    );
  }

  if (!/\bapplication\/json\b/i.test(remote.contentType ?? "")) {
    throw new CliError(
      "invalid_registry_profile",
      "El Registry no devolvio un perfil JSON.",
      EXIT_CODES.INTEGRITY,
      { content_type: remote.contentType ?? "" },
    );
  }

  try {
    const rawProfile = JSON.parse(remote.body);
    const profile = (dependencies.buildPublicProfile ?? buildPublicProfile)(rawProfile);
    if (profile.contract !== PUBLIC_PROFILE_CONTRACT) {
      throw new Error("El contrato del perfil no coincide con la version publica soportada.");
    }
    return createSuccessEnvelope(
      "registry-get",
      { url: url.toString(), profile },
      {
        input,
        limits: [
          ...NETWORK_LIMITS,
          "Solo se consulta el perfil ya publicado; no se leen expedientes ni datos privados.",
        ],
      },
    );
  } catch (error) {
    throw new CliError(
      "invalid_registry_profile",
      error instanceof Error ? error.message : "El perfil publico no cumple el contrato.",
      EXIT_CODES.INTEGRITY,
    );
  }
}

async function runOkfVerifyCommand(parsed, dependencies) {
  const input = { origin: parsed.origin, release: parsed.release };
  const result = await (dependencies.verifyRemoteOkf ?? verifyRemoteOkf)(
    {
      origin: parsed.origin,
      release: parsed.release,
      dryRun: parsed.dryRun,
    },
    dependencies,
  );
  return createSuccessEnvelope(
    "okf-verify",
    result,
    {
      dryRun: parsed.dryRun,
      input,
      limits: [
        ...NETWORK_LIMITS,
        "El bundle se verifica en memoria y no se crean archivos locales.",
        "La verificacion de integridad no certifica la exactitud sustantiva del contenido.",
      ],
    },
  );
}

export async function executeCliCommand(parsed, dependencies = {}) {
  switch (parsed.command) {
    case "audit":
      return runAuditCommand(parsed, dependencies);
    case "capabilities":
      return runCapabilitiesCommand();
    case "registry-get":
      return runRegistryGetCommand(parsed, dependencies);
    case "okf-verify":
      return runOkfVerifyCommand(parsed, dependencies);
    case "version":
      return createSuccessEnvelope("version", { version: CLI_VERSION });
    default:
      throw new CliError(
        "unsupported_command",
        `Comando todavia no implementado: ${parsed.command}`,
        EXIT_CODES.USAGE,
      );
  }
}
