import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const routeUrl = new URL("../app/mcp/route.ts", import.meta.url);
const serverUrl = new URL("../lib/public-mcp-server.mjs", import.meta.url);
const httpUrl = new URL("../lib/public-mcp-http.mjs", import.meta.url);

test("public MCP route is POST-only and enforces bounded JSON input", async () => {
  const source = await readFile(routeUrl, "utf8");
  const serverSource = await readFile(serverUrl, "utf8");
  const httpSource = await readFile(httpUrl, "utf8");

  assert.match(httpSource, /MAX_PUBLIC_MCP_REQUEST_BYTES\s*=\s*32\s*\*\s*1024/);
  assert.match(httpSource, /application\/json/);
  assert.match(httpSource, /reader\.read\(\)/);
  assert.match(httpSource, /reader\.cancel\(\)/);
  assert.doesNotMatch(source, /request\.arrayBuffer\(\)/);
  assert.match(source, /status:\s*405/);
  assert.match(source, /allowedHostnames/);
  assert.match(source, /sanitizePublicMcpResponse/);
  assert.match(serverSource, /agentfriendlyweb\.dev/);
  assert.match(serverSource, /\.chatgpt\.site/);
  assert.match(serverSource, /\.workers\.dev/);
  assert.match(serverSource, /createPublicMcpServer/);
  assert.match(source, /getPublicProfileForMcp/);
  assert.doesNotMatch(source, /from ['"]\.\.\/\.\.\/lib\/registry-store['"]/);
});
