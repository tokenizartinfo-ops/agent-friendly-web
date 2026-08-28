#!/usr/bin/env node

import {
  CliError,
  EXIT_CODES,
  createErrorEnvelope,
  serializeEnvelope,
} from "../lib/cli-contract.mjs";
import { executeCliCommand } from "../lib/cli-commands.mjs";
import { parseCliArgs } from "../lib/cli-parser.mjs";

const HELP = `Agent Friendly Web CLI v0.1.0

Solo lectura publica. No escribe archivos, no publica cambios y no usa credenciales.

Uso:
  afw audit <url> [--dry-run]
  afw registry get <slug> [--origin <url>] [--version <n>] [--dry-run]
  afw okf verify [--origin <url>] [--release <vN.N>] [--dry-run]
  afw capabilities
  afw --version
  afw --help
`;

function commandLabel(argv) {
  if (argv[0] === "registry" && argv[1] === "get") return "registry-get";
  if (argv[0] === "okf" && argv[1] === "verify") return "okf-verify";
  return argv[0]?.replace(/^--/, "") || "unknown";
}

async function main(argv) {
  let parsed;
  try {
    parsed = parseCliArgs(argv);
    if (parsed.command === "help") {
      process.stdout.write(HELP);
      return;
    }

    const envelope = await executeCliCommand(parsed);
    process.stdout.write(`${serializeEnvelope(envelope)}\n`);
    process.exitCode = EXIT_CODES.OK;
  } catch (error) {
    const safeError = error instanceof CliError
      ? error
      : new CliError(
        "internal_error",
        "Fallo interno no clasificado.",
        EXIT_CODES.INTERNAL,
      );
    const envelope = createErrorEnvelope(parsed?.command ?? commandLabel(argv), safeError, {
      dryRun: parsed?.dryRun ?? false,
      input: {},
    });
    process.stderr.write(`${serializeEnvelope(envelope)}\n`);
    process.exitCode = safeError.exitCode;
  }
}

await main(process.argv.slice(2));
