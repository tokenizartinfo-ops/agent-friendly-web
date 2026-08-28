import assert from "node:assert/strict";

import { Client, StreamableHTTPClientTransport } from "@modelcontextprotocol/client";

const endpoint = new URL(process.argv[2] ?? "http://localhost:3000/mcp");
const expectedTools = [
  "audit_public_site",
  "get_afw_methodology",
  "get_public_registry_profile",
  "verify_public_okf_release",
];
const expectedResources = [
  "afw://capabilities/v1",
  "afw://methodology/v1",
  "afw://okf/v0.2",
  "afw://readiness/v1",
];

function names(items, key) {
  return items.map((item) => item[key]).sort();
}

async function expectToolError(client, name, args) {
  try {
    const response = await client.callTool({ name, arguments: args });
    assert.equal(response.isError, true, `${name} should return an MCP tool error`);
    return "mcp-error";
  } catch {
    return "protocol-error";
  }
}

async function rawStatus(method, body, contentType = "application/json") {
  const response = await fetch(endpoint, {
    method,
    headers: contentType ? { "content-type": contentType } : undefined,
    body: method === "GET" || method === "HEAD" ? undefined : body,
    redirect: "manual",
  });
  await response.arrayBuffer();
  return response.status;
}

const client = new Client(
  { name: "agent-friendly-web-release-smoke", version: "1.0.0" },
  {
    capabilities: {},
    versionNegotiation: { mode: "auto" },
  },
);
const transport = new StreamableHTTPClientTransport(endpoint);

try {
  await client.connect(transport);
  assert.equal(client.getProtocolEra(), "modern");
  assert.equal(client.getNegotiatedProtocolVersion(), "2026-07-28");

  const toolList = await client.listTools();
  assert.deepEqual(names(toolList.tools, "name"), [...expectedTools].sort());
  const resourceList = await client.listResources();
  assert.deepEqual(names(resourceList.resources, "uri"), [...expectedResources].sort());

  const methodology = await client.callTool({
    name: "get_afw_methodology",
    arguments: { section: "levels" },
  });
  assert.equal(methodology.structuredContent?.result?.levels?.length, 6);

  const registry = await client.callTool({
    name: "get_public_registry_profile",
    arguments: { slug: "tokenizart" },
  });
  assert.equal(registry.structuredContent?.result?.profile?.contract, "agentfriendly.public-profile.v1");

  const audit = await client.callTool({
    name: "audit_public_site",
    arguments: { url: "https://example.com" },
  });
  assert.equal(audit.structuredContent?.tool, "audit_public_site");
  assert.equal(typeof audit.structuredContent?.result?.report?.readiness?.score, "number");

  const okf = await client.callTool({
    name: "verify_public_okf_release",
    arguments: { release: "v0.2" },
  });
  assert.equal(okf.structuredContent?.result?.verification?.valid, true);

  for (const uri of expectedResources) {
    const response = await client.readResource({ uri });
    assert.equal(response.contents[0]?.uri, uri);
  }

  const negativeTools = {
    private_target: await expectToolError(client, "audit_public_site", { url: "http://127.0.0.1" }),
    invalid_slug: await expectToolError(client, "get_public_registry_profile", { slug: "../private" }),
    invalid_version: await expectToolError(client, "get_public_registry_profile", { slug: "tokenizart", version: 0 }),
    unapproved_okf: await expectToolError(client, "verify_public_okf_release", { release: "v9.9" }),
    unknown_tool: await expectToolError(client, "unknown_tool", {}),
  };

  const negativeHttp = {
    get: await rawStatus("GET"),
    non_json: await rawStatus("POST", "{}", "text/plain"),
    malformed_json: await rawStatus("POST", "{not-json"),
    oversized: await rawStatus("POST", JSON.stringify({ pad: "x".repeat(33 * 1024) })),
  };
  assert.equal(negativeHttp.get, 405);
  assert.equal(negativeHttp.non_json, 415);
  assert.ok(negativeHttp.malformed_json >= 400);
  assert.equal(negativeHttp.oversized, 413);

  process.stdout.write(`${JSON.stringify({
    endpoint: endpoint.href,
    protocol_era: client.getProtocolEra(),
    protocol_version: client.getNegotiatedProtocolVersion(),
    tools: names(toolList.tools, "name"),
    resources: names(resourceList.resources, "uri"),
    positive_calls: {
      methodology_levels: methodology.structuredContent.result.levels.length,
      registry_slug: registry.structuredContent.result.profile.slug,
      audit_score: audit.structuredContent.result.report.readiness.score,
      okf_valid: okf.structuredContent.result.verification.valid,
    },
    negative_tools: negativeTools,
    negative_http: negativeHttp,
  }, null, 2)}\n`);
} finally {
  await client.close();
}
