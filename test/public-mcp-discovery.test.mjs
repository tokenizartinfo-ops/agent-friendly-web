import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
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

async function read(path) {
  return readFile(new URL(path, root), "utf8");
}

test("deployed MCP cards expose the exact public read-only contract", async () => {
  for (const path of ["public/.well-known/mcp/server-card.json", "public/.well-known/mcp.json"]) {
    const card = JSON.parse(await read(path));
    assert.equal(card.status, "deployed");
    assert.equal(card.endpoint.url, "https://mcp.agentfriendlyweb.dev/mcp");
    assert.equal(card.endpoint.transport, "streamable-http");
    assert.equal(card.endpoint.stateless, true);
    assert.ok(card.endpoint.protocol_versions.includes("2026-07-28"));
    assert.deepEqual(card.tools.map((tool) => tool.name), expectedTools);
    assert.deepEqual(card.resources.map((resource) => resource.uri), expectedResources);
    assert.equal(card.authentication.type, "none");
    assert.equal(card.authentication.scope, "public-data-only");
    assert.ok(card.blocked_actions.includes("website-mutation"));
    assert.ok(card.blocked_actions.includes("private-expedients"));
    assert.equal(JSON.stringify(card).includes("owner_email"), false);
  }
});

test("MCP result schema fixes the safe envelope and denies unknown top-level fields", async () => {
  const schema = JSON.parse(await read("public/schemas/mcp-result.v1.json"));
  assert.equal(schema.$id, "https://agentfriendlyweb.dev/schemas/mcp-result.v1.json");
  assert.equal(schema.additionalProperties, false);
  assert.ok(schema.required.includes("blocked_actions"));
  assert.ok(schema.required.includes("limits"));
  assert.equal(schema.properties.contract.const, "agent-friendly-web.mcp-result.v1");
});

test("human and machine discovery label MCP as deployed with explicit boundaries", async () => {
  const [page, header, footer, map, sitemap, readiness, catalog, apiCatalog, llms, llmsFull, roadmap] = await Promise.all([
    read("app/mcp-readonly/page.tsx"),
    read("app/components/site-header.tsx"),
    read("app/components/site-footer.tsx"),
    read("app/mapa-del-sitio/page.tsx"),
    read("app/sitemap.ts"),
    read("public/.well-known/agent-readiness.json"),
    read("public/.well-known/ai-catalog.json"),
    read("app/api-catalog/route.ts"),
    read("public/llms.txt"),
    read("public/llms-full.txt"),
    read("docs/AGENT-NATIVE-DISCOVERY-ROADMAP-2026-08-26.md"),
  ]);

  assert.match(page, /MCP publico/i);
  assert.match(page, /read-only/i);
  assert.match(page, /desplegado/i);
  assert.match(page, /https:\/\/mcp\.agentfriendlyweb\.dev\/mcp/);
  assert.match(page, /sin OAuth/i);
  assert.match(page, /no puede publicar/i);
  assert.match(header, /\['mcp', 'mcp'\]/);
  assert.match(footer, /\['mcp', 'mcp'\]/);
  assert.match(map, /\/mcp-readonly/);
  assert.match(sitemap, /'mcp'/);

  const readinessJson = JSON.parse(readiness);
  assert.equal(readinessJson.capabilities.mcp.status, "deployed");
  assert.ok(readinessJson.capabilities.mcp.resources.includes("/.well-known/mcp/server-card.json"));

  const catalogJson = JSON.parse(catalog);
  assert.ok(catalogJson.entries.some((item) => item.url.endsWith("/.well-known/mcp/server-card.json")));
  assert.match(apiCatalog, /\.well-known\/mcp\/server-card\.json/);
  assert.match(llms, /MCP public read-only deployed/i);
  assert.match(llmsFull, /MCP public read-only deployed/i);
  assert.match(llmsFull, /https:\/\/mcp\.agentfriendlyweb\.dev\/mcp/);
  assert.match(llmsFull, /no A2A/i);
  assert.match(llmsFull, /deployed WebMCP browser tool/i);
  assert.match(llmsFull, /public read-only/i);
  assert.match(llmsFull, /WebMCP remains experimental/i);
  assert.match(roadmap, /Bloque 4C - MCP read-only: desplegado y verificado/i);
  assert.doesNotMatch(roadmap, /Bloque 4C - MCP read-only: candidato local/i);
});
