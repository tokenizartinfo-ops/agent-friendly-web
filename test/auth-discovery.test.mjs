import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const root = process.cwd();
const read = (path) => readFileSync(`${root}/${path}`, 'utf8');

test('auth.md documents the deployed human boundary without inventing agent OAuth', () => {
  const path = `${root}/public/auth.md`;
  assert.equal(existsSync(path), true);

  const auth = read('public/auth.md');
  assert.match(auth, /Cloudflare Access/);
  assert.match(auth, /one-time (?:PIN|code)|codigo de un solo uso/i);
  assert.match(auth, /\/expediente\*/);
  assert.match(auth, /\/capsula\/\*/);
  assert.match(auth, /\/api\/projects\/\*/);
  assert.match(auth, /JWT/);
  assert.match(auth, /OAuth 2\.1/);
  assert.match(auth, /not deployed|no esta desplegado/i);
  assert.doesNotMatch(auth, /Sign in with ChatGPT|auth\.openai\.com|chatgpt\.site/i);
});

test('public discovery catalogs expose auth.md with honest capability status', () => {
  const llms = read('public/llms.txt');
  const llmsFull = read('public/llms-full.txt');
  const catalog = JSON.parse(read('public/.well-known/ai-catalog.json'));
  const readiness = JSON.parse(read('public/.well-known/agent-readiness.json'));

  assert.match(llms, /https:\/\/agentfriendlyweb\.dev\/auth\.md/);
  assert.match(llmsFull, /https:\/\/agentfriendlyweb\.dev\/auth\.md/);
  assert.ok(catalog.entries.some((entry) => entry.url === 'https://agentfriendlyweb.dev/auth.md'));
  assert.deepEqual(readiness.capabilities.authentication_documentation, {
    status: 'deployed',
    resources: ['/auth.md'],
    human_authentication: 'cloudflare_access_email_otp',
    agent_oauth: 'not_deployed',
    note: 'Documents the active human boundary and planned agent authorization without advertising OAuth, OIDC or A2A as deployed.',
  });
});
