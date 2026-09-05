import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('client MCP offering is roadmap-only, scoped and distinct from the deployed public MCP', async () => {
  const [architecture, agentRoadmap, growthRoadmap] = await Promise.all([
    read('docs/CLIENT-MCP-SERVER-OFFERING-ARCHITECTURE-V1.md'),
    read('docs/AGENT-NATIVE-DISCOVERY-ROADMAP-2026-08-26.md'),
    read('docs/GROWTH-AND-MONETIZATION-ROADMAP-2026-08-31.md'),
  ]);

  assert.match(architecture, /Estado:\*\* arquitectura futura; no desplegada/i);
  assert.match(architecture, /MCP publico read-only/i);
  assert.match(architecture, /OAuth/i);
  assert.match(architecture, /Code Mode/i);
  assert.match(architecture, /no implementa un servidor MCP ni el runtime de Code Mode/i);
  assert.match(architecture, /identity.*consent.*scope.*audit.*rollback/is);
  assert.match(architecture, /no reutilizar credenciales de Cloudflare del cliente/i);
  assert.match(architecture, /https:\/\/mcp\.agentfriendlyweb\.dev\/mcp/);
  assert.match(architecture, /https:\/\/github\.com\/cloudflare\/mcp/);
  assert.match(architecture, /https:\/\/github\.com\/jillesme\/cloudflare-mcp-code-mode-demo/);

  for (const roadmap of [agentRoadmap, growthRoadmap]) {
    assert.match(roadmap, /CLIENT-MCP-SERVER-OFFERING-ARCHITECTURE-V1\.md/);
    assert.match(roadmap, /MCP para clientes.*no desplegad/is);
  }
});
