import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function read(relativePath) {
  return readFile(new URL(relativePath, root), "utf8");
}

test("dedicated Cloudflare Worker preserves the bounded public MCP contract", async () => {
  const [entry, server, config, packageJson, gate, release] = await Promise.all([
    read("worker/mcp/index.mjs"),
    read("lib/public-mcp-server.mjs"),
    read("wrangler.mcp.jsonc"),
    read("package.json"),
    read("docs/BLOCK-4C-MCP-CLOUDFLARE-WORKER-GATE-2026-08-28.md"),
    read("docs/BLOCK-4C-MCP-RELEASE-2026-08-28.md"),
  ]);
  const wrangler = JSON.parse(config);
  const pkg = JSON.parse(packageJson);

  assert.match(entry, /createPublicMcpHttpHandler/);
  assert.match(entry, /prepareBoundedPublicMcpRequest/);
  assert.match(entry, /sanitizePublicMcpResponse/);
  assert.match(entry, /getBuiltinProfile/);
  assert.match(entry, /url\.pathname !== "\/mcp"/);
  assert.match(entry, /status: "deployed"/);
  assert.doesNotMatch(entry, /registry-store|D1|env\.DB/);

  assert.match(server, /"mcp\.agentfriendlyweb\.dev"/);
  assert.equal(wrangler.name, "agent-friendly-web-public-mcp");
  assert.equal(wrangler.main, "worker/mcp/index.mjs");
  assert.equal(wrangler.compatibility_date, "2026-08-28");
  assert.deepEqual(wrangler.compatibility_flags, ["nodejs_compat"]);
  assert.equal(wrangler.observability.enabled, true);
  assert.equal(wrangler.observability.head_sampling_rate, 1);
  assert.equal(wrangler.env.staging.name, "agent-friendly-web-public-mcp-staging");
  assert.deepEqual(wrangler.env.production.routes, [
    { pattern: "mcp.agentfriendlyweb.dev", custom_domain: true },
  ]);

  const isolatedWrangler = "npx --yes wrangler@4.127.0";
  assert.equal(pkg.scripts["mcp:dev"], `${isolatedWrangler} dev --config wrangler.mcp.jsonc --env staging --port 8791`);
  assert.equal(pkg.scripts["mcp:deploy:dry-run"], `${isolatedWrangler} deploy --config wrangler.mcp.jsonc --env staging --dry-run`);
  assert.equal(pkg.scripts["mcp:deploy:staging"], `${isolatedWrangler} deploy --config wrangler.mcp.jsonc --env staging`);
  assert.equal(pkg.scripts["mcp:deploy:production"], `${isolatedWrangler} deploy --config wrangler.mcp.jsonc --env production`);

  assert.match(gate, /Sites MCP is not enabled for this Site owner/);
  assert.match(gate, /version 20/i);
  assert.match(gate, /mcp\.agentfriendlyweb\.dev/);
  assert.match(gate, /sin D1|no usa D1/i);
  assert.match(release, /https:\/\/mcp\.agentfriendlyweb\.dev\/mcp/);
  assert.match(release, /76de5417-90b5-4a5c-8fa5-87414610afb6/);
  assert.match(release, /4b28c4d7d3e606b7cd8fe7689aea80f164b64f69/);
  assert.match(release, /sin D1|no usa D1/i);
});
