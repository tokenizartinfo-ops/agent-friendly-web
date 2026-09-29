import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import { reviewCopilotOutput, validateCopilotInput } from '../lib/intake-copilot.mjs';
import { requestIntakeSuggestions } from '../lib/intake-copilot-provider.mjs';

test('copilot rejects secrets before inference', () => {
  assert.equal(validateCopilotInput({ locale: 'es', notes: 'password del sitio: abcdef' }).code, 'sensitive_input');
});

test('copilot keeps only source-grounded bounded proposals', () => {
  const notes = 'Museo Sur usa WordPress y atiende a coleccionistas.';
  const result = reviewCopilotOutput({ suggestions: [
    { field: 'cms', value: 'WordPress', sourceExcerpt: 'usa WordPress' },
    { field: 'hosting', value: 'Cloudflare', sourceExcerpt: 'usa Cloudflare' },
    { field: 'audience', value: 'inversores', sourceExcerpt: 'atiende a coleccionistas' },
    { field: 'notes', value: 'inventado', sourceExcerpt: 'Museo Sur' },
  ] }, notes);
  assert.deepEqual(result.suggestions.map(item => item.field), ['cms']);
  assert.equal(result.autonomousWrite, false);
  assert.equal(result.persistence, 'none');
});

test('copilot rejects invented domains and languages outside the cited excerpt', () => {
  const notes = 'Museo Sur publica en español en museosur.org.';
  const result = reviewCopilotOutput({ suggestions: [
    { field: 'website', value: 'https://otro.org/', sourceExcerpt: 'museosur.org' },
    { field: 'languages', value: ['en'], sourceExcerpt: 'publica en español' },
  ] }, notes);
  assert.deepEqual(result.suggestions, []);
});

test('copilot cites only an exact excerpt of the owner text', () => {
  const notes = 'Museo Sur usa WordPress.';
  const result = reviewCopilotOutput({ suggestions: [
    { field: 'cms', value: 'WordPress', sourceExcerpt: 'wordpress' },
  ] }, notes);
  assert.deepEqual(result.suggestions, []);
});

test('copilot requires each proposed value to be supported by its own excerpt', () => {
  const notes = 'Nuestro CMS es WordPress. También evaluamos Shopify.';
  const reviewed = reviewCopilotOutput({ suggestions: [
    { field: 'cms', value: 'Shopify', sourceExcerpt: 'Nuestro CMS es WordPress.' },
  ] }, notes);
  assert.deepEqual(reviewed.suggestions, []);
  const supported = reviewCopilotOutput({ suggestions: [
    { field: 'cms', value: 'WordPress', sourceExcerpt: 'Nuestro CMS es WordPress.' },
  ] }, notes);
  assert.equal(supported.suggestions[0].value, 'WordPress');
  const wrongWebsiteCitation = reviewCopilotOutput({ suggestions: [
    { field: 'website', value: 'https://museosur.example/', sourceExcerpt: 'Nuestro CMS es WordPress.' },
  ] }, `${notes} Sitio: museosur.example`);
  assert.deepEqual(wrongWebsiteCitation.suggestions, []);
});

test('copilot does not shorten an excerpt after validating its evidence', () => {
  const notes = `${'A'.repeat(170)} WordPress`;
  const reviewed = reviewCopilotOutput({ suggestions: [
    { field: 'cms', value: 'WordPress', sourceExcerpt: notes },
  ] }, notes);
  assert.deepEqual(reviewed.suggestions, []);
});

test('copilot inference is gated by a per-user rate limit in every environment', async () => {
  const config = JSON.parse((await readFile('wrangler.jsonc', 'utf8')).replace(/^\s*\/\/.*$/gm, ''));
  const limits = [config.ratelimits, config.env.canary.ratelimits, config.env.production.ratelimits]
    .map(items => items.find(item => item.name === 'COPILOT_RATE_LIMIT'));
  assert.equal(new Set(limits.map(item => item?.namespace_id)).size, 3);
  for (const item of limits) {
    assert.ok(item);
    assert.equal(item.name, 'COPILOT_RATE_LIMIT');
    assert.deepEqual(item.simple, { limit: 5, period: 60 });
  }
  const route = await readFile('app/api/projects/[projectId]/copilot/route.ts', 'utf8');
  assert.match(route, /COPILOT_RATE_LIMIT\.limit\(\{ key: user\.userId \}\)/);
  assert.ok(route.indexOf('COPILOT_RATE_LIMIT.limit') < route.indexOf('requestIntakeSuggestions(env.AI'));
  assert.match(route, /status: 429/);
  const provider = await readFile('lib/intake-copilot-provider.mjs', 'utf8');
  assert.match(provider, /max_tokens: 650/);
});

test('the private dossier only offers AI assistance when its server flag is enabled', async () => {
  const page = await readFile('app/expediente/page.tsx', 'utf8');
  const workspace = await readFile('app/components/intake-workspace.tsx', 'utf8');
  assert.match(page, /copilotEnabled=\{String\(env\.AFW_COPILOT_ENABLED\) === 'true'\}/);
  assert.match(workspace, /isCopilotProjectAllowed\(\{ enabled: copilotEnabled, allowedProjectId: copilotProjectId, projectId \}\) && !rehearsal/);
});

test('provider asks for bounded structured extraction and accepts JSON-mode response', async () => {
  let called;
  const ai = { run: async (model, input) => {
    called = { model, input };
    return { response: { suggestions: [{ field: 'cms', value: 'WordPress', sourceExcerpt: 'WordPress' }] } };
  } };
  const response = await requestIntakeSuggestions(ai, 'Usamos WordPress.', 'es');
  assert.deepEqual(response, { suggestions: [{ field: 'cms', value: 'WordPress', sourceExcerpt: 'WordPress' }] });
  assert.match(called.model, /^@cf\//);
  assert.equal(called.input.max_tokens, 650);
  assert.equal(called.input.temperature, 0);
  assert.equal(called.input.response_format.type, 'json_schema');
  assert.equal(called.input.messages[1].content, 'Usamos WordPress.');
  assert.match(called.input.messages[0].content, /Spanish/);
});
