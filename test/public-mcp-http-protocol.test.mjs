import assert from "node:assert/strict";
import { createServer } from "node:http";
import { Readable } from "node:stream";
import test from "node:test";

import { Client, StreamableHTTPClientTransport } from "@modelcontextprotocol/client";

import {
  MCP_RESOURCE_URIS,
  MCP_TOOL_NAMES,
} from "../lib/public-mcp.mjs";
import {
  PublicMcpHttpError,
  prepareBoundedPublicMcpRequest,
  sanitizePublicMcpResponse,
} from "../lib/public-mcp-http.mjs";
import { createPublicMcpHttpHandler } from "../lib/public-mcp-server.mjs";

const NOW = "2026-08-28T20:00:00.000Z";

function profile(slug, version) {
  return {
    contract: "agentfriendly.public-profile.v1",
    slug,
    version: version ?? 1,
    publishedAt: NOW,
    canonicalUrl: `https://agentfriendlyweb.dev/registry/${slug}`,
    organization: "Tokenizart",
    canonicalOrigin: "https://tokenizart.com",
    siteType: "Ecosistema de trazabilidad",
    sectors: ["Arte"],
    audiences: ["Owners"],
    languages: ["es"],
    publicSources: [{ title: "Sitio", url: "https://tokenizart.com", state: "observed", observedAt: NOW }],
    declaredCapabilities: ["Trazabilidad publica"],
    observedResources: [{ type: "robots", url: "https://tokenizart.com/robots.txt", state: "observed", observedAt: NOW }],
    verification: { status: "verified", hostname: "tokenizart.com", method: "dns_txt", verifiedAt: NOW, verifiedUntil: "2026-11-26T20:00:00.000Z" },
    readiness: { level: "AF-3 herramientas", score: 70, state: "observed", observedAt: NOW },
    limits: ["Solo informacion publica."],
    historyUrl: `https://agentfriendlyweb.dev/registry/${slug}`,
  };
}

function dependencies() {
  return {
    now: () => NOW,
    getPublishedProfile: async (slug, version) => profile(slug, version),
    runPublicAudit: async () => ({
      target: "https://example.com",
      checkedAt: NOW,
      readiness: { score: 42, level: "AF-2 legible" },
      probes: [],
      limits: ["Solo evidencia publica."],
    }),
    verifyRemoteOkf: async () => ({ valid: true, release: "v0.2", files_verified: 11, writes: false }),
  };
}

function sendNodeResponse(response, output) {
  output.statusCode = response.status;
  for (const [key, value] of response.headers) output.setHeader(key, value);
  return response.arrayBuffer().then((body) => output.end(Buffer.from(body)));
}

async function startHttpServer() {
  const handler = createPublicMcpHttpHandler(dependencies(), ["127.0.0.1", "localhost"]);
  const server = createServer(async (input, output) => {
    try {
      const address = server.address();
      const url = `http://127.0.0.1:${address.port}${input.url}`;
      if (input.method !== "POST") {
        await sendNodeResponse(new Response("Method Not Allowed", { status: 405, headers: { Allow: "POST" } }), output);
        return;
      }
      const request = new Request(url, {
        method: "POST",
        headers: input.headers,
        body: Readable.toWeb(input),
        duplex: "half",
      });
      const bounded = await prepareBoundedPublicMcpRequest(request);
      const response = await sanitizePublicMcpResponse(await handler.fetch(bounded));
      await sendNodeResponse(response, output);
    } catch (error) {
      const status = error instanceof PublicMcpHttpError ? error.status : 400;
      const code = error instanceof PublicMcpHttpError ? error.code : "invalid_request";
      await sendNodeResponse(Response.json({ error: { code, message: "Invalid MCP request." } }, { status }), output);
    }
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  return {
    endpoint: new URL(`http://127.0.0.1:${address.port}/mcp`),
    close: () => new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve())),
  };
}

async function withHttpClient(mode, run) {
  const runtime = await startHttpServer();
  const client = new Client(
    { name: `afw-http-${typeof mode === "string" ? mode : "pinned"}`, version: "1.0.0" },
    { capabilities: {}, versionNegotiation: { mode } },
  );
  try {
    await client.connect(new StreamableHTTPClientTransport(runtime.endpoint));
    await run(client, runtime.endpoint);
  } finally {
    await client.close().catch(() => undefined);
    await runtime.close();
  }
}

test("real HTTP client negotiates MCP 2026-07-28 and exercises the bounded surface", async () => {
  await withHttpClient({ pin: "2026-07-28" }, async (client, endpoint) => {
    assert.equal(client.getProtocolEra(), "modern");
    assert.equal(client.getNegotiatedProtocolVersion(), "2026-07-28");
    assert.deepEqual((await client.listTools()).tools.map((item) => item.name).sort(), [...MCP_TOOL_NAMES].sort());
    assert.deepEqual((await client.listResources()).resources.map((item) => item.uri).sort(), [...MCP_RESOURCE_URIS].sort());
    assert.equal((await client.callTool({ name: "get_afw_methodology", arguments: { section: "levels" } })).structuredContent.result.levels.length, 6);
    assert.equal((await client.readResource({ uri: "afw://capabilities/v1" })).contents[0].uri, "afw://capabilities/v1");

    const secret = "sk-secret-value-1234567890";
    await assert.rejects(
      client.callTool({ name: `unknown-${secret}`, arguments: {} }),
      (error) => !error.message.includes(secret),
    );
    await assert.rejects(
      client.readResource({ uri: `afw://private/${secret}` }),
      (error) => !error.message.includes(secret),
    );

    assert.equal((await fetch(endpoint, { method: "GET" })).status, 405);
    assert.equal((await fetch(endpoint, { method: "POST", headers: { "content-type": "text/plain" }, body: "{}" })).status, 415);
    assert.ok((await fetch(endpoint, { method: "POST", headers: { "content-type": "application/json" }, body: "{invalid" })).status >= 400);
    assert.equal((await fetch(endpoint, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ pad: "x".repeat(33 * 1024) }) })).status, 413);
  });
});

test("real HTTP client preserves stateless legacy compatibility", async () => {
  await withHttpClient("legacy", async (client) => {
    assert.equal(client.getProtocolEra(), "legacy");
    assert.match(client.getNegotiatedProtocolVersion(), /^2025-/);
    assert.deepEqual((await client.listTools()).tools.map((item) => item.name).sort(), [...MCP_TOOL_NAMES].sort());
  });
});
