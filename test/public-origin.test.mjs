import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const canonicalOrigin = 'https://agentfriendlyweb.dev';
const legacyHost = 'agent-friendly-web.tokenizart.chatgpt.site';

const publicOriginFiles = [
  'app/api-catalog/route.ts',
  'app/casos/tokenizart/page.tsx',
  'app/layout.tsx',
  'app/page.tsx',
  'app/sitemap.ts',
  'public/llms-full.txt',
  'public/llms.txt',
  'public/openapi.json',
  'public/robots.txt',
  'public/cases/tokenizart/atelier.tokenizart.com/llms-full.txt',
  'public/cases/tokenizart/atelier.tokenizart.com/llms.txt',
  'public/cases/tokenizart/tokenizart.com/llms-full.txt',
  'public/cases/tokenizart/tokenizart.com/llms.txt',
];

test('public discovery assets use the canonical Agent Friendly Web origin', async () => {
  const contents = await Promise.all(
    publicOriginFiles.map((path) => readFile(path, 'utf8')),
  );

  for (const [index, content] of contents.entries()) {
    assert.equal(
      content.includes(legacyHost),
      false,
      `${publicOriginFiles[index]} still references the temporary Sites host`,
    );
  }

  assert.ok(
    contents.some((content) => content.includes(canonicalOrigin)),
    'no public discovery asset references the canonical origin',
  );
});
