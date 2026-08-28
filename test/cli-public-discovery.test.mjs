import test from "node:test";
import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";

const canonical = "https://agentfriendlyweb.dev";

test("CLI manifest and schema describe the deployed read-only release", async () => {
  const manifest = JSON.parse(
    await readFile("public/.well-known/agent-friendly-cli.json", "utf8"),
  );
  const schema = JSON.parse(await readFile("public/schemas/cli-response.v1.json", "utf8"));

  assert.equal(manifest.contract, "agent-friendly-web.cli-manifest.v1");
  assert.equal(manifest.version, "0.1.0");
  assert.equal(manifest.status, "deployed");
  assert.equal(manifest.access, "public-read-only");
  assert.deepEqual(manifest.http_methods, ["GET"]);
  assert.equal(manifest.local_writes, false);
  assert.equal(manifest.remote_writes, false);
  assert.equal(manifest.authentication, "none");
  assert.ok(manifest.commands.includes("afw audit <url>"));
  assert.equal(schema.$id, `${canonical}/schemas/cli-response.v1.json`);
  assert.equal(schema.properties.contract.const, "agent-friendly-web.cli-response.v1");
});

test("public discovery surfaces link the CLI without claiming MCP or writes", async () => {
  const [llms, llmsFull, guide, sitemap, page] = await Promise.all([
    readFile("public/llms.txt", "utf8"),
    readFile("public/llms-full.txt", "utf8"),
    readFile("public/cli/index.md", "utf8"),
    readFile("app/sitemap.ts", "utf8"),
    readFile("app/cli/page.tsx", "utf8"),
  ]);

  for (const content of [llms, llmsFull]) {
    assert.match(content, /https:\/\/agentfriendlyweb\.dev\/\.well-known\/agent-friendly-cli\.json/);
    assert.match(content, /https:\/\/agentfriendlyweb\.dev\/cli/);
  }
  assert.match(guide, /No escribe archivos locales/i);
  assert.match(guide, /node bin\/afw\.mjs audit/);
  assert.doesNotMatch(guide, /MCP disponible en produccion/i);
  assert.match(sitemap, /\/cli/);
  assert.match(page, /<SiteFooter\s*\/>/);
  assert.match(page, /Desplegada/i);
});

test("catalogs and readiness list CLI resources with deployed status", async () => {
  const aiCatalog = JSON.parse(await readFile("public/.well-known/ai-catalog.json", "utf8"));
  const urls = aiCatalog.resources.map((resource) => resource.url);
  for (const url of [
    `${canonical}/cli`,
    `${canonical}/cli/index.md`,
    `${canonical}/.well-known/agent-friendly-cli.json`,
    `${canonical}/schemas/cli-response.v1.json`,
  ]) {
    assert.ok(urls.includes(url), `AI Catalog is missing ${url}`);
  }

  const readiness = JSON.parse(
    await readFile("public/.well-known/agent-readiness.json", "utf8"),
  );
  assert.equal(readiness.capabilities.cli.status, "deployed");
  assert.ok(readiness.capabilities.cli.resources.includes("/.well-known/agent-friendly-cli.json"));
  assert.match(readiness.capabilities.cli.note, /read-only/i);
  assert.equal(readiness.capabilities.mcp.status, "deployed");
  assert.match(readiness.capabilities.mcp.note, /public.*read-only/i);
});

test("human navigation and machine catalog expose real CLI destinations", async () => {
  const [header, footer, siteMap, apiCatalog, openapi] = await Promise.all([
    readFile("app/components/site-header.tsx", "utf8"),
    readFile("app/components/site-footer.tsx", "utf8"),
    readFile("app/mapa-del-sitio/page.tsx", "utf8"),
    readFile("app/api-catalog/route.ts", "utf8"),
    readFile("public/openapi.json", "utf8"),
  ]);

  assert.match(header, /href="\/cli"/);
  assert.match(footer, /\['CLI read-only', '\/cli'\]/);
  assert.match(siteMap, /CLI read-only/);
  assert.match(apiCatalog, /agent-friendly-cli\.json/);
  assert.match(openapi, /x-agent-friendly-web-cli/);
  assert.equal(await stat("app/cli/page.tsx").then(() => true), true);
});
