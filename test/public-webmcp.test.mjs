import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import { createPublicAuditWebMcpTool } from '../lib/public-webmcp.mjs';

test('WebMCP tool exposes one bounded public read-only audit', async () => {
  const requests = [];
  const tool = createPublicAuditWebMcpTool({
    fetchImpl: async (url, init) => {
      requests.push({ url, init });
      return Response.json({ target: 'https://example.org', readiness: { score: 20 } });
    },
  });

  assert.equal(tool.name, 'afw.audit_public_site');
  assert.match(tool.description, /public.*read-only/i);
  assert.deepEqual(tool.inputSchema.required, ['url']);
  const result = await tool.execute({ url: 'https://example.org' });
  assert.equal(requests.length, 1);
  assert.equal(requests[0].url, '/api/scan');
  assert.equal(requests[0].init.method, 'POST');
  assert.deepEqual(JSON.parse(requests[0].init.body), { url: 'https://example.org' });
  assert.match(result, /example\.org/);
  assert.doesNotMatch(JSON.stringify(tool), /publish|deploy|credential|password|token/i);
});

test('WebMCP tool rejects missing input and sanitizes API errors', async () => {
  const tool = createPublicAuditWebMcpTool({
    fetchImpl: async () => new Response(JSON.stringify({ error: 'Public URL required' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    }),
  });

  await assert.rejects(tool.execute({}), /URL publica/i);
  await assert.rejects(tool.execute({ url: 'bad' }), /Public URL required/i);
});

test('home registers WebMCP with feature detection and abortable cleanup', async () => {
  const [component, home] = await Promise.all([
    readFile('app/components/public-webmcp-registration.tsx', 'utf8'),
    readFile('app/page.tsx', 'utf8'),
  ]);

  assert.match(component, /modelContext/);
  assert.match(component, /AbortController/);
  assert.match(component, /signal:\s*controller\.signal/);
  assert.match(component, /controller\.abort\(\)/);
  assert.match(home, /<PublicWebMcpRegistration\s*\/>/);
});

