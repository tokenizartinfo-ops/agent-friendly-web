import test from "node:test";
import assert from "node:assert/strict";

import {
  CLI_CONTRACT,
  EXIT_CODES,
  CliError,
  createErrorEnvelope,
  createSuccessEnvelope,
  serializeEnvelope,
} from "../lib/cli-contract.mjs";
import { parseCliArgs } from "../lib/cli-parser.mjs";

test("success envelopes use the complete v1 contract", () => {
  const envelope = createSuccessEnvelope("capabilities", { commands: [] });

  assert.equal(envelope.contract, CLI_CONTRACT);
  assert.equal(envelope.cli_version, "0.1.0");
  assert.equal(envelope.command, "capabilities");
  assert.equal(envelope.status, "ok");
  assert.equal(envelope.dry_run, false);
  assert.match(envelope.generated_at, /^\d{4}-\d{2}-\d{2}T/);
  assert.deepEqual(envelope.input, {});
  assert.deepEqual(envelope.result, { commands: [] });
  assert.deepEqual(envelope.limits, []);
});

test("planned envelopes declare dry-run explicitly", () => {
  const envelope = createSuccessEnvelope(
    "audit",
    { probes: [] },
    { dryRun: true, input: { target: "https://example.com/" } },
  );

  assert.equal(envelope.status, "planned");
  assert.equal(envelope.dry_run, true);
  assert.deepEqual(envelope.input, { target: "https://example.com/" });
});

test("error envelopes are stable and omit stack traces", () => {
  const error = new CliError(
    "invalid_arguments",
    "Falta la URL.",
    EXIT_CODES.USAGE,
    { argument: "url" },
  );
  const envelope = createErrorEnvelope("audit", error, { input: {} });

  assert.equal(envelope.status, "error");
  assert.equal(envelope.error.code, "invalid_arguments");
  assert.equal(envelope.error.message, "Falta la URL.");
  assert.deepEqual(envelope.error.details, { argument: "url" });
  assert.equal("stack" in envelope.error, false);
  assert.doesNotThrow(() => JSON.parse(serializeEnvelope(envelope)));
});

test("parses every supported command", () => {
  assert.deepEqual(parseCliArgs(["audit", "https://example.com", "--dry-run"]), {
    command: "audit",
    target: "https://example.com",
    dryRun: true,
  });
  assert.deepEqual(
    parseCliArgs(["registry", "get", "tokenizart", "--version", "2"]),
    {
      command: "registry-get",
      slug: "tokenizart",
      origin: "https://agentfriendlyweb.dev",
      version: 2,
      dryRun: false,
    },
  );
  assert.deepEqual(parseCliArgs(["okf", "verify", "--release", "v0.2"]), {
    command: "okf-verify",
    origin: "https://agentfriendlyweb.dev",
    release: "v0.2",
    dryRun: false,
  });
  assert.deepEqual(parseCliArgs(["capabilities"]), { command: "capabilities" });
  assert.deepEqual(parseCliArgs(["--version"]), { command: "version" });
  assert.deepEqual(parseCliArgs(["--help"]), { command: "help" });
});

test("parses origin, version and dry-run regardless of option order", () => {
  assert.deepEqual(
    parseCliArgs([
      "registry",
      "get",
      "tokenizart",
      "--dry-run",
      "--origin",
      "https://example.com",
      "--version",
      "3",
    ]),
    {
      command: "registry-get",
      slug: "tokenizart",
      origin: "https://example.com",
      version: 3,
      dryRun: true,
    },
  );
});

test("rejects unknown flags, duplicates and malformed identifiers", () => {
  assert.throws(
    () => parseCliArgs(["audit", "https://example.com", "--write"]),
    (error) => error instanceof CliError && error.exitCode === EXIT_CODES.USAGE,
  );
  assert.throws(
    () => parseCliArgs(["registry", "get", "../secret"]),
    (error) => error instanceof CliError && error.code === "invalid_slug",
  );
  assert.throws(
    () => parseCliArgs(["okf", "verify", "--release", "latest"]),
    (error) => error instanceof CliError && error.code === "invalid_release",
  );
  assert.throws(
    () => parseCliArgs(["audit", "https://example.com", "--dry-run", "--dry-run"]),
    (error) => error instanceof CliError && error.code === "duplicate_option",
  );
});

