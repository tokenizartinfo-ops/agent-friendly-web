import test from "node:test";
import assert from "node:assert/strict";

import { EXIT_CODES } from "../lib/cli-contract.mjs";
import { executeCliCommand } from "../lib/cli-commands.mjs";

test("audit dry-run lists probes without invoking the auditor", async () => {
  let calls = 0;
  const response = await executeCliCommand(
    { command: "audit", target: "https://example.com", dryRun: true },
    {
      runPublicAudit: async () => {
        calls += 1;
        throw new Error("must not run");
      },
    },
  );

  assert.equal(calls, 0);
  assert.equal(response.status, "planned");
  assert.equal(response.dry_run, true);
  assert.equal(response.result.target, "https://example.com/");
  assert.ok(response.result.probes.some((probe) => probe.path === "/llms.txt"));
  assert.ok(response.result.probes.some((probe) => probe.path === "/.well-known/mcp.json"));
  assert.equal(response.result.executed_requests, 0);
});

test("audit delegates once to the existing public auditor", async () => {
  const report = {
    target: "https://example.com",
    readiness: { level: "AF-1 descubrible", score: 20 },
  };
  let calls = 0;
  const response = await executeCliCommand(
    { command: "audit", target: "https://example.com", dryRun: false },
    {
      runPublicAudit: async (url) => {
        calls += 1;
        assert.equal(url, "https://example.com/");
        return report;
      },
    },
  );

  assert.equal(calls, 1);
  assert.equal(response.status, "ok");
  assert.deepEqual(response.result.report, report);
});

test("audit classifies malformed targets as usage failures", async () => {
  await assert.rejects(
    executeCliCommand({ command: "audit", target: "http://127.0.0.1", dryRun: true }),
    (error) => error.exitCode === EXIT_CODES.USAGE && error.code === "invalid_target",
  );
});

test("capabilities declares read-only boundaries and blocked actions", async () => {
  const response = await executeCliCommand({ command: "capabilities" });

  assert.equal(response.result.access, "public-read-only");
  assert.equal(response.result.local_writes, false);
  assert.equal(response.result.remote_writes, false);
  assert.deepEqual(response.result.http_methods, ["GET"]);
  assert.ok(response.result.commands.includes("audit"));
  assert.ok(response.result.blocked_actions.includes("publish"));
  assert.ok(response.result.blocked_actions.includes("credentials"));
});

test("version returns the machine-readable CLI version", async () => {
  const response = await executeCliCommand({ command: "version" });
  assert.equal(response.result.version, "0.1.0");
});
