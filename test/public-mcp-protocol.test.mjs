import assert from "node:assert/strict";
import test from "node:test";

import { Client, InMemoryTransport } from "@modelcontextprotocol/client";

import { MCP_RESOURCE_URIS, MCP_TOOL_NAMES } from "../lib/public-mcp.mjs";
import { createPublicMcpServer } from "../lib/public-mcp-server.mjs";

const NOW = "2026-08-28T18:00:00.000Z";

async function withClient(run) {
  const server = createPublicMcpServer({
    now: () => NOW,
    getPublishedProfile: async (slug, version) => ({
      contract: "agentfriendly.public-profile.v1",
      slug,
      version: version ?? 3,
      organization: "Tokenizart",
    }),
    runPublicAudit: async () => ({
      target: "https://example.com",
      checkedAt: NOW,
      readiness: { score: 42, level: "AF-2 legible" },
      probes: [],
      limits: ["Solo evidencia publica."],
    }),
    verifyRemoteOkf: async () => ({
      valid: true,
      release: "v0.2",
      files_verified: 11,
      writes: false,
    }),
  });
  const client = new Client(
    { name: "agent-friendly-web-test", version: "1.0.0" },
    { capabilities: {} },
  );
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();

  await server.connect(serverTransport);
  await client.connect(clientTransport);
  try {
    await run(client);
  } finally {
    await client.close();
    await server.close();
  }
}

test("MCP client discovers exactly the approved public read-only surface", async () => {
  await withClient(async (client) => {
    const tools = await client.listTools();
    assert.deepEqual(tools.tools.map((tool) => tool.name).sort(), [...MCP_TOOL_NAMES].sort());
    for (const tool of tools.tools) {
      assert.equal(tool.annotations?.readOnlyHint, true);
      assert.equal(tool.annotations?.destructiveHint, false);
      assert.equal(tool.annotations?.idempotentHint, true);
      assert.equal(tool.annotations?.openWorldHint, tool.name === "audit_public_site");
    }

    const resources = await client.listResources();
    assert.deepEqual(resources.resources.map((resource) => resource.uri).sort(), [...MCP_RESOURCE_URIS].sort());
  });
});

test("MCP client executes methodology, registry, audit and OKF tools", async () => {
  await withClient(async (client) => {
    const methodology = await client.callTool({
      name: "get_afw_methodology",
      arguments: { section: "levels" },
    });
    assert.equal(methodology.isError, undefined);
    assert.equal(methodology.structuredContent?.tool, "get_afw_methodology");
    assert.equal(methodology.structuredContent?.result?.levels?.length, 6);

    const registry = await client.callTool({
      name: "get_public_registry_profile",
      arguments: { slug: "tokenizart", version: 3 },
    });
    assert.equal(registry.structuredContent?.result?.profile?.organization, "Tokenizart");

    const audit = await client.callTool({
      name: "audit_public_site",
      arguments: { url: "https://example.com" },
    });
    assert.equal(audit.structuredContent?.result?.report?.readiness?.score, 42);

    const okf = await client.callTool({
      name: "verify_public_okf_release",
      arguments: { release: "v0.2" },
    });
    assert.equal(okf.structuredContent?.result?.verification?.writes, false);
  });
});

test("MCP client reads versioned public resources and receives safe tool errors", async () => {
  await withClient(async (client) => {
    for (const uri of MCP_RESOURCE_URIS) {
      const response = await client.readResource({ uri });
      assert.equal(response.contents.length, 1);
      assert.equal(response.contents[0].uri, uri);
      assert.equal(response.contents[0].mimeType, "application/json");
      const payload = JSON.parse(response.contents[0].text);
      assert.equal(payload.uri, uri);
      assert.equal(JSON.stringify(payload).includes("owner_email"), false);
    }

    const error = await client.callTool({
      name: "get_public_registry_profile",
      arguments: { slug: "../private", token: "sk-secret-value" },
    });
    assert.equal(error.isError, true);
    assert.match(error.content[0].text, /invalid_slug/);
    assert.equal(JSON.stringify(error).includes("sk-secret-value"), false);
  });
});
