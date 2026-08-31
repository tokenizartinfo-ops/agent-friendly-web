import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import { acceptsMarkdown, mergeVaryHeader } from '../lib/markdown-negotiation.mjs';
import { createHomeMarkdownResponse } from '../lib/home-markdown.mjs';

test('Accept negotiation selects Markdown only when it is acceptable', () => {
  assert.equal(acceptsMarkdown('text/markdown'), true);
  assert.equal(acceptsMarkdown('text/html, text/markdown;q=0.9'), true);
  assert.equal(acceptsMarkdown('text/markdown;q=0'), false);
  assert.equal(acceptsMarkdown('text/html, */*;q=0.8'), false);
  assert.equal(acceptsMarkdown(undefined), false);
});

test('root proxy rewrites Markdown requests and varies the response by Accept', async () => {
  const source = await readFile('proxy.ts', 'utf8');
  assert.match(source, /acceptsMarkdown/);
  assert.match(source, /\/index\.md/);
  assert.ok((source.match(/mergeVaryHeader/g) || []).length >= 3);
});

test('Vary merger preserves framework tokens and adds Accept once', () => {
  assert.equal(mergeVaryHeader(null, 'Accept'), 'Accept');
  assert.equal(mergeVaryHeader('RSC, Accept-Encoding', 'Accept'), 'RSC, Accept-Encoding, Accept');
  assert.equal(mergeVaryHeader('RSC, accept', 'Accept'), 'RSC, accept');
});

test('Markdown route returns a bounded canonical home document', async () => {
  const response = createHomeMarkdownResponse();
  const body = await response.text();

  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type') || '', /^text\/markdown/i);
  assert.match(response.headers.get('vary') || '', /Accept/i);
  assert.match(body, /^---\n/);
  assert.match(body, /# Agent Friendly Web/);
  assert.match(body, /https:\/\/agentfriendlyweb\.dev\/\.well-known\/ard\.json/);
  assert.ok(body.length < 20000);
  const routeSource = await readFile('app/index.md/route.ts', 'utf8');
  assert.match(routeSource, /createHomeMarkdownResponse/);
});
