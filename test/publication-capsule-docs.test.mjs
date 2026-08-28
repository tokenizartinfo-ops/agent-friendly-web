import test from "node:test";
import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);

async function text(path) {
  return readFile(new URL(path, root), "utf8");
}

test("Block 5A gate documents the candidate without claiming remote publication", async () => {
  const gate = await text("docs/BLOCK-5A-PUBLISHING-CAPSULE-GATE-2026-08-28.md");

  assert.match(gate, /sin publicacion remota/i);
  assert.match(gate, /doble consentimiento/i);
  assert.match(gate, /Draft PR/);
  assert.match(gate, /sin merge automatico/i);
  assert.match(gate, /WordPress.*no implementado/is);
  assert.match(gate, /GitHub App.*no implementad/is);
});

test("roadmaps label Block 5A as a verified local candidate", async () => {
  const [discovery, capsule] = await Promise.all([
    text("docs/AGENT-NATIVE-DISCOVERY-ROADMAP-2026-08-26.md"),
    text("docs/A2A-DEPLOYMENT-CAPSULE-ROADMAP.es.md"),
  ]);

  assert.match(discovery, /Bloque 5A - capsula local: candidato verificado/);
  assert.match(capsule, /candidato local verificado/i);
  assert.match(capsule, /no crea.*pull request/is);
});

test("all three candidate contracts are present but remain outside deployed catalogs", async () => {
  const schemas = [
    "public/schemas/publication-capsule.v1.json",
    "public/schemas/publication-approval.v1.json",
    "public/schemas/draft-pr-plan.v1.json",
  ];
  await Promise.all(schemas.map((path) => access(new URL(path, root))));

  const discoveryFiles = [
    "public/llms.txt",
    "public/llms-full.txt",
    "public/.well-known/ai-catalog.json",
    "public/.well-known/agent-readiness.json",
  ];
  const combined = (await Promise.all(discoveryFiles.map((path) => text(path)))).join("\n");
  assert.equal(combined.includes("agentfriendly.publication-capsule.v1"), false);
  assert.equal(combined.includes("agentfriendly.draft-pr-plan.v1"), false);
});
