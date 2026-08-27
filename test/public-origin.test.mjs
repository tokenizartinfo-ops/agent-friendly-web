import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import test from 'node:test';

const canonicalOrigin = 'https://agentfriendlyweb.dev';
const legacyHost = 'agent-friendly-web.tokenizart.chatgpt.site';

const sourceOriginFiles = [
  'app/api-catalog/route.ts',
  'app/casos/tokenizart/page.tsx',
  'app/layout.tsx',
  'app/page.tsx',
  'app/sitemap.ts',
];

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const path = `${directory}/${entry.name}`;
    if (entry.isDirectory()) return listFiles(path);
    return /\.(json|md|txt|xml|svg)$/i.test(entry.name) ? [path] : [];
  }));
  return files.flat();
}

test('public discovery assets use the canonical Agent Friendly Web origin', async () => {
  const publicFiles = await listFiles('public');
  const publicOriginFiles = [...sourceOriginFiles, ...publicFiles];
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
