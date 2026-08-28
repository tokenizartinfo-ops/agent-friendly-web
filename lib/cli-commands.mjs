import {
  CLI_VERSION,
  CliError,
  EXIT_CODES,
  createSuccessEnvelope,
} from "./cli-contract.mjs";
import { normalizePublicUrl } from "./methodology.mjs";
import { PUBLIC_AUDIT_PROBES, runPublicAudit } from "./public-audit.mjs";
import {
  MAX_PUBLIC_RESPONSE_BYTES,
  PUBLIC_REQUEST_TIMEOUT_MS,
} from "./public-network.mjs";

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

export async function executeCliCommand(parsed, dependencies = {}) {
  switch (parsed.command) {
    case "audit":
      return runAuditCommand(parsed, dependencies);
    case "capabilities":
      return runCapabilitiesCommand();
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

