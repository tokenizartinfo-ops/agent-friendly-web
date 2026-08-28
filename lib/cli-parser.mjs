import { CliError, EXIT_CODES } from "./cli-contract.mjs";

const DEFAULT_ORIGIN = "https://agentfriendlyweb.dev";
const DEFAULT_OKF_RELEASE = "v0.2";
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const RELEASE_PATTERN = /^v\d+\.\d+$/;

function usageError(code, message, details = undefined) {
  return new CliError(code, message, EXIT_CODES.USAGE, details);
}

function parseOptionList(args, allowed) {
  const parsed = {};
  const seen = new Set();

  for (let index = 0; index < args.length; index += 1) {
    const flag = args[index];
    const definition = allowed[flag];
    if (!definition) {
      throw usageError("unknown_option", `Opcion desconocida: ${flag}`, { option: flag });
    }
    if (seen.has(flag)) {
      throw usageError("duplicate_option", `Opcion repetida: ${flag}`, { option: flag });
    }
    seen.add(flag);

    if (definition.type === "boolean") {
      parsed[definition.key] = true;
      continue;
    }

    const value = args[index + 1];
    if (value === undefined || value.startsWith("--")) {
      throw usageError("missing_option_value", `Falta el valor de ${flag}.`, { option: flag });
    }
    parsed[definition.key] = value;
    index += 1;
  }

  return parsed;
}

function parsePositiveInteger(value, option) {
  const parsed = Number(value);
  if (!/^[1-9]\d*$/.test(value) || !Number.isSafeInteger(parsed)) {
    throw usageError("invalid_version", `${option} requiere un entero positivo.`, {
      option,
      value,
    });
  }
  return parsed;
}

function validateOrigin(value) {
  let url;
  try {
    url = new URL(value);
  } catch {
    throw usageError("invalid_origin", "El origen debe ser una URL HTTP o HTTPS valida.");
  }
  if (!["http:", "https:"].includes(url.protocol)) {
    throw usageError("invalid_origin", "El origen solo puede usar HTTP o HTTPS.");
  }
  if (url.username || url.password || url.port) {
    throw usageError(
      "invalid_origin",
      "El origen no puede incluir credenciales ni un puerto explicito.",
    );
  }
  if (url.pathname !== "/" || url.search || url.hash) {
    throw usageError("invalid_origin", "El origen no puede incluir ruta, query ni fragmento.");
  }
  return url.origin;
}

function parseAudit(args) {
  const [target, ...options] = args;
  if (!target || target.startsWith("--")) {
    throw usageError("missing_target", "Falta la URL publica a auditar.");
  }
  const parsed = parseOptionList(options, {
    "--dry-run": { key: "dryRun", type: "boolean" },
  });
  return { command: "audit", target, dryRun: parsed.dryRun ?? false };
}

function parseRegistry(args) {
  const [subcommand, slug, ...options] = args;
  if (subcommand !== "get") {
    throw usageError("invalid_subcommand", "Registry solo admite el subcomando get.");
  }
  if (!slug) {
    throw usageError("missing_slug", "Falta el slug publico del proyecto.");
  }
  if (!SLUG_PATTERN.test(slug)) {
    throw usageError("invalid_slug", "El slug solo admite minusculas, numeros y guiones.", {
      slug,
    });
  }
  const parsed = parseOptionList(options, {
    "--origin": { key: "origin", type: "value" },
    "--version": { key: "version", type: "value" },
    "--dry-run": { key: "dryRun", type: "boolean" },
  });
  return {
    command: "registry-get",
    slug,
    origin: validateOrigin(parsed.origin ?? DEFAULT_ORIGIN),
    ...(parsed.version === undefined
      ? {}
      : { version: parsePositiveInteger(parsed.version, "--version") }),
    dryRun: parsed.dryRun ?? false,
  };
}

function parseOkf(args) {
  const [subcommand, ...options] = args;
  if (subcommand !== "verify") {
    throw usageError("invalid_subcommand", "OKF solo admite el subcomando verify.");
  }
  const parsed = parseOptionList(options, {
    "--origin": { key: "origin", type: "value" },
    "--release": { key: "release", type: "value" },
    "--dry-run": { key: "dryRun", type: "boolean" },
  });
  const release = parsed.release ?? DEFAULT_OKF_RELEASE;
  if (!RELEASE_PATTERN.test(release)) {
    throw usageError("invalid_release", "La release OKF debe usar el formato vN.N.", {
      release,
    });
  }
  return {
    command: "okf-verify",
    origin: validateOrigin(parsed.origin ?? DEFAULT_ORIGIN),
    release,
    dryRun: parsed.dryRun ?? false,
  };
}

export function parseCliArgs(argv) {
  const [command, ...args] = argv;
  if (command === "--help" && args.length === 0) return { command: "help" };
  if (command === "--version" && args.length === 0) return { command: "version" };
  if (command === "capabilities" && args.length === 0) return { command: "capabilities" };
  if (command === "audit") return parseAudit(args);
  if (command === "registry") return parseRegistry(args);
  if (command === "okf") return parseOkf(args);

  throw usageError("invalid_command", "Comando desconocido o incompleto.", {
    command: command ?? null,
  });
}
