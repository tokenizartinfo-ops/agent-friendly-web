import assert from 'node:assert/strict';
import test from 'node:test';
import { GET } from '../app/api-catalog/route.ts';

test('API catalog links the actual public A2A Agent Card without offering private delegation', async () => {
  const response = await GET();
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type'), /^application\/linkset\+json/);
  const catalog = await response.json();
  const origin = 'https://agentfriendlyweb.dev';
  assert.equal(catalog.linkset[0].anchor, origin);
  const items = catalog.linkset[0].item;
  const a2a = items.filter(item => item.href === origin + '/.well-known/agent-card.json');
  assert.equal(a2a.length, 1, 'the deployed A2A Agent Card must be discoverable exactly once');
  assert.equal(a2a[0].type, 'application/json');
  assert.match(a2a[0].title, /A2A public read-only diagnostic/);
  assert.doesNotMatch(a2a[0].title, /private|payment|autonomous|supervision/i);
  assert.ok(items.some(item => item.href === origin + '/.well-known/mcp/server-card.json'));
  assert.ok(items.some(item => item.href === origin + '/.well-known/agent-friendly-cli.json'));
});
