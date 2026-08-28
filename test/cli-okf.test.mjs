import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";

import { EXIT_CODES } from "../lib/cli-contract.mjs";
import { executeCliCommand } from "../lib/cli-commands.mjs";
import { verifyRemoteOkf } from "../lib/cli-okf.mjs";

const sha256 = (value) => createHash("sha256").update(value).digest("hex");

function okfFixture() {
  const files = {
    "index.md": "---\nokf_version: \"0.2\"\n---\n# Index\n",
    "log.md": "# Log\n\n## 2026-08-27\n\n* Creation\n",
  };
  const manifest = {
    schema: "agent-friendly-web.okf-distribution.v1",
    okf_version: "0.2",
    release: "2026-08-27-public-v1",
    status: "published",
    files: Object.entries(files).map(([path, body]) => ({
      path,
      sha256: sha256(body),
      media_type: "text/markdown; charset=utf-8",
      okf_document: true,
    })),
  };
  const manifestText = `${JSON.stringify(manifest, null, 2)}\n`;
  const checksums = [
    ...Object.entries(files).map(([path, body]) => `${sha256(body)}  ${path}`),
    `${sha256(manifestText)}  manifest.json`,
  ].sort().join("\n") + "\n";
  return { files, manifest, manifestText, checksums };
}

function fixtureFetcher(fixture) {
  return async (url) => {
    const marker = "/okf/v0.2/";
    const path = new URL(url).pathname.split(marker)[1];
    if (path === "manifest.json") {
      return { status: 200, contentType: "application/json", body: fixture.manifestText };
    }
    if (path === "CHECKSUMS.sha256") {
      return { status: 200, contentType: "text/plain", body: fixture.checksums };
    }
    return {
      status: fixture.files[path] === undefined ? 404 : 200,
      contentType: "text/markdown; charset=utf-8",
      body: fixture.files[path] ?? "Not found",
    };
  };
}

test("OKF dry-run lists initial paths without fetching", async () => {
  let requests = 0;
  const result = await verifyRemoteOkf(
    { origin: "https://agentfriendlyweb.dev", release: "v0.2", dryRun: true },
    {
      fetchLimitedPublicUrl: async () => {
        requests += 1;
        throw new Error("must not run");
      },
    },
  );

  assert.equal(requests, 0);
  assert.equal(result.planned, true);
  assert.equal(result.executed_requests, 0);
  assert.deepEqual(result.initial_paths, ["manifest.json", "CHECKSUMS.sha256"]);
});

test("OKF verifier validates inventory, media types and both checksum sources", async () => {
  const fixture = okfFixture();
  const result = await verifyRemoteOkf(
    { origin: "https://agentfriendlyweb.dev", release: "v0.2", dryRun: false },
    { fetchLimitedPublicUrl: fixtureFetcher(fixture) },
  );

  assert.equal(result.valid, true);
  assert.equal(result.okf_version, "0.2");
  assert.equal(result.files_verified, 2);
  assert.equal(result.checksum_entries, 3);
});

test("OKF verifier rejects traversal and inventories above 100 files", async () => {
  for (const files of [
    [{ path: "../secret", sha256: "a".repeat(64), media_type: "text/markdown" }],
    Array.from({ length: 101 }, (_, index) => ({
      path: `concept-${index}.md`,
      sha256: "a".repeat(64),
      media_type: "text/markdown",
    })),
  ]) {
    const manifestText = JSON.stringify({
      schema: "agent-friendly-web.okf-distribution.v1",
      okf_version: "0.2",
      files,
    });
    await assert.rejects(
      verifyRemoteOkf(
        { origin: "https://agentfriendlyweb.dev", release: "v0.2", dryRun: false },
        {
          fetchLimitedPublicUrl: async (url) => ({
            status: 200,
            contentType: url.toString().endsWith("manifest.json")
              ? "application/json"
              : "text/plain",
            body: url.toString().endsWith("manifest.json") ? manifestText : "",
          }),
        },
      ),
      (error) => error.exitCode === EXIT_CODES.INTEGRITY,
    );
  }
});

test("OKF verifier detects tampered content and undeclared checksum entries", async () => {
  const fixture = okfFixture();
  const fetcher = fixtureFetcher(fixture);
  await assert.rejects(
    verifyRemoteOkf(
      { origin: "https://agentfriendlyweb.dev", release: "v0.2", dryRun: false },
      {
        fetchLimitedPublicUrl: async (url) => {
          const response = await fetcher(url);
          return url.toString().endsWith("index.md")
            ? { ...response, body: `${response.body}tampered` }
            : response;
        },
      },
    ),
    (error) => error.exitCode === EXIT_CODES.INTEGRITY && error.code === "okf_integrity_failure",
  );

  fixture.checksums += `${"b".repeat(64)}  extra.md\n`;
  await assert.rejects(
    verifyRemoteOkf(
      { origin: "https://agentfriendlyweb.dev", release: "v0.2", dryRun: false },
      { fetchLimitedPublicUrl: fixtureFetcher(fixture) },
    ),
    (error) => error.exitCode === EXIT_CODES.INTEGRITY && error.code === "okf_integrity_failure",
  );
});

test("CLI dispatcher wraps OKF dry-run as a planned envelope", async () => {
  const response = await executeCliCommand(
    {
      command: "okf-verify",
      origin: "https://agentfriendlyweb.dev",
      release: "v0.2",
      dryRun: true,
    },
    {
      verifyRemoteOkf: async () => ({
        planned: true,
        executed_requests: 0,
        initial_paths: ["manifest.json", "CHECKSUMS.sha256"],
      }),
    },
  );

  assert.equal(response.status, "planned");
  assert.equal(response.dry_run, true);
  assert.equal(response.result.executed_requests, 0);
});

