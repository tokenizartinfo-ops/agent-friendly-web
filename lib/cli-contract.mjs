export const CLI_CONTRACT = "agent-friendly-web.cli-response.v1";
export const CLI_VERSION = "0.1.0";

export const EXIT_CODES = Object.freeze({
  OK: 0,
  USAGE: 2,
  NETWORK: 3,
  INTEGRITY: 4,
  INTERNAL: 5,
});

export class CliError extends Error {
  constructor(code, message, exitCode, details = undefined) {
    super(message);
    this.name = "CliError";
    this.code = code;
    this.exitCode = exitCode;
    this.details = details;
  }
}

function envelopeBase(command, options = {}) {
  return {
    contract: CLI_CONTRACT,
    cli_version: CLI_VERSION,
    command,
    status: options.status ?? "ok",
    dry_run: options.dryRun ?? false,
    generated_at: options.generatedAt ?? new Date().toISOString(),
    input: options.input ?? {},
  };
}

export function createSuccessEnvelope(command, result, options = {}) {
  return {
    ...envelopeBase(command, {
      ...options,
      status: options.dryRun ? "planned" : "ok",
    }),
    result,
    limits: options.limits ?? [],
  };
}

export function createErrorEnvelope(command, error, options = {}) {
  const errorBody = {
    code: error.code ?? "internal_error",
    message: error.message ?? "Fallo interno no clasificado.",
  };
  if (error.details !== undefined) {
    errorBody.details = error.details;
  }

  return {
    ...envelopeBase(command, { ...options, status: "error" }),
    error: errorBody,
    limits: options.limits ?? [],
  };
}

export function serializeEnvelope(envelope) {
  return JSON.stringify(envelope);
}
