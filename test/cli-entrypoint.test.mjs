import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtemp, readdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const entrypoint = path.join(root, "bin", "afw.mjs");

function runCli(args, options = {}) {
  return spawnSync(process.execPath, [entrypoint, ...args], {
    cwd: options.cwd ?? root,
    encoding: "utf8",
  });
}

test("capabilities emits exactly one JSON document on stdout", () => {
  const result = runCli(["capabilities"]);

  assert.equal(result.status, 0);
  assert.equal(result.stderr, "");
  const parsed = JSON.parse(result.stdout);
  assert.equal(parsed.contract, "agent-friendly-web.cli-response.v1");
  assert.equal(parsed.status, "ok");
  assert.equal(result.stdout.trim().split("\n").length, 1);
});

test("usage failures emit one JSON document only on stderr", () => {
  const result = runCli(["audit"]);

  assert.equal(result.status, 2);
  assert.equal(result.stdout, "");
  const parsed = JSON.parse(result.stderr);
  assert.equal(parsed.status, "error");
  assert.equal(parsed.error.code, "missing_target");
  assert.equal("stack" in parsed.error, false);
});

test("help is the only human-readable command output", () => {
  const result = runCli(["--help"]);

  assert.equal(result.status, 0);
  assert.equal(result.stderr, "");
  assert.match(result.stdout, /afw audit <url>/);
  assert.match(result.stdout, /afw registry get <slug>/);
  assert.match(result.stdout, /Solo lectura publica/);
});

test("version is machine-readable JSON", () => {
  const result = runCli(["--version"]);

  assert.equal(result.status, 0);
  assert.equal(JSON.parse(result.stdout).result.version, "0.1.0");
});

test("audit dry-run creates no files in an empty working directory", async () => {
  const directory = await mkdtemp(path.join(tmpdir(), "afw-cli-dry-run-"));
  try {
    const result = runCli(["audit", "https://example.com", "--dry-run"], { cwd: directory });
    assert.equal(result.status, 0);
    assert.equal(JSON.parse(result.stdout).status, "planned");
    assert.deepEqual(await readdir(directory), []);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
