import assert from "node:assert/strict";
import test from "node:test";

import {
  MCP_RESOURCE_URIS,
  MCP_TOOL_NAMES,
  PUBLIC_MCP_RESULT_CONTRACT,
  PublicMcpError,
  executePublicMcpTool,
  readPublicMcpResource,
} from "../lib/public-mcp.mjs";

const NOW = "2026-08-28T15:00:00.000Z";

test("public MCP catalogs are deterministic and bounded", () => {
  assert.deepEqual(MCP_TOOL_NAMES, [
    "audit_public_site",
    "get_afw_methodology",
    "get_public_registry_profile",
    "verify_public_okf_release",
  ]);
  assert.deepEqual(MCP_RESOURCE_URIS, [
    "afw://capabilities/v1",
    "afw://methodology/v1",
    "afw://okf/v0.2",
    "afw://readiness/v1",
  ]);
});

test("methodology tool returns a stable public read-only envelope", async () => {
  const response = await executePublicMcpTool(
    "get_afw_methodology",
    { section: "levels" },
    { now: () => NOW },
  );

  assert.equal(response.contract, PUBLIC_MCP_RESULT_CONTRACT);
  assert.equal(response.tool, "get_afw_methodology");
  assert.equal(response.status, "ok");
  assert.equal(response.generated_at, NOW);
  assert.equal(response.input.section, "levels");
  assert.equal(response.result.methodology, "Gabriel Mucchiut Agent Friendly Web Method v1");
  assert.equal(response.result.levels.length, 6);
  assert.equal(response.result.levels[0].id, "AF-0");
  assert.equal(response.result.levels[5].id, "AF-5");
  assert.ok(response.blocked_actions.includes("publish"));
  assert.ok(response.sources.every((source) => source.url.startsWith("https://agentfriendlyweb.dev/")));
});

test("audit tool delegates once to the existing protected public auditor", async () => {
  let calls = 0;
  const response = await executePublicMcpTool(
    "audit_public_site",
    { url: "https://example.com/path" },
    {
      now: () => NOW,
      runPublicAudit: async (url) => {
        calls += 1;
        assert.equal(url, "https://example.com/path");
        return {
          target: "https://example.com",
          checkedAt: NOW,
          evidence: { robots: true },
          readiness: { score: 9, level: "AF-0 invisible" },
          probes: [{ id: "robots", status: 200, bytes: 20, detected: true }],
          limits: ["Solo evidencia publica."],
        };
      },
    },
  );

  assert.equal(calls, 1);
  assert.equal(response.result.report.target, "https://example.com");
  assert.equal(response.result.report.probes.length, 1);
  assert.equal(JSON.stringify(response).includes("body"), false);
});

test("registry tool returns only an already-published canonical profile", async () => {
  const profile = {
    contract: "agentfriendly.public-profile.v1",
    slug: "tokenizart",
    version: 1,
    organization: "Tokenizart",
  };
  const response = await executePublicMcpTool(
    "get_public_registry_profile",
    { slug: "Tokenizart", version: 1 },
    {
      now: () => NOW,
      getPublishedProfile: async (slug, version) => {
        assert.equal(slug, "tokenizart");
        assert.equal(version, 1);
        return profile;
      },
    },
  );

  assert.deepEqual(response.result.profile, profile);
  assert.deepEqual(response.input, { slug: "tokenizart", version: 1 });
  assert.match(response.limits.join(" "), /perfiles ya publicados/i);
});

test("OKF tool verifies only the canonical allowlisted release in memory", async () => {
  let calls = 0;
  const response = await executePublicMcpTool(
    "verify_public_okf_release",
    { release: "v0.2" },
    {
      now: () => NOW,
      verifyRemoteOkf: async (options) => {
        calls += 1;
        assert.deepEqual(options, {
          origin: "https://agentfriendlyweb.dev",
          release: "v0.2",
          dryRun: false,
        });
        return { valid: true, release: "2026-08-27", files_verified: 11, writes: false };
      },
    },
  );

  assert.equal(calls, 1);
  assert.equal(response.result.verification.valid, true);
  assert.equal(response.result.verification.writes, false);
});

test("domain adapters fail closed on unapproved inputs without echoing secrets", async () => {
  await assert.rejects(
    executePublicMcpTool("get_afw_methodology", { section: "private" }),
    (error) => error instanceof PublicMcpError && error.code === "invalid_section",
  );
  await assert.rejects(
    executePublicMcpTool("get_public_registry_profile", { slug: "../private" }),
    (error) => error instanceof PublicMcpError && error.code === "invalid_slug",
  );
  await assert.rejects(
    executePublicMcpTool("get_public_registry_profile", { slug: "tokenizart", version: 0 }),
    (error) => error instanceof PublicMcpError && error.code === "invalid_version",
  );
  await assert.rejects(
    executePublicMcpTool("verify_public_okf_release", { release: "v9.9" }),
    (error) => error instanceof PublicMcpError && error.code === "unsupported_release",
  );
  await assert.rejects(
    executePublicMcpTool("unknown", { token: "sk-secret-value" }),
    (error) =>
      error instanceof PublicMcpError
      && error.code === "unsupported_tool"
      && !error.message.includes("sk-secret-value"),
  );
});

test("resources expose only public versioned knowledge", async () => {
  for (const uri of MCP_RESOURCE_URIS) {
    const resource = await readPublicMcpResource(uri, { now: () => NOW });
    assert.equal(resource.contract, "agent-friendly-web.mcp-resource.v1");
    assert.equal(resource.uri, uri);
    assert.equal(resource.generated_at, NOW);
    assert.equal(JSON.stringify(resource).includes("project_id"), false);
    assert.equal(JSON.stringify(resource).includes("owner_email"), false);
    assert.equal(JSON.stringify(resource).includes("sk-secret-value"), false);
  }

  await assert.rejects(
    readPublicMcpResource("afw://private/project"),
    (error) => error instanceof PublicMcpError && error.code === "resource_not_found",
  );
});
