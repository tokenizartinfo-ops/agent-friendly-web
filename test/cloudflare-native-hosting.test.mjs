import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import test from 'node:test';

const root = process.cwd();

function read(path) {
  return readFileSync(join(root, path), 'utf8');
}

function filesUnder(path) {
  const absolute = join(root, path);
  if (!existsSync(absolute)) return [];
  return readdirSync(absolute, { withFileTypes: true }).flatMap((entry) => {
    const child = join(absolute, entry.name);
    return entry.isDirectory()
      ? filesUnder(relative(root, child))
      : statSync(child).isFile()
        ? [relative(root, child)]
        : [];
  });
}

test('runtime is Cloudflare-native and cannot silently fall back to Sites', () => {
  const packageJson = JSON.parse(read('package.json'));
  const vite = read('vite.config.ts');

  assert.equal(existsSync(join(root, '.openai', 'hosting.json')), false);
  assert.equal(packageJson.devDependencies?.['@openai/sites-vite-plugin'], undefined);
  assert.doesNotMatch(vite, /@openai\/sites-vite-plugin|\bsites\(\)/);
  assert.match(vite, /@cloudflare\/vite-plugin/);
});

test('active application identity contains no Sites authentication headers', () => {
  const activeFiles = [...filesUnder('app'), ...filesUnder('lib')]
    .filter((path) => /\.(?:mjs|ts|tsx)$/.test(path));

  for (const path of activeFiles) {
    const source = read(path);
    assert.doesNotMatch(source, /oai-authenticated-|ChatGPTUser|getChatGPTUser|requireChatGPTUser/, path);
  }
});

test('active remote configuration never points at a chatgpt.site origin', () => {
  const configurationFiles = readdirSync(root)
    .filter((name) => /^wrangler\..+\.jsonc$/.test(name));

  for (const path of configurationFiles) {
    assert.doesNotMatch(read(path), /\.chatgpt\.site/i, path);
  }
});

test('public discovery exposes the exact Cloudflare migration state without legacy auth claims', () => {
  const status = JSON.parse(read('public/.well-known/infrastructure-status.json'));
  assert.equal(status.canonical_origin, 'https://agentfriendlyweb.dev');
  assert.equal(status.public_runtime.state, 'transitional');
  assert.equal(status.cloudflare_native_candidate.state, 'candidate_local_verified');
  assert.equal(status.cloudflare_native_candidate.traffic_percent, 0);
  assert.equal(status.cloudflare_native_candidate.dns_changed, false);
  assert.equal(status.cloudflare_native_candidate.remote_canary_created, false);
  assert.equal(status.project_boundaries.tokenizart_runtime_dependency, false);
  assert.ok(status.retired_surfaces.every((surface) => surface.operational_use === false));

  const publicKnowledge = [
    'public/llms.txt',
    'public/llms-full.txt',
    'public/.well-known/agent-readiness.json',
    'public/.well-known/ai-catalog.json',
    'public/.well-known/ard.json',
    'public/okf/v0.2/discovery/public-audit.md',
    'public/okf/v0.2/discovery/public-discovery-resources.md',
  ].map(read).join('\n');

  assert.match(publicKnowledge, /https:\/\/agentfriendlyweb\.dev\/\.well-known\/infrastructure-status\.json/);
  assert.doesNotMatch(publicKnowledge, /Sign in with ChatGPT|identidad de Sites|oai-authenticated-/i);

  const robots = read('public/robots.txt');
  assert.doesNotMatch(robots, /\/signin-with-chatgpt|\/contact-staging|\/api\/staging/i);
});
